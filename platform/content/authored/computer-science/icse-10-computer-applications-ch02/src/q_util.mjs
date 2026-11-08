// Shared helpers for the chapter 2 question files. Every value a student sees is produced by running Java.
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
/** Output of a fragment or program. */
export const out = (...lines) => javaOut(code(...lines));
export const oic = (...lines) => ic(out(...lines));
/** Output with line breaks shown as " / " so that it fits in an option. */
export const oline = (...lines) => ic(out(...lines).split('\n').join(' / '));
export const distinct = (opts) => {
  if (new Set(opts).size !== opts.length) throw new Error(`duplicate options: ${opts.join(' | ')}`);
  return opts;
};
/** Stops the build unless the fragment compiles (it is run as well, so it must not fail at run time). */
export const mustCompile = (src, what) => {
  const r = runJava(src);
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
/** Sizes in bits of the primitive wrappers, read from Java. */
export const SIZES = (() => {
  const t = out('System.out.println(Byte.SIZE + " " + Short.SIZE + " " + Integer.SIZE + " " + Long.SIZE + " " + Float.SIZE + " " + Double.SIZE + " " + Character.SIZE);').split(' ').map(Number);
  return { byte: t[0], short: t[1], int: t[2], long: t[3], float: t[4], double: t[5], char: t[6] };
})();
