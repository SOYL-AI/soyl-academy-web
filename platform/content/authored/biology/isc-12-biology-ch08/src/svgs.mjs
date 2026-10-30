// SVG diagrams for ISC 12 Biology ch08 (gene expression, Human Genome Project, DNA fingerprinting). TRUNIT, LAC and GEL are
// copied from cbse-12-biology-ch05/src/svgs.mjs (same author); SPLICING and TRANSLATION are new for ISC. Codons, amino acids
// and anticodons in TRANSLATION are computed from calc.mjs.
import { svgDoc, S } from '../../isc-12-biology-ch01/src/lib.mjs';
import { codon } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

// 5. Transcription unit
export const TRUNIT = svgDoc(
  460,
  180,
  'A transcription unit: a promoter upstream, the structural gene, and a terminator downstream; the template strand runs 3 prime to 5 prime and the coding strand 5 prime to 3 prime; RNA is made 5 prime to 3 prime with the same sequence as the coding strand except that U replaces T',
  [
    S.line(40, 60, 420, 60, { w: 3 }),
    S.line(40, 90, 420, 90, { w: 3, c: 'var(--diagram-blue)' }),
    S.rect(60, 50, 70, 50, { fill: 'var(--diagram-yellow)', fop: 0.35, sw: 1 }),
    S.rect(130, 50, 200, 50, { fill: 'var(--diagram-green)', fop: 0.2, sw: 1 }),
    S.rect(330, 50, 70, 50, { fill: 'var(--diagram-red)', fop: 0.25, sw: 1 }),
    S.text(95, 44, 'Promoter', { a: 'middle', size: 11, w: 'bold' }),
    S.text(230, 44, 'Structural gene', { a: 'middle', size: 11, w: 'bold' }),
    S.text(365, 44, 'Terminator', { a: 'middle', size: 11, w: 'bold' }),
    S.text(30, 64, "5′", { a: 'end', size: 11 }), S.text(430, 64, "3′", { size: 11 }),
    S.text(30, 94, "3′", { a: 'end', size: 11, c: 'var(--diagram-blue)' }), S.text(430, 94, "5′", { size: 11, c: 'var(--diagram-blue)' }),
    lab(40, 20, 'Coding strand (5′ → 3′)'),
    lab(40, 116, 'Template strand (3′ → 5′)', { c: 'var(--diagram-blue)' }),
    S.arrow(140, 140, 320, 140, { w: 2.5, c: 'var(--diagram-accent)' }),
    lab(140, 160, 'RNA made 5′ → 3′, copying the template', { c: 'var(--diagram-accent)' }),
  ].join(''),
);

// 6. lac operon off and on
const genes = (y) => [['i', 20, 50, 'var(--diagram-muted)'], ['p', 100, 30, 'var(--diagram-yellow)'], ['o', 130, 30, 'var(--diagram-red)'], ['z', 160, 80, 'var(--diagram-green)'], ['y', 240, 80, 'var(--diagram-green)'], ['a', 320, 80, 'var(--diagram-green)']]
  .map(([g, x, w, c]) => S.rect(x, y, w, 24, { fill: c, fop: 0.3, sw: 1 }) + S.text(x + w / 2, y + 16, g, { a: 'middle', size: 12, w: 'bold', it: true })).join('') + S.line(10, y + 12, 410, y + 12, { w: 1 });
export const LAC = svgDoc(
  440,
  250,
  'The lac operon. Top, no lactose: the regulatory gene i makes a repressor that binds the operator, so RNA polymerase cannot transcribe the structural genes z, y and a. Bottom, lactose present: the inducer binds the repressor, which can no longer bind the operator, so the genes are transcribed and beta-galactosidase, permease and transacetylase are made',
  [
    S.text(10, 18, 'No lactose: operon switched off', { size: 12, w: 'bold' }),
    genes(40),
    S.path('M128 34 C132 22 152 22 156 34 Z', { fill: 'var(--diagram-red)', fop: 0.7, w: 1 }),
    lab(170, 30, 'Repressor bound to operator: no transcription', { size: 10 }),
    S.text(10, 112, 'Lactose present: operon switched on', { size: 12, w: 'bold' }),
    genes(134),
    S.path('M60 190 C64 178 84 178 88 190 Z', { fill: 'var(--diagram-red)', fop: 0.7, w: 1 }),
    S.circle(74, 182, 4, { fill: 'var(--diagram-blue)', sw: 0 }),
    lab(96, 194, 'Inducer bound: repressor inactive', { size: 10 }),
    S.ellipse(118, 128, 16, 9, { fill: 'var(--diagram-blue)', fop: 0.35, sw: 1 }),
    lab(96, 122, 'RNA polymerase', { a: 'end', size: 10 }),
    S.arrow(160, 166, 400, 166, { w: 2, c: 'var(--diagram-accent)' }),
    lab(170, 182, 'z, y and a transcribed: enzymes made', { size: 10, c: 'var(--diagram-accent)' }),
    lab(10, 236, 'i: regulatory gene; p: promoter; o: operator; z, y, a: structural genes.', { size: 10 }),
  ].join(''),
);

// 7. DNA fingerprint gel (computed: child's bands come half from each parent)
const MOTHER = [40, 75, 120, 160];
const FATHER = [55, 95, 130, 170];
const OTHER = [48, 88, 140, 178];
const CHILD = [MOTHER[0], FATHER[1], MOTHER[2], FATHER[3]];
export const LANES = { MOTHER, FATHER, OTHER, CHILD };
export const GEL = svgDoc(
  420,
  240,
  'A DNA fingerprint gel with four lanes: mother, child, man P and man Q. Every band in the child matches a band in either the mother or man P, while the child’s non-maternal bands are absent from man Q, so man P is the biological father',
  [
    ...[['Mother', MOTHER], ['Child', CHILD], ['Man P', FATHER], ['Man Q', OTHER]].map(([name, bands], i) => {
      const x = 70 + i * 90;
      return S.rect(x - 28, 30, 56, 170, { fill: 'var(--diagram-fill)', sw: 1 }) + S.text(x, 22, name, { a: 'middle', size: 11, w: 'bold' }) + bands.map((y) => S.rect(x - 22, 30 + y * 0.9, 44, 6, { fill: 'currentColor', sw: 0 })).join('');
    }),
    S.text(210, 220, 'Bands = VNTR fragments of different sizes, revealed by a labelled probe', { a: 'middle', size: 10 }),
    S.text(210, 234, 'Larger fragments near the top (start); smaller ones travel further', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);


// ---------------------------------------------------------------- new for ISC ch08
// 8. Processing of hnRNA: splicing, capping and tailing
const EX = [[40, 70, 'Exon 1'], [170, 80, 'Exon 2'], [320, 80, 'Exon 3']];
export const SPLICING = svgDoc(
  460,
  230,
  'Processing of hnRNA in eukaryotes: the primary transcript has exons separated by introns; the introns are removed and the exons joined (splicing), a methyl guanosine cap is added at the 5 prime end (capping) and a poly-A tail at the 3 prime end (tailing), giving mature mRNA that leaves the nucleus',
  [
    S.text(10, 14, 'hnRNA (primary transcript)', { size: 12, w: 'bold' }),
    S.text(20, 50, '5′', { a: 'end', size: 11 }), S.text(408, 50, '3′', { size: 11 }),
    ...EX.map(([x, w, t]) => S.rect(x, 34, w, 24, { fill: 'var(--diagram-green)', fop: 0.3, sw: 1 }) + S.text(x + w / 2, 50, t, { a: 'middle', size: 10, w: 'bold' })),
    S.path('M110 46 C125 18 155 18 170 46', { c: 'var(--diagram-red)', w: 2 }),
    S.path('M250 46 C270 18 300 18 320 46', { c: 'var(--diagram-red)', w: 2 }),
    S.text(140, 42, 'intron', { a: 'middle', size: 10, c: 'var(--diagram-red)' }),
    S.text(285, 42, 'intron', { a: 'middle', size: 10, c: 'var(--diagram-red)' }),
    S.arrow(220, 70, 220, 112, { w: 2, c: 'var(--diagram-accent)' }),
    lab(232, 86, 'Splicing: introns removed, exons joined', { size: 10, c: 'var(--diagram-accent)' }),
    lab(232, 100, 'Capping at 5′ end; tailing at 3′ end', { size: 10, c: 'var(--diagram-accent)' }),
    S.text(10, 134, 'Mature mRNA', { size: 12, w: 'bold' }),
    S.circle(62, 160, 12, { fill: 'var(--diagram-yellow)', fop: 0.6, sw: 1 }), S.text(62, 164, 'cap', { a: 'middle', size: 10 }),
    S.rect(74, 148, 70, 24, { fill: 'var(--diagram-green)', fop: 0.3, sw: 1 }), S.text(109, 164, 'Exon 1', { a: 'middle', size: 10, w: 'bold' }),
    S.rect(144, 148, 80, 24, { fill: 'var(--diagram-green)', fop: 0.3, sw: 1 }), S.text(184, 164, 'Exon 2', { a: 'middle', size: 10, w: 'bold' }),
    S.rect(224, 148, 80, 24, { fill: 'var(--diagram-green)', fop: 0.3, sw: 1 }), S.text(264, 164, 'Exon 3', { a: 'middle', size: 10, w: 'bold' }),
    S.text(310, 164, 'AAAAAA…', { size: 11, w: 'bold', c: 'var(--diagram-blue)' }),
    lab(30, 194, '5′ cap: methyl guanosine triphosphate', { size: 10 }),
    lab(270, 194, 'Poly-A tail: 200–300 adenylates', { size: 10, c: 'var(--diagram-blue)' }),
    S.text(230, 220, 'Processing happens in the nucleus; mature mRNA then moves to the cytoplasm', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 9. Translation on a ribosome (codons, amino acids and anticodons computed)
export const MRNA = ['AUG', 'UUC', 'GGA', 'UGG', 'UAA'];
const RNA_PAIR = { A: 'U', U: 'A', G: 'C', C: 'G' };
/** Anticodon written 3′→5′ under its codon. */
export const anticodon = (c) => Array.from(c).map((b) => RNA_PAIR[b]).join('');
const cx = (i) => 90 + i * 60;
const trna = (i, aa) =>
  S.line(cx(i), 74, cx(i), 112, { w: 2, c: 'var(--diagram-accent)' }) +
  S.rect(cx(i) - 22, 112, 44, 18, { rx: 4, fill: 'var(--diagram-accent)', fop: 0.25, sw: 1 }) +
  S.text(cx(i), 125, anticodon(MRNA[i]), { a: 'middle', size: 10, w: 'bold' }) +
  S.circle(cx(i), 62, 12, { fill: 'var(--diagram-blue)', fop: 0.35, sw: 1 }) + S.text(cx(i), 66, aa, { a: 'middle', size: 10, w: 'bold' });
export const TRANSLATION = svgDoc(
  460,
  230,
  `Translation on a ribosome: the mRNA codons ${MRNA.join(', ')} are read 5 prime to 3 prime. The first codon AUG coded ${codon(MRNA[0])}; a tRNA in the P site carries the growing chain ending in ${codon(MRNA[1])}, and a tRNA in the A site brings ${codon(MRNA[2])}, its anticodon pairing with the codon. A peptide bond joins the amino acids, the ribosome moves one codon towards the 3 prime end, and translation stops at the stop codon ${MRNA[4]}`,
  [
    S.rect(110, 80, 140, 56, { rx: 22, fill: 'var(--diagram-muted)', fop: 0.15, sw: 1 }),
    S.rect(110, 154, 140, 26, { rx: 12, fill: 'var(--diagram-muted)', fop: 0.15, sw: 1 }),
    lab(256, 96, 'Large subunit', { size: 10 }),
    lab(256, 176, 'Small subunit', { size: 10 }),
    S.circle(118, 34, 12, { fill: 'var(--diagram-blue)', fop: 0.35, sw: 1 }), S.text(118, 38, codon(MRNA[0]), { a: 'middle', size: 10, w: 'bold' }),
    S.line(127, 42, 141, 54, { w: 1.5 }),
    trna(1, codon(MRNA[1])),
    trna(2, codon(MRNA[2])),
    S.path('M162 60 Q180 46 198 60', { w: 1.2, dash: '3 3' }),
    lab(270, 40, 'Peptide bond forms between', { size: 10 }),
    lab(270, 54, 'the chain and the new amino acid', { size: 10 }),
    S.line(40, 150, 420, 150, { w: 2.5 }),
    S.text(34, 154, '5′', { a: 'end', size: 11 }), S.text(426, 154, '3′', { size: 11 }),
    ...MRNA.map((c, i) => S.text(cx(i), 145, c, { a: 'middle', size: 11, w: 'bold' }) + (i ? S.line(cx(i) - 30, 136, cx(i) - 30, 150, { w: 0.8, c: 'var(--diagram-muted)' }) : '')),
    S.text(cx(4), 128, 'stop', { a: 'middle', size: 10, c: 'var(--diagram-red)' }),
    S.text(cx(1), 198, 'P site', { a: 'middle', size: 10, w: 'bold' }),
    S.text(cx(2), 198, 'A site', { a: 'middle', size: 10, w: 'bold' }),
    S.arrow(280, 214, 420, 214, { w: 2, c: 'var(--diagram-accent)' }),
    lab(30, 218, 'Ribosome moves one codon at a time towards 3′', { size: 10, c: 'var(--diagram-accent)' }),
  ].join(''),
);

export const ALL = { TRUNIT, SPLICING, TRANSLATION, LAC, GEL };
