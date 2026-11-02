// ch01 notes and flashcards.
import { T, table, unit, PROV } from './lib.mjs';
import { V } from './decks.mjs';
import { DESCRIBED, LIN } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = [], formulas = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'The Living World — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Biodiversity, the need for classification and the three domains',
      `**Biodiversity** is the variety of living organisms. Life is found in habitats as different as cold mountains, deserts, deep oceans, hot springs and rainforests. The number of species that are **known and described** is about **${DESCRIBED.low} to ${DESCRIBED.high} million**, and new species continue to be found.

With so many species, nobody can study each one separately. **Classification** is the grouping of organisms into convenient categories on the basis of observable characters. It
- makes the study of a large number of organisms manageable;
- gives each organism a standard name, so that confusion caused by local names is avoided;
- shows which organisms resemble each other and are probably close relatives;
- helps to place a newly found organism.

Three linked activities are involved. **Identification** is finding the correct name and position of an organism. **Nomenclature** is the naming of organisms. **Classification** is the placing of organisms in groups according to their similarities and differences.

**Three domains.** In 1990 Carl Woese proposed that all living organisms be placed in three domains, mainly on the basis of differences in **ribosomal RNA** and in cell chemistry:
- **Bacteria:** prokaryotes (no true nucleus, no membrane-bound organelles) whose cell walls contain **peptidoglycan**.
- **Archaea:** prokaryotes whose cell walls **lack peptidoglycan** and whose membrane lipids differ; many live in extreme habitats such as very salty water (halophiles), hot acidic springs (thermoacidophiles) and oxygen-free swamps (methanogens).
- **Eukarya:** organisms with a **true nucleus** and membrane-bound organelles, including the kingdoms Protista, Fungi, Plantae and Animalia.

(The three-domain scheme is a more recent addition to the five-kingdom scheme studied in the next chapter; older textbooks may not mention it.)`,
      [kt('Biodiversity', 'The variety of living organisms on Earth.'), kt('Classification', 'Grouping organisms into convenient categories on the basis of their similarities and differences.'), kt('Identification', 'Finding the correct name and position of an organism.'), kt('Nomenclature', 'The naming of organisms.'), kt('Domain', 'The highest-level group of life in Woese’s scheme: Bacteria, Archaea or Eukarya.'), kt('Peptidoglycan', 'The cell-wall material of bacteria, absent from archaeal walls.')],
      V.domains,
      [1],
    ),
    sec(
      '2. Taxonomy, systematics and the taxonomic hierarchy',
      `**Taxonomy** is the science of identifying, naming and classifying organisms. **Systematics** is the wider study of the diversity of organisms and the relationships among them, including their evolutionary history. The word is from the Latin *systema*, meaning a systematic arrangement of organisms; Linnaeus used it in the title of his book *Systema Naturae*.

Classification is carried out in steps called **taxonomic categories** (ranks). Every category is a unit of classification, and a group of organisms placed in a rank is called a **taxon** (plural taxa). The obligatory categories form a **hierarchy**, from the lowest to the highest:

**Species → Genus → Family → Order → Class → Phylum (Division in plants) → Kingdom**

- **Species:** a group of individuals with fundamental similarities, which can be distinguished from other species. Biologists commonly add the **biological species concept**: the members of a species interbreed to produce fertile offspring and are reproductively isolated from other species. (The textbook states the species idea through similarities; the interbreeding criterion is the commonly taught extension and does not apply to organisms that reproduce only asexually.)
- **Genus:** a group of related species that have more characters in common with each other than with species of other genera.
- **Family:** a group of related genera. **Order:** a group of related families. **Class:** a group of related orders.
- **Phylum** (animals) or **Division** (plants): a group of related classes. **Kingdom:** the highest category in the five-kingdom scheme, including all the phyla or divisions of one great group.

Going **up** the hierarchy, a category includes more organisms that share **fewer** characters; going **down**, a category includes fewer organisms that share **more** characters.

| Common name | Binomial | Family | Order | Class | Phylum or division | Kingdom |
|---|---|---|---|---|---|---|
| Human | *Homo sapiens* | ${LIN['Homo sapiens'].Family} | ${LIN['Homo sapiens'].Order} | ${LIN['Homo sapiens'].Class} | ${LIN['Homo sapiens'].Phylum} | ${LIN['Homo sapiens'].Kingdom} |
| Tiger | *Panthera tigris* | ${LIN['Panthera tigris'].Family} | ${LIN['Panthera tigris'].Order} | ${LIN['Panthera tigris'].Class} | ${LIN['Panthera tigris'].Phylum} | ${LIN['Panthera tigris'].Kingdom} |
| Housefly | *Musca domestica* | ${LIN['Musca domestica'].Family} | ${LIN['Musca domestica'].Order} | ${LIN['Musca domestica'].Class} | ${LIN['Musca domestica'].Phylum} | ${LIN['Musca domestica'].Kingdom} |
| Mango | *Mangifera indica* | ${LIN['Mangifera indica'].Family} | ${LIN['Mangifera indica'].Order} | ${LIN['Mangifera indica'].Class} | ${LIN['Mangifera indica'].Phylum} (division) | ${LIN['Mangifera indica'].Kingdom} |
| Wheat | *Triticum aestivum* | ${LIN['Triticum aestivum'].Family} | ${LIN['Triticum aestivum'].Order} | ${LIN['Triticum aestivum'].Class} | ${LIN['Triticum aestivum'].Phylum} (division) | ${LIN['Triticum aestivum'].Kingdom} |

To find the lowest category two organisms share, compare their taxa from species upward and stop at the first match. The tiger and the lion share the genus *Panthera*; the tiger and the domestic cat (*Felis catus*) share the family Felidae; the tiger and the dog (*Canis familiaris*) share the order Carnivora.`,
      [kt('Taxonomy', 'The science of identifying, naming and classifying organisms.'), kt('Systematics', 'The study of the diversity of organisms and the relationships among them.'), kt('Taxon', 'A group of organisms placed in any taxonomic category.'), kt('Taxonomic category', 'A rank in the hierarchy: species, genus, family, order, class, phylum or division, kingdom.'), kt('Species', 'A group of individuals with fundamental similarities, distinguishable from other species.'), kt('Genus', 'A group of related species with more characters in common than with species of other genera.')],
      V.hier,
      [2],
      [V.lineage],
    ),
    sec(
      '3. Binomial nomenclature',
      `Organisms often have different **local names** in different places and languages, so a standard system was needed. **Carolus Linnaeus** introduced **binomial nomenclature**, in which the scientific name of every species has **two words**: the **genus** followed by the **species epithet**. Naming of plants follows the **International Code of Botanical Nomenclature (ICBN)** and of animals the **International Code of Zoological Nomenclature (ICZN)**. (The plant code has since been renamed to cover algae and fungi as well; the rules below are the same.)

**Rules for writing a scientific name**
1. Names are in **Latin** or Latinised form.
2. When **printed**, both words are in **italics**; when **handwritten**, each word is **underlined separately**.
3. The **genus** starts with a **capital** letter; the **species epithet** is written entirely in **small** letters.
4. The abbreviated name of the **author** (the scientist who first described and named the species) is written after the species epithet in ordinary type, for example *Mangifera indica* Linn. (Linn. stands for Linnaeus).
5. Each species has one scientific name that is accepted all over the world.

*Examples:* *Mangifera indica* (mango), *Solanum tuberosum* (potato), *Panthera tigris* (tiger), *Homo sapiens* (human). The wrong forms *mangifera indica*, *Mangifera Indica* and *MANGIFERA INDICA* each break a rule.

**Why it matters.** The brinjal is also called eggplant or aubergine in other places, but its scientific name, *Solanum melongena*, is the same everywhere. The genus also shows relationships: *Solanum tuberosum* and *Solanum melongena* belong to one genus and so share many characters.`,
      [kt('Binomial nomenclature', 'The system of giving each species a two-word scientific name: genus then species epithet.'), kt('ICBN', 'The code that governs the naming of plants.'), kt('ICZN', 'The code that governs the naming of animals.'), kt('Species epithet', 'The second word of a scientific name, written in small letters.')],
      V.binom,
      [3],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Writing the species epithet with a capital letter, or the genus without one.
- Forgetting to underline each word separately in handwritten names (or to use italics in print).
- Confusing taxonomy (identify, name, classify) with systematics (adds evolutionary relationships).
- Putting the categories in the wrong order, or using phylum for plants (the plant term is division).
- Saying that a higher category has more characters in common (it has fewer).
- Stating that Archaea have peptidoglycan walls (they do not).
- Naming the wrong code: ICBN is for plants and ICZN for animals.

**How marks are usually awarded**
- 1-mark items: name the domains, a rank, a code, the first word of a name, or judge an assertion and reason.
- 2–3-mark answers: identification, nomenclature and classification; taxonomy and systematics; rules of binomial nomenclature; the species concept.
- 5-mark answers: the taxonomic hierarchy with an example; the three domains with their features; why classification and standard names are needed.
- Case-based items: surveys and counts, comparing hierarchies of organisms, writing and correcting names, with a 2-mark part with an internal choice.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What is biodiversity?', 'The variety of living organisms on Earth.', 'definition', 1),
    fc(2, 'How many species are known and described?', `About ${DESCRIBED.low} to ${DESCRIBED.high} million.`, 'fact', 1),
    fc(3, 'Why do we need classification?', 'To make the study of many organisms manageable and to give standard names and show relationships.', 'concept', 1),
    fc(4, 'What is identification?', 'Finding the correct name and position of an organism.', 'definition', 1),
    fc(5, 'What is nomenclature?', 'The naming of organisms.', 'definition', 1),
    fc(6, 'What is classification?', 'Placing organisms in groups according to their similarities and differences.', 'definition', 1),
    fc(7, 'Name the three domains of life.', 'Bacteria, Archaea and Eukarya.', 'fact', 1),
    fc(8, 'Who proposed the three domains, and when?', 'Carl Woese, in 1990.', 'fact', 1),
    fc(9, 'Cell-wall feature that separates Bacteria from Archaea?', 'Bacteria have peptidoglycan; Archaea lack it.', 'concept', 1),
    fc(10, 'Where do many archaea live?', 'In extreme habitats: very salty water, hot springs, oxygen-free swamps.', 'fact', 1),
    fc(11, 'Which domain has a true nucleus?', 'Eukarya.', 'fact', 1),
    fc(12, 'Four kingdoms of Eukarya?', 'Protista, Fungi, Plantae and Animalia.', 'fact', 1),
    fc(13, 'What is taxonomy?', 'The science of identifying, naming and classifying organisms.', 'definition', 2),
    fc(14, 'What is systematics?', 'The study of the diversity of organisms and their relationships, including evolution.', 'definition', 2),
    fc(15, 'Origin of the word systematics?', 'Latin systema, a systematic arrangement; Linnaeus wrote Systema Naturae.', 'fact', 2),
    fc(16, 'What is a taxon?', 'A group of organisms placed in any taxonomic category.', 'definition', 2),
    fc(17, 'Seven categories, lowest to highest?', 'Species, genus, family, order, class, phylum (division), kingdom.', 'fact', 2),
    fc(18, 'Plant term for phylum?', 'Division.', 'fact', 2),
    fc(19, 'What is a species?', 'A group of individuals with fundamental similarities, distinct from other species; commonly also interbreeding and reproductively isolated.', 'definition', 2),
    fc(20, 'What is a genus?', 'A group of related species with more characters in common than with other genera.', 'definition', 2),
    fc(21, 'What does a family contain?', 'Related genera.', 'fact', 2),
    fc(22, 'Going up the hierarchy, what happens to shared characters?', 'Fewer characters are shared, among more organisms.', 'concept', 2),
    fc(23, 'Family and order of the tiger?', `${LIN['Panthera tigris'].Family} and ${LIN['Panthera tigris'].Order}.`, 'fact', 2),
    fc(24, 'Lowest category shared by tiger and domestic cat?', 'Family (Felidae).', 'concept', 2),
    fc(25, 'Who introduced binomial nomenclature?', 'Carolus Linnaeus.', 'fact', 3),
    fc(26, 'What are the two words of a scientific name?', 'Genus first, then species epithet.', 'concept', 3),
    fc(27, 'Which code names plants? Which names animals?', 'ICBN for plants; ICZN for animals.', 'fact', 3),
    fc(28, 'How are scientific names written in print and by hand?', 'Italics in print; each word underlined separately when handwritten.', 'concept', 3),
    fc(29, 'Capital letters in a scientific name?', 'Only the first letter of the genus; the species epithet is all small letters.', 'concept', 3),
    fc(30, 'What does Linn. mean after a name?', 'The abbreviated author name: Linnaeus.', 'fact', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
