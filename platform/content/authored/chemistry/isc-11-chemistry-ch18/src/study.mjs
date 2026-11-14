// ch18 Isomerism — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const fm = (latex, label) => ({ latex, label });
const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Isomerism — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Isomerism and structural isomerism',
      `**Isomers** have the same molecular formula but different structures and therefore different properties. **Structural isomerism:** **chain** (different carbon skeleton: pentane and 2,2-dimethylpropane), **position** (group or multiple bond in a different place: butan-1-ol and butan-2-ol), **functional** (different functional groups: ethanol and methoxymethane; propanal and propanone) and **metamerism** (different alkyl groups on either side of the same group: ethoxyethane and 1-methoxypropane). **Stereoisomerism:** same connectivity, different arrangement in space (geometrical and optical).`,
      [kt('Isomerism', 'The existence of two or more compounds with the same molecular formula but different structures or arrangements of atoms.'), kt('Metamerism', 'Structural isomerism arising from different alkyl groups on the two sides of a polyvalent functional group such as –O– or >C=O.')],
      [],
      V.struct4,
      [1],
    ),
    sec(
      '2. All the isomers of C₄H₁₀O; tautomerism',
      `C₄H₁₀O has **7 structural isomers**: four alcohols (butan-1-ol, butan-2-ol, 2-methylpropan-1-ol, 2-methylpropan-2-ol) and three ethers (1-methoxypropane, ethoxyethane, 2-methoxypropane); butan-2-ol also has a mirror-image pair. Work systematically: family, skeleton, position. **Tautomerism:** two isomers in rapid dynamic equilibrium by the shift of a hydrogen atom; in **keto–enol** tautomerism a carbonyl compound with an α-hydrogen (keto) is in equilibrium with an enol (C=C–OH). Propanone: CH₃COCH₃ ⇌ CH₂=C(OH)CH₃, with the keto form predominating. Methanal and benzaldehyde have no α-hydrogen and show none.`,
      [kt('Tautomerism', 'Isomerism in which two forms are in dynamic equilibrium, usually by the shift of a hydrogen atom, as in keto and enol forms.'), kt('α-Hydrogen', 'A hydrogen atom on the carbon next to a carbonyl group.')],
      [],
      V.iso7,
      [1],
      [V.tauto],
    ),
    sec(
      '3. Geometrical isomerism',
      `Needs **restricted rotation** (a C=C bond or a ring) and **two different groups on each doubly bonded carbon**. **cis:** like groups on the same side; **trans:** on opposite sides. But-2-ene shows it; but-1-ene and 2-methylpropene do not. Cis and trans isomers differ in physical properties: cis-1,2-dichloroethene is polar (about 1.9 D, boils near 333 K), trans is non-polar (0 D, about 321 K). Of the isomers of C₄H₈ there are 3 structural alkenes and 4 stereoisomers in all. **Syn and anti isomerism** in oximes (C=N): in an aldoxime the syn form has H and OH on the same side of C=N, the anti form on opposite sides.`,
      [kt('Geometrical isomerism', 'Stereoisomerism arising from restricted rotation about a double bond or a ring, giving cis and trans forms.'), kt('Syn and anti', 'Names for the two geometrical isomers of an oxime, about the C=N bond.')],
      [],
      V.geom,
      [2],
      [V.oxime],
    ),
    sec(
      '4. Plane-polarised light, polarimeter and specific rotation',
      r`Ordinary light vibrates in all planes perpendicular to its path; **plane-polarised light** vibrates in one plane. A **Nicol prism** (calcite cut along a diagonal and cemented with Canada balsam) separates the **ordinary ray**, which is totally reflected and absorbed, from the **extraordinary ray**, which emerges plane polarised. A **polarimeter** (source, polariser, tube, analyser, scale) measures the **angle of rotation** $\alpha$. Clockwise: **dextrorotatory (d, +)**; anticlockwise: **laevorotatory (l, −)**. Specific rotation: $[\alpha] = \alpha / (l \times c)$, with $l$ in dm and $c$ in g mL⁻¹.`,
      [kt('Optical activity', 'The ability of a substance to rotate the plane of plane-polarised light.'), kt('Specific rotation', 'The rotation, in degrees, produced by a solution of concentration 1 g mL⁻¹ in a tube 1 dm long, at a stated temperature and wavelength.')],
      [fm(r`[\alpha] = \frac{\alpha}{l \times c}`, 'Specific rotation (l in dm, c in g mL⁻¹)'), fm(r`\alpha = [\alpha] \times l \times c`, 'Observed rotation')],
      V.polar,
      [3],
      [V.nicol],
    ),
    sec(
      '5. Chirality and the asymmetric carbon',
      `A molecule is **chiral** if it cannot be superimposed on its mirror image. The usual cause is an **asymmetric (chiral) carbon**, bonded to **four different** atoms or groups (marked *). A molecule with a plane or centre of symmetry is achiral. Examples with one chiral carbon: butan-2-ol, lactic acid, 2-aminopropanoic acid, 3-methylhexane. Propan-2-ol has none (two CH₃ groups). Mirror-image isomers are **enantiomers**: same physical properties, equal rotations in opposite directions.`,
      [kt('Chiral carbon', 'A carbon atom bonded to four different atoms or groups.'), kt('Enantiomers', 'A pair of stereoisomers that are non-superimposable mirror images of each other.')],
      [],
      V.chiral,
      [3],
    ),
    sec(
      '6. d and l forms, racemic mixture, meso form and compensation',
      `The **d form** (+) and **l form** (−) rotate by equal angles in opposite directions. An **equimolar mixture** of d and l is a **racemic mixture** (±): inactive by **external compensation** (cancellation between separate molecules); it can be resolved. A **meso compound** has chiral carbons and an internal plane of symmetry: inactive by **internal compensation** (one half of the molecule cancels the other); it cannot be resolved and is a single compound.`,
      [kt('Racemic mixture', 'An equimolar mixture of the d and l forms; optically inactive by external compensation.'), kt('Meso compound', 'A compound with chiral carbons and an internal plane of symmetry, optically inactive by internal compensation.')],
      [],
      V.comp,
      [4],
    ),
    sec(
      '7. Lactic acid and tartaric acid; counting stereoisomers',
      `**Lactic acid**, CH₃CH(OH)COOH, has one chiral carbon: two enantiomers (d and l) and the racemic form (dl). **Tartaric acid**, HOOC–CH(OH)–CH(OH)–COOH, has two identical chiral carbons: **three** stereoisomers (d, l and meso). **Counting:** n different chiral carbons give **2ⁿ** stereoisomers; a symmetrical molecule has fewer, because of meso forms (tartaric acid: 3 rather than 4; 2,3-dibromopentane, with unlike ends: 4).`,
      [kt('2ⁿ rule', 'A molecule with n different chiral carbons (no symmetry) has 2ⁿ stereoisomers.')],
      [],
      V.lactic,
      [4],
      [V.fischer],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Calling position isomers "chain isomers" (or the reverse); decide from the skeleton first.
- Saying that functional isomers are metamers.
- Using the tube length in cm or concentration in g/100 mL in the specific rotation formula.
- Writing that a meso compound is a mixture of d and l forms.
- Giving four stereoisomers for tartaric acid.

**How marks are usually awarded**
- Isomer questions: structure and name (0.5 or 1 mark each) plus the type of isomerism.
- Numericals: formula, substitution with units converted, answer with sign and unit (degrees).
- Compare/contrast questions (external and internal compensation): one mark per distinct point, with an example.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Define isomerism.', 'Compounds with the same molecular formula but different structures and properties.', 'definition', 1),
    fc(2, 'Two main classes of isomerism?', 'Structural and stereoisomerism.', 'fact', 1),
    fc(3, 'Five kinds of structural isomerism?', 'Chain, position, functional, metamerism, tautomerism.', 'fact', 1),
    fc(4, 'Chain isomers of C₄H₁₀?', 'Butane and 2-methylpropane.', 'example', 1),
    fc(5, 'Position isomers of C₄H₁₀O (alcohols)?', 'Butan-1-ol and butan-2-ol (same skeleton).', 'example', 1),
    fc(6, 'Functional isomers of C₂H₆O?', 'Ethanol (–OH) and methoxymethane (–O–).', 'example', 1),
    fc(7, 'Metamerism: define and give a pair.', 'Different alkyl groups on both sides of the same group: ethoxyethane and 1-methoxypropane.', 'definition', 1),
    fc(8, 'How many structural isomers has C₄H₁₀O?', 'Seven: four alcohols and three ethers.', 'fact', 1),
    fc(9, 'Define tautomerism.', 'Two isomers in rapid dynamic equilibrium, usually by a hydrogen shift.', 'definition', 1),
    fc(10, 'Keto and enol forms of propanone?', 'CH₃COCH₃ (keto) and CH₂=C(OH)CH₃ (enol); keto predominates.', 'example', 1),
    fc(11, 'What must a compound have to show keto–enol tautomerism?', 'At least one α-hydrogen next to C=O.', 'concept', 1),
    fc(12, 'Does methanal show keto–enol tautomerism?', 'No — it has no α-hydrogen.', 'example', 1),
    fc(13, 'Why does geometrical isomerism occur?', 'Rotation about the C=C bond (or in a ring) is restricted.', 'concept', 2),
    fc(14, 'Condition for cis–trans isomerism in alkenes?', 'Two different groups on each doubly bonded carbon.', 'concept', 2),
    fc(15, 'Define cis and trans.', 'Cis: like groups on the same side. Trans: on opposite sides.', 'definition', 2),
    fc(16, 'Does but-1-ene show cis–trans isomerism?', 'No — C-1 carries two identical hydrogens.', 'example', 2),
    fc(17, 'Which is more polar: cis- or trans-1,2-dichloroethene?', 'Cis (about 1.9 D); the trans dipole is zero.', 'fact', 2),
    fc(18, 'What are syn and anti isomers?', 'Geometrical isomers of oximes about C=N; syn = H and OH on the same side.', 'definition', 2),
    fc(19, 'What is plane-polarised light?', 'Light that vibrates in one plane only.', 'definition', 3),
    fc(20, 'What does a Nicol prism do?', 'Calcite plus Canada balsam: absorbs the o-ray, passes the e-ray as plane-polarised light.', 'concept', 3),
    fc(21, 'What does a polarimeter measure?', 'The angle of rotation α of the plane of polarised light.', 'fact', 3),
    fc(22, 'Dextrorotatory vs laevorotatory?', 'Clockwise (d, +) vs anticlockwise (l, −).', 'definition', 3),
    fc(23, 'Specific rotation formula?', '[α] = α / (l × c), l in dm, c in g mL⁻¹.', 'formula', 3),
    fc(24, 'Define specific rotation.', 'Rotation by 1 g mL⁻¹ solution in a 1 dm tube at stated T and wavelength.', 'definition', 3),
    fc(25, 'What is a chiral carbon?', 'A carbon bonded to four different atoms or groups.', 'definition', 3),
    fc(26, 'Which of butan-2-ol and propan-2-ol is optically active?', 'Butan-2-ol (chiral C-2); propan-2-ol has two identical methyl groups.', 'example', 3),
    fc(27, 'What are enantiomers?', 'Non-superimposable mirror images; equal and opposite rotations.', 'definition', 4),
    fc(28, 'What is a racemic mixture?', 'Equimolar mixture of d and l forms; inactive by external compensation.', 'definition', 4),
    fc(29, 'What is a meso compound?', 'Chiral carbons plus an internal plane of symmetry; inactive by internal compensation.', 'definition', 4),
    fc(30, 'How many stereoisomers does tartaric acid have?', 'Three: d, l and meso.', 'fact', 4),
    fc(31, 'Exam tip: number of stereoisomers', '2ⁿ for n different chiral carbons; fewer if the molecule is symmetrical.', 'exam-tip', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
