// ISC 11 ch01 Units and Measurement — question bank, part 2: written answers (2-mark, 3-mark and 5-mark items set in parts).
// Numbers are computed here and re-checked by `check` functions (a different route). Model answers are plain text so that word limits count honestly.
import { mk, add, near } from './lib.mjs';
import { roundSf, pt, mean, meanAbsErr, Q, A, T, L, M, dmul, ddiv, dpow, deq, dimTxt, convert, orderOfMag, AU, LY, PARSEC, YEAR, ARCSEC } from './calc.mjs';
import { unitTxt } from './decks.mjs';

const { short, long } = mk;
const br = (d) => `[${dimTxt(d)}]`;

// ================================================================ 2-mark short answers
add('goodunit-short', short({
  marks: 2,
  stem: 'A student proposes to use the length of her own stride as the unit of length for a school project. Give two reasons, based on the properties of a good unit, why a standards body would reject it.',
  model: 'A stride is not invariable: it changes with walking speed, tiredness and the ground, so the standard would not stay the same. It is also not well defined or reproducible: nobody else can set up exactly the same stride, so measurements made by different people could not be compared.',
  sol: 'Invariability and reproducibility.',
  scheme: [['Not invariable: the stride changes with conditions', 1], ['Not reproducible or well defined: others cannot copy it, so results cannot be compared', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('fps-short', short({
  marks: 2,
  stem: 'Name the base units of length, mass and time in the FPS system, and give the name of the unit of work in the CGS system.',
  model: 'In the FPS system length is measured in foot, mass in pound and time in second. In the CGS system work is force times distance, that is dyne times centimetre, and this unit is called the erg.',
  sol: 'Foot, pound, second; erg.',
  scheme: [['Foot, pound and second', 1], ['Erg = dyne × centimetre', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('mksa-short', short({
  marks: 2,
  stem: 'How does the MKSA system differ from the MKS system, and why was the extra base unit needed?',
  model: 'The MKSA system adds a fourth base unit, the ampere for electric current, to the metre, kilogram and second of the MKS system. Electric current cannot be expressed through mass, length and time alone, so the units of charge, potential difference and resistance needed an independent base unit.',
  sol: 'Ampere added for current.',
  scheme: [['MKSA adds the ampere (electric current) to m, kg, s', 1], ['Current is independent of mass, length and time, so electrical units need it', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('radian-short', short({
  marks: 2,
  stem: 'Define the radian and show from the definition that an angle measured in radian has no dimensions.',
  model: 'One radian is the angle subtended at the centre of a circle by an arc whose length equals the radius. In general the angle is the arc divided by the radius, θ = s/r. Both are lengths, so its dimensions are [L]/[L] = 1: the radian is a pure ratio and has no dimensions.',
  sol: 'θ = s/r, ratio of lengths.',
  scheme: [['Definition: arc equal to the radius, θ = s/r', 1], ['[θ] = [L]/[L], dimensionless', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('rules-short', short({
  marks: 2,
  stem: 'A lab report says: "The cart of mass 4 Kgs. moved with a speed of 3 metre/s." Rewrite the sentence following the SI rules and name two rules that were broken.',
  model: 'Corrected: "The cart of mass 4 kg moved with a speed of 3 m s⁻¹." Rules broken: the symbol is kg, not Kg, and a symbol is never made plural and takes no full stop; a unit name and a symbol must not be mixed, as in metre/s.',
  sol: 'Check capital, plural, full stop, mixing.',
  scheme: [['Corrected sentence: 4 kg and 3 m s⁻¹', 1], ['Two rules named: for example no plural or full stop, no mixing of names and symbols', 1]],
  d: 2, c: 'application', t: [2],
}));
const pf = { t: 45e-6, P: 0.8e9 };
add('prefix-short', short({
  marks: 2,
  stem: 'Express 45 μs and 0.8 GW in SI base units without any prefix.',
  model: `Micro stands for 10⁻⁶, so 45 μs = 45 × 10⁻⁶ s = ${pt(pf.t, 2)} s. Giga stands for 10⁹, so 0.8 GW = 0.8 × 10⁹ W = ${pt(pf.P, 2)} W.`,
  sol: 'Replace each prefix by its power of ten.',
  scheme: [[`45 μs = ${pt(pf.t, 2)} s`, 1], [`0.8 GW = ${pt(pf.P, 2)} W`, 1]],
  d: 1, c: 'application', t: [2],
}), () => near(45 * 1e-6, 4.5e-5) && near(0.8 * 1e9, 8e8) || 'pf');
add('surf-short', short({
  marks: 2,
  stem: 'Surface tension is a force per unit length and is measured in N m⁻¹. Express this unit in SI base units and say which base units appear.',
  model: `The newton is ${unitTxt(Q.force)}, so N m⁻¹ = ${unitTxt(Q.force)} ÷ m = ${unitTxt(Q.surfTension)}. Only two base units appear in it: the kilogram and the second.`,
  sol: 'Divide the base form of the newton by metre.',
  scheme: [[`N m⁻¹ = ${unitTxt(Q.surfTension)}`, 1], ['Base units: kilogram and second', 1]],
  d: 2, c: 'application', t: [2],
}), () => unitTxt(ddiv(Q.force, L)) === 'kg s⁻²' || 'surf');
const pc1 = { b: 1.496e11, p: 4.85e-6 };
pc1.D = pc1.b / pc1.p;
add('parsec-short', short({
  marks: 2,
  stem: 'Define one parsec and show that it is about 3.1 × 10¹⁶ m, given 1 AU = 1.496 × 10¹¹ m and 1 arcsecond = 4.85 × 10⁻⁶ rad.',
  model: `One parsec is the distance at which a baseline of 1 AU subtends a parallax angle of 1 arcsecond. Then D = b/p = 1.496 × 10¹¹ m ÷ 4.85 × 10⁻⁶ = ${pt(pc1.D, 3)} m, which is about 3.1 × 10¹⁶ m.`,
  sol: 'D = b / p with b = 1 AU.',
  scheme: [['Definition: 1 AU subtends 1 arcsecond', 1], [`D = b/p ≈ ${pt(pc1.D, 3)} m ≈ 3.1 × 10¹⁶ m`, 1]],
  d: 2, c: 'application', t: [3],
}), () => near(1.496e11 / Math.tan(4.85e-6), 3.08e16, 0.01) || 'pc1');
add('methods-short', short({
  marks: 2,
  stem: 'Name a suitable method or instrument for measuring (i) the thickness of a human hair and (ii) the distance of the planet Venus from the Earth, and say why it suits the size.',
  model: '(i) A screw gauge, or a microscope fitted with a scale, measures the thickness of a hair, which is a small fraction of a millimetre. (ii) The distance of Venus is found by sending a radar pulse and timing its echo, or by the parallax method, since no scale can reach so far.',
  sol: 'Match the method to the scale.',
  scheme: [['Screw gauge or microscope with scale for the hair, with reason', 1], ['Radar echo or parallax for Venus, with reason', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('accprec-short', short({
  marks: 2,
  stem: 'Five shots at a target all land close together but about 8 cm from the bullseye. Is the shooting accurate, is it precise, and what type of error is likely?',
  model: 'The shooting is precise, because the shots lie close together, but it is not accurate, because they are far from the bullseye, the true value. A steady offset of every shot points to a systematic error, such as a misaligned sight.',
  sol: 'Precision against accuracy; steady offset.',
  scheme: [['Precise but not accurate, with reason', 1], ['Systematic error, for example a misaligned sight', 1]],
  d: 3, c: 'analysis', t: [4],
}));
const rd = { a: roundSf(6.355, 3), b: roundSf(0.04725, 3) };
add('round-short', short({
  marks: 2,
  stem: 'Round off (a) 6.355 and (b) 0.04725 to three significant figures, stating the rule you apply.',
  model: `When the dropped digit is exactly 5 with nothing after it, the last kept digit is made even. (a) In 6.355 the kept digit 5 is odd, so it is raised and 6.355 becomes ${rd.a}. (b) In 0.04725 the kept digit 2 is even, so it stays and 0.04725 becomes ${rd.b}.`,
  sol: 'Even-digit rule for a dropped 5.',
  scheme: [[`6.355 → ${rd.a} with the rule`, 1], [`0.04725 → ${rd.b}`, 1]],
  d: 2, c: 'application', t: [4],
}), () => rd.a === 6.36 && rd.b === 0.0472 || 'rd');
add('homog-short', short({
  marks: 2,
  stem: 'State the principle of homogeneity. In the relation v = a + bt, where v is a speed and t is a time, find the dimensions of a and b.',
  model: `Principle: every term of a correct physical equation has the same dimensions. Since v is ${br(Q.velocity)}, the term a must also be ${br(Q.velocity)}, and bt is ${br(Q.velocity)}, so b is ${br(Q.velocity)} ÷ [T] = ${br(Q.accel)}.`,
  sol: 'Each term has the dimensions of v.',
  scheme: [['Statement of the principle', 1], [`[a] = ${br(Q.velocity)} and [b] = ${br(Q.accel)}`, 1]],
  d: 2, c: 'application', t: [5],
}), () => deq(ddiv(Q.velocity, T), Q.accel) || 'homog');
add('limit-short', short({
  marks: 2,
  stem: 'State two limitations of dimensional analysis, with an example of each.',
  model: 'It cannot give dimensionless constants: it cannot show whether kinetic energy is mv² or ½mv², since the ½ has no dimensions. It cannot handle sums of terms, or sin, log and exponential of a dimensional quantity, and it cannot separate quantities with equal dimensions, such as work and torque.',
  sol: 'Pure numbers; functions and equal dimensions.',
  scheme: [['No pure numbers, with the ½ example', 1], ['Cannot test functions or tell work from torque', 1]],
  d: 2, c: 'understanding', t: [6],
}));

// ================================================================ 3-mark short answers
add('funddev-short3', short({
  marks: 3,
  stem: 'Distinguish between fundamental and derived units, giving two examples of each, and write the unit of density in the CGS system.',
  model: 'Fundamental (base) units belong to base quantities that are chosen independently of one another, such as the metre and the second. Derived units are formed by combining base units, such as the newton and the joule. Density is mass per unit volume, so its CGS unit is gram per cubic centimetre, g cm⁻³.',
  sol: 'Base against derived; density = mass ÷ volume.',
  scheme: [['Fundamental units: independent base quantities, two examples', 1], ['Derived units: combinations, two examples', 1], ['CGS density unit g cm⁻³', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('seven-short3', short({
  marks: 3,
  stem: 'List the seven SI base quantities with their units and symbols, and say what happens to the radian and the steradian in the modern SI.',
  model: 'The seven SI base quantities and units are: length, metre (m); mass, kilogram (kg); time, second (s); electric current, ampere (A); thermodynamic temperature, kelvin (K); amount of substance, mole (mol); luminous intensity, candela (cd). The radian and steradian, once called supplementary units, are now treated as dimensionless derived units.',
  sol: 'Seven pairs; supplementary units now derived.',
  scheme: [['Any four base quantities with correct units and symbols', 1], ['The remaining three with units and symbols', 1], ['Radian and steradian are dimensionless derived units', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('derive-short3', short({
  marks: 3,
  stem: 'Starting from the defining relations, express the newton, the joule and the pascal in SI base units.',
  model: `Force = mass × acceleration, so 1 N = 1 kg × 1 m s⁻² = ${unitTxt(Q.force)}. Work = force × distance, so 1 J = 1 N m = ${unitTxt(Q.energy)}. Pressure = force ÷ area, so 1 Pa = 1 N ÷ 1 m² = ${unitTxt(Q.pressure)}.`,
  sol: 'Use F = ma, W = Fs and P = F/A.',
  scheme: [[`N = ${unitTxt(Q.force)}`, 1], [`J = ${unitTxt(Q.energy)}`, 1], [`Pa = ${unitTxt(Q.pressure)}`, 1]],
  d: 2, c: 'application', t: [2],
}), () => unitTxt(dmul(M, L, dpow(T, -2))) === 'kg m s⁻²' && unitTxt(dmul(M, dpow(L, 2), dpow(T, -2))) === 'kg m² s⁻²' || 'derive');
const pr3 = [[4.7e-8, 'm', 1e-9, 'nm'], [6.2e9, 'Hz', 1e9, 'GHz'], [8.1e-12, 'F', 1e-12, 'pF']].map(([x, u, f, pre]) => ({ x, u, f, pre, m: x / f }));
add('prefix-short3', short({
  marks: 3,
  stem: 'Rewrite each quantity with a suitable SI prefix: 4.7 × 10⁻⁸ m, 6.2 × 10⁹ Hz and 8.1 × 10⁻¹² F.',
  model: `4.7 × 10⁻⁸ m = ${pt(pr3[0].m, 2)} × 10⁻⁹ m = ${pt(pr3[0].m, 2)} nm. 6.2 × 10⁹ Hz is ${pt(pr3[1].m, 2)} GHz, because giga stands for 10⁹. 8.1 × 10⁻¹² F is ${pt(pr3[2].m, 2)} pF, because pico stands for 10⁻¹². Each prefix is joined directly to the unit symbol, and only one prefix is used.`,
  sol: 'Match each power of ten to a prefix.',
  scheme: [[`${pt(pr3[0].m, 2)} nm`, 1], [`${pt(pr3[1].m, 2)} GHz`, 1], [`${pt(pr3[2].m, 2)} pF`, 1]],
  d: 2, c: 'application', t: [2],
}), () => near(4.7e-8 / 1e-9, 47) && near(6.2e9 / 1e9, 6.2) && near(8.1e-12 / 1e-12, 8.1) || 'pr3');
const ly3 = { pcly: 3.08e16 / 9.46e15, lyau: 9.46e15 / 1.496e11 };
add('ly-short3', short({
  marks: 3,
  stem: 'Taking 1 ly = 9.46 × 10¹⁵ m, 1 pc = 3.08 × 10¹⁶ m and 1 AU = 1.496 × 10¹¹ m, show that 1 pc is about 3.26 ly and find how many astronomical units make one light year.',
  model: `1 pc ÷ 1 ly = 3.08 × 10¹⁶ ÷ 9.46 × 10¹⁵ = ${pt(ly3.pcly, 3)}, so 1 pc ≈ 3.26 ly. 1 ly ÷ 1 AU = 9.46 × 10¹⁵ ÷ 1.496 × 10¹¹ ≈ ${pt(ly3.lyau, 3)}. So one light year is about 63 200 astronomical units, and the parsec is the longer of the two units.`,
  sol: 'Divide one unit by the other in metre.',
  scheme: [[`1 pc / 1 ly = ${pt(ly3.pcly, 3)}`, 1], [`1 ly / 1 AU ≈ ${pt(ly3.lyau, 3)}`, 1], ['Conclusion: 1 pc ≈ 3.26 ly and 1 ly ≈ 6.32 × 10⁴ AU', 1]],
  d: 2, c: 'application', t: [3],
}), () => near(ly3.pcly, 3.256, 0.001) && near(ly3.lyau, 63235, 0.001) || 'ly3');
add('parallax-short3', short({
  marks: 3,
  stem: 'Explain the parallax method of finding the distance of a nearby star, and say why it fails for very distant stars.',
  model: 'The star is observed from the two ends of a known baseline b, such as opposite points of the Earth\'s orbit, and the small angle p by which its direction shifts is measured. Then the distance is D = b/p, with p in radian. For very distant stars p becomes too small to measure, so the method fails.',
  sol: 'Baseline, angle, D = b/p; tiny angles.',
  scheme: [['Observation from two ends of a known baseline', 1], ['D = b/p with p in radian', 1], ['Reason: p too small to measure for distant stars', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('mass-short3', short({
  marks: 3,
  stem: 'Describe how the method and the unit used differ when finding the mass of a bag of rice, of a carbon atom and of the Earth.',
  model: 'A bag of rice is weighed on a beam or electronic balance and its mass is quoted in kilogram. A carbon atom is far too light for any balance; its mass is found with a mass spectrometer and quoted in unified atomic mass units. The mass of the Earth is deduced from the law of gravitation and orbital data, and quoted in kilogram with a power of ten.',
  sol: 'Balance, mass spectrometer, gravitation.',
  scheme: [['Rice: balance, kilogram', 1], ['Atom: mass spectrometer, unified atomic mass unit', 1], ['Earth: gravitation and orbits, kilogram with powers of ten', 1]],
  d: 2, c: 'understanding', t: [3],
}));
const sc3 = { l: 18.6, b: 12.25, x: 24.37, y: 8.1 };
sc3.A = sc3.l * sc3.b;
sc3.Ar = roundSf(sc3.A, 3);
sc3.sum = sc3.x + sc3.y;
sc3.sr = Number(sc3.sum.toFixed(1));
add('sfcalc-short3', short({
  marks: 3,
  stem: 'A rectangular tile measures 18.6 cm by 12.25 cm, and a strip 24.37 cm long is joined end to end to a piece 8.1 cm long. Find (i) the area of the tile and (ii) the combined length, each with the correct number of significant figures.',
  model: `(i) Area = 18.6 × 12.25 = ${sc3.A.toFixed(2)} cm². The factor 18.6 has three significant figures, so the area is ${sc3.Ar} cm². (ii) The sum 24.37 + 8.1 = ${sc3.sum.toFixed(2)} cm. The least precise number, 8.1 cm, has one decimal place, so the length is ${sc3.sr.toFixed(1)} cm.`,
  sol: 'Multiply by significant figures, add by decimal places.',
  scheme: [[`Product ${sc3.A.toFixed(2)} cm²`, 1], [`Area ${sc3.Ar} cm² (3 significant figures)`, 1], [`Length ${sc3.sr.toFixed(1)} cm (one decimal place)`, 1]],
  d: 2, c: 'application', t: [4],
}), () => sc3.Ar === 228 && sc3.sr === 32.5 && near(18.6 * 12.25, 227.85) || 'sc3');
const e3 = { v: [2.05, 2.11, 2.08, 2.06, 2.1] };
e3.m = mean(e3.v);
e3.e = meanAbsErr(e3.v);
e3.pct = (e3.e / e3.m) * 100;
add('err-short3', short({
  marks: 3,
  stem: 'Five timings of the same swing of a pendulum are 2.05, 2.11, 2.08, 2.06 and 2.10 s. Find the mean, the mean absolute error and the percentage error.',
  model: `Mean = (2.05 + 2.11 + 2.08 + 2.06 + 2.10) ÷ 5 = ${e3.m.toFixed(2)} s. The absolute errors are 0.03, 0.03, 0.00, 0.02 and 0.02 s, so the mean absolute error = 0.10 ÷ 5 = ${e3.e.toFixed(2)} s. Percentage error = ${e3.e.toFixed(2)} ÷ ${e3.m.toFixed(2)} × 100 ≈ ${pt(e3.pct, 2)} %.`,
  sol: 'Mean, then |mean − reading|, then ratio.',
  scheme: [[`Mean ${e3.m.toFixed(2)} s`, 1], [`Mean absolute error ${e3.e.toFixed(2)} s`, 1], [`Percentage error ≈ ${pt(e3.pct, 2)} %`, 1]],
  d: 3, c: 'application', t: [4],
}), () => near((Math.abs(2.08 - 2.05) + Math.abs(2.08 - 2.11) + 0 + Math.abs(2.08 - 2.06) + Math.abs(2.08 - 2.1)) / 5 / 2.08 * 100, e3.pct, 0.03) || 'e3');
const o3 = { yr: 65 };
o3.s = o3.yr * YEAR;
o3.k = orderOfMag(o3.s);
add('oom-short3', short({
  marks: 3,
  stem: 'Estimate the order of magnitude of the number of seconds in a human life of 65 years, taking 1 year = 3.156 × 10⁷ s, and state the rule you use.',
  model: `Number of seconds = 65 × 3.156 × 10⁷ = ${pt(o3.s, 3)}. Writing N = a × 10ᵏ, the order of magnitude is 10ᵏ when a is up to 3.16, and 10ᵏ⁺¹ when a is larger. Here a = 2.05, which is below 3.16, so the order of magnitude is 10⁹ s.`,
  sol: 'Multiply, then apply the 3.16 rule.',
  scheme: [[`N = 65 × 3.156 × 10⁷ = ${pt(o3.s, 3)}`, 1], ['Rule: compare a with 3.16', 1], [`Order of magnitude 10${'⁹'} s`, 1]],
  d: 2, c: 'application', t: [4],
}), () => o3.k === 9 && near(65 * 3.156e7, 2.0514e9, 0.001) || 'o3');
const dc = { G: ddiv(dmul(Q.force, dpow(L, 2)), dpow(M, 2)), h: ddiv(Q.energy, Q.frequency) };
add('dimconst-short3', short({
  marks: 3,
  stem: 'From F = G m₁m₂/r² find the dimensional formula of the gravitational constant G, and from E = hν, where ν is a frequency, find that of the Planck constant h.',
  model: `G = F r²/(m₁m₂), so [G] = [M L T⁻²][L²]/[M²] = ${br(dc.G)}. The Planck constant is h = E/ν, so [h] = [M L² T⁻²]/[T⁻¹] = ${br(dc.h)}. Each constant takes the dimensions that make its equation balance.`,
  sol: 'Make each constant the subject, then insert dimensions.',
  scheme: [['Rearrangement G = F r² / (m₁ m₂)', 1], [`[G] = ${br(dc.G)}`, 1], [`[h] = ${br(dc.h)}`, 1]],
  d: 3, c: 'application', t: [5],
}), () => dimTxt(dc.G) === 'M⁻¹ L³ T⁻²' && dimTxt(dc.h) === 'M L² T⁻¹' || 'dc');
add('check-short3', short({
  marks: 3,
  stem: 'Show by dimensions that F = mv²/r is acceptable for the force on a stone whirled in a circle, but that F = mvr is not.',
  model: `For F = mv²/r: [mv²/r] = [M][L² T⁻²]/[L] = ${br(Q.force)}, the dimensions of force, so the relation is consistent. For F = mvr: [M][L T⁻¹][L] = ${br(Q.angMom)}, which differs from ${br(Q.force)}, so that relation cannot be correct.`,
  sol: 'Compare the dimensions of each right side with those of force.',
  scheme: [['Principle: both sides must have equal dimensions', 1], [`mv²/r gives ${br(Q.force)}, so it is consistent`, 1], [`mvr gives ${br(Q.angMom)}, so it is not consistent`, 1]],
  d: 3, c: 'application', t: [6],
}), () => deq(ddiv(dmul(M, dpow(Q.velocity, 2)), L), Q.force) && !deq(dmul(M, Q.velocity, L), Q.force) || 'chk');
const cj = convert(1, Q.energy, 'SI', 'CGS');
add('convert-short3', short({
  marks: 3,
  stem: 'Use dimensions to show that 1 joule equals 10⁷ erg, where the erg is the CGS unit of work.',
  model: `The dimensions of work are [M L² T⁻²]. Then n₂ = n₁ (M₁/M₂)(L₁/L₂)²(T₁/T₂)⁻² = 1 × (1 kg/1 g)(1 m/1 cm)² × 1 = 10³ × 10⁴ = 10⁷. So 1 J = 10⁷ erg. The same method converts any quantity whose dimensions are known.`,
  sol: 'Insert the ratios of unit sizes with the powers of the dimensions.',
  scheme: [['Dimensions [M L² T⁻²]', 1], ['Substitution of unit ratios 10³ and (10²)²', 1], ['1 J = 10⁷ erg', 1]],
  d: 2, c: 'application', t: [6],
}), () => near(cj, 1e7) || 'cj');

// ================================================================ 5-mark long answers, set in parts
const nw = { a: convert(1, Q.force, 'SI', 'CGS') };
add('systems-long', long({
  stem: '(a) What is meant by a unit? State three properties of a good unit. [2] (b) Name the base units of length, mass and time in the CGS, FPS and MKS systems. [1] (c) Using dimensions, show that 1 newton = 10⁵ dyne. [2]',
  model: `(a) A unit is a reference standard of the same kind as the quantity measured. A good unit is well defined, reproducible and invariable (also convenient in size). (b) CGS: centimetre, gram, second; FPS: foot, pound, second; MKS: metre, kilogram, second. (c) Force has dimensions [M L T⁻²]. Then 1 N = 1 kg m s⁻² = 10³ g × 10² cm s⁻² = 10⁵ g cm s⁻², and 1 dyne = 1 g cm s⁻², so 1 N = 10⁵ dyne.`,
  sol: 'Definition and properties; base units; convert with dimensions.',
  scheme: [['Unit defined as a reference standard; any three properties', 2], ['Base units of the three systems', 1], ['[F] = [M L T⁻²] and the conversion 10³ × 10² = 10⁵', 1], ['1 N = 10⁵ dyne', 1]],
  d: 3, c: 'application', t: [1, 6],
}), () => near(nw.a, 1e5) || 'nw');
add('rules-long', long({
  stem: '(a) State any three SI rules for writing unit names and symbols. [3] (b) A student writes "Force = 25 Newtons" and "Length = 40 Km." Rewrite both entries correctly and give the reason for each correction. [2]',
  model: '(a) Names of units are written in lower case, even when named after a person. A symbol is a capital letter only if the unit is named after a person. Symbols are never made plural, take no full stop except at the end of a sentence, and are written a space after the number. Names and symbols must not be mixed, and only one prefix is used. (b) "Force = 25 newtons" or "25 N": the name newton starts with a small letter. "Length = 40 km": the prefix symbol kilo is a small k, and no full stop follows the symbol.',
  sol: 'Rules of case, plural, full stop, space and prefix.',
  scheme: [['Three correct rules', 3], ['25 newtons or 25 N, with the reason (lower-case name)', 1], ['40 km, with the reason (small k, no full stop)', 1]],
  d: 2, c: 'understanding', t: [2],
}));
const pl = { p: 0.25 };
pl.pc = 1 / pl.p;
pl.m = pl.pc * PARSEC;
pl.ly = pl.m / LY;
add('parallax-long', long({
  stem: '(a) Define the parsec and show how the definition follows from D = b/p. [2] (b) A star has a parallax of 0.25 arcsecond measured with a baseline of 1 AU. Find its distance in parsec, in light year and in metre, given 1 pc = 3.08 × 10¹⁶ m and 1 ly = 9.46 × 10¹⁵ m. [3]',
  model: `(a) The parallax p of a star is the angle subtended at the star by the baseline b, and D = b/p with p in radian. One parsec is the distance at which the baseline of 1 AU subtends p = 1 arcsecond, so 1 pc = 1 AU ÷ (4.85 × 10⁻⁶) ≈ 3.08 × 10¹⁶ m. In parsec the distance is simply one over the parallax in arcsecond. (b) D = 1 ÷ 0.25 = ${pt(pl.pc, 2)} pc. In metre, D = ${pt(pl.pc, 2)} × 3.08 × 10¹⁶ = ${pt(pl.m, 3)} m. In light year, D = ${pt(pl.m, 3)} ÷ 9.46 × 10¹⁵ ≈ ${pt(pl.ly, 3)} ly.`,
  sol: 'D in parsec = 1 / p in arcsecond; then convert.',
  scheme: [['Parallax and D = b/p', 1], ['Parsec defined as D when 1 AU subtends 1 arcsecond', 1], [`D = ${pt(pl.pc, 2)} pc`, 1], [`D ≈ ${pt(pl.m, 3)} m`, 1], [`D ≈ ${pt(pl.ly, 3)} ly`, 1]],
  d: 3, c: 'application', t: [3],
}), () => near(pl.pc, 4) && near((1 / 0.25) * 3.08e16, pl.m) && near(pl.ly, 13.02, 0.005) || 'pl');
const el = { v: [2.04, 2.07, 2.05, 2.08, 2.06] };
el.m = mean(el.v);
el.e = meanAbsErr(el.v);
el.pct = (el.e / el.m) * 100;
add('err-long', long({
  stem: '(a) Distinguish between systematic and random errors, giving two causes of each. [2] (b) Five measurements of the length of a table are 2.04, 2.07, 2.05, 2.08 and 2.06 m. Find the mean, the mean absolute error and the percentage error. [3]',
  model: `(a) Systematic errors push every reading the same way; causes are a zero error and a faulty scale. Random errors scatter readings on both sides of the true value; causes are small changes in reaction time and in temperature, and averaging reduces them. (b) Mean = (2.04 + 2.07 + 2.05 + 2.08 + 2.06) ÷ 5 = ${el.m.toFixed(2)} m. The absolute errors are 0.02, 0.01, 0.01, 0.02 and 0.00 m, so the mean absolute error = 0.06 ÷ 5 = ${el.e.toFixed(3)} m. Percentage error = ${el.e.toFixed(3)} ÷ ${el.m.toFixed(2)} × 100 ≈ ${pt(el.pct, 2)} %.`,
  sol: 'Kinds of error; mean, absolute errors, percentage.',
  scheme: [['Systematic errors with two causes', 1], ['Random errors with two causes', 1], [`Mean ${el.m.toFixed(2)} m`, 1], [`Mean absolute error ${el.e.toFixed(3)} m`, 1], [`Percentage error ≈ ${pt(el.pct, 2)} %`, 1]],
  d: 3, c: 'application', t: [4],
}), () => near(((2.06 - 2.04) + (2.07 - 2.06) + (2.06 - 2.05) + (2.08 - 2.06) + 0) / 5 / 2.06 * 100, el.pct, 0.03) || 'el');
const sl5 = { r: roundSf(9.725, 3), A: 12.5 * 3.2, s: 6.52 + 0.8 };
sl5.Ar = roundSf(sl5.A, 2);
sl5.sr = Number(sl5.s.toFixed(1));
add('sf-long', long({
  stem: '(a) State the rules for counting significant figures, with an example of each rule. [2] (b) Round off 9.725 to three significant figures. [1] (c) A plate measures 12.5 cm by 3.2 cm, and a rod 6.52 cm long is added to a rod 0.8 cm long. Find the area of the plate and the total length of the rods, with the correct number of significant figures. [2]',
  model: `(a) All non-zero digits count, as in 2.57. Zeros between non-zero digits count, as in 3.0052. Leading zeros do not count, as in 0.0043. Trailing zeros after a decimal point count, as in 6.200, but trailing zeros of a whole number with no decimal point do not, as in 4500. (b) The dropped digit is exactly 5 and the last kept digit 2 is even, so 9.725 becomes ${sl5.r}. (c) Area = ${sl5.A.toFixed(1)} cm² and the factor 3.2 has two significant figures, so the area is ${(sl5.Ar / 10).toFixed(1)} × 10¹ cm². The sum 6.52 + 0.8 = ${sl5.s.toFixed(2)} cm is given to one decimal place: ${sl5.sr.toFixed(1)} cm.`,
  sol: 'Rules, even-digit rounding, then arithmetic rules.',
  scheme: [['Rules for non-zero, embedded and leading zeros', 1], ['Rules for trailing zeros with examples', 1], [`9.725 → ${sl5.r}`, 1], [`Area ${(sl5.Ar / 10).toFixed(1)} × 10¹ cm²`, 1], [`Length ${sl5.sr.toFixed(1)} cm`, 1]],
  d: 3, c: 'application', t: [4],
}), () => sl5.r === 9.72 && near(sl5.Ar, 40) && sl5.sr === 7.3 || 'sl5');
const vdw = { a: dmul(Q.pressure, dpow(L, 6)), b: dpow(L, 3) };
add('dim-long', long({
  stem: '(a) State the principle of homogeneity. [1] (b) Use it to decide whether s = ut + ½at² and K = ½mv are dimensionally correct, where K is kinetic energy. [2] (c) In the equation (P + a/V²)(V − b) = RT for a real gas, P is pressure and V is volume. Find the dimensional formulae of a and b. [2]',
  model: `(a) Every term of a correct physical equation has the same dimensions. (b) In s = ut + ½at² the terms have dimensions [L], [L T⁻¹][T] = [L] and [L T⁻²][T²] = [L], so the equation is consistent. In K = ½mv the right side is [M L T⁻¹] but energy is ${br(Q.energy)}, so it is wrong. (c) a/V² must have the dimensions of P, so [a] = [P][V²] = ${br(Q.pressure)}[L⁶] = ${br(vdw.a)}. The term b must have the dimensions of V, so [b] = [L³].`,
  sol: 'Compare each term; a/V² like P, b like V.',
  scheme: [['Statement of the principle', 1], ['s = ut + ½at² consistent, with the dimensions of each term', 1], ['K = ½mv inconsistent', 1], [`[a] = ${br(vdw.a)}`, 1], ['[b] = [L³]', 1]],
  d: 5, c: 'analysis', t: [5, 6],
}), () => dimTxt(vdw.a) === 'M L⁵ T⁻²' && dimTxt(vdw.b) === 'L³' && !deq(dmul(M, Q.velocity), Q.energy) || 'vdw');
const gc = convert(6.67e-11, ddiv(dmul(Q.force, dpow(L, 2)), dpow(M, 2)), 'SI', 'CGS');
add('conv-long', long({
  stem: '(a) A quantity has dimensions [Mᵃ Lᵇ Tᶜ] and numerical value n₁ in a system with units M₁, L₁, T₁. Derive its numerical value n₂ in a system with units M₂, L₂, T₂. [2] (b) Using the result, convert G = 6.67 × 10⁻¹¹ N m² kg⁻² into CGS units. [2] (c) State one limitation of this method of converting units. [1]',
  model: `(a) The quantity is the same in both systems: n₁[Mᵃ Lᵇ Tᶜ]₁ = n₂[Mᵃ Lᵇ Tᶜ]₂. Dividing, n₂ = n₁ (M₁/M₂)ᵃ (L₁/L₂)ᵇ (T₁/T₂)ᶜ. (b) The dimensions of G are [M⁻¹ L³ T⁻²], so n₂ = 6.67 × 10⁻¹¹ × (1 kg/1 g)⁻¹ × (1 m/1 cm)³ = 6.67 × 10⁻¹¹ × 10⁻³ × 10⁶ = ${pt(gc, 3)} in g⁻¹ cm³ s⁻², the CGS unit. (c) It works only for units related by a pure factor: it cannot convert scales with a shifted zero, such as degree Celsius to degree Fahrenheit, and it needs the dimensional formula of the quantity.`,
  sol: 'Equate the two descriptions; insert unit ratios.',
  scheme: [['Equating the same quantity in both systems', 1], ['Formula for n₂', 1], ['Dimensions of G and unit ratios 10⁻³ and 10⁶', 1], [`G = ${pt(gc, 3)} in CGS units`, 1], ['A valid limitation, for example no scales with a shifted zero', 1]],
  d: 5, c: 'application', t: [6],
}), () => near(gc, 6.67e-8) || 'gc');
void [A, ARCSEC, AU, orderOfMag];
