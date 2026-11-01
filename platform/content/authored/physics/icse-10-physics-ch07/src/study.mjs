// ICSE 10 Physics ch07 Sound — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Sound — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Reflection of sound and echoes',
      r`- Sound is reflected by hard, large surfaces and obeys the laws of reflection.
- **Echo:** sound heard after reflection from a distant obstacle, separately from the original sound.
- **Conditions:** (1) the echo must reach the ear at least **0.1 s** after the original sound (persistence of hearing); (2) so the reflector must be at least **17 m** away in air ($340 \times 0.1 \div 2$); (3) the reflector must be large compared with the wavelength; (4) the sound must be loud enough.
- **Echo relations:** $d = \dfrac{v t}{2}$, $v = \dfrac{2d}{t}$, $t = \dfrac{2d}{v}$.
- Between two cliffs, with echoes after $t_{1}$ and $t_{2}$: distance between the cliffs $= \dfrac{v (t_{1} + t_{2})}{2}$.`,
      [kt('Echo', 'A sound heard after reflection from a distant obstacle, distinctly after the original sound.'), kt('Persistence of hearing', 'The time, about 0.1 s, for which the sensation of a sound lasts in the ear.')],
      [fm(r`d = \frac{v t}{2}`, 'Distance of a reflector'), fm(r`d_{\min} = \frac{v \times 0.1}{2}`, 'Minimum distance for an echo')],
      table(['Speed of sound', 'Minimum echo distance'], [['330 m/s', '16.5 m'], ['340 m/s', '17 m'], ['350 m/s', '17.5 m']], 'Table of minimum echo distance for three speeds of sound in air'),
      [1],
    ),
    sec(
      '2. Uses of echoes and SONAR',
      r`- **Ultrasound:** frequency above 20 kHz; short wavelength, so it travels in a narrow beam with little spreading and is reflected by small objects.
- **Bats** (echolocation), **dolphins**, **fishing boats** (shoals), **medical ultrasonography** (organs, unborn baby; no harmful radiation).
- **SONAR:** transmitter sends an ultrasonic pulse into the sea; receiver detects the echo; $\text{depth} = \dfrac{v t}{2}$ with $v \approx 1500$ m/s in sea water. Also finds submarines, wrecks and icebergs.`,
      [kt('SONAR', 'Sound Navigation And Ranging: a method of finding the distance of underwater objects from the echoes of ultrasonic pulses.'), kt('Ultrasound', 'Sound of frequency above 20 kHz, beyond the range of human hearing.')],
      [fm(r`\text{depth} = \frac{v t}{2}`, 'SONAR')],
      table(['Echo time (sea water)', 'Depth'], [['0.4 s', '300 m'], ['1.6 s', '1200 m'], ['4.0 s', '3000 m']], 'Table of SONAR echo times and depths for sound at fifteen hundred metres per second'),
      [2],
    ),
    sec(
      '3. Natural, damped and forced vibrations',
      `- **Natural (free) vibration:** at the body’s own natural frequency, which depends on its size, shape, material, tension (pendulum: length); constant amplitude in the absence of resistance.
- **Damped vibration:** amplitude decreases because of friction and air resistance; frequency stays the natural frequency (pendulum in air, struck tuning fork).
- **Forced vibration:** caused by an external periodic force; the body vibrates at the frequency of the force; amplitude usually small (table top under a tuning fork, sound board of a sitar).`,
      [kt('Natural frequency', 'The frequency at which a body vibrates when it is disturbed and left free.'), kt('Damped vibration', 'A vibration whose amplitude decreases with time because of resistive forces.'), kt('Forced vibration', 'A vibration produced by an external periodic force, at the frequency of that force.')],
      [fm(r`f = \frac{\text{number of oscillations}}{\text{time}}, \quad T = \frac{1}{f}`, 'Frequency and time period')],
      table(['Vibration', 'Frequency', 'Amplitude'], [['Natural', 'Natural', 'Constant'], ['Damped', 'Natural', 'Decreasing'], ['Forced', 'Of the applied force', 'Small unless frequencies match']], 'Table of frequency and amplitude for the three kinds of vibration'),
      [3],
    ),
    sec(
      '4. Resonance',
      `- **Resonance:** a special case of forced vibration in which the frequency of the applied force equals the natural frequency of the body, giving a very large amplitude.
- **Demonstration (Barton’s pendulums):** pendulums on a common string; the heavy driver forces all the others; only the one of equal length (same natural frequency) swings with a large amplitude.
- **Useful:** radio tuning; air columns and hollow bodies of musical instruments; resonance tube.
- **Harmful:** soldiers break step on bridges; machines on rubber mountings; glass shattered by a sung note; Tacoma Narrows bridge collapse (1940).`,
      [kt('Resonance', 'The large-amplitude vibration of a body when an applied periodic force has a frequency equal to its natural frequency.')],
      [],
      table(['Forced vibration', 'Resonance'], [['Any applied frequency', 'Applied frequency = natural frequency'], ['Small amplitude', 'Very large amplitude'], ['Table top and tuning fork', 'Equal-length pendulums']], 'Table comparing ordinary forced vibration with resonance'),
      [4],
    ),
    sec(
      '5. Characteristics of sound; decibel; noise pollution',
      r`- **Loudness** (subjective) depends on **amplitude**: intensity $\propto A^{2}$; also on the area of the vibrating body, distance from the source, density of the medium. **Intensity** (objective) is the sound energy per second per unit area, in W m⁻².
- **Pitch** (subjective) depends on **frequency** (objective): higher frequency, shriller sound.
- **Quality / timbre** (subjective) depends on the **waveform**, set by the number and relative strengths of overtones; lets us tell sources apart at equal pitch and loudness.
- **Decibel (dB):** unit of sound level; +10 dB means 10 times the intensity; above about 80–85 dB is harmful over long periods.
- **Noise pollution:** unwanted loud sound; causes stress, sleeplessness, hearing loss; reduce with silencers, trees, sound-proofing, rules on horns and loudspeakers.`,
      [kt('Pitch', 'The characteristic of sound by which a shrill note is distinguished from a flat one; it depends on frequency.'), kt('Quality (timbre)', 'The characteristic that distinguishes two sounds of the same pitch and loudness; it depends on the waveform.'), kt('Decibel', 'The unit used to express the level of a sound.')],
      [fm(r`I \propto A^{2}`, 'Intensity and amplitude'), fm(r`v = f \lambda`, 'Wave equation')],
      table(['Characteristic', 'Depends on', 'Type'], [['Loudness', 'Amplitude', 'Subjective'], ['Pitch', 'Frequency', 'Subjective'], ['Quality', 'Waveform', 'Subjective'], ['Intensity', 'Energy flow', 'Objective']], 'Table of characteristics of sound, what each depends on and whether it is subjective or objective'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Forgetting to halve the round-trip distance in echo and SONAR problems.
- Using 340 m/s for sound in sea water.
- Saying damping lowers the frequency.
- Confusing loudness with pitch.
- Calling every forced vibration “resonance”.

**How marks are usually awarded**
- Echo numericals: formula d = vt/2 (1), substitution (1), answer with unit (1).
- Resonance: definition with “equal frequency” (1), demonstration (1), example (1).
- Characteristics: each characteristic with the quantity it depends on (1 each).`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Echo?', 'Reflected sound heard separately from the original.', 'definition', 1),
    fc(2, 'Persistence of hearing?', 'About 0.1 s.', 'fact', 1),
    fc(3, 'Minimum echo distance in air?', 'About 17 m.', 'fact', 1),
    fc(4, 'Why 17 m?', '340 m/s × 0.1 s = 34 m round trip, halved.', 'concept', 1),
    fc(5, 'Distance of a reflector from echo time?', 'd = v t / 2.', 'formula', 1),
    fc(6, 'Speed of sound from echo time?', 'v = 2d / t.', 'formula', 1),
    fc(7, 'Reflector needed for an echo?', 'Hard and large compared with the wavelength.', 'concept', 1),
    fc(8, 'Ultrasound?', 'Sound above 20 kHz.', 'definition', 2),
    fc(9, 'SONAR stands for…', 'Sound Navigation And Ranging.', 'fact', 2),
    fc(10, 'Speed of sound in sea water?', 'About 1500 m/s.', 'fact', 2),
    fc(11, 'Why ultrasound in SONAR?', 'Narrow beam, little spreading, not heard.', 'concept', 2),
    fc(12, 'How do bats find insects?', 'Echoes of ultrasonic squeaks.', 'example', 2),
    fc(13, 'Medical use of echoes?', 'Ultrasound scanning of organs and the unborn baby.', 'example', 2),
    fc(14, 'Natural frequency depends on…', 'Size, shape, material, tension (pendulum: length).', 'concept', 3),
    fc(15, 'Damped vibration?', 'Amplitude falls; frequency unchanged.', 'definition', 3),
    fc(16, 'Forced vibration?', 'At the frequency of an external periodic force.', 'definition', 3),
    fc(17, 'Example of forced vibration?', 'Table top under a vibrating tuning fork.', 'example', 3),
    fc(18, 'Resonance?', 'Forcing frequency = natural frequency, large amplitude.', 'definition', 4),
    fc(19, 'Barton’s pendulums: which one resonates?', 'The one with the same length as the driver.', 'diagram', 4),
    fc(20, 'Why do soldiers break step on bridges?', 'To avoid resonance.', 'example', 4),
    fc(21, 'Useful resonance?', 'Radio tuning; musical instruments.', 'example', 4),
    fc(22, 'Loudness depends on…', 'Amplitude (intensity ∝ amplitude²).', 'concept', 5),
    fc(23, 'Pitch depends on…', 'Frequency.', 'concept', 5),
    fc(24, 'Quality depends on…', 'Waveform (overtones).', 'concept', 5),
    fc(25, 'Subjective vs objective?', 'Loudness, pitch vs intensity, frequency.', 'concept', 5),
    fc(26, 'Unit of sound level?', 'Decibel (dB).', 'fact', 5),
    fc(27, '+10 dB means…', '10 times the intensity.', 'fact', 5),
    fc(28, 'Harmful sound level (long exposure)?', 'Above about 80–85 dB.', 'fact', 5),
    fc(29, 'Two ways to reduce noise pollution?', 'Silencers; trees along roads (also sound-proofing).', 'example', 5),
    fc(30, 'Exam tip: echoes', 'Divide the round trip by 2.', 'exam-tip', 1),
  ],
  status: 'draft',
  provenance: PROV,
};
