// ISC 12 Physics ch16 Optical Instruments — two decks: Part 1 (t01–t02) the simple and the compound microscope; Part 2
// (t03–t05) the refracting astronomical telescope, the Cassegrain reflecting telescope, the resolving power of a
// microscope and the uses, advantages and drawbacks of optical instruments. D = 25 cm throughout; magnifying powers are
// quoted as magnitudes. Numbers computed here.
import { sl, deck, table, svgV, plot, r, dec } from '../../isc-12-physics-ch01/src/lib.mjs';
import * as G from './svgs.mjs';

const { D, simpleM, compound, telescope, cassegrain, dmin, objectFor } = G;

// ---------------------------------------------------------------- worked-example numbers
const ex1 = { f: 12.5 };
Object.assign(ex1, simpleM(ex1.f));
ex1.u = objectFor(-D, ex1.f);
const ex2 = compound(G.CD_DATA);
const ex3 = { fo: 0.6, vo: 18, fe: 2 };
ex3.mo = ex3.vo / ex3.fo - 1;
ex3.uo = -ex3.vo / ex3.mo;
ex3.MD = ex3.mo * (1 + D / ex3.fe);
ex3.Minf = ex3.mo * (D / ex3.fe);
ex3.approxD = (ex3.vo / ex3.fo) * (1 + D / ex3.fe);
const ex4 = telescope({ fo: G.TEL_DATA.fo, fe: G.TEL_DATA.fe });
const ex5 = cassegrain(G.CASS_DATA);
const ex6 = { lambda: 550, s: 0.9, n: 1.52 };
ex6.dAir = ex6.lambda / (2 * ex6.s);
ex6.dOil = ex6.lambda / (2 * ex6.n * ex6.s);
ex6.RP = 1 / (ex6.dAir * 1e-9);
export const EX = { ex1, ex2, ex3, ex4, ex5, ex6 };
for (const [ok, msg] of [
  [Math.abs(ex1.atD - 3) < 1e-9 && Math.abs(ex1.atInf - 2) < 1e-9 && Math.abs(ex1.u + 25 / 3) < 1e-9, 'ex1'],
  [Math.abs(ex2.MD - 25) < 1e-9 && Math.abs(ex2.sepD - 14) < 1e-9 && Math.abs(ex2.Minf - 20) < 1e-9 && Math.abs(ex2.sepInf - 15.25) < 1e-9, 'ex2'],
  [Math.abs(ex3.mo - 29) < 1e-9 && Math.abs(G.lensImage(ex3.uo, ex3.fo).v - 18) < 1e-9 && Math.abs(ex3.MD - 391.5) < 1e-9 && Math.abs(ex3.Minf - 362.5) < 1e-9, 'ex3'],
  [Math.abs(ex4.Mn - 10) < 1e-9 && Math.abs(ex4.MD - 13.2) < 1e-9 && Math.abs(ex4.LD - 86.0606) < 1e-3, 'ex4'],
  [Math.abs(ex5.F - 240) < 1e-9 && Math.abs(ex5.M - 60) < 1e-9 && Math.abs(ex5.behind - 15) < 1e-9, 'ex5'],
  [Math.abs(ex6.dAir - dmin(550, 1, Math.asin(0.9))) < 1e-9 && Math.round(ex6.dOil) === 201, 'ex6'],
])
  if (!ok) throw new Error(`deck number check failed: ${msg}`);

export const V = {
  simpleD: svgV(G.SIMPLE_D, 'Simple microscope with the image at the least distance of distinct vision'),
  simpleInf: svgV(G.SINF, 'Simple microscope with the image at infinity, compared with the unaided eye'),
  compoundD: svgV(G.COMPOUND_D, 'Compound microscope with the final image at D, drawn to scale along the axis'),
  compoundInf: svgV(G.COMPOUND_INF, 'Compound microscope set for a relaxed eye'),
  teleInf: svgV(G.TELE_INF, 'Astronomical telescope in normal adjustment'),
  teleD: svgV(G.TELE_D, 'Astronomical telescope with the final image at D'),
  cass: svgV(G.CASS, 'Cassegrain reflecting telescope'),
  chroma: svgV(G.CHROMA, 'Chromatic aberration in a lens but not in a mirror'),
  resolve: svgV(G.RESOLVE, 'The cone of light that fixes the resolving power of an objective'),
};
export const magPlot = plot(
  {
    x: { min: 2, max: 25, label: 'focal length of the lens f (cm)' },
    y: { min: 0, max: 14, label: 'magnifying power' },
    functions: [
      { expr: '1 + 25/x', label: 'image at D: 1 + D/f', domain: [2, 25] },
      { expr: '25/x', label: 'image at infinity: D/f', domain: [2, 25] },
    ],
    points: [
      { at: [12.5, 3], label: 'f = 12.5 cm: 3' },
      { at: [12.5, 2], label: 'f = 12.5 cm: 2' },
    ],
  },
  'Graph of the magnifying power of a simple microscope against the focal length of its lens, from 2 to 25 centimetres: both curves fall steeply as the focal length grows; the curve for the image at D is always one unit above the curve for the image at infinity, 3 and 2 for a lens of 12.5 centimetres',
  'Shorter focal length, larger magnifying power; image at D always gives one more.',
);
export const resPlot = plot(
  {
    x: { min: 0.2, max: 1.5, label: 'numerical aperture n sin β' },
    y: { min: 0, max: 1400, label: 'smallest resolvable separation d (nm)' },
    functions: [
      { expr: '275/x', label: 'green light, 550 nm', domain: [0.2, 1.5] },
      { expr: '200/x', label: 'violet light, 400 nm', domain: [0.2, 1.5] },
    ],
    vlines: [{ x: 1, label: 'limit for a dry objective (n = 1)', dashed: true }],
    points: [
      { at: [0.9, 305.6], label: 'dry, sin β = 0.90' },
      { at: [1.368, 201], label: 'oil, n = 1.52' },
    ],
  },
  'Graph of the smallest separation a microscope can resolve against the numerical aperture n sine beta, for green light of 550 nanometres and violet light of 400 nanometres: the separation falls as the numerical aperture grows, and is always smaller for the shorter wavelength; a dry objective cannot exceed a numerical aperture of 1, while oil immersion goes beyond it',
  'd = λ/(2 n sin β): larger numerical aperture and shorter wavelength resolve finer detail.',
);
const defTable = table(
  ['Instrument', 'α (without the instrument)', 'β (with the instrument)'],
  [
    ['Microscope', 'Object held at D = 25 cm from the eye', 'Final image at the eye'],
    ['Telescope', 'Object at its actual (very large) distance', 'Final image at the eye'],
  ],
  'Table defining the two angles in the magnifying power beta over alpha: for a microscope, alpha is the angle of the object held at 25 centimetres; for a telescope, the angle of the object where it is; beta is always the angle of the final image at the eye',
);
const simpleTable = table(
  ['Simple microscope', 'Image at D', 'Image at infinity'],
  [
    ['Object position', 'Inside F, at |u| = fD/(f + D)', 'At F'],
    ['Magnifying power', '$1 + \\dfrac{D}{f}$', '$\\dfrac{D}{f}$'],
    ['Eye', 'Strained (near point)', 'Relaxed'],
    ['f = 12.5 cm', 'u = −8.33 cm, M = 3', 'u = −12.5 cm, M = 2'],
  ],
  'Table comparing the simple microscope with the image at D and at infinity: object position, magnifying power, state of the eye, and the values for a lens of focal length 12.5 centimetres',
);
const compTable = table(
  ['Compound microscope', 'Final image at D', 'Final image at infinity'],
  [
    ['Magnifying power', '$\\dfrac{v_o}{|u_o|}\\left(1 + \\dfrac{D}{f_e}\\right)$', '$\\dfrac{v_o}{|u_o|}\\cdot\\dfrac{D}{f_e}$'],
    ['Approximation', '$\\dfrac{L}{f_o}\\left(1 + \\dfrac{D}{f_e}\\right)$', '$\\dfrac{L}{f_o}\\cdot\\dfrac{D}{f_e}$'],
    ['Lens separation', '$v_o + |u_e|$', '$v_o + f_e$'],
    ['Example (fo 1.5, fe 6.25 cm)', 'M = 25, 14 cm', 'M = 20, 15.25 cm'],
  ],
  'Table comparing the compound microscope with the final image at D and at infinity: exact and approximate magnifying power, lens separation, and the values for the worked example',
);
const teleTable = table(
  ['Refracting telescope', 'Normal adjustment', 'Final image at D'],
  [
    ['Magnifying power', '$\\dfrac{f_o}{f_e}$', '$\\dfrac{f_o}{f_e}\\left(1 + \\dfrac{f_e}{D}\\right)$'],
    ['Length', '$f_o + f_e$', '$f_o + |u_e|$'],
    ['fo = 80 cm, fe = 8.0 cm', 'M = 10, L = 88 cm', 'M = 13.2, L = 86.1 cm'],
  ],
  'Table comparing the refracting telescope in normal adjustment and with the image at D: magnifying power, length and the values for the worked example',
);
const usesTable = table(
  ['Instrument', 'Uses', 'Advantages', 'Drawbacks'],
  [
    ['Simple microscope', 'Watch and jewellery repair, reading fine print, examining leaves and insects', 'Cheap, erect image, wide field', 'Magnifying power only up to about 10'],
    ['Compound microscope', 'Cells, bacteria, blood smears, metal grains', 'High magnifying power (up to about 1500)', 'Inverted image, small field, needs bright light; detail limited by resolving power'],
    ['Refracting telescope', 'Moon and planets, small observatories, finder scopes', 'Sealed tube, no central obstruction, little upkeep', 'Chromatic aberration; large lenses sag, absorb light and are costly; long tube; inverted image'],
    ['Reflecting telescope', 'Large research telescopes, faint galaxies, photography', 'No chromatic aberration, very large apertures, short tube', 'Secondary blocks some light; mirror needs re-coating and alignment'],
  ],
  'Table of the uses, advantages and drawbacks of the simple microscope, the compound microscope, the refracting telescope and the reflecting telescope',
);

export const deck1 = deck({
  part: 1,
  title: 'Optical Instruments — Part 1: Simple and compound microscopes',
  goals: [
    'Define magnifying power as β/α and derive it for a simple microscope with the image at D and at infinity',
    'Draw the ray diagram of a compound microscope and derive its magnifying power with the final image at D',
    'Use the expression for a compound microscope with the final image at infinity',
  ],
  slides: [
    sl('title', 'Optical Instruments', {
      b: 'Part 1 — making tiny things look big: the magnifying glass and the compound microscope.',
      v: V.compoundD,
      n: 'A grain of pollen or a red blood cell is far too small to see in detail with the eye alone. Optical instruments do not make objects bigger; they make them look bigger by increasing the angle they subtend at the eye. In this part we work out how much a single convex lens can do, and how two lenses together form a compound microscope.',
    }),
    sl('concept', 'Angular size and magnifying power', {
      b: r`How big an object **looks** depends on the angle it subtends at the eye. The eye cannot focus closer than the **near point**, the least distance of distinct vision, $D = 25$ cm. The **magnifying power** of an instrument is
$$M = \dfrac{\beta}{\alpha} = \dfrac{\text{angle subtended at the eye by the final image}}{\text{angle subtended by the object without the instrument}}$$`,
      ul: ['For a microscope, α is the angle when the object is held at D, the closest the unaided eye can view it clearly.', 'For small angles, an angle is (height)/(distance).'],
      v: defTable,
      n: 'An object looks larger when it subtends a larger angle at the eye. Bringing it closer helps, but only down to the near point, about twenty five centimetres, where the eye can still focus. So we compare two angles: beta, the angle of the final image seen through the instrument, and alpha, the angle of the object viewed as well as possible without it. Their ratio is the magnifying power.',
    }),
    sl('diagram', 'Simple microscope: image at D', {
      b: r`Hold a convex lens close to the eye with the object **inside F**. The image is virtual, erect and enlarged; put it at D: $v = -D$. With the eye at the lens, $\beta = \dfrac{h}{|u|}$ and $\alpha = \dfrac{h}{D}$, so $M = \dfrac{D}{|u|}$.
From $\dfrac{1}{v} - \dfrac{1}{u} = \dfrac{1}{f}$ with $v = -D$: $\dfrac{1}{|u|} = \dfrac{1}{f} + \dfrac{1}{D}$, hence
$$M = 1 + \dfrac{D}{f}$$`,
      v: V.simpleD,
      n: 'Place the object inside the focus of a convex lens held close to the eye. The lens forms a virtual, erect, enlarged image, and we adjust it to lie at the near point. The object subtends an angle h over u at the eye, compared with h over D when held at the near point without the lens. Using the lens formula with v equal to minus D, the ratio becomes one plus D over f.',
    }),
    sl('diagram', 'Simple microscope: image at infinity', {
      b: r`For a **relaxed eye**, put the object **at F**: the rays leave the lens parallel and the image is at infinity. Now $\beta = \dfrac{h}{f}$ and still $\alpha = \dfrac{h}{D}$, so
$$M = \dfrac{D}{f}$$`,
      ul: ['This is one less than with the image at D, but the eye can view it for a long time without strain.', 'In both cases a lens of shorter focal length magnifies more.'],
      v: V.simpleInf,
      n: 'Viewing an image at the near point strains the eye. If the object is moved out to the focus, the rays leave the lens parallel and the relaxed eye sees the image at infinity. The object then subtends h over f at the lens, and the magnifying power is D over f, one less than before. Either way, a lens with a shorter focal length gives a larger magnifying power.',
    }),
    sl('check', 'Quick check: a magnifier', {
      b: 'Choose the correct option.',
      v: simpleTable,
      chk: 'nearpoint-mcq',
      n: 'How do the two magnifying powers of the same lens differ?',
    }),
    sl('example', 'Worked example 1: a reading magnifier', {
      b: 'A reading magnifier is a convex lens of focal length 12.5 cm. Find (a) where the print must be held for the image to form at D = 25 cm, (b) the magnifying power then, (c) the magnifying power with the image at infinity.',
      ul: [
        r`(a) $\dfrac{1}{|u|} = \dfrac{1}{12.5} + \dfrac{1}{25} = \dfrac{3}{25}$, so the print is ${dec(-ex1.u, 3)} cm from the lens.`,
        r`(b) $M = 1 + \dfrac{25}{12.5} = ${dec(ex1.atD, 1)}$ (also the linear magnification $v/u = 25/8.33$).`,
        r`(c) Print at F, 12.5 cm away: $M = \dfrac{25}{12.5} = ${dec(ex1.atInf, 1)}$.`,
      ],
      v: V.simpleD,
      n: 'For the image at the near point, one over u is one over twelve and a half plus one over twenty five, which is three over twenty five, so the print is about eight point three centimetres from the lens. The magnifying power is one plus twenty five over twelve and a half, which is three. With the print at the focus and a relaxed eye it is two.',
    }),
    sl('concept', 'Why a single lens is not enough', {
      b: 'To magnify more, a simple microscope needs a shorter focal length. But a lens of focal length a few millimetres is tiny and strongly curved: the object must be almost touching it, the field of view is small, and the image is blurred and coloured by **aberrations**.',
      ul: ['In practice a simple microscope gives M up to about 10.', 'For more, use two lenses: a compound microscope.'],
      v: magPlot,
      n: 'The graph shows that the magnifying power rises steeply as the focal length gets shorter. So why not use a lens of a few millimetres? Such a lens is tiny and very curved, the object almost touches it, and the image suffers from blurring and coloured fringes. Simple magnifiers therefore stop at about ten times. For more, we use two lenses one after the other.',
    }),
    sl('diagram', 'The compound microscope', {
      b: r`The **objective** (short focal length $f_o$, small aperture) faces the object, placed **just beyond $F_o$**. It forms a **real, inverted, enlarged** image A′B′ inside the tube. The **eyepiece** (focal length $f_e$) acts as a simple microscope on A′B′, which lies **inside $F_e$**, and forms a large **virtual** final image A″B″ at D.`,
      ul: ['The final image is inverted with respect to the object.', 'The diagram is drawn to scale along the axis; only the heights are enlarged.'],
      v: V.compoundD,
      n: 'A compound microscope has two converging lenses. The objective, of very short focal length, is placed so that the object sits just beyond its focus. It forms a real, inverted and enlarged image inside the tube. The eyepiece is set so that this image lies just inside its own focus; it acts as a magnifying glass and forms a large virtual image at the near point. The final image is upside down.',
    }),
    sl('concept', 'Magnifying power with the final image at D', {
      b: r`Let A′B′ have height $h'$ and be $|u_e|$ from the eyepiece. The final image subtends $\beta = \dfrac{h'}{|u_e|}$ at the eye; the object at D would subtend $\alpha = \dfrac{h}{D}$. So
$$M = \dfrac{\beta}{\alpha} = \dfrac{h'}{h}\cdot\dfrac{D}{|u_e|} = m_o\, m_e,\qquad m_o = \dfrac{v_o}{|u_o|},\quad m_e = 1 + \dfrac{D}{f_e}$$
$$M = \dfrac{v_o}{|u_o|}\left(1 + \dfrac{D}{f_e}\right) \approx \dfrac{L}{f_o}\left(1 + \dfrac{D}{f_e}\right)$$`,
      ul: [r`Approximation: the object is close to $F_o$ ($|u_o| \approx f_o$) and $v_o \approx L$, the distance of A′B′ from the objective (about the tube length).`],
      v: V.compoundD,
      n: 'The final image subtends at the eye the same angle as the intermediate image, h dash over u e. Without the microscope the object at the near point subtends h over D. The ratio splits into two factors: the linear magnification of the objective, v o over u o, and the magnifying power of the eyepiece used as a simple microscope, one plus D over f e. Since the object is close to the focus, v o over u o is roughly L over f o.',
    }),
    sl('check', 'Quick check: the final image', {
      b: 'Choose the correct option.',
      v: V.compoundD,
      chk: 'finalimage-mcq',
      n: 'Which lens turns the image upside down, and which lens only enlarges it?',
    }),
    sl('example', 'Worked example 2: a compound microscope', {
      b: 'A microscope has an objective of focal length 1.5 cm and an eyepiece of focal length 6.25 cm. An object is 1.8 cm in front of the objective and the final image forms at D = 25 cm. Find the magnifying power and the distance between the lenses.',
      ul: [
        r`Objective: $\dfrac{1}{v_o} = \dfrac{1}{1.5} - \dfrac{1}{1.8} = \dfrac{1}{9.0}$, $v_o = ${dec(ex2.vo, 2)}$ cm, $m_o = \dfrac{9.0}{1.8} = ${dec(ex2.mo, 1)}$.`,
        r`Eyepiece (image at D): $\dfrac{1}{|u_e|} = \dfrac{1}{6.25} + \dfrac{1}{25} = \dfrac{1}{5.0}$, $|u_e| = ${dec(-ex2.ueD, 2)}$ cm; $m_e = 1 + \dfrac{25}{6.25} = 5$.`,
        r`$M = m_o m_e = ${dec(ex2.MD, 2)}$; lenses $9.0 + 5.0 = ${dec(ex2.sepD, 2)}$ cm apart.`,
      ],
      v: V.compoundD,
      n: 'The objective gives one over v o equals one over one point five minus one over one point eight, so v o is nine centimetres and it magnifies five times. For the image at the near point, the eyepiece needs its object five centimetres away, and it magnifies one plus twenty five over six and a quarter, which is five. The magnifying power is twenty five, and the lenses are fourteen centimetres apart.',
    }),
    sl('concept', 'Final image at infinity (expression only)', {
      b: r`For a relaxed eye, the eyepiece is moved out until A′B′ lies **at $F_e$**; the final image is at infinity:
$$M = \dfrac{v_o}{|u_o|}\cdot\dfrac{D}{f_e} \approx \dfrac{L}{f_o}\cdot\dfrac{D}{f_e},\qquad \text{lens separation } v_o + f_e$$`,
      ul: ['The ISC syllabus asks for this expression only; its derivation is not required.', 'Worked example 2 set this way: M = 5 × 25/6.25 = 20, lenses 15.25 cm apart.'],
      v: V.compoundInf,
      n: 'Most people use a microscope with a relaxed eye. The eyepiece is then moved out until the first image sits exactly at its focus, so the rays leave parallel and the final image is at infinity. The eyepiece factor becomes D over f e instead of one plus D over f e. You need to know this expression, but not its derivation. For our example the power drops from twenty five to twenty.',
    }),
    sl('example', 'Worked example 3: a laboratory microscope', {
      b: 'A laboratory microscope has an objective of focal length 0.60 cm, which forms its image 18 cm from it, and an eyepiece of focal length 2.0 cm. Find the magnifying power (a) with the final image at D, (b) at infinity. Compare with the estimate L/f_o.',
      ul: [
        r`Objective: $m_o = \dfrac{v_o}{|u_o|} = \dfrac{v_o}{f_o} - 1 = 30 - 1 = ${dec(ex3.mo, 2)}$ (the object is ${dec(-ex3.uo, 3)} cm away).`,
        r`(a) $M = 29\left(1 + \dfrac{25}{2.0}\right) = 29 \times 13.5 = ${dec(ex3.MD, 4)}$. (b) $M = 29 \times 12.5 = ${dec(ex3.Minf, 4)}$.`,
        r`Estimate with $L/f_o = 30$: $M \approx ${dec(ex3.approxD, 3)}$ at D, about 3% high.`,
      ],
      v: compTable,
      n: 'From the lens formula, the objective’s magnification is v o over f o minus one, which here is twenty nine. With the final image at the near point the eyepiece contributes thirteen and a half, giving a magnifying power of about three hundred and ninety. With a relaxed eye it contributes twelve and a half, giving about three hundred and sixty. The quick estimate L over f o gives thirty instead of twenty nine, a few per cent high.',
    }),
    sl('concept', 'Choosing the lenses', {
      b: r`Since $M \approx \dfrac{L}{f_o}\left(1 + \dfrac{D}{f_e}\right)$, a powerful microscope needs:`,
      ul: ['An objective of **very short** $f_o$ (a few millimetres): a large real image of an object just beyond $F_o$.', 'An eyepiece of **short** $f_e$: a strong magnifier for that image.', 'A longer tube helps too, but tubes are kept to about 16–20 cm for convenience.', 'Placing the object at 2F would give m_o = 1: no gain from the objective.'],
      v: table(['Change', 'Effect on M'], [['Shorter f_o', 'Larger (objective image bigger)'], ['Shorter f_e', 'Larger (eyepiece magnifies more)'], ['Longer tube', 'Larger'], ['Image moved from D to infinity', 'Smaller by a factor D/(f_e + D)']], 'Table of how shorter focal lengths, a longer tube and moving the final image to infinity change the magnifying power of a compound microscope'),
      n: 'The formula tells us how to design a microscope. The objective should have a very short focal length, so that an object just beyond its focus gives a large real image far down the tube. The eyepiece should also have a short focal length, so that it magnifies that image strongly. If the object were placed at twice the focal length, the objective would not magnify at all.',
    }),
    sl('check', 'Quick check: a microscope calculation', {
      b: 'Calculate the magnifying power.',
      v: compTable,
      chk: 'compoundD-num',
      n: 'Find the image distance of the objective first, then multiply its magnification by one plus D over the eyepiece focal length.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results (D = 25 cm, magnitudes):',
      v: table(
        ['Instrument', 'Magnifying power'],
        [
          ['Definition', '$M = \\beta/\\alpha$; for microscopes α is the object at D'],
          ['Simple microscope', '$1 + \\dfrac{D}{f}$ (image at D); $\\dfrac{D}{f}$ (at infinity)'],
          ['Compound, image at D', '$\\dfrac{v_o}{|u_o|}\\left(1 + \\dfrac{D}{f_e}\\right) \\approx \\dfrac{L}{f_o}\\left(1 + \\dfrac{D}{f_e}\\right)$'],
          ['Compound, image at infinity', '$\\dfrac{v_o}{|u_o|}\\cdot\\dfrac{D}{f_e}$ (expression only)'],
        ],
        'Summary table of the definition of magnifying power and the formulae for the simple and compound microscope',
      ),
      n: 'To sum up: magnifying power is the ratio of the angle subtended by the final image to the angle subtended by the object at the near point. A simple microscope gives one plus D over f with the image at D, and D over f with the image at infinity. A compound microscope multiplies the objective’s linear magnification by the eyepiece’s magnifying power.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'State what α and β are before deriving; say the eye is close to the lens.',
        'Simple microscope: put v = −D in the lens formula to get 1/|u| = 1/f + 1/D.',
        'Compound microscope diagram: object just beyond F_o, A′B′ inside F_e, final image at D, arrows on rays.',
        'Use v_o/|u_o| when the object distance is given; L/f_o only as an estimate.',
        'The derivation for the image at infinity is not asked; quote the expression.',
      ],
      v: table(['Asked', 'Key point'], [['Simple microscope M at D', '1 + D/f'], ['Lens separation (image at D)', 'v_o + |u_e|'], ['Final image of a microscope', 'Virtual, inverted, enlarged']], 'Table of common questions and the key point for each'),
      n: 'Begin each derivation by saying what alpha and beta are, and that the eye is close to the lens. For the simple microscope, put v equal to minus D in the lens formula. In the compound microscope diagram, show the object just beyond the focus of the objective and the first image inside the focus of the eyepiece. Use the exact objective magnification when the data allow it.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Optical Instruments — Part 2: Telescopes and resolving power',
  goals: [
    'Derive the magnifying power of a refracting astronomical telescope in normal adjustment and with the image at D',
    'Draw a Cassegrain reflecting telescope and give its advantages over a refractor',
    'State the factors that fix the resolving power of a microscope, and list uses, advantages and drawbacks of optical instruments',
  ],
  slides: [
    sl('title', 'Telescopes and Resolving Power', {
      b: 'Part 2 — bringing distant objects closer, and the limit to how much detail any instrument can show.',
      v: V.teleInf,
      n: 'The Moon’s craters and Saturn’s rings are huge, but so far away that they subtend tiny angles. A telescope increases those angles. In this part we study the refracting astronomical telescope, the mirror telescopes used by large observatories, and then a different question: not how much a microscope magnifies, but how fine a detail it can actually separate.',
    }),
    sl('concept', 'The refracting astronomical telescope', {
      b: 'Two converging lenses on a common axis:',
      ul: ['**Objective:** long focal length $f_o$ and **large aperture**, to collect plenty of light from the distant object and form a real image at its focus.', '**Eyepiece:** short focal length $f_e$, a magnifier for that image.', 'The object cannot be brought closer, so α is the angle it subtends where it is (practically, at the objective or the eye).'],
      v: table(['Lens', 'Focal length', 'Aperture', 'Job'], [['Objective', 'Long (e.g. 80 cm–2 m)', 'Large', 'Collects light, forms a real image at F_o'], ['Eyepiece', 'Short (a few cm)', 'Small', 'Magnifies that image']], 'Table comparing the objective and the eyepiece of a refracting telescope: focal length, aperture and job'),
      n: 'An astronomical telescope also uses two converging lenses, but the roles are reversed compared with a microscope. The objective has a long focal length and a wide aperture, to gather as much light as possible and form a real image of the distant object at its focus. The eyepiece has a short focal length and magnifies that image. Because we cannot bring a star closer, alpha is simply the angle it subtends where it is.',
    }),
    sl('diagram', 'Normal adjustment: image at infinity', {
      b: r`Rays from the top of a distant object arrive parallel at angle α. The objective focuses them to I in its focal plane, a height $h$ below the axis: $\alpha = \dfrac{h}{f_o}$. In **normal adjustment** I is also at the focus of the eyepiece, so the rays leave parallel at angle $\beta = \dfrac{h}{f_e}$:
$$M = \dfrac{\beta}{\alpha} = \dfrac{f_o}{f_e},\qquad L = f_o + f_e$$`,
      ul: ['The final image is at infinity and inverted.'],
      v: V.teleInf,
      n: 'Rays from the top of a distant object reach the objective parallel to one another, at a small angle alpha. The objective brings them to a point in its focal plane, at a height h equal to f o times alpha. In normal adjustment that point is also at the focus of the eyepiece, so the rays leave parallel at angle beta equal to h over f e. The ratio is f o over f e, and the lenses are f o plus f e apart.',
    }),
    sl('diagram', 'Final image at D', {
      b: r`Push the eyepiece in until I is a distance $|u_e|$ inside its focus, with the final image at D: $\dfrac{1}{|u_e|} = \dfrac{1}{f_e} + \dfrac{1}{D}$. Now $\beta = \dfrac{h}{|u_e|}$ and $\alpha = \dfrac{h}{f_o}$:
$$M = \dfrac{f_o}{|u_e|} = \dfrac{f_o}{f_e}\left(1 + \dfrac{f_e}{D}\right),\qquad L = f_o + |u_e|$$`,
      ul: ['Larger M than in normal adjustment, slightly shorter tube, but a strained eye.'],
      v: V.teleD,
      n: 'If the eyepiece is pushed a little towards the objective, the first image lies just inside its focus and the final image moves in to the near point. The eyepiece now sees its object at a distance u e, given by the lens formula with v equal to minus D. Beta becomes h over u e, and the magnifying power becomes f o over f e times one plus f e over D: a little larger, with a slightly shorter tube.',
    }),
    sl('example', 'Worked example 4: a school telescope', {
      b: 'A telescope has an objective of focal length 80 cm and an eyepiece of focal length 8.0 cm. Find its magnifying power and length (a) in normal adjustment, (b) with the final image at D = 25 cm.',
      ul: [
        r`(a) $M = \dfrac{80}{8.0} = ${dec(ex4.Mn, 2)}$; $L = 80 + 8.0 = ${dec(ex4.Ln, 2)}$ cm.`,
        r`(b) $\dfrac{1}{|u_e|} = \dfrac{1}{8.0} + \dfrac{1}{25} = \dfrac{33}{200}$, $|u_e| = ${dec(-ex4.ueD, 3)}$ cm; $M = 10\left(1 + \dfrac{8.0}{25}\right) = ${dec(ex4.MD, 3)}$; $L = ${dec(ex4.LD, 4)}$ cm.`,
      ],
      v: teleTable,
      n: 'In normal adjustment the magnifying power is eighty over eight, which is ten, and the lenses are eighty eight centimetres apart. For the image at the near point, the eyepiece needs its object about six centimetres away, so the tube shortens to about eighty six centimetres, and the magnifying power rises to ten times one point three two, which is thirteen point two.',
    }),
    sl('check', 'Quick check: moving the eyepiece', {
      b: 'Choose the correct option.',
      v: V.teleD,
      chk: 'teleD-mcq',
      n: 'Compare the two formulas for the magnifying power and the two tube lengths.',
    }),
    sl('concept', 'Inverted images, brightness and size', {
      b: 'An astronomical telescope gives an **inverted** image. That does not matter for stars and planets; terrestrial telescopes and binoculars add an erecting lens or prisms.',
      ul: ['A wider objective collects more light (in proportion to its area), so faint objects look brighter and finer detail is resolved; M depends only on the focal lengths.', 'Large lenses are heavy, sag, absorb light and show colour fringes: very large telescopes use mirrors.'],
      v: table(['Objective diameter', 'Light collected (relative)'], [['5 cm', '1'], ['10 cm', '4'], ['20 cm', '16']], 'Table of how the light collected grows with the square of the objective diameter: doubling the diameter collects four times as much light'),
      n: 'The image in an astronomical telescope is upside down, which does not matter for the sky; telescopes for use on land add an extra lens or prisms to turn it the right way up. The width of the objective does not change the magnifying power, but it matters a great deal: the light collected grows with its area, so a wider objective shows fainter objects and finer detail.',
    }),
    sl('diagram', 'The Cassegrain reflecting telescope', {
      b: r`A large **concave paraboloidal primary mirror** collects the light and reflects it towards its focus. A small **convex secondary mirror** inside that focus sends it back through a **hole** in the primary to a focus F behind it, where the **eyepiece** (or a camera) is placed. With the image at infinity, $M = \dfrac{F}{f_e}$, where F is the focal length of the mirror system.`,
      ul: ['The convex secondary also spreads the cone, so F is several times the focal length of the primary in a short tube.', 'India’s 3.6 m Devasthal Optical Telescope near Nainital uses a Cassegrain-type mirror design.'],
      v: V.cass,
      n: 'Large telescopes use mirrors. In the Cassegrain design, a big concave mirror shaped as a paraboloid collects the light and sends it towards its focus. Before it gets there, a small convex mirror sends it back through a hole in the centre of the big mirror, to a focus just behind it, where the eyepiece or camera sits. The secondary also makes the system behave like a much longer focus objective, packed into a short tube.',
    }),
    sl('example', 'Worked example 5: a Cassegrain telescope', {
      b: 'The primary mirror of a small Cassegrain telescope has a focal length of 60 cm. A convex secondary of focal length 20 cm is 45 cm in front of it. Find where the final focus forms, the focal length of the mirror system, and M with an eyepiece of focal length 4.0 cm (image at infinity).',
      ul: [
        r`The primary alone would focus 60 cm away, ${dec(ex5.p, 2)} cm beyond the secondary: a virtual object for it. Mirror formula: $\dfrac{1}{v} = \dfrac{1}{f} - \dfrac{1}{u} = -\dfrac{1}{20} + \dfrac{1}{15} = \dfrac{1}{60}$, $v = ${dec(ex5.q, 2)}$ cm: the focus is ${dec(ex5.behind, 2)} cm **behind** the primary.`,
        r`The secondary enlarges the image $\dfrac{60}{15} = ${dec(ex5.ms, 1)}$ times, so $F = 4 \times 60 = ${dec(ex5.F, 3)}$ cm (in a tube under 60 cm long).`,
        r`$M = \dfrac{F}{f_e} = \dfrac{240}{4.0} = ${dec(ex5.M, 2)}$; the eyepiece is 4.0 cm beyond the focus.`,
      ],
      v: V.cass,
      n: 'The primary on its own would bring the light to a focus sixty centimetres away, fifteen centimetres beyond the secondary. For the convex secondary this is a virtual object, and the mirror formula puts the new focus sixty centimetres from it, fifteen centimetres behind the primary. The image is four times larger, so the system acts like a single objective of two hundred and forty centimetres, and a four centimetre eyepiece gives sixty.',
    }),
    sl('diagram', 'Why mirrors? Chromatic and spherical aberration', {
      b: 'The refractive index of glass depends on colour, so a lens focuses blue light nearer than red: **chromatic aberration** (coloured fringes). The law of reflection does not involve n, so a mirror brings every colour to the same focus.',
      ul: ['A spherical mirror of large aperture focuses edge rays short of the paraxial focus (**spherical aberration**); a **paraboloidal** mirror brings all parallel rays to one point.'],
      v: V.chroma,
      n: 'Glass bends blue light more than red, so a lens brings the colours to slightly different foci and bright objects show coloured fringes. Reflection does not depend on the refractive index at all, so a mirror focuses every colour at the same point. A spherical mirror still focuses its outer rays a little short of the centre ones, but a mirror ground to a paraboloid brings a whole parallel beam to a single point.',
    }),
    sl('concept', 'Advantages of reflecting telescopes', {
      b: 'Compared with a refractor of the same aperture, a reflecting telescope:',
      ul: ['Has **no chromatic aberration**, and no spherical aberration with a paraboloidal mirror.', 'Can be made **much larger**: a mirror is supported over its whole back, while a lens can be held only at its edge and sags.', 'Needs only **one surface** figured and no flawless glass; it absorbs no light in the glass, so it is cheaper and brighter.', 'Collects more light and so shows fainter objects and **resolves finer detail**; the Cassegrain folding gives a **short tube**.'],
      v: usesTable,
      n: 'Mirrors win for large telescopes. They have no colour fringes, and a paraboloid has no spherical aberration either. A mirror can be supported over its entire back, while a lens can only be held at its rim and sags under its own weight. Only one surface has to be shaped, the glass need not be flawless, and no light is lost passing through it. The large aperture shows fainter objects, and the folded design keeps the tube short.',
    }),
    sl('check', 'Quick check: inside a Cassegrain', {
      b: 'Choose the correct option.',
      v: V.cass,
      chk: 'cass-mcq',
      n: 'Follow the light from the big mirror to the eyepiece.',
    }),
    sl('concept', 'Resolving power of a microscope', {
      b: r`Magnifying an image does not reveal detail that the instrument cannot separate. Because of diffraction, two points closer than a minimum distance $d$ blur into one. For a microscope objective accepting a cone of half-angle β in a medium of index n:
$$d = \dfrac{\lambda}{2n\sin\beta},\qquad \text{resolving power} = \dfrac{1}{d} = \dfrac{2n\sin\beta}{\lambda}$$`,
      ul: ['n sin β is the **numerical aperture** of the objective.', 'Formula only: the derivation is not required.'],
      v: V.resolve,
      n: 'Light spreads slightly as it passes through the objective, so the image of a point is a tiny blurred disc. If two points are too close, their discs overlap and they look like one. The smallest separation that can still be told apart is the wavelength divided by twice n sine beta, where beta is the half-angle of the cone of light the objective accepts. Its reciprocal is the resolving power.',
    }),
    sl('concept', 'Increasing the resolving power', {
      b: 'To resolve finer detail, make d smaller:',
      ul: ['**Shorter wavelength:** blue or violet light, or ultraviolet with a camera; electron microscopes use electrons of very short de Broglie wavelength.', '**Higher n:** fill the gap between the slide and the objective with cedar-wood or synthetic oil (**oil immersion**, n ≈ 1.5).', '**Larger β:** an objective of wide aperture very close to the object.', 'A stronger eyepiece only enlarges the blur (**empty magnification**).'],
      v: resPlot,
      n: 'The formula shows three ways to resolve finer detail. Use a shorter wavelength, such as blue light, ultraviolet with a camera, or the very short wavelengths of an electron microscope. Raise the refractive index by placing a drop of oil between the slide and the objective. Or accept a wider cone of light. A stronger eyepiece does not help: it only enlarges the blur.',
    }),
    sl('example', 'Worked example 6: oil immersion', {
      b: 'An objective accepts a cone with sin β = 0.90. Using green light of wavelength 550 nm, find the smallest separation it resolves (a) in air, (b) with oil of refractive index 1.52. Find the resolving power in air.',
      ul: [
        r`(a) $d = \dfrac{550}{2 \times 1 \times 0.90} = ${dec(ex6.dAir, 3)}$ nm.`,
        r`(b) Numerical aperture $1.52 \times 0.90 = 1.368$: $d = \dfrac{550}{2 \times 1.368} = ${dec(ex6.dOil, 3)}$ nm, finer by the factor 1.52.`,
        r`Resolving power in air $= \dfrac{1}{d} = ${dec(ex6.RP / 1e6, 3)} \times 10^{6}$ m⁻¹.`,
      ],
      v: resPlot,
      n: 'In air the smallest separation is five hundred and fifty divided by twice nought point nine, about three hundred and six nanometres. With oil of index one point five two, the numerical aperture rises to about one point three seven and the smallest separation falls to about two hundred and one nanometres: the oil improves the resolving power by the factor one point five two.',
    }),
    sl('check', 'Quick check: resolving power', {
      b: 'Calculate the ratio.',
      v: resPlot,
      chk: 'rpratio-num',
      n: 'How does the smallest resolvable separation depend on the wavelength?',
    }),
    sl('concept', 'Uses, advantages and drawbacks', {
      b: 'Each instrument suits a job:',
      v: usesTable,
      ul: ['Microscopes: biology, medicine, metallurgy, forensic work. Telescopes: astronomy, navigation, surveying (with erecting systems).'],
      n: 'Each instrument has its place. A simple magnifier is cheap and gives an erect image, but only up to about ten times. A compound microscope reaches hundreds of times, with an inverted image and a small field, and its detail is limited by resolving power. Refracting telescopes are simple and sealed but suffer colour fringes and cannot be made very large. Reflecting telescopes dominate research astronomy.',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results (magnitudes):',
      v: table(
        ['Idea', 'Result'],
        [
          ['Telescope, normal adjustment', '$M = \\dfrac{f_o}{f_e}$, $L = f_o + f_e$'],
          ['Telescope, image at D', '$M = \\dfrac{f_o}{f_e}\\left(1 + \\dfrac{f_e}{D}\\right)$, $L = f_o + |u_e|$'],
          ['Cassegrain', 'Concave primary, convex secondary, hole; $M = F/f_e$'],
          ['Resolving power (microscope)', '$\\dfrac{1}{d} = \\dfrac{2n\\sin\\beta}{\\lambda}$'],
        ],
        'Summary table of the telescope formulae, the Cassegrain telescope and the resolving power of a microscope',
      ),
      n: 'To sum up: a refracting telescope in normal adjustment magnifies f o over f e, and a little more with the image at the near point. Large telescopes use a concave primary and a convex secondary, free of colour fringes. And the finest detail a microscope can show depends on the wavelength, the refractive index of the medium and the cone of light, not on the eyepiece.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'Telescope: α is the angle of the object itself (h/f_o), not the object at D.',
        'Normal adjustment means the final image at infinity and L = f_o + f_e.',
        'Cassegrain diagram: concave primary with a hole, convex secondary, eyepiece behind the primary, arrows on rays.',
        'Resolving power: quote 2n sin β/λ and name all three factors; magnification is not one of them.',
      ],
      v: table(['Asked', 'Key point'], [['Telescope M at D', '(f_o/f_e)(1 + f_e/D)'], ['Mirror objective: one advantage', 'No chromatic aberration'], ['Why oil immersion?', 'Raises n, so d falls']], 'Table of common questions and the key point for each'),
      n: 'For a telescope, alpha is the angle the object itself subtends, which equals h over f o. Normal adjustment means the final image at infinity, with the lenses f o plus f e apart. In the Cassegrain diagram show the hole in the primary and the convex secondary. For resolving power, quote the formula and name all three factors; magnifying power is not one of them.',
    }),
  ],
});
