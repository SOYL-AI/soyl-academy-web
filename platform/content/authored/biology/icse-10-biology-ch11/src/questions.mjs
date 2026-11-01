// ICSE 10 Biology ch11 Sense Organs: Eye and Ear — question bank in ICSE 2027 style.
// The binocular overlap and the correcting focal length come from calc.mjs. Ray diagrams only for myopia and hypermetropia.
// AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains, d = both true, R does not explain.
import { mk, add, svgV, r } from '../../icse-10-biology-ch01/src/lib.mjs';
import { FIELD, MYOPE } from './calc.mjs';
import { EYE_LETTERED, EAR_LETTERED } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, match, part } = mk;
const eyeFig = svgV(EYE_LETTERED, 'Vertical section of the eye with five parts lettered A to E');
const earFig = svgV(EAR_LETTERED, 'Internal structure of the ear with five parts lettered A to E');

// ---------------------------------------------------------------- t01 structure of the eye
add('cornea-mcq', mcq({
  stem: 'The transparent, bulging front part of the eye through which light enters is the',
  right: 'cornea', wrong: ['iris', 'sclera', 'choroid'],
  sol: 'The cornea is the clear front part of the outer coat; it lets light in and bends it — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('iris-mcq', mcq({
  stem: 'The iris of the eye',
  right: 'controls the size of the pupil and so the amount of light entering', wrong: ['focuses light on the retina', 'contains the rods and cones', 'carries impulses to the brain'],
  sol: 'The coloured iris has muscles that widen or narrow the pupil — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('yellow-mcq', mcq({
  stem: 'Vision is sharpest when the image falls on the yellow spot because it',
  right: 'has the largest number of cones packed closely together', wrong: ['has no light-sensitive cells', 'is where the optic nerve leaves the eye', 'is covered by the iris'],
  sol: 'The yellow spot (fovea) has densely packed cones, giving the clearest, coloured image — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('blind-mcq', mcq({
  stem: 'No image is seen when light falls on the blind spot because',
  right: 'it has no rods or cones, as the optic nerve leaves the eye there', wrong: ['it is covered by the choroid', 'it has only cones', 'the lens cannot focus light there'],
  sol: 'The blind spot lacks light-sensitive cells — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('rods-mcq', mcq({
  stem: 'Which statement about the light-sensitive cells of the retina is correct?',
  right: 'Rods work in dim light; cones work in bright light and detect colour', wrong: ['Rods detect colour; cones work in dim light', 'Both rods and cones work only in darkness', 'Rods and cones are found only at the blind spot'],
  sol: 'Rods (with visual purple) respond to dim light; cones need bright light and give colour vision — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('eye-fig-mcq', mcq({
  stem: 'In the figure of the eye, which letter marks the part whose muscles change the shape of the lens?',
  right: 'D', wrong: ['A', 'B', 'E'],
  sol: 'D is the ciliary body. A is the cornea, B the iris, E the blind spot — option (@K).',
  d: 2, c: 'application', t: [1, 2],
  assets: [eyeFig],
}));
add('vitreous-mcq', mcq({
  stem: 'The clear, jelly-like substance that fills the space between the lens and the retina and keeps the eyeball in shape is the',
  right: 'vitreous humour', wrong: ['aqueous humour', 'conjunctiva', 'choroid'],
  sol: 'The vitreous humour fills the large chamber behind the lens — option (@K).',
  d: 2, c: 'recall', t: [1],
}));
add('donation-mcq', mcq({
  stem: 'In eye donation, the part most often transplanted to restore sight to a person with a scarred front of the eye is the',
  right: 'cornea', wrong: ['retina', 'lens', 'optic nerve'],
  sol: 'A damaged, cloudy cornea can be replaced by a donor cornea — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('nightblind-mcq', mcq({
  stem: 'A diet poor in vitamin A causes night blindness because',
  right: 'the rods need vitamin A to make visual purple', wrong: ['the cones need vitamin A to see colours', 'the lens becomes cloudy without it', 'the pupil cannot narrow without it'],
  sol: 'Visual purple (rhodopsin) in the rods is made from vitamin A; without it, vision in dim light fails — option (@K).',
  d: 3, c: 'understanding', t: [1, 2],
}));
add('blind-ar', ar({
  a: 'No image is formed on the blind spot.',
  r: 'The blind spot has the largest number of cones in the retina.',
  key: 'a',
  sol: 'The assertion is true. The reason is false: the blind spot has no rods or cones; the yellow spot has the most cones — option (a).',
  d: 2, c: 'analysis', t: [1],
}));
add('cones-tf', tf({
  stem: 'Cones are most closely packed at the yellow spot of the retina.',
  key: 't',
  sol: 'True. The yellow spot (fovea) is crowded with cones, giving the sharpest vision.',
  d: 1, c: 'recall', t: [1],
}));
add('sclera-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: the tough, white, outer coat of the eyeball.',
  model: '**Sclera** (sclerotic layer).',
  sol: 'Sclera.', scheme: [['Sclera', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('conjunctiva-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: the thin, transparent membrane that covers the front of the eyeball and lines the eyelids.',
  model: '**Conjunctiva.**',
  sol: 'Conjunctiva.', scheme: [['Conjunctiva', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('odd-eye', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Cornea, Lens, Cochlea, Retina.',
  model: '**Cochlea**; the others are **parts of the eye**.',
  sol: 'The cochlea is part of the inner ear.', scheme: [['Odd one and category', 1]],
  d: 1, c: 'analysis', t: [1],
}));
add('reason-choroid', short({
  marks: 1, wl: null,
  stem: 'Give reason: the choroid of the eye is dark in colour.',
  model: 'Its dark **pigment absorbs stray light**, preventing **reflection** inside the eye that would blur the image (its blood vessels also nourish the retina).',
  sol: 'Absorbs stray light.', scheme: [['Absorbs light; prevents internal reflection', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('reason-blind', short({
  marks: 1, wl: null,
  stem: 'Give reason: an object whose image falls on the blind spot is not seen.',
  model: 'The blind spot has **no rods or cones**, so no impulse is sent to the brain.',
  sol: 'No receptors.', scheme: [['No rods or cones', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('rods-cones-short', short({
  marks: 2,
  stem: 'State two differences between rods and cones.',
  model: '1. **Rods** are sensitive to **dim light**; **cones** work in **bright light**.\n2. Rods do **not** detect colour and contain **visual purple**; cones **detect colour** and are crowded at the **yellow spot**.',
  sol: 'Light level; colour; position.',
  scheme: [['First difference', 1], ['Second difference', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('eye-draw', short({
  marks: 3, wl: null,
  stem: 'Draw a neat, labelled diagram of the vertical section of the human eye. Label the cornea, iris, lens, ciliary body, retina and blind spot.',
  model: 'A round eyeball with the **cornea** bulging at the front; the **iris** on either side of the pupil; the biconvex **lens** behind it, held by suspensory ligaments from the **ciliary body**; the three-layered wall with the **retina** innermost; the **yellow spot** opposite the lens and the **blind spot** where the optic nerve leaves.',
  sol: 'Labelled V.S. of the eye.',
  scheme: [['Front parts: cornea, iris, lens, ciliary body', 1], ['Wall layers with retina and blind spot', 1], ['Labels', 1]],
  d: 3, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t02 stereoscopic vision, adaptation, accommodation
add('accom-near-mcq', mcq({
  stem: 'When Asha looks up from her phone to a tree far away, her',
  right: 'ciliary muscles relax and her lenses become thinner', wrong: ['ciliary muscles contract and her lenses become thicker', 'pupils close completely', 'retinas move nearer to the lenses'],
  sol: 'For distant vision the ciliary muscles relax, the ligaments tighten and the lens flattens — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('cinema-mcq', mcq({
  stem: 'On entering a dark cinema hall from bright sunlight, Vivek sees almost nothing at first, but after a few minutes he can see the seats. This is because',
  right: 'his pupils widen and his rods build up visual purple again', wrong: ['his pupils narrow and his cones become active', 'his lenses become thicker', 'his blind spots disappear'],
  sol: 'Adaptation to the dark: the pupil dilates and bleached visual purple in the rods is re-formed — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('bright-mcq', mcq({
  stem: 'In bright sunlight the pupil becomes small because',
  right: 'the circular muscles of the iris contract', wrong: ['the radial muscles of the iris contract', 'the ciliary muscles relax', 'the lens becomes thicker'],
  sol: 'Contraction of the circular muscles of the iris narrows the pupil, letting in less light — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('stereo-mcq', mcq({
  stem: 'Stereoscopic vision mainly helps us to',
  right: 'judge depth and the distance of objects', wrong: ['see colours in dim light', 'see objects behind us', 'focus on very near objects'],
  sol: 'Two eyes see a scene from slightly different angles; the brain combines them into a three-dimensional picture — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('one-eye-mcq', mcq({
  stem: 'Threading a needle is much harder with one eye closed, mainly because',
  right: 'stereoscopic vision is lost, so it is hard to judge distance', wrong: ['the closed eye stops the other from focusing', 'the pupil of the open eye closes', 'colour vision is lost'],
  sol: 'With one eye there is no overlap of two views, so depth is hard to judge — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('field-num', num({
  stem: `Each human eye can see over about ${FIELD.each}° from side to side, and the two eyes together cover about ${FIELD.total}°. Over how many degrees do the fields of the two eyes overlap?`,
  value: FIELD.overlap, unit: '°',
  sol: r`Overlap $= ${FIELD.each} + ${FIELD.each} - ${FIELD.total} = ${FIELD.overlap}$ degrees: this region is seen by both eyes.`,
  scheme: [[`${FIELD.overlap} degrees`, 1]],
  d: 3, c: 'application', t: [2],
}), (q) => q.answer.value === 120 || 'value');
add('iris-ar', ar({
  a: 'The pupil becomes smaller in bright light.',
  r: 'The radial muscles of the iris contract in bright light.',
  key: 'a',
  sol: 'The assertion is true. The reason is false: in bright light the circular muscles contract; radial muscles widen the pupil in dim light — option (a).',
  d: 3, c: 'analysis', t: [2],
}));
add('accom-ar', ar({
  a: 'The lens becomes thinner when we look at a near object.',
  r: 'The ciliary muscles contract when we focus on a near object.',
  key: 'b',
  sol: 'The assertion is false: for a near object the lens becomes thicker. The reason is true: contraction of the ciliary muscles slackens the ligaments — option (b).',
  d: 3, c: 'analysis', t: [2],
}));
add('stereo-ar', ar({
  a: 'Hunting animals such as owls and cats have both eyes facing forward.',
  r: 'Overlapping fields of view give stereoscopic vision, which helps to judge distance.',
  key: 'c',
  sol: 'Both are true, and judging the distance of prey is exactly what forward-facing eyes with overlapping fields provide — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('accom-fill', fill({
  stem: 'The ability of the eye to focus on both near and distant objects by changing the curvature of the lens is called ______.',
  acc: [['accommodation']],
  sol: 'Accommodation.',
  d: 1, c: 'recall', t: [2],
}));
add('reason-dark', short({
  marks: 1, wl: null,
  stem: 'Give reason: on walking from bright sunlight into a dark room, we cannot see clearly at first.',
  model: 'The **pupil** takes time to **widen**, and the **visual purple** of the rods, bleached by bright light, takes time to **re-form**.',
  sol: 'Dark adaptation takes time.', scheme: [['Pupil widening and visual purple re-forming take time', 1]],
  d: 2, c: 'application', t: [2],
}));
add('reason-rabbit', short({
  marks: 1, wl: null,
  stem: 'Give reason: a rabbit, with eyes on the sides of its head, judges distance less well than a human does.',
  model: 'Its two fields of view **hardly overlap**, so it has little **stereoscopic vision** (though it sees a wider area around it).',
  sol: 'Little overlap.', scheme: [['Little overlap, so little stereoscopic vision', 1]],
  d: 3, c: 'application', t: [2],
}));
add('accom-short', short({
  marks: 2,
  stem: 'Explain how the eye focuses on a near object.',
  model: 'The **ciliary muscles contract**, which **slackens the suspensory ligaments**. The elastic lens then becomes **thicker and more convex**, with a **shorter focal length**, so the image of the near object falls on the retina.',
  sol: 'Ciliary contraction; thicker lens.',
  scheme: [['Ciliary muscles contract, ligaments slacken', 1], ['Lens thicker, image on the retina', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('adapt-short', short({
  marks: 2,
  stem: 'Explain how the eye adjusts when you step out of a dark room into bright sunlight.',
  model: 'The **circular muscles** of the iris contract, so the **pupil narrows** and less light enters. The **visual purple** in the rods is **bleached**, so vision now depends on the **cones**, which work in bright light.',
  sol: 'Pupil narrows; cones take over.',
  scheme: [['Pupil narrows by circular muscles', 1], ['Rods bleached; cones used', 1]],
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 defects of the eye
add('myopia-mcq', mcq({
  stem: 'In myopia, the image of a distant object is formed',
  right: 'in front of the retina, because the eyeball is too long', wrong: ['behind the retina, because the eyeball is too short', 'on the blind spot', 'on the retina but upside down'],
  sol: 'A long eyeball (or a too-curved lens) brings parallel rays to a focus before the retina — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('myopia-lens-mcq', mcq({
  stem: 'Short-sightedness (myopia) is corrected with spectacles having',
  right: 'concave lenses', wrong: ['convex lenses', 'cylindrical lenses', 'plain glass'],
  sol: 'A concave lens spreads the rays so that the eye focuses them on the retina — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('hyper-mcq', mcq({
  stem: 'Ritu sees distant objects clearly, but the letters of her book look blurred. The doctor says her eyeball is a little short. She needs',
  right: 'convex lenses, as she has hypermetropia', wrong: ['concave lenses, as she has myopia', 'cylindrical lenses, as she has astigmatism', 'an operation to remove the lens, as she has cataract'],
  sol: 'Long-sightedness: near images would form behind the retina; a convex lens corrects it — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('presby-mcq', mcq({
  stem: 'Mrs Pillai, aged 52, reads her newspaper only when holding it at arm\'s length, though her distant vision is good. The most likely cause is that',
  right: 'her eye lenses have become less elastic with age', wrong: ['her eyeballs have become too long', 'her corneas have become unevenly curved', 'her retinas have lost all their cones'],
  sol: 'Presbyopia: the ageing lens loses elasticity (and the ciliary muscles weaken), so near focusing fails — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('astig-mcq', mcq({
  stem: 'Astigmatism is caused by',
  right: 'an uneven curvature of the cornea, and is corrected with cylindrical lenses', wrong: ['a cloudy lens, and is corrected by surgery', 'a short eyeball, and is corrected with convex lenses', 'loss of rods, and is corrected with vitamin A'],
  sol: 'An irregularly curved cornea focuses lines in different directions differently; cylindrical lenses correct it — option (@K).',
  d: 2, c: 'recall', t: [3],
}));
add('cataract-mcq', mcq({
  stem: 'In cataract,',
  right: 'the lens becomes cloudy and is replaced by an artificial lens in surgery', wrong: ['the retina becomes detached and is corrected by spectacles', 'the eyeball becomes too long and is corrected with concave lenses', 'the iris stops working and the pupil stays wide'],
  sol: 'Cataract is clouding (opacity) of the lens; surgery replaces it with an artificial lens — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('farpoint-num', num({
  stem: `A short-sighted student cannot see clearly beyond ${MYOPE.farPointCm} cm. His spectacle lens must make distant objects appear to be at this far point. What is the focal length, in cm, of the concave lens he needs? (Give the size only, without a sign.)`,
  value: -MYOPE.focalCm, unit: 'cm',
  sol: `The focal length of the concave lens equals the far point: ${-MYOPE.focalCm} cm (written as −${-MYOPE.focalCm} cm for a concave lens).`,
  scheme: [[`${-MYOPE.focalCm} cm`, 1]],
  d: 3, c: 'application', t: [3],
}), (q) => q.answer.value === 200 || 'value');
add('myopia-ar', ar({
  a: 'A short-sighted person is given spectacles with concave lenses.',
  r: 'In myopia, the image of a distant object is formed in front of the retina.',
  key: 'c',
  sol: 'Both are true, and since the rays meet too soon, a diverging (concave) lens is needed to move the image back onto the retina — option (c).',
  d: 2, c: 'understanding', t: [3],
}));
add('hyper-tf', tf({
  stem: 'Hypermetropia is corrected by using concave lenses.',
  key: 'f',
  sol: 'False. Hypermetropia is corrected by convex lenses; myopia by concave lenses.',
  d: 1, c: 'recall', t: [3],
}));
add('cataract-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: the condition in which the lens of the eye becomes cloudy, causing blurred vision.',
  model: '**Cataract.**',
  sol: 'Cataract.', scheme: [['Cataract', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('odd-defect', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Myopia, Stereoscopic vision, Astigmatism, Cataract.',
  model: '**Stereoscopic vision**; the others are **defects of the eye**.',
  sol: 'Stereoscopic vision is normal binocular vision.', scheme: [['Odd one and category', 1]],
  d: 2, c: 'analysis', t: [3, 2],
}));
add('myo-hyper-short', short({
  marks: 2,
  stem: 'State two differences between myopia and hypermetropia.',
  model: '1. Myopia blurs **distant** objects (image **in front of** the retina); hypermetropia blurs **near** objects (image **behind** it).\n2. Myopia: eyeball too **long**, corrected by a **concave** lens. Hypermetropia: eyeball too **short**, corrected by a **convex** lens.',
  sol: 'Image position; eyeball length and lens.',
  scheme: [['First difference', 1], ['Second difference', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('defects-short', short({
  marks: 3,
  stem: 'State the cause and the correction of presbyopia, astigmatism and cataract.',
  model: '1. **Presbyopia:** the lens loses **elasticity** with age; corrected with **convex** (or bifocal) lenses.\n2. **Astigmatism:** **uneven curvature of the cornea**; corrected with **cylindrical** lenses.\n3. **Cataract:** the lens becomes **cloudy**; treated by **surgery** that replaces it with an artificial lens.',
  sol: 'Cause and correction of each.',
  scheme: [['Presbyopia', 1], ['Astigmatism', 1], ['Cataract', 1]],
  d: 2, c: 'understanding', t: [3], wl: [25, 70],
}));
add('myopia-draw', short({
  marks: 3, wl: null,
  stem: 'Draw ray diagrams to show (a) the defect in a myopic eye and (b) its correction with a suitable lens.',
  model: '(a) An **elongated eyeball**: parallel rays from a distant object meet at a point **in front of the retina** and spread out again. (b) A **concave lens** in front of the eye **diverges** the rays slightly, so that after passing through the eye lens they meet **on the retina**.',
  sol: 'Two ray diagrams.',
  scheme: [['(a) focus in front of the retina', 1], ['(b) concave lens drawn', 1], ['(b) rays meet on the retina', 1]],
  d: 3, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- t04 structure of the ear
add('eustachian-mcq', mcq({
  stem: 'As a plane comes down to land, Ananya\'s ears feel blocked. Chewing gum or swallowing helps because it',
  right: 'opens the Eustachian tube, equalising the air pressure on both sides of the ear drum', wrong: ['closes the auditory canal', 'moves the semicircular canals', 'makes the cochlea produce more fluid'],
  sol: 'Swallowing opens the Eustachian tube, letting air into or out of the middle ear until the pressure matches outside — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('cochlea-mcq', mcq({
  stem: 'Which part of the inner ear is coiled like a snail shell and is concerned with hearing?',
  right: 'Cochlea', wrong: ['Vestibule', 'Semicircular canal', 'Eustachian tube'],
  sol: 'The coiled cochlea contains the sensory cells for hearing — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('ear-fig-mcq', mcq({
  stem: 'In the figure of the ear, which letter marks the tube that connects the middle ear with the throat?',
  right: 'C', wrong: ['A', 'B', 'D'],
  sol: 'C is the Eustachian tube. A is the tympanum, B the ossicles, D the semicircular canals — option (@K).',
  d: 2, c: 'application', t: [4],
  assets: [earFig],
}));
add('wax-mcq', mcq({
  stem: 'Glands in the skin of the auditory canal secrete wax. The wax',
  right: 'traps dust and germs before they reach the ear drum', wrong: ['carries sound to the cochlea', 'keeps the Eustachian tube open', 'helps the semicircular canals in balance'],
  sol: 'Ear wax (with the canal hairs) catches dust and microbes, protecting the tympanum — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('cochlea-ar', ar({
  a: 'The cochlea is coiled like a snail shell.',
  r: 'The semicircular canals help to maintain balance.',
  key: 'd',
  sol: 'Both are true, but the role of the semicircular canals does not explain the shape of the cochlea — option (d).',
  d: 2, c: 'analysis', t: [4, 5],
}));
add('stapes-fill', fill({
  stem: 'The smallest bone of the body, the third ear ossicle, which fits into the oval window, is the ______.',
  acc: [['stapes', 'stirrup']],
  sol: 'Stapes (stirrup).',
  d: 1, c: 'recall', t: [4],
}));
add('cochlea-tf', tf({
  stem: 'The semicircular canals are the part of the ear concerned with hearing.',
  key: 'f',
  sol: 'False. The semicircular canals help in balance; hearing depends on the cochlea.',
  d: 1, c: 'recall', t: [4, 5],
}));
add('odd-ossicle', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Malleus, Pinna, Incus, Stapes.',
  model: '**Pinna**; the others are **ear ossicles** (bones of the middle ear).',
  sol: 'The pinna is the outer ear.', scheme: [['Odd one and category', 1]],
  d: 1, c: 'analysis', t: [4],
}));
add('reason-gum', short({
  marks: 1, wl: null,
  stem: 'Give reason: passengers are advised to chew or swallow while a plane is taking off or landing.',
  model: 'Swallowing **opens the Eustachian tube** and **equalises the air pressure** on both sides of the ear drum, preventing pain.',
  sol: 'Equalises pressure.', scheme: [['Opens Eustachian tube; equal pressure', 1]],
  d: 2, c: 'application', t: [4],
}));
add('ear-draw', short({
  marks: 3, wl: null,
  stem: 'Draw a neat, labelled diagram of the internal structure of the human ear. Label the tympanum, ossicles, Eustachian tube, semicircular canals and cochlea.',
  model: 'The **pinna** and auditory canal ending at the **tympanum**; the middle ear with the three **ossicles** in a chain from the tympanum to the oval window and the **Eustachian tube** running down; the inner ear with the **vestibule**, three **semicircular canals** and the coiled **cochlea**, with the auditory nerve.',
  sol: 'Labelled ear.',
  scheme: [['Outer and middle ear with ossicles', 1], ['Inner ear: canals and cochlea', 1], ['Labels', 1]],
  d: 3, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- t05 hearing and balance
add('sound-path-mcq', mcq({
  stem: 'Which sequence shows the path of sound vibrations in the ear?',
  right: 'Tympanum → malleus → incus → stapes → oval window → cochlea', wrong: ['Cochlea → stapes → incus → malleus → tympanum', 'Tympanum → cochlea → malleus → incus → stapes', 'Pinna → semicircular canals → cochlea → tympanum'],
  sol: 'The ear drum passes vibrations along the three ossicles to the oval window and into the fluid of the cochlea — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('balance-mcq', mcq({
  stem: 'When a dancer spins round, the movement of her head is detected by the',
  right: 'semicircular canals', wrong: ['cochlea', 'tympanum', 'Eustachian tube'],
  sol: 'Fluid moving in the semicircular canals stimulates sensory hairs, signalling rotation — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('dizzy-mcq', mcq({
  stem: 'After a ride on a spinning swing, Aryan feels dizzy for a while even when he has stopped. This is because',
  right: 'the fluid in his semicircular canals keeps moving for a short time', wrong: ['his cochlea has stopped working', 'his ear drum has burst', 'his Eustachian tube is blocked'],
  sol: 'The endolymph in the semicircular canals keeps swirling after the body stops, sending false signals of turning — option (@K).',
  d: 3, c: 'application', t: [5],
}));
add('ossicle-role-mcq', mcq({
  stem: 'The ear ossicles',
  right: 'carry the vibrations of the ear drum to the inner ear and strengthen them', wrong: ['change sound into nerve impulses', 'keep the body balanced', 'connect the middle ear with the throat'],
  sol: 'The chain of malleus, incus and stapes passes the vibrations to the oval window and amplifies them — option (@K).',
  d: 2, c: 'understanding', t: [5, 4],
}));
add('reason-spin', short({
  marks: 1, wl: null,
  stem: 'Give reason: we feel giddy for a while after spinning round quickly and stopping.',
  model: 'The **fluid in the semicircular canals** goes on moving after we stop, so they keep sending signals of **turning** to the brain.',
  sol: 'Fluid keeps moving.', scheme: [['Fluid in the semicircular canals keeps moving', 1]],
  d: 2, c: 'application', t: [5],
}));
add('balance-short', short({
  marks: 2,
  stem: 'State the role of the semicircular canals and of the vestibule in keeping our balance.',
  model: 'The **semicircular canals** detect **movement and rotation** of the head, as their fluid moves and bends sensory hairs. The **vestibule** detects the **position of the head** with respect to **gravity** when we are still (static balance).',
  sol: 'Movement; position.',
  scheme: [['Semicircular canals: movement', 1], ['Vestibule: position', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('sound-short', short({
  marks: 3,
  stem: 'Trace the path of a sound from the pinna to the brain.',
  model: 'The **pinna** collects sound waves and directs them along the **auditory canal** to the **tympanum**, which vibrates. The **malleus, incus and stapes** pass the vibrations to the **oval window** and into the fluid of the **cochlea**, where sensory hair cells produce impulses. The **auditory nerve** carries these to the **brain** (cerebrum), where the sound is perceived.',
  sol: 'Pinna to brain.',
  scheme: [['Pinna, canal, tympanum', 1], ['Ossicles, oval window, cochlea', 1], ['Auditory nerve to the brain', 1]],
  d: 2, c: 'understanding', t: [5],
}));

// ---------------------------------------------------------------- 5-mark Question 2 style items
add('eye-fill5', fill({
  marks: 5,
  stem: 'Select the correct terms to fill in the blanks: [cornea, iris, pupil, lens, retina, blind spot, yellow spot, sclera]\n\nLight enters the eye through the transparent (a) ______ and passes through an opening called the (b) ______, whose size is controlled by the (c) ______. The (d) ______ focuses the light on the (e) ______, which contains rods and cones.',
  acc: [['cornea'], ['pupil'], ['iris'], ['lens'], ['retina']],
  sol: '(a) cornea; (b) pupil; (c) iris; (d) lens; (e) retina.',
  d: 2, c: 'understanding', t: [1],
}));
add('ear-fill5', fill({
  marks: 5,
  stem: 'Select the correct terms to fill in the blanks: [pinna, tympanum, malleus, stapes, cochlea, Eustachian tube, semicircular canals, auditory nerve]\n\nSound waves collected by the (a) ______ pass along the canal and make the (b) ______ vibrate. Three ossicles pass on the vibrations; the last of them, the (c) ______, presses on the oval window. Sensory cells in the coiled (d) ______ are stimulated, and the (e) ______ carries the impulses to the brain.',
  acc: [['pinna'], ['tympanum', 'ear drum'], ['stapes'], ['cochlea'], ['auditory nerve']],
  sol: '(a) pinna; (b) tympanum; (c) stapes; (d) cochlea; (e) auditory nerve.',
  d: 2, c: 'understanding', t: [4, 5],
}));
add('eye-match5', match({
  marks: 5,
  stem: 'Study the diagram of the eye and match each lettered part with its function.',
  pairs: [
    ['A', 'Transparent front part through which light enters and is bent'],
    ['B', 'Controls the amount of light entering the eye'],
    ['C', 'Focuses the image on the retina'],
    ['D', 'Changes the curvature of the lens'],
    ['E', 'Point where the optic nerve leaves; no image is formed'],
  ],
  order: [3, 0, 4, 2, 1],
  sol: 'A cornea; B iris; C lens; D ciliary body; E blind spot.',
  d: 2, c: 'application', t: [1, 2],
  assets: [eyeFig],
}));

// ---------------------------------------------------------------- case-based (10 marks, Section B style)
add('myopia-case', mk.case({
  passage: `Rahul, a Class 10 student, can read his textbook easily but cannot read the blackboard from the back bench. The optometrist finds that his eyeballs are slightly longer than normal and that he cannot see clearly beyond ${MYOPE.farPointCm} cm. His grandfather, on the other hand, sees distant objects well but needs spectacles to read.`,
  d: 3, c: 'application',
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Name Rahul\'s eye defect.', model: '**Myopia** (short-sightedness).', sol: 'Myopia.', scheme: [['Myopia', 1]], d: 1, c: 'recall', t: [3] })),
    part('b', short({ marks: 2, stem: 'Where is the image of the blackboard formed in Rahul\'s eye, and why?', model: 'It forms **in front of the retina**. Because his eyeball is **too long**, the parallel rays from the distant board meet **before** they reach the retina, so the image on the retina is blurred.', sol: 'In front of the retina.', scheme: [['In front of the retina', 1], ['Eyeball too long', 1]], d: 2, c: 'understanding', t: [3] })),
    part('c', num({ stem: 'What is the focal length, in cm, of the concave lens Rahul needs? (Give the size only.)', value: -MYOPE.focalCm, unit: 'cm', sol: `It equals his far point: ${-MYOPE.focalCm} cm.`, scheme: [[`${-MYOPE.focalCm} cm`, 1]], d: 3, c: 'application', t: [3] })),
    part('d', short({ marks: 3, wl: null, stem: 'Draw ray diagrams to show the defect in Rahul\'s eye and its correction.', model: '(a) A long eyeball with parallel rays meeting **in front of the retina**. (b) A **concave lens** before the eye making the rays **diverge** slightly, so that they meet **on the retina**.', sol: 'Two ray diagrams.', scheme: [['Defect: focus in front of the retina', 1], ['Concave lens drawn', 1], ['Rays meet on the retina', 1]], d: 3, c: 'application', t: [3] }), [
      short({ marks: 3, stem: 'Explain how the concave lens helps Rahul see the blackboard clearly.', model: 'A concave lens **diverges** the parallel rays from the board so that they seem to come from a point within his **far point**. His eye lens can focus such rays, so the image now falls **on the retina** instead of in front of it, and the board looks **sharp**.', sol: 'Diverges rays; image moves onto the retina.', scheme: [['Lens diverges rays', 1], ['Rays seem to come from within the far point', 1], ['Image falls on the retina', 1]], d: 3, c: 'understanding', t: [3] }),
    ]),
    part('e', short({ marks: 3, stem: 'Name the grandfather\'s defect, state its cause and say how it is corrected.', model: 'He has **presbyopia**. With age the **lens loses its elasticity** and the **ciliary muscles weaken**, so the lens cannot become thick enough to focus **near objects**. It is corrected with **convex** (reading or bifocal) lenses.', sol: 'Presbyopia; convex lenses.', scheme: [['Presbyopia', 1], ['Lens less elastic with age', 1], ['Convex or bifocal lenses', 1]], d: 2, c: 'application', t: [3] })),
  ],
}), (q) => q.children[2].answer.value === 200 || 'value');
add('cinema-case', mk.case({
  passage: 'Neha walked from the bright afternoon sun into a dark cinema hall. For a minute she could hardly see the steps; then she began to make out the seats and the people in them. When she came out after the film, she screwed up her eyes against the glare.',
  d: 3, c: 'application',
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'What happened to the size of Neha\'s pupils inside the hall?', model: 'They became **larger** (dilated).', sol: 'Dilated.', scheme: [['Pupils widened', 1]], d: 1, c: 'application', t: [2] })),
    part('b', short({ marks: 2, stem: 'How does the iris bring about this change?', model: 'In dim light the **radial muscles** of the iris **contract** (and the circular muscles relax), pulling the iris outwards so the **pupil widens** and lets in **more light**.', sol: 'Radial muscles contract.', scheme: [['Radial muscles contract', 1], ['Pupil widens; more light', 1]], d: 2, c: 'understanding', t: [2] })),
    part('c', short({ marks: 2, stem: 'Which cells allowed Neha to see in the dark hall, and why did they take time to work?', model: 'The **rods**. Their **visual purple** had been **bleached** by bright sunlight and had to be **re-formed** (using vitamin A) before they could respond to dim light.', sol: 'Rods; visual purple re-forms.', scheme: [['Rods', 1], ['Visual purple re-forms', 1]], d: 3, c: 'analysis', t: [1, 2] })),
    part('d', short({ marks: 2, stem: 'Why did she screw up her eyes when she came out into the sunlight?', model: 'Her pupils were still **wide**, so **too much light** entered and dazzled her. Screwing up the eyes cut down the light until the **pupils narrowed** by contraction of the **circular muscles**.', sol: 'Pupils still wide.', scheme: [['Too much light through wide pupils', 1], ['Pupils narrow by circular muscles', 1]], d: 3, c: 'analysis', t: [2] })),
    part('e', short({ marks: 3, stem: 'State three differences between rods and cones.', model: '1. Rods work in **dim light**; cones in **bright light**.\n2. Rods do **not detect colour**; cones **do**.\n3. Rods contain **visual purple** and are spread over most of the retina; cones are crowded at the **yellow spot**.', sol: 'Light, colour, pigment and position.', scheme: [['First difference', 1], ['Second difference', 1], ['Third difference', 1]], d: 2, c: 'understanding', t: [1] })),
  ],
}));
add('eye-case', mk.case({
  stem: 'Study the diagram and answer the questions.',
  passage: 'The diagram shows a vertical section of the human eye, front on the left. Five parts are lettered A to E.',
  d: 3, c: 'application',
  assets: [eyeFig],
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Name the clear front layer labelled A.', model: '**Cornea.**', sol: 'Cornea.', scheme: [['Cornea', 1]], d: 1, c: 'recall', t: [1] })),
    part('b', short({ marks: 2, stem: 'Name B and state how it protects the retina from very bright light.', model: 'B is the **iris**. In bright light its **circular muscles contract**, making the **pupil small**, so less light reaches the retina.', sol: 'Iris narrows the pupil.', scheme: [['Iris', 1], ['Circular muscles narrow the pupil', 1]], d: 2, c: 'understanding', t: [1, 2] })),
    part('c', short({ marks: 2, stem: 'Name D and state its role when we look at a near object.', model: 'D is the **ciliary body**. Its **ciliary muscles contract**, the suspensory ligaments slacken, and the **lens becomes thicker**, so a near object is focused on the retina.', sol: 'Ciliary body; lens thickens.', scheme: [['Ciliary body', 1], ['Muscles contract, lens thickens', 1]], d: 2, c: 'understanding', t: [2] })),
    part('d', short({ marks: 2, stem: 'Name E and explain why no image is seen there.', model: 'E is the **blind spot**, where the **optic nerve** leaves the eye. It has **no rods or cones**, so light falling there produces no impulse.', sol: 'Blind spot; no receptors.', scheme: [['Blind spot', 1], ['No rods or cones', 1]], d: 2, c: 'understanding', t: [1] })),
    part('e', short({ marks: 3, stem: 'Name the light-sensitive layer of the eye. Where on it is vision sharpest, and why?', model: 'The **retina**. Vision is sharpest at the **yellow spot**, which lies directly behind the lens on the axis of the eye. It has the **largest number of cones**, closely packed, so the image there is the **clearest** and in colour.', sol: 'Retina; yellow spot; many cones.', scheme: [['Retina', 1], ['Yellow spot', 1], ['Densely packed cones', 1]], d: 2, c: 'understanding', t: [1] })),
  ],
}));
add('stereo-case', mk.case({
  passage: `In a biology lesson, Mr D'Souza compared a rabbit, whose eyes are on the sides of its head, with a human, whose eyes face forward. He said each human eye sees about ${FIELD.each}° and the two together about ${FIELD.total}°. He then asked a student to bring the tips of two pencils together, first with both eyes open and then with one eye closed.`,
  d: 3, c: 'analysis',
  children: [
    part('a', num({ stem: 'Over how many degrees do the fields of view of the two human eyes overlap?', value: FIELD.overlap, unit: '°', sol: r`$${FIELD.each} \times 2 - ${FIELD.total} = ${FIELD.overlap}$ degrees.`, scheme: [[`${FIELD.overlap} degrees`, 1]], d: 2, c: 'application', t: [2] })),
    part('b', short({ marks: 2, stem: 'What is stereoscopic vision, and what is its main advantage?', model: 'It is vision with **both eyes** looking at the same object from slightly **different angles**; the brain **combines** the two images into one **three-dimensional** picture. Its advantage is the ability to **judge depth and distance**.', sol: 'Two views combined; depth.', scheme: [['Meaning', 1], ['Judging depth and distance', 1]], d: 2, c: 'understanding', t: [2] })),
    part('c', short({ marks: 2, stem: 'Suggest why the rabbit\'s eyes are placed on the sides of its head.', model: 'The rabbit is **hunted**. Side eyes give an almost **all-round field of view**, so it can spot a **predator** approaching from any direction, even though it judges distance less well.', sol: 'Wide field to spot predators.', scheme: [['Wide, all-round field', 1], ['To detect predators', 1]], d: 3, c: 'analysis', t: [2] })),
    part('d', short({ marks: 2, stem: 'Why was it harder to bring the pencil tips together with one eye closed?', model: 'With one eye there is **no overlap** of two views, so **stereoscopic vision is lost**. The brain cannot judge the **distance** of the pencil tips accurately, and they miss each other.', sol: 'No stereoscopic vision.', scheme: [['Stereoscopic vision lost', 1], ['Distance hard to judge', 1]], d: 2, c: 'application', t: [2] })),
    part('e', short({ marks: 3, stem: 'Explain how the student\'s eyes change when he looks from the pencil tips in his hands to a clock on the far wall.', model: 'For the far clock, the **ciliary muscles relax**, the **suspensory ligaments** are pulled **tight**, and the lens becomes **thinner and flatter**, with a **longer focal length**. This adjustment of the lens is called **accommodation**.', sol: 'Ciliary relax; lens thinner.', scheme: [['Ciliary muscles relax', 1], ['Ligaments tight, lens thinner', 1], ['Accommodation', 1]], d: 3, c: 'application', t: [2] })),
  ],
}), (q) => q.children[0].answer.value === 120 || 'value');
add('flight-case', mk.case({
  passage: 'As her plane came in to land, Ananya felt her ears go blocked and slightly painful, and voices sounded faint. Her mother told her to swallow a few times; her ears "popped" and her hearing returned to normal.',
  d: 3, c: 'application',
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Why did Ananya\'s ears feel blocked as the plane came down?', model: 'The **air pressure outside** rose faster than the pressure in the **middle ear**, so the ear drum was **pushed inwards**.', sol: 'Pressure difference.', scheme: [['Unequal pressure on the ear drum', 1]], d: 3, c: 'analysis', t: [4] })),
    part('b', short({ marks: 2, stem: 'Explain how swallowing helped.', model: 'Swallowing **opens the Eustachian tube**, which connects the middle ear with the **throat**. Air passes into the middle ear until the **pressure is equal** on both sides of the ear drum, which can then vibrate freely.', sol: 'Opens Eustachian tube.', scheme: [['Eustachian tube opens', 1], ['Pressure equalised', 1]], d: 2, c: 'understanding', t: [4] })),
    part('c', short({ marks: 2, stem: 'Name, in order from the ear drum, the three bones of the middle ear and state their function.', model: '**Malleus, incus, stapes.** They **carry the vibrations** of the ear drum to the **oval window** of the inner ear and **strengthen** them.', sol: 'Malleus, incus, stapes.', scheme: [['Correct order', 1], ['Transmit and amplify vibrations', 1]], d: 1, c: 'recall', t: [4, 5] })),
    part('d', short({ marks: 2, stem: 'Why did voices sound faint while her ears were blocked?', model: 'The ear drum, pushed in and **tight**, could **not vibrate freely**, so weaker vibrations passed through the ossicles to the **cochlea**, and fewer impulses reached the brain.', sol: 'Ear drum cannot vibrate freely.', scheme: [['Ear drum cannot vibrate freely', 1], ['Weaker vibrations reach the cochlea', 1]], d: 3, c: 'analysis', t: [5] })),
    part('e', short({ marks: 3, stem: 'Once her hearing returned, how did her mother\'s voice reach Ananya\'s brain? Trace its path through the ear.', model: 'Pinna → **auditory canal** → **tympanum** (vibrates) → **malleus, incus, stapes** → **oval window** → fluid of the **cochlea**, where sensory cells produce impulses → **auditory nerve** → **brain**, which interprets the sound.', sol: 'Pinna to brain.', scheme: [['Pinna, canal, tympanum', 1], ['Ossicles, oval window, cochlea', 1], ['Auditory nerve, brain', 1]], d: 2, c: 'understanding', t: [5], wl: [25, 70] })),
  ],
}));
add('ear-case', mk.case({
  stem: 'Study the diagram and answer the questions.',
  passage: 'The diagram shows the internal structure of the human ear. Five parts are lettered A to E.',
  d: 4, c: 'analysis',
  assets: [earFig],
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Name the membrane labelled A.', model: '**Tympanum** (ear drum).', sol: 'Tympanum.', scheme: [['Tympanum', 1]], d: 1, c: 'recall', t: [4] })),
    part('b', short({ marks: 2, stem: 'What are the structures labelled B, and what is their function?', model: 'B are the **ear ossicles** (malleus, incus and stapes). They **transmit** the vibrations of the ear drum to the inner ear and **amplify** them.', sol: 'Ossicles.', scheme: [['Ossicles', 1], ['Transmit and amplify vibrations', 1]], d: 2, c: 'understanding', t: [4, 5] })),
    part('c', short({ marks: 2, stem: 'Name D and explain how it detects movement of the head.', model: 'D are the **semicircular canals**, filled with fluid. When the head turns, the **fluid moves** and bends **sensory hairs** in their swellings, which send impulses about **rotation** to the brain.', sol: 'Semicircular canals; moving fluid.', scheme: [['Semicircular canals', 1], ['Moving fluid stimulates sensory hairs', 1]], d: 2, c: 'understanding', t: [5] })),
    part('d', short({ marks: 2, stem: 'Name E and state where in it the sensory cells for hearing are found.', model: 'E is the **cochlea**. The sensory hair cells for hearing lie in the **organ of Corti** along its coiled tube.', sol: 'Cochlea; organ of Corti.', scheme: [['Cochlea', 1], ['Organ of Corti', 1]], d: 2, c: 'recall', t: [4] })),
    part('e', short({ marks: 3, stem: 'A person whose cochlea is badly damaged but whose ear drum and ossicles are normal is completely deaf in that ear, yet keeps his balance. Explain both observations.', model: 'Vibrations still reach the inner ear, but without a working **cochlea** they cannot be changed into **nerve impulses**, so **no sound** is perceived. **Balance** depends on the **semicircular canals and vestibule**, a separate part of the inner ear, which are undamaged.', sol: 'Hearing needs cochlea; balance uses canals and vestibule.', scheme: [['Cochlea changes vibrations into impulses', 1], ['So no hearing', 1], ['Balance by canals and vestibule, intact', 1]], d: 4, c: 'analysis', t: [4, 5] })),
  ],
}));
