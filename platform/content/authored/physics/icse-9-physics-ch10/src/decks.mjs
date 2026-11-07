// ICSE 9 Physics ch10 Sound and Wave Motion — Part 1 (t01–t02: waves, sound needs a medium, speed of sound),
// Part 2 (t03–t05: v = f x wavelength, sound and light, infrasonic, audible and ultrasonic).
import { sl, deck, table, flow, svgV, r } from '../../icse-9-physics-ch01/src/lib.mjs';
import { TRANSVERSE, LONGITUDINAL, BELL_JAR, THUNDER_FIG, FREQ_SCALE, SPEED_BARS, TRANSVERSE_LET } from './svgs.mjs';
import * as K from './calc.mjs';

const fig = {
  tr: svgV(TRANSVERSE, 'A transverse wave with a crest, a trough, the amplitude and the wavelength marked'),
  lo: svgV(LONGITUDINAL, 'A longitudinal wave drawn as rows of particles with compressions and rarefactions marked'),
  bell: svgV(BELL_JAR, 'An electric bell inside a sealed bell jar joined to a vacuum pump'),
  bars: svgV(SPEED_BARS, 'Bar chart of the speed of sound in air, water and iron'),
  thunder: svgV(THUNDER_FIG, 'A lightning flash with light reaching the observer at once and sound arriving later'),
  scale: svgV(FREQ_SCALE, 'Frequency scale showing infrasonic, audible and ultrasonic bands'),
  trLet: svgV(TRANSVERSE_LET, 'A transverse wave with points A to F lettered'),
};

export const deck1 = deck({
  part: 1,
  title: 'Sound and Wave Motion — Part 1: Waves and the speed of sound',
  goals: [
    'Compare transverse and longitudinal waves and explain why sound in air is longitudinal',
    'Describe the experiment that shows sound needs a medium',
    'Compare the speed of sound in solids, liquids and gases and state the factors that affect it',
  ],
  slides: [
    sl('title', 'Waves and sound', {
      b: 'Part 1: a wave carries energy, not matter. We meet the two kinds of mechanical wave, then ask what sound needs in order to travel and how fast it goes.',
      v: flow('LR', [['w', 'Wave motion'], ['t', 'Transverse and longitudinal'], ['m', 'Sound needs a medium'], ['s', 'Speed of sound']], [['w', 't'], ['t', 'm'], ['m', 's']], 'Flow: wave motion, transverse and longitudinal waves, sound needs a medium, speed of sound'),
      n: 'A wave is a way of sending energy from one place to another. This part looks at the two kinds of mechanical wave, at what sound needs to travel, and at how its speed changes from one material to another.',
    }),
    sl('concept', 'What is a wave?', {
      b: 'A **wave** is a disturbance that travels through a medium and carries **energy**. The particles only **vibrate about their positions**; the medium does not move along with the wave. Waves that need a medium are **mechanical waves**.',
      v: table(['Wave', 'Needs a medium?'], [['Wave on a rope', 'yes'], ['Water ripple', 'yes'], ['Sound', 'yes'], ['Light', 'no']], 'Table showing which waves need a medium'),
      n: 'When a stadium crowd does a wave, each person only stands up and sits down, yet the wave runs around the whole stadium. Energy travels, people stay. Sound, rope waves and ripples need a medium. Light does not.',
    }),
    sl('diagram', 'Transverse waves', {
      b: 'In a **transverse wave** the particles vibrate **at right angles** to the direction in which the wave moves. The wave is a train of **crests** and **troughs**. The **wavelength** is the distance between two consecutive crests; the **amplitude** is the greatest displacement from the rest line.',
      v: fig.tr,
      n: 'Shake one end of a rope up and down. The wave runs along the rope, but each bit of rope moves up and down, at right angles to the wave. The raised parts are crests, the dipped parts are troughs.',
    }),
    sl('diagram', 'Longitudinal waves', {
      b: 'In a **longitudinal wave** the particles vibrate **along** the direction of travel. The wave is a train of **compressions** (crowded, high pressure) and **rarefactions** (spread out, low pressure). Sound in air is longitudinal.',
      v: fig.lo,
      n: 'Push and pull one end of a slinky along its length. Bunched coils called compressions and stretched coils called rarefactions travel along the slinky. Sound in air is made in just this way by a vibrating source.',
    }),
    sl('concept', 'Transverse against longitudinal', {
      b: 'Compare the two kinds of wave on direction of vibration, the shape of the wave and an example. Light is also transverse but needs no medium.',
      v: table(['Point', 'Transverse', 'Longitudinal'], [['Vibration of particles', 'perpendicular to wave', 'parallel to wave'], ['Wave made of', 'crests and troughs', 'compressions and rarefactions'], ['Example', 'rope, slinky shaken sideways', 'sound in air, slinky pushed and pulled']], 'Table comparing transverse and longitudinal waves'),
      n: 'The difference is the direction of vibration. In a transverse wave the particles move across the line of travel and make crests and troughs. In a longitudinal wave they move along it and make compressions and rarefactions.',
    }),
    sl('check', 'Quick check: kinds of wave', {
      b: 'Think about the direction in which the air particles vibrate.',
      v: table(['Wave', 'Particles vibrate'], [['Sound in air', 'along the direction of travel']], 'Table giving the direction of vibration for sound in air'),
      chk: 'chk-kind',
      n: 'A tuning fork sets the air around it vibrating. What kind of wave is the sound, and why?',
    }),
    sl('diagram', 'Sound needs a medium', {
      b: 'An electric bell rings inside a sealed **bell jar**. As the pump removes the air, the sound grows **fainter and fainter** though the hammer still strikes. When air is let back, the sound returns. Sound **cannot travel through a vacuum**.',
      v: fig.bell,
      n: 'Pump the air out of the jar and the bell is still seen working, yet we hardly hear it. Let air back in and the sound returns. So sound needs a material medium, and it cannot travel through empty space.',
    }),
    sl('check', 'Quick check: the bell jar', {
      b: 'Decide what happens to the sound as the pump works.',
      v: table(['Step', 'Observation'], [['Pump starts', 'sound becomes fainter'], ['Air let in again', 'sound returns']], 'Table of the observations during the bell-jar experiment'),
      chk: 'chk-bell',
      n: 'In the bell jar experiment the air is slowly pumped out. What do we conclude from what we hear?',
    }),
    sl('concept', 'Speed of sound in solids, liquids and gases', {
      b: `Sound is fastest in **solids**, slower in **liquids** and slowest in **gases**. The values used here are ${K.V_AIR} m s⁻¹ in air, ${K.V_WATER} m s⁻¹ in water and ${K.V_IRON} m s⁻¹ in iron. (Books give slightly different values; the question states the one to use.)`,
      v: fig.bars,
      n: 'Sound travels about four and a half times faster in water than in air, and about fifteen times faster in iron than in air. The closer and more firmly joined the particles, the quicker the disturbance is handed on.',
    }),
    sl('concept', 'What changes the speed of sound in air?', {
      b: 'In air the speed **rises with temperature** and is **greater in humid air** than in dry air. It does **not** depend on loudness, pitch or frequency, and at constant temperature not on the pressure.',
      v: table(['Factor', 'Effect on the speed of sound in air'], [['Temperature rises', 'increases (about 0.6 m s⁻¹ per degree Celsius)'], ['Humidity rises', 'increases'], ['Loudness or frequency changes', 'no change']], 'Table of the factors affecting the speed of sound in air'),
      n: 'Warm air carries sound faster than cold air. Moist air carries it faster than dry air, because water vapour makes the air lighter. Loudness and pitch have no effect on the speed at all.',
    }),
    sl('example', 'Worked example 1: two sounds from one tap', {
      b: r`**Problem.** A worker taps one end of an iron rail of length ${K.RAIL.len} m. A friend at the other end hears two sounds. Find the gap between them. (Air ${K.V_AIR} m s⁻¹, iron ${K.V_IRON} m s⁻¹.)

**Step 1.** Time through the rail $= \dfrac{${K.RAIL.len}}{${K.V_IRON}} = ${K.RAIL_IRON_T}$ s.

**Step 2.** Time through the air $= \dfrac{${K.RAIL.len}}{${K.V_AIR}} = ${K.RAIL_AIR_T}$ s.

**Step 3.** Gap $= ${K.RAIL_AIR_T} - ${K.RAIL_IRON_T} = ${K.RAIL_GAP}$ s.`,
      v: table(['Path', 'Speed', 'Time'], [['Iron rail', `${K.V_IRON} m/s`, `${K.RAIL_IRON_T} s`], ['Air', `${K.V_AIR} m/s`, `${K.RAIL_AIR_T} s`]], 'Table of the times taken by the sound in iron and in air'),
      n: 'Find the time for each path separately, using time equals distance divided by speed. The sound through the iron arrives first. The gap between the two sounds is the difference of the two times.',
    }),
    sl('example', 'Worked example 2: the same time in two media', {
      b: r`**Problem.** A sound lasts ${K.WATER5.t} s on its way. How far does it travel in that time in (a) air and (b) water? (Air ${K.V_AIR} m s⁻¹, water ${K.V_WATER} m s⁻¹.)

**Step 1.** Air: $d = vt = ${K.V_AIR} \times ${K.WATER5.t} = ${K.AIR5_D}$ m.

**Step 2.** Water: $d = ${K.V_WATER} \times ${K.WATER5.t} = ${K.WATER5_D}$ m.

**Step 3.** In the same time the sound goes much further in water, because it is faster there.`,
      v: table(['Medium', 'Speed', 'Time', 'Distance'], [['Air', `${K.V_AIR} m/s`, `${K.WATER5.t} s`, `${K.AIR5_D} m`], ['Water', `${K.V_WATER} m/s`, `${K.WATER5.t} s`, `${K.WATER5_D} m`]], 'Table of the distances covered by sound in five seconds in air and in water'),
      n: 'Distance is speed multiplied by time. For the same time, the medium with the greater speed gives the greater distance. Water carries the sound more than four times as far as air in these five seconds.',
    }),
    sl('check', 'Quick check: ordering the speeds', {
      b: 'Rank the three media by the speed of sound in them.',
      v: table(['Medium', 'State'], [['Steel', 'solid'], ['Sea water', 'liquid'], ['Dry air', 'gas']], 'Table of three media and their states'),
      chk: 'chk-order',
      n: 'Steel, sea water and dry air. In which order does the speed of sound decrease?',
    }),
    sl('check', 'Quick check: temperature', {
      b: 'Warm air against cold air.',
      v: table(['Day', 'Air'], [['Hot afternoon', 'warm'], ['Frosty morning', 'cold']], 'Table of a hot afternoon and a frosty morning'),
      chk: 'chk-temp',
      n: 'The same shout is made on a hot afternoon and on a frosty morning. On which day does the sound travel faster?',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'A wave carries energy; the medium only vibrates about its mean positions.',
        'Transverse: vibration at right angles, crests and troughs. Longitudinal: vibration along the wave, compressions and rarefactions.',
        'Sound in air is longitudinal and cannot pass through a vacuum.',
        'Speed of sound: solids > liquids > gases; it rises with temperature and humidity.',
      ],
      v: table(['Idea', 'Key fact'], [['Sound in air', 'longitudinal'], ['Vacuum', 'no sound'], ['Speed order', 'solid > liquid > gas']], 'Summary table of the main facts of Part 1'),
      n: 'To sum up. Waves carry energy and not matter. Sound in air is a longitudinal wave and needs a medium. It is fastest in solids and slowest in gases, and it speeds up in warm and in humid air.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Say "at right angles" for transverse and "along the direction of the wave" for longitudinal.',
        'In the bell-jar experiment describe what you see, what you hear and the conclusion.',
        'State the speed of sound you use, with its unit, in every numerical.',
        'Never write that loudness or pitch changes the speed of sound.',
      ],
      v: table(['Slip', 'Fix'], [['Sound is transverse', 'Air particles vibrate along the wave: longitudinal'], ['Faster in dry air', 'Humid air is faster'], ['Speed depends on pitch', 'Speed depends on the medium and temperature']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Exam tips. Use the exact words at right angles and along. For the bell jar, give the observation and the conclusion. State your value of the speed of sound. And remember loudness and pitch never change the speed.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Sound and Wave Motion — Part 2: v = f λ, thunder and ultrasound',
  goals: [
    'Use v = f λ and T = 1/f in simple numerical problems',
    'Find the distance of lightning from the time gap before thunder',
    'Classify frequencies as infrasonic, audible or ultrasonic and distinguish ultrasonic from supersonic',
  ],
  slides: [
    sl('title', 'Frequency, wavelength and speed', {
      b: 'Part 2: how fast a wave moves follows from how often it vibrates and how long each wave is. Then we compare sound with light and classify sounds by frequency.',
      v: flow('LR', [['f', 'f and λ'], ['v', 'v = f λ'], ['t', 'Thunder'], ['u', 'Ultrasound']], [['f', 'v'], ['v', 't'], ['t', 'u']], 'Flow: frequency and wavelength, wave equation, thunder, ultrasound'),
      n: 'This part joins frequency, wavelength and speed in one short equation, uses sound and light to measure the distance of a storm, and then sorts sounds into infrasonic, audible and ultrasonic.',
    }),
    sl('diagram', 'Amplitude, wavelength, frequency and period', {
      b: '**Wavelength** λ: distance between consecutive crests. **Frequency** f: vibrations per second (hertz). **Time period** T: time for one vibration, **T = 1 ÷ f**. The **amplitude** is the greatest displacement from the rest line.',
      v: fig.trLet,
      n: 'In this wave the distance from the first crest to the next is one wavelength. Frequency counts the vibrations each second. The time period is the time for one vibration, and it is the reciprocal of the frequency.',
    }),
    sl('concept', 'The wave equation', {
      b: r`In one time period $T$ the wave advances one wavelength $\lambda$, so speed $= \dfrac{\lambda}{T}$. Since $T = \dfrac{1}{f}$:

$$v = f \lambda$$

The **frequency is fixed by the source**; the speed depends on the medium; so the wavelength changes when the medium changes.`,
      v: table(['Quantity', 'Symbol', 'SI unit'], [['Speed', 'v', 'metre per second'], ['Frequency', 'f', 'hertz'], ['Wavelength', 'λ', 'metre'], ['Time period', 'T', 'second']], 'Table of the quantities in the wave equation with their symbols and units'),
      n: 'The speed of a wave is the frequency multiplied by the wavelength. The source fixes the frequency. The medium fixes the speed. So when a wave enters a new medium, the wavelength is the quantity that changes.',
    }),
    sl('example', 'Worked example 1: a wave on a slinky', {
      b: r`**Problem.** The first and the sixth compression of a slinky wave are ${K.SLINKY.span} m apart. The source vibrates ${K.SLINKY.f} times a second. Find the wave speed.

**Step 1.** Five wavelengths in ${K.SLINKY.span} m: $\lambda = \dfrac{${K.SLINKY.span}}{${K.SLINKY.spacings}} = ${K.SLINKY_L}$ m.

**Step 2.** $v = f\lambda = ${K.SLINKY.f} \times ${K.SLINKY_L} = ${K.SLINKY_V}$ m s⁻¹.`,
      v: table(['Quantity', 'Value'], [['Gap, 1st to 6th compression', `${K.SLINKY.span} m`], ['Wavelength', `${K.SLINKY_L} m`], ['Frequency', `${K.SLINKY.f} Hz`], ['Speed', `${K.SLINKY_V} m/s`]], 'Table of the slinky wave data and answer'),
      n: 'From the first compression to the sixth there are five wavelengths, not six. Divide the gap by five to get the wavelength, then multiply by the frequency to get the speed.',
    }),
    sl('check', 'Quick check: finding the speed', {
      b: 'Multiply the frequency by the wavelength.',
      v: table(['f', 'λ'], [[`${K.CHK_V.f} Hz`, `${K.CHK_V.l} m`]], 'Table giving a frequency and a wavelength'),
      chk: 'chk-v',
      n: 'A wave has a frequency of twelve hertz and a wavelength of half a metre. What is its speed?',
    }),
    sl('example', 'Worked example 2: one note, two media', {
      b: r`**Problem.** A ${K.BOAT.f} Hz note passes from air (${K.V_AIR} m s⁻¹) into water (${K.V_WATER} m s⁻¹). Find the wavelength in each.

**Step 1.** Air: $\lambda = \dfrac{v}{f} = \dfrac{${K.V_AIR}}{${K.BOAT.f}} = ${K.BOAT_AIR}$ m.

**Step 2.** Water: $\lambda = \dfrac{${K.V_WATER}}{${K.BOAT.f}} = ${K.BOAT_WATER}$ m.

**Step 3.** The frequency stays ${K.BOAT.f} Hz; only the wavelength changes.`,
      v: table(['Medium', 'Speed', 'Frequency', 'Wavelength'], [['Air', `${K.V_AIR} m/s`, `${K.BOAT.f} Hz`, `${K.BOAT_AIR} m`], ['Water', `${K.V_WATER} m/s`, `${K.BOAT.f} Hz`, `${K.BOAT_WATER} m`]], 'Table of speed, frequency and wavelength of the note in air and in water'),
      n: 'Divide the speed by the frequency in each medium. The wavelength is much longer in water because the speed is greater, while the frequency, set by the source, is unchanged.',
    }),
    sl('concept', 'Sound and light', {
      b: 'Light travels at about **3 × 10⁸ m s⁻¹**, far faster than sound in air. In a storm the flash and the thunder begin together, but we **see** the flash almost at once and **hear** the thunder later.',
      v: fig.thunder,
      n: 'Light covers the distance from the cloud in a tiny fraction of a second. Sound is hundreds of thousands of times slower, so the thunder arrives seconds later. The gap lets us find how far away the lightning struck.',
    }),
    sl('example', 'Worked example 3: how far was the lightning?', {
      b: r`**Problem.** The thunder is heard ${K.THUNDER.gap} s after the flash is seen. How far is the lightning? (Speed of sound ${K.V_AIR} m s⁻¹.)

**Step 1.** Light takes a negligible time, so the gap is the travel time of sound.

**Step 2.** $d = v \times t = ${K.V_AIR} \times ${K.THUNDER.gap} = ${K.THUNDER_D}$ m.`,
      v: table(['Quantity', 'Value'], [['Time gap', `${K.THUNDER.gap} s`], ['Speed of sound', `${K.V_AIR} m/s`], ['Distance', `${K.THUNDER_D} m`]], 'Table of the time gap, speed of sound and distance of the lightning'),
      n: 'Treat the flash as seen at the moment it happens. The time gap is then the time the sound took. Multiply the speed of sound by that time to get the distance of the lightning.',
    }),
    sl('check', 'Quick check: thunder', {
      b: 'Use the speed of sound, not the speed of light.',
      v: table(['Time gap', 'Speed of sound'], [[`${K.CHK_THUNDER.gap} s`, `${K.V_AIR} m/s`]], 'Table giving the time gap and the speed of sound'),
      chk: 'chk-thunder',
      n: 'A flash is followed three seconds later by thunder. With the speed of sound as three hundred and forty metres per second, how far away is the lightning?',
    }),
    sl('diagram', 'Infrasonic, audible and ultrasonic', {
      b: 'The **audible range** of a human ear is about **20 Hz to 20 000 Hz**. Below 20 Hz the sound is **infrasonic**; above 20 000 Hz it is **ultrasonic**.',
      v: fig.scale,
      n: 'Our ears respond from about twenty hertz to twenty thousand hertz. Lower sounds, such as earthquake tremors and elephant rumbles, are infrasonic. Higher sounds, such as a bat squeak or a dog whistle, are ultrasonic.',
    }),
    sl('concept', 'Uses of ultrasound', {
      b: 'Ultrasound is used for **ultrasonography** (images of the unborn baby and organs), **cleaning** delicate parts, **finding flaws** in metal castings and **measuring depth** under water. Bats and dolphins use it naturally.',
      v: table(['Use', 'Why ultrasound'], [['Medical imaging', 'gentle on tissue, no ionising radiation'], ['Cleaning parts', 'tiny vibrations shake dirt loose'], ['Flaw detection', 'passes through metal and is changed by a crack']], 'Table of uses of ultrasound and the reason for each'),
      n: 'Because ultrasound is gentle and travels in narrow beams, doctors use it to see inside the body. Factories use it to clean small parts and to find hidden cracks in metal.',
    }),
    sl('concept', 'Ultrasonic is not supersonic', {
      b: '**Ultrasonic** and **infrasonic** describe the **frequency** of a sound. **Supersonic** and **subsonic** describe the **speed** of a moving body compared with the speed of sound.',
      v: table(['Word', 'Describes', 'Meaning'], [['Ultrasonic', 'frequency', 'above 20 000 Hz'], ['Infrasonic', 'frequency', 'below 20 Hz'], ['Supersonic', 'speed', 'faster than sound'], ['Subsonic', 'speed', 'slower than sound']], 'Table distinguishing ultrasonic, infrasonic, supersonic and subsonic'),
      n: 'Ultrasonic and infrasonic are about how high or low the pitch is, measured by frequency. Supersonic and subsonic are about how fast something moves compared with sound. A jet can be supersonic without making an ultrasonic note.',
    }),
    sl('check', 'Quick check: classifying a frequency', {
      b: 'Compare the frequency with the audible range.',
      v: table(['Source', 'Frequency'], [['Elephant rumble', '14 Hz']], 'Table giving the frequency of an elephant rumble'),
      chk: 'chk-range',
      n: 'An elephant produces a rumble of fourteen hertz. Is it infrasonic, audible or ultrasonic?',
    }),
    sl('check', 'Quick check: choosing the word', {
      b: 'Frequency or speed?',
      v: table(['Statement', 'About'], [['A jet flies at twice the speed of sound', '?']], 'Table giving a jet that flies at twice the speed of sound'),
      chk: 'chk-super',
      n: 'A fighter jet flies at twice the speed of sound. Which word describes this: ultrasonic, supersonic, infrasonic or subsonic?',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'v = f λ and T = 1 ÷ f; the source fixes f, the medium fixes v.',
        'Distance of lightning = speed of sound × time gap (light time is negligible).',
        'Audible range 20 Hz to 20 000 Hz; infrasonic below, ultrasonic above.',
        'Ultrasonic and infrasonic describe frequency; supersonic and subsonic describe speed.',
      ],
      v: table(['Idea', 'Key fact'], [['Wave equation', 'v = f λ'], ['Thunder', 'd = v × t'], ['Audible range', '20 Hz to 20 000 Hz']], 'Summary table of the main facts of Part 2'),
      n: 'To sum up. Speed equals frequency times wavelength. The thunder gap gives the distance of the lightning. Humans hear from twenty to twenty thousand hertz, and ultrasonic is a word about frequency, not about speed.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Write v = f λ first, then substitute with units; convert centimetres to metres.',
        'For a wave entering a new medium, keep f and change λ.',
        'For thunder, use the speed of sound and ignore the time taken by light.',
        'Say "frequency" for ultrasonic and infrasonic, "speed" for supersonic and subsonic.',
      ],
      v: table(['Slip', 'Fix'], [['Counting six wavelengths between six compressions', 'There are five gaps, so five wavelengths'], ['Changing f when the medium changes', 'f stays; λ changes'], ['Using the speed of light for thunder', 'Use the speed of sound']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Exam tips. Write the equation, then substitute with units. Count the gaps between compressions correctly. Keep the frequency fixed across media. And use the speed of sound for thunder, never the speed of light.',
    }),
  ],
});
