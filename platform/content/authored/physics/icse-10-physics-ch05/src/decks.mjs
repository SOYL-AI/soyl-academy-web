// ICSE 10 Physics ch05 Refraction through Lenses — two decks: Part 1 (t01–t03) convex and concave lenses, the lens as a set of
// prisms, lens terms, principal rays and the images formed by convex and concave lenses; Part 2 (t04–t05) the New Cartesian
// sign convention, the lens formula and magnification (direct problems), power in dioptres, the magnifying glass and uses of
// lenses. Removed topics (derivation of the lens formula, scale drawing, magnifying-power formula) are not taught.
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { LENS_ACTION, PRISMS, SIGN, CONVEX_BEYOND_2F, CONVEX_AT_2F, CONVEX_F_2F, CONVEX_WITHIN_F, CONCAVE } from './svgs.mjs';

const V = {
  action: svgV(LENS_ACTION, 'A convex lens converging a parallel beam to its focus and a concave lens diverging a parallel beam as if from its focus'),
  prisms: svgV(PRISMS, 'A convex and a concave lens each drawn as a stack of prisms'),
  sign: svgV(SIGN, 'The New Cartesian sign convention for a lens, with the optical centre as origin'),
  beyond: svgV(CONVEX_BEYOND_2F, 'Ray diagram for a convex lens with the object beyond twice the focal length'),
  at2f: svgV(CONVEX_AT_2F, 'Ray diagram for a convex lens with the object at twice the focal length'),
  f2f: svgV(CONVEX_F_2F, 'Ray diagram for a convex lens with the object between the focus and twice the focal length'),
  within: svgV(CONVEX_WITHIN_F, 'Ray diagram for a convex lens used as a magnifying glass'),
  concave: svgV(CONCAVE, 'Ray diagram for a concave lens forming a virtual, erect, diminished image'),
};

export const deck1 = deck({
  part: 1,
  title: 'Refraction through Lenses — Part 1: Lenses, rays and images',
  goals: [
    'Label the principal axis, optical centre, principal foci and focal length of a lens',
    'Explain converging and diverging action using the lens-as-prisms model',
    'Draw ray diagrams for a convex lens for six object positions and describe each image',
    'Explain why a concave lens always forms a virtual, erect, diminished image',
  ],
  slides: [
    sl('title', 'Lenses all around us', {
      b: 'Part 1 — a lens is a piece of transparent material bounded by two surfaces, at least one of them curved. Lenses in spectacles, cameras and projectors all work by refraction.',
      v: table(['Device', 'Lens used', 'Job'], [['Reading glasses of a grandparent', 'Convex', 'Bring near print into focus'], ['Spectacles of a short-sighted student', 'Concave', 'Spread light so distant objects are clear'], ['Mobile phone camera', 'Convex (lens system)', 'Form a real image on the sensor'], ['Door peephole', 'Concave and convex', 'Wide view of the corridor']], 'Table of four everyday devices, the kind of lens each uses and its job'),
      n: 'Namaste! Your grandmother’s reading glasses, a classmate’s spectacles, the camera in a mobile phone and the peephole in a door all contain lenses. A lens is a piece of glass or plastic with at least one curved surface. In this part we learn how lenses bend light and what kind of image each kind of lens forms.',
    }),
    sl('concept', 'Convex and concave lenses', {
      b: 'A **convex (converging) lens** is **thicker at the middle** than at the edges; it bends a parallel beam to meet at a point. A **concave (diverging) lens** is **thinner at the middle**; it spreads a parallel beam out. Common shapes: **biconvex**, **plano-convex**, **concavo-convex** (thicker middle); **biconcave**, **plano-concave**, **convexo-concave** (thinner middle). A lens can be pictured as a set of **prisms**: in a convex lens their bases point towards the axis, so all rays bend towards the axis.',
      v: V.prisms,
      n: 'A convex lens is thicker in the middle than at its edges, and a concave lens is thinner in the middle. One way to see what they do is to imagine each lens as a stack of small prisms. A prism bends light towards its base. In a convex lens the bases face the axis, so light converges; in a concave lens they face outwards, so light spreads.',
    }),
    sl('diagram', 'Terms used for a lens', {
      b: '- **Centres of curvature** $C_{1}$, $C_{2}$: centres of the spheres of which the lens surfaces are parts.\n- **Principal axis:** the line through both centres of curvature.\n- **Optical centre O:** the point on the axis through which a ray passes **undeviated**.\n- **Principal foci $F_{1}$, $F_{2}$:** rays parallel to the axis converge to $F_{2}$ (convex) or appear to diverge from $F_{1}$ (concave); a lens has two foci, one on each side.\n- **Focal plane:** the plane through a focus, normal to the axis.\n- **Focal length f:** distance from O to a principal focus.',
      v: V.action,
      n: 'The principal axis passes through the centres of curvature of both lens surfaces. Its midpoint in a thin lens is the optical centre, where light passes straight through. A beam parallel to the axis meets at the principal focus of a convex lens, or seems to come from the principal focus of a concave lens. The distance from the optical centre to the focus is the focal length.',
    }),
    sl('check', 'Quick check: which lens converges?', {
      b: 'Identify a converging lens from its shape or action.',
      n: 'Quick check. A converging lens is thicker at the middle than at the edges.',
      chk: 'converge-mcq',
    }),
    sl('concept', 'The three principal rays', {
      b: 'To locate an image, draw any **two** of these rays from the top of the object:\n1. A ray **parallel to the principal axis** passes, after refraction, **through $F_{2}$** (convex) or appears to come **from $F_{1}$** (concave).\n2. A ray **through the optical centre** goes on **undeviated**.\n3. A ray **through $F_{1}$** (convex), or directed towards $F_{2}$ (concave), emerges **parallel to the principal axis**.\n\nWhere the refracted rays **meet**, the image is **real**; where they only **appear to meet** when produced backwards, it is **virtual**.',
      v: flow('LR', [['a', 'Ray parallel to axis'], ['b', 'Through F₂ (convex)'], ['c', 'Ray through O'], ['d', 'Undeviated'], ['e', 'Ray through F₁'], ['f', 'Parallel to axis']], [['a', 'b'], ['c', 'd'], ['e', 'f']], 'Flow pairing each principal ray before the lens with its path after refraction'),
      n: 'Three rays are easy to draw. A ray parallel to the axis bends to pass through the second focus. A ray through the optical centre goes straight on. A ray through the first focus comes out parallel to the axis. Any two of them fix the top of the image. If the rays really meet, the image is real; if they only seem to meet, it is virtual.',
    }),
    sl('diagram', 'Convex lens: object beyond 2F', {
      b: 'Object **beyond 2F₁**: image **between F₂ and 2F₂**, **real, inverted, diminished**. (Used in a **camera** and in the eye.) As the object moves in from infinity towards 2F₁, the image moves out from F₂ towards 2F₂ and grows. For an object **at infinity**, the image is a point-sized, real, inverted image **at F₂**.',
      v: V.beyond,
      n: 'Here the object is farther than twice the focal length from a convex lens. The parallel ray, the central ray and the ray through the first focus all meet between the second focus and twice the focal length on the other side. The image is real, upside down and smaller. A camera works like this.',
    }),
    sl('diagram', 'Convex lens: object at 2F', {
      b: 'Object **at 2F₁**: image **at 2F₂**, **real, inverted, same size**. This gives a quick way to find a focal length in the laboratory: move a screen until the image of a lit object is the same size and sharp; then object distance = image distance = $2f$.',
      v: V.at2f,
      n: 'When the object is at twice the focal length, the image forms at twice the focal length on the other side. It is real and inverted, and exactly the same size as the object. In the laboratory, finding this position is an easy way to measure the focal length of a convex lens.',
    }),
    sl('example', 'Worked example: focal length from a distant tower', {
      b: r`**Problem.** Meena holds a convex lens so that a sharp image of a distant mobile tower falls on a card 16 cm behind the lens. (a) What is the focal length? (b) Where must she place a candle to get an image of the same size on a screen? (c) How far from the lens will that screen be?

**(a)** Rays from a very distant object are parallel, so the image is at $F_{2}$: $f = 16$ cm.

**(b)** At $2F_{1}$: $2f = 2 \times 16 = 32$ cm in front of the lens.

**(c)** The image is at $2F_{2}$: $32$ cm behind the lens; real, inverted, same size.`,
      v: table(['Object position', 'Image position', 'Distance'], [['Distant tower (infinity)', 'F₂', '16 cm'], ['Candle at 2F₁', '2F₂', '32 cm'], ['Image size', 'Same as candle', 'Real, inverted']], 'Table of object and image positions for the lens of focal length sixteen centimetres'),
      n: 'Light from a faraway tower arrives as a parallel beam, so its image forms at the focus. The card is sixteen centimetres away, so that is the focal length. For a same size image, the candle must be at twice the focal length, thirty two centimetres in front, and the sharp image appears thirty two centimetres behind the lens.',
    }),
    sl('diagram', 'Convex lens: object between F and 2F', {
      b: 'Object **between F₁ and 2F₁**: image **beyond 2F₂**, **real, inverted, magnified**. (Used in a **slide or film projector**, where the slide is put in upside down.) Object **at F₁**: refracted rays are **parallel**, image **at infinity**, real, inverted, highly magnified (used to make a **parallel beam**, as in a searchlight).',
      v: V.f2f,
      n: 'Bring the object between the focus and twice the focal length, and the image moves out beyond twice the focal length on the other side. It is real, inverted and larger than the object. A projector uses this, which is why slides are put in upside down. If the object is exactly at the focus, the rays come out parallel and the image is at infinity.',
    }),
    sl('example', 'Worked example: choosing the object position', {
      b: r`**Problem.** A convex lens has focal length 12 cm. Where should an object be placed to get (a) a real image of the same size, (b) a real, magnified image, (c) an erect, magnified image, (d) a real, diminished image?

**(a)** At $2F_{1}$: $2 \times 12 = 24$ cm from the lens.

**(b)** Between $F_{1}$ and $2F_{1}$: between 12 cm and 24 cm.

**(c)** Between O and $F_{1}$: less than 12 cm (magnifying glass).

**(d)** Beyond $2F_{1}$: more than 24 cm from the lens.`,
      v: table(['Image wanted', 'Object distance (f = 12 cm)'], [['Real, same size', '24 cm'], ['Real, magnified', '12 cm to 24 cm'], ['Erect, magnified', 'Less than 12 cm'], ['Real, diminished', 'More than 24 cm']], 'Table of the object distances needed for four kinds of image with a convex lens of focal length twelve centimetres'),
      n: 'Work from the focal length of twelve centimetres. For a same size real image, put the object at twice the focal length, twenty four centimetres. For a bigger real image, place it between twelve and twenty four. For an upright, magnified image, bring it within twelve centimetres. For a smaller real image, move it beyond twenty four.',
    }),
    sl('check', 'Quick check: projector position', {
      b: 'Predict the image when the object is between F and 2F.',
      n: 'Quick check. An object between the focus and twice the focal length gives a real, magnified image.',
      chk: 'f2f-mcq',
    }),
    sl('diagram', 'Convex lens: object between O and F', {
      b: 'Object **between O and F₁**: the refracted rays **diverge**; produced backwards they meet **on the same side as the object**. The image is **virtual, erect and magnified**, farther from the lens than the object. This is the **magnifying glass** (simple microscope) used by watch repairers and to read fine print.',
      v: V.within,
      n: 'If the object is closer to a convex lens than its focus, the refracted rays spread out and never meet. Traced back, they seem to come from a point behind the object, on the same side of the lens. So the eye sees an upright, enlarged, virtual image. That is exactly how a magnifying glass works.',
    }),
    sl('diagram', 'Images formed by a concave lens', {
      b: 'For a **concave lens**, a ray parallel to the axis diverges as if from $F_{1}$, and a ray through O goes straight on. These rays **never meet**; produced back, they meet **between $F_{1}$ and O** on the object side. So, **wherever the object is**, the image is **virtual, erect and diminished**, lying between the focus and the optical centre. (Object at infinity: image at $F_{1}$, highly diminished.)',
      v: V.concave,
      n: 'A concave lens always spreads light out. The parallel ray leaves as if it came from the first focus, while the central ray goes straight on. Produced backwards, they meet between the focus and the lens, on the object’s side. So whatever the object’s position, a concave lens gives an upright, smaller, virtual image close to the lens.',
    }),
    sl('check', 'Quick check: concave lens image', {
      b: 'Describe the image formed by a concave lens.',
      n: 'Quick check. A concave lens diverges light, so the refracted rays never meet.',
      chk: 'concave-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Convex lens: thick middle, converging; concave lens: thin middle, diverging (lens as prisms).',
        'Principal rays: parallel → through F₂; through O → undeviated; through F₁ → parallel.',
        'Convex: object beyond 2F → diminished real image; at 2F → same size at 2F; between F and 2F → magnified real beyond 2F; at F → image at infinity.',
        'Convex, object within F: virtual, erect, magnified (magnifying glass).',
        'Concave: always virtual, erect, diminished, between F₁ and O.',
      ],
      v: table(['Object (convex lens)', 'Image', 'Nature'], [['At infinity', 'At F₂', 'Real, inverted, point-sized'], ['Beyond 2F₁', 'Between F₂ and 2F₂', 'Real, inverted, diminished'], ['At 2F₁', 'At 2F₂', 'Real, inverted, same size'], ['Between F₁ and 2F₁', 'Beyond 2F₂', 'Real, inverted, magnified'], ['At F₁', 'At infinity', 'Real, inverted, highly magnified'], ['Between O and F₁', 'Same side as object', 'Virtual, erect, magnified']], 'Summary table of the image formed by a convex lens for six object positions'),
      n: 'Let us sum up Part 1. A convex lens converges light and a concave lens diverges it. Two principal rays are enough to locate an image. As an object comes closer to a convex lens, its real image moves away and grows, until inside the focus the image becomes virtual, upright and magnified. A concave lens always gives a small, upright, virtual image.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Put arrows on every ray and draw virtual rays and virtual images dotted.',
        'Use two principal rays from the TOP of the object; the image foot lies on the axis.',
        'Describe an image by position, nature (real or virtual, erect or inverted) and size.',
        'Ray diagrams are drawn neatly but need not be to scale.',
      ],
      v: table(['Slip', 'Fix'], [['No arrows on rays', 'Arrow on each ray, in the direction of light'], ['Virtual image drawn solid', 'Dotted lines for virtual rays and images'], ['“Image is big”', 'Say magnified, diminished or same size'], ['Concave lens image drawn real', 'Always virtual, erect, diminished']], 'Table of four common slips in ray diagrams and their fixes'),
      n: 'Some tips. Put an arrow on every ray to show the direction of light. Draw rays traced backwards and virtual images with dotted lines. When you describe an image, give its position, whether it is real or virtual, erect or inverted, and whether it is magnified, diminished or the same size.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Refraction through Lenses — Part 2: Lens formula, magnification and power',
  goals: [
    'Apply the New Cartesian sign convention to object and image distances',
    'Use the lens formula and magnification in direct numerical problems',
    'Calculate the power of a lens in dioptres with the correct sign',
    'Describe the magnifying glass and other uses of lenses',
  ],
  slides: [
    sl('title', 'Putting numbers on images', {
      b: 'Part 2 — ray diagrams tell us roughly where an image is; the **lens formula** tells us exactly. Opticians describe lenses by their **power** in dioptres.',
      v: table(['Question', 'Tool'], [['Where is the image?', 'Lens formula'], ['How big is it, and which way up?', 'Magnification'], ['How strongly does the lens bend light?', 'Power in dioptres'], ['Which way do we measure?', 'Sign convention']], 'Table of four questions about lenses and the tool that answers each'),
      n: 'In this part we put numbers on lenses. The lens formula gives the exact position of an image. Magnification tells us its size and whether it is upright. The power of a lens, measured in dioptres, tells an optician how strongly it bends light. First, we need a rule for the signs of distances.',
    }),
    sl('diagram', 'The New Cartesian sign convention', {
      b: '1. All distances are measured from the **optical centre O**.\n2. Distances measured **in the direction of the incident light** (left to right) are **positive**; those **against** it are **negative**. So a real object has **u negative**.\n3. Heights **above** the principal axis are **positive**; **below**, **negative**.\n\nConsequences: $f$ is **positive** for a convex lens and **negative** for a concave lens; a real image (other side) has **v positive**, a virtual image (same side) has **v negative**.',
      v: V.sign,
      n: 'We use the New Cartesian sign convention. Measure every distance from the optical centre. With light travelling from left to right, distances to the right are positive and distances to the left are negative, so the object distance is negative. Heights above the axis are positive. A convex lens has a positive focal length and a concave lens a negative one.',
    }),
    sl('concept', 'Lens formula and magnification', {
      b: r`For a thin lens, with all distances in the same unit and signs from the convention:
$$\frac{1}{v} - \frac{1}{u} = \frac{1}{f}$$
**Linear magnification:**
$$m = \frac{h_{2}}{h_{1}} = \frac{v}{u}$$
$m$ **negative** → real, inverted image; $m$ **positive** → virtual, erect image. $|m| > 1$ magnified; $|m| < 1$ diminished.`,
      v: table(['Sign of v', 'Sign of m', 'Image'], [['Positive', 'Negative', 'Real, inverted, other side of lens'], ['Negative', 'Positive', 'Virtual, erect, same side as object']], 'Table linking the signs of image distance and magnification to the nature of the image'),
      n: 'The lens formula says one over the image distance, minus one over the object distance, equals one over the focal length. Magnification is image height divided by object height, which also equals image distance divided by object distance. A negative magnification means a real, inverted image; a positive one means a virtual, upright image.',
    }),
    sl('example', 'Worked example: a convex lens forming a real image', {
      b: r`**Problem.** A 4.0 cm tall object stands 25 cm in front of a convex lens of focal length 15 cm. Find the position, size and nature of the image.

**Given:** $u = -25$ cm, $f = +15$ cm, $h_{1} = +4.0$ cm.

**Lens formula:** $\dfrac{1}{v} = \dfrac{1}{f} + \dfrac{1}{u} = \dfrac{1}{15} - \dfrac{1}{25} = \dfrac{5 - 3}{75} = \dfrac{2}{75}$, so $v = +37.5$ cm.

**Magnification:** $m = \dfrac{v}{u} = \dfrac{37.5}{-25} = -1.5$; $h_{2} = m h_{1} = -1.5 \times 4.0 = -6.0$ cm.

**Image:** 37.5 cm behind the lens, real, inverted, 6.0 cm tall (magnified).`,
      v: table(['Quantity', 'Value', 'Meaning'], [['u', '−25 cm', 'Object in front'], ['v', '+37.5 cm', 'Real image behind the lens'], ['m', '−1.5', 'Inverted, magnified'], ['h₂', '−6.0 cm', 'Below the axis']], 'Table of the values in the convex lens example'),
      n: 'Write the object distance as minus twenty five and the focal length as plus fifteen. One over v equals one fifteenth minus one twenty fifth, which is two seventy-fifths, so v is plus thirty seven and a half centimetres. The magnification is v over u, minus one and a half. So the image is real, upside down and six centimetres tall.',
    }),
    sl('check', 'Quick check: using the lens formula', {
      b: 'Find an image distance with the lens formula.',
      n: 'Quick check. Put u in with a negative sign before you calculate.',
      chk: 'lensf-mcq',
    }),
    sl('example', 'Worked example: a concave lens', {
      b: r`**Problem.** An object is placed 30 cm from a concave lens of focal length 15 cm. Find the image distance and the magnification.

**Given:** $u = -30$ cm, $f = -15$ cm.

**Lens formula:** $\dfrac{1}{v} = \dfrac{1}{f} + \dfrac{1}{u} = -\dfrac{1}{15} - \dfrac{1}{30} = -\dfrac{3}{30}$, so $v = -10$ cm.

**Magnification:** $m = \dfrac{v}{u} = \dfrac{-10}{-30} = 0.333$.

**Image:** 10 cm from the lens on the **same side** as the object; virtual, erect, one third the size.`,
      v: table(['Quantity', 'Value', 'Meaning'], [['f', '−15 cm', 'Concave lens'], ['v', '−10 cm', 'Virtual image, object side'], ['m', '+0.33', 'Erect, diminished']], 'Table of the values in the concave lens example'),
      n: 'For a concave lens the focal length is negative, minus fifteen. One over v equals minus one fifteenth minus one thirtieth, which is minus three thirtieths, so v is minus ten centimetres. The minus sign tells us the image is on the same side as the object, so it is virtual. The magnification is one third: upright and smaller.',
    }),
    sl('diagram', 'The magnifying glass', {
      b: 'A **simple microscope** (magnifying glass) is a convex lens of **short focal length**. The object is placed **between O and F**, and the eye sees a **virtual, erect, magnified** image, usually at the least distance of distinct vision (about 25 cm) or farther. A shorter focal length gives a larger image. Uses: reading small print, watch repairing, examining stamps, leaves and insects, palmistry.',
      v: V.within,
      n: 'A magnifying glass is simply a convex lens with a short focal length, held so that the object is closer to it than its focus. The eye then sees an upright, enlarged, virtual image on the same side as the object. Watch repairers, stamp collectors and biology students all use one to see fine details.',
    }),
    sl('example', 'Worked example: a stamp under a magnifying glass', {
      b: r`**Problem.** A stamp 2.0 cm wide is held 8.0 cm from a magnifying glass of focal length 10 cm. Find where the image is and how wide it appears.

**Lens formula:** $\dfrac{1}{v} = \dfrac{1}{10} - \dfrac{1}{8} = \dfrac{4 - 5}{40} = -\dfrac{1}{40}$, so $v = -40$ cm.

**Magnification:** $m = \dfrac{v}{u} = \dfrac{-40}{-8} = 5$; image width $= 5 \times 2.0 = 10$ cm.

**Image:** 40 cm from the lens on the stamp’s side; virtual, erect, five times wider.`,
      v: table(['Quantity', 'Value'], [['u', '−8.0 cm'], ['f', '+10 cm'], ['v', '−40 cm (virtual)'], ['m', '+5 (erect, magnified)']], 'Table of the values in the magnifying glass example'),
      n: 'The stamp is eight centimetres from a lens of focal length ten, so it is inside the focus. One over v equals one tenth minus one eighth, which is minus one fortieth, so v is minus forty centimetres. The magnification is five, positive, so the image is upright, virtual and five times wider: ten centimetres.',
    }),
    sl('check', 'Quick check: sign of the focal length', {
      b: 'Apply the sign convention to a lens.',
      n: 'Quick check. Remember which kind of lens has its principal focus on the incident side.',
      chk: 'sign-mcq',
    }),
    sl('concept', 'Power of a lens', {
      b: r`The **power** of a lens is a measure of how strongly it converges or diverges light. It is the **reciprocal of the focal length in metres**:
$$P = \frac{1}{f\ (\text{in m})} = \frac{100}{f\ (\text{in cm})}$$
SI unit: **dioptre (D)**. One dioptre is the power of a lens of focal length **1 m**. Power is **positive for a convex lens** and **negative for a concave lens**. A **shorter focal length** means a **greater power**.`,
      v: table(['Lens', 'f', 'P'], [['Convex', '+50 cm', '+2 D'], ['Convex', '+20 cm', '+5 D'], ['Concave', '−25 cm', '−4 D'], ['Concave', '−100 cm', '−1 D']], 'Table of focal lengths and powers of four lenses'),
      n: 'Opticians describe a lens by its power, which is one divided by its focal length in metres. The unit is the dioptre. A convex lens of focal length half a metre has a power of plus two dioptres; a concave lens of focal length a quarter of a metre has a power of minus four. The shorter the focal length, the stronger the lens.',
    }),
    sl('example', 'Worked example: reading a spectacle prescription', {
      b: r`**Problem.** (a) A prescription reads $+2.5$ D. What lens is it, and what is its focal length? (b) A camera lens has focal length 40 mm. Find its power.

**(a)** Positive power, so a **convex** lens: $f = \dfrac{1}{P} = \dfrac{1}{2.5} = 0.4$ m $= 40$ cm.

**(b)** $f = 40\ \text{mm} = 0.04$ m; $P = \dfrac{1}{0.04} = 25$ D (convex, very strong).`,
      v: table(['Lens', 'Power', 'Focal length'], [['Spectacle lens', '+2.5 D', '+40 cm'], ['Camera lens', '+25 D', '+4 cm']], 'Table of power and focal length for the spectacle lens and the camera lens'),
      n: 'A prescription of plus two and a half dioptres is a convex lens. Its focal length is one divided by two and a half, which is point four metres, or forty centimetres. A camera lens of focal length forty millimetres is point zero four metres, so its power is one divided by that, twenty five dioptres. Always change to metres first.',
    }),
    sl('check', 'Quick check: power in dioptres', {
      b: 'Find the power of a lens from its focal length.',
      n: 'Quick check. Change the focal length to metres before you take the reciprocal.',
      chk: 'power-mcq',
    }),
    sl('concept', 'Uses of lenses', {
      b: '- **Convex lens:** magnifying glass; camera and projector lens; objective and eyepiece of microscopes and telescopes; spectacles for **long sight (hypermetropia)** and old age; eye lens; making a parallel beam from a lamp at the focus.\n- **Concave lens:** spectacles for **short sight (myopia)**; door peephole (wide view); in combination with convex lenses in cameras and binoculars to improve images.',
      v: table(['Use', 'Lens', 'Object position or reason'], [['Magnifying glass', 'Convex', 'Object within F'], ['Projector', 'Convex', 'Slide between F and 2F'], ['Camera', 'Convex', 'Object beyond 2F'], ['Spectacles for short sight', 'Concave', 'Diverges light from distant objects']], 'Table of four uses of lenses with the lens and the reason'),
      n: 'Convex lenses are used in magnifying glasses, cameras, projectors, microscopes and telescopes, and in spectacles for people who cannot see near things clearly. Concave lenses are used in spectacles for short sight and in door peepholes, and they are combined with convex lenses in good cameras and binoculars.',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Sign convention: distances from O; along the light positive; u is negative for a real object; f + for convex, − for concave.',
        'Lens formula: 1/v − 1/u = 1/f.',
        'Magnification m = h₂/h₁ = v/u; negative → real, inverted; positive → virtual, erect.',
        'Power P = 1/f (f in m), unit dioptre; + convex, − concave.',
        'Magnifying glass: convex lens of short focal length, object within F, virtual erect magnified image.',
      ],
      v: table(['Relation', 'Formula'], [['Lens formula', '1/v − 1/u = 1/f'], ['Magnification', 'm = v/u'], ['Power', 'P = 1/f (metres)']], 'Summary table of the three formulae of Part 2'),
      n: 'Let us sum up Part 2. Use the sign convention: the object distance is negative, the focal length of a convex lens positive and of a concave lens negative. The lens formula gives the image distance, and magnification is image distance over object distance. Power is one over the focal length in metres, measured in dioptres.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Write the given values WITH signs before substituting.',
        'Give the sign of v and m in the answer and say what it means.',
        'For power, convert the focal length to metres first, and keep its sign.',
        'State units: v and f in cm or m, P in dioptres, m has no unit.',
      ],
      v: table(['Slip', 'Fix'], [['u written as +20 cm', 'u = −20 cm for a real object'], ['P = 1/20 = 0.05 D for f = 20 cm', 'P = 1/0.2 = +5 D'], ['Concave f taken positive', 'Concave f is negative'], ['Answer v = −12 with no comment', 'Say: virtual, same side as object']], 'Table of four common slips in lens calculations and their fixes'),
      n: 'Final tips. List the given values with their signs before you substitute. Interpret your answer: a negative image distance means a virtual image on the object side. For power, convert the focal length to metres first. And remember that magnification has no unit, while power is measured in dioptres.',
    }),
  ],
});
