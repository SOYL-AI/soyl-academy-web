// Shared helpers for the chapter 3 question files. Every value a student sees is produced by running Java.
import { runJava, javaOut, javaErr } from '../../icse-10-computer-applications-ch01/src/lib.mjs';

/** Lines of Java joined into one source string. */
export const code = (...lines) => lines.join('\n');
/** A Java code fence for stems and model answers. */
export const F = (...lines) => '```java\n' + lines.join('\n') + '\n```';
/** Inline code (single line, no backticks inside). */
export const ic = (s) => '`' + s + '`';
export const raw = String.raw;
/** Value of a Java expression, optionally after some set-up statements. */
export const ev = (expr, pre = '') => javaOut(`${pre ? pre + '\n' : ''}System.out.println(${expr});`);
/** Output of a fragment or program. */
export const out = (...lines) => javaOut(code(...lines));
/** Output of a fragment or program that reads the given standard input. */
export const outIn = (stdin, ...lines) => javaOut(code(...lines), { stdin });
/** Real error of a fragment or program that must fail. */
export const errIn = (stdin, kind, ...lines) => javaErr(code(...lines), { stdin, kind });
export const oic = (...lines) => ic(out(...lines));
export const oline = (...lines) => ic(out(...lines).split('\n').join(' / '));
export const distinct = (opts) => {
  if (new Set(opts).size !== opts.length) throw new Error(`duplicate options: ${opts.join(' | ')}`);
  return opts;
};
/** Stops the build unless the fragment compiles (it is run as well, so it must not fail at run time). */
export const mustCompile = (src, what, stdin = '') => {
  const r = runJava(src, { stdin });
  if (r.kind === 'compile') throw new Error(`${what ?? src}: expected to compile but javac said "${r.err}"`);
  return true;
};
/** Stops the build unless the fragment fails to compile; returns javac's message. */
export const mustFail = (src, what) => {
  const r = runJava(src);
  if (r.kind !== 'compile') throw new Error(`${what ?? src}: expected a compile error but it ${r.kind ? 'failed at run time' : 'compiled'}`);
  return r.err;
};
/** Stops the build unless the actual value equals the expected one (used where prose states a result). */
export const expect = (actual, expected, what) => {
  if (String(actual) !== String(expected)) throw new Error(`${what}: Java gave ${JSON.stringify(actual)}, the text assumes ${JSON.stringify(expected)}`);
  return actual;
};
/** Smallest and largest value of an int expression (which may call Math.random()) over many repetitions: [min, max]. */
export const rangeOf = (expr, n = 50000) =>
  out('int min = 1000000, max = -1000000;', `for (int i = 0; i < ${n}; i++) {`, `    int v = ${expr};`, '    if (v < min) min = v;', '    if (v > max) max = v;', '}', 'System.out.println(min + " " + max);').split(' ').map(Number);
const BOX = { Integer: 'int', Double: 'double', Character: 'char', Long: 'long', Float: 'float', Boolean: 'boolean', String: 'String' };
/** Data type of an expression, found by asking Java for the class of the boxed value. */
export const typeOf = (expr, pre = '') => BOX[ev(`((Object) (${expr})).getClass().getSimpleName()`, pre)];
/** Model answer of a program item: the program, the sample input, the real output and the variable table. */
export function progAnswer({ src, stdin, vars }) {
  const result = javaOut(src, { stdin });
  const table = ['| Variable | Data type | Purpose |', '|---|---|---|', ...vars.map(([n, t, p]) => `| ${n} | ${t} | ${p} |`)].join('\n');
  return `${F(src)}\n\n**Sample input:** ${ic(stdin.trim().replace(/\s+/g, ' '))}\n\n**Output:**\n\n\`\`\`\n${result}\n\`\`\`\n\n**Variable description**\n\n${table}`;
}
