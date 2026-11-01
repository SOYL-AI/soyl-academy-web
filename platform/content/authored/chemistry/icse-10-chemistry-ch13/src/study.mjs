// ICSE 10 Chemistry ch13 Organic Chemistry: Introduction, Structure, Isomerism and Nomenclature — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Organic Chemistry: Introduction, Structure, Isomerism and Nomenclature — Notes',
  language: 'en',
  sections: [
    sec(
      '1. The unique nature of carbon',
      `**Organic chemistry** is the chemistry of carbon compounds (other than oxides of carbon, carbonates and a few others). Over ten million are known, because of two properties of carbon:

- **Tetravalency:** carbon (2, 4) cannot easily lose or gain four electrons, so it **shares** them and forms **four covalent bonds**. In methane the four bonds point to the corners of a tetrahedron.
- **Catenation:** carbon atoms **link to one another** to form long chains, branched chains and rings, because the C–C bond is strong and the carbon atom is small.

Two carbon atoms can share one, two or three pairs of electrons: a **single** (C–C), **double** (C=C) or **triple** (C≡C) bond. Every carbon still has **four bonds in total**.`,
      [kt('Tetravalency', 'The property of carbon of forming four covalent bonds, by sharing its four valence electrons.'), kt('Catenation', 'The property of atoms of an element of linking with one another by covalent bonds to form chains and rings.'), kt('Triple bond', 'A covalent bond in which two atoms share three pairs of electrons, as in ethyne.')],
      [],
      table(['Bond', 'Pairs shared', 'Example'], [['C–C single', '1', 'Ethane, CH₃–CH₃'], ['C=C double', '2', 'Ethene, CH₂=CH₂'], ['C≡C triple', '3', 'Ethyne, CH≡CH']], 'Table of single, double and triple carbon–carbon bonds with the number of shared pairs and an example'),
      [1],
    ),
    sec(
      '2. Straight, branched and cyclic chains; benzene',
      `- **Straight (open, unbranched) chain:** CH₃–CH₂–CH₂–CH₃ (butane).
- **Branched chain:** a side group on the main chain, CH₃–CH(CH₃)–CH₃ (2-methylpropane). A carbon joined to **three or four** other carbons marks a branch.
- **Closed chain (cyclic):** the chain closes into a ring.

**Benzene, C₆H₆:** a flat hexagonal ring of six carbon atoms with **alternate single and double bonds** (Kekulé structure); each carbon carries **one hydrogen atom**. It is the only ring compound in this chapter.`,
      [kt('Branched chain', 'A carbon chain in which at least one carbon atom is bonded to three or four other carbon atoms.'), kt('Cyclic compound', 'A compound whose carbon atoms are joined in a closed ring, such as benzene.')],
      [],
      table(['Compound', 'Type of chain'], [['Pentane, CH₃(CH₂)₃CH₃', 'Straight'], ['2-methylbutane, CH₃CH(CH₃)CH₂CH₃', 'Branched'], ['Benzene, C₆H₆', 'Cyclic (closed)']], 'Table classifying pentane, 2-methylbutane and benzene by type of chain'),
      [2],
    ),
    sec(
      '3. Hydrocarbons and structural formulae',
      `**Hydrocarbons** contain carbon and hydrogen only.

- **Saturated** (alkanes): only C–C single bonds.
- **Unsaturated**: at least one C=C (alkenes) or C≡C (alkynes).

A **molecular formula** counts the atoms; a **structural formula** shows how they are joined; a **condensed formula** writes each carbon with its hydrogens (CH₃–CH=CH–CH₃). To draw one: chain first, multiple bond next, then hydrogens until every carbon has four bonds. Each double bond removes two hydrogen atoms from the alkane formula; a triple bond removes four.`,
      [kt('Saturated hydrocarbon', 'A hydrocarbon with only single bonds between carbon atoms.'), kt('Unsaturated hydrocarbon', 'A hydrocarbon with at least one carbon–carbon double or triple bond.'), kt('Structural formula', 'A formula that shows how the atoms in a molecule are bonded to one another.')],
      [
        { latex: r`\text{alkanes: } \mathrm{C}_n\mathrm{H}_{2n+2} \qquad \text{alkenes: } \mathrm{C}_n\mathrm{H}_{2n} \qquad \text{alkynes: } \mathrm{C}_n\mathrm{H}_{2n-2}`, label: 'General formulae' },
      ],
      table(['Carbons', 'Alkane', 'Alkene', 'Alkyne'], [['3', 'C₃H₈ propane', 'C₃H₆ propene', 'C₃H₄ propyne'], ['4', 'C₄H₁₀ butane', 'C₄H₈ but-1-ene', 'C₄H₆ but-1-yne'], ['5', 'C₅H₁₂ pentane', 'C₅H₁₀ pent-1-ene', 'C₅H₈ pent-1-yne']], 'Table of molecular formulae and names of alkanes, alkenes and alkynes with three to five carbon atoms'),
      [3],
    ),
    sec(
      '4. Structural isomerism',
      `**Isomers:** compounds with the **same molecular formula** but **different structural formulae** (and so different properties).

- **Chain isomers** differ in the carbon skeleton. C₄H₁₀: butane and 2-methylpropane. C₅H₁₂: pentane, 2-methylbutane and 2,2-dimethylpropane. More branching lowers the boiling point.
- **Position isomers** have the same skeleton but the multiple bond or functional group in a different position: but-1-ene and but-2-ene; propan-1-ol and propan-2-ol; 1-chloropropane and 2-chloropropane.

Methane, ethane, propane, ethene, propene and propyne have **no** chain or position isomers. Before calling two drawings isomers, number each chain from both ends — they may be the same compound.`,
      [kt('Structural isomerism', 'The existence of two or more compounds with the same molecular formula but different structural formulae.'), kt('Chain isomers', 'Isomers that differ in the arrangement of the carbon chain (straight or branched).'), kt('Position isomers', 'Isomers with the same carbon chain that differ in the position of a multiple bond or functional group.')],
      [],
      table(['Formula', 'Isomers', 'Type'], [['C₄H₁₀', 'Butane, 2-methylpropane', 'Chain'], ['C₅H₁₂', 'Pentane, 2-methylbutane, 2,2-dimethylpropane', 'Chain'], ['C₄H₈ (straight chain)', 'But-1-ene, but-2-ene', 'Position'], ['C₄H₆ (straight chain)', 'But-1-yne, but-2-yne', 'Position']], 'Table of isomers of four formulae and the type of isomerism shown'),
      [4],
    ),
    sec(
      '5. Homologous series',
      `A **homologous series** is a group of organic compounds with the same functional group, in which successive members differ by a –CH₂– unit. Characteristics:

1. All members have the **same general formula** and the **same functional group**.
2. Successive members differ by **CH₂**, i.e. by **14 u** in molecular mass.
3. They have **similar chemical properties**.
4. Physical properties show **gradation**: melting point, boiling point and density increase with molecular mass (C₁–C₄ alkanes are gases, C₅ onwards liquids).
5. They can be prepared by **similar general methods**.`,
      [kt('Homologous series', 'A series of compounds with the same functional group and general formula, in which successive members differ by a CH₂ group.'), kt('Homologues', 'Members of the same homologous series, such as ethanol and propan-1-ol.')],
      [{ latex: r`M(\text{next member}) = M + 14\ \text{u}`, label: 'Molecular mass of successive members' }],
      table(['Alkene', 'Formula', 'Molecular mass / u'], [['Ethene', 'C₂H₄', '28'], ['Propene', 'C₃H₆', '42'], ['But-1-ene', 'C₄H₈', '56'], ['Pent-1-ene', 'C₅H₁₀', '70']], 'Table of four alkenes with formula and molecular mass, rising by fourteen each step'),
      [5],
    ),
    sec(
      '6. Nomenclature: trivial and IUPAC names',
      `**IUPAC name** = (position + prefix) + **word root** + **primary suffix** + (position + **secondary suffix**).

- **Word root** (longest chain containing the functional group): meth 1, eth 2, prop 3, but 4, pent 5.
- **Numbering:** from the end nearer the functional group, then the multiple bond, then the branch — **lowest number**.
- **Primary suffix:** -ane, -ene, -yne. **Prefixes:** methyl-, chloro-, bromo-, iodo-, methoxy-.
- **Secondary suffix:** -ol (alcohol), -al (aldehyde), -one (ketone), -oic acid (carboxylic acid). The final "e" of -ane is dropped before a vowel: ethan**ol**, propan**al**.
- **Ethers:** alkoxyalkane (smaller group as alkoxy): CH₃OC₂H₅ is methoxyethane. **Esters:** alkyl alkanoate: CH₃COOC₂H₅ is ethyl ethanoate.

Trivial names to know: methyl alcohol (methanol), ethyl alcohol (ethanol), formaldehyde (methanal), acetaldehyde (ethanal), acetone (propanone), formic acid (methanoic acid), acetic acid (ethanoic acid), ethylene (ethene), acetylene (ethyne), methyl chloride (chloromethane).`,
      [kt('Functional group', 'An atom or group of atoms that decides the characteristic chemical properties of an organic compound.'), kt('Word root', 'The part of an IUPAC name that gives the number of carbon atoms in the main chain, such as prop for three.')],
      [],
      table(['Class', 'Group', 'Example and IUPAC name'], [['Alcohol', '–OH', 'CH₃CH₂CH₂OH, propan-1-ol'], ['Aldehyde', '–CHO', 'CH₃CH₂CHO, propanal'], ['Ketone', '>C=O', 'CH₃COCH₂CH₃, butan-2-one'], ['Carboxylic acid', '–COOH', 'CH₃CH₂COOH, propanoic acid'], ['Alkyl halide', '–Br', 'CH₃CHBrCH₃, 2-bromopropane']], 'Table of five classes of compounds with functional group, an example and its IUPAC name'),
      [6],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Drawing a carbon with five bonds (for example CH₂=CH₂–CH₃); count four bonds round every carbon.
- Calling two drawings of the same molecule "isomers"; number both ways first.
- Numbering from the wrong end (3-methylbutane instead of 2-methylbutane; but-3-ene instead of but-1-ene).
- Giving a number to an aldehyde or acid group (it is always C1).

**How marks are usually awarded**
- Structural formula (1 mark): every bond and every hydrogen shown correctly.
- IUPAC name (1 mark): correct root, ending and position number, with hyphens.
- Isomers (2–3 marks): one mark per correct structure with its name.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Tetravalency?', 'Carbon forms four covalent bonds by sharing its four valence electrons.', 'definition', 1),
    fc(2, 'Catenation?', 'Self-linking of atoms of an element into chains and rings.', 'definition', 1),
    fc(3, 'Why does carbon not form C⁴⁺ or C⁴⁻ ions?', 'Losing or gaining four electrons needs too much energy; it shares them instead.', 'concept', 1),
    fc(4, 'Pairs of electrons shared in a C≡C bond?', 'Three.', 'fact', 1),
    fc(5, 'Two reasons carbon shows strong catenation?', 'Small atom; strong C–C bond.', 'concept', 1),
    fc(6, 'Three types of carbon chain?', 'Straight (open), branched, closed (cyclic).', 'fact', 2),
    fc(7, 'Molecular formula of benzene?', 'C₆H₆.', 'formula', 2),
    fc(8, 'Describe the Kekulé structure of benzene.', 'Hexagonal ring of six C with alternate single and double bonds; one H on each C.', 'diagram', 2),
    fc(9, 'How do you spot a branch in a condensed formula?', 'A carbon joined to three or four other carbons, e.g. CH(CH₃).', 'exam-tip', 2),
    fc(10, 'Saturated hydrocarbon?', 'Only single bonds between carbon atoms (an alkane).', 'definition', 3),
    fc(11, 'General formula of alkenes?', 'CₙH₂ₙ.', 'formula', 3),
    fc(12, 'General formula of alkynes?', 'CₙH₂ₙ₋₂.', 'formula', 3),
    fc(13, 'Condensed formula of propene?', 'CH₂=CH–CH₃.', 'example', 3),
    fc(14, 'Molecular formula of pent-2-yne?', 'C₅H₈.', 'example', 3),
    fc(15, 'Structural isomers?', 'Same molecular formula, different structural formulae.', 'definition', 4),
    fc(16, 'Chain isomers of C₄H₁₀?', 'Butane and 2-methylpropane.', 'example', 4),
    fc(17, 'How many chain isomers has C₅H₁₂?', 'Three: pentane, 2-methylbutane, 2,2-dimethylpropane.', 'fact', 4),
    fc(18, 'Position isomers of straight-chain C₄H₈?', 'But-1-ene and but-2-ene.', 'example', 4),
    fc(19, 'Why has propene no position isomer?', 'A double bond at either end of a three-carbon chain gives the same molecule.', 'concept', 4),
    fc(20, 'Effect of branching on boiling point?', 'More branching, lower boiling point.', 'fact', 4),
    fc(21, 'Homologous series?', 'Same functional group and general formula; successive members differ by CH₂.', 'definition', 5),
    fc(22, 'Mass difference between successive homologues?', '14 u (one CH₂).', 'fact', 5),
    fc(23, 'Which properties show gradation in a series?', 'Physical ones: melting point, boiling point, density.', 'concept', 5),
    fc(24, 'Next homologue of propyne?', 'But-1-yne, C₄H₆.', 'example', 5),
    fc(25, 'Word roots for 1 to 5 carbons?', 'meth, eth, prop, but, pent.', 'fact', 6),
    fc(26, 'Endings for alcohol, aldehyde, ketone, acid?', '-ol, -al, -one, -oic acid.', 'fact', 6),
    fc(27, 'IUPAC name of acetic acid?', 'Ethanoic acid.', 'fact', 6),
    fc(28, 'IUPAC name of formaldehyde?', 'Methanal.', 'fact', 6),
    fc(29, 'IUPAC name of CH₃–O–C₂H₅?', 'Methoxyethane.', 'example', 6),
    fc(30, 'IUPAC name of CH₃COOCH₃?', 'Methyl ethanoate.', 'example', 6),
    fc(31, 'Exam tip: numbering a chain', 'Lowest number to the functional group, then the multiple bond, then the branch.', 'exam-tip', 6),
  ],
  status: 'draft',
  provenance: PROV,
};
