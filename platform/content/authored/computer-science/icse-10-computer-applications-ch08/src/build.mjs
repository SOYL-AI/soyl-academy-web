// Build ICSE 10 Computer Applications ch08 "Constructors". Run from platform/:
//   npx tsx content/authored/computer-science/icse-10-computer-applications-ch08/src/build.mjs
// Every program output, value and error shown in decks, notes, flashcards and questions is produced by running Java.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg, useJavaCache } from '../../icse-10-computer-applications-ch01/src/lib.mjs';

const SRC = path.dirname(fileURLToPath(import.meta.url));
setUnit('icse-10-computer-applications-ch08', 'computer-science');
useJavaCache(SRC);
const A = await import('./q_a.mjs');
const B = await import('./q_b.mjs');
const C = await import('./q_c.mjs');
const S = await import('./snips.mjs');
const { code, F, ic, out, mustCompile, mustFail, expect, cls, one, nothing } = await import('./q_util.mjs');
const DIR = path.resolve(SRC, '..');

const meterOut = (arg) => out(S.cMeter(arg));

// ---------------------------------------------------------------- facts the narration states in words; stop if Java disagrees
expect(out(S.cOneParcel), 'Parcel created\n500 g, Rs 35.0', 'one parcel');
expect(out(S.cThreeParcels), 'Parcel created\nParcel created\nParcel created', 'three parcels');
expect(out(S.cDeclareOnly), 'Declared\nParcel created\nCreated', 'declare only');
expect(out(S.cKioskDefaults), '0\n0.0\nfalse\nnull', 'defaults');
expect(out(S.cMemberBad), 'null 0', 'this missing');
expect(out(S.cMemberOk), 'Kavya 15', 'this present');
expect(out(S.cVoidNew), '0', 'void constructor');
expect(out(S.cVoidCall), 'Diya ready\n5', 'void called');
expect(out(S.cDiyaOk), 'Diya ready\n5', 'real constructor');
expect(out(S.cSack), '0 40', 'sack');
expect(out(S.cRick(3, 12.5, 8)), '3 100.0', 'rickshaw');
expect(out(S.cRick(4, 9.5, 6)), '4 57.0', 'rickshaw 2');
expect(out(S.cNoCtorNew), '2', 'no constructor class works');
expect(meterOut(''), 'no argument', 'meter none');
expect(meterOut('5'), 'int 5', 'meter int');
expect(meterOut('5.0'), 'double 5.0', 'meter double');
expect(meterOut('"5"'), 'String 5', 'meter string');
expect(meterOut("'A'"), 'int 65', 'meter char');
expect(meterOut('7L'), 'double 7.0', 'meter long');
expect(meterOut('2.5f'), 'double 2.5', 'meter float');
expect(out(S.cGate), 'Gate 7 built\nDefault constructor\nGate 3 built\na=7 b=1 c=3', 'gate order');
expect(out(S.cGateTwo), 'Default constructor\nGate 9 built\n10', 'gate two');
expect(out(S.cPack), '12 20 99.5', 'pack copy');
expect(out(S.cClockNew), 'constructor ran\n12', 'clock new');
expect(out(S.cClockMethod), 'constructor ran\nmethod ran\nmethod ran\n9', 'clock methods');
expect(out(S.cClockMethodOnly), '0', 'clock without constructor');
expect(out(S.cFloor), '27.0', 'floor');
expect(out(B.cDial), 'start n = 0\nend n = 8', 'probe');
expect(out(S.cMemberHalf), 'Kavya 15', 'half this');

const errOnlyParam = mustFail(S.cOnlyParam, 'only param');
const errWrongName = mustFail(S.cWrongName, 'wrong name');
const errReturn = mustFail(S.cCtorReturn, 'return value');
const errCallLater = mustFail(S.cCtorCallLater, 'call later');
const errNoNew = mustFail(S.cNoNew, 'no new');
const errStatic = mustFail(S.cStaticCtor, 'static');
const errDup = mustFail(S.cDupCtor, 'dup');
const errAmbig = mustFail(S.cMix, 'ambiguous');
const errNoSuitable = mustFail(S.cMeterBool, 'no suitable');
const errNoCopy = mustFail(S.cNoSuchCopy, 'no copy constructor');
const errArgsDefault = mustFail(S.cArgsToDefault, 'args to default');
mustCompile(S.cMemberHalf, 'half this compiles');

// ---------------------------------------------------------------- SVG helpers
const boxed = (s, x, y, w, h, label, o = {}) => { s.rect(x - w / 2, y - h / 2, w, h, { rx: 6, fill: 'fill', color: o.color ?? 'accent', sw: 1.6, dash: o.dash }); s.text(x, y, label, { size: o.size ?? 13, muted: o.muted, bold: o.bold }); };

// ---------------------------------------------------------------- visuals: Part 1
const vRoute1 = flow('LR', ['What a constructor is', 'Its characteristics', 'Object creation', 'Default constructor', 'Parameterised constructor', 'this and common mistakes'], 'Route map of Part 1: what a constructor is, its characteristics, object creation, the default constructor, the parameterised constructor and the keyword this with common mistakes', 'Part 1 at a glance');
const vWhat = table(
  ['Feature', 'Rule', 'Example in class Parcel'],
  [
    ['Name', 'the same as the class name, letter for letter', ic('Parcel()')],
    ['Return type', 'none at all, not even void', ic('Parcel()  not  void Parcel()')],
    ['Executed', 'automatically by new, once for each object', ic('new Parcel();')],
    ['Use', 'gives the data members their starting values', ic('weight = 500;')],
  ],
  'Table of the four features of a constructor: it has the class name, has no return type, is executed automatically by new once for each object, and is used to give the data members starting values',
);
const vRules = table(
  ['Mistake', 'What javac says'],
  [
    [ic('Packet() { }  in class Parcel'), errWrongName],
    [ic('return weight;  inside the constructor'), errReturn],
    [ic('static Parcel() { }'), errStatic],
    [ic('p.Parcel();  after the object exists'), errCallLater],
    [ic('Parcel p = Parcel();  (new missing)'), errNoNew],
  ],
  `Table of five mistakes with constructors and the real compiler messages: ${errWrongName}; ${errReturn}; ${errStatic}; ${errCallLater}; ${errNoNew}`,
  'The messages are those of javac in JDK 21.',
);
const vRun1 = table(
  ['Statement', 'What happens', 'Output so far'],
  [
    [ic('Parcel p = new Parcel();'), 'the object is created and the default constructor runs', ic(out(cls('Parcel', S.PARCEL_D, ['Parcel p = new Parcel();'])))],
    [ic('p.show();'), 'the method prints the two data members', ic(one(out(S.cOneParcel)))],
  ],
  `Table tracing the Parcel program: the creation prints ${out(cls('Parcel', S.PARCEL_D, ['Parcel p = new Parcel();']))} and show then prints ${out(S.cOneParcel).split('\n')[1]}`,
  'The constructor prints before any method is called.',
);
const vCreate = flow('LR', ['new Parcel() is executed', 'Memory is allocated for the object', 'Data members get default values', 'Constructor body runs', 'Reference is stored in p'], 'Flow of object creation: new is executed, memory is allocated, data members get default values, the constructor body runs and the reference is stored in the variable', 'What new does, step by step');
const vRef = (() => {
  const m = /(\d+) g, Rs ([\d.]+)/.exec(out(S.cOneParcel));
  const s = new Svg(560, 190);
  boxed(s, 80, 80, 90, 46, 'p', { bold: true, size: 16 });
  s.text(80, 128, 'reference', { size: 12, muted: true });
  s.arrow(125, 80, 300, 80, { sw: 1.8, color: 'accent' });
  s.rect(300, 28, 230, 130, { rx: 8, fill: 'fill', color: 'accent', sw: 1.8 });
  s.text(415, 48, 'object of class Parcel', { size: 13, bold: true });
  s.line(300, 62, 530, 62, { sw: 1 });
  s.text(415, 90, `weight = ${m[1]}`, { size: 14 });
  s.text(415, 120, `charge = ${m[2]}`, { size: 14 });
  s.text(415, 176, 'values set by the constructor', { size: 12, muted: true });
  return s.visual(`Diagram of a reference variable p holding an arrow to an object of class Parcel whose data members are weight ${m[1]} and charge ${m[2]}, the values set by the constructor`, 'The variable p holds a reference; the data members live in the object.');
})();
const defLines = out(S.cKioskDefaults).split('\n');
const vDefaults = table(
  ['Data member', 'Type', 'Value before any assignment'],
  [['count', 'int', defLines[0]], ['price', 'double', defLines[1]], ['open', 'boolean', defLines[2]], ['owner', 'String', defLines[3]]],
  `Table of default values of data members in a class with no constructor: an int is ${defLines[0]}, a double is ${defLines[1]}, a boolean is ${defLines[2]} and a String is ${defLines[3]}`,
  'The class Kiosk has no constructor and no assignment.',
);
const vCompilerDefault = table(
  ['Class', 'Constructors written', `${ic('new Kiosk()')} or ${ic('new Parcel()')}`],
  [
    ['Kiosk (data member and a method)', 'none', `works: count is ${out(S.cNoCtorNew)} after two calls of sell()`],
    ['Parcel with Parcel(int w) only', 'one, with a parameter', `compile-time error: ${errOnlyParam}`],
  ],
  `Table of the compiler-supplied default constructor: a class with no constructor works with new and its count reaches ${out(S.cNoCtorNew)} after two calls; a class with only a parameterised constructor gives the compile-time error ${errOnlyParam}`,
  'The default constructor is supplied only to a class that has none of its own.',
);
const vParam = table(
  ['Statement', 's', 'f', 'r.fare(km)', 'Output'],
  [
    [ic('new Rickshaw(3, 12.5)'), '3', '12.5', ic('12.5 * 8'), ic(out(S.cRick(3, 12.5, 8)))],
    [ic('new Rickshaw(4, 9.5)'), '4', '9.5', ic('9.5 * 6'), ic(out(S.cRick(4, 9.5, 6)))],
  ],
  `Trace table of the parameterised constructor of Rickshaw: the call with 3 and 12.5 and a trip of 8 km prints ${out(S.cRick(3, 12.5, 8))}; the call with 4 and 9.5 and a trip of 6 km prints ${out(S.cRick(4, 9.5, 6))}`,
  'Arguments reach the parameters in the order they are written.',
);
const vThree = table(
  ['Version of the constructor', 'Assignment', 'Output for new Member("Kavya", 15)'],
  [
    ['no this', ic('name = name;  age = age;'), ic(out(S.cMemberBad))],
    ['this used for the data members', ic('this.name = name;  this.age = age;'), ic(out(S.cMemberOk))],
    ['this for name, a different parameter name for age', ic('this.name = name;  age = a;'), ic(out(S.cMemberHalf))],
  ],
  `Table of the keyword this: without this the object shows ${out(S.cMemberBad)}; with this the object shows ${out(S.cMemberOk)}; a different parameter name needs no this and also shows ${out(S.cMemberHalf)}`,
  'name = name; assigns the parameter to itself.',
);
const vVoid = table(
  ['Header in class Diya', 'It is', `Output of ${ic('Diya d = new Diya(); System.out.println(d.lit);')}`],
  [
    [ic('Diya()'), 'a constructor, run by new', ic(one(out(S.cDiyaOk)))],
    [ic('void Diya()'), 'an ordinary method that only has the class name', ic(out(S.cVoidNew))],
  ],
  `Table comparing a real constructor, which prints ${one(out(S.cDiyaOk))}, with a method that has void before the class name, which prints only ${out(S.cVoidNew)} because new does not call it`,
  'With void, nothing is executed by new.',
);
const vWe3 = table(
  ['Statement', `Condition ${ic('k < 0')}`, 'kg', 'Output'],
  [
    [ic('new Sack(-5)'), 'true', '0', ''],
    [ic('new Sack(40)'), 'false', '40', ic(out(S.cSack))],
  ],
  `Trace table of the Sack constructor: the argument minus 5 makes the condition true and kg 0; the argument 40 makes it false and kg 40; the program prints ${out(S.cSack)}`,
  'Any statement may be written inside a constructor.',
);
const vSummary1 = table(
  ['Topic', 'Remember'],
  [
    ['constructor', 'class name, no return type (not even void), run by new once per object'],
    ['use', 'initialise the data members'],
    ['declaration', 'Parcel p; creates no object and runs no constructor'],
    ['default constructor', 'supplied by the compiler only if the class has no constructor'],
    ['parameterised', 'receives the starting values as arguments'],
    ['this', 'the current object; this.name is the data member hidden by a parameter'],
    ['void before the name', 'an ordinary method that new never calls'],
  ],
  'Summary table of Part 1: the rules of a constructor, its use, the declaration against creation, the default constructor, the parameterised constructor, the keyword this and the effect of void',
);

// ---------------------------------------------------------------- visuals: Part 2
const vRoute2 = flow('LR', ['Why overload', 'Rules for overloading', 'Which constructor runs', 'Type promotion', 'Errors in calls', 'Copying an object', 'Constructor against method'], 'Route map of Part 2: why constructors are overloaded, rules for overloading, which constructor runs, type promotion, errors in calls, copying an object and constructor against method', 'Part 2 at a glance');
const vMeterTable = table(
  ['Constructor of Meter', 'Parameter list', 'Prints'],
  [
    [ic('Meter()'), 'none', ic('no argument')],
    [ic('Meter(int n)'), 'one int', ic('int n')],
    [ic('Meter(double d)'), 'one double', ic('double d')],
    [ic('Meter(String s)'), 'one String', ic('String s')],
  ],
  'Table of four overloaded constructors of the class Meter: no parameter, one int, one double and one String, each printing its own label',
  'Four constructors, one class name, four different parameter lists.',
);
const vOverRules = table(
  ['Constructors in one class', 'Allowed?', 'Reason'],
  [
    [`${ic('Pack(int a)')} and ${ic('Pack(double a)')}`, 'yes', 'the parameter types differ'],
    [`${ic('Pack(int a, double b)')} and ${ic('Pack(double a, int b)')}`, 'yes', 'the order of the types differs'],
    [`${ic('Pack()')} and ${ic('Pack(int a)')}`, 'yes', 'the number of parameters differs'],
    [`${ic('Pack(int a)')} and ${ic('Pack(int b)')}`, 'no', `only the names differ: ${mustFail(cls('Pack', ['Pack(int a) {', '}', 'Pack(int b) {', '}'], []), 'dup pack')}`],
  ],
  'Table of overloading rules: constructors may differ in the types, the order or the number of parameters, but two constructors that differ only in parameter names are rejected by the compiler',
  'Parameter names never distinguish overloaded constructors.',
);
const callArgs = ['', '5', '5.0', '"5"'];
const vWe1 = table(
  ['Statement', 'Argument', 'Constructor chosen', 'Output'],
  [
    [ic('new Meter();'), 'none', ic('Meter()'), ic(meterOut(''))],
    [ic('new Meter(5);'), 'int', ic('Meter(int n)'), ic(meterOut('5'))],
    [ic('new Meter(5.0);'), 'double', ic('Meter(double d)'), ic(meterOut('5.0'))],
    [ic('new Meter("5");'), 'String', ic('Meter(String s)'), ic(meterOut('"5"'))],
  ],
  `Trace table of four calls of the overloaded constructors of Meter: ${callArgs.map((a) => `the call with ${a === '' ? 'no argument' : a} prints ${meterOut(a)}`).join('; ')}`,
  'The arguments of new decide which constructor runs.',
);
const vSelect = (() => {
  const s = new Svg(600, 250);
  const rows = [['new Meter()', 'Meter()'], ['new Meter(5)', 'Meter(int n)'], ['new Meter(5.0)', 'Meter(double d)'], ['new Meter("5")', 'Meter(String s)']];
  rows.forEach(([l, r], i) => {
    const y = 36 + i * 60;
    boxed(s, 130, y, 190, 40, l);
    s.arrow(225, y, 375, y, { sw: 1.8, color: 'accent' });
    boxed(s, 480, y, 190, 40, r);
  });
  return s.visual('Diagram matching four creation statements with four constructors of Meter: new Meter with no argument runs the no-parameter constructor, an int argument runs the int constructor, a double argument runs the double constructor and a String argument runs the String constructor', 'Each statement is matched with the constructor that fits its arguments.');
})();
const vPromote = flow('LR', ['Look for an exact match', 'None: widen the arguments', 'char to int to long to float to double', 'No match, or two equal matches: compile-time error'], 'Flow of how Java chooses a constructor: look for an exact match, otherwise widen the arguments along char to int to long to float to double, and report a compile-time error if there is no match or two equally good matches', 'Choosing among overloaded constructors');
const vWe2 = table(
  ['Statement', 'Argument type', 'Constructor that runs', 'Output'],
  [
    [ic("new Meter('A');"), 'char', 'int (char widens to int)', ic(meterOut("'A'"))],
    [ic('new Meter(7L);'), 'long', 'double (long widens to double)', ic(meterOut('7L'))],
    [ic('new Meter(2.5f);'), 'float', 'double (float widens to double)', ic(meterOut('2.5f'))],
  ],
  `Trace table of type promotion: the char A runs the int constructor and prints ${meterOut("'A'")}; the long 7 runs the double constructor and prints ${meterOut('7L')}; the float 2.5 runs the double constructor and prints ${meterOut('2.5f')}`,
  'The code of the character A is 65.',
);
const vNoMatch = table(
  ['Situation', 'Compile-time message'],
  [
    [`${ic('new Meter(true);')}  (no constructor takes a boolean)`, errNoSuitable],
    [`${ic('new Mix(2, 3);')}  (two constructors fit equally well)`, errAmbig],
    [`${ic('new Parcel(750);')}  (only Parcel() is written)`, errArgsDefault],
    [`${ic('new Pack(a);')}  (no constructor takes a Pack)`, errNoCopy],
  ],
  `Table of four calls that fail to compile and the real messages: ${errNoSuitable}; ${errAmbig}; ${errArgsDefault}; ${errNoCopy}`,
);
const gLines = out(S.cGate).split('\n');
const vOrder = table(
  ['Statement of main', 'Line printed'],
  [[ic('Gate a = new Gate(7);'), ic(gLines[0])], [ic('Gate b = new Gate();'), ic(gLines[1])], [ic('Gate c = new Gate(3);'), ic(gLines[2])], [ic('System.out.println("a=" + ...);'), ic(gLines[3])]],
  `Table of the order of messages: the three creations print ${gLines[0]}, ${gLines[1]} and ${gLines[2]} in the order of the statements, and the summary line ${gLines[3]} comes last`,
  'Constructor messages follow the order of the new statements.',
);
const g2 = out(S.cGateTwo).split('\n');
const vWe3b = table(
  ['Statement', 'Constructor', 'id', 'Line printed'],
  [
    [ic('Gate x = new Gate();'), 'default', '1', ic(g2[0])],
    [ic('Gate y = new Gate(9);'), 'parameterised', '9', ic(g2[1])],
    [ic('System.out.println(x.id + y.id);'), 'none', 'sum of 1 and 9', ic(g2[2])],
  ],
  `Trace table of two gates: the default constructor prints ${g2[0]} and sets the id 1, the parameterised constructor prints ${g2[1]} and sets the id 9, and the last statement prints their sum ${g2[2]}`,
);
const vCopy = table(
  ['Statement', 'a.items', 'b.items', 'b.price'],
  [
    [ic('Pack a = new Pack(12, 99.5);'), '12', '', ''],
    [ic('Pack b = new Pack(a);'), '12', '12', '99.5'],
    [ic('b.items = 20;'), '12', '20', '99.5'],
  ],
  `Trace table of a copy constructor: after the copy both objects hold 12 items; after b.items is set to 20 the object a still holds 12; the program prints ${out(S.cPack)}`,
  'The copy is a separate object.',
);
const rcOut = out(C.srcRecharge, '75 299 84\n').split('\n');
const vWe4 = table(
  ['Object', 'Constructor', 'Line printed'],
  [
    [ic('a = new Recharge();'), 'default', ic(rcOut[0])],
    [ic('b = new Recharge(75);'), 'one int', ic(rcOut[1])],
    [ic('c = new Recharge(299, 84);'), 'two ints', ic(rcOut[2])],
  ],
  `Trace table of the Recharge program for the input 75 299 84: the default object prints ${rcOut[0]}; the object with one argument prints ${rcOut[1]}; the object with two arguments prints ${rcOut[2]}`,
  'Three constructors of one class; the arguments choose.',
);
const vDiff = table(
  ['Basis', 'Constructor', 'Method'],
  [
    ['Name', 'same as the class name', 'any valid name'],
    ['Return type', 'none, not even void', 'compulsory (void if nothing is returned)'],
    ['Executed', 'automatically, by new', 'only when called'],
    ['Number of times', 'once for each object', 'as often as it is called'],
    ['Purpose', 'initialises the data members', 'performs an action or a calculation'],
    ['Compiler supplies', 'a default constructor if the class has none', 'nothing'],
  ],
  'Table of the differences between a constructor and a method: name, return type, how it is executed, number of times, purpose and what the compiler supplies',
);
const vDiffRun = table(
  ['Program', 'Output'],
  [
    [`${ic('Clock c = new Clock(); ...')} (only new)`, ic(one(out(S.cClockNew)))],
    [`${ic('c.setHour(7); c.setHour(9);')} added`, ic(one(out(S.cClockMethod)))],
  ],
  `Table of constructor against method calls: new alone prints ${one(out(S.cClockNew))}; with two calls of setHour the output is ${one(out(S.cClockMethod))}, so the constructor ran once and the method twice`,
  'The constructor runs once; the method runs on every call.',
);
const vCallErr = table(
  ['Statement', 'Result'],
  [
    [ic('c.setHour(7);'), 'allowed: a method can be called through the object, as often as needed'],
    [ic('p.Parcel();'), `compile-time error: ${errCallLater}`],
    [ic('Parcel q = Parcel();'), `compile-time error: ${errNoNew}`],
  ],
  `Table showing that a constructor cannot be called like a method: p.Parcel gives ${errCallLater}, and leaving out new gives ${errNoNew}`,
);
const vSummary2 = table(
  ['Topic', 'Remember'],
  [
    ['overloading', 'same class name, different number, types or order of parameters'],
    ['choice', 'the arguments of new decide; exact match first, then widening'],
    ['errors', 'no suitable constructor, ambiguous call, duplicate signature'],
    ['copying', 'a constructor with a parameter of the class copies another object'],
    ['against a method', 'name, return type, automatic execution, once per object'],
    ['calling', 'a constructor is never called like p.Parcel()'],
  ],
  'Summary table of Part 2: overloading, how the constructor is chosen, errors, copying from another object, differences from a method and the rule that a constructor is never called like a method',
);

// ---------------------------------------------------------------- deck 1
const part1 = deck({
  part: 1,
  title: 'What a Constructor Is: Default and Parameterised Constructors',
  goals: [
    'State the characteristics of a constructor and when it is executed',
    'Explain the default constructor supplied by the compiler and when it is not supplied',
    'Write a class with a default and a parameterised constructor to initialise data members',
    'Use the keyword this when parameters have the names of data members',
  ],
  slides: [
    sl('title', 'Constructors', {
      b: 'Part 1: what a **constructor** is, its **characteristics**, **object creation**, the **default constructor**, the **parameterised constructor** and the keyword **this**.',
      v: vRoute1,
      n: 'Welcome to the chapter on constructors. In this first part we learn what a constructor is, how it is written, and exactly when it runs. We study the default constructor that the compiler supplies, and the parameterised constructor that takes the starting values. Then we meet the keyword this, and the common mistakes that the compiler reports with real error messages.',
    }),
    sl('concept', 'What is a constructor?', {
      b: 'A **constructor** is a member method of a class that is executed **automatically** when an object is created, to **initialise the data members** of the object.',
      v: vWhat,
      n: 'A constructor is a special member method of a class. It runs automatically when an object is created, and its job is to give the data members their starting values. The table lists four features. It has the same name as the class. It has no return type, not even void. It is run by the new operator, once for each object. And it is used to initialise data members.',
    }),
    sl('concept', 'The first constructor', {
      b: `${F(S.cOneParcel)}\n\nThe constructor prints a message so that we can **see** when it runs.`,
      v: vRun1,
      n: 'Here is our first constructor, in a class for a courier parcel. It has the class name, no return type, and it sets the weight and the charge. It also prints a message. When the statement creating the object is executed, the message appears at once, before any method is called. Then the show method prints the two data members.',
    }),
    sl('example', 'Worked example 1: the object in memory', {
      b: 'Follow the statement `Parcel p = new Parcel();` step by step.',
      v: vRef,
      n: 'Let us see what the creation statement builds. The variable p is only a reference. The new operator makes an object, and the constructor stores the weight five hundred and the charge thirty five in its data members. The reference p then points to that object. The reference lives in p, but the data members live in the object.',
    }),
    sl('check', 'Quick check: match the situations', {
      b: 'Match each statement with what happens.',
      chk: 'mt_ctor_terms',
      n: 'Decide which statements run a constructor, and which only look as if they do.',
    }),
    sl('concept', 'What does new do?', {
      b: 'The constructor does not create the object. It runs **after** the memory is allocated, and the data members already hold their **default values** when its body starts.',
      v: vCreate,
      n: 'This flow shows the steps of object creation. First new is executed. Memory is allocated for the object, and the data members receive their default values. Only then does the body of the constructor run and assign the starting values. At the end, the reference to the finished object is stored in the variable. So a constructor initialises an object, but it is the new operator that creates it.',
    }),
    sl('concept', 'Data members without a constructor', {
      b: `${F(S.cKioskDefaults)}\n\nIf nothing assigns a data member, it keeps the **default value** of its type.`,
      v: vDefaults,
      n: 'If no statement gives a data member a value, Java supplies the default value of its type. An int is zero, a double is zero point zero, a boolean is false, and a String, like every object, is null. Notice that this class has no constructor, yet the object is created without any error. The next slide explains why.',
    }),
    sl('check', 'Quick check: default values', {
      b: 'Write the exact output.',
      chk: 'co_defaults',
      n: 'Remember the default value of each type: number, boolean and object.',
    }),
    sl('concept', 'The default constructor', {
      b: 'If a class has **no constructor**, the compiler supplies a **default constructor** with no parameters. If the class has **any** constructor, the compiler supplies nothing.',
      v: vCompilerDefault,
      n: 'Why can an object of a class without constructors be created? The compiler supplies a default constructor, with no parameters, to any class that has none. But the moment the programmer writes any constructor, even one with a parameter, the compiler stops supplying it. Then a creation with no arguments fails, and the table shows the real compiler message.',
    }),
    sl('concept', 'Parameterised constructors', {
      b: `${F(S.cRick(3, 12.5, 8))}\n\nA **parameterised constructor** receives the starting values as **arguments** in the \`new\` statement.`,
      v: vParam,
      n: 'A parameterised constructor receives the starting values as arguments. In the rickshaw class the constructor has two parameters, the seats and the fare per kilometre. The arguments are passed in order, so three goes to seats and twelve point five to the fare. Different objects can now start with different values, as the two rows of the table show.',
    }),
    sl('example', 'Worked example 2: tracing a parameterised constructor', {
      b: `${F(S.cRick(4, 9.5, 6))}\n\nFind the values stored by the constructor, then the value returned by the method.`,
      v: vParam,
      n: 'Let us trace a booking for four seats at nine point five rupees a kilometre, for a trip of six kilometres. The constructor stores four in seats and nine point five in the fare per kilometre. The method fare multiplies nine point five by six and returns fifty seven point zero, a double. The program prints the seats, a space, and then the fare.',
    }),
    sl('concept', 'Parameter names and this', {
      b: 'When a parameter has the **same name** as a data member, the parameter hides it. The keyword **this** refers to the **current object**: `this.name` is the data member.',
      v: vThree,
      n: 'Programmers like to give the parameters the same names as the data members. But then the simple name means the parameter. The statement name equals name assigns the parameter to itself, and the data member keeps its default, so the object shows null and zero. Writing this dot name makes the data member receive the value. A different parameter name needs no this.',
    }),
    sl('check', 'Quick check: the missing this', {
      b: 'Write the exact output.',
      chk: 'co_this_missing',
      n: 'Ask which name, the parameter or the data member, each statement assigns.',
    }),
    sl('concept', 'A constructor may contain any statements', {
      b: `${F(S.cSack)}\n\nA constructor can contain a **decision** to check its arguments before storing them.`,
      v: vWe3,
      n: 'A constructor is not limited to simple assignments. It may contain decisions, loops, or calls to other methods. In this class a negative weight is not accepted. The condition is true for minus five, so the weight is set to zero. For forty the condition is false, and forty is stored. The program prints zero and forty.',
    }),
    sl('concept', 'Mistake: void before the name', {
      b: 'Writing **void** before the name turns the member into an ordinary **method**. It compiles, but `new` never calls it.',
      v: vVoid,
      n: 'A very common mistake is to write void before the constructor name. The compiler does not complain, because a method may share the name of its class. But it is now an ordinary method, and the new operator does not call it. The data members keep their default values, and the message never appears. The correct constructor, without void, prints Diya ready and sets lit to five.',
    }),
    sl('concept', 'Other mistakes the compiler catches', {
      b: 'A constructor has **no return type**, cannot be **static**, and is **never called** like a method.',
      v: vRules,
      n: 'The table lists other mistakes with their real compiler messages. A constructor whose name differs from the class is read as a method with no return type. A constructor cannot return a value. It cannot be static. It cannot be called through the object afterwards. And the new operator must never be left out when an object is created.',
    }),
    sl('check', 'Quick check: declaration or creation?', {
      b: 'True or false?',
      chk: 'tf_decl',
      n: 'Think about whether a declaration creates an object, and what runs when it does.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. A constructor has the class name and no return type, and the new operator runs it once for each object. Its use is to initialise the data members. A declaration alone runs no constructor. The compiler supplies a default constructor only if the class has none. A parameterised constructor takes starting values. The keyword this reaches a hidden data member, and void before the name makes a method.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Say all three facts about a constructor: class name, no return type (not even `void`), run by `new`.',
        'A declaration such as `Parcel p;` creates no object: no constructor runs.',
        'If the class has only a parameterised constructor, `new Parcel()` is a compile-time error.',
        'In a parameterised constructor with parameters named like the data members, write `this.name = name;`.',
        'In a program, create an object with `new` and then call its methods: constructors are never called by name.',
      ],
      n: 'Some exam tips. State the three facts about a constructor: the class name, no return type, and execution by new. Remember that a declaration alone runs nothing. A class with only a parameterised constructor cannot be created with no arguments. Use this when parameters and data members share names. And never call a constructor by its name through an object.',
    }),
  ],
});

// ---------------------------------------------------------------- deck 2
const part2 = deck({
  part: 2,
  title: 'Constructor Overloading and Constructors against Methods',
  goals: [
    'Write overloaded constructors that differ in the number, types or order of parameters',
    'Predict which constructor is called for a given argument list, including type promotion',
    'Trace the order of constructor messages when objects are created',
    'Tabulate the differences between a constructor and a method',
  ],
  slides: [
    sl('title', 'Constructor overloading', {
      b: 'Part 2: **constructor overloading**, **which constructor runs**, **type promotion**, **errors in calls**, **copying an object** and **constructors against methods**.',
      v: vRoute2,
      n: 'Welcome to the second part. A class may have more than one constructor, and this is called constructor overloading. We learn the rules, and how Java decides which constructor runs, including what happens when the argument type does not match exactly. We trace the order of constructor messages, copy values from another object, and finish by comparing constructors with methods.',
    }),
    sl('concept', 'Why overload a constructor?', {
      b: 'Objects are not always created with the same information. **Overloaded constructors** let a class offer several ways of creating an object, each with its own parameter list.',
      v: vMeterTable,
      n: 'Sometimes we know nothing about the object when we create it, sometimes one value, sometimes several. Constructor overloading allows several constructors in one class, all with the class name. The class in the table has four constructors, with no parameter, with an int, with a double and with a String. Each prints a label, so that we can see which one runs.',
    }),
    sl('concept', 'Rules for overloading', {
      b: 'Overloaded constructors must differ in the **number**, the **types** or the **order** of their parameters. Different parameter **names** are not enough.',
      v: vOverRules,
      n: 'The compiler tells overloaded constructors apart only by their parameter lists. They may differ in the number of parameters, in their types, or in the order of the types. They may not differ only in the names of the parameters. Two constructors that each take one int, with different names, are duplicates, and the compiler reports an error.',
    }),
    sl('example', 'Worked example 1: which constructor runs?', {
      b: `${F(S.cMeter('', '5', '5.0', '"5"'))}\n\nMatch each statement with a constructor, then read the output.`,
      v: vWe1,
      n: 'Let us trace four creation statements. With no argument, the constructor without parameters runs and prints no argument. With the int five, the int constructor runs. With five point zero, which is a double, the double constructor runs. With the string five in quotes, the string constructor runs. The arguments of new decide which constructor is executed.',
    }),
    sl('concept', 'Matching the call with a constructor', {
      b: 'The compiler compares the **arguments** of the `new` statement with the **parameter lists** and picks the constructor that fits.',
      v: vSelect,
      n: 'The picture shows the idea. Each creation statement on the left is connected to the constructor on the right whose parameter list fits its arguments. The statement with no argument goes to the constructor with no parameters. An int argument goes to the int constructor, and so on. The choice is made by the compiler before the program runs.',
    }),
    sl('check', 'Quick check: match the calls', {
      b: 'Match each statement with its output.',
      chk: 'mt_call_ctor',
      n: 'For each argument, ask which parameter type fits exactly.',
    }),
    sl('concept', 'When there is no exact match', {
      b: 'If no constructor fits exactly, Java **widens** the argument: `char` to `int`, `int` to `long`, `long` to `float`, `float` to `double`. A constructor is chosen only if the widening works.',
      v: vPromote,
      n: 'What if no constructor fits exactly? Java widens the argument, step by step, along the chain char, int, long, float and double. It stops at the first type for which a constructor exists. If there is no such constructor, or if two constructors fit equally well, the compiler reports an error. Nothing is ever narrowed automatically.',
    }),
    sl('example', 'Worked example 2: type promotion', {
      b: `${F(S.cMeter("'A'", '7L', '2.5f'))}\n\nThe class has no constructor for a char, a long or a float.`,
      v: vWe2,
      n: 'Let us trace three calls with no exact match. A character argument widens to int, so the int constructor runs, and it receives the character code sixty five. A long argument is widened to double, so the double constructor runs and prints seven point zero. A float argument also widens to double, and prints two point five.',
    }),
    sl('check', 'Quick check: type promotion', {
      b: 'Write the exact output.',
      chk: 'co_promotion',
      n: 'Find the nearest wider type that has a constructor for each argument.',
    }),
    sl('concept', 'Calls that cannot be matched', {
      b: 'A call fails to compile when **no constructor accepts** the arguments, or when **two fit equally well**.',
      v: vNoMatch,
      n: 'Some calls cannot be compiled. A boolean fits no constructor, so no suitable constructor is found. Two constructors that both need one widening make the call ambiguous. Passing an argument to a class that has only the default constructor fails. And an object cannot be passed where no constructor takes that class. Each message is the real one from the compiler.',
    }),
    sl('concept', 'The order of constructor messages', {
      b: `${F(S.cGate)}\n\nA constructor runs **when its object is created**, so the messages follow the order of the \`new\` statements.`,
      v: vOrder,
      n: 'When several objects are created, each constructor runs at the moment its own object is created. So the messages follow the order of the new statements, not the order in which the constructors are written in the class. In the program the first gate uses the parameterised constructor, the second the default one, the third the parameterised one again. The summary line comes last.',
    }),
    sl('example', 'Worked example 3: tracing two objects', {
      b: `${F(S.cGateTwo)}\n\nTrace the messages and the ids.`,
      v: vWe3b,
      n: 'Let us trace two gates. The first creation uses the default constructor, which prints Default constructor and sets the id to one. The second creation passes nine, so the parameterised constructor prints Gate nine built and sets the id to nine. The last statement adds the two ids, and because both are ints the sum is the number ten.',
    }),
    sl('check', 'Quick check: arrange the output', {
      b: 'Arrange the four output lines.',
      chk: 'ord_messages',
      n: 'Follow the new statements from top to bottom, and put the summary line where it belongs.',
    }),
    sl('concept', 'Copying values from another object', {
      b: `${F(S.cPack)}\n\nA constructor may take an object of its **own class** and copy its data members. The copy is a **separate object**.`,
      v: vCopy,
      n: 'A constructor may take an object of its own class as a parameter and copy its data members. In the pack class, the copy gets twelve items and the same price. Then the items of the copy are changed to twenty, and the original still holds twelve. The two are separate objects. This kind of constructor is optional in this course, but it is a good example of overloading.',
    }),
    sl('example', 'Worked example 4: a program with three constructors', {
      b: `${F('Recharge()                          // default', 'Recharge(int amount)                // one argument', 'Recharge(int amount, int validity)  // two arguments', '', 'Recharge a = new Recharge();', 'Recharge b = new Recharge(x);', 'Recharge c = new Recharge(y, d);')}\n\nThe full program reads x, y and d. The input is 75, 299 and 84.`,
      v: vWe4,
      n: 'Here is a full program for a mobile recharge. It has a default constructor, one with the amount, and one with the amount and the validity. The three objects are created with no argument, with seventy five, and with two hundred ninety nine and eighty four. Each display line shows what its constructor stored, and the talk time is found by the compute method.',
    }),
    sl('concept', 'Constructor against method', {
      b: 'A constructor and a method are both members of a class, but they differ in **name**, **return type**, **how they are executed** and **purpose**.',
      v: vDiff,
      n: 'Now we compare constructors and methods. A constructor has the class name, while a method has any valid name. A constructor has no return type, while a method must have one. A constructor is executed automatically by new, once for each object, while a method runs only when it is called, as often as needed. A constructor initialises, a method does a task.',
    }),
    sl('concept', 'Seeing the difference in a run', {
      b: `${F(S.cClockMethod)}\n\nThe constructor ran **once**; the method ran **twice**.`,
      v: vDiffRun,
      n: 'The run shows the difference. Creating the clock prints constructor ran once, without any call. The two calls of the set hour method print method ran twice, because a method runs on every call. A constructor, on the other hand, cannot be called again through the object. The table also shows the compiler messages when someone tries.',
    }),
    sl('check', 'Quick check: what do they share?', {
      b: 'Choose the correct statement.',
      chk: 'm_common_both',
      n: 'Both can have parameters, but only one of them is run by new.',
    }),
    sl('concept', 'A constructor is not called like a method', {
      b: 'A method can be called through the object as many times as needed. A constructor **cannot**: it runs only through `new`.',
      v: vCallErr,
      n: 'Remember the difference in calling. A method is called through the object, and it may be called again and again. A constructor is never called in this way. Writing p dot Parcel gives a cannot find symbol error, and leaving out new gives the same error. The only way to run a constructor is the new operator.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. Overloaded constructors share the class name and differ in the number, the types or the order of their parameters. The arguments of new choose the constructor, first by an exact match and then by widening. A call may fail with no suitable or an ambiguous constructor. A constructor may copy another object. A constructor differs from a method in name, return type and execution, and is never called by name.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Overloaded constructors differ in the number, types or order of parameters, never only in parameter names.',
        'To predict the output, match each `new` statement with the constructor that fits its arguments, widening if needed.',
        'List constructor messages in the order of the `new` statements.',
        'When asked for differences between a constructor and a method, give name, return type and how it is executed.',
        'In a program, create objects in `main` with the right constructors and call `compute` and `display` on them.',
      ],
      n: 'Some exam tips. Overloaded constructors differ in the number, types or order of parameters, never only in the names. To predict output, match each new statement with the constructor that fits, widening the argument if there is no exact match. List messages in the order of the new statements. In differences, give the name, the return type and how it is executed. In programs, create the objects in main.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Constructors: notes',
  sections: [
    {
      h: '1. What a constructor is',
      t: 1,
      b: `A **constructor** is a member method of a class that is executed automatically when an object is created with **new**; it is used to **initialise the data members**.\n\n- It has the **same name as the class**.\n- It has **no return type**, not even void.\n- It is executed **once for each object**, by new. It cannot be called again through the object.\n\n${F(S.cOneParcel)}\n\nOutput: ${ic(one(out(S.cOneParcel)))}.\n\nDeclaring a reference, \`Parcel p;\`, creates no object and runs no constructor: ${ic(one(out(S.cDeclareOnly)))} shows the order of a declaration, a creation and a print.`,
      terms: [
        ['Constructor', 'A member method with the same name as its class and no return type, executed automatically when an object is created, to initialise the data members.'],
        ['Object creation', 'The execution of the new operator, which allocates the object, gives its data members default values and then runs a constructor.'],
      ],
      v: vWhat,
      vs: [vRun1, vRef, vCreate],
    },
    {
      h: '2. Default values and the compiler-supplied default constructor',
      t: [1, 2],
      b: `If no statement assigns a data member, it holds the **default value** of its type: 0 for int, 0.0 for double, false for boolean and null for a String or any object. The run of the class with four data members prints ${ic(one(out(S.cKioskDefaults)))}.\n\nIf a class has **no constructor**, the compiler supplies a **default constructor** (no parameters) so that ${ic('new Kiosk()')} works. If the class has **any** constructor, the compiler supplies nothing.\n\n${F(S.cOnlyParam)}\n\nThe compiler says: "${errOnlyParam}". To allow ${ic('new Parcel()')} as well, write a no-argument constructor too.`,
      terms: [
        ['Default constructor', 'A constructor with no parameters; the compiler supplies one only to a class that has no constructor of its own.'],
      ],
      v: vDefaults,
      vs: [vCompilerDefault],
    },
    {
      h: '3. Parameterised constructors and this',
      t: 2,
      b: `A **parameterised constructor** has parameters; the starting values are passed as arguments in the new statement.\n\n${F(S.cRick(3, 12.5, 8))}\n\nOutput: ${ic(out(S.cRick(3, 12.5, 8)))}.\n\nWhen a parameter has the name of a data member, the parameter hides it. The keyword **this** is the current object, so ${ic('this.name = name;')} stores the parameter in the data member. Without this, ${ic('name = name;')} leaves the data member at its default: ${ic(out(S.cMemberBad))} is displayed instead of ${ic(out(S.cMemberOk))}.\n\nA constructor may contain any statements, for example a decision that checks an argument: the Sack class gives ${ic(out(S.cSack))} for the arguments -5 and 40.`,
      terms: [
        ['Parameterised constructor', 'A constructor that has one or more parameters, so that the starting values of an object are supplied when it is created.'],
        ['this', 'A keyword that refers to the current object; this.name is the data member name of that object.'],
      ],
      v: vParam,
      vs: [vThree, vWe3],
    },
    {
      h: '4. Constructor overloading',
      t: 3,
      b: `**Constructor overloading** means writing several constructors in one class. They have the class name and differ in the **number**, **types** or **order** of their parameters; parameter names do not count (two constructors with one int each give "${mustFail(cls('Pack', ['Pack(int a) {', '}', 'Pack(int b) {', '}'], []), 'dup pack')}").\n\n${F(S.cMeter('', '5', '5.0', '"5"'))}\n\nOutput: ${ic(one(out(S.cMeter('', '5', '5.0', '"5"'))))}.\n\nThe arguments of new decide which constructor runs.`,
      terms: [
        ['Constructor overloading', 'Writing two or more constructors in a class, with the class name and different parameter lists.'],
      ],
      v: vMeterTable,
      vs: [vOverRules, vWe1, vSelect],
    },
    {
      h: '5. Which constructor runs: promotion, errors and order',
      t: 3,
      b: `**Exact match first.** If there is none, the argument is **widened**: char to int to long to float to double. With the four constructors of Meter, the char 'A' runs the int constructor (${ic(meterOut("'A'"))}), a long 7L runs the double one (${ic(meterOut('7L'))}) and a float 2.5f runs the double one (${ic(meterOut('2.5f'))}).\n\n**Errors:** a call fails when no constructor accepts the arguments ("${errNoSuitable}") or when two fit equally well ("${errAmbig}").\n\n**Order:** each constructor runs when its own object is created, so the messages follow the order of the new statements:\n\n${F(S.cGate)}\n\nOutput: ${ic(one(out(S.cGate)))}.\n\nA constructor may also take an object of its own class and copy its data members; the copy is a separate object (${ic(out(S.cPack))} for the Pack program of the slides).`,
      terms: [
        ['Type promotion', 'The automatic widening of an argument to a wider type, such as char to int or int to double, when no constructor or method matches exactly.'],
      ],
      v: vPromote,
      vs: [vWe2, vNoMatch, vOrder, vCopy],
    },
    {
      h: '6. Constructor against method',
      t: 4,
      b: `| Constructor | Method |\n|---|---|\n| Same name as the class | Any valid name |\n| No return type, not even void | A return type is compulsory (void if nothing is returned) |\n| Executed automatically by new | Executed only when called |\n| Executed once for each object | Executed as often as it is called |\n| Initialises the data members | Performs an action or a calculation |\n| Compiler supplies a default one if the class has none | Compiler supplies nothing |\n\nBoth can have parameters and both can be overloaded. A constructor cannot be called like a method: ${ic('p.Parcel();')} gives "${errCallLater}". In the Clock program the output is ${ic(one(out(S.cClockMethod)))}: the constructor ran once and the method twice.`,
      terms: [],
      v: vDiff,
      vs: [vDiffRun, vCallErr],
    },
    {
      h: '7. Writing a class with constructors in the exam',
      t: [2, 3],
      b: 'A 15-mark program usually asks for a class with **data members**, a **default constructor**, a **parameterised constructor** (often overloaded), a **compute** method and a **display** method, and a **main** that creates the objects.\n\n1. Declare the data members.\n2. Write the constructors: class name, no return type; use this when the parameters have the names of the data members.\n3. Write compute (decisions, calculations) and display.\n4. In main, read the input with Scanner, create each object with new and call its methods.\n5. Add the variable description or comments.',
      terms: [],
    },
  ],
  tips: '**Common mistakes**\n- Writing void (or any return type) before a constructor: it becomes a method that new never calls.\n- Writing a constructor name that differs from the class name.\n- Believing that Parcel p; runs the constructor.\n- Calling new Parcel() when only a parameterised constructor exists.\n- name = name; without this, so the data member keeps its default value.\n- Overloading with constructors that differ only in parameter names.\n- Trying to call a constructor through an object, p.Parcel().\n\n**How marks are usually awarded**\n- Definition: the meaning, and two characteristics (class name, no return type, automatic execution).\n- Differences: one mark for each point stated for both.\n- Output questions: each line in the exact order, with the constructor messages in the order of the new statements.\n- Programs (15 marks): class and data members, each constructor, the compute method, objects created in main and output, variable description or comments.',
});

// ---------------------------------------------------------------- flashcards
const FC = cards([
  ['What is a constructor?', 'A member method of a class, with the class name and no return type, executed automatically when an object is created, to initialise the data members.', 'definition', 1],
  ['Name of a constructor', 'The same as the name of its class, with the same capital letters.', 'fact', 1],
  ['Return type of a constructor', 'None. Not even void.', 'fact', 1],
  ['When is a constructor executed?', 'When an object is created with new, once for each object.', 'concept', 1],
  ['Does `Parcel p;` run the constructor?', `No. It only declares a reference. ${ic(one(out(S.cDeclareOnly)))} shows the order.`, 'exam-tip', 1],
  ['Use of a constructor', 'To initialise the data members of the object at its creation.', 'fact', 1],
  ['Default value of an int data member', '0', 'fact', 1],
  ['Default values of double, boolean and String data members', '0.0, false and null.', 'fact', 1],
  ['Who creates the object, new or the constructor?', 'The new operator allocates the object; the constructor then initialises it.', 'concept', 1],
  ['`void Diya()` in class Diya', `An ordinary method, not a constructor. new does not call it: the object prints ${ic(out(S.cVoidNew))} instead of ${ic(one(out(S.cDiyaOk)))}.`, 'exam-tip', 1],
  ['Wrong constructor name', `A member with no return type and another name gives: ${errWrongName}.`, 'exam-tip', 1],
  ['`return weight;` inside a constructor', `Compile-time error: ${errReturn}.`, 'exam-tip', 1],
  ['Can a constructor be static?', `No: ${errStatic}.`, 'fact', 1],
  ['What is a default constructor?', 'A constructor with no parameters. The compiler supplies one only if the class has no constructor.', 'definition', 2],
  ['A class has only Parcel(int w); what does new Parcel() give?', `Compile-time error: ${errOnlyParam}.`, 'exam-tip', 2],
  ['What is a parameterised constructor?', 'A constructor with parameters, so that the starting values are passed as arguments.', 'definition', 2],
  ['What does the keyword this refer to?', 'The current object. this.name is the data member name.', 'definition', 2],
  ['Why write this.name = name;?', 'The parameter hides the data member of the same name; this.name reaches the data member.', 'concept', 2],
  ['Effect of name = name; without this', `The parameter is assigned to itself and the data member keeps its default: ${ic(out(S.cMemberBad))}.`, 'exam-tip', 2],
  ['Can a constructor contain an if statement?', `Yes, any statements. new Sack(-5) and new Sack(40) with a check give ${ic(out(S.cSack))}.`, 'fact', 2],
  ['What is constructor overloading?', 'Writing two or more constructors in a class with different parameter lists.', 'definition', 3],
  ['How may overloaded constructors differ?', 'In the number, the types or the order of the parameters; never only in parameter names.', 'fact', 3],
  ['Two constructors that differ only in parameter names', `Compile-time error: ${mustFail(cls('Pack', ['Pack(int a) {', '}', 'Pack(int b) {', '}'], []), 'dup pack card')}.`, 'exam-tip', 3],
  ['Which constructor does the compiler choose?', 'The one whose parameter list matches the arguments of new: an exact match first, then widening.', 'concept', 3],
  ['Constructor chosen by a char argument when only int, double and String constructors exist', `The int constructor (char widens to int): new Meter('A') prints ${ic(meterOut("'A'"))}.`, 'example', 3],
  ['Constructor chosen by a long argument 7L (int, double, String constructors)', `The double constructor: it prints ${ic(meterOut('7L'))}.`, 'example', 3],
  ['Widening order of the primitive types', 'A char widens to int; then int to long to float to double. The nearest type that has a constructor is used.', 'fact', 3],
  ['When is a call ambiguous?', `When two constructors fit equally well: ${errAmbig}.`, 'exam-tip', 3],
  ['No constructor accepts the arguments', `${errNoSuitable} (for new Meter(true)).`, 'exam-tip', 3],
  ['In which order do constructor messages appear?', 'In the order of the new statements, because each constructor runs when its object is created.', 'concept', 3],
  ['What does a copy constructor do?', 'It takes an object of the same class and copies its data members into the new object. The copy is a separate object.', 'definition', 3],
  ['Constructor against method: return type', 'A constructor has none; a method must have one (void if nothing is returned).', 'concept', 4],
  ['Constructor against method: execution', 'A constructor runs automatically at new, once per object; a method runs when it is called, as often as needed.', 'concept', 4],
  ['Can a constructor be called as p.Parcel()?', `No: ${errCallLater}.`, 'exam-tip', 4],
]);

// ---------------------------------------------------------------- tests (icse-10-computer-applications chapter-test blueprints)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'icse-10-computer-applications-chapter-test-short',
  title: 'Chapter test (short): Constructors',
  duration: 30,
  sections: [
    { id: 'A', title: 'Section A: Compulsory (10 marks)', instr: 'Attempt all questions. Questions 1 to 6 are multiple-choice (1 mark each); questions 7 and 8 carry 2 marks each.', items: ['m_ctor_header', 'm_compiler_default', 'm_param_trace', 'm_which_ctor', 'm_overload_valid', 'm_diff_return', 's_default', 's_diff'] },
    { id: 'B', title: 'Section B: Program (15 marks)', instr: 'Attempt any ONE of the two programs. Write the program in Java with variable descriptions or comments.', items: [{ attempt: 1, keys: ['l_parcel', 'l_reservation'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'icse-10-computer-applications-chapter-test-long',
  title: 'Chapter test (long): Constructors',
  duration: 60,
  sections: [
    { id: 'A', title: 'Section A: Compulsory (20 marks)', instr: 'Attempt all questions. Questions 1 to 10 are multiple-choice (1 mark each); questions 11 to 13 are short answers and questions 14 and 15 are predict-the-output items, 2 marks each.', items: ['m_ctor_def', 'm_ctor_count', 'm_default_values', 'm_only_param_new', 'm_this_trace', 'm_ctor_validate', 'm_overload_def', 'm_trace_msgs', 'm_promote', 'm_diff_call', 's_void', 's_this', 's_which_ctor', 'co_overload_which', 'co_param_trace'] },
    { id: 'B', title: 'Section B: Programs (30 marks)', instr: 'Attempt any TWO of the three programs. Write each program in Java with variable descriptions or comments.', items: [{ attempt: 2, keys: ['l_recharge', 'l_courtyard', 'l_cabride'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 to t04 of icse-10-computer-applications-ch08 only',
    originality: 'every program, scenario and data value written for this chapter by SOYL with imagined names; no textbook, specimen or past-paper program reused',
    execution: 'every output, value and error in items, slides, notes and flashcards produced by compiling and running the code with JDK 21 (runJava in lib.mjs); results cached in src/java-cache.json',
    gate: 'schema, pipeline lint, deterministic verify, narration rules and the answer-leak scan run clean in this build',
  },
});
