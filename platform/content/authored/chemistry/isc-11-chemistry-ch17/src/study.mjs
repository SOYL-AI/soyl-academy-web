// ch17 Introduction, Classification and IUPAC Nomenclature of Organic Compounds — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const fm = (latex, label) => ({ latex, label });
const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Introduction, Classification and IUPAC Nomenclature of Organic Compounds — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Vital force theory and the importance of organic chemistry',
      r`Berzelius and his contemporaries held that organic compounds could be made only in living organisms through a **vital force**. In **1828** Wöhler heated the inorganic salt **ammonium cyanate** and obtained **urea**: $\ce{NH4CNO -> NH2CONH2}$ (the two are isomers, both $\ce{CH4N2O}$). Kolbe's synthesis of ethanoic acid (1845) and later syntheses ended the theory. Organic chemistry is now the chemistry of carbon compounds (other than carbonates, carbon oxides and similar simple compounds, which are treated as inorganic). It is central to medicines, fuels, polymers, food, agriculture, dyes and the molecules of life.`,
      [kt('Vital force theory', 'Early belief that organic compounds can be formed only by living organisms, through a mysterious vital force.'), kt('Wöhler synthesis', 'Preparation of urea from ammonium cyanate, 1828, which disproved the vital force theory.')],
      [fm(r`\ce{NH4CNO -> NH2CONH2}`, 'Wöhler’s synthesis of urea')],
      table(['Field', 'Examples'], [['Health', 'Paracetamol, penicillin, vitamins'], ['Fuels', 'Petrol, LPG, biogas'], ['Materials', 'Polythene, nylon, rubber'], ['Agriculture', 'Urea, insecticides'], ['Daily life', 'Soaps, detergents, dyes']], 'Table of fields where organic chemistry is important'),
      [1],
    ),
    sec(
      '2. Why carbon forms so many compounds',
      `**Tetravalency:** carbon forms four covalent bonds. **Catenation:** carbon atoms link into long chains, branched chains and rings, because the C–C bond is strong. **Multiple bonding:** double and triple bonds (C=C, C≡C, C=O, C≡N). **Isomerism:** the same molecular formula can have many arrangements of atoms; the number of alkane isomers climbs from 2 (C₄H₁₀) and 3 (C₅H₁₂) to 75 for C₁₀H₂₂. Carbon also forms strong bonds to H, O, N, S and halogens.`,
      [kt('Catenation', 'The property of atoms of an element to link with each other to form chains and rings; very marked in carbon.'), kt('Tetravalency', 'Carbon has four valence electrons and forms four covalent bonds.')],
      [],
      V.versatile,
      [1],
    ),
    sec(
      '3. Classification of organic compounds',
      `**Open chain (acyclic, aliphatic):** straight or branched chains, saturated or unsaturated. **Closed chain (cyclic):** contain a ring. **Homocyclic (carbocyclic):** ring of carbon atoms only; **alicyclic** (cyclohexane) or **aromatic** (benzene and its derivatives). **Heterocyclic:** ring contains N, O or S (pyridine is aromatic; tetrahydrofuran is alicyclic).`,
      [kt('Alicyclic compound', 'Cyclic compound that resembles aliphatic compounds in properties, such as cyclohexane.'), kt('Heterocyclic compound', 'Cyclic compound with at least one atom other than carbon in the ring.')],
      [],
      V.tree,
      [2],
      [V.rings],
    ),
    sec(
      '4. Homologous series and functional groups',
      r`A **homologous series** has the same functional group and general formula, members differ by $\ce{CH2}$ (14 u), and physical properties vary gradually while chemical properties are similar. General formulas: alkane $\ce{C_nH_{2n+2}}$, alkene $\ce{C_nH_{2n}}$, alkyne $\ce{C_nH_{2n-2}}$, alcohol $\ce{C_nH_{2n+1}OH}$. A **functional group** is the atom or group that determines the characteristic reactions: –OH, –O–, –CHO, >C=O, –COOH, –COOR, –COCl, –CONH₂, –NH₂, –CN, –NO₂, –X, C=C, C≡C.`,
      [kt('Homologous series', 'A series of compounds with the same functional group and general formula in which each member differs from the next by a CH₂ unit.'), kt('Functional group', 'An atom or group of atoms that determines the chemical properties of a compound.')],
      [fm(r`\text{alkanes: } \ce{C_nH_{2n+2}};\quad \text{alkenes: } \ce{C_nH_{2n}};\quad \text{alkynes: } \ce{C_nH_{2n-2}}`, 'General formulas of hydrocarbon series')],
      table(['Group', 'Class', 'Example'], [['–OH', 'Alcohol / phenol', 'CH₃CH₂OH'], ['–CHO', 'Aldehyde', 'CH₃CHO'], ['>C=O', 'Ketone', 'CH₃COCH₃'], ['–COOH', 'Carboxylic acid', 'CH₃COOH'], ['–COOR', 'Ester', 'CH₃COOC₂H₅'], ['–CONH₂', 'Amide', 'CH₃CONH₂'], ['–NH₂', 'Amine', 'CH₃NH₂'], ['–X', 'Haloalkane', 'CH₃CH₂Br']], 'Table of common functional groups, classes and examples'),
      [2],
      [V.fgs],
    ),
    sec(
      '5. IUPAC naming of alkanes, alkenes and alkynes',
      `**Name = prefixes + word root + primary suffix + secondary suffix.** Roots: meth, eth, prop, but, pent, hex, hept, oct, non, dec. **Alkanes:** (1) longest continuous chain; (2) lowest locants at the first point of difference; (3) di, tri, tetra for repeated groups; (4) prefixes in alphabetical order (di, tri ignored; iso is counted, tert is not); (5) commas between numbers, hyphens between numbers and words. **Alkenes and alkynes:** the chain must contain the multiple bond; it gets the lowest locant; ene and yne; with both, en-yne and lowest set of locants, then the double bond lower.`,
      [kt('Locant', 'A number that shows the position of a substituent or a multiple bond on the parent chain.'), kt('Parent chain', 'The chain (or ring) whose name forms the base of the IUPAC name.')],
      [],
      V.anatomy,
      [3],
      [V.ex1],
    ),
    sec(
      '6. Functional groups in IUPAC names',
      `The group of **highest priority** is the suffix and gets the lowest locant: –COOH (oic acid) > –SO₃H (sulphonic acid) > –COOR (alkyl oate) > –COCl (oyl chloride) > –CONH₂ (amide) > –CN (nitrile) > –CHO (al) > >C=O (one) > –OH (ol) > –NH₂ (amine) > C=C (ene) > C≡C (yne). Other groups are prefixes (carboxy, hydroxy, oxo, amino, cyano). **Halo, nitro, alkoxy and alkyl groups are always prefixes.** In –COOH, –CHO, –CONH₂ and –CN the group carbon is C-1.`,
      [kt('Principal functional group', 'The group of highest priority in a molecule; it appears as the suffix of the name.'), kt('Prefix-only substituent', 'A group such as halo, nitro, alkoxy or alkyl that is never expressed as a suffix.')],
      [],
      V.named8,
      [3],
      [V.ex2],
    ),
    sec(
      '7. Alicyclic and aromatic compounds',
      `**Alicyclic:** cyclo + alkane name; the principal group or a double bond takes locant 1 (or the lowest); substituents then get lowest locants; ties go alphabetical (1-ethyl-2-methylcyclopentane); one substituent needs no locant. **Aromatic:** monosubstituted benzenes are named substituent + benzene; retained names: toluene, phenol, aniline, benzaldehyde, benzoic acid, nitrobenzene. Two groups: ortho (1,2), meta (1,3), para (1,4); the special parent (phenol, benzoic acid, aniline) takes locant 1, otherwise alphabetical order decides.`,
      [kt('Ortho, meta, para', 'Positions 1,2, 1,3 and 1,4 of two substituents on a benzene ring.')],
      [],
      V.alicyc,
      [3],
      [V.benz, V.disub],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Giving only catenation as the reason carbon forms many compounds.
- Choosing the chain that looks longest in a drawing, not the longest continuous chain (rotate the structure).
- Numbering from the wrong end: compare locant sets at the first point of difference.
- Ordering prefixes by locant, or counting di and tri as part of the alphabetical order.
- Forgetting that halogen and nitro groups are never the suffix.

**How marks are usually awarded**
- Names (1 mark each): parent chain, locants and prefixes correct and in order.
- Reasons (2 or 3 marks): one mark per distinct reason, with an example.
- Classification: state the class and the reason, naming the feature (ring atoms, benzene ring).`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What was the vital force theory?', 'Organic compounds can be made only by living organisms, through a vital force.', 'definition', 1),
    fc(2, 'Which experiment overthrew the vital force theory?', 'Wöhler, 1828: ammonium cyanate heated to give urea.', 'fact', 1),
    fc(3, 'Wöhler’s reaction?', 'NH₄CNO → NH₂CONH₂ (isomerisation).', 'formula', 1),
    fc(4, 'Why are ammonium cyanate and urea called isomers?', 'Same molecular formula (CH₄N₂O), different structures.', 'concept', 1),
    fc(5, 'Define catenation.', 'Self-linking of atoms into chains and rings; marked in carbon.', 'definition', 1),
    fc(6, 'Four reasons for the large number of carbon compounds?', 'Tetravalency, catenation, multiple bonding, isomerism.', 'concept', 1),
    fc(7, 'How many chain isomers has pentane (C₅H₁₂)?', 'Three: pentane, 2-methylbutane, 2,2-dimethylpropane.', 'fact', 1),
    fc(8, 'Open chain vs closed chain compounds?', 'No ring (aliphatic) vs ring present (cyclic).', 'concept', 2),
    fc(9, 'Homocyclic vs heterocyclic?', 'Ring of carbon only vs ring with N, O or S.', 'concept', 2),
    fc(10, 'Alicyclic vs aromatic?', 'Alicyclic: ring that behaves like aliphatic (cyclohexane). Aromatic: benzene-type ring.', 'concept', 2),
    fc(11, 'Is pyridine homocyclic?', 'No, heterocyclic (N in the ring); it is also aromatic.', 'example', 2),
    fc(12, 'Define homologous series.', 'Same functional group and general formula; members differ by CH₂.', 'definition', 2),
    fc(13, 'Mass difference between successive homologues?', '14 u (one CH₂).', 'fact', 2),
    fc(14, 'General formulas of alkane, alkene, alkyne?', 'CₙH₂ₙ₊₂, CₙH₂ₙ, CₙH₂ₙ₋₂.', 'formula', 2),
    fc(15, 'Define functional group.', 'Atom or group that decides the characteristic chemical properties.', 'definition', 2),
    fc(16, 'Group in aldehydes vs ketones?', '–CHO at the end of a chain; >C=O inside the chain.', 'concept', 2),
    fc(17, 'Functional group of an ester?', '–COOR.', 'fact', 2),
    fc(18, 'What does IUPAC stand for?', 'International Union of Pure and Applied Chemistry.', 'fact', 3),
    fc(19, 'Word roots for 1 to 5 carbons?', 'meth, eth, prop, but, pent.', 'fact', 3),
    fc(20, 'Word roots for 6 to 10 carbons?', 'hex, hept, oct, non, dec.', 'fact', 3),
    fc(21, 'Parts of an IUPAC name?', 'Prefix, word root, primary suffix, secondary suffix.', 'concept', 3),
    fc(22, 'Rule for the parent chain of an alkane?', 'The longest continuous chain.', 'concept', 3),
    fc(23, 'Rule for numbering?', 'Lowest locants at the first point of difference.', 'concept', 3),
    fc(24, 'How are prefixes ordered?', 'Alphabetically; di, tri, tetra are ignored.', 'concept', 3),
    fc(25, 'Rule for the chain in an alkene?', 'It must contain the double bond, which gets the lowest locant.', 'concept', 3),
    fc(26, 'Priority: acid, ester, amide, nitrile, aldehyde, ketone, alcohol, amine?', 'Carboxylic acid > ester > amide > nitrile > aldehyde > ketone > alcohol > amine.', 'fact', 3),
    fc(27, 'Which groups are always prefixes?', 'Halo, nitro, alkoxy and alkyl groups.', 'fact', 3),
    fc(28, 'IUPAC name of isopropyl group?', '1-methylethyl.', 'fact', 3),
    fc(29, 'How is a ring compound named?', 'cyclo + alkane name; principal group or double bond at C-1.', 'concept', 3),
    fc(30, 'Ortho, meta, para?', 'Positions 1,2; 1,3; 1,4 on a benzene ring.', 'definition', 3),
    fc(31, 'Exam tip: checking a name', 'Redraw the structure from your name and compare it with the original.', 'exam-tip', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
