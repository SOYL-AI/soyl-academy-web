// ICSE 10 Physics ch06 Spectrum — question bank (ICSE 2027 specimen style).
// Every numerical value is computed here (c = f lambda, v = c / mu, scattering proportional to 1 / lambda^4) and asserted by a
// re-solve check. MCQ keys are placed by the builder.
import { mk, add, r, near } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const f3 = (x, n = 3) => String(Number(x.toPrecision(n)));
const c = 3e8;

// ---------------------------------------------------------------- t01 dispersion
add('disp-mcq', mcq({
  stem: 'A narrow beam of white light passes through a glass prism standing on its base, and falls on a screen. Which colour appears nearest the base end of the spectrum?',
  right: 'Violet',
  wrong: ['Red', 'Yellow', 'Green'],
  sol: 'Violet has the largest refractive index in glass, so it is bent most towards the base — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('cause-mcq', mcq({
  stem: 'White light is split into colours by a glass prism because:',
  right: 'glass has a slightly different refractive index for each colour',
  wrong: ['the prism adds colours to the white light', 'the colours travel at different speeds in vacuum', 'the prism reflects some colours and absorbs others'],
  sol: 'Each colour travels at a different speed in glass, so each is refracted by a different amount — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('speed-mcq', mcq({
  stem: 'Inside a block of glass, which colour of light travels fastest?',
  right: 'Red',
  wrong: ['Violet', 'Blue', 'All colours travel at the same speed in glass'],
  sol: 'Red has the smallest refractive index in glass, so it is the fastest there — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('devorder-mcq', mcq({
  stem: 'A ray of yellow light and a ray of blue light enter a glass prism along exactly the same path. Which statement is correct?',
  right: 'The blue ray is deviated more, because glass has a larger refractive index for blue light',
  wrong: ['The yellow ray is deviated more, because yellow has a longer wavelength', 'Both are deviated equally, because they enter along the same path', 'The blue ray is deviated less, because it travels faster in glass'],
  sol: 'Shorter wavelength → larger μ in glass → larger deviation — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('sodium-mcq', mcq({
  stem: 'Light from a sodium vapour street lamp is passed through a glass prism. On the screen, Nidhi sees:',
  right: 'a single yellow patch, shifted towards the base, but no band of colours',
  wrong: ['the full band of seven colours', 'a white patch', 'two patches, one red and one violet'],
  sol: 'Sodium light is (nearly) monochromatic: it is deviated but not dispersed — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('disp-tf', tf({
  stem: 'In a glass prism, red light is deviated more than violet light.',
  key: 'f',
  sol: 'False: violet is deviated most and red least.',
  d: 1, c: 'recall', t: [1],
}));
add('disp-fill', fill({
  stem: 'The splitting of white light into its constituent colours by a prism is called ___.',
  acc: [['dispersion']],
  sol: '**Dispersion**.',
  d: 1, c: 'recall', t: [1],
}));
add('disp-ar', ar({
  a: 'Violet light is deviated more than red light by a glass prism.',
  r: 'The refractive index of glass is greater for violet light than for red light.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('mono-ar', ar({
  a: 'All the colours of white light travel at the same speed in vacuum.',
  r: 'White light is split into colours when it passes through a glass prism.',
  key: 'b',
  sol: 'Both statements are true, but R does not explain A — option (b).',
  d: 3, c: 'analysis', t: [1, 2],
}));
const vV = c / 1.532;
add('violet-num', num({
  stem: 'The refractive index of a crown glass for violet light is 1.532. Find the speed of violet light in this glass, in units of 10⁸ m/s, to three significant figures.',
  value: Number(f3(vV / 1e8)), tol: 0.01, unit: '× 10⁸ m/s',
  sol: r`$v = \dfrac{c}{\mu} = \dfrac{3.0 \times 10^{8}}{1.532} = 1.96 \times 10^{8}$ m/s, so in units of $10^{8}$ m/s the speed is $\dfrac{3.0}{1.532} = 1.96$.`,
  scheme: [['1.96', 1]],
  d: 2, c: 'application', t: [1],
}), () => near(vV, 1.958e8, 0.001) || 'v');
const spread = 41.9 - 39.6;
add('spread-num', num({
  stem: 'A prism of flint glass deviates red light by 39.6° and violet light by 41.9°. Find the angle, in degrees, between the emergent red and violet rays (the angular spread of the spectrum).',
  value: Number(spread.toFixed(1)), tol: 0.01, unit: '°',
  sol: r`Angular spread $= \delta_{violet} - \delta_{red} = 41.9 - 39.6 = 2.3$, that is $2.3^\circ$.`,
  scheme: [['2.3°', 1]],
  d: 2, c: 'application', t: [1],
}), () => near(spread, 2.3, 1e-9) || 'spread');
add('order-short1', short({
  marks: 1,
  stem: 'Write the seven colours of the visible spectrum in order of increasing wavelength.',
  model: 'Violet, indigo, blue, green, yellow, orange, red.',
  sol: 'VIBGYOR.',
  scheme: [['Correct order', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('recomb-short2', short({
  marks: 2,
  stem: 'Dhruv makes a spectrum with one glass prism and wants to turn it back into white light using a second, identical prism. How should he place the second prism, and why does this work?',
  model: 'He should place the second prism close to the first but upside down (inverted, with its base on the side of the first prism’s apex). It deviates each colour by the same amount in the opposite direction, so all the colours come out together along one path and mix to give white light.',
  sol: 'Inverted second prism; opposite deviation.',
  scheme: [['Arrangement', 1], ['Reason', 1]],
  d: 2, c: 'application', t: [1],
}));
add('cause-short2', short({
  marks: 2,
  stem: 'Explain why a glass prism splits white light into colours, while a single colour such as pure red light is only bent, not split.',
  model: 'White light is a mixture of colours, and glass has a different refractive index for each colour (largest for violet, smallest for red), so each colour is bent through a different angle and they separate. Pure red light has only one wavelength, so there is nothing to separate; it is simply deviated.',
  sol: 'μ depends on colour; monochromatic light.',
  scheme: [['Cause of dispersion', 1], ['Monochromatic light not split', 1]],
  d: 2, c: 'understanding', t: [1],
}));
const vR3 = c / 1.513;
const vV3 = c / 1.532;
add('glass-short3', short({
  marks: 3,
  stem: 'A glass has refractive index 1.513 for red light and 1.532 for violet light. (a) Find the speed of red light in it. (b) Find the speed of violet light in it. (c) Which colour is deviated more by a prism made of this glass? Give a reason. (c = 3.0 × 10⁸ m/s)',
  model: `(a) $\\dfrac{3.0 \\times 10^{8}}{1.513} \\approx ${f3(vR3 / 1e8)} \\times 10^{8}$ m/s. (b) $\\dfrac{3.0 \\times 10^{8}}{1.532} \\approx ${f3(vV3 / 1e8)} \\times 10^{8}$ m/s. (c) Violet: it travels more slowly in the glass (larger refractive index), so it is bent more.`,
  sol: '1.98 and 1.96 × 10⁸ m/s; violet.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [1],
}), () => (near(vR3, 1.983e8, 0.001) && near(vV3, 1.958e8, 0.001)) || 'speeds');

// ---------------------------------------------------------------- t02 visible and electromagnetic spectrum
add('order-mcq', mcq({
  stem: 'Which arrangement of colours is in order of increasing wavelength?',
  right: 'Blue, green, yellow, red',
  wrong: ['Red, yellow, green, blue', 'Green, blue, yellow, red', 'Yellow, red, blue, green'],
  sol: 'Wavelength increases from violet towards red — option (@K).',
  d: 1, c: 'recall', t: [1, 2],
}));
const lamOven = c / 2.45e9;
add('em-mcq', mcq({
  stem: 'A microwave oven heats food with waves of frequency 2.45 × 10⁹ Hz. The wavelength of these waves is about:',
  right: `${f3(lamOven * 100)} cm`,
  wrong: ['1.22 cm', '122 cm', '0.82 cm'],
  sol: `$\\lambda = \\dfrac{c}{f} = \\dfrac{3.0 \\times 10^{8}}{2.45 \\times 10^{9}} = 0.122$ m $\\approx ${f3(lamOven * 100)}$ cm — option (@K).`,
  d: 2, c: 'application', t: [2],
}), () => near(lamOven, 0.1224, 0.001) || 'lambda');
add('emorder-mcq', mcq({
  stem: 'Which arrangement of radiations is in order of increasing wavelength?',
  right: 'X-rays, ultraviolet, infrared, microwaves',
  wrong: ['Ultraviolet, X-rays, microwaves, infrared', 'Microwaves, infrared, ultraviolet, X-rays', 'X-rays, infrared, ultraviolet, microwaves'],
  sol: 'Gamma, X-rays, UV, visible, IR, microwaves, radio — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('common-mcq', mcq({
  stem: 'Which property is shared by gamma rays, visible light and radio waves?',
  right: 'They all travel through vacuum at 3 × 10⁸ m/s',
  wrong: ['They all have the same wavelength', 'They are all deflected by a magnetic field', 'They all need a material medium to travel'],
  sol: 'All EM waves have the same speed in vacuum — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('gamma-mcq', mcq({
  stem: 'Of the following radiations, the one with the shortest wavelength is:',
  right: 'gamma rays',
  wrong: ['X-rays', 'ultraviolet rays', 'microwaves'],
  sol: 'Gamma rays lie at the short-wavelength end of the EM spectrum — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('neighbour-mcq', mcq({
  stem: 'A radiation has a wavelength slightly longer than that of red light. It is:',
  right: 'infrared',
  wrong: ['ultraviolet', 'X-rays', 'gamma rays'],
  sol: 'Just beyond the red end lies infrared — option (@K).',
  d: 1, c: 'recall', t: [2, 3],
}));
add('deflect-tf', tf({
  stem: 'Electromagnetic waves are not deflected by electric or magnetic fields.',
  key: 't',
  sol: 'True: they carry no charge.',
  d: 2, c: 'understanding', t: [2],
}));
add('medium-tf', tf({
  stem: 'Like sound, electromagnetic waves need a material medium in which to travel.',
  key: 'f',
  sol: 'False: they travel through vacuum, as sunlight does through space.',
  d: 1, c: 'understanding', t: [2],
}));
add('em-fill', fill({
  stem: 'Electromagnetic waves are ___ waves: their electric and magnetic fields vary at right angles to the direction of travel.',
  acc: [['transverse']],
  sol: '**Transverse**.',
  d: 1, c: 'recall', t: [2],
}));
add('order-fill', fill({
  stem: 'Of the seven colours of the visible spectrum, the one with the longest wavelength is ___.',
  acc: [['red']],
  sol: '**Red**.',
  d: 1, c: 'recall', t: [1, 2],
}));
add('same-ar', ar({
  a: 'Radio waves from a broadcasting tower and X-rays from a hospital machine travel at the same speed in vacuum.',
  r: 'Both are electromagnetic waves.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('xray-ar', ar({
  a: 'X-rays have longer wavelengths than ultraviolet rays.',
  r: 'X-rays are produced when fast-moving electrons strike a metal target.',
  key: 'd',
  sol: 'A is false — X-rays have shorter wavelengths than UV; R is true — option (d).',
  d: 2, c: 'understanding', t: [2],
}));
const fLW = c / 1500;
add('lw-num', num({
  stem: 'A long-wave radio transmitter sends out waves of wavelength 1500 m. Find their frequency in kHz.',
  value: fLW / 1000, tol: 0.01, unit: 'kHz',
  sol: r`$f = \dfrac{c}{\lambda} = \dfrac{3.0 \times 10^{8}}{1500} = 200000$ Hz $= 200$ kHz.`,
  scheme: [['200 kHz', 1]],
  d: 2, c: 'application', t: [2],
}), () => near(fLW, 2e5, 1e-9) || 'f');
const lamPhone = c / 1.8e9;
add('phone-num', num({
  stem: 'A mobile phone tower transmits at a frequency of 1.8 GHz. Find the wavelength of its waves in cm, to three significant figures.',
  value: Number(f3(lamPhone * 100)), tol: 0.1, unit: 'cm',
  sol: r`$\lambda = \dfrac{3.0 \times 10^{8}}{1.8 \times 10^{9}} = 0.1667$ m, that is $0.1667 \times 100 = 16.7$ cm.`,
  scheme: [['16.7 cm', 1]],
  d: 2, c: 'application', t: [2],
}), () => near(lamPhone, 0.16667, 0.001) || 'lambda');
const fX = c / 1e-10;
add('xray-num', num({
  stem: 'X-rays used to study crystals have a wavelength of 1.0 × 10⁻¹⁰ m. Find their frequency in units of 10¹⁸ Hz.',
  value: fX / 1e18, tol: 0.01, unit: '× 10¹⁸ Hz',
  sol: r`$f = \dfrac{3.0 \times 10^{8}}{1.0 \times 10^{-10}} = 3.0 \times 10^{18}$ Hz, so in units of $10^{18}$ Hz the frequency is $\dfrac{3.0 \times 10^{18}}{10^{18}} = 3$.`,
  scheme: [['3.0', 1]],
  d: 2, c: 'application', t: [2],
}), () => near(fX, 3e18, 1e-9) || 'f');
add('em-short1', short({
  marks: 1,
  stem: 'Name the region of the electromagnetic spectrum that lies between visible light and microwaves.',
  model: 'Infrared.',
  sol: 'Infrared.',
  scheme: [['Infrared', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('props-short2', short({
  marks: 2,
  stem: 'Gamma rays from a radioactive source and radio waves from an FM station have very different effects. State four properties that they share.',
  model: 'Both are transverse electromagnetic waves; both travel through vacuum at 3 × 10⁸ m/s; both obey c = f λ; both are undeflected by electric and magnetic fields (and both can be reflected and refracted, carrying energy).',
  sol: 'Any four common properties.',
  scheme: [['Any two properties', 1], ['Two more properties', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('arrange-short2', short({
  marks: 2,
  stem: 'Arrange radio waves, gamma rays, visible light and microwaves in order of decreasing frequency, and name the one whose wavelength is longest.',
  model: 'Gamma rays, visible light, microwaves, radio waves (decreasing frequency). Radio waves have the longest wavelength.',
  sol: 'γ, visible, micro, radio; radio.',
  scheme: [['Order', 1], ['Longest wavelength', 1]],
  d: 2, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 infrared and ultraviolet
add('ir-mcq', mcq({
  stem: 'A thermopile joined to a sensitive galvanometer is moved along a spectrum of sunlight. The galvanometer shows its largest deflection just beyond the red end. This shows that:',
  right: 'invisible infrared radiation with a strong heating effect lies beyond red',
  wrong: ['ultraviolet radiation lies beyond red', 'red light has the strongest chemical effect', 'no radiation reaches beyond the red end'],
  sol: 'A thermopile detects radiation by its heating effect; the region beyond red is infrared — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('uv-mcq', mcq({
  stem: 'A strip of paper painted with a fluorescent dye is moved along a solar spectrum formed by a quartz prism. It glows brightly just beyond the violet end because there it receives:',
  right: 'ultraviolet radiation',
  wrong: ['infrared radiation', 'red light', 'microwaves'],
  sol: 'Ultraviolet causes fluorescence — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('glass-mcq', mcq({
  stem: 'Prisms and lenses for studying ultraviolet radiation are made of quartz, not ordinary glass, because ordinary glass:',
  right: 'absorbs ultraviolet radiation strongly',
  wrong: ['reflects all ultraviolet radiation', 'turns ultraviolet into infrared', 'cannot be shaped into a prism'],
  sol: 'Glass absorbs UV, while quartz transmits it — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('fog-mcq', mcq({
  stem: 'Satellite and aerial photographs of hazy areas are often taken with infrared-sensitive cameras because infrared:',
  right: 'is scattered much less by haze, owing to its longer wavelength',
  wrong: ['is scattered more by haze, making objects brighter', 'travels faster than visible light through air', 'is not absorbed by anything'],
  sol: 'Longer wavelength means much less scattering, so IR passes through haze — option (@K).',
  d: 3, c: 'application', t: [3, 4],
}));
add('note-mcq', mcq({
  stem: 'A bank cashier holds a ₹500 note under a special lamp, and a hidden strip on it glows. The lamp gives out:',
  right: 'ultraviolet radiation, which makes the special ink fluoresce',
  wrong: ['infrared radiation, which heats the ink', 'X-rays, which pass through the paper', 'microwaves, which make the ink vibrate'],
  sol: 'Security inks fluoresce under UV — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('irsource-mcq', mcq({
  stem: 'Which of these is the strongest source of infrared radiation in a kitchen?',
  right: 'A hot iron griddle (tawa) on the stove',
  wrong: ['A glass of cold water', 'A steel plate at room temperature', 'A sheet of white paper'],
  sol: 'Hot bodies are strong emitters of infrared — option (@K).',
  d: 1, c: 'application', t: [3],
}));
add('ir-tf', tf({
  stem: 'Infrared radiation can be detected with a thermometer whose bulb has been blackened.',
  key: 't',
  sol: 'True: the blackened bulb absorbs the radiation and warms up.',
  d: 1, c: 'recall', t: [3],
}));
add('uv-tf', tf({
  stem: 'Ultraviolet radiation passes easily through ordinary window glass.',
  key: 'f',
  sol: 'False: ordinary glass absorbs most ultraviolet radiation.',
  d: 2, c: 'understanding', t: [3],
}));
add('ir-fill', fill({
  stem: 'An instrument that detects infrared radiation by its heating effect and produces an electric current is called a ___.',
  acc: [['thermopile']],
  sol: '**Thermopile**.',
  d: 1, c: 'recall', t: [3],
}));
add('uv-fill', fill({
  stem: 'A little ultraviolet radiation falling on our skin helps the body to make vitamin ___.',
  acc: [['D']],
  sol: '**D**.',
  d: 1, c: 'recall', t: [3],
}));
add('ozone-ar', ar({
  a: 'Life on land would be harmed far more by sunlight if the stratosphere lost its ozone.',
  r: 'Ozone absorbs most of the Sun’s ultraviolet radiation before it reaches the ground.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('irwave-ar', ar({
  a: 'Infrared radiation produces a heating effect when absorbed by the skin.',
  r: 'Infrared radiation has a shorter wavelength than visible light.',
  key: 'c',
  sol: 'A is true; R is false — infrared has a longer wavelength than visible light — option (c).',
  d: 2, c: 'understanding', t: [3],
}));
const fIR = c / 1.0e-5;
add('ir-num', num({
  stem: 'A warm human body gives out infrared radiation most strongly at a wavelength of about 1.0 × 10⁻⁵ m. Find the corresponding frequency in units of 10¹³ Hz.',
  value: fIR / 1e13, tol: 0.01, unit: '× 10¹³ Hz',
  sol: r`$f = \dfrac{3.0 \times 10^{8}}{1.0 \times 10^{-5}} = 3.0 \times 10^{13}$ Hz, so in units of $10^{13}$ Hz the frequency is $\dfrac{3.0 \times 10^{13}}{10^{13}} = 3$.`,
  scheme: [['3.0', 1]],
  d: 2, c: 'application', t: [3],
}), () => near(fIR, 3e13, 1e-9) || 'f');
const fUV = c / 3.6e-7;
add('uv-num', num({
  stem: 'A “black light” lamp used in a museum emits ultraviolet radiation of wavelength 360 nm. Find its frequency in units of 10¹⁴ Hz, to three significant figures.',
  value: Number(f3(fUV / 1e14)), tol: 0.01, unit: '× 10¹⁴ Hz',
  sol: r`$\lambda = 360 \times 10^{-9} = 3.6 \times 10^{-7}$ m; $f = \dfrac{3.0 \times 10^{8}}{3.6 \times 10^{-7}} = 8.33 \times 10^{14}$ Hz, so in units of $10^{14}$ Hz the frequency is $\dfrac{3.0}{3.6} \times 10 = 8.33$.`,
  scheme: [['8.33', 1]],
  d: 3, c: 'application', t: [3],
}), () => near(fUV, 8.333e14, 0.001) || 'f');
add('uvsource-short1', short({
  marks: 1,
  stem: 'Name one artificial source of ultraviolet radiation used in a laboratory.',
  model: 'A mercury vapour lamp in a quartz tube (or an electric arc).',
  sol: 'Mercury vapour lamp.',
  scheme: [['A correct source', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('ir-short2', short({
  marks: 2,
  stem: 'Give two properties and two uses of infrared radiation.',
  model: 'Properties: it has a strong heating effect; it is scattered much less than visible light by haze and fog (also absorbed by water vapour and carbon dioxide). Uses: remote controls for TVs; night-vision and thermal cameras (also physiotherapy lamps, drying paint).',
  sol: 'Two properties; two uses.',
  scheme: [['Two properties', 1], ['Two uses', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('uv-short2', short({
  marks: 2,
  stem: 'Give two properties and two uses of ultraviolet radiation.',
  model: 'Properties: it causes fluorescence; it kills germs (also affects photographic film and is absorbed by ordinary glass). Uses: sterilising drinking water and surgical instruments; detecting forged notes and documents (also helping make vitamin D).',
  sol: 'Two properties; two uses.',
  scheme: [['Two properties', 1], ['Two uses', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('weld-short2', short({
  marks: 2,
  stem: 'A road-side welder works without eye protection. (a) Which invisible radiation from the welding arc can harm his eyes? (b) Why would ordinary glass goggles help him, even though they are clear?',
  model: '(a) Ultraviolet radiation, which is given out strongly by an electric arc. (b) Ordinary glass absorbs most ultraviolet radiation while letting visible light through, so it shields the eyes yet he can still see.',
  sol: 'UV; glass absorbs UV.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 3, c: 'evaluation', t: [3],
}));
add('iruv-short3', short({
  marks: 3,
  stem: 'Compare infrared and ultraviolet radiation by stating, for each: (a) its position relative to the visible spectrum, (b) one source, and (c) one way of detecting it.',
  model: '(a) Infrared lies beyond the red end (longer wavelength); ultraviolet lies beyond the violet end (shorter wavelength). (b) Infrared: any hot body such as a heater coil; ultraviolet: the Sun or a mercury vapour lamp. (c) Infrared: a thermopile or blackened-bulb thermometer; ultraviolet: fluorescence of zinc sulphide or a photographic film.',
  sol: 'Positions; sources; detectors.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'analysis', t: [3],
}));

// ---------------------------------------------------------------- t04 scattering
add('sky-mcq', mcq({
  stem: 'On a clear afternoon the sky overhead looks deep blue mainly because:',
  right: 'air molecules scatter short-wavelength blue light much more than red light',
  wrong: ['the sea reflects its colour onto the sky', 'air molecules scatter red light most strongly', 'blue light travels faster than other colours in air'],
  sol: 'Scattering by tiny molecules varies as 1/λ⁴, so blue is scattered most — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('sunrise-mcq', mcq({
  stem: 'Seen from a hill at dawn, the rising Sun looks reddish because its light:',
  right: 'travels a much longer path through the air, so most of the blue is scattered away before reaching us',
  wrong: ['is reflected from the red soil of the hills', 'travels a shorter path through the air at dawn', 'contains no blue light early in the morning'],
  sol: 'Long path → blue removed by scattering → red and orange reach the eye — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('danger-mcq', mcq({
  stem: 'Railway signals and the brake lights of vehicles are red because red light:',
  right: 'is scattered least by air, fog and dust, so it can be seen from far away',
  wrong: ['is scattered most, so it spreads over a wide area', 'has the highest frequency of visible light', 'travels faster in air than other colours'],
  sol: 'Red has the longest wavelength and is scattered least — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('cloud-mcq', mcq({
  stem: 'Clouds look white, not blue, because the water droplets in them:',
  right: 'are large compared with the wavelength of light and scatter all colours almost equally',
  wrong: ['scatter only red light', 'absorb all colours except white', 'are smaller than air molecules'],
  sol: 'Large particles scatter all wavelengths about equally, so the scattered light is white — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('moon-mcq', mcq({
  stem: 'An astronaut standing on the Moon in daytime sees the sky as:',
  right: 'black, because there is no atmosphere to scatter sunlight',
  wrong: ['blue, as on the Earth', 'red, because of long paths through air', 'white, because of large dust particles'],
  sol: 'No atmosphere means no scattered skylight — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('scat-tf', tf({
  stem: 'For particles much smaller than the wavelength, the intensity of scattered light is inversely proportional to the fourth power of the wavelength.',
  key: 't',
  sol: 'True: this is Rayleigh’s law of scattering.',
  d: 2, c: 'recall', t: [4],
}));
add('scat-fill', fill({
  stem: 'Air molecules scatter light of shorter wavelength ___ strongly than light of longer wavelength.',
  acc: [['more']],
  sol: '**More**.',
  d: 1, c: 'understanding', t: [4],
}));
add('sunset-ar', ar({
  a: 'The Sun looks red at sunset.',
  r: 'Red light is scattered most strongly by the air.',
  key: 'c',
  sol: 'A is true; R is false — red is scattered least, so it survives the long path — option (c).',
  d: 2, c: 'analysis', t: [4],
}));
add('moon-ar', ar({
  a: 'There is no blue sky above the surface of the Moon.',
  r: 'The Moon has no atmosphere to scatter sunlight.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'understanding', t: [4],
}));
const ratio16 = (800 / 400) ** 4;
add('scat-num', num({
  stem: 'Using the law that scattered intensity is proportional to 1/λ⁴, how many times more strongly is light of wavelength 400 nm scattered than light of wavelength 800 nm by air molecules?',
  value: ratio16, tol: 0, unit: null,
  sol: r`Ratio $= \left(\dfrac{800}{400}\right)^{4} = 2^{4} = 16$.`,
  scheme: [['16', 1]],
  d: 2, c: 'application', t: [4],
}), () => ratio16 === 16 || 'ratio');
const ratio57 = (700 / 500) ** 4;
add('scat2-num', num({
  stem: 'Compare the scattering of green light (λ = 500 nm) with that of red light (λ = 700 nm) by air molecules. Give the ratio of their scattered intensities, to three significant figures.',
  value: Number(f3(ratio57)), tol: 0.01, unit: null,
  sol: r`Ratio $= \left(\dfrac{700}{500}\right)^{4} = 1.4^{4} = 3.8416$, about 3.84.`,
  scheme: [['3.84', 1]],
  d: 3, c: 'application', t: [4],
}), () => near(ratio57, 3.8416, 1e-6) || 'ratio');
add('signal-short1', short({
  marks: 1,
  stem: 'Why are the tail lamps of trucks red?',
  model: 'Red light is scattered least by fog, dust and air, so it is visible from the greatest distance.',
  sol: 'Least scattered.',
  scheme: [['Least scattered, seen from far', 1]],
  d: 1, c: 'application', t: [4],
}));
add('sunrise-short2', short({
  marks: 2,
  stem: 'Watching the Sun from the beach at Puri, Kavya notices that it looks orange-red just after sunrise but nearly white at noon. Explain both observations.',
  model: 'Just after sunrise the Sun is near the horizon, so its light passes through a long stretch of air; most of the blue and violet is scattered out of the beam on the way, and mainly red and orange reach her. At noon the light crosses only a short thickness of air, little of it is scattered, and all colours reach her, so the Sun looks white.',
  sol: 'Long path at sunrise; short path at noon.',
  scheme: [['Sunrise: long path, blue scattered away', 1], ['Noon: short path, all colours reach the eye', 1]],
  d: 2, c: 'application', t: [4],
}));
add('sky-short2', short({
  marks: 2,
  stem: 'A high-altitude balloonist notices that the sky becomes darker and darker blue, and finally almost black, as the balloon rises. Explain why.',
  model: 'The blue of the sky is light scattered by air molecules. As the balloon rises, there is less and less air above it to scatter sunlight towards the balloonist, so less scattered blue light reaches him and the sky looks darker, becoming nearly black where the air is very thin.',
  sol: 'Less air above, less scattering.',
  scheme: [['Sky colour due to scattering by air', 1], ['Less air above, so less scattered light', 1]],
  d: 3, c: 'analysis', t: [4],
}));

// ---------------------------------------------------------------- match items
add('em-match', match({
  marks: 2,
  stem: 'Pair each kind of radiation in Column A with a job it does in Column B.',
  pairs: [
    ['Gamma rays', 'Killing cancer cells'],
    ['X-rays', 'Photographing broken bones'],
    ['Microwaves', 'Radar and cooking'],
    ['Radio waves', 'Broadcasting'],
  ],
  order: [2, 3, 1, 0],
  sol: 'Gamma → cancer treatment; X-rays → bones; microwaves → radar and cooking; radio → broadcasting.',
  d: 1, c: 'recall', t: [2],
}));
add('detect-match', match({
  marks: 2,
  stem: 'Match each description in Column A with the radiation in Column B.',
  pairs: [
    ['Detected with a blackened-bulb thermometer', 'Infrared'],
    ['Makes fluorescent paint glow', 'Ultraviolet'],
    ['Detected by the human eye', 'Visible light'],
    ['Given out by radioactive nuclei', 'Gamma rays'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Thermometer → infrared; fluorescent paint → ultraviolet; eye → visible light; radioactive nuclei → gamma rays.',
  d: 2, c: 'understanding', t: [2, 3],
}));

// ---------------------------------------------------------------- 10-mark structured questions
const vRl = c / 1.62;
add('disp-long', long({
  stem: '(a) What is meant by dispersion of light? State its cause. [3]\n\n(b) Describe, as you would draw it, the passage of a narrow beam of white light through a glass prism onto a screen. Which colour is deviated (i) the most and (ii) the least? [3]\n\n(c) (i) Yellow light has a refractive index of 1.62 in a flint glass. Find its speed in the glass. (ii) Is the refractive index of this glass for blue light more or less than 1.62? (iii) How can the spectrum be recombined into white light? (c = 3.0 × 10⁸ m/s) [4]',
  model: `(a) Dispersion is the splitting of white light into its constituent colours when it passes through a prism. Cause: the refractive index of glass is different for different colours (wavelengths), so each colour is deviated by a different amount.\n\n(b) The beam bends towards the base at both faces and spreads into a band of colours, VIBGYOR, with red nearest the apex side and violet nearest the base. (i) Violet. (ii) Red.\n\n(c) (i) $v = \\dfrac{3.0 \\times 10^{8}}{1.62} = ${f3(vRl / 1e8)} \\times 10^{8}$ m/s. (ii) More: blue has a shorter wavelength than yellow. (iii) Place a second identical prism, inverted, close to the first; it reverses the deviations and the colours mix to white.`,
  sol: 'Definition and cause; diagram; speed and recombination.',
  scheme: [['(a) definition', 1], ['(a) cause', 2], ['(b) diagram', 1], ['(b)(i)', 1], ['(b)(ii)', 1], ['(c)(i)', 2], ['(c)(ii)', 1], ['(c)(iii)', 1]],
  d: 2, c: 'understanding', t: [1],
}), () => near(vRl, 1.852e8, 0.001) || 'v');
const fRadio = c / 3;
const lamRad = c / 6e14;
add('em-long', long({
  stem: '(a) Name the regions of the electromagnetic spectrum in order of increasing wavelength. [3]\n\n(b) State three properties common to all electromagnetic waves. [3]\n\n(c) (i) An FM radio wave has a wavelength of 3.0 m. Find its frequency. (ii) A radiation has a frequency of 6.0 × 10¹⁴ Hz. Find its wavelength and name the region. (iii) Which of the two has the greater frequency? (c = 3.0 × 10⁸ m/s) [4]',
  model: `(a) Gamma rays, X-rays, ultraviolet, visible light, infrared, microwaves, radio waves.\n\n(b) They are transverse waves of electric and magnetic fields; they travel through vacuum at $3 \\times 10^{8}$ m/s; they are not deflected by electric or magnetic fields (also obey $c = f\\lambda$, can be reflected and refracted).\n\n(c) (i) $f = \\dfrac{3.0 \\times 10^{8}}{3.0} = ${fRadio}$ Hz $= 100$ MHz. (ii) $\\lambda = \\dfrac{3.0 \\times 10^{8}}{6.0 \\times 10^{14}} = 5.0 \\times 10^{-7}$ m (500 nm): visible light (green). (iii) The visible radiation.`,
  sol: 'Order; properties; calculations.',
  scheme: [['(a) correct order', 3], ['(b) three properties', 3], ['(c)(i)', 1], ['(c)(ii) wavelength', 1], ['(c)(ii) region', 1], ['(c)(iii)', 1]],
  d: 2, c: 'application', t: [2],
}), () => (near(fRadio, 1e8, 1e-9) && near(lamRad, 5e-7, 1e-9)) || 'em');
add('iruv-long', long({
  stem: '(a) State two properties of infrared radiation and name one instrument used to detect it. [3]\n\n(b) State two properties of ultraviolet radiation and name one source of it. [3]\n\n(c) For each of the following, name the radiation used and the property on which the use depends: (i) a TV remote control, (ii) a water purifier, (iii) a thermal camera used to find people trapped under rubble, (iv) checking whether a passport is forged. [4]',
  model: '(a) Infrared has a strong heating effect and is scattered less by haze than visible light (it is also absorbed by water vapour). Detector: a thermopile (or blackened-bulb thermometer).\n\n(b) Ultraviolet causes fluorescence and kills germs (it is also absorbed by ordinary glass). Source: the Sun, an electric arc or a mercury vapour lamp.\n\n(c) (i) Infrared: an invisible signal picked up by a sensor. (ii) Ultraviolet: it kills germs. (iii) Infrared: warm bodies give out more infrared than cooler surroundings. (iv) Ultraviolet: special inks fluoresce.',
  sol: 'IR properties and detector; UV properties and source; four uses.',
  scheme: [['(a) two properties', 2], ['(a) detector', 1], ['(b) two properties', 2], ['(b) source', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(c)(iv)', 1]],
  d: 2, c: 'application', t: [3],
}));
const r48 = (600 / 400) ** 4;
add('scatter-long', long({
  stem: '(a) What is scattering of light? How does the intensity of scattered light depend on wavelength, for very small particles? [3]\n\n(b) Explain (i) why the clear sky looks blue and (ii) why the Sun looks red at sunrise. [3]\n\n(c) (i) How many times more strongly is light of wavelength 400 nm scattered than light of 600 nm? (ii) Why are clouds white? (iii) Why is the sky black for an astronaut in space? [4]',
  model: `(a) Scattering is the absorption of light by small particles and its re-emission in all directions. For particles much smaller than the wavelength, the intensity of scattered light is inversely proportional to the fourth power of the wavelength.\n\n(b) (i) Air molecules scatter short wavelengths (blue) much more than long ones, so light reaching us from all over the sky is mainly blue. (ii) At sunrise sunlight travels a long path through the air; blue is scattered out on the way and mainly red reaches the eye.\n\n(c) (i) $\\left(\\dfrac{600}{400}\\right)^{4} = 1.5^{4} = ${f3(r48, 4)}$, about 5 times. (ii) Cloud droplets are large compared with the wavelength and scatter all colours about equally. (iii) There is no air in space to scatter sunlight towards the eye.`,
  sol: 'Definition and law; blue sky and red sunrise; ratio and two effects.',
  scheme: [['(a) definition', 1], ['(a) dependence on wavelength', 2], ['(b)(i)', 2], ['(b)(ii)', 1], ['(c)(i)', 2], ['(c)(ii)', 1], ['(c)(iii)', 1]],
  d: 3, c: 'application', t: [4],
}), () => near(r48, 5.0625, 1e-9) || 'ratio');
const fA = c / 9e-7;
const fB = c / 3e-7;
add('spectrum-long', long({
  stem: 'Sunlight is passed through a quartz prism to form a spectrum on a long white card. A thermometer with a blackened bulb and a strip of fluorescent paper are moved along the card, well beyond both ends of the visible band.\n\n(a) Where does the thermometer show the greatest rise in temperature? Name the radiation and explain your answer. [3]\n\n(b) Where does the fluorescent paper glow? Name the radiation. Why is a quartz prism used instead of glass? [3]\n\n(c) (i) Radiation at point A has a wavelength of 900 nm and at point B of 300 nm. Find their frequencies. (ii) Which point lies beyond the red end? (iii) Predict what happens to the glow at B if a sheet of window glass is held in front of the card. (c = 3.0 × 10⁸ m/s) [4]',
  model: `(a) Just beyond the red end: infrared radiation falls there, and infrared has a strong heating effect, which the blackened bulb absorbs.\n\n(b) Just beyond the violet end: ultraviolet radiation, which causes fluorescence. Ordinary glass absorbs ultraviolet, but quartz transmits it, so with a glass prism the ultraviolet would not reach the card.\n\n(c) (i) $f_{A} = \\dfrac{3.0 \\times 10^{8}}{9.0 \\times 10^{-7}} = ${f3(fA / 1e14)} \\times 10^{14}$ Hz; $f_{B} = \\dfrac{3.0 \\times 10^{8}}{3.0 \\times 10^{-7}} = 1.0 \\times 10^{15}$ Hz. (ii) A (900 nm, longer than red). (iii) The glow fades or stops, because the glass absorbs the ultraviolet.`,
  sol: 'Infrared region; ultraviolet region and quartz; frequencies and prediction.',
  scheme: [['(a) position', 1], ['(a) radiation and reason', 2], ['(b) position and radiation', 2], ['(b) quartz', 1], ['(c)(i)', 2], ['(c)(ii)', 1], ['(c)(iii)', 1]],
  d: 4, c: 'analysis', t: [1, 3],
}), () => (near(fA, 3.333e14, 0.001) && near(fB, 1e15, 1e-9)) || 'freq');
