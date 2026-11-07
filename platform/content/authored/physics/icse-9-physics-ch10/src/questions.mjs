// ICSE 9 Physics ch10 Sound and Wave Motion — question bank in ICSE school-examination style.
// Speed of sound in air is 340 m s⁻¹ unless a stem says otherwise; light travels at 3 × 10⁸ m s⁻¹. Every number comes from calc.mjs.
// AR keys: a = (A) true (R) false, b = (A) false (R) true, c = both true and R explains, d = both true and R does not explain.
import { mk, add, svgV, r } from '../../icse-9-physics-ch01/src/lib.mjs';
import * as K from './calc.mjs';
import { TRANSVERSE_LET, LONGITUDINAL_LET, WAVE_GRAPH, THUNDER_FIG, BELL_JAR } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, long, match } = mk;
const term = (o) => short({ marks: 1, wl: null, scheme: [[o.sch ?? 'Correct answer', 1]], ...o });
const fv = (svg, alt) => svgV(svg, alt);
const sh = (a, b) => (a === b ? true : `got ${a}, expected ${b}`);
const figTrLet = () => fv(TRANSVERSE_LET, 'A transverse wave with the points A to F lettered; A, C and E are on the rest line, B and F are crests and D is a trough');
const figLoLet = () => fv(LONGITUDINAL_LET, 'A longitudinal wave drawn as rows of particles with the points P, Q, R and S lettered; P and R are compressions and Q and S are rarefactions');
const figGraph = () => fv(WAVE_GRAPH, 'Displacement in centimetres against distance in metres along a rope: crests of 3 cm at 0.2 m and 1.0 m, troughs of minus 3 cm at 0.6 m and 1.4 m');

// ---------------------------------------------------------------- deck-check items (not used in tests)
add('chk-kind', mcq({
  stem: 'A vibrating tuning fork sends sound through the air. The sound wave is',
  right: 'longitudinal, because the air particles vibrate along the direction of travel', wrong: ['transverse, because the air particles vibrate across the direction of travel', 'transverse, because the sound has crests and troughs', 'longitudinal, because the air particles travel with the wave'],
  sol: 'The air particles move to and fro along the line of travel of the sound, making compressions and rarefactions, option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('chk-bell', mcq({
  stem: 'In the bell-jar experiment the sound of the ringing bell becomes fainter as air is pumped out. This shows that',
  right: 'sound needs a material medium to travel', wrong: ['the bell stops vibrating when the air is removed', 'sound travels faster in a vacuum', 'sound is a transverse wave'],
  sol: 'The bell still vibrates, but with no air around it the sound cannot reach the ear, option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('chk-order', mcq({
  stem: 'Steel, sea water and dry air are arranged in the order of decreasing speed of sound. The correct order is',
  right: 'steel, sea water, dry air', wrong: ['dry air, sea water, steel', 'sea water, steel, dry air', 'steel, dry air, sea water'],
  sol: 'Sound is fastest in solids, slower in liquids and slowest in gases, option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('chk-temp', mcq({
  stem: 'A shout is made once on a hot afternoon and once on a frosty morning. Compared with the frosty morning, on the hot afternoon the speed of the sound is',
  right: 'greater', wrong: ['smaller', 'the same', 'zero'],
  sol: 'The speed of sound in air increases as the temperature rises, option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('chk-v', mcq({
  stem: `A wave has a frequency of ${K.CHK_V.f} Hz and a wavelength of ${K.CHK_V.l} m. Its speed is`,
  right: `${K.CHK_V_V} m s⁻¹`, wrong: ['24 m s⁻¹', '0.04 m s⁻¹', '12.5 m s⁻¹'],
  sol: r`$v = f\lambda = ${K.CHK_V.f} \times ${K.CHK_V.l} = ${K.CHK_V_V}$ m s⁻¹, option (@K).`,
  d: 2, c: 'application', t: [3],
}));
add('chk-thunder', mcq({
  stem: `Thunder is heard ${K.CHK_THUNDER.gap} s after a lightning flash is seen. Taking the speed of sound as ${K.V_AIR} m s⁻¹, the lightning is at a distance of`,
  right: `${K.CHK_THUNDER_D} m`, wrong: ['113 m', '340 m', '3400 m'],
  sol: r`$d = v \times t = ${K.V_AIR} \times ${K.CHK_THUNDER.gap} = ${K.CHK_THUNDER_D}$ m, option (@K).`,
  d: 2, c: 'application', t: [4],
}));
add('chk-range', mcq({
  stem: 'An elephant produces a rumble of frequency 14 Hz. This sound is',
  right: 'infrasonic', wrong: ['audible', 'ultrasonic', 'supersonic'],
  sol: 'The frequency is below 20 Hz, so the sound is infrasonic, option (@K).',
  d: 1, c: 'application', t: [5],
}));
add('chk-super', mcq({
  stem: 'A fighter jet flies at twice the speed of sound. Its speed is described as',
  right: 'supersonic', wrong: ['ultrasonic', 'infrasonic', 'subsonic'],
  sol: 'A speed greater than that of sound is supersonic; ultrasonic and infrasonic describe frequency, option (@K).',
  d: 1, c: 'understanding', t: [5],
}));

// ---------------------------------------------------------------- t01 transverse and longitudinal waves
add('m-kind', mcq({
  stem: 'Which one of the following is a longitudinal wave?',
  right: 'The wave along a slinky when its end is pushed and pulled along its length', wrong: ['The wave along a rope when its end is flicked up and down', 'The wave along a slinky when its end is shaken sideways', 'The wave that a stretched string shows when it is plucked at the middle'],
  sol: 'Only in the first case do the coils vibrate along the line of travel of the wave, option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('m-compression', mcq({
  stem: 'In a sound wave the region where the air particles are crowded together and the pressure is high is called a',
  right: 'compression', wrong: ['rarefaction', 'crest', 'trough'],
  sol: 'Crowded particles at high pressure form a compression; crests and troughs belong to transverse waves, option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('m-lo-wavelength', mcq({
  stem: 'The figure shows a longitudinal wave in which P and R are the centres of two consecutive compressions. The distance between P and R is the',
  right: 'wavelength', wrong: ['amplitude', 'time period', 'frequency'],
  sol: 'The distance between two consecutive compressions is one wavelength, option (@K).',
  d: 1, c: 'understanding', t: [1],
  assets: [figLoLet()],
}));
add('m-tr-points', mcq({
  stem: 'In the figure of a transverse wave on a rope, the points A, C and E lie on the rest line. The distance from A to E is',
  right: 'one wavelength', wrong: ['half a wavelength', 'one amplitude', 'two amplitudes'],
  sol: 'A and E are the same distance apart as two consecutive crests (B and F), so AE is one wavelength, option (@K).',
  d: 2, c: 'application', t: [1],
  assets: [figTrLet()],
}));
add('ar-long', ar({
  a: 'Sound waves in air are longitudinal.',
  r: 'In a sound wave the air particles vibrate parallel to the direction in which the wave travels.',
  key: 'c',
  sol: 'Parallel vibration is the very meaning of a longitudinal wave, so (R) explains (A), option (c).',
  d: 2, c: 'analysis', t: [1],
}));
add('tf-med', tf({
  stem: 'When a wave travels along a rope, the particles of the rope travel along with the wave.',
  key: 'f',
  sol: 'False. The particles only vibrate about their mean positions; the energy travels on.',
  d: 1, c: 'understanding', t: [1],
}));
add('fill-rare', fill({
  stem: 'In a longitudinal wave the regions where the particles are spread apart and the pressure is low are called ___.',
  acc: [['rarefactions', 'rarefaction']],
  sol: 'Rarefactions.',
  d: 1, c: 'recall', t: [1],
}));
add('term-wl', term({
  stem: 'In a transverse wave on a rope, what name is given to the distance between two consecutive crests?',
  model: 'The **wavelength** of the wave.', sol: 'Wavelength.', sch: 'Wavelength',
  d: 1, c: 'recall', t: [1],
}));
add('match-wave', match({
  marks: 5,
  stem: 'Match each term in Column A with its meaning in Column B.',
  pairs: [
    ['Compression', 'Region of high pressure in a longitudinal wave'],
    ['Rarefaction', 'Region of low pressure in a longitudinal wave'],
    ['Crest', 'Highest point of a transverse wave'],
    ['Frequency', 'Number of vibrations made in one second'],
    ['Time period', 'Time taken for one complete vibration'],
  ],
  order: [0, 1, 2, 3, 4],
  sol: 'Compression and rarefaction describe pressure in sound; a crest is the highest point; frequency counts vibrations per second; the time period is the time for one.',
  scheme: [['Five pairs', 5]],
  d: 2, c: 'understanding', t: [1, 3],
}));
add('s2a', short({
  marks: 2,
  stem: 'State two differences between a transverse wave and a longitudinal wave.',
  wl: null,
  model: 'In a **transverse** wave the particles vibrate **at right angles** to the direction of travel and the wave has **crests and troughs**; in a **longitudinal** wave they vibrate **along** that direction and the wave has **compressions and rarefactions**.',
  sol: 'Direction of vibration; crests and troughs against compressions and rarefactions.',
  scheme: [['Direction of vibration of the particles', 1], ['Crests and troughs against compressions and rarefactions', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('s3b', short({
  marks: 3,
  stem: 'A tuning fork is struck and held in air. Explain, in terms of compressions and rarefactions, how the sound reaches a listener and why it is a longitudinal wave.',
  wl: null,
  model: 'When a prong moves **forward** it pushes the air next to it together and makes a **compression**; when it moves **back** it leaves a **rarefaction**. These regions move away from the fork one after another. The air particles only vibrate **to and fro along the direction in which the sound travels**, so the wave is **longitudinal**.',
  sol: 'Forward stroke compression, backward stroke rarefaction; vibration along the direction of travel.',
  scheme: [['Forward movement gives a compression', 1], ['Backward movement gives a rarefaction', 1], ['Particles vibrate along the direction of travel', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 medium, speed of sound, factors
add('m-moon', mcq({
  stem: 'Two astronauts standing side by side on the Moon cannot hear each other speak directly because',
  right: 'there is no air on the Moon to carry the sound', wrong: ['the Moon is much colder than the Earth', 'sound travels too fast on the Moon to be heard', 'the pitch of the voice rises on the Moon'],
  sol: 'Sound needs a material medium, and the Moon has no atmosphere, option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('m-bell-seen', mcq({
  stem: 'In the bell-jar experiment the hammer is still seen striking the gong after most of the air is removed, yet hardly any sound is heard. The correct inference is that',
  right: 'the bell keeps vibrating but the sound has no medium to reach the ear', wrong: ['the hammer has stopped touching the gong', 'light is able to travel through air better than a vacuum', 'sound is made only when there is air inside the bell'],
  sol: 'Seeing the hammer move shows the source is still vibrating, so the missing sound points to the missing medium, option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('m-solid', mcq({
  stem: 'A sound wave is sent separately through a block of iron, a tank of water and a room full of air at room temperature. It travels fastest in',
  right: 'iron', wrong: ['water', 'air', 'all three at the same speed'],
  sol: 'Solids carry sound fastest, then liquids, then gases, option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('m-hot', mcq({
  stem: 'A drummer at the far end of a field is heard after the same time on every morning of a week. On one afternoon the air is much warmer than usual. On that afternoon the sound reaches the listener',
  right: 'a little sooner', wrong: ['a little later', 'after exactly the same time', 'only if the drum is beaten harder'],
  sol: 'Sound travels faster in warmer air, so it takes less time, option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('m-humid', mcq({
  stem: 'At the same temperature, the speed of sound in humid air is',
  right: 'greater than in dry air', wrong: ['less than in dry air', 'the same as in dry air', 'zero'],
  sol: 'Water vapour makes the air less dense, so sound travels faster in it, option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('m-factor', mcq({
  stem: 'Which of the following does not change the speed of sound in air?',
  right: 'making the sound louder', wrong: ['warming the air', 'making the air more humid', 'replacing the air by water'],
  sol: 'Speed depends on the medium and its temperature and humidity, not on loudness, option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('ar-iron', ar({
  a: 'Sound travels faster in iron than in air.',
  r: 'Iron has a much smaller density than air.',
  key: 'a',
  sol: 'Sound is faster in a solid, so (A) is true; iron is far denser than air, so (R) is false, option (a).',
  d: 2, c: 'analysis', t: [2],
}));
add('ar-loud', ar({
  a: 'The speed of sound in air increases when the sound is made louder.',
  r: 'The speed of sound in air increases when the temperature of the air increases.',
  key: 'b',
  sol: 'Loudness does not change the speed, so (A) is false; temperature does, so (R) is true, option (b).',
  d: 2, c: 'analysis', t: [2],
}));
add('ar-vac', ar({
  a: 'Sound cannot travel through a vacuum.',
  r: 'Light can travel through a vacuum.',
  key: 'd',
  sol: 'Both statements are true, but the ability of light to cross a vacuum does not explain why sound cannot, option (d).',
  d: 2, c: 'analysis', t: [2],
}));
add('tf-solid', tf({
  stem: 'The speed of sound in water is greater than its speed in air.',
  key: 't',
  sol: 'True. Sound travels faster in a liquid than in a gas.',
  d: 1, c: 'recall', t: [2],
}));
add('num-pipe', num({
  stem: `A long iron wire is stretched between two posts ${K.WIRE.len} m apart. A listener at one post hears the sound of a hammer blow at the other post through the wire. Taking the speed of sound in iron as ${K.V_IRON} m s⁻¹, find the time taken by the sound to travel along the wire, in s.`,
  value: K.WIRE_T, tol: 0, unit: 's',
  sol: r`$t = \dfrac{d}{v} = \dfrac{${K.WIRE.len}}{${K.V_IRON}} = ${K.WIRE_T}$ s.`,
  scheme: [['Formula and substitution', 0.5], [`${K.WIRE_T} s`, 0.5]],
  d: 2, c: 'application', t: [2],
}), () => sh(K.WIRE_T, 0.5));
add('num-air-iron', num({
  stem: `Using the same data (distance ${K.WIRE.len} m, speed of sound in air ${K.V_AIR} m s⁻¹), find how much longer the sound of the hammer blow would take to reach the listener through the air than through an iron wire that takes ${K.WIRE_T} s. Give your answer in s.`,
  value: K.WIRE_AIR - K.WIRE_T, tol: 0, unit: 's',
  sol: r`Time in air $= \dfrac{${K.WIRE.len}}{${K.V_AIR}} = ${K.WIRE_AIR}$ s; difference $= ${K.WIRE_AIR} - ${K.WIRE_T} = ${K.WIRE_AIR - K.WIRE_T}$ s.`,
  scheme: [['Time through air', 0.5], [`${K.WIRE_AIR - K.WIRE_T} s`, 0.5]],
  d: 2, c: 'application', t: [2],
}), () => sh(K.WIRE_AIR - K.WIRE_T, 7));
add('num-diver', num({
  stem: `A diver under water hears the sound of a ship's engine that is ${K.DIVER.d} m away. Taking the speed of sound in water as ${K.V_WATER} m s⁻¹, find the time taken by the sound to reach the diver, in s.`,
  value: K.DIVER_T, tol: 0, unit: 's',
  sol: r`$t = \dfrac{d}{v} = \dfrac{${K.DIVER.d}}{${K.V_WATER}} = ${K.DIVER_T}$ s.`,
  scheme: [['Formula and substitution', 0.5], [`${K.DIVER_T} s`, 0.5]],
  d: 2, c: 'application', t: [2],
}), () => sh(K.DIVER_T, 2));
add('num-temp', num({
  stem: `The speed of sound in air is ${K.TEMP.v0} m s⁻¹ at 0 °C and increases by about ${K.TEMP.per} m s⁻¹ for every 1 °C rise in temperature. Find the speed of sound in air at ${K.TEMP.t} °C, in m s⁻¹.`,
  value: K.TEMP_V, tol: 0, unit: 'm s⁻¹',
  sol: r`Rise $= ${K.TEMP.per} \times ${K.TEMP.t} = ${K.TEMP.per * K.TEMP.t}$ m s⁻¹; speed $= ${K.TEMP.v0} + ${K.TEMP.per * K.TEMP.t} = ${K.TEMP_V}$ m s⁻¹.`,
  scheme: [['Increase for the temperature rise', 0.5], [`${K.TEMP_V} m s⁻¹`, 0.5]],
  d: 2, c: 'application', t: [2],
}), () => sh(K.TEMP_V, 350));
add('s2b', short({
  marks: 2,
  stem: 'A rock falls on the surface of the Moon in front of an astronaut. Why does she see the rock land but hear nothing?',
  wl: null,
  model: 'Light reaches her eyes without a medium, but the Moon has **no atmosphere**, and **sound needs a material medium**, so no sound reaches her.',
  sol: 'No air; sound needs a medium.',
  scheme: [['Moon has no air', 1], ['Sound needs a medium, light does not', 1]],
  d: 2, c: 'application', t: [2],
}));
add('s2c', short({
  marks: 2,
  stem: 'Name two factors that change the speed of sound in air and state how each affects it.',
  wl: null,
  model: '**Temperature:** the speed **increases** when the air is warmer. **Humidity:** the speed is **greater** in moist air than in dry air.',
  sol: 'Temperature up, speed up; humidity up, speed up.',
  scheme: [['Temperature with its effect', 1], ['Humidity with its effect', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('s3a', short({
  marks: 3,
  stem: 'Describe an experiment to show that sound cannot travel through a vacuum.',
  wl: null,
  model: 'Hang an **electric bell** by a thread inside a **sealed bell jar** joined to a **vacuum pump**, and switch the bell on. As the **air is pumped out the sound becomes fainter and fainter** although the hammer is still seen moving. When air is let in again the sound returns. Hence sound **cannot travel through a vacuum**.',
  sol: 'Bell in a jar; pump out the air; sound fades; conclusion.',
  scheme: [['Bell inside a sealed jar joined to a pump', 1], ['Sound fades as air is removed', 1], ['Conclusion: no sound in a vacuum', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('s3e', short({
  marks: 3,
  stem: 'Arrange iron, water and air in the order of increasing speed of sound, and give the reason for the order.',
  wl: null,
  model: 'Air, water, iron. A **solid** has its particles close together and firmly bound, so a disturbance is handed on from one particle to the next **fastest**; in a **liquid** it is slower and in a **gas** the particles are far apart, so it is **slowest**.',
  sol: 'Air < water < iron; closeness of particles.',
  scheme: [['Correct order', 1], ['Particles are closer in solids', 1], ['Slowest in a gas with a reason', 1]],
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 f, lambda, T and v = f lambda
add('m-vfl', mcq({
  stem: 'A source vibrates with a frequency that is doubled, while the wave keeps travelling in the same medium at the same speed. The wavelength becomes',
  right: 'half', wrong: ['double', 'four times', 'unchanged'],
  sol: r`Since $v = f\lambda$ and $v$ is fixed, $\lambda$ varies inversely as $f$, option (@K).`,
  d: 2, c: 'application', t: [3],
}));
add('m-cross', mcq({
  stem: 'A sound of a fixed note passes from air into water. The quantity that does not change is its',
  right: 'frequency', wrong: ['wavelength', 'speed', 'wavelength and speed'],
  sol: 'The frequency is fixed by the source; the speed and so the wavelength change, option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('m-period', mcq({
  stem: 'The time period of a vibrating source of frequency f is',
  right: r`$\dfrac{1}{f}$`, wrong: [r`$f$`, r`$f^2$`, r`$\dfrac{f}{2}$`],
  sol: 'The time for one vibration is the reciprocal of the number of vibrations per second, option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('num-rope', num({
  stem: `Waves of frequency ${K.ROPE.f} Hz and wavelength ${K.ROPE.l} m are sent along a long rope. Find the speed of the waves, in m s⁻¹.`,
  value: K.ROPE_V, tol: 0, unit: 'm s⁻¹',
  sol: r`$v = f\lambda = ${K.ROPE.f} \times ${K.ROPE.l} = ${K.ROPE_V}$ m s⁻¹.`,
  scheme: [['Formula and substitution', 0.5], [`${K.ROPE_V} m s⁻¹`, 0.5]],
  d: 1, c: 'application', t: [3],
}), () => sh(K.ROPE_V, 3));
add('num-siren', num({
  stem: `A factory siren produces sound of wavelength ${K.SIREN.l} m in air. Taking the speed of sound as ${K.V_AIR} m s⁻¹, find the frequency of the siren, in Hz.`,
  value: K.SIREN_F, tol: 0, unit: 'Hz',
  sol: r`$f = \dfrac{v}{\lambda} = \dfrac{${K.V_AIR}}{${K.SIREN.l}} = ${K.SIREN_F}$ Hz.`,
  scheme: [['Formula and substitution', 0.5], [`${K.SIREN_F} Hz`, 0.5]],
  d: 2, c: 'application', t: [3],
}), () => sh(K.SIREN_F, 400));
add('num-bee', num({
  stem: `A bee's wings beat ${K.BEE.beats} times in ${K.BEE.t} s. Find the time period of the vibration of its wings, in s.`,
  value: K.BEE_T, tol: 0, unit: 's',
  sol: r`$f = \dfrac{${K.BEE.beats}}{${K.BEE.t}} = ${K.BEE_F}$ Hz, so $T = \dfrac{1}{f} = \dfrac{1}{${K.BEE_F}} = ${K.BEE_T}$ s.`,
  scheme: [['Frequency in Hz', 0.5], [`${K.BEE_T} s`, 0.5]],
  d: 2, c: 'application', t: [3],
}), () => sh(K.BEE_T, 0.005));
add('num-limit', num({
  stem: `Find the wavelength in air of the lowest audible sound, of frequency ${K.LIMIT.lo} Hz. Take the speed of sound in air as ${K.V_AIR} m s⁻¹. Give your answer in m.`,
  value: K.LIMIT_LO, tol: 0, unit: 'm',
  sol: r`$\lambda = \dfrac{v}{f} = \dfrac{${K.V_AIR}}{${K.LIMIT.lo}} = ${K.LIMIT_LO}$ m.`,
  scheme: [['Formula and substitution', 0.5], [`${K.LIMIT_LO} m`, 0.5]],
  d: 2, c: 'application', t: [3, 5],
}), () => sh(K.LIMIT_LO, 17));
add('num-flute', num({
  stem: `A flute note has a wavelength of ${K.FLUTE.l} m in air, where the speed of sound is ${K.V_AIR} m s⁻¹. Find the frequency of the note, in Hz.`,
  value: K.FLUTE_F, tol: 0, unit: 'Hz',
  sol: r`$f = \dfrac{v}{\lambda} = \dfrac{${K.V_AIR}}{${K.FLUTE.l}} = ${K.FLUTE_F}$ Hz.`,
  scheme: [['Formula and substitution', 0.5], [`${K.FLUTE_F} Hz`, 0.5]],
  d: 2, c: 'application', t: [3],
}), () => sh(K.FLUTE_F, 1000));
add('num-fork', num({
  stem: `A tuning fork has a frequency of ${K.FORK.f} Hz. Find the time period of its vibration, in s.`,
  value: K.FORK_T, tol: 0, unit: 's',
  sol: r`$T = \dfrac{1}{f} = \dfrac{1}{${K.FORK.f}} = ${K.FORK_T}$ s.`,
  scheme: [['Formula and substitution', 0.5], [`${K.FORK_T} s`, 0.5]],
  d: 1, c: 'application', t: [3],
}), () => sh(K.FORK_T, 0.004));
add('fill-unit', fill({
  stem: 'The SI unit of frequency is the ___.',
  acc: [['hertz', 'Hz']],
  sol: 'Hertz (Hz), one vibration per second.',
  d: 1, c: 'recall', t: [3],
}));
add('s2d', short({
  marks: 2,
  stem: `A note of frequency ${K.BOAT.f} Hz travels from air into water. State what happens to its frequency and to its wavelength, giving a reason for each.`,
  wl: null,
  model: 'The **frequency stays the same**, because it is fixed by the source. The **wavelength increases**, because the speed is greater in water and **λ = v ÷ f**.',
  sol: 'Frequency unchanged; wavelength larger because speed is larger.',
  scheme: [['Frequency unchanged with reason', 1], ['Wavelength larger with reason', 1]],
  d: 3, c: 'application', t: [3],
}));
add('s2e', short({
  marks: 2,
  stem: 'Define the frequency and the time period of a vibrating source, and state the relation between them.',
  wl: null,
  model: 'The **frequency** is the number of vibrations made in one second (unit hertz); the **time period** is the time taken for one vibration. They are related by **T = 1 ÷ f**.',
  sol: 'Vibrations per second; time for one; T = 1/f.',
  scheme: [['Both defined', 1], ['T = 1 ÷ f', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('s3d', short({
  marks: 3,
  stem: 'A wave of wavelength λ and time period T travels in a medium. Show that its speed is v = fλ, where f is its frequency.',
  wl: null,
  model: 'In **one time period T** the wave advances **one wavelength λ**. So speed v = distance ÷ time = **λ ÷ T**. Since **f = 1 ÷ T**, this gives **v = fλ**.',
  sol: 'One wavelength in one period; v = λ/T; f = 1/T.',
  scheme: [['One wavelength travelled in one period', 1], ['v = λ ÷ T', 1], ['Using f = 1 ÷ T to reach v = fλ', 1]],
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 sound against light: thunder and lightning
add('m-why', mcq({
  stem: 'During a storm the flash of lightning is seen before the thunder is heard because',
  right: 'light travels much faster than sound', wrong: ['light is produced before sound is produced', 'sound travels through a vacuum more easily than light', 'the flash is nearer to the observer than the thunder'],
  sol: 'The two begin together, but light covers the distance almost instantly while sound takes seconds, option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('m-flash', mcq({
  stem: `A flash of lightning is followed ${K.FLASH.gap} s later by the thunder. Taking the speed of sound as ${K.V_AIR} m s⁻¹ and neglecting the time taken by light, the lightning struck at a distance of`,
  right: `${K.FLASH_D} m`, wrong: ['42.5 m', '425 m', '2.72 m'],
  sol: r`$d = ${K.V_AIR} \times ${K.FLASH.gap} = ${K.FLASH_D}$ m, option (@K).`,
  d: 2, c: 'application', t: [4],
}));
add('m-farfar', mcq({
  stem: `Thunder is heard ${K.FAR_T} s after a flash. If the speed of sound is ${K.V_AIR} m s⁻¹, the distance of the strike, in kilometres, is`,
  right: `${K.FAR.d / 1000} km`, wrong: ['1700 km', '0.17 km', '17 km'],
  sol: r`$d = ${K.V_AIR} \times ${K.FAR_T} = ${K.FAR.d}$ m $= ${K.FAR.d / 1000}$ km, option (@K).`,
  d: 2, c: 'application', t: [4],
}));
add('tf-light', tf({
  stem: 'The time taken by light to travel from a lightning flash 2 km away to an observer is much shorter than the time taken by the thunder.',
  key: 't',
  sol: 'True. Light is nearly nine hundred thousand times faster than sound in air.',
  d: 1, c: 'understanding', t: [4],
}));
add('num-thunder', num({
  stem: `The thunder is heard ${K.THUNDER.gap} s after a lightning flash is seen. Taking the speed of sound in air as ${K.V_AIR} m s⁻¹, find the distance of the lightning from the observer, in m.`,
  value: K.THUNDER_D, tol: 0, unit: 'm',
  sol: r`$d = v \times t = ${K.V_AIR} \times ${K.THUNDER.gap} = ${K.THUNDER_D}$ m.`,
  scheme: [['Formula and substitution', 0.5], [`${K.THUNDER_D} m`, 0.5]],
  d: 2, c: 'application', t: [4],
}), () => sh(K.THUNDER_D, 1530));
add('num-light', num({
  stem: `A firework bursts ${K.LIGHT_FAR.d} m from a spectator. Taking the speed of light as 3 × 10⁸ m s⁻¹, find the time taken by the light to reach the spectator, in microseconds (1 µs = 10⁻⁶ s).`,
  value: K.LIGHT_FAR_T * 1e6, tol: 0.5, unit: 'µs',
  sol: r`$t = \dfrac{d}{c} = \dfrac{${K.LIGHT_FAR.d}}{3 \times 10^{8}} = 1.7 \times 10^{-5}$ s $= ${K.LIGHT_FAR_T * 1e6}$ µs.`,
  scheme: [['Formula and substitution', 0.5], [`${K.LIGHT_FAR_T * 1e6} µs`, 0.5]],
  d: 3, c: 'application', t: [4],
}), () => sh(Math.round(K.LIGHT_FAR_T * 1e6), 17));
add('num-cricket', num({
  stem: `At a stadium a spectator is ${K.CRICKET.d} m from the batter. She sees the bat hit the ball and hears the sound a moment later. Taking the speed of sound as ${K.V_AIR} m s⁻¹ and ignoring the time for light, find the delay in s.`,
  value: K.CRICKET_T, tol: 0, unit: 's',
  sol: r`$t = \dfrac{d}{v} = \dfrac{${K.CRICKET.d}}{${K.V_AIR}} = ${K.CRICKET_T}$ s.`,
  scheme: [['Formula and substitution', 0.5], [`${K.CRICKET_T} s`, 0.5]],
  d: 2, c: 'application', t: [4],
}), () => sh(K.CRICKET_T, 0.5));
add('s2f', short({
  marks: 2,
  stem: 'Give two reasons why, for a storm many kilometres away, the time between the flash and the thunder can be used to find the distance, even though light and sound start together.',
  wl: null,
  model: 'The time taken by **light is negligible** because it is so fast, so the whole gap is the time taken by **sound**; and the speed of sound in air is **known**, so the **distance = speed × time gap**.',
  sol: 'Light time negligible; known speed of sound.',
  scheme: [['Light takes a negligible time', 1], ['Distance from speed of sound and the gap', 1]],
  d: 3, c: 'analysis', t: [4],
}));
add('s3c', short({
  marks: 3,
  stem: `Two lightning flashes are seen during a storm. The thunder of the first is heard ${K.STORM.g1} s and of the second ${K.STORM.g2} s after its flash. Taking the speed of sound as ${K.V_AIR} m s⁻¹, find (a) the distance of each flash and (b) how much farther the second is than the first.`,
  wl: null,
  model: `**(a)** First: ${K.V_AIR} × ${K.STORM.g1} = **${K.STORM_D1} m**; second: ${K.V_AIR} × ${K.STORM.g2} = **${K.STORM_D2} m**.\n\n**(b)** ${K.STORM_D2} − ${K.STORM_D1} = **${K.STORM_DIFF} m**.`,
  sol: '2040 m and 3400 m; 1360 m.',
  scheme: [['Distance of the first flash', 1], ['Distance of the second flash', 1], ['Difference 1360 m', 1]],
  d: 2, c: 'application', t: [4],
}), () => sh(K.STORM_DIFF, 1360));

// ---------------------------------------------------------------- t05 infrasonic, audible, ultrasonic
add('m-range', mcq({
  stem: 'Which one of these sounds can be heard by a healthy young person?',
  right: 'A note of frequency 8000 Hz', wrong: ['A rumble of frequency 12 Hz', 'A squeak of frequency 35 000 Hz', 'A click of frequency 80 000 Hz'],
  sol: 'The audible range is 20 Hz to 20 000 Hz; only 8000 Hz lies inside it, option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('m-dog', mcq({
  stem: 'A dog runs to its owner whenever he blows a silent whistle that he himself cannot hear. The frequency of the sound of the whistle is most likely',
  right: '25 000 Hz', wrong: ['10 Hz', '500 Hz', '15 000 Hz'],
  sol: 'A dog hears sounds above the human limit of 20 000 Hz, so the whistle is ultrasonic, option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('m-crack', mcq({
  stem: 'A hidden crack inside a metal casting in a factory can be located using',
  right: 'ultrasonic waves', wrong: ['infrasonic waves', 'audible sound of 500 Hz', 'radio waves'],
  sol: 'Ultrasound passes into the metal and is changed by a crack; it is used for flaw detection, option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('m-bat', mcq({
  stem: 'A bat squeaks at a frequency of 60 000 Hz. A person standing nearby hears',
  right: 'nothing, because the sound is ultrasonic', wrong: ['a very shrill note, because the sound is audible', 'a very low rumble, because the sound is infrasonic', 'nothing, because the sound is subsonic'],
  sol: 'At 60 000 Hz the frequency is above 20 000 Hz, so the sound is ultrasonic and inaudible to humans, option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('m-sub', mcq({
  stem: 'A cyclist rides at 5 m s⁻¹. In comparison with the speed of sound, her speed is called',
  right: 'subsonic', wrong: ['supersonic', 'ultrasonic', 'infrasonic'],
  sol: 'A speed less than the speed of sound is subsonic; the other words describe speeds above that or frequencies, option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('tf-super', tf({
  stem: 'A supersonic aircraft must always produce ultrasonic sound.',
  key: 'f',
  sol: 'False. Supersonic describes a speed greater than that of sound; ultrasonic describes a frequency above 20 000 Hz.',
  d: 2, c: 'understanding', t: [5],
}));
add('term-aud', term({
  stem: 'State the range of frequencies that a normal human ear can hear.',
  model: 'About **20 Hz to 20 000 Hz**.', sol: '20 Hz to 20 000 Hz.', sch: '20 Hz to 20 000 Hz',
  d: 1, c: 'recall', t: [5],
}));
add('fill-para', fill({
  marks: 5,
  stem: 'Complete the paragraph. Sound waves of frequency below 20 Hz are called ___ sound, and those above 20 000 Hz are called ___ sound. A jet that flies faster than sound is said to be ___, while a car moving slower than sound is ___. Bats use ___ sound to find their way in the dark.',
  acc: [['infrasonic'], ['ultrasonic'], ['supersonic'], ['subsonic'], ['ultrasonic']],
  sol: 'Infrasonic, ultrasonic, supersonic, subsonic, ultrasonic.',
  d: 2, c: 'understanding', t: [5],
}));
add('s2g', short({
  marks: 2,
  stem: 'Distinguish between ultrasonic and supersonic.',
  wl: null,
  model: '**Ultrasonic** describes a sound whose **frequency** is above 20 000 Hz; **supersonic** describes a **speed** greater than the speed of sound.',
  sol: 'Frequency against speed.',
  scheme: [['Ultrasonic is about frequency above 20 000 Hz', 1], ['Supersonic is about speed above that of sound', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('s2h', short({
  marks: 2,
  stem: 'Name two uses of ultrasound, one in medicine and one in industry.',
  wl: null,
  model: 'In medicine: **ultrasonography** to produce images of the unborn baby or an organ. In industry: **cleaning** delicate parts, or **detecting cracks** in metal.',
  sol: 'Medical imaging; cleaning or flaw detection.',
  scheme: [['A medical use', 1], ['An industrial use', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('s3f', short({
  marks: 3,
  stem: 'Define infrasonic, audible and ultrasonic sound and give one source of infrasonic sound and one of ultrasonic sound.',
  wl: null,
  model: '**Infrasonic:** frequency **below 20 Hz** (for example an earthquake or an elephant). **Audible:** **20 Hz to 20 000 Hz**. **Ultrasonic:** frequency **above 20 000 Hz** (for example a bat or a dog whistle).',
  sol: 'Below 20 Hz; 20 to 20 000 Hz; above 20 000 Hz; sources.',
  scheme: [['Infrasonic with a source', 1], ['Audible range', 1], ['Ultrasonic with a source', 1]],
  d: 1, c: 'recall', t: [5],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('kinds-long', long({
  marks: 10, wl: null,
  stem: 'A student holds one end of a long slinky and the other end is fixed to a wall. She first pushes and pulls the free end along the length of the slinky, and then shakes it up and down at right angles to its length.\n\n(a) Name the kind of wave produced in each case. [2]\n\n(b) For the first case, name the two kinds of region seen on the slinky and say how the coils differ in them. [3]\n\n(c) For the second case, name the two kinds of displacement seen and the direction in which the coils vibrate, compared with the direction in which the wave moves. [3]\n\n(d) State which of the two cases is like the sound of a bell in air, and give a reason. [2]',
  model: '**(a)** First case: **longitudinal**; second case: **transverse**.\n\n**(b)** **Compressions**, where the coils are crowded together, and **rarefactions**, where the coils are spread apart.\n\n**(c)** **Crests** (upward humps) and **troughs** (downward dips); the coils vibrate **at right angles** to the direction in which the wave travels.\n\n(d) The **first case**, because the air particles vibrate **along** the direction of travel of the sound, making compressions and rarefactions.',
  sol: 'Longitudinal and transverse; compressions and rarefactions; crests and troughs at right angles; the first, as air vibrates along the wave.',
  scheme: [['Longitudinal for the push and pull', 1], ['Transverse for the sideways shake', 1], ['Compressions with the crowded coils', 1], ['Rarefactions with the spread coils', 1], ['Contrast between the two regions', 1], ['Crests and troughs named', 1], ['Vibration at right angles to the wave', 1], ['Comparison with the direction of the wave', 1], ['First case chosen', 1], ['Reason: vibration along the direction of sound', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('bell-long', long({
  marks: 10, wl: null,
  stem: 'The figure shows an electric bell hung by a thread inside a sealed bell jar standing on a plate, with a pipe joining the jar to a vacuum pump. The bell is switched on and the pump is started.\n\n(a) State what is heard as the air is slowly removed. [2]\n\n(b) What is seen about the hammer of the bell during this time, and what does it show about the bell? [2]\n\n(c) State the conclusion drawn from the experiment. [2]\n\n(d) What is heard when air is let back into the jar? [1]\n\n(e) Why is the bell hung by a thread and not fixed to the plate? [1]\n\n(f) A radio signal from a spacecraft is received on Earth although space has no air. Why does the experiment not contradict this? [2]',
  model: '**(a)** The sound becomes **fainter and fainter**, and is hardly heard when most of the air is gone.\n\n**(b)** The hammer is **still seen striking** the gong, so the bell is **still vibrating**.\n\n**(c)** **Sound needs a material medium and cannot travel through a vacuum.**\n\n**(d)** The sound **returns**, growing louder.\n\n**(e)** If fixed to the plate, the vibrations would travel through the **solid** to the outside, so some sound would be heard even without air.\n\n**(f)** A radio signal is carried by **electromagnetic waves, which need no medium**, unlike sound.',
  sol: 'Fainter; hammer still moves; sound needs a medium; sound returns; avoids solid conduction; radio waves need no medium.',
  scheme: [['Sound fades', 1], ['Almost inaudible when the air is gone', 1], ['Hammer still moves', 1], ['Bell still vibrating', 1], ['Sound needs a medium', 1], ['No sound through a vacuum', 1], ['Sound returns', 1], ['Vibrations would pass through the solid support', 1], ['Radio waves need no medium', 1], ['Sound is a mechanical wave and radio is not', 1]],
  d: 2, c: 'application', t: [2],
  assets: [fv(BELL_JAR, 'An electric bell inside a sealed bell jar joined to a vacuum pump')],
}));
add('graph-long', long({
  marks: 10, wl: null,
  stem: 'The figure shows the displacement of the points of a long rope at one instant, when a wave of frequency 5 Hz is travelling along it.\n\n(a) Find the amplitude of the wave. [1]\n\n(b) Find the wavelength of the wave. [2]\n\n(c) Find the distance along the rope from a crest to the next trough. [1]\n\n(d) Find the time period of the vibration of a point on the rope. [2]\n\n(e) Find the speed of the wave. [2]\n\n(f) The frequency is doubled and the speed stays the same. Find the new wavelength. [2]',
  model: `**(a)** **${K.WG.amp} cm** (the greatest displacement from the rest line).\n\n**(b)** The distance between two consecutive crests, at 0.2 m and 1.0 m, is **${K.WG.lambda} m**.\n\n**(c)** Half a wavelength: **${K.WG_HALF} m**.\n\n**(d)** T = 1 ÷ f = 1 ÷ ${K.WG.f} = **${K.WG_T} s**.\n\n**(e)** v = fλ = ${K.WG.f} × ${K.WG.lambda} = **${K.WG_V} m s⁻¹**.\n\n**(f)** λ = v ÷ f = ${K.WG_V} ÷ ${2 * K.WG.f} = **${K.WG_V / (2 * K.WG.f)} m**.`,
  sol: '3 cm; 0.8 m; 0.4 m; 0.2 s; 4 m/s; 0.4 m.',
  scheme: [['3 cm', 1], ['Two consecutive crests read from the graph', 1], ['0.8 m', 1], ['0.4 m', 1], ['T = 1 ÷ f', 1], ['0.2 s', 1], ['v = fλ with substitution', 1], ['4 m/s', 1], ['λ = v ÷ f with 10 Hz', 1], ['0.4 m', 1]],
  d: 3, c: 'application', t: [3],
  assets: [figGraph()],
}), () => sh(K.WG_V / (2 * K.WG.f), 0.4));
add('thunder-long', long({
  marks: 10, wl: null,
  stem: `During a storm a child counts ${K.STORM.g1} s between the flash of one lightning stroke and its thunder. Later she counts ${K.STORM.g2} s for a second stroke. Take the speed of sound in air as ${K.V_AIR} m s⁻¹ and the speed of light as 3 × 10⁸ m s⁻¹.\n\n(a) Why does she see the flash before she hears the thunder? [2]\n\n(b) Find the distance of the first stroke. [2]\n\n(c) Find the distance of the second stroke and say which stroke was farther away. [2]\n\n(d) Find the time taken by the light of the first stroke to reach her, in microseconds. [3]\n\n(e) Using your answer to (d), state why this time can be neglected. [1]`,
  model: `**(a)** The flash and the thunder start together, but **light travels far faster than sound**, so the light arrives almost at once and the sound arrives later.\n\n**(b)** d = v × t = ${K.V_AIR} × ${K.STORM.g1} = **${K.STORM_D1} m**.\n\n**(c)** d = ${K.V_AIR} × ${K.STORM.g2} = **${K.STORM_D2} m**; the **second** stroke was farther away.\n\n**(d)** t = ${K.STORM_D1} ÷ (3 × 10⁸) = ${K.STORM_LIGHT_T} s = **${K.STORM_LIGHT_US} µs**.\n\n**(e)** It is about **a few millionths of a second**, tiny compared with several seconds for the sound.`,
  sol: 'Light is faster; 2040 m; 3400 m, the second; 6.8 µs; negligible.',
  scheme: [['Light much faster than sound', 1], ['Both start together', 1], ['Formula and substitution', 1], ['2040 m', 1], ['3400 m', 1], ['Second stroke is farther', 1], ['Formula t = d ÷ c', 1], ['Substitution', 1], ['6.8 µs', 1], ['Negligible against the sound time', 1]],
  d: 3, c: 'application', t: [4],
  assets: [fv(THUNDER_FIG, 'A lightning flash with light reaching the observer at once and sound arriving later')],
}), () => sh(K.STORM_LIGHT_US, 6.8));
add('medium-long', long({
  marks: 10, wl: null,
  stem: `A worker taps one end of a long iron rail of length ${K.RAIL.len} m. A friend with her ear to the other end hears two separate sounds. Take the speed of sound as ${K.V_IRON} m s⁻¹ in iron and ${K.V_AIR} m s⁻¹ in air.\n\n(a) Why does the friend hear two sounds, and which one arrives first? [2]\n\n(b) Calculate the time taken by the sound to travel through the rail and through the air. [3]\n\n(c) Find the gap between the two sounds. [1]\n\n(d) The tap produces a note of frequency ${K.BOAT.f} Hz. Find its wavelength in air and in iron. [3]\n\n(e) State the frequency of the note in iron. [1]`,
  model: `**(a)** The sound travels along **two paths**, through the iron and through the air, at **different speeds**; the sound through the **iron** (a solid, faster) arrives first.\n\n**(b)** Iron: t = ${K.RAIL.len} ÷ ${K.V_IRON} = **${K.RAIL_IRON_T} s**; air: t = ${K.RAIL.len} ÷ ${K.V_AIR} = **${K.RAIL_AIR_T} s**.\n\n**(c)** ${K.RAIL_AIR_T} − ${K.RAIL_IRON_T} = **${K.RAIL_GAP} s**.\n\n**(d)** In air: λ = v ÷ f = ${K.V_AIR} ÷ ${K.BOAT.f} = **${K.BOAT_AIR} m**; in iron: λ = ${K.V_IRON} ÷ ${K.BOAT.f} = **${K.V_IRON / K.BOAT.f} m**.\n\n**(e)** **${K.BOAT.f} Hz**, the same, because the frequency is fixed by the source.`,
  sol: 'Two paths with different speeds, iron first; 0.2 s and 3 s; 2.8 s; 0.68 m and 10.2 m; 500 Hz.',
  scheme: [['Two paths with different speeds', 1], ['Iron first, because sound is faster in a solid', 1], ['Time through the iron 0.2 s', 1], ['Time through the air 3 s', 1], ['Formula t = d ÷ v', 1], ['Gap 2.8 s', 1], ['λ = v ÷ f in air', 1], ['λ in iron', 1], ['0.68 m and 10.2 m', 1], ['Frequency unchanged at 500 Hz', 1]],
  d: 4, c: 'analysis', t: [2, 3],
}), () => sh(K.V_IRON / K.BOAT.f, 10.2));
add('ultra-long', long({
  marks: 10, wl: null,
  stem: 'A science club records the frequency of four sound sources and wants to classify them. Take the speed of sound in air as 340 m s⁻¹.\n\n| Source | Frequency |\n|---|---|\n| Whale call | 12 Hz |\n| Guitar string | 330 Hz |\n| Cleaning bath for jewellery | 40 000 Hz |\n| Fire-alarm tone | 3000 Hz |\n\n(a) State the audible range of a human ear and classify each of the four sources as infrasonic, audible or ultrasonic. [4]\n\n(b) Name the source that cannot be heard because its frequency is too high, and give one more use of that kind of sound. [2]\n\n(c) Find the wavelength in air of the sound of the guitar string. [2]\n\n(d) A jet aircraft flies at a speed greater than that of sound. State, with a reason, whether it is correct to call the sound of the jet ultrasonic. [2]',
  model: `**(a)** The audible range is **20 Hz to 20 000 Hz**. Whale call: **infrasonic**; guitar string: **audible**; cleaning bath: **ultrasonic**; fire alarm: **audible**.\n\n**(b)** The **cleaning bath**; ultrasound is also used for **ultrasonography** (or flaw detection in metals).\n\n**(c)** λ = v ÷ f = ${K.V_AIR} ÷ 330 = **${K.GUITAR_L} m** (about 1.03 m).\n\n**(d)** **No.** Ultrasonic describes the **frequency** of a sound; the jet's high speed makes it **supersonic**, which is a statement about speed.`,
  sol: 'Range; infrasonic, audible, ultrasonic, audible; cleaning bath, imaging; 1.03 m; no, supersonic is about speed.',
  scheme: [['Audible range stated', 1], ['Whale call infrasonic', 1], ['Cleaning bath ultrasonic', 1], ['Guitar string and fire alarm audible', 1], ['Cleaning bath named', 1], ['Another use of ultrasound', 1], ['Formula and substitution', 1], ['1.03 m', 1], ['Not ultrasonic', 1], ['Supersonic is about speed, ultrasonic about frequency', 1]],
  d: 3, c: 'application', t: [5, 3],
}), () => sh(K.GUITAR_L, 1.03));

// ---------------------------------------------------------------- more objective items on neutral sub-topics
add('m-energy', mcq({
  stem: 'When a wave travels through a medium it transfers',
  right: 'energy from one place to another', wrong: ['particles of the medium from one place to another', 'both the particles and the energy of the medium', 'neither energy nor particles'],
  sol: 'A wave moves energy; the particles only vibrate about their positions, option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('m-source', mcq({
  stem: 'Sound is always produced by a body that is',
  right: 'vibrating', wrong: ['heated', 'magnetised', 'moving with a uniform velocity'],
  sol: 'Every source of sound, such as a tuning fork or a drum skin, is vibrating, option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('m-amp', mcq({
  stem: 'The amplitude of a wave on a rope is the',
  right: 'greatest displacement of a point of the rope from its rest position', wrong: ['distance between two consecutive crests', 'number of crests passing a point in one second', 'time taken for one complete vibration'],
  sol: 'The other options describe the wavelength, the frequency and the time period, option (@K).',
  d: 1, c: 'recall', t: [3],
}));
