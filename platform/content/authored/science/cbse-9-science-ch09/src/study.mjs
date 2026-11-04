// ch09 Sound — notes and flashcards.
import { T, table, flow, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

const sources = table(['Source of sound', 'What vibrates'], [['Tabla', 'stretched skin'], ['Veena', 'plucked string'], ['Human voice', 'vocal cords'], ['Flute', 'column of air']], 'Table of four sources of sound and what vibrates in each');
const bellJar = flow('LR', [['a', 'Bell rings in a jar of air: loud'], ['b', 'Pump removes the air: fainter'], ['c', 'Almost a vacuum: hardly any sound'], ['d', 'Air let in: loud again']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow showing the bell jar experiment');
const speeds = table(['Medium', 'Speed of sound (approximate)'], [['Air (about 22 °C)', 'about 344 m/s'], ['Sea water', 'about 1500 m/s'], ['Steel', 'about 5000 m/s']], 'Table of the approximate speed of sound in air, sea water and steel');
const wavesTable = table(['Quantity', 'Symbol', 'Unit'], [['Frequency', 'f', 'hertz (Hz)'], ['Time period', 'T = 1 ÷ f', 'second (s)'], ['Amplitude', 'A', 'metre (m)'], ['Wavelength', 'λ', 'metre (m)'], ['Speed', 'v = f λ', 'metre per second (m/s)']], 'Table of wave quantities with symbols and units');

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Sound — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Production of sound',
      r`**Sound is produced by vibrating bodies.** A vibration is a rapid to-and-fro motion about a mean position. A struck tuning fork makes a hanging thread ball jump; the throat buzzes when we speak; a drum skin makes rice grains dance. When the vibration stops, the sound stops.

A vibrating body disturbs the air around it. This disturbance spreads as a **sound wave** and reaches the ear.`,
      [kt('Vibration', 'A rapid to-and-fro motion about a mean position.'), kt('Sound', 'A disturbance produced by a vibrating body that travels through a medium as a wave.')],
      [],
      sources,
      [1],
    ),
    sec(
      '2. Propagation: a longitudinal wave that needs a medium',
      r`Sound needs a **medium** (solid, liquid or gas) and cannot travel through a **vacuum**: in the bell jar experiment the sound fades as the air is pumped out and returns when air is let in.

In air, sound is a **longitudinal wave**: the air particles vibrate **parallel** to the direction in which the wave travels. A **compression** (C) is a region where the particles are crowded together (high pressure); a **rarefaction** (R) is a region where they are spread apart (low pressure). The particles only vibrate about their places; the wave pattern moves on.`,
      [kt('Medium', 'The material (solid, liquid or gas) through which a wave travels.'), kt('Longitudinal wave', 'A wave in which the particles vibrate along the direction of travel of the wave.'), kt('Compression', 'A region of a sound wave where particles are close together and pressure is high.'), kt('Rarefaction', 'A region of a sound wave where particles are far apart and pressure is low.')],
      [],
      V.wave,
      [1],
      [bellJar],
    ),
    sec(
      '3. Wave quantities and v = fλ',
      r`**Frequency** $f$: vibrations per second, in hertz (Hz). **Time period** $T = 1/f$, in seconds. **Amplitude**: the maximum displacement from the mean position. **Wavelength** $\lambda$: distance between two successive compressions (or rarefactions).

In one period the wave travels one wavelength, so
$$v = \dfrac{\lambda}{T} = f\lambda$$
In a given medium $v$ is fixed, so a higher frequency means a shorter wavelength. Example: $f = 2000$ Hz and $v = 344\ \text{m s}^{-1}$ give $\lambda = 0.172$ m.`,
      [kt('Frequency', 'Number of vibrations per second; unit hertz.'), kt('Time period', 'Time taken for one complete vibration, T = 1/f.'), kt('Amplitude', 'Maximum displacement of a vibrating particle from its mean position.'), kt('Wavelength', 'Distance between two successive compressions or two successive rarefactions.')],
      [fm(r`v = f\lambda`, 'Speed of a wave'), fm(r`T = \dfrac{1}{f}`, 'Time period')],
      wavesTable,
      [2],
    ),
    sec(
      '4. Speed of sound in different media',
      r`Sound travels fastest in **solids**, slower in **liquids** and slowest in **gases**. The values below are approximate: air about 344 m s⁻¹ (at about 22 °C), sea water about 1500 m s⁻¹, steel about 5000 m s⁻¹. In a gas the speed increases as the temperature rises.

Time taken $= \text{distance} / \text{speed}$. Over 100 m, sound takes about 0.02 s in steel and about 0.29 s in air.`,
      [kt('Speed of sound', 'Distance travelled by a sound wave per second; it depends on the medium and its temperature.')],
      [],
      speeds,
      [2],
    ),
    sec(
      '5. Pitch, loudness, quality and the range of hearing',
      r`**Pitch** depends on frequency (higher frequency, higher pitch). **Loudness** depends on amplitude and is measured in decibels (dB). **Quality** (timbre) depends on the mixture of **overtones** and lets us tell two instruments apart.

The audible range of the human ear is about **20 Hz to 20 kHz**. Below 20 Hz is **infrasound** (used by elephants and whales); above 20 kHz is **ultrasound**. Ultrasound is used in sonar, medical scans, cleaning and finding flaws in metal.`,
      [kt('Pitch', 'How shrill or deep a sound seems; depends on frequency.'), kt('Loudness', 'How loud a sound seems; depends on amplitude.'), kt('Quality (timbre)', 'The characteristic that lets us tell sounds of the same pitch and loudness apart; depends on overtones.'), kt('Infrasound', 'Sound with frequency below 20 Hz.'), kt('Ultrasound', 'Sound with frequency above 20 kHz.')],
      [],
      V.pitch,
      [3],
      [V.range],
    ),
    sec(
      '6. Reflection, echo, sonar, echolocation and Raman',
      r`Sound is reflected from hard, flat surfaces. An **echo** is a reflected sound heard separately; it must arrive at least about **0.1 s** after the original, so the reflector must be at least $d = vt/2 = 344 \times 0.1/2 \approx 17$ m away in air. **Reverberation** is the lingering of sound in a hall due to repeated reflections; curtains, carpets and perforated boards reduce it.

**Sonar** uses ultrasound: depth $d = vt/2$ (the sound goes down and back). **Echolocation:** bats and dolphins find their way and prey by the echoes of their ultrasound.

**C. V. Raman** studied the sound of Indian drums such as the tabla and the mridangam and showed that the loaded (black-patch) skin gives **harmonic overtones**, whole-number multiples of the lowest frequency.`,
      [kt('Echo', 'A reflected sound that is heard separately from the original sound.'), kt('Reverberation', 'The persistence of sound in a hall because of repeated reflections.'), kt('Sonar', 'A device that uses ultrasound echoes to find the depth of water or to locate objects under water.'), kt('Echolocation', 'Locating objects by the echoes of ultrasound, as bats and dolphins do.')],
      [fm(r`d = \dfrac{vt}{2}`, 'Distance from the echo time')],
      V.sonar,
      [4],
    ),
  ],
  exam_tips_md: `- Sound is a longitudinal wave that needs a medium; name compressions and rarefactions.
- Write v = fλ first; convert kHz to Hz; give the unit of the answer.
- Speeds are approximate: air about 344, sea water about 1500, steel about 5000 m s⁻¹.
- Pitch ↔ frequency, loudness ↔ amplitude, quality ↔ overtones.
- Audible range about 20 Hz to 20 kHz.
- Echo and sonar: the sound travels there and back, so d = vt/2; the echo needs at least 0.1 s (about 17 m in air).`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'How is sound produced?', 'By a vibrating body.', 'definition', 1),
    fc(2, 'What is a vibration?', 'A rapid to-and-fro motion about a mean position.', 'definition', 1),
    fc(3, 'What does the bell jar experiment show?', 'Sound needs a medium: it fades as the air is pumped out and cannot travel through a vacuum.', 'concept', 1),
    fc(4, 'Why must astronauts on the Moon use radios to talk?', 'There is no air on the Moon, so sound cannot travel between them.', 'example', 1),
    fc(5, 'What kind of wave is sound in air?', 'A longitudinal wave: the particles vibrate along the direction in which the wave travels.', 'definition', 1),
    fc(6, 'What is a compression?', 'A region of a sound wave where the particles are crowded together and the pressure is high.', 'definition', 1),
    fc(7, 'What is a rarefaction?', 'A region of a sound wave where the particles are spread apart and the pressure is low.', 'definition', 1),
    fc(8, 'How do transverse waves differ from longitudinal waves?', 'In a transverse wave the particles vibrate at right angles to the direction of travel (crests and troughs).', 'concept', 1),
    fc(9, 'Define frequency and give its unit.', 'The number of vibrations per second; the hertz (Hz).', 'definition', 2),
    fc(10, 'Define time period and write its relation with frequency.', r`The time for one complete vibration, in seconds; $T = 1/f$.`, 'definition', 2),
    fc(11, 'Define amplitude.', 'The maximum displacement of a vibrating particle from its mean position.', 'definition', 2),
    fc(12, 'Define wavelength.', 'The distance between two successive compressions or two successive rarefactions.', 'definition', 2),
    fc(13, 'Derive the relation between v, f and λ in one line.', r`In one period $T$ the wave moves one wavelength, so $v = \lambda/T = f\lambda$.`, 'formula', 2),
    fc(14, 'A sound has f = 2000 Hz in air (344 m/s). Wavelength?', r`$\lambda = v/f = 344/2000 = 0.172$ m.`, 'example', 2),
    fc(15, 'In which state of matter does sound travel fastest?', 'In solids, then liquids, and slowest in gases.', 'fact', 2),
    fc(16, 'Approximate speeds of sound in air, sea water and steel?', 'About 344 m/s, about 1500 m/s and about 5000 m/s.', 'fact', 2),
    fc(17, 'How does temperature affect the speed of sound in air?', 'The speed increases as the temperature rises.', 'concept', 2),
    fc(18, 'What does pitch depend on?', 'On frequency: a higher frequency gives a higher pitch.', 'concept', 3),
    fc(19, 'What does loudness depend on?', 'On amplitude: a larger amplitude gives a louder sound.', 'concept', 3),
    fc(20, 'What is the unit of loudness?', 'The decibel (dB).', 'fact', 3),
    fc(21, 'What is the quality (timbre) of a sound?', 'The characteristic that lets us tell two sounds of the same pitch and loudness apart; it depends on the overtones.', 'definition', 3),
    fc(22, 'What is the audible range of the human ear?', 'About 20 Hz to 20 kHz.', 'fact', 3),
    fc(23, 'Define infrasound.', 'Sound of frequency below 20 Hz, which humans cannot hear.', 'definition', 3),
    fc(24, 'Define ultrasound.', 'Sound of frequency above 20 kHz, which humans cannot hear.', 'definition', 3),
    fc(25, 'Name three uses of ultrasound.', 'Sonar, medical scans and cleaning delicate parts (also finding cracks in metal).', 'example', 3),
    fc(26, 'What is an echo?', 'A reflected sound that is heard separately from the original sound.', 'definition', 4),
    fc(27, 'What is the minimum distance of the reflector for an echo in air?', r`About 17 m: $d = vt/2 = 344 \times 0.1/2 \approx 17$ m.`, 'fact', 4),
    fc(28, 'Why is the depth found with sonar given by d = vt/2?', 'The pulse travels down and back up, so the distance travelled is twice the depth.', 'concept', 4),
    fc(29, 'What is echolocation?', 'Locating objects by the echoes of ultrasound, as bats and dolphins do.', 'definition', 4),
    fc(30, 'What is reverberation and how is it reduced?', 'The lingering of sound in a hall due to repeated reflections; reduced by curtains, carpets and perforated boards.', 'concept', 4),
    fc(31, 'What did C. V. Raman study about Indian drums?', 'He studied the tabla and the mridangam and showed that their loaded skins give harmonic overtones, which makes a clear musical note.', 'fact', 4),
    fc(32, 'What does "harmonic overtones" mean?', r`Overtones whose frequencies are whole-number multiples of the lowest frequency: $f$, $2f$, $3f$ and so on.`, 'concept', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
