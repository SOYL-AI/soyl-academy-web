// ISC 12 Physics ch14 Refraction and Dispersion by a Prism — question bank (ISC style). Numbers computed and re-checked
// (prism rays with Snell's law at both faces; the rainbow is asked as ray diagram and explanation only, as the syllabus
// removes its derivation).
import { mk, add, r, dec, near } from '../../isc-12-physics-ch01/src/lib.mjs';
import { prismRay, minDev, nFromMin, critical, iGrazing, BOW } from './svgs.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const rad = (d) => (d * Math.PI) / 180;
const deg = (x) => (x * 180) / Math.PI;
const sinD = (d) => Math.sin(rad(d));
const asinD = (x) => deg(Math.asin(x));

// ================================================================ t01 refraction through a prism, deviation, i–δ graph
add('towardsbase-mcq', mcq({
  stem: 'A narrow beam from a laser pointer is sent through a glass prism standing on its base on a laboratory bench, entering one sloping face and leaving by the other. At each of the two faces the beam is bent',
  right: 'towards the base of the prism',
  wrong: ['towards the refracting edge of the prism', 'towards the base at the first face and towards the edge at the second', 'towards the edge at the first face and towards the base at the second'],
  sol: 'Entering, the beam bends towards the normal; leaving, away from the normal. With the faces sloping as they do, both turns are towards the base, so the deviations add — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('r1r2-mcq', mcq({
  stem: 'A ray enters a crown-glass prism of refracting angle 52° and refracts at 21° to the normal of the first face. Inside the prism, the ray meets the second face at an angle to its normal of',
  right: '31°',
  wrong: ['21°', '73°', '26°'],
  sol: r`The angles inside a prism satisfy $r_1 + r_2 = A$, so $r_2 = 52^\circ - 21^\circ = 31^\circ$. (73° adds instead of subtracting; 26° is half of A, true only at minimum deviation.) — option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => 52 - 21 === 31 || 'r1r2');
add('quad-mcq', mcq({
  stem: 'The two refracting faces of a quartz prism meet at 64°. A ray crosses the prism, and the normals to the faces drawn at the points where it enters and leaves meet inside the prism. The angle between these normals, facing the base, is',
  right: '116°',
  wrong: ['64°', '26°', '32°'],
  sol: 'In the quadrilateral formed by the refracting edge, the two points and the meeting point N, the angles at the faces are 90° each, so the angle at N is 360° − 90° − 90° − 64° = 116°, that is 180° − A — option (@K).',
  d: 2, c: 'understanding', t: [1],
}), () => 360 - 90 - 90 - 64 === 116 || 'quad');
add('emerge-mcq', mcq({
  stem: 'An optics kit contains four prisms. For which one can a ray enter one refracting face and leave through the other, for a suitable angle of incidence?',
  right: 'refracting angle 70°, n = 1.45',
  wrong: ['refracting angle 80°, n = 1.70', 'refracting angle 75°, n = 1.65', 'refracting angle 90°, n = 1.50'],
  sol: r`Light can leave the second face only if $A \le 2C$, with $\sin C = 1/n$. Twice the critical angle is $2 \times ${dec(critical(1.45), 3)}^\circ = ${dec(2 * critical(1.45), 3)}^\circ$ for n = 1.45 (more than 70°), but only ${dec(2 * critical(1.7), 3)}° for 1.70, ${dec(2 * critical(1.65), 3)}° for 1.65 and ${dec(2 * critical(1.5), 3)}° for 1.50, each less than the prism angle — option (@K).`,
  d: 3, c: 'analysis', t: [1],
}), () => 2 * critical(1.45) > 70 && 2 * critical(1.7) < 80 && 2 * critical(1.65) < 75 && 2 * critical(1.5) < 90 || 'emerge');
const ex1 = prismRay(60, 1.52, 40);
add('pair-mcq', mcq({
  stem: 'For a 60° prism of glass with n = 1.52, a ray incident at 40° emerges at 60.6° and is deviated by 40.6°. Another angle of incidence that gives exactly the same deviation is about',
  right: '60.6°',
  wrong: ['49.5°', '20.0°', '80.6°'],
  sol: r`Light paths are reversible: a ray entering at 60.6° travels the same path backwards and leaves at 40°, so $\delta = 60.6^\circ + 40^\circ - 60^\circ = 40.6^\circ$ again. 49.5° gives the minimum deviation, about 38.9°, not 40.6° — option (@K).`,
  d: 3, c: 'analysis', t: [1],
}), () => near(prismRay(60, 1.52, ex1.e).d, ex1.d, 1e-6) && near(ex1.e, 60.63, 0.001) && near(minDev(60, 1.52).i, 49.46, 0.001) || 'pair');
add('apex-fill', fill({
  stem: 'In the glass prism of a school spectrometer, the angle between the two polished faces through which light enters and leaves is called the ___ angle of the prism.',
  acc: [['refracting', 'refracting angle', 'apex']],
  sol: 'It is the **refracting** angle A (also called the angle of the prism); the third face, opposite the refracting edge, is the base.',
  d: 1, c: 'recall', t: [1],
}));
add('dev-tf', tf({
  stem: 'For a given glass prism, the angle of deviation keeps increasing as the angle of incidence is increased from the smallest value at which light emerges up to 90°.',
  key: 'f',
  sol: 'False. The deviation first decreases, reaches the minimum deviation (where i = e) and then increases again; the i–δ graph is U-shaped.',
  d: 2, c: 'understanding', t: [1],
}), () => {
  const g = iGrazing(60, 1.52) + 0.5;
  return (prismRay(60, 1.52, g).d > prismRay(60, 1.52, 49.5).d && prismRay(60, 1.52, 85).d > prismRay(60, 1.52, 49.5).d) || 'devtf';
});
add('noemerge-ar', ar({
  a: 'No ray can enter one refracting face of an acrylic prism (n = 1.49) of refracting angle 88° and leave through the other face.',
  r: 'Since r₁ can never exceed the critical angle C, the ray meets the second face at r₂ = A − r₁ ≥ A − C, which exceeds C whenever A > 2C.',
  key: 'a',
  sol: r`Both are true and R explains A: here $C = \sin^{-1}(1/1.49) = ${dec(critical(1.49), 3)}^\circ$, so $2C = ${dec(2 * critical(1.49), 3)}^\circ < 88^\circ$, and every ray is totally reflected at the second face — option (a).`,
  d: 3, c: 'analysis', t: [1],
}), () => 2 * critical(1.49) < 88 || 'noem');
const dv = prismRay(45, 1.58, 50);
add('dev-num', num({
  stem: 'A ray meets one face of a glass prism of refracting angle 45° (n = 1.58) at an angle of incidence of 50°. Find the angle of deviation, in degrees.',
  value: Number(dec(dv.d, 3)), tol: 0.2, unit: '°',
  sol: r`$\sin r_1 = \dfrac{\sin 50^\circ}{1.58} = \dfrac{0.7660}{1.58} = ${dec(sinD(50) / 1.58, 4)}$, so $r_1 = ${dec(dv.r1, 3)}^\circ$ and $r_2 = 45^\circ - r_1 = ${dec(dv.r2, 3)}^\circ$.
$\sin e = 1.58 \times \sin ${dec(dv.r2, 3)}^\circ = ${dec(1.58 * sinD(dv.r2), 4)}$, so $e = ${dec(dv.e, 3)}^\circ$.
$\delta = i + e - A$: $50 + ${dec(dv.e, 3)} - 45 = ${dec(dv.d, 3)}$ degrees.`,
  scheme: [['r₁ ≈ 29.0°, r₂ ≈ 16.0°, e ≈ 25.8°', 1], ['δ = i + e − A ≈ 30.8°', 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => near(dv.d, 30.814, 0.001) && q.answer.value === 30.8 || `dv ${dv.d}`);
const ni = prismRay(30, 1.6, 0);
add('normalinc-num', num({
  stem: 'A ray falls normally on the first face of a thin-edged prism of refracting angle 30° made of plastic with n = 1.60. Find the angle of deviation of the emergent ray, in degrees.',
  value: Number(dec(ni.d, 3)), tol: 0.2, unit: '°',
  sol: r`Normal incidence: $i = 0$, $r_1 = 0$, so $r_2 = A = 30^\circ$. At the second face $\sin e = 1.60 \times \sin 30^\circ = 1.60 \times 0.5 = 0.80$, so $e = ${dec(ni.e, 4)}^\circ$.
$\delta = i + e - A$: $0 + ${dec(ni.e, 4)} - 30 = ${dec(ni.d, 3)}$ degrees.`,
  scheme: [['r₂ = A = 30°; sin e = 0.80, e ≈ 53.1°', 1], ['δ ≈ 23.1°', 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), (q) => near(ni.e, 53.13, 0.001) && q.answer.value === 23.1 || 'ni');
// readings 38°, 62°, δ = 42°: realisable (n ≈ 1.553 gives exactly this path through a 58° prism)
const tw = { i: 38, e: 62, d: 42 };
tw.A = tw.i + tw.e - tw.d;
add('twoi-num', num({
  stem: 'A student finds that her prism deviates a ray by 42° both when the angle of incidence is 38° and when it is 62°. Find the refracting angle of the prism, in degrees.',
  value: tw.A, tol: 0.1, unit: '°',
  sol: r`By reversibility, the ray incident at 38° emerges at 62° (and vice versa). Then $\delta = i + e - A$ gives $A = i + e - \delta$: $38 + 62 - 42 = ${tw.A}$ degrees.`,
  scheme: [['e = 62° for i = 38°; A = i + e − δ = 58°', 1]],
  d: 3, c: 'analysis', t: [1],
}), (q) => {
  // independent: find n for which a 58° prism takes 38° to 62°, then confirm δ
  let lo = 1.2;
  let hi = 2;
  for (let k = 0; k < 80; k++) {
    const m = (lo + hi) / 2;
    if (asinD(sinD(38) / m) + asinD(sinD(62) / m) > 58) lo = m;
    else hi = m;
  }
  const p = prismRay(58, lo, 38);
  return (near(p.e, 62, 1e-6) && near(p.d, 42, 1e-6) && q.answer.value === 58) || 'tw';
});
const gz = { A: 50, n: 1.65 };
gz.C = critical(gz.n);
gz.i = iGrazing(gz.A, gz.n);
add('graze-num', num({
  stem: 'A prism of refracting angle 50° is made of dense flint glass (n = 1.65). Find the smallest angle of incidence for which light can emerge from its second face, in degrees.',
  value: Number(dec(gz.i, 3)), tol: 0.2, unit: '°',
  sol: r`$\sin C = \dfrac{1}{1.65}$, so $C = ${dec(gz.C, 4)}^\circ$. For grazing emergence $r_2 = C$, so $r_1 = 50^\circ - C = ${dec(50 - gz.C, 4)}^\circ$.
$\sin i = 1.65 \times \sin ${dec(50 - gz.C, 4)}^\circ = ${dec(1.65 * sinD(50 - gz.C), 4)}$, so $i = \sin^{-1}(${dec(1.65 * sinD(50 - gz.C), 4)}) = ${dec(gz.i, 3)}$ degrees.`,
  scheme: [['C ≈ 37.3°; r₁ = A − C ≈ 12.7°', 1], ['i ≈ 21.3°', 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => near(gz.i, 21.26, 0.001) && q.answer.value === 21.3 && prismRay(50, 1.65, 21.2).e === null && prismRay(50, 1.65, 21.4).e > 80 || `gz ${gz.i}`);
add('cases-match', match({
  stem: 'Match each situation of a ray passing through a prism of refracting angle A in Column A with the angles inside the prism in Column B.',
  pairs: [
    ['The emergent ray just grazes along the second face', 'r₂ equals the critical angle and e = 90°'],
    ['The prism is set for minimum deviation', 'r₁ = r₂ = A/2'],
    ['The ray falls normally on the first face', 'r₁ = 0 and r₂ = A'],
    ['The ray retraces its path after reflection at a silvered second face', 'r₁ = A and r₂ = 0'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Grazing emergence: r₂ = C, e = 90° (1 → r). Minimum deviation: symmetric path, r₁ = r₂ = A/2 (2 → p). Normal incidence: no bending, r₁ = 0, so r₂ = A (3 → s). Retracing: the ray meets the silvered face normally, r₂ = 0, so r₁ = A (4 → q).',
  d: 2, c: 'understanding', t: [1, 2],
}));
add('reverse-short2', short({
  marks: 2,
  stem: 'For a 60° prism of glass with n = 1.52, a ray incident at 40° emerges at 60.6°, deviated by 40.6°. Without any further calculation, name another angle of incidence that gives the same deviation, and explain why the minimum deviation must be less than 40.6°.',
  model: 'An incidence of **60.6°**: light paths are reversible, so that ray retraces the same path and leaves at 40°, with the same i + e − A. Two different incidences give 40.6°, so the curve must dip **below** 40.6° between them: δm is smaller, reached where i = e.',
  sol: 'Reversibility swaps i and e; the U-shaped curve has its minimum between them.',
  scheme: [['60.6°, by reversibility (i and e swapped)', 1], ['Two incidences with the same δ lie on either side of the minimum, so δm < 40.6°', 1]],
  d: 3, c: 'analysis', t: [1],
}), () => minDev(60, 1.52).dm < ex1.d && minDev(60, 1.52).i > 40 && minDev(60, 1.52).i < ex1.e || 'rev');
add('grazing-short2', short({
  marks: 2,
  stem: 'What is meant by grazing emergence of a ray from a prism? State the condition on the angle r₂ for which it occurs, and what happens to a ray for which r₂ is larger.',
  model: 'In **grazing emergence** the ray leaves the second face travelling along the face, with an angle of emergence of **90°**. It happens when the ray inside meets the second face at the **critical angle**, r₂ = C. If r₂ is larger than C, the ray is **totally internally reflected** and no light emerges from that face.',
  sol: 'e = 90° when r₂ = C; TIR for r₂ > C.',
  scheme: [['Emergent ray along the face, e = 90°', 1], ['r₂ = C; for r₂ > C total internal reflection, no emergence', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('geom-short3', short({
  marks: 3,
  stem: 'A ray passes through a prism of refracting angle A, entering at Q and leaving at R. Using the normals at Q and R, show that r₁ + r₂ = A, and hence prove that the angle of deviation is δ = i + e − A.',
  model: r`Let the normals at Q and R meet at N. In the quadrilateral formed by the refracting edge, Q, N and R, the angles at Q and R are 90° (normals meet the faces at right angles), so $\angle QNR = 360^\circ - 90^\circ - 90^\circ - A = 180^\circ - A$.
In triangle QNR the angles at Q and R are $r_1$ and $r_2$: $r_1 + r_2 + (180^\circ - A) = 180^\circ$, so $r_1 + r_2 = A$.
At Q the ray turns through $(i - r_1)$, at R through $(e - r_2)$. Produce the incident ray forwards and the emergent ray backwards to meet at D: these two turns are the interior angles of triangle QDR at Q and R, so the exterior angle at D is $\delta = (i - r_1) + (e - r_2) = i + e - (r_1 + r_2) = i + e - A$.`,
  sol: 'Quadrilateral with two right angles; triangle QNR; exterior angle of triangle QDR.',
  scheme: [['∠QNR = 180° − A from the quadrilateral', 1], ['Triangle QNR: r₁ + r₂ = A', 1], ['δ = (i − r₁) + (e − r₂) = i + e − A', 1]],
  d: 2, c: 'understanding', t: [1], wl: null,
}));
const lim = { n: 1.62 };
lim.C = critical(lim.n);
add('limit-short3', short({
  marks: 3,
  stem: 'Show that no ray can pass through the two refracting faces of a prism if its refracting angle is more than twice the critical angle of its material. Hence find the largest refracting angle of a prism of flint glass (n = 1.62) through which light can pass.',
  model: r`Light enters the first face from air, so the largest possible refraction angle (at grazing incidence, $i = 90^\circ$) is the critical angle: $r_1 \le C$. Since $r_1 + r_2 = A$, $r_2 = A - r_1 \ge A - C$.
The ray leaves the second face only if $r_2 \le C$. If $A > 2C$, then $r_2 \ge A - C > C$ for every ray: all are totally reflected, and none emerges.
For flint glass $\sin C = \dfrac{1}{1.62}$, so $C = ${dec(lim.C, 3)}^\circ$ and the largest angle is $2C = ${dec(2 * lim.C, 3)}^\circ$.`,
  sol: 'r₁ ≤ C, so r₂ ≥ A − C > C when A > 2C; 2C ≈ 76.2°.',
  scheme: [['r₁ ≤ C, so r₂ ≥ A − C', 1], ['Emergence needs r₂ ≤ C: impossible if A > 2C', 1], ['C ≈ 38.1°, largest A ≈ 76.2°', 1]],
  d: 4, c: 'analysis', t: [1], wl: null,
}), () => near(2 * lim.C, 76.24, 0.001) && prismRay(76, 1.62, 89.9).e !== null && prismRay(76.5, 1.62, 89.99).e === null || `lim ${lim.C}`);
const sv = { A: 30, n: 1.6 };
sv.i = asinD(sv.n * sinD(sv.A));
add('silver-short3', short({
  marks: 3,
  stem: 'The second refracting face of a prism of refracting angle 30° and refractive index 1.60 is silvered. A ray falls on the first face and, after reflection at the silvered face, travels back along its own path. Find the angle of incidence on the first face, and state the total deviation of the ray.',
  model: r`To retrace its path, the ray must meet the silvered face **normally**: $r_2 = 0$. Since $r_1 + r_2 = A$, $r_1 = A = 30^\circ$.
Snell’s law at the first face: $\sin i = n\sin r_1 = 1.60 \times \sin 30^\circ = 0.80$, so $i = ${dec(sv.i, 3)}^\circ$.
The ray goes back exactly the way it came, so it is turned through **180°**.`,
  sol: 'Normal incidence on the mirror: r₁ = A; sin i = n sin A.',
  scheme: [['Retracing needs normal incidence on the silvered face: r₂ = 0, r₁ = A = 30°', 1], ['sin i = 1.60 × 0.5 = 0.80, i ≈ 53.1°', 1], ['Deviation 180°', 1]],
  d: 3, c: 'application', t: [1], wl: null,
}), () => near(sv.i, 53.13, 0.001) || 'sv');
const dl = prismRay(50, 1.55, 35);
dl.ig = iGrazing(50, 1.55);
add('deviation-long', long({
  stem: '(a) Draw (describe in words) the path of a ray through a prism of refracting angle A, and show that r₁ + r₂ = A and δ = i + e − A. [2] (b) A ray falls at 35° on one face of a prism of refracting angle 50° made of glass with n = 1.55. Find r₁, r₂, the angle of emergence and the angle of deviation. [2] (c) Find the least angle of incidence on the same prism for which light emerges from the second face. [1]',
  model: r`(a) The ray enters at Q (incidence $i$, refraction $r_1$), crosses to R (incidence $r_2$) and leaves at $e$, bent towards the base. The normals at Q and R meet at N; the quadrilateral formed with the refracting edge has right angles at Q and R, so $\angle QNR = 180^\circ - A$, and triangle QNR gives $r_1 + r_2 = A$. The turns $(i - r_1)$ and $(e - r_2)$ add to the deviation: $\delta = i + e - A$.

(b) $\sin r_1 = \dfrac{\sin 35^\circ}{1.55} = ${dec(sinD(35) / 1.55, 4)}$, $r_1 = ${dec(dl.r1, 3)}^\circ$; $r_2 = 50^\circ - r_1 = ${dec(dl.r2, 3)}^\circ$; $\sin e = 1.55 \times \sin ${dec(dl.r2, 3)}^\circ = ${dec(1.55 * sinD(dl.r2), 4)}$, $e = ${dec(dl.e, 3)}^\circ$; $\delta = 35^\circ + ${dec(dl.e, 3)}^\circ - 50^\circ = ${dec(dl.d, 3)}^\circ$.

(c) $C = \sin^{-1}\dfrac{1}{1.55} = ${dec(critical(1.55), 3)}^\circ$; grazing emergence needs $r_1 = 50^\circ - C = ${dec(50 - critical(1.55), 3)}^\circ$: $\sin i = 1.55\sin ${dec(50 - critical(1.55), 3)}^\circ = ${dec(sinD(dl.ig), 3)}$, $i = ${dec(dl.ig, 3)}^\circ$.`,
  sol: 'Geometry, then Snell’s law at each face; grazing emergence at r₂ = C.',
  scheme: [['Ray path with normals; r₁ + r₂ = A', 1], ['δ = i + e − A', 1], ['r₁ ≈ 21.7°, r₂ ≈ 28.3°', 1], ['e ≈ 47.3°, δ ≈ 32.3°', 1], ['Least i ≈ 15.3°', 1]],
  d: 3, c: 'application', t: [1], wl: null,
}), () => near(dl.r1, 21.72, 0.001) && near(dl.e, 47.26, 0.001) && near(dl.d, 32.26, 0.001) && near(dl.ig, 15.33, 0.002) || `dl ${dl.d}`);

// ================================================================ t02 minimum deviation
add('inside-mcq', mcq({
  stem: 'A spectrometer prism is equilateral. When it is set for minimum deviation, the ray inside the prism makes an angle with the normal to each refracting face of',
  right: '30°',
  wrong: ['60°', '0°', 'the same value as the angle of incidence'],
  sol: r`At minimum deviation $r_1 = r_2$ and $r_1 + r_2 = A$, so each is $A/2 = 30^\circ$ — option (@K).`,
  d: 1, c: 'understanding', t: [2],
}));
const d45 = minDev(45, 1.6);
const d60 = minDev(60, 1.6);
add('density-mcq', mcq({
  stem: 'A jeweller cuts two prisms from the same block of glass (n = 1.60), one with a refracting angle of 45° and the other of 60°. Their angles of minimum deviation are about',
  right: `${dec(d45.dm, 3)}° and ${dec(d60.dm, 3)}°`,
  wrong: [`${dec(d60.dm, 3)}° and ${dec(d45.dm, 3)}°`, '27.0° and 36.0°', `${dec(d45.dm, 3)}° and ${dec(2 * d45.dm, 3)}°`],
  sol: r`$\sin\frac{A + \delta_m}{2} = n\sin\frac{A}{2}$. For 45°: $\sin i = 1.60\sin 22.5^\circ = ${dec(1.6 * sinD(22.5), 3)}$, $i = ${dec(d45.i, 3)}^\circ$, $\delta_m = 2i - A = ${dec(d45.dm, 3)}^\circ$. For 60°: $\sin i = 0.800$, $i = ${dec(d60.i, 3)}^\circ$, $\delta_m = ${dec(d60.dm, 3)}^\circ$. (27.0° and 36.0° wrongly use the thin-prism formula.) — option (@K).`,
  d: 3, c: 'analysis', t: [2],
}), () => near(d45.dm, 30.51, 0.001) && near(d60.dm, 46.26, 0.001) || 'dens');
const lq = minDev(60, 1.55 / 1.33);
add('liquid-mcq', mcq({
  stem: 'An equilateral prism of glass with n = 1.55 has a minimum deviation of about 41.6° in air. When the prism is completely immersed in water (n = 1.33), its minimum deviation becomes about',
  right: `${dec(lq.dm, 3)}°`,
  wrong: ['41.6°', '55.3°', '0°'],
  sol: r`In water use the relative index $\dfrac{1.55}{1.33} = ${dec(1.55 / 1.33, 4)}$: $\sin i = ${dec(1.55 / 1.33, 4)} \times \sin 30^\circ = ${dec(1.55 / 1.33 / 2, 4)}$, $i = ${dec(lq.i, 3)}^\circ$, so $\delta_m = 2i - 60^\circ = ${dec(lq.dm, 3)}^\circ$ — option (@K).`,
  d: 3, c: 'application', t: [2],
}), () => near(minDev(60, 1.55).dm, 41.61, 0.001) && near(lq.dm, 11.28, 0.002) || `lq ${lq.dm}`);
add('spectro-mcq', mcq({
  stem: 'A prism on a spectrometer table is set exactly at minimum deviation. If the table is now turned slightly, first one way and then the other, the image of the slit seen in the telescope',
  right: 'moves away from the undeviated direction for either sense of rotation',
  wrong: ['moves towards the undeviated direction for either sense of rotation', 'moves one way for one sense of rotation and the opposite way for the other', 'disappears, because the light is totally reflected inside the prism'],
  sol: 'At minimum deviation any change of the angle of incidence, larger or smaller, increases the deviation, so the image moves away from the straight-through direction either way — option (@K).',
  d: 2, c: 'understanding', t: [2],
}), () => prismRay(60, 1.52, 51).d > minDev(60, 1.52).dm && prismRay(60, 1.52, 48).d > minDev(60, 1.52).dm || 'spec');
add('spectro-fill', fill({
  stem: 'While turning the table of a spectrometer, a student sees the image of the slit move towards the straight-through direction, stop and then move back. At the turning point the prism is set for ___ deviation.',
  acc: [['minimum', 'least', 'the minimum']],
  sol: 'The turning point is the position of **minimum** deviation, where i = e.',
  d: 1, c: 'understanding', t: [2],
}));
add('water-tf', tf({
  stem: 'An equilateral glass prism produces a smaller angle of minimum deviation when it is immersed in water than when it is in air.',
  key: 't',
  sol: 'True. In water the relevant index is that of glass relative to water, n_g/n_w, which is smaller than n_g, and a smaller relative index gives a smaller δm.',
  d: 2, c: 'understanding', t: [2],
}), () => minDev(60, 1.52 / 1.33).dm < minDev(60, 1.52).dm || 'wtf');
add('symm-ar', ar({
  a: 'When an equilateral glass prism is set for minimum deviation, the ray inside it runs parallel to the face opposite the refracting edge.',
  r: 'For a prism of given refracting angle, the angle of minimum deviation is larger when the refractive index of the prism is larger.',
  key: 'b',
  sol: 'Both are true, but R does not explain A. A follows from the symmetric path: i = e gives r₁ = r₂ = 30°, so the ray makes equal angles with both faces and is parallel to the base. R is a separate fact from n = sin((A + δm)/2)/sin(A/2) — option (b).',
  d: 2, c: 'understanding', t: [2],
}), () => minDev(60, 1.7).dm > minDev(60, 1.5).dm || 'symm');
const mn = nFromMin(60, 46);
add('mindev-num', num({
  stem: 'A prism of refracting angle 60° gives an angle of minimum deviation of 46° for sodium light. Find the refractive index of the prism (3 significant figures).',
  value: Number(dec(mn, 3)), tol: 0.01, unit: null,
  sol: r`$n = \dfrac{\sin\frac{60^\circ + 46^\circ}{2}}{\sin 30^\circ} = \dfrac{\sin 53^\circ}{0.5} = \dfrac{${dec(sinD(53), 4)}}{0.5} = ${dec(mn, 3)}$.`,
  scheme: [['n = sin 53°/sin 30° ≈ 1.60', 1]],
  d: 2, c: 'understanding', t: [2],
}), (q) => near(mn, 1.5973, 0.001) && q.answer.value === 1.6 || `mn ${mn}`);
const m70 = minDev(70, 1.48);
add('dm70-num', num({
  stem: 'A prism of refracting angle 70° is made of glass with n = 1.48. Find its angle of minimum deviation, in degrees.',
  value: Number(dec(m70.dm, 3)), tol: 0.2, unit: '°',
  sol: r`At minimum deviation $r = A/2 = 35^\circ$, so $\sin i = 1.48 \times \sin 35^\circ = 1.48 \times 0.5736 = ${dec(1.48 * sinD(35), 4)}$ and $i = ${dec(m70.i, 4)}^\circ$.
$\delta_m = 2i - A$: $2 \times ${dec(m70.i, 4)} - 70 = ${dec(m70.dm, 3)}$ degrees.`,
  scheme: [['r = 35°; sin i ≈ 0.849, i ≈ 58.1°', 1], ['δm = 2i − A ≈ 46.2°', 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near(m70.dm, 46.18, 0.001) && q.answer.value === 46.2 || `m70 ${m70.dm}`);
const hw = nFromMin(60, 35);
add('hollow-num', num({
  stem: 'A hollow prism with thin glass walls and a refracting angle of 60° is filled with glycerine and set on a spectrometer. The angle of minimum deviation is 35.0°. Find the refractive index of glycerine (3 significant figures).',
  value: Number(dec(hw, 3)), tol: 0.01, unit: null,
  sol: r`The thin parallel-sided walls do not deviate the light, so the glycerine acts as the prism. $n = \dfrac{\sin\frac{60^\circ + 35^\circ}{2}}{\sin 30^\circ} = \dfrac{\sin 47.5^\circ}{0.5} = \dfrac{${dec(sinD(47.5), 4)}}{0.5} = ${dec(hw, 3)}$.`,
  scheme: [['Walls do not deviate; (A + δm)/2 = 47.5°', 1], ['n ≈ 1.47', 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near(hw, 1.4746, 0.001) && q.answer.value === 1.47 || `hw ${hw}`);
const eq = 2 * Math.cos(rad(25));
add('equal-num', num({
  stem: 'A prism of refracting angle 50° is found to have an angle of minimum deviation exactly equal to its refracting angle. Find the refractive index of its material (3 significant figures).',
  value: Number(dec(eq, 3)), tol: 0.01, unit: null,
  sol: r`With $\delta_m = A$: $n = \dfrac{\sin A}{\sin(A/2)} = \dfrac{2\sin(A/2)\cos(A/2)}{\sin(A/2)} = 2\cos(A/2)$, so $n = 2\cos 25^\circ = 2 \times ${dec(Math.cos(rad(25)), 4)} = ${dec(eq, 3)}$.`,
  scheme: [['n = sin A / sin(A/2) = 2 cos(A/2)', 1], ['n ≈ 1.81', 1]],
  marks: 2, d: 3, c: 'analysis', t: [2],
}), (q) => near(minDev(50, eq).dm, 50, 1e-9) && q.answer.value === 1.81 || 'eq');
const rf = sinD(52) / sinD(30);
add('refr-num', num({
  stem: 'For an equilateral prism set for minimum deviation, the angle of incidence is measured as 52°. Find the refractive index of the prism (3 significant figures).',
  value: Number(dec(rf, 3)), tol: 0.01, unit: null,
  sol: r`At minimum deviation $r = A/2 = 30^\circ$, so $n = \dfrac{\sin 52^\circ}{\sin 30^\circ} = \dfrac{${dec(sinD(52), 4)}}{0.5} = ${dec(rf, 3)}$.`,
  scheme: [['r = 30°; n = sin 52°/sin 30° ≈ 1.58', 1]],
  d: 2, c: 'understanding', t: [2],
}), (q) => near(rf, 1.576, 0.001) && q.answer.value === 1.58 || 'rf');
add('measure-short2', short({
  marks: 2,
  stem: 'In the laboratory the refractive index of a prism is always found from its angle of minimum deviation, not from the deviation at some other setting. Give two reasons why this is the better choice.',
  model: 'First, near the minimum the deviation changes **very slowly** with the angle of incidence, so a small error in setting the table hardly affects δm; the reading is precise. Second, the position is **easy to find** (the image stops and turns back), and only A and δm are needed in **n = sin((A + δm)/2)/sin(A/2)**, without measuring i or e.',
  sol: 'Flat minimum; easily located; formula needs only A and δm.',
  scheme: [['δ is stationary near the minimum: small setting errors matter little', 1], ['Easily located and only A and δm need be measured', 1]],
  d: 3, c: 'evaluation', t: [2],
}), () => Math.abs(prismRay(60, 1.52, 50.5).d - minDev(60, 1.52).dm) < 0.05 && Math.abs(prismRay(60, 1.52, 31).d - prismRay(60, 1.52, 30).d) > 1 || 'meas');
add('prismwater-short2', short({
  marks: 2,
  stem: 'A glass prism (n = 1.62) is moved from air into a tank of water (n = 1.33). Explain, using the idea of relative refractive index, how its angle of minimum deviation changes. What would happen in a liquid of refractive index 1.62?',
  model: 'Bending at each face depends on the index of glass **relative to the surroundings**: 1.62 in air but only 1.62/1.33 = 1.22 in water. A smaller relative index gives a smaller δm, so the minimum deviation **decreases** (from about 48° to about 15°). In a liquid of index 1.62 there is no refraction at all: the deviation is **zero**.',
  sol: 'Relative index n/n_w smaller, so δm smaller; zero when equal.',
  scheme: [['Relative index 1.62/1.33 ≈ 1.22 replaces 1.62: δm decreases', 1], ['Equal indices: no bending, δ = 0', 1]],
  d: 3, c: 'analysis', t: [2], wl: null,
}), () => near(minDev(60, 1.62).dm, 48.19, 0.001) && near(minDev(60, 1.62 / 1.33).dm, 15.04, 0.002) || 'pw');
add('deriv-short3', short({
  marks: 3,
  stem: 'State the conditions for minimum deviation of a ray through a prism, and derive the relation n = sin((A + δm)/2) / sin(A/2).',
  model: r`At minimum deviation the ray passes **symmetrically**: $i = e$, and therefore $r_1 = r_2 = r$ (in an isosceles prism the ray inside is parallel to the base).
From $r_1 + r_2 = A$: $2r = A$, so $r = \dfrac{A}{2}$. From $\delta = i + e - A$ with $\delta = \delta_m$: $\delta_m = 2i - A$, so $i = \dfrac{A + \delta_m}{2}$.
Snell’s law at the first face, $n = \dfrac{\sin i}{\sin r}$, gives $n = \dfrac{\sin\left(\frac{A + \delta_m}{2}\right)}{\sin\left(\frac{A}{2}\right)}$.`,
  sol: 'i = e, r = A/2, i = (A + δm)/2, Snell.',
  scheme: [['Conditions: i = e, r₁ = r₂', 1], ['r = A/2 and i = (A + δm)/2', 1], ['Snell’s law gives the formula', 1]],
  d: 2, c: 'understanding', t: [2], wl: null,
}));
const id = { A: 72, i: 56 };
id.n = sinD(id.i) / sinD(id.A / 2);
id.dm = 2 * id.i - id.A;
id.C = critical(id.n);
add('idm-short3', short({
  marks: 3,
  stem: 'When a prism of refracting angle 72° is set for minimum deviation, the angle of incidence is 56°. Find (i) the refractive index of the prism, (ii) the angle of minimum deviation. (iii) Could light pass through two faces of a 95° prism made of the same material? Justify.',
  model: r`(i) At minimum deviation $r = A/2 = 36^\circ$: $n = \dfrac{\sin 56^\circ}{\sin 36^\circ} = \dfrac{${dec(sinD(56), 4)}}{${dec(sinD(36), 4)}} = ${dec(id.n, 3)}$.
(ii) $\delta_m = 2i - A = 112^\circ - 72^\circ = ${id.dm}^\circ$.
(iii) $\sin C = \dfrac{1}{${dec(id.n, 3)}}$, $C = ${dec(id.C, 3)}^\circ$, so $2C = ${dec(2 * id.C, 3)}^\circ < 95^\circ$: **no**, every ray would be totally reflected at the second face.`,
  sol: 'r = A/2; δm = 2i − A; compare A with 2C.',
  scheme: [['n = sin 56°/sin 36° ≈ 1.41', 1], ['δm = 40°', 1], ['C ≈ 45.2°, 2C ≈ 90.3° < 95°: no emergence', 1]],
  d: 4, c: 'analysis', t: [2, 1], wl: null,
}), () => near(id.n, 1.4104, 0.001) && id.dm === 40 && 2 * id.C < 95 && 2 * id.C > 90 && near(minDev(72, id.n).i, 56, 1e-9) || 'id');
const lp = { A: 60, dm: 15, ng: 1.62 };
lp.rel = nFromMin(lp.A, lp.dm);
lp.nl = lp.ng / lp.rel;
add('liquidprism-short3', short({
  marks: 3,
  stem: 'An equilateral prism of glass (n = 1.62) is immersed in a transparent liquid, and its angle of minimum deviation is then found to be 15.0°. Find the refractive index of the glass relative to the liquid, and the refractive index of the liquid. Which common liquid could it be?',
  model: r`In the liquid the prism formula gives the **relative** index: $\dfrac{n_g}{n_l} = \dfrac{\sin\frac{60^\circ + 15^\circ}{2}}{\sin 30^\circ} = \dfrac{\sin 37.5^\circ}{0.5} = \dfrac{${dec(sinD(37.5), 4)}}{0.5} = ${dec(lp.rel, 4)}$.
Then $n_l = \dfrac{1.62}{${dec(lp.rel, 4)}} = ${dec(lp.nl, 3)}$.
An index of about 1.33 suggests **water**.`,
  sol: 'Prism formula gives n_g/n_l; divide.',
  scheme: [['Formula gives the relative index n_g/n_l', 1], ['n_g/n_l ≈ 1.22', 1], ['n_l ≈ 1.33: water', 1]],
  d: 3, c: 'analysis', t: [2], wl: null,
}), () => near(lp.rel, 1.2175, 0.001) && near(lp.nl, 1.3306, 0.001) && near(minDev(60, 1.62 / lp.nl).dm, 15, 1e-9) || `lp ${lp.nl}`);
const ml = minDev(60, 1.62);
add('mindev-long', long({
  stem: '(a) With the help of a ray diagram (described in words), state the conditions for minimum deviation of a ray through a prism of refracting angle A, and derive n = sin((A + δm)/2) / sin(A/2), starting from r₁ + r₂ = A and δ = i + e − A. [3] (b) An equilateral prism is made of glass with n = 1.62. Find the angle of incidence at which minimum deviation occurs, and the angle of minimum deviation. [2]',
  model: r`(a) At minimum deviation the ray passes symmetrically through the prism: it makes equal angles with the two faces, so $i = e$ and $r_1 = r_2 = r$; in an equilateral prism the ray inside runs parallel to the base. Then $r_1 + r_2 = A$ gives $r = \dfrac{A}{2}$, and $\delta = i + e - A$ gives $\delta_m = 2i - A$, i.e. $i = \dfrac{A + \delta_m}{2}$. Snell’s law at the first face: $n = \dfrac{\sin i}{\sin r} = \dfrac{\sin\left(\frac{A + \delta_m}{2}\right)}{\sin\left(\frac{A}{2}\right)}$.

(b) $r = 30^\circ$: $\sin i = 1.62 \times \sin 30^\circ = 0.81$, so $i = ${dec(ml.i, 3)}^\circ$; $\delta_m = 2i - A = 2 \times ${dec(ml.i, 4)}^\circ - 60^\circ = ${dec(ml.dm, 3)}^\circ$.`,
  sol: 'Symmetric path; r = A/2; i = (A + δm)/2; then sin i = n sin 30°.',
  scheme: [['Conditions i = e, r₁ = r₂; ray parallel to the base', 1], ['r = A/2 and i = (A + δm)/2', 1], ['n = sin((A + δm)/2)/sin(A/2)', 1], ['i ≈ 54.1°', 1], ['δm ≈ 48.2°', 1]],
  d: 3, c: 'application', t: [2], wl: null,
}), () => near(ml.i, 54.096, 0.001) && near(ml.dm, 48.19, 0.001) || `ml ${ml.dm}`);
const ll = { A: 60, n: 1.45 };
ll.C = critical(ll.n);
ll.ig = iGrazing(ll.A, ll.n);
ll.m = minDev(ll.A, ll.n);
add('limits-long', long({
  stem: '(a) What is meant by grazing emergence from a prism? Show that light cannot pass through a prism at all if its refracting angle exceeds twice the critical angle of its material. [2] (b) A 60° prism is made of fused silica (n = 1.45). Find the critical angle, and the least angle of incidence for which light emerges from the second face. [2] (c) Find the angle of minimum deviation of this prism. [1]',
  model: r`(a) In grazing emergence the ray leaves the second face along the face ($e = 90^\circ$); it meets that face at the critical angle, $r_2 = C$. Since light enters from air, $r_1 \le C$, so $r_2 = A - r_1 \ge A - C$. If $A > 2C$ then $r_2 > C$ for every ray, which is totally reflected: nothing emerges.

(b) $\sin C = \dfrac{1}{1.45}$, so $C = ${dec(ll.C, 3)}^\circ$. Grazing emergence: $r_1 = 60^\circ - C = ${dec(60 - ll.C, 3)}^\circ$, $\sin i = 1.45 \times \sin ${dec(60 - ll.C, 3)}^\circ = ${dec(sinD(ll.ig), 3)}$, so $i = ${dec(ll.ig, 3)}^\circ$.

(c) $\sin i = 1.45 \times \sin 30^\circ = 0.725$, $i = ${dec(ll.m.i, 3)}^\circ$, $\delta_m = 2i - 60^\circ = ${dec(ll.m.dm, 3)}^\circ$.`,
  sol: 'r₂ = C at grazing emergence; A > 2C traps every ray; then the numbers.',
  scheme: [['Grazing emergence: e = 90°, r₂ = C', 1], ['r₁ ≤ C, so r₂ ≥ A − C > C if A > 2C', 1], ['C ≈ 43.6°', 1], ['Least i ≈ 24.2°', 1], ['δm ≈ 32.9°', 1]],
  d: 4, c: 'analysis', t: [1, 2], wl: null,
}), () => near(ll.C, 43.60, 0.001) && near(ll.ig, 24.16, 0.002) && near(ll.m.dm, 32.94, 0.001) && prismRay(60, 1.45, 24.0).e === null || `ll ${ll.ig}`);

// ================================================================ t03 thin prism
add('thinratio-mcq', mcq({
  stem: 'A thin prism made of plastic with n = 1.60 deviates a laser beam by 2.4°. A prism of exactly the same angle made of a glass with n = 1.80 would deviate the beam by',
  right: '3.2°',
  wrong: ['2.7°', '4.8°', '1.8°'],
  sol: r`$\delta = (n - 1)A$, so $\delta \propto (n - 1)$: $\delta' = 2.4^\circ \times \dfrac{0.80}{0.60} = 3.2^\circ$. 2.7° wrongly scales with n instead of n − 1 — option (@K).`,
  d: 3, c: 'analysis', t: [3],
}), () => near(2.4 / 0.6 * 0.8, 3.2) || 'thr');
add('thinA-mcq', mcq({
  stem: 'Which of these thin prisms deviates a nearly normal ray the most?',
  right: 'refracting angle 4.0°, n = 1.70',
  wrong: ['refracting angle 6.0°, n = 1.45', 'refracting angle 7.0°, n = 1.38', 'refracting angle 3.0°, n = 1.90'],
  sol: r`$\delta = (n - 1)A$: $0.70 \times 4.0 = 2.80^\circ$, against $0.45 \times 6.0 = 2.70^\circ$, $0.38 \times 7.0 = 2.66^\circ$ and $0.90 \times 3.0 = 2.70^\circ$ — option (@K).`,
  d: 2, c: 'application', t: [3],
}), () => 0.7 * 4 > Math.max(0.45 * 6, 0.38 * 7, 0.9 * 3) || 'tha');
add('thinliquid-tf', tf({
  stem: 'A thin glass prism placed in a liquid of exactly the same refractive index as the glass does not deviate light passing through it.',
  key: 't',
  sol: 'True. The deviation is (n_g/n_l − 1)A, which is zero when n_l = n_g: light does not bend at either face, and the prism is practically invisible.',
  d: 2, c: 'understanding', t: [3],
}));
add('thinindep-ar', ar({
  a: 'The deviation produced by a thin prism hardly changes when the angle of incidence is changed by a few degrees about normal incidence.',
  r: 'The deviation (n − 1)A of a thin prism does not depend on the material of the prism.',
  key: 'c',
  sol: 'A is true: for small angles i = n r₁ and e = n r₂, so δ = n(r₁ + r₂) − A = (n − 1)A, with no i in it. R is false: (n − 1)A depends on n, the material — option (c).',
  d: 2, c: 'understanding', t: [3],
}), () => Math.abs(prismRay(8, 1.523, 6).d - prismRay(8, 1.523, 2).d) < 0.05 || 'tind');
const tn = (1.66 - 1) * 3;
add('thin-num', num({
  stem: 'A thin prism of refracting angle 3.0° is made of dense flint glass with n = 1.66. Find the deviation it produces for a nearly normal ray, in degrees.',
  value: Number(dec(tn, 3)), tol: 0.02, unit: '°',
  sol: r`$\delta = (n - 1)A = (1.66 - 1) \times 3.0 = 0.66 \times 3.0 = ${dec(tn, 3)}$ degrees.`,
  scheme: [['δ = 0.66 × 3.0° = 1.98°', 1]],
  d: 2, c: 'understanding', t: [3],
}), (q) => near(prismRay(3, 1.66, 0).d, tn, 0.01) && q.answer.value === 1.98 || 'tn');
const twat = (1.54 / 1.4 - 1) * 7;
add('thinwater-num', num({
  stem: 'A thin prism of refracting angle 7.0° is made of glass with n = 1.54. Find the deviation it produces when it is immersed in a liquid of refractive index 1.40, in degrees.',
  value: Number(dec(twat, 2)), tol: 0.02, unit: '°',
  sol: r`In the liquid use the relative index $\dfrac{1.54}{1.40} = 1.10$: $\delta = (1.10 - 1) \times 7.0 = 0.10 \times 7.0 = ${dec(twat, 2)}$ degrees (against $0.54 \times 7.0 = 3.78$ degrees in air).`,
  scheme: [['Relative index 1.54/1.40 = 1.10', 1], ['δ = 0.10 × 7.0° = 0.70°', 1]],
  marks: 2, d: 3, c: 'analysis', t: [3],
}), (q) => near(twat, 0.7, 1e-9) && q.answer.value === 0.7 || 'twat');
const cb = (0.5 * 6.3) / 0.63;
add('combo-num', num({
  stem: 'A thin crown-glass prism (n = 1.50) of refracting angle 6.3° is placed in contact with a thin flint-glass prism (n = 1.63), with the refracting edge of one beside the base of the other. Find the refracting angle of the flint prism, in degrees, if the pair produces no net deviation.',
  value: Number(dec(cb, 2)), tol: 0.05, unit: '°',
  sol: r`The prisms deviate in opposite directions, so for zero net deviation $(n_1 - 1)A_1 = (n_2 - 1)A_2$: $0.50 \times 6.3 = 3.15$, and $A_2 = \dfrac{3.15}{0.63} = ${dec(cb, 2)}$ degrees.`,
  scheme: [['(n₁ − 1)A₁ = (n₂ − 1)A₂ for opposite prisms', 1], ['A₂ = 3.15/0.63 = 5.0°', 1]],
  marks: 2, d: 3, c: 'analysis', t: [3],
}), (q) => near(0.5 * 6.3 - 0.63 * q.answer.value, 0, 1e-9) || 'cb');
add('thinderive-short2', short({
  marks: 2,
  stem: 'Starting from r₁ + r₂ = A and δ = i + e − A, show that a thin prism of refracting angle A deviates a ray incident nearly normally by δ = (n − 1)A. State the approximation used.',
  model: r`For a thin prism and near-normal incidence all the angles are **small**, so $\sin\theta \approx \theta$ (in radians). Snell’s law at the two faces becomes $i = n r_1$ and $e = n r_2$. Then $\delta = i + e - A = n(r_1 + r_2) - A = nA - A = (n - 1)A$, independent of $i$.`,
  sol: 'Small angles: i = nr₁, e = nr₂.',
  scheme: [['Small angles: i = nr₁, e = nr₂', 1], ['δ = n(r₁ + r₂) − A = (n − 1)A', 1]],
  d: 2, c: 'understanding', t: [3], wl: null,
}));
const ts = { d: 3.12, n: 1.52, nw: 1.33 };
ts.A = ts.d / (ts.n - 1);
ts.w = (ts.n / ts.nw - 1) * ts.A;
add('thin-short3', short({
  marks: 3,
  stem: 'A thin prism of crown glass (n = 1.52) deviates a laser beam by 3.12° in air. (i) Find its refracting angle. (ii) Find the deviation when the prism is immersed in water (n = 1.33). (iii) For what refractive index of the surrounding liquid would the beam pass through undeviated?',
  model: r`(i) $\delta = (n - 1)A$: $A = \dfrac{3.12}{0.52} = ${dec(ts.A, 2)}^\circ$.
(ii) In water the relative index is $\dfrac{1.52}{1.33} = ${dec(ts.n / ts.nw, 4)}$, so $\delta = (${dec(ts.n / ts.nw, 4)} - 1) \times 6.0 = ${dec(ts.w, 3)}^\circ$.
(iii) δ = 0 when the relative index is 1, i.e. in a liquid of refractive index **1.52**, equal to that of the glass.`,
  sol: 'A = δ/(n − 1); relative index in water; zero for equal indices.',
  scheme: [['A = 6.0°', 1], ['In water δ ≈ 0.857°', 1], ['Liquid of n = 1.52', 1]],
  d: 3, c: 'application', t: [3], wl: null,
}), () => near(ts.A, 6, 1e-9) && near(ts.w, 0.857, 0.001) || `ts ${ts.w}`);
const tl = { d: 3.9, nf: 1.65, nc: 1.52, nw: 1.33 };
tl.Af = tl.d / (tl.nf - 1);
tl.Ac = tl.d / (tl.nc - 1);
tl.wf = (tl.nf / tl.nw - 1) * tl.Af;
tl.wc = (tl.nc / tl.nw - 1) * tl.Ac;
tl.net = tl.wf - tl.wc;
add('thin-long', long({
  stem: '(a) Show that a thin prism of refracting angle A and refractive index n deviates a nearly normal ray by δ = (n − 1)A. [2] (b) A thin flint-glass prism (n = 1.65) deviates light by 3.9°. Find its refracting angle. [1] (c) A thin crown-glass prism (n = 1.52) is placed against it, inverted, so that the pair gives no net deviation in air. Find the refracting angle of the crown prism. [1] (d) The pair is now immersed in water (n = 1.33). Find the net deviation and say which prism decides its direction. [1]',
  model: r`(a) For small angles $\sin\theta \approx \theta$, so Snell’s law gives $i = n r_1$ and $e = n r_2$. With $r_1 + r_2 = A$: $\delta = i + e - A = n(r_1 + r_2) - A = (n - 1)A$.

(b) $A_f = \dfrac{3.9}{0.65} = ${dec(tl.Af, 2)}^\circ$.

(c) The crown prism must deviate by 3.9° the other way: $A_c = \dfrac{3.9}{0.52} = ${dec(tl.Ac, 2)}^\circ$.

(d) In water: flint $\left(\dfrac{1.65}{1.33} - 1\right) \times 6.0 = ${dec(tl.wf, 3)}^\circ$; crown $\left(\dfrac{1.52}{1.33} - 1\right) \times 7.5 = ${dec(tl.wc, 3)}^\circ$. Net deviation $= ${dec(tl.wf, 3)} - ${dec(tl.wc, 3)} = ${dec(tl.net, 2)}$ degrees, towards the base of the **flint** prism: water reduces the crown prism’s deviation proportionally more.`,
  sol: 'δ = (n − 1)A; equal and opposite deviations in air; relative indices in water.',
  scheme: [['Small-angle Snell’s law: i = nr₁, e = nr₂', 1], ['δ = (n − 1)A', 1], ['A_f = 6.0°', 1], ['A_c = 7.5°', 1], ['Net ≈ 0.37°, towards the flint prism’s base', 1]],
  d: 4, c: 'analysis', t: [3], wl: null,
}), () => near(tl.Af, 6, 1e-9) && near(tl.Ac, 7.5, 1e-9) && near(tl.net, 0.372, 0.002) || `tl ${tl.net}`);

// ================================================================ t04 dispersion, dispersive power, rainbow
add('violet-mcq', mcq({
  stem: 'A narrow beam of sunlight passes through a glass prism in a darkened room and spreads into a band of colours on the wall, with violet deviated the most. This is because, in glass,',
  right: 'the refractive index is greatest for violet light',
  wrong: ['violet light travels faster than the other colours', 'violet light has the longest wavelength', 'violet light is partly reflected at the second face'],
  sol: 'The refractive index of glass increases as the wavelength decreases; violet, with the shortest visible wavelength, has the largest n, travels slowest in the glass and is deviated most — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('bowred-mcq', mcq({
  stem: 'After a monsoon shower a student looks at a primary rainbow over the hills and notes the colour along the outer (upper) edge of the arc. It is',
  right: 'red, because drops about 42° from the antisolar direction send red light to the eye',
  wrong: ['violet, because violet light is deviated most inside each drop', 'red, because red light is reflected twice inside each drop', 'green, because it is in the middle of the spectrum'],
  sol: `In the primary bow, light leaves each drop after one internal reflection; red emerges at about ${dec(BOW.red.phi, 2)}° and violet at about ${dec(BOW.violet.phi, 2)}° from the antisolar direction, so red comes from higher drops and is outermost — option (@K).`,
  d: 1, c: 'understanding', t: [4],
}), () => BOW.red.phi > BOW.violet.phi && near(BOW.red.phi, 42.4, 0.01) || 'bow');
add('evening-mcq', mcq({
  stem: 'At about half past five on a monsoon evening in Pune, the sun is low in the western sky when a shower ends. To see a rainbow, an observer should look',
  right: 'towards the east, with the sun behind',
  wrong: ['towards the west, towards the sun', 'straight overhead', 'towards the north'],
  sol: 'A rainbow is centred on the antisolar point, so it is seen only with the sun behind the observer: with the sun in the west, the bow appears in the east — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('flintcrown-mcq', mcq({
  stem: 'Two thin prisms of the same refracting angle are made of crown glass (n = 1.514 for red, 1.523 for yellow, 1.532 for violet) and flint glass (1.642, 1.655, 1.668). Which has the larger dispersive power?',
  right: 'the flint prism: about 0.040 against 0.034',
  wrong: ['the crown prism, because its refractive index is smaller', 'neither: the prisms have the same angle, so their dispersive powers are equal', 'the crown prism: about 0.040 against 0.034'],
  sol: r`$\omega = \dfrac{n_v - n_r}{n - 1}$: crown $\dfrac{0.018}{0.523} = ${dec(0.018 / 0.523, 3)}$; flint $\dfrac{0.026}{0.655} = ${dec(0.026 / 0.655, 3)}$. It depends on the material, not on A — option (@K).`,
  d: 2, c: 'application', t: [4],
}), () => 0.026 / 0.655 > 0.018 / 0.523 || 'fc');
add('newton-mcq', mcq({
  stem: 'Sunlight dispersed by a glass prism falls on a second, identical prism placed close to it and turned upside down. The light leaving the second prism',
  right: 'travels parallel to the original beam, and is white where the colours overlap',
  wrong: ['is spread into a spectrum twice as wide', 'is only red, because the other colours are absorbed', 'is white but deviated through twice the angle'],
  sol: 'The inverted prism bends each colour back by the same angle the first prism bent it, so all colours leave parallel to the original beam and recombine: the prism separates colours already present in white light — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('secondary-tf', tf({
  stem: 'In a secondary rainbow, formed by two internal reflections inside the raindrops, the colours appear in the same order as in the primary bow, with red on the outside.',
  key: 'f',
  sol: `False. The extra reflection reverses the order: the secondary bow (about ${dec(BOW.red2, 2)}° for red to ${dec(BOW.violet2, 2)}° for violet) has violet on the outside and red on the inside, and it is fainter.`,
  d: 2, c: 'understanding', t: [4],
}), () => BOW.violet2 > BOW.red2 && BOW.red2 > BOW.red.phi || 'sec');
add('omega-fill', fill({
  stem: 'For a thin prism, the dispersive power of its glass is the angular dispersion between violet and red light divided by the ___ deviation, the deviation of yellow light.',
  acc: [['mean', 'average']],
  sol: 'ω = (δᵥ − δᵣ)/δ, where δ = (n − 1)A is the **mean** deviation, for yellow light.',
  d: 1, c: 'recall', t: [4],
}));
add('omega-ar', ar({
  a: 'Doubling the refracting angle of a thin prism doubles the dispersive power of the prism.',
  r: 'Doubling the refracting angle of a thin prism doubles its angular dispersion (n_v − n_r)A.',
  key: 'd',
  sol: 'A is false: ω = (n_v − n_r)A / ((n − 1)A) = (n_v − n_r)/(n − 1), so A cancels; doubling A doubles both the angular dispersion and the mean deviation. R is true — option (d).',
  d: 3, c: 'analysis', t: [4],
}));
add('redsky-ar', ar({
  a: 'In a primary rainbow, red appears on the outer edge of the arc and violet on the inner edge.',
  r: 'Red light leaving a raindrop after one internal reflection is concentrated at a larger angle (about 42°) from the antisolar direction than violet light (about 40°).',
  key: 'a',
  sol: 'Both are true and R explains A: drops 42° from the antisolar direction, higher in the sky, send red to the eye, while those at 40°, lower, send violet — option (a).',
  d: 2, c: 'understanding', t: [4],
}));
add('disp-match', match({
  stem: 'Match each quantity for a thin glass prism of refracting angle A in Column A with its expression in Column B (n_v, n_r: indices for violet and red; n: mean index).',
  pairs: [
    ['Deviation of violet light', '(n_v − 1)A'],
    ['Mean deviation', '(n − 1)A'],
    ['Angular dispersion', '(n_v − n_r)A'],
    ['Dispersive power', '(n_v − n_r)/(n − 1)'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Violet: (n_v − 1)A (1 → q). Mean deviation: (n − 1)A (2 → s). Angular dispersion: the difference of the two deviations, (n_v − n_r)A (3 → p). Dispersive power: angular dispersion over mean deviation, (n_v − n_r)/(n − 1) (4 → r).',
  d: 2, c: 'understanding', t: [4],
}));
const om = 0.02 / 0.646;
add('omega-num', num({
  stem: 'A glass has refractive indices 1.636 for red light, 1.646 for yellow light and 1.656 for violet light. Find its dispersive power (2 significant figures).',
  value: Number(dec(om, 2)), tol: 0.001, unit: null,
  sol: r`$\omega = \dfrac{n_v - n_r}{n - 1} = \dfrac{1.656 - 1.636}{1.646 - 1} = \dfrac{0.020}{0.646} = ${dec(om, 3)}$, i.e. about ${dec(om, 2)}.`,
  scheme: [['ω = 0.020/0.646 ≈ 0.031', 1]],
  d: 2, c: 'understanding', t: [4],
}), (q) => near(om, 0.03096, 0.001) && q.answer.value === 0.031 || 'om');
const ad = (1.668 - 1.642) * 7.5;
add('angdisp-num', num({
  stem: 'A thin flint-glass prism of refracting angle 7.5° has refractive indices 1.642 for red light and 1.668 for violet light. Find the angular dispersion it produces, in degrees.',
  value: Number(dec(ad, 3)), tol: 0.002, unit: '°',
  sol: r`$\theta = (n_v - n_r)A = (1.668 - 1.642) \times 7.5 = 0.026 \times 7.5 = ${dec(ad, 3)}$ degrees.`,
  scheme: [['θ = 0.026 × 7.5° = 0.195°', 1]],
  d: 2, c: 'understanding', t: [4],
}), (q) => near(ad, 0.195) && q.answer.value === 0.195 || 'ad');
const spw = { A: 10, dn: 0.018, L: 1500 };
spw.th = spw.dn * spw.A;
spw.w = spw.L * rad(spw.th);
add('spectrum-num', num({
  stem: 'A thin crown-glass prism of refracting angle 10° (n = 1.514 for red, 1.532 for violet) is lit by a narrow beam of white light. Find the width of the spectrum, from red to violet, formed on a screen 1.5 m from the prism, in mm.',
  value: Number(dec(spw.w, 2)), tol: 0.1, unit: 'mm',
  sol: r`Angular dispersion $\theta = (1.532 - 1.514) \times 10 = 0.18$ degrees $= 0.18 \times \dfrac{\pi}{180} = ${dec(rad(spw.th), 3)}$ rad. Width $\approx L\theta = 1500 \times ${dec(rad(spw.th), 4)} = ${dec(spw.w, 2)}$ mm.`,
  scheme: [['θ = 0.18° = 3.14 × 10⁻³ rad', 1], ['Width = Lθ ≈ 4.7 mm', 1]],
  marks: 2, d: 3, c: 'application', t: [4],
}), (q) => near(spw.w, 4.712, 0.001) && near(1500 * Math.tan(rad(spw.th)), spw.w, 0.001) && q.answer.value === 4.7 || `spw ${spw.w}`);
const spd = { c: 3e8, nr: 1.514, nv: 1.532 };
spd.vr = spd.c / spd.nr;
spd.vv = spd.c / spd.nv;
spd.diff = (spd.vr - spd.vv) / 1e6;
add('speed-num', num({
  stem: 'In a crown glass the refractive index is 1.514 for red light and 1.532 for violet light. By how much does the speed of red light in the glass exceed that of violet light? Take c = 3.0 × 10⁸ m s⁻¹ and give the answer in units of 10⁶ m s⁻¹.',
  value: Number(dec(spd.diff, 3)), tol: 0.03, unit: '× 10⁶ m s⁻¹',
  sol: r`$v = \dfrac{c}{n}$: $v_r = \dfrac{3.0 \times 10^{8}}{1.514} = ${dec(spd.vr / 1e8, 4)} \times 10^{8}$ m s$^{-1}$ and $v_v = \dfrac{3.0 \times 10^{8}}{1.532} = ${dec(spd.vv / 1e8, 4)} \times 10^{8}$ m s$^{-1}$. Difference: $3.0 \times 10^{8} \times \left(\dfrac{1}{1.514} - \dfrac{1}{1.532}\right) = ${dec(spd.diff, 3)} \times 10^{6}$ m s$^{-1}$; in units of 10⁶ m s⁻¹, $\dfrac{${dec(spd.diff, 3)} \times 10^{6}}{10^{6}} = ${dec(spd.diff, 3)}$.`,
  scheme: [['v = c/n for each colour', 1], ['Difference ≈ 2.33 × 10⁶ m s⁻¹', 1]],
  marks: 2, d: 2, c: 'application', t: [4],
}), (q) => near(spd.diff, 2.328, 0.002) && q.answer.value === 2.33 || `spd ${spd.diff}`);
add('drop-short2', short({
  marks: 2,
  stem: 'Name, in order, the three things that happen to a ray of sunlight inside a raindrop that contributes to the primary rainbow, and say at which of them the colours separate.',
  model: 'The ray is (1) **refracted** as it enters the drop, (2) **reflected once** from the back surface inside the drop, and (3) **refracted** again as it leaves. The colours separate at the **refractions**, mainly on entry, because water has a larger refractive index for violet than for red.',
  sol: 'Refraction, one internal reflection, refraction; dispersion at refraction.',
  scheme: [['Refraction – one internal reflection – refraction', 1], ['Colours separate at refraction (n depends on colour)', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('noon-short2', short({
  marks: 2,
  stem: 'Explain why a primary rainbow is never seen around noon on a summer day in Chennai, even when it rains, though it is often seen in the early morning or late afternoon.',
  model: 'The bow lies about **42°** from the antisolar direction, which is as far **below** the horizon as the sun is above it. Its top is therefore (42° − sun’s elevation) above the horizon. Near noon in summer the sun is much higher than 42°, so the whole bow lies **below the horizon**; with a low sun it is visible.',
  sol: 'Top of the bow at 42° minus the sun’s elevation.',
  scheme: [['Bow centred on the antisolar point, at about 42° from it', 1], ['Sun higher than 42°: whole bow below the horizon', 1]],
  d: 3, c: 'analysis', t: [4],
}), () => BOW.red.phi < 45 || 'noon');
add('slabprism-short2', short({
  marks: 2,
  stem: 'White light falling obliquely on a parallel-sided glass slab is dispersed inside it, yet no spectrum is seen when it comes out. A prism does give a spectrum. Explain the difference.',
  model: 'In the slab each colour bends at the first face by a different amount, but at the **parallel** second face it bends back by exactly the same amount, so every colour leaves **parallel** to the incident ray and the colours overlap again as white. A prism’s faces are **inclined**, so the two deviations **add** and colours leave in different directions.',
  sol: 'Parallel faces undo the dispersion; inclined faces add it.',
  scheme: [['Slab: parallel faces, every colour emerges parallel to the incident light: overlap, white', 1], ['Prism: inclined faces, deviations add, colours diverge', 1]],
  d: 3, c: 'analysis', t: [4],
}));
const fs = { A: 4, nr: 1.642, nv: 1.668 };
fs.ny = (fs.nr + fs.nv) / 2;
fs.th = (fs.nv - fs.nr) * fs.A;
fs.d = (fs.ny - 1) * fs.A;
fs.w = fs.th / fs.d;
add('disp-short3', short({
  marks: 3,
  stem: 'A thin flint-glass prism of refracting angle 4.0° has refractive indices 1.642 for red and 1.668 for violet light. Taking the mean index as the average of these, find (i) the angular dispersion, (ii) the mean deviation, (iii) the dispersive power of flint glass.',
  model: r`(i) $\theta = (n_v - n_r)A = (1.668 - 1.642) \times 4.0 = ${dec(fs.th, 3)}^\circ$.
(ii) Mean index $n = \dfrac{1.642 + 1.668}{2} = ${dec(fs.ny, 4)}$, so $\delta = (n - 1)A = 0.655 \times 4.0 = ${dec(fs.d, 3)}^\circ$.
(iii) $\omega = \dfrac{\theta}{\delta} = \dfrac{0.104}{2.62} = ${dec(fs.w, 3)}$ (the same as $\dfrac{0.026}{0.655}$, independent of A).`,
  sol: 'θ = (n_v − n_r)A; δ = (n − 1)A; ω = θ/δ.',
  scheme: [['θ = 0.104°', 1], ['δ = 2.62°', 1], ['ω ≈ 0.0397', 1]],
  d: 3, c: 'application', t: [4], wl: null,
}), () => near(fs.th, 0.104) && near(fs.d, 2.62) && near(fs.w, 0.0397, 0.002) || `fs ${fs.w}`);
add('rainbow-short3', short({
  marks: 3,
  stem: 'With a ray diagram described in words, explain how a primary rainbow is formed, and why red appears on its outer edge. (The derivation of the rainbow angle is not required.)',
  model: 'With the sun **behind** the observer, sunlight enters a raindrop and is **refracted**, splitting into colours because water’s refractive index is larger for violet. Each colour is **reflected once** from the back of the drop and **refracted** out towards the observer. Emerging rays bunch at about **42°** (red) and **40°** (violet) from the antisolar direction, so those directions are bright. Drops 42° from that direction, which are **higher**, send red to the eye; lower drops at 40° send violet. So red forms the **outer** edge and violet the inner; all such drops lie on a cone, giving a circular arc.',
  sol: 'Refraction with dispersion, one reflection, refraction; red at 42°, violet at 40°.',
  scheme: [['Sun behind; refraction with dispersion at entry', 1], ['One internal reflection, refraction out; red ≈ 42°, violet ≈ 40° from the antisolar direction', 1], ['Higher drops send red: red outside; arc of a circle (cone)', 1]],
  d: 2, c: 'understanding', t: [4], wl: null,
}));
const rv = { A: 60, nr: 1.62, nv: 1.66 };
rv.r = minDev(rv.A, rv.nr);
rv.v = minDev(rv.A, rv.nv);
add('redviolet-short3', short({
  marks: 3,
  stem: 'An equilateral prism of dense flint glass has refractive indices 1.62 for red light and 1.66 for violet light. Find the angle of minimum deviation for red light and for violet light, and say which colour the prism deviates more and why.',
  model: r`At minimum deviation $r = 30^\circ$, so $\sin i = n\sin 30^\circ = n/2$ and $\delta_m = 2i - 60^\circ$.
Red: $\sin i = 0.81$, $i = ${dec(rv.r.i, 3)}^\circ$, $\delta_m = ${dec(rv.r.dm, 3)}^\circ$.
Violet: $\sin i = 0.83$, $i = ${dec(rv.v.i, 3)}^\circ$, $\delta_m = ${dec(rv.v.dm, 3)}^\circ$.
Violet is deviated more, because the refractive index of the glass is larger for violet light (shorter wavelength): this is dispersion.`,
  sol: 'sin i = n/2, δm = 2i − 60° for each colour.',
  scheme: [['Red: i ≈ 54.1°, δm ≈ 48.2°', 1], ['Violet: i ≈ 56.1°, δm ≈ 52.2°', 1], ['Violet more: larger n', 1]],
  d: 3, c: 'application', t: [4], wl: null,
}), () => near(rv.r.dm, 48.19, 0.001) && near(rv.v.dm, 52.2, 0.001) || `rv ${rv.v.dm}`);
const dg = { A: 9, nr: 1.565, nv: 1.585, n: 1.575 };
dg.th = (dg.nv - dg.nr) * dg.A;
dg.d = (dg.n - 1) * dg.A;
dg.w = dg.th / dg.d;
add('disp-long', long({
  stem: '(a) Define angular dispersion and dispersive power, and show that for a thin prism the dispersive power is ω = (n_v − n_r)/(n − 1). [2] (b) A thin prism of barium crown glass has a refracting angle of 9.0° and refractive indices 1.565 (red), 1.575 (yellow) and 1.585 (violet). Find its angular dispersion, its mean deviation and its dispersive power. [2] (c) In a primary rainbow, which colour is seen on the outer edge? Give the reason briefly. [1]',
  model: r`(a) **Angular dispersion** is the angle between the emergent violet and red rays, $\theta = \delta_v - \delta_r$. **Dispersive power** is the ratio of the angular dispersion to the mean deviation (of yellow light), $\omega = \dfrac{\delta_v - \delta_r}{\delta}$. For a thin prism $\delta_v = (n_v - 1)A$, $\delta_r = (n_r - 1)A$ and $\delta = (n - 1)A$, so $\omega = \dfrac{(n_v - n_r)A}{(n - 1)A} = \dfrac{n_v - n_r}{n - 1}$.

(b) $\theta = 0.020 \times 9.0 = ${dec(dg.th, 3)}^\circ$; $\delta = 0.575 \times 9.0 = ${dec(dg.d, 4)}^\circ$; $\omega = \dfrac{0.18}{5.175} = ${dec(dg.w, 3)}$.

(c) **Red**: after one internal reflection in the drops, red light emerges at about 42° from the antisolar direction and violet at about 40°, so red comes from higher drops and forms the outer edge.`,
  sol: 'θ = (n_v − n_r)A; δ = (n − 1)A; ω = θ/δ; red at 42°.',
  scheme: [['Definitions of angular dispersion and dispersive power', 1], ['ω = (n_v − n_r)/(n − 1), A cancels', 1], ['θ = 0.18°, δ ≈ 5.18°', 1], ['ω ≈ 0.0348', 1], ['Red outside: emerges at 42° against 40° for violet', 1]],
  d: 3, c: 'application', t: [4], wl: null,
}), () => near(dg.th, 0.18) && near(dg.d, 5.175) && near(dg.w, 0.03478, 0.002) || `dg ${dg.w}`);
