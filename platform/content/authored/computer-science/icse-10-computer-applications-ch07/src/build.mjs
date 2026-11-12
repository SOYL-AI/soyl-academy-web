// Build ICSE 10 Computer Applications ch07 "User-defined Methods". Run from platform/:
//   npx tsx content/authored/computer-science/icse-10-computer-applications-ch07/src/build.mjs
// Every program output, value and error shown in decks, notes, flashcards and questions is produced by running Java.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg, useJavaCache } from '../../icse-10-computer-applications-ch01/src/lib.mjs';

const SRC = path.dirname(fileURLToPath(import.meta.url));
setUnit('icse-10-computer-applications-ch07', 'computer-science');
useJavaCache(SRC);
const P = await import('./progs.mjs');
await import('./q_a.mjs');
await import('./q_b.mjs');
const C = await import('./q_c.mjs');
const D = await import('./q_d.mjs');
const { F, ic, ev, out, J, one, mustCompile, mustFail, expect } = await import('./q_util.mjs');
const DIR = path.resolve(SRC, '..');

const L = (s) => s.split('\n');
const showSrc = (calls) => P.pShow(calls);

// ---------------------------------------------------------------- facts the narration states in words; stop if Java disagrees
expect(out(P.pDairy), 'Amount = 678.0', 'dairy bill');
expect(out(P.pFare), '84\n45', 'fare calls');
expect(out(P.pBand('band(15)')), 'Teen', 'band 15');
expect(out(P.pBand('band(9)')), 'Child', 'band 9');
expect(out(P.pBand('band(41)')), 'Adult', 'band 41');
expect(mustFail(P.pUnreach), 'unreachable statement', 'unreachable message');
expect(mustFail(P.pMissing), 'missing return statement', 'missing return message');
expect(out(P.pSwap(10, 20)), 'In swap: 20 10\nIn main: 10 20', 'swap trace');
expect(out(P.pRaise), 'Inside: 8500\nOutside: 8000', 'pay rise');
expect(out(P.pRaiseRet), 'Outside: 8500', 'pay rise by return');
expect(out(P.pParcel), '1700', 'parcel');
expect(out(P.pTuition), 'Sunrise Tuition\n2700', 'tuition');
expect(out(P.pTea), '17 20', 'tea stalls');
expect(out(P.pRates), '36 36\n40 30', 'pure and impure');
expect(out(C.pKiosk), '100 120', 'kiosk');
expect(out(P.pSolids), '64\n30\n628.0', 'volumes');
expect(out(showSrc("show(7);")), 'int version: 7', 'show 7');
expect(out(showSrc("show('A');")), 'int version: 65', 'show A');
expect(out(showSrc("show(7L);")), 'double version: 7.0', 'show 7L');
expect(out(P.pAmbig.replace('mix(2, 3);', 'mix(2, 3.0);')), 'int, double', 'mix exact');
expect(out(D.srcNumberMenu, '2 1331\n').split('\n').pop(), '1331 is a palindrome', 'palindrome menu');
expect(out(D.srcGcd, '84 36\n').split('\n')[1], 'GCD = 12', 'gcd 84 36');
mustCompile(J`
public class Tuition {
    int fee = 900;
    static String centre() {
        return "Sunrise Tuition";
    }
    public static void main(String[] args) {
        Tuition t = new Tuition();
        System.out.println(t.centre());
        System.out.println(Tuition.centre());
    }
}`, 'static method through an object and through the class');

mustCompile(J`
public class Tuition {
    int fee = 900;
    static String centre() {
        return "Sunrise Tuition";
    }
    int total(int months) {
        return fee * months;
    }
    int report() {
        return total(3) + centre().length();
    }
    public static void main(String[] args) {
        System.out.println(new Tuition().report());
    }
}`, 'a non-static method calls a non-static and a static method by name');

// ---------------------------------------------------------------- SVG helpers
const term = (s, x, y, label, w = 90) => { s.rect(x - w / 2, y - 17, w, 34, { rx: 17, fill: 'fill', color: 'accent', sw: 1.6 }); s.text(x, y, label, { size: 14, bold: true }); };
const box = (s, x, y, w, h, o = {}) => s.rect(x, y, w, h, { rx: 8, fill: 'fill', color: o.color ?? 'accent', sw: 1.8, dash: o.dash });

// ---------------------------------------------------------------- visuals: Part 1 (t01 to t03)
const vRoute1 = flow('LR', ['Why methods', 'Header', 'Prototype and signature', 'Parameters and return', 'Pass by value'], 'Route map of Part 1: why methods, the header, prototype and signature, parameters and return, and pass by value', 'Part 1 at a glance');
const vModular = table(
  ['', 'One long main method', 'Program split into methods'],
  [
    ['Repeated work', 'the same statements are typed again and again', 'written once, called whenever needed'],
    ['Finding an error', 'search the whole program', 'test and correct one small method'],
    ['Changing a rule', 'change every copy of the code', 'change the method in one place'],
    ['Reading', 'long and hard to follow', 'each method has a name that says what it does'],
  ],
  'Table comparing one long main method with a program split into methods: repeated work, finding an error, changing a rule and reading',
  'Modular programming: one task, one method.',
);
const vAnatomy = table(
  ['Part', `In ${ic('public static double milkBill(int litres, double rate)')}`, 'Meaning'],
  [
    ['access specifier', ic('public'), 'who may use the method'],
    ['modifier', ic('static'), 'the method belongs to the class'],
    ['return type', ic('double'), 'kind of value sent back (void if none)'],
    ['method name', ic('milkBill'), 'an identifier, usually a verb'],
    ['parameter list', ic('(int litres, double rate)'), 'type and name of each formal parameter'],
  ],
  'Table of the five parts of a method header: access specifier public, modifier static, return type double, name milkBill and the parameter list of an int and a double',
  'The body in braces follows the header.',
);
const vProtoSig = table(
  ['Method', 'Prototype', 'Signature'],
  [
    [ic('public static double milkBill(int litres, double rate)'), ic('double milkBill(int litres, double rate)'), ic('milkBill(int, double)')],
    [ic('static void greet(String name)'), ic('void greet(String name)'), ic('greet(String)')],
    [ic('static boolean isEven(int n)'), ic('boolean isEven(int n)'), ic('isEven(int)')],
  ],
  'Table of three methods with their prototype, which has the return type, name and parameter list, and their signature, which has only the name and the parameter types',
  'The return type is in the prototype but not in the signature.',
);
const vEx1 = table(
  ['Step', 'What happens', 'Value'],
  [
    ['1', `main calls ${ic('milkBill(12, 56.5)')}`, 'actual parameters 12 and 56.5'],
    ['2', `formal parameters ${ic('litres')} and ${ic('rate')} get copies`, 'litres is 12, rate is 56.5'],
    ['3', `${ic('return litres * rate;')} works out the product`, ev('12 * 56.5')],
    ['4', 'the value goes back and is stored in amount; the println joins it to the text', ic(out(P.pDairy))],
  ],
  `Trace of the milk bill: the call passes 12 and 56.5, the method returns ${ev('12 * 56.5')} and the program prints ${out(P.pDairy)}`,
);
const vKinds1 = table(
  ['Method', 'Return type', 'Calling statement', 'What the program shows'],
  [
    [ic('greet(String name)'), ic('void'), ic('greet("Meera");'), ic(out(P.pNotice).split('\n').slice(0, 2).join(' / '))],
    [ic('milkBill(int, double)'), ic('double'), ic('double amount = milkBill(12, 56.5);'), ic(out(P.pDairy))],
  ],
  `Table contrasting a void method, called as a statement and printing ${out(P.pNotice).split('\n')[0]}, with a value-returning method, whose result is stored in a variable`,
  'A void method is called as a statement; a value-returning method is used where its value is needed.',
);
const bandRows = [9, 15, 41].map((a) => [String(a), ev(`${a} < 13`) === 'true' ? 'first return: age < 13' : ev(`${a} < 20`) === 'true' ? 'second return: age < 20' : 'last return', ic(out(P.pBand(`band(${a})`)))]);
const vBand = table(
  ['age', 'Return statement that runs', 'Value returned'],
  bandRows,
  `Trace table of the age band method: ${[9, 15, 41].map((a) => `age ${a} returns ${out(P.pBand(`band(${a})`))}`).join('; ')}; the first return that is reached ends the method`,
  'return ends the method at once, so the later returns are skipped.',
);
const kindLines = L(out(P.pKinds));
const vKinds = table(
  ['Call', 'Value', 'Return type'],
  [
    [ic('cube(3)'), kindLines[0], ic('int')],
    [ic('half(7)'), kindLines[1], ic('double')],
    [ic('isEven(10)'), kindLines[2], ic('boolean')],
    [ic('initial("Kavya")'), kindLines[3], ic('char')],
    [ic('label(5)'), kindLines[4], ic('String')],
  ],
  `Table of five methods with different return types: cube returns ${kindLines[0]}, half returns ${kindLines[1]}, isEven returns ${kindLines[2]}, initial returns ${kindLines[3]} and label returns ${kindLines[4]}`,
);
const errUnreach = mustFail(P.pUnreach);
const errMissing = mustFail(P.pMissing);
const errVoidValue = mustFail(P.pVoidValue);
const errLossy = mustFail(P.pLossy);
const errArgs = mustFail(P.pArgs);
const errUseVoid = mustFail(P.pUseVoid);
const vReturnErrors = table(
  ['Mistake', 'Message of javac'],
  [
    ['a statement after return', errUnreach],
    ['a path with no return in a value-returning method', errMissing],
    ['return with a value in a void method', errVoidValue],
    ['storing a double result in an int variable', errLossy],
    ['wrong number of actual parameters', errArgs],
    ['using the result of a void method', errUseVoid],
  ],
  `Table of six mistakes with methods and the real compiler messages: ${errUnreach}; ${errMissing}; ${errVoidValue}; ${errLossy}; ${errArgs}; ${errUseVoid}`,
);
const vParams = (() => {
  const s = new Svg(620, 250);
  box(s, 20, 30, 230, 150);
  s.text(135, 52, 'main', { size: 15, bold: true });
  s.text(135, 92, 'distance = 7', { size: 14 });
  s.text(135, 132, 'perKm = 12', { size: 14 });
  s.text(135, 160, 'actual parameters', { size: 12, muted: true });
  box(s, 370, 30, 230, 150);
  s.text(485, 52, 'fare', { size: 15, bold: true });
  s.text(485, 92, 'km = 7', { size: 14 });
  s.text(485, 132, 'rate = 12', { size: 14 });
  s.text(485, 160, 'formal parameters', { size: 12, muted: true });
  s.arrow(255, 92, 365, 92, { sw: 1.8 });
  s.arrow(255, 132, 365, 132, { sw: 1.8 });
  s.text(310, 76, 'copy', { size: 13, bold: true });
  s.text(310, 116, 'copy', { size: 13, bold: true });
  s.text(310, 215, `fare(distance, perKm) returns ${L(out(P.pFare))[0]}`, { size: 14 });
  s.text(310, 238, 'Values go in by position; the names may differ', { size: 12, muted: true });
  return s.visual('Diagram of a call fare(distance, perKm): the actual parameters distance equal to 7 and perKm equal to 12 in main are copied, by position, into the formal parameters km and rate of the method fare, which returns 84', 'Actual parameters supply the values; formal parameters receive them.');
})();
const vCallFlow = flow('LR', ['Call is reached', 'Values copied to formal parameters', 'Body runs', 'return sends the result back', 'Caller continues'], 'Flow of a method call: the call is reached, the actual values are copied to the formal parameters, the body runs, return sends the result back and the caller continues', 'The life of one method call.');
const vPbv = (() => {
  const [inS, inM] = L(out(P.pSwap(10, 20))).map((l) => l.split(': ')[1].split(' '));
  const s = new Svg(620, 260);
  box(s, 20, 30, 230, 150);
  s.text(135, 52, 'main', { size: 15, bold: true });
  s.text(135, 92, `x = ${inM[0]}`, { size: 14 });
  s.text(135, 132, `y = ${inM[1]}`, { size: 14 });
  s.text(135, 160, 'unchanged', { size: 12, muted: true });
  box(s, 370, 30, 230, 150);
  s.text(485, 52, 'swap', { size: 15, bold: true });
  s.text(485, 92, `a = ${inS[0]}`, { size: 14 });
  s.text(485, 132, `b = ${inS[1]}`, { size: 14 });
  s.text(485, 160, 'its own copies, interchanged', { size: 12, muted: true });
  s.arrow(255, 92, 365, 92, { sw: 1.8 });
  s.arrow(255, 132, 365, 132, { sw: 1.8 });
  s.text(310, 76, 'copy of 10', { size: 12, bold: true });
  s.text(310, 116, 'copy of 20', { size: 12, bold: true });
  s.text(310, 215, 'Nothing travels back from the copies to x and y', { size: 14 });
  s.text(310, 238, 'A void method cannot carry the swapped values back', { size: 12, muted: true });
  return s.visual('Diagram of pass by value: main holds x equal to 10 and y equal to 20; their copies go into the swap method as a and b, which are interchanged to 20 and 10, but x and y in main stay unchanged', 'Pass by value: the method works on copies.');
})();
const swapSteps = ['int t = a;', 'a = b;', 'b = t;'];
const swapRows = [['(start)', 0], ...swapSteps.map((st, i) => [st, i + 1])].map(([st, k]) => [ic(st), ic(out(`int a = 10, b = 20;\n${swapSteps.slice(0, k).join('\n')}\nSystem.out.println(a + " " + b${k ? ' + " " + t' : ''});`).split(' ').join(', ') + (k ? '' : ' (t does not exist yet)'))]);
const vSwapTrace = table(
  ['After the statement', 'a, b, t inside swap'],
  swapRows,
  `Trace of the swap method with a equal 10 and b equal 20: ${swapRows.map(([a, b]) => `${a} gives ${b}`).join('; ')}`,
  'Inside the method the swap works; main never sees it.',
);
const vPbr = table(
  ['Kind of parameter', 'What is passed', 'Caller sees a change?', 'Example'],
  [
    ['primitive (int, double, char, boolean)', 'a copy of the value (call by value)', 'no', `${ic('raise(salary)')} prints ${ic(L(out(P.pRaise))[1])}`],
    ['object', 'the reference to the object (call by reference)', 'yes, a change to its data members', `${ic('addPacking(box)')} makes ${ic('box.weight')} ${ic(out(P.pParcel))}`],
  ],
  `Table contrasting a primitive parameter, passed by value so that the caller sees no change and still prints ${L(out(P.pRaise))[1]}, with an object parameter, passed by reference so that the weight becomes ${out(P.pParcel)}`,
  'Pass by reference needs only its definition and one example in the syllabus.',
);
const vSummary1 = table(
  ['Topic', 'Remember'],
  [
    ['modular programming', 'small methods, each with one job; written once, reused'],
    ['header', 'access specifier, modifier, return type, name, parameter list'],
    ['prototype and signature', 'prototype: return type, name, parameters; signature: name and parameter types only'],
    ['return', 'sends a value back and ends the method; none after it; every path must return'],
    ['parameters', 'actual in the call, formal in the header; matched by position and type'],
    ['pass by value', 'primitives are copied; the caller\'s variable is never changed'],
  ],
  'Summary table of Part 1: modular programming, the header, prototype and signature, return, parameters and pass by value',
);

// ---------------------------------------------------------------- visuals: Part 2 (t04 to t06)
const vRoute2 = flow('LR', ['Static and non-static', 'Calling each kind', 'Pure and impure', 'Overloading', 'Promotion and ambiguity'], 'Route map of Part 2: static and non-static methods, calling each kind, pure and impure methods, overloading, promotion and ambiguity', 'Part 2 at a glance');
const vStatic = table(
  ['', 'static method', 'non-static method'],
  [
    ['Belongs to', 'the class', 'each object of the class'],
    ['Needs an object', 'no', 'yes'],
    ['Data members', 'cannot use instance data members directly', 'can use the data members of its object'],
    ['Called as', ic('centre()') + ' or ' + ic('Tuition.centre()'), ic('t.total(3)')],
    ['Header example', ic('static String centre()'), ic('int total(int months)')],
  ],
  'Table comparing a static method, which belongs to the class and needs no object, with a non-static method, which belongs to an object, uses its data members and is called through the object',
);
const vCalling = table(
  ['Call written in', 'static method centre()', 'non-static method total(3)'],
  [
    ['main of the same class', ic('centre()') + ' or ' + ic('Tuition.centre()'), `create ${ic('Tuition t = new Tuition();')} then ${ic('t.total(3)')}`],
    ['a method of another class', ic('Tuition.centre()'), `${ic('t.total(3)')} with an object t of Tuition`],
    ['a non-static method of the same class', ic('centre()'), ic('total(3)') + ' works: the same object is used'],
  ],
  'Table of how each kind of method is called from main of the same class, from another class and from a non-static method of the same class',
  'Rule: no object, no non-static call.',
);
const vEx4 = table(
  ['Statement in main', 'Kind of call', 'Output'],
  [
    [ic('System.out.println(centre());'), 'static, by name', ic(L(out(P.pTuition))[0])],
    [ic('Tuition t = new Tuition();'), 'object created', ic('nothing is printed')],
    [ic('System.out.println(t.total(3));'), 'non-static, through the object', `${ic(L(out(P.pTuition))[1])} (fee 900 times 3)`],
  ],
  `Trace of the tuition program: the static call prints ${L(out(P.pTuition))[0]}; after an object is created, t.total(3) prints ${L(out(P.pTuition))[1]}`,
);
const errNonStaticCall = mustFail(P.pTuitionBadCall);
const errNonStaticField = mustFail(P.pTuitionBadField);
const vCtxErr = table(
  ['Code', 'Result'],
  [
    [`${ic('total(3)')} written in static main, no object`, errNonStaticCall],
    [`${ic('fee')} used inside a static method`, errNonStaticField],
    [`${ic('t.centre()')}: static method called through an object`, 'compiles and works, but write Tuition.centre() to show it is static'],
  ],
  `Table of the static context mistakes with the real compiler messages: ${errNonStaticCall}; ${errNonStaticField}; and the legal but untidy call of a static method through an object`,
  'main is static, so it can reach non-static members only through an object.',
);
const menuRuns = ['1 4821', '2 1331', '2 1342', '5 10'];
const vTools = table(
  ['Input (choice, number)', 'Last line of the output'],
  menuRuns.map((i) => [ic(i), ic(L(out(D.srcNumberMenu, `${i}\n`)).pop())]),
  `Table of four runs of the number menu: ${menuRuns.map((i) => `input ${i} gives ${L(out(D.srcNumberMenu, `${i}\n`)).pop()}`).join('; ')}`,
  'NumTools.digitSum and NumTools.isPalindrome are static: no object is created.',
);
const vTeaObjects = (() => {
  const [a, b] = out(P.pTea).split(' ');
  const s = new Svg(620, 250);
  box(s, 20, 30, 250, 130);
  s.text(145, 52, 'object a', { size: 15, bold: true });
  s.text(145, 92, `cups = ${a}`, { size: 14 });
  s.text(145, 125, 'after sell(8) and sell(5)', { size: 12, muted: true });
  box(s, 350, 30, 250, 130);
  s.text(475, 52, 'object b', { size: 15, bold: true });
  s.text(475, 92, `cups = ${b}`, { size: 14 });
  s.text(475, 125, 'after sell(10)', { size: 12, muted: true });
  s.text(310, 195, 'Both objects use the same method sell, each on its own data member', { size: 13 });
  s.text(310, 220, 'Started at 30 cups each', { size: 12, muted: true });
  return s.visual(`Diagram of two TeaStall objects: object a has ${a} cups after selling 8 and 5, object b has ${b} cups after selling 10; both started with 30 and both use the same method sell on their own data member`, 'Each object has its own data members; the methods are shared.');
})();
const noteLines = L(out(P.pRates));
const vPure = table(
  ['Call', 'Changes a data member?', 'Result of two calls', 'Kind'],
  [
    [ic('r.square(6)'), 'no', ic(noteLines[0]), 'pure'],
    [ic('r.issue(10)'), 'yes, stock becomes smaller', ic(noteLines[1]), 'impure'],
  ],
  `Table of a pure and an impure method: two calls of square(6) give ${noteLines[0]} while two calls of issue(10) give ${noteLines[1]}, because issue changes the data member stock`,
  'Same arguments, same result: a mark of a pure method.',
);
const kioskVals = out(C.pKiosk).split(' ');
const vKiosk = table(
  ['Statement', 'price afterwards', 'Value produced'],
  [
    [ic('k.cost(4)'), '25', kioskVals[0]],
    [ic('k.revise(30)'), '30', 'nothing: a void method'],
    [ic('k.cost(4)'), '30', kioskVals[1]],
  ],
  `Trace of the kiosk: cost(4) gives ${kioskVals[0]}, revise(30) changes the data member price, and the same call cost(4) then gives ${kioskVals[1]}`,
  'revise is impure: it changes the state of the object.',
);
const vClassify = table(
  ['Method', 'Reason', 'Kind'],
  [
    [ic('static int twice(int n) { return n * 2; }'), 'works out a result from its argument only', 'pure'],
    [ic('void reset() { count = 0; }'), 'changes the data member count', 'impure'],
    [ic('static double avg(double a, double b) { return (a + b) / 2; }'), 'works out a result from its arguments only', 'pure'],
    [ic('void stamp(Parcel p) { p.weight = 0; }'), 'changes the object that was passed to it', 'impure'],
  ],
  'Table classifying four methods: twice and avg are pure because they only compute from their arguments; reset and stamp are impure because they change a data member or the object passed to them',
  'Ask: does this method change anything? If yes, it is impure.',
);
const solidLines = L(out(P.pSolids));
const vOverload = table(
  ['Call', 'Version executed', 'Output'],
  [
    [ic('volume(4)'), ic('int volume(int side)'), solidLines[0]],
    [ic('volume(5, 3, 2)'), ic('int volume(int l, int b, int h)'), solidLines[1]],
    [ic('volume(10.0, 2.0)'), ic('double volume(double r, double h)'), solidLines[2]],
  ],
  `Table of the three overloaded volume methods: one int gives the cube version and prints ${solidLines[0]}, three ints give the cuboid version and print ${solidLines[1]}, two doubles give the cylinder version and print ${solidLines[2]}`,
  'Same name, different parameter lists.',
);
const errRetOnly = mustFail(P.pRetOnly);
const srcPairNames = J`
public class Pairs {
    static int total(int a) {
        return a;
    }
    static double total(int b) {
        return b;
    }
    public static void main(String[] args) {
        System.out.println(total(2));
    }
}`;
const errPairNames = mustFail(srcPairNames);
mustCompile(J`
public class Pairs {
    static void show(int a) {
        System.out.println(a);
    }
    static void show(int a, int b) {
        System.out.println(a + b);
    }
    public static void main(String[] args) {
        show(2);
        show(2, 3);
    }
}`);
const vRules = table(
  ['Two methods in one class', 'Valid overloading?', 'Why'],
  [
    [`${ic('show(int a)')} and ${ic('show(int a, int b)')}`, 'yes', 'different number of parameters'],
    [`${ic('show(int a)')} and ${ic('show(double a)')}`, 'yes', 'different type of parameter'],
    [`${ic('show(int a, double b)')} and ${ic('show(double a, int b)')}`, 'yes', 'different order of types (but a call such as show(2, 3) is ambiguous)'],
    [`${ic('int area(int s)')} and ${ic('double area(int s)')}`, `no: ${errRetOnly}`, 'only the return type differs'],
    [`${ic('int total(int a)')} and ${ic('double total(int b)')}`, `no: ${errPairNames}`, 'only the parameter name and return type differ'],
  ],
  `Table of valid and invalid overloading: a different number, type or order of parameters is valid; a change of return type alone, or of the parameter name alone, gives the compiler message ${errRetOnly}`,
);
const resolveCalls = ['show(7);', 'show(7.0);', "show('A');", 'show(7L);', 'show(2.5f);'];
const resolveWhy = ['exact match: int', 'exact match: double', 'char is promoted to int (code 65)', 'long has no version; widened to double', 'float has no version; widened to double'];
const vResolve = table(
  ['Call', 'Output', 'Why'],
  resolveCalls.map((c, i) => [ic(c), ic(out(showSrc(c))), resolveWhy[i]]),
  `Table of five calls to the overloaded show: ${resolveCalls.map((c) => `${c.replace(';', '')} prints ${out(showSrc(c))}`).join('; ')}`,
  'The nearest widening is chosen when there is no exact match.',
);
const vPromo = flow('LR', ['byte', 'short', 'int', 'long', 'float', 'double'], 'Chain of widening conversions used when an exact version is missing: byte to short to int to long to float to double, and char also widens to int', 'Widening order (char goes to int).');
const vAmbig = table(
  ['Call', 'Result'],
  [
    [ic('mix(2, 3)'), mustFail(P.pAmbig)],
    [ic('mix(2, 3.0)'), ic(out(P.pAmbig.replace('mix(2, 3);', 'mix(2, 3.0);')))],
    [ic('mix(2.0, 3)'), ic(out(P.pAmbig.replace('mix(2, 3);', 'mix(2.0, 3);')))],
  ],
  `Table of calls to mix(int, double) and mix(double, int): mix(2, 3) fits neither version better and the compiler says ${mustFail(P.pAmbig)}; mix(2, 3.0) and mix(2.0, 3) are exact matches`,
  'An ambiguous call is a compile-time error: make one argument exact.',
);
const vSummary2 = table(
  ['Topic', 'Remember'],
  [
    ['static', 'belongs to the class; called by name or ClassName.method(); no object needed'],
    ['non-static', 'needs an object; uses its data members; object.method()'],
    ['static context', 'static code cannot use non-static members without an object'],
    ['pure', 'no change of state; result from the arguments only'],
    ['impure', 'changes data members or the object passed in'],
    ['overloading', 'same name, different parameter list; return type does not count; compile-time polymorphism'],
  ],
  'Summary table of Part 2: static and non-static, the static context error, pure and impure methods and overloading',
);

// ---------------------------------------------------------------- deck 1
const part1 = deck({
  part: 1,
  title: 'Methods: Header, Parameters, Return and Pass by Value',
  goals: [
    'Explain how methods support modular programming and write the prototype and signature of a method',
    'Define and call void and value-returning methods, and use return correctly',
    'Distinguish actual from formal parameters',
    'Predict the output of programs in which a method changes a primitive parameter, and define pass by reference with one example',
  ],
  slides: [
    sl('title', 'User-defined methods', {
      b: 'Part 1: why we write **methods**, the **header**, **prototype** and **signature**, **parameters**, **return** and **pass by value**.',
      v: vRoute1,
      n: 'Welcome to user defined methods. In this part we see why programs are divided into methods, and we take a method header apart. We separate the prototype from the signature, and the actual parameters from the formal ones. We learn how return works and what can go wrong with it. Finally we study pass by value, using a swap method that does not work.',
    }),
    sl('concept', 'Why write methods?', {
      b: 'A **method** is a named block of statements that does one job. Dividing a program into methods is **modular programming**: each part can be written, tested and reused on its own.',
      v: vModular,
      n: 'A method is a named block of statements that does one job. Dividing a program into small methods is called modular programming. Code written once can be called again and again, so it is not repeated. An error is easier to find in a small method than in a long main. A rule can be changed in one place. The table compares the two styles.',
    }),
    sl('concept', 'The method header', {
      b: `${F(P.pDairy.split('\n').slice(1, 4).join('\n'))}\n\nThe first line is the **header**; the statements in braces are the **body**.`,
      v: vAnatomy,
      n: 'The first line of a method is its header. It has an access specifier, such as public, and a modifier such as static. Next comes the return type, which is the kind of value sent back, or void if nothing is sent back. Then come the name of the method and, in brackets, the list of parameters, each with its type and name. The statements in braces form the body.',
    }),
    sl('concept', 'Prototype and signature', {
      b: 'The **prototype** is the return type, the name and the parameter list. The **signature** is only the **name and the types of the parameters, in order**. The return type is **not** part of the signature.',
      v: vProtoSig,
      n: 'The prototype of a method gives its return type, its name and its parameter list. The signature is smaller. It is the name and the types of the parameters in order. The return type is not part of the signature, and neither are the names of the parameters. This difference will matter when we study overloading, because the compiler tells methods apart by their signatures.',
    }),
    sl('example', 'Worked example 1: define and call', {
      b: `${F(P.pDairy)}\n\nTrace the call: which values go in, what is returned, what is printed.`,
      v: vEx1,
      n: 'Let us trace the milk bill program. The call in main passes twelve and fifty six point five. The formal parameters litres and rate receive copies of these values. The return statement works out the product, six hundred seventy eight, and sends it back. The value is stored in the variable amount, and the println joins it to the text. The output is Amount equals six hundred seventy eight point zero.',
    }),
    sl('check', 'Quick check: parts of a header', {
      b: 'Match each part of the header with its name.',
      chk: 'mt_header',
      n: 'Recall the five parts of a header, and say which of them is the access specifier, the modifier, the return type and the parameter list.',
    }),
    sl('concept', 'void and value-returning methods', {
      b: `A **void** method returns nothing and is called as a statement. A method with any other return type returns a value and is used where that value is needed.\n\n${F(P.pNotice)}`,
      v: vKinds1,
      n: 'A void method sends nothing back, so its call is a statement on its own. In the notice program, greet is called twice, and each call prints a welcome line. A value returning method is different. Its call is used where the value is needed, for example on the right of an assignment, as in the milk bill. The table shows both kinds side by side.',
    }),
    sl('concept', 'return ends the method', {
      b: `**return** sends a value back and **ends the method at once**. A method may have several returns in different branches.\n\n${F(P.pBand('band(15)').split('\n').slice(1, 9).join('\n'))}`,
      v: vBand,
      n: 'The return statement sends a value back and ends the method at once. A method can have several return statements in different branches. In the age band method, age nine takes the first return and gives Child. Age fifteen skips the first return, takes the second and gives Teen. Age forty one passes both tests and reaches the last return, which gives Adult.',
    }),
    sl('example', 'Worked example 2: return types', {
      b: `${F(P.pKinds.split('\n').slice(1, 17).join('\n'))}\n\nA method may return any type: int, double, boolean, char or String.`,
      v: vKinds,
      n: 'A method can return any type. The method cube returns an int, and for three the value is twenty seven. The method half divides by two point zero, so it returns a double, three point five for seven. The method is even returns a boolean, here true. The method initial returns a char, and label returns a String. The type in the header must match the value returned.',
    }),
    sl('check', 'Quick check: signature', {
      b: 'Choose the signature of the method.',
      chk: 'm_signature',
      n: 'Remember what the signature includes and what it leaves out, in particular the return type and the names of the parameters.',
    }),
    sl('concept', 'When return goes wrong', {
      b: 'The compiler checks every path. A statement after `return` is **unreachable**; a value-returning method must **return on every path**; a `void` method may not return a value.',
      v: vReturnErrors,
      n: 'The compiler checks return statements carefully. A statement placed after a return can never run, so javac reports unreachable statement. If a method with a return type has a path that ends without a return, javac reports missing return statement. A void method cannot return a value, and the type of the returned value must fit the declared type. The table gives the real messages.',
    }),
    sl('concept', 'Actual and formal parameters', {
      b: '**Actual parameters** are the values or variables in the **call**. **Formal parameters** are the variables in the **header**. They are matched by **position**; the number and types must fit.',
      v: vParams,
      n: 'The values written in a call are the actual parameters. The variables written in the header are the formal parameters. When the call runs, each actual value is copied into the formal parameter in the same position. Here the values seven and twelve in main go into km and rate, and the method returns eighty four. The names may differ, but the number and types must agree.',
    }),
    sl('example', 'Worked example 3: the call and its parts', {
      b: `${F(P.pFare)}\n\nName the actual and the formal parameters of each call.`,
      v: table(
        ['Call', 'Actual parameters', 'Formal parameters', 'Value returned'],
        [
          [ic('fare(distance, perKm)'), 'distance, perKm', 'km, rate', L(out(P.pFare))[0]],
          [ic('fare(3, 15)'), '3, 15', 'km, rate', L(out(P.pFare))[1]],
        ],
        `Table of the two calls of fare: with distance and perKm the method returns ${L(out(P.pFare))[0]}, with 3 and 15 it returns ${L(out(P.pFare))[1]}; the formal parameters are km and rate in both calls`,
        'Actual parameters may be variables or literals.',
      ),
      n: 'Look at the two calls of fare. In the first call the actual parameters are the variables distance and per km, and the method returns eighty four. In the second call the actual parameters are the literal values three and fifteen, and it returns forty five. In both calls the formal parameters are km and rate. Actual parameters may be variables, literals or expressions.',
    }),
    sl('concept', 'The life of a method call', {
      b: 'When the call is reached, **control passes to the method**; when the method ends, control returns to the call and the **returned value replaces the call**.',
      v: vCallFlow,
      n: 'This flow shows what happens during a call. The calling statement is reached. The values of the actual parameters are copied into the formal parameters. The body of the method runs. A return statement sends the result back, or the end of a void method is reached. Control then returns to the caller, which uses the value and moves to its next statement.',
    }),
    sl('check', 'Quick check: order of a call', {
      b: 'Arrange the events of a method call.',
      chk: 'ord_call_flow',
      n: 'Think about what must happen before the body can run, and what happens after the return.',
    }),
    sl('concept', 'Pass by value', {
      b: 'Java passes primitive arguments **by value**: the formal parameter is a **copy**. Whatever the method does to the copy never reaches the actual parameter.',
      v: vPbv,
      n: 'Primitive arguments are passed by value. The formal parameter is a separate variable, which starts with a copy of the value. In the diagram, the variables x and y of main go into swap as the copies a and b. The method interchanges its copies, but x and y stay as they were. Nothing travels back from the copies, so the change is lost when the method ends.',
    }),
    sl('example', 'Worked example 4: the swap that fails', {
      b: `${F(P.pSwap(10, 20))}\n\nTrace the statements of \`swap\` for a = 10, b = 20.`,
      v: vSwapTrace,
      n: 'Let us trace the swap method with ten and twenty. After the first statement, t holds ten. After the second, a holds twenty. After the third, b holds ten. So inside swap the values are interchanged, and the first line prints twenty ten. But main prints its own variables, which were never touched, so the second line prints ten twenty. To send a result back, a method must return it.',
    }),
    sl('check', 'Quick check: swap on copies', {
      b: 'Write the exact output.',
      chk: 'co_swap',
      n: 'Remember that the formal parameters are copies, and decide which line shows the interchanged values.',
    }),
    sl('concept', 'Pass by reference: definition and example', {
      b: 'In **pass by reference** the **reference** to the data is passed, so the formal and actual parameters refer to the **same data**. Passing an **object** is the usual example: a change to its data member is seen by the caller.',
      v: vPbr,
      n: 'In pass by reference the reference to the data is passed, not a copy of a value. The formal parameter and the actual parameter then refer to the same data. The usual example is an object. In the dispatch program, the method adds packing to the weight of the parcel it receives, and main then shows seventeen hundred. A primitive parameter never behaves like this.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. Methods divide a program into small reusable parts. The header has the access specifier, modifier, return type, name and parameter list. The prototype includes the return type, the signature does not. Return ends a method, and every path of a value returning method must return. Actual parameters are in the call, formal parameters in the header. Primitive parameters are passed by value.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Write a prototype with the return type, the name and **every parameter with its type**.',
        'The signature has **no return type** and no parameter names: `area(int, int)`.',
        'Check every path of a value-returning method for a `return`; nothing may follow a `return` in the same block.',
        'To trace a call, copy the actual values into the formal parameters first, then run the body.',
        'A method that changes a primitive parameter changes only its own copy: the caller\'s variable keeps its value.',
      ],
      n: 'Some exam tips. Write the prototype with the return type, the name, and every parameter with its type. The signature has no return type. Check that every path of a value returning method has a return, and that nothing follows a return. To trace a call, first copy the actual values into the formal parameters. A method that changes a primitive parameter changes only its own copy.',
    }),
  ],
});

// ---------------------------------------------------------------- deck 2
const part2 = deck({
  part: 2,
  title: 'Static and Non-static, Pure and Impure Methods, Overloading',
  goals: [
    'Distinguish static from non-static methods and call each correctly',
    'Write a class with data members and several member methods invoked through an object',
    'Classify a method as pure or impure with a reason',
    'Write overloaded methods and identify the version called for a given argument list',
  ],
  slides: [
    sl('title', 'static, pure and overloaded methods', {
      b: 'Part 2: **static** and **non-static** methods, calls through **objects**, **pure** and **impure** methods and **method overloading**.',
      v: vRoute2,
      n: 'Welcome to the second part. We separate static methods from non static ones and learn to call each correctly, with the help of objects. Then we classify methods as pure or impure. Last, we study method overloading, in which several methods share one name, and we see how the compiler chooses between them, even when an argument has to be promoted.',
    }),
    sl('concept', 'static and non-static methods', {
      b: `A **static** method belongs to the class. A **non-static** method belongs to the objects of the class and can use their data members.\n\n${F(P.pTuition.split('\n').slice(1, 8).join('\n'))}`,
      v: vStatic,
      n: 'A static method belongs to the class itself, so it needs no object. A non static method belongs to the objects, and it can use their data members directly. In the tuition class, centre is static and total is not. Total multiplies the data member fee by the months, so it must work on an object. The table lists the differences.',
    }),
    sl('concept', 'Calling each kind', {
      b: 'A static method is called by **name** inside its class, or as **ClassName.method()** from another class. A non-static method is called through an **object**: **object.method()**.',
      v: vCalling,
      n: 'This table shows how each kind is called. A static method is called by its name inside the same class, or with the class name, a dot and the method name from another class. A non static method needs an object. First create the object with new, then write the object name, a dot and the method. Inside another non static method of the same class, the name alone works.',
    }),
    sl('example', 'Worked example 1: static and non-static together', {
      b: `${F(P.pTuition)}\n\nTrace the statements of \`main\`.`,
      v: vEx4,
      n: 'Let us trace the tuition program. The first statement calls the static method centre by its name, and it prints Sunrise Tuition. Then an object is created with new, and nothing is printed. The last statement calls total through the object. The data member fee is nine hundred, and three months give two thousand seven hundred.',
    }),
    sl('concept', 'The static context errors', {
      b: 'The method `main` is static, so it runs without any object. It **cannot use a non-static method or data member by name**; it needs an object.',
      v: vCtxErr,
      n: 'The main method is static, so it runs before any object exists. It therefore cannot call a non static method by its name. The compiler says that the non static method cannot be referenced from a static context. The same message appears for a data member used inside a static method. The cure is to create an object. A static method can be called through an object, but it is better to use the class name.',
    }),
    sl('check', 'Quick check: which call compiles?', {
      b: 'Choose the statement that compiles and displays the capacity.',
      chk: 'm_static_call',
      n: 'Decide whether the method is static or not, and what that means for the way it is called from main.',
    }),
    sl('example', 'Worked example 2: a utility class of static methods', {
      b: `${F(D.srcNumberMenu.split('\n').slice(2, 22).join('\n'))}\n\nThe menu program calls these methods with the class name; no object is created.`,
      v: vTools,
      n: 'A utility class often holds static methods that need no object. NumTools has digit sum and palindrome check. The menu program calls them with the class name. With the choice one and the number four thousand eight hundred twenty one, the digit sum is fifteen. With two and thirteen thirty one, the number is a palindrome. Two and thirteen forty two is not, and the choice five is invalid.',
    }),
    sl('concept', 'Member methods and objects', {
      b: `Each object has **its own data members**; its non-static methods work on them.\n\n${F(P.pTea.split('\n').slice(1, 8).join('\n'))}`,
      v: vTeaObjects,
      n: 'Each object of a class has its own copy of the data members, and the non static methods work on the object before the dot. In the tea stall program two objects start with thirty cups each. Stall a sells eight and then five, which leaves seventeen. Stall b sells ten, which leaves twenty. The same method sell is used, but each call changes only its own object.',
    }),
    sl('concept', 'Pure methods', {
      b: 'A **pure method** returns a result **without changing** the state of the object or anything else. It works from its arguments, and the same arguments always give the same result.',
      v: vPure,
      n: 'A pure method only works out a result and returns it. It changes no data member and nothing passed to it, so the same arguments always give the same result. In the table, two calls of square six give thirty six each time. The second method, issue, reduces the data member stock, so its two calls give forty and then thirty. That method is not pure.',
    }),
    sl('concept', 'Impure methods', {
      b: 'An **impure method** changes the state of the object, for example a **data member**, or the object passed to it. The same call can then give different results.',
      v: vKiosk,
      n: 'An impure method changes something: usually a data member of the object. In the kiosk program the price starts at twenty five, so cost of four gives one hundred. The void method revise sets the price to thirty. The same call, cost of four, now gives one hundred twenty. The result changed because revise changed the state of the object, so revise is the impure method.',
    }),
    sl('example', 'Worked example 3: pure or impure?', {
      b: 'Classify each method and give a reason. The test is simple: **does the method change anything?**',
      v: vClassify,
      n: 'Let us classify four methods. Twice only works from its argument, so it is pure. Reset sets the data member count to zero, so it changes the state and is impure. Avg only computes from its two arguments, so it is pure. Stamp changes the weight of the parcel that was passed to it, so it is impure. The question to ask each time is whether the method changes anything.',
    }),
    sl('check', 'Quick check: a pure method', {
      b: 'Decide on the truth of the assertion and the reason.',
      chk: 'ar_pure_same',
      n: 'Think about what a pure method depends on, and whether it needs parameters.',
    }),
    sl('concept', 'Method overloading', {
      b: '**Method overloading** means two or more methods with the **same name** in one class and **different parameter lists** (number, type or order). It is **compile-time polymorphism**.',
      v: vOverload,
      n: 'In method overloading, several methods in one class share a name but have different parameter lists. They differ in the number, the type or the order of the parameters. Here volume has three versions. One int gives the cube. Three ints give the cuboid. Two doubles give the cylinder. The compiler chooses the version from the call, before the program runs, so overloading is compile time polymorphism.',
    }),
    sl('concept', 'What makes a valid overload', {
      b: 'The **signatures** must differ. A different **return type** or a different **parameter name** is not enough.',
      v: vRules,
      n: 'Two methods can be overloaded only if their signatures differ. A different number of parameters is enough. A different type is enough. A different order of types is also enough. But a different return type alone is not, and neither is a different name for the same parameter. In those cases the compiler says that the method is already defined in the class.',
    }),
    sl('example', 'Worked example 4: which version runs?', {
      b: `${F(P.pShow("show(7);").split('\n').slice(0, 7).join('\n'))}\n\nFind the version for each call.`,
      v: vResolve,
      n: 'Let us find the version for each call. Show of seven is an exact match for the int version. Show of seven point zero matches the double version. The char A has no version of its own, so it is promoted to int, and the int version prints sixty five. The long value seven has no version either, so it is widened to double, and the double version prints seven point zero.',
    }),
    sl('concept', 'Type promotion in a call', {
      b: 'If there is **no exact match**, Java widens the arguments along **byte, short, int, long, float, double** (and **char to int**) and picks the nearest version.',
      v: vPromo,
      n: 'When no version matches the argument types exactly, the compiler widens the arguments. The order of widening is byte, short, int, long, float and double, and a char widens to int. The nearest version that can accept the widened value is used. Narrowing never happens by itself, so a double argument can never go to a version that needs an int.',
    }),
    sl('check', 'Quick check: promotion', {
      b: 'Write the exact output.',
      chk: 'co_promo',
      n: 'For each call, decide whether there is an exact version, and if not, which widening gives the nearest one.',
    }),
    sl('concept', 'Ambiguous calls', {
      b: 'If **two versions fit equally well**, the call is **ambiguous** and does not compile. Make one argument exact.',
      v: vAmbig,
      n: 'Sometimes two versions fit equally badly. The class has mix of int and double, and mix of double and int. The call with two and three needs one widening in either version, so neither is better, and the compiler reports that the reference is ambiguous. A call with two and three point zero is an exact match for the first version, so it compiles.',
    }),
    sl('check', 'Quick check: matching calls', {
      b: 'Match each call with the version that runs.',
      chk: 'mt_overload_call',
      n: 'Count the arguments and note their types, and compare them with each parameter list.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. A static method belongs to the class, a non static method needs an object and can use its data members. Static code cannot use non static members without an object. A pure method changes nothing and an impure method changes the state. Overloaded methods share a name and differ in the parameter list, never in the return type alone.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'From `main`, call a non-static method only through an object: create it with `new` first.',
        'Call a static method of another class as `ClassName.method()`; no object is needed.',
        'To classify a method, ask what it changes: a data member or a passed object makes it **impure**.',
        'Overloaded methods differ in the number, type or order of parameters; **never by return type alone**.',
        'For an overloaded call, look for an exact match first, then the nearest widening (`char` to `int`, `int` to `double`).',
      ],
      n: 'Some exam tips. From main, call a non static method only through an object. Call a static method of another class with the class name. To classify a method, ask what it changes. Overloaded methods differ in the number, the type or the order of the parameters, never in the return type alone. For an overloaded call, look for an exact match first, and then for the nearest widening.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'User-defined Methods: notes',
  sections: [
    {
      h: '1. Why methods; header, prototype and signature',
      t: 1,
      b: `A **method** is a named block of statements that does one job. Dividing a program into methods is **modular programming**: code is written once and reused, each part is tested separately, and a change is made in one place.\n\n${F(P.pDairy.split('\n').slice(1, 4).join('\n'))}\n\nThe **header** has the access specifier (\`public\`), a modifier (\`static\`), the return type (\`double\`), the name (\`milkBill\`) and the parameter list. The **prototype** is the return type, name and parameter list: ${ic('double milkBill(int litres, double rate)')}. The **signature** is only the name and the parameter types in order: ${ic('milkBill(int, double)')}. The return type and the parameter names are not part of it.`,
      terms: [
        ['Method', 'A named block of statements that performs one task and can be called from other parts of the program.'],
        ['Modular programming', 'Dividing a program into small independent parts, each written and tested separately.'],
        ['Prototype', 'The return type, name and parameter list of a method.'],
        ['Signature', 'The name of a method together with the types and order of its parameters.'],
      ],
      v: vAnatomy,
      vs: [vModular, vProtoSig],
    },
    {
      h: '2. Defining and calling; void and return',
      t: [1, 2],
      b: `A **void** method returns nothing and is called as a statement. A method with another return type returns a value with **return**, and its call is used where the value is needed.\n\n${F(P.pBand('band(15)').split('\n').slice(1, 9).join('\n'))}\n\nFor age 15 the value is ${ic(out(P.pBand('band(15)')))}. **return** ends the method at once, and a method may have several returns in different branches.\n\n**Compiler checks:** a statement after return gives "${errUnreach}"; a value-returning method with a path that has no return gives "${errMissing}"; a return with a value in a void method gives "${errVoidValue}"; storing a double result in an int gives "${errLossy}".`,
      terms: [
        ['void', 'The return type of a method that does not return a value.'],
        ['return statement', 'A statement that sends a value back to the caller and ends the method.'],
      ],
      v: vKinds1,
      vs: [vBand, vKinds, vReturnErrors],
    },
    {
      h: '3. Actual and formal parameters',
      t: 2,
      b: `**Formal parameters** are the variables in the header. **Actual parameters** are the values or variables in the call. When the method is called, the actual values are copied into the formal parameters in the same position, so the number, types and order must fit; a wrong number of arguments gives "${errArgs}".\n\n${F(P.pFare)}\n\nThe two calls print ${ic(one(out(P.pFare)))}. Here km and rate are formal parameters; distance, perKm, 3 and 15 are actual parameters.\n\n**Order of a call:** the call is reached, the values are copied, the body runs, return sends the result back, the caller continues.`,
      terms: [
        ['Formal parameter', 'A variable declared in the method header that receives a value when the method is called.'],
        ['Actual parameter', 'A value or variable written in a method call; its value is passed to the formal parameter.'],
      ],
      v: vParams,
      vs: [vCallFlow],
    },
    {
      h: '4. Pass by value and pass by reference',
      t: 3,
      b: `A primitive argument is passed **by value**: the formal parameter is a copy, so a change inside the method is lost.\n\n${F(P.pSwap(10, 20))}\n\nOutput: ${ic(one(out(P.pSwap(10, 20))))}. The values are interchanged inside swap only. To send a changed value back, return it: ${ic(out(P.pRaiseRet))} is printed when raise returns pay + 500 and main stores it.\n\n**Pass by reference** (definition and example only): the reference to the data is passed, so the formal and actual parameters refer to the same data and a change is seen by the caller. Example: a method that adds 200 to the data member weight of a Parcel object passed to it makes main print ${ic(out(P.pParcel))}.`,
      terms: [
        ['Pass by value', 'Passing a copy of the value of the actual parameter, so the actual parameter cannot be changed by the method.'],
        ['Pass by reference', 'Passing the reference to the data, so the formal and actual parameters refer to the same data and a change is visible to the caller.'],
      ],
      v: vPbv,
      vs: [vSwapTrace, vPbr],
    },
    {
      h: '5. Static and non-static methods; calls through objects',
      t: 4,
      b: `A **static** method belongs to the class; it is called by name in its own class or as ${ic('ClassName.method()')}, and needs no object. A **non-static** method belongs to the objects; it can use their data members and is called through an object: ${ic('t.total(3)')}.\n\n${F(P.pTuition)}\n\nOutput: ${ic(one(out(P.pTuition)))}.\n\nBecause main is static, calling a non-static method by name gives "${errNonStaticCall}", and a non-static data member used inside a static method gives "${errNonStaticField}". Each object has its own data members: two TeaStall objects that sell different numbers of cups end with ${ic(out(P.pTea))} cups.`,
      terms: [
        ['Static method', 'A method that belongs to the class and can be called without creating an object.'],
        ['Non-static method', 'A method that belongs to the objects of a class and is called through an object; it can use the data members of that object.'],
        ['Member method', 'A method defined in a class that works on the data members of an object of that class.'],
      ],
      v: vStatic,
      vs: [vCalling, vCtxErr, vTeaObjects],
    },
    {
      h: '6. Pure and impure methods',
      t: 5,
      b: `A **pure method** returns a result without changing the state of the object (its data members) or its arguments; the same arguments give the same result. An **impure method** changes the state of the object or of an object passed to it.\n\n${F(P.pRates)}\n\nOutput: ${ic(one(out(P.pRates)))}. Two calls of square(6) give the same value; the two calls of issue(10) give different values because stock changes.\n\nTo classify a method, ask whether it changes any data member or passed object. A method that only displays text changes no data member, but printing is a side effect, so many teachers call such a method impure too; questions on purity normally avoid that borderline case and use methods that either compute from their arguments or change a data member.`,
      terms: [
        ['Pure method', 'A method that returns a result without changing the state of the object or its arguments.'],
        ['Impure method', 'A method that changes the state of the object, for example a data member, or of an object passed to it.'],
      ],
      v: vPure,
      vs: [vKiosk, vClassify],
    },
    {
      h: '7. Method overloading',
      t: 6,
      b: `**Method overloading** is defining two or more methods with the same name in a class but different parameter lists (number, type or order). It is **compile-time (static) polymorphism**: the compiler chooses the version from the arguments.\n\n${F(P.pSolids.split('\n').slice(1, 11).join('\n'))}\n\nThe calls print ${ic(one(out(P.pSolids)))}.\n\nA different return type or parameter name alone is **not** valid: "${errRetOnly}". With no exact match, arguments are widened (byte, short, int, long, float, double; char to int) and the nearest version is used: show('A') prints ${ic(out(showSrc("show('A');")))}. Two equally good versions give a compile-time error: "${mustFail(P.pAmbig)}".`,
      terms: [
        ['Method overloading', 'Defining two or more methods with the same name in one class with different parameter lists.'],
        ['Polymorphism', 'The ability of one name to take many forms; method overloading is compile-time polymorphism.'],
      ],
      v: vOverload,
      vs: [vRules, vResolve, vAmbig],
    },
  ],
  tips: '**Common mistakes**\n- Writing the return type in the signature, or the parameter names in it.\n- A value-returning method with a path that has no `return`, or a statement after `return`.\n- Expecting a method to change the caller\'s `int` variable (a swap method, a raise method): only the copy changes.\n- Calling a non-static method from `main` without an object.\n- Overloading by changing only the return type or only the parameter name.\n- Forgetting that `char` is promoted to `int`, and `int` to `double`, when choosing an overloaded version.\n\n**How marks are usually awarded**\n- Prototype and signature questions: return type, name and every parameter with its type.\n- Output questions: each line in the exact order and format.\n- Error questions: the error named and the line given.\n- Programs (15 marks): class and method structure, correct headers and returns, calls with right arguments, input and output, variable description or comments.',
});

// ---------------------------------------------------------------- flashcards
const FC = cards([
  ['What is a method?', 'A named block of statements that does one job and can be called from other parts of the program.', 'definition', 1],
  ['What is modular programming?', 'Dividing a program into small parts, each a method, written and tested separately and reused.', 'definition', 1],
  ['Parts of a method header', 'Access specifier, modifier, return type, method name and parameter list.', 'fact', 1],
  ['What is the prototype of a method?', 'Its return type, name and parameter list: double milkBill(int litres, double rate).', 'definition', 1],
  ['What is the signature of a method?', 'Its name and the types and order of its parameters: milkBill(int, double).', 'definition', 1],
  ['Is the return type part of the signature?', 'No. It belongs to the prototype only.', 'exam-tip', 1],
  ['What does void mean as a return type?', 'The method returns no value; it is called as a statement.', 'definition', 1],
  ['What does return do?', 'Sends a value back to the caller and ends the method at once.', 'definition', 2],
  ['Statement written after a return', `Compile-time error: ${errUnreach}.`, 'exam-tip', 2],
  ['Value-returning method with a path that has no return', `Compile-time error: ${errMissing}.`, 'exam-tip', 2],
  ['return 5; inside a void method', `Compile-time error: ${errVoidValue}.`, 'exam-tip', 2],
  ['int h = half(7); where half returns double', `Compile-time error: ${errLossy}.`, 'exam-tip', 2],
  ['Wrong number of arguments in a call', `Compile-time error: ${errArgs}.`, 'exam-tip', 2],
  ['What are formal parameters?', 'The variables declared in the method header; they receive the values of the call.', 'definition', 2],
  ['What are actual parameters?', 'The values or variables written in the method call; they are matched with the formal parameters by position.', 'definition', 2],
  ['Order of events in a method call', 'Call reached, values copied to formal parameters, body runs, return sends the result back, caller continues.', 'concept', 2],
  ['What is pass by value?', 'A copy of the value of the actual parameter is passed; the method cannot change the actual parameter.', 'definition', 3],
  ['Output of the swap(10, 20) program', ic(one(out(P.pSwap(10, 20)))), 'example', 3],
  ['How can a method pass a changed int back to the caller?', `With return, and the caller stores it: the PayRise program then prints ${ic(out(P.pRaiseRet))}.`, 'concept', 3],
  ['What is pass by reference?', 'The reference to the data is passed; formal and actual parameters refer to the same data, so a change is seen by the caller.', 'definition', 3],
  ['Example of pass by reference', `An object passed to a method: the method adds 200 to its data member weight and main prints ${ic(out(P.pParcel))}.`, 'example', 3],
  ['What is a static method?', 'A method that belongs to the class and can be called without an object.', 'definition', 4],
  ['What is a non-static method?', 'A method that belongs to the objects of the class, uses their data members and is called through an object.', 'definition', 4],
  ['How is a static method of another class called?', 'ClassName.method(arguments), for example NumTools.digitSum(4821).', 'fact', 4],
  ['How is a non-static method called?', 'Create an object with new, then write object.method(arguments).', 'fact', 4],
  ['Non-static method called by name from main', `Compile-time error: ${errNonStaticCall}.`, 'exam-tip', 4],
  ['Why is main static?', 'The program starts before any object exists, and a static method needs no object.', 'concept', 4],
  ['What is a pure method?', 'A method that returns a result without changing the state of the object or its arguments.', 'definition', 5],
  ['What is an impure method?', 'A method that changes the state of the object, such as a data member, or of an object passed to it.', 'definition', 5],
  ['How to classify a method as pure or impure', 'Ask whether it changes a data member or a passed object: if yes, impure.', 'exam-tip', 5],
  ['What is method overloading?', 'Two or more methods with the same name in one class and different parameter lists.', 'definition', 6],
  ['Overloaded methods differ in', 'The number, the type or the order of the parameters; never in the return type alone.', 'fact', 6],
  ['Two methods differing only in return type', `Compile-time error: ${errRetOnly}.`, 'exam-tip', 6],
  ['Overloading is which kind of polymorphism?', 'Compile-time (static) polymorphism.', 'fact', 6],
  ['show(\'A\') when show(int) and show(double) exist', `The char is promoted to int: ${ic(out(showSrc("show('A');")))}.`, 'example', 6],
]);

// ---------------------------------------------------------------- tests (icse-10-computer-applications chapter-test blueprints)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'icse-10-computer-applications-chapter-test-short',
  title: 'Chapter test (short): User-defined Methods',
  duration: 30,
  sections: [
    { id: 'A', title: 'Section A: Compulsory (10 marks)', instr: 'Attempt all questions. Questions 1 to 6 are multiple-choice (1 mark each); questions 7 and 8 carry 2 marks each.', items: ['m_proto', 'm_return_early', 'm_swap_main', 'm_obj_call', 'm_classify', 'm_which_version', 's_actual_vs_formal', 's_static_vs_non'] },
    { id: 'B', title: 'Section B: Program (15 marks)', instr: 'Attempt any ONE of the two programs. Write the program in Java with variable descriptions or comments.', items: [{ attempt: 1, keys: ['l_number_menu', 'l_tea_stall'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'icse-10-computer-applications-chapter-test-long',
  title: 'Chapter test (long): User-defined Methods',
  duration: 60,
  sections: [
    { id: 'A', title: 'Section A: Compulsory (20 marks)', instr: 'Attempt all questions. Questions 1 to 10 are multiple-choice (1 mark each); questions 11 to 13 are short answers and questions 14 and 15 are predict-the-output items, 2 marks each.', items: ['m_modular', 'm_header_part', 'm_formal_def', 'm_pbv_def', 'm_raise', 'm_static_def', 'm_pure_def', 'm_impure_ex', 'm_overload_cond', 'm_overload_ret', 's_pure_impure', 's_overload_def', 's_pbv_vs_pbr', 'co_shrink', 'co_tea'] },
    { id: 'B', title: 'Section B: Programs (30 marks)', instr: 'Attempt any TWO of the three programs. Write each program in Java with variable descriptions or comments.', items: [{ attempt: 2, keys: ['l_volume', 'l_gcd', 'l_calendar'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 to t06 of icse-10-computer-applications-ch07 only; the removed topic (programs using pass by reference) is respected: pass by reference has a definition and one example, with no programming question built on it',
    originality: 'every program, scenario and data value written for this chapter by SOYL with imagined names; no textbook, specimen or past-paper program reused',
    execution: 'every output, value and error in items, slides, notes and flashcards produced by compiling and running the code with JDK 21 (runJava in lib.mjs); results cached in src/java-cache.json',
    gate: 'schema, pipeline lint, deterministic verify, narration rules and the answer-leak scan run clean in this build',
  },
});
