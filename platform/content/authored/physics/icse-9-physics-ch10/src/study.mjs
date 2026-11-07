// ICSE 9 Physics ch10 notes and flashcards.
import { T, unit, PROV, svgV, table, r } from '../../icse-9-physics-ch01/src/lib.mjs';
import { TRANSVERSE, LONGITUDINAL, BELL_JAR, THUNDER_FIG, FREQ_SCALE, SPEED_BARS } from './svgs.mjs';
import * as K from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Sound and Wave Motion — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Wave motion: transverse and longitudinal waves',
      `A **wave** is a disturbance that moves through a medium and carries **energy** from one place to another. The particles of the medium only vibrate about their mean positions; the **medium itself does not travel** with the wave. Waves that need a material medium are **mechanical waves** (waves on a string, water ripples, sound).

- In a **transverse wave** the particles vibrate **at right angles** to the direction in which the wave travels. The wave is made of **crests** and **troughs**. Example: a wave on a stretched rope or a slinky shaken sideways.
- In a **longitudinal wave** the particles vibrate **along** the direction in which the wave travels. The wave is made of **compressions** (particles crowded together, high pressure) and **rarefactions** (particles spread apart, low pressure). Example: a slinky pushed and pulled along its length.

**Sound in air is a longitudinal wave.** A vibrating source such as a tuning fork pushes the air layers next to it to form a compression, then pulls back to leave a rarefaction. The pattern moves outward while each air particle only moves to and fro along the direction of travel.

Light is not a mechanical wave; it needs no medium.`,
      [kt('Wave', 'A disturbance that travels through a medium and carries energy without carrying the medium with it.'), kt('Transverse wave', 'A wave in which the particles of the medium vibrate perpendicular to the direction of travel of the wave.'), kt('Longitudinal wave', 'A wave in which the particles of the medium vibrate parallel to the direction of travel of the wave.')],
      [],
      svgV(TRANSVERSE, 'A transverse wave with a crest, a trough, the amplitude and the wavelength marked'),
      [1],
      [svgV(LONGITUDINAL, 'A longitudinal wave drawn as rows of particles with compressions C and rarefactions R')],
    ),
    sec(
      '2. Sound needs a medium; speed of sound',
      `Sound is produced by a **vibrating body** and needs a **material medium** to travel. In the **bell-jar experiment** an electric bell rings inside a sealed jar. As the air is pumped out, the sound grows fainter and fainter, although the hammer can still be seen striking; in a good vacuum it can hardly be heard. When air is let back, the sound returns. So sound **cannot travel through a vacuum** (this is why astronauts on the Moon talk by radio).

Sound travels in solids, liquids and gases. Its speed is **greatest in solids, less in liquids and least in gases**, because the particles of a solid respond to a push most quickly. Typical values used in this chapter: air about ${K.V_AIR} m s⁻¹ (room temperature), water about ${K.V_WATER} m s⁻¹, iron about ${K.V_IRON} m s⁻¹. Books quote slightly different values (air 330 to 344 m s⁻¹); a question always states the value to use.

**Factors that change the speed of sound in air**
- **Temperature:** the speed **increases** as the air gets hotter (about 0.6 m s⁻¹ for every degree Celsius, an approximate rule).
- **Humidity:** the speed is **greater in moist air** than in dry air at the same temperature, because water vapour makes air less dense.
- **Nature of the medium:** different media, different speeds.

The speed does **not** depend on the loudness, the frequency or the pitch of the sound, and (at constant temperature) not on the air pressure. Wind carrying the air along changes the time taken to reach a listener, not the speed of sound relative to the air.`,
      [kt('Medium', 'The material through which a wave travels.'), kt('Vacuum', 'Space with no matter in it; sound cannot pass through it.')],
      [],
      svgV(BELL_JAR, 'An electric bell inside a sealed bell jar joined to a vacuum pump'),
      [2],
      [svgV(SPEED_BARS, 'Bar chart of the speed of sound in air, water and iron')],
    ),
    sec(
      '3. Frequency, wavelength, time period and speed',
      `For a wave:
- **Amplitude** is the maximum displacement of a particle from its rest position.
- **Wavelength** λ is the distance between two consecutive crests (or troughs, compressions or rarefactions). SI unit: metre.
- **Frequency** f is the number of complete vibrations (or waves passing a point) per second. SI unit: **hertz** (Hz).
- **Time period** T is the time for one complete vibration: **T = 1 ÷ f**, in seconds.

In one time period the wave moves forward by one wavelength, so **speed = wavelength ÷ time period**, that is

**v = f × λ**

The frequency is fixed by the **source**. When a sound passes from one medium to another its frequency stays the same, while its speed and wavelength change (for a ${K.BOAT.f} Hz sound the wavelength is ${K.BOAT_AIR} m in air and ${K.BOAT_WATER} m in water).

*Worked case:* a slinky wave has ${K.SLINKY.spacings} wavelengths in ${K.SLINKY.span} m, so λ = ${K.SLINKY_L} m; with f = ${K.SLINKY.f} Hz the speed is ${K.SLINKY.f} × ${K.SLINKY_L} = ${K.SLINKY_V} m s⁻¹.`,
      [kt('Wavelength', 'The distance between two consecutive crests, troughs, compressions or rarefactions of a wave.'), kt('Frequency', 'The number of complete vibrations made by a source (or waves passing a point) in one second; unit hertz.'), kt('Time period', 'The time taken for one complete vibration; T = 1 / f.')],
      [fm(r`v = f \lambda`, 'Wave speed'), fm(r`T = \dfrac{1}{f}`, 'Time period')],
      null,
      [3],
    ),
    sec(
      '4. Sound and light: thunder and lightning',
      `Light travels at about **3 × 10⁸ m s⁻¹**, nearly nine hundred thousand times faster than sound in air (${K.V_AIR} m s⁻¹). In a thunderstorm the flash and the thunder start at the same moment, but we **see** the flash almost at once and **hear** the thunder later.

Distance of the lightning = speed of sound × time gap between seeing the flash and hearing the thunder.

For a gap of ${K.THUNDER.gap} s the lightning is ${K.V_AIR} × ${K.THUNDER.gap} = ${K.THUNDER_D} m away. The light took only about ${K.THUNDER_LIGHT_US} millionths of a second to cover that distance, so its travel time is neglected. The same idea is used to find the distance of a distant firework or a gun fired far away.`,
      [kt('Thunder', 'The sound produced by lightning; it reaches us later than the flash because sound is much slower than light.')],
      [fm(r`d = v \times t`, 'Distance from the time gap')],
      svgV(THUNDER_FIG, 'A lightning flash with light reaching the observer at once and sound arriving later'),
      [4],
    ),
    sec(
      '5. Infrasonic, audible and ultrasonic sound',
      `The human ear detects sounds of frequency from about **20 Hz to 20 000 Hz** (20 kHz): this is the **audible range**. The upper limit falls with age.

- **Infrasonic** sound has frequency **below 20 Hz**. Sources: earthquakes, elephants, whales. Humans cannot hear it, but some animals can and may sense a coming earthquake.
- **Ultrasonic** sound has frequency **above 20 000 Hz**. Sources: bats, dolphins, dog whistles, electronic devices.

**Uses of ultrasound:** ultrasonography (images of the unborn baby and organs), cleaning of delicate parts and jewellery, finding cracks and flaws in metal parts, and measuring depth under water. Bats use it to find insects in the dark. Ultrasound is preferred in medicine because it is non-ionising and gentle on tissue.

**Do not confuse the words.** *Ultrasonic* and *infrasonic* describe the **frequency** of a sound. *Supersonic* describes a **speed greater than the speed of sound** (a fighter jet), and *subsonic* describes a speed **less than** the speed of sound (a cyclist, a passenger plane). A supersonic aircraft does not have to make ultrasonic sound.`,
      [kt('Audible range', 'The frequencies from about 20 Hz to 20 000 Hz that a human ear can hear.'), kt('Ultrasonic', 'Describes sound of frequency above 20 000 Hz.'), kt('Supersonic', 'Describes a speed greater than the speed of sound in the medium.')],
      [],
      svgV(FREQ_SCALE, 'Frequency scale showing infrasonic, audible and ultrasonic bands'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying "sound is a transverse wave" or that the particles travel with the wave; they only vibrate about their positions.
- Mixing up the two terms: *ultrasonic* is about frequency and *supersonic* is about speed (the same for *infrasonic* and *subsonic*).
- Giving the speed of sound in air without a value or unit; always state the value taken (for example 340 m s⁻¹).
- Writing v = f λ with λ in centimetres and getting the speed in the wrong unit.
- Forgetting that the frequency does not change when sound goes from one medium into another.
- In a thunder question, using the speed of light for the delay or forgetting to multiply the time gap by the speed of sound.
- Saying "sound travels faster in dry air" or "faster at night"; warm, moist air carries sound faster.

**How marks are usually awarded**
- 1 mark: a definition, a unit, a range or a one-line reason.
- 2 marks: a numerical with formula, substitution and unit, or two short points.
- 3 marks: a short description (the bell-jar experiment) or a two-step calculation.
- 10-mark structured question: a situation with parts: classify waves or sounds, read a wave diagram or graph, use v = f λ and T = 1/f, a thunder or two-medium calculation, and one reason or application.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What does a wave transfer from place to place?', 'Energy (the disturbance), not the particles of the medium.', 'definition', 1),
    fc(2, 'Define a transverse wave.', 'Particles vibrate at right angles to the direction of travel of the wave; it has crests and troughs.', 'definition', 1),
    fc(3, 'Define a longitudinal wave.', 'Particles vibrate along the direction of travel; it has compressions and rarefactions.', 'definition', 1),
    fc(4, 'Give an example of each kind of wave.', 'Transverse: a wave on a rope. Longitudinal: sound in air, a pushed and pulled slinky.', 'example', 1),
    fc(5, 'What is a compression?', 'A region where the particles are crowded together and the pressure is high.', 'definition', 1),
    fc(6, 'What is a rarefaction?', 'A region where the particles are spread apart and the pressure is low.', 'definition', 1),
    fc(7, 'Why is sound in air a longitudinal wave?', 'Air particles vibrate to and fro along the direction in which the sound travels.', 'concept', 1),
    fc(8, 'Which is a mechanical wave: sound or light?', 'Sound. Light needs no medium.', 'concept', 1),
    fc(9, 'What does the bell-jar experiment show?', 'Sound cannot travel through a vacuum; it needs a medium.', 'concept', 2),
    fc(10, 'Order of the speed of sound in solids, liquids and gases?', 'Solids > liquids > gases.', 'fact', 2),
    fc(11, 'Speed of sound in air used in this chapter?', '340 m s⁻¹ (books use 330 to 344 m s⁻¹).', 'fact', 2),
    fc(12, 'How does temperature affect the speed of sound in air?', 'It increases as the air gets hotter.', 'concept', 2),
    fc(13, 'How does humidity affect the speed of sound in air?', 'Moist air carries sound faster than dry air.', 'concept', 2),
    fc(14, 'Does loudness change the speed of sound?', 'No. Speed depends on the medium and its temperature, not on loudness or frequency.', 'concept', 2),
    fc(15, 'Why can astronauts on the Moon not talk directly?', 'There is no air to carry sound, so they use radio.', 'example', 2),
    fc(16, 'Define wavelength.', 'The distance between two consecutive crests, troughs, compressions or rarefactions.', 'definition', 3),
    fc(17, 'Define frequency and give its unit.', 'Number of vibrations per second; hertz (Hz).', 'definition', 3),
    fc(18, 'Time period in terms of frequency?', 'T = 1 ÷ f, in seconds.', 'formula', 3),
    fc(19, 'The wave equation?', 'v = f × λ.', 'formula', 3),
    fc(20, 'What stays the same when sound enters water from air?', 'The frequency (it is set by the source).', 'concept', 3),
    fc(21, 'Define amplitude.', 'The maximum displacement of a particle from its rest position.', 'definition', 3),
    fc(22, 'Speed of light compared with speed of sound?', 'About 3 × 10⁸ m s⁻¹, nearly nine hundred thousand times faster.', 'fact', 4),
    fc(23, 'Why is lightning seen before thunder is heard?', 'Light is far faster than sound, though both start together.', 'concept', 4),
    fc(24, 'How is the distance of lightning found?', 'Speed of sound × time gap between flash and thunder.', 'formula', 4),
    fc(25, 'Audible range of a human ear?', 'About 20 Hz to 20 000 Hz.', 'fact', 5),
    fc(26, 'Define infrasonic sound.', 'Sound of frequency below 20 Hz, for example from earthquakes and elephants.', 'definition', 5),
    fc(27, 'Define ultrasonic sound.', 'Sound of frequency above 20 000 Hz, for example from bats and dog whistles.', 'definition', 5),
    fc(28, 'Name two uses of ultrasound.', 'Medical imaging (ultrasonography), cleaning delicate parts, flaw detection in metals.', 'example', 5),
    fc(29, 'Ultrasonic or supersonic: which describes speed?', 'Supersonic: a speed greater than the speed of sound.', 'concept', 5),
    fc(30, 'Infrasonic or subsonic: which describes frequency?', 'Infrasonic: frequency below 20 Hz. Subsonic: speed below that of sound.', 'concept', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
