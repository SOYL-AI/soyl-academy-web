// ISC 12 Chemistry ch10 Coordination Compounds: Terms, Nomenclature and Isomerism — question bank (ISC style).
// Stems name their own complexes. MCQ keys are placed by the builder; AR keys planned: a a c d a b. Numericals re-solved.
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-9, Math.abs(b) * rel);

// ---------------------------------------------------------------- t01 double salts, Werner's theory
add('werner-mcq', mcq({
  stem: 'PdCl₂·4NH₃ (palladium(II), coordination number 4) gives 2 mol of AgCl per mole with excess silver nitrate. Its Werner formula is:',
  right: '[Pd(NH₃)₄]Cl₂',
  wrong: ['[PdCl₂(NH₃)₂]·2NH₃', '[PdCl(NH₃)₃]Cl·NH₃', '[PdCl₂(NH₃)₄]'],
  sol: 'Both Cl⁻ are ionisable, so the four NH₃ fill the four coordination positions — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('alum-mcq', mcq({
  stem: 'Which observation shows that potash alum, K₂SO₄·Al₂(SO₄)₃·24H₂O, is a double salt and not a coordination compound?',
  right: 'Its aqueous solution gives the usual tests for K⁺, Al³⁺ and SO₄²⁻ ions',
  wrong: ['It forms well-shaped crystals', 'It contains water of crystallisation', 'It contains two different metals'],
  sol: 'A double salt dissociates completely into its simple ions in water — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('conduct-mcq', mcq({
  stem: 'Which of these cobalt(III) ammine chlorides has the highest molar conductivity in dilute aqueous solution?',
  right: '[Co(NH₃)₆]Cl₃',
  wrong: ['[CoCl(NH₃)₅]Cl₂', '[CoCl₂(NH₃)₄]Cl', '[CoCl₃(NH₃)₃]'],
  sol: '[Co(NH₃)₆]Cl₃ gives 4 ions (most), the others 3, 2 and 0 — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('ferro-mcq', mcq({
  stem: 'An aqueous solution of potassium ferrocyanide, K₄[Fe(CN)₆], gives no test for Fe²⁺ ions. This is because:',
  right: 'the iron is held in the complex ion [Fe(CN)₆]⁴⁻, which does not dissociate in water',
  wrong: ['the iron is present as Fe³⁺', 'potassium ions mask the test for iron', 'the compound is insoluble in water'],
  sol: 'The complex ion stays intact, so free Fe²⁺ is absent — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('secondary-mcq', mcq({
  stem: 'According to Werner’s theory, the secondary valency of cobalt in [Co(NH₃)₆]Cl₃:',
  right: 'equals its coordination number, 6, and is directed in space',
  wrong: ['equals its oxidation state, 3, and is ionisable', 'is satisfied only by the chloride ions outside the brackets', 'can change from one solution to another'],
  sol: 'Secondary valency = coordination number, non-ionisable and directional — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('werner-ar', ar({
  a: 'An aqueous solution of [CoCl₃(NH₃)₃] does not conduct electricity appreciably.',
  r: 'All three chloride ions are inside the coordination sphere, so no ions are released.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('carnallite-tf', tf({
  stem: 'Carnallite, KCl·MgCl₂·6H₂O, keeps a complex ion intact when dissolved in water.',
  key: 'f',
  sol: 'False. Carnallite is a double salt; it gives K⁺, Mg²⁺ and Cl⁻ ions in water.',
  d: 1, c: 'understanding', t: [1],
}));
add('primary-fill', fill({
  stem: 'According to Werner, the primary (ionisable) valency of a metal in a complex corresponds to its ___ state.',
  acc: [['oxidation']],
  sol: 'Its **oxidation** state.',
  d: 1, c: 'recall', t: [1],
}));
add('agcl-num', num({
  marks: 2,
  stem: r`Calculate the mass of AgCl precipitated when excess silver nitrate is added to a solution containing $0.010\ \text{mol}$ of [CrCl(H₂O)₅]Cl₂. (AgCl = 143.5)`,
  value: 2.87, tol: 0.01, unit: 'g',
  sol: r`Two ionisable Cl⁻ per formula unit: $n(\text{AgCl}) = 2 \times 0.010 = 0.020\ \text{mol}$; mass $= 0.020 \times 143.5 = 2.87\ \text{g}$.`,
  scheme: [['0.020 mol AgCl', 1], ['2.87 g', 1]],
  d: 2, c: 'application', t: [1],
}), () => near(0.02 * 143.5, 2.87) || 'agcl');
add('ions-num', num({
  marks: 1,
  stem: r`How many ions are produced in water by one formula unit of potassium ferrocyanide, K₄[Fe(CN)₆]?`,
  value: 5, tol: 0, unit: null,
  sol: r`Four K⁺ ions and one [Fe(CN)₆]⁴⁻ ion: $n = 4 + 1 = 5$.`,
  scheme: [['5', 1]],
  d: 1, c: 'application', t: [1],
}), () => near(4 + 1, 5) || 'ions');
add('double-short', short({
  marks: 2,
  stem: 'Distinguish between a double salt and a coordination compound by their behaviour in water, giving one example of each.',
  model: 'A double salt dissociates completely into its simple ions in water, each giving its usual test; e.g. potash alum gives K⁺, Al³⁺ and SO₄²⁻. A coordination compound keeps its complex ion intact, so the metal and ligands inside the brackets do not give their usual tests; e.g. K₃[Fe(CN)₆] gives only K⁺ and [Fe(CN)₆]³⁻.',
  sol: 'Complete dissociation vs intact complex ion.',
  scheme: [['Double salt with example', 1], ['Complex with example', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('werner-short', short({
  marks: 2,
  stem: 'Explain what Werner meant by primary and secondary valency, and give their values for platinum in [Pt(NH₃)₄Cl₂]Cl₂.',
  model: 'Primary valency: ionisable valency, satisfied by anions, equal to the oxidation state of the metal. Secondary valency: non-ionisable valency, satisfied by ligands (neutral or anionic), equal to the coordination number and directed in space. In [Pt(NH₃)₄Cl₂]Cl₂: primary valency 4 (Pt is +4); secondary valency 6 (four NH₃ and two Cl⁻).',
  sol: 'Primary 4, secondary 6.',
  scheme: [['Definitions', 1], ['Primary 4, secondary 6', 1]],
  d: 2, c: 'application', t: [1],
}));
add('ptcl-short3', short({
  marks: 3,
  stem: 'Three forms of CrCl₃·6H₂O — violet, grey-green and dark green — give 3, 2 and 1 mol of AgCl per mole respectively with excess silver nitrate. Chromium(III) has coordination number 6. Write the Werner formula of each and name the type of isomerism they show.',
  model: 'Violet: [Cr(H₂O)₆]Cl₃ (three free Cl⁻). Grey-green: [CrCl(H₂O)₅]Cl₂·H₂O (two free Cl⁻, one H₂O of crystallisation). Dark green: [CrCl₂(H₂O)₄]Cl·2H₂O (one free Cl⁻, two H₂O of crystallisation). They are hydrate (solvate) isomers.',
  sol: 'Three formulas; hydrate isomerism.',
  scheme: [['Violet formula', 1], ['Grey-green and dark green formulas', 1], ['Hydrate isomerism', 1]],
  d: 3, c: 'analysis', t: [1, 4],
}));
add('conduct-short3', short({
  marks: 3,
  stem: 'Arrange the following platinum(IV) complexes in order of increasing molar conductivity in water and explain: [Pt(NH₃)₆]Cl₄, [PtCl(NH₃)₅]Cl₃, [PtCl₃(NH₃)₃]Cl, [PtCl₄(NH₃)₂].',
  model: 'Ions per formula unit: [PtCl₄(NH₃)₂] 0; [PtCl₃(NH₃)₃]Cl 2; [PtCl(NH₃)₅]Cl₃ 4; [Pt(NH₃)₆]Cl₄ 5. Molar conductivity increases with the number of ions: [PtCl₄(NH₃)₂] < [PtCl₃(NH₃)₃]Cl < [PtCl(NH₃)₅]Cl₃ < [Pt(NH₃)₆]Cl₄. Chlorides inside the coordination sphere do not ionise.',
  sol: '0 < 2 < 4 < 5 ions.',
  scheme: [['Ions per formula unit', 1], ['Correct order', 1], ['Reason', 1]],
  d: 3, c: 'analysis', t: [1],
}));

// ---------------------------------------------------------------- t02 ligands, CN, oxidation state
add('dent-mcq', mcq({
  stem: 'Triethylenetetramine (trien), H₂NCH₂CH₂NHCH₂CH₂NHCH₂CH₂NH₂, binding a metal through all its nitrogen atoms, is a:',
  right: 'tetradentate ligand',
  wrong: ['tridentate ligand', 'didentate ligand', 'hexadentate ligand'],
  sol: 'Four N donor atoms — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('oscn-mcq', mcq({
  stem: 'In potassium bis(oxalato)nickelate(II), K₂[Ni(C₂O₄)₂], the oxidation state and coordination number of nickel are:',
  right: '+2 and 4',
  wrong: ['+2 and 2', '+4 and 4', '+2 and 6'],
  sol: '2(+1) + x + 2(−2) = 0 gives +2; two didentate oxalates give CN 4 — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('ambi-mcq', mcq({
  stem: 'The thiocyanate ion is an ambidentate ligand. Through which atoms can it bind to a metal?',
  right: 'Sulphur or nitrogen',
  wrong: ['Carbon or nitrogen', 'Sulphur or oxygen', 'Sulphur only'],
  sol: 'SCN⁻ binds as thiocyanato-S or thiocyanato-N — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('chelate-mcq', mcq({
  stem: 'The complex [Ni(en)₃]²⁺ is much more stable than [Ni(NH₃)₆]²⁺. The main reason is that:',
  right: 'each ethane-1,2-diamine forms a five-membered chelate ring with nickel',
  wrong: ['ethane-1,2-diamine carries a negative charge', 'nickel is in a higher oxidation state in the en complex', 'ammonia cannot donate a lone pair to nickel'],
  sol: 'The chelate effect — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('edta-mcq', mcq({
  stem: 'In [Ca(EDTA)]²⁻, the complex formed when EDTA removes calcium ions from hard water, the coordination number of calcium is:',
  right: '6',
  wrong: ['1', '2', '4'],
  sol: 'EDTA⁴⁻ is hexadentate (2 N, 4 O) — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('lewis-mcq', mcq({
  stem: 'When silver chloride dissolves in aqueous ammonia, [Ag(NH₃)₂]⁺ forms. In this complex the ammonia molecules act as:',
  right: 'Lewis bases, donating lone pairs to Ag⁺',
  wrong: ['Lewis acids, accepting electron pairs from Ag⁺', 'reducing agents', 'counter ions'],
  sol: 'Ligands are electron-pair donors (Lewis bases); Ag⁺ is the Lewis acid — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('cn-mcq', mcq({
  stem: 'What is the coordination number of chromium in [Cr(en)(C₂O₄)Cl₂]⁻?',
  right: '6',
  wrong: ['4', '3', '5'],
  sol: 'en (2) + oxalate (2) + two Cl⁻ (2) = 6 — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('chelate-ar', ar({
  a: 'Ethane-1,2-diamine is a chelating ligand.',
  r: 'Its two nitrogen donor atoms can bind the same metal ion, closing a five-membered ring.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('ambi-ar', ar({
  a: 'The nitrite ion is an ambidentate ligand.',
  r: 'The nitrite ion has only one atom that carries a lone pair.',
  key: 'c',
  sol: 'A is true. R is false: both N and O carry lone pairs, which is why nitrite can bind through either — option (c).',
  d: 3, c: 'analysis', t: [2],
}));
add('homo-tf', tf({
  stem: 'The ion [CoCl₂(NH₃)₄]⁺ is a homoleptic complex.',
  key: 'f',
  sol: 'False. It has two kinds of ligand (Cl⁻ and NH₃), so it is heteroleptic.',
  d: 1, c: 'understanding', t: [2],
}));
add('dien-fill', fill({
  stem: 'In [Co(dien)₂]³⁺, where diethylenetriamine (dien) is tridentate, the coordination number of cobalt is ___.',
  acc: [['6', 'six']],
  sol: '2 × 3 = **6**.',
  d: 2, c: 'application', t: [2],
}));
add('dent-match', match({
  stem: 'Match each ligand with its denticity.',
  pairs: [
    ['NH₃', 'Unidentate'],
    ['C₂O₄²⁻', 'Didentate'],
    ['Diethylenetriamine', 'Tridentate'],
    ['EDTA⁴⁻', 'Hexadentate'],
  ],
  order: [2, 0, 3, 1],
  sol: 'NH₃ unidentate; oxalate didentate; dien tridentate; EDTA⁴⁻ hexadentate.',
  d: 1, c: 'recall', t: [2],
}));
add('brownring-num', num({
  marks: 2,
  stem: r`In the brown-ring test for nitrate, the complex [Fe(H₂O)₅(NO)]SO₄ forms, in which nitric oxide is bonded as NO⁺. Calculate the oxidation state of iron.`,
  value: 1, tol: 0, unit: null,
  sol: r`The complex cation carries $+2$ (one SO₄²⁻). With five neutral H₂O and NO⁺: $x + 0 + 1 = 2$, so $x = 2 - 1 = 1$. Iron is +1.`,
  scheme: [['Charge on cation +2', 1], ['Fe = +1', 1]],
  d: 4, c: 'analysis', t: [2],
}), () => near(2 - 1, 1) || 'os');
add('pt-os-num', num({
  marks: 1,
  stem: r`Calculate the oxidation state of platinum in potassium hexachloridoplatinate, K₂[PtCl₆].`,
  value: 4, tol: 0, unit: null,
  sol: r`$2(+1) + x + 6(-1) = 0$, so $x = 6 - 2 = 4$.`,
  scheme: [['+4', 1]],
  d: 1, c: 'application', t: [2],
}), () => near(6 - 2, 4) || 'os');
add('chelate-short', short({
  marks: 2,
  stem: 'What is a chelating ligand? Explain why [Ni(en)₃]²⁺ is more stable than [Ni(NH₃)₆]²⁺.',
  model: 'A chelating ligand is a di- or polydentate ligand that binds the same metal through two or more donor atoms, forming a ring. In [Ni(en)₃]²⁺ each en forms a five-membered ring with Ni²⁺; removing it requires breaking two bonds, so the complex is more stable than the ammine complex with six separate unidentate ligands (chelate effect).',
  sol: 'Definition; chelate effect.',
  scheme: [['Definition', 1], ['Chelate effect explained', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('ambi-short', short({
  marks: 2,
  stem: 'What is an ambidentate ligand? Give two examples, naming the possible donor atoms of each.',
  model: 'A unidentate ligand that can bind to a metal through either of two different donor atoms. Examples: NO₂⁻ — through N (nitrito-N) or O (nitrito-O); SCN⁻ — through S (thiocyanato-S) or N (thiocyanato-N). (Also CN⁻ through C or N.)',
  sol: 'Definition; NO₂⁻ and SCN⁻.',
  scheme: [['Definition', 1], ['Two examples with donor atoms', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('oscn-short', short({
  marks: 2,
  stem: 'Find the oxidation state and coordination number of the metal in (a) sodium nitroprusside, Na₂[Fe(CN)₅(NO)], taking NO as NO⁺, and (b) [Mn(CO)₅Br].',
  model: '(a) 2(+1) + x + 5(−1) + (+1) = 0, so x = +2; CN = 6. (b) x + 0 + (−1) = 0, so x = +1; CN = 6.',
  sol: 'Fe +2, CN 6; Mn +1, CN 6.',
  scheme: [['(a) +2, 6', 1], ['(b) +1, 6', 1]],
  d: 3, c: 'application', t: [2],
}));
add('denticity-short3', short({
  marks: 3,
  stem: 'Classify each ligand by denticity and name its donor atoms: (a) oxalate ion, (b) diethylenetriamine, (c) ethylenediaminetetraacetate ion (EDTA⁴⁻).',
  model: '(a) Oxalate: didentate; two O atoms. (b) Diethylenetriamine: tridentate; three N atoms. (c) EDTA⁴⁻: hexadentate; two N atoms and four O atoms (of the carboxylate groups).',
  sol: 'Di-, tri- and hexadentate.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('os-short3', short({
  marks: 3,
  stem: 'Calculate the oxidation state and coordination number of the metal in (a) [Co(en)₂(ONO)Cl]⁺, (b) K[Ag(CN)₂] and (c) [Fe(EDTA)]⁻.',
  model: '(a) x + 0 + (−1) + (−1) = +1, so x = +3; CN = 2 × 2 + 1 + 1 = 6. (b) +1 + x + 2(−1) = 0, so x = +1; CN = 2. (c) x + (−4) = −1, so x = +3; CN = 6.',
  sol: 'Co +3, 6; Ag +1, 2; Fe +3, 6.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 nomenclature
add('naming-mcq', mcq({
  stem: 'The IUPAC name of [Cr(NH₃)₅(NCS)]Cl₂, in which thiocyanate is bonded through nitrogen, is:',
  right: 'pentaamminethiocyanato-N-chromium(III) chloride',
  wrong: ['pentaamminethiocyanato-S-chromium(III) chloride', 'pentaamminethiocyanato-N-chromate(III) chloride', 'thiocyanato-N-pentaamminechromium(II) chloride'],
  sol: 'Ammine before thiocyanato; cationic complex, so "chromium"; Cr is +3 — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('name-anion-mcq', mcq({
  stem: 'The IUPAC name of K₃[Co(C₂O₄)₃] is:',
  right: 'potassium trioxalatocobaltate(III)',
  wrong: ['potassium trioxalatocobalt(III)', 'potassium trioxalatocobaltate(II)', 'tripotassium oxalatocobalt(III)'],
  sol: 'Anionic complex → cobaltate; 3(+1) + x + 3(−2) = 0 gives +3 — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('formula-mcq', mcq({
  stem: 'The formula of diamminesilver(I) chloride, formed when silver chloride dissolves in ammonia, is:',
  right: '[Ag(NH₃)₂]Cl',
  wrong: ['[AgCl(NH₃)₂]', '[AgCl(NH₃)₂]Cl', '[Ag(NH₃)₂]Cl₂'],
  sol: 'Ag(I) with two neutral NH₃ gives a +1 cation, balanced by one Cl⁻ — option (@K).',
  d: 1, c: 'application', t: [3],
}));
add('order-mcq', mcq({
  stem: 'In the IUPAC name of [CoBr(NH₃)₅]SO₄, the ligands are cited in the order:',
  right: 'ammine before bromido, because ligands are listed alphabetically ignoring prefixes',
  wrong: ['bromido before ammine, because anionic ligands come first', 'bromido before ammine, because Br has a higher atomic number', 'ammine before bromido, because there are more ammine ligands'],
  sol: 'Alphabetical: a (ammine) before b (bromido): pentaamminebromidocobalt(III) sulfate — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('bis-mcq', mcq({
  stem: 'In the name dichloridobis(ethane-1,2-diamine)cobalt(III) chloride, why is “bis” used instead of “di” for ethane-1,2-diamine?',
  right: 'Because the ligand name already contains a numerical locant',
  wrong: ['Because the ligand is anionic', 'Because the ligand is ambidentate', 'Because cobalt is in the +3 state'],
  sol: 'bis, tris, tetrakis are used for ligands whose names contain numbers or prefixes — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('ate-ar', ar({
  a: '[Ni(CO)₄] is named tetracarbonylnickelate(0).',
  r: 'The suffix -ate is used for the metal when the complex is an anion.',
  key: 'd',
  sol: 'A is false: [Ni(CO)₄] is neutral, so it is tetracarbonylnickel(0). R is true — option (d).',
  d: 2, c: 'understanding', t: [3],
}));
add('aqua-tf', tf({
  stem: 'In the IUPAC name of [Cu(H₂O)₄]SO₄, water as a ligand is called “aqua”.',
  key: 't',
  sol: 'True. The name is tetraaquacopper(II) sulfate.',
  d: 1, c: 'recall', t: [3],
}));
add('cuprate-fill', fill({
  stem: 'The IUPAC name of the complex anion [CuCl₄]²⁻ is tetrachlorido___(II).',
  acc: [['cuprate']],
  sol: 'Tetrachlorido**cuprate**(II).',
  d: 1, c: 'recall', t: [3],
}));
add('name-match', match({
  stem: 'Match each formula with its IUPAC name.',
  pairs: [
    ['[Fe(CO)₅]', 'Pentacarbonyliron(0)'],
    ['[Ag(CN)₂]⁻', 'Dicyanidoargentate(I)'],
    ['[Zn(NH₃)₄]²⁺', 'Tetraamminezinc(II)'],
    ['[PtCl₆]²⁻', 'Hexachloridoplatinate(IV)'],
  ],
  order: [1, 3, 0, 2],
  sol: '[Fe(CO)₅] pentacarbonyliron(0); [Ag(CN)₂]⁻ dicyanidoargentate(I); [Zn(NH₃)₄]²⁺ tetraamminezinc(II); [PtCl₆]²⁻ hexachloridoplatinate(IV).',
  d: 2, c: 'application', t: [3],
}));
add('name2-short', short({
  marks: 2,
  stem: 'Write the IUPAC names of (a) [Cr(en)₃]Cl₃ and (b) K₂[HgI₄] (Nessler’s reagent).',
  model: '(a) Tris(ethane-1,2-diamine)chromium(III) chloride. (b) Potassium tetraiodidomercurate(II).',
  sol: 'Two names.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'application', t: [3],
}));
add('formula2-short', short({
  marks: 2,
  stem: 'Write the formulas of (a) tetraamminedichloridoplatinum(IV) bromide and (b) sodium hexanitrito-N-cobaltate(III).',
  model: '(a) Pt(IV) with two Cl⁻ gives a +2 cation: [PtCl₂(NH₃)₄]Br₂. (b) Co(III) with six NO₂⁻ gives a −3 anion: Na₃[Co(NO₂)₆].',
  sol: '[PtCl₂(NH₃)₄]Br₂; Na₃[Co(NO₂)₆].',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'application', t: [3],
}));
add('name3-short3', short({
  marks: 3,
  stem: 'Write the IUPAC names of (a) [Co(NH₃)₅(CO₃)]Cl, (b) Li[AlH₄] and (c) [PtCl(NH₂CH₃)(NH₃)₂]Cl.',
  model: '(a) Pentaamminecarbonatocobalt(III) chloride. (b) Lithium tetrahydridoaluminate(III). (c) Diamminechlorido(methanamine)platinum(II) chloride.',
  sol: 'Three names.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'application', t: [3],
}));
add('formula3-short3', short({
  marks: 3,
  stem: 'Write the formulas of (a) tris(ethane-1,2-diamine)cobalt(III) sulfate, (b) potassium tetrahydroxidozincate(II) and (c) dichloridobis(ethane-1,2-diamine)platinum(IV) nitrate.',
  model: r`(a) Two [Co(en)₃]³⁺ ions balance three SO₄²⁻ ions, giving [Co(en)₃]₂(SO₄)₃. (b) The anion [Zn(OH)₄]²⁻ needs two K⁺, giving K₂[Zn(OH)₄]. (c) Pt(IV) with two Cl⁻ gives a +2 cation, balanced by two nitrate ions: $\ce{[PtCl2(en)2](NO3)2}$.`,
  sol: 'Three formulas.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- t04 isomerism
add('struct-mcq', mcq({
  stem: 'The carbonyl complexes [Mn(CO)₅(SCN)] and [Mn(CO)₅(NCS)] are:',
  right: 'linkage isomers',
  wrong: ['ionisation isomers', 'coordination isomers', 'optical isomers'],
  sol: 'Thiocyanate binds through S in one and N in the other — option (@K).',
  d: 1, c: 'application', t: [4],
}));
add('stereo-mcq', mcq({
  stem: 'Which of the following has a non-superimposable mirror image: [Cr(C₂O₄)₃]³⁻, trans-[CoCl₂(en)₂]⁺, square planar [PtCl₂(NH₃)₂] or tetrahedral [Zn(NH₃)₄]²⁺?',
  right: '[Cr(C₂O₄)₃]³⁻',
  wrong: ['trans-[CoCl₂(en)₂]⁺', '[PtCl₂(NH₃)₂]', '[Zn(NH₃)₄]²⁺'],
  sol: 'Three chelate rings form a chiral propeller; the others have a mirror plane — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('geo-mcq', mcq({
  stem: 'Square planar [Pd(NH₃)₂(SCN)₂], with thiocyanate S-bonded, can exist in how many geometrical forms?',
  right: '2',
  wrong: ['1', '3', '4'],
  sol: 'cis and trans — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('facmer-mcq', mcq({
  stem: 'Octahedral [RuCl₃(NH₃)₃] exists as two isomers: in one the three chloride ions occupy one face of the octahedron, in the other they lie around a meridian. These are:',
  right: 'fac and mer geometrical isomers',
  wrong: ['d and l optical isomers', 'ionisation isomers', 'linkage isomers'],
  sol: 'MA₃B₃ octahedral complexes show fac/mer isomerism — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('coord-mcq', mcq({
  stem: '[Co(NH₃)₆][Cr(C₂O₄)₃] and [Cr(NH₃)₆][Co(C₂O₄)₃] are examples of:',
  right: 'coordination isomerism',
  wrong: ['linkage isomerism', 'hydrate isomerism', 'geometrical isomerism'],
  sol: 'Ligands are exchanged between the cationic and anionic complexes — option (@K).',
  d: 1, c: 'application', t: [4],
}));
add('hydrate-mcq', mcq({
  stem: 'Hydrated chromium(III) chloride, CrCl₃·6H₂O, exists in violet, grey-green and dark green forms. These forms differ in:',
  right: 'the number of water molecules bonded directly to chromium',
  wrong: ['the oxidation state of chromium', 'the total number of water molecules in the formula', 'the coordination number of chromium'],
  sol: 'Hydrate isomers: [Cr(H₂O)₆]Cl₃, [CrCl(H₂O)₅]Cl₂·H₂O, [CrCl₂(H₂O)₄]Cl·2H₂O — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('tetra-geo-mcq', mcq({
  stem: 'Tetrahedral [Zn(NH₃)₂Cl₂] does not show geometrical isomerism because:',
  right: 'all four positions of a tetrahedron are adjacent to one another',
  wrong: ['zinc has a full d subshell', 'chloride is a weak-field ligand', 'the complex is neutral'],
  sol: 'No pair of positions is "opposite", so cis and trans cannot exist — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('cis-ar', ar({
  a: 'cis-[CoCl₂(en)₂]⁺ is optically active.',
  r: 'cis-[CoCl₂(en)₂]⁺ has no plane of symmetry.',
  key: 'a',
  sol: 'Both are true; lacking a mirror plane makes the ion chiral — option (a).',
  d: 3, c: 'analysis', t: [4],
}));
add('ionis-ar', ar({
  a: '[Pt(NH₃)₄Cl₂]Br₂ and [Pt(NH₃)₄Br₂]Cl₂ give different precipitates with silver nitrate.',
  r: 'Silver chloride and silver bromide are both insoluble in water.',
  key: 'b',
  sol: 'Both are true, but A is due to different ions being outside the coordination sphere (Br⁻ in one, Cl⁻ in the other), not to the insolubility of both silver halides — option (b).',
  d: 3, c: 'analysis', t: [4],
}));
add('trans-tf', tf({
  stem: 'trans-[CrCl₂(en)₂]⁺ is optically active.',
  key: 'f',
  sol: 'False. The trans isomer has a mirror plane, so it is optically inactive.',
  d: 2, c: 'understanding', t: [4],
}));
add('link-fill', fill({
  stem: '[Co(NH₃)₅(NO₂)]²⁺ and [Co(NH₃)₅(ONO)]²⁺, which differ only in the donor atom of the nitrite ligand, are ___ isomers.',
  acc: [['linkage']],
  sol: '**Linkage** isomers.',
  d: 1, c: 'recall', t: [4],
}));
add('stereo-num', num({
  marks: 2,
  stem: r`Count the geometrical and optical isomers of the octahedral ion [Cr(C₂O₄)₂(H₂O)₂]⁻ and give the total number of stereoisomers.`,
  value: 3, tol: 0, unit: null,
  sol: r`trans isomer: 1 (has a mirror plane). cis isomer: chiral, exists as d and l: 2. Total $= 1 + 2 = 3$.`,
  scheme: [['trans 1; cis as d and l', 1], ['Total 3', 1]],
  d: 3, c: 'analysis', t: [4],
}), () => near(1 + 2, 3) || 'n');
add('ionis-short', short({
  marks: 2,
  stem: 'Write the formula of the ionisation isomer of [Pt(NH₃)₄Cl₂]Br₂ and describe a test with silver nitrate that distinguishes the two compounds.',
  model: 'Ionisation isomer: [Pt(NH₃)₄Br₂]Cl₂. With AgNO₃, [Pt(NH₃)₄Cl₂]Br₂ gives a pale yellow precipitate of AgBr (free Br⁻), whereas [Pt(NH₃)₄Br₂]Cl₂ gives a white precipitate of AgCl (free Cl⁻), soluble in dilute ammonia.',
  sol: '[Pt(NH₃)₄Br₂]Cl₂; AgBr vs AgCl.',
  scheme: [['Formula', 1], ['Distinguishing test', 1]],
  d: 2, c: 'application', t: [4],
}));
add('facmer-short', short({
  marks: 2,
  stem: 'Describe the fac and mer isomers of octahedral [Co(NH₃)₃(NO₂)₃]. Are either of them optically active?',
  model: 'fac (facial): the three NO₂⁻ ligands occupy one triangular face of the octahedron (each at 90° to the others). mer (meridional): the three NO₂⁻ lie in a plane around a meridian (two of them trans). Neither is optically active; both have a mirror plane.',
  sol: 'Face vs meridian; neither optically active.',
  scheme: [['fac and mer described', 1], ['Neither optically active', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('link-short3', short({
  marks: 3,
  stem: 'The ions [Cr(H₂O)₅(SCN)]²⁺ and [Cr(H₂O)₅(NCS)]²⁺ are isomers. (a) Name the type of isomerism. (b) Give the IUPAC name of each ion. (c) What feature of the thiocyanate ion makes this isomerism possible?',
  model: '(a) Linkage isomerism. (b) Pentaaquathiocyanato-S-chromium(III) ion and pentaaquathiocyanato-N-chromium(III) ion. (c) Thiocyanate is ambidentate: both its S and N atoms have lone pairs and can bind to the metal.',
  sol: 'Linkage; two names; ambidentate SCN⁻.',
  scheme: [['(a) Linkage', 1], ['(b) Two names', 1], ['(c) Ambidentate', 1]],
  d: 2, c: 'understanding', t: [3, 4],
}));
add('geo-short3', short({
  marks: 3,
  stem: '(a) Describe the cis and trans isomers of [CrBr₂(NH₃)₄]⁺. (b) Can either be optically active? Explain. (c) Why does tetrahedral [Zn(NH₃)₂Br₂] have no such isomers?',
  model: '(a) cis: the two Br⁻ ligands occupy adjacent positions (90° apart); trans: they are opposite (180°). (b) Neither: with only unidentate ligands both have a mirror plane. (c) In a tetrahedron all positions are adjacent to each other, so only one arrangement is possible.',
  sol: 'cis/trans; no optical isomers; tetrahedral has one arrangement.',
  scheme: [['(a) cis and trans', 1], ['(b) Mirror plane, inactive', 1], ['(c) Tetrahedral', 1]],
  d: 3, c: 'analysis', t: [4],
}));
add('count-short3', short({
  marks: 3,
  stem: 'State the number and type of stereoisomers of (a) square planar [Pt(en)Cl₂], (b) [Co(C₂O₄)₃]³⁻ and (c) [RhCl₃(NH₃)₃].',
  model: '(a) None: the didentate en must span two adjacent (cis) positions, so only one form exists. (b) Two optical isomers (d and l); no geometrical isomers. (c) Two geometrical isomers (fac and mer); neither is optically active.',
  sol: '0; 2 optical; 2 geometrical.',
  scheme: [['(a) None', 1], ['(b) d and l', 1], ['(c) fac and mer', 1]],
  d: 3, c: 'analysis', t: [4],
}));

// ---------------------------------------------------------------- long answers
add('werner-long', long({
  stem: '(a) State the main postulates of Werner’s theory, using the terms primary and secondary valency. [1½]\n\n(b) 0.0050 mol of PtCl₄·3NH₃ gives 0.0050 mol of AgCl with excess silver nitrate. Platinum(IV) has coordination number 6. Write the Werner formula, give its IUPAC name and state how many ions it gives in water. [2]\n\n(c) How would you show by a simple test that Mohr’s salt is a double salt but K₄[Fe(CN)₆] is a complex? [1½]',
  model: '(a) The metal has primary (ionisable) valency equal to its oxidation state, satisfied by anions, and secondary (non-ionisable) valency equal to its coordination number, satisfied by ligands; each metal has a fixed coordination number; secondary valencies are directed in space and give a definite shape.\n\n(b) One Cl⁻ is free: [PtCl₃(NH₃)₃]Cl, triamminetrichloridoplatinum(IV) chloride; 2 ions in water.\n\n(c) Add a reagent for Fe²⁺ (e.g. potassium ferricyanide or NaOH) to each solution: Mohr’s salt gives the test for Fe²⁺ (it dissociates completely), K₄[Fe(CN)₆] does not (iron stays in the complex ion).',
  sol: 'Postulates; [PtCl₃(NH₃)₃]Cl, 2 ions; Fe²⁺ test.',
  scheme: [['(a) Postulates', 1.5], ['(b) Formula', 1], ['(b) Name and ions', 1], ['(c) Test', 1.5]],
  d: 3, c: 'application', t: [1],
}));
add('ligand-long', long({
  stem: '(a) Define, with one example each: ligand, coordination number, chelating ligand and ambidentate ligand. [2]\n\n(b) Find the oxidation state and coordination number of the metal in [Cr(en)(C₂O₄)₂]⁻ and in [Co(NH₃)₄(H₂O)Br]SO₄. [1½]\n\n(c) What is the chelate effect? Illustrate with an example. [1½]',
  model: '(a) Ligand: an ion or molecule that donates an electron pair to the central atom (NH₃). Coordination number: number of donor atoms bonded to the central atom (6 in [Fe(CN)₆]³⁻). Chelating ligand: a polydentate ligand binding one metal through two or more donor atoms to form a ring (en). Ambidentate ligand: can bind through either of two different atoms (NO₂⁻).\n\n(b) For [Cr(en)(C₂O₄)₂]⁻, x + 0 + 2(−2) = −1, x = +3; CN = 2 + 4 = 6. For the cation [Co(NH₃)₄(H₂O)Br]²⁺, x + 0 + 0 − 1 = +2, x = +3; CN = 6.\n\n(c) Complexes of chelating ligands are more stable than similar complexes of unidentate ligands: [Ni(en)₃]²⁺ is much more stable than [Ni(NH₃)₆]²⁺, because removing en needs two bonds to break.',
  sol: 'Definitions; Cr +3 CN 6, Co +3 CN 6; chelate effect.',
  scheme: [['(a) Four definitions with examples', 2], ['(b) Two OS and CN', 1.5], ['(c) Chelate effect', 1.5]],
  d: 2, c: 'understanding', t: [2],
}));
add('naming-long', long({
  stem: '(a) Write the IUPAC names of (i) [Co(NH₃)₆][Cr(CN)₆], (ii) [PtCl₂(NH₃)₄]SO₄ and (iii) Na[Au(CN)₂]. [3]\n\n(b) Write the formulas of (i) tetraaquadichloridochromium(III) nitrate and (ii) ammonium tetrathiocyanato-S-cobaltate(II). [2]',
  model: '(a) (i) Hexaamminecobalt(III) hexacyanidochromate(III). (ii) Tetraamminedichloridoplatinum(IV) sulfate. (iii) Sodium dicyanidoaurate(I).\n\n(b) (i) [CrCl₂(H₂O)₄]NO₃. (ii) (NH₄)₂[Co(SCN)₄].',
  sol: 'Three names; two formulas.',
  scheme: [['(a)(i)', 1], ['(a)(ii)', 1], ['(a)(iii)', 1], ['(b)(i)', 1], ['(b)(ii)', 1]],
  d: 3, c: 'application', t: [3],
}));
add('isomer-long', long({
  stem: '(a) Identify the type of structural isomerism shown by each pair: (i) [Co(NH₃)₅Cl]SO₄ and [Co(NH₃)₅(SO₄)]Cl; (ii) [Co(NH₃)₅(NO₂)]Cl₂ and [Co(NH₃)₅(ONO)]Cl₂; (iii) [Cu(NH₃)₄][PtCl₄] and [Pt(NH₃)₄][CuCl₄]; (iv) [Cr(H₂O)₆]Cl₃ and [CrCl(H₂O)₅]Cl₂·H₂O. [2]\n\n(b) Describe a chemical test to distinguish the two compounds in pair (i). [1]\n\n(c) [Cr(C₂O₄)₃]³⁻ shows optical isomerism. Explain why, and state how the two isomers differ in their effect on plane-polarised light. [2]',
  model: '(a) (i) ionisation; (ii) linkage; (iii) coordination; (iv) hydrate.\n\n(b) BaCl₂ solution gives a white precipitate (BaSO₄) with [Co(NH₃)₅Cl]SO₄ but not with the other; AgNO₃ gives white AgCl with [Co(NH₃)₅(SO₄)]Cl only.\n\n(c) The three didentate oxalate rings form a propeller-like arrangement with no plane or centre of symmetry, so the ion and its mirror image are non-superimposable. The d and l forms rotate plane-polarised light by equal angles in opposite directions.',
  sol: 'Four types; BaCl₂/AgNO₃ test; chiral propeller.',
  scheme: [['(a) Four types', 2], ['(b) Test', 1], ['(c) Reason for chirality', 1], ['(c) Opposite rotation', 1]],
  d: 3, c: 'application', t: [4],
}));
add('stereo-long', long({
  stem: '(a) Show that the octahedral ion [CrCl₂(C₂O₄)₂]³⁻ has three stereoisomers, and state which of them are optically active. [2½]\n\n(b) Why does square planar [Pt(en)Cl₂] show no geometrical isomerism, whereas [PtCl₂(NH₃)₂] does? [1½]\n\n(c) State one important use that depends on the difference between the cis and trans forms of [PtCl₂(NH₃)₂]. [1]',
  model: '(a) The two Cl⁻ ligands can be trans (opposite) or cis (adjacent). The trans isomer has a mirror plane, so it is optically inactive: one isomer. The cis isomer has no mirror plane; it exists as a pair of non-superimposable mirror images (d and l). Total 3 stereoisomers; only the two cis forms are optically active.\n\n(b) In [Pt(en)Cl₂] the short en chain can only span two adjacent positions, so the two Cl⁻ must also be cis — only one arrangement. In [PtCl₂(NH₃)₂] the four unidentate ligands can be arranged with like ligands adjacent (cis) or opposite (trans).\n\n(c) cis-[PtCl₂(NH₃)₂] (cisplatin) is an anticancer drug; the trans isomer is inactive.',
  sol: 'trans + d-cis + l-cis; en spans cis positions; cisplatin.',
  scheme: [['(a) trans inactive', 1], ['(a) cis as d and l; total 3', 1.5], ['(b) Explanation', 1.5], ['(c) Cisplatin', 1]],
  d: 4, c: 'analysis', t: [4],
}));
