// ISC 12 Physics ch19 Atoms — question bank (ISC style).
// Constants as stated in the stems: 1/4πε₀ = 9 × 10⁹ N m² C⁻², e = 1.6 × 10⁻¹⁹ C, mₑ = 9.1 × 10⁻³¹ kg, h = 6.6 × 10⁻³⁴ J s,
// r₁ = 0.53 Å, v₁ = 2.2 × 10⁶ m s⁻¹, E₁ = −13.6 eV, R = 1.097 × 10⁷ m⁻¹, hc = 1240 eV nm. Numbers computed here and
// re-solved independently: closest approaches by integrating the head-on motion under the Coulomb force; Bohr radii,
// speeds and energies from e, mₑ, h and 1/4πε₀ (bohrR, bohrV, bohrE); wavelengths from the energy levels with hc = 1240 eV nm.
// The mathematical theory of α scattering (impact parameter, Rutherford's formula) is an ISC removed topic and is not examined.
import { mk, add, r, dec, sci, near } from '../../isc-12-physics-ch01/src/lib.mjs';
import { KC, QE, ME, CL, KE2, MEV, M_ALPHA, RY, HC, closest, rn, vn, En, Kn, Un, bohrR, bohrV, bohrE, lamNm, invLam, lamFromE, region, nLines } from './svgs.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const KCONST = '(1/4πε₀ = 9 × 10⁹ N m² C⁻², e = 1.6 × 10⁻¹⁹ C)';

/** Independent re-solve of a head-on approach: integrates m dv/dt = k q Z e²/x² from 1 nm until the particle turns back. */
function turnPoint(m, v0, Z, q = 2) {
  const C = (KC * q * Z * QE * QE) / m;
  let x = 1e-9;
  let v = -v0;
  let xmin = x;
  for (let i = 0; i < 2e6 && v < 0; i++) {
    const a = C / (x * x);
    const dt = (2e-3 * x) / Math.sqrt(v * v + a * x);
    x += v * dt + 0.5 * a * dt * dt;
    v += 0.5 * (a + C / (x * x)) * dt;
    xmin = Math.min(xmin, x);
  }
  return xmin;
}
const vFromMeV = (KMeV, m = M_ALPHA) => Math.sqrt((2 * KMeV * MEV) / m);

// ================================================================ t01 α scattering, Rutherford's model, closest approach
add('plum-mcq', mcq({
  stem: 'Which result of the Geiger–Marsden experiment could not be explained if the positive charge of each gold atom were spread evenly through its whole volume, as in Thomson’s model?',
  right: 'Some α particles were turned back through more than 90°',
  wrong: ['Most α particles passed through the foil almost undeflected', 'The gold atoms in the foil were electrically neutral', 'Some α particles were deflected by a fraction of a degree'],
  sol: 'In Thomson’s model the forces on an α particle inside an atom are weak and spread out, so only small deflections are possible. It accounts for nearly undeflected particles and for neutral atoms, but no spread-out charge can reverse a fast, heavy α particle — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('vacuum-mcq', mcq({
  stem: 'In the Geiger–Marsden apparatus, the α source, the gold foil and the zinc sulphide screen were all inside a chamber from which the air had been pumped out. This was done mainly',
  right: 'so that air molecules would not slow down, stop or scatter the α particles',
  wrong: ['to stop the thin gold foil from melting', 'so that the zinc sulphide screen would glow more brightly', 'to remove the electrons from the gold atoms'],
  sol: 'α particles lose energy quickly in air (their range is only a few centimetres) and are scattered by air molecules; in a vacuum any deflection is due to the foil alone — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('largeangle-mcq', mcq({
  stem: 'The gold foil (Z = 79) in an α-scattering experiment is replaced by an aluminium foil (Z = 13) with the same number of atoms per unit area. The number of α particles scattered through large angles',
  right: 'decreases, because the repulsion from each nucleus is much weaker',
  wrong: ['increases, because aluminium nuclei are lighter', 'stays the same, because the number of nuclei in the path is the same', 'decreases, because aluminium atoms have fewer electrons to deflect the α particles'],
  sol: 'A large deflection needs a close encounter with a strong repulsion. The Coulomb force on the α particle is proportional to Z, so with Z = 13 an α particle must pass much nearer a nucleus to be turned through a large angle, and fewer do so. The electrons play almost no part — option (@K).',
  d: 3, c: 'analysis', t: [1],
}), () => closest(5, 13) < closest(5, 79) / 6 || 'la');
const ps = { v: 1.0e7, mp: 1.67e-27 };
ps.Kp = 0.5 * ps.mp * ps.v ** 2;
ps.Ka = 0.5 * 4 * ps.mp * ps.v ** 2;
ps.ratio = (KC * 1 * 79 * QE * QE) / ps.Kp / ((KC * 2 * 79 * QE * QE) / ps.Ka);
add('protonspeed-mcq', mcq({
  stem: 'A proton and an α particle move with the same speed, and each is aimed head-on at the same gold nucleus. Taking the mass of the α particle as four times that of the proton, the ratio of the distance of closest approach of the proton to that of the α particle is',
  right: '2 : 1',
  wrong: ['1 : 2', '1 : 1', '1 : 4'],
  sol: r`$d = \dfrac{1}{4\pi\varepsilon_0}\cdot\dfrac{qZe}{K}$ with $K = \tfrac{1}{2}mv^2$. The proton has half the charge and, at the same speed, a quarter of the kinetic energy, so $\dfrac{d_p}{d_\alpha} = \dfrac{1}{2} \times 4 = ${dec(ps.ratio, 1)}$ — option (@K).`,
  d: 3, c: 'analysis', t: [1],
}), () => near(turnPoint(ps.mp, ps.v, 79, 1) / turnPoint(4 * ps.mp, ps.v, 79, 2), 2, 0.005) && near(ps.ratio, 2) || `ps ${ps.ratio}`);
const fr = { K: 5 };
fr.d = closest(fr.K, 79);
fr.left = (fr.K - (KC * 2 * 79 * QE * QE) / (4 * fr.d) / MEV) / fr.K;
add('fraction-mcq', mcq({
  stem: 'An α particle aimed head-on at a nucleus has a distance of closest approach d. When it is still at a distance 4d from the centre of the nucleus, the fraction of its initial kinetic energy that it still has is',
  right: '3/4',
  wrong: ['1/4', '1/16', '15/16'],
  sol: r`At d the potential energy equals the initial kinetic energy $K_0$. Since $U \propto \dfrac{1}{r}$, at 4d it is $\dfrac{K_0}{4}$, so the kinetic energy left is $K_0 - \dfrac{K_0}{4} = \dfrac{3}{4}K_0$ — option (@K). 1/4 is the part already converted; 15/16 would follow from a $1/r^2$ energy.`,
  d: 2, c: 'application', t: [1],
}), () => near(fr.left, 0.75) || `fr ${fr.left}`);
add('electrons-tf', tf({
  stem: 'In explaining the α-scattering results, Rutherford could ignore the electrons of the gold atoms, because an electron is far too light to turn a fast α particle through an appreciable angle.',
  key: 't',
  sol: 'True. An electron has only about 1/7300 of the mass of an α particle; in an encounter the electron is pushed aside and the α particle’s path barely changes. The large deflections must come from the heavy nucleus.',
  d: 1, c: 'understanding', t: [1],
}), () => Math.round(M_ALPHA / ME / 100) === 73 || 'el');
add('closest-fill', fill({
  stem: 'An α particle aimed straight at a gold nucleus stops for an instant and then turns back. The least distance between the α particle and the centre of the nucleus during this motion is called the distance of ___.',
  acc: [['closest approach', 'nearest approach']],
  sol: 'The **distance of closest approach**: there the α particle’s kinetic energy has all become electrostatic potential energy.',
  d: 1, c: 'understanding', t: [1],
}));
add('stops-ar', ar({
  a: 'An α particle fired head-on at a heavy nucleus comes to rest for an instant before moving back the way it came.',
  r: 'At its closest point to the nucleus, the whole of the α particle’s initial kinetic energy has been stored as electrostatic potential energy.',
  key: 'a',
  sol: 'Both are true, and R explains A: with all the kinetic energy converted, the speed at that point is zero, so the α particle is momentarily at rest before the repulsion drives it back — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('electronmass-ar', ar({
  a: 'The electrons in a gold foil cause hardly any deflection of the α particles passing through it.',
  r: 'Electrons carry negative charge, while α particles carry positive charge.',
  key: 'b',
  sol: 'Both are true, but R does not explain A: the electrons do attract the α particles, yet they barely deflect them because an electron has only about 1/7300 of the α particle’s mass — option (b).',
  d: 2, c: 'understanding', t: [1],
}));
const ag = { K: 5.5, Z: 47 };
ag.d = closest(ag.K, ag.Z);
add('silver-num', num({
  stem: `An α particle of kinetic energy 5.5 MeV is aimed head-on at a silver nucleus (Z = 47). Find its distance of closest approach, in femtometres (1 fm = 10⁻¹⁵ m), to 3 significant figures. ${KCONST}`,
  value: Number(dec(ag.d * 1e15, 3)), tol: 0.2, unit: 'fm',
  sol: r`$K = 5.5 \times 1.6 \times 10^{-13} = 8.8 \times 10^{-13}$ J. $d = \dfrac{9 \times 10^{9} \times 2 \times 47 \times (1.6 \times 10^{-19})^2}{8.8 \times 10^{-13}} = ${sci(ag.d, 3)}$ m $= ${dec(ag.d * 1e15, 3)}$ fm.`,
  scheme: [['K = 8.8 × 10⁻¹³ J and K = k(2e)(Ze)/d', 1], ['d = 2.46 × 10⁻¹⁴ m = 24.6 fm', 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), (q) => near(turnPoint(M_ALPHA, vFromMeV(5.5), 47) * 1e15, q.answer.value, 0.003) || `ag ${ag.d}`);
const sn = { dfm: 15, Z: 50 };
sn.K = (2 * sn.Z * KE2) / (sn.dfm * 1e-15) / MEV;
add('tin-num', num({
  stem: `What minimum kinetic energy, in MeV, must an α particle have to get within 15 fm (1.5 × 10⁻¹⁴ m) of the centre of a tin nucleus (Z = 50) in a head-on approach? ${KCONST}`,
  value: Number(dec(sn.K, 2)), tol: 0.05, unit: 'MeV',
  sol: r`$K = \dfrac{1}{4\pi\varepsilon_0}\cdot\dfrac{2Ze^2}{d} = \dfrac{9 \times 10^{9} \times 2 \times 50 \times (1.6 \times 10^{-19})^2}{1.5 \times 10^{-14}} = ${sci(sn.K * MEV, 4)}$ J $= \dfrac{${sci(sn.K * MEV, 4)}}{1.6 \times 10^{-13}} = ${dec(sn.K, 2)}$ MeV.`,
  scheme: [['K = k(2e)(Ze)/d = 1.536 × 10⁻¹² J', 1], ['K = 9.6 MeV', 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), (q) => near(turnPoint(M_ALPHA, vFromMeV(q.answer.value), 50), 15e-15, 0.003) || `sn ${sn.K}`);
const sa = { v: 1.6e7, Z: 79 };
sa.K = 0.5 * M_ALPHA * sa.v ** 2;
sa.d = (2 * sa.Z * KE2) / sa.K;
add('speedalpha-num', num({
  stem: `An α particle of mass 6.64 × 10⁻²⁷ kg moving at 1.6 × 10⁷ m s⁻¹ is aimed head-on at a gold nucleus (Z = 79). Find its distance of closest approach, in fm, to 3 significant figures. ${KCONST}`,
  value: Number(dec(sa.d * 1e15, 3)), tol: 0.3, unit: 'fm',
  sol: r`$K = \dfrac{1}{2}mv^2 = \dfrac{1}{2} \times 6.64 \times 10^{-27} \times (1.6 \times 10^{7})^2 = ${sci(sa.K, 3)}$ J (${dec(sa.K / MEV, 3)} MeV). $d = \dfrac{9 \times 10^{9} \times 2 \times 79 \times (1.6 \times 10^{-19})^2}{${sci(sa.K, 3)}} = ${sci(sa.d, 3)}$ m $= ${dec(sa.d * 1e15, 3)}$ fm.`,
  scheme: [['K = ½mv² = 8.50 × 10⁻¹³ J', 1], ['d = 4.28 × 10⁻¹⁴ m = 42.8 fm', 1]],
  marks: 2, d: 3, c: 'analysis', t: [1],
}), (q) => near(turnPoint(M_ALPHA, sa.v, 79) * 1e15, q.answer.value, 0.003) || `sa ${sa.d}`);
const cb = { rN: 1.0e-15, rA: 0.53e-10, ball: 3.6 };
cb.km = (cb.ball * (cb.rA / cb.rN)) / 1e5;
add('cricket-num', num({
  stem: 'Imagine a hydrogen atom enlarged until its nucleus, of radius about 1.0 × 10⁻¹⁵ m, is as big as a cricket ball of radius 3.6 cm. Taking the radius of the atom as 0.53 × 10⁻¹⁰ m, what would the radius of the enlarged atom be, in km (2 significant figures)?',
  value: Number(dec(cb.km, 2)), tol: 0.05, unit: 'km',
  sol: r`Scale factor $\dfrac{0.53 \times 10^{-10}}{1.0 \times 10^{-15}} = 5.3 \times 10^{4}$, so the atom’s radius becomes $3.6 \times 5.3 \times 10^{4}$ cm $= ${sci(cb.km * 1e5, 2)}$ cm $= ${dec(cb.km, 2)}$ km: a ball in the middle of a town-sized empty sphere.`,
  scheme: [['Ratio 5.3 × 10⁴; radius ≈ 1.9 km', 1]],
  d: 2, c: 'application', t: [1],
}), (q) => near((rn(1) / 1e-15) * 0.036 / 1000, q.answer.value, 0.01) || `cb ${cb.km}`);
const hw = { K: 7.2, Z: 92 };
hw.d = closest(hw.K, hw.Z);
hw.r = 2 * hw.d;
add('halfway-num', num({
  stem: `An α particle of kinetic energy 7.2 MeV approaches a uranium nucleus (Z = 92) head-on. At what distance from the centre of the nucleus has its kinetic energy fallen to half its initial value? Answer in fm (3 significant figures). ${KCONST}`,
  value: Number(dec(hw.r * 1e15, 3)), tol: 0.3, unit: 'fm',
  sol: r`Half the kinetic energy, 3.6 MeV, has become potential energy: $\dfrac{1}{4\pi\varepsilon_0}\cdot\dfrac{2Ze^2}{r} = 3.6$ MeV $= 5.76 \times 10^{-13}$ J, so $r = \dfrac{9 \times 10^{9} \times 2 \times 92 \times (1.6 \times 10^{-19})^2}{5.76 \times 10^{-13}} = ${sci(hw.r, 3)}$ m $= ${dec(hw.r * 1e15, 3)}$ fm, twice the distance of closest approach (${dec(hw.d * 1e15, 3)} fm).`,
  scheme: [['U = K₀/2 = 3.6 MeV at the required point', 1], ['r = 73.6 fm (= 2d)', 1]],
  marks: 2, d: 4, c: 'analysis', t: [1],
}), (q) => near(7.2 - (2 * 92 * KE2) / (q.answer.value * 1e-15) / MEV, 3.6, 0.002) && near(turnPoint(M_ALPHA, vFromMeV(7.2), 92) * 2e15, q.answer.value, 0.003) || `hw ${hw.r}`);
const cl = { K: 3.5, Z: 79 };
cl.d = closest(cl.K, cl.Z);
add('claim-short2', short({
  marks: 2,
  stem: 'A student fires α particles of 3.5 MeV head-on at gold nuclei (Z = 79), calculates a distance of closest approach of about 65 fm, and concludes that “the radius of a gold nucleus is 65 fm”. Evaluate this conclusion.',
  model: r`The calculation is right ($d = ${dec(cl.d * 1e15, 3)}$ fm), but the conclusion is not. The α particle stops at 65 fm only because the Coulomb repulsion has used up its kinetic energy; it never touches the nucleus. So 65 fm is only an **upper limit** to the radius. Faster α particles get closer ($d \propto 1/K$), and such experiments show that a gold nucleus is really only about 7 fm in radius.`,
  sol: 'd = k(2e)(Ze)/K is an upper limit, not the radius.',
  scheme: [['d is only an upper limit: the α particle never reaches the nucleus', 1], ['Higher K gives smaller d; the true radius is smaller (about 7 fm)', 1]],
  d: 3, c: 'evaluation', t: [1], wl: null,
}), () => near(cl.d * 1e15, 65.0, 0.002) || `cl ${cl.d}`);
add('detectors-short3', short({
  marks: 3,
  stem: 'In a Geiger–Marsden type experiment, the detector counts α particles for equal times at 5°, then at 60° and finally at 170° from the direction of the beam. Describe how the three counts compare, and state what each result tells us about the structure of the atom.',
  model: 'At **5°** the count is very large: most α particles pass through the foil with little or no deflection, so most of the atom is **empty space**. At **60°** the count is far smaller: only the few α particles that pass very close to a nucleus feel a strong enough repulsion, so the **positive charge is concentrated in a tiny region**. At **170°** only an occasional α particle is counted: turning a fast α particle right back needs a nearly head-on encounter with something **massive** as well as highly charged, so nearly all the mass of the atom is in that tiny **nucleus**.',
  sol: 'Counts fall steeply with angle: empty space, concentrated charge, massive nucleus.',
  scheme: [['5°: very many → atom mostly empty space', 1], ['60°: few → positive charge concentrated in a tiny region', 1], ['170°: very few but not zero → small, massive nucleus', 1]],
  d: 3, c: 'analysis', t: [1], wl: null,
}));
add('collapse-short2', short({
  marks: 2,
  stem: 'Use classical electromagnetic theory to explain why an atom built according to Rutherford’s model should (a) be unstable, (b) give out a continuous spectrum.',
  model: '(a) An electron moving in a circular orbit is accelerated towards the nucleus, and an accelerated charge radiates electromagnetic energy. Losing energy, the electron would spiral into the nucleus (in about 10⁻⁸ s), so the atom would collapse. (b) As the orbit shrank, the frequency of revolution, and so of the emitted radiation, would rise continuously, so the atom would emit a continuous range of frequencies instead of the sharp lines observed.',
  sol: 'Accelerated charge radiates; changing frequency gives a continuous spectrum.',
  scheme: [['Accelerated electron radiates and spirals in: atom unstable', 1], ['Frequency changes continuously: continuous spectrum', 1]],
  d: 2, c: 'understanding', t: [1], wl: null,
}));
const pb = { K: 4.8, Z: 82 };
pb.d = closest(pb.K, pb.Z);
add('closest-short3', short({
  marks: 3,
  stem: `Obtain an expression for the distance of closest approach d of an α particle of kinetic energy K aimed head-on at a nucleus of atomic number Z. Hence find d for α particles of 4.8 MeV aimed at lead nuclei (Z = 82). ${KCONST}`,
  model: r`The α particle (charge 2e) slows down as it approaches; the much heavier nucleus is taken as fixed. At the closest point its speed is zero, so all its kinetic energy has become electrostatic potential energy:
$K = \dfrac{1}{4\pi\varepsilon_0}\cdot\dfrac{(2e)(Ze)}{d}$, so $d = \dfrac{1}{4\pi\varepsilon_0}\cdot\dfrac{2Ze^2}{K}$.
Here $K = 4.8 \times 1.6 \times 10^{-13} = 7.68 \times 10^{-13}$ J: $d = \dfrac{9 \times 10^{9} \times 2 \times 82 \times (1.6 \times 10^{-19})^2}{7.68 \times 10^{-13}} = ${sci(pb.d, 3)}$ m, about ${dec(pb.d * 1e15, 2)} fm.`,
  sol: 'Energy conservation: K = k(2e)(Ze)/d.',
  scheme: [['At closest approach K is all electrostatic PE (speed zero)', 1], ['d = (1/4πε₀)(2Ze²/K)', 1], ['d = 4.92 × 10⁻¹⁴ m', 1]],
  d: 3, c: 'application', t: [1], wl: null,
}), () => near(turnPoint(M_ALPHA, vFromMeV(4.8), 82), pb.d, 0.003) && near(pb.d, 4.92e-14, 0.001) || `pb ${pb.d}`);
add('obs-match', match({
  stem: 'Match each result of the α-scattering experiment in Column A with what it shows about the atom in Column B.',
  pairs: [
    ['Nearly all the α particles reach a detector placed directly behind the foil', 'The atom is mostly empty space'],
    ['A small number are scattered through large angles', 'The positive charge occupies a very small region'],
    ['An occasional α particle rebounds towards the source', 'Nearly all the mass is in that small region'],
    ['Foils of higher atomic number scatter more α particles through large angles', 'The repulsion grows with the nuclear charge Ze'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Undeflected → empty space (1 → q); large angles → charge concentrated (2 → s); rebound → massive nucleus (3 → p); more scattering at higher Z → repulsion ∝ Ze (4 → r).',
  d: 2, c: 'understanding', t: [1],
}));
const pt = { K: 7.0, Z: 78 };
pt.d = closest(pt.K, pt.Z);
add('gm-long', long({
  stem: `(a) Describe, with a labelled diagram (described in words), the Geiger–Marsden α-scattering experiment. [2] (b) State Rutherford’s two main conclusions from it. [1] (c) Find the distance of closest approach of a 7.0 MeV α particle aimed head-on at a platinum nucleus (Z = 78), and explain why this is only an upper limit to the size of the nucleus. [2] ${KCONST}`,
  model: r`(a) A radioactive source in a lead block sends α particles through narrow slits as a fine beam onto a very thin gold foil. A zinc sulphide screen, viewed through a microscope, can be turned round the foil on a circular scale; each α particle striking it gives a flash (scintillation), and the flashes are counted at each scattering angle θ. The whole apparatus is in an evacuated chamber so that air does not stop or scatter the α particles.

(b) The atom is mostly empty space; its positive charge and nearly all its mass are concentrated in a tiny central nucleus (about $10^{-14}$ m across), with the electrons outside it.

(c) $K = 7.0 \times 1.6 \times 10^{-13} = 1.12 \times 10^{-12}$ J; $d = \dfrac{9 \times 10^{9} \times 2 \times 78 \times (1.6 \times 10^{-19})^2}{1.12 \times 10^{-12}} = ${sci(pt.d, 3)}$ m ≈ ${dec(pt.d * 1e15, 3)} fm. The α particle turns back before touching the nucleus, so the nucleus can only be smaller than d.`,
  sol: 'Apparatus, conclusions, then d = k(2e)(Ze)/K.',
  scheme: [['Source, slits, thin gold foil, ZnS screen and microscope', 1], ['Rotating detector, vacuum, counts at each angle', 1], ['Mostly empty; tiny, massive, positive nucleus', 1], ['d = 3.21 × 10⁻¹⁴ m', 1], ['Upper limit: the α particle never reaches the nucleus', 1]],
  d: 3, c: 'application', t: [1], wl: null,
}), () => near(turnPoint(M_ALPHA, vFromMeV(7.0), 78), pt.d, 0.003) && near(pt.d * 1e15, 32.09, 0.001) || `pt ${pt.d}`);

// ================================================================ t02 Bohr's postulates, radius, speed and energies
add('postulate-mcq', mcq({
  stem: 'Which of the following is NOT one of Bohr’s postulates for the hydrogen atom?',
  right: 'The electron radiates energy continuously as it revolves in an allowed orbit',
  wrong: ['The angular momentum of the electron in an allowed orbit is a whole-number multiple of h/2π', 'A photon is emitted only when the electron jumps from a higher allowed orbit to a lower one', 'The Coulomb attraction of the nucleus provides the centripetal force on the electron'],
  sol: 'Bohr postulated that the electron does **not** radiate while it stays in an allowed (stationary) orbit; radiation is emitted only in a jump, as one photon of energy E₂ − E₁ — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('orbitn-fill', fill({
  stem: 'The radius of a certain Bohr orbit of hydrogen is 16 times the radius of the first orbit. The angular momentum of the electron in this orbit is ___ times h/2π.',
  acc: [['4', 'four']],
  sol: 'r ∝ n², so n² = 16 and n = 4; then mvr = nh/2π = **4** h/2π.',
  d: 2, c: 'application', t: [2],
}), () => rn(4) / rn(1) === 16 || 'on');
const r7 = { n: 7 };
r7.r = rn(r7.n);
add('radius7-num', num({
  stem: 'Taking the radius of the first Bohr orbit of hydrogen as 0.53 Å, find the radius of the n = 7 orbit, in nm (3 significant figures).',
  value: Number(dec(r7.r * 1e9, 3)), tol: 0.01, unit: 'nm',
  sol: r`$r_n = 0.53\,n^2$ Å: $r_7 = 0.53 \times 49 = 25.97$ Å $= ${dec(r7.r * 1e9, 3)}$ nm.`,
  scheme: [['r₇ = 49 × 0.53 Å = 2.60 nm', 1]],
  d: 1, c: 'understanding', t: [2],
}), (q) => near(bohrR(7) * 1e9, q.answer.value, 0.015) || `r7 ${r7.r}`);
add('whichorbit-num', num({
  stem: 'In one of the Bohr orbits of hydrogen, the electron moves at 5.5 × 10⁵ m s⁻¹. Taking its speed in the first orbit as 2.2 × 10⁶ m s⁻¹, find the quantum number n of this orbit.',
  value: 4, tol: 0, unit: null,
  sol: r`$v_n = \dfrac{v_1}{n}$, so $n = \dfrac{2.2 \times 10^{6}}{5.5 \times 10^{5}} = ${dec(2.2e6 / 5.5e5, 1)}$.`,
  scheme: [['n = v₁/v = 4', 1]],
  d: 2, c: 'application', t: [2],
}), (q) => near(bohrV(q.answer.value), 5.5e5, 0.01) && near(vn(4), 5.5e5) || 'wo');
add('increase-mcq', mcq({
  stem: 'As the electron of a hydrogen atom is moved to orbits of larger n, which one of these quantities increases?',
  right: 'its total energy',
  wrong: ['its kinetic energy', 'its orbital speed', 'its frequency of revolution'],
  sol: 'E = −13.6/n² eV rises towards zero (becomes less negative), while K = 13.6/n² eV, v ∝ 1/n and the frequency of revolution ∝ 1/n³ all fall — option (@K).',
  d: 2, c: 'analysis', t: [2],
}), () => En(3) > En(2) && Kn(3) < Kn(2) && vn(3) < vn(2) && vn(3) / rn(3) < vn(2) / rn(2) || 'inc');
add('momentum-mcq', mcq({
  stem: 'The ratio of the linear momentum of the electron in the n = 2 orbit of hydrogen to its linear momentum in the n = 6 orbit is',
  right: '3 : 1',
  wrong: ['1 : 3', '9 : 1', '1 : 9'],
  sol: 'p = mv and v ∝ 1/n, so p₂ : p₆ = 6 : 2 = 3 : 1 — option (@K). (Angular momentum mvr ∝ n goes the other way, 1 : 3.)',
  d: 2, c: 'understanding', t: [2],
}), () => near(bohrV(2) / bohrV(6), 3) || 'mom');
add('ke7-num', num({
  stem: 'Find the kinetic energy of the electron in the n = 7 level of hydrogen, in eV (3 significant figures). (Ground-state energy −13.6 eV)',
  value: Number(dec(Kn(7), 3)), tol: 0.002, unit: 'eV',
  sol: r`$K = -E = \dfrac{13.6}{n^2} = \dfrac{13.6}{49} = ${dec(Kn(7), 3)}$ eV.`,
  scheme: [['K = 13.6/49 = 0.278 eV', 1]],
  d: 1, c: 'understanding', t: [2],
}), (q) => near(0.5 * ME * bohrV(7) ** 2 / QE, q.answer.value, 0.012) || 'k7');
add('pe2-num', num({
  stem: 'Find the potential energy of the electron in the first excited state of hydrogen, in eV. (Ground-state energy −13.6 eV)',
  value: Number(dec(Un(2), 2)), tol: 0.05, unit: 'eV',
  sol: r`First excited state: n = 2, $E_2 = -\dfrac{13.6}{4} = -3.4$ eV, and $U = 2E = ${dec(Un(2), 2)}$ eV.`,
  scheme: [['n = 2; U = 2E₂ = −6.8 eV', 1]],
  d: 1, c: 'understanding', t: [2],
}), (q) => near(-KE2 / bohrR(2) / QE, q.answer.value, 0.012) || 'pe2');
add('ionise5-num', num({
  stem: 'A hydrogen atom has its electron in the n = 5 level. How much energy, in eV, is needed to ionise it? (Ground-state energy −13.6 eV; 3 significant figures)',
  value: Number(dec(-En(5), 3)), tol: 0.002, unit: 'eV',
  sol: r`Ionisation takes the electron from $E_5 = -\dfrac{13.6}{25} = ${dec(En(5), 3)}$ eV up to 0: $0 - (${dec(En(5), 3)}) = ${dec(-En(5), 3)}$ eV.`,
  scheme: [['0 − E₅ = 0.544 eV', 1]],
  d: 1, c: 'understanding', t: [2],
}), (q) => near(-bohrE(5), q.answer.value, 0.012) || 'io5');
const ex46 = { lo: 4, hi: 6 };
ex46.dE = En(6) - En(4);
add('excite46-num', num({
  stem: 'How much energy, in eV, must a hydrogen atom absorb to move its electron from the n = 4 level to the n = 6 level? (Ground-state energy −13.6 eV; 3 significant figures)',
  value: Number(dec(ex46.dE, 3)), tol: 0.002, unit: 'eV',
  sol: r`$E_4 = -\dfrac{13.6}{16} = -0.850$ eV and $E_6 = -\dfrac{13.6}{36} = ${dec(En(6), 3)}$ eV, so $\Delta E = -0.378 - (-0.850) = ${dec(ex46.dE, 3)}$ eV.`,
  scheme: [['E₄ = −0.850 eV, E₆ = −0.378 eV', 1], ['ΔE = 0.472 eV', 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near(HC / lamNm(4, 6), q.answer.value, 0.002) || 'e46');
const ph = { E: 13.06 };
ph.Eafter = -13.6 + ph.E;
ph.n = Math.sqrt(13.6 / -ph.Eafter);
add('photon-mcq', mcq({
  stem: 'A hydrogen atom in its ground state absorbs a photon of energy 13.06 eV. Its electron is raised to the level',
  right: 'n = 5',
  wrong: ['n = 4', 'n = 6', 'n = ∞, so the atom is ionised'],
  sol: r`After absorption $E = -13.6 + 13.06 = ${dec(ph.Eafter, 2)}$ eV $= -\dfrac{13.6}{n^2}$, so $n^2 = ${dec(ph.n ** 2, 2)}$ and $n = 5$ — option (@K). 13.06 eV is less than 13.6 eV, so the atom is not ionised.`,
  d: 2, c: 'application', t: [2],
}), () => Math.round(ph.n) === 5 && near(En(5) - En(1), 13.056) || `ph ${ph.n}`);
add('radius-ar', ar({
  a: 'The radius of the second Bohr orbit of hydrogen is twice the radius of the first.',
  r: 'The radius of the nth Bohr orbit is proportional to n².',
  key: 'd',
  sol: 'A is false: r₂ = 4r₁ = 2.12 Å. R is true, and it is exactly what shows A to be wrong — option (d).',
  d: 2, c: 'understanding', t: [2],
}), () => rn(2) / rn(1) === 4 || 'rar');
add('negative-short2', short({
  marks: 2,
  stem: 'The total energy of the electron in the ground state of hydrogen is −13.6 eV. Explain the significance of the negative sign, and state what happens to the electron if the atom absorbs 15.0 eV.',
  model: 'Zero energy is taken as the electron at rest infinitely far from the proton. A negative total energy means the electron has less energy than this: it is **bound** to the nucleus, and 13.6 eV must be supplied to free it. With 15.0 eV the electron is freed (the atom is ionised), and it moves away with the remaining 15.0 − 13.6 = 1.4 eV as kinetic energy.',
  sol: 'Negative energy = bound state; excess over 13.6 eV becomes kinetic energy.',
  scheme: [['Negative E: electron bound; zero is the free electron at rest at infinity', 1], ['Atom ionised; electron leaves with 1.4 eV', 1]],
  d: 2, c: 'understanding', t: [2], wl: null,
}), () => near(15 + En(1), 1.4) || 'neg');
const r1 = { eps: 8.85e-12, h: 6.6e-34 };
r1.r = (r1.eps * r1.h ** 2) / (Math.PI * ME * QE ** 2);
add('radius-short3', short({
  marks: 3,
  stem: 'Starting from Bohr’s quantum condition and the fact that the Coulomb attraction provides the centripetal force, show that the radius of the nth orbit of the hydrogen atom is r_n = ε₀n²h²/(πme²). Evaluate r₁, taking ε₀ = 8.85 × 10⁻¹² C² N⁻¹ m⁻², h = 6.6 × 10⁻³⁴ J s, m = 9.1 × 10⁻³¹ kg and e = 1.6 × 10⁻¹⁹ C.',
  model: r`Centripetal force from the Coulomb attraction: $\dfrac{mv^2}{r} = \dfrac{e^2}{4\pi\varepsilon_0 r^2}$, i.e. $mv^2r = \dfrac{e^2}{4\pi\varepsilon_0}$ (1). Quantum condition: $mvr = \dfrac{nh}{2\pi}$, so $v = \dfrac{nh}{2\pi mr}$ (2).
Put (2) in (1): $m\cdot\dfrac{n^2h^2}{4\pi^2m^2r^2}\cdot r = \dfrac{e^2}{4\pi\varepsilon_0}$, so $r_n = \dfrac{\varepsilon_0 n^2h^2}{\pi me^2}$.
For n = 1: $r_1 = \dfrac{8.85 \times 10^{-12} \times (6.6 \times 10^{-34})^2}{\pi \times 9.1 \times 10^{-31} \times (1.6 \times 10^{-19})^2} = ${sci(r1.r, 3)}$ m ≈ 0.53 Å.`,
  sol: 'Combine mv²r = e²/4πε₀ with mvr = nh/2π.',
  scheme: [['mv²/r = e²/(4πε₀r²) and mvr = nh/2π', 1], ['Eliminating v: r_n = ε₀n²h²/(πme²)', 1], ['r₁ = 5.27 × 10⁻¹¹ m', 1]],
  d: 2, c: 'understanding', t: [2], wl: null,
}), () => near(r1.r, bohrR(1), 0.002) && near(r1.r, 5.27e-11, 0.002) || `r1 ${r1.r}`);
const v3 = { eps: 8.85e-12, h: 6.6e-34, n: 3 };
v3.v = QE ** 2 / (2 * v3.eps * v3.n * v3.h);
add('speed-short2', short({
  marks: 2,
  stem: 'Using Bohr’s postulates, show that the speed of the electron in the nth orbit of hydrogen is v_n = e²/(2ε₀nh), and calculate it for n = 3. (e = 1.6 × 10⁻¹⁹ C, ε₀ = 8.85 × 10⁻¹² C² N⁻¹ m⁻², h = 6.6 × 10⁻³⁴ J s)',
  model: r`From $\dfrac{mv^2}{r} = \dfrac{e^2}{4\pi\varepsilon_0r^2}$: $mv^2r = \dfrac{e^2}{4\pi\varepsilon_0}$. Dividing by $mvr = \dfrac{nh}{2\pi}$: $v = \dfrac{e^2}{4\pi\varepsilon_0}\cdot\dfrac{2\pi}{nh} = \dfrac{e^2}{2\varepsilon_0nh}$.
For n = 3: $v_3 = \dfrac{(1.6 \times 10^{-19})^2}{2 \times 8.85 \times 10^{-12} \times 3 \times 6.6 \times 10^{-34}} = ${sci(v3.v, 3)}$ m s⁻¹.`,
  sol: 'Divide mv²r = e²/4πε₀ by mvr = nh/2π.',
  scheme: [['v_n = e²/(2ε₀nh) from the two conditions', 1], ['v₃ = 7.30 × 10⁵ m s⁻¹', 1]],
  d: 3, c: 'application', t: [2], wl: null,
}), () => near(v3.v, bohrV(3), 0.002) && near(v3.v, 7.30e5, 0.001) || `v3 ${v3.v}`);
add('energy-short3', short({
  marks: 3,
  stem: 'Derive expressions for the kinetic energy, the potential energy and the total energy of the electron in the nth orbit of the hydrogen atom in terms of the orbit radius r_n. Hence show that the kinetic energy is equal in magnitude to the total energy and the potential energy is twice the total energy.',
  model: r`From $\dfrac{mv^2}{r_n} = \dfrac{e^2}{4\pi\varepsilon_0r_n^2}$: $K = \dfrac{1}{2}mv^2 = \dfrac{e^2}{8\pi\varepsilon_0r_n}$.
The potential energy of charge −e at distance $r_n$ from +e: $U = -\dfrac{e^2}{4\pi\varepsilon_0r_n}$.
Total: $E = K + U = -\dfrac{e^2}{8\pi\varepsilon_0r_n}$. So $K = -E = |E|$ and $U = 2E$ (both negative).`,
  sol: 'K from the force equation; U = −e²/(4πε₀r); E = K + U.',
  scheme: [['K = e²/(8πε₀r_n)', 1], ['U = −e²/(4πε₀r_n)', 1], ['E = −e²/(8πε₀r_n); K = −E, U = 2E', 1]],
  d: 2, c: 'understanding', t: [2], wl: null,
}), () => near(0.5 * ME * bohrV(3) ** 2, KE2 / (2 * bohrR(3)), 1e-9) || 'en');
const k63 = { hi: 6, lo: 3 };
k63.dK = Kn(3) - Kn(6);
k63.dU = Un(3) - Un(6);
add('kinetic-short2', short({
  marks: 2,
  stem: 'When the electron of a hydrogen atom falls from the n = 6 level to the n = 3 level, find the changes in its kinetic energy and its potential energy. Explain how the atom loses energy even though the electron’s kinetic energy increases.',
  model: r`$K = \dfrac{13.6}{n^2}$ eV: $0.378 \to 1.511$, so ΔK = +${dec(k63.dK, 3)} eV. $U = -\dfrac{27.2}{n^2}$ eV: $-0.756 \to -3.022$, so $Delta U = ${dec(k63.dU, 3)}$ eV. The potential energy falls by **twice** as much as the kinetic energy rises, so the total energy falls by ${dec(k63.dK, 3)} eV, which leaves the atom as a photon.`,
  sol: 'ΔU = −2ΔK, so ΔE = −ΔK.',
  scheme: [['ΔK = +1.13 eV, ΔU = −2.27 eV', 1], ['U falls twice as much as K rises: ΔE = −1.13 eV, emitted as a photon', 1]],
  d: 3, c: 'analysis', t: [2], wl: null,
}), () => near(k63.dU, -2 * k63.dK) && near(k63.dK, 1.1333, 1e-3) || `k63 ${k63.dK}`);
add('scaling-mcq', mcq({
  stem: 'A muon has the same charge as an electron but about 207 times its mass. In “muonic hydrogen” a muon orbits a proton. Treating the proton as fixed, Bohr’s theory gives the radius of the first orbit as about',
  right: '0.53/207 Å, i.e. about 2.6 × 10⁻¹³ m',
  wrong: ['207 × 0.53 Å, i.e. about 1.1 × 10⁻⁸ m', '0.53 Å, the same as for hydrogen', '0.53/√207 Å, i.e. about 3.7 × 10⁻¹² m'],
  sol: r`$r_1 = \dfrac{\varepsilon_0h^2}{\pi me^2} \propto \dfrac{1}{m}$, so the orbit shrinks by the factor 207: $\dfrac{0.53 \times 10^{-10}}{207} = ${sci(rn(1) / 207, 2)}$ m — option (@K).`,
  d: 3, c: 'analysis', t: [2],
}), () => near(bohrR(1, 207 * ME) / bohrR(1), 1 / 207) && near(rn(1) / 207, 2.56e-13, 0.01) || 'mu');
const tc = { dK: Kn(1) - Kn(3), dU: Un(1) - Un(3) };
add('transitionchange-mcq', mcq({
  stem: 'When the electron of a hydrogen atom jumps from the n = 3 level to the n = 1 level, its kinetic energy and its potential energy change by',
  right: '+12.09 eV and −24.18 eV respectively',
  wrong: ['−12.09 eV and +24.18 eV respectively', '+12.09 eV and −12.09 eV respectively', '−12.09 eV and −12.09 eV respectively'],
  sol: r`$K = \dfrac{13.6}{n^2}$: $1.51 \to 13.6$ eV, ΔK = +${dec(tc.dK, 4)} eV. $U = -\dfrac{27.2}{n^2}$: $-3.02 \to -27.2$ eV, $Delta U = ${dec(tc.dU, 4)}$ eV. The total falls by 12.09 eV, carried off by the photon — option (@K).`,
  d: 3, c: 'analysis', t: [2],
}), () => near(tc.dK, 12.0889, 1e-4) && near(tc.dU, -24.1778, 1e-4) || `tc ${tc.dK}`);
add('bound-tf', tf({
  stem: 'An electron near a proton whose total energy is +2.0 eV is bound to the proton in one of the Bohr orbits.',
  key: 'f',
  sol: 'False. Bound states of hydrogen have negative total energy (−13.6/n² eV). With a positive total energy the electron is free: it can escape to a large distance, still having 2.0 eV of kinetic energy there.',
  d: 2, c: 'understanding', t: [2],
}));
add('speedratio-num', num({
  stem: 'The electron in the first Bohr orbit of hydrogen moves at 2.2 × 10⁶ m s⁻¹. How many times greater is the speed of light, 3.0 × 10⁸ m s⁻¹? Give the answer to 3 significant figures.',
  value: Number(dec(CL / 2.2e6, 3)), tol: 1, unit: null,
  sol: r`$\dfrac{3.0 \times 10^{8}}{2.2 \times 10^{6}} = ${dec(CL / 2.2e6, 3)}$: the electron moves at about 1/137 of the speed of light, so non-relativistic mechanics is a fair approximation.`,
  scheme: [['c/v₁ = 136', 1]],
  d: 1, c: 'understanding', t: [2],
}), (q) => near(CL / bohrV(1), q.answer.value, 0.01) || 'sr');
const m6 = { E: -0.378 };
m6.n = Math.sqrt(13.6 / -m6.E);
m6.r = rn(6);
m6.v = vn(6);
add('minus0378-short3', short({
  marks: 3,
  stem: 'The total energy of the electron in a hydrogen atom is −0.378 eV. Find (a) the quantum number n of its orbit, (b) the radius of the orbit and the speed of the electron, (c) its kinetic and potential energies. (E₁ = −13.6 eV, r₁ = 0.53 Å, v₁ = 2.2 × 10⁶ m s⁻¹)',
  model: r`(a) $-\dfrac{13.6}{n^2} = -0.378$, so $n^2 = ${dec(m6.n ** 2, 3)}$ and $n = 6$.
(b) $r_6 = 0.53 \times 36 = 19.08$ Å $= ${sci(m6.r, 3)}$ m; $v_6 = \dfrac{2.2 \times 10^{6}}{6} = ${sci(m6.v, 3)}$ m s⁻¹.
(c) $K = -E = +0.378$ eV; $U = 2E = -0.756$ eV.`,
  sol: 'n from E; r ∝ n², v ∝ 1/n; K = −E, U = 2E.',
  scheme: [['n = 6', 1], ['r = 1.91 × 10⁻⁹ m, v = 3.67 × 10⁵ m s⁻¹', 1], ['K = 0.378 eV, U = −0.756 eV', 1]],
  d: 3, c: 'application', t: [2], wl: null,
}), () => Math.round(m6.n) === 6 && near(bohrR(6), m6.r, 0.015) && near(bohrV(6), m6.v, 0.01) || `m6 ${m6.n}`);
const b8 = { r: 33.92e-10 };
b8.n = Math.sqrt(b8.r / rn(1));
b8.v = vn(8);
b8.K = Kn(8);
add('bohr-long', long({
  stem: '(a) State Bohr’s postulates for the hydrogen atom. [1] (b) Using them, derive an expression for the radius of the nth orbit. [2] (c) The electron of a hydrogen atom moves in an orbit of radius 33.92 Å. Find the quantum number of the orbit, and the speed and kinetic energy of the electron in it. [2] (r₁ = 0.53 Å, v₁ = 2.2 × 10⁶ m s⁻¹, E₁ = −13.6 eV)',
  model: r`(a) The electron revolves in certain circular orbits without radiating; in them its angular momentum is $mvr = \dfrac{nh}{2\pi}$; it emits or absorbs a photon $h\nu = E_{n_2} - E_{n_1}$ only when it jumps between orbits.

(b) $\dfrac{mv^2}{r} = \dfrac{e^2}{4\pi\varepsilon_0r^2}$ gives $mv^2r = \dfrac{e^2}{4\pi\varepsilon_0}$; with $v = \dfrac{nh}{2\pi mr}$: $\dfrac{n^2h^2}{4\pi^2mr} = \dfrac{e^2}{4\pi\varepsilon_0}$, so $r_n = \dfrac{\varepsilon_0n^2h^2}{\pi me^2}$.

(c) $n^2 = \dfrac{33.92}{0.53} = ${dec(b8.n ** 2, 2)}$, so n = 8. $v_8 = \dfrac{2.2 \times 10^{6}}{8} = ${sci(b8.v, 3)}$ m s⁻¹; $K = \dfrac{13.6}{64} \approx ${dec(b8.K, 2)}$ eV.`,
  sol: 'Postulates; force + quantum condition; r ∝ n², v ∝ 1/n, K = 13.6/n².',
  scheme: [['Three postulates', 1], ['mv²/r = e²/(4πε₀r²) and mvr = nh/2π', 1], ['r_n = ε₀n²h²/(πme²)', 1], ['n = 8', 1], ['v = 2.75 × 10⁵ m s⁻¹, K = 0.21 eV', 1]],
  d: 3, c: 'analysis', t: [2], wl: null,
}), () => near(b8.n, 8) && near(bohrV(8), b8.v, 0.01) && near(0.5 * ME * bohrV(8) ** 2 / QE, b8.K, 0.012) || `b8 ${b8.n}`);
const el = { n: 2 };
el.I = -En(el.n);
el.lam = HC / el.I;
add('energy-long', long({
  stem: '(a) Obtain the total energy of the electron in the nth orbit of hydrogen in terms of the orbit radius r_n, and hence show that E_n = −13.6/n² eV (you may quote r_n = ε₀n²h²/(πme²) and use me⁴/(8ε₀²h²) = 13.6 eV). [2] (b) Explain the significance of the negative sign of E_n. [1] (c) A hydrogen atom is in its first excited state. Find the minimum energy needed to ionise it and the longest wavelength of light that can do so. [2] (hc = 1240 eV nm)',
  model: r`(a) $K = \dfrac{1}{2}mv^2 = \dfrac{e^2}{8\pi\varepsilon_0r_n}$ (from the force equation) and $U = -\dfrac{e^2}{4\pi\varepsilon_0r_n}$, so $E_n = -\dfrac{e^2}{8\pi\varepsilon_0r_n}$. With $r_n = \dfrac{\varepsilon_0n^2h^2}{\pi me^2}$: $E_n = -\dfrac{me^4}{8\varepsilon_0^2n^2h^2} = -\dfrac{13.6}{n^2}$ eV.

(b) Zero is the free electron at rest far away; negative energy means the electron is bound, and energy $13.6/n^2$ eV must be supplied to free it.

(c) First excited state: n = 2, $E_2 = -3.4$ eV, so the ionisation energy is ${dec(el.I, 2)} eV. Longest wavelength: $\lambda = \dfrac{hc}{E} = \dfrac{1240}{3.4} = ${dec(el.lam, 3)}$ nm (near ultraviolet; it equals the Balmer series limit).`,
  sol: 'E = K + U; bound state; λ_max = hc/E_ion.',
  scheme: [['E = −e²/(8πε₀r_n)', 1], ['E_n = −13.6/n² eV', 1], ['Negative: bound electron', 1], ['3.4 eV', 1], ['λ = 365 nm', 1]],
  d: 3, c: 'application', t: [2, 3], wl: null,
}), () => near(el.lam, lamNm(2, Infinity), 0.001) && near(-bohrE(2), el.I, 0.012) || `el ${el.lam}`);
add('limitations-short2', short({
  marks: 2,
  stem: 'State two limitations of Bohr’s model of the atom, and explain the reason for one of them.',
  model: 'Any two: (i) it applies only to hydrogen and one-electron ions such as He⁺ and Li²⁺, not to many-electron atoms; (ii) it cannot explain the relative intensities of spectral lines; (iii) it cannot explain the fine structure (close splitting) of lines; (iv) its postulates are assumed, not derived. Reason for (i): in a many-electron atom each electron is also repelled by the other electrons, and Bohr’s model, which considers only the attraction of the nucleus, has no way of including this.',
  sol: 'One-electron systems only; intensities; fine structure.',
  scheme: [['Two valid limitations', 1], ['Correct reason for one (e.g. electron–electron repulsion ignored)', 1]],
  d: 2, c: 'understanding', t: [2, 3], wl: null,
}));
add('manyelectron-ar', ar({
  a: 'Bohr’s theory cannot give the correct energy levels of a neutral helium atom.',
  r: 'Bohr’s theory does not take into account the repulsion between the electrons of a many-electron atom.',
  key: 'a',
  sol: 'Both are true, and R explains A: neutral helium has two electrons, each repelled by the other as well as attracted by the nucleus; Bohr’s single-electron treatment leaves this out, so its levels are wrong — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('ruthvsbohr-short3', short({
  marks: 3,
  stem: 'Compare Rutherford’s and Bohr’s models of the hydrogen atom with respect to (a) the stability of the atom, (b) the spectrum it should emit, (c) the possible sizes of the electron’s orbit. Which model agrees better with experiment, and why?',
  model: '(a) Rutherford: the orbiting electron should radiate and spiral into the nucleus, so the atom is unstable. Bohr: in stationary orbits the electron does not radiate, so the atom is stable in its ground state. (b) Rutherford: a continuous spectrum as the orbit shrinks. Bohr: photons only in jumps between fixed levels, hν = E₂ − E₁, so a line spectrum. (c) Rutherford: any radius. Bohr: only r = 0.53 n² Å. **Bohr’s model agrees better** for hydrogen: it predicts stable atoms of the right size (0.53 Å), the ionisation energy of 13.6 eV and every observed wavelength. It keeps Rutherford’s nucleus, so it builds on, rather than replaces, his model.',
  sol: 'Stability, spectrum, orbit sizes: Bohr matches observation.',
  scheme: [['Stability: Rutherford collapses, Bohr stable', 1], ['Spectrum: continuous vs lines; orbits: any vs r ∝ n²', 1], ['Bohr better: right size, 13.6 eV, wavelengths', 1]],
  d: 3, c: 'evaluation', t: [1, 2], wl: null,
}));

// ================================================================ t03 energy levels, series, Rydberg formula
add('series63-mcq', mcq({
  stem: 'The spectral line emitted when the electron of a hydrogen atom drops from the n = 6 level to the n = 3 level belongs to the',
  right: 'Paschen series, in the infrared',
  wrong: ['Balmer series, in the visible region', 'Brackett series, in the infrared', 'Lyman series, in the ultraviolet'],
  sol: r`The series is fixed by the lower level: $n_1 = 3$ is the Paschen series. $\lambda = \dfrac{1}{R(1/9 - 1/36)} = ${dec(lamNm(3, 6), 4)}$ nm, in the infrared — option (@K).`,
  d: 1, c: 'understanding', t: [3],
}), () => region(lamNm(3, 6)) === 'infrared' || 's63');
const vis = { right: [3, 2], wrong: [[3, 1], [5, 3], [7, 5]] };
add('visible-mcq', mcq({
  stem: 'Which one of these electron jumps in a hydrogen atom gives out visible light?',
  right: 'n = 3 → n = 2',
  wrong: ['n = 3 → n = 1', 'n = 5 → n = 3', 'n = 7 → n = 5'],
  sol: r`Wavelengths from $\dfrac{1}{\lambda} = R\left(\dfrac{1}{n_1^2} - \dfrac{1}{n_2^2}\right)$: 3 → 2: ${dec(lamNm(2, 3), 4)} nm (red, visible) — option (@K); 3 → 1: ${dec(lamNm(1, 3), 4)} nm (UV); 5 → 3: ${dec(lamNm(3, 5), 4)} nm (IR); 7 → 5: ${dec(lamNm(5, 7) / 1000, 3)} μm (far IR).`,
  d: 2, c: 'application', t: [3],
}), () => region(lamNm(...vis.right.slice().reverse())) === 'visible' && vis.wrong.every(([hi, lo]) => region(lamNm(lo, hi)) !== 'visible') || 'vis');
add('rydunit-fill', fill({
  stem: 'In the formula 1/λ = R(1/n₁² − 1/n₂²) for the wavelengths of hydrogen, the Rydberg constant R = 1.097 × 10⁷ is expressed in the SI unit ___.',
  acc: [['m⁻¹', 'per metre', 'm^-1', '/m', 'inverse metre']],
  sol: 'The bracket is a pure number, so R has the unit of 1/λ: **m⁻¹** (per metre).',
  d: 1, c: 'understanding', t: [3],
}));
add('brackett-num', num({
  stem: 'Find the wavelength of the first (longest-wavelength) line of the Brackett series of hydrogen, in μm (3 significant figures). (R = 1.097 × 10⁷ m⁻¹)',
  value: Number(dec(lamNm(4, 5) / 1000, 3)), tol: 0.01, unit: 'μm',
  sol: r`Brackett: $n_1 = 4$; first line $n_2 = 5$. $\dfrac{1}{\lambda} = 1.097 \times 10^{7}\left(\dfrac{1}{16} - \dfrac{1}{25}\right) = 1.097 \times 10^{7} \times \dfrac{9}{400} = ${sci(invLam(4, 5), 4)}$ m⁻¹, so $\lambda = ${sci(lamNm(4, 5) * 1e-9, 3)}$ m $= ${dec(lamNm(4, 5) / 1000, 3)}$ μm (infrared).`,
  scheme: [['n₁ = 4, n₂ = 5: 1/λ = R × 9/400', 1], ['λ = 4.05 μm', 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => near(lamFromE(4, 5) / 1000, q.answer.value, 0.002) || 'br');
add('bracklimit-num', num({
  stem: 'Find the series limit (shortest wavelength) of the Brackett series of hydrogen, in nm (4 significant figures). (R = 1.097 × 10⁷ m⁻¹)',
  value: Number(dec(lamNm(4, Infinity), 4)), tol: 2, unit: 'nm',
  sol: r`$n_1 = 4$, $n_2 = \infty$: $\lambda = \dfrac{16}{R} = \dfrac{16}{1.097 \times 10^{7}} = ${sci(lamNm(4, Infinity) * 1e-9, 4)}$ m $= ${dec(lamNm(4, Infinity), 4)}$ nm.`,
  scheme: [['λ = 16/R = 1459 nm', 1]],
  d: 2, c: 'understanding', t: [3],
}), (q) => near(lamFromE(4, Infinity), q.answer.value, 0.002) || 'bl');
add('balmer62-num', num({
  stem: 'Calculate the wavelength of the hydrogen line produced when the electron falls from the n = 6 level to the n = 2 level, in nm (3 significant figures). (R = 1.097 × 10⁷ m⁻¹)',
  value: Number(dec(lamNm(2, 6), 3)), tol: 1, unit: 'nm',
  sol: r`$\dfrac{1}{\lambda} = R\left(\dfrac{1}{4} - \dfrac{1}{36}\right) = R \times \dfrac{2}{9} = ${sci(invLam(2, 6), 4)}$ m⁻¹, so $\lambda = ${dec(lamNm(2, 6), 4)}$ nm ≈ ${dec(lamNm(2, 6), 3)} nm: a Balmer line, violet, at the edge of the visible.`,
  scheme: [['1/λ = R(1/4 − 1/36) = 2R/9', 1], ['λ = 410 nm', 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => near(lamFromE(2, 6), q.answer.value, 0.003) && region(lamNm(2, 6)) === 'visible' || 'b62');
add('lyman31-num', num({
  stem: 'Find the wavelength of the photon emitted when the electron of a hydrogen atom drops from the n = 3 level to the ground state, in nm (4 significant figures). (R = 1.097 × 10⁷ m⁻¹)',
  value: Number(dec(lamNm(1, 3), 4)), tol: 0.2, unit: 'nm',
  sol: r`$\dfrac{1}{\lambda} = R\left(1 - \dfrac{1}{9}\right) = \dfrac{8R}{9} = ${sci(invLam(1, 3), 4)}$ m⁻¹, so $\lambda = \dfrac{9}{8R} = ${dec(lamNm(1, 3), 4)}$ nm (Lyman series, ultraviolet).`,
  scheme: [['1/λ = 8R/9', 1], ['λ = 102.6 nm', 1]],
  marks: 2, d: 2, c: 'understanding', t: [3],
}), (q) => near(lamFromE(1, 3), q.answer.value, 0.002) || 'l31');
const sr2 = { ratio: lamNm(1, Infinity) / lamNm(2, Infinity) };
add('shortratio-num', num({
  stem: 'Find the ratio of the shortest wavelength of the Lyman series of hydrogen to the shortest wavelength of the Balmer series.',
  value: Number(dec(sr2.ratio, 2)), tol: 0.01, unit: null,
  sol: r`Series limits ($n_2 = \infty$): $\lambda_L = \dfrac{1}{R}$ and $\lambda_B = \dfrac{4}{R}$, so the ratio is $\dfrac{1}{4} = ${dec(sr2.ratio, 2)}$.`,
  scheme: [['λ_L/λ_B = (1/R)/(4/R) = 0.25', 1]],
  d: 2, c: 'understanding', t: [3],
}), (q) => near(lamFromE(1, Infinity) / lamFromE(2, Infinity), q.answer.value) || 'sr2');
add('lines6-num', num({
  stem: 'A sample of hydrogen gas is excited so that some of its atoms reach the n = 6 level. How many different spectral lines can the sample emit as these atoms return to the ground state?',
  value: nLines(6), tol: 0, unit: null,
  sol: r`Every pair of levels from 1 to 6 gives a different line: $\dfrac{n(n-1)}{2} = \dfrac{6 \times 5}{2} = ${nLines(6)}$.`,
  scheme: [['n(n − 1)/2 = 15', 1]],
  d: 1, c: 'understanding', t: [3],
}), (q) => {
  const set = new Set();
  for (let a = 1; a <= 6; a++) for (let b = a + 1; b <= 6; b++) set.add(lamNm(a, b).toFixed(6));
  return set.size === q.answer.value || `l6 ${set.size}`;
});
add('limit-tf', tf({
  stem: 'The series limit of the Balmer series of hydrogen, at about 365 nm, lies in the visible region of the spectrum.',
  key: 'f',
  sol: `False. λ = 4/R = ${dec(lamNm(2, Infinity), 4)} nm is shorter than about 400 nm, so it lies in the (near) ultraviolet; only the Balmer lines from n = 3 to 6 are visible.`,
  d: 2, c: 'understanding', t: [3],
}), () => region(lamNm(2, Infinity)) === 'ultraviolet' || 'lt');
const ov = { pFirst: lamNm(3, 4) };
ov.nFrom = [5, 6, 7, 8, 9, 10, 11, 12].find((n) => lamNm(4, n) < ov.pFirst);
add('overlap-tf', tf({
  stem: 'Some lines of the Brackett series of hydrogen have shorter wavelengths than the first line of the Paschen series.',
  key: 't',
  sol: `True. The first Paschen line (4 → 3) is at ${dec(ov.pFirst, 4)} nm, while the Brackett series runs from ${dec(lamNm(4, 5), 4)} nm down to its limit at ${dec(lamNm(4, Infinity), 4)} nm; its lines from n₂ = ${ov.nFrom} upwards (e.g. ${dec(lamNm(4, ov.nFrom), 4)} nm) are shorter than ${dec(ov.pFirst, 4)} nm. The infrared series overlap.`,
  d: 3, c: 'analysis', t: [3],
}), () => ov.nFrom === 9 && lamNm(4, Infinity) < ov.pFirst || `ov ${ov.nFrom}`);
add('coldgas-ar', ar({
  a: 'Hydrogen at room temperature, placed in a beam of ultraviolet and visible light, absorbs only wavelengths that belong to the Lyman series.',
  r: 'At room temperature most hydrogen atoms are in the n = 2 level.',
  key: 'c',
  sol: 'A is true: almost all the atoms are in the ground state, so every absorption starts from n = 1, giving Lyman wavelengths. R is false: the thermal energy at room temperature (about 0.03 eV) is far too small to supply the 10.2 eV needed to reach n = 2 — option (c).',
  d: 2, c: 'analysis', t: [3],
}), () => En(2) - En(1) > 300 * 0.025 || 'cg');
add('lymanbalmer-ar', ar({
  a: 'Every line of the Lyman series of hydrogen has a shorter wavelength than every line of the Balmer series.',
  r: 'Each Lyman photon carries at least 10.2 eV, while no Balmer photon carries more than 3.4 eV.',
  key: 'a',
  sol: `Both are true, and R explains A: λ = hc/E, and every Lyman energy (10.2–13.6 eV) exceeds every Balmer energy (1.89–3.4 eV), so the longest Lyman wavelength (${dec(lamNm(1, 2), 4)} nm) is shorter than the Balmer limit (${dec(lamNm(2, Infinity), 4)} nm) — option (a).`,
  d: 2, c: 'understanding', t: [3],
}), () => lamNm(1, 2) < lamNm(2, Infinity) && near(En(2) - En(1), 10.2) || 'lb');
add('transitions-match', match({
  stem: 'Match each electron jump in a hydrogen atom in Column A with the wavelength of the photon it emits in Column B.',
  pairs: [
    ['n = 2 → n = 1', `${dec(lamNm(1, 2), 4)} nm`],
    ['n = 3 → n = 2', `${dec(lamNm(2, 3), 4)} nm`],
    ['n = 4 → n = 3', `${dec(lamNm(3, 4), 4)} nm`],
    ['n = 6 → n = 4', `${dec(lamNm(4, 6), 4)} nm`],
  ],
  order: [2, 0, 3, 1],
  sol: `From 1/λ = R(1/n₁² − 1/n₂²): 2 → 1 gives ${dec(lamNm(1, 2), 4)} nm (1 → r); 3 → 2 gives ${dec(lamNm(2, 3), 4)} nm (2 → p); 4 → 3 gives ${dec(lamNm(3, 4), 4)} nm (3 → s); 6 → 4 gives ${dec(lamNm(4, 6), 4)} nm (4 → q). Larger energy gaps give shorter wavelengths.`,
  d: 2, c: 'application', t: [3],
}), () => [[1, 2], [2, 3], [3, 4], [4, 6]].every(([a, b]) => near(lamFromE(a, b), lamNm(a, b), 0.001)) || 'tm');
const id = { lam: 1005 };
id.x = 1 / (RY * id.lam * 1e-9);
id.inv2 = 1 / 9 - id.x;
id.n2 = Math.sqrt(1 / id.inv2);
add('identify-short3', short({
  marks: 3,
  stem: 'An infrared spectrometer records a hydrogen line at 1005 nm. Show that it cannot belong to the Lyman, Balmer or Brackett series, and identify the transition that produces it. (R = 1.097 × 10⁷ m⁻¹)',
  model: r`Ranges (series limit to first line): Lyman ${dec(lamNm(1, Infinity), 3)}–${dec(lamNm(1, 2), 4)} nm; Balmer ${dec(lamNm(2, Infinity), 4)}–${dec(lamNm(2, 3), 4)} nm; Brackett ${dec(lamNm(4, Infinity), 4)}–${dec(lamNm(4, 5), 4)} nm. 1005 nm is longer than every Lyman and Balmer line and shorter than the Brackett limit, so it can only be a Paschen line ($n_1 = 3$, ${dec(lamNm(3, Infinity), 3)}–${dec(lamNm(3, 4), 4)} nm).
$\dfrac{1}{9} - \dfrac{1}{n_2^2} = \dfrac{1}{R\lambda} = \dfrac{1}{1.097 \times 10^{7} \times 1005 \times 10^{-9}} = ${dec(id.x, 3)}$, so $\dfrac{1}{n_2^2} = ${dec(id.inv2, 3)}$ and $n_2 = ${dec(id.n2, 3)} \approx 7$.
The line comes from the jump **7 → 3** (Paschen, infrared).`,
  sol: 'Rule out by range; solve the Rydberg formula with n₁ = 3.',
  scheme: [['Ranges show only Paschen (n₁ = 3) fits', 1], ['1/n₂² = 0.0204', 1], ['n₂ = 7: jump 7 → 3', 1]],
  d: 3, c: 'analysis', t: [3], wl: null,
}), () => Math.round(id.n2) === 7 && Math.abs(id.n2 - 7) < 0.01 && lamNm(2, 3) < 1005 && 1005 < lamNm(4, Infinity) || `id ${id.n2}`);
const rf = { l1: 656.3, l2: 486.1 };
rf.dk = 1 / (rf.l2 * 1e-9) - 1 / (rf.l1 * 1e-9);
rf.R = rf.dk / (1 / 9 - 1 / 16);
rf.lim = 4 / rf.R;
add('rfromlines-short3', short({
  marks: 3,
  stem: 'Two lines of the Balmer series of hydrogen are measured at 656.3 nm (from n = 3) and 486.1 nm (from n = 4). Using only the difference of their wave numbers 1/λ, find the Rydberg constant, and use it to predict the series limit of the Balmer series.',
  model: r`$\dfrac{1}{\lambda_4} - \dfrac{1}{\lambda_3} = R\left[\left(\dfrac{1}{4} - \dfrac{1}{16}\right) - \left(\dfrac{1}{4} - \dfrac{1}{9}\right)\right] = R\left(\dfrac{1}{9} - \dfrac{1}{16}\right) = \dfrac{7R}{144}$.
$\dfrac{1}{486.1 \times 10^{-9}} - \dfrac{1}{656.3 \times 10^{-9}} = ${sci(1 / (rf.l2 * 1e-9), 5)} - ${sci(1 / (rf.l1 * 1e-9), 5)} = ${sci(rf.dk, 4)}$ m⁻¹, so $R = \dfrac{144}{7} \times ${sci(rf.dk, 4)} = ${sci(rf.R, 4)}$ m⁻¹.
Series limit: $\lambda_\infty = \dfrac{4}{R} = ${sci(rf.lim, 4)}$ m $\approx ${dec(rf.lim * 1e9, 4)}$ nm.`,
  sol: 'The difference of wave numbers is R(1/9 − 1/16).',
  scheme: [['Difference = R(1/9 − 1/16) = 7R/144', 1], ['R = 1.097 × 10⁷ m⁻¹', 1], ['Limit 4/R = 364.5 nm', 1]],
  d: 4, c: 'analysis', t: [3], wl: null,
}), () => near(rf.R, RY, 0.001) && near(rf.lim * 1e9, lamNm(2, Infinity), 0.001) || `rf ${rf.R}`);
const ry = { E1: 13.6, h: 6.6e-34 };
ry.R = (ry.E1 * QE) / (ry.h * CL);
add('rydberg-short3', short({
  marks: 3,
  stem: 'Using Bohr’s energy levels E_n = −me⁴/(8ε₀²n²h²), derive the formula for the wavelength of the line emitted when the electron of a hydrogen atom jumps from level n₂ to a lower level n₁, and write the Rydberg constant in terms of the fundamental constants. Show that R ≈ 1.1 × 10⁷ m⁻¹, taking me⁴/(8ε₀²h²) = 13.6 eV, h = 6.6 × 10⁻³⁴ J s and c = 3.0 × 10⁸ m s⁻¹.',
  model: r`The photon carries the energy difference: $\dfrac{hc}{\lambda} = E_{n_2} - E_{n_1} = \dfrac{me^4}{8\varepsilon_0^2h^2}\left(\dfrac{1}{n_1^2} - \dfrac{1}{n_2^2}\right)$.
So $\dfrac{1}{\lambda} = R\left(\dfrac{1}{n_1^2} - \dfrac{1}{n_2^2}\right)$ with $R = \dfrac{me^4}{8\varepsilon_0^2ch^3}$.
$R = \dfrac{13.6 \text{ eV}}{hc} = \dfrac{13.6 \times 1.6 \times 10^{-19}}{6.6 \times 10^{-34} \times 3.0 \times 10^{8}} = ${sci(ry.R, 3)}$ m⁻¹ ≈ 1.1 × 10⁷ m⁻¹.`,
  sol: 'hc/λ = E₂ − E₁; R = me⁴/(8ε₀²ch³) = 13.6 eV/hc.',
  scheme: [['hc/λ = E_{n₂} − E_{n₁}', 1], ['1/λ = R(1/n₁² − 1/n₂²), R = me⁴/(8ε₀²ch³)', 1], ['R = 1.10 × 10⁷ m⁻¹', 1]],
  d: 2, c: 'understanding', t: [3], wl: null,
}), () => near(ry.R, RY, 0.005) || `ry ${ry.R}`);
add('absorb-short2', short({
  marks: 2,
  stem: 'Light containing every wavelength from 50 nm to 2000 nm passes through hydrogen gas at room temperature. Explain which hydrogen series appears as dark lines in the transmitted light, and why the Balmer lines are not among them.',
  model: 'At room temperature almost every hydrogen atom is in the ground state (the thermal energy, about 0.03 eV, is far less than the 10.2 eV needed to reach n = 2). Absorption therefore always starts from n = 1, so the dark lines are the **Lyman series** (91–122 nm, ultraviolet). Balmer absorption would have to start from n = 2, and practically no atoms are there.',
  sol: 'All atoms in n = 1: only Lyman absorption.',
  scheme: [['Atoms in the ground state; absorption from n = 1 gives Lyman dark lines', 1], ['Balmer absorption needs atoms in n = 2: practically none', 1]],
  d: 3, c: 'analysis', t: [3], wl: null,
}));
const ir7 = { n: 7 };
ir7.total = nLines(7);
ir7.pbp = [3, 4, 5].reduce((s, lo) => s + (7 - lo), 0);
add('ir-short2', short({
  marks: 2,
  stem: 'Hydrogen atoms are excited to the n = 7 level. How many different lines can they emit in all, and how many of these belong to the Paschen, Brackett and Pfund series taken together? Explain.',
  model: r`In all: $\dfrac{n(n-1)}{2} = \dfrac{7 \times 6}{2} = ${ir7.total}$ lines. Paschen lines end on n = 3 and start from n = 4–7 (4 lines); Brackett end on n = 4 from 5–7 (3); Pfund end on n = 5 from 6–7 (2): ${ir7.pbp} lines together. (Of the rest, 6 are Lyman, 5 Balmer and 1, the jump 7 → 6, belongs to a further infrared series.)`,
  sol: 'Count pairs of levels; group by the lower level.',
  scheme: [['21 lines in all', 1], ['4 + 3 + 2 = 9 in the three infrared series', 1]],
  d: 3, c: 'analysis', t: [3], wl: null,
}), () => ir7.total === 21 && ir7.pbp === 9 && 6 + 5 + 9 + 1 === ir7.total || 'ir7');
const pf = { long: lamNm(5, 6), short: lamNm(5, Infinity) };
add('spectrum-long', long({
  stem: '(a) Draw (describe in words) an energy-level diagram of hydrogen showing the levels n = 1 to 5 with their energies, and mark the transitions that give the first line of the Lyman, Balmer and Paschen series. [2] (b) State the region of the spectrum in which the Brackett and Pfund series lie. [1] (c) Calculate the longest and the shortest wavelengths of the Pfund series. [2] (R = 1.097 × 10⁷ m⁻¹)',
  model: r`(a) Horizontal lines at $E_n = -13.6/n^2$ eV: n = 1 at −13.6 eV, n = 2 at −3.40 eV, n = 3 at −1.51 eV, n = 4 at −0.85 eV, n = 5 at −0.54 eV, with E = 0 (n = ∞) at the top; the gaps shrink upwards. Downward arrows: 2 → 1 (first Lyman line), 3 → 2 (first Balmer line), 4 → 3 (first Paschen line).

(b) Both lie in the infrared (Pfund in the far infrared).

(c) Pfund: $n_1 = 5$. Longest, $n_2 = 6$: $\dfrac{1}{\lambda} = R\left(\dfrac{1}{25} - \dfrac{1}{36}\right) = \dfrac{11R}{900}$, $\lambda = ${sci(pf.long * 1e-9, 3)}$ m $= ${dec(pf.long / 1000, 3)}$ μm. Shortest (series limit, $n_2 = \infty$): $\lambda = \dfrac{25}{R} = ${sci(pf.short * 1e-9, 3)}$ m $= ${dec(pf.short / 1000, 3)}$ μm.`,
  sol: 'Levels −13.6/n²; first lines n₂ = n₁ + 1; Pfund n₁ = 5.',
  scheme: [['Levels with energies, gaps shrinking upwards', 1], ['Arrows 2 → 1, 3 → 2, 4 → 3 labelled', 1], ['Infrared (Pfund far IR)', 1], ['Longest 7.46 μm', 1], ['Shortest 2.28 μm', 1]],
  d: 3, c: 'application', t: [3], wl: null,
}), () => near(lamFromE(5, 6), pf.long, 0.001) && near(lamFromE(5, Infinity), pf.short, 0.001) && near(pf.long, 7458, 0.001) || `pf ${pf.long}`);
const st = { a: 656.3, b: 1875, c: 102.6 };
st.Eb = HC / st.b;
add('star-long', long({
  stem: '(a) An astronomer records two hydrogen lines from a glowing gas cloud, at 656.3 nm and at 1875 nm. Identify the transition and series of each line. [2] (b) Find the energy, in eV, of a photon of the 1875 nm line. [1] (c) A student says that the two lines cannot come from the same gas, because one is visible and the other infrared. Evaluate this statement, and explain why the same cloud can also emit a line at 102.6 nm. [2] (R = 1.097 × 10⁷ m⁻¹, hc = 1240 eV nm)',
  model: r`(a) 656.3 nm: $\dfrac{1}{R\lambda} = ${dec(1 / (RY * st.a * 1e-9), 3)} = \dfrac{1}{4} - \dfrac{1}{9}$: jump 3 → 2, **Balmer** (visible, red). 1875 nm: $\dfrac{1}{R\lambda} = ${dec(1 / (RY * st.b * 1e-9), 3)} = \dfrac{1}{9} - \dfrac{1}{16}$: jump 4 → 3, **Paschen** (infrared).

(b) $E = \dfrac{1240}{1875} = ${dec(st.Eb, 3)}$ eV $\left(= 13.6\left(\dfrac{1}{9} - \dfrac{1}{16}\right)\right)$.

(c) The statement is wrong. Both lines come from jumps between energy levels of the same hydrogen atom; the region depends only on the size of the energy gap. An atom excited to n = 4 can fall 4 → 3 (infrared) and then 3 → 2 (red). The line at 102.6 nm is the jump 3 → 1 (Lyman, ultraviolet), another route down from the same level.`,
  sol: 'Identify by 1/(Rλ); E = hc/λ; all lines from one atom’s levels.',
  scheme: [['3 → 2 Balmer', 1], ['4 → 3 Paschen', 1], ['E = 0.661 eV', 1], ['Statement wrong: region depends on the gap; same atom', 1], ['102.6 nm is 3 → 1, Lyman', 1]],
  d: 3, c: 'analysis', t: [3], wl: null,
}), () => near(lamNm(2, 3), st.a, 0.001) && near(lamNm(3, 4), st.b, 0.001) && near(lamNm(1, 3), st.c, 0.001) && near(st.Eb, En(4) - En(3), 0.002) || `st ${st.Eb}`);
const n7 = { lam: 397.0 };
n7.E = HC / n7.lam;
n7.Eup = En(2) + n7.E;
n7.n = Math.sqrt(13.6 / -n7.Eup);
add('n7-num', num({
  stem: 'A hydrogen atom emits a photon of wavelength 397.0 nm as its electron falls to the n = 2 level. From which level did the electron fall? Give n. (E₁ = −13.6 eV, hc = 1240 eV nm)',
  value: Math.round(n7.n), tol: 0, unit: null,
  sol: r`Photon energy $= \dfrac{1240}{397.0} = ${dec(n7.E, 4)}$ eV. Upper level: $E = E_2 + ${dec(n7.E, 4)} = -3.40 + ${dec(n7.E, 4)} = ${dec(n7.Eup, 3)}$ eV $= -\dfrac{13.6}{n^2}$, so $n^2 = ${dec(n7.n ** 2, 3)}$ and $n = 7$ (a Balmer line just inside the ultraviolet).`,
  scheme: [['E = 3.12 eV; upper level −0.277 eV', 1], ['n = 7', 1]],
  marks: 2, d: 3, c: 'analysis', t: [3],
}), (q) => Math.abs(n7.n - 7) < 0.02 && near(lamNm(2, q.answer.value), 397.0, 0.001) || `n7 ${n7.n}`);
add('limitwave-mcq', mcq({
  stem: 'The shortest wavelength that hydrogen atoms can emit in the Paschen series is about',
  right: `${dec(lamNm(3, Infinity), 3)} nm`,
  wrong: [`${dec(lamNm(3, 4), 4)} nm`, `${dec(lamNm(2, Infinity), 3)} nm`, `${dec(lamNm(4, Infinity), 4)} nm`],
  sol: r`The shortest line is the series limit, $n_2 = \infty$: $\lambda = \dfrac{9}{R} = ${dec(lamNm(3, Infinity), 4)}$ nm — option (@K). ${dec(lamNm(3, 4), 4)} nm is the longest Paschen line; ${dec(lamNm(2, Infinity), 3)} nm is the Balmer limit and ${dec(lamNm(4, Infinity), 4)} nm the Brackett limit.`,
  d: 2, c: 'application', t: [3],
}), () => near(lamFromE(3, Infinity), lamNm(3, Infinity), 0.001) || 'lw');
add('seriesname-mcq', mcq({
  stem: 'All the spectral lines of hydrogen produced by electrons falling to the n = 5 level belong to the',
  right: 'Pfund series, in the far infrared',
  wrong: ['Brackett series, in the infrared', 'Paschen series, in the infrared', 'Balmer series, in the visible region'],
  sol: 'Lines ending on n = 1, 2, 3, 4 and 5 form the Lyman, Balmer, Paschen, Brackett and Pfund series; the Pfund lines (2.28–7.46 μm) are in the far infrared — option (@K).',
  d: 1, c: 'understanding', t: [3],
}), () => lamNm(5, Infinity) > 2000 || 'sn');
