// ICSE 10 Physics ch04 Refraction of Light at Plane Surfaces — two decks: Part 1 (t01–t03) partial reflection and refraction,
// the laws of refraction, speed, wavelength and frequency, refractive index, the rectangular glass block and the thick mirror;
// Part 2 (t04–t06) real and apparent depth, the triangular prism and deviation, critical angle, total internal reflection and
// totally reflecting prisms.
import { sl, deck, table, flow, svgV, plot, r } from './lib.mjs';
import { REFRACT, SLAB, THICK, DEPTH, PRISM, TIR, TIR_PRISMS } from './svgs.mjs';

const V = {
  refract: svgV(REFRACT, 'A ray striking an air to glass surface at forty degrees, weakly reflected and mostly refracted towards the normal'),
  slab: svgV(SLAB, 'A ray passing through a rectangular glass block, emerging parallel to the incident ray with the lateral displacement marked'),
  thick: svgV(THICK, 'A thick plane mirror silvered at the back forming a faint image, a brightest image and fainter images'),
  depth: svgV(DEPTH, 'Rays from a coin under water bending away from the normal, so the coin appears raised'),
  prism: svgV(PRISM, 'A ray passing through an equilateral glass prism and deviating towards the base'),
  tir: svgV(TIR, 'Three rays inside glass meeting the surface below, at and above the critical angle'),
  tirPrisms: svgV(TIR_PRISMS, 'Right-angled isosceles prisms turning a ray through ninety and through one hundred and eighty degrees'),
};

export const deck1 = deck({
  part: 1,
  title: 'Refraction at Plane Surfaces — Part 1: Laws, refractive index and the glass block',
  goals: [
    'State the laws of refraction and the conditions for a ray to pass undeviated',
    'Say which of speed, wavelength and frequency change when light enters a denser medium',
    'Calculate refractive index from speeds of light, and use v = f λ',
    'Trace a ray through a glass block, mark the lateral displacement and explain multiple images in a thick mirror',
  ],
  slides: [
    sl('title', 'Why does a straw look broken in a glass of nimbu pani?', {
      b: 'Part 1 — light changes direction when it crosses from one transparent medium into another. This bending is **refraction**.',
      v: table(['What you notice', 'What is happening'], [['A straw looks broken at the surface of a drink', 'Light bends as it leaves the water'], ['You see a faint reflection in a shop window', 'Part of the light is reflected at the glass'], ['Writing under a glass paperweight looks raised', 'Light bends as it leaves the glass'], ['A bathroom mirror shows a faint double image', 'Light reflects inside thick glass']], 'Table of four everyday observations and the behaviour of light behind each'),
      n: 'Namaste! Put a straw in a glass of nimbu pani and look from the side. The straw seems broken at the surface. Light is travelling from the drink into air and changing direction on the way. This bending of light at a boundary is called refraction. In this part we learn its laws and how to measure it.',
    }),
    sl('diagram', 'Partial reflection and refraction', {
      b: 'When light meets the boundary between two transparent media, **part of it is reflected** back and **most of it is refracted** into the second medium. Going from a rarer medium (air) into a denser one (glass), the ray **bends towards the normal** ($r < i$); going from denser to rarer it **bends away from the normal**. The cause is the **change in the speed of light** from one medium to the other.',
      v: V.refract,
      n: 'Here a ray in air strikes a flat glass surface. A small part of the light bounces back as a weak reflected ray. Most of it enters the glass and bends towards the normal, so the angle of refraction is smaller than the angle of incidence. Refraction happens because light travels at different speeds in different media.',
    }),
    sl('concept', 'The laws of refraction', {
      b: r`**First law:** the incident ray, the refracted ray and the normal at the point of incidence all lie in **one plane**.

**Second law (Snell’s law):** for a given pair of media and a given colour of light, the ratio of the sine of the angle of incidence to the sine of the angle of refraction is a **constant**: $\dfrac{\sin i}{\sin r} = {}_{1}\mu_{2}$, the refractive index of medium 2 with respect to medium 1. In the graph, every reading for one glass lies on a straight line of slope 1.5.`,
      v: plot({ x: { min: 0, max: 0.7, label: 'sin r' }, y: { min: 0, max: 1, label: 'sin i' }, functions: [{ expr: '1.5x', label: 'glass: slope 1.5', domain: [0, 0.6667] }], points: [{ at: [0.2, 0.3], label: 'reading 1' }, { at: [0.4, 0.6], label: 'reading 2' }, { at: [0.6, 0.9], label: 'reading 3' }] }, 'Straight-line graph of sine of the angle of incidence against sine of the angle of refraction for glass, through the origin with slope one point five', 'Snell’s law: sin i is proportional to sin r.'),
      n: 'Refraction obeys two laws. First, the incident ray, the refracted ray and the normal all lie in the same plane. Second, for a given pair of media and a given colour, the sine of the angle of incidence divided by the sine of the angle of refraction is always the same number. That constant is the refractive index.',
    }),
    sl('concept', 'Speed, wavelength and frequency', {
      b: r`Light is a wave, with $v = f \lambda$. When it passes from air into a denser medium such as water or glass:
- its **speed decreases**;
- its **wavelength decreases** in the same ratio;
- its **frequency does not change** — it is fixed by the source, so the **colour stays the same**.

A ray passes **undeviated** when (1) it falls **along the normal** ($i = 0$), or (2) the two media have the **same refractive index** (a glass rod dipped in a liquid of the same refractive index seems to vanish).`,
      v: table(['Quantity', 'Air to glass', 'Reason'], [['Speed', 'Decreases', 'Glass is optically denser'], ['Wavelength', 'Decreases', 'Same frequency, lower speed'], ['Frequency', 'Unchanged', 'Set by the source'], ['Colour', 'Unchanged', 'Colour depends on frequency']], 'Table of what happens to speed, wavelength, frequency and colour when light enters glass from air'),
      n: 'Light is a wave whose speed equals its frequency times its wavelength. When light enters water or glass from air, it slows down, and its wavelength becomes shorter in the same proportion. The frequency is set by the source and does not change, so the colour stays the same. A ray that meets the surface along the normal goes straight through.',
    }),
    sl('check', 'Quick check: what stays the same?', {
      b: 'Decide which property of light is unchanged by refraction.',
      n: 'Quick check. Think about which property of light is fixed by the source.',
      chk: 'freq-mcq',
    }),
    sl('concept', 'Refractive index', {
      b: r`The **absolute refractive index** of a medium is the ratio of the speed of light in vacuum (or air) to its speed in the medium:
$$\mu = \frac{c}{v}, \qquad c = 3 \times 10^{8}\ \text{m s}^{-1}$$
It is a pure number (**no unit**) and always **greater than 1** for a material medium. A **larger $\mu$** means light travels **more slowly** — the medium is **optically denser**. Refractive index depends on the **nature of the medium** and the **colour (wavelength)** of light, being slightly larger for violet than for red. Relative index: $\,{}_{1}\mu_{2} = \dfrac{\mu_{2}}{\mu_{1}} = \dfrac{v_{1}}{v_{2}}$.`,
      v: table(['Medium', 'Refractive index (about)', 'Speed of light (× 10⁸ m/s)'], [['Air', '1.0003', '3.00'], ['Water', '1.33', '2.25'], ['Crown glass', '1.5', '2.0'], ['Diamond', '2.42', '1.24']], 'Table of typical refractive indices and speeds of light in air, water, glass and diamond'),
      n: 'The refractive index of a medium compares the speed of light in vacuum with its speed in the medium. It has no unit and is always more than one. Water has a refractive index of about one point three three, glass about one and a half, and diamond about two point four. The higher the index, the slower light travels in that medium.',
    }),
    sl('example', 'Worked example: light in a sapphire', {
      b: r`**Problem.** Light of frequency $5.0 \times 10^{14}$ Hz passes from air into a sapphire of refractive index 1.76. Find (a) its speed in sapphire, (b) its wavelength in air, (c) its wavelength in sapphire.

**(a)** $v = \dfrac{c}{\mu} = \dfrac{3 \times 10^{8}}{1.76} = 1.70 \times 10^{8}\ \text{m s}^{-1}$.

**(b)** $\lambda_{air} = \dfrac{c}{f} = \dfrac{3 \times 10^{8}}{5.0 \times 10^{14}} = 6.0 \times 10^{-7}\ \text{m} = 600\ \text{nm}$.

**(c)** $\lambda = \dfrac{v}{f} = \dfrac{\lambda_{air}}{\mu} = \dfrac{600}{1.76} \approx 341\ \text{nm}$. The frequency is unchanged.`,
      v: table(['Quantity', 'In air', 'In sapphire'], [['Speed', '3.0 × 10⁸ m/s', '1.70 × 10⁸ m/s'], ['Frequency', '5.0 × 10¹⁴ Hz', '5.0 × 10¹⁴ Hz'], ['Wavelength', '600 nm', '341 nm']], 'Table of speed, frequency and wavelength of the light in air and in sapphire'),
      n: 'Divide the speed of light in air by the refractive index to get its speed in sapphire, about one point seven times ten to the eight metres per second. The wavelength in air is speed divided by frequency, six hundred nanometres. Inside the sapphire the frequency stays the same, so the wavelength shrinks by the same factor as the speed, to about three hundred and forty nanometres.',
    }),
    sl('check', 'Quick check: refractive index from speeds', {
      b: 'Find a refractive index from the speed of light in a medium.',
      n: 'Quick check. Refractive index is the speed in air divided by the speed in the medium.',
      chk: 'speed-mcq',
    }),
    sl('diagram', 'Refraction through a rectangular glass block', {
      b: 'A ray entering a glass block bends **towards the normal** at the first face and **away from the normal** at the second. Because the two faces are **parallel**, the angle of emergence equals the angle of incidence ($e = i$), so the **emergent ray is parallel to the incident ray** but **shifted sideways**. The perpendicular distance between the incident ray produced and the emergent ray is the **lateral displacement**. It increases with (1) the **thickness** of the block, (2) the **angle of incidence**, (3) the **refractive index** of the glass; and it is zero for normal incidence.',
      v: V.slab,
      n: 'Follow the ray through the block. At the top face it bends towards the normal. At the bottom face it bends away by exactly the same amount, because the faces are parallel. So the ray comes out parallel to its original direction, but shifted sideways. This sideways shift is the lateral displacement. A thicker block, a larger angle of incidence or a denser glass makes it larger.',
    }),
    sl('example', 'Worked example: angles in a glass block', {
      b: r`**Problem.** A ray strikes the top face of a glass block ($\mu = 1.5$) at $i = 50^\circ$. Find (a) the angle of refraction and (b) the angle of emergence at the bottom face.

**(a)** $\sin r = \dfrac{\sin 50^\circ}{1.5} = \dfrac{0.766}{1.5} = 0.511$, so $r \approx 30.7^\circ$.

**(b)** At the bottom face the ray meets the glass–air surface at $30.7^\circ$: $\sin e = 1.5 \times \sin 30.7^\circ = 1.5 \times 0.511 = 0.766$, so $e = 50^\circ = i$. The emergent ray is parallel to the incident ray.`,
      v: table(['Face', 'Angle in air', 'Angle in glass'], [['Top (entry)', 'i = 50°', 'r = 30.7°'], ['Bottom (exit)', 'e = 50°', '30.7°']], 'Table of the angles at the two faces of the glass block'),
      n: 'Use Snell’s law at the first face. The sine of fifty degrees is about point seven six six; divide by one and a half to get about point five one, which is the sine of roughly thirty one degrees. At the second face, run the law the other way. The ray comes out at fifty degrees again, so it is parallel to the incident ray.',
    }),
    sl('check', 'Quick check: the emergent ray', {
      b: 'Find the angle of emergence from a parallel-sided block.',
      n: 'Quick check. Remember that the two faces of the block are parallel.',
      chk: 'slab-mcq',
    }),
    sl('diagram', 'Multiple images in a thick plane mirror', {
      b: 'An ordinary mirror is a sheet of glass **silvered at the back**. Light from an object is (1) **partly reflected at the front glass surface**, giving a **faint** image; (2) mostly **refracted into the glass, reflected by the silvered back** and refracted out — the **brightest** image (the second one); (3) partly reflected **again and again** inside the glass, giving more images that get **fainter**. All the emerging rays are **parallel**, so the eye sees a row of images. A candle flame viewed obliquely in a thick mirror shows this well.',
      v: V.thick,
      n: 'A household mirror is thick glass with a silver coating at the back. A little light reflects from the front glass surface and gives a faint first image. Most of the light goes into the glass, reflects off the silver and comes back out, giving the brightest image. Some light keeps bouncing inside the glass, giving more images that grow fainter and fainter.',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Refraction: change in direction of light at a boundary, caused by a change in speed; partial reflection also occurs.',
        'Laws: one plane; sin i / sin r = constant (Snell’s law).',
        'Into a denser medium: speed and wavelength decrease, frequency and colour unchanged.',
        'μ = c / v, no unit, greater than 1; undeviated ray when i = 0 or the media have equal μ.',
        'Glass block: e = i, emergent ray parallel, lateral displacement grows with thickness, i and μ.',
        'Thick mirror: several images; the second (from the silvered back) is the brightest.',
      ],
      v: table(['Idea', 'Key statement'], [['Snell’s law', 'sin i / sin r = μ'], ['Refractive index', 'μ = c / v'], ['Wave equation', 'v = f λ'], ['Glass block', 'Emergent ray parallel to incident ray']], 'Summary table of four key relations from Part 1'),
      n: 'Let us sum up Part 1. Light bends at a boundary because its speed changes. The two laws of refraction tell us the rays lie in one plane and the ratio of sines is constant. Entering a denser medium, light slows down and its wavelength shrinks, but its frequency stays fixed. A glass block shifts a ray sideways without changing its direction.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Measure i and r from the normal, never from the surface.',
        'Say “frequency does not change” when asked what happens to light entering water.',
        'Refractive index has no unit; never write one.',
        'In a glass-block diagram, draw the emergent ray parallel to the incident ray and mark the lateral displacement as a perpendicular distance.',
      ],
      v: table(['Slip', 'Fix'], [['Angle measured from the surface', 'Measure from the normal'], ['Frequency decreases in glass', 'Speed and wavelength decrease; frequency is unchanged'], ['μ = v / c', 'μ = c / v, always more than 1'], ['Lateral displacement drawn slanting', 'Draw it perpendicular to both rays']], 'Table of four common slips in Part 1 and their fixes'),
      n: 'Some tips for the exam. Always measure angles from the normal. When light enters a denser medium, its speed and wavelength fall but its frequency stays the same. Refractive index is a ratio of speeds, so it has no unit and is more than one. In a glass block diagram, show the emergent ray parallel to the incident ray.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Refraction at Plane Surfaces — Part 2: Apparent depth, prisms and total internal reflection',
  goals: [
    'Use refractive index = real depth / apparent depth and explain why a pool looks shallower',
    'Trace a ray through a triangular prism and mark the angle of deviation',
    'State the conditions for total internal reflection and calculate the critical angle',
    'Explain how right-angled isosceles prisms turn light through 90 and 180 degrees',
  ],
  slides: [
    sl('title', 'Things are not where they seem', {
      b: 'Part 2 — refraction makes water look shallow, lets a prism bend light towards its base, and, past a certain angle, stops light leaving glass at all.',
      v: table(['Observation', 'Idea'], [['A pond looks shallower than it is', 'Real and apparent depth'], ['A prism bends a beam towards its base', 'Deviation'], ['A diamond sparkles', 'Total internal reflection'], ['A periscope uses prisms, not mirrors', 'Totally reflecting prisms']], 'Table of four observations and the idea from this part that explains each'),
      n: 'In this part we see more effects of refraction. A pond looks shallower than it really is, which can be dangerous for swimmers. A glass prism bends light towards its thick base. And if light inside glass meets the surface at a large enough angle, none of it escapes; it is all reflected back. We will see how periscopes use this.',
    }),
    sl('diagram', 'Real and apparent depth', {
      b: r`Rays from a coin at the bottom of a pool bend **away from the normal** as they leave the water. Produced backwards, they meet at a point **above** the coin, so the coin appears **raised**: the pool looks **shallower**. For viewing from directly above,
$$\mu = \frac{\text{real depth}}{\text{apparent depth}}$$
The **shift** (apparent rise) $= \text{real depth} - \text{apparent depth} = \text{real depth}\left(1 - \dfrac{1}{\mu}\right)$. Viewed **obliquely**, the object appears raised even more.`,
      v: V.depth,
      n: 'Rays from a coin at the bottom of a pool bend away from the normal as they come out into air. Your eye traces them back in straight lines, to a point above the coin. So the coin seems raised and the pool looks shallower. For viewing straight down, the refractive index equals the real depth divided by the apparent depth.',
    }),
    sl('example', 'Worked example: a fish tank', {
      b: r`**Problem.** A small pebble lies at the bottom of a fish tank filled with water ($\mu = \frac{4}{3}$) to a depth of 36 cm. (a) How deep does the pebble appear when viewed from directly above? (b) By how much does it appear raised?

**(a)** $\text{apparent depth} = \dfrac{\text{real depth}}{\mu} = \dfrac{36}{4/3} = \dfrac{36 \times 3}{4} = 27\ \text{cm}$.

**(b)** $\text{shift} = 36 - 27 = 9\ \text{cm}$.`,
      v: table(['Quantity', 'Value'], [['Real depth', '36 cm'], ['Refractive index of water', '4/3'], ['Apparent depth', '27 cm'], ['Apparent rise of the pebble', '9 cm']], 'Table of the values in the fish tank example'),
      n: 'The apparent depth is the real depth divided by the refractive index. Thirty six divided by four thirds is thirty six times three quarters, which is twenty seven centimetres. So the pebble seems to sit twenty seven centimetres down, and it looks raised by nine centimetres. That is a quarter of the real depth.',
    }),
    sl('concept', 'Effects of apparent depth', {
      b: 'The same refraction explains several everyday effects:\n- A **stick or ruler** dipped obliquely in water appears **bent at the surface**, the immersed part looking **raised** and shorter.\n- A **pond or pool** looks shallower than it is — a real danger for swimmers.\n- Letters under a **glass slab** appear raised; the rise for a slab of thickness $t$ is $t\\left(1 - \\frac{1}{\\mu}\\right)$.\n- A **fish** in water appears nearer the surface; to the fish, a bird above appears **higher** than it is.',
      v: table(['Effect', 'Why'], [['Bent stick at the water surface', 'Each point of the immersed part appears raised'], ['Pool looks shallow', 'Apparent depth = real depth ÷ μ'], ['Print under a slab looks raised', 'Light bends away from the normal on leaving the glass'], ['Bird looks higher to a fish', 'Light bends towards the normal entering water']], 'Table of four effects of refraction at a plane surface and their reasons'),
      n: 'Apparent depth explains many things. A stick dipped slantwise into water seems bent at the surface, because every point under water looks raised. A pool looks shallower than it is, so never judge its depth by eye. Print under a glass block seems lifted. And to a fish looking up, a bird in the air appears higher than it really is.',
    }),
    sl('check', 'Quick check: apparent depth', {
      b: 'Find an apparent depth from the real depth and the refractive index.',
      n: 'Quick check. Divide the real depth by the refractive index.',
      chk: 'depth-mcq',
    }),
    sl('diagram', 'Refraction through a triangular prism', {
      b: 'A prism has two **refracting faces** inclined at the **angle of the prism**, $A$. A ray bends **towards the normal** at the first face and **away from the normal** at the second, so it is turned **towards the base**. The angle between the incident ray produced and the emergent ray is the **angle of deviation** $\\delta$. Inside the prism $r_{1} + r_{2} = A$, and $\\delta = i + e - A$. Deviation depends on the angle of incidence, the angle of the prism, the material and the colour of light; as $i$ is increased, $\\delta$ first **decreases** to a **minimum** and then **increases**.',
      v: V.prism,
      n: 'In a prism the two faces are not parallel, so the bending at the second face does not undo the bending at the first. Both bends turn the ray towards the thick base. The angle between the original direction and the final direction is the angle of deviation. It depends on the angle of incidence, the prism angle, the glass and the colour of the light.',
    }),
    sl('example', 'Worked example: deviation by a prism', {
      b: r`**Problem.** A ray falls on one face of a glass prism ($\mu = 1.5$) of angle $A = 60^\circ$ at $i = 40^\circ$. The angle of refraction at the first face is $r_{1} = 25.4^\circ$ and the ray emerges at $e = 58.5^\circ$. Find (a) $r_{2}$, the angle of incidence inside at the second face, and (b) the angle of deviation.

**(a)** $r_{1} + r_{2} = A$, so $r_{2} = 60 - 25.4 = 34.6$, that is $34.6^\circ$.

**(b)** $\delta = i + e - A = 40 + 58.5 - 60 = 38.5$, that is $38.5^\circ$, towards the base.`,
      v: flow('LR', [['a', 'Incident ray, i = 40°'], ['b', 'Inside: r₁ = 25.4°, r₂ = 34.6°'], ['c', 'Emergent ray, e = 58.5°'], ['d', 'Deviation δ = 38.5°']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow from the incident ray through the angles inside the prism to the emergent ray and the deviation'),
      n: 'Inside the prism, the two angles of refraction add up to the prism angle, so the second one is sixty minus twenty five point four, or thirty four point six degrees. The deviation is the angle of incidence plus the angle of emergence minus the prism angle: forty plus fifty eight and a half minus sixty, which gives thirty eight and a half degrees, towards the base.',
    }),
    sl('check', 'Quick check: which way does a prism bend light?', {
      b: 'Decide the direction in which a prism turns a ray.',
      n: 'Quick check. Think about where the thick part of the prism is.',
      chk: 'prism-mcq',
    }),
    sl('diagram', 'Critical angle and total internal reflection', {
      b: r`When light goes from a **denser to a rarer** medium, it bends away from the normal. As $i$ increases, $r$ reaches $90^\circ$; that angle of incidence in the denser medium is the **critical angle** $C$. For a medium in air,
$$\mu = \frac{1}{\sin C}$$
If $i > C$, no light is refracted: **all** of it is reflected back — **total internal reflection (TIR)**. **Conditions:** (1) light must travel from a **denser to a rarer** medium; (2) the angle of incidence must be **greater than the critical angle**. Critical angles: glass about $42^\circ$, water about $49^\circ$, diamond about $24^\circ$.`,
      v: V.tir,
      n: 'Look at three rays from a point inside glass. A ray at a small angle escapes into air, bending away from the normal. At one special angle, the critical angle, the escaping ray just skims along the surface. Beyond that angle, no light escapes at all. It is all reflected back inside. This is total internal reflection, and it happens only when light goes from a denser to a rarer medium.',
    }),
    sl('example', 'Worked example: critical angle of glass', {
      b: r`**Problem.** Find the critical angle for a glass–air surface if the refractive index of the glass is 1.5. Will a ray inside the glass meeting the surface at $45^\circ$ escape?

**Step 1.** $\sin C = \dfrac{1}{\mu} = \dfrac{1}{1.5} = 0.667$.

**Step 2.** From tables, $\sin 41.8^\circ = 0.667$, so $C \approx 41.8^\circ$.

**Step 3.** $45^\circ > 41.8^\circ$ and light is going from glass to air, so the ray is **totally internally reflected** — it does not escape.`,
      v: table(['Medium', 'μ', 'sin C = 1/μ', 'C (about)'], [['Water', '1.33', '0.75', '48.6°'], ['Crown glass', '1.5', '0.667', '41.8°'], ['Diamond', '2.42', '0.413', '24.4°']], 'Table of refractive index, sine of the critical angle and critical angle for water, glass and diamond'),
      n: 'The sine of the critical angle is one divided by the refractive index. For glass of index one and a half, that is about point six six seven, which is the sine of nearly forty two degrees. A ray inside the glass at forty five degrees is past the critical angle, so it cannot get out; it is totally reflected.',
    }),
    sl('check', 'Quick check: escape or reflect?', {
      b: 'Decide whether light inside glass escapes or is totally reflected.',
      n: 'Quick check. Compare the angle of incidence with the critical angle.',
      chk: 'crit-mcq',
    }),
    sl('diagram', 'Totally reflecting prisms', {
      b: 'A right-angled **isosceles** glass prism (angles $45^\\circ$, $45^\\circ$, $90^\\circ$) makes an excellent reflector because rays meet the faces inside at $45^\\circ$, which is **more than the critical angle** of glass ($42^\\circ$).\n- Light entering a **short face normally** is totally reflected at the hypotenuse face and **turned through 90°** — used in **periscopes**.\n- Light entering the **hypotenuse face normally** is totally reflected at both short faces and **turned through 180°** — used in **binoculars** and in cycle **reflectors**.\n- In an **equilateral prism** (60°) a ray inside can also meet a face beyond the critical angle and be totally reflected.',
      v: V.tirPrisms,
      n: 'A glass prism with angles of forty five, forty five and ninety degrees makes a perfect mirror. Light inside it meets a face at forty five degrees, which is more than the critical angle of glass. Sending light in through a short face turns it through a right angle, as in a periscope. Sending it in through the long face turns it right round, as in binoculars.',
    }),
    sl('concept', 'Prism reflector or plane mirror?', {
      b: 'Total internal reflection in a prism is better than reflection from a silvered plane mirror because:\n1. **All** the light is reflected (100%), so the image is **brighter**; a mirror absorbs some light.\n2. There is **only one image** — no multiple images from a thick mirror.\n3. There is **no silvering** to tarnish or peel off with time.\n\nOther uses of TIR: the **sparkle of a diamond** (small critical angle, so light is trapped and reflected many times) and **optical fibres**.',
      v: table(['Feature', 'Totally reflecting prism', 'Silvered plane mirror'], [['Fraction reflected', 'All of it', 'Most, some absorbed'], ['Number of images', 'One', 'Several (faint extra images)'], ['Ageing', 'Nothing to tarnish', 'Silver can fade or peel'], ['Use', 'Periscopes, binoculars', 'Dressing mirrors']], 'Table comparing a totally reflecting prism with a silvered plane mirror'),
      n: 'Why do good periscopes and binoculars use prisms instead of mirrors? A prism reflects all the light by total internal reflection, so images are brighter. It gives just one image, without the faint extra images of a thick mirror. And there is no silver coating to fade or peel. Total internal reflection also explains why a well cut diamond sparkles.',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'μ = real depth / apparent depth; objects under water appear raised; shift = real depth × (1 − 1/μ).',
        'Prism: ray bends towards the base; r₁ + r₂ = A; δ = i + e − A.',
        'Critical angle C: angle of incidence in the denser medium for which r = 90°; μ = 1 / sin C.',
        'TIR needs light going from denser to rarer and i greater than C.',
        'Right-angled isosceles prisms turn light through 90° or 180°; better than mirrors.',
      ],
      v: table(['Idea', 'Relation'], [['Apparent depth', 'μ = real ÷ apparent'], ['Prism', 'δ = i + e − A'], ['Critical angle', 'μ = 1 ÷ sin C']], 'Summary table of three relations from Part 2'),
      n: 'Let us sum up Part 2. Things under water look raised by refraction, and the refractive index equals real depth over apparent depth. A prism turns light towards its base. When light inside a denser medium meets the surface at more than the critical angle, it is totally reflected. Right angled glass prisms use this to turn light through a right angle or right round.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Apparent depth formula applies to viewing from directly above (near-normal rays).',
        'State BOTH conditions for TIR, including the direction denser to rarer.',
        'Find C from sin C = 1 / μ; write “C ≈ 42° for glass”, not 45°.',
        'In TIR prism diagrams, show the ray entering a face normally (undeviated) and mark 45°.',
      ],
      v: table(['Slip', 'Fix'], [['TIR from air into glass', 'TIR needs denser to rarer'], ['Apparent depth = real × μ', 'Apparent depth = real ÷ μ'], ['Deviation = i − e', 'δ = i + e − A'], ['Ray bent on entering a prism face normally', 'Normal incidence: no bending']], 'Table of four common slips in Part 2 and their fixes'),
      n: 'Final tips. The real and apparent depth formula is for looking straight down. For total internal reflection, always give both conditions: light going from a denser to a rarer medium, and an angle of incidence greater than the critical angle. Calculate the critical angle from one over the refractive index. And remember that a ray entering a face along the normal does not bend.',
    }),
  ],
});
