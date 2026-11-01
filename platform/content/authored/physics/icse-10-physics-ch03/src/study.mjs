// ICSE 10 Physics ch03 Machines — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Machines — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Machines: MA, VR and efficiency',
      r`- **Load (L):** force overcome; **effort (E):** force applied.
- $\text{MA} = L/E$; $\text{VR} = d_E/d_L$ (no units).
- Work input $= E d_E$; output $= L d_L$; $\eta = \dfrac{L d_L}{E d_E} = \dfrac{\text{MA}}{\text{VR}}$.
- Ideal machine: $\eta = 1$, MA = VR. Practical: friction and weight of moving parts → $\eta < 1$, MA < VR.
- Uses: force multiplier (MA > 1), speed multiplier (MA < 1), change of direction, convenient point of application.`,
      [kt('Mechanical advantage', 'The ratio of the load to the effort.'), kt('Velocity ratio', 'The ratio of the distance moved by the effort to the distance moved by the load in the same time.'), kt('Efficiency', 'The ratio of the useful work output to the work input of a machine.')],
      [fm(r`\eta = \dfrac{\text{MA}}{\text{VR}}`, 'Efficiency')],
      table(['Machine', 'MA', 'VR', 'η'], [['Ideal', 'VR', 'VR', '1'], ['Practical', '< VR', 'VR', '< 1']], 'Table contrasting ideal and practical machines'),
      [1],
    ),
    sec(
      '2. Levers',
      r`Rigid bar turning about a fulcrum. **Principle:** $L \times \text{load arm} = E \times \text{effort arm}$, so ideal $\text{MA} = \dfrac{\text{effort arm}}{\text{load arm}}$.

| Class | In the middle | MA | Examples |
|---|---|---|---|
| I | Fulcrum | > 1, = 1 or < 1 | See-saw, scissors, crowbar, beam balance |
| II | Load | Always > 1 | Nutcracker, wheelbarrow, bottle opener |
| III | Effort | Always < 1 | Forceps, sugar tongs, fishing rod |

Class III levers sacrifice force for speed and distance.`,
      [kt('Fulcrum', 'The fixed point about which a lever turns.'), kt('Effort arm', 'The perpendicular distance of the effort from the fulcrum.')],
      [fm(r`\text{MA} = \dfrac{\text{effort arm}}{\text{load arm}}`, 'Ideal lever')],
      table(['Lever', 'Class'], [['Scissors', 'I'], ['Nutcracker', 'II'], ['Forceps', 'III']], 'Table of three levers and their classes'),
      [2],
    ),
    sec(
      '3. Levers in the human body',
      `| Action | Fulcrum | Load | Effort | Class |
|---|---|---|---|---|
| Nodding | Top of spine | Weight of face | Neck muscles | I |
| Raising heels | Toes | Body weight at ankle | Calf muscle | II |
| Lifting with forearm | Elbow | Weight in hand | Biceps | III |`,
      [kt('Biceps lever', 'The forearm used as a class III lever, with the biceps pulling between the elbow and the hand.')],
      [],
      table(['Body part', 'Class'], [['Neck', 'I'], ['Foot', 'II'], ['Forearm', 'III']], 'Table of body levers'),
      [3],
    ),
    sec(
      '4. Pulley systems',
      r`- **Single fixed pulley:** MA = VR = 1 (ideal); changes direction of effort (pull down using body weight).
- **Single movable pulley:** VR = 2; with pulley weight $w$: $2E = L + w$.
- **Block and tackle:** VR = $n$ = number of strands supporting the lower block. No friction: $nE = L + w$, $\text{MA} = \dfrac{nL}{L + w}$, $\eta = \dfrac{L}{L + w}$.
- MA < VR because of friction and the weight of the lower block; efficiency rises with larger load.`,
      [kt('Block and tackle', 'A pulley system with a fixed upper block and a movable lower block joined by one continuous string.')],
      [fm(r`nE = L + w`, 'Block and tackle without friction'), fm(r`\eta = \dfrac{L}{L + w}`, 'Efficiency without friction')],
      table(['System', 'VR', 'Ideal MA'], [['Fixed pulley', '1', '1'], ['Movable pulley', '2', '2'], ['Block and tackle', 'n', 'n']], 'Table of pulley systems'),
      [4],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Giving units to MA or VR.
- Efficiency greater than 1.
- Counting strands attached to the upper block.
- Forgetting the weight of the lower block.

**How marks are usually awarded**
- Definitions (1 mark each).
- Derivation η = MA/VR (2 marks).
- Pulley numericals (1 mark each): VR, effort from nE = L + w, MA, efficiency.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Mechanical advantage?', 'Load ÷ effort.', 'formula', 1),
    fc(2, 'Velocity ratio?', 'Distance moved by effort ÷ distance moved by load.', 'formula', 1),
    fc(3, 'Efficiency?', 'Work output ÷ work input = MA ÷ VR.', 'formula', 1),
    fc(4, 'Why is MA < VR in practice?', 'Friction and weight of moving parts.', 'concept', 1),
    fc(5, 'Units of MA and VR?', 'None (ratios).', 'fact', 1),
    fc(6, 'Ideal machine efficiency?', '1 (100%).', 'fact', 1),
    fc(7, 'Does VR depend on friction?', 'No; only on the design.', 'concept', 1),
    fc(8, 'Speed multiplier?', 'A machine with MA < 1.', 'definition', 1),
    fc(9, 'Lever principle?', 'Load × load arm = effort × effort arm.', 'formula', 2),
    fc(10, 'Class I lever?', 'Fulcrum between load and effort.', 'definition', 2),
    fc(11, 'Class II lever?', 'Load between fulcrum and effort; MA > 1.', 'definition', 2),
    fc(12, 'Class III lever?', 'Effort between fulcrum and load; MA < 1.', 'definition', 2),
    fc(13, 'Class of a wheelbarrow?', 'II.', 'fact', 2),
    fc(14, 'Class of forceps?', 'III.', 'fact', 2),
    fc(15, 'Class of scissors?', 'I.', 'fact', 2),
    fc(16, 'Use of a class III lever?', 'Gains speed and distance.', 'concept', 2),
    fc(17, 'Nodding head: class?', 'I.', 'fact', 3),
    fc(18, 'Standing on toes: class?', 'II.', 'fact', 3),
    fc(19, 'Forearm lifting: class?', 'III.', 'fact', 3),
    fc(20, 'Fulcrum of the forearm?', 'Elbow.', 'fact', 3),
    fc(21, 'Single fixed pulley MA (ideal)?', '1.', 'fact', 4),
    fc(22, 'Use of a single fixed pulley?', 'Changes the direction of effort.', 'concept', 4),
    fc(23, 'VR of a single movable pulley?', '2.', 'fact', 4),
    fc(24, 'VR of a block and tackle?', 'Number of strands supporting the lower block.', 'fact', 4),
    fc(25, 'Effort in a frictionless block and tackle?', 'E = (L + w)/n.', 'formula', 4),
    fc(26, 'Efficiency of a frictionless block and tackle?', 'L/(L + w).', 'formula', 4),
    fc(27, 'Effect of a heavier lower block on η?', 'Decreases.', 'fact', 4),
    fc(28, 'Effect of a larger load on η?', 'Increases.', 'fact', 4),
    fc(29, 'Effect of friction on VR?', 'None.', 'fact', 4),
    fc(30, 'Exam tip: pulleys', 'Count only strands supporting the lower block.', 'exam-tip', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
