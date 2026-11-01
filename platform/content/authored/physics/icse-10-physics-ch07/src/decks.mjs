// ICSE 10 Physics ch07 Sound — two decks: Part 1 (t01–t02) reflection of sound, echoes, the conditions for hearing them and
// echo numericals, and the uses of echoes (bats, dolphins, fishing, medical imaging, SONAR); Part 2 (t03–t05) natural, damped
// and forced vibrations, resonance and its applications, and the characteristics of sound (loudness, pitch, quality), the
// decibel and noise pollution.
import { sl, deck, table, flow, svgV, plot, r } from './lib.mjs';
import { ECHO, SONAR, BARTON, WAVES_LP, WAVES_Q } from './svgs.mjs';

const V = {
  echo: svgV(ECHO, 'A person eighty five metres from a cliff hearing the echo of a shout half a second later'),
  sonar: svgV(SONAR, 'A ship using SONAR pulses to find the depth of a shoal of fish and of the seabed'),
  barton: svgV(BARTON, 'Four pendulums on a common string; the one with the same length as the driver swings strongly'),
  lp: svgV(WAVES_LP, 'Three sound waves showing loud and soft notes of the same pitch, and a note of higher pitch'),
  q: svgV(WAVES_Q, 'A pure sine wave from a tuning fork and a wave with overtones from an instrument, same pitch and loudness'),
};

export const deck1 = deck({
  part: 1,
  title: 'Sound — Part 1: Echoes and their uses',
  goals: [
    'Explain an echo and state the conditions for hearing a distinct echo',
    'Justify the minimum distance of about 17 m for an echo in air',
    'Calculate the speed of sound or the distance of a reflector from echo times',
    'Explain how bats, dolphins, fishing boats, doctors and SONAR use echoes',
  ],
  slides: [
    sl('title', 'Hello… hello… hello!', {
      b: 'Part 1 — shout towards a hill or a tall building and the sound comes back. Bats, dolphins, ships and doctors all use this returning sound.',
      v: table(['Where', 'What happens'], [['Valley among hills', 'Your shout comes back a moment later'], ['Empty hall', 'Sounds seem to linger'], ['Bat at night', 'Finds insects by returning squeaks'], ['Ship at sea', 'Measures the depth below it']], 'Table of four situations in which sound is reflected'),
      n: 'Namaste! Stand in a valley and shout your name. A moment later you hear it again, coming back from the hills. That returning sound is an echo. In this part we find out when an echo can be heard, how to calculate distances from echo times, and how bats, dolphins, ships and doctors use echoes.',
    }),
    sl('diagram', 'Reflection of sound and the echo', {
      b: 'Sound is reflected from hard, large surfaces such as walls, cliffs and buildings, obeying the same laws of reflection as light. An **echo** is the sound heard **after reflection** from a distant obstacle, **separately** from the original sound. The sound travels to the reflector and back, a distance $2d$, so\n$$d = \\frac{v t}{2}, \\qquad v = \\frac{2d}{t}$$\nwhere $t$ is the time between producing the sound and hearing the echo.',
      v: V.echo,
      n: 'Sound bounces off hard surfaces just as light bounces off a mirror. When the reflected sound reaches us clearly after the original sound, we hear an echo. In the time we wait, the sound has gone to the cliff and come back, covering twice the distance. So the distance to the cliff is half of speed times time.',
    }),
    sl('concept', 'Conditions for hearing a distinct echo', {
      b: '1. **Time gap:** the sensation of a sound lasts in our ear for about **0.1 s** (persistence of hearing). The echo must arrive **at least 0.1 s** after the original sound to be heard separately.\n2. **Minimum distance:** in 0.1 s sound in air (about 340 m/s) travels $340 \\times 0.1 = 34$ m, there and back, so the reflector must be at least **17 m** away.\n3. **Size of reflector:** the reflecting surface must be **large** compared with the wavelength of the sound.\n4. **Loudness:** the sound must be **loud enough** for the echo to be heard.',
      v: flow('LR', [['a', 'Ear holds a sound for 0.1 s'], ['b', 'Round trip must take at least 0.1 s'], ['c', 'Round trip 34 m'], ['d', 'Reflector at least 17 m away']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow from persistence of hearing to the minimum distance of seventeen metres'),
      n: 'Our ears hold on to each sound for about one tenth of a second. If the reflected sound comes back sooner, it merges with the original and we cannot hear it separately. In one tenth of a second, sound in air travels about thirty four metres. That is there and back, so the reflector must be at least seventeen metres away. It must also be large, and the sound loud.',
    }),
    sl('example', 'Worked example: minimum distance on a warm day', {
      b: r`**Problem.** On a warm afternoon the speed of sound in air is 344 m/s. Find the minimum distance of a wall from a person for a distinct echo to be heard.

**Given:** $t = 0.1$ s (persistence of hearing), $v = 344$ m/s.

**Distance:** $d = \dfrac{v t}{2} = \dfrac{344 \times 0.1}{2} = 17.2$ m.

So the wall must be at least about 17.2 m away.`,
      v: table(['Quantity', 'Value'], [['Speed of sound', '344 m/s'], ['Least time gap', '0.1 s'], ['Round trip in 0.1 s', '34.4 m'], ['Minimum distance', '17.2 m']], 'Table of the values in the minimum distance example'),
      n: 'The echo must arrive at least a tenth of a second after the sound. In that time sound at three hundred and forty four metres per second covers thirty four point four metres. Half of that, seventeen point two metres, is the least distance of the wall. On a warmer day sound is faster, so this distance is slightly larger.',
    }),
    sl('check', 'Quick check: minimum distance', {
      b: 'Find the least distance for a distinct echo.',
      n: 'Quick check. Use one tenth of a second, and remember that the sound goes there and back.',
      chk: 'echo-mcq',
    }),
    sl('example', 'Worked example: clapping near a building', {
      b: r`**Problem.** Farhan claps once in front of a tall building and hears the echo 1.2 s later. The speed of sound is 340 m/s. (a) How far is the building? (b) If he walks 68 m closer, after what time will he hear the echo?

**(a)** $d = \dfrac{v t}{2} = \dfrac{340 \times 1.2}{2} = 204$ m.

**(b)** New distance $= 204 - 68 = 136$ m; $t = \dfrac{2d}{v} = \dfrac{2 \times 136}{340} = 0.8$ s.`,
      v: table(['Situation', 'Distance', 'Echo time'], [['First position', '204 m', '1.2 s'], ['After walking 68 m closer', '136 m', '0.8 s']], 'Table of distance and echo time before and after walking closer'),
      n: 'Sound covers three hundred and forty times one point two, or four hundred and eight metres, there and back, so the building is two hundred and four metres away. After walking sixty eight metres closer, he is one hundred and thirty six metres away. The round trip is now two hundred and seventy two metres, which takes point eight seconds.',
    }),
    sl('check', 'Quick check: echo time', {
      b: 'Find the time after which an echo is heard.',
      n: 'Quick check. Time equals twice the distance divided by the speed of sound.',
      chk: 'echonum-mcq',
    }),
    sl('concept', 'Echoes in nature and medicine', {
      b: 'Many uses of echoes need **ultrasound** — sound of frequency **above 20 kHz**, beyond human hearing. Ultrasound has a **short wavelength**, so it travels in a narrow beam and is reflected even by small objects.\n- **Bats** send out ultrasonic squeaks and locate insects and obstacles from the echoes (echolocation).\n- **Dolphins** use ultrasonic clicks to find fish and to navigate in murky water.\n- **Fishing boats** use echoes to find shoals of fish.\n- **Medical imaging (ultrasonography):** echoes from organs build a picture of the heart, liver, kidneys or a baby in the womb, without harmful radiation.',
      v: table(['User', 'Sound used', 'Purpose'], [['Bat', 'Ultrasonic squeaks', 'Find insects and avoid obstacles'], ['Dolphin', 'Ultrasonic clicks', 'Find prey, navigate'], ['Fishing boat', 'Ultrasonic pulses', 'Locate shoals of fish'], ['Doctor', 'Ultrasound scan', 'Image organs and the unborn baby']], 'Table of users of echoes, the sound they use and its purpose'),
      n: 'Bats hunt in the dark by sending out very high squeaks that we cannot hear, then listening for the echoes from insects. Dolphins do the same under water. Fishing boats use echoes to find shoals of fish, and doctors use ultrasound echoes to see inside the body safely, for example to check on a baby before it is born.',
    }),
    sl('diagram', 'SONAR: measuring the depth of the sea', {
      b: '**SONAR** (Sound Navigation And Ranging) uses a **transmitter** on a ship to send a short pulse of **ultrasound** down into the water and a **receiver** to pick up the echo. The time $t$ between sending and receiving is measured, and with the speed of sound in sea water (about **1500 m/s**):\n$$\\text{depth} = \\frac{v t}{2}$$\nSONAR also finds submarines, wrecks, icebergs and shoals of fish. **Ultrasound** is used because it is **not heard**, travels as a **narrow beam** with little spreading, and is not easily absorbed.',
      v: V.sonar,
      n: 'A SONAR set on a ship sends a short burst of ultrasound straight down. The pulse reflects from the seabed, or from anything in between such as a shoal of fish, and the receiver picks up the echo. The depth is the speed of sound in sea water, about fifteen hundred metres per second, times the echo time, divided by two.',
    }),
    sl('example', 'Worked example: depth of the sea', {
      b: r`**Problem.** A ship’s SONAR receives the echo from the seabed 3.0 s after the pulse is sent. The speed of sound in sea water is 1500 m/s. (a) Find the depth of the sea. (b) An echo from a submarine arrives after 0.6 s. How deep is the submarine?

**(a)** $\text{depth} = \dfrac{v t}{2} = \dfrac{1500 \times 3.0}{2} = 2250$ m.

**(b)** $\dfrac{1500 \times 0.6}{2} = 450$ m below the ship.`,
      v: table(['Echo from', 'Time', 'Depth'], [['Seabed', '3.0 s', '2250 m'], ['Submarine', '0.6 s', '450 m']], 'Table of echo times and depths in the SONAR example'),
      n: 'The pulse goes down and comes back, so halve the total distance. Fifteen hundred metres per second times three seconds is four thousand five hundred metres, and half of that is two thousand two hundred and fifty metres. For the submarine, fifteen hundred times point six, halved, gives four hundred and fifty metres.',
    }),
    sl('check', 'Quick check: SONAR', {
      b: 'Find a depth from a SONAR echo time.',
      n: 'Quick check. Depth is the speed of sound in water times the echo time, divided by two.',
      chk: 'sonar-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Echo: reflected sound heard separately from the original.',
        'Conditions: echo at least 0.1 s later, so reflector at least about 17 m away in air; large reflector; loud sound.',
        'd = v t / 2 and v = 2d / t.',
        'Ultrasound (above 20 kHz) is used by bats, dolphins, fishing boats, doctors and SONAR.',
        'SONAR: depth = v t / 2 with v ≈ 1500 m/s in sea water.',
      ],
      v: table(['Quantity', 'Typical value'], [['Persistence of hearing', '0.1 s'], ['Speed of sound in air', 'About 340 m/s'], ['Minimum echo distance in air', 'About 17 m'], ['Speed of sound in sea water', 'About 1500 m/s']], 'Summary table of typical values for echoes'),
      n: 'Let us sum up Part 1. An echo is reflected sound heard separately from the original. For that, it must come back at least a tenth of a second later, so the reflector must be about seventeen metres away or more. Distance equals speed times time, divided by two. Ultrasound echoes help bats, dolphins, doctors and ships.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Always divide by 2 for an echo: the sound goes there AND back.',
        'Justify 17 m using 0.1 s and the speed of sound.',
        'Use about 1500 m/s for sea water, not 340 m/s.',
        'Name ultrasound and give a reason (narrow beam, not heard) when explaining SONAR.',
      ],
      v: table(['Slip', 'Fix'], [['d = v t', 'd = v t / 2'], ['Speed in air used for sea water', 'About 1500 m/s in sea water'], ['Echo needs a soft surface', 'Hard, large surface'], ['Any small distance gives an echo', 'At least about 17 m in air']], 'Table of four common slips about echoes and their fixes'),
      n: 'Some tips. In every echo problem, remember the sound travels there and back, so divide by two. Explain the seventeen metre limit using one tenth of a second. Use about fifteen hundred metres per second for sound in sea water. And when you explain SONAR, say that it uses ultrasound, which travels in a narrow beam.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Sound — Part 2: Vibrations, resonance and the characteristics of sound',
  goals: [
    'Distinguish natural, damped and forced vibrations with one example each',
    'Explain resonance using two pendulums on a common string, with useful and harmful examples',
    'Relate loudness to amplitude, pitch to frequency and quality to waveform',
    'Name the decibel and suggest ways to reduce noise pollution',
  ],
  slides: [
    sl('title', 'Why does a bridge shake and a flute sing?', {
      b: 'Part 2 — every object has its own way of vibrating. Pushing it at just the right rhythm makes it vibrate hugely; and the way a source vibrates decides how loud, how high and how rich its sound is.',
      v: table(['Everyday event', 'Idea'], [['A swing pushed in step goes higher and higher', 'Resonance'], ['A struck bell slowly dies away', 'Damped vibration'], ['A tabla and a whistle sound different', 'Quality'], ['A drum hit harder sounds louder', 'Loudness and amplitude']], 'Table of everyday events and the ideas from this part that explain them'),
      n: 'Push a child on a swing in step with its swinging, and it goes higher and higher. Strike a bell and its sound slowly dies away. A tabla and a whistle sound different even when equally loud. In this part we look at how things vibrate, at resonance, and at what makes sounds loud or soft, high or low, rich or plain.',
    }),
    sl('concept', 'Natural and damped vibrations', {
      b: '**Natural (free) vibrations:** a body set vibrating and left to itself vibrates at its own **natural frequency**, which depends on its **size, shape, material and tension** (for a pendulum, its length). Ideally the amplitude stays constant.\n\n**Damped vibrations:** in practice, friction and air resistance take away energy, so the **amplitude decreases** with time while the **frequency stays the natural frequency**. Examples: a pendulum swinging in air, a struck tuning fork dying away, a plucked string.',
      v: plot({ x: { min: 0, max: 8, label: 'time (s)' }, y: { min: -1.1, max: 1.1, label: 'displacement' }, functions: [{ expr: 'exp(-0.3x)*sin(2*pi*x)', label: 'damped vibration', domain: [0, 8] }, { expr: 'exp(-0.3x)', label: 'shrinking amplitude', domain: [0, 8] }], samples: 800 }, 'Graph of displacement against time for a damped vibration: the oscillation keeps the same period while its amplitude shrinks along a decaying curve', 'Damped: same frequency, falling amplitude.'),
      n: 'Pull a pendulum aside and let go. It swings at its own natural frequency, which depends on its length. If there were no air or friction, it would keep swinging with the same size of swing. In real life, air resistance steals energy, so the swings get smaller and smaller, while the time for each swing stays the same. These are damped vibrations.',
    }),
    sl('concept', 'Forced vibrations', {
      b: '**Forced vibrations:** a body made to vibrate by an **external periodic force** vibrates at the **frequency of that force**, not at its own natural frequency. The amplitude is usually **small**, unless the two frequencies are close. Examples: the stem of a vibrating tuning fork pressed on a table top makes the table vibrate and the sound louder; the sound board of a sitar or guitar is forced to vibrate by the strings; a house window rattles when a heavy truck passes.',
      v: table(['Type', 'Frequency', 'Amplitude', 'Example'], [['Natural', 'Natural frequency', 'Constant (ideal)', 'Pendulum in vacuum'], ['Damped', 'Natural frequency', 'Decreases', 'Pendulum in air'], ['Forced', 'Frequency of the applied force', 'Usually small', 'Table top pressed by a tuning fork']], 'Table comparing natural, damped and forced vibrations'),
      n: 'When an outside force keeps pushing a body back and forth, the body vibrates at the frequency of that force, whatever its own natural frequency. Press the stem of a ringing tuning fork on a table, and the table top is forced to vibrate with it, making the sound louder. The body of a guitar is forced to vibrate by its strings.',
    }),
    sl('example', 'Worked example: natural frequency of a swing', {
      b: r`**Problem.** A garden swing completes 20 oscillations in 50 s. (a) Find its natural frequency. (b) At what frequency should a child push it to make it go higher and higher? (c) If an adult instead pushes once every 2 s, what kind of vibration results?

**(a)** $f = \dfrac{\text{oscillations}}{\text{time}} = \dfrac{20}{50} = 0.4$ Hz (time period $= \dfrac{1}{0.4} = 2.5$ s).

**(b)** At $0.4$ Hz — once every 2.5 s — in step with the swing (resonance).

**(c)** Pushing at $\dfrac{1}{2} = 0.5$ Hz forces the swing at a frequency different from 0.4 Hz: a **forced vibration** with only a small amplitude.`,
      v: table(['Quantity', 'Value'], [['Natural frequency', '0.4 Hz'], ['Time period', '2.5 s'], ['Pushing frequency for resonance', '0.4 Hz'], ['Pushing every 2 s', '0.5 Hz, forced, small amplitude']], 'Table of the values in the swing example'),
      n: 'Twenty swings in fifty seconds is a frequency of point four hertz, one swing every two and a half seconds. Pushing at exactly that rhythm adds energy at the right moment every time, so the swing goes higher. Pushing every two seconds does not match its natural frequency, so the swing is forced to move but never builds up a large swing.',
    }),
    sl('check', 'Quick check: damped vibrations', {
      b: 'Identify what changes in a damped vibration.',
      n: 'Quick check. In damped vibrations, think about which quantity falls with time.',
      chk: 'damped-mcq',
    }),
    sl('diagram', 'Resonance: two pendulums on a common string', {
      b: '**Resonance** is a special case of forced vibration: when the frequency of the applied force **equals the natural frequency** of the body, the body vibrates with a **very large amplitude**.\n\n**Demonstration:** several pendulums hang from a common stretched string. A heavy pendulum D is set swinging; it forces all the others to vibrate through the string. The pendulum **B of the same length** as D (same natural frequency) soon swings with a **large amplitude** — it resonates — while pendulums of other lengths only make small, irregular swings.',
      v: V.barton,
      n: 'Hang several pendulums from one stretched string and set the heavy one swinging. Its pulls travel along the string and push on all the others. Only the pendulum with exactly the same length, and so the same natural frequency, picks up a big swing. The others just jiggle a little. This build up of a large vibration is called resonance.',
    }),
    sl('concept', 'Resonance: useful and harmful', {
      b: '**Useful:** tuning a **radio** to a station (the circuit resonates with the station’s frequency); musical instruments — the **air column** of a flute or the hollow body of a tabla resonates and makes the sound louder; finding the frequency of a tuning fork with a resonance tube.\n\n**Harmful:** soldiers **break step** while crossing a bridge so that their marching cannot set it into resonance; machines are mounted on rubber so their vibrations do not shake buildings; a singer’s steady note at the right pitch can **shatter a glass**; wind gusts set the Tacoma Narrows bridge (USA, 1940) swinging until it collapsed.',
      v: plot({ x: { min: 0, max: 2.5, label: 'forcing frequency ÷ natural frequency' }, y: { min: 0, max: 5.5, label: 'amplitude (relative)' }, functions: [{ expr: '1/sqrt((1-x^2)^2+(0.2x)^2)', label: 'forced vibration', domain: [0, 2.5] }], points: [{ at: [1, 5], label: 'resonance' }], samples: 600 }, 'Graph of the amplitude of a forced vibration against the ratio of forcing frequency to natural frequency, with a sharp peak at a ratio of one', 'Largest amplitude when the frequencies match.'),
      n: 'The graph shows how big a forced vibration gets. Far from the natural frequency, the amplitude is small; when the frequencies match, it shoots up. Resonance is useful in radios and musical instruments. But it can be dangerous: soldiers break step on bridges, and a steady wind once shook a large bridge until it collapsed.',
    }),
    sl('check', 'Quick check: resonance', {
      b: 'Decide when resonance occurs.',
      n: 'Quick check. Resonance needs the forcing frequency to equal the natural frequency.',
      chk: 'res-mcq',
    }),
    sl('diagram', 'Loudness and pitch', {
      b: r`**Loudness** is how strong a sound seems to the ear. It depends on the **amplitude**: loudness (intensity) $\propto (\text{amplitude})^{2}$, so doubling the amplitude makes the intensity four times. It also depends on the **area of the vibrating body**, the **distance** from the source and the **density of the medium**.

**Pitch** is how high or shrill a sound is. It depends on **frequency**: a higher frequency gives a higher (shriller) pitch. A woman’s voice usually has a higher pitch than a man’s; a mosquito’s buzz has a higher pitch than a lion’s roar, though the roar is louder.`,
      v: V.lp,
      n: 'Loudness depends on amplitude, the size of the vibration. Hit a drum harder and it vibrates more widely, so it sounds louder. Pitch depends on frequency, the number of vibrations each second. A mosquito beats its wings very fast, so its buzz has a high pitch, while a lion’s roar has a low pitch even though it is much louder.',
    }),
    sl('diagram', 'Quality (timbre)', {
      b: '**Quality** (timbre) is the characteristic that lets us tell apart two sounds of the **same pitch and loudness**, for example the same note on a sitar and a harmonium, or two friends’ voices on the phone. It depends on the **waveform**, that is, on the **number and relative strengths of the overtones** mixed with the fundamental. A tuning fork gives a pure, sine-shaped wave; instruments give complex waves.\n\n**Subjective and objective:** loudness, pitch and quality are **subjective** (how the listener perceives the sound); the matching **objective**, measurable quantities are **intensity** (W/m²), **frequency** (Hz) and **waveform**.',
      v: V.q,
      n: 'Play the same note equally loudly on a sitar and on a harmonium, and you can still tell them apart. That difference is called quality. It comes from the shape of the wave: besides the main note, each instrument gives a mixture of higher overtones. A tuning fork gives a smooth, pure wave; real instruments give richer, more complicated ones.',
    }),
    sl('example', 'Worked example: reading a waveform', {
      b: r`**Problem.** A microphone connected to a CRO shows a steady wave whose time period is 2.5 ms. The speed of sound is 340 m/s. (a) Find the frequency. (b) Find the wavelength. (c) The amplitude on the screen is then doubled with the frequency unchanged. What happens to the pitch and to the intensity?

**(a)** $f = \dfrac{1}{T} = \dfrac{1}{0.0025} = 400$ Hz.

**(b)** $\lambda = \dfrac{v}{f} = \dfrac{340}{400} = 0.85$ m.

**(c)** Pitch is unchanged (same frequency); intensity $\propto$ amplitude², so it becomes $2^{2} = 4$ times.`,
      v: table(['Quantity', 'Value'], [['Time period', '2.5 ms'], ['Frequency', '400 Hz'], ['Wavelength', '0.85 m'], ['Amplitude doubled', 'Same pitch, 4 times the intensity']], 'Table of the values in the waveform example'),
      n: 'The frequency is one divided by the time period. Two and a half milliseconds is point zero zero two five seconds, so the frequency is four hundred hertz. The wavelength is speed divided by frequency, three hundred and forty over four hundred, or point eight five metres. Doubling the amplitude leaves the pitch the same but makes the sound four times as intense.',
    }),
    sl('concept', 'The decibel and noise pollution', {
      b: '**Sound level** is measured in **decibels (dB)**. 0 dB is the faintest sound a normal ear can hear; each **increase of 10 dB** means the intensity is **10 times** greater. Prolonged exposure above about **80–85 dB** can damage hearing; about 120 dB causes pain.\n\n**Noise** is unwanted, unpleasant sound. **Noise pollution** causes stress, loss of sleep, high blood pressure and hearing loss. **Reducing it:** silencers on vehicles and machines; banning pressure horns and loud speakers at night; planting **trees** along roads; sound-proofing walls with soft, porous materials; keeping factories and airports away from homes; ear protection for workers.',
      v: table(['Source', 'Sound level (about)'], [['Rustling leaves', '20 dB'], ['Normal conversation', '60 dB'], ['Busy traffic', '80 dB'], ['Firecracker nearby', '140 dB']], 'Table of typical sound levels of four sources in decibels'),
      n: 'Sound level is measured in decibels. Zero decibels is the faintest sound we can hear, normal talk is about sixty, and busy traffic is about eighty. Every ten decibels more means ten times the intensity. Long exposure to loud noise damages hearing and causes stress. We can reduce noise with silencers, trees, sound proofing and sensible rules on horns and loudspeakers.',
    }),
    sl('check', 'Quick check: pitch', {
      b: 'Decide which characteristic of sound depends on frequency.',
      n: 'Quick check. Pitch is the characteristic linked to the number of vibrations each second.',
      chk: 'pitch-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Natural vibration: at the natural frequency; damped: amplitude falls, frequency unchanged; forced: at the frequency of the applied force.',
        'Resonance: forcing frequency = natural frequency → very large amplitude (Barton’s pendulums).',
        'Useful: radio tuning, instruments; harmful: bridges, machines, glass shattering.',
        'Loudness ∝ amplitude²; pitch depends on frequency; quality depends on waveform (overtones).',
        'Sound level in decibels; noise pollution reduced by silencers, trees, sound-proofing, rules.',
      ],
      v: table(['Characteristic (subjective)', 'Depends on (objective)'], [['Loudness', 'Amplitude, intensity'], ['Pitch', 'Frequency'], ['Quality', 'Waveform, overtones']], 'Summary table linking the three characteristics of sound to the physical quantities they depend on'),
      n: 'Let us sum up Part 2. Bodies vibrate freely at their natural frequency, the vibrations die away when damped, and an outside force makes them vibrate at its own frequency. When the two frequencies match, resonance gives a huge amplitude. Loudness depends on amplitude, pitch on frequency and quality on the shape of the wave.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'In damped vibrations the FREQUENCY stays the same; only the amplitude falls.',
        'Define resonance as a special case of forced vibration with equal frequencies.',
        'Do not mix up loudness (amplitude) with pitch (frequency).',
        'For Barton’s pendulums, say WHY the equal-length pendulum resonates: same natural frequency.',
      ],
      v: table(['Slip', 'Fix'], [['Damping lowers the frequency', 'Damping lowers the amplitude'], ['Louder means higher pitch', 'Louder means larger amplitude'], ['Resonance = any forced vibration', 'Only when frequencies are equal'], ['Quality depends on loudness', 'Quality depends on waveform']], 'Table of four common slips in Part 2 and their fixes'),
      n: 'Final tips. Damping makes the amplitude fall, but the frequency stays the same. Describe resonance as a forced vibration in which the forcing frequency equals the natural frequency. Keep loudness and pitch apart: loudness goes with amplitude and pitch with frequency. In the pendulum experiment, say that the resonating pendulum has the same length as the driver.',
    }),
  ],
});
