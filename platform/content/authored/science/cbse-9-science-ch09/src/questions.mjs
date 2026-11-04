// ch09 Sound — question bank. MCQ keys are placed by the builder (balanced); AR keys planned: a b c d a c.
// Consistent approximate speeds: air 344 m/s (about 22 °C), sea water 1500 m/s, steel 5000 m/s.
// Every numerical is computed here, interpolated into stem and solution, and re-solved by the check passed to add().
import { mk, add, r, near, dec } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const vA = 344;
const vW = 1500;
const vS = 5000;
const p3 = (x) => Number(x.toPrecision(3));

// ---------------------------------------------------------------- t01 production and propagation
add('chk-medium', mcq({
  stem: 'Two astronauts stand side by side on the surface of the Moon, where there is no air. Without their radios, they:',
  right: 'cannot hear each other, because there is no medium to carry the sound',
  wrong: ['can hear each other normally, because they are close together', 'can hear each other faintly, if they shout', 'can hear each other, because sound travels through the ground in their boots'],
  sol: 'Sound needs a material medium and cannot travel through a vacuum. With no air between them, the sound of a voice cannot reach the other astronaut — option (@K). Their radios work with radio waves, not sound.',
  d: 2, c: 'application', t: [1],
}));
add('m-vib', mcq({
  stem: 'A drummer strikes a tabla and a clear note is heard. The note is produced because the stretched skin of the tabla:',
  right: 'vibrates to and fro about its mean position',
  wrong: ['moves steadily in one direction', 'becomes hot', 'stops moving after the strike'],
  sol: 'Sound is produced by vibrating bodies. The struck skin moves to and fro and passes the disturbance to the air — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('m-medium', mcq({
  stem: 'Sound can travel through all of the following EXCEPT:',
  right: 'a vacuum',
  wrong: ['a steel rail', 'sea water', 'air'],
  sol: 'Sound is a mechanical wave and needs a medium (solid, liquid or gas). A vacuum has no particles to vibrate, so sound cannot travel through it — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('m-long', mcq({
  stem: 'A sound wave travels through air from left to right. The air particles vibrate:',
  right: 'to and fro along the left–right direction',
  wrong: ['up and down, at right angles to the left–right direction', 'in circles around the source', 'only towards the right, travelling along with the wave'],
  sol: 'Sound in air is a longitudinal wave: the particles vibrate parallel to the direction in which the wave moves, but they only oscillate about their positions and do not travel with the wave — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('m-rare', mcq({
  stem: 'A rarefaction in a sound wave in air is a region in which the air particles are:',
  right: 'far apart, and the pressure is lower than normal',
  wrong: ['close together, and the pressure is higher than normal', 'far apart, and the pressure is higher than normal', 'close together, and the pressure is lower than normal'],
  sol: 'In a rarefaction the particles are spread out, so the pressure falls below the normal value — option (@K). A compression is the opposite.',
  d: 1, c: 'recall', t: [1],
}));
add('ar-vac', ar({
  a: 'The sound of an electric bell inside a sealed glass jar becomes fainter as the air is pumped out.',
  r: 'Sound is a wave that needs a material medium to travel.',
  key: 'a',
  sol: 'As the air is removed there are fewer particles to carry the vibrations to the glass, so the sound fades. R states why this happens, so it explains A — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('ar-comp', ar({
  a: 'The air pressure in a compression is higher than the normal pressure.',
  r: 'In a compression the air particles are crowded closer together than normal.',
  key: 'a',
  sol: 'Crowding the particles together raises the pressure, so R explains A — option (a).',
  d: 1, c: 'understanding', t: [1],
}));
add('ar-long', ar({
  a: 'Sound waves in air are longitudinal waves.',
  r: 'In a longitudinal wave the particles of the medium vibrate at right angles to the direction of travel of the wave.',
  key: 'c',
  sol: 'A is true. R is false: in a longitudinal wave the particles vibrate parallel to the direction of travel. Vibration at right angles describes a transverse wave — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('media-tf', tf({
  stem: 'Sound travels slowest in solids, faster in liquids and fastest in gases.',
  key: 'f',
  sol: 'False. Sound travels fastest in solids, slower in liquids and slowest in gases, because the particles of a solid are closest together.',
  d: 1, c: 'recall', t: [2],
}));
add('long-fill', fill({
  stem: 'Sound waves in air are called ___ waves because the particles vibrate along the direction in which the wave travels.',
  acc: [['longitudinal']],
  sol: 'They are **longitudinal** waves, made of compressions and rarefactions.',
  d: 1, c: 'recall', t: [1],
}));
add('vacuum-short', short({
  marks: 2,
  stem: 'In the bell jar experiment the sound of a ringing bell fades as the air is pumped out, although the bell can still be seen ringing. What does this show about sound?',
  model: 'It shows that sound needs a material medium to travel. As the air is removed, fewer particles are left to carry the vibrations from the bell to the glass wall, so the sound grows fainter. In a vacuum there is no medium, so sound cannot travel at all.',
  sol: 'Sound needs a medium; it cannot travel through a vacuum.',
  scheme: [['Sound needs a material medium', 1], ['Fewer particles carry the vibrations, none in a vacuum', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('longitudinal-short', short({
  marks: 2,
  stem: 'Explain what happens to the air particles when a sound wave passes through air. Name the high-pressure and low-pressure regions formed.',
  model: 'The vibrating source pushes the nearby air particles together and then moves back, so the particles are alternately crowded and spread out. The crowded high-pressure regions are compressions and the spread-out low-pressure regions are rarefactions. The particles only vibrate to and fro about their places.',
  sol: 'Compressions (high pressure) and rarefactions (low pressure); particles vibrate about fixed positions.',
  scheme: [['Compressions are crowded high-pressure regions and rarefactions are spread-out low-pressure regions', 1], ['Particles only vibrate to and fro; the wave moves on', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('wave-short3', short({
  marks: 3,
  stem: 'Describe how sound travels from a vibrating tuning fork to your ear. Name the type of wave and the two kinds of region in it.',
  model: 'The prongs of the fork vibrate and push the air near them, making a compression, and then pull back, leaving a rarefaction. These regions travel outward through the air as a wave. Sound is a longitudinal wave, because the air particles vibrate along the direction of travel. When the wave reaches the ear, the air vibrates the eardrum, and we hear the sound.',
  sol: 'Compressions and rarefactions travel as a longitudinal wave to the ear.',
  scheme: [['Vibration makes compressions and rarefactions in the air', 1], ['A longitudinal wave: particles vibrate along the direction of travel', 1], ['The wave reaches the ear and makes the eardrum vibrate', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('prod-long', long({
  stem: '(a) How is sound produced? Give two examples.\n\n(b) Describe the bell jar experiment and state what it shows.\n\n(c) Explain how a sound wave moves through air, using the terms compression and rarefaction.',
  model: 'Sound is produced by vibrating bodies, for example a plucked veena string and a struck tabla skin. In the bell jar experiment an electric bell rings inside a sealed jar. As a pump removes the air, the sound becomes fainter and it fades almost to nothing, although the bell can still be seen working. When air is let in the sound returns. This shows that sound needs a medium and cannot travel through a vacuum. In air the vibrating source pushes the particles together, forming a compression with high pressure, and then leaves a region where they are spread out, a rarefaction with low pressure. These regions travel on as a longitudinal wave.',
  sol: 'Vibration examples; bell jar and conclusion; compressions and rarefactions of a longitudinal wave.',
  scheme: [['(a) Vibrating bodies with two examples', 1], ['(b) Bell jar experiment and the conclusion that sound needs a medium', 2], ['(c) Compressions and rarefactions travelling as a longitudinal wave', 2]],
  d: 2, c: 'understanding', t: [1],
}));
add('wave-case', mk.case({
  passage: r`A student produces three notes on a musical instrument in a room where the speed of sound is 344 m s⁻¹, and measures the frequency and the wavelength of each.

| Note | Frequency (Hz) | Wavelength in air (m) |
|---|---|---|
| A | 172 | 2.0 |
| B | 344 | 1.0 |
| C | 860 | 0.40 |`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which note has the highest pitch?',
      right: 'Note C, because it has the highest frequency',
      wrong: ['Note A, because it has the longest wavelength', 'Note B, because its frequency equals the speed', 'All three, because the speed of sound is the same'],
      sol: 'Pitch depends on frequency, and note C has the greatest frequency, 860 Hz — option (@K). The speed of sound is the same for all three notes in the same air.',
      d: 2, c: 'understanding', t: [3],
    })),
    part('b', short({
      marks: 1, wl: null,
      stem: 'Use the data for note A to check the speed of sound, in m s⁻¹.',
      model: r`$v = f\lambda = 172 \times 2.0 = 344\ \text{m s}^{-1}$.`,
      sol: 'v = fλ = 344 m/s.',
      scheme: [['344 m s⁻¹', 1]],
      d: 2, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2, wl: null,
      stem: 'Find the wavelength of a note of frequency 688 Hz in the same room.',
      model: r`$\lambda = v/f = 344 / 688 = 0.50$ m.`,
      sol: 'λ = v ÷ f = 0.50 m.',
      scheme: [['Uses λ = v/f', 1], ['0.50 m', 1]],
      d: 3, c: 'application', t: [2],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'Using the table, describe how the wavelength changes when the frequency increases, and say why.',
        model: 'The wavelength becomes shorter as the frequency increases: 2.0 m at 172 Hz, 1.0 m at 344 Hz and 0.40 m at 860 Hz. The speed of sound is fixed in the same air, and since v = fλ, a larger f must go with a smaller λ.',
        sol: 'Speed is fixed, so f and λ are inversely related.',
        scheme: [['Wavelength decreases as frequency increases, with data', 1], ['Speed is constant, so f × λ is constant', 1]],
        d: 3, c: 'analysis', t: [2],
      }),
    ]),
  ],
}), () => 172 * 2 === 344 && near(344 / 688, 0.5, 1e-9) && near(344 / 860, 0.4, 1e-9) || 'wave-case');

// ---------------------------------------------------------------- t02 characteristics of sound waves
add('chk-vf', mcq({
  stem: 'A sound of frequency 172 Hz travels in air at 344 m s⁻¹. Its wavelength is:',
  right: '2.0 m',
  wrong: ['0.50 m', '516 m', '59 000 m'],
  sol: r`$\lambda = v/f = 344/172 = 2.0$ m — option (@K). (@1) divides frequency by speed, (@2) adds them and (@3) multiplies them.`,
  d: 2, c: 'application', t: [2],
}), () => 344 / 172 === 2 || 'chk-vf');
add('chk-speed', mcq({
  stem: 'A sound travels through a steel rail, through water and through air. The correct order, from the fastest to the slowest, is:',
  right: 'steel rail, water, air',
  wrong: ['air, water, steel rail', 'water, steel rail, air', 'steel rail, air, water'],
  sol: 'Sound is fastest in solids, slower in liquids and slowest in gases: about 5000 m/s in steel, about 1500 m/s in water and about 344 m/s in air — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('m-period', mcq({
  stem: 'A tuning fork vibrates 250 times in one second. Its time period is:',
  right: '0.004 s',
  wrong: ['250 s', '0.25 s', '4.0 s'],
  sol: r`$T = 1/f = 1/250 = 0.004$ s — option (@K).`,
  d: 2, c: 'application', t: [2],
}), () => near(1 / 250, 0.004, 1e-9) || 'period');
add('m-wavespeed', mcq({
  stem: 'A note of frequency 400 Hz is replaced by a note of frequency 800 Hz in the same air. The wavelength of the sound:',
  right: 'becomes half as large',
  wrong: ['becomes twice as large', 'stays the same', 'becomes four times as large'],
  sol: r`In the same air $v$ is constant, and $\lambda = v/f$. Doubling $f$ halves $\lambda$ — option (@K).`,
  d: 3, c: 'application', t: [2],
}), () => near(344 / 800 / (344 / 400), 0.5, 1e-9) || 'wavespeed');
add('m-loud', mcq({
  stem: 'A dhol player strikes the drum harder. The sound becomes louder because the amplitude of the vibration of the skin:',
  right: 'increases',
  wrong: ['decreases', 'stays the same, but the frequency increases', 'stays the same, but the wavelength decreases'],
  sol: 'Loudness depends on the amplitude of the vibration. A harder strike makes the skin vibrate with a larger amplitude — option (@K).',
  d: 1, c: 'application', t: [3],
}));
add('vfl-fill', fill({
  stem: 'The number of vibrations made per second by a vibrating body is called its ___.',
  acc: [['frequency']],
  sol: 'It is the **frequency**, measured in hertz.',
  d: 1, c: 'recall', t: [2],
}));
add('vfl-num', (() => {
  const f = 600;
  const lam = vA / f;
  return num({
    stem: r`A nadaswaram player sounds a note of frequency ${f} Hz. Taking the speed of sound in air as ${vA} m s⁻¹, find the wavelength of the sound, in m.`,
    value: p3(lam), tol: 0.003, unit: 'm',
    sol: r`$\lambda = v/f = ${vA} / ${f} = ${dec(lam, 3)}$ m.`,
    scheme: [['Uses v = fλ', 1], ['0.573 m', 1]],
    marks: 2, d: 1, c: 'application', t: [2],
  });
})(), (q) => near(344 / 600, 0.573, 0.002) && q.answer.value === 0.573 || 'vfl-num');
add('freq-num', (() => {
  const lam = 0.25;
  const f = vA / lam;
  return num({
    stem: r`A sound wave in air has a wavelength of ${lam} m. Taking the speed of sound as ${vA} m s⁻¹, find its frequency, in Hz.`,
    value: f, tol: 5, unit: 'Hz',
    sol: r`$f = v/\lambda = ${vA} / ${lam} = ${f}$ Hz.`,
    scheme: [['f = v/λ', 1], ['1376 Hz', 1]],
    marks: 2, d: 2, c: 'application', t: [2],
  });
})(), (q) => near(344 / 0.25, 1376, 1e-9) && q.answer.value === 1376 || 'freq-num');
add('count-num', (() => {
  const n = 1800, t = 5.0;
  const f = n / t;
  return num({
    stem: r`A stretched wire on a sitar makes ${n} complete vibrations in ${t.toFixed(1)} s. Find the frequency of the sound it produces, in Hz.`,
    value: f, tol: 1, unit: 'Hz',
    sol: r`Frequency $=$ number of vibrations $\div$ time $= ${n} / ${t} = ${f}$ Hz. (The time period is $1/${f} = ${dec(1 / f, 3)}$ s.)`,
    scheme: [['f = number ÷ time', 1], ['360 Hz', 1]],
    marks: 2, d: 1, c: 'application', t: [2],
  });
})(), (q) => 1800 / 5 === 360 && q.answer.value === 360 || 'count-num');
add('rail-num', (() => {
  const L = 250;
  const tS = L / vS;
  const tA = L / vA;
  const dt = tA - tS;
  return num({
    stem: r`A steel rail is ${L} m long. A man strikes one end with a hammer and a girl at the other end hears the sound twice, once through the rail and once through the air. Taking ${vS} m s⁻¹ in steel and ${vA} m s⁻¹ in air, find the time gap between the two sounds, in s.`,
    value: p3(dt), tol: 0.01, unit: 's',
    sol: r`Time in steel $= ${L}/${vS} = ${dec(tS, 3)}$ s. Time in air $= ${L}/${vA} = ${dec(tA, 3)}$ s. The gap is $${dec(tA, 4)} - ${dec(tS, 3)} = ${dec(dt, 3)}$ s.`,
    scheme: [['Times 0.050 s in steel and 0.727 s in air', 1], ['Gap ≈ 0.68 s', 1]],
    marks: 2, d: 4, c: 'application', t: [2],
  });
})(), (q) => near(250 / 344 - 250 / 5000, 0.6767, 0.001) && q.answer.value === 0.677 || 'rail-num');
add('thunder-num', (() => {
  const t = 8.0;
  const d = (vA * t) / 1000;
  return num({
    stem: r`In Mumbai, thunder is heard ${t.toFixed(1)} s after a flash of lightning is seen. Taking the speed of sound as ${vA} m s⁻¹ and ignoring the time taken by light, find the distance of the lightning, in km.`,
    value: p3(d), tol: 0.01, unit: 'km',
    sol: r`Distance $= vt = ${vA} \times ${t.toFixed(1)} = ${vA * t}$ m $= ${dec(d, 3)}$ km.`,
    scheme: [['d = v t = 2752 m', 1], ['2.75 km', 1]],
    marks: 2, d: 2, c: 'application', t: [2],
  });
})(), (q) => 344 * 8 === 2752 && q.answer.value === 2.75 || 'thunder-num');
add('vfl-short', short({
  marks: 2,
  stem: 'Define the time period of a wave. A sound has a frequency of 250 Hz. Write its time period and say what the wave does in one time period.',
  model: r`The time period is the time taken for one complete vibration. For a frequency of 250 Hz it is $T = 1/f = 1/250 = 0.004$ s. In one time period the wave moves forward by a distance of one wavelength.`,
  sol: 'T = 1/f = 0.004 s; the wave moves one wavelength.',
  scheme: [['Definition and T = 0.004 s', 1], ['The wave advances one wavelength in one period', 1]],
  d: 2, c: 'application', t: [2],
}));
add('vfl-long', long({
  stem: '(a) Define frequency, time period, amplitude and wavelength of a sound wave.\n\n(b) Derive the relation v = fλ.\n\n(c) A sound of frequency 500 Hz travels in air (344 m s⁻¹) and in steel (5000 m s⁻¹). Find its wavelength in each.',
  model: (() => {
    const f = 500;
    return r`Frequency is the number of vibrations per second. The time period is the time for one vibration, $T = 1/f$. The amplitude is the largest displacement from the mean position. The wavelength is the distance between two successive compressions or rarefactions. In one time period the wave moves one wavelength, so $v = \lambda/T = f\lambda$. In (c) the frequency stays the same, so in air $\lambda = ${vA}/${f} = ${dec(vA / f, 3)}$ m and in steel $\lambda = ${vS}/${f} = ${vS / f}$ m.`;
  })(),
  sol: 'Four definitions; v = λ/T = fλ; 0.688 m in air and 10 m in steel.',
  scheme: [['(a) Four definitions', 2], ['(b) One period gives one wavelength, so v = fλ', 1.5], ['(c) 0.688 m in air and 10 m in steel', 1.5]],
  d: 3, c: 'application', t: [2],
}), () => near(344 / 500, 0.688, 1e-9) && 5000 / 500 === 10 || 'vfl-long');

// ---------------------------------------------------------------- t03 human perception of sound
add('chk-range', mcq({
  stem: 'Which of these sounds is in the audible range of a healthy human ear?',
  right: 'a note of frequency 3000 Hz',
  wrong: ['a sound of frequency 10 Hz', 'a dog-whistle sound of frequency 25 000 Hz', 'a bat squeak of frequency 50 000 Hz'],
  sol: 'The audible range is about 20 Hz to 20 kHz. Only 3000 Hz lies inside it — option (@K). 10 Hz is infrasound; 25 kHz and 50 kHz are ultrasound.',
  d: 1, c: 'application', t: [3],
}));
add('m-pitch', mcq({
  stem: 'A thin veena string gives a higher note than a thick string of the same length. The thin string:',
  right: 'vibrates with a higher frequency',
  wrong: ['vibrates with a larger amplitude', 'produces a sound of greater speed', 'vibrates with a longer time period'],
  sol: 'Pitch depends on frequency. The thinner string vibrates faster, so its frequency is higher and its time period is shorter — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('m-quality', mcq({
  stem: 'A harmonium and a flute play the same note at the same loudness. A listener can still tell them apart because of the difference in their:',
  right: 'quality, since the mixtures of overtones are different',
  wrong: ['pitch, since the frequencies are different', 'loudness, since the amplitudes are different', 'speed, since the waves travel at different speeds'],
  sol: 'The pitch (frequency) and loudness (amplitude) are the same. The quality, which depends on the overtones present, is different — option (@K). The speed in the same air is the same.',
  d: 2, c: 'application', t: [3],
}));
add('m-infra', mcq({
  stem: 'A sound of frequency 12 Hz is:',
  right: 'infrasound, which a human cannot hear',
  wrong: ['ultrasound, which a human cannot hear', 'audible, but very loud', 'audible, but very faint'],
  sol: 'The audible range begins at about 20 Hz. A frequency below this is infrasound — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('m-ultra', mcq({
  stem: 'A sound of frequency 30 kHz is called:',
  right: 'ultrasound',
  wrong: ['infrasound', 'audible sound', 'a shock wave'],
  sol: 'Sound above about 20 kHz is ultrasound — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('ar-infra', ar({
  a: 'A sound of frequency 15 Hz cannot be heard by a human being.',
  r: 'A sound of frequency 15 Hz is ultrasound, whose frequency is higher than 20 kHz.',
  key: 'c',
  sol: 'A is true because 15 Hz is below the audible range. R is false: 15 Hz is infrasound; ultrasound is above 20 kHz — option (c).',
  d: 2, c: 'understanding', t: [3],
}));
add('ar-sonar', ar({
  a: 'Ultrasound is used in sonar to find the depth of the sea.',
  r: 'Ultrasound is sound of frequency above about 20 kHz.',
  key: 'b',
  sol: 'Both statements are true, but R only defines ultrasound. It does not explain why it is used for sonar, which is that its short wavelength allows narrow beams that reflect well — option (b).',
  d: 3, c: 'analysis', t: [3],
}));
add('loud-tf', tf({
  stem: 'The loudness of a sound depends on the frequency of the vibration and not on its amplitude.',
  key: 'f',
  sol: 'False. Loudness depends on the amplitude of the vibration. The frequency decides the pitch.',
  d: 1, c: 'understanding', t: [3],
}));
add('pitch-match', match({
  stem: 'Match each quantity (Column A) with what it depends on or equals (Column B).',
  pairs: [
    ['Pitch of a sound', 'Frequency of the vibration'],
    ['Loudness of a sound', 'Amplitude of the vibration'],
    ['Quality of a sound', 'The mixture of overtones present'],
    ['Speed of a wave', 'Frequency multiplied by wavelength'],
  ],
  order: [0, 1, 2, 3],
  sol: 'Pitch goes with frequency, loudness with amplitude, quality with overtones, and speed equals fλ.',
  d: 2, c: 'understanding', t: [3, 2],
}));
add('ultra-fill', fill({
  stem: 'Sound waves of frequency higher than 20 kHz are called ___.',
  acc: [['ultrasound', 'ultrasonic']],
  sol: 'They are **ultrasound** (ultrasonic waves).',
  d: 1, c: 'recall', t: [3],
}));
add('pitch-short', short({
  marks: 2,
  stem: 'A sitar player plucks a string gently and then plucks it harder. What changes in the sound and what stays the same? Name the quantity responsible for each.',
  model: 'The harder pluck makes the string vibrate with a larger amplitude, so the sound becomes louder. The frequency of the string does not change, so the pitch of the note stays the same. Loudness depends on the amplitude and pitch depends on the frequency.',
  sol: 'Loudness (amplitude) increases; pitch (frequency) is unchanged.',
  scheme: [['Louder sound because the amplitude increases', 1], ['Pitch is unchanged because the frequency is unchanged', 1]],
  d: 2, c: 'application', t: [3],
}));
add('range-short3', short({
  marks: 3,
  stem: 'State the audible range of the human ear. What are infrasound and ultrasound? Give one animal that uses each.',
  model: 'The audible range of a human ear is about 20 Hz to 20 kHz. Sound with a frequency below 20 Hz is called infrasound, and sound above 20 kHz is called ultrasound. Humans cannot hear either. Elephants and whales use infrasound to call over long distances, and bats and dolphins use ultrasound to find objects by echoes.',
  sol: 'About 20 Hz to 20 kHz; infrasound below, ultrasound above; examples of animals.',
  scheme: [['Audible range about 20 Hz to 20 kHz', 1], ['Infrasound is below and ultrasound is above this range', 1], ['One animal for each', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('ultra-uses-short3', short({
  marks: 3,
  stem: 'Give three uses of ultrasound and explain briefly why ultrasound is suited to one of them.',
  model: 'Ultrasound is used in sonar to find the depth of the sea, in medical scans to take pictures of organs, and to clean delicate parts such as watch parts or jewellery. In scans and sonar its very short wavelength lets it form a narrow beam, and it reflects from small boundaries, so the echoes give a clear picture.',
  sol: 'Three uses; short wavelength gives narrow beams and clear echoes.',
  scheme: [['Three correct uses', 1.5], ['Reason: short wavelength gives a narrow beam that reflects from small objects', 1.5]],
  d: 2, c: 'understanding', t: [3],
}));
add('perception-long', long({
  stem: '(a) Name the three characteristics of a musical sound and state what each depends on.\n\n(b) Give the audible range of the human ear and define infrasound and ultrasound.\n\n(c) Say whether a human can hear a sound of 15 Hz, one of 3000 Hz and one of 40 kHz, and name each.',
  model: 'The three characteristics are pitch, loudness and quality. Pitch depends on the frequency of the vibration, loudness depends on its amplitude, and quality depends on the overtones present. The audible range of the human ear is about 20 Hz to 20 kHz. Sound below 20 Hz is infrasound and sound above 20 kHz is ultrasound. A sound of 15 Hz is infrasound and cannot be heard. A sound of 3000 Hz is audible. A sound of 40 kHz is ultrasound and cannot be heard.',
  sol: 'Pitch, loudness, quality and their causes; audible range; classification of the three sounds.',
  scheme: [['(a) Pitch, loudness and quality with what each depends on', 2], ['(b) Audible range and definitions of infrasound and ultrasound', 1.5], ['(c) 15 Hz infrasound, 3000 Hz audible, 40 kHz ultrasound', 1.5]],
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 reflection, echo, echolocation, Raman
add('chk-echo', mcq({
  stem: 'A boy stands 8 m from a high brick wall and claps once. Taking the speed of sound as 344 m s⁻¹, which statement is correct?',
  right: 'The echo returns after about 0.05 s, so it merges with the clap and is not heard separately',
  wrong: ['A distinct echo is heard after about 0.5 s', 'A distinct echo is heard after about 0.1 s', 'No sound is reflected, because the wall is too close'],
  sol: r`The sound travels $2 \times 8 = 16$ m there and back in $16/344 \approx 0.047$ s, which is less than 0.1 s. The echo is not heard separately — option (@K). The wall does reflect the sound, so (@3) is wrong.`,
  d: 3, c: 'application', t: [4],
}), () => near(16 / 344, 0.0465, 0.01) || 'chk-echo');
add('chk-bat', mcq({
  stem: 'A bat can fly through a dark cave without hitting the walls because it:',
  right: 'sends out ultrasound squeaks and senses their echoes',
  wrong: ['sees the walls with very sensitive eyes', 'senses the heat given out by the walls', 'sends out infrasound that passes through the walls'],
  sol: 'A bat uses echolocation: it emits ultrasound squeaks and the time and direction of the returning echoes tell it where the walls are — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('m-echo', mcq({
  stem: 'In air, where the speed of sound is 344 m s⁻¹, the least distance of a reflecting wall for hearing a distinct echo is about:',
  right: '17 m',
  wrong: ['34 m', '3.4 m', '170 m'],
  sol: r`The echo must arrive at least 0.1 s later. The sound goes to the wall and back, so $d = vt/2 = 344 \times 0.1 / 2 = 17.2$ m, about 17 m — option (@K). (@1) forgets to divide by 2.`,
  d: 2, c: 'application', t: [4],
}), () => near((344 * 0.1) / 2, 17.2, 1e-9) || 'm-echo');
add('m-reflect', mcq({
  stem: 'Which of these surfaces will give the clearest echo of a clap?',
  right: 'a large, flat stone wall',
  wrong: ['a thick velvet curtain', 'a stack of cotton bales', 'a row of small bushes'],
  sol: 'A large, hard, smooth surface reflects sound well. Soft or uneven materials such as curtains, cotton and bushes absorb or scatter it — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('m-reverb', mcq({
  stem: 'Curtains and perforated boards are fixed to the walls of a cinema hall mainly to reduce:',
  right: 'reverberation, by absorbing sound',
  wrong: ['the speed of sound, by cooling the air', 'the frequency of the sound, by making it deeper', 'the amplitude of the film soundtrack, so that nobody hears it'],
  sol: 'Repeated reflections make sound linger and blur speech. Soft or perforated surfaces absorb sound and reduce this reverberation — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('m-raman', mcq({
  stem: 'C. V. Raman studied the sound of the tabla and the mridangam. He found that their overtones are:',
  right: 'harmonic, whole-number multiples of the lowest frequency',
  wrong: ['random and unrelated to the lowest frequency', 'all lower than the lowest frequency', 'absent, so they produce only a single frequency'],
  sol: 'Raman showed that the loaded skins of these drums give overtones that are harmonic, with frequencies in whole-number ratios to the lowest frequency, which gives a clear musical note — option (@K).',
  d: 2, c: 'recall', t: [4],
}));
add('ar-echo', ar({
  a: 'A distinct echo is heard when a person claps 5 m away from a wall in air.',
  r: 'The reflected sound must reach the ear at least 0.1 s after the original sound to be heard separately.',
  key: 'd',
  sol: 'A is false: at 5 m the sound returns in about 0.03 s, which is too soon to be heard separately. R is true and is the reason that A fails — option (d).',
  d: 4, c: 'analysis', t: [4],
}));
add('bat-tf', tf({
  stem: 'A bat finds a moth in the dark by sending out ultrasound squeaks and sensing the echoes from the moth.',
  key: 't',
  sol: 'True. This is echolocation: the delay and direction of the echo tell the bat where the moth is.',
  d: 1, c: 'understanding', t: [4],
}));
add('use-match', match({
  stem: 'Match each situation (Column A) with the idea that explains it (Column B).',
  pairs: [
    ['A bat flies through a dark cave without touching the walls', 'Echolocation'],
    ['A fishing boat finds the depth of the sea with ultrasound pulses', 'Sonar'],
    ['Speech sounds blurred in a large empty hall with bare walls', 'Reverberation'],
    ['An elephant calls to a herd several kilometres away', 'Infrasound'],
  ],
  order: [0, 1, 2, 3],
  sol: 'Bats use echolocation, boats use sonar, repeated reflections cause reverberation, and elephants use infrasound.',
  d: 2, c: 'understanding', t: [4, 3],
}));
add('echo-num', (() => {
  const t = 1.6;
  const d = (vA * t) / 2;
  return num({
    stem: r`A trekker shouts towards a cliff in the Western Ghats and hears the echo ${t.toFixed(1)} s later. Taking the speed of sound as ${vA} m s⁻¹, find the distance of the cliff, in m.`,
    value: d, tol: 1, unit: 'm',
    sol: r`The sound travels to the cliff and back: $2d = vt = ${vA} \times ${t.toFixed(1)} = ${dec(vA * t, 4)}$ m, so $d = ${dec(d, 4)}$ m.`,
    scheme: [['2d = vt = 550.4 m', 1], ['d = 275 m', 1]],
    marks: 2, d: 2, c: 'application', t: [4],
  });
})(), (q) => near((344 * 1.6) / 2, 275.2, 1e-9) && q.answer.value === 275.2 || 'echo-num');
add('sonar-num', (() => {
  const t = 0.9;
  const d = (vW * t) / 2;
  return num({
    stem: r`The echo-sounder of a research boat in the Bay of Bengal receives the echo of its ultrasound pulse from the sea bed ${t.toFixed(2)} s after sending it. Taking the speed of sound in sea water as ${vW} m s⁻¹, find the depth of the sea, in m.`,
    value: d, tol: 1, unit: 'm',
    sol: r`$2d = vt = ${vW} \times ${t.toFixed(2)} = ${vW * t}$ m, so $d = ${d}$ m.`,
    scheme: [['2d = vt = 1350 m', 1], ['d = 675 m', 1]],
    marks: 2, d: 2, c: 'application', t: [4],
  });
})(), (q) => near((1500 * 0.9) / 2, 675, 1e-9) && q.answer.value === 675 || 'sonar-num');
add('ultra-num', (() => {
  const f = 25000;
  const mm = (vA / f) * 1000;
  return num({
    stem: r`A dog whistle gives out ultrasound of frequency ${f / 1000} kHz. Taking the speed of sound in air as ${vA} m s⁻¹, find the wavelength of this sound, in mm.`,
    value: p3(mm), tol: 0.1, unit: 'mm',
    sol: r`$f = ${f}$ Hz. $\lambda = v/f = ${vA} / ${f} = ${dec(vA / f, 4)}$ m $= ${dec(mm, 4)}$ mm, about 13.8 mm.`,
    scheme: [['λ = v/f with f in Hz', 1], ['≈ 13.8 mm', 1]],
    marks: 2, d: 4, c: 'application', t: [4, 3],
  });
})(), (q) => near((344 / 25000) * 1000, 13.76, 1e-9) && q.answer.value === 13.8 || 'ultra-num');
add('speed-echo-num', (() => {
  const d = 86, t = 0.5;
  const v = (2 * d) / t;
  return num({
    stem: r`A student stands ${d} m from a tall wall, claps, and hears the echo ${t.toFixed(2)} s later. Find the speed of sound in air from these readings, in m s⁻¹.`,
    value: v, tol: 1, unit: 'm s⁻¹',
    sol: r`The distance travelled is there and back, $2d = 2 \times ${d} = ${2 * d}$ m. $v = ${2 * d} / ${t} = ${v}$ m s⁻¹.`,
    scheme: [['Total distance 2d = 172 m', 1], ['v = 344 m s⁻¹', 1]],
    marks: 2, d: 3, c: 'application', t: [4],
  });
})(), (q) => (2 * 86) / 0.5 === 344 && q.answer.value === 344 || 'speed-echo-num');
add('echo-short', short({
  marks: 2,
  stem: 'A girl claps inside a small bathroom and hears no separate echo. Explain why, using the time taken for the sound to return.',
  model: 'The walls of a small room are only a metre or two away, so the reflected sound returns in a few hundredths of a second. The ear cannot separate sounds that arrive less than about 0.1 s apart, so the reflected sound merges with the clap and no distinct echo is heard.',
  sol: 'Sound returns in under 0.1 s, so it merges with the original.',
  scheme: [['The reflected sound returns in much less than 0.1 s', 1], ['It merges with the original sound, so no separate echo is heard', 1]],
  d: 2, c: 'application', t: [4],
}));
add('sonar-short', short({
  marks: 2,
  stem: 'Explain how a ship finds the depth of the sea below it using sonar, and why the time of the echo is divided by two.',
  model: 'A transmitter on the ship sends a pulse of ultrasound down to the sea bed, and a detector receives the echo. The sound travels to the bottom and back, so the distance travelled is twice the depth. The depth is therefore the speed of sound in water multiplied by the time, divided by two.',
  sol: 'Echo time gives 2d = vt, so d = vt/2.',
  scheme: [['Pulse sent to the sea bed and echo timed', 1], ['Distance travelled is 2d, so d = vt/2', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('reverb-short', short({
  marks: 2,
  stem: 'What is reverberation? Name two things that can be used in an auditorium to reduce it.',
  model: 'Reverberation is the lingering of a sound in a large hall because it is reflected many times from the walls and ceiling, which blurs speech and music. It can be reduced by fixing curtains, carpets, cushioned seats or perforated boards, which absorb sound.',
  sol: 'Repeated reflections make sound linger; soft absorbers reduce it.',
  scheme: [['Reverberation is persistence of sound from repeated reflections', 1], ['Two absorbers such as curtains and carpets', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('bat-short3', short({
  marks: 3,
  stem: 'Explain how bats use echolocation to catch insects in the dark. How is this idea used in sonar?',
  model: 'A bat sends out a stream of ultrasound squeaks. When a squeak hits a moth, it is reflected, and the bat’s ears receive the echo. The time taken and the direction of the echo tell the bat how far away the moth is and where it is. Sonar uses the same idea: a ship sends out an ultrasound pulse and times its echo to find depth.',
  sol: 'Ultrasound squeak, echo timing and direction; sonar uses the same principle.',
  scheme: [['Bat emits ultrasound squeaks that reflect from the insect', 1], ['Delay and direction of the echo locate the insect', 1], ['Sonar uses the echo of ultrasound to find depth or objects', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('raman-short3', short({
  marks: 3,
  stem: 'What did C. V. Raman find about the sound of Indian drums such as the tabla and the mridangam? Why do they give a clear musical note?',
  model: 'C. V. Raman studied the tabla and the mridangam. He showed that the thick circular patch of paste on the skin of these drums makes their overtones harmonic, which means that they are whole-number multiples of the lowest frequency. Because the overtones fit neatly with the main note in this way, these drums give a clear musical note, unlike most simple drums.',
  sol: 'Loaded skins give harmonic overtones, so the note is clear.',
  scheme: [['Studied the tabla and mridangam', 1], ['The loaded skin gives harmonic overtones, whole-number multiples of the lowest frequency', 1], ['So the drums give a clear musical note', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('echo-long', long({
  stem: '(a) What is an echo? State the condition for hearing a distinct echo.\n\n(b) Show that the least distance of a reflecting surface for a distinct echo in air is about 17 m (speed of sound 344 m s⁻¹).\n\n(c) A hiker shouts towards a cliff and hears the echo 2.5 s later. Find the distance of the cliff.',
  model: (() => {
    const t = 2.5;
    return r`An echo is a sound heard again after it is reflected from a surface. The sensation of a sound stays in the ear for about 0.1 s, so the reflected sound must reach the ear at least 0.1 s after the original to be heard separately. In (b) the sound goes to the surface and back in 0.1 s, so $2d = vt = ${vA} \times 0.1 = ${dec(vA * 0.1, 3)}$ m and $d = ${dec((vA * 0.1) / 2, 3)}$ m, about 17 m. In (c) the sound goes to the cliff and back in ${t} s: $2d = ${vA} \times ${t} = ${vA * t}$ m, so $d = ${(vA * t) / 2}$ m.`;
  })(),
  sol: 'Echo and the 0.1 s condition; d = 17.2 m; cliff at 430 m.',
  scheme: [['(a) Echo defined and the 0.1 s condition', 1.5], ['(b) 2d = 34.4 m, d = 17.2 m', 1.5], ['(c) 2d = 860 m, d = 430 m', 2]],
  d: 3, c: 'application', t: [4],
}), () => near((344 * 0.1) / 2, 17.2, 1e-9) && (344 * 2.5) / 2 === 430 || 'echo-long');
add('ultra-long', long({
  stem: '(a) What is ultrasound? Give two uses of it.\n\n(b) Describe how sonar finds the depth of the sea.\n\n(c) An echo is received 0.60 s after the pulse is sent. Taking the speed of sound in sea water as 1500 m s⁻¹, find the depth.',
  model: (() => {
    const t = 0.6;
    return r`Ultrasound is sound of frequency higher than about 20 kHz, which humans cannot hear. It is used in medical scans to image organs and to clean delicate parts. In sonar a transmitter on a ship sends a pulse of ultrasound towards the sea bed. The pulse is reflected, and a detector receives the echo and measures the time taken. The sound goes down and back, so the depth is $d = vt/2$. In (c), $d = ${vW} \times ${t} / 2 = ${(vW * t) / 2}$ m.`;
  })(),
  sol: 'Ultrasound and two uses; sonar procedure; depth 450 m.',
  scheme: [['(a) Definition and two uses', 1.5], ['(b) Pulse, echo, timing and d = vt/2', 2], ['(c) d = 450 m', 1.5]],
  d: 3, c: 'application', t: [4, 3],
}), () => near((1500 * 0.6) / 2, 450, 1e-9) || 'ultra-long');
add('sonar-case', mk.case({
  passage: r`An echo-sounder on a fishing boat sends an ultrasound pulse to the sea bed at three places and records the time for the echo to return. The speed of sound in sea water is taken as 1500 m s⁻¹.

| Place | Echo time (s) |
|---|---|
| P | 0.40 |
| Q | 1.10 |
| R | 2.00 |`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The sea is deepest at:',
      right: 'place R, because its echo takes the longest',
      wrong: ['place P, because its echo is the quickest', 'place Q, because 1.10 s is the middle reading', 'all three places, because the speed of sound is the same'],
      sol: 'The depth is $d = vt/2$ and $v$ is the same, so the longest echo time means the greatest depth. That is place R — option (@K).',
      d: 2, c: 'application', t: [4],
    })),
    part('b', short({
      marks: 1, wl: null,
      stem: 'Find the depth at place P, in m.',
      model: r`$d = vt/2 = 1500 \times 0.40 / 2 = 300$ m.`,
      sol: 'd = vt/2 = 300 m.',
      scheme: [['300 m', 1]],
      d: 2, c: 'application', t: [4],
    })),
    part('c', short({
      marks: 2, wl: null,
      stem: 'Find the depth at place Q and explain why the time is divided by 2.',
      model: r`$d = 1500 \times 1.10 / 2 = 825$ m. The sound travels to the sea bed and back, so the distance covered is twice the depth.`,
      sol: 'd = 825 m; the sound makes a round trip.',
      scheme: [['d = 825 m', 1], ['The sound goes down and back, so the distance is twice the depth', 1]],
      d: 3, c: 'application', t: [4],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'Give two reasons why sonar uses ultrasound and not a sound that we can hear.',
        model: 'Ultrasound has a short wavelength, so it can be sent as a narrow beam that is reflected well by the sea bed and small objects. It is also not heard by people or disturbing to them on the boat.',
        sol: 'Short wavelength, narrow beam; not audible to people.',
        scheme: [['Short wavelength gives a narrow beam and good reflection', 1], ['It is above the audible range, so it does not disturb people', 1]],
        d: 3, c: 'evaluation', t: [3, 4],
      }),
    ]),
  ],
}), () => (1500 * 0.4) / 2 === 300 && near((1500 * 1.1) / 2, 825, 1e-9) && (1500 * 2) / 2 === 1500 || 'sonar-case');
add('hall-case', mk.case({
  passage: r`The back wall of a school hall in Bengaluru is 30 m from the stage. A teacher on the stage claps once and the students hear the clap and then, a little later, a second sound. The speed of sound in the hall is 344 m s⁻¹.`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The second sound heard by the students is best described as:',
      right: 'an echo from the back wall, heard separately because it arrives more than 0.1 s later',
      wrong: ['an echo from the back wall, which is not heard separately', 'a new sound produced by the hands of the teacher', 'ultrasound reflected by the ceiling'],
      sol: r`The sound travels $2 \times 30 = 60$ m and returns after $60/344 \approx 0.17$ s, which is more than 0.1 s, so it is a distinct echo — option (@K).`,
      d: 2, c: 'application', t: [4],
    })),
    part('b', short({
      marks: 1, wl: null,
      stem: 'Find the time after the clap at which the echo is heard, in s.',
      model: r`$t = 2d/v = 60 / 344 \approx 0.17$ s.`,
      sol: 't = 2d/v ≈ 0.17 s.',
      scheme: [['0.17 s', 1]],
      d: 2, c: 'application', t: [4],
    })),
    part('c', short({
      marks: 2, wl: null,
      stem: 'Find the shortest distance of the wall from the stage for which a distinct echo would be heard.',
      model: r`The echo needs at least 0.1 s, so $d = vt/2 = 344 \times 0.1 / 2 = 17.2$ m. The wall at 30 m is farther than this, so an echo is heard.`,
      sol: 'd = vt/2 = 17.2 m.',
      scheme: [['Uses t = 0.1 s and d = vt/2', 1], ['17.2 m, so a wall at 30 m gives an echo', 1]],
      d: 3, c: 'application', t: [4],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'Suggest two changes to the hall that would reduce the echo and reverberation, and give the reason for each.',
        model: 'Fix thick curtains or soft panels on the back wall, because soft materials absorb sound instead of reflecting it. Cover the floor with carpets and use cushioned seats for the same reason, which reduces repeated reflections.',
        sol: 'Soft absorbers on the walls and floor.',
        scheme: [['A suitable change such as curtains or panels', 1], ['A reason: soft materials absorb sound', 1]],
        d: 3, c: 'evaluation', t: [4],
      }),
    ]),
  ],
}), () => near(60 / 344, 0.1744, 0.001) && near((344 * 0.1) / 2, 17.2, 1e-9) || 'hall-case');
add('drum-case', mk.case({
  passage: r`A physics club records the sound of a tabla. The lowest frequency, the fundamental, is 250 Hz (a given, illustrative value). The overtones are found at 500 Hz, 750 Hz and 1000 Hz. The speed of sound in the room is 344 m s⁻¹.`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'These overtones are called harmonic because they are:',
      right: 'whole-number multiples of the lowest frequency',
      wrong: ['all lower than the lowest frequency', 'unrelated to the lowest frequency', 'equal to the lowest frequency'],
      sol: 'The overtones 500, 750 and 1000 Hz are 2, 3 and 4 times 250 Hz, so they are whole-number multiples of the lowest frequency — option (@K).',
      d: 2, c: 'application', t: [4],
    })),
    part('b', short({
      marks: 1, wl: null,
      stem: 'How many times the lowest frequency is the overtone of 1000 Hz?',
      model: r`$1000 / 250 = 4$ times.`,
      sol: '1000 ÷ 250 = 4.',
      scheme: [['4 times', 1]],
      d: 2, c: 'application', t: [4],
    })),
    part('c', short({
      marks: 2, wl: null,
      stem: 'Find the wavelength in air of the lowest frequency, in m.',
      model: r`$\lambda = v/f = 344 / 250 = 1.376$ m, about 1.4 m.`,
      sol: 'λ = v/f ≈ 1.4 m.',
      scheme: [['Uses λ = v/f', 1], ['≈ 1.4 m (1.376 m)', 1]],
      d: 3, c: 'application', t: [2, 4],
    }), [
      short({
        marks: 2,
        stem: 'State what C. V. Raman discovered about the tabla and the mridangam.',
        model: 'C. V. Raman studied these Indian drums and showed that the thick circular patch of paste on their skins makes the overtones harmonic, that is, whole-number multiples of the lowest frequency, so that the drums give a clear musical note.',
        sol: 'Loaded skin gives harmonic overtones.',
        scheme: [['Studied the tabla and mridangam; loaded skin', 1], ['Overtones are harmonic, giving a clear note', 1]],
        d: 2, c: 'understanding', t: [4],
      }),
    ]),
  ],
}), () => 1000 / 250 === 4 && near(344 / 250, 1.376, 1e-9) || 'drum-case');
