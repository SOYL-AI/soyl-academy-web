// Build ICSE 10 Computer Applications ch02 "Revision: Values, Data Types and Operators". Run from platform/:
//   npx tsx content/authored/computer-science/icse-10-computer-applications-ch02/src/build.mjs
// Every program output, value, type and error shown in decks, notes, flashcards and questions is produced by running Java.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg, useJavaCache, javaOut } from '../../icse-10-computer-applications-ch01/src/lib.mjs';

const SRC = path.dirname(fileURLToPath(import.meta.url));
setUnit('icse-10-computer-applications-ch02', 'computer-science');
useJavaCache(SRC);
await import('./q_a.mjs');
await import('./q_b.mjs');
await import('./q_c.mjs');
const { code, F, ic, raw, ev, out, mustCompile, mustFail, expect, SIZES } = await import('./q_util.mjs');
const DIR = path.resolve(SRC, '..');

/** Values of several single-line expressions, from one program. */
const evs = (exprs, pre = '') => javaOut(`${pre ? pre + '\n' : ''}${exprs.map((e) => `System.out.println(${e});`).join('\n')}`).split('\n');
const TYPES = { Integer: 'int', Double: 'double', Character: 'char', Long: 'long', Float: 'float', Boolean: 'boolean', String: 'String', Short: 'short', Byte: 'byte' };
/** Data types of several expressions, found by asking Java for the class of the boxed value. */
const types = (exprs, pre = '') => evs(exprs.map((e) => `((Object) (${e})).getClass().getSimpleName()`), pre).map((t) => TYPES[t]);
const lines = (c) => out(c).split('\n');

// ---------------------------------------------------------------- facts the narration states in words; stop if any differs
const codeOf = (c) => ev(`(int) '${c}'`);
expect(codeOf('A'), '65', 'code of A');
expect(codeOf('a'), '97', 'code of a');
expect(codeOf('0'), '48', 'code of 0');
expect(ev('(int) Math.pow(2, 16)'), '65536', 'unicode codes');
expect(ev('(int) Math.pow(2, 7)'), '128', 'ascii codes');
expect(ev('"A\\tB".length()'), '3', 'tab length');
expect(ev('(int) 7.9'), '7', 'cast 7.9');
expect(ev('7 / 2'), '3', '7/2');
expect(ev('7 / 2.0'), '3.5', '7/2.0');
expect(ev('-17 % 5'), '-2', '-17%5');
expect(ev('17 % -5'), '2', '17%-5');
expect(ev('100 / 10 / 5'), '2', '100/10/5');
expect(ev('3 + 4 + "5"'), '75', 'concat 1');
expect(ev('"3" + 4 + 5'), '345', 'concat 2');
expect(ev('a++ + ++a', 'int a = 5;'), '12', 'a++ + ++a');
expect(ev('8 + 12 / 4 * 2 - 7 % 3'), '13', 'step eval');
expect(out('int a = 5;', 'int b = a++ + ++a;', 'System.out.println(a + " " + b);'), '7 12', 'a and b');
// widening compiles, narrowing needs a cast
mustCompile('byte b = 1; short s = b; int i = s; long l = i; float f = l; double d = f;\nSystem.out.println(d);', 'widening chain');
mustCompile("char c = 'a'; int i = c;\nSystem.out.println(i);", 'char to int');
mustFail('long l = 5L; int i = l;', 'long to int');
mustFail('double d = 1.5; float f = d;', 'double to float');
mustFail('short s = 1; char c = s;', 'short to char');
mustFail("char c = 'a'; short s = c;", 'char to short');
mustFail('int i = 5; byte b = i;', 'int to byte');
// identifiers
const ID = ['total', 'net_pay', 'Marks2', '2ndTerm', 'net pay', 'class', 'roll-no'];
const idOk = ID.map((n) => {
  try { mustCompile(`int ${n} = 1;`); return true; } catch { return false; }
});
expect(idOk.join(), 'true,true,true,false,false,false,false', 'identifier validity');

// ---------------------------------------------------------------- visuals: Part 1
const vRoute1 = flow('LR', ['Character set and codes', 'Escape sequences', 'Tokens', 'Constants and variables', 'Primitive types', 'Type conversion'], 'Route map of Part 1: character set and codes, escape sequences, tokens, constants and variables, primitive types and type conversion', 'Part 1 at a glance');
const vCharset = table(
  ['Category', 'Examples'],
  [
    ['Letters', 'A to Z and a to z'],
    ['Digits', '0 to 9'],
    ['Special symbols', '`+  -  *  /  %  (  )  {  }  ;  ,  .  <  >  =`'],
    ['White space', 'blank space, tab, new line'],
  ],
  'Table of the four groups of characters in the Java character set: letters, digits, special symbols and white space, with examples',
);
const asciiChars = ['A', 'Z', 'a', 'z', '0', '9', ' '];
const asciiCodes = evs(asciiChars.map((c) => `(int) '${c}'`));
const vAscii = table(
  ['Character', 'ASCII code'],
  asciiChars.map((c, i) => [c === ' ' ? 'blank space' : ic(`'${c}'`), asciiCodes[i]]),
  `Table of ASCII codes obtained by casting to int: capital A ${asciiCodes[0]}, Z ${asciiCodes[1]}, small a ${asciiCodes[2]}, z ${asciiCodes[3]}, digit 0 ${asciiCodes[4]}, digit 9 ${asciiCodes[5]} and the blank space ${asciiCodes[6]}`,
  'Capital letters, small letters and digits each have consecutive codes.',
);
const vUnicode = table(
  ['', 'ASCII', 'Unicode (Java char)'],
  [
    ['Bits per character', '7', ev('Character.SIZE')],
    ['Number of codes', ev('(int) Math.pow(2, 7)'), ev('(int) Math.pow(2, 16)')],
    ['Characters covered', 'English letters, digits, symbols', 'letters of most world languages, symbols'],
  ],
  'Table comparing ASCII with Unicode: 7 bits against 16 bits per character, 128 codes against 65536 codes, English characters against the characters of most world languages',
);
const escExamples = [
  [raw`\n`, 'starts a new line', raw`System.out.println("Hi\nAll");`],
  [raw`\t`, 'moves to the next tab stop', raw`System.out.println("A\tB".length());`],
  [raw`\\`, 'prints one backslash', raw`System.out.println("C:\\Java");`],
  [raw`\"`, 'prints a double quotation mark', raw`System.out.println("Say \"Hi\"");`],
  [raw`\'`, 'prints a single quotation mark', raw`System.out.println("It\'s");`],
];
const escOut = escExamples.map(([, , c]) => out(c).split('\n').join(' / '));
const vEsc = table(
  ['Escape sequence', 'Effect', 'Example statement', 'Result'],
  escExamples.map(([e, m, c], i) => [ic(e), m, ic(c), i === 1 ? `length ${escOut[i]} (the tab is one character)` : ic(escOut[i])]),
  'Table of the escape sequences backslash n, backslash t, double backslash, backslash double quote and backslash single quote with the effect, an example statement and its real result',
);
const cEx1 = code(raw`System.out.print("Rows:\n");`, raw`System.out.print("A\\B");`, raw`System.out.println(" and \"C\"");`, 'System.out.println("End");');
const ex1Lines = lines(cEx1);
const vEx1 = table(
  ['Line on screen', 'Text'],
  ex1Lines.map((l, i) => [String(i + 1), ic(l)]),
  `Table of the lines produced by the four statements: ${ex1Lines.map((l) => l).join(', then ')}`,
  'The first print ends its text with a new line, so the next text starts on line 2.',
);
const vTokens = (() => {
  const s = new Svg(600, 250);
  s.rect(240, 14, 120, 36, { color: 'accent', sw: 2 });
  s.text(300, 32, 'Tokens', { bold: true, size: 16 });
  const kids = [
    ['Keywords', 'class  int', 'final  while'],
    ['Identifiers', 'total', 'net_pay'],
    ['Literals', '25   3.5', "'A'   true"],
    ['Punctuators', ';  ,  ( )', '{ }  [ ]'],
    ['Operators', '+  -  *  /', '=  &&  ?:'],
  ];
  kids.forEach(([h, a, b], i) => {
    const cx = 62 + i * 119;
    s.line(300, 50, cx, 100, { sw: 1.4, color: 'muted' });
    s.rect(cx - 54, 100, 108, 36, { fill: 'fill', color: 'accent', sw: 1.6 });
    s.text(cx, 118, h, { size: 13, bold: true });
    s.text(cx, 160, a, { size: 13 });
    s.text(cx, 184, b, { size: 13 });
  });
  s.text(300, 228, 'Every program is a stream of these five kinds of token', { size: 13, muted: true });
  return s.visual('Tree diagram: the root Tokens has five branches: keywords such as class, int, final and while; identifiers such as total and net_pay; literals such as 25, 3.5, A and true; punctuators such as the semicolon, comma, brackets and braces; and operators such as plus, minus, times, divide, equals, logical and and the conditional operator', 'The five kinds of token in Java.');
})();
const vIdent = table(
  ['Name', 'Valid?', 'Reason'],
  ID.map((n, i) => [ic(n), idOk[i] ? 'Yes' : 'No', ['letters only', 'underscore is allowed', 'letters and a digit, not first', 'starts with a digit', 'contains a space', 'class is a keyword', 'the hyphen is an operator, not allowed in a name'][i]]),
  'Table of seven names with the verdict of the Java compiler: total, net_pay and Marks2 are valid; 2ndTerm starts with a digit, net pay has a space, class is a keyword and roll-no has a hyphen, so those four are invalid',
);
const vLiterals = table(
  ['Kind of literal', 'Example', 'Data type'],
  [
    ['Integer', ic('25'), 'int'],
    ['Real (floating point)', ic('3.5'), 'double'],
    ['Character', ic("'A'"), 'char'],
    ['String', ic('"Pune"'), 'String'],
    ['Boolean', ic('true'), 'boolean'],
    ['Null', ic('null'), 'no type: a reference to no object'],
  ],
  'Table of the literals of Java: integer 25 of type int, real 3.5 of type double, character A of type char, string Pune of type String, boolean true and null',
);
const cTok = 'final double RATE = 7.5;';
mustCompile(`${cTok}\nSystem.out.println(RATE);`, 'token example');
const vTokEx = table(
  ['Token', 'Kind'],
  [[ic('final'), 'keyword'], [ic('double'), 'keyword'], [ic('RATE'), 'identifier'], [ic('='), 'operator'], [ic('7.5'), 'real literal'], [ic(';'), 'punctuator']],
  'Table that classifies the six tokens of final double RATE equals 7.5 semicolon: final and double are keywords, RATE is an identifier, the equals sign is an operator, 7.5 is a real literal and the semicolon is a punctuator',
);
const cVar = code('final double RATE = 7.5;', 'int hours = 3;', 'hours = hours + 2;', 'System.out.println(RATE * hours);');
const vVar = flow('LR', ['Declare: int hours;', 'Initialise: hours = 3;', 'Use or change: hours = hours + 2;', `Constant: final double RATE = 7.5;`], `Flow of a variable: declare it, give it a first value, then use or change it; a constant declared with final cannot be changed. The program prints ${out(cVar)}`, `The program shown prints ${out(cVar)}.`);
const sizeRows = ['byte', 'short', 'char', 'int', 'float', 'long', 'double'];
const vSizes = (() => {
  const s = new Svg(600, 320);
  s.text(20, 14, 'Size of each primitive type in memory', { anchor: 'start', size: 14, bold: true });
  sizeRows.forEach((n, i) => {
    const y = 48 + i * 33;
    const bits = SIZES[n];
    s.text(20, y, n, { anchor: 'start', size: 14, bold: true });
    s.rect(90, y - 11, bits * 4.5, 22, { fill: 'fill', color: 'accent', sw: 1.5, rx: 4 });
    s.text(90 + bits * 4.5 + 10, y, `${bits} bits (${bits / 8} ${bits === 8 ? 'byte' : 'bytes'})`, { anchor: 'start', size: 13 });
  });
  s.text(20, 296, 'boolean: its size is not fixed by the Java rules; books state 1 bit or 1 byte', { anchor: 'start', size: 12, muted: true });
  return s.visual(`Bar chart of the sizes of the primitive types in bits: byte ${SIZES.byte}, short ${SIZES.short}, char ${SIZES.char}, int ${SIZES.int}, float ${SIZES.float}, long ${SIZES.long} and double ${SIZES.double}; a note says the size of boolean is not fixed by the Java rules`, 'Primitive types by size; sizes read from Java.');
})();
const cDefs = code(
  'public class Defaults {',
  '    byte b; short s; int i; long l;',
  '    float f; double d; char c; boolean ok; String name;',
  '    public static void main(String[] args) {',
  '        Defaults x = new Defaults();',
  '        System.out.println(x.b + " " + x.s + " " + x.i + " " + x.l + " " + x.f + " " + x.d + " " + (int) x.c + " " + x.ok + " " + x.name);',
  '    }',
  '}',
);
const defVals = out(cDefs).split(' ');
expect(defVals.join(' '), '0 0 0 0 0.0 0.0 0 false null', 'defaults');
const vDefaults = table(
  ['Type', 'Default value of a member variable'],
  [
    [ic('byte  short  int  long'), `${defVals[0]}`],
    [ic('float  double'), `${defVals[4]}`],
    [ic('char'), `the character with code ${defVals[6]} (the null character)`],
    [ic('boolean'), `${defVals[7]}`],
    ['String, arrays, other objects (non-primitive)', `${defVals[8]}`],
  ],
  `Table of default values of member variables: zero for byte, short, int and long; ${defVals[4]} for float and double; the character with code zero for char; ${defVals[7]} for boolean; and ${defVals[8]} for String, arrays and other objects`,
  'Local variables get no default value and must be assigned before use.',
);
const vWiden = (() => {
  const s = new Svg(640, 230);
  s.text(320, 26, 'Widening: automatic, from a smaller type to a larger one', { size: 14, bold: true });
  const chain = ['byte', 'short', 'int', 'long', 'float', 'double'];
  chain.forEach((n, i) => {
    const x = 10 + i * 106;
    s.rect(x, 62, 84, 40, { fill: 'fill', color: 'accent', sw: 1.6 });
    s.text(x + 42, 82, n, { size: 14, bold: true });
    if (i) s.arrow(x - 20, 82, x - 2, 82, { sw: 1.6, color: 'accent' });
  });
  s.rect(222, 150, 84, 40, { fill: 'fill', color: 'muted', sw: 1.6 });
  s.text(264, 170, 'char', { size: 14, bold: true });
  s.arrow(264, 148, 264, 106, { sw: 1.6, color: 'accent' });
  s.text(320, 214, 'The opposite direction (narrowing) needs a cast, for example (int) 7.9', { size: 13, muted: true });
  return s.visual('Diagram of widening conversion: byte goes to short, short to int, int to long, long to float and float to double; char also goes to int; the opposite direction, narrowing, needs a cast', 'Widening conversions are automatic; narrowing needs a cast.');
})();
const castExprs = ['(int) 7.9', '(char) 66', '(double) 7 / 2', '7 / 2', "'A' + 1", '5 / 2 * 2.0'];
const castTypes = types(castExprs);
const castVals = evs(castExprs);
const vCast = table(
  ['Expression', 'Type of result', 'Value'],
  castExprs.map((e, i) => [ic(e), castTypes[i], ic(castVals[i])]),
  `Table of six expressions with the type and value of each as run in Java: ${castExprs.map((e, i) => `${e} is ${castTypes[i]} ${castVals[i]}`).join('; ')}`,
  'A cast applies to the value right after it, before any division.',
);
const mixPre = "int a = 7; double b = 2; char c = 'A';";
const mixParts = ['a / 2', 'b * c', 'a / 2 + b * c'];
const mixTypes = types(mixParts, mixPre);
const mixVals = evs(mixParts, mixPre);
const vMix = table(
  ['Step', 'Expression', 'Type', 'Value'],
  mixParts.map((e, i) => [String(i + 1), ic(e), mixTypes[i], ic(mixVals[i])]),
  `Trace table of a mixed expression with a equal to 7, b equal to 2.0 and c equal to the character A: a divided by 2 is an ${mixTypes[0]} ${mixVals[0]}; b times c is a ${mixTypes[1]} ${mixVals[1]}; the sum is a ${mixTypes[2]} ${mixVals[2]}`,
  'The char c is promoted to its code 65 before it is multiplied.',
);
const vSummary1 = table(
  ['Idea', 'Remember'],
  [
    ['ASCII and Unicode', '7-bit ASCII has 128 codes; a Java char is a 16-bit Unicode value'],
    ['Escape sequences', '`\\n` new line, `\\t` tab, `\\\\` backslash, `\\"` quotation mark'],
    ['Tokens', 'keywords, identifiers, literals, punctuators, operators'],
    ['Identifier rules', 'letters, digits, underscore, dollar sign; no digit first; no keyword; case-sensitive'],
    ['Constant', 'declared with `final`; assigned once'],
    ['Primitive sizes in bits', `byte ${SIZES.byte}, short ${SIZES.short}, char ${SIZES.char}, int ${SIZES.int}, float ${SIZES.float}, long ${SIZES.long}, double ${SIZES.double}`],
    ['Conversion', 'widening is automatic; narrowing needs a cast and may lose data'],
  ],
  'Summary table of Part 1: ASCII and Unicode, escape sequences, tokens, identifier rules, constants, sizes of primitive types and type conversion',
);

// ---------------------------------------------------------------- visuals: Part 2
const vRoute2 = flow('LR', ['Kinds of operators', 'Arithmetic and remainder', 'Relational and logical', 'Assignment and shorthand', 'Increment and decrement', 'Ternary', 'Precedence', 'Counters, new, dot, print'], 'Route map of Part 2: kinds of operators, arithmetic and remainder, relational and logical, assignment and shorthand, increment and decrement, ternary, precedence, and counters, new, dot and print', 'Part 2 at a glance');
const vKinds = table(
  ['Kind', 'Operands', 'Examples'],
  [
    ['Unary', 'one', '`++`  `--`  `!`  unary `-`'],
    ['Binary', 'two', '`+`  `*`  `%`  `>`  `&&`  `=`'],
    ['Ternary', 'three', '`?:`'],
  ],
  'Table of the kinds of operators by the number of operands: unary with one operand, binary with two and ternary with three',
);
const arExprs = ['7 + 2 * 3', '7 / 2', '7.0 / 2', '7 % 2', '-17 % 5', '17 % -5', '17.5 % 5', '20.0 / 0'];
const arVals = evs(arExprs);
const vArith = table(
  ['Expression', 'Result', 'Remark'],
  arExprs.map((e, i) => [ic(e), ic(arVals[i]), ['multiplication first', 'both operands int: integer division', 'one real operand: real division', 'remainder', 'sign follows the dividend', 'sign follows the dividend', '% works on real numbers too', 'a real number divided by zero'][i]]),
  `Table of eight arithmetic expressions with results from Java: ${arExprs.map((e, i) => `${e} gives ${arVals[i]}`).join('; ')}`,
  'Integer division by zero, for example 20 / 0, stops the program with an ArithmeticException.',
);
const relExprs = ['5 > 3', '5 == 3', '5 != 3', '!(5 > 3)', '(5 > 3) && (2 > 4)', '(5 > 3) || (2 > 4)'];
const relVals = evs(relExprs);
const vRel = table(
  ['Expression', 'Value', 'Operator used'],
  relExprs.map((e, i) => [ic(e), ic(relVals[i]), ['relational (greater than)', 'relational (equal to)', 'relational (not equal to)', 'logical NOT', 'logical AND: true only if both are true', 'logical OR: true if at least one is true'][i]]),
  `Table of relational and logical expressions with their boolean values: ${relExprs.map((e, i) => `${e} is ${relVals[i]}`).join('; ')}`,
);
const scRows = ['false && (++hits > 0)', 'true && (++hits > 0)', 'true || (++hits > 0)', 'false || (++hits > 0)'];
const scOut = scRows.map((e) => out('int hits = 0;', `boolean r = ${e};`, 'System.out.println(r + " " + hits);').split(' '));
const vShort = table(
  ['Expression', 'Result', 'hits afterwards', 'Right operand evaluated?'],
  scRows.map((e, i) => [ic(e), scOut[i][0], scOut[i][1], scOut[i][1] === '1' ? 'Yes' : 'No']),
  `Table of four logical expressions with a counter hits that starts at 0: ${scRows.map((e, i) => `${e} gives ${scOut[i][0]} and hits is ${scOut[i][1]}`).join('; ')}`,
  'With a false left operand AND, or a true left operand OR, the right side is skipped.',
);
const shRows = ['x += 3', 'x -= 3', 'x *= 3', 'x /= 3', 'x %= 3'];
const shVals = shRows.map((s) => out('int x = 10;', `${s};`, 'System.out.println(x);'));
const vShorthand = table(
  ['Shorthand', 'Same as', 'x afterwards (x starts at 10)'],
  shRows.map((s, i) => [ic(s), ic(s.replace(/^x (.)= (\d)$/, (m, op, n) => `x = x ${op} ${n}`)), shVals[i]]),
  `Table of shorthand assignment operators with x starting at 10 and the right operand 3: ${shRows.map((s, i) => `${s} leaves x as ${shVals[i]}`).join('; ')}`,
);
const idRows = [['b = a++;', 'int b = a++;'], ['b = ++a;', 'int b = ++a;'], ['b = a--;', 'int b = a--;'], ['b = --a;', 'int b = --a;']];
const idOut = idRows.map(([, c]) => out('int a = 5;', c, 'System.out.println(b + " " + a);').split(' '));
const vIncDec = table(
  ['Statement (a starts at 5)', 'Value stored in b', 'a afterwards'],
  idRows.map(([s], i) => [ic(s), idOut[i][0], idOut[i][1]]),
  `Table of increment and decrement statements with a starting at 5: ${idRows.map(([s], i) => `${s} stores ${idOut[i][0]} and leaves a as ${idOut[i][1]}`).join('; ')}`,
  'Postfix uses the old value; prefix uses the new value.',
);
const cTrace = code('int a = 5;', 'int t1 = a++;', 'int w1 = a;', 'int t2 = ++a;', 'int w2 = a;', 'System.out.println(t1 + " " + w1 + " " + t2 + " " + w2 + " " + (t1 + t2));');
const tr = out(cTrace).split(' ');
expect(tr[4], ev('a++ + ++a', 'int a = 5;'), 'trace total');
const vTraceInc = table(
  ['Step', 'Part of the expression', 'Value used', 'a afterwards'],
  [['1', ic('a++'), tr[0], tr[1]], ['2', ic('++a'), tr[2], tr[3]], ['3', ic('a++ + ++a'), `${tr[0]} + ${tr[2]} = ${tr[4]}`, tr[3]]],
  `Trace table for a++ plus ++a with a equal to 5: a++ uses ${tr[0]} and makes a ${tr[1]}; ++a makes a ${tr[3]} and uses ${tr[2]}; the sum is ${tr[4]}`,
  'Evaluate the operands from left to right.',
);
const cTern = code('int marks = 39;', 'String result = (marks >= 40) ? "Pass" : "Fail";', 'System.out.println(result);');
const vTern = flow('LR', ['Condition: marks >= 40', 'If true: value after the question mark', 'If false: value after the colon'], `Flow of the ternary operator: the condition is tested; if true the first value is used, otherwise the second. With marks 39 the program prints ${out(cTern)}`, `With marks equal to 39 the program prints ${out(cTern)}.`, [{ from: 'n1', to: 'n2' }, { from: 'n1', to: 'n3' }]);
const vLadder = (() => {
  const rows = [
    ['1', '(  )   .   (dot)', 'left to right'],
    ['2', 'postfix  a++  a--', 'left to right'],
    ['3', 'prefix  ++a  --a   unary  +  -  !   cast', 'right to left'],
    ['4', '*   /   %', 'left to right'],
    ['5', '+   -', 'left to right'],
    ['6', '<   <=   >   >=', 'left to right'],
    ['7', '==   !=', 'left to right'],
    ['8', '&&', 'left to right'],
    ['9', '||', 'left to right'],
    ['10', '?:', 'right to left'],
    ['11', '=   +=   -=   *=   /=   %=', 'right to left'],
  ];
  const s = new Svg(620, 380);
  s.text(20, 14, 'Highest precedence at the top', { anchor: 'start', size: 13, bold: true });
  s.text(430, 14, 'Associativity', { anchor: 'start', size: 13, bold: true });
  rows.forEach(([n, ops, as], i) => {
    const y = 28 + i * 30;
    s.rect(10, y, 600, 26, { fill: i % 2 ? undefined : 'fill', color: 'muted', sw: 1, rx: 4 });
    s.text(26, y + 13, n, { size: 13, bold: true, color: 'accent' });
    s.text(52, y + 13, ops, { anchor: 'start', size: 13 });
    s.text(430, y + 13, as, { anchor: 'start', size: 13, muted: true });
  });
  s.text(20, 370, 'Lowest precedence at the bottom', { anchor: 'start', size: 12, muted: true });
  return s.visual('Ladder of operator precedence, highest first: brackets and dot; postfix increment and decrement; prefix increment, unary plus, minus, not and cast; multiply, divide and remainder; add and subtract; less than and greater than comparisons; equal and not equal; logical and; logical or; the conditional operator; and assignment operators. All binary operators associate left to right; prefix and unary operators, the conditional operator and assignment associate right to left', 'Operator precedence and associativity of the common operators.');
})();
const asRows = ['100 / 10 / 5', '10 - 4 - 3', '-(-3)'];
const asVals = evs(asRows);
const cChain = out('int a, b;', 'a = b = 7;', 'System.out.println(a + " " + b);');
const vAssoc = table(
  ['Operators', 'Direction', 'Example', 'Result'],
  [
    [ic('*  /  %  +  -'), 'left to right', ic(asRows[0]), ic(asVals[0])],
    ['comparison and logical', 'left to right', ic(asRows[1]), ic(asVals[1])],
    [ic('=  +=  -='), 'right to left', ic('a = b = 7;'), `a and b hold ${ic(cChain)}`],
    ['unary', 'right to left', ic(asRows[2]), ic(asVals[2])],
  ],
  `Table of associativity: arithmetic operators go left to right, so 100 / 10 / 5 is ${asVals[0]}; assignment and unary operators go right to left, so a = b = 7 leaves a and b as ${cChain}`,
);
const stepExprs = ['12 / 4', '3 * 2', '7 % 3', '8 + 6', '14 - 1'];
const stepVals = evs(stepExprs);
const vStepEval = table(
  ['Step', 'Operation', 'Result', 'What is left'],
  [
    ['1', ic('12 / 4'), stepVals[0], ic('8 + 3 * 2 - 7 % 3')],
    ['2', ic('3 * 2'), stepVals[1], ic('8 + 6 - 7 % 3')],
    ['3', ic('7 % 3'), stepVals[2], ic('8 + 6 - 1')],
    ['4', ic('8 + 6'), stepVals[3], ic('14 - 1')],
    ['5', ic('14 - 1'), stepVals[4], `the value ${ev('8 + 12 / 4 * 2 - 7 % 3')}`],
  ],
  `Step table for 8 + 12 / 4 * 2 - 7 % 3: 12 / 4 is ${stepVals[0]}, 3 * 2 is ${stepVals[1]}, 7 % 3 is ${stepVals[2]}, 8 + 6 is ${stepVals[3]} and 14 - 1 is ${stepVals[4]}`,
  'Multiplication, division and remainder go left to right before addition and subtraction.',
);
const cCount = code('int i = 1, sum = 0, count = 0;', 'while (i <= 6) {', '    if (i % 2 == 0) {', '        sum += i;', '        count++;', '    }', '    System.out.println(i + " " + count + " " + sum);', '    i++;', '}');
const cntRows = lines(cCount).map((l) => l.split(' '));
const vCount = table(
  ['i', 'count (counter)', 'sum (accumulator)'],
  cntRows.map((r) => [r[0], r[1], r[2]]),
  `Trace table of a loop that counts and adds the even numbers from 1 to 6: the counter ends at ${cntRows[5][1]} and the accumulator at ${cntRows[5][2]}`,
  'The counter grows by 1 each time; the accumulator grows by the value of i.',
);
const vNewDot = flow('LR', ['Scanner sc = new Scanner(System.in);', 'new creates a Scanner object in memory', 'Its reference is stored in sc', 'sc.nextInt() uses the dot to call a method'], 'Flow of new and dot: the new operator creates a Scanner object, its reference is stored in sc, and the dot operator calls the method nextInt on it', 'new creates the object; the dot reaches its members.');
const pRows = [
  ['print("A"); print("B");', 'System.out.print("A");\nSystem.out.print("B");'],
  ['println("A"); println("B");', 'System.out.println("A");\nSystem.out.println("B");'],
  ['print("A"); println(); print("B");', 'System.out.print("A");\nSystem.out.println();\nSystem.out.print("B");'],
  ['println("x" + 1 + 2);', 'System.out.println("x" + 1 + 2);'],
  ['println(1 + 2 + "x");', 'System.out.println(1 + 2 + "x");'],
];
const pOut = pRows.map(([, c]) => out(c).split('\n').join(' / '));
const vPrint = table(
  ['Statements', 'Output (lines joined by a slash)'],
  pRows.map(([s], i) => [ic(s), ic(pOut[i])]),
  `Table of print and println examples with their output: ${pRows.map(([s], i) => `${s} gives ${pOut[i]}`).join('; ')}`,
  'print stays on the line; println finishes the line.',
);
const cSwap = code('int a = 47, b = 19;', 'a = a + b;', 'System.out.println(a + " " + b);', 'b = a - b;', 'System.out.println(a + " " + b);', 'a = a - b;', 'System.out.println(a + " " + b);');
const sw = lines(cSwap).map((l) => l.split(' '));
const vSwap = table(
  ['Step', 'Statement', 'a', 'b'],
  [['start', 'a = 47, b = 19', '47', '19'], ['1', ic('a = a + b;'), sw[0][0], sw[0][1]], ['2', ic('b = a - b;'), sw[1][0], sw[1][1]], ['3', ic('a = a - b;'), sw[2][0], sw[2][1]]],
  `Trace table of swapping 47 and 19 without a third variable: after step 1 a is ${sw[0][0]}, after step 2 b is ${sw[1][1]}, and after step 3 a is ${sw[2][0]}`,
  'The old value of a is recovered in b, and then the old b in a.',
);
const vSummary2 = table(
  ['Idea', 'Remember'],
  [
    ['Unary, binary, ternary', 'one, two and three operands'],
    ['Division', 'int divided by int gives an int; one real operand gives a real'],
    ['Remainder', 'the sign follows the dividend: `-17 % 5` is -2'],
    ['Logical operators', '`&&` and `||` short-circuit: the right side may be skipped'],
    ['Shorthand', '`x += 3` means `x = x + 3`'],
    ['Increment', '`a++` uses then adds 1; `++a` adds 1 then uses'],
    ['Ternary', '`condition ? value1 : value2`'],
    ['Precedence', 'brackets, unary, `* / %`, `+ -`, comparison, `&&`, `||`, `?:`, assignment'],
    ['new and dot', '`new` creates an object; the dot reaches its members'],
    ['print and println', 'println ends the line; print does not'],
  ],
  'Summary table of Part 2: kinds of operators, division, remainder, logical operators, shorthand, increment, ternary, precedence, new and dot, and print and println',
);

// ---------------------------------------------------------------- deck 1
const part1 = deck({
  part: 1,
  title: 'Values and Data Types: Characters, Tokens, Types and Conversion',
  goals: [
    'State the ASCII codes of common characters and explain Unicode',
    'Predict the output of print statements that contain escape sequences',
    'Classify tokens and decide whether an identifier is valid',
    'State the size and default value of each primitive type',
    'Predict the type and value of a mixed expression and of a cast',
  ],
  slides: [
    sl('title', 'Values and data types', {
      b: 'Part 1: **characters and codes**, **tokens**, **constants and variables**, **primitive types** and **type conversion**.',
      v: vRoute1,
      n: 'Welcome to the revision of values and data types. In this part we look at the characters Java understands, the numeric codes behind them, and the escape sequences used inside strings. Then we study tokens, constants and variables, the primitive data types with their sizes and default values, and finally how Java converts one type into another, both automatically and with a cast.',
    }),
    sl('concept', 'The Java character set', {
      b: 'The **character set** is the group of characters a language recognises. Java source code is written with letters, digits, special symbols and white space.',
      v: vCharset,
      n: 'The character set of a language is the group of characters it understands. Java programs are written using four kinds of characters. Letters, both capital and small. Digits from zero to nine. Special symbols such as brackets, arithmetic signs, the semicolon and the comma. And white space, meaning the blank space, the tab and the new line. Every token in a program is built from characters of this set.',
    }),
    sl('concept', 'ASCII codes', {
      b: `${F("char ch = 'A';", 'System.out.println((int) ch);')}\n\nOutput: ${ic(out("char ch = 'A';", 'System.out.println((int) ch);'))}`,
      v: vAscii,
      n: `Every character is stored in the computer as a number called its code. ASCII uses seven bits, so it has ${ev('(int) Math.pow(2, 7)')} codes, numbered from zero to one hundred and twenty seven. Capital A has the code ${codeOf('A')}, small a has the code ${codeOf('a')}, and the digit character zero has the code ${codeOf('0')}. Casting a character to int shows its code. Notice that small letters have larger codes than capital letters.`,
    }),
    sl('concept', 'Unicode', {
      b: '**Unicode** is a much larger code. A Java `char` is stored as a 16-bit Unicode value, and the first 128 Unicode codes are the ASCII codes.',
      v: vUnicode,
      n: `ASCII is enough for English, but not for Hindi, Tamil or Bengali. Unicode solves this with a much larger set of codes. A Java char occupies ${ev('Character.SIZE')} bits, which allows ${ev('(int) Math.pow(2, 16)')} different codes. The first one hundred and twenty eight Unicode codes are the same as ASCII, so old text still works.`,
    }),
    sl('check', 'Quick check: ASCII codes', {
      b: 'Fill in the blanks.',
      chk: 'fb_ascii',
      n: 'Recall the codes of capital A and of the digit character zero.',
    }),
    sl('concept', 'Escape sequences', {
      b: 'An **escape sequence** is a backslash followed by a character; it stands for one special character in a string or a character literal.',
      v: vEsc,
      n: `An escape sequence is a backslash followed by a character. It stands for one special character inside a string. Backslash n starts a new line. Backslash t moves to the next tab stop. A double backslash prints one backslash, and backslash followed by a double quotation mark prints a quotation mark. In the table, the string with a tab has length ${ev('"A\\tB".length()')}, because the tab counts as one character.`,
    }),
    sl('example', 'Worked example 1: tracing a print with escapes', {
      b: `${F(cEx1)}\n\n1. \`print\` shows **Rows:** and then the new line from the escape.\n2. The double backslash shows one backslash.\n3. \`println\` ends the line after the quoted word.`,
      v: vEx1,
      n: 'Follow the four statements. The first one prints the word Rows and then a new line, because of the escape inside its string. The second prints the letter A, one backslash and the letter B, all on line two. The third continues on the same line and prints the word and, then the capital letter C in quotation marks. Because it is println, the cursor moves down, and the last statement prints End on line three.',
    }),
    sl('concept', 'Tokens', {
      b: 'A **token** is the smallest individual unit of a program that is meaningful to the compiler.',
      v: vTokens,
      n: 'A token is the smallest unit of a program that means something to the compiler. There are five kinds. Keywords are reserved words such as class and while. Identifiers are names chosen by the programmer. Literals are fixed values such as numbers, characters and strings. Punctuators, also called separators, are symbols such as the semicolon and the brackets. Operators perform calculations and comparisons.',
    }),
    sl('concept', 'Identifiers and their rules', {
      b: 'An **identifier** may contain letters, digits, the underscore and the dollar sign. It cannot start with a digit, cannot contain a space and cannot be a keyword. Java is case-sensitive.',
      v: vIdent,
      n: 'An identifier is a name given to a variable, a class or a method. It may use letters, digits, the underscore and the dollar sign. It must not begin with a digit, must not contain a space or an operator such as the hyphen, and must not be a keyword. Remember that Java is case sensitive, so Total and total are two different names. The table shows what the compiler decided for seven names.',
    }),
    sl('concept', 'Literals', {
      b: 'A **literal** is a constant value written directly in the program.',
      v: vLiterals,
      n: 'A literal is a fixed value written directly in the program. An integer literal such as twenty five has the type int. A real literal such as three point five has the type double. A character literal is one character in single quotes. A string literal is text in double quotes. The boolean literals are true and false, and null means a reference to no object at all.',
    }),
    sl('example', 'Worked example 2: classify the tokens of a statement', {
      b: `${F(cTok)}\n\nBreak the statement into tokens from left to right and name the kind of each.`,
      v: vTokEx,
      n: 'Let us classify the tokens of a declaration that creates a constant. The words final and double are both keywords. RATE is an identifier, a name chosen by the programmer. The equals sign is the assignment operator. Seven point five is a real literal, and the semicolon at the end is a punctuator. That makes six tokens in one statement.',
    }),
    sl('check', 'Quick check: kinds of token', {
      b: 'Match each item with its kind of token.',
      chk: 'mt_tokens',
      n: 'Decide which items are reserved, which are names, which are values and which are separators.',
    }),
    sl('concept', 'Constants and variables', {
      b: `A **variable** is a named memory location whose value can change; a **constant** is declared with \`final\` and keeps its first value.\n\n${F(cVar)}\n\nOutput: ${ic(out(cVar))}`,
      v: vVar,
      n: `A variable is a named location in memory whose value can change while the program runs. First we declare it, giving a data type and a name. Then we initialise it, giving it a first value. After that we can use it or change it. A constant is declared with the keyword final and its value can never change. The program on the slide prints ${out(cVar)}.`,
    }),
    sl('concept', 'Primitive data types and their sizes', {
      b: 'A **primitive data type** is a basic type built into Java that holds a single value.',
      v: vSizes,
      n: `Java has eight primitive types. Byte takes ${SIZES.byte} bits, short and char take ${SIZES.short}, int and float take ${SIZES.int}, and long and double take ${SIZES.long}. The size of boolean is not fixed by the Java rules, so books commonly state one bit or one byte. Whole numbers use byte, short, int and long. Real numbers use float and double. Single characters use char.`,
    }),
    sl('concept', 'Default values; non-primitive types', {
      b: `${F('Defaults x = new Defaults();', 'System.out.println(x.i + " " + x.ok + " " + x.name);')}\n\nNon-primitive (reference) types are built from classes: **classes, arrays and String**.`,
      v: vDefaults,
      n: 'When an object is created, its member variables receive default values. Whole numbers start at zero, real numbers at zero point zero, a char at the character with code zero, and a boolean at false. Every non-primitive type, such as a String or an array, starts as null. Non-primitive types are created from classes and refer to objects. Local variables inside a method get no default value and must be assigned first.',
    }),
    sl('check', 'Quick check: default values', {
      b: 'Match each type with its default value.',
      chk: 'mt_defaults',
      n: 'Think about what an object holds before any value is assigned to its members.',
    }),
    sl('diagram', 'Implicit conversion: widening', {
      b: 'Java converts a smaller type to a larger one **automatically**. This is **implicit conversion**, also called **widening**.',
      v: vWiden,
      n: 'Implicit conversion happens automatically when a value of a smaller type is stored in a larger type. The chain runs from byte to short to int to long to float to double. A char can also be widened to int. No information is lost, so Java does not ask for permission. Going the opposite way is called narrowing, and Java insists on an explicit cast, because data may be lost.',
    }),
    sl('concept', 'Explicit conversion and type promotion', {
      b: 'A **cast** such as `(int) 7.9` forces a conversion to the type in brackets. In an expression, `byte`, `short` and `char` are promoted to `int`; if one operand is `double` the result is `double`.',
      v: vCast,
      n: `A cast forces a value into another type. Casting seven point nine to int gives ${ev('(int) 7.9')}, because the fraction is dropped, not rounded. In arithmetic, byte, short and char are first promoted to int. If one operand is double the whole result is double. That is why dividing two ints gives an int, and why adding one to the character A gives ${ev("'A' + 1")}.`,
    }),
    sl('example', 'Worked example 3: type and value of a mixed expression', {
      b: `${F('int a = 7;', 'double b = 2;', "char c = 'A';", 'double r = a / 2 + b * c;')}\n\nWork out each part and its type before combining them.`,
      v: vMix,
      n: `Let us evaluate a divided by two plus b times c. Multiplication and division come first. The variable a is an int, so seven divided by two is the int ${mixVals[0]}. The char c is promoted to its code sixty five, and two point zero times sixty five is the double ${mixVals[1]}. Finally the int ${mixVals[0]} plus the double ${mixVals[1]} gives the double ${mixVals[2]}.`,
    }),
    sl('check', 'Quick check: casts and division', {
      b: 'Write the exact output.',
      chk: 'co_cast_trio',
      n: 'Decide for each line whether the division is done on integers or on doubles.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. ASCII has one hundred and twenty eight codes and a Java char is a sixteen bit Unicode value. Escape sequences start with a backslash. Tokens are keywords, identifiers, literals, punctuators and operators. A constant is declared with final. Know the size of every primitive type. Widening is automatic, narrowing needs a cast, and the cast drops the fraction.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Learn the codes: `A` is 65, `a` is 97, `0` is 48. Capital plus 32 gives the small letter.',
        'A `char` plus an `int` is an `int`: `\'A\' + 1` shows 66, not `B`.',
        'A cast drops the fraction; it does not round: `(int) 7.9` is 7.',
        'Integer division first, then the cast: `(double) (a / b)` is not the same as `(double) a / b`.',
        'In error questions look for a double stored in an int, an undeclared name, a changed `final` and a name that starts with a digit.',
      ],
      n: 'A few exam tips. Learn the codes for capital A, small a and the digit zero. Adding an int to a char gives an int, so the letter must be cast back. A cast to int drops the fraction and never rounds. Watch where the cast sits, because dividing first and casting afterwards gives a different answer. In error questions, look for a double stored in an int, a name that was never declared, and a constant that is changed.',
    }),
  ],
});

// ---------------------------------------------------------------- deck 2
const part2 = deck({
  part: 2,
  title: 'Operators: Arithmetic, Logical, Increment, Precedence and Output',
  goals: [
    'Classify operators as unary, binary or ternary and use them correctly',
    'Evaluate expressions with the remainder, relational, logical and shorthand operators',
    'Evaluate prefix and postfix increment and decrement and use the ternary operator',
    'Use precedence and associativity to evaluate a compound expression step by step',
    'Explain counters, accumulators, new, the dot operator, print and println',
  ],
  slides: [
    sl('title', 'Operators', {
      b: 'Part 2: **arithmetic, relational, logical, assignment, increment, ternary**, then **precedence**, **new**, **dot** and **print** versus **println**.',
      v: vRoute2,
      n: 'In Part 2 we study operators. We start with how operators are classified, then arithmetic and the remainder operator, the relational and logical operators, assignment and shorthand, increment and decrement, and the ternary operator. After that we learn how Java decides which operator goes first, and finish with counters, accumulators, the new and dot operators, and the difference between print and println.',
    }),
    sl('concept', 'Kinds of operators', {
      b: 'An **operator** is a symbol that acts on one or more **operands** to produce a value.',
      v: vKinds,
      n: 'An operator is a symbol that works on one or more operands and produces a value. A unary operator needs one operand, for example the increment operator or the logical not. A binary operator needs two operands, like the plus sign or the greater than sign. The ternary operator, the question mark and colon pair, is the only one that needs three operands.',
    }),
    sl('concept', 'Arithmetic operators', {
      b: 'The arithmetic operators are `+`, `-`, `*`, `/` and `%`. The result of `/` depends on the types of the operands; the **sign of `%`** follows the dividend.',
      v: vArith,
      n: `Division depends on the operand types. Seven divided by two is ${arVals[1]} when both are int, because the fraction is thrown away, but ${arVals[2]} when one operand is real. The remainder operator gives what is left after division. Its sign follows the dividend, so minus seventeen remainder five is ${arVals[4]}, while seventeen remainder minus five is ${arVals[5]}. The remainder operator also works on real numbers.`,
    }),
    sl('check', 'Quick check: sign of the remainder', {
      b: 'Choose the correct option.',
      chk: 'ar_neg_rem',
      n: 'Recall which operand decides the sign of a remainder.',
    }),
    sl('concept', 'Relational and logical operators', {
      b: 'Relational operators (`>`, `<`, `>=`, `<=`, `==`, `!=`) compare two values and give a **boolean**. Logical operators `&&`, `||` and `!` combine boolean values.',
      v: vRel,
      n: 'Relational operators compare two values and always give true or false. They are greater than, less than, greater or equal, less or equal, equal to and not equal to. Logical operators combine boolean values. The logical and gives true only when both sides are true. The logical or gives true when at least one side is true. The logical not reverses a value.',
    }),
    sl('concept', 'Short-circuit evaluation', {
      b: 'The operators `&&` and `||` stop as soon as the answer is known. The right operand may **never be evaluated**.',
      v: vShort,
      n: 'The logical and and the logical or are short circuit operators. If the left side of the logical and is false, the answer must be false, so the right side is skipped. If the left side of the logical or is true, the answer must be true, so again the right side is skipped. The counter in the table shows whether the right side ran. This is why a check for zero before a division is safe.',
    }),
    sl('check', 'Quick check: short circuit', {
      b: 'Write the exact output.',
      chk: 'co_shortcircuit',
      n: 'For each line, decide whether the right operand is ever evaluated.',
    }),
    sl('concept', 'Assignment and shorthand operators', {
      b: `The assignment operator \`=\` stores a value. A shorthand operator combines an operation with assignment, so \`x += 3\` means \`x = x + 3\`.\n\nAssignment can be chained: ${ic('a = b = 7;')} stores ${ic(cChain)} in a and b.`,
      v: vShorthand,
      n: `The assignment operator stores the value on its right into the variable on its left. Shorthand operators combine an arithmetic operation with assignment. Plus equals adds to the variable, minus equals subtracts, and so on. With x starting at ten, adding three gives ${shVals[0]} and taking the remainder by three gives ${shVals[4]}. Assignments can also be chained, and they are evaluated from right to left.`,
    }),
    sl('concept', 'Increment and decrement operators', {
      b: 'The operators `++` and `--` add or subtract 1. In the **prefix** form the variable changes first and the new value is used; in the **postfix** form the old value is used first.',
      v: vIncDec,
      n: `The increment operator adds one and the decrement operator subtracts one. In the prefix form, the variable is changed first and the new value is used. In the postfix form, the current value is used first and the variable changes afterwards. With a starting at five, b equals a plus plus stores ${idOut[0][0]} and leaves a as ${idOut[0][1]}. The prefix form stores ${idOut[1][0]}.`,
    }),
    sl('example', 'Worked example 1: postfix and prefix in one expression', {
      b: `${F('int a = 5;', 'int b = a++ + ++a;')}\n\nEvaluate the operands from left to right and keep track of a after each one.`,
      v: vTraceInc,
      n: `Start with a equal to five. The first operand is a plus plus. It uses the old value, ${tr[0]}, and then a becomes ${tr[1]}. The second operand is plus plus a. It makes a ${tr[3]} first and uses ${tr[3]}. So b is ${tr[0]} plus ${tr[2]}, which is ${tr[4]}, and a ends as ${tr[3]}.`,
    }),
    sl('check', 'Quick check: prefix and postfix', {
      b: 'True or false?',
      chk: 'tf_prepost',
      n: 'Compare the value stored in b in the two statements.',
    }),
    sl('concept', 'The ternary operator', {
      b: `The **conditional (ternary) operator** is \`condition ? value1 : value2\`. It is a compact form of if-else.\n\n${F(cTern)}\n\nOutput: ${ic(out(cTern))}`,
      v: vTern,
      n: `The ternary operator takes three operands. It tests the condition first. If the condition is true, the value after the question mark is the result; if it is false, the value after the colon is the result. It is a compact way to write a simple if else statement. With marks equal to thirty nine and a pass mark of forty, the program prints ${out(cTern)}.`,
    }),
    sl('diagram', 'Operator precedence', {
      b: '**Precedence** decides which operator is evaluated first when an expression has more than one. Brackets always win.',
      v: vLadder,
      n: 'Operator precedence tells Java which operator to apply first when an expression has several. At the top are brackets and the dot. Then come the increment and decrement operators, and the unary operators. Multiply, divide and remainder come before add and subtract. Then comparisons, then equality, then the logical and, then the logical or, then the ternary operator. Assignment comes last. Brackets can always be used to force an order.',
    }),
    sl('concept', 'Associativity', {
      b: '**Associativity** decides the order when operators have the **same precedence**. Most operators go left to right; **assignment and unary operators go right to left**.',
      v: vAssoc,
      n: `When two operators have the same precedence, associativity decides the order. Most operators go from left to right, so one hundred divided by ten divided by five is ${asVals[0]}, not fifty. Assignment and unary operators go from right to left. That is why a chained assignment stores the value in the right most variable first, and why minus of minus three is ${asVals[2]}.`,
    }),
    sl('example', 'Worked example 2: evaluating step by step', {
      b: `${F('int r = 8 + 12 / 4 * 2 - 7 % 3;')}\n\nDivision, multiplication and remainder come first, from left to right; then addition and subtraction from left to right.`,
      v: vStepEval,
      n: `Evaluate eight plus twelve divided by four times two minus seven remainder three. First the high precedence group from left to right. Twelve divided by four is ${stepVals[0]}. Then ${stepVals[0]} times two is ${stepVals[1]}. Seven remainder three is ${stepVals[2]}. Now the low precedence group. Eight plus ${stepVals[1]} is ${stepVals[3]}, and ${stepVals[3]} minus ${stepVals[2]} is ${stepVals[4]}.`,
    }),
    sl('check', 'Quick check: order of evaluation', {
      b: 'Arrange the steps in order.',
      chk: 'ord_eval',
      n: 'Remember: arithmetic first, then comparison, then the logical operator, and left to right within a level.',
    }),
    sl('concept', 'Counters and accumulators', {
      b: `A **counter** changes by a fixed step to count events; an **accumulator** collects a running total.\n\n${F(cCount)}`,
      v: vCount,
      n: `A counter is a variable that goes up or down by a fixed step, usually one, to count how many times something happens. An accumulator is a variable that collects a running total, adding a different amount each time. In the loop on the slide, count is the counter and sum is the accumulator. After the loop, the counter holds ${cntRows[5][1]} and the accumulator holds ${cntRows[5][2]}.`,
    }),
    sl('concept', 'The new and dot operators', {
      b: 'The **new** operator creates an object of a class and returns its reference. The **dot** operator accesses a member (a method or a variable) of an object or a class, for example `sc.nextInt()` or `Math.sqrt(49)`.',
      v: vNewDot,
      n: 'The new operator creates an object of a class in memory and gives back a reference to it. In the statement on the slide, new makes a Scanner object, and its reference is stored in the variable sc. The dot operator then reaches a member of an object or of a class. Writing sc dot nextInt calls a method on the object, and Math dot sqrt calls a method of the Math class.',
    }),
    sl('concept', 'print versus println', {
      b: '`System.out.print()` leaves the cursor on the **same line**. `System.out.println()` moves to the **next line** after printing. The `+` operator joins text, working from left to right.',
      v: vPrint,
      n: `The print method shows its argument and leaves the cursor on the same line. The println method shows its argument and then moves the cursor to the next line. Used with no argument, println just moves down a line. The plus sign adds numbers or joins text, from left to right. So one plus two followed by the text x gives ${ev('1 + 2 + "x"')}, but the text x followed by one and two gives ${ev('"x" + 1 + 2')}.`,
    }),
    sl('example', 'Worked example 3: swapping two numbers without a third variable', {
      b: `${F(cSwap)}\n\nEach statement uses the value that the previous one produced.`,
      v: vSwap,
      n: `We swap forty seven and nineteen using only two variables. Step one stores the sum, ${sw[0][0]}, in a. Step two subtracts the old b from the new a, which leaves ${sw[1][1]} in b, the original a. Step three subtracts the new b from a, which leaves ${sw[2][0]} in a, the original b. The two values have changed places.`,
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. Operators are unary, binary or ternary. Integer division drops the fraction, and the remainder takes the sign of the dividend. The logical and and the logical or short circuit. Shorthand operators combine an operation with assignment. Prefix increment uses the new value, postfix uses the old one. Follow precedence and associativity, use new to create objects, and remember that println ends the line.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Show every step of an expression: highest precedence first, then left to right within a level.',
        'Integer division drops the fraction: `7 / 2` is 3. The sign of `%` follows the dividend.',
        'For `a++ + ++a` write a small table of the value used and the value of `a` after each operand.',
        '`&&` and `||` may skip the right side, so a counter on the right may not change.',
        'Rewrite if-else with `?:` as `condition ? value1 : value2`; for string joins, work from left to right.',
      ],
      n: 'Some exam tips for this part. In an expression, show each step, doing the highest precedence first and going from left to right within a level. Integer division drops the fraction, and the remainder takes the sign of the dividend. For increment questions, make a small table of the value used and the value left in the variable. Remember that short circuit operators may skip the right side. And for string joins, work from left to right.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Values, Data Types and Operators: notes',
  sections: [
    {
      h: '1. Character set, ASCII, Unicode and escape sequences',
      t: 1,
      b: `The **character set** of Java consists of letters, digits, special symbols and white space.\n\n- **ASCII** is a 7-bit code: ${ev('(int) Math.pow(2, 7)')} codes, 0 to 127. The code of \`'A'\` is ${codeOf('A')}, of \`'a'\` is ${codeOf('a')} and of \`'0'\` is ${codeOf('0')}.\n- **Unicode** is a larger code. A Java \`char\` is a 16-bit Unicode value; its first 128 codes are the ASCII codes.\n- An **escape sequence** is a backslash plus a character standing for one special character. \`${raw`\n`}\` new line, \`${raw`\t`}\` tab, \`${raw`\\`}\` backslash, \`${raw`\"`}\` double quotation mark, \`${raw`\'`}\` single quotation mark.\n\n${F("System.out.println((int) 'A');", "System.out.println((char) 66);", raw`System.out.println("Say \"Hi\"\nBye");`)}\n\nOutput:\n\n\`\`\`\n${out("System.out.println((int) 'A');", 'System.out.println((char) 66);', raw`System.out.println("Say \"Hi\"\nBye");`)}\n\`\`\``,
      terms: [
        ['Character set', 'The group of characters a language recognises; for Java: letters, digits, special symbols and white space.'],
        ['ASCII', 'American Standard Code for Information Interchange: a 7-bit code giving 128 characters their numbers 0 to 127.'],
        ['Unicode', 'A code with a number for the characters of most languages of the world; a Java char is a 16-bit Unicode value.'],
        ['Escape sequence', 'A backslash followed by a character that stands for a single special character in a string or character literal.'],
      ],
      v: vAscii,
      vs: [vUnicode, vEsc],
    },
    {
      h: '2. Tokens and identifiers',
      t: 2,
      b: `A **token** is the smallest individual unit of a program that is meaningful to the compiler. The five kinds are:\n\n- **Keywords** (reserved words): \`class\`, \`int\`, \`final\`, \`while\`\n- **Identifiers**: names of variables, classes and methods\n- **Literals**: integer \`25\`, real \`3.5\`, character \`'A'\`, string \`"Pune"\`, boolean \`true\`, and \`null\`\n- **Punctuators** (separators): \`;\` \`,\` \`( )\` \`{ }\` \`[ ]\`\n- **Operators**: \`+\`, \`*\`, \`=\`, \`&&\`, \`?:\`\n\n**Rules for identifiers:** letters, digits, the underscore and the dollar sign only; the first character must not be a digit; no spaces; not a keyword; case-sensitive (\`Total\` and \`total\` differ).`,
      terms: [
        ['Token', 'The smallest individual unit of a program that has a meaning for the compiler.'],
        ['Keyword', 'A word reserved by Java with a fixed meaning; it cannot be used as an identifier.'],
        ['Identifier', 'A name given by the programmer to a variable, class or method.'],
        ['Literal', 'A constant value written directly in the program, such as 25, 3.5, \'A\', "Pune" or true.'],
        ['Punctuator', 'A symbol that separates or groups parts of a program, such as the semicolon, comma, bracket or brace.'],
      ],
      v: vTokens,
      vs: [vIdent, vLiterals],
    },
    {
      h: '3. Constants and variables',
      t: 2,
      b: `A **variable** is a named memory location whose value can change. **Declaration** states the data type and name (\`int hours;\`); **initialisation** gives the first value (\`hours = 3;\`); both may be combined: \`int hours = 3;\`.\n\nA **constant** is declared with the keyword \`final\`; it is assigned once and any later assignment is a compile-time error. By convention its name is written in capital letters.\n\n${F(cVar)}\n\nOutput: ${ic(out(cVar))}`,
      terms: [
        ['Variable', 'A named memory location that stores a value which can change while the program runs.'],
        ['Constant', 'A named value declared with final whose value cannot be changed after it is assigned.'],
        ['Declaration', 'A statement that gives the data type and name of a variable.'],
        ['Initialisation', 'Giving a variable its first value.'],
      ],
      v: vVar,
      vs: [vTokEx],
    },
    {
      h: '4. Data types and type conversion',
      t: 3,
      b: `A **data type** specifies the kind of values a variable can hold and the operations allowed on them.\n\n- **Primitive types** (basic types built into Java): \`byte\` ${SIZES.byte} bits, \`short\` ${SIZES.short}, \`int\` ${SIZES.int}, \`long\` ${SIZES.long}, \`float\` ${SIZES.float}, \`double\` ${SIZES.double}, \`char\` ${SIZES.char}, and \`boolean\` (its size is not fixed by the Java rules; books commonly say 1 bit or 1 byte).\n- **Non-primitive (reference) types** are made from classes: **classes, arrays and String**.\n- **Default values** of member variables: 0 for whole numbers, 0.0 for real numbers, the null character for \`char\`, \`false\` for \`boolean\`, \`null\` for objects.\n- **Implicit conversion (widening)** is automatic from a smaller to a larger type. **Explicit conversion (casting, narrowing)** is written with the target type in brackets and may lose data.\n- **Type promotion:** in an expression \`byte\`, \`short\` and \`char\` become \`int\`; if an operand is \`double\` the result is \`double\`.\n\n${F('System.out.println((int) 7.9);', "System.out.println('A' + 1);", 'System.out.println(5 / 2 * 2.0);')}\n\nOutput:\n\n\`\`\`\n${out('System.out.println((int) 7.9);', "System.out.println('A' + 1);", 'System.out.println(5 / 2 * 2.0);')}\n\`\`\``,
      terms: [
        ['Data type', 'The kind of values a variable can hold, together with the operations that can be done on them.'],
        ['Type casting', 'Explicit conversion of a value from one data type to another by writing the new type in brackets before it.'],
        ['Implicit conversion', 'Automatic conversion of a smaller data type to a larger one; also called widening.'],
        ['Type promotion', 'Automatic conversion of byte, short and char operands to int, and of lower types to the highest type present, in an expression.'],
      ],
      v: vSizes,
      vs: [vDefaults, vWiden, vCast],
    },
    {
      h: '5. Operators',
      t: 4,
      b: `An **operator** is a symbol that acts on **operands** to give a value. By operand count: **unary** (one), **binary** (two) and **ternary** (three, \`?:\`).\n\n- **Arithmetic:** \`+ - * / %\`. int / int gives an int; \`%\` takes the sign of the dividend.\n- **Relational:** \`> < >= <= == !=\` give a boolean.\n- **Logical:** \`&&\`, \`||\`, \`!\`. \`&&\` and \`||\` are **short-circuit**: the right operand is skipped when the left decides the result.\n- **Assignment and shorthand:** \`=\`, \`+=\`, \`-=\`, \`*=\`, \`/=\`, \`%=\`.\n- **Increment and decrement:** \`++\` and \`--\`; prefix changes first, postfix uses the old value first.\n- **Ternary:** \`condition ? value1 : value2\`.\n\n${F('int a = 5;', 'int b = a++ + ++a;', 'System.out.println(a + " " + b);', 'System.out.println(-17 % 5);')}\n\nOutput:\n\n\`\`\`\n${out('int a = 5;', 'int b = a++ + ++a;', 'System.out.println(a + " " + b);', 'System.out.println(-17 % 5);')}\n\`\`\``,
      terms: [
        ['Operator', 'A symbol that performs an operation on one or more operands.'],
        ['Operand', 'A value or variable on which an operator acts.'],
        ['Short-circuit evaluation', 'Stopping the evaluation of && or || as soon as the result is known, so the right operand may not be evaluated.'],
        ['Ternary operator', 'The conditional operator ?: with three operands: a condition and two values.'],
      ],
      v: vKinds,
      vs: [vArith, vRel, vShort, vIncDec, vTern],
    },
    {
      h: '6. Precedence, associativity, counters, new, dot, print and println',
      t: 5,
      b: `**Operator precedence** is the order in which operators are applied when an expression has more than one. **Associativity** is the direction (left to right or right to left) used when operators have the same precedence. Binary arithmetic, relational and logical operators go left to right; assignment, unary and the ternary operator go right to left.\n\n${F('int r = 8 + 12 / 4 * 2 - 7 % 3;', 'System.out.println(r);')}\n\nOutput: ${ic(ev('8 + 12 / 4 * 2 - 7 % 3'))}\n\n- A **counter** changes by a fixed step to count events (\`count++\`); an **accumulator** collects a running total (\`sum += i\`).\n- **new** creates an object and returns its reference: \`Scanner sc = new Scanner(System.in);\`\n- The **dot operator** accesses a member of an object or class: \`sc.nextInt()\`, \`Math.sqrt(49)\`.\n- \`print\` stays on the same line; \`println\` moves to the next line. Between a number and a String, \`+\` joins; it works from left to right: \`1 + 2 + "x"\` gives ${ic(ev('1 + 2 + "x"'))} but \`"x" + 1 + 2\` gives ${ic(ev('"x" + 1 + 2'))}.`,
      terms: [
        ['Operator precedence', 'The rule that decides which operator is applied first when an expression has more than one.'],
        ['Associativity', 'The direction, left to right or right to left, in which operators of equal precedence are applied.'],
        ['Counter', 'A variable that is increased or decreased by a fixed step to count how many times something happens.'],
        ['Accumulator', 'A variable that collects a running total by adding a value each time.'],
      ],
      v: vLadder,
      vs: [vAssoc, vStepEval, vCount, vNewDot, vPrint],
    },
  ],
  tips: '**Common mistakes**\n- Writing `int n = 12.5;` or `int p = 3 + 4.5;` without a cast.\n- Using a variable that was never declared, or one that was declared but not given a value.\n- Changing a `final` constant.\n- Starting an identifier with a digit, or using a keyword as a name.\n- Expecting `7 / 2` to be 3.5, or `(int) 7.9` to be 8.\n- Forgetting that `a++` gives the old value and `++a` the new one.\n- Forgetting that `+` joins text from left to right, so `1 + 2 + "x"` and `"x" + 1 + 2` differ.\n\n**How marks are usually awarded**\n- Output questions: marks for each correct line, in the exact format (`3.0`, `true`, `-2`).\n- Error questions: the error named and the line given.\n- Short answers: one point per mark with an example where possible.\n- Programs (15 marks): class and method structure, input, logic, output, variable description or comments.',
});

// ---------------------------------------------------------------- flashcards
const FC = cards([
  ['What does the Java character set contain?', 'Letters, digits, special symbols and white space.', 'definition', 1],
  ['How many bits does ASCII use, and what is its range?', `7 bits; ${ev('(int) Math.pow(2, 7)')} codes, 0 to 127.`, 'fact', 1],
  [ic("(int) 'A'"), ic(codeOf('A')), 'example', 1],
  [ic("(int) 'a'"), ic(codeOf('a')), 'example', 1],
  [ic("(int) '0'"), ic(codeOf('0')), 'example', 1],
  ['What is Unicode?', 'A code with numbers for the characters of most languages; a Java char is a 16-bit Unicode value.', 'definition', 1],
  [ic("'A' + 1"), `${ic(ev("'A' + 1"))}: the char is promoted to int, so no letter appears.`, 'exam-tip', 1],
  ['What is an escape sequence?', 'A backslash plus a character that stands for one special character, e.g. a new line.', 'definition', 1],
  ['Escape sequences for new line, tab, backslash and double quote', `${ic(raw`\n`)}  ${ic(raw`\t`)}  ${ic(raw`\\`)}  ${ic(raw`\"`)}`, 'fact', 1],
  ['What is a token? Name the five kinds.', 'The smallest unit meaningful to the compiler: keywords, identifiers, literals, punctuators, operators.', 'definition', 2],
  ['Rules for an identifier', 'Letters, digits, underscore, dollar sign; not a digit first; no space; not a keyword; case-sensitive.', 'concept', 2],
  ['Is `2ndTerm` a valid identifier?', '**No**: it starts with a digit.', 'exam-tip', 2],
  ['Name the kinds of literal', 'Integer, real, character, string, boolean and null.', 'fact', 2],
  ['How do you declare a constant?', `With the keyword final: ${ic('final double RATE = 7.5;')}; a later assignment is a compile-time error.`, 'concept', 2],
  ['Declaration versus initialisation', 'Declaration gives the type and name; initialisation gives the first value.', 'concept', 2],
  ['Sizes of byte, short, char, int in bits', `${SIZES.byte}, ${SIZES.short}, ${SIZES.char}, ${SIZES.int}`, 'fact', 3],
  ['Sizes of float, long, double in bits', `${SIZES.float}, ${SIZES.long}, ${SIZES.double}`, 'fact', 3],
  ['What is the size of boolean?', 'Not fixed by the Java rules; books commonly state 1 bit or 1 byte.', 'fact', 3],
  ['Default values of int, double, boolean and String members', `${defVals[2]}, ${defVals[5]}, ${defVals[7]}, ${defVals[8]}`, 'fact', 3],
  ['Name the non-primitive types', 'Classes, arrays and String.', 'fact', 3],
  ['Implicit versus explicit conversion', 'Implicit (widening) is automatic to a larger type; explicit (a cast) forces a smaller type and may lose data.', 'concept', 3],
  [ic('(int) 7.9'), `${ic(ev('(int) 7.9'))}: a cast drops the fraction.`, 'example', 3],
  [ic('5 / 2 * 2.0'), `${ic(ev('5 / 2 * 2.0'))}: integer division first.`, 'example', 3],
  ['Unary, binary and ternary operators', 'One, two and three operands; the only ternary operator is `?:`.', 'definition', 4],
  [ic('-17 % 5'), `${ic(ev('-17 % 5'))}: the sign follows the dividend.`, 'example', 4],
  ['What is short-circuit evaluation?', 'The right operand of `&&` or `||` is skipped when the left operand already decides the result.', 'definition', 4],
  ['`b = a++` with a = 5 stores?', `${ic(out('int a = 5;', 'int b = a++;', 'System.out.println(b + " " + a);').split(' ')[0])} in b; a becomes ${out('int a = 5;', 'int b = a++;', 'System.out.println(b + " " + a);').split(' ')[1]}.`, 'example', 4],
  ['Shorthand for `x = x * 4`', ic('x *= 4'), 'fact', 4],
  ['Ternary form', ic('condition ? value1 : value2'), 'fact', 4],
  ['What is operator precedence?', 'The rule that decides which operator is applied first.', 'definition', 5],
  ['Associativity of arithmetic, and of assignment', 'Arithmetic: left to right. Assignment and unary: right to left.', 'fact', 5],
  ['Counter versus accumulator', 'A counter changes by a fixed step to count; an accumulator keeps a running total.', 'concept', 5],
  ['Roles of `new` and the dot operator', '`new` creates an object and returns its reference; the dot operator accesses a member of an object or class.', 'concept', 5],
  ['`print` versus `println`', '`print` stays on the line; `println` moves to the next line after printing.', 'concept', 5],
].slice(0, 34));

// ---------------------------------------------------------------- tests (icse-10-computer-applications chapter-test blueprints)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'icse-10-computer-applications-chapter-test-short',
  title: 'Chapter test (short): Values, Data Types and Operators',
  duration: 30,
  sections: [
    { id: 'A', title: 'Section A: Compulsory (10 marks)', instr: 'Attempt all questions. Questions 1 to 6 are multiple-choice (1 mark each); questions 7 and 8 carry 2 marks each.', items: ['m_ascii_bits', 'm_valid_id', 'm_cast_trunc', 'm_rem', 'm_prec_value', 'm_tab_len', 's_decl_init', 's_ternary_rewrite'] },
    { id: 'B', title: 'Section B: Program (15 marks)', instr: 'Attempt any ONE of the two programs. Write the program in Java with variable descriptions or comments.', items: [{ attempt: 1, keys: ['l_temp', 'l_interest'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'icse-10-computer-applications-chapter-test-long',
  title: 'Chapter test (long): Values, Data Types and Operators',
  duration: 60,
  sections: [
    { id: 'A', title: 'Section A: Compulsory (20 marks)', instr: 'Attempt all questions. Questions 1 to 10 are multiple-choice (1 mark each); questions 11 to 13 are short answers and questions 14 and 15 are predict-the-output items, 2 marks each.', items: ['m_code_a', 'm_char_plus', 'm_keyword', 'm_classify', 'm_mixed', 'm_float_literal', 'm_pp', 'm_shortcircuit', 'm_assoc', 'm_new', 's_ascii_unicode', 's_prim_nonprim', 's_between', 'co_esc_lines', 'co_incdec'] },
    { id: 'B', title: 'Section B: Programs (30 marks)', instr: 'Attempt any TWO of the three programs. Write each program in Java with variable descriptions or comments.', items: [{ attempt: 2, keys: ['l_bill', 'l_area', 'l_swap'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 to t05 of icse-10-computer-applications-ch02 only; bitwise and shift operators are not covered',
    originality: 'every program, scenario and data value written for this chapter by SOYL with imagined names; no textbook, specimen or past-paper program reused',
    execution: 'every output, value, type and error in items, slides, notes and flashcards produced by compiling and running the code with JDK 21 (runJava in lib.mjs); results cached in src/java-cache.json',
    gate: 'schema, pipeline lint, deterministic verify, narration rules and the answer-leak scan run clean in this build',
  },
});
