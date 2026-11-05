// ICSE 9 Chemistry ch01 notes and flashcards.
import { T, unit, PROV, table } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Symbols, Valency, Radicals and Formulae — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Symbols of elements',
      `A **symbol** is a short sign, one capital letter or a capital followed by a small letter, that stands for an element.

| Element | Symbol | Element | Symbol |
|---|---|---|---|
| Hydrogen | H | Sodium (natrium) | Na |
| Carbon | C | Potassium (kalium) | K |
| Nitrogen | N | Iron (ferrum) | Fe |
| Oxygen | O | Copper (cuprum) | Cu |
| Sulphur | S | Silver (argentum) | Ag |
| Chlorine | Cl | Gold (aurum) | Au |
| Calcium | Ca | Lead (plumbum) | Pb |
| Zinc | Zn | Mercury (hydrargyrum) | Hg |

Some symbols come from the **Latin** names of the elements.

- **Qualitative meaning:** a symbol names the element.
- **Quantitative meaning:** a symbol stands for **one atom** of the element, and for its relative atomic mass (for example C: one atom of carbon, 12 u).

Cobalt is Co, but CO is the compound carbon monoxide: the second letter must be small.`,
      [kt('Symbol', 'A short sign, one or two letters, standing for an element and for one atom of it.')],
      table(['Element', 'Latin name', 'Symbol'], [['Sodium', 'Natrium', 'Na'], ['Iron', 'Ferrum', 'Fe'], ['Silver', 'Argentum', 'Ag'], ['Lead', 'Plumbum', 'Pb']], 'Table of four symbols taken from Latin names'),
      [1],
    ),
    sec(
      '2. Valency',
      `**Valency** is the combining power of an atom: the number of hydrogen atoms (or atoms that can replace hydrogen) that one atom combines with or displaces. Hydrogen has valency 1.

| Hydride | Valency of the other element |
|---|---|
| HCl | Chlorine 1 |
| H₂O | Oxygen 2 |
| NH₃ | Nitrogen 3 |
| CH₄ | Carbon 4 |

**Valence electrons** are the electrons in the outermost shell. They decide the valency.

- **Metals** lose their valence electrons: valency = number of valence electrons (1, 2 or 3).
- **Non-metals** gain electrons to complete the octet: valency = 8 − number of valence electrons (4 valence electrons gives valency 4).
- A full outer shell (a duplet in helium, an octet in neon and argon) means **valency 0**.

| Class | Valency | Examples |
|---|---|---|
| Monovalent | 1 | Na, K, Cl |
| Divalent | 2 | Mg, Ca, O |
| Trivalent | 3 | Al, N, P |
| Tetravalent | 4 | C, Si |

Some metals have **variable valency**: iron is 2 in iron(II) and 3 in iron(III); copper is 1 or 2. The Roman number in the name gives the valency. Class IX only needs the common values.`,
      [kt('Valency', 'The combining power of an atom, measured by the number of hydrogen atoms one atom combines with or replaces.'), kt('Valence electrons', 'The electrons in the outermost shell of an atom.')],
      V.shells,
      [2],
    ),
    sec(
      '3. Radicals',
      `A **radical** is an atom or a group of atoms that carries a charge and behaves as one unit in chemical reactions.

- **Positive (basic) radicals** are formed by metals, and also ammonium: sodium Na⁺, potassium K⁺, silver Ag⁺, **ammonium NH₄⁺**, magnesium Mg²⁺, calcium Ca²⁺, zinc Zn²⁺, copper(II) Cu²⁺, iron(II) Fe²⁺, lead(II) Pb²⁺, barium Ba²⁺, aluminium Al³⁺, iron(III) Fe³⁺.
- **Negative (acid) radicals** are formed by non-metals or groups with oxygen: chloride Cl⁻, nitrate NO₃⁻, hydroxide OH⁻, hydrogencarbonate HCO₃⁻, oxide O²⁻, sulphide S²⁻, sulphate SO₄²⁻, sulphite SO₃²⁻, carbonate CO₃²⁻, nitride N³⁻, phosphate PO₄³⁻.
- A **simple radical** is a single charged atom (Na⁺, Cl⁻, O²⁻). A **compound radical** is a group of atoms with one charge (NH₄⁺, SO₄²⁻, OH⁻).
- The valency of an acid radical is the number of hydrogen ions the acid gives: $\\ce{H2SO4 -> 2H+ + SO4^2-}$, so sulphate has valency 2.

Books differ on whether hydroxide is listed with the acid radicals; it is a negative radical, and here it is listed with them for convenience.`,
      [kt('Radical', 'An atom or group of atoms with a charge that behaves as a single unit in reactions.'), kt('Compound radical', 'A group of atoms carrying one charge, such as sulphate or ammonium.')],
      table(['Valency', 'Positive radicals', 'Negative radicals'], [['1', 'Na⁺, K⁺, Ag⁺, NH₄⁺', 'Cl⁻, NO₃⁻, OH⁻, HCO₃⁻'], ['2', 'Mg²⁺, Ca²⁺, Zn²⁺, Cu²⁺, Fe²⁺', 'O²⁻, S²⁻, SO₄²⁻, CO₃²⁻, SO₃²⁻'], ['3', 'Al³⁺, Fe³⁺', 'N³⁻, PO₄³⁻']], 'Table of common radicals grouped by valency'),
      [3],
    ),
    sec(
      '4. Radicals in the atmosphere',
      `This topic is about **free radicals** in the air, not the charged radicals of formulae.

- A **free radical** is a very reactive atom or fragment of a molecule with an **unpaired electron**. It forms when a bond breaks and each part keeps one electron, for example when sunlight breaks a chlorine molecule into two chlorine atoms.
- In polluted air, sunlight and heat act on vehicle and factory fumes and produce such radicals, which react at once with other molecules.

**Effects on living organisms**
- They irritate the eyes, nose, throat and lungs.
- They can damage cells and tissues in the body.
- They help form smog, and they harm plants and reduce crop growth.

**Ways to reduce them**
- Cut emissions from vehicles and industries; fit catalytic converters; use cleaner fuels.
- Stop burning rubbish, stubble and plastics in the open.
- Stop the use of chlorofluorocarbons; plant more trees.

Only the idea and the effects are asked at Class IX; the detailed reactions belong to higher classes.`,
      [kt('Free radical', 'A very reactive atom or fragment of a molecule that has an unpaired electron.')],
      table(['Source of radicals', 'Cause', 'Step to reduce'], [['Vehicle fumes', 'Burning petrol and diesel', 'Catalytic converters, public transport'], ['Factory smoke', 'Burning fuel', 'Filters, cleaner fuels'], ['Open burning', 'Rubbish and stubble', 'Stop open burning']], 'Table of sources of atmospheric radicals and the steps to reduce them'),
      [4],
    ),
    sec(
      '5. Writing formulae and names',
      `A compound is **neutral**, so the positive and negative charges cancel. The **criss-cross method** uses valencies to write the formula.

1. Write the positive radical first, then the negative one.
2. Write the valency of each above its symbol.
3. Cross over: the valency of one becomes the subscript of the other.
4. Divide both subscripts by their common factor; do not write a subscript of 1.
5. Put a **compound radical** in brackets if its subscript is more than 1.

| Compound | Working | Formula |
|---|---|---|
| Aluminium sulphate | Al 3, SO₄ 2 → Al₂(SO₄)₃ | **Al₂(SO₄)₃** |
| Calcium carbonate | Ca 2, CO₃ 2 → Ca₂(CO₃)₂ ÷ 2 | **CaCO₃** |
| Magnesium nitride | Mg 2, N 3 → Mg₃N₂ | **Mg₃N₂** |
| Ammonium sulphate | NH₄ 1, SO₄ 2 → (NH₄)₂SO₄ | **(NH₄)₂SO₄** |

**Naming:** the positive part first, then the negative part. One non-metal gets the ending **-ide** (chloride, oxide, sulphide, nitride). A group with oxygen keeps its name (sulphate, sulphite, nitrate, carbonate, phosphate). Variable valency goes in brackets: FeCl₂ is iron(II) chloride, FeCl₃ is iron(III) chloride. The valency of a metal can also be found back from a formula, for example in Fe₂O₃ three oxygen atoms carry 6 negative charges shared by two iron atoms.`,
      [kt('Criss-cross method', 'Writing a formula by making the valency of each radical the subscript of the other, after dividing by any common factor.')],
      V.criss,
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Writing a symbol with two capitals (CL, NA) or two small letters.
- Taking the valency of nitrogen as 5 or of oxygen as 6 instead of 3 and 2.
- Changing the subscripts inside a radical (writing SO₃ for sulphate, or CaCO₂).
- Forgetting the common factor, or leaving a bracket round a radical that occurs once.
- Mixing up sulphate and sulphite, or nitrate and nitride.
- Giving the charged radicals of formulae when the question asks about free radicals in the air.

**How marks are usually awarded**
- 1 mark: a symbol, a valency, a formula or a name.
- 2 marks: two matched points, or a formula with its working.
- 3 marks: three formulae or names, or three matched points on radicals in the air.
- 10-mark structured question: a short situation with parts of 2 to 4 marks; give working for each formula.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What is a symbol?', 'A short sign, one or two letters, that stands for an element and for one atom of it.', 'definition', 1),
    fc(2, 'Symbol of sodium and its Latin name?', 'Na, from natrium.', 'fact', 1),
    fc(3, 'Symbol of potassium and its Latin name?', 'K, from kalium.', 'fact', 1),
    fc(4, 'Symbols of iron and copper, with Latin names?', 'Fe (ferrum) and Cu (cuprum).', 'fact', 1),
    fc(5, 'Symbols of silver, gold, lead and mercury?', 'Ag (argentum), Au (aurum), Pb (plumbum), Hg (hydrargyrum).', 'fact', 1),
    fc(6, 'Qualitative and quantitative meaning of a symbol?', 'It names the element, and it stands for one atom of the element.', 'concept', 1),
    fc(7, 'Why is Co not the same as CO?', 'Co is the element cobalt; CO is the compound carbon monoxide.', 'concept', 1),
    fc(8, 'What is valency?', 'The combining power of an atom: the number of hydrogen atoms one atom combines with or replaces.', 'definition', 2),
    fc(9, 'Valency of the element in HCl, H₂O, NH₃, CH₄?', 'Chlorine 1, oxygen 2, nitrogen 3, carbon 4.', 'fact', 2),
    fc(10, 'What are valence electrons?', 'The electrons in the outermost shell.', 'definition', 2),
    fc(11, 'Valency rule for a metal?', 'Valency equals the number of valence electrons (1, 2 or 3).', 'formula', 2),
    fc(12, 'Valency rule for a non-metal?', '8 minus the number of valence electrons.', 'formula', 2),
    fc(13, 'Valency of an element with electron arrangement 2, 8, 5?', '8 − 5 = 3.', 'example', 2),
    fc(14, 'Valency of a noble gas with a full outer shell?', 'Zero.', 'fact', 2),
    fc(15, 'Name a monovalent, a divalent, a trivalent and a tetravalent element.', 'Sodium, magnesium, aluminium, carbon.', 'example', 2),
    fc(16, 'What does iron(III) mean?', 'Iron with valency 3 (Fe³⁺).', 'concept', 2),
    fc(17, 'What is a radical?', 'An atom or group of atoms with a charge that behaves as one unit in a reaction.', 'definition', 3),
    fc(18, 'Simple radical or compound radical: Cl⁻, NO₃⁻, Mg²⁺, NH₄⁺?', 'Cl⁻ and Mg²⁺ are simple; NO₃⁻ and NH₄⁺ are compound.', 'example', 3),
    fc(19, 'Name three compound negative radicals with valency 2.', 'Sulphate, carbonate, sulphite.', 'fact', 3),
    fc(20, 'The one common positive compound radical?', 'Ammonium, NH₄⁺.', 'fact', 3),
    fc(21, 'How does sulphuric acid show that sulphate has valency 2?', 'H₂SO₄ gives two hydrogen ions and one sulphate radical.', 'concept', 3),
    fc(22, 'What is a free radical in the air?', 'A very reactive atom or fragment of a molecule with an unpaired electron.', 'definition', 4),
    fc(23, 'Two harmful effects of free radicals in polluted air?', 'They irritate the lungs and damage cells; they help form smog and harm plants.', 'fact', 4),
    fc(24, 'Two ways to reduce harmful radicals in the air?', 'Cut vehicle and factory emissions; stop open burning (also plant trees, avoid CFCs).', 'fact', 4),
    fc(25, 'Criss-cross method in one line?', 'The valency of one radical becomes the subscript of the other.', 'concept', 5),
    fc(26, 'Formula of aluminium sulphate?', 'Al₂(SO₄)₃.', 'example', 5),
    fc(27, 'Formula of calcium phosphate?', 'Ca₃(PO₄)₂.', 'example', 5),
    fc(28, 'When is a radical put in brackets?', 'When it is a compound radical with a subscript above 1.', 'concept', 5),
    fc(29, 'Name FeCl₂ and FeCl₃.', 'Iron(II) chloride and iron(III) chloride.', 'example', 5),
    fc(30, 'Exam tip: checking a formula', 'Add the positive and negative charges: the total must be zero.', 'exam-tip', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
