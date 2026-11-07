// ICSE 9 Physics ch01 Measurements and Experimentation — question bank in ICSE school-examination style.
// Every number comes from calc.mjs. Vernier and screw-gauge readings are always pictorial (the syllabus removes non-pictorial ones).
// AR keys follow the 521 specimen order: a = (A) true (R) false, b = (A) false (R) true, c = both true and R explains, d = both true and R does not explain.
import { mk, add, svgV, r } from './lib.mjs';
import * as K from './calc.mjs';
import { VERN, SCREW, CYL2, GRAPH_B_FIG } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, long, match } = mk;
const term = (o) => short({ marks: 1, wl: null, scheme: [[o.sch ?? 'Correct answer', 1]], ...o });
const fv = (svg, alt) => svgV(svg, alt);
const sh = (a, b) => (a === b ? true : `got ${a}, expected ${b}`);

// ---------------------------------------------------------------- deck-check items (not used in tests)
add('chk-base', mcq({
  stem: 'Which one of the following is NOT a fundamental SI unit?',
  right: 'newton', wrong: ['metre', 'kelvin', 'second'],
  sol: 'The newton is the unit of force, which is derived from kilogram, metre and second, so it is not fundamental, option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('chk-conv', mcq({
  stem: 'A liquid has a density of 1.2 g cm⁻³. Its density in kg m⁻³ is',
  right: `${K.GCM3_TO_KGM3(1.2)} kg m⁻³`, wrong: ['12 kg m⁻³', '120 kg m⁻³', '0.0012 kg m⁻³'],
  sol: r`$1.2 \times 1000 = ${K.GCM3_TO_KGM3(1.2)}$ kg m⁻³, option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => sh(K.GCM3_TO_KGM3(1.2), 1200));
add('chk-lc', mcq({
  stem: 'Between the 20 mL and the 30 mL marks of a measuring cylinder there are 5 equal divisions. Its least count is',
  right: `${K.LC.cylA} mL`, wrong: ['0.5 mL', '5 mL', '10 mL'],
  sol: r`$\dfrac{30 - 20}{5} = ${K.LC.cylA}$ mL, option (@K).`,
  d: 2, c: 'application', t: [2],
}));
add('chk-acc', mcq({
  stem: 'A rule (least count 1 mm), a Vernier callipers (0.1 mm) and a screw gauge (0.01 mm) are used to measure the thickness of a coin. The most accurate value is given by',
  right: 'the screw gauge', wrong: ['the rule', 'the Vernier callipers', 'all three equally'],
  sol: 'The smallest least count gives the smallest possible error, option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('chk-vlc', mcq({
  stem: 'In a Vernier callipers 10 vernier divisions are equal to 9 main scale divisions, and one main scale division is 1 mm. Its least count is',
  right: '0.1 mm', wrong: ['0.9 mm', '1.0 mm', '0.01 mm'],
  sol: r`$\dfrac{1\ \text{mm}}{10} = ${K.VLC_MM}$ mm, option (@K).`,
  d: 2, c: 'application', t: [3],
}));
add('chk-slc', mcq({
  stem: 'The spindle of a screw gauge moves 3 mm in 6 full turns of the thimble, which has 50 divisions. Its least count is',
  right: '0.01 mm', wrong: ['0.05 mm', '0.1 mm', '0.5 mm'],
  sol: r`Pitch $= \dfrac{3}{6} = ${K.SLC.pitch}$ mm; least count $= \dfrac{${K.SLC.pitch}}{50} = ${K.SLC.half}$ mm, option (@K).`,
  d: 3, c: 'application', t: [4],
}));
add('chk-pen', mcq({
  stem: 'The effective length of a simple pendulum is made 9 times as large at the same place. Its time period',
  right: 'becomes 3 times as large', wrong: ['becomes 9 times as large', 'becomes one third', 'does not change'],
  sol: r`$T \propto \sqrt{l}$, so $T$ changes by a factor $\sqrt{9} = 3$, option (@K).`,
  d: 2, c: 'application', t: [5],
}));
add('chk-slope', mcq({
  stem: r`The slope of the straight line of an $l$ against $T^2$ graph of a simple pendulum is $0.25$ m s⁻². The value of $g$ is`,
  right: r`$g = 4\pi^2 \times 0.25$`, wrong: [r`$g = \dfrac{0.25}{4\pi^2}$`, r`$g = \dfrac{4\pi^2}{0.25}$`, r`$g = 2\pi \times 0.25$`],
  sol: r`Slope $= \dfrac{g}{4\pi^2}$, so $g = 4\pi^2 \times$ slope, option (@K).`,
  d: 2, c: 'application', t: [5],
}));

// ---------------------------------------------------------------- t01 units
add('si-mcq1', mcq({
  stem: 'Which of the following is a fundamental physical quantity?',
  right: 'Electric current', wrong: ['Force', 'Density', 'Momentum'],
  sol: 'Electric current is one of the seven fundamental quantities; the other three are derived, option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('si-mcq2', mcq({
  stem: 'Momentum is the product of mass and velocity. Its SI unit in terms of fundamental units is',
  right: 'kg m s⁻¹', wrong: ['kg m s⁻²', 'kg m² s⁻¹', 'kg s m⁻¹'],
  sol: 'kg × (m s⁻¹) = kg m s⁻¹, option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('si-mcq3', mcq({
  stem: 'A school bus travels at 90 km h⁻¹ on an expressway. Its speed in m s⁻¹ is',
  right: `${K.SPEED_MS.c}`, wrong: ['90', '324', '1.5'],
  sol: r`$\dfrac{90 \times 1000}{3600} = ${K.SPEED_MS.c}$ m s⁻¹, option (@K).`,
  d: 2, c: 'application', t: [1],
}));
add('si-mcq4', mcq({
  stem: 'The relation between the cgs and SI units of density is',
  right: '1 g cm⁻³ = 1000 kg m⁻³', wrong: ['1 g cm⁻³ = 100 kg m⁻³', '1 g cm⁻³ = 10 kg m⁻³', '1 g cm⁻³ = 0.001 kg m⁻³'],
  sol: 'A gram is 10⁻³ kg and a cm³ is 10⁻⁶ m³, so 1 g cm⁻³ = 1000 kg m⁻³, option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('si-mcq5', mcq({
  stem: 'The base units of the fps system of units are',
  right: 'foot, pound and second', wrong: ['foot, kilogram and second', 'centimetre, pound and second', 'metre, pound and hour'],
  sol: 'The fps system uses the foot, the pound and the second, option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('ar-si', ar({
  a: 'The ampere is a fundamental unit of the SI system.',
  r: 'The newton is a derived unit of the SI system.',
  key: 'd',
  sol: 'Both statements are true, but the newton being derived says nothing about why the ampere is fundamental, option (d).',
  d: 2, c: 'understanding', t: [1],
}));
add('si-tf', tf({
  stem: 'In the cgs system the unit of mass is the gram and the unit of length is the centimetre.',
  key: 't',
  sol: 'True. The cgs system is centimetre, gram, second.',
  d: 1, c: 'recall', t: [1],
}));
add('si-fill', fill({
  stem: 'The SI units of electric current, temperature, luminous intensity and amount of substance are the ___, ___, ___ and ___ respectively.',
  marks: 4,
  acc: [['ampere'], ['kelvin'], ['candela'], ['mole']],
  sol: 'Ampere, kelvin, candela and mole.',
  d: 1, c: 'recall', t: [1],
}));
add('si-term1', term({
  stem: 'Name the unit of mass in the fps system.',
  model: 'The **pound**.', sol: 'Pound.', sch: 'Pound',
  d: 1, c: 'recall', t: [1],
}));
add('si-num1', num({
  stem: 'A sheet of aluminium has a density of 2.7 g cm⁻³. Find its density in kg m⁻³.',
  value: K.DENS.alu, tol: 0, unit: 'kg m⁻³',
  sol: r`$2.7 \times 1000 = ${K.DENS.alu}$ kg m⁻³.`,
  scheme: [['Factor 1000', 0.5], [`${K.DENS.alu} kg m⁻³`, 0.5]],
  d: 1, c: 'application', t: [1],
}), () => sh(K.DENS.alu, 2700));
add('si-num2', num({
  stem: 'A parcel weighs 20 lb. Find its mass in kg, to two decimal places. (1 lb = 0.4536 kg)',
  value: K.PARCEL_KG, tol: 0.005, unit: 'kg',
  sol: r`$20 \times 0.4536 = ${K.PARCEL_KG}$ kg (9.072 rounded to two decimal places).`,
  scheme: [['Multiplication by 0.4536', 0.5], [`${K.PARCEL_KG} kg`, 0.5]],
  d: 2, c: 'application', t: [1],
}), () => sh(K.PARCEL_KG, 9.07));
add('si-num3', num({
  stem: 'A boy is 5.5 ft tall. Find his height in cm. (1 ft = 30.48 cm)',
  value: K.HEIGHT_CM, tol: 0.01, unit: 'cm',
  sol: r`$5.5 \times 30.48 = ${K.HEIGHT_CM}$ cm.`,
  scheme: [['Multiplication by 30.48', 0.5], [`${K.HEIGHT_CM} cm`, 0.5]],
  d: 2, c: 'application', t: [1],
}), () => sh(K.HEIGHT_CM, 167.64));
add('si-short2a', short({
  marks: 2,
  stem: 'Using the formulae density = mass ÷ volume and momentum = mass × velocity, write the SI units of density and momentum in terms of fundamental units.',
  wl: null,
  model: '**Density:** kg ÷ m³ = **kg m⁻³**.\n\n**Momentum:** kg × m s⁻¹ = **kg m s⁻¹**.',
  sol: 'Follow each formula with kg, m and s.',
  scheme: [['Density kg m⁻³', 1], ['Momentum kg m s⁻¹', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('si-short2b', short({
  marks: 2,
  stem: 'A cyclist rides at 36 km h⁻¹. Convert this speed to m s⁻¹ and say whether it is a fundamental or a derived quantity.',
  wl: null,
  model: r`$36\ \text{km h}^{-1} = \dfrac{36 \times 1000}{3600} = ${K.KMH_36}$ m s⁻¹.` + '\n\nSpeed is a **derived** quantity (distance ÷ time).',
  sol: 'Divide by 3.6; speed is derived.',
  scheme: [[`${K.KMH_36} m s⁻¹ with working`, 1], ['Derived', 1]],
  d: 2, c: 'application', t: [1],
}), () => sh(K.KMH_36, 10));
add('si-short3', short({
  marks: 3,
  stem: 'A steel rod has a density of 7.8 g cm⁻³ and a toy car has a mass of 250 g. (a) Express the density in kg m⁻³. (b) Express the mass of the toy car in kg. (c) Name the system of units in which the mass would be written in pounds.',
  wl: null,
  model: `**(a)** 7.8 × 1000 = **${K.GCM3_TO_KGM3(7.8)} kg m⁻³**.\n\n**(b)** 250 g = 250 ÷ 1000 = **0.25 kg**.\n\n**(c)** The **fps** system (foot, pound, second).`,
  sol: 'Multiply by 1000; divide by 1000; fps.',
  scheme: [['(a) 7800 kg m⁻³', 1], ['(b) 0.25 kg', 1], ['(c) fps', 1]],
  d: 2, c: 'application', t: [1],
}), () => sh(K.GCM3_TO_KGM3(7.8), 7800));

// ---------------------------------------------------------------- t02 least count
add('lc-mcq1', mcq({
  stem: 'The least count of an instrument is',
  right: 'the smallest value that it can measure accurately', wrong: ['the largest value that it can measure', 'the number of divisions on its scale', 'the full range of its scale'],
  sol: 'The least count is the smallest reading the instrument can give accurately, option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('lc-mcq2', mcq({
  stem: 'The pointer of a mechanical stopwatch makes one revolution in 60 s and the dial has 300 equal divisions. The least count of the stopwatch is',
  right: `${K.LC.watch} s`, wrong: ['0.1 s', '0.5 s', '5 s'],
  sol: r`$\dfrac{60}{300} = ${K.LC.watch}$ s, option (@K).`,
  d: 2, c: 'application', t: [2],
}));
add('lc-mcq3', mcq({
  stem: 'The figure shows the water level in a measuring cylinder marked every 2 mL. The volume of water is',
  right: '34 mL', wrong: ['32 mL', '36 mL', '37 mL'],
  sol: 'The level is 2 small divisions above 30 mL: 30 + 2 × 2 = 34 mL, option (@K).',
  d: 2, c: 'application', t: [2],
  assets: [fv(CYL2, 'A measuring cylinder with the water level two small divisions above the 30 millilitre mark')],
}));
add('ar-lc', ar({
  a: 'A stopwatch that reads to 0.01 s gives a more accurate time than one that reads to 0.1 s.',
  r: 'An instrument with a larger least count is more accurate.',
  key: 'a',
  sol: 'The smaller least count makes (A) true; (R) is false because the larger least count means a larger possible error, option (a).',
  d: 2, c: 'analysis', t: [2],
}));
add('lc-tf', tf({
  stem: 'A rule marked in millimetres can be used to measure the length of a pencil correctly to 0.01 cm.',
  key: 'f',
  sol: 'False. Its least count is 1 mm = 0.1 cm, so the length can be read only to 0.1 cm.',
  d: 2, c: 'understanding', t: [2],
}));
add('lc-term1', term({
  stem: 'Write the least count of a metre rule in centimetre.',
  model: '**0.1 cm**.', sol: '1 mm = 0.1 cm.', sch: '0.1 cm',
  d: 1, c: 'recall', t: [2],
}));
add('lc-num1', num({
  stem: 'A measuring cylinder is graduated from 0 to 100 mL with 40 equal divisions. Find its least count in mL.',
  value: K.LC.cylC, tol: 0, unit: 'mL',
  sol: r`$\dfrac{100}{40} = ${K.LC.cylC}$ mL.`,
  scheme: [['Range ÷ divisions', 0.5], [`${K.LC.cylC} mL`, 0.5]],
  d: 1, c: 'application', t: [2],
}));
add('lc-short2', short({
  marks: 2,
  stem: 'Define the least count of an instrument and state how it is related to the accuracy of a measurement.',
  wl: null,
  model: 'It is the **smallest reading the instrument can measure accurately**. The **smaller the least count, the more accurate** the measurement.',
  sol: 'Smallest measurable value; smaller means more accurate.',
  scheme: [['Definition', 1], ['Smaller least count gives greater accuracy', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('lc-short3', short({
  marks: 3,
  stem: `A ball dropped from a height of ${K.FALL_H} m takes about ${K.FALL_T} s to reach the ground. A student times it with two stopwatches of least count 0.1 s and 0.01 s. (a) Find the possible error in each timing as a percentage of ${K.FALL_T} s, correct to the nearest whole number for the first and one decimal place for the second. (b) State which stopwatch is better.`,
  wl: null,
  model: `**(a)** First: 0.1 ÷ ${K.FALL_T} × 100 = **${K.FALL_ERR_COARSE}%**. Second: 0.01 ÷ ${K.FALL_T} × 100 = **${K.FALL_ERR_FINE}%**.\n\n**(b)** The stopwatch of least count **0.01 s**, because its possible error is much smaller.`,
  sol: '16% and 1.6%; the 0.01 s stopwatch.',
  scheme: [['16%', 1], ['1.6%', 1], ['Better stopwatch with reason', 1]],
  d: 3, c: 'application', t: [2],
}), () => sh(K.FALL_ERR_COARSE, 16));

// ---------------------------------------------------------------- t03 Vernier callipers (pictorial readings only)
add('ver-mcq1', mcq({
  stem: 'In a Vernier callipers 20 vernier divisions are equal to 19 main scale divisions, and one main scale division is 1 mm. Its least count is',
  right: `${K.VLC.twenty} mm`, wrong: ['0.1 mm', '0.5 mm', '0.95 mm'],
  sol: r`$\dfrac{1}{20} = ${K.VLC.twenty}$ mm, option (@K).`,
  d: 2, c: 'application', t: [3],
}));
add('ver-mcq2', mcq({
  stem: 'The figure shows the scales of a Vernier callipers (least count 0.01 cm, no zero error) with a metal ball held between the jaws. The diameter of the ball is',
  right: `${K.vCm(K.V.qMcq)} cm`, wrong: ['1.21 cm', '1.39 cm', '1.92 cm'],
  sol: r`Main scale reading $12$ mm; the 9th line coincides, so $9 \times 0.1 = 0.9$ mm; $12 + 0.9 = 12.9$ mm $= ${K.vCm(K.V.qMcq)}$ cm, option (@K).`,
  d: 3, c: 'application', t: [3],
  assets: [fv(VERN.qMcq, 'Vernier scale with the zero between the 12th and 13th millimetre marks and the 9th line coinciding')],
}));
add('ver-mcq3', mcq({
  stem: 'The figure shows a Vernier callipers with its jaws closed (least count 0.01 cm). Its zero error is',
  right: '+0.02 cm', wrong: ['−0.02 cm', '+0.08 cm', '−0.08 cm'],
  sol: 'The vernier zero is to the right of the main zero and the 2nd line coincides, so the error is positive: 2 × 0.01 = +0.02 cm, option (@K).',
  d: 2, c: 'application', t: [3],
  assets: [fv(VERN.q2Closed, 'Vernier callipers with jaws closed and the 2nd vernier line coinciding')],
}));
add('ar-zero', ar({
  a: 'A positive zero error of a Vernier callipers is subtracted from the observed reading.',
  r: 'With a positive zero error the instrument shows readings larger than the true values.',
  key: 'c',
  sol: 'The observed reading is too large by the zero error, so it must be subtracted; (R) explains (A), option (c).',
  d: 2, c: 'analysis', t: [3],
}));
add('ver-tf', tf({
  stem: 'If the vernier zero lies to the left of the main scale zero when the jaws are closed, the zero error is negative.',
  key: 't',
  sol: 'True. The instrument reads less than zero, so the error is negative and is added to the reading.',
  d: 2, c: 'understanding', t: [3],
}));
add('ver-num1', num({
  stem: 'The figure shows the scales of a Vernier callipers (least count 0.01 cm, no zero error) holding a marble. Find its diameter in cm.',
  value: K.vCm(K.V.q1), tol: 0.001, unit: 'cm',
  sol: r`Main scale $36$ mm; the 6th line coincides: $6 \times 0.1 = 0.6$ mm; $36 + 0.6 = 36.6$ mm $= ${K.vCm(K.V.q1)}$ cm.`,
  scheme: [['Main scale reading 36 mm', 0.5], [`${K.vCm(K.V.q1)} cm`, 0.5]],
  d: 2, c: 'application', t: [3],
  assets: [fv(VERN.q1, 'Vernier scale with the zero between the 36th and 37th millimetre marks and the 6th line coinciding')],
}), () => sh(K.vCm(K.V.q1), 3.66));
add('ver-num2', num({
  stem: 'Figure 1 shows the scales of a Vernier callipers with the jaws closed and Figure 2 shows them with a cylinder held between the jaws. The least count is 0.01 cm. Find the true diameter of the cylinder in cm.',
  value: K.Q2_TRUE, tol: 0.001, unit: 'cm',
  sol: r`Zero error $= +2 \times 0.01 = +0.02$ cm. Observed reading $= 27 + 5 \times 0.1 = 27.5$ mm $= ${K.vCm(K.V.q2)}$ cm. True diameter $= ${K.vCm(K.V.q2)} - 0.02 = ${K.Q2_TRUE}$ cm.`,
  scheme: [['Zero error +0.02 cm', 0.5], [`${K.Q2_TRUE} cm`, 0.5]],
  d: 3, c: 'application', t: [3],
  assets: [fv(VERN.q2Closed, 'Figure 1: Vernier callipers with jaws closed'), fv(VERN.q2, 'Figure 2: Vernier callipers holding a cylinder, zero between the 27th and 28th millimetre marks')],
}), () => sh(K.Q2_TRUE, 2.73));
add('ver-short2', short({
  marks: 2,
  stem: 'What is meant by the zero error of a Vernier callipers? State how a reading is corrected when the zero error is positive.',
  wl: null,
  model: 'It is the reading shown by the instrument when the jaws are closed and should read zero. For a **positive** zero error, the error is **subtracted** from the observed reading.',
  sol: 'Reading with the jaws closed; subtract a positive error.',
  scheme: [['Meaning of zero error', 1], ['Subtract a positive error', 1]],
  d: 1, c: 'understanding', t: [3],
}));
add('ver-short3', short({
  marks: 3,
  stem: 'A Vernier callipers has 10 vernier divisions equal to 9 main scale divisions, with 1 main division = 1 mm. (a) Find the length of one vernier division. (b) Hence find the least count in mm. (c) Why is a Vernier callipers preferred to a metre rule for measuring the diameter of a test tube?',
  wl: null,
  model: `**(a)** 9 mm ÷ 10 = **0.9 mm**.\n\n**(b)** Least count = 1 − 0.9 = **0.1 mm**.\n\n**(c)** Its least count is 10 times smaller, so it measures the diameter **more accurately**.`,
  sol: '0.9 mm; 0.1 mm; smaller least count.',
  scheme: [['0.9 mm', 1], ['0.1 mm', 1], ['More accurate because smaller least count', 1]],
  d: 2, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- t04 screw gauge (pictorial readings only)
add('scr-mcq1', mcq({
  stem: 'The spindle of a screw gauge advances 7.5 mm in 15 complete turns of the thimble. Its pitch is',
  right: `${K.SLC.pitch} mm`, wrong: ['0.05 mm', '2 mm', '7.5 mm'],
  sol: r`Pitch $= \dfrac{7.5}{15} = ${K.SLC.pitch}$ mm, option (@K).`,
  d: 2, c: 'application', t: [4],
}));
add('scr-mcq2', mcq({
  stem: 'The figure shows a screw gauge (pitch 1 mm, 100 divisions, no zero error) with a thin sheet between the jaws. The thickness of the sheet is',
  right: `${K.sMm(K.S_.qMcq)} mm`, wrong: ['3.78 mm', '3.82 mm', '3.028 mm'],
  sol: r`Linear scale $3$ mm; circular scale $28 \times 0.01 = 0.28$ mm; $3 + 0.28 = ${K.sMm(K.S_.qMcq)}$ mm, option (@K).`,
  d: 3, c: 'application', t: [4],
  assets: [fv(SCREW.qMcq, 'Screw gauge with the thimble edge between the 3 mm and 4 mm marks and division 28 on the datum line')],
}));
add('scr-tf', tf({
  stem: 'The ratchet of a screw gauge prevents the spindle from being tightened too much on the object.',
  key: 't',
  sol: 'True. The ratchet slips when the pressure is enough, so the object is not squeezed.',
  d: 1, c: 'recall', t: [4],
}));
add('scr-mcq3', mcq({
  stem: 'The part of a screw gauge that carries the circular scale is the',
  right: 'thimble', wrong: ['anvil', 'sleeve', 'ratchet'],
  sol: 'The circular scale is marked on the thimble, option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('scr-fill', fill({
  stem: 'The distance moved by the spindle of a screw gauge in one complete turn of the thimble is called its ___.',
  acc: [['pitch']],
  sol: 'The **pitch**.',
  d: 1, c: 'recall', t: [4],
}));
add('scr-num1', num({
  stem: 'The figure shows a screw gauge (pitch 1 mm, 100 divisions, no zero error) with a wire between the jaws. Find the diameter of the wire in mm.',
  value: K.sMm(K.S_.q1), tol: 0.001, unit: 'mm',
  sol: r`Linear scale $1$ mm; circular scale $62 \times 0.01 = 0.62$ mm; $1 + 0.62 = ${K.sMm(K.S_.q1)}$ mm.`,
  scheme: [['Linear and circular parts', 0.5], [`${K.sMm(K.S_.q1)} mm`, 0.5]],
  d: 2, c: 'application', t: [4],
  assets: [fv(SCREW.q1, 'Screw gauge with the thimble edge between the 1 mm and 2 mm marks and division 62 on the datum line')],
}), () => sh(K.sMm(K.S_.q1), 1.62));
add('scr-num2', num({
  stem: 'Figure 1 shows a screw gauge with its jaws closed and Figure 2 shows it with a thin wire between the jaws (pitch 1 mm, 100 divisions). Find the true diameter of the wire in mm.',
  value: K.Q2S_TRUE, tol: 0.001, unit: 'mm',
  sol: r`Zero error $= -(100 - 94) \times 0.01 = -0.06$ mm. Observed reading $= 0 + 71 \times 0.01 = ${K.sMm(K.S_.q2)}$ mm. True diameter $= ${K.sMm(K.S_.q2)} - (-0.06) = ${K.Q2S_TRUE}$ mm.`,
  scheme: [['Zero error −0.06 mm', 0.5], [`${K.Q2S_TRUE} mm`, 0.5]],
  d: 3, c: 'application', t: [4],
  assets: [fv(SCREW.q2Closed, 'Figure 1: screw gauge with jaws closed and division 94 on the datum line'), fv(SCREW.q2, 'Figure 2: screw gauge with a wire, division 71 on the datum line and no millimetre mark visible')],
}), () => sh(K.Q2S_TRUE, 0.77));
add('scr-short2', short({
  marks: 2,
  stem: 'Define the pitch of a screw gauge and write the formula for its least count.',
  wl: null,
  model: 'The pitch is the **distance moved by the spindle in one full turn** of the thimble. **Least count = pitch ÷ number of divisions on the circular scale.**',
  sol: 'Pitch definition; LC = pitch ÷ divisions.',
  scheme: [['Pitch defined', 1], ['Formula for least count', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('scr-short3', short({
  marks: 3,
  stem: 'The figure shows a screw gauge (pitch 1 mm, 100 divisions) with its jaws closed. (a) State its zero error with the sign. (b) State whether the error is added to or subtracted from an observed reading. (c) State the use of the ratchet.',
  wl: null,
  model: `**(a)** Division 97 is on the datum line, so the error is −(100 − 97) × 0.01 = **${K.SHORTS_ZERO} mm**.\n\n**(b)** A negative error is **added** to the observed reading.\n\n**(c)** The ratchet **stops the spindle being tightened too much**, so the object is not squeezed.`,
  sol: '−0.03 mm; added; avoids over-tightening.',
  scheme: [['−0.03 mm', 1], ['Added', 1], ['Use of the ratchet', 1]],
  d: 3, c: 'application', t: [4],
  assets: [fv(SCREW.shortClosed, 'Screw gauge with the jaws closed and division 97 on the datum line')],
}), () => sh(K.SHORTS_ZERO, -0.03));

// ---------------------------------------------------------------- t05 simple pendulum
add('pen-mcq1', mcq({
  stem: 'The effective length of a simple pendulum is the distance from the point of suspension to',
  right: 'the centre of the bob', wrong: ['the top of the bob', 'the bottom of the bob', 'the middle of the thread'],
  sol: 'The length is measured up to the centre of the bob (the centre of mass), option (@K).',
  d: 1, c: 'understanding', t: [5],
}));
add('pen-mcq2', mcq({
  stem: 'At the same place the mass of the bob of a simple pendulum is doubled and its effective length is made four times as large. Its time period',
  right: 'becomes twice as large', wrong: ['becomes four times as large', 'becomes half', 'remains the same'],
  sol: 'The mass has no effect and T ∝ √l, so T becomes √4 = 2 times as large, option (@K).',
  d: 3, c: 'analysis', t: [5],
}));
add('pen-mcq3', mcq({
  stem: 'A simple pendulum completes 30 oscillations in 60 s. Its time period and frequency are',
  right: `${K.OSC2_T} s and ${K.OSC2_F} Hz`, wrong: ['0.5 s and 2 Hz', '2 s and 2 Hz', '30 s and 0.5 Hz'],
  sol: r`$T = \dfrac{60}{30} = ${K.OSC2_T}$ s and $f = \dfrac{1}{T} = ${K.OSC2_F}$ Hz, option (@K).`,
  d: 2, c: 'application', t: [5],
}));
add('pen-mcq4', mcq({
  stem: 'A pendulum is taken to a planet where g is one sixth of its value on the Earth, and its length is unchanged. Its time period becomes about',
  right: `${K.SLOW} times as large`, wrong: ['6 times as large', '0.41 times as large', 'the same'],
  sol: r`$T \propto \dfrac{1}{\sqrt{g}}$, so $T$ becomes $\sqrt{6} = ${K.SLOW}$ times as large, option (@K).`,
  d: 3, c: 'application', t: [5],
}));
add('pen-mcq5', mcq({
  stem: 'At a given place, the time period of a simple pendulum depends on',
  right: 'its effective length', wrong: ['the mass of its bob', 'the material of its bob', 'the colour of its thread'],
  sol: 'T = 2π√(l/g) contains only the effective length and g, option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('ar-pen', ar({
  a: 'The time period of a simple pendulum becomes longer if a heavier bob is used.',
  r: 'The time period of a simple pendulum depends on its effective length and on the acceleration due to gravity.',
  key: 'b',
  sol: 'The period does not depend on the mass, so (A) is false; (R) is true, option (b).',
  d: 2, c: 'analysis', t: [5],
}));
add('pen-tf', tf({
  stem: 'The time period of a simple pendulum of fixed length depends on the mass of its bob.',
  key: 'f',
  sol: 'False. T = 2π√(l/g) contains only l and g.',
  d: 1, c: 'recall', t: [5],
}));
add('pen-term1', term({
  stem: 'Define the frequency of a simple pendulum and state its SI unit.',
  model: 'The **number of oscillations made per second**; its unit is the **hertz (Hz)**.', sol: 'Oscillations per second; hertz.', sch: 'Definition and unit',
  d: 1, c: 'recall', t: [5],
}));
add('pen-num1', num({
  stem: 'Find the time period of a simple pendulum of effective length 0.40 m. (π = 3.14 and g = 10 m s⁻²)',
  value: K.PEN2_T, tol: 0.01, unit: 's',
  sol: r`$T = 2\pi\sqrt{\dfrac{l}{g}} = 2 \times 3.14 \times \sqrt{\dfrac{0.40}{10}} = ${K.PEN2_T}$ s.`,
  scheme: [['Substitution', 0.5], [`${K.PEN2_T} s`, 0.5]],
  d: 2, c: 'application', t: [5],
}), () => sh(K.PEN2_T, 1.26));
add('pen-num2', num({
  stem: 'A seconds pendulum has a time period of 2 s. Find its effective length in m. (π = 3.14 and g = 10 m s⁻²)',
  value: K.SECONDS_L, tol: 0.01, unit: 'm',
  sol: r`$l = \dfrac{gT^2}{4\pi^2} = \dfrac{10 \times 4}{4 \times 3.14 \times 3.14} = ${K.SECONDS_L}$ m.`,
  scheme: [['Formula rearranged', 0.5], [`${K.SECONDS_L} m`, 0.5]],
  d: 3, c: 'application', t: [5],
}), () => sh(K.SECONDS_L, 1.01));
add('pen-num3', num({
  stem: 'In an experiment a pendulum of effective length 0.64 m makes 20 oscillations in 32.0 s. Find the value of g obtained, in m s⁻², to two decimal places. (π = 3.14)',
  value: K.EXP1_G, tol: 0.01, unit: 'm s⁻²',
  sol: r`$T = \dfrac{32.0}{20} = ${K.EXP1_T}$ s. $g = \dfrac{4\pi^2 l}{T^2} = \dfrac{4 \times 3.14 \times 3.14 \times 0.64}{1.6 \times 1.6} = ${K.EXP1_G}$ m s⁻².`,
  scheme: [['T = 1.6 s', 0.5], [`${K.EXP1_G} m s⁻²`, 0.5]],
  d: 3, c: 'application', t: [5],
}), () => sh(K.EXP1_G, 9.86));
add('pen-num4', num({
  stem: 'A pendulum makes 24 oscillations in 60 s. Find its frequency in hertz.',
  value: K.OSC_F, tol: 0.005, unit: 'Hz',
  sol: r`$T = \dfrac{60}{24} = ${K.OSC_T}$ s, so $f = \dfrac{1}{${K.OSC_T}} = ${K.OSC_F}$ Hz.`,
  scheme: [['T = 2.5 s', 0.5], [`${K.OSC_F} Hz`, 0.5]],
  d: 2, c: 'application', t: [5],
}), () => sh(K.OSC_F, 0.4));
add('pen-short2a', short({
  marks: 2,
  stem: 'State two factors on which the time period of a simple pendulum depends and one factor on which it does not depend.',
  wl: null,
  model: 'It depends on the **effective length** and on the **acceleration due to gravity** at the place. It does **not** depend on the **mass of the bob**.',
  sol: 'Length and g; not mass.',
  scheme: [['Two factors', 1], ['One factor that does not matter', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('pen-short2b', short({
  marks: 2,
  stem: 'In an experiment on the simple pendulum why is the effective length measured up to the centre of the bob and not up to its top?',
  wl: null,
  model: 'The bob swings as if all its mass were at its **centre**, so the thread alone is shorter than the true length. The distance to the centre is the **effective length used in the formula**.',
  sol: 'Mass acts at the centre; formula uses that distance.',
  scheme: [['Mass acts at the centre of the bob', 1], ['Formula uses the effective length', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('pen-short3a', short({
  marks: 3,
  stem: `A student times one oscillation of a pendulum with a stopwatch of least count 0.1 s, and then times 20 oscillations. (a) Find the possible error in the period found from 20 oscillations. (b) State why timing 20 oscillations gives a more accurate period. (c) State the formula for the frequency in terms of the period.`,
  wl: null,
  model: `**(a)** Error in T = 0.1 ÷ 20 = **${K.OSC20_ERR} s**.\n\n**(b)** The **same 0.1 s uncertainty is shared among 20 oscillations**, so the error in one period is 20 times smaller.\n\n**(c)** f = **1 ÷ T**.`,
  sol: '0.005 s; shared error; f = 1/T.',
  scheme: [['0.005 s', 1], ['Reason', 1], ['f = 1/T', 1]],
  d: 2, c: 'application', t: [5],
}), () => sh(K.OSC20_ERR, 0.005));
add('pen-short3b', short({
  marks: 3,
  stem: 'State how the time period of a simple pendulum changes when (a) its effective length is made 4 times, (b) the mass of the bob is doubled, (c) the pendulum is taken to a place where g is smaller.',
  wl: null,
  model: '**(a)** T becomes **2 times** as large (T ∝ √l).\n\n**(b)** **No change.**\n\n**(c)** T **increases**, because T ∝ 1/√g.',
  sol: 'Doubles; unchanged; increases.',
  scheme: [['Doubles', 1], ['Unchanged', 1], ['Increases with reason', 1]],
  d: 2, c: 'application', t: [5],
}));

// ---------------------------------------------------------------- match
add('inst-match', match({
  marks: 5,
  stem: 'Match each instrument in Column A with its least count in Column B.',
  pairs: [
    ['Metre rule', '1 mm'],
    ['Vernier callipers (10 VSD = 9 MSD, 1 MSD = 1 mm)', '0.1 mm'],
    ['Screw gauge (pitch 1 mm, 100 divisions)', '0.01 mm'],
    ['Measuring cylinder (100 mL, 50 divisions)', '2 mL'],
    ['Stopwatch (60 s, 600 divisions)', '0.1 s'],
  ],
  order: [0, 1, 2, 3, 4],
  sol: 'Divide each range by its divisions: rule 1 mm; Vernier 0.1 mm; screw gauge 1/100 = 0.01 mm; cylinder 100/50 = 2 mL; stopwatch 60/600 = 0.1 s.',
  scheme: [['Five pairs', 5]],
  d: 2, c: 'application', t: [2, 3, 4],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('vern-long', long({
  marks: 10, wl: null,
  stem: 'A student measures the diameter of a metal cylinder with a Vernier callipers in which 10 vernier divisions are equal to 9 main scale divisions, and one main scale division is 1 mm. Figure 1 shows the scales with the jaws closed. Figure 2 shows them with the cylinder held between the jaws.\n\n(a) Calculate the least count of the instrument in cm. [2]\n\n(b) State the zero error shown in Figure 1, with its sign. [2]\n\n(c) Read the observed diameter from Figure 2. [3]\n\n(d) Find the correct diameter of the cylinder. [3]',
  model: `**(a)** Least count = 1 mm ÷ 10 = 0.1 mm = **0.01 cm**.\n\n**(b)** The vernier zero is to the left of the main zero and the 8th line coincides, so the error is −(10 − 8) × 0.01 = **${K.LONG_ZERO_CM} cm**.\n\n**(c)** Main scale reading = 45 mm; vernier reading = 3 × 0.1 = 0.3 mm; observed diameter = 45.3 mm = **${K.vCm(K.V.longObs)} cm**.\n\n**(d)** The error is negative, so it is added: true diameter = ${K.vCm(K.V.longObs)} − (${K.LONG_ZERO_CM}) = **${K.LONG_TRUE} cm**.`,
  sol: '0.01 cm; −0.02 cm; 4.53 cm; 4.55 cm.',
  scheme: [['Formula or working for least count', 1], ['0.01 cm', 1], ['Position of vernier zero and coinciding line', 1], ['−0.02 cm with sign', 1], ['Main scale reading 45 mm', 1], ['Vernier reading 0.3 mm', 1], ['4.53 cm', 1], ['Zero error subtracted with its sign', 1], ['Working', 1], ['4.55 cm', 1]],
  d: 3, c: 'application', t: [3],
  assets: [fv(VERN.longClosed, 'Figure 1: Vernier callipers with jaws closed, the vernier zero left of the main zero'), fv(VERN.longObs, 'Figure 2: Vernier callipers with the cylinder in the jaws, zero between the 45th and 46th millimetre marks')],
}), () => sh(K.LONG_TRUE, 4.55));
add('scr-long', long({
  marks: 10, wl: null,
  stem: 'A screw gauge has a pitch of 1 mm and 100 divisions on its circular scale. Figure 1 shows it with the jaws closed. Figure 2 shows a copper wire held between the jaws. (Take π = 3.14.)\n\n(a) Calculate the least count of the screw gauge. [2]\n\n(b) State the zero error shown in Figure 1, with its sign. [2]\n\n(c) Read the observed diameter from Figure 2. [2]\n\n(d) Find the correct diameter of the wire. [2]\n\n(e) Find the area of cross-section of the wire in mm². [2]',
  model: `**(a)** Least count = pitch ÷ divisions = 1 ÷ 100 = **0.01 mm**.\n\n**(b)** Division 4 is on the datum line, so the error is 4 × 0.01 = **+${K.LONGS_ZERO} mm**.\n\n**(c)** Linear scale 1 mm + 49 × 0.01 mm = **${K.sMm(K.S_.longObs)} mm**.\n\n**(d)** True diameter = ${K.sMm(K.S_.longObs)} − ${K.LONGS_ZERO} = **${K.LONGS_D} mm**.\n\n**(e)** Radius = ${K.LONGS_D} ÷ 2 = ${K.LONGS_R} mm; area = πr² = 3.14 × ${K.LONGS_R} × ${K.LONGS_R} = **${K.LONGS_AREA} mm²**.`,
  sol: '0.01 mm; +0.04 mm; 1.49 mm; 1.45 mm; 1.65 mm².',
  scheme: [['Formula', 1], ['0.01 mm', 1], ['Division on datum line', 1], ['+0.04 mm', 1], ['Linear scale reading and circular part', 1], ['1.49 mm', 1], ['Subtraction of zero error', 1], ['1.45 mm', 1], ['Radius and substitution in πr²', 1], ['1.65 mm² with unit', 1]],
  d: 3, c: 'application', t: [4],
  assets: [fv(SCREW.longClosed, 'Figure 1: screw gauge with jaws closed and division 4 on the datum line'), fv(SCREW.longObs, 'Figure 2: screw gauge with a copper wire, thimble edge between 1 mm and 2 mm marks')],
}), () => sh(K.LONGS_AREA, 1.65));
add('pend-long', long({
  marks: 10, wl: null,
  stem: 'In an experiment to find g, a thread of length 87.0 cm, measured from the point of suspension to the top of the bob, carries a metal bob. The diameter of the bob is measured with a Vernier callipers (least count 0.01 cm, no zero error), shown in the figure. The pendulum makes 20 oscillations in 38.0 s. (Take π = 3.14.)\n\n(a) Read the diameter of the bob from the figure. [3]\n\n(b) Find the effective length of the pendulum in m. [2]\n\n(c) Find the time period. [2]\n\n(d) Write the formula for g in terms of l and T and find its value, to two decimal places. [3]',
  model: `**(a)** Main scale reading 30 mm; the 4th line coincides: 4 × 0.1 = 0.4 mm; diameter = 30.4 mm = **${K.BOB_D} cm**.\n\n**(b)** Radius = ${K.BOB_D} ÷ 2 = ${K.BOB_R} cm; effective length = 87.0 + ${K.BOB_R} = ${K.EFF_L_CM} cm = **${K.EFF_L_M} m**.\n\n**(c)** T = 38.0 ÷ 20 = **${K.EXP2_T} s**.\n\n**(d)** From T = 2π√(l/g), **g = 4π²l ÷ T²** = 4 × 3.14 × 3.14 × ${K.EFF_L_M} ÷ (${K.EXP2_T})² = **${K.EXP2_G} m s⁻²**.`,
  sol: '3.04 cm; 0.8852 m; 1.9 s; 9.67 m s⁻².',
  scheme: [['Main scale reading 30 mm', 1], ['Vernier reading 0.4 mm', 1], ['3.04 cm', 1], ['Radius added to thread length', 1], ['0.8852 m in metres', 1], ['38.0 ÷ 20', 1], ['1.9 s', 1], ['g = 4π²l/T²', 1], ['Substitution', 1], ['9.67 m s⁻²', 1]],
  d: 4, c: 'analysis', t: [3, 5],
  assets: [fv(VERN.bob, 'Vernier callipers measuring the diameter of a pendulum bob, zero between the 30th and 31st millimetre marks, 4th line coinciding')],
}), () => sh(K.EXP2_G, 9.67));
add('graph-long', long({
  marks: 10, wl: null,
  stem: 'A student measures the effective length l of a simple pendulum and the time period T for four lengths, and plots a graph of l (m) on the y-axis against T² (s²) on the x-axis, shown in the figure. (Take π = 3.14.)\n\n(a) Define the time period of a simple pendulum. [1]\n\n(b) Using T = 2π√(l/g), show that l is proportional to T² and write the slope of the graph in terms of g. [3]\n\n(c) Use the points (2.5, 0.60) and (5.0, 1.20) on the line to find the slope, with its unit. [3]\n\n(d) Hence find g, to two decimal places. [2]\n\n(e) State one precaution in the experiment. [1]',
  model: `**(a)** The **time taken for one complete oscillation** of the bob.\n\n**(b)** Squaring, T² = 4π²l ÷ g, so **l = (g ÷ 4π²) T²**; l is proportional to T² and the **slope = g ÷ 4π²**.\n\n**(c)** Slope = (1.20 − 0.60) ÷ (5.0 − 2.5) = **${K.GB_SLOPE} m s⁻²**.\n\n**(d)** g = 4π² × slope = 4 × 3.14 × 3.14 × ${K.GB_SLOPE} = **${K.GB_G} m s⁻²**.\n\n**(e)** Use a **small angle of swing** (less than about 10 degrees), or time 20 oscillations.`,
  sol: 'Definition; slope = g/4π²; 0.24 m s⁻²; 9.47 m s⁻².',
  scheme: [['Definition', 1], ['Squaring the formula', 1], ['l proportional to T²', 1], ['Slope = g/4π²', 1], ['Two points substituted', 1], ['0.24', 1], ['Unit m s⁻²', 1], ['g = 4π² × slope', 1], ['9.47 m s⁻²', 1], ['A valid precaution', 1]],
  d: 3, c: 'application', t: [5],
  assets: [fv(GRAPH_B_FIG, 'Graph of l in metres against T squared in seconds squared: four points on a straight line through the origin passing through (2.5, 0.60) and (5.0, 1.20)')],
}), () => sh(K.GB_G, 9.47));
add('si-long', long({
  marks: 10, wl: null,
  stem: 'A cricket ball of mass 0.5 kg is thrown at a speed of 12 m s⁻¹.\n\n(a) Write the SI unit of momentum in terms of fundamental units. [2]\n\n(b) Calculate the momentum of the ball in SI units. [2]\n\n(c) Express this momentum in cgs units. (1 kg = 1000 g and 1 m = 100 cm) [3]\n\n(d) Express the speed of the ball in km h⁻¹. [3]',
  model: `**(a)** Momentum = mass × velocity, so the unit is **kg m s⁻¹**.\n\n**(b)** p = 0.5 × 12 = **${K.BALL_P} kg m s⁻¹**.\n\n**(c)** ${K.BALL_P} kg m s⁻¹ = ${K.BALL_P} × 1000 g × 100 cm s⁻¹ = **${K.BALL_P_CGS} g cm s⁻¹**.\n\n**(d)** 12 m s⁻¹ = 12 × 3600 ÷ 1000 = 12 × 3.6 = **${K.KMH_12} km h⁻¹**.`,
  sol: 'kg m s⁻¹; 6 kg m s⁻¹; 600000 g cm s⁻¹; 43.2 km h⁻¹.',
  scheme: [['Formula for momentum', 1], ['kg m s⁻¹', 1], ['Substitution', 1], ['6 kg m s⁻¹', 1], ['Factor 1000 for mass', 1], ['Factor 100 for length', 1], ['600000 g cm s⁻¹', 1], ['Factor 3.6 or 3600 ÷ 1000', 1], ['Working', 1], ['43.2 km h⁻¹', 1]],
  d: 3, c: 'application', t: [1],
}), () => sh(K.BALL_P_CGS, 600000));
add('lc-long', long({
  marks: 10, wl: null,
  stem: 'A student wants to measure the diameter of a thin wire, which is about 0.85 mm. She has a metre rule (least count 1 mm), a Vernier callipers (least count 0.1 mm) and a screw gauge (least count 0.01 mm).\n\n(a) Define least count. [2]\n\n(b) For each instrument find the least count as a percentage of 0.85 mm, to the nearest whole number for the first two and one decimal place for the third. [3]\n\n(c) Name the most suitable instrument and give a reason. [2]\n\n(d) The screw gauge has a pitch of 0.5 mm and 50 divisions on the circular scale. Show that its least count is 0.01 mm. [3]',
  model: `**(a)** The **smallest value that an instrument can measure accurately**; for a scale it is the value of one smallest division.\n\n**(b)** Rule: 1 ÷ 0.85 × 100 = **${K.RULE_FRAC}%**; Vernier: 0.1 ÷ 0.85 × 100 = **${K.VER_FRAC}%**; screw gauge: 0.01 ÷ 0.85 × 100 = **${K.SCR_FRAC}%**.\n\n**(c)** The **screw gauge**, because its least count is the smallest, so the possible error is only about ${K.SCR_FRAC}% of the diameter.\n\n**(d)** Least count = pitch ÷ divisions = 0.5 ÷ 50 = **0.01 mm**.`,
  sol: 'Definition; 118%, 12%, 1.2%; screw gauge; 0.5/50 = 0.01 mm.',
  scheme: [['Smallest value measured accurately', 1], ['One smallest division', 1], ['118%', 1], ['12%', 1], ['1.2%', 1], ['Screw gauge', 1], ['Reason using least count or percentage', 1], ['Formula', 1], ['Substitution', 1], ['0.01 mm', 1]],
  d: 3, c: 'application', t: [2, 4],
}), () => sh(K.RULE_FRAC, 118) && sh(K.VER_FRAC, 12));
