// Build ICSE 10 Computer Applications ch09 "Library Classes: Wrapper Classes". Run from platform/:
//   npx tsx content/authored/computer-science/icse-10-computer-applications-ch09/src/build.mjs
// Every program output, value and error shown in decks, notes, flashcards and questions is produced by running Java.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg, useJavaCache, runJava, javaErr } from '../../icse-10-computer-applications-ch01/src/lib.mjs';

const SRC = path.dirname(fileURLToPath(import.meta.url));
setUnit('icse-10-computer-applications-ch09', 'computer-science');
useJavaCache(SRC);
const A = await import('./q_a.mjs');
const B = await import('./q_b.mjs');
const C = await import('./q_c.mjs');
const { code, F, ic, ev, out, mustCompile, mustFail, expect } = await import('./q_util.mjs');
const DIR = path.resolve(SRC, '..');

/** Value of an expression, or the exception it throws (as shown by Java). */
const res = (call) => {
  const r = runJava(`System.out.println(${call});`);
  if (r.kind === 'compile') throw new Error(`${call}: compile error ${r.err}`);
  return r.kind === 'runtime' ? r.err : r.out;
};
/** Short name of an exception from its real message. */
const exc = (call) => {
  const m = res(call);
  return /^java\./.test(m) ? m.split(':')[0].replace('java.lang.', '') : m;
};
const trace = (lines, v, upTo) => ev(v, lines.slice(0, upTo).join('\n'));

// ---------------------------------------------------------------- snippets that only the slides use
const cBoxLines = code('int fee = 120;', 'Integer paid = fee;', 'int left = 500 - paid;', 'System.out.println(left);');
const cAmounts = code('Scanner sc = new Scanner(System.in);', 'String a = sc.next();', 'String b = sc.next();', 'double sum = Double.parseDouble(a) + Double.parseDouble(b);', 'System.out.println(sum);');
const cLoopOf = (s) => code(
  `String s = "${s}";`,
  'int letters = 0, digits = 0, others = 0;',
  'for (int i = 0; i < s.length(); i++) {',
  '    char ch = s.charAt(i);',
  '    if (Character.isLetter(ch))',
  '        letters++;',
  '    else if (Character.isDigit(ch))',
  '        digits++;',
  '    else',
  '        others++;',
  '}',
  'System.out.println(letters + " " + digits + " " + others);',
);
const cLoopSkeleton = code(
  'for (int i = 0; i < s.length(); i++) {',
  '    char ch = s.charAt(i);',
  '    // test ch with the Character methods',
  '    // and increase the matching counter',
  '}',
);

// ---------------------------------------------------------------- facts the narration states in words; stop if Java disagrees
expect(out(A.srcKite), 'red 30', 'kite');
expect(out(A.cDerefOk), '5', 'toString on Integer');
expect(ev('Integer.MAX_VALUE > 2000000000'), 'true', 'max int');
expect(ev('boxed + 2', 'Integer boxed = 40;'), '42', 'boxed plus two');
expect(ev('boxed > 30', 'Integer boxed = 40;'), 'true', 'boxed greater');
expect(ev('boxed * 1.5', 'Integer boxed = 40;'), '60.0', 'boxed times 1.5');
expect(out(A.cBoxChain), '35 70', 'chain');
expect(out(cBoxLines), '380', 'left');
expect(ev('"20" + "5"'), '205', 'text plus');
expect(ev('Integer.parseInt("20") + Integer.parseInt("5")'), '25', 'parsed plus');
expect(out(cAmounts, '120.50 79.50\n'), '200.0', 'amounts 1');
expect(out(cAmounts, '10 15\n'), '25.0', 'amounts 2');
expect(ev('Integer.parseInt("+7")'), '7', 'plus seven');
expect(ev('Double.parseDouble("3")'), '3.0', 'parse double three');
expect(ev("(int) Character.toUpperCase('d')"), '68', 'code of D');
expect(ev("Character.toUpperCase('d') + 1"), '69', 'D plus one');
expect(ev("(char) (Character.toUpperCase('d') + 1)"), 'E', 'cast E');
expect(out(cLoopOf('Bay 9A#')), '4 1 2', 'loop of Bay 9A#');
mustCompile(cBoxLines, 'box lines');

// ---------------------------------------------------------------- SVG helpers
const box = (s, x, y, w, h, o = {}) => s.rect(x, y, w, h, { rx: o.rx ?? 10, fill: 'fill', color: o.color ?? 'accent', sw: o.sw ?? 1.8, dash: o.dash });

// ---------------------------------------------------------------- visuals: Part 1
const vRoute1 = flow('LR', ['Primitive and composite types', 'Wrapper classes', 'Autoboxing', 'Unboxing', 'Matching types and null'], 'Route map of Part 1: primitive and composite types, wrapper classes, autoboxing, unboxing, matching types and null', 'Part 1 at a glance');
const vPrimComp = table(
  ['', 'Primitive type', 'Composite type (a class)'],
  [
    ['Examples', `${ic('int')}, ${ic('char')}, ${ic('double')}, ${ic('boolean')}`, `${ic('String')}, ${ic('Integer')}, a class written by you`],
    ['Holds', 'one simple value', 'several values and methods'],
    ['Methods', 'none', 'yes'],
    ['Created by', 'built into Java (eight types)', 'Java library or the programmer'],
  ],
  'Table comparing primitive types and composite types: examples, what they hold, whether they have methods and who creates them',
);
const vKite = (() => {
  const s = new Svg(440, 190);
  box(s, 20, 14, 400, 162);
  s.text(220, 38, 'k : an object of the type Kite', { size: 15, bold: true });
  s.line(20, 56, 420, 56, { sw: 1.2 });
  s.text(40, 84, 'colour', { anchor: 'start', size: 14, bold: true });
  s.text(150, 84, 'String', { anchor: 'start', size: 14, muted: true });
  s.text(300, 84, 'red', { anchor: 'start', size: 14 });
  s.text(40, 126, 'length', { anchor: 'start', size: 14, bold: true });
  s.text(150, 126, 'int', { anchor: 'start', size: 14, muted: true });
  s.text(300, 126, '30', { anchor: 'start', size: 14 });
  s.text(220, 160, 'one object, two values: a composite type', { size: 12, muted: true });
  return s.visual('Diagram of a Kite object named k with two data members: colour of type String holding red, and length of type int holding 30', 'A class bundles several values into one new type.');
})();
const wrapRows = [['byte', 'Byte', ic('Byte b = 100;')], ['short', 'Short', ic('Short s = 2000;')], ['int', 'Integer', ic('Integer n = 48;')], ['long', 'Long', ic('Long d = 4200000000L;')], ['float', 'Float', ic('Float f = 2.5f;')], ['double', 'Double', ic('Double p = 99.5;')], ['char', 'Character', ic("Character g = 'K';")], ['boolean', 'Boolean', ic('Boolean o = true;')]];
mustCompile(code('Byte b = 100;', 'Short s = 2000;', 'Integer n = 48;', 'Long d = 4200000000L;', 'Float f = 2.5f;', 'Double p = 99.5;', "Character g = 'K';", 'Boolean o = true;'), 'wrapper declarations');
const vWrap = table(['Primitive type', 'Wrapper class', 'Example'], wrapRows, 'Table of the eight primitive types and their wrapper classes: byte Byte, short Short, int Integer, long Long, float Float, double Double, char Character, boolean Boolean, each with a declaration');
const vDecl = table(
  ['Value to store', 'Wrapper class', 'Declaration'],
  [['48', 'Integer', ic('Integer seats = 48;')], ["'K'", 'Character', ic("Character grade = 'K';")], ['true', 'Boolean', ic('Boolean open = true;')], ['99.5', 'Double', ic('Double price = 99.5;')], ['4200000000L', 'Long', ic('Long distance = 4200000000L;')]],
  `Table choosing a wrapper class for each value; the program prints ${out(A.cDecl)}`,
  `Printed together: ${ic(out(A.cDecl))}`,
);
const errDeref = mustFail(A.cDeref, 'dereference');
const vDeref = table(
  ['Code', 'Result'],
  [[ic('int n = 5;  n.toString()'), `compile-time error: ${errDeref}`], [ic('Integer n = 5;  n.toString()'), `prints ${ic(out(A.cDerefOk))}`]],
  `Table showing that a call on an int variable is a compile-time error with the message ${errDeref}, while the same call on an Integer object prints ${out(A.cDerefOk)}`,
  'Only an object can call a method.',
);
const vValueOf = table(
  ['Expression', 'Value'],
  [[ic('Integer.valueOf(25)'), ev('Integer.valueOf(25)')], [ic('Double.valueOf(2.5)'), ev('Double.valueOf(2.5)')], [ic('Integer.MAX_VALUE'), ev('Integer.MAX_VALUE')], [ic('Integer.MIN_VALUE'), ev('Integer.MIN_VALUE')], [ic('Long.MAX_VALUE'), ev('Long.MAX_VALUE')]],
  `Table of wrapper objects and constants: valueOf of 25 gives ${ev('Integer.valueOf(25)')}; the largest int is ${ev('Integer.MAX_VALUE')} and the smallest is ${ev('Integer.MIN_VALUE')}; the largest long is ${ev('Long.MAX_VALUE')}`,
  'The constants give the limits of each type.',
);
const vBoxing = (() => {
  const s = new Svg(580, 230);
  box(s, 30, 70, 170, 90);
  s.text(115, 95, 'int a', { size: 15, bold: true });
  s.text(115, 130, '40', { size: 24 });
  box(s, 380, 40, 170, 150);
  s.text(465, 65, 'Integer boxed', { size: 15, bold: true });
  box(s, 410, 85, 110, 55, { rx: 6, color: 'muted' });
  s.text(465, 112, '40', { size: 22 });
  s.text(465, 165, 'wrapper object', { size: 13, muted: true });
  s.arrow(205, 100, 372, 100, { sw: 2 });
  s.text(290, 84, 'autoboxing', { size: 14, bold: true });
  s.arrow(372, 140, 205, 140, { sw: 2 });
  s.text(290, 160, 'unboxing', { size: 14, bold: true });
  return s.visual('Diagram of boxing: an int variable a holding 40 on the left, an Integer variable boxed holding a wrapper object with 40 on the right; an arrow labelled autoboxing goes from the int to the object and an arrow labelled unboxing goes back', 'Autoboxing puts the value into an object; unboxing takes it out.');
})();
const vUnbox = (() => {
  const pre = 'Integer boxed = 40;';
  return table(
    ['Where the Integer boxed (40) is used', 'Expression', 'Value'],
    [['assigned to an int variable', ic('int x = boxed;'), ev('x', 'Integer boxed = 40; int x = boxed;')], ['in addition', ic('boxed + 2'), ev('boxed + 2', pre)], ['in a comparison', ic('boxed > 30'), ev('boxed > 30', pre)], ['with a double', ic('boxed * 1.5'), ev('boxed * 1.5', pre)]],
    'Table of unboxing in four places for an Integer holding 40: assignment to an int gives 40, addition of 2 gives 42, comparison with 30 gives true, multiplication by 1.5 gives 60.0',
    'In each case the number is taken out of the object first.',
  );
})();
const chainLines = A.cBoxChain.split('\n');
const vTrace = table(
  ['Statement', 'What Java does', 'Value after'],
  [
    [ic(chainLines[0]), 'primitive only', `base is ${trace(chainLines, 'base', 1)}`],
    [ic(chainLines[1]), 'autoboxing', `card is ${trace(chainLines, 'card', 2)}`],
    [ic(chainLines[2]), 'unboxing, addition, autoboxing', `card is ${trace(chainLines, 'card', 3)}`],
    [ic(chainLines[3]), 'unboxing, multiplication', `paid is ${trace(chainLines, 'paid', 4)}`],
  ],
  `Trace table of the card program: base is ${trace(chainLines, 'base', 1)}, card is ${trace(chainLines, 'card', 2)} after boxing, card is ${trace(chainLines, 'card', 3)} after the addition and paid is ${trace(chainLines, 'paid', 4)}; the output is ${out(A.cBoxChain)}`,
  `Output: ${ic(out(A.cBoxChain))}`,
);
const exprLines = ['Integer total = 10;', 'total = total + 5;', 'total++;', 'double half = total / 2.0;'];
const exprAt = (k, v) => ev(v, exprLines.slice(0, k).join('\n'));
const vExpr = table(
  ['Statement', 'Conversions behind it', 'Value after'],
  [
    [ic(exprLines[0]), 'autoboxing', `total is ${exprAt(1, 'total')}`],
    [ic(exprLines[1]), 'unbox, add, box', `total is ${exprAt(2, 'total')}`],
    [ic(exprLines[2]), 'unbox, add 1, box', `total is ${exprAt(3, 'total')}`],
    [ic(exprLines[3]), 'unbox, divide', `half is ${exprAt(4, 'half')}`],
  ],
  `Table of boxing inside statements: total is ${exprAt(1, 'total')}, then ${exprAt(2, 'total')}, then ${exprAt(3, 'total')}; half is ${exprAt(4, 'half')}`,
  'The statements look like ordinary arithmetic, but wrapper objects are converted each time.',
);
const okDecl = ['Integer a = 5;', 'Long b = 5L;', 'Double c = 5.0;'];
mustCompile(okDecl.join('\n'), 'matching literals');
const badDecl = ['Double c = 5;', 'Long d = 5;', 'Integer e = 5L;'];
const vMatch = table(
  ['Declaration', 'Result'],
  [...okDecl.map((d) => [ic(d), 'compiles']), ...badDecl.map((d) => [ic(d), `error: ${mustFail(d, d)}`])],
  `Table of boxing declarations: Integer a = 5, Long b = 5L and Double c = 5.0 compile; ${badDecl.map((d) => `${d.replace(/;$/, '')} gives ${mustFail(d, d)}`).join('; ')}`,
  'The literal must have the type of the wrapper.',
);
const vLines = table(
  ['Statement', 'Conversion'],
  [[ic('int fee = 120;'), 'none: primitive to primitive'], [ic('Integer paid = fee;'), 'autoboxing: int into an Integer'], [ic('int left = 500 - paid;'), 'unboxing: the Integer is used as an int']],
  `Table naming the conversion in each line of the fee program: line 1 none, line 2 autoboxing, line 3 unboxing; the value of left is ${out(cBoxLines)}`,
  `Output: ${ic(out(cBoxLines))}`,
);
const errNull = javaErr(A.srcLedger, { kind: 'runtime' }).err;
const vNull = table(
  ['Situation', 'Result'],
  [['A wrapper data member that was never assigned', 'holds null (no object)'], ['Unboxing it: double d = due;', `run-time error: ${errNull}`], ['Compiling the same program', 'no error: the compiler cannot know the value']],
  `Table of unboxing null: a wrapper data member never assigned holds null; unboxing it stops the program at run time with ${errNull}; the compiler reports no error`,
);
const vSummary1 = table(
  ['Topic', 'Remember'],
  [
    ['primitive and composite', 'a primitive holds one value; a class bundles values and methods'],
    ['wrapper classes', 'eight, in java.lang: Byte, Short, Integer, Long, Float, Double, Character, Boolean'],
    ['autoboxing', 'primitive value to wrapper object, automatically'],
    ['unboxing', 'wrapper object to primitive value, automatically'],
    ['matching types', 'an int boxes only into an Integer, a double only into a Double'],
    ['null', 'unboxing null throws NullPointerException at run time'],
  ],
  'Summary table of Part 1: primitive and composite types, the eight wrapper classes, autoboxing, unboxing, matching types and null',
);

// ---------------------------------------------------------------- visuals: Part 2
const vRoute2 = flow('LR', ['Why parse', 'parseInt, parseLong, parseFloat, parseDouble', 'NumberFormatException', 'valueOf and toString', 'Character tests', 'Case conversion', 'Classifying a String'], 'Route map of Part 2: why parse, the four parse methods, NumberFormatException, valueOf and toString, Character tests, case conversion and classifying a String', 'Part 2 at a glance');
const errTimes = mustFail(code('String a = "20";', 'String b = "5";', 'System.out.println(a * b);'), 'string times string');
const vPlus = table(
  ['Code', 'Result'],
  [[ic('"20" + "5"'), ev('"20" + "5"') + ' (the texts are joined)'], [ic('Integer.parseInt("20") + Integer.parseInt("5")'), ev('Integer.parseInt("20") + Integer.parseInt("5")') + ' (the numbers are added)'], [ic('a * b  (a and b are Strings)'), `compile-time error: ${errTimes}`]],
  `Table showing that plus joins two Strings and gives ${ev('"20" + "5"')}, that parseInt makes plus add the numbers to give ${ev('Integer.parseInt("20") + Integer.parseInt("5")')}, and that multiplying Strings is a compile-time error: ${errTimes}`,
  'Convert a String with a parse method before doing arithmetic.',
);
const parseRows = [
  ['Integer.parseInt', 'int', '"205"'],
  ['Long.parseLong', 'long', '"205"'],
  ['Float.parseFloat', 'float', '"205"'],
  ['Double.parseDouble', 'double', '"205"'],
];
const vParse = table(
  ['Method', 'Returns', 'Call', 'Value'],
  parseRows.map(([m, r, a]) => [ic(m), ic(r), ic(`${m}(${a})`), ev(`${m}(${a})`)]),
  `Table of the four parse methods with the type returned and the value for the text 205: ${parseRows.map(([m, r, a]) => `${m} returns ${r}, value ${ev(`${m}(${a})`)}`).join('; ')}`,
  'Each parse method takes a String and is called with the class name.',
);
const vAmounts = table(
  ['Input (a b)', 'Output'],
  ['120.50 79.50', '10 15'].map((i) => [ic(i), ic(out(cAmounts, i + '\n'))]),
  `Table of two runs of the amount program: input 120.50 79.50 gives ${out(cAmounts, '120.50 79.50\n')} and input 10 15 gives ${out(cAmounts, '10 15\n')}`,
  'parseDouble gives a double, so the sum always has a decimal point.',
);
const signCalls = ['Integer.parseInt("+7")', 'Integer.parseInt("-15")', 'Integer.parseInt("007")', 'Integer.parseInt("12.5")', 'Double.parseDouble("3")', 'Long.parseLong("4000000000")'];
const vSigns = table(
  ['Call', 'Result'],
  signCalls.map((c) => [ic(c), res(c)]),
  `Table of results: ${signCalls.map((c) => `${c} gives ${res(c)}`).join('; ')}`,
  'A sign and leading zeros are accepted; a decimal point is not accepted by parseInt.',
);
const badTexts = ['12.5', ' 42', '42 ', 'abc', ''];
const vNfe = table(
  ['Text given to parseInt', 'What Java reports'],
  badTexts.map((t) => [ic(`"${t}"`), res(`Integer.parseInt("${t}")`)]),
  `Table of texts that parseInt rejects, with the real messages: ${badTexts.map((t) => res(`Integer.parseInt("${t}")`)).join('; ')}`,
  'The message shows the text that failed. This is a run-time error.',
);
const exTexts = ['25', '25.5', '-8', '1,5', 'abc'];
const vEx2 = table(
  ['Text', 'parseInt', 'parseDouble'],
  exTexts.map((t) => [ic(`"${t}"`), exc(`Integer.parseInt("${t}")`), exc(`Double.parseDouble("${t}")`)]),
  `Table of five texts converted with parseInt and parseDouble: ${exTexts.map((t) => `${t}: ${exc(`Integer.parseInt("${t}")`)} and ${exc(`Double.parseDouble("${t}")`)}`).join('; ')}`,
  'A failure throws NumberFormatException and stops the program.',
);
const vTypes = table(
  ['Expression', 'Type of the result', 'Printed'],
  [[ic('Integer.parseInt("50")'), 'int (primitive)', ev('Integer.parseInt("50")')], [ic('Integer.valueOf("50")'), 'Integer (object)', ev('Integer.valueOf("50")')], [ic('Integer.toString(50)'), 'String', ev('Integer.toString(50)')], [ic('Double.parseDouble("5")'), 'double (primitive)', ev('Double.parseDouble("5")')]],
  'Table of the type returned: parseInt gives an int, valueOf gives an Integer object, toString gives a String, parseDouble gives a double',
  'parse gives a primitive, valueOf gives an object, toString gives text.',
);
const errArg = mustFail(code('int n = Integer.parseInt(25);'), 'parseInt(25)');
const errNoLong = mustFail(code('long n = Integer.parseLong("5");'), 'Integer.parseLong');
const vErrs = table(
  ['Code', 'Compiler message'],
  [[ic('int n = Integer.parseInt(25);'), errArg], [ic('int r = Double.parseDouble("7.5");'), mustFail(code('int r = Double.parseDouble("7.5");'))], [ic('long n = Integer.parseLong("5");'), errNoLong]],
  `Table of compile-time errors with parse methods: ${errArg}; ${mustFail(code('int r = Double.parseDouble("7.5");'))}; ${errNoLong}`,
  'These are caught by the compiler; NumberFormatException is not.',
);
const chars = ['a', 'K', '5', ' ', '#'];
const tests = [['isLetter', 'a letter'], ['isDigit', 'a digit 0 to 9'], ['isLetterOrDigit', 'a letter or a digit'], ['isLowerCase', 'a small letter'], ['isUpperCase', 'a capital letter'], ['isWhitespace', 'space, tab, new line']];
const vCharTests = table(
  ['Method', ...chars.map((c) => ic(`'${c}'`))],
  tests.map(([m]) => [ic(`Character.${m}`), ...chars.map((c) => ev(`Character.${m}('${c}')`))]),
  `Table of the true or false results of six Character methods for the characters a, K, 5, space and hash: ${tests.map(([m]) => `${m}: ${chars.map((c) => ev(`Character.${m}('${c}')`)).join(', ')}`).join('; ')}`,
  'Each method takes one char and returns a boolean.',
);
const convs = [['toUpperCase', 'g'], ['toLowerCase', 'M'], ['toUpperCase', '4'], ['toLowerCase', '#']];
const vConv = table(
  ['Call', 'Result', 'Type returned'],
  convs.map(([m, c]) => [ic(`Character.${m}('${c}')`), ev(`Character.${m}('${c}')`), 'char']),
  `Table of case conversion: ${convs.map(([m, c]) => `${m} of ${c} gives ${ev(`Character.${m}('${c}')`)}`).join('; ')}`,
  'Digits and symbols have no case and come back unchanged.',
);
const arithRows = [["Character.toUpperCase('d')", 'a char', ev("Character.toUpperCase('d')")], ["Character.toUpperCase('d') + 1", 'an int', ev("Character.toUpperCase('d') + 1")], ["(char) (Character.toUpperCase('d') + 1)", 'a char', ev("(char) (Character.toUpperCase('d') + 1)")]];
const vEx3 = table(
  ['Expression', 'Type', 'Displayed'],
  arithRows.map(([e, t, v]) => [ic(e), t, v]),
  `Table of a char in arithmetic: toUpperCase of d displays ${arithRows[0][2]}; adding 1 gives the int ${arithRows[1][2]}; a cast to char gives ${arithRows[2][2]}`,
  'In arithmetic a char is replaced by its integer code.',
);
const vLoop = flow('LR', ['Start with i = 0', 'Is i < s.length()?', 'ch = s.charAt(i)', 'Test ch, update a counter', 'i++', 'After the loop: display the counters'], 'Flow of a loop that classifies the characters of a String: start with i equal to 0, test i less than length, pick the character with charAt, test it and update a counter, increase i, and display the counters after the loop', 'The pattern behind most String programs of this chapter.');
const traceS = 'Bay 9A#';
const vEx4 = table(
  ['i', 'ch', 'Kind', 'Counts so far (letters digits others)'],
  [...traceS].map((c, i) => [String(i), ic(`'${c}'`), ev(`Character.isLetter('${c}')`) === 'true' ? 'letter' : ev(`Character.isDigit('${c}')`) === 'true' ? 'digit' : 'other', out(cLoopOf(traceS.slice(0, i + 1)))]),
  `Trace table of the loop for the text ${traceS}: the final counts of letters, digits and other characters are ${out(cLoopOf(traceS))}`,
  `Output: ${ic(out(cLoopOf(traceS)))}`,
);
const vPrograms = table(
  ['Program', 'Character methods used', 'Idea'],
  [
    ['password checker', 'isUpperCase, isLowerCase, isDigit', 'count each kind of character'],
    ['case changer', 'isUpperCase, isLowerCase, toLowerCase, toUpperCase', 'test, then convert'],
    ['PIN validator', 'isDigit (and parseInt)', 'every character must be a digit'],
    ['word counter', 'isWhitespace', 'spaces separate the words'],
  ],
  'Table of typical programs and the Character methods they use: password checker, case changer, PIN validator and word counter',
);
const vSummary2 = table(
  ['Topic', 'Remember'],
  [
    ['parse methods', 'parseInt, parseLong, parseFloat, parseDouble: String to number'],
    ['NumberFormatException', 'invalid text such as a decimal point, comma, letter or space; run-time error'],
    ['valueOf, toString', 'valueOf gives an object, toString gives a String'],
    ['Character tests', 'isLetter, isDigit, isLetterOrDigit, isLowerCase, isUpperCase, isWhitespace give boolean'],
    ['case conversion', 'toUpperCase and toLowerCase return a char'],
    ['char in arithmetic', 'the integer code is used; cast to char to show a letter'],
  ],
  'Summary table of Part 2: the parse methods, NumberFormatException, valueOf and toString, the Character tests, case conversion and a char in arithmetic',
);

// ---------------------------------------------------------------- deck 1
const part1 = deck({
  part: 1,
  title: 'Wrapper Classes, Autoboxing and Unboxing',
  goals: [
    'Distinguish primitive types from composite types and explain how a class creates a new type',
    'Name the wrapper class of each of the eight primitive types',
    'Define autoboxing and unboxing and identify them in code',
    'Predict the result of statements that mix primitive values and wrapper objects',
  ],
  slides: [
    sl('title', 'Wrapper classes', {
      b: 'Part 1: **primitive and composite types**, the eight **wrapper classes**, **autoboxing** and **unboxing**.',
      v: vRoute1,
      n: 'Welcome to the chapter on wrapper classes. In this first part we compare primitive and composite types, meet the eight wrapper classes of the package java dot lang, and learn how Java converts between a primitive value and a wrapper object by itself. These two conversions are called autoboxing and unboxing. We finish with the mistakes that beginners make most often.',
    }),
    sl('concept', 'Primitive and composite types', {
      b: 'A **primitive** type holds one simple value. A **composite** type is a **class**: it can hold several values together and has **methods**.',
      v: vPrimComp,
      n: 'A primitive type, such as int, char or double, holds one simple value and has no methods. A composite type is a class. It can hold several values together, and it has methods. String is a composite type, and so is any class that you write yourself. The wrapper classes are also composite types, and each of them wraps one primitive value.',
    }),
    sl('concept', 'A class makes a new type', {
      b: `${F(A.srcKite)}\n\nThe class **Kite** is a **user-defined type**: one object stores a String and an int together.`,
      v: vKite,
      n: 'A class lets a programmer create a new data type. The class Kite holds a colour and a length. An object of this type stores both values together, and the program prints red and thirty. A single int variable could not hold a word and a number at the same time. This is the idea of a composite type.',
    }),
    sl('concept', 'The eight wrapper classes', {
      b: 'Every primitive type has a **wrapper class** in the package **java.lang**, which Java imports automatically. A wrapper class wraps a primitive value in an object.',
      v: vWrap,
      n: 'Every primitive type has a wrapper class. Byte, Short, Integer, Long, Float, Double, Character and Boolean wrap byte, short, int, long, float, double, char and boolean. Six of them are the type name with a capital letter. Only int and char have longer names, Integer and Character. All eight belong to the package java dot lang, which Java imports by itself.',
    }),
    sl('example', 'Worked example 1: choosing the wrapper', {
      b: `${F(A.cDecl)}\n\nFor each value, choose the wrapper class of its own type.`,
      v: vDecl,
      n: 'Let us choose a wrapper for each value. The whole number forty eight goes into an Integer. The letter K goes into a Character. True goes into a Boolean. Ninety nine point five is a double, so it needs a Double. A long literal, such as four billion two hundred million, needs a Long. The program prints all five values on one line.',
    }),
    sl('check', 'Quick check: primitive and wrapper', {
      b: 'Match each primitive type with its wrapper class.',
      chk: 'mt_wrappers',
      n: 'Recall the eight wrapper classes. Remember that int and char have the longer names.',
    }),
    sl('concept', 'Why an object helps', {
      b: 'An **object** can call methods; a **primitive** variable cannot. Wrapper classes also carry useful methods and constants.',
      v: vDeref,
      n: 'A wrapper object can call methods, but a primitive variable cannot. In the table, calling to string on an int variable gives a compile time error, int cannot be dereferenced. The same call on an Integer object works and gives the text five. Wrapper classes also carry useful methods and constants, which we use throughout this chapter.',
    }),
    sl('concept', 'Making a wrapper object', {
      b: 'The method **valueOf** returns a wrapper object. Constants such as `Integer.MAX_VALUE` give the limits. The constructors, such as `new Integer(25)`, are **deprecated since Java 9**: do not use them.',
      v: vValueOf,
      n: 'A wrapper object can be made with the valueOf method, for example Integer dot valueOf of twenty five. The old constructors, such as new Integer, are deprecated since Java nine, so we do not use them. Each wrapper class also has constants for the limits of its type. The largest int is more than two billion. The easiest way to make a wrapper object is autoboxing, coming next.',
    }),
    sl('check', 'Quick check: every primitive', {
      b: 'Decide whether the statement is true or false.',
      chk: 'tf_every_prim',
      n: 'Count the primitive types of Java and the wrapper classes. Do the numbers agree?',
    }),
    sl('concept', 'Autoboxing', {
      b: `**Autoboxing** is the automatic conversion of a **primitive value into a wrapper object**.\n\n${F(A.cBoxBasic)}`,
      v: vBoxing,
      n: 'Autoboxing is the automatic conversion of a primitive value into an object of its wrapper class. In the program, the int variable a is stored in the Integer variable boxed with no method call at all. Java creates the wrapper object for us. The picture shows the value forty inside an object. Boxing always goes from the primitive to the object.',
    }),
    sl('concept', 'Unboxing', {
      b: '**Unboxing** is the automatic conversion of a **wrapper object into the primitive value** it holds. It happens in assignments, arithmetic and comparisons.',
      v: vUnbox,
      n: 'Unboxing is the reverse. The primitive value is taken out of the wrapper object automatically. It happens when an Integer is assigned to an int variable, and when an Integer is used in arithmetic or in a comparison. With boxed holding forty, boxed plus two is forty two, boxed greater than thirty is true, and boxed times one point five is sixty point zero.',
    }),
    sl('example', 'Worked example 2: tracing the conversions', {
      b: `${F(A.cBoxChain)}\n\nFind the conversion that Java makes in each statement.`,
      v: vTrace,
      n: 'Trace the program line by line. The int twenty five is boxed into card. In card plus ten, the object is unboxed, ten is added, and the result thirty five is boxed again into card. Then card times two unboxes it once more, and paid becomes seventy. The program prints thirty five and seventy.',
    }),
    sl('concept', 'Boxing inside expressions', {
      b: 'Statements such as `total = total + 5;` and `total++;` on an Integer **unbox, calculate and box again**. They look like ordinary arithmetic.',
      v: vExpr,
      n: 'Boxing and unboxing can happen several times in one statement. In total equals total plus five, the Integer is unboxed, five is added, and the sum is boxed back into total. Even total plus plus works the same way. The code does not look different, but behind the scenes each step converts between the primitive value and the object.',
    }),
    sl('check', 'Quick check: unboxing', {
      b: 'Fill in the blank.',
      chk: 'fb_unbox',
      n: 'Remember the name of the process that takes the primitive value out of a wrapper object.',
    }),
    sl('concept', 'Boxing needs the matching type', {
      b: 'A primitive is boxed **only into the wrapper of its own type**. The literal `5` is an int, so it fits an `Integer` but not a `Double` or a `Long`.',
      v: vMatch,
      n: 'Autoboxing works only with the wrapper of the same type. The literal five is an int, so it can go into an Integer. A Double needs a double literal such as five point zero, and a Long needs a literal ending in the letter L. Writing Double c equals five makes javac report that int cannot be converted to Double. Always match the literal with the wrapper.',
    }),
    sl('example', 'Worked example 3: finding the conversions', {
      b: `${F(cBoxLines)}\n\nName the conversion, if any, in each line.`,
      v: vLines,
      n: 'Let us find the conversions in three lines. The first line stores an int in a primitive variable, so nothing is converted. In the second line the int fee goes into an Integer variable, which is autoboxing. In the third line the Integer is used in a subtraction and the result is stored in an int, which is unboxing. The value of left is three hundred eighty.',
    }),
    sl('concept', 'null and unboxing', {
      b: 'A wrapper variable can hold **null**, which means no object. **Unboxing null** throws a **NullPointerException** at run time; the compiler cannot detect it.',
      v: vNull,
      n: 'A wrapper variable can hold null, which means that there is no object. Unboxing a null reference fails at run time with a null pointer exception, because there is no value inside. In the Ledger program, the data member due was never assigned, so the statement that unboxes it stops the program. The compiler cannot catch this, so it is a run time error.',
    }),
    sl('check', 'Quick check: matching types', {
      b: 'Choose the correct option for the assertion and the reason.',
      chk: 'ar_double_box',
      n: 'Think about the type of the literal and the wrapper class that it can be boxed into.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. A primitive holds one value, and a class is a composite type. The eight wrapper classes live in java dot lang. Autoboxing converts a primitive to a wrapper object, and unboxing converts it back, both automatically. A primitive is boxed only into the wrapper of its own type. Unboxing a null reference stops the program with a null pointer exception.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Learn the pairs: `int` with `Integer` and `char` with `Character`; the other six add a capital letter.',
        'To find boxing, look for a primitive stored in a wrapper variable; for unboxing, a wrapper used as a number.',
        'A literal must match the wrapper: `Double d = 5;` is an error, `Double d = 5.0;` is correct.',
        'Do not write `new Integer(5)`: it is deprecated. Use autoboxing or `valueOf`.',
        'An error question needs the kind of error (compile-time or run-time) and the reason.',
      ],
      n: 'Some exam tips. Learn the pairs: int goes with Integer and char goes with Character, and the other six add a capital letter. To find boxing, look for a primitive stored in a wrapper variable. For unboxing, look for a wrapper used as a number. A literal must match the wrapper. Do not use the deprecated constructors. In error questions, state the kind of error and the reason.',
    }),
  ],
});

// ---------------------------------------------------------------- deck 2
const part2 = deck({
  part: 2,
  title: 'Parse Methods and Character Methods',
  goals: [
    'Convert numeric Strings to numbers with parseInt, parseLong, parseFloat and parseDouble and predict the results',
    'Explain when NumberFormatException occurs',
    'Predict the output of Character methods that test and convert characters',
    'Write programs that classify the characters of a String',
  ],
  slides: [
    sl('title', 'Parse and Character methods', {
      b: 'Part 2: **parseInt**, **parseLong**, **parseFloat** and **parseDouble**; the methods of the **Character** class; classifying the characters of a String.',
      v: vRoute2,
      n: 'Welcome to the second part. We learn how to turn a numeric string into a number with parseInt, parseLong, parseFloat and parseDouble, and what happens when the text is not a valid number. Then we study the Character class: methods that test a character and methods that change its case. We finish by classifying every character of a string with a loop.',
    }),
    sl('concept', 'Why convert text into numbers?', {
      b: 'Text typed by a user is a **String**. The operator `+` **joins** Strings; it does not add them. Convert with a **parse** method first.',
      v: vPlus,
      n: 'Text typed by a user arrives as a String. The plus operator joins two Strings, so twenty plus five gives two hundred and five, as text. After converting each String with parseInt, the same plus adds the numbers and gives twenty five. A String cannot be multiplied at all, and javac reports a bad operand error. So we convert first.',
    }),
    sl('concept', 'The four parse methods', {
      b: `Each parse method takes a **String** and returns a number. They are **static** methods, called with the class name.\n\n${F(B.cParseKinds)}`,
      v: vParse,
      n: 'There is one parse method for each numeric type. parseInt returns an int, parseLong returns a long, parseFloat returns a float, and parseDouble returns a double. Each takes a String as its argument. They are static methods, so we call them with the class name, for example Integer dot parseInt. Use parseLong when the number is too big for an int.',
    }),
    sl('example', 'Worked example 1: adding typed amounts', {
      b: `${F(cAmounts)}\n\nThe two amounts are typed as words. Run it for two inputs.`,
      v: vAmounts,
      n: 'Let us add two amounts typed as text. The program reads two words and converts each with parseDouble. For one hundred twenty point five zero and seventy nine point five zero, the sum is two hundred point zero. For ten and fifteen, the sum is twenty five point zero. A double always shows at least one digit after the point.',
    }),
    sl('check', 'Quick check: the steps', {
      b: 'Arrange the steps of the program in order.',
      chk: 'ord_parse_steps',
      n: 'Think about what must happen before two typed words can be added.',
    }),
    sl('concept', 'Signs, decimals and doubles', {
      b: 'A leading `+` or `-` and leading zeros are accepted. `parseInt` **rejects a decimal point**. `parseDouble` accepts whole numbers and gives a double. Big numbers need `parseLong`.',
      v: vSigns,
      n: 'Look at what the parse methods accept. A leading plus or minus sign is fine, so parseInt of plus seven gives seven. Leading zeros are accepted too. But parseInt rejects a decimal point. parseDouble accepts a whole number, and parseDouble of three gives three point zero. parseLong is needed for big numbers such as four billion.',
    }),
    sl('concept', 'NumberFormatException', {
      b: 'If the text is not a valid number, the parse method throws **NumberFormatException** and the program stops. A decimal point, a letter, an empty text and even a **space** make `parseInt` fail.',
      v: vNfe,
      n: 'When the text is not a valid number, the parse method throws a NumberFormatException, and the program stops. The message shows the exact text that failed. A decimal point, a letter, an empty string and even a space before or after the digits make parseInt fail. This is a run time error, not a compile time error.',
    }),
    sl('check', 'Quick check: a failing conversion', {
      b: 'State the error that the program causes.',
      chk: 'co_err_parse_dot',
      n: 'Look at the text given to parseInt. Is every character a digit?',
    }),
    sl('example', 'Worked example 2: which texts convert?', {
      b: 'Test five texts with both `parseInt` and `parseDouble`. A cell shows the exception when the conversion fails.',
      v: vEx2,
      n: 'Let us test five texts with both methods. The text twenty five works with both. Twenty five point five works only with parseDouble. Minus eight works with both. A comma between digits and a word fail with both. Notice that a failure stops the program, so in real programs the input must be valid.',
    }),
    sl('concept', 'parseInt, valueOf and toString', {
      b: '**parseInt** returns a primitive **int**; **valueOf** returns an **Integer** object; **toString** turns a number into a **String**.',
      v: vTypes,
      n: 'Three related methods differ in what they return. parseInt returns a primitive int. valueOf returns a wrapper object, an Integer, and it can also take a String. toString goes the other way and returns a String made from a number. When they are printed, the first two look the same, but their types are different.',
    }),
    sl('concept', 'Compile-time errors with parse methods', {
      b: 'Some mistakes are found by the compiler: a **wrong argument type**, a **lossy conversion** and a **method that does not exist**.',
      v: vErrs,
      n: 'Some mistakes are caught by the compiler. Passing a number instead of a String gives incompatible types. Storing the double from parseDouble in an int variable gives a lossy conversion error. And Integer has no method called parseLong, so javac says cannot find symbol. Compare these with the run time NumberFormatException, which comes from the text itself.',
    }),
    sl('check', 'Quick check: valueOf', {
      b: 'Choose the correct statement.',
      chk: 'm_valueof_vs_parse',
      n: 'Remember which of the two methods returns a primitive and which returns an object.',
    }),
    sl('concept', 'Character methods that test', {
      b: 'Each method takes one **char** and returns **true** or **false**. Note that `isLetterOrDigit` is true for letters **and** digits.',
      v: vCharTests,
      n: 'The Character class has methods that test one character and return true or false: isLetter, isDigit, isLetterOrDigit, isLowerCase, isUpperCase and isWhitespace. In the table, the letter a is a letter and lower case, the five is a digit, the space is white space, and the hash sign is none of these. Remember that isLetterOrDigit is true for both letters and digits.',
    }),
    sl('concept', 'Methods that change case', {
      b: '**toUpperCase** and **toLowerCase** take a char and **return a char**. They do not change the variable: store or print the result.',
      v: vConv,
      n: 'toUpperCase and toLowerCase take a char and return a char. The letter g becomes capital G, and capital M becomes small m. A digit or a symbol has no case, so it comes back unchanged. These methods do not change the original variable. They return a new value, which must be stored or printed.',
    }),
    sl('example', 'Worked example 3: a char in arithmetic', {
      b: "Trace `Character.toUpperCase('d')` used alone, with `+ 1`, and with a cast to `char`.",
      v: vEx3,
      n: 'Now see what happens when the returned char is used in arithmetic. toUpperCase of d returns capital D, which prints as a letter. But adding one replaces D by its integer code, sixty eight, so the result is sixty nine, a number. To print the next letter, cast the sum to char. The output is capital E.',
    }),
    sl('check', 'Quick check: case conversion', {
      b: 'Write the exact output.',
      chk: 'co_case_conv',
      n: 'Convert each character, and notice what happens to the digit and to the last line, where two chars are added.',
    }),
    sl('concept', 'Classifying the characters of a String', {
      b: `Visit every position of the String with a loop and \`charAt\`, test each character with the Character methods and update the counters.\n\n${F(cLoopSkeleton)}`,
      v: vLoop,
      n: 'To classify all the characters of a String, use a loop. The index i goes from zero up to length minus one. In each pass, charAt of i picks one character, and Character methods decide which counter to increase. The counters are displayed after the loop. This pattern is the basis of password checkers, word counters and case changers.',
    }),
    sl('example', 'Worked example 4: counting letters, digits and others', {
      b: `${F(cLoopOf(traceS))}\n\nTrace the loop character by character.`,
      v: vEx4,
      n: 'Let us trace the loop for the text Bay, space, nine, A, hash. The characters B, a and y are letters. The space is counted as other. The digit nine increases the digit counter. Then A is the fourth letter and the hash sign is the second other character. The final counts are four letters, one digit and two other characters.',
    }),
    sl('concept', 'Typical programs', {
      b: 'The same pattern, with different tests, gives many programs. A **PIN validator** also converts the text with `parseInt` after checking every character.',
      v: vPrograms,
      n: 'Here is how the methods combine in typical programs. A password checker counts upper case letters, lower case letters and digits. A case changer tests with isUpperCase and converts with toLowerCase or toUpperCase. A PIN validator tests every character with isDigit and then converts the whole text with parseInt. A word counter uses isWhitespace to find the gaps between words.',
    }),
    sl('check', 'Quick check: counting digits', {
      b: 'Arrange the steps of a digit-counting program.',
      chk: 'ord_classify',
      n: 'Decide where the counter is updated and where it is displayed.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. The four parse methods convert a String to an int, long, float or double. Invalid text, such as a decimal point for parseInt, throws a NumberFormatException at run time. valueOf returns an object and toString returns a String. The Character tests return true or false, and toUpperCase and toLowerCase return a char. A char used in arithmetic is replaced by its integer code.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Choose the parse method by the type wanted: `parseInt` for int, `parseDouble` for double, `parseLong` for large whole numbers.',
        'Spaces, commas and decimal points make `parseInt` fail with `NumberFormatException`; a sign does not.',
        'Name the kind of error: wrong type is a compile-time error, bad text is a run-time exception.',
        "`Character.toUpperCase(ch) + 1` is an int: cast to `char` to display a letter.",
        'In a program, loop from 0 to `length() - 1`, pick `charAt(i)` and test with a ladder of Character methods; use `else` for other characters.',
      ],
      n: 'Some exam tips. Choose the parse method by the type that you want. Spaces, commas and decimal points make parseInt fail with a NumberFormatException, but a sign does not. A wrong type is a compile time error, and bad text is a run time exception. A char plus one is an int, so cast it to char to show a letter. In programs, loop over all positions, pick each character with charAt and test it with a ladder of Character methods.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Library Classes: Wrapper Classes: notes',
  sections: [
    {
      h: '1. Primitive and composite types',
      t: 1,
      b: `A **primitive** data type holds one simple value (int, char, double, boolean and the others) and has no methods. A **composite** data type is a **class**: it bundles several values (data members) and methods. Besides the library classes (String, the wrapper classes, Scanner), a programmer can design new classes, which are **user-defined types**.\n\n${F(A.srcKite)}\n\nOutput: ${ic(out(A.srcKite))}. One Kite object holds a String and an int.\n\nAn object can call methods, a primitive cannot: ${ic('int n = 5; n.toString()')} gives "${errDeref}", while ${ic('Integer n = 5; n.toString()')} prints ${ic(out(A.cDerefOk))}.`,
      terms: [
        ['Primitive data type', 'A built-in type that holds a single simple value and has no methods.'],
        ['Composite data type', 'A type, such as a class, that can hold several values and has methods.'],
      ],
      v: vPrimComp,
      vs: [vKite, vDeref],
    },
    {
      h: '2. Wrapper classes',
      t: 1,
      b: `A **wrapper class** wraps a primitive value in an object. Each of the eight primitive types has one, in the package **java.lang** (imported automatically): **Byte, Short, Integer, Long, Float, Double, Character, Boolean**. Only int (Integer) and char (Character) have names different from the type name with a capital letter.\n\n${F(A.cDecl)}\n\nOutput: ${ic(out(A.cDecl))}.\n\nA wrapper object can be made with \`valueOf\`, for example ${ic('Integer.valueOf(25)')} gives ${ev('Integer.valueOf(25)')}. The constructors such as \`new Integer(25)\` are deprecated since Java 9 and are not used. Constants give the limits: \`Integer.MAX_VALUE\` is ${ev('Integer.MAX_VALUE')}.`,
      terms: [
        ['Wrapper class', 'A class that wraps a value of a primitive data type in an object; there is one for each of the eight primitive types.'],
        ['java.lang', 'The package that holds the wrapper classes and other basic classes; it is imported automatically.'],
      ],
      v: vWrap,
      vs: [vDecl, vValueOf],
    },
    {
      h: '3. Autoboxing and unboxing',
      t: 2,
      b: `**Autoboxing** is the automatic conversion of a primitive value into an object of its wrapper class. **Unboxing** is the automatic conversion of a wrapper object into the primitive value it holds. Unboxing happens in assignments to primitive variables, in arithmetic and in comparisons.\n\n${F(A.cBoxBasic)}\n\nOutput: ${ic(out(A.cBoxBasic))}.\n\nBoxing inside expressions: ${ic('total = total + 5;')} on an Integer unboxes, adds and boxes again.`,
      terms: [
        ['Autoboxing', 'The automatic conversion of a primitive value into an object of its wrapper class.'],
        ['Unboxing', 'The automatic conversion of a wrapper class object into the primitive value it holds.'],
      ],
      v: vBoxing,
      vs: [vUnbox, vTrace, vExpr],
    },
    {
      h: '4. Matching types and null',
      t: 2,
      b: `A primitive value is boxed only into the wrapper of **its own type**: the literal 5 is an int, so \`Double c = 5;\` fails with "${mustFail('Double c = 5;')}" and \`Integer e = 5L;\` with "${mustFail('Integer e = 5L;')}". Write \`5.0\` for a Double and \`5L\` for a Long.\n\nA wrapper variable may hold **null**. Unboxing null throws a **NullPointerException** at run time, for example "${errNull}". The compiler cannot detect it.\n\n${F(cBoxLines)}\n\nOutput: ${ic(out(cBoxLines))}. Line 2 is autoboxing and line 3 is unboxing.`,
      terms: [['null', 'The value of a reference variable that refers to no object.']],
      v: vMatch,
      vs: [vLines, vNull],
    },
    {
      h: '5. Conversion methods: parseInt, parseLong, parseFloat, parseDouble',
      t: 3,
      b: `Text typed by the user is a String, and \`+\` joins Strings. A numeric String is converted by a **parse** method: **Integer.parseInt** (int), **Long.parseLong** (long), **Float.parseFloat** (float), **Double.parseDouble** (double). They are static methods that take a String.\n\n${F(B.cSumText)}\n\nOutput: ${ic(out(B.cSumText).split('\n').join(' / '))}.\n\nA sign and leading zeros are accepted (${ic('Integer.parseInt("+7")')} gives ${ev('Integer.parseInt("+7")')}); a decimal point is not accepted by parseInt; ${ic('Double.parseDouble("3")')} gives ${ev('Double.parseDouble("3")')}. If the text is not a valid number the method throws **NumberFormatException** (a run-time error), for example "${B.nfeInt('12.5')}" for 12.5 and "${B.nfeInt(' 42')}" for a space before the digits.`,
      terms: [
        ['parse method', 'A method such as parseInt that converts a String holding a number into a value of a numeric type.'],
        ['NumberFormatException', 'The run-time exception thrown when a String cannot be converted to the required numeric type.'],
      ],
      v: vParse,
      vs: [vPlus, vSigns, vNfe, vEx2],
    },
    {
      h: '6. valueOf, toString and parse errors',
      t: 3,
      b: `**parseInt** returns a primitive int; **valueOf** returns an Integer object; **Integer.toString(n)** returns the String of a number. Both parseInt and valueOf print ${ev('Integer.parseInt("50")')} for the text 50, but their types differ.\n\n${F(B.cValueOf)}\n\nOutput: ${ic(out(B.cValueOf).split('\n').join(' / '))}.\n\nCompile-time errors: a number given to parseInt ("${errArg}"), a double stored in an int ("${mustFail(code('int r = Double.parseDouble("7.5");'))}") and a method that does not exist ("${errNoLong}").`,
      terms: [['valueOf', 'A method that returns a wrapper class object holding a value that is given as a primitive or as a String.']],
      v: vTypes,
      vs: [vErrs],
    },
    {
      h: '7. Character methods and classifying characters',
      t: 4,
      b: `The **Character** class has methods that take a char: tests that return a boolean (**isLetter, isDigit, isLetterOrDigit, isLowerCase, isUpperCase, isWhitespace**) and conversions that return a char (**toLowerCase, toUpperCase**).\n\n${F(C.cCharTests)}\n\nOutput: ${ic(out(C.cCharTests).split('\n').join(' / '))}.\n\nA char used in arithmetic is replaced by its integer code: ${ic("Character.toUpperCase('d') + 1")} gives ${ev("Character.toUpperCase('d') + 1")}; with a cast ${ic("(char) (Character.toUpperCase('d') + 1)")} gives ${ev("(char) (Character.toUpperCase('d') + 1)")}.\n\nTo classify the characters of a String, loop from 0 to length() - 1, pick each one with charAt(i) and test it:\n\n${F(cLoopOf(traceS))}\n\nOutput: ${ic(out(cLoopOf(traceS)))} (letters, digits, others).`,
      terms: [
        ['Character class', 'The wrapper class of char; it provides methods to test and convert characters.'],
        ['isWhitespace', 'A Character method that returns true for a space, a tab or a new line.'],
      ],
      v: vCharTests,
      vs: [vConv, vEx3, vLoop, vEx4, vPrograms],
    },
  ],
  tips: '**Common mistakes**\n- Writing `Double d = 5;` (an int is boxed only into an Integer) or `Long n = 5;`.\n- Calling `Integer.parseInt` on text with a decimal point, a comma or a space.\n- Storing `Double.parseDouble(...)` in an int variable.\n- Adding two Strings instead of converting them first.\n- Forgetting that `Character.toUpperCase(ch) + 1` is an int.\n- Using `isLetter` when digits must be accepted too (`isLetterOrDigit`).\n\n**How marks are usually awarded**\n- Output questions: each line in the exact order and format; a char in arithmetic shows a number.\n- Error questions: the kind of error (compile-time or run-time), the line or exception and the reason.\n- Programs (15 marks): structure and input, the loop or conversion, the Character or parse methods used correctly, output with messages, variable description or comments.',
});

// ---------------------------------------------------------------- flashcards
const FC = cards([
  ['What is a primitive data type?', 'A built-in type that holds a single simple value and has no methods, such as int, char or double.', 'definition', 1],
  ['What is a composite data type?', 'A type, such as a class, that can bundle several values and has methods.', 'definition', 1],
  ['How does a class let you define your own type?', `Its data members group several values, for example the Kite class holds a String and an int: ${ic(out(A.srcKite))}.`, 'concept', 1],
  ['What is a wrapper class?', 'A class that wraps a value of a primitive type in an object.', 'definition', 1],
  ['In which package are the wrapper classes?', 'java.lang, which is imported automatically.', 'fact', 1],
  ['Wrapper classes of byte, short, int and long', 'Byte, Short, Integer, Long.', 'fact', 1],
  ['Wrapper classes of float, double, char and boolean', 'Float, Double, Character, Boolean.', 'fact', 1],
  ['Why can an Integer call n.toString() but an int cannot?', `An Integer is an object. For an int, javac says "${errDeref}".`, 'concept', 1],
  ['Why not use new Integer(25)?', 'The constructors of the wrapper classes are deprecated since Java 9; use autoboxing or valueOf.', 'exam-tip', 1],
  ['What does Integer.valueOf(25) return?', 'An Integer object holding 25.', 'fact', 1],
  ['What is autoboxing?', 'The automatic conversion of a primitive value into an object of its wrapper class.', 'definition', 2],
  ['What is unboxing?', 'The automatic conversion of a wrapper class object into the primitive value it holds.', 'definition', 2],
  ['Autoboxing or unboxing: Integer w = q; (q is an int)', 'Autoboxing.', 'example', 2],
  ['Autoboxing or unboxing: int e = w + 1; (w is an Integer)', 'Unboxing (then the addition).', 'example', 2],
  ['What does Integer total = 10; total = total + 5; leave in total?', ic(ev('total', 'Integer total = 10; total = total + 5;')), 'example', 2],
  ['Why does Double fee = 20; fail?', `An int is boxed only into an Integer. javac says "${mustFail('Double fee = 20;')}".`, 'exam-tip', 2],
  ['How do you box 20 into a Double?', 'Write the literal as a double: Double fee = 20.0;', 'concept', 2],
  ['What happens when a null wrapper is unboxed?', 'A NullPointerException is thrown at run time; the compiler cannot detect it.', 'concept', 2],
  ['What does Integer.parseInt do?', 'Converts a String holding a whole number into an int.', 'definition', 3],
  ['Name the four parse methods', 'Integer.parseInt, Long.parseLong, Float.parseFloat, Double.parseDouble.', 'fact', 3],
  ['What does Double.parseDouble("3") give?', ic(ev('Double.parseDouble("3")')), 'example', 3],
  ['What does Integer.parseInt("+7") give?', `${ic(ev('Integer.parseInt("+7")'))}: a sign is accepted.`, 'example', 3],
  ['What does Integer.parseInt("12.5") do?', `Throws NumberFormatException: ${ic(B.nfeInt('12.5'))}.`, 'exam-tip', 3],
  ['Why does parseInt(" 42") fail?', `A space is not a digit: ${ic(B.nfeInt(' 42'))}.`, 'exam-tip', 3],
  ['When is NumberFormatException thrown?', 'When a String cannot be converted to the required number: a decimal point for parseInt, a comma, a letter, an empty text or a space.', 'concept', 3],
  ['What does "20" + "5" give?', `${ic(ev('"20" + "5"'))}: + joins Strings.`, 'example', 3],
  ['parseInt against valueOf', 'parseInt returns an int (primitive); valueOf returns an Integer (object).', 'concept', 3],
  ['What does Integer.toString(250) return?', 'A String holding the digits of the number.', 'fact', 3],
  ['Which Character methods return a boolean?', 'isLetter, isDigit, isLetterOrDigit, isLowerCase, isUpperCase, isWhitespace.', 'fact', 4],
  ['Which Character methods change case?', 'toUpperCase and toLowerCase; they return a char.', 'fact', 4],
  ['Character.isLetterOrDigit(\'_\')', ic(ev("Character.isLetterOrDigit('_')")), 'example', 4],
  ['What does Character.toUpperCase(\'7\') give?', `${ic(ev("Character.toUpperCase('7')"))}: a digit has no case and is returned unchanged.`, 'example', 4],
  ['Why is Character.toUpperCase(\'d\') + 1 a number?', `A char used in arithmetic is replaced by its integer code: it gives ${ic(ev("Character.toUpperCase('d') + 1"))}.`, 'exam-tip', 4],
  ['How can you display the next letter of Character.toUpperCase(\'d\')?', `Cast the sum to char: ${ic("(char) (Character.toUpperCase('d') + 1)")} gives ${ic(ev("(char) (Character.toUpperCase('d') + 1)"))}.`, 'concept', 4],
  ['How do you visit every character of a String s?', 'for (int i = 0; i < s.length(); i++) { char ch = s.charAt(i); ... }', 'concept', 4],
]);

// ---------------------------------------------------------------- tests (icse-10-computer-applications chapter-test blueprints)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'icse-10-computer-applications-chapter-test-short',
  title: 'Chapter test (short): Wrapper Classes',
  duration: 30,
  sections: [
    { id: 'A', title: 'Section A: Compulsory (10 marks)', instr: 'Attempt all questions. Questions 1 to 6 are multiple-choice (1 mark each); questions 7 and 8 carry 2 marks each.', items: ['m_wrap_which_type', 'm_prim_vs_comp', 'm_unbox_arith', 'm_parse_which_fails', 'm_parse_concat', 'm_char_plus', 's_box_unbox', 's_parse_vs_valueof'] },
    { id: 'B', title: 'Section B: Program (15 marks)', instr: 'Attempt any ONE of the two programs. Write the program in Java with variable descriptions or comments.', items: [{ attempt: 1, keys: ['l_keystrength', 'l_grainlot'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'icse-10-computer-applications-chapter-test-long',
  title: 'Chapter test (long): Wrapper Classes',
  duration: 60,
  sections: [
    { id: 'A', title: 'Section A: Compulsory (20 marks)', instr: 'Attempt all questions. Questions 1 to 10 are multiple-choice (1 mark each); questions 11 to 13 are short answers and questions 14 and 15 are predict-the-output items, 2 marks each.', items: ['m_wrap_pkg', 'm_prim_not_wrap', 'm_identify_box', 'm_box_error', 'm_parse_int_ret', 'm_parse_double_in', 'm_parse_space', 'm_parse_long', 'm_isletterordigit', 'm_toupper_type', 's_prim_comp', 's_nfe', 's_toupper_ret', 'co_unbox_mix', 'co_loop_count'] },
    { id: 'B', title: 'Section B: Programs (30 marks)', instr: 'Attempt any TWO of the three programs. Write each program in Java with variable descriptions or comments.', items: [{ attempt: 2, keys: ['l_caseswap', 'l_pincode', 'l_speedround'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 to t04 of icse-10-computer-applications-ch09 only',
    originality: 'every program, scenario and data value written for this chapter by SOYL with imagined names; no textbook, specimen or past-paper program reused',
    execution: 'every output, value and error in items, slides, notes and flashcards produced by compiling and running the code with JDK 21 (runJava in lib.mjs); results cached in src/java-cache.json',
    gate: 'schema, pipeline lint, deterministic verify, narration rules and the answer-leak scan run clean in this build',
  },
});
