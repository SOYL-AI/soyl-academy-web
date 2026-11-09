// Shared helpers for the chapter 4 question files. Every value a student sees is produced by running Java.
import { runJava, javaOut } from '../../icse-10-computer-applications-ch01/src/lib.mjs';

/** Lines of Java joined into one source string. */
export const code = (...lines) => lines.join('\n');
/** A Java code fence for stems and model answers. */
export const F = (...lines) => '```java\n' + lines.join('\n') + '\n```';
/** Inline code (single line, no backticks inside). */
export const ic = (s) => '`' + s + '`';
export const raw = String.raw;
/** Value of a Java expression, optionally after some set-up statements. */
export const ev = (expr, pre = '') => javaOut(`${pre ? pre + '\n' : ''}System.out.println(${expr});`);
/** Output of a fragment or program (optionally fed with standard input). */
export const out = (src, stdin) => javaOut(Array.isArray(src) ? src.join('\n') : src, stdin === undefined ? undefined : { stdin });
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
/** Stops the build unless the actual value equals the expected one (used where prose states a result). */
export const expect = (actual, expected, what) => {
  if (String(actual) !== String(expected)) throw new Error(`${what}: Java gave ${JSON.stringify(actual)}, the text assumes ${JSON.stringify(expected)}`);
  return actual;
};
/** Model answer of a program item: the program, the sample input, the real output(s) and the variable table. */
export function prog({ src, stdin, also = [], vars }) {
  const show = (s) => s.trim().replace(/\s+/g, ' ');
  const result = javaOut(src, { stdin });
  const table = ['| Variable | Data type | Purpose |', '|---|---|---|', ...vars.map(([n, t, p]) => `| ${n} | ${t} | ${p} |`)].join('\n');
  const extra = also.map((s) => `\n\n**Another run, input** ${ic(show(s))}**:**\n\n\`\`\`\n${javaOut(src, { stdin: s })}\n\`\`\``).join('');
  return `${F(src)}\n\n**Sample input:** ${ic(show(stdin))}\n\n**Output:**\n\n\`\`\`\n${result}\n\`\`\`${extra}\n\n**Variable description**\n\n${table}`;
}
export const S15 = (a, b, c, d, e) => [
  ['Class header, main method and braces correct', a],
  ['Scanner imported and used to read the input', b],
  [c, 6],
  ['Output statements with clear messages', d],
  ['Variable description or comments', e],
];
