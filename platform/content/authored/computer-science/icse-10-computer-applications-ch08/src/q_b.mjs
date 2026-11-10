// ICSE 10 Computer Applications, ch08: Constructors. Topics t02 (default and parameterised) and t03 (overloading).
import { Q, mcq, ar, tf, fb, match, ord, short, co } from '../../icse-10-computer-applications-ch01/src/lib.mjs';
import { F, ic, out, oline, distinct, mustFail, mustCompile, cls, one } from './q_util.mjs';
import * as S from './snips.mjs';

const errOnlyParam = mustFail(S.cOnlyParam, 'only a parameterised constructor');
const errDup = mustFail(S.cDupCtor, 'duplicate constructor');
const errDupPack = mustFail(cls('Pack', ['Pack(int a) {', '}', 'Pack(int b) {', '}'], []), 'duplicate constructor in Pack');
const errAmbig = mustFail(S.cMix, 'ambiguous constructors');
const errNoSuitable = mustFail(S.cMeterBool, 'no suitable constructor');
const errNoCopy = mustFail(S.cNoSuchCopy, 'copy without a copy constructor');
const errArgsDefault = mustFail(S.cArgsToDefault, 'argument to a default constructor');

// a probe that prints the data member before and after the constructor body assigns it
export const cDial = cls('Dial', ['int n;', 'Dial() {', '    System.out.println("start n = " + n);', '    n = 8;', '    System.out.println("end n = " + n);', '}'], ['Dial p = new Dial();']);
export const cPackRun = cls('Pack', S.PACK, ['Pack a = new Pack(30, 45.5);', 'Pack b = new Pack(a);', 'a.items = 5;', 'System.out.println(a.items + " " + b.items + " " + a.price);']);
const callOut = (arg) => out(S.cMeter(arg));

// ================================================================ t02 default and parameterised constructors
Q('m_compiler_default', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'In which situation does the Java compiler supply a default constructor for a class?',
  opts: distinct(['The class contains no constructor of its own', 'The class contains only a parameterised constructor', 'The class contains a main method', 'The class contains data members that are not initialised']),
  sol: `A class with no constructor still works with new. A Kiosk class that has only a data member and a method is created and used without any error, and its count ends as ${ic(out(S.cNoCtorNew))} after two calls of sell(). As soon as the programmer writes any constructor, the compiler stops supplying one.`,
}));
Q('m_only_param_new', mcq({
  t: 2, d: 3, c: 'application',
  stem: `A class Parcel declares only the constructor Parcel(int w). What happens when the following program is compiled?\n\n${F(S.cOnlyParam)}`,
  opts: distinct([`Compile-time error: ${errOnlyParam}`, 'The program compiles and the weight of p is 0', 'The program compiles and the constructor is called with the value 0', 'Run-time error: NullPointerException']),
  sol: 'The moment a class has a constructor of its own, the compiler no longer adds the default one. The call new Parcel() with no arguments finds no constructor with an empty parameter list, so javac refuses the program. The fix is to write a default constructor as well.',
}));
Q('m_param_trace', mcq({
  t: 2, d: 2, c: 'application',
  stem: `A rickshaw booking program uses a parameterised constructor. What is displayed?\n\n${F(S.cRick(3, 12.5, 8))}`,
  opts: distinct([ic(out(S.cRick(3, 12.5, 8))), ic(out(S.cRick(8, 12.5, 3))), ic('3 12.5'), ic('3 8.0')]),
  sol: 'The arguments are passed in order to the parameters: 3 goes to s and 12.5 to f. The constructor stores them in seats and farePerKm. The method fare(8) then multiplies 12.5 by 8, and the product is a double.',
}));
Q('m_this_purpose', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'In the constructor Member(String name, int age), why is the statement this.name = name; written?',
  opts: distinct(['The parameter name hides the data member name, so this.name is used to refer to the data member of the object', 'The word this makes the constructor run twice for the same object', 'The word this declares a new variable of the type String', 'The word this converts the parameter into a data member of another class']),
  sol: `Inside the constructor the simple name name means the parameter. Writing only name = name; assigns the parameter to itself and leaves the data member at its default, so the object shows ${ic(out(S.cMemberBad))}. With this.name the data member receives the value, giving ${ic(out(S.cMemberOk))}.`,
}));
Q('m_this_trace', mcq({
  t: 2, d: 3, c: 'application',
  stem: `The programmer of this class forgot the word this in the constructor. What does the program display?\n\n${F(S.cMemberBad)}`,
  opts: distinct([ic(out(S.cMemberBad)), ic(out(S.cMemberOk)), ic('name age'), 'A compile-time error is reported']),
  sol: 'In name = name; both names mean the parameter, so the data member is never assigned; the same happens for age. The default values stay: null for the String and 0 for the int. The code compiles without any complaint.',
}));
Q('m_default_vs_param', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which statement correctly compares a default constructor with a parameterised constructor?',
  opts: distinct(['A default constructor takes no arguments, while a parameterised constructor receives values from the statement that creates the object', 'A default constructor receives values from the new statement, while a parameterised constructor takes no arguments', 'A default constructor has a return type of void, while a parameterised constructor has none', 'A default constructor can be written only by the compiler, while a parameterised constructor is written by the programmer']),
  sol: 'The two differ only in their parameter lists. The programmer can write a no-argument constructor too, and it is then called a default constructor as well. Neither kind has a return type.',
}));
Q('m_ctor_validate', mcq({
  t: 2, d: 3, c: 'application',
  stem: `A godown program checks the weight in the constructor of class Sack. What is displayed?\n\n${F(S.cSack)}`,
  opts: distinct([ic(out(S.cSack)), ic('-5 40'), ic('0 0'), ic('-5 0')]),
  sol: 'A constructor may contain any statements, including a decision. For the argument -5 the condition k < 0 is true, so kg is set to 0; for 40 it is false and kg receives 40.',
}));
Q('m_ctor_stmts', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which of the following may be written inside the body of a constructor?',
  opts: distinct(['Any valid Java statements, including decisions and calls to the methods of the class', 'Only assignment statements for the data members', 'Only statements that display a message', 'A return statement that gives back a value of the type of the class']),
  sol: `A constructor body is ordinary code. In a Floor class, the constructor stores two sides and then calls its own method findArea(); the object ends with an area of ${ic(out(S.cFloor))}. Returning a value is the one thing it cannot do.`,
}));

Q('ar_param_only', ar({
  t: 2, d: 4, c: 'analysis', verdict: 'A-true-R-false',
  a: 'If a class declares only a parameterised constructor, the statement new Parcel() is a compile-time error.',
  r: 'The compiler supplies a default constructor to every class, even to a class that already has a parameterised constructor.',
  sol: `(A) is true: the program fails with "${errOnlyParam}". (R) is false: the compiler supplies a default constructor only when the class has no constructor at all, which is precisely why (A) happens.`,
}));
Q('fb_default_rule', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'The compiler supplies a ___ constructor only when the class has no ___ of its own.',
  acc: [['default'], ['constructor']],
  sol: 'A class with no constructor receives the default constructor from the compiler; a class with any constructor does not.',
}));
Q('fb_this', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'Inside a constructor, the keyword ___ refers to the ___ that is being created.',
  acc: [['this'], ['object', 'current object']],
  sol: 'The keyword this stands for the object under construction, so this.name means the data member name of that object.',
}));
Q('ord_creation', ord({
  t: 2, d: 3, c: 'understanding',
  stem: 'Arrange the events that take place when the statement Dial p = new Dial(); is executed, in the correct order.',
  items: ['Memory is allocated for the new object', 'The data members are given their default values', 'The statements of the constructor are executed', 'The reference to the finished object is stored in p'],
  sol: `A Dial class shows the middle of this order: its constructor prints the data member before assigning it and gets ${ic(one(out(cDial)))}. The member already held 0 when the body started, so the default values come before the body, and the reference reaches p only after the object is ready.`,
}));

// ---- code output, t02
Q('co_param_trace', co({
  pre: 'A rickshaw is booked for six kilometres with the arguments given below. Write the exact output.',
  t: 2, d: 3, c: 'application',
  code: S.cRick(4, 9.5, 6),
  sol: 'The constructor stores 4 and 9.5. The method then returns 9.5 multiplied by 6, which is a double, and the seats and the fare are printed with a space between them.',
}));
Q('co_this_missing', co({
  pre: 'The parameters of this constructor have the same names as the data members, and this is written for only one of them. Write the exact output.',
  t: 2, d: 3, c: 'analysis',
  code: S.cMemberThisOne,
  sol: 'this.name = name; copies the parameter into the data member name. In age = age; both names mean the parameter, so it is assigned to itself and the data member age keeps its default 0.',
}));
Q('co_validate', co({
  pre: 'The constructor of the class below checks its argument before storing it. Write the exact output for the three sacks.',
  t: 2, d: 3, c: 'application',
  code: S.cSackThree,
  sol: 'For 12 the test k < 0 is false and kg is 12. For -3 the test is true and kg is set to 0. For 0 the test is false (0 is not less than 0), so kg receives 0 as it is.',
}));
Q('co_err_only_param', co({
  pre: 'A courier program declares one parameterised constructor and then creates an object without any argument. State the compile-time error reported by javac.',
  t: 2, d: 3, c: 'analysis', error: true,
  code: S.cOnlyParam,
  sol: 'The only constructor needs an int, and the creation passes no argument. A class that declares any constructor does not receive the default one.',
}));

// ---- short answers, t02
Q('s_default', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: [25, 90],
  stem: 'What is a default constructor? When does the Java compiler supply one?',
  model: `A **default constructor** is a constructor that takes no arguments; it gives the data members their initial values. If a class contains **no constructor at all**, the compiler supplies one that gives the data members the default values of their types.\n\nA class that has even one constructor of its own, for example Parcel(int w), gets no default constructor, and ${ic('new Parcel()')} then fails with "${errOnlyParam}".`,
  sol: 'One mark for the meaning, one mark for the condition under which the compiler supplies it.',
  scheme: [['Default constructor: no parameters, initialises the data members', 1], ['Supplied by the compiler only when the class has no constructor of its own', 1]],
}));
Q('s_default_vs_param', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: [25, 90],
  stem: 'Distinguish between a default constructor and a parameterised constructor.',
  model: 'A **default constructor** has an empty parameter list; every object it builds starts with the same fixed values, for example weight 500 and charge 35.\n\nA **parameterised constructor** has one or more parameters; the values are supplied in the statement that creates the object, such as ' + ic('new Rickshaw(4, 9.5)') + ', so different objects can start with different values.',
  sol: 'One mark for each constructor described with the contrast in parameters.',
  scheme: [['Default: no parameters, same initial values for all objects', 1], ['Parameterised: parameters, values passed at creation, objects may differ', 1]],
}));
Q('s_this', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: [25, 90],
  stem: 'The constructor Member(String name, int age) uses parameters with the same names as the data members. Why is this.name = name; used, and what is displayed if it is replaced by name = name;?',
  model: `The parameter name **hides** the data member of the same name. The keyword **this** refers to the current object, so this.name is the data member and name is the parameter; the statement copies the argument into the data member.\n\nWith name = name; and age = age; the object keeps its default values: ${ic(out(S.cMemberBad))} is displayed, instead of ${ic(out(S.cMemberOk))}.`,
  sol: 'One mark for the purpose of this and one mark for the effect of leaving it out.',
  scheme: [['this.name refers to the data member hidden by the parameter', 1], ['Without this, the parameter is assigned to itself and the data member keeps its default value', 1]],
}));
Q('s_only_param_fix', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: [25, 90],
  stem: 'A class Parcel has only the constructor Parcel(int w), and main contains the statement Parcel p = new Parcel();. Why does the compiler reject it, and how can the error be removed?',
  model: `A class that declares any constructor receives no default constructor from the compiler. The statement passes no argument, and javac reports "${errOnlyParam}".\n\nThe error is removed by adding a **default constructor** to the class, for example ${ic('Parcel() { weight = 500; }')}, or by calling the existing constructor with an int argument.`,
  sol: 'One mark for the reason and one mark for a valid remedy.',
  scheme: [['Reason: the class has a constructor of its own, so no default constructor is supplied', 1], ['Remedy: write a no-argument constructor (or pass an int argument)', 1]],
}));
Q('s_write_ctors', short({
  t: 2, d: 3, c: 'application', marks: 2, stem: 'A class Courtyard has the data members length and breadth of type double. Write a default constructor that sets both to 0 and a parameterised constructor that sets them from its two parameters.',
  model: (() => {
    const src = cls('Courtyard', ['double length, breadth;', 'Courtyard() {', '    length = 0;', '    breadth = 0;', '}', 'Courtyard(double l, double b) {', '    length = l;', '    breadth = b;', '}'], ['Courtyard c1 = new Courtyard();', 'Courtyard c2 = new Courtyard(12.5, 8);', 'System.out.println(c1.length + " " + c1.breadth);', 'System.out.println(c2.length + " " + c2.breadth);']);
    return `${F(src)}\n\nOutput of a test that creates one object with each constructor:\n\n\`\`\`\n${out(src)}\n\`\`\``;
  })(),
  sol: 'One mark for the default constructor and one mark for the parameterised constructor; the names must be Courtyard and neither has a return type.',
  scheme: [['Default constructor: class name, no return type, both members set to 0', 1], ['Parameterised constructor: two double parameters assigned to the data members', 1]],
}));

// ================================================================ t03 constructor overloading
Q('m_overload_def', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'What is constructor overloading?',
  opts: distinct(['Writing more than one constructor in a class, with different parameter lists', 'Writing a constructor that is larger than the other methods of its class', 'Calling a constructor again and again for the same object', 'Writing a constructor in a class and another one with the same parameters in another class']),
  sol: 'Overloaded constructors share the class name but differ in the number, the types or the order of their parameters. The compiler picks one from the arguments given in the new statement.',
}));
Q('m_overload_valid', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'Which pair of constructors cannot be written together in the same class Pack?',
  opts: distinct([ic('Pack(int a)') + ' and ' + ic('Pack(int b)'), ic('Pack(int a)') + ' and ' + ic('Pack(double a)'), ic('Pack(int a, double b)') + ' and ' + ic('Pack(double a, int b)'), ic('Pack()') + ' and ' + ic('Pack(int a)')]),
  sol: `The compiler tells constructors apart by the number, the types and the order of the parameters, never by their names. Two int constructors with different parameter names are duplicates; javac reports "${errDupPack}". The other three pairs differ in type, order or number.`,
}));
Q('m_which_ctor', mcq({
  t: 3, d: 2, c: 'application',
  stem: `The class Meter has four constructors, as shown. What does the statement new Meter(5.0); display?\n\n${F(S.cMeter('5.0'))}`,
  opts: distinct([ic(callOut('5.0')), ic(callOut('5')), ic(callOut('"5"')), ic(callOut(''))]),
  sol: 'The argument 5.0 is a double, so the constructor whose parameter is a double matches exactly. The other lines are what the calls with an int, a String and no argument would print.',
}));
Q('m_promote', mcq({
  t: 3, d: 4, c: 'application',
  stem: `The class Meter has constructors for no argument, int, double and String. What does the statement new Meter('A'); display?\n\n${F(S.cMeter("'A'"))}`,
  opts: distinct([ic(callOut("'A'")), ic('String A'), ic(callOut('65.0')), 'A compile-time error is reported']),
  sol: 'No constructor takes a char. Java widens the char to the nearest type that has a constructor: a char widens to int before it widens to double, so the int constructor runs with the character code 65 of A. A char is never turned into a String automatically.',
}));
Q('m_trace_msgs', mcq({
  t: 3, d: 3, c: 'application',
  stem: `A gate-control program has a default and a parameterised constructor. What is displayed?\n\n${F(S.cGate)}`,
  opts: distinct([ic(oline(S.cGate)), ic('Default constructor / Gate 7 built / Gate 3 built / a=7 b=1 c=3'), ic('Gate 7 built / Gate 3 built / Default constructor / a=7 b=1 c=3'), ic('Gate 7 built / Default constructor / Gate 3 built / a=7 b=7 c=3')]),
  sol: 'The messages appear in the order in which the objects are created: a with the parameterised constructor, b with the default one, c with the parameterised one. The summary line comes last, and b holds the id 1 that the default constructor assigned.',
}));
Q('m_why_overload', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Why does a class provide overloaded constructors?',
  opts: distinct(['So that objects can be created with different sets of starting information', 'So that the same object can be created twice with one statement', 'So that the compiler does not have to supply a default constructor', 'So that a constructor can return values of different types']),
  sol: `The class Meter can be created with no information, with an int, with a double or with a String, as the four creation statements print ${ic(oline(S.cMeter('', '5', '5.0', '"5"')))}. Constructors never return values, and the compiler's default constructor is unrelated to overloading.`,
}));
Q('m_ambiguous', mcq({
  t: 3, d: 4, c: 'analysis',
  stem: `The class Mix has the constructors Mix(int a, double b) and Mix(double a, int b). What happens when the following program is compiled?\n\n${F(S.cMix)}`,
  opts: distinct([`Compile-time error: ${errAmbig}`, 'It runs and displays: int, double', 'It runs and displays: double, int', 'It runs and displays both lines']),
  sol: `Both constructors accept the arguments 2 and 3, each after one widening conversion of an int to a double, so neither is a better match and javac cannot decide. A call with the exact types, ${ic('new Mix(2, 3.0)')}, prints ${ic(out(S.cMixOk(2, '3.0')))}.`,
}));
Q('m_copy_def', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'What does a constructor such as Pack(Pack other) usually do?',
  opts: distinct(['It copies the values of the data members of other into the new object', 'It deletes the object other from the memory', 'It makes the new reference and other refer to one and the same object', 'It returns the object other to the statement that called it']),
  sol: `The new object receives its own copy of the values, so it is a separate object: after the copy, changing the items of one Pack leaves the other unchanged, and the Pack program prints ${ic(out(S.cPack))}.`,
}));

Q('ar_promote', ar({
  t: 3, d: 4, c: 'analysis', verdict: 'both-true-explains',
  a: 'If the class Meter has constructors for int, double, String and no argument, the statement new Meter(\'A\') executes the constructor that has an int parameter.',
  r: 'When no constructor takes a char, a char argument is widened to the nearest wider type that has a matching constructor, and int comes before double.',
  sol: `The run of ${ic("new Meter('A')")} prints ${ic(callOut("'A'"))}, so (A) is true: the int constructor receives 65, the code of A. (R) states the rule that makes this happen, so it correctly explains (A).`,
}));
Q('mt_call_ctor', match({
  t: 3, d: 3, c: 'application', marks: 2,
  stem: 'The class Meter has constructors for no argument, an int, a double and a String. Match each statement with what it displays.',
  pairs: [
    [ic('new Meter();'), ic(callOut(''))],
    [ic('new Meter(5);'), ic(callOut('5'))],
    [ic('new Meter(5.0);'), ic(callOut('5.0'))],
    [ic('new Meter("5");'), ic(callOut('"5"'))],
  ],
  sol: 'The compiler chooses the constructor whose parameter list fits the arguments of the call: none, an int, a double or a String.',
}));
Q('ord_messages', ord({
  t: 3, d: 3, c: 'application',
  stem: 'The class Gate has a default constructor that sets id to 1 and prints Default constructor, and a constructor Gate(int n) that sets id to n and prints Gate n built (with the value of n). main runs Gate a = new Gate(7); Gate b = new Gate(); Gate c = new Gate(3); and then prints the ids of a, b and c on one line. Arrange the four output lines in the order in which they appear.',
  items: out(S.cGate).split('\n'),
  sol: `Each constructor prints as its object is created, so the lines follow the order of the new statements and the summary printed by main comes after all three.`,
}));

// ---- code output, t03
Q('co_overload_which', co({
  pre: 'The class Meter has overloaded constructors. Write the exact output of main, which has four statements.',
  t: 3, d: 3, c: 'application',
  code: S.cMeter('', '5', '5.0', '"5"'),
  sol: 'Each new expression is matched with the constructor whose parameter list fits: no argument, an int, a double and a String, in that order, and each prints its own line.',
}));
Q('co_promotion', co({
  pre: 'Write the exact output of the three statements of main. The constructors of Meter take nothing, an int, a double and a String.',
  t: 3, d: 4, c: 'analysis',
  code: S.cMeter("'A'", '7L', '2.5f'),
  sol: 'No constructor takes a char, a long or a float. A char widens to int and is printed as its code 65. A long and a float both widen to double, so the long 7L prints as 7.0 and the float 2.5f as 2.5.',
}));
Q('co_order_objects', co({
  pre: 'A gate-control program creates two objects with different constructors and adds their ids. Write the exact output.',
  t: 3, d: 3, c: 'application',
  code: S.cGateTwo,
  sol: 'x is built by the default constructor, which prints its message and sets the id to 1; y is built by the parameterised constructor with 9. The last statement adds the two ids as ints.',
}));
Q('co_copy', co({
  pre: 'The class Pack has a constructor that takes another Pack object. Write the exact output.',
  t: 3, d: 4, c: 'analysis',
  code: cPackRun,
  sol: 'The values 30 and 45.5 are copied into b. The statement a.items = 5; then changes only a, so the items of a and b differ while the price of a is unchanged.',
}));
Q('co_err_dup', co({
  pre: 'Two constructors of the class below take one int each, with different parameter names. State the compile-time error reported by javac.',
  t: 3, d: 4, c: 'analysis', error: true,
  code: S.cDupCtor,
  sol: 'The parameter names x and w do not matter: both constructors take one int, so the second repeats the signature of the first.',
}));

// ---- short answers, t03
Q('s_overload', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: [25, 90],
  stem: 'What is constructor overloading? How does Java decide which constructor to execute?',
  model: `**Constructor overloading** means writing two or more constructors in one class; they have the class name but different parameter lists, which differ in the number, the types or the order of the parameters.\n\nJava decides from the arguments of the **new** statement: it executes the constructor whose parameter list matches them, widening a value (for example an int to a double) if there is no exact match.`,
  sol: 'One mark for the meaning with the difference in parameters and one mark for how the constructor is selected.',
  scheme: [['Several constructors in a class with different parameter lists (number, types, order)', 1], ['The constructor matching the arguments of new is executed', 1]],
}));
Q('s_which_ctor', short({
  t: 3, d: 3, c: 'application', marks: 2, wl: [25, 110],
  stem: 'The class Meter has constructors with no parameter, with an int, with a double and with a String. State which constructor is executed by each of the statements new Meter(5); new Meter(5.0); and new Meter(7L);.',
  model: `${F(S.cMeter('5', '5.0', '7L'))}\n\nThe three statements print ${ic(oline(S.cMeter('5', '5.0', '7L')))}.\n\n- **new Meter(5)** executes the constructor with the int parameter: an exact match.\n- **new Meter(5.0)** executes the one with the double parameter: an exact match.\n- **new Meter(7L)** also executes the double constructor, because a long is widened to double.`,
  sol: 'One mark for the two exact matches and one mark for the long argument widened to double.',
  scheme: [['new Meter(5) is int and new Meter(5.0) is double (exact matches)', 1], ['new Meter(7L): long is widened to double, so the double constructor', 1]],
}));
mustCompile(S.cPack, 'copy constructor compiles');
