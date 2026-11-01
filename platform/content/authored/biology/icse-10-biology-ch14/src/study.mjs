// ICSE 10 Biology ch14 Population — notes and flashcards.
import { T, table, unit, PROV } from '../../icse-10-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { TOWN, DIST, censusRise, censusPct, yearsBetween } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });
const lakh = (n) => n.toLocaleString('en-IN');

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Population — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Population explosion in India and the world',
      `**Population explosion** is a very rapid increase in the number of people in a short time.

**The world:** about 1 billion people around 1804, 2 billion around 1927, and 8 billion around 2022 (approximate UN milestones). The first billion took all of human history; the step from 7 to 8 billion took only about ${yearsBetween(7, 8)} years. The growth curve is **J-shaped**.

**India (Census of India):** 36.1 crore in 1951 and 121.1 crore in 2011; between 2001 and 2011 the population rose by about ${censusRise(2001, 2011)} crore (${censusPct(2001, 2011)} per cent). India has about 2.4 per cent of the world's land area but a far larger share of its people.

**Main reasons**
- **Fall in death rate:** vaccines, antibiotics, safer childbirth, more food, clean water and sanitation; fewer infant deaths and longer life expectancy.
- **High birth rate:** early marriage, illiteracy, little awareness of family planning, children seen as helpers and support in old age, desire for a son, social and religious customs.

The death rate fell quickly while the birth rate fell slowly, so the **gap** between them, the growth, became very large.`,
      [kt('Population explosion', 'A very rapid increase in population within a short time.'), kt('Life expectancy', 'The average number of years a person is expected to live.')],
      V.world,
      [1],
      [V.india, V.stages],
    ),
    sec(
      '2. Demography: density, birth rate, death rate, growth rate',
      `**Demography** is the statistical study of human populations: their size, density, distribution, births, deaths and migration.

| Term | Meaning | Unit |
|---|---|---|
| Birth rate (natality) | Live births per 1000 people in a year | per 1000 per year |
| Death rate (mortality) | Deaths per 1000 people in a year | per 1000 per year |
| Growth rate | (Birth rate − death rate) ÷ 10, migration ignored | per cent per year |
| Population density | Population ÷ area | people per square km |

**Example:** a town of ${lakh(TOWN.pop)} with ${lakh(TOWN.births)} births and ${TOWN.deaths} deaths has a birth rate of ${TOWN.br}, a death rate of ${TOWN.dr} and a growth rate of ${TOWN.gr} per cent a year. A district of ${lakh(DIST.X.pop)} people on ${lakh(DIST.X.area)} square km has a density of ${DIST.X.d} per square km.

**Migration** (people moving in or out) also changes the size of a population.`,
      [kt('Demography', 'Statistical study of human populations.'), kt('Birth rate', 'Live births per 1000 people per year.'), kt('Death rate', 'Deaths per 1000 people per year.'), kt('Population density', 'Number of people per square kilometre.')],
      table(['Rate', 'Formula'], [['Birth rate', 'Births ÷ population × 1000'], ['Death rate', 'Deaths ÷ population × 1000'], ['Growth rate', '(Birth rate − death rate) ÷ 10'], ['Density', 'Population ÷ area']], 'Table of the formulas for birth rate, death rate, growth rate and density'),
      [2],
    ),
    sec(
      '3. Problems caused by population explosion',
      `- **Unemployment:** the number of job-seekers grows faster than new jobs.
- **Over-exploitation of resources:** forests are cut, groundwater is over-pumped, soil is over-used, minerals and fuels are used up.
- **Low per capita income:** per capita income = total income ÷ population, so the same income shared by more people gives each less.
- **Price rise:** demand for food, housing and goods grows faster than supply.
- **Pollution:** more vehicles, factories, fuel, sewage and garbage pollute air, water and soil.
- **Unequal distribution of wealth:** the gap between rich and poor widens.
- Also: shortage of **housing** (slums), and crowded **schools, hospitals and transport**.`,
      [kt('Per capita income', 'Total income of a country or place divided by its population.')],
      V.problems,
      [3],
    ),
    sec(
      '4. Need for population control; vasectomy and tubectomy',
      `**Need for control:** to balance the population with land, water, food and jobs; to provide schools, health care and housing for all; to raise per capita income and the quality of life; to reduce pollution and the loss of forests. Education of girls, later marriage, awareness of the **small family norm** and family planning help to lower the birth rate.

**Surgical (permanent) methods**
- **Vasectomy (men):** a small piece of each **vas deferens** is removed and the cut ends tied. Sperms cannot pass into the semen. The testes go on making sperms and **testosterone**, so male characters are unchanged.
- **Tubectomy (women):** a small piece of each **oviduct** is removed and the cut ends tied. The egg cannot meet the sperms. The ovaries go on releasing eggs and **hormones**, and **menstruation continues**.

Both are chosen only by couples who want no more children, because the cut tubes are difficult to rejoin.`,
      [kt('Vasectomy', 'Cutting and tying of each vas deferens in men.'), kt('Tubectomy', 'Cutting and tying of each oviduct in women.')],
      V.surgery,
      [4],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Adding the death rate to the birth rate to find the growth rate.
- Leaving out units (per 1000 per year, per cent, per square km).
- Saying the testes or ovaries are removed in vasectomy or tubectomy.
- Saying menstruation stops after tubectomy, or that testosterone stops after vasectomy.
- Quoting a population figure without its source and year.

**How marks are usually awarded**
- 1 mark: a term, a rate with its unit, an odd one out **with its category**.
- 2 marks: a calculation with working, or two reasons.
- 3 marks: three problems or three measures, each with a cause or an effect.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Population explosion?', 'Very rapid rise in population in a short time.', 'definition', 1),
    fc(2, 'Main cause of the explosion?', 'Death rate fell; birth rate stayed high.', 'concept', 1),
    fc(3, 'Two reasons the death rate fell?', 'Vaccines and antibiotics; more food and clean water.', 'fact', 1),
    fc(4, 'Two reasons for a high birth rate?', 'Early marriage; illiteracy.', 'fact', 1),
    fc(5, 'Shape of the world population curve?', 'J-shaped.', 'fact', 1),
    fc(6, "India's population, Census 2011?", 'About 121 crore.', 'fact', 1),
    fc(7, 'Why does a fall in infant deaths speed up growth?', 'More survive to have children; births still high.', 'concept', 1),
    fc(8, 'Demography?', 'Statistical study of human populations.', 'definition', 2),
    fc(9, 'Birth rate?', 'Live births per 1000 people per year.', 'definition', 2),
    fc(10, 'Death rate?', 'Deaths per 1000 people per year.', 'definition', 2),
    fc(11, 'Growth rate formula?', '(Birth rate − death rate) ÷ 10 per cent.', 'exam-tip', 2),
    fc(12, 'Population density?', 'People per square kilometre.', 'definition', 2),
    fc(13, 'Birth rate 22, death rate 8: growth rate?', `${TOWN.gr} per cent a year.`, 'exam-tip', 2),
    fc(14, 'Other than births and deaths, what changes population?', 'Migration.', 'fact', 2),
    fc(15, 'Per capita income?', 'Total income ÷ population.', 'definition', 3),
    fc(16, 'Why does unemployment rise?', 'Job-seekers grow faster than jobs.', 'concept', 3),
    fc(17, 'Why do prices rise?', 'Demand grows faster than supply.', 'concept', 3),
    fc(18, 'Two resources over-used?', 'Forests; groundwater.', 'fact', 3),
    fc(19, 'How does population growth add to pollution?', 'More vehicles, fuel, sewage and garbage.', 'concept', 3),
    fc(20, 'Effect on wealth?', 'Gap between rich and poor widens.', 'fact', 3),
    fc(21, 'Housing problem in cities?', 'Shortage of houses; slums grow.', 'fact', 3),
    fc(22, 'Why control population?', 'To balance people with resources and services.', 'concept', 4),
    fc(23, 'Vasectomy?', 'Each vas deferens cut and tied.', 'definition', 4),
    fc(24, 'Tubectomy?', 'Each oviduct cut and tied.', 'definition', 4),
    fc(25, 'After vasectomy, is testosterone made?', 'Yes; testes untouched.', 'exam-tip', 4),
    fc(26, 'After tubectomy, does menstruation continue?', 'Yes; ovaries and uterus untouched.', 'exam-tip', 4),
    fc(27, 'Why are these methods called permanent?', 'Cut tubes are hard to rejoin.', 'concept', 4),
    fc(28, 'Non-surgical ways to lower the birth rate?', "Girls' education; small family norm.", 'fact', 4),
    fc(29, 'How does tubectomy prevent conception?', 'Egg cannot meet sperms.', 'concept', 4),
    fc(30, 'How does vasectomy prevent conception?', 'No sperms in the semen.', 'concept', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
