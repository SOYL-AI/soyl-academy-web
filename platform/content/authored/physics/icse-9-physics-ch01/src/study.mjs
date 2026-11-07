// ICSE 9 Physics ch01 notes and flashcards.
import { T, unit, PROV, table, svgV, r } from './lib.mjs';
import { CYL, VERN, SCREW, PENDULUM, GRAPH_TRI_A, SCREW_PARTS, VERNIER_PARTS } from './svgs.mjs';
import { SPEED_MS, DENS, LB_KG, FOOT_CM, LC, VLC, SLC_MM, GA_G, GA_SLOPE, vCm, V, S_, sMm } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Measurements and Experimentation — Notes',
  language: 'en',
  sections: [
    sec(
      '1. International System of Units',
      `Measuring a physical quantity means comparing it with a standard called a **unit**. The **SI** (International System of Units) is built on seven **fundamental quantities**.

| Quantity | SI unit | Symbol |
|---|---|---|
| Length | metre | m |
| Mass | kilogram | kg |
| Time | second | s |
| Electric current | ampere | A |
| Temperature | kelvin | K |
| Luminous intensity | candela | cd |
| Amount of substance | mole | mol |

A **derived unit** is obtained from the fundamental units by following the formula of the quantity: density = mass ÷ volume gives kg m⁻³; momentum = mass × velocity gives kg m s⁻¹; force = mass × acceleration gives kg m s⁻² (the newton).

**Other systems.** In the **cgs** system the units of length, mass and time are the centimetre, gram and second; in the **fps** system they are the foot, pound and second.

**Conversions** used in this chapter: 1 km h⁻¹ = 1000 ÷ 3600 m s⁻¹ (so 54 km h⁻¹ = ${SPEED_MS.a} m s⁻¹); 1 g cm⁻³ = 1000 kg m⁻³ (so 0.8 g cm⁻³ = ${DENS.oil} kg m⁻³); 1 lb = ${LB_KG} kg; 1 ft = ${FOOT_CM} cm.`,
      [kt('Fundamental unit', 'The unit of one of the seven fundamental quantities; it cannot be expressed in other units.'), kt('Derived unit', 'A unit obtained by combining fundamental units according to the formula of the quantity.')],
      [fm(r`1\ \text{g cm}^{-3} = 1000\ \text{kg m}^{-3}`, 'Density conversion')],
      null,
      [1],
    ),
    sec(
      '2. Least count',
      `The **least count** (LC) of an instrument is the **smallest value that it can measure accurately**. For a scale it is the value of one smallest division.

| Instrument | Least count |
|---|---|
| Metre rule | 1 mm = 0.1 cm |
| Measuring cylinder | (volume between two marks) ÷ (divisions between them), for example 10 mL ÷ 5 = ${LC.cylA} mL |
| Stopwatch | (time of one turn of the pointer) ÷ (divisions on the dial) |

A measurement can be trusted only up to the least count. An instrument with a **smaller least count** gives a **more accurate** measurement, because the possible error is a smaller fraction of the quantity measured.

Read a measuring cylinder with the eye level with the **bottom of the meniscus** of water.`,
      [kt('Least count', 'The smallest value that an instrument can measure accurately.')],
      [fm(r`\text{LC} = \dfrac{\text{range between two marks}}{\text{number of divisions between them}}`, 'Least count of a scale')],
      svgV(CYL, 'A measuring cylinder with the water level at 46 millilitres'),
      [2],
    ),
    sec(
      '3. Vernier callipers',
      `A **Vernier callipers** measures lengths, diameters and thicknesses to 0.1 mm. It has a **main scale** (1 MSD = 1 mm) and a sliding **vernier scale** in which **10 vernier divisions = 9 main scale divisions**.

**Least count** = 1 MSD − 1 VSD = 1 mm − 0.9 mm = **0.1 mm = 0.01 cm** (in general, LC = 1 MSD ÷ number of vernier divisions).

**Reading.** (1) Note the main scale reading (MSR) just before the vernier zero. (2) Find the vernier line (n) that coincides with a main scale line. (3) Reading = MSR + n × LC. Example: 23 mm + 4 × 0.1 mm = 23.4 mm = ${vCm(V.ex1)} cm.

**Zero error.** Close the jaws. If the vernier zero is **to the right** of the main zero, the error is **positive** (observed readings are too large), equal to (coinciding line) × LC, and the **correction is subtracted**. If the vernier zero is **to the left**, the error is **negative**, equal to −(10 − n) × LC, and it is **added**. True reading = observed reading − zero error.

Only pictorial readings are asked in this course: read the scale in the figure, as in the diagrams.`,
      [kt('Zero error', 'The reading shown by the instrument when it should read zero, such as with the jaws closed.'), kt('Vernier constant', 'The least count of a Vernier callipers: the difference between one main scale division and one vernier division.')],
      [fm(r`\text{reading} = \text{MSR} + n \times \text{LC}`, 'Vernier reading'), fm(r`\text{true reading} = \text{observed reading} - \text{zero error}`, 'Zero error correction')],
      svgV(VERN.ex1, 'A Vernier scale with the 4th line coinciding and a reading of 2.34 centimetres'),
      [3],
    ),
    sec(
      '4. Micrometre screw gauge',
      `A **screw gauge** measures the diameter of a thin wire or the thickness of a sheet to 0.01 mm. Its parts are the **anvil, spindle, sleeve** (linear scale, with the datum line), **thimble** (circular scale) and **ratchet** (which prevents the spindle being tightened too much).

**Pitch** = distance moved by the spindle in one full turn of the thimble = **1 mm** here. **Least count = pitch ÷ number of circular scale divisions = 1 mm ÷ 100 = ${SLC_MM} mm**.

**Reading** = linear scale reading + (circular scale division on the datum line) × LC. Example: 5 mm + 37 × 0.01 mm = ${sMm(S_.ex1)} mm.

**Zero error.** With the jaws closed: if a small division number n is on the datum line the error is **+ n × 0.01 mm** (subtract it); if a number close to 100, say 94, is on the datum line the error is **−(100 − 94) × 0.01 = −0.06 mm** (add it).

Only pictorial readings are asked in this course. Always close the jaws with the ratchet, not by turning the thimble hard.`,
      [kt('Pitch', 'The distance moved by the spindle of a screw gauge in one complete turn of the thimble.')],
      [fm(r`\text{LC} = \dfrac{\text{pitch}}{\text{number of divisions on the circular scale}}`, 'Screw gauge least count')],
      svgV(SCREW.ex1, 'A screw gauge reading of 5.37 millimetres'),
      [4],
    ),
    sec(
      '5. The simple pendulum',
      `A **simple pendulum** is a small, heavy bob suspended by a light, inextensible thread from a rigid support. Its **effective length** *l* is the distance from the point of suspension to the **centre of the bob**.

**Time period T** is the time taken for one **complete oscillation**; **frequency f** is the number of oscillations per second, so **f = 1/T** (unit hertz, Hz). To find T accurately, time **20 oscillations** and divide by 20: this reduces the error because the stopwatch's least count is spread over 20 oscillations.

For small swings, **T = 2π √(l/g)** (stated without derivation). So T depends only on l and g: it does **not** depend on the mass of the bob. If l becomes 4 times, T doubles; at a place where g is smaller, T is larger.

**l against T² graph.** Squaring, T² = (4π²/g) l, so a graph of l (y-axis) against T² (x-axis) is a straight line through the origin with **slope = g ÷ 4π²**. Hence **g = 4π² × slope**; with the slope ${GA_SLOPE} m s⁻² and π = 3.14, g = ${GA_G} m s⁻². Choose a large right-angled triangle on the line to read the slope. Calculations use g = 10 m s⁻² and π = 3.14 unless the question says 9.8.`,
      [kt('Time period', 'The time taken for one complete oscillation of the pendulum.'), kt('Effective length', 'The distance from the point of suspension to the centre of the bob.')],
      [fm(r`T = 2\pi\sqrt{\dfrac{l}{g}}`, 'Time period of a simple pendulum'), fm(r`f = \dfrac{1}{T}`, 'Frequency'), fm(r`g = 4\pi^2 \times \text{slope of } l\text{–}T^2 \text{ graph}`, 'g from the graph')],
      svgV(PENDULUM, 'A simple pendulum with its effective length l'),
      [5],
      [svgV(GRAPH_TRI_A, 'The l against T squared graph with a slope triangle')],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Writing the SI unit of mass as the gram; it is the kilogram.
- Forgetting that 1 g cm⁻³ is 1000 kg m⁻³, or dividing instead of multiplying.
- Counting marks instead of divisions when finding a least count.
- Adding a positive zero error (it is subtracted) or subtracting a negative one (it is added).
- Reading the main scale after the vernier zero instead of before it.
- Measuring the length of a pendulum to the top or bottom of the bob and not to its centre.
- Timing only one oscillation.

**How marks are usually awarded**
- 1 mark: a unit, a definition or a single reading.
- 2 marks: a least count or a conversion with the factor shown.
- 3 marks: a reading with the main and vernier or circular parts and the zero-error correction.
- 10-mark structured question: set in parts on a figure or a table of readings. Write the formula, the substitution and the unit in every calculation and label graphs.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Name the seven fundamental SI quantities.', 'Length, mass, time, electric current, temperature, luminous intensity, amount of substance.', 'fact', 1),
    fc(2, 'SI units of current, temperature, luminous intensity and amount of substance?', 'Ampere, kelvin, candela, mole.', 'fact', 1),
    fc(3, 'What is a derived unit?', 'A unit made from fundamental units by following the formula of the quantity.', 'definition', 1),
    fc(4, 'Unit of density in fundamental units?', 'kg m⁻³.', 'fact', 1),
    fc(5, 'Unit of momentum in fundamental units?', 'kg m s⁻¹.', 'fact', 1),
    fc(6, 'Base units of the cgs system?', 'Centimetre, gram, second.', 'fact', 1),
    fc(7, 'Base units of the fps system?', 'Foot, pound, second.', 'fact', 1),
    fc(8, '1 g cm⁻³ in kg m⁻³?', '1000 kg m⁻³.', 'formula', 1),
    fc(9, 'Convert km per hour to m per second.', 'Multiply by 1000 and divide by 3600, that is divide by 3.6.', 'formula', 1),
    fc(10, '1 lb and 1 ft in SI?', '1 lb = 0.4536 kg and 1 ft = 30.48 cm = 0.3048 m.', 'fact', 1),
    fc(11, 'Define least count.', 'The smallest value that an instrument can measure accurately.', 'definition', 2),
    fc(12, 'Least count of a metre rule?', '1 mm or 0.1 cm.', 'fact', 2),
    fc(13, 'How do you find the least count of a measuring cylinder?', 'Volume between two marked values divided by the number of divisions between them.', 'concept', 2),
    fc(14, 'Why does a smaller least count mean greater accuracy?', 'The possible error is a smaller fraction of the quantity measured.', 'concept', 2),
    fc(15, 'Where must the eye be when reading a measuring cylinder?', 'Level with the bottom of the water meniscus.', 'exam-tip', 2),
    fc(16, 'Least count of a Vernier callipers (10 VSD = 9 MSD, 1 MSD = 1 mm)?', '0.1 mm = 0.01 cm.', 'fact', 3),
    fc(17, 'Reading of a Vernier callipers?', 'MSR + (coinciding vernier line) × LC.', 'formula', 3),
    fc(18, 'What is zero error?', 'The reading shown when the instrument should read zero (jaws closed).', 'definition', 3),
    fc(19, 'Positive zero error: add or subtract?', 'Subtract it: true reading = observed − zero error.', 'exam-tip', 3),
    fc(20, 'Negative zero error of a Vernier callipers with the 8th line coinciding?', '−(10 − 8) × 0.01 cm = −0.02 cm; add 0.02 cm.', 'example', 3),
    fc(21, 'Pitch of a screw gauge?', 'The distance the spindle moves in one full turn of the thimble.', 'definition', 4),
    fc(22, 'Least count of a screw gauge (pitch 1 mm, 100 divisions)?', '0.01 mm.', 'fact', 4),
    fc(23, 'Reading of a screw gauge?', 'Linear scale reading + (circular division on the datum line) × LC.', 'formula', 4),
    fc(24, 'Use of the ratchet?', 'It stops the spindle being tightened too much, so the wire is not squeezed.', 'fact', 4),
    fc(25, 'Zero error with division 94 on the datum line?', '−(100 − 94) × 0.01 = −0.06 mm; add 0.06 mm to the reading.', 'example', 4),
    fc(26, 'Define time period and frequency of a pendulum.', 'Time for one complete oscillation; number of oscillations per second; f = 1/T.', 'definition', 5),
    fc(27, 'Formula for the time period of a simple pendulum?', 'T = 2π√(l/g) (no derivation needed).', 'formula', 5),
    fc(28, 'What does T not depend on?', 'The mass of the bob (and, for small swings, the amplitude).', 'concept', 5),
    fc(29, 'Slope of the l against T² graph?', 'g ÷ 4π², so g = 4π² × slope.', 'formula', 5),
    fc(30, 'Why time 20 oscillations instead of 1?', 'The stopwatch error is shared among 20 oscillations, so T is more accurate.', 'exam-tip', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
