// Shared helpers for the chapter 12 question files. Every value a student sees is produced by running Java.
import { runJava, javaOut } from '../../icse-10-computer-applications-ch01/src/lib.mjs';

/** Lines of Java joined into one source string (an array argument is spliced in). */
export const code = (...lines) => lines.flat().join('\n');
/** A Java code fence for stems and model answers. */
export const F = (...lines) => '```java\n' + lines.flat().join('\n') + '\n```';
/** Inline code (single line, no backticks inside). */
export const ic = (s) => '`' + s + '`';
/** Strips trailing blanks of every output line (the checker ignores them; the page should not show them). */
const trimLines = (s) => s.split('\n').map((l) => l.replace(/[ \t]+$/, '')).join('\n');
/** Value of a Java expression, optionally after some set-up statements. */
export const ev = (expr, pre = '') => trimLines(javaOut(`${pre ? pre + '\n' : ''}System.out.println(${expr});`));
/** Output of a fragment or program (optionally fed with standard input). */
export const out = (src, stdin) => trimLines(javaOut(Array.isArray(src) ? src.join('\n') : src, stdin === undefined ? undefined : { stdin }));
/** Output with line breaks shown as " / " so that it fits in an option. */
export const oline = (src, stdin) => out(src, stdin).split('\n').join(' / ');
export const oic = (src, stdin) => ic(oline(src, stdin));
export const distinct = (opts) => {
  if (new Set(opts).size !== opts.length) throw new Error(`duplicate options: ${opts.join(' | ')}`);
  return opts;
};
/** Stops the build unless the fragment compiles (it is run as well, so it must not fail at run time). */
export const mustCompile = (src, what, stdin) => {
  const r = runJava(src, stdin === undefined ? undefined : { stdin });
  if (r.kind === 'compile') throw new Error(`${what ?? src}: expected to compile but javac said "${r.err}"`);
  return true;
};
/** Stops the build unless the fragment fails to compile; returns javac's message. */
export const mustFail = (src, what) => {
  const r = runJava(src);
  if (r.kind !== 'compile') throw new Error(`${what ?? src}: expected a compile error but it ${r.kind ? 'failed at run time' : 'compiled'}`);
  return r.err;
};
/** Message of an exception that the fragment must throw at run time. */
export const mustThrow = (src, what, stdin) => {
  const r = runJava(src, stdin === undefined ? undefined : { stdin });
  if (r.kind !== 'runtime') throw new Error(`${what ?? src}: expected a run-time error but it ${r.kind ? 'did not compile' : 'ran cleanly'}`);
  return r.err;
};
/** Stops the build unless the actual value equals the expected one (used where prose states a result). */
export const expect = (actual, expected, what) => {
  if (String(actual) !== String(expected)) throw new Error(`${what}: Java gave ${JSON.stringify(actual)}, the text assumes ${JSON.stringify(expected)}`);
  return actual;
};
/** Model answer of a program item: the program, the sample input, the real output(s) and the variable table. */
export function prog({ src, stdin, also = [], vars }) {
  const show = (s) => s.trim().replace(/\s+/g, ' ');
  const table = ['| Variable | Data type | Purpose |', '|---|---|---|', ...vars.map(([n, t, p]) => `| ${n} | ${t} | ${p} |`)].join('\n');
  const extra = also.map((s) => `\n\n**Another run, input** ${ic(show(s))}**:**\n\n\`\`\`\n${out(src, s)}\n\`\`\``).join('');
  return `${F(src)}\n\n**Sample input:** ${ic(show(stdin))}\n\n**Output:**\n\n\`\`\`\n${out(src, stdin)}\n\`\`\`${extra}\n\n**Variable description**\n\n${table}`;
}
export const S15 = (a, b, c, d, e) => [
  ['Class header, main method and braces correct', a],
  ['Scanner imported and used to read the input', b],
  [c, 6],
  ['Output statements with clear messages', d],
  ['Variable description or comments', e],
];

// ---- matrix helpers (all programs are built from these so the data stays in one place)
/** Declaration of a double-dimensional array with an initialiser list, one row per line. */
export const dcl = (name, rows, type = 'int') => [
  `${type}[][] ${name} = {`,
  ...rows.map((r, i) => `    {${r.join(', ')}}${i < rows.length - 1 ? ',' : ''}`),
  '};',
];
/** Nested loops that display `name` in matrix format (a blank after each element, a new line after each row). */
export const showM = (name, sep = ' ') => [
  `for (int i = 0; i < ${name}.length; i++) {`,
  `    for (int j = 0; j < ${name}[i].length; j++)`,
  `        System.out.print(${name}[i][j] + "${sep}");`,
  '    System.out.println();',
  '}',
];
