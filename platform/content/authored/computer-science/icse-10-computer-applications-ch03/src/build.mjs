// Build ICSE 10 Computer Applications ch03 "Revision: Input in Java and Mathematical Library Methods". Run from platform/:
//   npx tsx content/authored/computer-science/icse-10-computer-applications-ch03/src/build.mjs
// Every program output, value, type and error shown in decks, notes, flashcards and questions is produced by running Java.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg, useJavaCache, javaOut } from '../../icse-10-computer-applications-ch01/src/lib.mjs';

const SRC = path.dirname(fileURLToPath(import.meta.url));
setUnit('icse-10-computer-applications-ch03', 'computer-science');
useJavaCache(SRC);
await import('./q_a.mjs');
await import('./q_b.mjs');
await import('./q_c.mjs');
await import('./q_d.mjs');
const { code, F, ic, ev, out, outIn, errIn, mustFail, mustCompile, expect, rangeOf, typeOf } = await import('./q_util.mjs');
const DIR = path.resolve(SRC, '..');

const SCAN = 'Scanner sc = new Scanner(System.in);';
/** Values of several single-line expressions, from one program. */
const evs = (exprs, pre = '') => javaOut(`${pre ? pre + '\n' : ''}${exprs.map((e) => `System.out.println(${e});`).join('\n')}`).split('\n');
/** Number written for narration: minus sign and decimal point spoken as words. */
const sp = (v) => String(v).replace(/-/g, 'minus ').replace(/\./g, ' point ').replace('NaN', 'not a number');
const rg = (e) => rangeOf(e).join(' to ');
/** Output of a program that reads the typed text, shown on one line. */
const one = (s) => s.split('\n').join(' / ');
const program = (imp, ...lines) => code(...(imp ? [imp] : []), 'public class Demo {', '    public static void main(String[] args) {', ...lines.map((l) => '        ' + l), '    }', '}');
const mainWith = (cls, ...lines) => code('import java.util.Scanner;', '', `public class ${cls} {`, '    public static void main(String[] args) {', ...lines.map((l) => '        ' + l), '    }', '}');

// ---------------------------------------------------------------- facts the narration states in words; stop if any differs
const pitIn = '40\nRiya Nair\n';
const cPit = code(SCAN, 'int age = sc.nextInt();', 'String name = sc.nextLine();', 'System.out.println("Name: " + name + ".");');
const cFix = code(SCAN, 'int age = sc.nextInt();', 'sc.nextLine();', 'String name = sc.nextLine();', 'System.out.println("Name: " + name + ".");');
const cNext = code(SCAN, 'int age = sc.nextInt();', 'String name = sc.next();', 'System.out.println("Name: " + name + ".");');
const pitOut = outIn(pitIn, cPit);
const fixOut = outIn(pitIn, cFix);
const nextOut = outIn(pitIn, cNext);
expect(pitOut, 'Name: .', 'pitfall output');
expect(fixOut, 'Name: Riya Nair.', 'fixed output');
expect(nextOut, 'Name: Riya.', 'next() output');
expect(ev('Math.round(2.5)'), '3', 'round 2.5');
expect(ev('Math.round(-2.5)'), '-2', 'round -2.5');
expect(ev('Math.ceil(-3.2)'), '-3.0', 'ceil -3.2');
expect(ev('Math.floor(-3.2)'), '-4.0', 'floor -3.2');
expect(ev('Math.round(-3.2)'), '-3', 'round -3.2');
expect(ev('Math.sqrt(-4)'), 'NaN', 'sqrt -4');
expect(ev('Math.pow(2, 3)'), '8.0', 'pow');
expect(ev('Math.cbrt(27)'), '3.0', 'cbrt');
expect(ev('Math.abs(-7)'), '7', 'abs int');
expect(typeOf('Math.round(2.6)'), 'long', 'round type');
expect(typeOf('Math.round(2.6f)'), 'int', 'round float type');
expect(typeOf('Math.abs(-7)'), 'int', 'abs int type');
expect(typeOf('Math.abs(-7.5)'), 'double', 'abs double type');
expect(typeOf('Math.max(3, 4.5)'), 'double', 'max mixed type');
expect(typeOf('Math.max(3, 4)'), 'int', 'max int type');
expect(typeOf('Math.pow(2, 3)'), 'double', 'pow type');
expect(typeOf('Math.sqrt(16)'), 'double', 'sqrt type');
expect(typeOf('Math.cbrt(8)'), 'double', 'cbrt type');
expect(typeOf('Math.ceil(2.1)'), 'double', 'ceil type');
expect(typeOf('Math.floor(2.1)'), 'double', 'floor type');
expect(typeOf('Math.random()'), 'double', 'random type');
expect(rg('(int) (Math.random() * 6) + 1'), '1 to 6', 'die');
expect(rg('(int) (Math.random() * 100)'), '0 to 99', '0 to 99');
expect(rg('(int) (Math.random() * 11) + 10'), '10 to 20', '10 to 20');
expect(rg('(int) (Math.random() * 50) + 1'), '1 to 50', '1 to 50');
expect(rg('(int) (Math.random() * 6)'), '0 to 5', '0 to 5');
expect(out('double lo = 9, hi = -1;', 'for (int i = 0; i < 50000; i++) {', '    double v = Math.random() * 6;', '    if (v < lo) lo = v;', '    if (v > hi) hi = v;', '}', 'System.out.println((lo >= 0) + " " + (hi < 6));'), 'true true', 'random times 6');
expect(ev('(-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a)', 'int a = 2, b = -7, c = 3;'), '3.0', 'quadratic larger root');
expect(ev('(-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a)', 'int a = 2, b = -7, c = 3;'), '0.5', 'quadratic smaller root');
expect(ev('b * b - 4 * a * c', 'int a = 2, b = -7, c = 3;'), '25', 'discriminant');
expect(ev('Math.sqrt(25)'), '5.0', 'sqrt 25');
expect(ev('Math.sqrt(9 * 9 + 12 * 12)'), '15.0', 'hypotenuse');
expect(ev('4 / 3'), '1', '4 / 3');
expect(ev('7 ^ 2'), '5', 'caret is xor');
mustCompile(program('', 'double side = 12;', 'System.out.println(side * side);'), 'init program');

// ---------------------------------------------------------------- SVG visuals
const vWays = (() => {
  const s = new Svg(640, 250);
  s.rect(210, 14, 220, 38, { color: 'accent', sw: 2 });
  s.text(320, 33, 'Input to a program', { bold: true, size: 16 });
  const kids = [
    ['Initialisation', 'int side = 12;', 'value fixed in the program'],
    ['Parameters', 'area(7) in BlueJ', 'value passed at the call'],
    ['Scanner class', 'sc.nextInt()', 'value typed while running'],
  ];
  kids.forEach(([h, a, b], i) => {
    const cx = 110 + i * 210;
    s.line(320, 52, cx, 96, { sw: 1.4, color: 'muted' });
    s.rect(cx - 95, 96, 190, 40, { fill: 'fill', color: 'accent', sw: 1.6 });
    s.text(cx, 116, h, { size: 15, bold: true });
    s.text(cx, 160, a, { size: 13 });
    s.text(cx, 184, b, { size: 12, muted: true });
  });
  s.text(320, 226, 'Only the Scanner class lets the user supply new data each time the program runs', { size: 12, muted: true });
  return s.visual('Tree diagram: the root Input to a program has three branches: initialisation, for example int side equals 12, where the value is fixed in the program; parameters, for example area of 7 in BlueJ, where the value is passed at the call; and the Scanner class, for example sc dot nextInt, where the value is typed while the program runs', 'The three ways of giving input to a Java program.');
})();
const scanRows = [
  ['nextInt()', 'int', 'a whole number'],
  ['nextLong()', 'long', 'a large whole number'],
  ['nextFloat()', 'float', 'a real number'],
  ['nextDouble()', 'double', 'a real number'],
  ['next()', 'String', 'one word'],
  ['nextLine()', 'String', 'the rest of the line'],
  ['next().charAt(0)', 'char', 'first letter of a word'],
];
const vScanTable = (() => {
  const s = new Svg(640, 340);
  s.text(20, 16, 'Method', { anchor: 'start', size: 14, bold: true });
  s.text(250, 16, 'Returns', { anchor: 'start', size: 14, bold: true });
  s.text(370, 16, 'Reads', { anchor: 'start', size: 14, bold: true });
  scanRows.forEach(([m, t, r], i) => {
    const y = 34 + i * 42;
    s.rect(10, y, 620, 36, { fill: i % 2 ? undefined : 'fill', color: 'muted', sw: 1, rx: 4 });
    s.text(24, y + 18, m, { anchor: 'start', size: 14, bold: true });
    s.text(250, y + 18, t, { anchor: 'start', size: 14, color: 'accent' });
    s.text(370, y + 18, r, { anchor: 'start', size: 14 });
  });
  s.text(320, 330, 'Every call goes through a Scanner object, for example sc.nextInt()', { size: 12, muted: true });
  return s.visual('Table of Scanner methods with the type each returns and what it reads: nextInt returns int, a whole number; nextLong returns long, a large whole number; nextFloat returns float and nextDouble returns double, both real numbers; next returns a String, one word; nextLine returns a String, the rest of the line; next dot charAt of 0 returns a char, the first letter of a word', 'Scanner methods, their return types and what they read.');
})();
const vErrTree = (() => {
  const s = new Svg(640, 270);
  s.rect(210, 12, 220, 38, { color: 'accent', sw: 2 });
  s.text(320, 31, 'Errors in a program', { bold: true, size: 16 });
  const kids = [
    ['Syntax error', ['also called compile-time', 'found by javac', 'no bytecode produced'], 'missing semicolon'],
    ['Run-time error', ['found while running', 'an exception is thrown', 'the program stops'], '100 divided by 0'],
    ['Logical error', ['the program runs to the end', 'the result is wrong', 'found by testing'], 'a + b + c / 3 as average'],
  ];
  kids.forEach(([h, lines, ex], i) => {
    const cx = 110 + i * 210;
    s.line(320, 50, cx, 90, { sw: 1.4, color: 'muted' });
    s.rect(cx - 95, 90, 190, 40, { fill: 'fill', color: 'accent', sw: 1.6 });
    s.text(cx, 110, h, { size: 15, bold: true });
    lines.forEach((l, k) => s.text(cx, 152 + k * 22, l, { size: 12.5 }));
    s.text(cx, 240, 'e.g. ' + ex, { size: 12, muted: true });
  });
  return s.visual('Tree diagram: the root Errors in a program has three branches: syntax error, also called compile-time error, found by javac with no bytecode produced, for example a missing semicolon; run-time error, found while running when an exception is thrown and the program stops, for example 100 divided by 0; and logical error, where the program runs to the end but the result is wrong and is found by testing, for example a plus b plus c divided by 3 as an average', 'The three types of error.');
})();
const nlExprs = [['Math.floor(-3.2)', -3.2], ['Math.ceil(-3.2)', -3.2], ['Math.round(-3.2)', -3.2], ['Math.floor(2.5)', 2.5], ['Math.ceil(2.5)', 2.5], ['Math.round(2.5)', 2.5]];
const nlVals = evs(nlExprs.map(([e]) => e));
const vNumLine = (() => {
  const s = new Svg(640, 270);
  const X = (n) => 45 + (n + 5) * 60;
  s.arrow(20, 95, 620, 95, { sw: 1.6 });
  for (let n = -5; n <= 4; n++) {
    s.line(X(n), 89, X(n), 101, { sw: 1.4 });
    s.text(X(n), 114, String(n), { size: 13 });
  }
  const mark = (v, label) => {
    s.dot(X(v), 95, 5, 'accent');
    s.text(X(v), 52, label, { size: 14, bold: true });
    s.line(X(v), 62, X(v), 90, { sw: 1.2, dash: true, color: 'muted' });
  };
  mark(-3.2, 'value -3.2');
  mark(2.5, 'value 2.5');
  s.text(X(-4), 140, `floor ${nlVals[0]}`, { size: 12.5 });
  s.text(X(-3), 162, `ceil ${nlVals[1]}`, { size: 12.5 });
  s.text(X(-3), 184, `round ${nlVals[2]}`, { size: 12.5 });
  s.text(X(2), 140, `floor ${nlVals[3]}`, { size: 12.5 });
  s.text(X(3), 162, `ceil ${nlVals[4]}`, { size: 12.5 });
  s.text(X(3), 184, `round ${nlVals[5]}`, { size: 12.5 });
  s.text(320, 232, `A half goes up: Math.round(-2.5) is ${ev('Math.round(-2.5)')} and Math.round(2.5) is ${ev('Math.round(2.5)')}`, { size: 13, muted: true });
  return s.visual(`Number line from minus 5 to 4. For the value minus 3.2 floor is ${nlVals[0]}, ceil is ${nlVals[1]} and round is ${nlVals[2]}. For the value 2.5 floor is ${nlVals[3]}, ceil is ${nlVals[4]} and round is ${nlVals[5]}. A value exactly half way is rounded upwards, towards positive infinity`, 'ceil, floor and round of a negative and a positive value on the number line.');
})();

// ---------------------------------------------------------------- tables and flows: deck 1
const vRoute1 = flow('LR', ['Three ways of input', 'The Scanner class', 'Numbers, words and characters', 'The nextLine pitfall', 'Wrong input', 'Packages and import'], 'Route map of Part 1: three ways of input, the Scanner class, numbers words and characters, the nextLine pitfall, wrong input, and packages and import', 'Part 1 at a glance');
const initOut = out('double side = 12;', 'System.out.println(side * side);');
const vWaysTable = table(
  ['Way', 'Where the value comes from', 'To use new data'],
  [
    ['Initialisation', 'written inside the program', 'edit the source code and compile again'],
    ['Parameters', 'passed to a method when it is called (in BlueJ, typed in a dialog box)', 'call the method again with other values'],
    ['Scanner class', 'typed by the user while the program is running', 'just type the new values'],
  ],
  'Table comparing the three ways of input: initialisation takes the value from the program and needs the source code edited; parameters take the value from the call; the Scanner class takes the value typed by the user while the program runs',
);
const cDisc = code('public class Disc {', '    double area(double r) {', '        return 3.14 * r * r;', '    }', '    public static void main(String[] args) {', '        Disc d = new Disc();', '        System.out.println(d.area(7));', '    }', '}');
const discOut = javaOut(cDisc);
const vParam = flow('LR', ['Call: d.area(7)', '7 is the actual parameter', 'copied into the formal parameter r', `the method returns ${discOut}`], `Flow of a call by parameter: the call d dot area of 7 sends the actual parameter 7, which is copied into the formal parameter r, and the method returns ${discOut}`, `The call shows ${discOut}.`);
const vSetup = flow('LR', ['import java.util.Scanner;', 'new Scanner(System.in) creates the object', 'its reference is stored in sc', 'sc.nextInt() and the other methods read input'], 'Flow of using Scanner: import the class from java.util, create the object with new Scanner of System dot in, store its reference in sc, and call reading methods such as nextInt on it', 'Import, create, then read.');
const numRows = [
  ['12', 'int n = sc.nextInt();', 'n'],
  ['3.5', 'double d = sc.nextDouble();', 'd'],
  ['3', 'double d = sc.nextDouble();', 'd'],
];
const numRes = numRows.map(([inp, st, v]) => outIn(inp + '\n', SCAN, st, `System.out.println(${v});`));
const eMis = errIn('3.5\n', 'runtime', SCAN, 'int n = sc.nextInt();').err;
const vNumbers = table(
  ['Typed', 'Statement', 'Result'],
  [...numRows.map(([inp, st], i) => [ic(inp), ic(st), ic(numRes[i])]), [ic('3.5'), ic('int n = sc.nextInt();'), ic(eMis)]],
  `Table of what happens when numbers are read: typed 12 with nextInt gives ${numRes[0]}; typed 3.5 with nextDouble gives ${numRes[1]}; typed 3 with nextDouble gives ${numRes[2]}; typed 3.5 with nextInt throws ${eMis}`,
  'A whole number typed for nextDouble is accepted and shown as a double.',
);
const lineIn = 'Asha Rao\n';
const wlRows = [
  ['next()', SCAN + '\nSystem.out.println(sc.next());'],
  ['nextLine()', SCAN + '\nSystem.out.println(sc.nextLine());'],
  ['next().charAt(0)', SCAN + '\nSystem.out.println(sc.next().charAt(0));'],
  ['next() and then nextLine()', SCAN + '\nString a = sc.next();\nString b = sc.nextLine();\nSystem.out.println("[" + b + "]");'],
];
const wlOut = wlRows.map(([, c]) => outIn(lineIn, c));
const vWords = table(
  ['Typed line: Asha Rao', 'Result'],
  wlRows.map(([m], i) => [ic(m), i === 3 ? `${ic(wlOut[i])} (the blank is still there)` : ic(wlOut[i])]),
  `Table of what each reading method gives for the typed line Asha Rao: next gives ${wlOut[0]}; nextLine gives ${wlOut[1]}; next dot charAt of 0 gives ${wlOut[2]}; next followed by nextLine gives the rest of the line, ${wlOut[3]}`,
);
const cReceipt = mainWith('Receipt', SCAN, 'String item = sc.next();', 'int qty = sc.nextInt();', 'double price = sc.nextDouble();', 'double total = qty * price;', 'System.out.println(item + " x " + qty + " = " + total);');
const receiptOut = outIn('pencil 12 4.5\n', cReceipt);
expect(receiptOut, 'pencil x 12 = 54.0', 'receipt');
const vReceipt = table(
  ['Statement', 'Token read', 'Variable now holds'],
  [
    [ic('String item = sc.next();'), 'pencil', 'item: pencil'],
    [ic('int qty = sc.nextInt();'), '12', 'qty: 12'],
    [ic('double price = sc.nextDouble();'), '4.5', 'price: 4.5'],
    [ic('double total = qty * price;'), 'none', `total: ${ev('12 * 4.5')}`],
  ],
  `Trace table for the program with the typed input pencil 12 4.5: item holds pencil, qty holds 12, price holds 4.5 and total holds ${ev('12 * 4.5')}; the output is ${receiptOut}`,
  `The program displays ${receiptOut}.`,
);
const vBuffer = table(
  ['Step', 'What happens', 'Input still unread'],
  [
    ['start', 'typed: 40, Enter, Riya Nair, Enter', '40 [Enter] Riya Nair [Enter]'],
    ['1', `${ic('int age = sc.nextInt();')} reads 40`, '[Enter] Riya Nair [Enter]'],
    ['2', `${ic('String name = sc.nextLine();')} reads up to the first Enter: empty text`, 'Riya Nair [Enter]'],
  ],
  `Table of the unread input: after nextInt reads 40 the Enter key is still waiting; nextLine reads up to it and returns empty text, so the name is empty and the program shows ${pitOut}`,
  `The program displays ${ic(pitOut)}.`,
);
const vFix = table(
  ['Approach', 'Statements after reading the age', 'Output'],
  [
    ['Broken', ic('nextLine()'), ic(pitOut)],
    ['Fix 1: use up the Enter', `${ic('sc.nextLine();')} then ${ic('nextLine()')}`, ic(fixOut)],
    ['Fix 2: read a word only', ic('next()'), ic(nextOut)],
  ],
  `Table of three approaches for the typed lines 40 and Riya Nair: the broken program shows ${pitOut}; using one extra nextLine to use up the Enter shows ${fixOut}; using next shows only ${nextOut}`,
  'Fix 1 keeps the whole name; fix 2 stops at the blank.',
);
const mismatchRows = [['abc', 'int n = sc.nextInt();', 'abc\n'], ['4.5', 'int n = sc.nextInt();', '4.5\n'], ['nothing typed', 'int n = sc.nextInt();', '']];
const mismatchErr = mismatchRows.map(([, st, inp]) => errIn(inp, 'runtime', SCAN, st).err);
const vMismatch = table(
  ['Typed', 'Statement', 'Exception'],
  mismatchRows.map(([t, st], i) => [t, ic(st), ic(mismatchErr[i])]),
  `Table of wrong input for nextInt: abc gives ${mismatchErr[0]}; 4.5 gives ${mismatchErr[1]}; typing nothing gives ${mismatchErr[2]}`,
  'The exception stops the program at once.',
);
const vPackages = table(
  ['Package', 'Some of its classes', 'Imported automatically?'],
  [
    [ic('java.lang'), 'String, Math, System', 'Yes'],
    [ic('java.util'), 'Scanner', 'No: needs an import statement'],
  ],
  'Table of two packages: java.lang holds String, Math and System and is imported automatically; java.util holds Scanner and needs an import statement',
);
const impPrograms = [
  ['import java.util.Scanner;', 'import java.util.Scanner;'],
  ['import java.util.*;', 'import java.util.*;'],
  ['import java.*;', 'import java.*;'],
  ['import java.lang.Scanner;', 'import java.lang.Scanner;'],
  ['no import statement', ''],
].map(([label, imp]) => {
  const src = program(imp, SCAN);
  return { label, imp, ok: (() => { try { mustCompile(src); return true; } catch { return false; } })(), msg: (() => { try { mustCompile(src); return ''; } catch { return mustFail(src); } })() };
});
expect(impPrograms.map((p) => p.ok).join(), 'true,true,false,false,false', 'import programs');
const vImports = table(
  ['Statement at the top', 'Scanner usable?', 'Reason'],
  impPrograms.map((p, i) => [ic(p.label), p.ok ? 'Yes' : 'No', p.ok ? ['imports the one class', 'imports every class of java.util'][i] : [ '', '', `the asterisk does not reach into packages inside java: ${p.msg}`, `java.lang has no class Scanner: ${p.msg}`, `the class is not found: ${p.msg}`][i]]),
  `Table of import statements: import java.util.Scanner and import java.util.* make Scanner usable; import java.* , import java.lang.Scanner and having no import statement all fail with ${impPrograms[2].msg}`,
);
const cLunch = code('import java.util.*;', 'public class Lunch {', '    public static void main(String[] args) {', '        ' + SCAN, '        int plates = sc.nextInt();', '        System.out.println(plates * 40);', '    }', '}');
const cPaint = mainWith('RoomPaint', SCAN,
  'System.out.println("Enter length, breadth, height and rate per square metre:");',
  'double l = sc.nextDouble();',
  'double b = sc.nextDouble();',
  'double h = sc.nextDouble();',
  'double rate = sc.nextDouble();',
  'double walls = 2 * h * (l + b);   // area of the four walls',
  'double cost = walls * rate;',
  'System.out.println("Wall area = " + walls);',
  'System.out.println("Painting cost = " + cost);');
const paintOut = outIn('8 6 3 120\n', cPaint);
const paintLines = paintOut.split('\n');
const vPaint = flow('LR', ['import and Scanner object', 'read length, breadth, height, rate', 'walls = 2 * h * (l + b)', 'cost = walls * rate', 'display wall area and cost'], `Flow of the painting program: import and create the Scanner, read four values, find the wall area, find the cost and display both. With the input 8 6 3 120 the output is ${one(paintOut)}`, `With the input 8 6 3 120: ${one(paintOut)}.`);
const vSummary1 = table(
  ['Idea', 'Remember'],
  [
    ['Ways of input', 'initialisation, parameters and the Scanner class'],
    ['Scanner set-up', '`import java.util.Scanner;` and `Scanner sc = new Scanner(System.in);`'],
    ['Reading methods', '`nextInt()`, `nextLong()`, `nextFloat()`, `nextDouble()`, `next()`, `nextLine()`'],
    ['A character', '`sc.next().charAt(0)`'],
    ['Pitfall', 'after `nextInt()` a `nextLine()` returns an empty string; read it once and discard it'],
    ['Wrong input', 'letters for a number give `InputMismatchException`'],
    ['Packages', '`java.lang` is automatic; `java.util` needs an import; `*` imports the classes of one package'],
  ],
  'Summary table of Part 1: ways of input, Scanner set-up, reading methods, reading a character, the nextLine pitfall, wrong input and packages',
);

// ---------------------------------------------------------------- tables and flows: deck 2
const vRoute2 = flow('LR', ['Syntax, run-time and logical errors', 'Comments', 'pow, sqrt, cbrt', 'ceil, floor, round', 'abs, max, min', 'random', 'Formulae as expressions'], 'Route map of Part 2: types of errors, comments, pow sqrt cbrt, ceil floor round, abs max min, random and formulae as Java expressions', 'Part 2 at a glance');
const synRows = [
  ['int bags = 12\nSystem.out.println(bags);', 'int bags = 12', 'a semicolon is missing'],
  ['int total = 5;\nSystem.out.println(totl);', 'System.out.println(totl);', 'a name is spelt wrongly'],
  ['int n = 4.5;', 'int n = 4.5;', 'a double is stored in an int'],
  ['Int n = 5;', 'Int n = 5;', 'a keyword is typed with a capital letter'],
  ['System.out.println("Hi);', 'System.out.println("Hi);', 'the closing quotation mark is missing'],
];
const synMsg = synRows.map(([c]) => mustFail(c));
const vSyntax = table(
  ['Mistake', 'Statement', 'Message from javac'],
  synRows.map(([, shown, why], i) => [why, ic(shown), ic(synMsg[i])]),
  `Table of five syntax errors with the real message of the compiler: ${synRows.map(([, , w], i) => `${w}, message ${synMsg[i]}`).join('; ')}`,
  'The compiler stops and gives no bytecode.',
);
const rtRows = [
  ['dividing an int by zero', '', 'int n = 0;', 'System.out.println(100 / n);'],
  ['typing letters when a number is expected', 'ten\n', SCAN, 'int n = sc.nextInt();'],
  ['no input left to read', '', SCAN, 'int n = sc.nextInt();'],
];
const rtErr = rtRows.map(([, inp, ...l]) => errIn(inp, 'runtime', ...l).err);
const vRuntime = table(
  ['Situation', 'Exception reported'],
  rtRows.map(([w], i) => [w, ic(rtErr[i])]),
  `Table of run-time errors: ${rtRows.map(([w], i) => `${w} gives ${rtErr[i]}`).join('; ')}`,
  'The program compiles; the exception appears while it runs.',
);
const lgRows = [
  ['average of 30, 60 and 90', 'a + b + c / 3', '(a + b + c) / 3', 'int a = 30, b = 60, c = 90;'],
  ['area of a rectangle 8 by 5', 'l + b', 'l * b', 'int l = 8, b = 5;'],
  ['Fahrenheit for 20 degrees Celsius', '9 / 5 * c + 32', '9.0 / 5 * c + 32', 'int c = 20;'],
];
const lgBad = lgRows.map(([, w, , pre]) => ev(w, pre));
const lgGood = lgRows.map(([, , g, pre]) => ev(g, pre));
const vLogical = table(
  ['Task', 'Written', 'Shows', 'Correct form', 'Shows'],
  lgRows.map(([t, w, g], i) => [t, ic(w), lgBad[i], ic(g), lgGood[i]]),
  `Table of logical errors: ${lgRows.map(([t, w, g], i) => `${t}: ${w} shows ${lgBad[i]} but ${g} shows ${lgGood[i]}`).join('; ')}`,
  'No message appears: only checking the result against a known answer reveals the mistake.',
);
const cmRows = [
  ['Single-line', '`// text`', 'ends at the end of the line; for a short remark or to switch off one statement'],
  ['Multi-line', '`/* text */`', 'may run over many lines; for longer explanations or to switch off a block'],
  ['Documentation', '`/** text */`', 'starts with two stars; read by the javadoc tool to build documentation of classes and methods'],
];
const cmOut = out('System.out.println("on");', '// System.out.println("off");', '/* System.out.println("also off"); */');
const vComments = table(
  ['Kind', 'Written as', 'Use'],
  cmRows,
  `Table of the three kinds of comment: single-line with two slashes, multi-line between slash star and star slash, and documentation between slash star star and star slash. Code inside a comment does not run: the lines show only ${cmOut}`,
  `Only ${ic(cmOut)} is displayed: the commented statements do not run.`,
);
const cStages = [
  ['double r = 7\ndouble area = 3.14 * r * r;\nSystem.out.println(area);', 'semicolon missing after 7'],
  ['double r = 7;\ndouble area = 3.14 * r * R;\nSystem.out.println(area);', 'R typed in capital: a name never declared'],
  ['double r = 7;\ndouble area = 3.14 * r + r;\nSystem.out.println(area);', 'plus typed in place of the second r multiplication'],
  ['double r = 7;\ndouble area = 3.14 * r * r;\nSystem.out.println(area);', 'correct statement'],
];
const stageRes = cStages.map(([c], i) => (i < 2 ? `javac: ${mustFail(c)}` : javaOut(c)));
const vStages = table(
  ['Version', 'The statement for the area', 'Result'],
  cStages.map(([c, why], i) => [String(i + 1), `${ic(c.split('\n')[1])} (${why})`, ic(stageRes[i])]),
  `Table of four versions of an area program for radius 7: version 1 gives ${stageRes[0]}; version 2 gives ${stageRes[1]}; version 3 runs and shows the wrong value ${stageRes[2]}; version 4 shows the correct ${stageRes[3]}`,
);
const mathOverview = [
  ['pow(x, y)', 'x raised to the power y', 'double'],
  ['sqrt(x)', 'square root of x', 'double'],
  ['cbrt(x)', 'cube root of x', 'double'],
  ['ceil(x)', 'smallest whole number not less than x', 'double'],
  ['floor(x)', 'largest whole number not greater than x', 'double'],
  ['round(x)', 'nearest whole number; a half goes up', 'long (int for a float argument)'],
  ['abs(x)', 'value without the sign', 'type of the argument'],
  ['max(x, y), min(x, y)', 'larger and smaller of two values', 'wider type of the two arguments'],
  ['random()', 'a random number from 0.0 up to below 1.0', 'double'],
];
const vMathAll = table(
  ['Math method', 'Purpose', 'Return type'],
  mathOverview.map(([m, p, t]) => [ic('Math.' + m), p, t]),
  'Table of the Math methods of the syllabus with their purpose and return type: pow, sqrt, cbrt, ceil and floor return double; round returns long for a double argument; abs returns the type of its argument; max and min return the wider type of their arguments; random returns double',
);
const psExprs = ['Math.pow(2, 5)', 'Math.pow(2, -1)', 'Math.pow(5, 0)', 'Math.sqrt(81)', 'Math.sqrt(-4)', 'Math.cbrt(27)', 'Math.cbrt(-27)'];
const psVals = evs(psExprs);
const vPow = table(
  ['Call', 'Value', 'Remark'],
  psExprs.map((e, i) => [ic(e), ic(psVals[i]), ['2 multiplied five times', 'a negative power is the reciprocal', 'any number to the power 0', 'positive root, as a double', 'no real root: not a number', 'cube root of a positive value', 'a cube root may be negative'][i]]),
  `Table of pow, sqrt and cbrt calls with real values: ${psExprs.map((e, i) => `${e} gives ${psVals[i]}`).join('; ')}`,
  'All of them return a double, so the value always shows a decimal point.',
);
const amExprs = ['Math.abs(-7)', 'Math.abs(-7.5)', 'Math.max(4, 9.5)', 'Math.min(-3, -8)', 'Math.max(4, 9)'];
const amVals = evs(amExprs);
const amTypes = amExprs.map((e) => typeOf(e));
const vAbs = table(
  ['Call', 'Type', 'Value'],
  amExprs.map((e, i) => [ic(e), amTypes[i], ic(amVals[i])]),
  `Table of abs, max and min calls with type and value: ${amExprs.map((e, i) => `${e} is ${amTypes[i]} ${amVals[i]}`).join('; ')}`,
  'abs keeps the type of its argument; max and min give the wider type.',
);
const rdExprs = ['Math.round(2.4)', 'Math.round(2.5)', 'Math.round(-2.5)', 'Math.round(-2.6)', '(int) Math.round(2.6)'];
const rdVals = evs(rdExprs);
const rdTypes = rdExprs.map((e) => typeOf(e));
const eRoundInt = mustFail('int r = Math.round(2.6);');
const vRound = table(
  ['Call', 'Type', 'Value'],
  [...rdExprs.map((e, i) => [ic(e), rdTypes[i], ic(rdVals[i])]), [ic('int r = Math.round(2.6);'), 'does not compile', ic(eRoundInt)]],
  `Table of round calls: ${rdExprs.map((e, i) => `${e} is ${rdTypes[i]} ${rdVals[i]}`).join('; ')}; and int r equals Math dot round of 2.6 does not compile: ${eRoundInt}`,
  'Cast with (int) when a whole number of type int is needed.',
);
const rnExprs = [
  ['(int) (Math.random() * 6) + 1', 'a die'],
  ['(int) (Math.random() * 100)', 'from 0 to 99'],
  ['(int) (Math.random() * 11) + 10', 'from 10 to 20'],
  ['(int) (Math.random() * 50) + 1', 'from 1 to 50'],
  ['(int) Math.random() * 6 + 1', 'a trap: the cast comes first'],
];
const rnRanges = rnExprs.map(([e]) => rg(e));
const vRandom = table(
  ['Expression', 'Smallest and largest value seen in 50000 trials', 'Meant for'],
  rnExprs.map(([e, w], i) => [ic(e), rnRanges[i], w]),
  `Table of random formulas with the smallest and largest values seen: ${rnExprs.map(([e], i) => `${e} gave ${rnRanges[i]}`).join('; ')}`,
  'The general form is (int) (Math.random() * (b - a + 1)) + a.',
);
const vRandStep = table(
  ['Step', 'Expression', 'Range of values'],
  [
    ['1', ic('Math.random()'), 'a double from 0.0 up to below 1.0'],
    ['2', ic('Math.random() * 6'), 'a double from 0.0 up to below 6.0'],
    ['3', ic('(int) (Math.random() * 6)'), `whole numbers ${rg('(int) (Math.random() * 6)')}`],
    ['4', ic('(int) (Math.random() * 6) + 1'), `whole numbers ${rg('(int) (Math.random() * 6) + 1')}`],
  ],
  'Table that builds the formula for a die in four steps: Math dot random gives 0.0 up to below 1.0; times 6 gives 0.0 up to below 6.0; the cast to int gives whole numbers 0 to 5; adding 1 gives 1 to 6',
);
const fmRows = [
  ['Hypotenuse of sides a and b', 'Math.sqrt(a * a + b * b)', 'double a = 9, b = 12;'],
  ['Simple interest', 'p * r * t / 100', 'double p = 5000, r = 6, t = 3;'],
  ['Amount at compound interest', 'p * Math.pow(1 + r / 100, t)', 'double p = 1600, r = 25;\nint t = 2;'],
  ['Volume of a sphere, pi as 3.14', '4.0 / 3 * 3.14 * Math.pow(r, 3)', 'double r = 2;'],
];
const fmVals = fmRows.map(([, e, pre]) => ev(e, pre));
const fmGiven = ['a = 9, b = 12', 'p = 5000, r = 6, t = 3', 'p = 1600, r = 25, t = 2', 'r = 2'];
const vFormulae = table(
  ['Formula', 'Java expression', 'Values', 'Result'],
  fmRows.map(([f, e], i) => [f, ic(e), fmGiven[i], fmVals[i]]),
  `Table of formulae written as Java expressions: ${fmRows.map(([f, e], i) => `${f}, with ${fmGiven[i]}, gives ${fmVals[i]}`).join('; ')}`,
);
const trapRows = [
  ['1 / 2 * x', '1.0 / 2 * x', 'double x = 10;', 'an integer division'],
  ['b ^ 2', 'Math.pow(b, 2)', 'int b = 5;', 'the caret is not a power'],
  ['a + b / 2', '(a + b) / 2', 'int a = 10, b = 20;', 'brackets are missing'],
];
const trapBad = trapRows.map(([w, , pre]) => ev(w, pre));
const trapGood = trapRows.map(([, g, pre]) => ev(g, pre));
const eTrap = mustFail('int x = 3;\nint y = 2x;');
const vTraps = table(
  ['Written', 'Problem', 'Value', 'Correct form', 'Value'],
  [...trapRows.map(([w, g, , why], i) => [ic(w), why, trapBad[i], ic(g), trapGood[i]]), [ic('2x'), 'no multiplication sign', ic(eTrap), ic('2 * x'), 'works']],
  `Table of traps when formulae are written in Java: ${trapRows.map(([w, g, , why], i) => `${w} (${why}) gives ${trapBad[i]} but ${g} gives ${trapGood[i]}`).join('; ')}; and 2x does not compile, with the message ${eTrap}`,
  'Check each division for two int operands, and bracket every numerator and denominator.',
);
const qPre = 'int a = 2, b = -7, c = 3;';
const qSteps = ['b * b', '4 * a * c', 'b * b - 4 * a * c', 'Math.sqrt(b * b - 4 * a * c)', '-b + Math.sqrt(b * b - 4 * a * c)', '2 * a', '(-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a)', '(-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a)'];
const qVals = evs(qSteps, qPre);
const vQuad = table(
  ['Step', 'Expression', 'Value'],
  qSteps.map((e, i) => [String(i + 1), ic(e), qVals[i]]),
  `Step table for the roots with a equal to 2, b equal to minus 7 and c equal to 3: b squared is ${qVals[0]}, 4ac is ${qVals[1]}, the discriminant is ${qVals[2]}, its root is ${qVals[3]}, the numerator is ${qVals[4]}, the denominator is ${qVals[5]}; the roots are ${qVals[6]} and ${qVals[7]}`,
  'The whole numerator and the whole denominator are in brackets.',
);
const vSummary2 = table(
  ['Idea', 'Remember'],
  [
    ['Syntax error', 'rule of the language broken; javac refuses to compile'],
    ['Run-time error', 'an exception such as `ArithmeticException` stops the running program'],
    ['Logical error', 'program runs but the answer is wrong'],
    ['Comments', '`//`, `/* */` and `/** */`; ignored by the compiler'],
    ['pow, sqrt, cbrt', 'return double; `Math.sqrt(-4)` is NaN'],
    ['ceil, floor, round', `ceil up, floor down (doubles); round gives a long and sends a half up: \`Math.round(-2.5)\` is ${ev('Math.round(-2.5)')}`],
    ['abs, max, min', 'abs keeps the type; max and min give the wider type'],
    ['random', '0.0 up to below 1.0; whole number from a to b: `(int) (Math.random() * (b - a + 1)) + a`'],
    ['Formulae', 'brackets for numerators and denominators; avoid integer division; use `Math.pow`, not the caret'],
  ],
  'Summary table of Part 2: syntax, run-time and logical errors, comments, pow sqrt cbrt, ceil floor round, abs max min, random and writing formulae as expressions',
);

// ---------------------------------------------------------------- deck 1
const part1 = deck({
  part: 1,
  title: 'Input in Java: Ways of Input, the Scanner Class and Packages',
  goals: [
    'Name the three ways of giving input to a Java program',
    'Write a program that reads numbers, words and characters with Scanner',
    'Predict and fix the problem of nextLine after nextInt',
    'Say which exception wrong input causes',
    'Explain packages, the import statement and the star',
  ],
  slides: [
    sl('title', 'Input in Java', {
      b: 'Part 1: **ways of input**, the **Scanner class**, wrong input and **packages**.',
      v: vRoute1,
      n: 'Welcome to the revision of input in Java. We begin with the three ways in which a program gets its data. Then we study the Scanner class: how to create it and how to read numbers, words, lines and single characters. We look at a famous problem with the nextLine method, and at what happens when the wrong kind of data is typed. Finally we learn about packages and the import statement.',
    }),
    sl('concept', 'Three ways of giving input', {
      b: 'A program gets its data by **initialisation**, by **parameters** or through the **Scanner class**.',
      v: vWays,
      n: 'A program can receive data in three ways. First, by initialisation, where the value is written inside the program itself. Second, by parameters, where the value is passed to a method when the method is called. Third, through the Scanner class, where the user types the value while the program is running. Only the Scanner class lets the same program work on new data each time without editing it.',
    }),
    sl('concept', 'Input by initialisation', {
      b: `In **initialisation** the value is written in the program.\n\n${F('double side = 12;', 'System.out.println(side * side);')}\n\nOutput: ${ic(initOut)}`,
      v: vWaysTable,
      n: `With initialisation we give a variable its value in the source code, for example a side of twelve. The program then shows ${sp(initOut)}. To use a different side, the programmer must edit the source code and compile it again. Parameters and the Scanner class avoid that: parameters take the value from the call, and the Scanner class takes it from the keyboard while the program runs.`,
    }),
    sl('concept', 'Input by parameters', {
      b: `In **parameter** input the value is given when a method is called; the **actual parameter** is copied into the **formal parameter**. In BlueJ the value is typed in the dialog box of the call.\n\n${F(cDisc)}`,
      v: vParam,
      n: `Here the method area has a formal parameter named r. When the call passes seven, the number seven is the actual parameter and it is copied into r. The method then returns ${sp(discOut)}. In BlueJ you type the actual parameter in the dialog box that opens when you choose the method, so the same method can be used again and again with different values.`,
    }),
    sl('concept', 'The Scanner class: import and object', {
      b: `The class **Scanner** is in the package \`java.util\`. A program must import it and create an object.\n\n${F('import java.util.Scanner;', SCAN)}`,
      v: vSetup,
      n: 'To use Scanner we need two things. First the import statement, because Scanner belongs to the package java dot util. Second, an object created with the new operator and attached to System dot in, which means the keyboard. The reference of the new object is stored in a variable, here named sc. Every reading method is then called through that variable using the dot operator.',
    }),
    sl('concept', 'Scanner methods', {
      b: 'Each method **returns** a value of a particular type. Choose the method that matches the data.',
      v: vScanTable,
      n: 'This table shows the reading methods. The nextInt method reads a whole number and returns an int. The nextLong method returns a long, nextFloat returns a float and nextDouble returns a double. The next method reads one word and returns a String. The nextLine method returns the rest of the line as a String. To read a single character, we take the first letter of a word using next followed by charAt of zero.',
    }),
    sl('check', 'Quick check: next and nextLine', {
      b: 'Fill in the blanks.',
      chk: 'fb_next',
      n: 'Think about which method stops at a blank and which one reads the whole line.',
    }),
    sl('concept', 'Reading numbers', {
      b: `${F(SCAN, 'int n = sc.nextInt();', 'double d = sc.nextDouble();')}\n\nThe user may type the numbers on one line, separated by blanks, or on separate lines.`,
      v: vNumbers,
      n: `Numbers are read with nextInt or nextDouble. If the user types twelve, nextInt gives twelve. If the user types three point five, nextDouble gives three point five. A whole number typed for nextDouble is accepted and becomes ${sp(numRes[2])}. But three point five typed for nextInt fails, because that text is not a whole number, and the program stops with an exception.`,
    }),
    sl('concept', 'Words, lines and characters', {
      b: `Scanner has no method for a single character. Read a word and take its **first character**: ${ic('char c = sc.next().charAt(0);')}`,
      v: vWords,
      n: `Suppose the user types the two words Asha Rao. The next method returns Asha only, because it stops at the blank. The nextLine method returns the whole line, Asha Rao. Next followed by charAt of zero returns the single letter A. And if next is followed by nextLine, the second call returns the rest of the line, which still begins with the blank.`,
    }),
    sl('example', 'Worked example 1: reading mixed data', {
      b: `${F(cReceipt)}\n\nThe typed input is ${ic('pencil 12 4.5')}. Output: ${ic(receiptOut)}`,
      v: vReceipt,
      n: `Let us trace the program for the typed input pencil, twelve and four point five. The next method reads the word pencil. The nextInt method reads twelve. The nextDouble method reads four point five. Then the total is twelve times four point five, which is ${sp(ev('12 * 4.5'))}, because an int multiplied by a double gives a double. The program displays the item, the quantity and the total.`,
    }),
    sl('check', 'Quick check: matching methods', {
      b: 'Match each method with what it reads.',
      chk: 'mt_scanner',
      n: 'Decide which methods read one value and which ones read text.',
    }),
    sl('concept', 'The nextLine pitfall', {
      b: `${F(cPit)}\n\nThe user types 40, Enter, then Riya Nair, Enter. Output: ${ic(pitOut)}`,
      v: vBuffer,
      n: 'This program reads an age and then a name, but the name comes out empty. The reason is the Enter key. When the user types forty and presses Enter, the number is read by nextInt, but the Enter, the new line character, stays in the input. The next call, nextLine, reads from that point up to the end of the line, finds nothing, and returns an empty string. The name is still waiting.',
    }),
    sl('concept', 'Fixing the pitfall', {
      b: `Use up the leftover new line with one extra \`nextLine()\`.\n\n${F(cFix)}\n\nOutput: ${ic(fixOut)}`,
      v: vFix,
      n: `The cure is to add one extra nextLine call after nextInt. It throws away the rest of the first line. The next nextLine call then reads the real second line, and the program shows ${sp(fixOut)}. Using next instead would work only for a single word: it shows ${sp(nextOut)}, because it stops at the blank. Remember this order whenever you mix numbers and lines.`,
    }),
    sl('concept', 'Wrong or missing input', {
      b: 'If the text typed does not match the method, the program stops with a **run-time error** (an exception).',
      v: vMismatch,
      n: `If the user types letters where nextInt expects a number, Java throws an InputMismatchException. The same exception is thrown for three point five, since that is not a whole number. If the input has ended and there is nothing to read, the exception is a NoSuchElementException. In both cases the statements after the failing call are never executed.`,
    }),
    sl('check', 'Quick check: trace the input', {
      b: 'Write the exact output.',
      chk: 'co_pitfall',
      n: 'Remember what the first nextLine finds after nextInt, and what the second one finds.',
    }),
    sl('concept', 'Packages', {
      b: 'A **package** is a group of related classes. **`java.lang`** is imported automatically; **`java.util`** must be imported.',
      v: vPackages,
      n: 'A package is a collection of related classes. The package java dot lang holds the basic classes such as String, Math and System. It is imported automatically into every program, so we never write an import statement for it. The package java dot util holds Scanner, and many other classes. These are not imported automatically, so the import statement is needed.',
    }),
    sl('concept', 'The import statement and the star', {
      b: 'The **import** statement makes classes of a package available by their short names. The **star** imports every class of that one package, but not the packages inside it.',
      v: vImports,
      n: `Importing java dot util dot Scanner makes that one class available. Importing java dot util with a star makes every class of java dot util available. But the star does not reach into packages. Importing java with a star does not give Scanner, and neither does importing from java dot lang. Without any import, the compiler cannot find the class and reports ${sp(impPrograms[4].msg)}.`,
    }),
    sl('example', 'Worked example 2: a complete program', {
      b: `${F(cPaint)}\n\nTyped input: ${ic('8 6 3 120')}.`,
      v: vPaint,
      n: `This program paints a room. After the import and the Scanner object, it reads four values. The area of the four walls is two times the height times the sum of length and breadth. With the input eight, six, three and one hundred twenty, the wall area is ${sp(paintLines[0].split('= ')[1])} and the cost is ${sp(paintLines[1].split('= ')[1])}. Both results are displayed with labels.`,
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. Input can be given by initialisation, by parameters or through the Scanner class. Import java dot util dot Scanner and create the object with new. Choose the reading method to match the data, and read a character with next followed by charAt of zero. After nextInt, a nextLine returns an empty string, so use one extra nextLine. Wrong input causes an exception. Only java dot lang is imported automatically.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'In a program, write the import statement, create the Scanner object and print a prompt before every input.',
        'Match the method to the variable: `nextInt()` for `int`, `nextDouble()` for `double`, `next()` for one word, `nextLine()` for a sentence.',
        'To read a character write `sc.next().charAt(0)`; there is no `nextChar()`.',
        'If a number is read and then a line, add one extra `sc.nextLine();` in between.',
        'Add a variable description table or comments: variable, type, purpose.',
      ],
      n: 'Some exam tips. In every program, write the import statement, create the Scanner object, and display a prompt before each input. Match the reading method to the variable. There is no method to read a character directly, so use next followed by charAt of zero. Whenever a number is followed by a line, add one extra nextLine. And finish with a variable description table or comments, because marks are given for them.',
    }),
  ],
});

// ---------------------------------------------------------------- deck 2
const part2 = deck({
  part: 2,
  title: 'Errors, Comments and the Math Class',
  goals: [
    'Classify an error as syntax, run-time or logical',
    'Write single-line, multi-line and documentation comments',
    'State the return type and value of Math method calls',
    'Use the formula for a random whole number from a to b',
    'Write Java expressions for mathematical formulae',
  ],
  slides: [
    sl('title', 'Errors, comments and the Math class', {
      b: 'Part 2: **types of errors**, **comments**, the **Math class** and **formulae as expressions**.',
      v: vRoute2,
      n: 'In Part 2 we first study the three types of error and how to tell them apart. Then we look at comments. After that we study the Math class: power, square root and cube root, then ceil, floor and round, then absolute value, maximum and minimum, and random numbers. We finish by writing Java expressions for mathematical formulae, including the roots of a quadratic equation.',
    }),
    sl('concept', 'Types of errors', {
      b: 'Errors are of three types: **syntax**, **run-time** and **logical**.',
      v: vErrTree,
      n: 'There are three types of error. A syntax error breaks a rule of the language and is found by the compiler, called javac, before the program runs. A run-time error happens while the program is running, when an exception is thrown and the program stops. A logical error is the worst to find, because the program compiles and runs, but the answer it gives is wrong.',
    }),
    sl('concept', 'Syntax errors', {
      b: 'A **syntax error** (compile-time error) is a violation of the grammar of Java. javac reports it with a message and the line, and **no bytecode** is produced.',
      v: vSyntax,
      n: 'The table shows five syntax errors and the real messages of the compiler. A missing semicolon is reported as a semicolon expected. A wrongly spelt name, or a keyword with a capital letter, gives cannot find symbol. Storing a double in an int gives a lossy conversion message. A missing closing quotation mark gives an unclosed string literal. The program must be corrected before it can run.',
    }),
    sl('concept', 'Run-time errors', {
      b: 'A **run-time error** occurs while the program is running. Java throws an **exception** and the program stops at that statement.',
      v: vRuntime,
      n: 'A run-time error is found only when the program runs. The program compiled correctly, but a statement cannot be carried out. Dividing an int by zero throws an ArithmeticException. Typing letters for nextInt throws an InputMismatchException. Reading when there is no input left throws a NoSuchElementException. The statements before the failure have already run, but the ones after it never do.',
    }),
    sl('concept', 'Logical errors', {
      b: 'A **logical error** is a mistake in the design or formula. The program compiles and runs, but the **result is wrong**.',
      v: vLogical,
      n: `A logical error gives no message at all. For the average of thirty, sixty and ninety, writing a plus b plus c divided by three shows ${sp(lgBad[0])}, but the correct average is ${sp(lgGood[0])}. Adding length and breadth instead of multiplying shows ${sp(lgBad[1])} for an area that is really ${sp(lgGood[1])}. The only way to find such errors is to test the program with values whose answer you already know.`,
    }),
    sl('check', 'Quick check: classify the error', {
      b: 'Match each type of error with how it shows itself.',
      chk: 'mt_errors',
      n: 'Think about when each error appears: before running, while running, or only in the answer.',
    }),
    sl('concept', 'Comments', {
      b: 'A **comment** is explanatory text that the compiler ignores.',
      v: vComments,
      n: `Comments explain the program to the reader and are ignored by the compiler. A single-line comment starts with two slashes and ends at the end of the line. A multi-line comment starts with slash star and ends with star slash. A documentation comment starts with slash star star, and the javadoc tool can use it to build documentation. Code inside a comment does not run, so the lines on the slide display only ${sp(cmOut)}.`,
    }),
    sl('check', 'Quick check: commented code', {
      b: 'Write the exact output.',
      chk: 'co_comment',
      n: 'Decide which statements are inside a comment and which are not.',
    }),
    sl('example', 'Worked example 1: find and fix the errors', {
      b: `${F(cStages[3][0])}\n\nStarting from a draft, each version has a different kind of problem.`,
      v: vStages,
      n: `Let us repair a program for the area of a circle of radius seven. Version one forgets a semicolon, so the compiler stops. Version two uses a capital R that was never declared, so it also stops with cannot find symbol. Version three compiles and runs but adds instead of multiplying, a logical error, and shows ${sp(stageRes[2])}. Version four is correct and shows ${sp(stageRes[3])}.`,
    }),
    sl('concept', 'The Math class', {
      b: 'The **Math** class is in `java.lang`. Its methods are **static**: call them with the class name and the dot operator, for example `Math.sqrt(49)`; no object is created.',
      v: vMathAll,
      n: 'The Math class belongs to java dot lang, so no import is needed. Its methods are static, which means we call them with the class name, a dot and the method name, without creating an object. The methods pow, sqrt, cbrt, ceil and floor return a double. The method round returns a long for a double argument. Abs returns the type of its argument, max and min return the wider type, and random returns a double.',
    }),
    sl('concept', 'pow, sqrt and cbrt', {
      b: `\`Math.pow(x, y)\` gives x raised to the power y. \`Math.sqrt(x)\` and \`Math.cbrt(x)\` give the square root and the cube root.\n\n${F('System.out.println(Math.pow(2, 3));')}\n\nOutput: ${ic(ev('Math.pow(2, 3)'))}`,
      v: vPow,
      n: `The call pow of two and three is eight, but it is displayed as ${sp(ev('Math.pow(2, 3)'))}, because pow returns a double. The square root of eighty one is ${sp(psVals[3])}. The square root of a negative number has no real value, so Java does not stop: it returns the special value not a number, written N a N. The cube root of minus twenty seven is ${sp(psVals[6])}.`,
    }),
    sl('diagram', 'ceil, floor and round', {
      b: '**ceil** goes up to the next whole number, **floor** goes down, and **round** gives the nearest whole number. A value exactly half way is rounded **towards positive infinity**.',
      v: vNumLine,
      n: `On the number line, the value minus three point two lies between minus four and minus three. Floor gives ${sp(nlVals[0])}, because it goes down. Ceil gives ${sp(nlVals[1])}, because it goes up. Round gives the nearer one, ${sp(nlVals[2])}. For two point five, floor is ${sp(nlVals[3])} and ceil is ${sp(nlVals[4])}. Round goes up at a half, so it gives ${sp(nlVals[5])}, and minus two point five rounds to ${sp(ev('Math.round(-2.5)'))}.`,
    }),
    sl('concept', 'round returns a long', {
      b: `With a double argument, \`Math.round()\` returns a **long**. To store the result in an int, cast it.\n\n${F('double km = 5.5;', 'int whole = (int) Math.round(km);', 'System.out.println(whole);')}\n\nOutput: ${ic(out('double km = 5.5;', 'int whole = (int) Math.round(km);', 'System.out.println(whole);'))}`,
      v: vRound,
      n: `The round method returns a long when its argument is a double. So storing its result straight into an int is a compile time error, with the message ${sp(eRoundInt)}. Writing int in brackets before the call removes the error. Notice that round returns a whole number, so no decimal point appears: round of two point four is ${sp(rdVals[0])} and round of minus two point six is ${sp(rdVals[3])}.`,
    }),
    sl('concept', 'abs, max and min', {
      b: '`Math.abs(x)` removes the sign. `Math.max(x, y)` and `Math.min(x, y)` give the larger and the smaller value. The result has the **wider type** of the arguments.',
      v: vAbs,
      n: `The abs method gives the absolute value and keeps the type of its argument: abs of minus seven is the int ${sp(amVals[0])}, and abs of minus seven point five is the double ${sp(amVals[1])}. The max method of four and nine point five gives ${sp(amVals[2])}, a double, because one argument is a double. The min method of minus three and minus eight gives ${sp(amVals[3])}.`,
    }),
    sl('concept', 'Random numbers', {
      b: '`Math.random()` returns a **double** that is at least **0.0** and **less than 1.0**. A random whole number from a to b is `(int) (Math.random() * (b - a + 1)) + a`.',
      v: vRandom,
      n: `The random method returns a double from zero point zero up to, but not including, one point zero. To get whole numbers, multiply by the number of values wanted, cast to int, and add the smallest value. For a die we need six values starting at one. For ten to twenty there are eleven values starting at ten. The last row is a trap: the cast comes first, so the result is always ${sp(rnRanges[4].split(' ')[0])}.`,
    }),
    sl('example', 'Worked example 2: building the formula for a die', {
      b: `Build the formula in steps:\n\n${F('int die = (int) (Math.random() * 6) + 1;')}\n\nWe never predict a particular random value; we only state the range.`,
      v: vRandStep,
      n: 'Let us build the formula for a die in four steps. Step one, the random method gives a double from zero up to below one. Step two, multiplying by six stretches this to zero up to below six. Step three, the cast to int drops the fraction and leaves the whole numbers from zero to five. Step four, adding one shifts the range to one to six, exactly the faces of a die.',
    }),
    sl('check', 'Quick check: put the values in order', {
      b: 'Arrange the calls in increasing order of value.',
      chk: 'ord_math',
      n: 'Work out each value first, then arrange them.',
    }),
    sl('concept', 'Java expressions for formulae', {
      b: 'To convert a formula, use `*` for every multiplication, `Math.pow` for powers, `Math.sqrt` for roots, and **brackets** around every numerator and denominator.',
      v: vFormulae,
      n: `The table shows four formulae written as Java expressions. The hypotenuse is the square root of the sum of the squares, which gives ${sp(fmVals[0])} for nine and twelve. Simple interest is p times r times t divided by one hundred. Compound amount uses pow with one plus r divided by one hundred as the base. The volume of a sphere uses four point zero divided by three, so that the division is real.`,
    }),
    sl('concept', 'Common traps in expressions', {
      b: 'Watch for **integer division**, the **caret** (which is not a power) and **missing brackets**. Java also needs the multiplication sign: `2x` is an error.',
      v: vTraps,
      n: `Four traps are common. One divided by two is an integer division, so one over two times x gives ${sp(trapBad[0])} instead of ${sp(trapGood[0])}. The caret is the exclusive or operator, not a power, so use pow. Without brackets, a plus b divided by two gives ${sp(trapBad[2])} instead of the average ${sp(trapGood[2])}. And two x, without a multiplication sign, does not compile.`,
    }),
    sl('example', 'Worked example 3: the roots of a quadratic equation', {
      b: `${F('int a = 2, b = -7, c = 3;', 'double d = b * b - 4 * a * c;', 'double root1 = (-b + Math.sqrt(d)) / (2 * a);', 'double root2 = (-b - Math.sqrt(d)) / (2 * a);')}\n\nEvaluate in the order shown in the table.`,
      v: vQuad,
      n: `Let us find the roots for a equal to two, b equal to minus seven and c equal to three. The discriminant is b squared minus four a c, which is ${sp(qVals[2])}. Its square root is ${sp(qVals[3])}. The numerator for the plus sign is ${sp(qVals[4])}, and the denominator is ${sp(qVals[5])}. So the first root is ${sp(qVals[6])}, and the second root is ${sp(qVals[7])}.`,
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. A syntax error is found by the compiler, a run-time error throws an exception, and a logical error gives a wrong answer. There are three kinds of comment. Pow, sqrt and cbrt return doubles, and sqrt of a negative number is not a number. Ceil goes up, floor goes down, and round gives a long with halves going up. For a random whole number, multiply, cast and add. Use brackets and avoid integer division in formulae.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Quote the real message: `\';\' expected` and `cannot find symbol` for syntax errors, `ArithmeticException` or `InputMismatchException` for run-time errors.',
        'A wrong answer with no message is a logical error.',
        '`Math.pow(2, 3)` is `8.0`, `Math.round(2.5)` is `3` and `Math.round(-2.5)` is `-2`; `ceil` and `floor` give doubles.',
        'Store `Math.round(x)` in an `int` only after the cast `(int)`.',
        'Never give a particular random value as an answer; give the range, using `(int) (Math.random() * (b - a + 1)) + a`.',
      ],
      n: 'Some exam tips for this part. Quote the real error message, and name the exception for run-time errors. A wrong answer with no message is a logical error. Remember that pow returns a double, that round sends a half upwards, and that ceil and floor return doubles. Cast the result of round before storing it in an int. For random numbers, give the range and the formula, never a particular value.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Input in Java and Mathematical Library Methods: notes',
  sections: [
    {
      h: '1. Ways of input',
      t: 1,
      b: `A program can receive input in three ways:\n\n- **Initialisation**: the value is written in the program, for example ${ic('double side = 12;')}. Changing the data means editing and compiling again.\n- **Parameters**: the value is passed to a method when it is called. The **actual parameter** in the call is copied into the **formal parameter** of the method. In BlueJ the actual parameter is typed in the dialog box of the call.\n- **Scanner class**: the user types the value while the program runs.\n\n${F(cDisc)}\n\nOutput: ${ic(discOut)}`,
      terms: [
        ['Input', 'Data given to a program so that it can be processed.'],
        ['Initialisation', 'Giving a variable its first value inside the program.'],
        ['Actual parameter', 'The value or variable written in a method call.'],
        ['Formal parameter', 'The variable in the method header that receives the value of the actual parameter.'],
      ],
      v: vWays,
      vs: [vWaysTable, vParam],
    },
    {
      h: '2. The Scanner class',
      t: 1,
      b: `The class **Scanner** of the package \`java.util\` reads input from the keyboard.\n\n${F(cReceipt)}\n\nFor the typed input \`pencil 12 4.5\` the program displays ${ic(receiptOut)}.\n\n- \`next()\` reads one word; \`nextLine()\` reads the rest of the line; a character is read with \`sc.next().charAt(0)\`.\n- **Pitfall:** after \`nextInt()\` the Enter key stays in the input, so \`nextLine()\` returns an empty string. For the typed lines 40 and Riya Nair the name shows as ${ic(pitOut)}. One extra \`sc.nextLine();\` fixes it: ${ic(fixOut)}.\n- Letters typed for \`nextInt()\` throw \`${mismatchErr[0]}\`; reading at the end of the input throws \`${mismatchErr[2]}\`.`,
      terms: [
        ['Scanner', 'A class of the package java.util whose methods read data typed by the user.'],
        ['System.in', 'The standard input stream, normally the keyboard.'],
        ['Token', 'A group of characters separated from the next by white space; next(), nextInt() and nextDouble() read one token.'],
        ['Exception', 'An object that signals an error that occurs while a program is running.'],
      ],
      v: vScanTable,
      vs: [vSetup, vNumbers, vWords, vBuffer, vFix, vMismatch],
    },
    {
      h: '3. Packages and the import statement',
      t: 2,
      b: `A **package** is a group of related classes. The package \`java.lang\` is imported automatically; classes of other packages need an **import** statement.\n\n- \`import java.util.Scanner;\` imports one class.\n- \`import java.util.*;\` imports every class of \`java.util\` (the star does not include the packages inside it).\n- Without an import statement the compiler reports ${ic(impPrograms[4].msg)}.\n\n${F(cLunch)}\n\nFor the typed input \`3\` the program displays ${ic(outIn('3\n', cLunch))}.`,
      terms: [
        ['Package', 'A named group of related classes and interfaces.'],
        ['import statement', 'A statement that makes a class, or all classes of a package, available by their short names.'],
        ['java.lang', 'The package of basic classes such as String, Math and System; imported automatically.'],
      ],
      v: vPackages,
      vs: [vImports],
    },
    {
      h: '4. Types of errors and comments',
      t: 2,
      b: `- **Syntax error (compile-time error)**: a rule of Java is broken. javac reports it with a message and a line number and no bytecode is produced. Example message: ${ic(synMsg[0])}.\n- **Run-time error**: the program compiles but stops while running, when an exception is thrown. Example: ${ic(rtErr[0])}.\n- **Logical error**: the program runs but gives a wrong result. ${ic('a + b + c / 3')} shows ${lgBad[0]} for the average of 30, 60 and 90, whereas ${ic('(a + b + c) / 3')} shows ${lgGood[0]}.\n\n**Comments** are ignored by the compiler:\n\n${F('// single-line comment', '/* multi-line', '   comment */', '/** documentation comment */')}`,
      terms: [
        ['Syntax error', 'A violation of the grammar rules of the language, detected by the compiler before the program runs.'],
        ['Run-time error', 'An error that occurs while the program is running and stops it, usually by throwing an exception.'],
        ['Logical error', 'An error in the design or formula of a program that makes it produce a wrong result although it compiles and runs.'],
        ['Comment', 'Explanatory text in the source code that the compiler ignores.'],
      ],
      v: vErrTree,
      vs: [vSyntax, vRuntime, vLogical, vComments, vStages],
    },
    {
      h: '5. Math class: pow, sqrt, cbrt, ceil, floor, round, abs, max, min',
      t: 3,
      b: `The class **Math** (package \`java.lang\`) has **static** methods: they are called as \`Math.method(...)\`, with no object.\n\n${F('System.out.println(Math.pow(2, 3));', 'System.out.println(Math.sqrt(-4));', 'System.out.println(Math.ceil(-3.2));', 'System.out.println(Math.floor(-3.2));', 'System.out.println(Math.round(-2.5));', 'System.out.println(Math.round(2.5));')}\n\nOutput:\n\n\`\`\`\n${out('System.out.println(Math.pow(2, 3));', 'System.out.println(Math.sqrt(-4));', 'System.out.println(Math.ceil(-3.2));', 'System.out.println(Math.floor(-3.2));', 'System.out.println(Math.round(-2.5));', 'System.out.println(Math.round(2.5));')}\n\`\`\`\n\n- \`pow\`, \`sqrt\`, \`cbrt\`, \`ceil\` and \`floor\` return a **double**; \`round\` returns a **long** for a double argument (an **int** for a float argument).\n- A value exactly half way is rounded **towards positive infinity**.\n- \`abs\` keeps the type of its argument; \`max\` and \`min\` return the wider type of the two arguments.\n- The square root of a negative number is **NaN** (not a number); the program does not stop.`,
      terms: [
        ['Math class', 'A class of java.lang that provides static methods for mathematical calculations.'],
        ['Static method', 'A method that belongs to the class and is called with the class name, without creating an object.'],
        ['NaN', 'The double value, meaning not a number, that results from an undefined operation such as the square root of a negative number.'],
      ],
      v: vMathAll,
      vs: [vPow, vNumLine, vRound, vAbs],
    },
    {
      h: '6. Random numbers and formulae as Java expressions',
      t: 3,
      b: `\`Math.random()\` returns a double that is at least 0.0 and less than 1.0. A random whole number from **a** to **b** (both included):\n\n${F('int n = (int) (Math.random() * (b - a + 1)) + a;')}\n\nFor a die, ${ic('(int) (Math.random() * 6) + 1')} gives the whole numbers ${rg('(int) (Math.random() * 6) + 1')}. Only the range can be predicted, not a particular value.\n\n**Writing a formula in Java**\n\n- Write every multiplication with \`*\`; use \`Math.pow\` for powers (the caret is not a power) and \`Math.sqrt\` for roots.\n- Put brackets around every numerator and denominator.\n- Avoid integer division: ${ic('4 / 3')} is ${ev('4 / 3')}, so write ${ic('4.0 / 3')}.\n\n${F('double d = b * b - 4 * a * c;', 'double root1 = (-b + Math.sqrt(d)) / (2 * a);')}\n\nFor a = 2, b = -7, c = 3 this gives ${ic(qVals[6])}.`,
      terms: [
        ['Random number', 'A number chosen by chance; Math.random() gives a double from 0.0 up to below 1.0.'],
        ['Expression', 'A combination of operands and operators that produces a value.'],
      ],
      v: vRandom,
      vs: [vRandStep, vFormulae, vTraps, vQuad],
    },
  ],
  tips: '**Common mistakes**\n- Writing `sc.nextChar()` (it does not exist) instead of `sc.next().charAt(0)`.\n- Placing `nextLine()` straight after `nextInt()` and getting an empty string.\n- Forgetting `import java.util.Scanner;`.\n- Storing `Math.round(x)` in an `int` without a cast.\n- Writing `a + b / 2` for an average, `b ^ 2` for a square or `2x` for two times x.\n- Giving a particular random number as an answer instead of a range.\n\n**How marks are usually awarded**\n- Output questions: marks for each correct line, in the exact format (`8.0`, `-2`, `NaN`).\n- Error questions: the message or exception named, and the line given.\n- Short answers: one point per mark with an example where possible.\n- Programs (15 marks): class and method structure, input, formulae and logic, output, variable description or comments.',
});

// ---------------------------------------------------------------- flashcards
const FC = cards([
  ['Name the three ways of giving input to a Java program.', 'Initialisation, parameters and the Scanner class.', 'fact', 1],
  ['What is input by initialisation?', 'The value is written in the program itself, e.g. `double side = 12;`.', 'definition', 1],
  ['Actual versus formal parameter', 'The actual parameter is the value in the call; it is copied into the formal parameter in the method header.', 'concept', 1],
  ['In which package is Scanner?', '`java.util`; it needs `import java.util.Scanner;`.', 'fact', 1],
  ['How is a Scanner object created?', ic(SCAN), 'fact', 1],
  ['Return types of nextInt(), nextLong(), nextFloat(), nextDouble()', '`int`, `long`, `float`, `double`.', 'fact', 1],
  ['What do next() and nextLine() read?', '`next()` reads one word (up to white space); `nextLine()` reads the rest of the line.', 'definition', 1],
  ['How is a single character read?', ic('char c = sc.next().charAt(0);'), 'fact', 1],
  ['What happens with nextInt() followed by nextLine()?', `nextLine() returns an empty string; for the lines 40 and Riya Nair the name shows as ${ic(pitOut)}.`, 'exam-tip', 1],
  ['How is the nextLine pitfall fixed?', `Add one extra \`sc.nextLine();\` after \`nextInt()\`; the name then shows as ${ic(fixOut)}.`, 'concept', 1],
  ['Which exception is thrown if letters are typed for nextInt()?', ic(mismatchErr[0]), 'fact', 1],
  ['Which exception is thrown if there is no input left?', ic(mismatchErr[2]), 'fact', 1],
  ['What is a package?', 'A named group of related classes.', 'definition', 2],
  ['Which package is imported automatically?', '`java.lang` (String, Math, System).', 'fact', 2],
  ['Does `import java.util.*;` import Scanner? Does `import java.*;`?', 'Yes for `java.util.*`. No for `java.*`: the star imports the classes of one package, not the packages inside it.', 'concept', 2],
  ['Name the types of error.', 'Syntax (compile-time), run-time and logical.', 'fact', 2],
  ['What is a syntax error?', `A broken rule of the language, found by javac; e.g. a missing semicolon gives ${ic(synMsg[0])}.`, 'definition', 2],
  ['What is a run-time error?', `An error while the program runs; an exception stops it, e.g. ${ic(rtErr[0])}.`, 'definition', 2],
  ['What is a logical error?', `The program runs but gives a wrong result, e.g. \`a + b + c / 3\` shows ${lgBad[0]} for the average of 30, 60 and 90.`, 'definition', 2],
  ['Write the three kinds of comment.', '`// single`, `/* multi-line */`, `/** documentation */`.', 'fact', 2],
  [ic('Math.pow(2, 3)'), `${ic(ev('Math.pow(2, 3)'))}: pow returns a double.`, 'example', 3],
  [ic('Math.sqrt(-4)'), `${ic(ev('Math.sqrt(-4)'))}: not a number; no exception.`, 'example', 3],
  [ic('Math.cbrt(-27)'), ic(ev('Math.cbrt(-27)')), 'example', 3],
  [ic('Math.ceil(-3.2)') + ' and ' + ic('Math.floor(-3.2)'), `${ic(nlVals[1])} and ${ic(nlVals[0])}`, 'example', 3],
  [ic('Math.round(2.5)') + ' and ' + ic('Math.round(-2.5)'), `${ic(ev('Math.round(2.5)'))} and ${ic(ev('Math.round(-2.5)'))}: a half goes towards positive infinity.`, 'exam-tip', 3],
  ['Return type of Math.round() with a double argument', '`long`; cast with `(int)` to store it in an int.', 'fact', 3],
  [ic('Math.abs(-7.5)') + ', ' + ic('Math.max(4, 9.5)') + ', ' + ic('Math.min(-3, -8)'), `${ic(amVals[1])}, ${ic(amVals[2])}, ${ic(amVals[3])}`, 'example', 3],
  ['Range of Math.random()', 'A double from 0.0 up to below 1.0.', 'fact', 3],
  ['Formula for a random whole number from a to b', ic('(int) (Math.random() * (b - a + 1)) + a'), 'fact', 3],
  ['Why is `(int) Math.random() * 6 + 1` wrong?', `The cast applies first and gives 0, so the result is always ${rg('(int) Math.random() * 6 + 1').split(' ')[0]}.`, 'exam-tip', 3],
  ['Why is `4 / 3 * x` risky?', `4 / 3 is an integer division and gives ${ev('4 / 3')}; write \`4.0 / 3 * x\`.`, 'exam-tip', 3],
  ['Java expression for the larger root of a quadratic equation', ic('(-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a)'), 'fact', 3],
]);

// ---------------------------------------------------------------- tests (icse-10-computer-applications chapter-test blueprints)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'icse-10-computer-applications-chapter-test-short',
  title: 'Chapter test (short): Input in Java and Math Library Methods',
  duration: 30,
  sections: [
    { id: 'A', title: 'Section A: Compulsory (10 marks)', instr: 'Attempt all questions. Questions 1 to 6 are multiple-choice (1 mark each); questions 7 and 8 carry 2 marks each.', items: ['m_import', 'm_char_stmt', 'm_default_pkg', 'm_javac_detects', 'm_round_neg', 'm_random_formula', 's_stmt_read', 's_math_return'] },
    { id: 'B', title: 'Section B: Program (15 marks)', instr: 'Attempt any ONE of the two programs. Write the program in Java with variable descriptions or comments.', items: [{ attempt: 1, keys: ['l_quad', 'l_card'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'icse-10-computer-applications-chapter-test-long',
  title: 'Chapter test (long): Input in Java and Math Library Methods',
  duration: 60,
  sections: [
    { id: 'A', title: 'Section A: Compulsory (20 marks)', instr: 'Attempt all questions. Questions 1 to 10 are multiple-choice (1 mark each); questions 11 to 13 are short answers and questions 14 and 15 are predict-the-output items, 2 marks each.', items: ['m_param_way', 'm_read_double', 'm_next_word', 'm_pitfall_fix', 'm_pkg_use', 'm_logical', 'm_comment_types', 'm_pow_val', 'm_return_type', 'm_expr_sphere', 's_next_vs_line', 's_err_types', 's_expr_ci', 'co_div_zero', 'co_math_a'] },
    { id: 'B', title: 'Section B: Programs (30 marks)', instr: 'Attempt any TWO of the three programs. Write each program in Java with variable descriptions or comments.', items: [{ attempt: 2, keys: ['l_dist', 'l_ci', 'l_round'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 to t03 of icse-10-computer-applications-ch03 only: ways of input, Scanner, packages, types of errors, comments, Math class methods, random numbers and formulae as expressions',
    originality: 'every program, scenario and data value written for this chapter by SOYL with imagined names; no textbook, specimen or past-paper program reused',
    execution: 'every output, value, type and error in items, slides, notes and flashcards produced by compiling and running the code with JDK 21 (runJava in lib.mjs), with typed input supplied where a program reads it; results cached in src/java-cache.json',
    gate: 'schema, pipeline lint, deterministic verify, narration rules and the answer-leak scan run clean in this build',
  },
});
