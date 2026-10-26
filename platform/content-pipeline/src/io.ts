import fs from 'node:fs';
import path from 'node:path';

export function writeJson(file: string, value: unknown): void {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const tmp = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, `${JSON.stringify(value, null, 2)}\n`);
  fs.renameSync(tmp, file);
}

export function readJsonIf<T = unknown>(file: string): T | undefined {
  return fs.existsSync(file) ? (JSON.parse(fs.readFileSync(file, 'utf8')) as T) : undefined;
}

/** Fixed-width text table. */
export function table(headers: string[], rows: (string | number)[][], align: ('l' | 'r')[] = []): string {
  const cells = [headers, ...rows.map((r) => r.map(String))];
  const widths = headers.map((_, i) => Math.max(...cells.map((r) => (r[i] ?? '').length)));
  const fmt = (r: string[]) =>
    r.map((c, i) => (align[i] === 'r' ? c.padStart(widths[i]!) : c.padEnd(widths[i]!))).join('  ').trimEnd();
  return [fmt(headers), widths.map((w) => '-'.repeat(w)).join('  '), ...cells.slice(1).map(fmt)].join('\n');
}

export function inr(paise: number, digits = 2): string {
  return `₹${(paise / 100).toLocaleString('en-IN', { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;
}
