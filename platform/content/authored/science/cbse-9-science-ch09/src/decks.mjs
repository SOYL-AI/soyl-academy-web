// ch09 Sound — two decks: Part 1 (t01–t02) production, propagation, wave terms, v = f λ and the speed of sound;
// Part 2 (t03–t04) pitch, loudness, audible range, ultrasound, echo, sonar, echolocation and C. V. Raman's work on Indian drums.
import { sl, deck, table, flow, svgV, r, near, dec } from './lib.mjs';
import { WAVE_BANDS, PITCH_LOUD, AUDIBLE, SONAR } from './svgs.mjs';

const must = (ok, msg) => {
  if (!ok) throw new Error(`deck check failed: ${msg}`);
};
// One consistent set of approximate speeds (m/s): air 344 (about 22 °C), sea water 1500, steel 5000.
const vAir = 344;
const vWater = 1500;
const vSteel = 5000;

const e1 = (() => {
  const f = 2000;
  return { f, lam: vAir / f, T: 1 / f };
})();
must(near(e1.lam, 0.172, 1e-9) && near(e1.T, 5e-4, 1e-9), 'e1');
const e2 = (() => {
  const L = 100;
  const tS = L / vSteel;
  const tA = L / vAir;
  return { L, tS, tA, diff: tA - tS };
})();
must(near(e2.tS, 0.02, 1e-9) && near(e2.tA, 0.2907, 0.001) && near(e2.diff, 0.2707, 0.001), 'e2');
const e3 = (() => {
  const t = 4.5;
  return { t, d: vAir * t };
})();
must(near(e3.d, 1548, 1e-9), 'e3');
const e4 = (() => {
  const dMin = (vAir * 0.1) / 2;
  const t = 0.8;
  return { dMin, t, d: (vAir * t) / 2 };
})();
must(near(e4.dMin, 17.2, 1e-9) && near(e4.d, 137.6, 1e-9), 'e4');
const e5 = (() => {
  const t = 1.2;
  return { t, d: (vWater * t) / 2 };
})();
must(near(e5.d, 900, 1e-9), 'e5');
const e6 = (() => {
  const f = 50000;
  return { f, lam: vAir / f, mm: (vAir / f) * 1000 };
})();
must(near(e6.lam, 0.00688, 1e-9) && near(e6.mm, 6.88, 1e-9), 'e6');

export const V = {
  wave: svgV(WAVE_BANDS, 'A sound wave in air as bands of compressions and rarefactions above the matching pressure graph, with the wavelength and amplitude marked', 'Compressions are high-pressure bands; rarefactions are low-pressure bands.'),
  pitch: svgV(PITCH_LOUD, 'Four waves: a low pitch and a high pitch wave of the same amplitude, and a soft and a loud wave of the same frequency', 'Pitch depends on frequency; loudness depends on amplitude.'),
  range: svgV(AUDIBLE, 'A scale of frequencies showing infrasound below 20 hertz, the audible range from about 20 hertz to 20 kilohertz and ultrasound above it, with examples', 'The audible range is about 20 Hz to 20 kHz.'),
  sonar: svgV(SONAR, 'Sonar on a boat: an ultrasound pulse goes to the sea bed and the echo returns after 1.2 seconds, giving a depth of 900 metres', 'Depth = (speed × time) ÷ 2.'),
};

export const deck1 = deck({
  part: 1,
  title: 'Sound — Part 1: Production, propagation and the speed of sound',
  goals: [
    'Explain that sound is produced by vibrations and needs a medium to travel',
    'Describe a sound wave as a longitudinal wave of compressions and rarefactions',
    'Define frequency, time period, amplitude and wavelength, and derive v = fλ',
    'Compare the speed of sound in solids, liquids and gases',
  ],
  slides: [
    sl('title', 'Sound', {
      b: 'Part 1: how sound is made, how it travels, and how fast it goes.',
      v: table(['Source of sound', 'What vibrates'], [['A tabla being struck', 'the stretched skin of the drum'], ['A veena string being plucked', 'the string'], ['Our voice', 'the vocal cords in the throat'], ['A temple bell', 'the metal of the bell'], ['A flute', 'the column of air inside the pipe']], 'Table of five sources of sound and what vibrates in each'),
      n: 'Every sound that you hear comes from something that is vibrating. A drum, a string, a bell, even your own throat. In this part we find out how a vibration becomes a sound that reaches your ear, why sound needs a medium such as air to travel, and how to measure the speed and wavelength of sound.',
    }),
    sl('concept', 'Sound is produced by vibration', {
      b: r`A **vibration** is a rapid to-and-fro motion about a mean position. **Sound is produced by vibrating bodies.** When a tuning fork is struck and its prong touches a ball of thread, the ball is pushed away: this shows that the prong is vibrating. A vibrating body pushes and pulls on the air around it, and this disturbance spreads out as a **sound wave**. When the vibration stops, the sound stops.`,
      v: table(['Observation', 'What it shows'], [['A struck tuning fork makes a hanging thread ball jump', 'the fork is vibrating'], ['Fingers on your throat feel a buzz when you speak', 'the vocal cords vibrate'], ['A hand on a drum stops the sound', 'no vibration, no sound'], ['Rice grains jump on a drum skin when the drum is struck', 'the skin is vibrating']], 'Table of four simple observations that show sound is produced by vibration'),
      n: 'Sound is produced by vibration. A vibration is a quick to and fro motion about a fixed position. Strike a tuning fork and touch a hanging thread ball with it, and the ball jumps away. Touch your throat while you speak and you feel the buzz. Put your hand on a ringing drum, and the sound stops. When the vibration stops, the sound stops too.',
    }),
    sl('concept', 'Sound needs a medium', {
      b: r`Sound travels through a **medium**: a solid, a liquid or a gas. It **cannot** travel through a **vacuum**. In the bell jar experiment an electric bell hangs inside a sealed glass jar. As a vacuum pump removes the air, the sound of the bell grows fainter, although the hammer still strikes the gong. When air is let back, the sound grows loud again. This is why astronauts on the Moon, where there is no air, speak through radios.`,
      v: flow('LR', [['a', 'Bell rings inside a sealed jar full of air: sound is loud'], ['b', 'Pump removes the air: sound grows fainter'], ['c', 'Almost no air left: hardly any sound, but the hammer still moves'], ['d', 'Air is let in again: sound becomes loud once more']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow showing the bell jar experiment: the sound fades as the air is removed and returns when air is let back'),
      n: 'Sound needs a medium to travel. In the bell jar experiment, an electric bell rings inside a sealed glass jar. As the pump removes the air, the sound grows fainter, even though we can still see the hammer hitting the gong. When air is let back in, the sound returns. So sound cannot travel through empty space, a vacuum. This is why astronauts on the Moon need radios to talk.',
    }),
    sl('diagram', 'Sound travels as a longitudinal wave', {
      b: r`As a vibrating body moves forward it **pushes** the air particles together, making a **compression** (C): a region of high pressure. As it moves back it leaves a region where the particles are spread out, a **rarefaction** (R): a region of low pressure. These regions move away from the source, but the air particles only vibrate **to and fro** about their places along the direction of travel of the wave. The distance between two successive compressions is the **wavelength** $\lambda$.`,
      v: V.wave,
      n: 'Look at the picture. The vertical lines stand for air particles. Where they crowd together we have a compression, with high pressure. Where they are spread out we have a rarefaction, with low pressure. These bands travel outward from the source. The air itself does not travel with the wave. Each particle only moves a little to and fro. The graph below shows the pressure rising at each compression and falling at each rarefaction.',
    }),
    sl('concept', 'Longitudinal and transverse waves', {
      b: r`In a **longitudinal wave** the particles of the medium vibrate **parallel** to the direction in which the wave travels. Sound in air is a longitudinal wave. In a **transverse wave**, such as a wave on a rope shaken up and down, the particles vibrate **at right angles** to the direction of travel. A longitudinal wave moves as compressions and rarefactions; a transverse wave moves as crests and troughs.`,
      v: table(['Feature', 'Longitudinal wave', 'Transverse wave'], [['Particles vibrate', 'along the direction of travel', 'at right angles to the direction of travel'], ['Wave pattern', 'compressions and rarefactions', 'crests and troughs'], ['Example', 'sound in air, a slinky pushed and pulled', 'a wave on a shaken rope']], 'Table comparing longitudinal and transverse waves'),
      n: 'There are two kinds of wave. In a longitudinal wave, the particles of the medium vibrate along the direction in which the wave moves. Sound in air is longitudinal, and it travels as compressions and rarefactions. In a transverse wave, the particles vibrate at right angles to the direction of travel, like a rope shaken up and down, and the pattern has crests and troughs.',
    }),
    sl('check', 'Quick check: a medium for sound', {
      b: 'Decide which place has no sound transmission.',
      n: 'Quick check. Think about what sound needs to travel from a source to a listener, and answer.',
      chk: 'chk-medium',
    }),
    sl('concept', 'Frequency, time period, amplitude and wavelength', {
      b: r`The **frequency** $f$ is the number of vibrations (or complete waves) per second; its unit is the **hertz** (Hz). The **time period** $T$ is the time for one complete vibration, in seconds, and $T = 1/f$. The **amplitude** $A$ is the maximum displacement of a vibrating particle from its mean position (on the pressure graph, the height of the wave above the normal level). The **wavelength** $\lambda$ is the distance between two successive compressions or two successive rarefactions, in metres.`,
      v: table(['Quantity', 'Symbol', 'SI unit', 'Meaning'], [['Frequency', 'f', 'hertz (Hz)', 'vibrations per second'], ['Time period', 'T', 'second (s)', 'time for one vibration; T = 1 ÷ f'], ['Amplitude', 'A', 'metre (m)', 'largest displacement from the mean position'], ['Wavelength', 'λ', 'metre (m)', 'distance between two successive compressions']], 'Table of frequency, time period, amplitude and wavelength with their symbols, units and meanings'),
      n: 'Four quantities describe a wave. The frequency is the number of vibrations in one second, measured in hertz. The time period is the time for one vibration, and it is one divided by the frequency. The amplitude is the largest displacement from the mean position. The wavelength is the distance between two successive compressions, or two successive rarefactions, measured in metres.',
    }),
    sl('concept', 'The relation v = f λ', {
      b: r`In **one time period** $T$ the wave moves forward by **one wavelength** $\lambda$. So the speed of the wave is
$$v = \dfrac{\lambda}{T} = \lambda \times \dfrac{1}{T} = f\lambda$$
**Speed = frequency × wavelength.** In a given medium the speed of sound is fixed, so a sound of higher frequency has a **shorter** wavelength.`,
      v: flow('LR', [['a', 'In one period T the wave moves one wavelength λ'], ['b', 'Speed = distance ÷ time = λ ÷ T'], ['c', 'Frequency f = 1 ÷ T'], ['d', 'So v = f λ']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow showing how the speed of a wave equals wavelength divided by time period, which equals frequency times wavelength'),
      n: 'Here is how to derive the relation between speed, frequency and wavelength. In one time period the wave moves forward by exactly one wavelength. Speed is distance divided by time, so the speed is the wavelength divided by the time period. But one over the time period is the frequency. So the speed equals the frequency times the wavelength.',
    }),
    sl('example', 'Worked example: wavelength of a whistle', {
      b: r`**Problem.** The whistle of a pressure cooker has a frequency of ${e1.f} Hz. Taking the speed of sound in air as ${vAir} m s⁻¹, find its wavelength and time period.

**Step 1.** $\lambda = v/f = ${vAir} / ${e1.f} = ${dec(e1.lam, 3)}$ m.

**Step 2.** $T = 1/f = 1 / ${e1.f} = ${dec(e1.T, 2)}$ s, that is 0.5 millisecond.

**Check.** $f\lambda = ${e1.f} \times ${dec(e1.lam, 3)} = ${vAir}$ m s⁻¹.`,
      v: table(['Quantity', 'Working', 'Value'], [['Wavelength', 'v ÷ f', `${dec(e1.lam, 3)} m`], ['Time period', '1 ÷ f', `${dec(e1.T, 2)} s`]], 'Table of the wavelength and time period of a 2000 hertz whistle'),
      n: 'The whistle has a frequency of two thousand hertz, and sound in air travels at about three hundred forty-four metres per second. The wavelength is the speed divided by the frequency, which is seventeen point two centimetres, or point one seven two metres. The time period is one divided by the frequency, which is half a millisecond. Multiplying frequency by wavelength gives back the speed.',
    }),
    sl('check', 'Quick check: using v = fλ', {
      b: 'Use speed, frequency and wavelength together.',
      n: 'Quick check. Use the relation speed equals frequency times wavelength, and answer.',
      chk: 'chk-vf',
    }),
    sl('concept', 'Speed of sound in solids, liquids and gases', {
      b: r`Sound travels fastest in **solids**, slower in **liquids** and slowest in **gases**, because the particles of a solid are packed close together and pass the vibration on quickly. The values below are approximate. The speed in a gas also **increases with temperature**: in air it is about ${vAir} m s⁻¹ at about 22 °C and a little less on a cold day.`,
      v: table(['Medium', 'State', 'Speed of sound (approximate)'], [['Air', 'gas', `about ${vAir} m s⁻¹`], ['Sea water', 'liquid', `about ${vWater} m s⁻¹`], ['Steel', 'solid', `about ${vSteel} m s⁻¹`]], 'Table of the approximate speed of sound in air, sea water and steel'),
      n: 'Sound travels fastest in solids, more slowly in liquids and slowest in gases. In air at room temperature it travels at about three hundred forty-four metres per second. In sea water the speed is about fifteen hundred metres per second, and in steel about five thousand. These are approximate values. In a gas the speed also rises as the temperature rises.',
    }),
    sl('example', 'Worked example: sound through steel and air', {
      b: r`**Problem.** A student strikes one end of a ${e2.L} m steel pipe with a hammer. Her friend at the other end hears two sounds, one through the steel and one through the air. Find the time taken by each, taking ${vSteel} m s⁻¹ in steel and ${vAir} m s⁻¹ in air.

**Step 1.** Through steel: $t = d/v = ${e2.L} / ${vSteel} = ${dec(e2.tS, 2)}$ s.

**Step 2.** Through air: $t = ${e2.L} / ${vAir} = ${dec(e2.tA, 2)}$ s.

**Step 3.** The two sounds are about ${dec(e2.diff, 2)} s apart, long enough to hear separately. The sound through the steel arrives first.`,
      v: table(['Path', 'Speed (m/s)', 'Time (s)'], [['Steel pipe', `${vSteel}`, dec(e2.tS, 2)], ['Air', `${vAir}`, dec(e2.tA, 2)]], 'Table of the time taken by sound to travel 100 metres through steel and through air'),
      n: 'The time taken is the distance divided by the speed. Through the steel pipe, one hundred metres at five thousand metres per second takes only two hundredths of a second. Through the air it takes about twenty-nine hundredths of a second. So the friend hears the sound through the steel first, and the sound through the air a little later, about a quarter of a second after.',
    }),
    sl('example', 'Worked example: how far is the lightning?', {
      b: r`**Problem.** A flash of lightning is seen, and the thunder is heard ${e3.t.toFixed(1)} s later. How far away did the lightning strike? Take the speed of sound as ${vAir} m s⁻¹ and treat the light as arriving at once.

**Step 1.** Distance $= vt = ${vAir} \times ${e3.t.toFixed(1)} = ${e3.d}$ m.

**Step 2.** That is about 1.5 km.`,
      v: table(['Time gap (s)', 'Distance of lightning (m)'], [['1.0', dec(vAir * 1.0, 3)], ['3.0', dec(vAir * 3.0, 4)], [e3.t.toFixed(1), `${e3.d}`]], 'Table of the distance of lightning for time gaps of 1.0, 3.0 and 4.5 seconds'),
      n: 'Light is so fast that we see the flash almost at once, but sound takes time to arrive. The gap between the flash and the thunder tells us the distance. Four and a half seconds at three hundred forty-four metres per second is about fifteen hundred metres. So the lightning struck roughly one and a half kilometres away.',
    }),
    sl('check', 'Quick check: speed in different media', {
      b: 'Compare the speed of sound in three media.',
      n: 'Quick check. Remember which state of matter carries sound fastest, and answer.',
      chk: 'chk-speed',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Sound is produced by vibrating bodies and needs a medium; it cannot travel through a vacuum (bell jar experiment).',
        'Sound in air is a longitudinal wave of compressions (high pressure) and rarefactions (low pressure).',
        r`Frequency $f$ (Hz), time period $T = 1/f$ (s), amplitude $A$ (m), wavelength $\lambda$ (m).`,
        r`Speed $v = f\lambda$; in one period the wave moves one wavelength.`,
        'Sound is fastest in solids, slower in liquids and slowest in gases (approximate values: air 344, sea water 1500, steel 5000 m s⁻¹); it rises with temperature.',
      ],
      v: table(['Idea', 'Key fact'], [['Production', 'vibration'], ['Medium', 'solid, liquid or gas, not a vacuum'], ['Wave type', 'longitudinal'], ['Speed', 'v = f λ']], 'Table summarising production, medium, wave type and speed of sound'),
      n: 'To sum up. Sound is produced by vibrating bodies and needs a medium to travel. In air it is a longitudinal wave of compressions and rarefactions. The frequency, time period, amplitude and wavelength describe the wave, and the speed equals frequency times wavelength. Sound is fastest in solids, slower in liquids, and slowest in gases, and it speeds up as the temperature rises.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Write that sound is a longitudinal wave and name compressions and rarefactions in any diagram.',
        'Always say that sound cannot travel in a vacuum because it needs a medium.',
        'Write v = fλ first; convert kHz to Hz and cm to m before substituting.',
        'For the speed in different media, quote values with the word "about" and name the state: solid > liquid > gas.',
        'Give the unit of every answer: Hz, s, m, m s⁻¹.',
      ],
      n: 'Some exam tips. Always say that sound is a longitudinal wave, and mark compressions and rarefactions in diagrams. State that sound cannot travel in a vacuum, because it needs a medium. Write the relation speed equals frequency times wavelength first, and change kilohertz to hertz before substituting. Quote speeds with the word about, and give the unit of every answer.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Sound — Part 2: Hearing, ultrasound, echoes and Indian drums',
  goals: [
    'Explain pitch, loudness and quality, and the audible range of human hearing',
    'Describe infrasound and ultrasound with uses',
    'Apply reflection of sound to echo, sonar and echolocation',
    "State C. V. Raman's work on the overtones of Indian drums",
  ],
  slides: [
    sl('title', 'How we hear, and how sound bounces', {
      b: 'Part 2: what makes a sound shrill or loud, the sounds we cannot hear, echoes, sonar and the music of Indian drums.',
      v: table(['Characteristic', 'Depends on', 'We sense it as'], [['Pitch', 'frequency', 'shrill or deep'], ['Loudness', 'amplitude', 'loud or soft'], ['Quality', 'the mixture of frequencies (waveform)', 'which instrument or voice']], 'Table of the three characteristics of a sound, what each depends on and how we sense it'),
      n: 'In this part we learn why a whistle sounds shrill and a drum sounds deep, why some sounds are loud and some soft, and how we can tell a flute from a violin. We study sounds that our ears cannot hear. Then we see how sound bounces from surfaces to make echoes, how bats and ships use echoes, and what C V Raman found about Indian drums.',
    }),
    sl('concept', 'Pitch, loudness and quality', {
      b: r`**Pitch** is how shrill or deep a sound seems. It depends on the **frequency**: a higher frequency gives a higher pitch. **Loudness** depends on the **amplitude**: a bigger amplitude (a harder strike, a bigger push of air) gives a louder sound. It is measured in **decibels** (dB). **Quality** (timbre) is what lets us tell two sounds of the same pitch and loudness apart, such as a flute and a violin. It depends on the **mixture of frequencies** the source produces: a main note and extra higher notes called **overtones**.`,
      v: table(['Characteristic', 'Depends on', 'Example'], [['Pitch', 'frequency', 'a thin veena string gives a higher note than a thick one'], ['Loudness', 'amplitude', 'a harder strike on a drum gives a louder sound'], ['Quality', 'overtones present', 'a harmonium and a flute playing the same note sound different']], 'Table of pitch, loudness and quality, what each depends on and an example'),
      n: 'Pitch tells us whether a sound is shrill or deep. It depends on the frequency. A higher frequency means a higher pitch. Loudness depends on the amplitude, so a harder strike makes a louder sound. Quality lets us tell a flute from a violin even when both play the same note equally loudly. It depends on the mixture of higher notes, called overtones, that an instrument produces along with its main note.',
    }),
    sl('diagram', 'Pitch and loudness on a graph', {
      b: r`Each box shows the same length of time. **Top:** the right wave has **twice as many vibrations** in the box, so it has twice the **frequency** and a **higher pitch**; the amplitude is the same, so the loudness is the same. **Bottom:** both waves have the same frequency and pitch, but the right wave has **twice the amplitude**, so it sounds **louder**.`,
      v: V.pitch,
      n: 'In the top row both waves have the same height, which is the amplitude, but the right one has twice as many vibrations in the same time, so it has double the frequency and a higher pitch. In the bottom row both waves have the same number of vibrations, so they have the same pitch. But the right wave is taller. It has a larger amplitude, so it sounds louder.',
    }),
    sl('diagram', 'The audible range, infrasound and ultrasound', {
      b: r`The normal human ear can hear frequencies from about **20 Hz to 20 000 Hz (20 kHz)**. Sound below 20 Hz is **infrasound**; sound above 20 kHz is **ultrasound**. We cannot hear either, but some animals can: an elephant makes very low rumbles, and a dog or a bat can hear and make ultrasound. The scale on the picture goes up by a factor of ten at each tick. Values for animals are approximate. Children hear a little higher than older people, whose upper limit falls with age.`,
      v: V.range,
      n: 'The human ear can hear sounds from about twenty hertz to twenty thousand hertz. A sound below twenty hertz is called infrasound, and a sound above twenty kilohertz is called ultrasound. We cannot hear either. Elephants use very low rumbles, while dogs and bats can hear and make ultrasound. Notice that the scale on the picture goes up by a factor of ten at each step.',
    }),
    sl('concept', 'Uses of ultrasound and infrasound', {
      b: r`**Ultrasound** has a very short wavelength, so it travels in narrow beams and reflects from small objects. Uses: **sonar** (finding the depth of the sea and shoals of fish), **medical scans** (pictures of the womb or the liver, and echo tests of the heart), **cleaning** delicate parts (watches, jewellery) in a bath of vibrating liquid, and **finding cracks** inside metal blocks. **Infrasound** is used by large animals such as elephants and whales to communicate over long distances.`,
      v: table(['Use', 'Type of sound', 'How it works'], [['Sonar', 'ultrasound', 'time for the echo from the sea bed or a shoal'], ['Medical scan', 'ultrasound', 'echoes from the boundaries between organs make an image'], ['Cleaning delicate parts', 'ultrasound', 'tiny vibrations in the liquid shake dirt loose'], ['Elephants calling', 'infrasound', 'very low rumbles carry over long distances']], 'Table of four uses of ultrasound and infrasound and how each works'),
      n: 'Ultrasound has a very short wavelength, so it can travel in narrow beams and reflect from small objects. Sonar uses it to find the depth of the sea. Doctors use it to make pictures of organs and an unborn baby. It can clean watch parts and find cracks inside metal. Infrasound is used by elephants and whales, whose very low calls travel over long distances.',
    }),
    sl('check', 'Quick check: the audible range', {
      b: 'Decide whether a sound can be heard by humans.',
      n: 'Quick check. Compare the frequency with the range of human hearing, and answer.',
      chk: 'chk-range',
    }),
    sl('concept', 'Reflection of sound and echo', {
      b: r`Sound is **reflected** from a hard, flat surface such as a wall, a cliff or a stone building, just as light is reflected by a mirror. The angle of incidence equals the angle of reflection. A reflected sound that we hear again is an **echo**. The sensation of a sound stays in the ear for about **0.1 s**, so to hear the echo **separately** it must reach the ear at least 0.1 s after the original. In that time the sound goes to the wall and back, so the minimum distance is $d = \dfrac{vt}{2} = \dfrac{${vAir} \times 0.1}{2} = ${dec(e4.dMin, 3)}\ \text{m}$, about **17 m** in air.`,
      v: table(['Condition for a clear echo', 'Reason'], [['A large, hard, smooth reflecting surface at least about 17 m away', 'reflected sound returns at least 0.1 s later'], ['A sound loud enough to be heard after reflection', 'some energy is lost on the way'], ['No soft surfaces such as curtains or cloth', 'soft materials absorb sound instead of reflecting it']], 'Table of the conditions for hearing a clear echo and the reason for each'),
      n: 'Sound bounces back from a hard flat surface such as a wall or a cliff. A sound that we hear again after it bounces is called an echo. The ear holds on to a sound for about one tenth of a second, so the echo must come back at least one tenth of a second later to be heard separately. In that time sound travels there and back, so the wall must be at least about seventeen metres away.',
    }),
    sl('diagram', 'Sonar: measuring depth with echoes', {
      b: r`**Sonar** (sound navigation and ranging) uses ultrasound. A device on a boat sends out a short pulse, and the pulse is reflected from the sea bed. If the echo takes time $t$, the sound has travelled to the bottom **and back**, a distance $2d$. So $2d = vt$ and the depth is
$$d = \dfrac{vt}{2}$$
Here $d = \dfrac{${vWater} \times ${e5.t.toFixed(1)}}{2} = ${e5.d}$ m. Sonar also finds shoals of fish and sunken objects.`,
      v: V.sonar,
      n: 'Sonar sends a pulse of ultrasound down from a boat. The pulse hits the sea bed and the echo returns. In the picture the echo takes one point two seconds. The sound has gone down and come back up, so the total distance is the speed multiplied by the time, which is eighteen hundred metres. The depth is half of this, nine hundred metres.',
    }),
    sl('example', 'Worked example: echo distances', {
      b: r`**Problem.** (a) Show that the least distance of a wall for a distinct echo is about 17 m. (b) A tourist claps near an old fort wall and hears the echo ${e4.t.toFixed(2)} s later. How far is the wall? Take ${vAir} m s⁻¹.

**(a)** Minimum time $= 0.1$ s, so the sound travels $${vAir} \times 0.1 = ${dec(vAir * 0.1, 3)}$ m there and back. The wall is half of this: $${dec(e4.dMin, 3)}$ m, about 17 m.

**(b)** Distance there and back $= ${vAir} \times ${e4.t.toFixed(2)} = ${dec(vAir * e4.t, 4)}$ m. Distance of the wall $= ${dec(vAir * e4.t, 4)} / 2 = ${dec(e4.d, 4)}$ m, about 138 m.`,
      v: table(['Case', 'Time (s)', 'Distance there and back (m)', 'Distance of wall (m)'], [['Minimum for an echo', '0.1', dec(vAir * 0.1, 3), dec(e4.dMin, 3)], ['Fort wall', e4.t.toFixed(2), dec(vAir * e4.t, 4), dec(e4.d, 4)]], 'Table of the minimum echo distance and the distance of a fort wall from the echo time'),
      n: 'For a distinct echo the sound must return after at least one tenth of a second. In that time it travels about thirty-four metres, which is there and back, so the wall must be at least about seventeen metres away. For the fort wall, the echo comes after eight tenths of a second. That is two hundred seventy-five metres there and back, so the wall is about one hundred thirty-eight metres away.',
    }),
    sl('check', 'Quick check: echoes', {
      b: 'Decide whether an echo can be heard.',
      n: 'Quick check. Remember that an echo must come back at least one tenth of a second later, and answer.',
      chk: 'chk-echo',
    }),
    sl('concept', 'Echolocation and reverberation', {
      b: r`**Echolocation:** bats and dolphins find their way and their prey by sending out ultrasound and listening to the echo. A bat gives out a series of very high-pitched squeaks; the echo from a moth tells it how far away the moth is and in which direction, so a bat can fly in the dark without hitting a wall. Dolphins send clicks in the water in the same way. **Reverberation:** in a large hall the sound is reflected again and again from the walls and ceiling, so it lingers and words blur. To reduce it, auditoriums use curtains, carpets, cushioned seats and perforated boards on the walls, which absorb sound.`,
      v: table(['Idea', 'Who or what uses it', 'How it helps'], [['Echolocation', 'bats, dolphins', 'find prey and obstacles using ultrasound echoes'], ['Sonar', 'ships, fishing boats', 'measure depth, find shoals and wrecks'], ['Reverberation control', 'cinema halls, auditoriums', 'soft absorbers make speech clear']], 'Table of echolocation, sonar and reverberation control with who uses them and how they help'),
      n: 'Bats and dolphins use echolocation. A bat sends out squeaks of ultrasound and listens for the echo from an insect or a wall. The time and direction of the echo tell it where things are, so it can hunt in the dark. Dolphins do the same with clicks in water. In a big hall, repeated reflections cause reverberation, which blurs speech. Curtains, carpets and soft panels absorb the sound and reduce it.',
    }),
    sl('concept', "C. V. Raman and Indian drums", {
      b: r`The Indian physicist **C. V. Raman** studied the sound of Indian musical instruments, especially the **tabla** and the **mridangam**. Most simple drums give overtones that are not related to the main note in a simple way, so they sound like a dull thud. Raman showed that in the tabla and the mridangam the **thick circular patch of special paste on the skin** (the "black spot") makes the overtones **harmonic**: they are whole-number multiples of the lowest frequency, $f$, $2f$, $3f$ and so on. This is why these drums give a clear musical note.`,
      v: table(['Drum', 'What is special', 'What Raman found'], [['Tabla', 'skin with a black patch of paste in the centre', 'overtones are harmonic, so the note is clear'], ['Mridangam', 'skin with a loaded black patch', 'overtones are harmonic, so the note is clear'], ['A plain drum', 'skin with no loading', 'overtones are not harmonic, so it sounds like a thud']], 'Table comparing the tabla, the mridangam and a plain drum and what Raman found about their overtones'),
      n: 'C V Raman, an Indian physicist, studied the sound of Indian drums such as the tabla and the mridangam. Most simple drums give overtones that do not fit neatly with the main note, so they sound like a thud. Raman found that the black circular patch of thick paste on these drums makes the overtones harmonic. They are whole number multiples of the lowest frequency, which is why these drums give a clear note.',
    }),
    sl('example', 'Worked example: wavelength of a bat call', {
      b: r`**Problem.** A bat sends out an ultrasound squeak of frequency ${(e6.f / 1000).toFixed(0)} kHz. Find the wavelength in air (${vAir} m s⁻¹) and the time period.

**Step 1.** $f = ${e6.f}$ Hz, so $\lambda = v/f = ${vAir} / ${e6.f} = ${dec(e6.lam, 3)}$ m $= ${dec(e6.mm, 3)}$ mm.

**Step 2.** $T = 1/f = 1/${e6.f} = 2.0 \times 10^{-5}$ s.

The wavelength is only about 7 mm, so the squeak can reflect from small objects such as a moth. A wave about a metre long would bend around such a small object instead of bouncing back.`,
      v: table(['Sound', 'Frequency (Hz)', 'Wavelength in air (m)'], [['Audible, low note', '344', dec(vAir / 344, 3)], ['Audible, high note', '3440', dec(vAir / 3440, 3)], ['Bat squeak', `${e6.f}`, dec(e6.lam, 3)]], 'Table of the wavelength in air of two audible sounds and a bat squeak'),
      n: 'A bat squeak has a frequency of fifty kilohertz, which is fifty thousand hertz. The wavelength is the speed divided by the frequency, which is about seven millimetres. This short wavelength means the sound can reflect from tiny objects like a moth. A long wave of about a metre would bend around such a small object, instead of bouncing back from it.',
    }),
    sl('check', 'Quick check: ultrasound and bats', {
      b: 'Think about why bats use ultrasound.',
      n: 'Quick check. Remember what bats do with the echoes of their ultrasound squeaks, and answer.',
      chk: 'chk-bat',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Pitch depends on frequency, loudness on amplitude (measured in decibels), and quality on the mixture of overtones.',
        'The audible range is about 20 Hz to 20 kHz; below it is infrasound, above it is ultrasound.',
        'Ultrasound is used in sonar, medical scans, cleaning and finding flaws; elephants and whales use infrasound.',
        r`Echo: the reflected sound must arrive at least 0.1 s later, so the reflector is at least about 17 m away in air. Depth or distance $d = vt/2$.`,
        "Bats and dolphins use echolocation. C. V. Raman showed that the loaded skins of the tabla and mridangam give harmonic overtones. Reverberation is reduced with soft absorbers.",
      ],
      v: table(['Idea', 'Key fact'], [['Audible range', 'about 20 Hz to 20 kHz'], ['Echo condition', 'at least 0.1 s, at least about 17 m'], ['Sonar', 'd = v t ÷ 2'], ['Quality', 'depends on overtones']], 'Table summarising the audible range, the echo condition, sonar and quality of sound'),
      n: 'To sum up. Pitch depends on frequency, loudness on amplitude, and quality on overtones. Humans hear from about twenty hertz to twenty kilohertz. Ultrasound is used in sonar, scans and cleaning. For an echo, the reflector must be at least about seventeen metres away, and the distance is speed times time divided by two. Bats use echolocation, and Raman studied the harmonic overtones of Indian drums.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Link each characteristic to its cause: pitch to frequency, loudness to amplitude, quality to overtones.',
        'Quote the audible range as about 20 Hz to 20 kHz and name infrasound (below) and ultrasound (above).',
        'For echo and sonar, the sound goes there and back: use d = vt/2.',
        'State the 0.1 s condition when you explain why a small room gives no distinct echo.',
        'For Raman, say tabla or mridangam, the loaded skin and the harmonic overtones; do not add dates or other details.',
      ],
      n: 'Some exam tips. Link each characteristic to its cause. Pitch depends on frequency, loudness on amplitude, and quality on overtones. Quote the audible range as about twenty hertz to twenty kilohertz. For echo and sonar problems, remember the sound travels there and back, so divide by two. Mention the one tenth of a second condition for echoes. For Raman, keep to the tabla, the mridangam and harmonic overtones.',
    }),
  ],
});
