// ch08 further items added in the verifier pass (bank size and competency balance). Imported last by questions.mjs.
import { mk, add, r, dec, sci, near } from '../../cbse-12-physics-ch01/src/lib.mjs';
import { C } from './decks.mjs';

const { mcq, tf, num, short, part } = mk;

add('amfm-mcq', mcq({
  stem: 'An AM station broadcasts at 1.0 MHz and an FM station at 100 MHz. Compared with the FM waves, the wavelength of the AM waves is',
  right: '100 times longer',
  wrong: ['100 times shorter', 'the same', '10 times longer'],
  sol: 'λ = c/f, so a frequency 100 times lower means a wavelength 100 times longer (300 m against 3 m) — option (@K).',
  d: 2, c: 'application', t: [3],
}));
const uv = C / 250e-9;
add('uv-num', num({
  stem: 'A germicidal lamp emits ultraviolet light of wavelength 250 nm. Find its frequency, in terahertz (1 THz = 10¹² Hz).',
  value: uv / 1e12, tol: 5, unit: 'THz',
  sol: r`$f = \dfrac{c}{\lambda} = \dfrac{3.0 \times 10^{8}}{250 \times 10^{-9}} = ${sci(uv, 2)}$ Hz. In THz: $${sci(uv, 2)}/10^{12} = ${dec(uv / 1e12, 4)}$.`,
  scheme: [['f = c/λ = 1200 THz', 1]],
  d: 2, c: 'application', t: [3],
}), (q) => near(uv / 1e12, q.answer.value) || 'uv');
add('plates-mcq', mcq({
  stem: 'A capacitor with circular plates is charged by a steady current I. The magnetic field at a point between the plates, a fixed distance from the axis, is B. If the charging current is doubled, the field at that point becomes',
  right: '2B',
  wrong: ['B', 'B/2', '4B'],
  sol: 'The displacement current through any circle in the gap is proportional to the charging current, so B doubles — option (@K).',
  d: 2, c: 'application', t: [1],
}));
const nl = C / 2.25e8;
add('n-num', num({
  stem: 'Light travels at 2.25 × 10⁸ m s⁻¹ in a liquid. Find the refractive index of the liquid (3 significant figures).',
  value: Number(dec(nl, 3)), tol: 0.01, unit: null,
  sol: r`$n = \dfrac{c}{v} = \dfrac{3.0 \times 10^{8}}{2.25 \times 10^{8}} \approx ${dec(nl, 3)}$.`,
  scheme: [['n = c/v ≈ 1.33', 1]],
  d: 2, c: 'application', t: [2],
}), (q) => near(nl, q.answer.value) || 'n');
add('halfl-mcq', mcq({
  stem: 'The frequency of an electromagnetic wave in vacuum is doubled. Its wavelength',
  right: 'halves',
  wrong: ['doubles', 'stays the same', 'becomes four times'],
  sol: 'c = fλ is fixed in vacuum, so λ ∝ 1/f — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('ratio-medium-mcq', mcq({
  stem: 'An EM wave travels in glass of refractive index 1.5 (non-magnetic). The ratio of its peak electric field to its peak magnetic field, E₀/B₀, is about',
  right: '$2.0 \\times 10^{8}$ m s$^{-1}$',
  wrong: ['$3.0 \\times 10^{8}$ m s$^{-1}$', '$4.5 \\times 10^{8}$ m s$^{-1}$', '1.5'],
  sol: r`In a medium $E_0/B_0$ equals the wave speed $v = c/n = 3.0 \times 10^{8}/1.5 = 2.0 \times 10^{8}$ m s$^{-1}$ — option (@K).`,
  d: 3, c: 'application', t: [2],
}), () => near(C / 1.5, 2e8) || 'v');
add('remote-mcq', mcq({
  stem: 'A TV remote control sends pulses of radiation of wavelength 940 nm. This radiation is',
  right: 'infrared',
  wrong: ['visible red light', 'ultraviolet', 'microwave'],
  sol: '940 nm is longer than the 700 nm red limit of visible light but much shorter than 1 mm: infrared — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('sunburn-mcq', mcq({
  stem: 'Sunburn after a long day on a beach in Goa is caused mainly by',
  right: 'ultraviolet radiation from the Sun',
  wrong: ['infrared radiation from the sand', 'visible yellow light', 'microwaves from the Sun'],
  sol: 'Ultraviolet photons are energetic enough to damage skin cells — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('oscfreq-mcq', mcq({
  stem: 'Electrons in a transmitting aerial oscillate 9.0 × 10⁷ times per second. The waves it sends out have',
  right: 'frequency 90 MHz and wavelength about 3.3 m',
  wrong: ['frequency 45 MHz and wavelength about 6.7 m', 'frequency 180 MHz and wavelength about 1.7 m', 'frequency 90 MHz and wavelength about 0.33 m'],
  sol: r`The radiated frequency equals the oscillation frequency, 90 MHz; $\lambda = \dfrac{3.0 \times 10^{8}}{9.0 \times 10^{7}} \approx ${dec(C / 9e7, 2)}$ m — option (@K).`,
  d: 2, c: 'application', t: [2, 3],
}), () => near(C / 9e7, 3.33, 0.01) || 'osc');
add('changing-tf', tf({
  stem: 'A displacement current exists only where the electric flux is changing with time.',
  key: 't',
  sol: 'True. I_d = ε₀ dΦE/dt, so a constant electric flux gives no displacement current.',
  d: 1, c: 'understanding', t: [1],
}));

const su = { lam: 300e-9 };
su.f = C / su.lam;
add('sun-case', mk.case({
  passage: 'The Sun emits radiation across the spectrum. Measurements at a high-altitude observatory in Ladakh show more ultraviolet reaching the ground there than in the plains, because there is less atmosphere above. The ozone layer, 15–35 km up, absorbs most solar ultraviolet with wavelengths below about 300 nm.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Radiation of wavelength 280 nm belongs to which band?',
      right: 'Ultraviolet',
      wrong: ['Visible (violet)', 'Infrared', 'X-rays'],
      sol: '280 nm is shorter than the 400 nm violet limit and longer than 1 nm: ultraviolet — option (@K).',
      d: 1, c: 'understanding', t: [3],
    })),
    part('b', num({
      stem: 'Find the frequency of 300 nm ultraviolet, in terahertz.',
      value: su.f / 1e12, tol: 5, unit: 'THz',
      sol: r`$f = \dfrac{c}{\lambda} = \dfrac{3.0 \times 10^{8}}{300 \times 10^{-9}} = ${sci(su.f, 2)}$ Hz. In THz: $${sci(su.f, 2)}/10^{12} = ${dec(su.f / 1e12, 4)}$.`,
      scheme: [['f = 1000 THz', 1]],
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why thinning of the ozone layer is a health concern.',
      model: 'Ozone absorbs most of the Sun’s short-wavelength **ultraviolet**. If the layer thins, more UV reaches the ground. UV photons are energetic enough to **damage skin cells and DNA**, increasing sunburn, skin cancer and eye damage (cataracts).',
      sol: 'More UV reaches the ground.',
      scheme: [['Less ozone, more UV reaches the ground', 1], ['UV damages skin/eyes (cancer, cataract)', 1]],
      d: 2, c: 'application', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'A trekker says that on a cold, clear day in Ladakh she cannot get sunburnt because the air feels cool. Evaluate this belief.',
        model: 'The belief is **wrong**. Feeling cool depends on the air temperature and on **infrared**, whereas sunburn is caused by **ultraviolet**. At high altitude there is less atmosphere to absorb UV, so the UV dose is **higher**, not lower; snow also reflects UV. She should use sunscreen and dark glasses.',
        sol: 'Separate the warmth (infrared) from the sunburn (UV).',
        scheme: [['Sunburn due to UV, not warmth (infrared)', 1], ['UV is stronger at altitude: belief wrong', 1]],
        d: 3, c: 'evaluation', t: [3],
      }),
    ]),
  ],
}), (q) => near(su.f, 1e15) && near(q.children[1].answer.value, 1000) || 'sun');
