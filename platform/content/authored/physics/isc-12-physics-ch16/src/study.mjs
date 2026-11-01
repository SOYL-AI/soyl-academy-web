// ISC 12 Physics ch16 notes and flashcards.
import { T, unit, PROV, r } from '../../isc-12-physics-ch01/src/lib.mjs';
import { V, magPlot, resPlot } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Optical Instruments — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Magnifying power and the simple microscope',
      `- **Magnifying power** $M = \\dfrac{\\beta}{\\alpha}$: β is the angle subtended at the eye by the final image; α is the angle subtended by the object without the instrument (for a microscope, the object held at the near point, D = 25 cm). Small angles: angle = height/distance.
- **Simple microscope** (a convex lens held close to the eye, object inside F): virtual, erect, enlarged image.
- **Image at D (derivation):** v = −D in $\\dfrac{1}{v} - \\dfrac{1}{u} = \\dfrac{1}{f}$ gives $\\dfrac{1}{|u|} = \\dfrac{1}{f} + \\dfrac{1}{D}$. With the eye at the lens, β = h/|u| and α = h/D, so $M = \\dfrac{D}{|u|} = 1 + \\dfrac{D}{f}$ (equal to the linear magnification v/u).
- **Image at infinity (derivation):** object at F, rays leave parallel; β = h/f, α = h/D, so $M = \\dfrac{D}{f}$ (relaxed eye; one less than at D).
- A shorter focal length magnifies more, but very short lenses are tiny, need the object almost touching them and suffer aberrations: in practice M up to about 10.`,
      [kt('Near point (D)', 'The least distance of distinct vision, about 25 cm for a normal eye: the closest an object can be seen sharply.'), kt('Magnifying power', 'The ratio of the angle subtended at the eye by the final image to the angle subtended by the object viewed without the instrument.')],
      [fm(r`M = 1 + \dfrac{D}{f}`, 'Simple microscope, image at D'), fm(r`M = \dfrac{D}{f}`, 'Simple microscope, image at infinity')],
      V.simpleD,
      [1],
      [V.simpleInf, magPlot],
    ),
    sec(
      '2. The compound microscope',
      `- **Construction:** objective of very short focal length f_o and small aperture; eyepiece of short focal length f_e. Object just beyond F_o; the objective forms a real, inverted, enlarged image A′B′ just inside F_e; the eyepiece forms the final virtual image A″B″ (inverted relative to the object, greatly enlarged).
- **Final image at D (derivation):** β = h′/|u_e| (A″B″ subtends the same angle as A′B′ at the eye), α = h/D, so $M = \\dfrac{h'}{h}\\cdot\\dfrac{D}{|u_e|} = m_o m_e$ with $m_o = \\dfrac{v_o}{|u_o|}$ and $m_e = 1 + \\dfrac{D}{f_e}$: $M = \\dfrac{v_o}{|u_o|}\\left(1 + \\dfrac{D}{f_e}\\right)$. Lens separation $v_o + |u_e|$.
- **Approximation:** $\\dfrac{v_o}{|u_o|} = \\dfrac{v_o}{f_o} - 1 \\approx \\dfrac{L}{f_o}$ (object near F_o, A′B′ a distance L ≈ tube length from the objective).
- **Final image at infinity (expression only, derivation not required):** A′B′ at F_e; $M = \\dfrac{v_o}{|u_o|}\\cdot\\dfrac{D}{f_e} \\approx \\dfrac{L}{f_o}\\cdot\\dfrac{D}{f_e}$; separation $v_o + f_e$.
- High M needs short f_o and short f_e; an object at 2F_o would give m_o = 1.`,
      [kt('Objective', 'The lens nearer the object; in a microscope it has a very short focal length and forms a real, enlarged image.'), kt('Eyepiece', 'The lens next to the eye; it acts as a simple microscope on the image formed by the objective.')],
      [fm(r`M = \dfrac{v_o}{|u_o|}\left(1 + \dfrac{D}{f_e}\right)`, 'Compound microscope, image at D'), fm(r`M = \dfrac{v_o}{|u_o|}\cdot\dfrac{D}{f_e}`, 'Compound microscope, image at infinity')],
      V.compoundD,
      [2],
      [V.compoundInf],
    ),
    sec(
      '3. The refracting astronomical telescope',
      `- **Construction:** objective of long focal length f_o and large aperture (collects light, forms a real image of the distant object at F_o); eyepiece of short focal length f_e. α is the angle the object subtends where it is.
- **Normal adjustment (derivation):** the image I (height h) lies at F_o and at F_e. α = h/f_o, β = h/f_e, so $M = \\dfrac{f_o}{f_e}$; length $L = f_o + f_e$; final image at infinity, inverted.
- **Final image at D (derivation):** I lies |u_e| from the eyepiece with $\\dfrac{1}{|u_e|} = \\dfrac{1}{f_e} + \\dfrac{1}{D}$; β = h/|u_e|, α = h/f_o, so $M = \\dfrac{f_o}{|u_e|} = \\dfrac{f_o}{f_e}\\left(1 + \\dfrac{f_e}{D}\\right)$; length $f_o + |u_e|$ (slightly shorter).
- The objective’s diameter does not change M; the light collected grows with its area (brighter images, finer detail). Terrestrial telescopes add an erecting system.`,
      [kt('Normal adjustment', 'The setting of a telescope in which the final image is at infinity, the image formed by the objective lying at the focus of the eyepiece.')],
      [fm(r`M = \dfrac{f_o}{f_e},\quad L = f_o + f_e`, 'Telescope, normal adjustment'), fm(r`M = \dfrac{f_o}{f_e}\left(1 + \dfrac{f_e}{D}\right)`, 'Telescope, image at D')],
      V.teleInf,
      [3],
      [V.teleD],
    ),
    sec(
      '4. Reflecting telescopes',
      `- **Cassegrain type:** a large concave paraboloidal primary mirror reflects the light towards its focus; a small convex secondary mirror inside that focus reflects it back through a hole in the primary to a focus behind it, viewed with an eyepiece (or recorded by a camera). Image at infinity: $M = \\dfrac{F}{f_e}$, F being the focal length of the mirror system (the convex secondary makes F several times the primary’s focal length while the tube stays short).
- **Advantages over refractors:** no chromatic aberration (reflection does not depend on n); no spherical aberration with a paraboloid; a mirror is supported over its whole back, so very large apertures are possible (a lens sags); only one surface to figure and no light absorbed in glass, so cheaper and brighter; greater light-gathering and resolving power; short tube.
- **Drawbacks:** the secondary blocks a little light (the image stays complete, slightly dimmer); mirrors need re-coating and careful alignment.`,
      [kt('Chromatic aberration', 'Coloured fringes in an image because a lens focuses different colours at different distances, its refractive index depending on wavelength.'), kt('Spherical aberration', 'Blurring because rays far from the axis are focused at a different point from paraxial rays.')],
      [fm(r`M = \dfrac{F}{f_e}`, 'Reflecting telescope, image at infinity')],
      V.cass,
      [4],
      [V.chroma],
    ),
    sec(
      '5. Resolving power; uses, advantages and drawbacks',
      `- **Resolving power of a microscope** (formula only): two points closer than $d = \\dfrac{\\lambda}{2n\\sin\\beta}$ cannot be seen as separate; resolving power $= \\dfrac{1}{d} = \\dfrac{2n\\sin\\beta}{\\lambda}$. β is the half-angle of the cone of light from the object accepted by the objective; n sin β is the **numerical aperture**.
- **Factors:** wavelength (shorter is better), refractive index of the medium between object and objective, and β. **To increase it:** blue, violet or ultraviolet light (or electrons in an electron microscope); oil immersion (n ≈ 1.5); a wide-aperture objective close to the object. A stronger eyepiece gives only empty magnification.
- **Uses:** simple microscope — watch and jewellery repair, reading fine print, field biology; compound microscope — cells, bacteria, blood tests, metallurgy, forensic work; telescopes — astronomy, navigation, surveying.
- **Advantages and drawbacks:** simple microscope cheap and erect but M ≤ about 10; compound microscope high M but inverted image, small field, needs strong light; refractors sealed and simple but chromatic aberration and size limits; reflectors large and colour-free but a central obstruction and upkeep.`,
      [kt('Resolving power', 'The reciprocal of the smallest separation between two points that an instrument can show as separate.'), kt('Numerical aperture', 'The product n sin β for a microscope objective, where β is the half-angle of the accepted cone of light and n the index of the medium in front of the objective.')],
      [fm(r`\dfrac{1}{d} = \dfrac{2n\sin\beta}{\lambda}`, 'Resolving power of a microscope')],
      V.resolve,
      [5],
      [resPlot],
    ),
  ],
  exam_tips_md: `- Always say what α and β are; D = 25 cm; magnifying powers are quoted as magnitudes.
- Microscopes: simple 1 + D/f (D) and D/f (infinity); compound (v_o/|u_o|)(1 + D/f_e) at D, (v_o/|u_o|)(D/f_e) at infinity (expression only).
- Telescopes: f_o/f_e with L = f_o + f_e; (f_o/f_e)(1 + f_e/D) at D.
- Reflectors: concave primary, convex secondary, hole; no chromatic aberration. Resolving power 2n sin β/λ, not changed by the eyepiece.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Magnifying power of an optical instrument?', 'M = β/α: angle of the final image at the eye ÷ angle of the object without the instrument.', 'definition', 1),
    fc(2, 'Least distance of distinct vision used in ISC problems?', 'D = 25 cm (the near point of a normal eye).', 'fact', 1),
    fc(3, 'Simple microscope, image at D: M?', '$1 + \\dfrac{D}{f}$.', 'formula', 1),
    fc(4, 'Simple microscope, image at infinity: M?', '$\\dfrac{D}{f}$; object at the focus.', 'formula', 1),
    fc(5, 'Where is the object for a simple microscope with the image at D?', 'Inside F, with 1/|u| = 1/f + 1/D.', 'concept', 1),
    fc(6, 'Lens of f = 12.5 cm as a magnifier: M at D and at infinity?', '3 and 2.', 'example', 1),
    fc(7, 'Why is a simple microscope limited to about 10×?', 'Very short focal lengths need tiny, strongly curved lenses: small field and large aberrations.', 'concept', 1),
    fc(8, 'Image formed by the objective of a compound microscope?', 'Real, inverted, enlarged, just inside the focus of the eyepiece (image at D).', 'concept', 2),
    fc(9, 'Compound microscope, final image at D: M?', '$\\dfrac{v_o}{|u_o|}\\left(1 + \\dfrac{D}{f_e}\\right)$.', 'formula', 2),
    fc(10, 'Compound microscope, final image at infinity: M?', '$\\dfrac{v_o}{|u_o|}\\cdot\\dfrac{D}{f_e}$ (expression only).', 'formula', 2),
    fc(11, 'Approximate M of a compound microscope?', '$\\dfrac{L}{f_o}\\left(1 + \\dfrac{D}{f_e}\\right)$, L ≈ tube length.', 'formula', 2),
    fc(12, 'Exact objective magnification from v_o and f_o?', '$\\dfrac{v_o}{|u_o|} = \\dfrac{v_o}{f_o} - 1$.', 'formula', 2),
    fc(13, 'Final image of a compound microscope relative to the object?', 'Virtual, inverted, greatly enlarged.', 'fact', 2),
    fc(14, 'Lens separation in a compound microscope, image at infinity?', 'v_o + f_e.', 'formula', 2),
    fc(15, 'Objective and eyepiece focal lengths for a powerful microscope?', 'Both short (objective very short).', 'concept', 2),
    fc(16, 'Telescope in normal adjustment: M and length?', 'M = f_o/f_e; L = f_o + f_e.', 'formula', 3),
    fc(17, 'Telescope with the final image at D: M?', '$\\dfrac{f_o}{f_e}\\left(1 + \\dfrac{f_e}{D}\\right)$.', 'formula', 3),
    fc(18, 'What is normal adjustment?', 'Final image at infinity: the objective’s image lies at the focus of the eyepiece.', 'definition', 3),
    fc(19, 'Why a large aperture for a telescope objective?', 'More light (∝ area) and finer detail; M is unchanged.', 'concept', 3),
    fc(20, 'fo = 80 cm, fe = 8.0 cm: M normal and at D?', '10 and 13.2.', 'example', 3),
    fc(21, 'Mirrors of a Cassegrain telescope?', 'Concave paraboloidal primary with a central hole; small convex secondary.', 'concept', 4),
    fc(22, 'Why no chromatic aberration in a mirror?', 'Reflection does not depend on refractive index, so all colours focus together.', 'concept', 4),
    fc(23, 'Why paraboloidal, not spherical, primary mirrors?', 'A paraboloid brings all parallel rays to one focus: no spherical aberration.', 'concept', 4),
    fc(24, 'Why can mirrors be made larger than lenses?', 'A mirror is supported over its whole back; a lens only at its rim, so it sags.', 'concept', 4),
    fc(25, 'Magnifying power of a reflecting telescope, image at infinity?', 'M = F/f_e, F = focal length of the mirror system.', 'formula', 4),
    fc(26, 'Resolving power of a microscope?', '$\\dfrac{2n\\sin\\beta}{\\lambda}$ = 1/d.', 'formula', 5),
    fc(27, 'What is the numerical aperture?', 'n sin β of the objective.', 'definition', 5),
    fc(28, 'Three ways to raise a microscope’s resolving power?', 'Shorter wavelength; oil immersion (higher n); wider cone (larger β).', 'concept', 5),
    fc(29, 'Does a stronger eyepiece improve resolution?', 'No: empty magnification; it only enlarges the blur.', 'fact', 5),
    fc(30, 'Exam tip: α for a telescope?', 'The angle subtended by the object where it is (h/f_o), not at D.', 'exam-tip', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
