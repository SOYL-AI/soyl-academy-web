// ICSE 10 Biology ch08 notes and flashcards.
import { T, table, unit, PROV } from '../../icse-10-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { CYCLE, REST, BP } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Circulatory System: Heart, Blood Vessels and Circulation — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Structure of the human heart',
      `The heart is a hollow, muscular organ between the lungs, enclosed in a double-layered **pericardium** with **pericardial fluid** (reduces friction, protects).

- **Four chambers:** two thin-walled **auricles (atria)** above, which receive blood; two thick-walled **ventricles** below, which pump it out. The **left ventricle** has the **thickest wall** because it pumps blood to the whole body.
- A muscular **septum** separates the right (deoxygenated) and left (oxygenated) halves.
- **Valves:** **tricuspid** (three flaps) between right auricle and right ventricle; **bicuspid** or mitral (two flaps) between left auricle and left ventricle; **semilunar valves** (three half-moon pockets) at the bases of the pulmonary artery and the aorta. **Chordae tendineae** join the tricuspid and bicuspid flaps to **papillary muscles**, so the flaps cannot turn back into the auricles.

| Main vessel | Joins | Blood |
|---|---|---|
| Superior and inferior **venae cavae** | Body → right auricle | Deoxygenated |
| **Pulmonary artery** | Right ventricle → lungs | Deoxygenated |
| **Pulmonary veins** | Lungs → left auricle | Oxygenated |
| **Aorta** | Left ventricle → body | Oxygenated |`,
      [kt('Auricle', 'Upper, thin-walled chamber of the heart that receives blood.'), kt('Ventricle', 'Lower, thick-walled chamber that pumps blood out.'), kt('Chordae tendineae', 'Cords holding the flaps of the tricuspid and bicuspid valves.'), kt('Semilunar valves', 'Pocket valves at the bases of the aorta and pulmonary artery.')],
      V.heart,
      [1],
    ),
    sec(
      '2. Working of the heart: the cardiac cycle',
      `**Systole** = contraction; **diastole** = relaxation. One **cardiac cycle** at ${CYCLE.bpm} beats per minute lasts **${CYCLE.total} s**:
1. **Auricular systole** (${CYCLE.atrial} s): auricles contract and push blood into the ventricles through the open tricuspid and bicuspid valves.
2. **Ventricular systole** (${CYCLE.ventricular} s): ventricles contract; the **tricuspid and bicuspid close** (first sound, **lubb**); the **semilunar valves open** and blood enters the pulmonary artery and aorta.
3. **Joint diastole** (${CYCLE.diastole} s): all chambers relax; the **semilunar valves close** (second sound, **dub**); blood from the veins fills the auricles and flows on into the ventricles.

**Path of blood:** venae cavae → right auricle → tricuspid → right ventricle → semilunar valve → pulmonary artery → lungs → pulmonary veins → left auricle → bicuspid → left ventricle → semilunar valve → aorta → body.

At rest the heart pumps about ${REST.stroke} mL per beat, about ${REST.output} litres a minute at ${REST.bpm} beats a minute.`,
      [kt('Systole', 'Contraction of a heart chamber.'), kt('Diastole', 'Relaxation of a heart chamber.'), kt('Cardiac cycle', 'One complete sequence of contraction and relaxation of the heart.')],
      V.cardiac,
      [2],
    ),
    sec(
      '3. Double circulation',
      `In mammals blood passes through the heart **twice** in one complete round of the body:
- **Pulmonary circulation:** right ventricle → pulmonary artery → lungs (blood takes up oxygen) → pulmonary veins → left auricle.
- **Systemic circulation:** left ventricle → aorta → all organs → venae cavae → right auricle.

**Advantages:** oxygenated and deoxygenated blood are **kept separate**; the left ventricle sends blood to the body at **high pressure**, while the lungs receive blood at lower pressure. Warm-blooded, active mammals need this rich supply of oxygen.`,
      [kt('Double circulation', 'Blood passes through the heart twice in one round of the body.'), kt('Pulmonary circulation', 'Heart → lungs → heart.'), kt('Systemic circulation', 'Heart → body → heart.')],
      V.double,
      [3],
    ),
    sec(
      '4. Arteries, veins and capillaries',
      `| Feature | Artery | Vein | Capillary |
|---|---|---|---|
| Carries blood | Away from the heart | Towards the heart | Between arterioles and venules |
| Wall | **Thick**, muscular and elastic | **Thin**, less muscle | **One cell thick** |
| Lumen | Narrow | Wide | Very narrow |
| Valves | Absent (except semilunar at the base) | **Present** | Absent |
| Pressure and flow | High, in jerks (pulse) | Low, smooth | Falling, slow |
| Blood | Oxygenated (except pulmonary artery) | Deoxygenated (except pulmonary veins) | Exchange takes place |
| Position | Mostly deep | Often near the surface | In all tissues |

- **Arteries** withstand high pressure; their elastic walls stretch with each beat.
- **Veins** return blood at low pressure; **valves** prevent backflow, and muscles squeeze the veins. Weak valves in leg veins cause **varicose veins**.
- **Capillaries** are the site of **exchange**: oxygen and food diffuse out, carbon dioxide and wastes diffuse in.`,
      [kt('Artery', 'Vessel carrying blood away from the heart.'), kt('Vein', 'Vessel carrying blood towards the heart.'), kt('Capillary', 'Microscopic vessel with a wall one cell thick, where exchange occurs.')],
      V.vessels,
      [4],
    ),
    sec(
      '5. Pulse and blood pressure',
      `**Pulse:** the rhythmic expansion of an artery as each surge of blood is pumped by the left ventricle. It is felt where an artery lies near the surface over a bone: the **wrist** (thumb side), the **side of the neck**, the temple. **Pulse rate = heart rate** (about 72 per minute at rest). Veins show no pulse.

**Blood pressure:** the pressure of blood on the walls of the arteries, measured with a **sphygmomanometer** in mm of mercury (mm Hg).
- **${BP.systolic}/${BP.diastolic} mm Hg** is normal for a young adult.
- **Systolic** (upper figure, ${BP.systolic}): highest pressure, while the **ventricles contract**.
- **Diastolic** (lower figure, ${BP.diastolic}): lowest pressure, while the **ventricles relax**.
- Pressure persistently above about 140/90 mm Hg is **high blood pressure** (hypertension).`,
      [kt('Pulse', 'Rhythmic expansion of an artery with each heartbeat.'), kt('Systolic pressure', 'Arterial pressure during ventricular contraction.'), kt('Diastolic pressure', 'Arterial pressure during ventricular relaxation.'), kt('Sphygmomanometer', 'Instrument for measuring blood pressure.')],
      table(['Reading', 'Meaning'], [[String(BP.systolic), 'Systolic: ventricles contract'], [String(BP.diastolic), 'Diastolic: ventricles relax']], 'Table explaining the two numbers in a blood pressure reading'),
      [5],
    ),
    sec(
      '6. Blood vessels of the liver and kidney',
      `| Organ | Vessels bringing blood | Vessel taking blood away |
|---|---|---|
| **Liver** | **Hepatic artery** (oxygenated, from the aorta); **hepatic portal vein** (from the intestine, rich in digested food) | **Hepatic vein** (to the inferior vena cava) |
| **Kidney** | **Renal artery** (from the aorta; contains urea) | **Renal vein** (to the inferior vena cava; least urea) |

**Portal system:** a vein that begins in the capillaries of one organ and ends in the capillaries of another. The **hepatic portal vein** begins in the capillaries of the intestine and ends in the capillaries of the liver.

**Significance of the hepatic portal system:** the liver receives absorbed food **before** the rest of the body, so it can **store excess glucose as glycogen**, store other nutrients, **remove harmful substances** (toxins, drugs) and break down excess amino acids (forming urea), keeping the blood that reaches the heart steady in composition.`,
      [kt('Hepatic portal vein', 'Carries blood from the intestine to the liver.'), kt('Portal system', 'A vein running from the capillaries of one organ to those of another.'), kt('Renal vein', 'Carries cleaned blood from the kidney.')],
      V.portal,
      [6],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Drawing the heart\'s right side on the right of the page: in a front view it is on **your left**.
- Saying "arteries carry oxygenated blood": arteries carry blood **away from the heart** (the pulmonary artery carries deoxygenated blood).
- Swapping lubb and dub: **lubb** = tricuspid and bicuspid close; **dub** = semilunar valves close.
- Confusing the **hepatic vein** (leaves the liver) with the **hepatic portal vein** (intestine to liver).
- Naming vessels other than the main ones of the heart, liver and kidney (not required).

**How marks are usually awarded**
- 1 mark: a term (systole, portal system), a valve or vessel, an odd one out **with its category**.
- 2 marks: two differences, a reading explained, a feature with its reason.
- 3 marks: the path of blood with valves, a labelled L.S. of the heart, T.S. of an artery and a vein.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Membrane around the heart?', 'Pericardium (with pericardial fluid).', 'fact', 1),
    fc(2, 'Chamber with the thickest wall?', 'Left ventricle.', 'fact', 1),
    fc(3, 'Valve between right auricle and right ventricle?', 'Tricuspid.', 'fact', 1),
    fc(4, 'Valve between left auricle and left ventricle?', 'Bicuspid (mitral).', 'fact', 1),
    fc(5, 'Valves at the bases of the aorta and pulmonary artery?', 'Semilunar valves.', 'fact', 1),
    fc(6, 'Job of chordae tendineae?', 'Stop valve flaps turning back into the auricles.', 'concept', 1),
    fc(7, 'Artery carrying deoxygenated blood?', 'Pulmonary artery.', 'exam-tip', 1),
    fc(8, 'Veins carrying oxygenated blood?', 'Pulmonary veins.', 'exam-tip', 1),
    fc(9, 'Systole and diastole?', 'Contraction and relaxation of a chamber.', 'definition', 2),
    fc(10, 'Cause of "lubb"?', 'Tricuspid and bicuspid valves closing.', 'fact', 2),
    fc(11, 'Cause of "dub"?', 'Semilunar valves closing.', 'fact', 2),
    fc(12, `Length of one cycle at ${CYCLE.bpm} beats per minute?`, `${CYCLE.total} s.`, 'fact', 2),
    fc(13, 'Valves during ventricular systole?', 'AV valves shut; semilunar valves open.', 'concept', 2),
    fc(14, 'Double circulation?', 'Blood passes through the heart twice per round.', 'definition', 3),
    fc(15, 'Pulmonary circuit?', 'Right ventricle → lungs → left auricle.', 'fact', 3),
    fc(16, 'Systemic circuit?', 'Left ventricle → body → right auricle.', 'fact', 3),
    fc(17, 'Advantage of double circulation?', 'No mixing; high pressure to the body.', 'concept', 3),
    fc(18, 'Why are artery walls thick and elastic?', 'To withstand high, pulsing pressure.', 'concept', 4),
    fc(19, 'Why do veins have valves?', 'To prevent backflow.', 'concept', 4),
    fc(20, 'Site of exchange with cells?', 'Capillaries (wall one cell thick).', 'fact', 4),
    fc(21, 'Varicose veins?', 'Swollen veins where valves have failed.', 'definition', 4),
    fc(22, 'Pulse?', 'Rhythmic expansion of an artery with each beat.', 'definition', 5),
    fc(23, 'Two places to feel the pulse?', 'Wrist and side of the neck.', 'fact', 5),
    fc(24, 'Instrument for blood pressure?', 'Sphygmomanometer.', 'fact', 5),
    fc(25, `Meaning of ${BP.systolic}/${BP.diastolic}?`, 'Systolic over diastolic pressure in mm Hg.', 'exam-tip', 5),
    fc(26, 'Vessel from intestine to liver?', 'Hepatic portal vein.', 'fact', 6),
    fc(27, 'Oxygenated blood to the liver?', 'Hepatic artery.', 'fact', 6),
    fc(28, 'Blood out of the liver?', 'Hepatic vein.', 'fact', 6),
    fc(29, 'Vessel with the least urea?', 'Renal vein.', 'fact', 6),
    fc(30, 'Why does gut blood go to the liver first?', 'To store excess glucose and remove toxins.', 'concept', 6),
  ],
  status: 'draft',
  provenance: PROV,
};
