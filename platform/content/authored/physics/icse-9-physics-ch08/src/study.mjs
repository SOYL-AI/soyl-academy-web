// ICSE 9 Physics ch08 Reflection of Light at Plane Mirrors: notes and flashcards.
import { T, table, unit, PROV, r } from '../../icse-9-physics-ch01/src/lib.mjs';
import { PAR, PAR_IM, N_TABLE } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Reflection of Light at Plane Mirrors — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Laws of reflection and their verification',
      r`**Terms.** The ray that falls on the mirror is the **incident ray**; the ray sent back is the **reflected ray**. The **normal** is the perpendicular to the mirror at the **point of incidence**. The **angle of incidence** $i$ and the **angle of reflection** $r$ are measured **from the normal**.

**Laws of reflection**
1. The angle of incidence is equal to the angle of reflection: $i = r$.
2. The incident ray, the reflected ray and the normal at the point of incidence all lie in the **same plane**.

A ray along the normal has $i = 0$ and is reflected back along its own path. If a ray makes an angle $\alpha$ with the mirror, then $i = 90° - \alpha$.

**Verification (pin experiment).** On a sheet of paper draw a line for the mirror and a normal ON at O. Fix pins **P1 and P2** on a line through O (the incident ray). Looking into the mirror, fix **P3 and P4** so that they appear in line with the **images** of P1 and P2. Remove the mirror and pins, join P3P4 to O, and measure $\angle i$ and $\angle r$ with a protractor. Repeat for other angles. Within experimental error $i = r$, and the pins lie flat on the paper, which shows the second law. **Precautions:** keep the pins vertical; fix P3 and P4 by looking at the bases of the images; keep the mirror edge on the line.`,
      [kt('Normal', 'The line drawn at 90° to the mirror at the point of incidence.'), kt('Angle of incidence', 'The angle between the incident ray and the normal.'), kt('Angle of reflection', 'The angle between the reflected ray and the normal.')],
      [fm(r`\angle i = \angle r`, 'First law of reflection')],
      table(['Law', 'Statement'], [['First', 'Angle of incidence = angle of reflection'], ['Second', 'Incident ray, reflected ray and normal lie in one plane']], 'Table of the two laws of reflection'),
      [1],
    ),
    sec(
      '2. The image in a plane mirror; uses',
      r`**Image of a point.** Rays from a point object O are reflected as if they came from a point I behind the mirror. The image is found by tracing two reflected rays **backwards** (dotted lines); they meet at I. OI is perpendicular to the mirror and the distance of I behind the mirror equals the distance of O in front.

**Characteristics of the image**
- **virtual** (the reflected rays only appear to meet; it cannot be received on a screen);
- **erect**;
- **same size** as the object;
- **as far behind the mirror as the object is in front** ($v = u$);
- **laterally inverted**: left appears as right (so AMBULANCE is printed reversed on the front of the vehicle).

A clock seen in a mirror reads (12:00 − actual time): a clock that shows 8:20 in the mirror actually reads 3:40. If an object moves towards a mirror at speed $s$, its image moves towards the mirror at $s$ too, so the object and image approach each other at $2s$.

**Uses.** Dressing mirrors and shop windows; **periscopes** (two parallel plane mirrors at 45° to the tube); **kaleidoscopes** (mirrors inclined at an angle); barbers' shops; scales of meters to avoid parallax error.`,
      [kt('Virtual image', 'An image formed by rays that only appear to meet; it cannot be received on a screen.'), kt('Lateral inversion', 'The interchange of left and right in the image formed by a plane mirror.')],
      [],
      table(['Characteristic', 'Plane mirror image'], [['Nature', 'Virtual'], ['Position', 'As far behind the mirror as the object is in front'], ['Size', 'Same as the object'], ['Orientation', 'Erect and laterally inverted']], 'Table of the characteristics of the image in a plane mirror'),
      [2],
    ),
    sec(
      '3. Images in two mirrors',
      r`**Parallel mirrors.** An image formed in one mirror acts as an **object** for the other, so an object between two parallel mirrors forms **many** images (infinite in principle). Locate them by repeated reflection. With O ${PAR.x0} cm from M1 and the mirrors ${PAR.d} cm apart, I1 is ${PAR.x0} cm behind M1, I2 is ${PAR.d - PAR.x0} cm behind M2, I3 (image of I2 in M1) is ${-PAR_IM.chainB[1]} cm behind M1, I4 (image of I1 in M2) is ${PAR_IM.chainA[1] - PAR.d} cm behind M2. **Brightness:** some light is lost (absorbed, scattered) at each reflection, so **successive images are fainter**.

**Inclined mirrors.** For mirrors at angle $\theta$ the object and its images lie on a circle centred at the meeting point of the mirrors. If $\dfrac{360}{\theta}$ is a whole number:
- **even** $\dfrac{360}{\theta}$: $n = \dfrac{360}{\theta} - 1$ for any position of the object;
- **odd** $\dfrac{360}{\theta}$: $n = \dfrac{360}{\theta} - 1$ if the object is on the **bisector**, otherwise $n = \dfrac{360}{\theta}$.

Examples: 90° gives 3; 60° gives 5; 45° gives 7; 30° gives 11. As $\theta$ tends to 0 the mirrors become parallel and the number of images becomes infinite. Textbooks differ on the odd case; this chapter uses the rule above, which can be checked by drawing the images.`,
      [kt('Multiple images', 'The many images formed when the image in one mirror acts as an object for the other mirror.')],
      [fm(r`n = \dfrac{360}{\theta} - 1`, 'Number of images in two plane mirrors inclined at an angle θ')],
      table(['θ', 'Images'], N_TABLE.map(([t, n, off]) => [`${t}°`, off === undefined ? `${n}` : `${n} on the bisector, ${off} elsewhere`]), 'Table of the number of images for different angles between the mirrors'),
      [3],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Measuring the angle of incidence from the mirror instead of from the normal.
- Drawing the reflected rays behind the mirror with continuous lines instead of dotted lines.
- Calling the image in a plane mirror real, or forgetting lateral inversion.
- Forgetting the "− 1" in n = 360 ÷ θ − 1, or ignoring the odd case.
- Saying that far images are fainter because they are farther away (the reason is the loss of light at each reflection).

**How marks are usually awarded**
- Laws (2 marks): both laws, with "i = r" and "in the same plane".
- Diagrams (2 to 3 marks): normal dotted, arrows on rays, dotted lines behind the mirror, labels.
- Numericals (1 to 3 marks): angle from the normal, distances, number of images with the formula shown.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'First law of reflection?', 'The angle of incidence equals the angle of reflection.', 'definition', 1),
    fc(2, 'Second law of reflection?', 'Incident ray, reflected ray and normal lie in one plane.', 'definition', 1),
    fc(3, 'The normal?', 'A line at 90° to the mirror at the point of incidence.', 'definition', 1),
    fc(4, 'From where are i and r measured?', 'From the normal.', 'fact', 1),
    fc(5, 'A ray makes 30° with a mirror. Angle of incidence?', '60°.', 'concept', 1),
    fc(6, 'A ray falls along the normal. What happens?', 'It returns along the same path; i = 0.', 'concept', 1),
    fc(7, 'Pins used to verify the laws?', 'P1 and P2 on the incident ray; P3 and P4 in line with the images.', 'fact', 1),
    fc(8, 'Angle between incident and reflected rays if i = 35°?', '70°.', 'concept', 1),
    fc(9, 'Image in a plane mirror: nature?', 'Virtual.', 'fact', 2),
    fc(10, 'Image in a plane mirror: size?', 'Same as the object.', 'fact', 2),
    fc(11, 'Image in a plane mirror: orientation?', 'Erect.', 'fact', 2),
    fc(12, 'Image distance behind a plane mirror?', 'Equal to the object distance in front.', 'fact', 2),
    fc(13, 'Lateral inversion?', 'Left and right are interchanged in the image.', 'definition', 2),
    fc(14, 'Why is AMBULANCE written reversed?', 'So that it reads correctly in a driver’s rear-view mirror.', 'concept', 2),
    fc(15, 'How do we find a virtual image in a ray diagram?', 'Extend the reflected rays backwards with dotted lines.', 'concept', 2),
    fc(16, 'Why can a virtual image not be caught on a screen?', 'No light really reaches it.', 'concept', 2),
    fc(17, 'A person walks to a mirror at 1 m/s. Speed of the image relative to the person?', '2 m/s.', 'concept', 2),
    fc(18, 'A periscope uses?', 'Two plane mirrors at 45° to the tube.', 'fact', 2),
    fc(19, 'A kaleidoscope uses?', 'Mirrors inclined at an angle to make patterns.', 'fact', 2),
    fc(20, 'Images in two parallel mirrors?', 'Many (infinite in principle).', 'fact', 3),
    fc(21, 'Why does the image in one mirror give more images?', 'It acts as an object for the other mirror.', 'concept', 3),
    fc(22, 'Why do successive images get fainter?', 'Some light is lost at each reflection.', 'concept', 3),
    fc(23, 'Number of images, mirrors inclined at θ?', 'n = 360 ÷ θ − 1 (when 360 ÷ θ is a whole number).', 'formula', 3),
    fc(24, 'Images at 90°?', '3.', 'fact', 3),
    fc(25, 'Images at 60°?', '5.', 'fact', 3),
    fc(26, 'Images at 45°?', '7.', 'fact', 3),
    fc(27, '360 ÷ θ odd and object off the bisector?', 'n = 360 ÷ θ.', 'concept', 3),
    fc(28, 'Object and images in inclined mirrors lie on?', 'A circle centred where the mirrors meet.', 'concept', 3),
    fc(29, 'Mirrors become parallel (θ → 0): images?', 'Infinite.', 'fact', 3),
    fc(30, 'Which images in two inclined mirrors are formed by two reflections?', 'Those that are images of images (for 90°, I3).', 'concept', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
