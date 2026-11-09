// Small helpers shared by questions.mjs, programs.mjs and build.mjs of ch01.
import { javaOut, javaErr } from './lib.mjs';

/** A Java code fence. */
export const J = (...lines) => '```java\n' + lines.join('\n') + '\n```';
export const T = (s) => '```text\n' + s + '\n```';
export const code = (...lines) => lines.join('\n');
/** Inline code (single line). */
export const ic = (s) => '`' + s + '`';
export const out = (c, o) => javaOut(c, o);
export const outIc = (c, o) => ic(javaOut(c, o));
/** Output with line breaks shown as " / " so it fits in an option. */
export const outLine = (c, o) => ic(javaOut(c, o).split('\n').join(' / '));
export const errMsg = (c, o) => javaErr(c, o).err;
export const distinct = (opts) => {
  if (new Set(opts).size !== opts.length) throw new Error(`duplicate options: ${opts.join(' | ')}`);
  return opts;
};
export const expect = (actual, expected, what) => {
  if (actual !== expected) throw new Error(`${what}: Java printed ${JSON.stringify(actual)}, the text assumes ${JSON.stringify(expected)}`);
  return actual;
};
/** Wraps one statement (or several) in main of a test class, after a small Bulb class. */
export const withBulb = (stmt) => code('class Bulb {', '    int watts;', '}', '', 'public class Test {', '    public static void main(String[] args) {', `        ${stmt}`, '    }', '}');
