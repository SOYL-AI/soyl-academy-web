// ch08 Electromagnetic Waves — two decks: Part 1 (t01–t02) displacement current and the nature of EM waves; Part 2
// (t03) the electromagnetic spectrum, its bands, sources and uses. Worked-example numbers are computed here.
import { sl, deck, table, flow, svgV, plot, r, sci, dec } from '../../cbse-12-physics-ch01/src/lib.mjs';
import * as G from './svgs.mjs';

export const MU0 = 4 * Math.PI * 1e-7;
export const EPS0 = 8.85e-12;
export const C = 3e8;

// ---------------------------------------------------------------- worked-example numbers
const ex1 = { Id: EPS0 * 0.02 * 1e12 };
const ex2 = { c: 1 / Math.sqrt(MU0 * EPS0) };
const ex3 = { E0: C * 2e-8, lam: C / 100e6 };
const ex4 = { lam: C / 2.45e9 };
const ex5 = { lamUV: C / 1e15 };
export const EX = { ex1, ex2, ex3, ex4, ex5 };

export const V = {
  disp: svgV(G.DISPLACEMENT, 'Charging capacitor with a loop round the wire and a surface passing through the gap'),
  wave: svgV(G.WAVE, 'Plane electromagnetic wave with E and B perpendicular and in phase', 'E × B points along the direction of travel (checked).'),
  spec: svgV(G.SPECTRUM, 'Electromagnetic spectrum on a logarithmic wavelength scale', 'Band edges are approximate; the bands overlap slightly in practice.'),
};
export const ebPlot = plot(
  {
    x: { min: 0, max: 12.6, label: 'kx (at one instant)' },
    y: { min: -1.4, max: 1.4, label: 'E/E₀ and B/B₀' },
    functions: [
      { expr: 'sin(x)', label: 'E / E₀' },
      { expr: 'sin(x)', label: 'B / B₀ (same phase)' },
    ],
  },
  'Electric and magnetic fields of an EM wave plotted along the direction of travel at one instant: the two curves coincide because E and B are in phase',
  'E₀ = cB₀; the fields reach their peaks at the same places.',
);

const bandsTable = table(
  ['Band', 'Wavelength (approx.)', 'Produced by', 'Typical uses'],
  [
    ['Radio', '> 0.1 m', 'Accelerated charges in aerials', 'Radio, TV, mobile phones'],
    ['Microwave', '0.1 m to 1 mm', 'Magnetron and klystron valves', 'Radar, ovens, satellite links'],
    ['Infrared', '1 mm to 700 nm', 'Hot bodies, molecular vibrations', 'Remote controls, night vision, physiotherapy'],
    ['Visible', '700 nm to 400 nm', 'Electron transitions in atoms', 'Vision, photography'],
    ['Ultraviolet', '400 nm to 1 nm', 'The Sun, arc lamps', 'Sterilisation, LASIK surgery'],
    ['X-rays', '1 nm to 1 pm', 'Fast electrons hitting metal targets', 'Medical imaging, crystal studies'],
    ['Gamma rays', '< 1 pm (roughly)', 'Nuclear reactions and decay', 'Cancer therapy, sterilising equipment'],
  ],
  'Table of the seven bands of the electromagnetic spectrum with approximate wavelength ranges, how each is produced and typical uses',
);

export const deck1 = deck({
  part: 1,
  title: 'Electromagnetic Waves — Part 1: Displacement current and the nature of EM waves',
  goals: [
    'Explain why Maxwell introduced the displacement current',
    'Describe how changing electric and magnetic fields sustain each other as an electromagnetic wave',
    'State the characteristics of EM waves: transverse nature, speed c = 1/√(μ₀ε₀), and E₀ = cB₀',
  ],
  slides: [
    sl('title', 'Electromagnetic Waves', {
      b: 'Part 1 — a missing term in Ampere’s law, and how it predicts waves of electric and magnetic fields that travel at the speed of light.',
      v: flow('LR', [['a', 'Ampere’s law puzzle'], ['d', 'Displacement current'], ['m', 'Changing E makes B'], ['w', 'EM waves'], ['c', 'Speed c']], [['a', 'd'], ['d', 'm'], ['m', 'w'], ['w', 'c']], 'Flow of the part: a puzzle in Ampere’s law, displacement current, changing E makes B, EM waves, speed of light'),
      n: 'Your phone, a microwave oven, the warmth of the Sun and an X-ray picture all depend on electromagnetic waves. Maxwell predicted them in the eighteen sixties by fixing a gap in Ampere’s law. In this part we see that gap, the displacement current that fills it, and how it leads to waves of electric and magnetic fields travelling through empty space at the speed of light.',
    }),
    sl('diagram', 'A puzzle in Ampere’s law', {
      b: 'While a capacitor charges, current flows in the wires but **not across the gap**. Apply Ampere’s law to a loop round the wire:',
      ul: ['A flat surface bounded by the loop is crossed by the wire: $\\oint \\vec B\\cdot d\\vec l = \\mu_0 I$.', 'A bag-shaped surface with the same boundary passes through the gap: no conduction current crosses it, so $\\oint \\vec B\\cdot d\\vec l = 0$.', 'The same loop cannot have two different answers: something is missing.'],
      v: V.disp,
      n: 'Charge a capacitor and apply Ampere’s law to a small loop round the wire. If you choose a flat surface bounded by the loop, the wire pierces it and carries current I. But you could stretch the surface into a bag that passes between the plates, where no charge flows. The same loop would then give zero. Since the field round the loop is real and unique, Ampere’s law as it stood must be incomplete.',
    }),
    sl('concept', 'Displacement current', {
      b: r`Maxwell noticed that in the gap the **electric field is changing**. He added a **displacement current**
$$I_d = \varepsilon_0\dfrac{d\Phi_E}{dt}$$
For the capacitor, $\Phi_E = EA = q/\varepsilon_0$, so $I_d = dq/dt = I$: the current is continuous through the gap.`,
      ul: ['Ampere–Maxwell law: $\\oint \\vec B\\cdot d\\vec l = \\mu_0(I_c + I_d) = \\mu_0 I_c + \\mu_0\\varepsilon_0\\dfrac{d\\Phi_E}{dt}$.', 'A changing electric field produces a magnetic field, just as a changing magnetic field produces an electric field (Faraday).'],
      v: V.disp,
      n: 'Between the plates the charge is building up, so the electric field and its flux are increasing. Maxwell proposed that a changing electric flux acts like a current, the displacement current, epsilon nought times the rate of change of electric flux. For the capacitor it exactly equals the conduction current in the wires, so the total current is the same everywhere and Ampere’s law works for any surface.',
    }),
    sl('example', 'Worked example 1: displacement current in a gap', {
      b: r`The plates of a parallel-plate capacitor have area 0.020 m². While charging, the field between them increases at $1.0 \times 10^{12}$ V m$^{-1}$ s$^{-1}$. Find the displacement current.`,
      ul: [
        r`Step 1 — $\Phi_E = EA$, so $\dfrac{d\Phi_E}{dt} = A\dfrac{dE}{dt}$.`,
        r`Step 2 — $I_d = \varepsilon_0 A\dfrac{dE}{dt} = 8.85 \times 10^{-12} \times 0.020 \times 1.0 \times 10^{12} \approx ${dec(ex1.Id, 3)}$ A.`,
        'Step 3 — this equals the conduction current in the leads at that instant.',
      ],
      v: V.disp,
      n: 'The electric flux in the gap is E times A, so its rate of change is A times the rate of change of E. Multiply by epsilon nought and the result is about zero point one seven seven ampere. A meter in the wires would read exactly this current at that moment: the displacement current in the gap carries the current on across the capacitor.',
    }),
    sl('check', 'Quick check: displacement current', {
      b: 'Decide whether the statement is true or false.',
      v: null,
      chk: 'dispflow-tf',
      n: 'Recall what the displacement current is made of: moving charges, or a changing electric field?',
    }),
    sl('concept', 'From fields to waves', {
      b: 'Faraday: a changing **B** produces **E**. Maxwell: a changing **E** produces **B**. An **accelerated charge** creates changing fields near it, and each change regenerates the other, so a disturbance of E and B travels outwards: an **electromagnetic wave**.',
      ul: ['A charge moving at steady speed does not radiate; an oscillating charge radiates at its frequency of oscillation.', 'EM waves need no medium: they travel through vacuum.'],
      v: flow('LR', [['a', 'Accelerated charge'], ['e', 'Changing E'], ['b', 'Changing B'], ['w', 'Wave travels outward']], [['a', 'e'], ['e', 'b'], ['b', 'e'], ['b', 'w']], 'Flow showing an accelerated charge producing a changing electric field, which produces a changing magnetic field, which in turn produces a changing electric field, so a wave travels outward'),
      n: 'Put the two laws together. A changing magnetic field makes an electric field, and a changing electric field makes a magnetic field. An oscillating charge, such as the electrons surging up and down a radio aerial, creates changing fields that keep regenerating each other and spread outwards as a wave. No medium is needed: this is how sunlight crosses the vacuum of space.',
    }),
    sl('diagram', 'Structure of a plane EM wave', {
      b: r`For a wave travelling along $x$:
$$E_y = E_0\sin(kx - \omega t),\qquad B_z = B_0\sin(kx - \omega t)$$
$\vec E$, $\vec B$ and the direction of travel are mutually perpendicular: EM waves are **transverse**. $\vec E \times \vec B$ points along the direction of travel.`,
      v: V.wave,
      n: 'In a plane wave moving along x, the electric field oscillates along y and the magnetic field along z. They rise and fall together, in phase, and both are at right angles to the direction of travel, so the wave is transverse. The direction of travel is the direction of E cross B. The wavenumber k is two pi over the wavelength, and omega is two pi times the frequency.',
    }),
    sl('concept', 'Speed and other properties', {
      b: r`Maxwell’s equations give the speed in vacuum
$$c = \dfrac{1}{\sqrt{\mu_0\varepsilon_0}} \approx 3.0 \times 10^{8}\ \text{m s}^{-1},\qquad \dfrac{E_0}{B_0} = c,\qquad c = f\lambda$$
In a medium the speed is $v = 1/\sqrt{\mu\varepsilon}$, less than $c$.`,
      ul: ['All EM waves travel at the same speed in vacuum, whatever their frequency.', 'They carry energy and momentum (and so exert pressure on surfaces they strike).', 'Their frequency is set by the source and does not change when they enter a medium.'],
      v: ebPlot,
      n: 'From his equations Maxwell found that the waves travel at one over root mu nought epsilon nought. When he put in the measured constants, the answer was the known speed of light: light itself is an electromagnetic wave. The peak electric field is c times the peak magnetic field. All EM waves share this speed in vacuum, and they carry energy and momentum, so they can heat and even push on objects.',
    }),
    sl('example', 'Worked example 2: the speed of light from μ₀ and ε₀', {
      b: r`Calculate $1/\sqrt{\mu_0\varepsilon_0}$ using $\mu_0 = 4\pi \times 10^{-7}$ T m A$^{-1}$ and $\varepsilon_0 = 8.85 \times 10^{-12}$ C² N$^{-1}$ m$^{-2}$.`,
      ul: [
        r`Step 1 — $\mu_0\varepsilon_0 = 4\pi \times 10^{-7} \times 8.85 \times 10^{-12} \approx ${sci(MU0 * EPS0, 3)}$ s² m$^{-2}$.`,
        r`Step 2 — $\dfrac{1}{\sqrt{\mu_0\varepsilon_0}} \approx ${sci(ex2.c, 3)}$ m s$^{-1}$.`,
        'Meaning — this matches the measured speed of light, which showed that light is an EM wave.',
      ],
      v: table(['Constant', 'Value'], [['μ₀', '4π × 10⁻⁷ T m A⁻¹'], ['ε₀', '8.85 × 10⁻¹² C² N⁻¹ m⁻²'], ['1/√(μ₀ε₀)', `${sci(ex2.c, 3).replace(' \\times 10^{8}', ' × 10⁸')} m s⁻¹`]], 'Worked table: the two constants and their combination, about three times ten to the eight metres per second'),
      n: 'Multiply the two constants to get about one point one one times ten to the minus sixteen. Take the square root and invert: very nearly three times ten to the eight metres per second. Constants measured in electricity and magnetism experiments, with no light involved, give exactly the speed of light. That was the clue that light is an electromagnetic wave.',
    }),
    sl('example', 'Worked example 3: fields and wavelength of an FM signal', {
      b: r`An FM radio wave of frequency 100 MHz has a peak magnetic field of $2.0 \times 10^{-8}$ T. Find its wavelength and its peak electric field.`,
      ul: [
        r`Step 1 — $\lambda = \dfrac{c}{f} = \dfrac{3.0 \times 10^{8}}{100 \times 10^{6}} = ${dec(ex3.lam, 2)}$ m.`,
        r`Step 2 — $E_0 = cB_0 = 3.0 \times 10^{8} \times 2.0 \times 10^{-8} = ${dec(ex3.E0, 2)}$ V m$^{-1}$.`,
        'Note — E and B are in phase; the wave is transverse.',
      ],
      v: V.wave,
      n: 'Use c equals f lambda: three times ten to the eight divided by one hundred million gives a wavelength of three metres, which is why FM aerials are about a metre long. The peak electric field is c times the peak magnetic field, six volts per metre. Notice how small the magnetic field is in tesla, even though its effect is just as important as the electric field’s.',
    }),
    sl('check', 'Quick check: E₀ and B₀', {
      b: 'Find the peak electric field.',
      v: V.wave,
      chk: 'E0-num',
      n: 'The peak electric field equals the speed of light times the peak magnetic field.',
    }),
    sl('check', 'Quick check: transverse waves', {
      b: 'Judge the assertion and the reason.',
      v: null,
      chk: 'transverse-ar',
      n: 'Think about the directions of the electric field, the magnetic field and the direction of travel.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Displacement current', '$I_d = \\varepsilon_0\\,d\\Phi_E/dt$'],
          ['Ampere–Maxwell law', '$\\oint \\vec B\\cdot d\\vec l = \\mu_0(I_c + I_d)$'],
          ['Source of EM waves', 'Accelerated (oscillating) charges'],
          ['Nature', 'Transverse: E ⟂ B ⟂ direction of travel, in phase'],
          ['Speed in vacuum', '$c = 1/\\sqrt{\\mu_0\\varepsilon_0} \\approx 3 \\times 10^8$ m s$^{-1}$'],
          ['Field ratio', '$E_0 = cB_0$'],
        ],
        'Summary table of displacement current, the Ampere–Maxwell law, sources, nature, speed and field ratio of EM waves',
      ),
      n: 'To sum up: a changing electric flux acts as a displacement current, epsilon nought d phi E by dt, which makes Ampere’s law hold everywhere. Changing electric and magnetic fields sustain each other, so accelerated charges send out electromagnetic waves. These are transverse, with E and B perpendicular and in phase, and they travel through vacuum at one over root mu nought epsilon nought, the speed of light, with E nought equal to c B nought.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'Explain the need for displacement current with the two surfaces bounded by one loop.',
        'Give $I_d = \\varepsilon_0 d\\Phi_E/dt$ and say it equals the conduction current in the leads.',
        'Transverse: draw E along y, B along z, travel along x; E × B gives the direction.',
        'Use $c = f\\lambda$ and $E_0 = cB_0$; keep units (MHz, nm) in SI.',
      ],
      v: table(['Asked', 'Key point'], [['Why displacement current?', 'Ampere’s law gave two answers for one loop'], ['Source of EM waves', 'Accelerated charges'], ['Why transverse?', 'E and B both ⟂ to direction of travel']], 'Table of common questions and the key point for each'),
      n: 'For the displacement current question, describe the two surfaces with the same boundary and the contradiction they produce, then give Maxwell’s fix. Mention that accelerated charges are the source of EM waves. When asked about the transverse nature, draw the three perpendicular directions. And convert megahertz and nanometres before using c equals f lambda.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Electromagnetic Waves — Part 2: The electromagnetic spectrum',
  goals: [
    'Arrange the bands of the electromagnetic spectrum in order of wavelength and frequency',
    'State how each band is produced and give its uses',
    'Use c = fλ to place a wave in the spectrum',
  ],
  slides: [
    sl('title', 'The electromagnetic spectrum', {
      b: 'Part 2 — one family of waves, from kilometre-long radio waves to gamma rays smaller than an atomic nucleus.',
      v: V.spec,
      n: 'Radio waves, microwaves, infrared, visible light, ultraviolet, X-rays and gamma rays are all the same kind of wave, differing only in wavelength and frequency. In this part we put them in order, see how each is produced, and list their uses in communication, cooking, medicine and science, from the mobile network to cancer therapy.',
    }),
    sl('diagram', 'The spectrum at a glance', {
      b: r`All bands travel at $c$ in vacuum and obey $c = f\lambda$: shorter wavelength means higher frequency (and higher photon energy, Chapter 11). The bands have no sharp edges; neighbouring bands overlap.`,
      v: V.spec,
      n: 'On a logarithmic scale the spectrum stretches over about eighteen powers of ten in wavelength. Radio waves are longest and gamma rays shortest. Because all of them travel at the same speed, a shorter wavelength always means a higher frequency. The visible band, which our eyes use, is a tiny sliver between infrared and ultraviolet. The names describe how the waves are produced and detected more than any sharp boundary.',
    }),
    sl('concept', 'Bands, sources and uses', {
      b: 'Each band is produced and detected in a characteristic way:',
      v: bandsTable,
      n: 'Here is the whole family in one table. Radio waves come from currents oscillating in aerials. Microwaves come from special valves called magnetrons and klystrons. Infrared comes from hot objects. Visible and ultraviolet light come from electrons changing energy levels in atoms. X-rays are made when fast electrons strike a metal target, and gamma rays come from atomic nuclei. Each band has its own uses.',
    }),
    sl('example', 'Worked example 4: a microwave oven', {
      b: r`A microwave oven works at 2.45 GHz. Find the wavelength of its microwaves.`,
      ul: [
        r`Step 1 — $\lambda = \dfrac{c}{f} = \dfrac{3.0 \times 10^{8}}{2.45 \times 10^{9}} \approx ${dec(ex4.lam, 3)}$ m (about 12 cm).`,
        'Step 2 — about 12 cm, at the long-wavelength edge of the microwave band (band edges are only approximate); the waves come from a magnetron, a microwave source.',
        'Use — water molecules absorb this energy and heat the food.',
      ],
      v: V.spec,
      n: 'Divide the speed of light by two point four five times ten to the nine hertz to get about twelve centimetres. That sits at the long end of the microwave band; the band edges are only rough, and oven waves are called microwaves because they come from a magnetron. The water in food absorbs them strongly, which is why the food heats while a dry glass plate stays cooler.',
    }),
    sl('concept', 'Radio waves and microwaves', {
      b: 'The longest waves:',
      ul: [
        '**Radio** (above about 0.1 m): AM broadcasting (about 0.5–1.7 MHz), FM (88–108 MHz), TV and mobile networks (hundreds of MHz to a few GHz).',
        '**Microwaves** (1 mm–0.1 m): radar for aircraft and weather, satellite links, microwave ovens (2.45 GHz), Wi-Fi.',
        'Both pass easily through the atmosphere; long radio waves bend round obstacles.',
      ],
      v: V.spec,
      n: 'Radio waves are produced by oscillating currents in aerials and are used for broadcasting and mobile communication. A medium-wave AM station near Delhi might broadcast near one megahertz, while FM stations use around one hundred megahertz. Microwaves, at higher frequencies, are used in radar, satellite communication, Wi-Fi and microwave ovens. Their short wavelengths can be focused into narrow beams.',
    }),
    sl('concept', 'Infrared and visible light', {
      b: 'In the middle of the spectrum:',
      ul: [
        '**Infrared** (700 nm–1 mm): emitted by hot bodies and vibrating molecules; felt as heat. Uses: TV remote controls, night-vision cameras, physiotherapy, weather satellites; greenhouse gases trap infrared from the Earth.',
        '**Visible** (about 400–700 nm): emitted by electrons changing levels in atoms (and by very hot bodies). Red has the longest wavelength, violet the shortest.',
      ],
      v: V.spec,
      n: 'Infrared radiation is given out by anything warm, from a stove to your own body. Night-vision cameras detect it, physiotherapists use it to warm muscles, and remote controls send infrared pulses to the TV. Carbon dioxide and water vapour absorb infrared leaving the Earth, keeping the planet warm. Visible light runs from red at about seven hundred nanometres to violet at about four hundred.',
    }),
    sl('check', 'Quick check: ordering the spectrum', {
      b: 'Choose the correct order.',
      v: V.spec,
      chk: 'order-mcq',
      n: 'Recall the order of the bands from longest to shortest wavelength, starting with radio.',
    }),
    sl('concept', 'Ultraviolet, X-rays and gamma rays', {
      b: 'The shortest, most energetic waves:',
      ul: [
        '**Ultraviolet** (1–400 nm): from the Sun and arc lamps; causes sunburn; kills germs (water purifiers); most is absorbed by the **ozone layer**; used in LASIK eye surgery.',
        '**X-rays** (about 1 pm–1 nm): made when fast electrons hit a metal target; pass through soft tissue but not bone — medical imaging; studying crystal structures.',
        '**Gamma rays** (below about 1 pm): from radioactive nuclei; used to kill cancer cells and sterilise medical equipment; dangerous to living cells.',
      ],
      v: V.spec,
      n: 'Ultraviolet from the Sun tans and burns skin, and most of it is absorbed by the ozone layer high in the atmosphere. Ultraviolet lamps kill germs in water purifiers. X-rays pass through flesh but are stopped by bone, which makes X-ray pictures possible. Gamma rays, from radioactive nuclei, are the most penetrating; carefully aimed beams destroy cancer cells. All three can damage living tissue.',
    }),
    sl('example', 'Worked example 5: placing waves in the spectrum', {
      b: r`Name the band of (a) a wave of wavelength $5.0 \times 10^{-10}$ m, (b) a wave of frequency $1.0 \times 10^{15}$ Hz.`,
      ul: [
        r`(a) $0.50$ nm lies between 1 pm and 1 nm: **X-rays**.`,
        r`(b) $\lambda = \dfrac{c}{f} = \dfrac{3.0 \times 10^{8}}{1.0 \times 10^{15}} = ${sci(ex5.lamUV, 2)}$ m, i.e. 300 nm: **ultraviolet** (just shorter than violet light).`,
      ],
      v: table(['Given', 'Wavelength', 'Band'], [['λ = 5.0 × 10⁻¹⁰ m', '0.50 nm', 'X-rays'], ['f = 1.0 × 10¹⁵ Hz', '300 nm', 'Ultraviolet']], 'Worked table: 0.50 nanometre is in the X-ray band; 300 nanometres is ultraviolet'),
      n: 'For part a, convert to nanometres: half a nanometre, which falls in the X-ray band. For part b, first find the wavelength with c over f: three times ten to the minus seven metre, or three hundred nanometres. That is a little shorter than violet light, so it is ultraviolet. Always convert to a wavelength and compare with the band limits.',
    }),
    sl('two-column', 'Frequency, wavelength and penetration', {
      b: 'Patterns across the spectrum:',
      cols: [
        '**Towards radio**\n- Longer λ, lower f\n- Lower photon energy\n- Bends round obstacles\n- Safe at everyday intensities',
        '**Towards gamma**\n- Shorter λ, higher f\n- Higher photon energy\n- Ionises atoms, damages cells\n- Very penetrating (X, γ)',
      ],
      v: V.spec,
      n: 'Moving from radio towards gamma rays, the wavelength shrinks and the frequency rises, and so does the energy each photon carries. Radio waves bend round buildings and hills and are harmless at ordinary intensities. Ultraviolet, X-rays and gamma rays carry enough energy per photon to knock electrons out of atoms, so they can damage living cells and must be used with care.',
    }),
    sl('check', 'Quick check: a use of each band', {
      b: 'Match the use to the band.',
      v: bandsTable,
      chk: 'uses-match',
      n: 'Think about which band each device depends on: the remote control, the oven, the bone image and the cancer treatment.',
    }),
    sl('check', 'Quick check: the ozone layer', {
      b: 'Choose the band absorbed by the ozone layer.',
      v: V.spec,
      chk: 'ozone-mcq',
      n: 'Which radiation from the Sun causes sunburn and is mostly stopped high in the atmosphere?',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: bandsTable,
      n: 'To sum up: the electromagnetic spectrum runs from radio waves through microwaves, infrared, visible light and ultraviolet to X-rays and gamma rays. All travel at c in vacuum, with c equals f lambda, so shorter wavelengths have higher frequencies and more energetic photons. Each band is produced in its own way, from oscillating currents in aerials to changes inside nuclei, and has its own uses.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'Memorise the order: radio, microwave, infrared, visible, ultraviolet, X-rays, gamma (decreasing λ).',
        'For each band, learn one source and two uses.',
        'Convert frequency to wavelength with $\\lambda = c/f$ before naming a band.',
        'Band boundaries are approximate; give the band whose typical range contains the value.',
      ],
      v: V.spec,
      n: 'Learn the order of the bands by heart, from radio to gamma. For each band, be ready with one way it is produced and two uses. When a question gives a frequency, convert it to a wavelength before deciding the band. And remember that the boundaries are not sharp: answer with the band whose usual range contains the value.',
    }),
  ],
});
