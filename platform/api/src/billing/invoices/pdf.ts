/**
 * A minimal, dependency-free PDF 1.4 writer for invoices (ADR-024): one A4 page, the two standard Type 1
 * fonts Helvetica and Helvetica-Bold (built into every PDF reader, so nothing is embedded), text, lines
 * and filled rectangles. Content streams are uncompressed, so tests can read the text back
 * (`extractPdfText`). Text is limited to WinAnsi (Latin-1 plus a few punctuation marks); anything else
 * is replaced with "?" (e.g. a name typed in Devanagari) and the rupee sign is written "Rs.".
 */

/** Helvetica advance widths (1/1000 em) for ASCII 32–126 (Adobe AFM). */
const HELVETICA = [
  278, 278, 355, 556, 556, 889, 667, 191, 333, 333, 389, 584, 278, 333, 278, 278, 556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 278, 278, 584, 584, 584, 556, 1015, 667, 667, 722, 722, 667, 611, 778, 722,
  278, 500, 667, 556, 833, 722, 778, 667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 278, 278, 278, 469, 556, 333, 556, 556, 500, 556, 556, 278, 556, 556, 222, 222, 500, 222, 833, 556, 556, 556, 556,
  333, 500, 278, 556, 500, 722, 500, 500, 500, 334, 260, 334, 584,
];
/** Helvetica-Bold advance widths for ASCII 32–126. */
const HELVETICA_BOLD = [
  278, 333, 474, 556, 556, 889, 722, 238, 333, 333, 389, 584, 278, 333, 278, 278, 556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 333, 333, 584, 584, 584, 611, 975, 722, 722, 722, 722, 667, 611, 778, 722,
  278, 556, 722, 611, 833, 722, 778, 667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 333, 278, 333, 584, 556, 333, 556, 611, 556, 611, 556, 333, 611, 611, 278, 278, 556, 278, 889, 611, 611, 611, 611,
  389, 556, 333, 611, 556, 778, 556, 556, 500, 389, 280, 389, 584,
];

export type Font = 'regular' | 'bold';

/** Unicode → WinAnsi bytes for the characters we print; everything else becomes "?". */
const WIN_ANSI: Record<string, number> = { '–': 0x96, '—': 0x97, '‘': 0x91, '’': 0x92, '“': 0x93, '”': 0x94, '•': 0x95, '…': 0x85, '€': 0x80 };

export function toWinAnsi(s: string): number[] {
  const out: number[] = [];
  for (const ch of s.replace(/₹/g, 'Rs.')) {
    const c = ch.codePointAt(0)!;
    if (c >= 0x20 && c <= 0x7e) out.push(c);
    else if (WIN_ANSI[ch] !== undefined) out.push(WIN_ANSI[ch]!);
    else if (c >= 0xa0 && c <= 0xff) out.push(c);
    else if (c === 0x09 || c === 0x0a || c === 0x0d) out.push(0x20);
    else out.push(0x3f);
  }
  return out;
}

export function textWidth(s: string, size: number, font: Font = 'regular'): number {
  const table = font === 'bold' ? HELVETICA_BOLD : HELVETICA;
  let w = 0;
  for (const b of toWinAnsi(s)) w += b >= 32 && b <= 126 ? table[b - 32]! : 556;
  return (w * size) / 1000;
}

/** PDF string literal: escape \ ( ) and write non-ASCII WinAnsi bytes as octal escapes. */
function pdfString(s: string): string {
  let out = '(';
  for (const b of toWinAnsi(s)) {
    if (b === 0x5c || b === 0x28 || b === 0x29) out += `\\${String.fromCharCode(b)}`;
    else if (b < 0x80) out += String.fromCharCode(b);
    else out += `\\${b.toString(8).padStart(3, '0')}`;
  }
  return `${out})`;
}

const num = (n: number) => (Math.round(n * 100) / 100).toString();

export const A4 = { width: 595.28, height: 841.89 } as const;

/** Drawing on one page, origin top-left (converted to PDF's bottom-left). */
export class PdfPage {
  private ops: string[] = [];

  text(s: string, x: number, y: number, o: { size?: number; font?: Font; align?: 'left' | 'right' | 'center'; gray?: number } = {}): void {
    const size = o.size ?? 10;
    const font = o.font ?? 'regular';
    const w = textWidth(s, size, font);
    const left = o.align === 'right' ? x - w : o.align === 'center' ? x - w / 2 : x;
    const g = o.gray ?? 0;
    this.ops.push(`BT /${font === 'bold' ? 'F2' : 'F1'} ${num(size)} Tf ${num(g)} g 1 0 0 1 ${num(left)} ${num(A4.height - y)} Tm ${pdfString(s)} Tj ET`);
  }

  /** Wraps text into lines no wider than `width`; returns the lines drawn. */
  wrap(s: string, x: number, y: number, width: number, o: { size?: number; font?: Font; leading?: number; gray?: number } = {}): number {
    const size = o.size ?? 10;
    const leading = o.leading ?? size * 1.3;
    const words = s.split(/\s+/).filter(Boolean);
    let line = '';
    let lines = 0;
    const flush = () => {
      if (!line) return;
      this.text(line, x, y + lines * leading, o);
      lines++;
      line = '';
    };
    for (const w of words) {
      const next = line ? `${line} ${w}` : w;
      if (textWidth(next, size, o.font) > width && line) {
        flush();
        line = w;
      } else line = next;
    }
    flush();
    return lines;
  }

  line(x1: number, y1: number, x2: number, y2: number, o: { width?: number; gray?: number } = {}): void {
    this.ops.push(`${num(o.gray ?? 0)} G ${num(o.width ?? 0.5)} w ${num(x1)} ${num(A4.height - y1)} m ${num(x2)} ${num(A4.height - y2)} l S`);
  }

  rect(x: number, y: number, w: number, h: number, o: { fillGray: number }): void {
    this.ops.push(`${num(o.fillGray)} g ${num(x)} ${num(A4.height - y - h)} ${num(w)} ${num(h)} re f`);
  }

  content(): string {
    return this.ops.join('\n');
  }
}

/** Serialises one page into a complete PDF (header, objects, xref with exact offsets, trailer). */
export function buildPdf(page: PdfPage, meta: { title: string; createdAt: Date }): Buffer {
  const content = Buffer.from(page.content(), 'latin1');
  const d = meta.createdAt.toISOString().replace(/[-:T]/g, '').slice(0, 14);
  const objects: Buffer[] = [
    Buffer.from('<< /Type /Catalog /Pages 2 0 R >>', 'latin1'),
    Buffer.from('<< /Type /Pages /Kids [3 0 R] /Count 1 >>', 'latin1'),
    Buffer.from(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${A4.width} ${A4.height}] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>`, 'latin1'),
    Buffer.from('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>', 'latin1'),
    Buffer.from('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>', 'latin1'),
    Buffer.concat([Buffer.from(`<< /Length ${content.length} >>\nstream\n`, 'latin1'), content, Buffer.from('\nendstream', 'latin1')]),
    Buffer.from(`<< /Title ${pdfString(meta.title)} /Producer (SOYL Academy) /CreationDate (D:${d}Z) >>`, 'latin1'),
  ];
  const parts: Buffer[] = [Buffer.from('%PDF-1.4\n%\xe2\xe3\xcf\xd3\n', 'latin1')];
  let offset = parts[0]!.length;
  const offsets: number[] = [];
  objects.forEach((body, i) => {
    offsets.push(offset);
    const obj = Buffer.concat([Buffer.from(`${i + 1} 0 obj\n`, 'latin1'), body, Buffer.from('\nendobj\n', 'latin1')]);
    parts.push(obj);
    offset += obj.length;
  });
  const xref = [`xref\n0 ${objects.length + 1}\n`, '0000000000 65535 f \n', ...offsets.map((o) => `${String(o).padStart(10, '0')} 00000 n \n`)].join('');
  parts.push(Buffer.from(`${xref}trailer\n<< /Size ${objects.length + 1} /Root 1 0 R /Info 7 0 R >>\nstartxref\n${offset}\n%%EOF\n`, 'latin1'));
  return Buffer.concat(parts);
}

/**
 * The text drawn by `Tj` operators, in drawing order, decoded from WinAnsi (tests and support tooling).
 * Only understands what PdfPage writes.
 */
export function extractPdfText(pdf: Buffer): string[] {
  const src = pdf.toString('latin1');
  const out: string[] = [];
  const re = /\((?:\\.|[^\\)])*\) Tj/g;
  const rev: Record<number, string> = Object.fromEntries(Object.entries(WIN_ANSI).map(([k, v]) => [v, k]));
  for (const m of src.match(re) ?? []) {
    const lit = m.slice(1, m.lastIndexOf(') Tj'));
    let s = '';
    for (let i = 0; i < lit.length; i++) {
      const c = lit[i]!;
      if (c !== '\\') {
        s += c;
        continue;
      }
      const oct = /^[0-7]{3}/.exec(lit.slice(i + 1));
      if (oct) {
        const b = parseInt(oct[0], 8);
        s += rev[b] ?? String.fromCharCode(b);
        i += 3;
      } else {
        s += lit[i + 1];
        i++;
      }
    }
    out.push(s);
  }
  return out;
}
