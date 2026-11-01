// ICSE 10 Physics ch12 Radioactivity and Nuclear Energy — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Radioactivity and Nuclear Energy — Notes',
  language: 'en',
  sections: [
    sec(
      '1. The nucleus; Z, A and isotopes',
      r`Nucleus: protons (+1, ~1 u) and neutrons (0, ~1 u). **Atomic number** $Z$ = number of protons; **mass number** $A$ = protons + neutrons; neutrons $N = A - Z$. Notation $\,{}^{A}_{Z}\text{X}$.

**Isotopes:** same $Z$, different $A$ (different numbers of neutrons); same chemical properties. Examples: protium, deuterium, tritium ($\,{}^{1}_{1}\text{H}$, $\,{}^{2}_{1}\text{H}$, $\,{}^{3}_{1}\text{H}$); carbon-12 and carbon-14.`,
      [kt('Atomic number', 'The number of protons in the nucleus of an atom.'), kt('Mass number', 'The total number of protons and neutrons in the nucleus.'), kt('Isotopes', 'Atoms of the same element with the same atomic number but different mass numbers.')],
      [fm(r`N = A - Z`, 'Number of neutrons')],
      table(['Nuclide', 'Protons', 'Neutrons'], [['Na-23', '11', '12'], ['Co-60', '27', '33'], ['C-14', '6', '8']], 'Table of protons and neutrons in three nuclides'),
      [1],
    ),
    sec(
      '2. Radioactivity and the three radiations',
      `**Radioactivity:** spontaneous disintegration of unstable nuclei, emitting α, β or γ radiation; not affected by temperature, pressure or chemical state.

| Property | α | β | γ |
|---|---|---|---|
| Nature | Helium nucleus | Fast electron (from nucleus) | Electromagnetic wave |
| Charge | +2e | −e | 0 |
| Mass | 4 u | ≈ 1/1840 u | 0 |
| Speed | ≈ 0.1c | up to 0.99c | c |
| Ionising power | Highest | Medium | Lowest |
| Penetrating power | Lowest (paper) | Medium (few mm Al) | Highest (cm of lead) |
| In electric field | Towards − plate | Towards + plate (more) | Undeflected |`,
      [kt('Radioactivity', 'The spontaneous disintegration of the nucleus of an unstable atom with the emission of alpha, beta or gamma radiation.'), kt('Ionising power', 'The ability of radiation to knock electrons out of atoms of a gas.')],
      [],
      table(['Radiation', 'Stopped by'], [['α', 'Paper'], ['β', 'Aluminium (few mm)'], ['γ', 'Lead (several cm)']], 'Table of absorbers for each radiation'),
      [2],
    ),
    sec(
      '3. Changes in the nucleus',
      r`- **α decay:** $A \to A - 4$, $Z \to Z - 2$: $\,{}^{226}_{88}\text{Ra} \rightarrow {}^{222}_{86}\text{Rn} + {}^{4}_{2}\text{He}$.
- **β decay:** a neutron becomes a proton + electron; $A$ unchanged, $Z \to Z + 1$: $\,{}^{14}_{6}\text{C} \rightarrow {}^{14}_{7}\text{N} + {}^{0}_{-1}e$.
- **γ emission:** no change in $A$ or $Z$ (the nucleus loses excess energy).
- In every equation, totals of $A$ and of $Z$ balance on both sides.`,
      [kt('Alpha decay', 'Emission of an alpha particle, which lowers the mass number by 4 and the atomic number by 2.'), kt('Beta decay', 'Emission of an electron from the nucleus, which raises the atomic number by 1 and leaves the mass number unchanged.')],
      [fm(r`{}^{A}_{Z}\text{X} \rightarrow {}^{A-4}_{Z-2}\text{Y} + {}^{4}_{2}\text{He}`, 'Alpha decay'), fm(r`{}^{A}_{Z}\text{X} \rightarrow {}^{A}_{Z+1}\text{Y} + {}^{0}_{-1}e`, 'Beta decay')],
      table(['Emission', 'ΔA', 'ΔZ'], [['α', '−4', '−2'], ['β', '0', '+1'], ['γ', '0', '0']], 'Table of changes in A and Z'),
      [3],
    ),
    sec(
      '4. Uses, hazards and safety',
      `**Uses:** Co-60 (radiotherapy), I-131 (thyroid), Na-24 (blood circulation studies), P-32 (tracer in agriculture), C-14 (dating), γ sources (sterilising instruments, checking welds, pipe leaks), β sources (thickness gauges).

**Harmful effects:** burns, radiation sickness, cancer (leukaemia), genetic mutations.

**Background radiation:** cosmic rays, radioactive rocks and soil, radon gas, K-40 in food and the body, medical X-rays, fallout.

**Safety:** long tongs, lead containers and aprons, distance, short exposure time, film badges (dosimeters), no eating near sources. **X-rays** are also ionising; **radioactive fallout** is radioactive dust spread by nuclear explosions or accidents.`,
      [kt('Background radiation', 'Low-level radiation always present in the environment from natural and man-made sources.'), kt('Radioisotope', 'A radioactive isotope of an element.')],
      [],
      table(['Isotope', 'Use'], [['Co-60', 'Cancer therapy'], ['I-131', 'Thyroid'], ['C-14', 'Dating']], 'Table of three radioisotopes and their uses'),
      [4],
    ),
    sec(
      '5. Fission, fusion and nuclear waste',
      r`**Fission:** a heavy nucleus splits into two lighter nuclei when struck by a slow neutron, releasing energy and 2–3 neutrons; chain reaction (controlled in reactors, uncontrolled in atom bombs). $\,{}^{235}_{92}\text{U} + {}^{1}_{0}n \rightarrow {}^{141}_{56}\text{Ba} + {}^{92}_{36}\text{Kr} + 3\,{}^{1}_{0}n + \text{energy}$.

**Fusion:** light nuclei join to form a heavier nucleus at extremely high temperatures, releasing energy (Sun, stars, hydrogen bomb). $\,{}^{2}_{1}\text{H} + {}^{3}_{1}\text{H} \rightarrow {}^{4}_{2}\text{He} + {}^{1}_{0}n + \text{energy}$.

Energy comes from a loss of mass ($E = mc^{2}$). **Nuclear waste:** cool in ponds, seal in glass/steel and concrete, store deep underground; it remains radioactive for thousands of years.`,
      [kt('Nuclear fission', 'The splitting of a heavy nucleus into two lighter nuclei with the release of energy.'), kt('Nuclear fusion', 'The joining of light nuclei to form a heavier nucleus with the release of energy.'), kt('Chain reaction', 'A self-sustaining series of fissions in which neutrons from one fission cause further fissions.')],
      [fm(r`E = mc^{2}`, 'Mass–energy equivalence')],
      table(['Fission', 'Fusion'], [['Heavy splits', 'Light join'], ['Reactors', 'Sun']], 'Table contrasting fission and fusion'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying β particles come from the electron shells.
- Getting the change in Z wrong for β decay.
- Confusing fission (splitting) with fusion (joining).
- Forgetting the neutrons when balancing fission equations.

**How marks are usually awarded**
- Decay equations (1–2 marks): correct A and Z, symbol of the radiation.
- Comparisons (1 mark per property).
- Uses and safety (1 mark each): named isotope or precaution with a reason.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Atomic number Z?', 'Number of protons.', 'definition', 1),
    fc(2, 'Mass number A?', 'Protons + neutrons.', 'definition', 1),
    fc(3, 'Neutrons in a nuclide?', 'A − Z.', 'formula', 1),
    fc(4, 'Isotopes?', 'Same Z, different A.', 'definition', 1),
    fc(5, 'Isotopes of hydrogen?', 'Protium, deuterium, tritium.', 'fact', 1),
    fc(6, 'Radioactivity?', 'Spontaneous disintegration of unstable nuclei.', 'definition', 2),
    fc(7, 'Does heating change the rate of radioactivity?', 'No.', 'fact', 2),
    fc(8, 'Alpha particle?', 'Helium nucleus, +2e, 4 u.', 'fact', 2),
    fc(9, 'Beta particle?', 'Fast electron from the nucleus.', 'fact', 2),
    fc(10, 'Gamma ray?', 'Electromagnetic wave, no charge or mass.', 'fact', 2),
    fc(11, 'Most ionising radiation?', 'Alpha.', 'fact', 2),
    fc(12, 'Most penetrating radiation?', 'Gamma.', 'fact', 2),
    fc(13, 'What stops beta?', 'A few mm of aluminium.', 'fact', 2),
    fc(14, 'Undeflected in a field?', 'Gamma.', 'fact', 2),
    fc(15, 'Alpha decay changes?', 'A − 4, Z − 2.', 'formula', 3),
    fc(16, 'Beta decay changes?', 'A same, Z + 1.', 'formula', 3),
    fc(17, 'Gamma emission changes?', 'Neither A nor Z.', 'fact', 3),
    fc(18, 'Origin of beta particle?', 'A neutron changes into a proton and an electron.', 'concept', 3),
    fc(19, 'Co-60 used for?', 'Cancer radiotherapy.', 'fact', 4),
    fc(20, 'C-14 used for?', 'Dating ancient remains.', 'fact', 4),
    fc(21, 'I-131 used for?', 'Thyroid diagnosis and treatment.', 'fact', 4),
    fc(22, 'Two sources of background radiation?', 'Cosmic rays; radon from rocks (also K-40).', 'fact', 4),
    fc(23, 'Two safety precautions?', 'Handle with tongs; store in lead containers.', 'fact', 4),
    fc(24, 'What is a film badge for?', 'Recording radiation dose received by workers.', 'fact', 4),
    fc(25, 'Nuclear fission?', 'Heavy nucleus splits into two lighter nuclei with energy.', 'definition', 5),
    fc(26, 'Nuclear fusion?', 'Light nuclei join to form a heavier one with energy.', 'definition', 5),
    fc(27, 'Chain reaction?', 'Neutrons from one fission cause more fissions.', 'definition', 5),
    fc(28, 'Why does fusion need high temperature?', 'To overcome repulsion between positive nuclei.', 'concept', 5),
    fc(29, 'Source of the Sun’s energy?', 'Nuclear fusion of hydrogen.', 'fact', 5),
    fc(30, 'Exam tip: decay equations', 'Balance both A and Z.', 'exam-tip', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
