// ISC 11 Biology ch01 notes (one section per syllabus topic) and 30 flashcards.
import { T, table, unit, PROV } from './lib.mjs';
import { V } from './decks.mjs';
import { ORG, CHARS, MAT, sim, matches, ploidy, CHROM, YEARS } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });
const mark = (v) => String(v);

export const notes = {
  unit: unit(),
  version: 1,
  title: 'The Living World — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Need for classification; taxonomy and systematics',
      `Millions of kinds of organisms live on Earth and new ones are still being described. **Classification** is needed because it:
- makes the study of such a large variety **manageable**, by placing organisms in groups;
- gives each organism a **universal name**, ending the confusion caused by local names;
- allows a **newly found organism** to be placed quickly among those already known;
- shows **relationships** among organisms, so that what is known about a group helps to predict its members;
- makes information easy to **store and retrieve**.

**Taxonomy** is the science of **identification, nomenclature and classification**. **Systematics** includes taxonomy and also studies the **evolutionary relationships** among organisms. The word comes from the Latin *systema*, used by Carolus Linnaeus in the title of his book *Systema Naturae* (${YEARS.systemaNaturae}).

**Modern branches of taxonomy** supplement the study of form and structure:
- **Numerical taxonomy:** a large number of characters (hundreds) are coded, every character is given **equal weight**, and a computer calculates overall similarity. Example: on the ten characters of the table, mango and neem match in 9, a similarity of ${sim('mango', 'neem')}.
- **Cytotaxonomy:** uses **cytological** information: the **number, size, shape and behaviour of chromosomes**. Bread wheat has ${CHROM.wheat} chromosomes in a body cell on a basic number of 7, so it is ${ploidy(CHROM.wheat, 7)}-ploid (hexaploid).
- **Chemotaxonomy:** uses the **chemical constituents** of organisms, such as alkaloids, flavonoids, terpenes and the amino-acid sequence of proteins.`,
      [
        kt('Taxonomy', 'The science of identification, nomenclature and classification of organisms.'),
        kt('Systematics', 'Taxonomy together with the study of evolutionary relationships among organisms.'),
        kt('Numerical taxonomy', 'Taxonomy based on many characters of equal weight, evaluated by computer.'),
        kt('Cytotaxonomy', 'Taxonomy using chromosome number, structure and behaviour.'),
        kt('Chemotaxonomy', 'Taxonomy using the chemical constituents of organisms.'),
      ],
      table(['Branch', 'Data used'], [['Numerical taxonomy', 'Many characters, equal weight, computer-processed'], ['Cytotaxonomy', 'Number, shape and behaviour of chromosomes'], ['Chemotaxonomy', 'Alkaloids, flavonoids, proteins and other chemicals']], 'Table of three branches of taxonomy'),
      [1],
      [table(['Character', 'Mango', 'Neem', 'Wheat', 'Maize'], CHARS.map((c, i) => [c, ...['mango', 'neem', 'wheat', 'maize'].map((k) => mark(MAT[k][i]))]), 'Table of ten characters scored 1 or 0 for four plants'), V.dendro],
    ),
    sec(
      '2. Species concept and the taxonomic hierarchy',
      `**Species.** The **biological species concept** (Ernst Mayr) defines a species as a group of **interbreeding natural populations that are reproductively isolated** from other such groups. Members mate and produce fertile offspring. The concept cannot be applied to organisms that reproduce only asexually or to fossils.

**Taxonomic categories** (the hierarchy) in descending order: **Kingdom, Phylum (Division in plants), Class, Order, Family, Genus, Species**. Each category is a **rank**; an actual group at a rank (for example the family Poaceae) is a **taxon**. Going **down** the hierarchy the number of organisms in a group **decreases** and the characters they share **increase**; going **up** the number of organisms increases and shared characters decrease.

| Category | Man | Housefly | Mango | Wheat |
|---|---|---|---|---|
${['Kingdom', 'Phylum / Division', 'Class', 'Order', 'Family', 'Genus', 'Species'].map((r, i) => `| ${r} | ${['man', 'housefly', 'mango', 'wheat'].map((k) => ORG[k].taxa[i]).join(' | ')} |`).join('\n')}

The scientific names are *Homo sapiens*, *Musca domestica*, *Mangifera indica* and *Triticum aestivum*.`,
      [
        kt('Species', 'A group of interbreeding natural populations that are reproductively isolated from other groups.'),
        kt('Taxon', 'An actual group of organisms at any rank, such as Mammalia or Poaceae.'),
        kt('Taxonomic category', 'A rank in the hierarchy, such as genus or family.'),
        kt('Genus', 'A group of related species with more characters in common than with species of other genera.'),
      ],
      V.hier,
      [2],
      [table(['Category', 'Man', 'Housefly', 'Mango', 'Wheat'], ['Kingdom', 'Phylum / Division', 'Class', 'Order', 'Family', 'Genus', 'Species'].map((r, i) => [r, ...['man', 'housefly', 'mango', 'wheat'].map((k) => ORG[k].taxa[i])]), 'Table of the classification of man, housefly, mango and wheat')],
    ),
    sec(
      '3. Binomial nomenclature',
      `**Binomial nomenclature** gives every species a **two-word** scientific name. It was introduced by **Carolus Linnaeus** (*Species Plantarum*, ${YEARS.speciesPlantarum}). Names are governed by international codes: the **International Code of Nomenclature for algae, fungi and plants** (ICN, formerly the Botanical Code) and the **International Code of Zoological Nomenclature** (ICZN).

**Rules**
1. The name is in **Latin or latinised** form, often drawn from Latin or Greek words.
2. The **first word is the genus** and begins with a **capital letter**; the **second is the species epithet** and begins with a **small letter** (*Homo sapiens*, *Triticum aestivum*).
3. In **print** both words are in **italics**; in **handwriting** each word is **underlined separately**.
4. The **author's name** (abbreviated, in roman type) follows the epithet: *Mangifera indica* Linn.
5. The oldest valid name has priority and no two species may share a name.

**Advantages over common names:** a scientific name is the **same in every country**, **unique** to one species, shows the **genus** (hence close relatives), and follows **fixed rules**, so scientists can communicate without ambiguity.`,
      [
        kt('Binomial nomenclature', 'A two-word scientific name, genus followed by species epithet, introduced by Linnaeus.'),
        kt('Species epithet', 'The second word of a scientific name, written with a small initial letter.'),
        kt('Author citation', 'The abbreviated name of the scientist who first described the species, written in roman type.'),
      ],
      V.name,
      [3],
      [table(['Written', 'Correct printed form'], [['Homo Sapiens', 'Homo sapiens'], ['zea MAYS', 'Zea mays'], ['azadirachta Indica', 'Azadirachta indica']], 'Table of three wrongly written names and their corrections')],
    ),
    sec(
      '4. Artificial, natural and phylogenetic systems of classification',
      `Biologists have grouped organisms on three different bases.
- **Artificial system:** uses **one or a few characters**, usually easily seen ones such as habit (herb, shrub, tree) or the number and arrangement of stamens (the sexual system of **Linnaeus**). It is simple, but it **separates closely related organisms and brings unrelated ones together**.
- **Natural system:** uses **all the natural affinities** among organisms, with **external and internal characters** from morphology, anatomy, embryology and chemistry. Example: the system of **Bentham and Hooker** (*Genera Plantarum*). It does not show descent.
- **Phylogenetic system:** groups organisms by their **evolutionary relationships and common ancestry**, using evidence from fossils, comparative anatomy, embryology and molecular data. Examples: **Engler and Prantl**, **Hutchinson**. Modern classification is mostly phylogenetic.

Using only the character 'compound leaves' separates neem from mango, though they match in ${matches('mango', 'neem')} of ${CHARS.length} characters: this shows the weakness of an artificial key.`,
      [
        kt('Artificial system', 'Classification based on one or a few easily observed characters.'),
        kt('Natural system', 'Classification based on overall natural affinities in many external and internal characters.'),
        kt('Phylogenetic system', 'Classification based on evolutionary relationships and common ancestry.'),
      ],
      table(['System', 'Basis', 'Example'], [['Artificial', 'One or few characters', 'Linnaeus (stamens)'], ['Natural', 'Overall natural affinities', 'Bentham and Hooker'], ['Phylogenetic', 'Common ancestry', 'Engler and Prantl; Hutchinson']], 'Table comparing three systems of classification'),
      [4],
      [V.phylo],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Writing *Homo Sapiens* (the species epithet must begin with a small letter) or underlining the whole name as one line.
- Calling the second category 'phylum' for plants (it is **division**; animals use phylum).
- Confusing a **taxon** (an actual group) with a **category** (a rank).
- Saying that numerical taxonomy weighs important characters more; every character has **equal weight**.
- Mixing up **natural** (overall resemblance) and **phylogenetic** (descent) systems.

**How marks are usually awarded**
- 1-mark subparts: a term, an author, a rule, an example, a count of categories, a give-a-reason.
- 2–3-mark questions: classification of man, housefly, mango or wheat; rules with examples; three branches of taxonomy; three systems compared.
- 5-mark questions in parts: hierarchy with a classification and a trend; taxonomy with its branches and need; binomial nomenclature with corrections; the three systems with examples.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Give two reasons for classifying organisms.', 'Makes the huge variety manageable; gives universal names; places new organisms; shows relationships.', 'concept', 1),
    fc(2, 'Taxonomy covers which three tasks?', 'Identification, nomenclature and classification.', 'definition', 1),
    fc(3, 'What does systematics add to taxonomy?', 'The study of evolutionary relationships.', 'definition', 1),
    fc(4, 'Origin of the word systematics?', 'Latin systema, used by Linnaeus in Systema Naturae.', 'fact', 1),
    fc(5, 'Numerical taxonomy uses?', 'Many characters, each of equal weight, evaluated by computer.', 'definition', 1),
    fc(6, 'Cytotaxonomy uses?', 'Number, structure and behaviour of chromosomes.', 'definition', 1),
    fc(7, 'Chemotaxonomy uses?', 'Chemical constituents such as alkaloids, flavonoids and proteins.', 'definition', 1),
    fc(8, 'Bread wheat chromosome number and ploidy?', `${CHROM.wheat} in a body cell; hexaploid on a basic number of 7.`, 'fact', 1),
    fc(9, 'Biological species concept?', 'Interbreeding natural populations reproductively isolated from others (Ernst Mayr).', 'definition', 2),
    fc(10, 'Limitation of the species concept?', 'Cannot be applied to asexual organisms or fossils.', 'concept', 2),
    fc(11, 'Categories from kingdom to species?', 'Kingdom, phylum or division, class, order, family, genus, species.', 'formula', 2),
    fc(12, 'Taxon vs taxonomic category?', 'Taxon is an actual group; category is the rank.', 'concept', 2),
    fc(13, 'Going down the hierarchy, what happens?', 'Fewer organisms; more shared characters.', 'concept', 2),
    fc(14, 'Classification of man to genus?', 'Animalia, Chordata, Mammalia, Primata, Hominidae, Homo.', 'fact', 2),
    fc(15, 'Classification of housefly to genus?', 'Animalia, Arthropoda, Insecta, Diptera, Muscidae, Musca.', 'fact', 2),
    fc(16, 'Classification of mango to genus?', 'Plantae, Angiospermae, Dicotyledonae, Sapindales, Anacardiaceae, Mangifera.', 'fact', 2),
    fc(17, 'Classification of wheat to genus?', 'Plantae, Angiospermae, Monocotyledonae, Poales, Poaceae, Triticum.', 'fact', 2),
    fc(18, 'What is the second category in plants called?', 'Division (phylum in animals).', 'fact', 2),
    fc(19, 'Who introduced binomial nomenclature?', 'Carolus Linnaeus.', 'fact', 3),
    fc(20, 'First word of a binomial?', 'The genus, with a capital first letter.', 'definition', 3),
    fc(21, 'Second word of a binomial?', 'The species epithet, with a small first letter.', 'definition', 3),
    fc(22, 'How is a scientific name marked in print and by hand?', 'Italics in print; each word underlined separately by hand.', 'exam-tip', 3),
    fc(23, 'What does Linn. after Mangifera indica show?', 'The author who first described the species, abbreviated.', 'fact', 3),
    fc(24, 'Name the two codes of nomenclature.', 'ICN (algae, fungi, plants) and ICZN (animals).', 'fact', 3),
    fc(25, 'Two advantages of scientific names?', 'Universal and unique to one species (also show relatives; rule-governed).', 'concept', 3),
    fc(26, 'Basis of an artificial system?', 'One or a few characters, such as habit or stamens.', 'definition', 4),
    fc(27, 'Who gave the sexual system of classification?', 'Linnaeus, using the number and arrangement of stamens.', 'fact', 4),
    fc(28, 'Basis of a natural system, and a botanist who used it?', 'All natural affinities; Bentham and Hooker.', 'definition', 4),
    fc(29, 'Basis of a phylogenetic system?', 'Evolutionary descent from common ancestors.', 'definition', 4),
    fc(30, 'Two botanists who proposed phylogenetic systems?', 'Engler and Prantl; Hutchinson.', 'fact', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
