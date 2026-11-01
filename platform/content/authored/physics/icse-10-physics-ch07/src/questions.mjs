// ICSE 10 Physics ch07 Sound — question bank (ICSE 2027 specimen style).
// Every numerical value is computed here (d = v t / 2, f = 1 / T, v = f lambda, intensity proportional to amplitude^2,
// +10 dB = 10 x intensity) and asserted by a re-solve check. MCQ keys are placed by the builder.
import { mk, add, r, near } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const f3 = (x, n = 3) => String(Number(x.toPrecision(n)));

// ---------------------------------------------------------------- t01 echoes
const dMin330 = (330 * 0.1) / 2;
add('echo-mcq', mcq({
  stem: 'On a cold winter morning sound travels at 330 m/s in air. The least distance of a hillside from a shepherd, for him to hear a distinct echo of his whistle, is:',
  right: `${dMin330} m`,
  wrong: ['33 m', '3.3 m', '8.25 m'],
  sol: `$d = \\dfrac{v \\times 0.1}{2} = \\dfrac{330 \\times 0.1}{2} = ${dMin330}$ m — option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => near(dMin330, 16.5, 1e-9) || 'd');
const tHill = (2 * 255) / 340;
add('echonum-mcq', mcq({
  stem: 'Kavya shouts towards a hill 255 m away. Taking the speed of sound as 340 m/s, she hears the echo after:',
  right: `${tHill} s`,
  wrong: ['0.75 s', '3.0 s', '1.33 s'],
  sol: `$t = \\dfrac{2d}{v} = \\dfrac{2 \\times 255}{340} = ${tHill}$ s — option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => near(tHill, 1.5, 1e-9) || 't');
add('hall-mcq', mcq({
  stem: 'Clapping in a small classroom 6 m long does not produce a distinct echo because:',
  right: 'the reflected sound returns in less than 0.1 s and merges with the original sound',
  wrong: ['sound is not reflected by classroom walls', 'sound travels faster in a closed room', 'the walls absorb all the sound'],
  sol: 'The round trip of 12 m takes about 0.035 s, less than the persistence of hearing — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('surface-mcq', mcq({
  stem: 'A strong, distinct echo is most likely to be heard from:',
  right: 'a large, hard rock face about 50 m away',
  wrong: ['a thick curtain 50 m away', 'a small pebble 50 m away', 'a large brick wall 5 m away'],
  sol: 'The reflector must be large, hard and at least about 17 m away — option (@K).',
  d: 2, c: 'application', t: [1],
}));
const vEcho = (2 * 165) / 1.0;
add('vecho-num', num({
  stem: 'A boy fires a cracker 165 m from a tall wall and hears the echo exactly 1.0 s later. Find the speed of sound in m/s.',
  value: vEcho, tol: 0, unit: 'm/s',
  sol: r`$v = \dfrac{2d}{t} = \dfrac{2 \times 165}{1.0} = 330$ m/s.`,
  scheme: [['330 m/s', 1]],
  d: 2, c: 'application', t: [1],
}), () => vEcho === 330 || 'v');
const dCliffs = (340 * (0.8 + 1.4)) / 2;
add('cliffs-num', num({
  stem: 'A trekker standing between two parallel cliffs claps once. She hears the first echo after 0.8 s and the second after 1.4 s. If sound travels at 340 m/s, how far apart are the cliffs, in metres?',
  value: dCliffs, tol: 0.5, unit: 'm',
  sol: r`$d_{1} = \dfrac{340 \times 0.8}{2} = 136$ m, $d_{2} = \dfrac{340 \times 1.4}{2} = 238$ m; distance apart $= 136 + 238 = 374$ m.`,
  scheme: [['374 m', 1]],
  d: 3, c: 'application', t: [1],
}), () => near(dCliffs, 374, 1e-9) || 'd');
const tGun = (2 * 510) / 340;
add('gun-num', num({
  stem: 'A starter’s pistol is fired 510 m from the wall of a stadium stand. If the speed of sound is 340 m/s, after how many seconds is the echo heard at the pistol?',
  value: tGun, tol: 0.01, unit: 's',
  sol: r`$t = \dfrac{2d}{v} = \dfrac{2 \times 510}{340} = 3$ s.`,
  scheme: [['3 s', 1]],
  d: 2, c: 'application', t: [1],
}), () => near(tGun, 3, 1e-9) || 't');
const gap = 60 / 100;
const vClap = (2 * 100) / gap;
add('claps-num', num({
  stem: 'Standing 100 m from a long wall, Ishita claps steadily so that each echo coincides with her next clap. She counts 100 claps in one minute. Find the speed of sound in m/s, to three significant figures.',
  value: Number(f3(vClap)), tol: 1, unit: 'm/s',
  sol: r`Time between claps $= \dfrac{60}{100} = 0.6$ s, which is the echo time. $v = \dfrac{2d}{t} = \dfrac{2 \times 100}{0.6} = 333.3$ m/s, about 333 m/s.`,
  scheme: [['333 m/s', 1]],
  d: 4, c: 'analysis', t: [1],
}), () => near(vClap, 333.33, 0.001) || 'v');
add('echo-tf', tf({
  stem: 'With sound travelling at 340 m/s in air, a distinct echo can be heard from a wall only 10 m away.',
  key: 'f',
  sol: 'False: the round trip of 20 m takes about 0.06 s, less than 0.1 s; the wall must be at least about 17 m away.',
  d: 2, c: 'application', t: [1],
}));
add('echo-fill', fill({
  stem: 'The sensation of a sound persists in the human ear for about ___ second.',
  acc: [['0.1', '1/10', 'one tenth']],
  sol: '**0.1** s.',
  d: 1, c: 'recall', t: [1],
}));
add('echo-ar', ar({
  a: 'No distinct echo of a shout is heard from a wall 8 m away in air.',
  r: 'The reflected sound returns in less than 0.1 s and merges with the original.',
  key: 'a',
  sol: 'Both are true (round trip 16 m takes about 0.047 s), and R explains A — option (a).',
  d: 2, c: 'analysis', t: [1],
}));
add('temple-short1', short({
  marks: 1,
  stem: 'In a long stone temple corridor, Meera claps once and hears the clap again a moment later. Name this returned sound and the effect that produces it.',
  model: 'An echo, produced by the reflection of sound from a distant hard surface.',
  sol: 'Echo; reflection.',
  scheme: [['Echo, by reflection', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('min-short2', short({
  marks: 2,
  stem: 'Explain why a person must stand at least about 17 m from a reflecting wall to hear a distinct echo in air (speed of sound 340 m/s).',
  model: 'The ear retains a sound for about 0.1 s, so the echo must arrive at least 0.1 s after the original. In 0.1 s sound travels 340 × 0.1 = 34 m; this is the distance to the wall and back, so the wall must be at least 17 m away.',
  sol: '0.1 s; 34 m round trip; 17 m.',
  scheme: [['Persistence of hearing 0.1 s', 1], ['34 m there and back, so 17 m', 1]],
  d: 2, c: 'understanding', t: [1],
}), () => near((340 * 0.1) / 2, 17, 1e-9) || 'd');
const vS3 = (2 * 25) / 0.15;
const t15 = (2 * 15) / vS3;
add('wall-short3', short({
  marks: 3,
  stem: 'A girl standing 25 m from a high wall bursts a balloon and hears the echo 0.15 s later. (a) Calculate the speed of sound. (b) Was the echo distinct? Give a reason. (c) If she moves to 15 m from the wall, after what time would the echo return, and would it be distinct?',
  model: `(a) $v = \\dfrac{2 \\times 25}{0.15} = ${f3(vS3)}$ m/s. (b) Yes: 0.15 s is more than 0.1 s. (c) $t = \\dfrac{2 \\times 15}{${f3(vS3)}} \\approx ${f3(t15, 2)}$ s, less than 0.1 s, so the echo would merge with the original sound and not be distinct.`,
  sol: '333 m/s; yes; 0.09 s, not distinct.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'analysis', t: [1],
}), () => (near(vS3, 333.3, 0.001) && near(t15, 0.09, 1e-6)) || 'wall');

// ---------------------------------------------------------------- t02 uses of echoes, SONAR
const dSonar = (1500 * 2.0) / 2;
add('sonar-mcq', mcq({
  stem: 'A survey ship’s SONAR receives the echo from the seabed 2.0 s after sending the pulse. With sound travelling at 1500 m/s in sea water, the depth of the sea is:',
  right: `${dSonar} m`,
  wrong: ['3000 m', '750 m', '340 m'],
  sol: `$\\text{depth} = \\dfrac{v t}{2} = \\dfrac{1500 \\times 2.0}{2} = ${dSonar}$ m — option (@K).`,
  d: 2, c: 'application', t: [2],
}), () => dSonar === 1500 || 'depth');
add('ultra-mcq', mcq({
  stem: 'SONAR uses ultrasound rather than audible sound mainly because ultrasound:',
  right: 'travels as a narrow beam with little spreading and is reflected even by small objects',
  wrong: ['travels much faster than audible sound in water', 'can travel through a vacuum', 'is not reflected by the seabed'],
  sol: 'Short wavelength gives a narrow, well-directed beam — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('bat-mcq', mcq({
  stem: 'A bat flies through a dark cave without hitting the walls because it:',
  right: 'sends out ultrasonic squeaks and judges distances from their echoes',
  wrong: ['sees the walls with very sensitive eyes', 'feels the walls with its wings', 'follows the warmth of the rocks'],
  sol: 'Bats use echolocation with ultrasound — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('med-mcq', mcq({
  stem: 'Doctors examine an unborn baby with ultrasound rather than X-rays because ultrasound:',
  right: 'forms images from echoes without harmful radiation',
  wrong: ['passes through bones more easily than X-rays', 'is a kind of light', 'travels faster in the body'],
  sol: 'Ultrasound echoes give images safely — option (@K).',
  d: 2, c: 'application', t: [2],
}));
const dWreck = (1500 * 0.8) / 2;
add('wreck-num', num({
  stem: 'A diving team uses SONAR to find an old shipwreck. The echo from the wreck returns 0.8 s after the pulse is sent. Taking the speed of sound in sea water as 1500 m/s, how deep is the wreck in metres?',
  value: dWreck, tol: 0, unit: 'm',
  sol: r`$\text{depth} = \dfrac{1500 \times 0.8}{2} = 600$ m.`,
  scheme: [['600 m', 1]],
  d: 2, c: 'application', t: [2],
}), () => dWreck === 600 || 'd');
const dDolph = (1500 * 0.08) / 2;
add('dolphin-num', num({
  stem: 'A dolphin sends out a click and hears its echo from a fish 0.08 s later. If sound travels at 1500 m/s in sea water, how far away is the fish in metres?',
  value: dDolph, tol: 0.01, unit: 'm',
  sol: r`$d = \dfrac{1500 \times 0.08}{2} = 60$ m.`,
  scheme: [['60 m', 1]],
  d: 2, c: 'application', t: [2],
}), () => near(dDolph, 60, 1e-9) || 'd');
const tBat = (2 * 1.7) / 340;
add('bat-num', num({
  stem: 'A bat is 1.7 m from a moth. Its ultrasonic squeak travels at 340 m/s. After how many milliseconds does the echo reach the bat?',
  value: tBat * 1000, tol: 0.01, unit: 'ms',
  sol: r`$t = \dfrac{2 \times 1.7}{340} = 0.01$ s $= 0.01 \times 1000 = 10$ ms.`,
  scheme: [['10 ms', 1]],
  d: 3, c: 'application', t: [2],
}), () => near(tBat, 0.01, 1e-9) || 't');
add('ultra-fill', fill({
  stem: 'Sound of frequency higher than 20 kHz, which humans cannot hear, is called ___.',
  acc: [['ultrasound', 'ultrasonic sound', 'ultrasonic']],
  sol: '**Ultrasound**.',
  d: 1, c: 'recall', t: [2],
}));
add('sonar-tf', tf({
  stem: 'SONAR finds the depth of the sea from the time taken by light to travel to the seabed and back.',
  key: 'f',
  sol: 'False: it uses the echo time of ultrasonic sound.',
  d: 1, c: 'understanding', t: [2],
}));
add('sonar-ar', ar({
  a: 'Fishing trawlers use ultrasonic pulses to locate shoals of fish.',
  r: 'Ultrasound has a short wavelength, so it travels as a narrow beam and is reflected even by small objects.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('sonar-short2', short({
  marks: 2,
  stem: 'Explain how a ship’s SONAR measures the depth of the sea below it.',
  model: 'A transmitter on the ship sends a short pulse of ultrasound down to the seabed, and a receiver picks up the reflected pulse (echo). The time t between sending and receiving is measured; since the pulse goes down and back, depth = v t ÷ 2, where v (about 1500 m/s) is the speed of sound in sea water.',
  sol: 'Pulse, echo, time; depth = vt/2.',
  scheme: [['Pulse and echo detected, time measured', 1], ['Depth = v t / 2', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('uses-short2', short({
  marks: 2,
  stem: 'Give two uses of echoes made by animals and two made by people.',
  model: 'Animals: bats locate insects and obstacles; dolphins find fish and navigate. People: SONAR on ships finds sea depth, wrecks and shoals of fish; doctors make ultrasound scans of organs and unborn babies.',
  sol: 'Bats, dolphins; SONAR, ultrasound scans.',
  scheme: [['Two animal uses', 1], ['Two human uses', 1]],
  d: 1, c: 'recall', t: [2],
}));

// ---------------------------------------------------------------- t03 natural, damped, forced vibrations
add('damped-mcq', mcq({
  stem: 'A simple pendulum is left swinging in a room. After a few minutes:',
  right: 'its amplitude has decreased, but its frequency is the same',
  wrong: ['its frequency has decreased, but its amplitude is the same', 'both its amplitude and frequency have increased', 'its amplitude is unchanged and it swings faster'],
  sol: 'Air resistance damps the motion: amplitude falls, natural frequency is unchanged — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('forced-mcq', mcq({
  stem: 'The stem of a vibrating tuning fork is pressed against a wooden table top and the sound becomes louder. This is because:',
  right: 'the table top is made to vibrate (forced vibration), and its large area sets more air vibrating',
  wrong: ['the tuning fork vibrates with a higher frequency', 'the table absorbs the sound', 'the table top vibrates at its own natural frequency only'],
  sol: 'The table vibrates at the fork’s frequency as a forced vibration; a large vibrating area gives a louder sound — option (@K).',
  d: 3, c: 'analysis', t: [3, 5],
}));
add('natural-mcq', mcq({
  stem: 'The natural frequency of a simple pendulum can be changed by changing its:',
  right: 'length',
  wrong: ['initial amplitude (for small swings)', 'colour of the bob', 'distance from the observer'],
  sol: 'The natural frequency of a pendulum depends on its length — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
const fPend = 30 / 24;
add('pend-num', num({
  stem: 'A pendulum in a wall clock makes 30 complete oscillations in 24 s. Find its natural frequency in Hz.',
  value: fPend, tol: 0.01, unit: 'Hz',
  sol: r`$f = \dfrac{30}{24} = 1.25$ Hz.`,
  scheme: [['1.25 Hz', 1]],
  d: 1, c: 'application', t: [3],
}), () => near(fPend, 1.25, 1e-9) || 'f');
add('damped-tf', tf({
  stem: 'In damped vibrations, the frequency of the vibrating body gradually decreases.',
  key: 'f',
  sol: 'False: the amplitude decreases; the frequency stays the natural frequency.',
  d: 2, c: 'understanding', t: [3],
}));
add('forced-fill', fill({
  stem: 'A body made to vibrate by an external periodic force vibrates with the ___ of that force.',
  acc: [['frequency']],
  sol: '**Frequency**.',
  d: 1, c: 'recall', t: [3],
}));
add('bell-ar', ar({
  a: 'The sound of a temple bell slowly dies away after it is struck.',
  r: 'The vibrations of the bell are damped by air resistance and internal friction.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('types-short2', short({
  marks: 2,
  stem: 'Distinguish between natural vibrations and forced vibrations, giving one example of each.',
  model: 'Natural vibrations take place at the body’s own natural frequency when it is disturbed and left free (a pendulum pulled aside and released). Forced vibrations take place at the frequency of an external periodic force acting on the body (the sound board of a sitar vibrating with its strings).',
  sol: 'Frequency; examples.',
  scheme: [['Difference', 1], ['Examples', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('types-short3', short({
  marks: 3,
  stem: 'Classify each as natural, damped or forced vibration: (a) a guitar string plucked and allowed to ring until silent, (b) a window pane rattling while a heavy truck passes, (c) an ideal pendulum swinging in a vacuum with no friction.',
  model: '(a) Damped: the amplitude falls as energy is lost to the air and the body of the guitar. (b) Forced: the pane vibrates at the frequency of the truck’s vibrations. (c) Natural: it swings at its natural frequency with constant amplitude.',
  sol: 'Damped; forced; natural.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- t04 resonance
add('res-mcq', mcq({
  stem: 'A body is set into vibration by a periodic force. It vibrates with the largest amplitude when the frequency of the force is:',
  right: 'equal to the natural frequency of the body',
  wrong: ['twice the natural frequency of the body', 'much less than the natural frequency of the body', 'much greater than the natural frequency of the body'],
  sol: 'That condition is resonance — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('barton-mcq', mcq({
  stem: 'Pendulums of lengths 40 cm, 60 cm, 80 cm and 100 cm hang from a common string. A heavy driver pendulum of length 60 cm is set swinging. The pendulum that swings with the largest amplitude is the one of length:',
  right: '60 cm',
  wrong: ['40 cm', '100 cm', '80 cm'],
  sol: 'Equal length gives equal natural frequency, so the 60 cm pendulum resonates — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('soldiers-mcq', mcq({
  stem: 'Soldiers marching across a suspension bridge are ordered to break step because:',
  right: 'their regular steps could match the natural frequency of the bridge and make it vibrate dangerously',
  wrong: ['marching in step makes too much noise', 'the bridge is weaker in the middle', 'marching in step increases their weight'],
  sol: 'Avoiding resonance — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('radio-mcq', mcq({
  stem: 'Turning the tuning knob of a radio to pick up one particular station is an example of:',
  right: 'resonance',
  wrong: ['echo', 'damping', 'reflection of sound'],
  sol: 'The circuit’s natural frequency is matched to the station’s frequency — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('res-tf', tf({
  stem: 'Resonance is a special case of forced vibration.',
  key: 't',
  sol: 'True: it is forced vibration at a frequency equal to the natural frequency.',
  d: 1, c: 'recall', t: [4],
}));
add('res-fill', fill({
  stem: 'When the frequency of the applied force equals the natural frequency of a body and the body vibrates with a large amplitude, the effect is called ___.',
  acc: [['resonance']],
  sol: '**Resonance**.',
  d: 1, c: 'recall', t: [4],
}));
add('pend-ar', ar({
  a: 'A pendulum of length 50 cm hanging from a common string resonates with a driver pendulum of length 80 cm.',
  r: 'Resonance occurs only when the forcing frequency equals the natural frequency.',
  key: 'd',
  sol: 'A is false — different lengths give different natural frequencies; R is true — option (d).',
  d: 3, c: 'analysis', t: [4],
}));
add('glass-ar', ar({
  a: 'A trained singer holding one steady note can make a thin wine glass shatter.',
  r: 'When the frequency of the note equals the natural frequency of the glass, its vibrations build up to a very large amplitude.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 3, c: 'analysis', t: [4],
}));
add('res-short2', short({
  marks: 2,
  stem: 'Give one example where resonance is useful and one where it must be avoided, explaining each briefly.',
  model: 'Useful: tuning a radio, where the circuit is adjusted until its natural frequency matches that of the station, so that station’s signal is strongly received. Avoided: soldiers break step on a bridge, so that their steps cannot match the bridge’s natural frequency and build up dangerous vibrations.',
  sol: 'Radio; bridge.',
  scheme: [['Useful example', 1], ['Harmful example', 1]],
  d: 2, c: 'application', t: [4],
}));
add('barton-short3', short({
  marks: 3,
  stem: 'Describe an experiment with pendulums hung from a common string to demonstrate resonance, and state what is observed and why.',
  model: 'Hang several light pendulums of different lengths and one heavy driver pendulum from a horizontal string stretched between two supports, with one light pendulum of the same length as the driver. Set the driver swinging at right angles to the string. All the pendulums start to swing, but the one of equal length soon swings with a large amplitude, while the others swing only slightly. It has the same natural frequency as the driver, so it is in resonance.',
  sol: 'Set-up; observation; reason.',
  scheme: [['Set-up', 1], ['Observation', 1], ['Reason: equal natural frequency', 1]],
  d: 2, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- t05 characteristics of sound, decibel, noise
add('pitch-mcq', mcq({
  stem: 'The shrillness of the whistle of a pressure cooker compared with the hum of a refrigerator is described by its:',
  right: 'pitch, which depends on frequency',
  wrong: ['loudness, which depends on frequency', 'pitch, which depends on amplitude', 'quality, which depends on amplitude'],
  sol: 'Pitch depends on frequency — option (@K).',
  d: 1, c: 'understanding', t: [5],
}));
add('loud-mcq', mcq({
  stem: 'The amplitude of vibration of a loudspeaker cone is doubled at the same frequency. The intensity of the sound becomes:',
  right: 'four times as great',
  wrong: ['twice as great', 'half as great', 'unchanged, because the frequency is the same'],
  sol: 'Intensity is proportional to amplitude squared: $2^{2} = 4$ — option (@K).',
  d: 3, c: 'application', t: [5],
}));
add('quality-mcq', mcq({
  stem: 'You recognise your friend’s voice on the phone even before she says her name. The characteristic of sound that makes this possible is its:',
  right: 'quality (timbre)',
  wrong: ['loudness', 'pitch', 'speed'],
  sol: 'Each voice has its own waveform (overtones) — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('mosquito-mcq', mcq({
  stem: 'Compared with the roar of a lion, the buzz of a mosquito has:',
  right: 'a higher pitch but a much smaller loudness',
  wrong: ['a lower pitch and a smaller loudness', 'a higher pitch and a greater loudness', 'the same pitch but a different quality'],
  sol: 'The mosquito’s wings vibrate at high frequency with small amplitude — option (@K).',
  d: 2, c: 'analysis', t: [5],
}));
add('objective-mcq', mcq({
  stem: 'Which pair consists of objective (measurable) quantities rather than subjective sensations?',
  right: 'Intensity and frequency',
  wrong: ['Loudness and pitch', 'Pitch and quality', 'Loudness and quality'],
  sol: 'Loudness, pitch and quality depend on the listener; intensity and frequency are measured — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('db-mcq', mcq({
  stem: 'A sound-level meter near a busy crossing reads 80. The unit of this reading is the:',
  right: 'decibel',
  wrong: ['hertz', 'watt', 'newton'],
  sol: 'Sound level is measured in decibels — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
const lam512 = 340 / 512;
add('fork-num', num({
  stem: 'A tuning fork of frequency 512 Hz sounds in air where sound travels at 340 m/s. Find the wavelength of the sound in metres, to three significant figures.',
  value: Number(f3(lam512)), tol: 0.005, unit: 'm',
  sol: r`$\lambda = \dfrac{v}{f} = \dfrac{340}{512} = 0.664$ m.`,
  scheme: [['0.664 m', 1]],
  d: 2, c: 'application', t: [5],
}), () => near(lam512, 0.6641, 0.001) || 'lambda');
const f136 = 340 / 1.36;
add('horn-num', num({
  stem: 'The sound of a ship’s horn has a wavelength of 1.36 m in air (speed of sound 340 m/s). Find its frequency in Hz.',
  value: f136, tol: 0.5, unit: 'Hz',
  sol: r`$f = \dfrac{v}{\lambda} = \dfrac{340}{1.36} = 250$ Hz.`,
  scheme: [['250 Hz', 1]],
  d: 2, c: 'application', t: [5],
}), () => near(f136, 250, 1e-9) || 'f');
const k3 = 3 ** 2;
add('amp-num', num({
  stem: 'The amplitude of vibration of a drum skin is made three times as large, with the frequency unchanged. By what factor does the intensity of its sound increase?',
  value: k3, tol: 0,
  sol: r`Intensity $\propto$ amplitude²: factor $= 3^{2} = 9$.`,
  scheme: [['9', 1]],
  d: 2, c: 'application', t: [5],
}), () => k3 === 9 || 'k');
const dbRatio = 10 ** ((80 - 60) / 10);
add('db-num', num({
  stem: 'Normal conversation is about 60 dB and busy traffic about 80 dB. Using the fact that each increase of 10 dB means ten times the intensity, how many times more intense is the traffic noise?',
  value: dbRatio, tol: 0,
  sol: r`An increase of $80 - 60 = 20$ dB is two steps of 10 dB, so the factor is $10 \times 10 = 100$.`,
  scheme: [['100', 1]],
  d: 3, c: 'application', t: [5],
}), () => dbRatio === 100 || 'ratio');
add('loud-tf', tf({
  stem: 'A louder sound always has a higher pitch.',
  key: 'f',
  sol: 'False: loudness depends on amplitude, pitch on frequency; they are independent.',
  d: 1, c: 'understanding', t: [5],
}));
add('pitch-fill', fill({
  stem: 'The pitch of a sound depends on its ___.',
  acc: [['frequency']],
  sol: '**Frequency**.',
  d: 1, c: 'recall', t: [5],
}));
add('db-fill', fill({
  stem: 'The level of a sound, as shown on a sound-level meter, is expressed in ___.',
  acc: [['decibels', 'decibel', 'dB']],
  sol: '**Decibels** (dB).',
  d: 1, c: 'recall', t: [5],
}));
add('quality-ar', ar({
  a: 'A flute and a violin playing the same note equally loudly can still be told apart.',
  r: 'The two instruments produce sound waves of different waveforms, with different overtones.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'understanding', t: [5],
}));
add('loud-ar', ar({
  a: 'Striking a tabla harder makes its sound louder.',
  r: 'The pitch of a sound depends on the amplitude of vibration.',
  key: 'c',
  sol: 'A is true (larger amplitude); R is false — pitch depends on frequency — option (c).',
  d: 2, c: 'analysis', t: [5],
}));
add('area-short1', short({
  marks: 1,
  stem: 'Apart from amplitude, name one factor on which the loudness of a sound depends.',
  model: 'The area of the vibrating body (also the distance from the source or the density of the medium).',
  sol: 'Area of vibrating body.',
  scheme: [['A correct factor', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('noise-short2', short({
  marks: 2,
  stem: 'A housing colony is built beside a busy highway. Suggest two ways to reduce the noise reaching the homes, and state one harmful effect of long exposure to such noise.',
  model: 'Plant thick rows of trees or build a sound barrier wall along the highway; fit double-glazed windows and sound-absorbing curtains (also enforce silencers and limits on horns). Long exposure can cause hearing loss, stress, sleeplessness or high blood pressure.',
  sol: 'Two ways; one effect.',
  scheme: [['Two ways', 1], ['Harmful effect', 1]],
  d: 2, c: 'evaluation', t: [5],
}));
add('chars-short2', short({
  marks: 2,
  stem: 'What is meant by saying that loudness is a subjective quantity while intensity is objective? Name the objective quantity that corresponds to pitch.',
  model: 'Loudness is the sensation produced in a listener’s ear, so it differs from person to person; intensity is the measurable sound energy per second per unit area, the same for every observer. The objective quantity matching pitch is frequency.',
  sol: 'Sensation vs measurable; frequency.',
  scheme: [['Subjective vs objective', 1], ['Frequency', 1]],
  d: 2, c: 'understanding', t: [5],
}));

// ---------------------------------------------------------------- match items
add('chars-match', match({
  marks: 2,
  stem: 'Match each characteristic or quantity of sound in Column A with what it depends on, or its unit, in Column B.',
  pairs: [
    ['Loudness', 'Amplitude'],
    ['Pitch', 'Frequency'],
    ['Quality', 'Waveform'],
    ['Sound level', 'Decibel'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Loudness → amplitude; pitch → frequency; quality → waveform; sound level → decibel.',
  d: 1, c: 'recall', t: [5],
}));
add('idea-match', match({
  marks: 2,
  stem: 'For each sound or vibration event in Column A, pick the physics behind it from Column B.',
  pairs: [
    ['A ship finds the depth of the sea', 'Echo of ultrasound'],
    ['A struck bell slowly falls silent', 'Damped vibration'],
    ['A table top hums when a vibrating fork is pressed on it', 'Forced vibration'],
    ['An equal-length pendulum picks up a large swing', 'Resonance'],
  ],
  order: [3, 1, 0, 2],
  sol: 'Sea depth → echo of ultrasound; bell → damped; table top → forced; equal-length pendulum → resonance.',
  d: 2, c: 'application', t: [2, 3, 4],
}));

// ---------------------------------------------------------------- 10-mark structured questions
const dL1 = (340 * 2.5) / 2;
const dL1b = (340 * 1.2) / 2;
add('echo-long', long({
  stem: '(a) What is an echo? State two conditions necessary for hearing a distinct echo. [3]\n\n(b) Show that the minimum distance of a reflector for a distinct echo in air is about 17 m, taking the speed of sound as 340 m/s. [3]\n\n(c) A man stands between two buildings and fires a gun. He hears the first echo after 1.2 s and the second after 2.5 s. (i) How far is each building from him? (ii) How far apart are the buildings? (iii) When will he hear a third echo, from sound reflected by both buildings? (speed of sound 340 m/s) [4]',
  model: `(a) An echo is a sound heard after reflection from a distant obstacle, separately from the original sound. Conditions: the echo must reach the ear at least 0.1 s after the original (so the reflector is at least about 17 m away); the reflector must be large compared with the wavelength (and the sound must be loud enough).\n\n(b) The ear retains a sound for 0.1 s. In 0.1 s sound travels $340 \\times 0.1 = 34$ m, there and back, so the minimum distance is $\\dfrac{34}{2} = 17$ m.\n\n(c) (i) $\\dfrac{340 \\times 1.2}{2} = ${dL1b}$ m and $\\dfrac{340 \\times 2.5}{2} = ${dL1}$ m. (ii) $${dL1b} + ${dL1} = ${dL1b + dL1}$ m. (iii) The sound reflected first by one building then the other travels twice the gap: $t = 1.2 + 2.5 = 3.7$ s.`,
  sol: 'Definition and conditions; 17 m; two distances, gap, third echo.',
  scheme: [['(a) definition', 1], ['(a) two conditions', 2], ['(b) 0.1 s and 34 m', 2], ['(b) 17 m', 1], ['(c)(i)', 2], ['(c)(ii)', 1], ['(c)(iii)', 1]],
  d: 3, c: 'application', t: [1],
}), () => (near(dL1b, 204, 1e-9) && near(dL1, 425, 1e-9) && near((2 * (dL1 + dL1b)) / 340, 3.7, 1e-9)) || 'echo');
const dL2bed = (1500 * 4.0) / 2;
const tL2 = (2 * 450) / 1500;
add('sonar-long', long({
  stem: '(a) What is ultrasound? Give two reasons why it is used in SONAR. [3]\n\n(b) Describe, with the help of a labelled sketch described in words, how SONAR is used to find the depth of the sea. [3]\n\n(c) A ship’s SONAR receives an echo from the seabed 4.0 s after sending a pulse. (i) Find the depth of the sea. (ii) A submarine lies 450 m below the ship; after what time does its echo arrive? (iii) Why is 340 m/s not used here? (speed of sound in sea water 1500 m/s) [4]',
  model: `(a) Ultrasound is sound of frequency above 20 kHz. It is used because it travels in a narrow beam with little spreading (short wavelength), it is reflected even by small objects, and it cannot be heard, so it does not disturb people.\n\n(b) A transmitter fixed under the ship sends a short ultrasonic pulse downwards; it is reflected by the seabed and the echo is picked up by a receiver beside the transmitter. The time interval t is measured, and depth = v t ÷ 2.\n\n(c) (i) $\\dfrac{1500 \\times 4.0}{2} = ${dL2bed}$ m. (ii) $t = \\dfrac{2 \\times 450}{1500} = ${tL2}$ s. (iii) 340 m/s is the speed of sound in air; sound travels much faster in water.`,
  sol: 'Ultrasound and reasons; SONAR method; depth, time, speed in water.',
  scheme: [['(a) definition', 1], ['(a) two reasons', 2], ['(b) method', 2], ['(b) formula', 1], ['(c)(i)', 2], ['(c)(ii)', 1], ['(c)(iii)', 1]],
  d: 2, c: 'application', t: [2],
}), () => (dL2bed === 3000 && near(tL2, 0.6, 1e-9)) || 'sonar');
add('vib-long', long({
  stem: '(a) Define natural, damped and forced vibrations. [3]\n\n(b) A pendulum swinging in air is observed for a few minutes. Describe how its displacement–time graph changes with time, and state what happens to (i) its amplitude and (ii) its frequency. [3]\n\n(c) (i) What is resonance? (ii) Describe how two pendulums of equal length on a common string show resonance. (iii) Why does a pendulum of a different length not resonate? [4]',
  model: '(a) Natural vibrations: vibrations of a body at its own natural frequency when disturbed and left free. Damped vibrations: vibrations whose amplitude decreases with time because of resistive forces. Forced vibrations: vibrations of a body under an external periodic force, at the frequency of that force.\n\n(b) The graph is a wave of constant period whose peaks shrink steadily along a decaying envelope. (i) The amplitude decreases. (ii) The frequency stays the same (the natural frequency).\n\n(c) (i) Resonance: a forced vibration in which the frequency of the applied force equals the natural frequency of the body, so the amplitude becomes very large. (ii) When one pendulum is set swinging, its pulls on the common string force the other; having the same length, the second has the same natural frequency and soon swings with a large amplitude. (iii) Its natural frequency differs from the driver’s, so it makes only small forced vibrations.',
  sol: 'Definitions; damped graph; resonance with pendulums.',
  scheme: [['(a) three definitions', 3], ['(b) graph', 1], ['(b)(i)', 1], ['(b)(ii)', 1], ['(c)(i)', 1], ['(c)(ii)', 2], ['(c)(iii)', 1]],
  d: 2, c: 'understanding', t: [3, 4],
}));
const fSwing = 12 / 30;
add('res-long', long({
  stem: '(a) State the difference between forced vibration and resonance. [3]\n\n(b) Give two examples where resonance is useful and one where it is harmful. [3]\n\n(c) A swing completes 12 oscillations in 30 s. (i) Find its natural frequency and time period. (ii) A child pushes it once every 2.5 s. Will its amplitude build up? Explain. (iii) What happens if the child pushes once every 1.5 s instead? [4]',
  model: `(a) In forced vibration the applied force may have any frequency and the amplitude is usually small; in resonance the applied frequency equals the natural frequency of the body and the amplitude becomes very large.\n\n(b) Useful: tuning a radio; the air column of a flute or the hollow body of a tabla making the sound louder. Harmful: a marching troop setting a bridge into large vibrations (so soldiers break step).\n\n(c) (i) $f = \\dfrac{12}{30} = ${f3(fSwing)}$ Hz; $T = \\dfrac{1}{0.4} = 2.5$ s. (ii) Yes: pushing every 2.5 s is at 0.4 Hz, equal to the natural frequency — resonance. (iii) Pushing at about 0.67 Hz does not match the natural frequency, so the swing makes only small, irregular forced vibrations.`,
  sol: 'Difference; examples; swing.',
  scheme: [['(a)', 3], ['(b) two useful', 2], ['(b) harmful', 1], ['(c)(i)', 2], ['(c)(ii)', 1], ['(c)(iii)', 1]],
  d: 3, c: 'evaluation', t: [4],
}), () => (near(fSwing, 0.4, 1e-9) && near(1 / 1.5, 0.667, 0.001)) || 'swing');
const fL5 = 1 / 0.004;
const lamL5 = 340 / fL5;
add('char-long', long({
  stem: '(a) Name the three characteristics of a musical sound and state the physical quantity on which each depends. [3]\n\n(b) A CRO shows the waveform of a note with a time period of 4.0 ms. (i) Find its frequency. (ii) Find its wavelength in air (speed of sound 340 m/s). (iii) If the amplitude of the waveform is halved at the same frequency, what happens to the intensity? [3]\n\n(c) (i) In what unit is sound level measured? (ii) Why is continuous noise above about 85 dB harmful? (iii) Suggest two ways to reduce noise pollution near a school. [4]',
  model: `(a) Loudness depends on amplitude (intensity); pitch depends on frequency; quality (timbre) depends on the waveform, that is, the overtones present.\n\n(b) (i) $f = \\dfrac{1}{0.004} = ${fL5}$ Hz. (ii) $\\lambda = \\dfrac{340}{250} = ${f3(lamL5)}$ m. (iii) Intensity $\\propto$ amplitude², so it becomes $\\left(\\dfrac{1}{2}\\right)^{2} = 0.25$ of its value, one quarter.\n\n(c) (i) The decibel (dB). (ii) It can damage the ear and cause hearing loss, stress and sleeplessness. (iii) Plant trees around the school; ban loud horns and loudspeakers nearby (also sound-proof classrooms).`,
  sol: 'Characteristics; waveform; decibel and noise.',
  scheme: [['(a) three pairs', 3], ['(b)(i)', 1], ['(b)(ii)', 1], ['(b)(iii)', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 2]],
  d: 2, c: 'application', t: [5],
}), () => (near(fL5, 250, 1e-9) && near(lamL5, 1.36, 1e-9)) || 'char');
