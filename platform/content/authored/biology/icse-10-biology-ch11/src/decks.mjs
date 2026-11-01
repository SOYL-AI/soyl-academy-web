// ICSE 10 Biology ch11 Sense Organs: Eye and Ear — Part 1 (t01–t02 eye, adaptation, accommodation, stereoscopic vision),
// Part 2 (t03–t05 eye defects, ear, hearing and balance).
import { sl, deck, table, flow, svgV } from '../../icse-10-biology-ch01/src/lib.mjs';
import { EYE, ACCOM, MYOPIA, HYPER, EAR, PUPIL, FIELDS } from './svgs.mjs';
import { FIELD, MYOPE, NEAR_POINT } from './calc.mjs';

export const V = {
  eye: svgV(EYE, 'Vertical section of the human eye with its parts'),
  accom: svgV(ACCOM, 'Accommodation for distant and near objects'),
  myopia: svgV(MYOPIA, 'Ray diagrams of a myopic eye and its correction with a concave lens'),
  hyper: svgV(HYPER, 'Ray diagrams of a hypermetropic eye and its correction with a convex lens'),
  ear: svgV(EAR, 'Internal structure of the human ear'),
  pupil: svgV(PUPIL, 'The pupil in bright and in dim light'),
  fields: svgV(FIELDS, 'Fields of view of the two eyes and their overlap'),
};

export const deck1 = deck({
  part: 1,
  title: 'Sense Organs — Part 1: The eye and how it sees',
  goals: [
    'Draw and label a vertical section of the eye and state the function of each part',
    'Explain how the ciliary muscles change the lens for near and distant vision',
    'Explain adaptation to light and dark and the advantage of stereoscopic vision',
  ],
  slides: [
    sl('title', 'Sense Organs: Eye and Ear', {
      b: 'Part 1 — the eye, a living camera.',
      v: flow('LR', [['l', 'Light from an object'], ['f', 'Cornea and lens focus it'], ['r', 'Retina: rods and cones'], ['b', 'Optic nerve to the brain']], [['l', 'f'], ['f', 'r'], ['r', 'b']], 'Flow: light from an object is focused by the cornea and lens onto the retina, and the optic nerve carries impulses to the brain'),
      n: 'The eye works much like a camera. The cornea and lens focus light onto the retina, which acts like the film. Rods and cones turn the light into nerve impulses, and the brain turns these into the picture we see.',
    }),
    sl('diagram', 'Inside the eye', {
      b: 'The wall has three layers: **sclera**, **choroid** and **retina**. In front are the **cornea**, **iris** and **lens**.',
      v: V.eye,
      n: 'The tough white sclera bulges at the front as the clear cornea. Inside it the dark choroid carries blood vessels. The innermost layer, the retina, holds the light-sensitive cells. The lens hangs from the ciliary body by suspensory ligaments.',
    }),
    sl('concept', 'Parts of the eye and their functions', {
      v: table(['Part', 'Function'], [['Conjunctiva', 'Thin membrane protecting the front of the eye'], ['Cornea', 'Transparent; lets light in and bends it'], ['Iris and pupil', 'Iris controls the size of the pupil, so the light entering'], ['Lens', 'Focuses light on the retina'], ['Ciliary body', 'Its muscles change the curvature of the lens'], ['Aqueous and vitreous humour', 'Keep the eyeball in shape; let light through'], ['Choroid', 'Dark, with blood vessels; absorbs stray light'], ['Retina', 'Rods and cones turn light into impulses']], 'Table of the parts of the eye and their functions'),
      n: 'Follow the light. It passes the conjunctiva and cornea, the watery aqueous humour, the pupil and the lens, then the jelly-like vitreous humour, and lands on the retina. The dark choroid stops light bouncing around inside.',
    }),
    sl('check', 'Quick check: the front window', {
      b: 'Name the transparent, bulging front part of the eye.',
      chk: 'cornea-mcq',
      n: 'It is the part replaced in eye donation.',
    }),
    sl('concept', 'The retina: rods, cones and two special spots', {
      v: table(['Feature', 'Details'], [['Rods', 'Work in dim light; no colour; contain visual purple (needs vitamin A)'], ['Cones', 'Work in bright light; give colour vision'], ['Yellow spot', 'Cones packed closely: sharpest vision'], ['Blind spot', 'Where the optic nerve leaves: no rods or cones, no image']], 'Table of rods, cones, the yellow spot and the blind spot'),
      n: 'The retina has two kinds of light-sensitive cells. Rods help us see in dim light. Cones give us colour and detail. Vision is sharpest at the yellow spot, and we see nothing at the blind spot, where the optic nerve leaves.',
    }),
    sl('check', 'Quick check: the sharpest spot', {
      b: 'True or false: cones are most closely packed at the yellow spot.',
      chk: 'cones-tf',
      n: 'Where is vision clearest?',
    }),
    sl('example', 'Worked example 1: finding your blind spot', {
      b: 'Draw a cross and, a hand\'s width to its right, a dot. Close your left eye and look at the cross with your right eye.',
      ul: ['Step 1: hold the card at arm\'s length and keep staring at the cross.', 'Step 2: bring the card slowly towards your face.', 'Step 3: at one distance the dot vanishes: its image has fallen on the blind spot.'],
      v: table(['Observation', 'Explanation'], [['Dot visible at first', 'Its image falls on rods and cones'], ['Dot disappears at one distance', 'Image falls on the blind spot: no receptors'], ['Dot reappears when the card moves on', 'Image moves off the blind spot']], 'Worked table of observations in the blind-spot test and their explanations'),
      n: 'Try it. As the card comes closer, the dot suddenly disappears and then comes back. At that moment its image lies on the blind spot, where there are no rods or cones. We do not normally notice the gap because our two eyes cover for each other.',
    }),
    sl('diagram', 'Accommodation', {
      b: 'Near object: **ciliary muscles contract**, ligaments slacken, lens **thicker**. Distant object: muscles **relax**, ligaments tight, lens **thinner**.',
      v: V.accom,
      n: 'The eye focuses by changing the shape of its lens. To look at something near, the ciliary muscles contract, the ligaments loosen and the elastic lens bulges. For distant objects the muscles relax and the lens is pulled flat. This is accommodation.',
    }),
    sl('check', 'Quick check: focusing near and far', {
      b: 'Fill in: the ability of the eye to focus on near and distant objects is called ______.',
      chk: 'accom-fill',
      n: 'The lens accommodates to the distance.',
    }),
    sl('diagram', 'Adapting to bright and dim light', {
      b: 'Bright light: **circular** muscles of the iris contract, pupil small. Dim light: **radial** muscles contract, pupil large.',
      v: V.pupil,
      n: 'The iris works like a camera\'s aperture. In bright light it narrows the pupil to protect the retina. In dim light it opens the pupil wide. Inside the rods, visual purple is bleached by bright light and slowly rebuilt in the dark.',
    }),
    sl('concept', 'Light and dark adaptation', {
      v: table(['Change', 'Bright light', 'Dim light'], [['Iris muscles that contract', 'Circular', 'Radial'], ['Pupil', 'Small', 'Large'], ['Cells mainly used', 'Cones', 'Rods'], ['Visual purple', 'Bleached', 'Rebuilt (takes minutes)']], 'Table comparing the eye in bright light and in dim light'),
      n: 'Walking into a dark room, you see little at first because the pupil takes time to widen and the visual purple must be rebuilt. Walking out into sunlight dazzles you until the pupil narrows.',
    }),
    sl('diagram', 'Stereoscopic vision', {
      b: 'Our eyes face forward, so their fields of view **overlap**: both eyes see the same scene from slightly different angles.',
      v: V.fields,
      n: 'Each eye sees the scene from a slightly different angle. The brain combines the two views into one picture with depth. This is stereoscopic vision, and it lets us judge how far away things are.',
    }),
    sl('example', 'Worked example 2: how much do the fields overlap?', {
      b: `Each eye sees about **${FIELD.each}°**; together they see about **${FIELD.total}°**.`,
      ul: [`Step 1: add the two fields: ${FIELD.each} + ${FIELD.each} = ${2 * FIELD.each}°.`, `Step 2: the total seen is only ${FIELD.total}°, so the extra is counted twice.`, `Step 3: overlap = ${2 * FIELD.each} − ${FIELD.total} = **${FIELD.overlap}°**, seen by both eyes.`],
      v: table(['Quantity', 'Degrees'], [['Field of one eye', String(FIELD.each)], ['Field of both eyes together', String(FIELD.total)], ['Overlap (stereoscopic field)', String(FIELD.overlap)]], 'Worked table: one eye one hundred and fifty degrees, both together one hundred and eighty, overlap one hundred and twenty'),
      n: 'Add the two fields and take away the total. The part counted twice is the overlap, about one hundred and twenty degrees in front of us. Animals that hunt have a large overlap; animals that are hunted, like rabbits, have eyes on the sides and very little.',
    }),
    sl('check', 'Quick check: two eyes', {
      b: 'Stereoscopic vision mainly helps us to…',
      chk: 'stereo-mcq',
      n: 'Think of threading a needle.',
    }),
    sl('summary', 'Summary', {
      ul: ['Wall: sclera (cornea in front), choroid, retina.', 'Iris controls the pupil; lens focuses; ciliary body changes the lens.', 'Rods: dim light. Cones: bright light, colour. Yellow spot: sharpest. Blind spot: no image.', 'Accommodation: near, lens thicker; far, lens thinner.', `Stereoscopic vision: about ${FIELD.overlap}° of overlap lets us judge depth.`],
      v: table(['Object', 'Ciliary muscles', 'Lens'], [['Near', 'Contract', 'Thicker'], ['Distant', 'Relax', 'Thinner']], 'Summary table of the ciliary muscles and the lens for near and distant objects'),
      n: 'To recap. Light passes through the cornea, pupil and lens onto the retina. The ciliary muscles adjust the lens for near and far. The iris adjusts the pupil for bright and dim light. And two forward-facing eyes give us depth.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Near vision: ciliary muscles **contract**, lens **thicker**.', 'Bright light: **circular** muscles; dim light: **radial** muscles.', 'Yellow spot = **most cones**; blind spot = **none**.', 'In eye diagrams, label all **three coats** and both **humours**.'],
      n: 'Exam tips. Get the ciliary muscles right: they contract for near objects. Match circular muscles with bright light. Do not confuse the yellow spot with the blind spot. And label every layer in your eye diagram.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Sense Organs — Part 2: Eye defects, the ear, hearing and balance',
  goals: [
    'State the cause and correction of myopia, hypermetropia, presbyopia, astigmatism and cataract',
    'Draw ray diagrams for myopia and hypermetropia and their correction',
    'Trace the path of sound through the ear and explain how the ear maintains balance',
  ],
  slides: [
    sl('title', 'Eye Defects, Hearing and Balance', {
      b: 'Part 2 — when the eye cannot focus, and how the ear hears and balances.',
      v: flow('LR', [['d', 'Eye defects'], ['c', 'Corrected by lenses or surgery'], ['e', 'Ear: hearing and balance']], [['d', 'c'], ['c', 'e']], 'Flow: eye defects, their correction, then the ear for hearing and balance'),
      n: 'Many of us wear spectacles. In this part we see why: what goes wrong in common eye defects and how lenses fix them. Then we turn to the ear, which does two jobs: hearing, and keeping us balanced.',
    }),
    sl('concept', 'Five eye defects', {
      v: table(['Defect', 'Cause', 'Correction'], [['Myopia (short sight)', 'Eyeball too long or lens too curved; image in front of retina', 'Concave lens'], ['Hypermetropia (long sight)', 'Eyeball too short or lens too flat; image behind retina', 'Convex lens'], ['Presbyopia', 'Lens less elastic with age; near objects blurred', 'Convex or bifocal lens'], ['Astigmatism', 'Uneven curvature of the cornea', 'Cylindrical lens'], ['Cataract', 'Lens becomes cloudy', 'Surgery: artificial lens']], 'Table of five eye defects with their causes and corrections'),
      n: 'Myopia and hypermetropia come from an eyeball of the wrong length. Presbyopia comes with age, as the lens stiffens. Astigmatism comes from an unevenly curved cornea. And in cataract the lens turns cloudy and must be replaced.',
    }),
    sl('diagram', 'Myopia and its correction', {
      b: 'Distant objects blurred: rays meet **in front of** the retina. A **concave** lens corrects it.',
      v: V.myopia,
      n: 'In a myopic eye the eyeball is too long, so rays from a distant object meet before they reach the retina. A concave lens spreads the rays out a little, and the eye can then bring them together on the retina.',
    }),
    sl('check', 'Quick check: short sight', {
      b: 'In myopia, where is the image of a distant object formed?',
      chk: 'myopia-mcq',
      n: 'Is the eyeball too long or too short?',
    }),
    sl('diagram', 'Hypermetropia and its correction', {
      b: 'Near objects blurred: rays would meet **behind** the retina. A **convex** lens corrects it.',
      v: V.hyper,
      n: 'In a hypermetropic eye the eyeball is too short. Rays from a near object would meet behind the retina, so the image on the retina is blurred. A convex lens bends the rays inwards so that they meet on the retina.',
    }),
    sl('check', 'Quick check: long sight', {
      b: 'True or false: hypermetropia is corrected by using concave lenses.',
      chk: 'hyper-tf',
      n: 'Which lens brings rays together sooner?',
    }),
    sl('example', 'Worked example 1: choosing a lens', {
      b: `A short-sighted student sees clearly only up to **${MYOPE.farPointCm} cm**; a normal eye sees distant objects clearly and near ones from about **${NEAR_POINT} cm**.`,
      ul: ['Step 1: distant objects blurred, near ones clear → **myopia**.', `Step 2: the lens must make distant objects appear at the far point, ${MYOPE.farPointCm} cm away.`, `Step 3: a **concave** lens of focal length **${-MYOPE.focalCm} cm** does this.`],
      v: table(['Symptom', 'Defect', 'Lens'], [['Distant objects blurred', 'Myopia', `Concave (focal length ${-MYOPE.focalCm} cm here)`], ['Near objects blurred, young person', 'Hypermetropia', 'Convex'], ['Near objects blurred, older person', 'Presbyopia', 'Convex or bifocal']], 'Worked table matching symptoms to defects and the lenses that correct them'),
      n: 'First decide which objects are blurred. Distant blur means myopia and a concave lens. For this student, the lens must make distant objects seem to be two metres away, his far point, so its focal length is two metres.',
    }),
    sl('diagram', 'Inside the ear', {
      b: '**Outer ear**: pinna, auditory canal. **Middle ear**: tympanum, ossicles, Eustachian tube. **Inner ear**: cochlea, vestibule, semicircular canals.',
      v: V.ear,
      n: 'The pinna funnels sound into the auditory canal to the ear drum. Behind it, in the air-filled middle ear, three tiny bones form a chain. The inner ear holds the coiled cochlea for hearing, and the vestibule and semicircular canals for balance.',
    }),
    sl('concept', 'Parts of the ear and their functions', {
      v: table(['Part', 'Function'], [['Pinna', 'Collects sound waves'], ['Auditory canal', 'Leads sound to the ear drum; wax traps dust'], ['Tympanum (ear drum)', 'Vibrates with sound'], ['Ossicles: malleus, incus, stapes', 'Carry and strengthen the vibrations'], ['Eustachian tube', 'Joins middle ear to throat; equalises air pressure'], ['Cochlea (organ of Corti)', 'Changes vibrations into nerve impulses'], ['Semicircular canals and vestibule', 'Balance'], ['Auditory nerve', 'Carries impulses to the brain']], 'Table of the parts of the ear and their functions'),
      n: 'Each part has one main job. The ossicles are the smallest bones in the body. The Eustachian tube keeps the air pressure the same on both sides of the ear drum, which is why swallowing helps when your ears feel blocked in a plane.',
    }),
    sl('check', 'Quick check: hearing or balance?', {
      b: 'True or false: the semicircular canals are the part of the ear concerned with hearing.',
      chk: 'cochlea-tf',
      n: 'Which part is coiled like a snail?',
    }),
    sl('concept', 'How we hear', {
      v: flow('TB', [['p', 'Pinna and auditory canal'], ['t', 'Tympanum vibrates'], ['o', 'Malleus → incus → stapes'], ['w', 'Oval window; fluid of the cochlea'], ['c', 'Organ of Corti: impulses'], ['b', 'Auditory nerve → brain']], [['p', 't'], ['t', 'o'], ['o', 'w'], ['w', 'c'], ['c', 'b']], 'Flow of sound from the pinna to the brain'),
      n: 'Sound waves set the ear drum vibrating. The three ossicles pass the vibrations to the oval window and make the fluid in the cochlea move. Sensory hair cells change this movement into nerve impulses, and the brain recognises them as sound.',
    }),
    sl('check', 'Quick check: the path of sound', {
      b: 'Which sequence shows the path of sound vibrations in the ear?',
      chk: 'sound-path-mcq',
      n: 'Start at the ear drum.',
    }),
    sl('concept', 'How the ear keeps us balanced', {
      v: table(['Part', 'Detects', 'How'], [['Semicircular canals (three, at right angles)', 'Movement and rotation of the head', 'Fluid moves and bends sensory hairs'], ['Vestibule', 'Position of the head with respect to gravity', 'Sensory cells sense the pull of gravity']], 'Table of the semicircular canals and vestibule in balance'),
      n: 'The three semicircular canals lie at right angles, so turning in any direction moves the fluid in at least one of them. The vestibule senses which way is down. The brain uses both to keep us upright.',
    }),
    sl('example', 'Worked example 2: why we feel dizzy', {
      b: 'Follow the fluid in the semicircular canals during and after a spin.',
      ul: ['Step 1: as you start spinning, the fluid lags behind and bends the sensory hairs: the brain senses turning.', 'Step 2: when you stop suddenly, the fluid keeps moving for a while.', 'Step 3: the hairs still signal turning, though you are still: you feel **dizzy**.'],
      v: table(['Moment', 'Fluid in the canals', 'Feeling'], [['Start of spin', 'Lags behind', 'Turning'], ['Steady spin', 'Moves with the head', 'Little sensation'], ['Sudden stop', 'Keeps moving', 'Dizziness']], 'Worked table of the fluid in the semicircular canals and the feeling at the start, during and after a spin'),
      n: 'The fluid in the canals behaves like tea in a cup you turn. When you stop, it keeps swirling. Your eyes say you are still, but your canals say you are turning, and the mismatch makes you dizzy.',
    }),
    sl('summary', 'Summary', {
      ul: ['Myopia: concave lens. Hypermetropia and presbyopia: convex lens. Astigmatism: cylindrical lens. Cataract: surgery.', 'Ear: outer (pinna, canal), middle (tympanum, ossicles, Eustachian tube), inner (cochlea, vestibule, semicircular canals).', 'Hearing: tympanum → ossicles → cochlea → auditory nerve → brain.', 'Balance: semicircular canals for movement, vestibule for position.'],
      v: table(['Job', 'Part of the inner ear'], [['Hearing', 'Cochlea'], ['Balance', 'Semicircular canals and vestibule']], 'Summary table: the cochlea is for hearing; the semicircular canals and vestibule are for balance'),
      n: 'To recap. The length of the eyeball decides whether you are short or long sighted, and the right lens corrects it. The ear passes vibrations from the ear drum to the cochlea for hearing, and uses separate canals to keep you balanced.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Ray diagrams are needed **only** for myopia and hypermetropia.', 'Myopia: image **in front of** retina, **concave** lens. Hypermetropia: **behind**, **convex**.', 'Name the ossicles **in order**: malleus, incus, stapes.', 'Cochlea = hearing; semicircular canals and vestibule = balance.'],
      n: 'Exam tips. You only need ray diagrams for myopia and hypermetropia. Match each defect with its lens. Learn the ossicles in order from the ear drum. And never put balance in the cochlea.',
    }),
  ],
});
