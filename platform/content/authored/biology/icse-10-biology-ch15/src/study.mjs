// ICSE 10 Biology ch15 Human Evolution — notes and flashcards.
import { T, table, unit, PROV } from '../../icse-10-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { ANCESTORS, CC } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Human Evolution — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Human ancestors and how they compare',
      `**Sequence:** Australopithecus → Homo habilis → Homo erectus → Neanderthal man → Cro-Magnon man → modern man (*Homo sapiens sapiens*).

| Member | Approx. cranial capacity (cubic cm) | Key features |
|---|---|---|
${ANCESTORS.map((a) => `| ${a.name} | about ${a.cc} | ${{ aus: 'Walked on two legs but partly stooped; large canines, heavy brow ridges, no chin, hairy, short', hab: '"Handy man": first stone tools; brow ridges, no chin', ere: '"Upright man": fully erect; used fire; heavy brow ridges, no chin, taller', nea: 'Stocky, slightly stooped; heavy brow ridges, receding chin; buried the dead', cro: 'Tall, fully erect; small brow ridges, prominent chin; cave paintings, fine tools', mod: 'Fully erect; small canines and brow ridges, prominent chin, little body hair; language, farming' }[a.key]} |`).join('\n')}

**Trends from Australopithecus to modern man**
- **Posture:** from partly stooped to **fully erect**, with efficient walking on two legs (**bipedalism**).
- **Cranial capacity:** **increases** (about ${CC.aus} → about ${CC.mod} cubic centimetres).
- **Canines:** become **smaller**. **Brow ridges:** become **smaller**. **Chin:** **appears** (Cro-Magnon and modern man).
- **Body hair:** **decreases**. **Height:** **increases**.

Humans did not evolve from today's apes; humans and apes share **common ancestors**.`,
      [kt('Cranial capacity', 'Volume of the braincase of the skull.'), kt('Bipedalism', 'Walking on two legs.'), kt('Brow ridge', 'Bony ridge above the eye sockets.')],
      V.skulls,
      [1],
      [V.cranial],
    ),
    sec(
      "2. Lamarck's theory: inheritance of acquired characters",
      `Jean-Baptiste **Lamarck** (1809) proposed:
1. **Use and disuse:** organs that are used often become larger and stronger; organs not used become smaller and may disappear.
2. **Inheritance of acquired characters:** changes gained during an organism's life are **passed on** to its young.

**Giraffe:** ancestors with short necks stretched to reach leaves; their necks lengthened a little; the longer necks were inherited, generation after generation.

**Vestigial organs in humans** (reduced, no clear use): vermiform appendix, coccyx (tail bones), ear muscles, nictitating membrane (fold in the eye corner), wisdom teeth. Lamarck explained them by **disuse**.

**Criticism:** **Weismann** cut off the tails of mice for many generations; the young were always born with normal tails. Acquired characters are **not inherited**, because they do not change the genes in the sex cells (other examples: muscles of a body-builder, pierced ears).`,
      [kt('Acquired character', 'A change gained during an organism\'s life, not present at birth.'), kt('Vestigial organ', 'A reduced organ with no clear function, useful in ancestors.')],
      V.giraffe,
      [2],
    ),
    sec(
      "3. Darwin's theory of natural selection; the peppered moth",
      `Charles **Darwin** (*On the Origin of Species*, 1859):
1. **Overproduction:** organisms produce far more young than can survive.
2. **Struggle for existence:** food and space are limited, so there is competition — within a species (intraspecific), between species (interspecific) and with the environment.
3. **Variation:** no two individuals are alike; many differences are inherited.
4. **Survival of the fittest (natural selection):** individuals with useful variations survive and reproduce more.
5. **Inheritance:** useful variations are passed on; over many generations they build up and **new species** arise.

**Giraffe (Darwin):** necks varied at birth; long-necked giraffes reached more food, survived and bred.

**Peppered moth** (*Biston betularia*), England: a **light** and a **dark** form.
- Before industry, tree bark was pale with **lichens**: light moths were camouflaged, dark ones eaten by **birds**; the light form was common.
- In the industrial 1800s, **soot** killed lichens and blackened bark: dark moths were camouflaged and light ones eaten; the dark form became common (**industrial melanism**).
- After **clean-air laws** in the 1900s, bark grew paler and the light form increased again.
The moths did not change colour; birds **selected** among forms that already existed.`,
      [kt('Natural selection', 'Survival and reproduction of individuals with useful variations.'), kt('Industrial melanism', 'Increase of dark forms in areas darkened by industrial soot.'), kt('Struggle for existence', 'Competition for limited resources among the many young produced.')],
      V.darwin,
      [3],
      [V.moths],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying humans evolved from monkeys or modern apes.
- Giving exact cranial capacities as fixed values (write "about").
- Saying the peppered moths turned dark because of soot (soot changed the bark, not the moths).
- Mixing Lamarck's "acquired characters" with Darwin's "inborn variations".
- Taking "fittest" to mean strongest.

**How marks are usually awarded**
- 1 mark: a term, an ancestor, an odd one out **with its category**.
- 2 marks: two differences, or one theory's explanation of an example.
- 3 marks: the points of Darwin's theory, the moth story with camouflage and inheritance, or three trends.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Sequence of human ancestors?', 'Australopithecus, habilis, erectus, Neanderthal, Cro-Magnon, modern man.', 'exam-tip', 1),
    fc(2, 'Which ancestor made the first stone tools?', 'Homo habilis (handy man).', 'fact', 1),
    fc(3, 'First to use fire and walk fully erect?', 'Homo erectus.', 'fact', 1),
    fc(4, 'Which ancestor buried its dead?', 'Neanderthal man.', 'fact', 1),
    fc(5, 'Known for cave paintings?', 'Cro-Magnon man.', 'fact', 1),
    fc(6, 'Cranial capacity of Australopithecus?', `About ${CC.aus} cubic cm.`, 'fact', 1),
    fc(7, 'Cranial capacity of modern man?', `About ${CC.mod} cubic cm.`, 'fact', 1),
    fc(8, 'Largest cranial capacity in the human line?', `Cro-Magnon man (about ${CC.cro}).`, 'fact', 1),
    fc(9, 'Trend in brow ridges?', 'Become smaller.', 'concept', 1),
    fc(10, 'When does the chin appear?', 'In Cro-Magnon and modern man.', 'fact', 1),
    fc(11, 'Trend in canines and body hair?', 'Both decrease.', 'concept', 1),
    fc(12, 'Did humans evolve from modern apes?', 'No; they share common ancestors.', 'exam-tip', 1),
    fc(13, "Lamarck's two ideas?", 'Use and disuse; inheritance of acquired characters.', 'fact', 2),
    fc(14, 'Lamarck on the giraffe?', 'Stretching lengthened the neck; passed on.', 'concept', 2),
    fc(15, 'Vestigial organ?', 'Reduced organ with no clear use.', 'definition', 2),
    fc(16, 'Two human vestigial organs?', 'Vermiform appendix; coccyx.', 'fact', 2),
    fc(17, "Weismann's experiment?", 'Cut mouse tails for generations; young had normal tails.', 'fact', 2),
    fc(18, 'Why are acquired characters not inherited?', 'They do not change the genes in sex cells.', 'concept', 2),
    fc(19, 'Overproduction?', 'More young produced than can survive.', 'definition', 3),
    fc(20, 'Struggle for existence?', 'Competition for limited resources.', 'definition', 3),
    fc(21, 'Intraspecific struggle?', 'Competition within one species.', 'definition', 3),
    fc(22, 'Survival of the fittest?', 'Best-suited individuals survive and breed.', 'concept', 3),
    fc(23, 'Darwin on the giraffe?', 'Long-necked giraffes survived and bred.', 'concept', 3),
    fc(24, 'What is natural selection?', 'Nature favours useful inherited variations.', 'definition', 3),
    fc(25, 'Peppered moth: two forms?', 'Light and dark.', 'fact', 3),
    fc(26, 'Why was the light form common at first?', 'Hidden on pale lichen-covered bark.', 'concept', 3),
    fc(27, 'What did soot do?', 'Killed lichens and blackened bark.', 'concept', 3),
    fc(28, 'Industrial melanism?', 'Rise of dark forms in sooty areas.', 'definition', 3),
    fc(29, 'Who selected the moths?', 'Birds (predators).', 'exam-tip', 3),
    fc(30, 'Lamarck vs Darwin in one line?', 'Acquired characters vs inborn variations selected.', 'exam-tip', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
