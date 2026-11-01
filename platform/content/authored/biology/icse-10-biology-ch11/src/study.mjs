// ICSE 10 Biology ch11 notes and flashcards.
import { T, unit, PROV } from '../../icse-10-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { FIELD } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Sense Organs: Eye and Ear — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Structure of the eye',
      `**External:** the eyeball sits in the bony **orbit**; eyelids, eyelashes and the **conjunctiva** (a thin transparent membrane over the front) protect it.

**Three coats:**
- **Sclera** — tough, white outer coat; in front it bulges as the transparent **cornea**, which lets light in and bends it.
- **Choroid** — dark, with blood vessels; nourishes the retina and **absorbs stray light**. In front it forms the **ciliary body** (with ciliary muscles) and the **iris**, which controls the size of the **pupil**.
- **Retina** — innermost, light-sensitive: **rods** (dim light, no colour; contain **visual purple**, made with vitamin A) and **cones** (bright light, colour). The **yellow spot** has the most cones (sharpest vision); the **blind spot**, where the **optic nerve** leaves, has none.

**Lens** — transparent, biconvex, elastic; held by **suspensory ligaments** from the ciliary body; focuses light on the retina.
**Aqueous humour** (between cornea and lens) and **vitreous humour** (jelly behind the lens) keep the shape of the eyeball.`,
      [kt('Cornea', 'Transparent front part of the sclera.'), kt('Iris', 'Coloured muscular ring that controls the pupil.'), kt('Yellow spot', 'Part of the retina with most cones; sharpest vision.'), kt('Blind spot', 'Point where the optic nerve leaves; no rods or cones.')],
      V.eye,
      [1],
    ),
    sec(
      '2. Accommodation, adaptation and stereoscopic vision',
      `**Accommodation** — focusing on objects at different distances by changing the curvature of the lens.
- **Near object:** ciliary muscles **contract** → suspensory ligaments **slacken** → lens **thicker**, more convex (shorter focal length).
- **Distant object:** ciliary muscles **relax** → ligaments **tight** → lens **thinner**, flatter.

**Adaptation to light and dark:**
- **Bright light:** **circular** muscles of the iris contract → pupil **small**; visual purple in rods bleached; cones used.
- **Dim light:** **radial** muscles contract → pupil **large**; visual purple rebuilt (takes several minutes); rods used.

**Stereoscopic (binocular) vision:** both eyes face forward and their fields overlap (each about ${FIELD.each}°, together about ${FIELD.total}°, overlap about ${FIELD.overlap}°). The brain fuses the two slightly different views into one **three-dimensional** image, so we can **judge depth and distance**.`,
      [kt('Accommodation', 'Adjustment of the lens to focus near and distant objects.'), kt('Stereoscopic vision', 'Vision with two overlapping fields, giving depth.'), kt('Visual purple', 'Light-sensitive pigment of the rods (rhodopsin).')],
      V.accom,
      [2],
      [V.pupil, V.fields],
    ),
    sec(
      '3. Defects of the eye',
      `| Defect | Cause | Effect | Correction |
|---|---|---|---|
| **Myopia** (short sight) | Eyeball too long or lens too curved | Distant objects blurred; image **in front of** retina | **Concave** lens |
| **Hypermetropia** (long sight) | Eyeball too short or lens too flat | Near objects blurred; image **behind** retina | **Convex** lens |
| **Presbyopia** | Lens loses elasticity, ciliary muscles weaken with age | Near objects blurred | Convex or bifocal lens |
| **Astigmatism** | Uneven curvature of the cornea | Lines in some directions blurred | **Cylindrical** lens |
| **Cataract** | Lens becomes cloudy (opaque) | Blurred, dim vision | Surgery: artificial lens |

Ray diagrams are drawn for myopia and hypermetropia only. For myopia, a concave lens whose focal length equals the person's far point makes distant objects appear at that point.`,
      [kt('Myopia', 'Short-sightedness; corrected with a concave lens.'), kt('Hypermetropia', 'Long-sightedness; corrected with a convex lens.'), kt('Cataract', 'Clouding of the lens.')],
      V.myopia,
      [3],
      [V.hyper],
    ),
    sec(
      '4. Structure of the ear',
      `- **Outer ear:** **pinna** (collects sound) and **auditory canal** (with hairs and wax glands that trap dust), ending at the **tympanum** (ear drum).
- **Middle ear:** an air-filled cavity with three **ossicles** — **malleus** (hammer), **incus** (anvil), **stapes** (stirrup; the smallest bone in the body) — joined in a chain from the tympanum to the **oval window**. The **Eustachian tube** connects it to the **throat** and equalises air pressure on both sides of the ear drum.
- **Inner ear** (membranous labyrinth with fluid): the coiled **cochlea**, containing the **organ of Corti** (hearing); the **vestibule** (utriculus and sacculus); three **semicircular canals** at right angles, each with a swelling (ampulla) holding sensory hairs. The **auditory nerve** runs to the brain.`,
      [kt('Tympanum', 'Ear drum; vibrates with sound.'), kt('Ossicles', 'Malleus, incus and stapes in the middle ear.'), kt('Eustachian tube', 'Tube joining the middle ear to the throat.'), kt('Cochlea', 'Coiled part of the inner ear for hearing.')],
      V.ear,
      [4],
    ),
    sec(
      '5. Hearing and balance',
      `**Path of sound:** pinna → auditory canal → **tympanum** vibrates → **malleus → incus → stapes** (vibrations transmitted and amplified) → **oval window** → fluid in the **cochlea** → sensory hair cells of the **organ of Corti** produce impulses → **auditory nerve** → **brain** (cerebrum), where sound is perceived.

**Balance:**
- **Semicircular canals** detect **movement and rotation** (dynamic balance): turning the head moves the fluid, which bends sensory hairs.
- **Vestibule** detects the **position of the head** with respect to gravity (static balance).
- After spinning, the fluid keeps moving for a while, so we feel **dizzy**.`,
      [kt('Organ of Corti', 'Sensory part of the cochlea for hearing.'), kt('Semicircular canals', 'Three canals that detect movement of the head.'), kt('Vestibule', 'Part of the inner ear that senses head position.')],
      V.ear,
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying the ciliary muscles relax for near vision: they **contract**.
- Swapping the iris muscles: **circular** for bright light, **radial** for dim light.
- Confusing the **yellow spot** (most cones) with the **blind spot** (none).
- Using a convex lens for myopia; drawing ray diagrams for defects other than myopia and hypermetropia.
- Putting balance in the cochlea.

**How marks are usually awarded**
- 1 mark: a term (cataract, accommodation), a part named, an odd one out **with its category**.
- 2 marks: two differences, a mechanism (accommodation, adaptation) in two steps.
- 3 marks: a labelled eye or ear, ray diagrams for myopia or hypermetropia, the path of sound.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Clear front of the eye?', 'Cornea.', 'fact', 1),
    fc(2, 'Controls the pupil?', 'Iris.', 'fact', 1),
    fc(3, 'Changes the shape of the lens?', 'Ciliary body (ciliary muscles).', 'fact', 1),
    fc(4, 'Light-sensitive layer?', 'Retina.', 'fact', 1),
    fc(5, 'Rods vs cones?', 'Rods: dim light. Cones: bright light, colour.', 'concept', 1),
    fc(6, 'Yellow spot?', 'Most cones; sharpest vision.', 'definition', 1),
    fc(7, 'Blind spot?', 'Optic nerve leaves; no rods or cones.', 'definition', 1),
    fc(8, 'Why is the choroid dark?', 'Absorbs stray light.', 'concept', 1),
    fc(9, 'Jelly behind the lens?', 'Vitreous humour.', 'fact', 1),
    fc(10, 'Vitamin for visual purple?', 'Vitamin A.', 'fact', 1),
    fc(11, 'Accommodation?', 'Focusing near and far by changing the lens.', 'definition', 2),
    fc(12, 'Near object: ciliary muscles?', 'Contract; lens thicker.', 'exam-tip', 2),
    fc(13, 'Distant object: ciliary muscles?', 'Relax; lens thinner.', 'exam-tip', 2),
    fc(14, 'Bright light: pupil?', 'Small (circular muscles contract).', 'fact', 2),
    fc(15, 'Dim light: pupil?', 'Large (radial muscles contract).', 'fact', 2),
    fc(16, 'Stereoscopic vision?', 'Overlapping views of two eyes; judges depth.', 'definition', 2),
    fc(17, 'Myopia: image and lens?', 'In front of retina; concave lens.', 'exam-tip', 3),
    fc(18, 'Hypermetropia: image and lens?', 'Behind retina; convex lens.', 'exam-tip', 3),
    fc(19, 'Presbyopia?', 'Lens less elastic with age; near blur.', 'definition', 3),
    fc(20, 'Astigmatism correction?', 'Cylindrical lens.', 'fact', 3),
    fc(21, 'Cataract?', 'Cloudy lens; replaced by surgery.', 'definition', 3),
    fc(22, 'Three ossicles in order?', 'Malleus, incus, stapes.', 'exam-tip', 4),
    fc(23, 'Smallest bone in the body?', 'Stapes.', 'fact', 4),
    fc(24, 'Eustachian tube?', 'Joins middle ear to throat; equalises pressure.', 'definition', 4),
    fc(25, 'Part of the ear for hearing?', 'Cochlea (organ of Corti).', 'fact', 4),
    fc(26, 'Job of ear wax?', 'Traps dust and germs.', 'fact', 4),
    fc(27, 'Path of sound?', 'Tympanum → ossicles → cochlea → auditory nerve → brain.', 'exam-tip', 5),
    fc(28, 'Detects rotation of the head?', 'Semicircular canals.', 'fact', 5),
    fc(29, 'Detects head position?', 'Vestibule.', 'fact', 5),
    fc(30, 'Why dizzy after spinning?', 'Fluid in the canals keeps moving.', 'concept', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
