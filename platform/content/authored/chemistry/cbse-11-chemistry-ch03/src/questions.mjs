// ch03 Classification of Elements and Periodicity in Properties — question bank.
// MCQ keys are placed by the builder (balanced); AR keys planned: a b c d a c. Numericals are computed in JS and re-solved.
import { mk, add, r } from './lib.mjs';
import { nomen, fromName, locate, zFrom, shorthand, near } from './data.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const NA = 6.022e23;
const nm = (z) => nomen(z);

// ================================================================ t01 development, periodic law, Z > 100
add('inversion-mcq', mcq({
  stem: 'Mendeleev placed iodine (relative atomic mass 126.9) after tellurium (127.6) in his table. The modern periodic law supports this placement because:',
  right: 'the atomic number of iodine (53) is one more than that of tellurium (52)',
  wrong: ['iodine has a smaller number of isotopes than tellurium', 'iodine and tellurium have the same number of valence electrons', 'tellurium forms no compounds with hydrogen'],
  sol: 'The modern law orders elements by atomic number, not mass. Iodine has the larger atomic number, so it comes second even though it is lighter — option (@K). Valence electrons differ (7 and 6), so (@2) is false.',
  d: 2, c: 'application', t: [1],
}));
add('mendeleev-gap-mcq', mcq({
  stem: 'Mendeleev left a gap under silicon in his table and predicted an element of atomic mass near 72 with an oxide of formula $\\ce{XO2}$. The element later discovered to fill this gap was:',
  right: 'germanium',
  wrong: ['gallium', 'scandium', 'arsenic'],
  sol: 'The gap under silicon was called eka-silicon; germanium (mass 72.6, oxide GeO₂) matched it — option (@K). Gallium (@1) filled the gap under aluminium and scandium (@2) the one under boron.',
  d: 2, c: 'understanding', t: [1],
}));
add('symbol-mcq', mcq({
  stem: `Before a permanent name was approved, the element with atomic number 112 had the systematic name ${nm(112).name}. Its three-letter symbol was:`,
  right: nm(112).sym,
  wrong: ['Ubu', 'Unb', 'Uun'],
  sol: `Use the first letter of each root: un (1), un (1), bi (2) give ${nm(112).sym}, with a capital first letter only — option (@K). Uun is the symbol that was used for element 110 (@3).`,
  d: 2, c: 'application', t: [1],
}));
add('period-length-mcq', mcq({
  stem: 'The first period in which a subshell with l = 3 begins to fill, and the number of elements in that period, are:',
  right: 'sixth period, 32 elements',
  wrong: ['fourth period, 18 elements', 'fifth period, 18 elements', 'seventh period, 32 elements'],
  sol: 'An f subshell (l = 3) first fills as 4f, which comes in the sixth period after 6s. That period fills 6s, 4f, 5d and 6p: 2 + 14 + 10 + 6 = 32 elements — option (@K). The seventh period (@3) is the second with f elements.',
  d: 3, c: 'application', t: [1],
}));
add('nomen-mcq', mcq({
  stem: `A laboratory reports a new element of atomic number 127. Its systematic name and symbol are:`,
  right: `${nm(127).name}, ${nm(127).sym}`,
  wrong: [`${nm(129).name}, ${nm(129).sym}`, `${nm(172).name}, ${nm(172).sym}`, `${nm(126).name}, ${nm(126).sym}`],
  sol: `The digits 1, 2, 7 give the roots un, bi and sept, so the name is ${nm(127).name} and the symbol ${nm(127).sym} — option (@K). The others use the wrong digit (@1, @3) or the digits in the wrong order (@2).`,
  d: 2, c: 'application', t: [1],
}));
add('roots-match', match({
  stem: 'Match each digit used in a systematic element name with its IUPAC numerical root.',
  pairs: [['4', 'quad'], ['7', 'sept'], ['9', 'enn'], ['0', 'nil']],
  order: [2, 0, 3, 1],
  sol: 'The roots are 0 nil, 1 un, 2 bi, 3 tri, 4 quad, 5 pent, 6 hex, 7 sept, 8 oct and 9 enn.',
  d: 1, c: 'recall', t: [1],
}));
add('newlands-tf', tf({
  stem: 'Newlands’ law of octaves could be applied equally well to all the elements known in his time, including those heavier than calcium.',
  key: 'f',
  sol: 'False. The pattern held only up to calcium; beyond it, elements placed in the same column no longer resembled each other.',
  d: 1, c: 'recall', t: [1],
}));
add('moseley-ar', ar({
  a: 'Atomic number, rather than atomic mass, is the better basis for classifying elements.',
  r: 'Isotopes of an element differ in mass but have the same atomic number and the same chemical properties.',
  key: 'a',
  sol: 'Both statements are true. Since isotopes of one element have different masses yet identical chemistry, mass cannot decide an element’s place, while the atomic number can; R explains A — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('root-fill', fill({
  stem: 'In the IUPAC systematic name of an element, the digit 4 is written with the numerical root ___.',
  acc: [['quad']],
  sol: 'The root for 4 is **quad**, as in unquadnilium (Z = 140).',
  d: 1, c: 'recall', t: [1],
}));
// Dobereiner triad computation
{
  const mP = 31.0;
  const mSb = 121.8;
  const mean = (mP + mSb) / 2;
  add('triad-num', num({
    stem: `Phosphorus (${mP}), arsenic and antimony (${mSb}) are placed together as a Döbereiner triad. Using the triad rule, what atomic mass would be predicted for arsenic?`,
    value: Number(mean.toFixed(1)), tol: 0.05, unit: null,
    sol: r`The middle mass is the mean of the other two: $\dfrac{${mP} + ${mSb}}{2} = ${mean.toFixed(1)}$. (The measured mass of arsenic is 74.9, so the rule is only approximate.)`,
    scheme: [['Mean of the outer two masses, 76.4', 1]],
    d: 2, c: 'application', t: [1],
  }), () => near((31.0 + 121.8) / 2, 76.4) || 'triad');
}
{
  const z = fromName('unbiennium');
  add('nomen-num', num({
    stem: 'An element is reported with the systematic name unbiennium. What is its atomic number?',
    value: z, tol: 0, unit: null,
    sol: r`un = 1, bi = 2, enn = 9, so the digits are 1, 2, 9 and $Z = ${z}$.`,
    scheme: [['Digits 1, 2, 9 give 129', 1]],
    d: 2, c: 'application', t: [1],
  }), () => (z === 129 && nm(129).name === 'unbiennium') || 'unbiennium');
}
add('law-short', short({
  marks: 2,
  stem: 'State the modern periodic law. How does it overcome the difficulty Mendeleev met with the order of cobalt and nickel?',
  model: 'The modern periodic law states that the properties of elements are a periodic function of their atomic numbers. Cobalt is heavier than nickel (58.9 against 58.7), so a mass-based table would put nickel first, against their chemistry. By atomic number, cobalt (27) comes before nickel (28), so the anomaly disappears.',
  sol: 'Law in terms of atomic number; apply it to Co and Ni.',
  scheme: [['Law stated with atomic number', 1], ['Co (27) before Ni (28), so no anomaly', 1]],
  d: 2, c: 'application', t: [1],
}));
add('nomen-short', short({
  marks: 2,
  stem: `Write the systematic IUPAC names and three-letter symbols of the elements with atomic numbers 115 and 130.`,
  model: `For Z = 115 the digits are 1, 1, 5, giving the roots un, un, pent: ${nm(115).name}, symbol ${nm(115).sym}. For Z = 130 the digits 1, 3, 0 give un, tri, nil: ${nm(130).name}, symbol ${nm(130).sym}. Each name ends in -ium and each symbol takes the first letter of each root.`,
  sol: 'Convert digit by digit and add -ium.',
  scheme: [[`Z = 115: ${nm(115).name}, ${nm(115).sym}`, 1], [`Z = 130: ${nm(130).name}, ${nm(130).sym}`, 1]],
  d: 2, c: 'application', t: [1],
}));
add('triad-short', short({
  marks: 2,
  stem: 'What is meant by a Döbereiner triad? Show that lithium (6.9), sodium (23.0) and potassium (39.1) form one.',
  model: 'A triad is a set of three elements of similar properties in which the atomic mass of the middle element is about the mean of the other two. For lithium and potassium the mean is (6.9 + 39.1)/2 = 23.0, which equals the atomic mass of sodium, so the three form a triad.',
  sol: 'Definition and a calculation of the mean of the outer two.',
  scheme: [['Definition of a triad', 1], ['Mean 23.0 equals the mass of sodium', 1]],
  d: 2, c: 'application', t: [1],
}));
add('mendeleev-short3', short({
  marks: 3,
  stem: 'State two achievements and two limitations of Mendeleev’s periodic table.',
  model: 'Mendeleev left gaps for undiscovered elements and predicted the properties of eka-aluminium and eka-silicon, which matched gallium and germanium when they were found; he also corrected some atomic masses by placing elements according to properties. Hydrogen had no proper position, since it resembles both alkali metals and halogens, and isotopes could not be accommodated. A few elements were in the wrong order of mass.',
  sol: 'Predictions and gaps as achievements; hydrogen, isotopes and mass inversions as limitations.',
  scheme: [['Two achievements', 1.5], ['Two limitations', 1.5]],
  d: 2, c: 'understanding', t: [1],
}));
add('law-long', long({
  stem: '(a) State Mendeleev’s periodic law and the modern periodic law.\n\n(b) Explain why Mendeleev left gaps and how his predictions for eka-silicon were confirmed.\n\n(c) Write the systematic name and symbol for the element with atomic number 121, and explain how the roots were chosen.',
  model: `Mendeleev’s law says that properties of elements are a periodic function of their atomic masses; the modern law replaces mass by atomic number. Mendeleev arranged elements so that those with similar properties fell in one group; where no known element fitted, he left a gap, for example under silicon, predicting an element of mass about 72 and a dioxide. Germanium, found later, had mass 72.6 and formed GeO₂, matching the prediction and winning acceptance for the table. For Z = 121 the digits 1, 2, 1 are written with the roots un, bi and un, and the ending -ium is added: ${nm(121).name}, symbol ${nm(121).sym}.`,
  sol: 'Both laws; gaps and a confirmed prediction; digit-by-digit roots.',
  scheme: [['(a) Both laws correctly', 1.5], ['(b) Gaps and the eka-silicon confirmation', 2], ['(c) Name, symbol and root rule', 1.5]],
  d: 3, c: 'understanding', t: [1],
}));

// ================================================================ t02 configurations, blocks, types
{
  const sb = locate(51);
  if (!(sb.block === 'p' && sb.period === 5 && sb.group === 15)) throw new Error('Z=51');
  add('block-mcq', mcq({
    stem: 'An element has the valence-shell configuration 4d¹⁰ 5s² 5p³ (all inner shells complete). It is placed in the:',
    right: 'p-block, period 5, group 15',
    wrong: ['d-block, period 4, group 15', 'd-block, period 5, group 12', 'p-block, period 4, group 13'],
    sol: 'The last electron enters 5p, so it is a p-block element. The outer shell is the fifth, so period 5, and the group is 12 + 3 = 15 — option (@K). The filled 4d subshell does not make it a d-block element (@2).',
    d: 2, c: 'application', t: [2],
  }));
}
add('metalloid-mcq', mcq({
  stem: 'Which of the following sets contains only metalloids?',
  right: 'Si, Ge, Sb',
  wrong: ['B, C, Si', 'Ge, Sn, Pb', 'As, P, Bi'],
  sol: 'Silicon, germanium and antimony all lie on the staircase line — option (@K). Carbon (@1) is a non-metal, tin and lead (@2) are metals, and phosphorus (@3) is a non-metal.',
  d: 1, c: 'recall', t: [2],
}));
{
  const L = locate(25);
  if (L.group !== 7 || L.block !== 'd' || L.period !== 4) throw new Error('Mn');
  add('config-group-mcq', mcq({
    stem: 'An element has the valence configuration 3d⁵ 4s². Its group number in the long-form periodic table is:',
    right: '7',
    wrong: ['5', '2', '12'],
    sol: 'For d-block elements the group number is the sum of the (n − 1)d and ns electrons: 5 + 2 = 7 — option (@K).',
    d: 2, c: 'application', t: [2],
  }));
}
add('fblock-mcq', mcq({
  stem: 'The last electron of an element enters a 4f orbital. The element belongs to:',
  right: 'the lanthanoids, in the sixth period',
  wrong: ['the actinoids, in the seventh period', 'the transition elements of the fourth period', 'the p-block, in group 14'],
  sol: 'The 4f subshell fills in the sixth period, so the element is a lanthanoid, an inner transition element — option (@K). Actinoids (@1) fill 5f.',
  d: 2, c: 'understanding', t: [2],
}));
add('helium-mcq', mcq({
  stem: 'Helium (1s²) is an s-block element but is placed in group 18 with the noble gases, because:',
  right: 'its outermost shell is complete, so it is chemically inert like the noble gases',
  wrong: ['it has two electrons, as the group 2 metals do', 'it has two electrons in the p subshell', 'it is a metal that is unreactive'],
  sol: 'A full outer shell gives stability and inertness, which is the property that defines group 18 — option (@K). Group 2 metals (@1) are reactive.',
  d: 2, c: 'understanding', t: [2],
}));
add('helium-ar', ar({
  a: 'Helium is classified as an s-block element.',
  r: 'Helium is placed with the noble gases in group 18.',
  key: 'b',
  sol: 'Both are true. Helium is s-block because its last electron enters 1s; its position in group 18 is a different fact based on its complete shell, so R does not explain A — option (b).',
  d: 2, c: 'understanding', t: [2],
}));
add('pblock-fill', fill({
  stem: 'The group number of a p-block element with the valence configuration ns² np⁵ is ___.',
  acc: [['17', 'seventeen']],
  sol: 'For p-block elements, group = 12 + number of p electrons = 12 + 5 = **17** (halogens).',
  d: 1, c: 'recall', t: [2],
}));
{
  const z = zFrom(5, 14);
  const L = locate(z);
  if (!(L.period === 5 && L.group === 14 && L.block === 'p')) throw new Error('zFrom');
  add('zfrom-num', num({
    stem: 'What is the atomic number of the element in period 5 and group 14 of the long-form periodic table?',
    value: z, tol: 0, unit: null,
    sol: r`The noble gas before period 5 is krypton ($Z = 36$). Group 14 is the fourteenth column, so $Z = 36 + 14 = ${z}$ (tin).`,
    scheme: [['36 + 14 = 50', 1]],
    d: 2, c: 'application', t: [2],
  }), () => (zFrom(5, 14) === 50 && locate(50).group === 14) || 'zfrom');
}
{
  const L = locate(26);
  add('block-short2', short({
    marks: 2,
    stem: 'Write the electronic configuration of the element with atomic number 26 and state its block, period and group.',
    model: `Z = 26 has the configuration ${shorthand(26)}. The last electron enters 3d, so it is a d-block element; the outermost shell is the fourth, so period ${L.period}; the group is 6 + 2 = ${L.group}.`,
    sol: 'Write the configuration, then apply the rules for d-block.',
    scheme: [['Configuration', 1], ['d-block, period 4, group 8', 1]],
    d: 2, c: 'application', t: [2],
  }));
}
add('block-long', long({
  stem: '(a) Explain how the block, period and group of an element are found from its electronic configuration.\n\n(b) Locate the elements with Z = 33 and Z = 48 in the periodic table.\n\n(c) Why is the sixth period longer than the fourth period?',
  model: `The block is given by the subshell receiving the last electron (s, p, d or f). The period is the principal quantum number of the outermost shell. The group is the number of valence electrons for s-block, 12 plus the p electrons for p-block, and the sum of (n − 1)d and ns electrons for d-block. Z = 33 is ${shorthand(33)}, a p-block element in period 4 and group 15. Z = 48 is ${shorthand(48)}, a d-block element in period 5 and group 12. The sixth period fills 6s, 4f, 5d and 6p, which hold 2 + 14 + 10 + 6 = 32 electrons, while the fourth fills only 4s, 3d and 4p, holding 18.`,
  sol: 'Rules for block, period and group; two locations; subshell capacities of periods 4 and 6.',
  scheme: [['(a) Block, period and group rules', 2], ['(b) Both elements located', 1.5], ['(c) 32 against 18 from subshell capacities', 1.5]],
  d: 3, c: 'application', t: [2],
}));
add('config-case', mk.case({
  passage: r`Three elements are described by their valence-shell configurations (inner shells complete).

| Element | Valence configuration |
|---|---|
| X | 3s² 3p⁴ |
| Y | 3d⁷ 4s² |
| Z | 4f⁷ 5d¹ 6s² |

(Elements X, Y and Z are labels only, not symbols.)`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'To which block does Y belong?',
      right: 'd-block',
      wrong: ['s-block', 'p-block', 'f-block'],
      sol: 'The last electron of Y enters 3d, so Y is a d-block element — option (@K). Its 4s electrons are in the outer shell, but the d subshell is the one filling.',
      d: 2, c: 'application', t: [2],
    })),
    part('b', short({
      marks: 1,
      stem: 'Give the period and group of X.',
      model: 'Period 3 (outermost shell n = 3) and group 16 (12 + 4).',
      sol: 'Outer shell 3; four p electrons give 12 + 4.',
      scheme: [['Period 3, group 16', 1]],
      d: 2, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'State the group of Y and explain why Z is called an inner transition element.',
      model: 'Y has 7 + 2 = 9 electrons beyond its core in 3d and 4s, so it is in group 9. Z has its 4f subshell, two shells inside the outermost, partly filled (4f⁷), so it is an f-block or inner transition element, a lanthanoid.',
      sol: 'd + s electrons for the group; 4f filling for Z.',
      scheme: [['Y: group 9', 1], ['Z: f subshell filling, inner transition', 1]],
      d: 3, c: 'analysis', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'Explain why X is a representative element but Y is not.',
        model: 'In X, the outer 3p subshell is filling, so it belongs to the p-block and is a representative element. In Y, the inner 3d subshell is being filled, so it is a d-block or transition element, with properties such as variable oxidation states.',
        sol: 'Representative: outer shell filling; transition: inner d subshell filling.',
        scheme: [['X: p subshell filling, representative', 1], ['Y: inner d subshell filling, transition', 1]],
        d: 3, c: 'analysis', t: [2],
      }),
    ]),
  ],
}));
add('nomen-case', mk.case({
  passage: `In 2010 a team reported making a new element with atomic number 117. Until the name was approved, it was written with the systematic IUPAC name ${nm(117).name} and the symbol ${nm(117).sym}. The roots used were un (1) and sept (7).`,
  d: 2, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which digit sequence produces the name in the passage?',
      right: '1, 1, 7',
      wrong: ['1, 7, 1', '7, 1, 1', '1, 1, 1'],
      sol: 'The name ununseptium is un, un, sept, which is the digits 1, 1, 7 in that order — option (@K).',
      d: 1, c: 'application', t: [1],
    })),
    part('b', num({
      stem: `What is the atomic number of the element whose systematic name is ${nm(118).name}? (This is the last element of the seventh period.)`,
      value: 118, tol: 0, unit: null,
      sol: r`un = 1, un = 1, oct = 8, so $Z = ${fromName(nm(118).name)}$.`,
      scheme: [['Z = 118', 1]],
      d: 2, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'Element 118 completes the seventh period. State the block of this element and the number of elements in that period.',
      model: 'Element 118 is a noble gas with a complete outer shell, 7s² 7p⁶, so it is placed in the p-block, group 18. The seventh period fills 7s, 5f, 6d and 7p, which holds 2 + 14 + 10 + 6 = 32 elements.',
      sol: 'Last electron in 7p; period length from subshell capacities.',
      scheme: [['p-block, group 18', 1], ['32 elements from the subshells', 1]],
      d: 3, c: 'application', t: [1, 2],
    }), [
      short({
        marks: 2,
        stem: 'Explain why temporary systematic names are used, and why the element 117 name ends in -ium.',
        model: 'A newly made element may exist for only a fraction of a second and needs confirmation, so it cannot yet receive a permanent name. IUPAC supplies a temporary name from the atomic number, so every laboratory can use the same one. The ending -ium is added to the roots by rule, as for most elements.',
        sol: 'Permanent names wait for confirmation; the name is built mechanically.',
        scheme: [['Needs confirmation; common neutral name', 1], ['-ium ending is a rule', 1]],
        d: 3, c: 'evaluation', t: [1],
      }),
    ]),
  ],
}), () => (fromName(nm(118).name) === 118 && fromName(nm(117).name) === 117) || 'nomen');
{
  const dm = ((72.6 - 72) / 72.6) * 100;
  add('mend-case', mk.case({
    passage: r`Mendeleev described an undiscovered element, which he called eka-silicon, from the gap below silicon in his table. The table compares his predictions with the properties of germanium, found in 1886.

| Property | Predicted for eka-silicon | Observed for germanium |
|---|---|---|
| Atomic mass | 72 | 72.6 |
| Density / g cm⁻³ | 5.5 | 5.3 |
| Formula of oxide | $\ce{XO2}$ | $\ce{GeO2}$ |
| Formula of chloride | $\ce{XCl4}$ | $\ce{GeCl4}$ |`,
    d: 3, c: 'analysis',
    children: [
      part('a', mcq({
        stem: 'Which statement about the data is correct?',
        right: 'The close match of predicted and observed values supported the periodic law.',
        wrong: ['The values differ so much that the prediction failed.', 'Only the atomic mass was predicted correctly.', 'The oxide and chloride formulae show that germanium is not in group 14.'],
        sol: 'Every property is close to the prediction and the formulae agree exactly, which strongly supported the idea of periodicity — option (@K). Formulae XO₂ and XCl₄ are those of a group 14 element (@3).',
        d: 2, c: 'analysis', t: [1],
      })),
      part('b', num({
        stem: 'Calculate the percentage by which the observed atomic mass of germanium exceeds the predicted value (take 72.6 and 72; give the answer to two decimal places).',
        value: Number(dm.toFixed(2)), tol: 0.01, unit: '%',
        sol: r`Excess as a percentage of the predicted value: $\dfrac{72.6 - 72}{72} \times 100 = ${dm.toFixed(2)}$, so about ${dm.toFixed(2)} per cent.`,
        scheme: [['(72.6 − 72)/72 × 100 = 0.83', 1]],
        d: 3, c: 'application', t: [1],
      })),
      part('c', short({
        marks: 2,
        stem: 'Why did the discovery of germanium persuade chemists to accept Mendeleev’s table?',
        model: 'Mendeleev had predicted the mass, density and compounds of eka-silicon before it was known. When germanium was found, its properties agreed closely with his predictions. This showed that the table captured a real pattern in the elements, not just a convenient list.',
        sol: 'A successful prediction is strong evidence for the law.',
        scheme: [['Predicted before discovery; properties matched', 1], ['Showed the table reflects a real periodic pattern', 1]],
        d: 3, c: 'evaluation', t: [1],
      }), [
        short({
          marks: 2,
          stem: 'The modern table places germanium in group 14, period 4. Explain this position using its configuration, [Ar] 3d¹⁰ 4s² 4p².',
          model: 'The last electron enters the 4p subshell, so germanium is a p-block element. The outermost shell is the fourth, giving period 4, and 12 + 2 = 14 gives its group. Four valence electrons explain the formulae GeO₂ and GeCl₄.',
          sol: 'Last electron in 4p; outer shell 4; 12 + 2.',
          scheme: [['p-block, period 4 from the outer shell', 1], ['Group 14 from 12 + 2; four valence electrons', 1]],
          d: 3, c: 'application', t: [1, 2],
        }),
      ]),
    ],
  }), () => near(((72.6 - 72) / 72) * 100, 0.83, 0.02) || 'pct');
}

// ================================================================ t03 periodic trends
add('iso-radius-mcq', mcq({
  stem: 'The species Br⁻, Se²⁻, Rb⁺ and Sr²⁺ all have 36 electrons. Which has the smallest radius?',
  right: 'Sr²⁺',
  wrong: ['Br⁻', 'Se²⁻', 'Rb⁺'],
  sol: 'For isoelectronic species the one with the greatest nuclear charge pulls the electrons in most. Sr²⁺ (Z = 38) is highest, so it is the smallest — option (@K). Se²⁻ (Z = 34) is the largest.',
  d: 2, c: 'application', t: [3],
}));
add('ie-anomaly-mcq', mcq({
  stem: 'The first ionisation enthalpy of phosphorus (1012 kJ mol⁻¹) is greater than that of sulfur (999 kJ mol⁻¹), although sulfur has the higher nuclear charge. The best explanation is:',
  right: 'phosphorus has a half-filled 3p subshell, while one 3p electron of sulfur is paired and easier to remove',
  wrong: ['phosphorus atoms are smaller than sulfur atoms', 'sulfur has no electron in its 3s orbital', 'phosphorus has fewer inner shells than sulfur'],
  sol: 'The half-filled p³ arrangement of phosphorus is stable, and the paired electron in sulfur is repelled by its partner, so it leaves more easily — option (@K). In fact sulfur is the smaller atom (@1).',
  d: 4, c: 'analysis', t: [3],
}));
add('diag-mcq', mcq({
  stem: 'Which of these properties is shared by beryllium and aluminium, an example of a diagonal relationship?',
  right: 'Their oxides are amphoteric.',
  wrong: ['They have the same number of valence electrons.', 'Both form ionic fluorides only.', 'Both burn in nitrogen to form peroxides.'],
  sol: 'BeO and Al₂O₃ both react with acids and bases — option (@K). Beryllium has two valence electrons and aluminium three (@1).',
  d: 2, c: 'understanding', t: [3],
}));
add('radius-trend-mcq', mcq({
  stem: 'Which statement about atomic radii is correct?',
  right: 'The van der Waals radius of an atom is greater than its covalent radius.',
  wrong: ['The covalent radius of chlorine is greater than that of sulfur.', 'Atomic radius increases from lithium to fluorine across the second period.', 'A neutral atom is smaller than its cation.'],
  sol: 'Non-bonded atoms touch at a larger distance than bonded atoms, so the van der Waals radius is greater — option (@K). Across the period radii fall (@2), and a cation is smaller than its atom (@3).',
  d: 2, c: 'understanding', t: [3],
}));
add('cation-mcq', mcq({
  stem: 'Which of Cr²⁺, Cr³⁺ and Cr⁶⁺ has the largest radius, and why?',
  right: 'Cr²⁺, because it has the most electrons held by the same nucleus',
  wrong: ['Cr⁶⁺, because it has lost the most electrons', 'Cr³⁺, because it lies in the middle', 'All three are equal, as the nucleus is the same'],
  sol: 'The nuclear charge is fixed, so the ion with the most electrons is the least tightly held and so the largest: Cr²⁺ > Cr³⁺ > Cr⁶⁺ — option (@K).',
  d: 2, c: 'application', t: [3],
}));
{
  const d = { N: 1402, O: 1314, F: 1681 };
  add('ie-trend-mcq', mcq({
    stem: 'The first ionisation enthalpies of N, O and F, in kJ mol⁻¹, are 1402, 1314 and 1681 in some order. Which assignment is correct?',
    right: `N ${d.N}, O ${d.O}, F ${d.F}`,
    wrong: [`N ${d.O}, O ${d.N}, F ${d.F}`, `N ${d.F}, O ${d.N}, F ${d.O}`, `N ${d.N}, O ${d.F}, F ${d.O}`],
    sol: 'Fluorine has the highest value (smallest atom, highest nuclear charge). Nitrogen exceeds oxygen because of its half-filled 2p³ subshell, so the order is O < N < F — option (@K).',
    d: 3, c: 'analysis', t: [3],
  }));
}
add('successive-mcq', mcq({
  stem: 'An element has successive ionisation enthalpies (kJ mol⁻¹) of 899, 1757, 14849 and 21007. It is most likely in group:',
  right: '2',
  wrong: ['1', '3', '4'],
  sol: 'The huge rise from the second to the third value (about 8.5 times) shows that the third electron comes from an inner shell, so two valence electrons are present: group 2 — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('egain-mcq', mcq({
  stem: 'Which of O, S, F and Cl has the most negative electron gain enthalpy?',
  right: 'Cl',
  wrong: ['F', 'S', 'O'],
  sol: 'Cl (−349 kJ mol⁻¹) is more negative than F (−328), whose small 2p subshell is crowded — option (@K). S and O release less energy because they need two electrons to complete the octet.',
  d: 2, c: 'application', t: [3],
}));
{
  const EN = { H: 2.1, C: 2.5, N: 3.0, O: 3.5, F: 4.0 };
  const diffs = Object.fromEntries(['C', 'N', 'O', 'F'].map((x) => [x, Math.abs(EN[x] - EN.H)]));
  const best = Object.entries(diffs).sort((a, b) => b[1] - a[1])[0][0];
  if (best !== 'F') throw new Error('polar');
  add('enegativity-mcq', mcq({
    stem: 'Pauling electronegativities are H 2.1, C 2.5, N 3.0, O 3.5 and F 4.0. Which bond is the most polar?',
    right: 'H–F',
    wrong: ['H–C', 'H–N', 'H–O'],
    sol: `The polarity increases with the electronegativity difference: H–C ${diffs.C.toFixed(1)}, H–N ${diffs.N.toFixed(1)}, H–O ${diffs.O.toFixed(1)}, H–F ${diffs.F.toFixed(1)}. The largest is H–F — option (@K).`,
    d: 2, c: 'application', t: [3],
  }));
}
add('oxide-mcq', mcq({
  stem: 'The oxide of a third-period element dissolves in both dilute hydrochloric acid and aqueous sodium hydroxide. The element is:',
  right: 'aluminium',
  wrong: ['sodium', 'silicon', 'sulfur'],
  sol: 'An oxide that reacts with both acids and bases is amphoteric. In the third period only Al₂O₃ is amphoteric — option (@K). Na₂O is basic (@1); SiO₂ and SO₃ are acidic.',
  d: 2, c: 'application', t: [3],
}));
add('hydride-mcq', mcq({
  stem: 'An element lies in period 3 and group 15. The formula of its hydride is:',
  right: 'PH₃',
  wrong: ['SiH₄', 'H₂S', 'NH₃'],
  sol: `Z = ${zFrom(3, 15)} (phosphorus) needs three hydrogens to complete its octet: PH₃ — option (@K). NH₃ (@3) is the hydride of the period 2 member of the group.`,
  d: 2, c: 'application', t: [3],
}));
add('second-period-mcq', mcq({
  stem: 'Nitrogen forms NCl₃ but not NCl₅, whereas phosphorus forms both PCl₃ and PCl₅. The reason is that nitrogen:',
  right: 'has no d orbitals in its second shell, so it cannot exceed a covalence of four',
  wrong: ['is more electronegative than phosphorus and forms ionic bonds', 'has a half-filled 2p subshell that cannot be disturbed', 'is a gas while phosphorus is a solid'],
  sol: 'Phosphorus can use vacant 3d orbitals to expand its valence shell, but the second shell has only 2s and 2p, so nitrogen’s maximum covalence is four — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('radius-ar', ar({
  a: 'An anion is larger than the atom from which it is formed.',
  r: 'The nuclear charge of an anion is lower than that of its parent atom.',
  key: 'c',
  sol: 'A is true. R is false: the nuclear charge does not change when an electron is added. The anion is larger because the same positive charge now attracts more electrons, and the electrons repel one another more — option (c).',
  d: 2, c: 'understanding', t: [3],
}));
add('egain-ar', ar({
  a: 'Chlorine has a more negative electron gain enthalpy than fluorine.',
  r: 'Chlorine is more electronegative than fluorine.',
  key: 'c',
  sol: 'A is true because the 2p subshell of the small fluorine atom is crowded. R is false, since fluorine (4.0) is more electronegative than chlorine (3.0) — option (c).',
  d: 3, c: 'analysis', t: [3],
}));
add('be-b-ar', ar({
  a: 'Boron has a higher first ionisation enthalpy than beryllium.',
  r: 'The 2p electron of boron is less penetrating than the 2s electron of beryllium.',
  key: 'd',
  sol: 'A is false: beryllium (899 kJ mol⁻¹) exceeds boron (801). R is true, and it is the reason for beryllium’s higher value — option (d).',
  d: 3, c: 'analysis', t: [3],
}));
add('ie-group-ar', ar({
  a: 'The first ionisation enthalpy decreases from lithium to caesium.',
  r: 'Down the group the valence electron is farther from the nucleus and more shielded by inner electrons.',
  key: 'a',
  sol: 'Both are true. The larger distance and increased shielding outweigh the greater nuclear charge, so the electron is removed more easily; R explains A — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('cation-tf', tf({
  stem: 'A cation is always larger than the atom from which it is formed.',
  key: 'f',
  sol: 'False. A cation is smaller: electrons are removed (often a whole outer shell), while the nuclear charge is unchanged and holds the rest more tightly.',
  d: 1, c: 'understanding', t: [3],
}));
add('second-egain-tf', tf({
  stem: 'The second electron gain enthalpy of oxygen (O⁻ gaining an electron to form O²⁻) is negative.',
  key: 'f',
  sol: 'False. The incoming electron is repelled by the negative ion, so energy must be supplied: the second electron gain enthalpy of oxygen is positive.',
  d: 2, c: 'understanding', t: [3],
}));
add('iso-fill', fill({
  stem: 'Species that have the same number of electrons, such as Na⁺ and F⁻, are called ___.',
  acc: [['isoelectronic']],
  sol: 'Species with equal numbers of electrons are **isoelectronic**.',
  d: 1, c: 'recall', t: [3],
}));
add('oxide-match', match({
  stem: 'Match each oxide with its nature.',
  pairs: [['Na₂O', 'Basic'], ['Al₂O₃', 'Amphoteric'], ['SO₃', 'Acidic'], ['CO', 'Neutral']],
  order: [3, 0, 2, 1],
  sol: 'Sodium oxide is basic, aluminium oxide is amphoteric, sulfur trioxide is acidic and carbon monoxide is neutral.',
  d: 2, c: 'understanding', t: [3],
}));
{
  const e = 0.25 * 496;
  add('ie-kj-num', num({
    stem: 'The first ionisation enthalpy of sodium is 496 kJ mol⁻¹. How much energy, in kJ, is needed to convert 0.25 mol of gaseous sodium atoms into gaseous Na⁺ ions?',
    value: e, tol: 0.5, unit: 'kJ',
    sol: r`Energy $= 0.25 \times 496 = ${e}$, so $${e}\ \text{kJ}$.`,
    scheme: [['0.25 × 496 = 124 kJ', 1]],
    d: 2, c: 'application', t: [3],
  }), () => near(0.25 * 496, 124) || 'kJ');
}
{
  const per = (496e3 / NA) * 1e19;
  add('ie-atom-num', num({
    stem: 'The first ionisation enthalpy of sodium is 496 kJ mol⁻¹. Calculate the energy needed to remove an electron from a single sodium atom, in units of 10⁻¹⁹ J. (N_A = 6.022 × 10²³ mol⁻¹)',
    value: Number(per.toFixed(2)), tol: 0.02, unit: null,
    sol: r`Energy per atom, in units of $10^{-19}\ \text{J}$: $\dfrac{496000 \times 10^{19}}{6.022 \times 10^{23}} = ${per.toFixed(2)}$, so the energy is $${per.toFixed(2)} \times 10^{-19}\ \text{J}$ per atom.`,
    scheme: [['Divide by N_A: 8.24 × 10⁻¹⁹ J', 1]],
    d: 3, c: 'application', t: [3],
  }), () => near((496e3 / 6.022e23) * 1e19, 8.24, 0.005) || 'per atom');
}
{
  const tot = 737 + 1451;
  add('mg-num', num({
    stem: 'The first and second ionisation enthalpies of magnesium are 737 and 1451 kJ mol⁻¹. Calculate the energy, in kJ, needed to convert one mole of gaseous Mg atoms into gaseous Mg²⁺ ions.',
    value: tot, tol: 0.5, unit: 'kJ',
    sol: r`Both electrons must be removed, one after the other: $737 + 1451 = ${tot}$, so $${tot}\ \text{kJ}$.`,
    scheme: [['Sum of the first two enthalpies, 2188 kJ', 1]],
    d: 2, c: 'application', t: [3],
  }), () => near(737 + 1451, 2188) || 'mg');
}
{
  const bond = 228;
  add('radius-num', num({
    stem: 'The Br–Br bond length in a bromine molecule is 228 pm. What is the covalent radius of bromine, in pm?',
    value: bond / 2, tol: 0.5, unit: 'pm',
    sol: r`The covalent radius is half the bond length: $\dfrac{228}{2} = ${bond / 2}$, so $${bond / 2}\ \text{pm}$.`,
    scheme: [['228 ÷ 2 = 114 pm', 1]],
    d: 1, c: 'application', t: [3],
  }), () => near(228 / 2, 114) || 'radius');
}
{
  const ie = [1012, 1907, 2914, 4964, 6274, 21267];
  const ratios = ie.slice(1).map((v, i) => v / ie[i]);
  const k = ratios.indexOf(Math.max(...ratios)) + 1;
  if (k !== 5) throw new Error('jump');
  add('jump-num', num({
    stem: 'An element has the successive ionisation enthalpies (kJ mol⁻¹): 1012, 1907, 2914, 4964, 6274 and 21267. How many valence electrons does it have?',
    value: k, tol: 0, unit: null,
    sol: r`Ratios of successive values: ${ratios.map((x) => x.toFixed(2)).join(', ')}. The largest jump follows the fifth removal, so the number of valence electrons is $${k}$.`,
    scheme: [['Largest jump after the 5th: 5 valence electrons', 1]],
    d: 3, c: 'analysis', t: [3],
  }), () => (k === 5) || 'jump');
}
add('iso-short', short({
  marks: 2,
  stem: 'Explain why (a) the sodium ion is smaller than the sodium atom, and (b) the fluoride ion is larger than the fluorine atom.',
  model: 'Sodium loses its single 3s electron, so the ion has one shell fewer, and ten electrons are held by the unchanged nuclear charge of eleven. Fluorine gains an electron, so nine protons now hold ten electrons, and the extra electron-electron repulsion makes the electron cloud expand.',
  sol: 'Cation: loss of a shell and the same nuclear charge; anion: extra repulsion.',
  scheme: [['(a) Cation smaller: shell lost, nucleus holds fewer electrons', 1], ['(b) Anion larger: more electron repulsion, same nuclear charge', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('egain-noble-short', short({
  marks: 2,
  stem: 'Why do noble gases have large positive electron gain enthalpies, and why is the second electron gain enthalpy of an element always positive?',
  model: 'A noble gas atom has a complete shell, so an extra electron must enter a new, higher shell and be shielded, which requires energy. When a second electron is added to a negative ion, the electron is repelled by the existing charge, so energy must again be supplied; the second value is therefore positive.',
  sol: 'New shell for noble gases; repulsion by the anion for the second gain.',
  scheme: [['Noble gases: new shell needed', 1], ['Second gain: repulsion by the negative ion', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('diag-short', short({
  marks: 2,
  stem: 'What is a diagonal relationship? Name the pair of elements that shows it with lithium and give two shared properties.',
  model: 'A diagonal relationship is the resemblance between an element and the one diagonally below and to its right, owing to a similar charge-to-size ratio. Lithium resembles magnesium: both form a nitride directly with nitrogen, and the carbonates of both decompose on heating to give the oxide.',
  sol: 'Definition, Li–Mg and two common properties.',
  scheme: [['Definition and Li–Mg', 1], ['Two shared properties', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('successive-short3', short({
  marks: 3,
  stem: 'Why is the second ionisation enthalpy of an element always larger than the first? What does a very large jump in successive values tell you?',
  model: 'After one electron has gone, the same nuclear charge holds fewer electrons, so the remaining ones are held more tightly and are less shielded, and removal requires more energy. A very large jump appears when electrons start to be removed from a complete inner shell, so the position of the jump shows how many valence electrons the atom has, and therefore its group.',
  sol: 'Same nucleus, fewer electrons; the inner shell causes a jump.',
  scheme: [['Same nuclear charge, fewer electrons', 1], ['Jump when an inner shell is entered', 1], ['Number of valence electrons and the group', 1]],
  d: 3, c: 'analysis', t: [3],
}));
add('second-short3', short({
  marks: 3,
  stem: 'Give three reasons why the first member of a group in the p-block differs from the other members of the group.',
  model: 'The first member is very small and so has a high ionisation enthalpy and high electronegativity. It has no d orbitals in its valence shell, so its maximum covalence is four, unlike the heavier members, which can expand their octet. Because of the small size, it can form strong multiple bonds with itself and with other small atoms, as carbon and nitrogen do.',
  sol: 'Small size, no d orbitals, pπ–pπ multiple bonds.',
  scheme: [['Small size, high ionisation enthalpy and electronegativity', 1], ['No d orbitals, maximum covalence four', 1], ['Multiple bonds by pπ–pπ overlap', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('oxides-short3', short({
  marks: 3,
  stem: 'Describe how the nature of the oxides changes across the third period, and write equations to show that aluminium oxide is amphoteric.',
  model: r`The oxides change from basic (Na₂O, MgO) through amphoteric (Al₂O₃) to acidic (SiO₂, P₄O₁₀, SO₃, Cl₂O₇), because the elements change from metallic to non-metallic across the period, so the oxides of metals give bases with water and those of non-metals give acids. Aluminium oxide, being between the two, reacts with an acid, $\ce{Al2O3 + 6HCl -> 2AlCl3 + 3H2O}$, and with a base, $\ce{Al2O3 + 2NaOH + 3H2O -> 2NaAl(OH)4}$.`,
  sol: 'Basic to acidic through amphoteric; two equations.',
  scheme: [['Trend from basic to acidic with examples', 1], ['Reaction with acid', 1], ['Reaction with base', 1]],
  d: 3, c: 'application', t: [3],
}));
add('radii-short3', short({
  marks: 3,
  stem: 'Explain the trend in atomic radius across period 3 (Na 186 pm to Cl 99 pm) and why the radius of Cl⁻ (181 pm) is so much larger than that of the Cl atom.',
  model: 'Across the third period the nuclear charge rises from 11 to 17 while the electrons enter the same third shell, so the shielding changes little and the electrons are pulled closer; the radius falls from 186 to 99 pm. The chloride ion has gained one electron without any change in nuclear charge, so the greater electron-electron repulsion expands the cloud and the radius rises to 181 pm.',
  sol: 'Rising nuclear charge, same shell; extra electron repulsion in the anion.',
  scheme: [['Nuclear charge rises, same shell', 1.5], ['Anion larger due to repulsion', 1.5]],
  d: 3, c: 'application', t: [3],
}));
add('ie-long', long({
  stem: '(a) Define first ionisation enthalpy and name the factors that affect it.\n\n(b) Explain the general trend across the second period from Li to Ne.\n\n(c) Explain why the values for boron and oxygen are lower than expected from this trend.',
  model: 'First ionisation enthalpy is the energy required to remove the most loosely held electron from an isolated gaseous atom. It rises with nuclear charge and with penetration of the electron, and falls with larger size and more shielding. Across the second period the nuclear charge rises while electrons enter the same shell, so atoms shrink and the energy rises from lithium to neon. Boron is lower than beryllium because its 2p electron is less penetrating than the 2s electron of beryllium. Oxygen is lower than nitrogen because nitrogen has a stable half-filled 2p subshell, while in oxygen one 2p electron is paired and repelled by its partner, so it is removed more easily.',
  sol: 'Definition and factors; trend with nuclear charge; subshell reasoning for B and O.',
  scheme: [['(a) Definition and factors', 1.5], ['(b) Trend across the period', 1.5], ['(c) B and O anomalies explained', 2]],
  d: 3, c: 'understanding', t: [3],
}));
add('egain-long', long({
  stem: '(a) Define electron gain enthalpy and electronegativity, and state one difference between them.\n\n(b) Explain why chlorine has a more negative electron gain enthalpy than fluorine, although fluorine is more electronegative.\n\n(c) State the trend in electronegativity across a period and down a group, with reasons.',
  model: 'Electron gain enthalpy is the enthalpy change when an isolated gaseous atom accepts an electron; electronegativity is the tendency of an atom in a molecule to attract the shared electron pair. The first belongs to an isolated atom and is measured in kJ mol⁻¹, while the second is a relative number for a bonded atom. Fluorine is so small that its 2p subshell is crowded, so an incoming electron meets strong repulsion and less energy is released; chlorine’s larger 3p subshell has more room. Electronegativity rises across a period because the nuclear charge increases and the atom shrinks, and falls down a group because the atoms grow and the shared pair is farther from the nucleus.',
  sol: 'Two definitions and a difference; crowding in fluorine; trends with causes.',
  scheme: [['(a) Both definitions and a difference', 1.5], ['(b) Fluorine’s crowded 2p subshell', 2], ['(c) Trends with reasons', 1.5]],
  d: 4, c: 'analysis', t: [3],
}));
add('second-long', long({
  stem: '(a) Why do the elements of the second period show anomalous behaviour compared with other members of their groups?\n\n(b) Illustrate with the chlorides of nitrogen and phosphorus.\n\n(c) Explain the diagonal relationship between beryllium and aluminium, giving two similarities.',
  model: 'Second-period elements are very small and have high electronegativity and ionisation enthalpy, and they have no d orbitals in the valence shell, so their covalence cannot exceed four. Nitrogen forms only NCl₃, whereas phosphorus, with vacant 3d orbitals, forms both PCl₃ and PCl₅. Beryllium and aluminium resemble each other because the higher charge of aluminium is offset by its larger size, giving a similar charge-to-size ratio and equal electronegativity (1.5). Both oxides are amphoteric, and both form chlorides that are largely covalent.',
  sol: 'Small size and no d orbitals; NCl₃ against PCl₃ and PCl₅; charge-to-size ratio for Be and Al.',
  scheme: [['(a) Size, electronegativity, no d orbitals', 2], ['(b) NCl₃ against PCl₃ and PCl₅', 1], ['(c) Reason and two similarities', 2]],
  d: 3, c: 'understanding', t: [3],
}));
add('ie-case', mk.case({
  passage: r`The first ionisation enthalpies (kJ mol⁻¹) of the third-period elements are given.

| Na | Mg | Al | Si | P | S | Cl | Ar |
|---|---|---|---|---|---|---|---|
| 496 | 737 | 577 | 786 | 1012 | 999 | 1256 | 1520 |`,
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'The value for aluminium is lower than that for magnesium. The main reason is that:',
      right: 'the 3p electron of aluminium is higher in energy and less penetrating than the 3s electron of magnesium',
      wrong: ['aluminium has a lower nuclear charge than magnesium', 'aluminium atoms are larger than magnesium atoms', 'aluminium has a half-filled 3p subshell'],
      sol: 'The outermost electron of aluminium is in 3p, which is better shielded by the filled 3s, so less energy is needed — option (@K). Its nuclear charge is higher (@1) and its atom is smaller (@2).',
      d: 3, c: 'analysis', t: [3],
    })),
    part('b', short({
      marks: 1,
      stem: 'Which element in the table has the lowest first ionisation enthalpy, and why?',
      model: 'Sodium: it has the largest atom and the lowest nuclear charge, so its single 3s electron is held least tightly.',
      sol: 'Alkali metal at the start of the period.',
      scheme: [['Sodium, with the reason', 1]],
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Predict whether the first ionisation enthalpy of potassium is above or below 496, and explain your prediction.',
      model: 'It is below 496 (the measured value is 419). Potassium is in the same group as sodium but has an extra shell, so its valence electron is farther from the nucleus and better shielded, and is removed more easily.',
      sol: 'Down the group the electron is farther away and more shielded.',
      scheme: [['Below 496 kJ mol⁻¹', 1], ['Extra shell: greater distance and shielding', 1]],
      d: 3, c: 'application', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'Explain why the value for sulfur (999) is lower than that for phosphorus (1012), although the general trend rises across the period.',
        model: 'Phosphorus has the stable half-filled 3p³ subshell. In sulfur (3p⁴) two electrons occupy the same 3p orbital and repel each other, so one is removed more easily, and the value is slightly lower than for phosphorus.',
        sol: 'Half-filled stability for P; repulsion between paired electrons for S.',
        scheme: [['P: stable half-filled 3p³', 1], ['S: paired electrons repel, easier removal', 1]],
        d: 3, c: 'analysis', t: [3],
      }),
    ]),
  ],
}));
{
  const iso = [['P³⁻', 15, 212], ['S²⁻', 16, 184], ['Cl⁻', 17, 181], ['K⁺', 19, 138], ['Ca²⁺', 20, 100], ['Sc³⁺', 21, 75]];
  if (!iso.every((x, i) => i === 0 || x[2] < iso[i - 1][2])) throw new Error('iso');
  add('iso-case', mk.case({
    passage: r`The table lists species that are isoelectronic with argon, with their atomic numbers and ionic radii (in pm).

| Species | P³⁻ | S²⁻ | Cl⁻ | K⁺ | Ca²⁺ | Sc³⁺ |
|---|---|---|---|---|---|---|
| Atomic number | 15 | 16 | 17 | 19 | 20 | 21 |
| Radius / pm | 212 | 184 | 181 | 138 | 100 | 75 |`,
    d: 3, c: 'analysis',
    children: [
      part('a', mcq({
        stem: 'What do all the species in the table have in common?',
        right: 'Each has 18 electrons.',
        wrong: ['Each has 18 protons.', 'Each has the same radius.', 'Each has the same nuclear charge.'],
        sol: 'P³⁻ (15 + 3), S²⁻ (16 + 2), Cl⁻ (17 + 1), K⁺ (19 − 1), Ca²⁺ (20 − 2) and Sc³⁺ (21 − 3) all have 18 electrons — option (@K). Their atomic numbers differ (@1).',
        d: 2, c: 'application', t: [3],
      })),
      part('b', num({
        stem: 'By how many picometres does the radius fall from Cl⁻ to Ca²⁺?',
        value: 181 - 100, tol: 0, unit: 'pm',
        sol: r`$181 - 100 = ${181 - 100}$, so the radius falls by $${181 - 100}\ \text{pm}$.`,
        scheme: [['181 − 100 = 81 pm', 1]],
        d: 2, c: 'application', t: [3],
      })),
      part('c', short({
        marks: 2,
        stem: 'Explain the trend in radius shown in the table.',
        model: 'All the species have the same 18 electrons, but the nuclear charge rises from 15 to 21 across the table. A greater nuclear charge pulls the same electron cloud in more strongly, so the radius falls steadily from P³⁻ to Sc³⁺.',
        sol: 'Same electrons, increasing nuclear charge.',
        scheme: [['Same number of electrons', 1], ['Nuclear charge rises, so radius falls', 1]],
        d: 3, c: 'analysis', t: [3],
      }), [
        short({
          marks: 2,
          stem: 'Cl⁻ and K⁺ differ in atomic number by only two, yet their radii differ by 43 pm. Explain why K⁺ is the smaller ion.',
          model: 'Both ions have 18 electrons, but K⁺ has 19 protons while Cl⁻ has only 17. The greater nuclear charge of potassium pulls the same electron cloud in more strongly, so K⁺ is smaller. Chloride, with fewer protons, holds its electrons less tightly and so is larger.',
          sol: 'Same electrons, but more protons for K⁺.',
          scheme: [['Both have 18 electrons', 1], ['19 protons pull harder than 17, so K⁺ is smaller', 1]],
          d: 4, c: 'evaluation', t: [3],
        }),
      ]),
    ],
  }), () => (181 - 100 === 81) || 'diff');
}
