// ICSE 10 Computer Applications, ch06: topic t03 (primitive and composite data types) and the 15-mark programs.
import { Q, mcq, ar, tf, fb, match, ord, short, long, co } from '../../icse-10-computer-applications-ch01/src/lib.mjs';
import { code, F, ic, ev, out, oline, oic, distinct, mustFail, expect, full, rtErr, prog } from './q_util.mjs';
import { seedPacket, seedDriver } from './q_b.mjs';

// ---- shared classes
export const plot = code(
  'class Plot {',
  '    int number;',
  '    double area;',
  '    boolean sold;',
  '    String owner;',
  '    SeedPacket crop;',
  '}',
);
export const plotDefaults = full(`${seedPacket}\n\n${plot}`, 'Plot p = new Plot();', 'System.out.println(p.number);', 'System.out.println(p.area);', 'System.out.println(p.sold);', 'System.out.println(p.owner);', 'System.out.println(p.crop);');
export const copyBody = ['int x = 5;', 'int y = x;', 'y = 9;', 'SeedPacket a = new SeedPacket();', 'a.set("Tomato", 50, 25.0);', 'SeedPacket b = a;', 'b.set("Okra", 30, 18.0);', 'System.out.println(x + " " + y);', 'a.show();'];
export const copyDriver = seedDriver(...copyBody);
export const eqBody = ['SeedPacket a = new SeedPacket();', 'a.set("Neem", 20, 10.0);', 'SeedPacket b = new SeedPacket();', 'b.set("Neem", 20, 10.0);', 'SeedPacket c = a;'];
export const eqDriver = seedDriver(...eqBody, 'System.out.println(a == b);', 'System.out.println(a.price == b.price);', 'System.out.println(a == c);');
export const shelf = code('class Shelf {', '    SeedPacket packet;', '', '    void check() {', '        packet.show();', '    }', '}');
export const shelfDriver = full(`${seedPacket}\n\n${shelf}`, 'Shelf s = new Shelf();', 's.check();');
export const shop = code(
  'class Shop {',
  '    void cutObject(SeedPacket p) {',
  '        p.price = p.price - 5;',
  '    }',
  '',
  '    void cutNumber(double price) {',
  '        price = price - 5;',
  '    }',
  '',
  '    SeedPacket pick(SeedPacket x, SeedPacket y) {',
  '        if (x.cheaperThan(y))',
  '            return x;',
  '        return y;',
  '    }',
  '}',
);
export const shopSrc = `${seedPacket}\n\n${shop}`;
export const passBody = ['SeedPacket a = new SeedPacket();', 'a.set("Tomato", 50, 25.0);', 'double rate = 25.0;', 'Shop s = new Shop();', 's.cutObject(a);', 's.cutNumber(rate);', 'System.out.println(a.price + " " + rate);'];
export const passDriver = full(shopSrc, ...passBody);
export const pickBody = ['SeedPacket a = new SeedPacket();', 'SeedPacket b = new SeedPacket();', 'a.set("Tomato", 50, 25.0);', 'b.set("Marigold", 120, 30.0);', 'Shop s = new Shop();', 'SeedPacket best = s.pick(a, b);', 'best.show();', 'System.out.println(best == b);'];
export const pickDriver = full(shopSrc, ...pickBody);
export const strBody = ['String s = "Neem";', 'System.out.println(s.length());', 'System.out.println(s.toUpperCase());', 'String t = null;', 'System.out.println(t);'];
export const strDriver = code(...strBody);

// facts the prose relies on (sizes of primitive types are fixed by the language)
expect(ev('Integer.BYTES'), '4', 'int size');
expect(ev('Double.BYTES'), '8', 'double size');
expect(ev('Character.BYTES'), '2', 'char size');
expect(ev('Long.BYTES'), '8', 'long size');
expect(ev('Short.BYTES'), '2', 'short size');
expect(ev('Byte.BYTES'), '1', 'byte size');

// ================================================================ t03 primitive and composite types
Q('m_prim_list', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Which of the following is a primitive data type of Java?',
  opts: distinct([ic('double'), ic('String'), ic('SeedPacket'), ic('Scanner')]),
  sol: 'int, double, char and boolean are among the primitive types built into the language. String, Scanner and a class written by the programmer, such as SeedPacket, are class (composite) types.',
}));
Q('m_composite_def', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'What is a composite data type in Java?',
  opts: distinct(['A type defined by a class, which groups data members that may themselves be primitive or composite', 'A type that stores only one number', 'A type that can hold only the values true and false', 'A type that is available only inside the main method']),
  sol: 'A class groups several members into one new type, for example Plot, which has an int, a double, a boolean, a String and a SeedPacket. Such a type is called composite (or a reference type), unlike the primitive types, which hold a single simple value.',
}));
Q('m_var_holds', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'After `SeedPacket a = new SeedPacket();` is executed, what does the variable a hold?',
  opts: distinct(['The reference (address) of the SeedPacket object', 'A copy of all the data members of the object', 'The class SeedPacket itself', 'The value 0']),
  sol: 'A variable of a class type is a reference variable: it stores the reference of an object that lives elsewhere in memory. The data members are stored in the object, not in the variable.',
}));
Q('m_default_values', mcq({
  t: 3, d: 3, c: 'application',
  stem: `An object of the class Plot is created with new and nothing else is done. What are the values of its data members?\n\n${F(plot)}`,
  opts: distinct(['0 for number, 0.0 for area, false for sold, and null for owner and crop', '0 for every data member, including owner and crop', 'Garbage values left over in the memory', 'None; the program does not compile until every data member is given a value']),
  sol: `The data members of a new object get default values: 0 for int, 0.0 for double, false for boolean and null for every reference type. Running the five prints gives ${ic(oline(plotDefaults))}. A program does not need to set the data members to compile.`,
}));
Q('m_copy_prim', mcq({
  t: 3, d: 3, c: 'application',
  stem: `What does the following code display?\n\n${F(code('int x = 5;', 'int y = x;', 'y = 9;', 'System.out.println(x + " " + y);'))}`,
  opts: distinct([oic('int x = 5;\nint y = x;\ny = 9;\nSystem.out.println(x + " " + y);'), oic('int x = 5;\nint y = 9;\nSystem.out.println(y + " " + y);'), oic('int x = 5;\nSystem.out.println(x + " " + x);'), oic('int x = 5;\nint y = 9;\nSystem.out.println(y + " " + x);')]),
  sol: 'An int variable holds the value itself, so y = x copies the value 5 into a separate variable. Changing y later does not affect x. The other options show 9 or 5 in places where the variables keep a different value.',
}));
Q('m_copy_ref', mcq({
  t: 3, d: 3, c: 'application',
  stem: `A seed shop copies an object variable and then changes the packet through the copy. What does the program display for its last statement?\n\n${F(code(...copyBody.slice(3, 6), copyBody[6], 'a.show();'))}`,
  opts: distinct([oic(seedDriver(...copyBody.slice(3, 6), copyBody[6], 'a.show();')), oic(seedDriver(...copyBody.slice(3, 5), 'a.show();')), oic(seedDriver('SeedPacket a = new SeedPacket();', 'a.show();')), 'A compile-time error']),
  sol: 'The statement b = a copies the reference, not the object, so a and b now refer to the same SeedPacket. The set call made through b therefore changes what a shows too. The other options are what a would show before the call or for a brand-new object.',
}));
Q('m_eq_ref', mcq({
  t: 3, d: 4, c: 'analysis',
  stem: `Two packets hold equal data, and a third variable is a copy of a. What does the program display?\n\n${F(code(...eqBody, 'System.out.println(a == b);', 'System.out.println(a.price == b.price);', 'System.out.println(a == c);'))}`,
  opts: distinct([oic(eqDriver), oic(seedDriver(...eqBody, 'System.out.println(a == c);', 'System.out.println(b == c);', 'System.out.println(a.price == b.price);')), oic(seedDriver(...eqBody, 'System.out.println(a == b);', 'System.out.println(a.price != b.price);', 'System.out.println(a == c);')), oic(seedDriver(...eqBody, 'System.out.println(a != b);', 'System.out.println(a.price == b.price);', 'System.out.println(a != c);'))]),
  sol: 'For two object variables, == compares the references, not the contents. a and b are two different objects, so a == b is false even though their data are equal. The prices are double values, so == compares the numbers and gives true. c holds the same reference as a, so a == c is true.',
}));
Q('m_npe', mcq({
  t: 3, d: 3, c: 'application',
  stem: `The method check of Shelf is called, but nobody has ever given a value to the data member packet. What happens when the program below is run?\n\n${F(shelfDriver)}`,
  opts: distinct(['The program stops with a NullPointerException', 'A compile-time error is reported', 'The program displays null', 'The program displays 0 seeds']),
  sol: `The data member packet is a reference with the default value null, so there is no object on which show can be called. The compiler cannot know this; the program compiles and fails when it runs with "${rtErr(shelfDriver)}".`,
}));
Q('m_string_type', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which statement about the type String is correct?',
  opts: distinct(['String is a built-in class, so a String variable is a reference variable of a composite type', 'String is a primitive type like int and char', 'String is a keyword that holds one character', 'A String variable can never be null']),
  sol: `String is a class of the Java library, not a primitive type, so a String variable holds a reference. Like any reference it can be null: printing a null String shows ${ic(out(strDriver).split('\n')[2])}.`,
}));
Q('m_size', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'Which statement about the memory used by primitive and composite values is correct?',
  opts: distinct(['The size of a primitive value is fixed by the language, but the size of an object depends on the data members of its class', 'Every object occupies the same fixed size, whatever its class', 'A primitive value takes more memory than an object', 'The size of an int depends on the program in which it is used']),
  sol: 'An int always takes 4 bytes and a double 8, whatever the program. An object holds all the data members of its class, so a class with more or larger members needs more memory than a class with fewer.',
}));
const errLocal = mustFail(code('int total;', 'System.out.println(total);'), 'uninitialised local');
Q('m_local_default', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'A method contains the two statements `int total;` and `System.out.println(total);`. What happens when the code is compiled?',
  opts: distinct(['A compile-time error is reported, because a local variable has no default value', 'It compiles and displays 0', 'It compiles and displays null', 'It compiles and displays a garbage value']),
  sol: `Only data members get default values. A local variable must be given a value before it is used, otherwise javac reports "${errLocal}".`,
}));

Q('ar_ref_copy', ar({
  t: 3, d: 4, c: 'analysis', verdict: 'A-true-R-false',
  a: 'After `SeedPacket b = a;` the variables a and b refer to the same object.',
  r: 'The assignment copies all the data members of the object into a second, separate object.',
  sol: 'Assigning an object variable copies only the reference, so (A) is true: a change made through b is visible through a, as the run of the copy program shows. No second object is created, so (R) is false.',
}));
Q('ar_prim_copy', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'After `int y = x;` a later change of y does not change x.',
  r: 'A primitive variable holds the value itself, so the assignment copies the value into a separate variable.',
  sol: `Running the statements with y = 9 afterwards prints ${ic(out(code('int x = 5;', 'int y = x;', 'y = 9;', 'System.out.println(x + " " + y);')))}, so (A) is true. (R) is also true and explains it: each variable has its own copy of the value.`,
}));
Q('tf_null_default', tf({
  t: 3, d: 2, c: 'recall', ans: true,
  stem: 'True or false? An uninitialised data member of a class type, such as a String, has the default value null.',
  sol: `Reference types have the default value null. For a new Plot object the data member owner is displayed as ${ic(out(plotDefaults).split('\n')[3])}.`,
}));
Q('tf_eq_content', tf({
  t: 3, d: 3, c: 'understanding', ans: false,
  stem: 'True or false? For two object variables a and b, the expression a == b is true whenever the two objects have equal values in their data members.',
  sol: `The operator == compares references. Two separate objects with equal data give ${ev('a == b', 'Object a = new Object();\nObject b = new Object();')} for a == b; it is true only when both variables refer to the same object.`,
}));
Q('fb_ref', fb({
  t: 3, d: 2, c: 'recall',
  stem: 'A variable of a class type stores the ___ of an object, and the value ___ means that it refers to no object.',
  acc: [['reference', 'address'], ['null']],
  sol: 'An object variable holds a reference (address) to the object; null is the value of a reference that refers to nothing.',
}));
const defLines = out(plotDefaults).split('\n');
Q('mt_defaults', match({
  t: 3, d: 3, c: 'application', marks: 2,
  stem: `Match each data member of a new Plot object with its default value.\n\n${F(plot)}`,
  pairs: [[ic('int number'), defLines[0]], [ic('double area'), defLines[1]], [ic('boolean sold'), defLines[2]], [ic('String owner'), defLines[3]]],
  sol: 'The default is zero of the type for the numeric members, false for boolean and null for a reference type such as String. The values come from printing the members of a new Plot.',
}));
Q('ord_new_exec', ord({
  t: 3, d: 4, c: 'analysis',
  stem: 'Arrange the events that take place when `SeedPacket p = new SeedPacket();` is executed and `p.show();` follows, in the correct order.',
  items: ['Memory is allocated for a new object and its data members get default values', 'The reference of the new object is returned by new', 'The reference is stored in the variable p', 'p.show() uses the reference in p to find the object and runs show on it'],
  sol: 'The object has to exist before its reference can be returned; the reference is then stored in p, and only then can p be used to send a message.',
}));

// ---- code output, t03
Q('co_defaults', co({
  pre: 'A new Plot object of a farm is created and its members are printed at once. Write the exact output.',
  t: 3, d: 3, c: 'application',
  code: plotDefaults,
  sol: 'No value was assigned, so every data member shows its default: 0 for the int, 0.0 for the double, false for the boolean and null for the two reference members (the String and the SeedPacket).',
}));
Q('co_alias', co({
  pre: 'A copy is made of an int and of an object variable. Write the exact output of the program.',
  t: 3, d: 4, c: 'analysis',
  code: copyDriver,
  sol: 'y = x copies the value 5, so changing y to 9 leaves x at 5. b = a copies the reference, so a and b are two names for one object; the set call through b changes the object that a also shows.',
}));
Q('co_eq', co({
  pre: 'A seed shop gives a packet a second name and then points the first name at a new packet. Write the exact output of the program.',
  t: 3, d: 4, c: 'analysis',
  code: seedDriver('SeedPacket a = new SeedPacket();', 'a.set("Neem", 20, 10.0);', 'SeedPacket b = a;', 'a = new SeedPacket();', 'a.set("Mint", 15, 6.0);', 'b.show();', 'a.show();', 'System.out.println(a == b);'),
  sol: 'b = a copies the reference, so b refers to the Neem packet. The statement a = new SeedPacket() then makes a refer to a second object; it does not change b, which still refers to the Neem packet. The two variables now hold different references, so a == b is false.',
}));
Q('co_pass', co({
  pre: 'A shop passes a SeedPacket object to one method and a double value to another. Write the exact output of the program.',
  t: 3, d: 4, c: 'analysis',
  code: full(code('class Packet {', '    double price;', '}', '', 'class Shop {', '    void cutObject(Packet p) {', '        p.price = p.price - 5;', '    }', '', '    void cutNumber(double price) {', '        price = price - 5;', '    }', '}'), 'Packet a = new Packet();', 'a.price = 25.0;', 'double rate = 25.0;', 'Shop s = new Shop();', 's.cutObject(a);', 's.cutNumber(rate);', 'System.out.println(a.price + " " + rate);'),
  sol: 'cutObject receives a copy of the reference, so p refers to the same object as a and the price of that object falls by 5. cutNumber receives a copy of the value, so only its own parameter changes and rate in main stays 25.0.',
}));
Q('co_npe', co({
  pre: 'A garden shop fills a shelf, shows its packet, empties the shelf and shows it again. The program compiles and prints one line before it stops. State the run-time error that stops it, with its message.',
  t: 3, d: 4, c: 'analysis', error: true,
  code: full(code('class Packet {', '    String crop;', '    void show() {', '        System.out.println("Packet of " + crop);', '    }', '}', '', 'class Rack {', '    Packet packet;', '    void fill(String c) {', '        packet = new Packet();', '        packet.crop = c;', '    }', '    void empty() {', '        packet = null;', '    }', '    void check() {', '        packet.show();', '    }', '}'), 'Rack r = new Rack();', 'r.fill("Okra");', 'r.check();', 'r.empty();', 'r.check();'),
  sol: 'The first check() shows the Okra packet. empty() then stores null in the data member packet, so the second check() tries to call show on a reference that refers to no object. The compiler cannot detect this; the program stops at run time with a NullPointerException.',
  scheme: [['Run-time error identified as NullPointerException', 1], ['Reason: the reference packet is null, so no object receives the call', 1]],
}));
Q('co_err_uninit', co({
  pre: 'A student adds 5 to a local variable that was never given a value, as shown. State the error that the compiler reports.',
  t: 3, d: 3, c: 'analysis', error: true,
  code: code('double price;', 'price = price + 5;', 'System.out.println(price);'),
  sol: 'A local variable of a primitive type gets no default value, so reading it before assigning a value is not allowed. The data members of an object, in contrast, do get default values.',
  scheme: [['Compile-time error with the correct line', 1], ['Reason: local variables get no default value', 1]],
}));

// ---- short answers, t03
Q('s_prim_comp', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: [25, 90],
  stem: 'Distinguish between a primitive data type and a composite data type with two examples of each.',
  model: 'A **primitive** type is built into Java and holds a single simple value directly in the variable; its size is fixed. Examples: `int`, `double`.\n\nA **composite** (class or reference) type is defined by a class and groups several data members; the variable holds the reference of an object, and the size of the object depends on its members. Examples: `String`, and a class written by the programmer such as `SeedPacket`.',
  sol: 'One mark for each type, with its examples.',
  scheme: [['Primitive: built-in, holds the value itself, fixed size; two examples', 1], ['Composite: defined by a class, variable holds a reference; two examples', 1]],
}));
Q('s_copy', short({
  t: 3, d: 4, c: 'analysis', marks: 2,
  stem: 'Explain the difference between copying an int variable and copying an object variable with the assignment operator. Use the statements `int y = x;` and `SeedPacket b = a;` in your answer.',
  model: `In \`int y = x;\` the **value** of x is copied, so x and y are independent. In \`SeedPacket b = a;\` only the **reference** is copied, so a and b refer to **one** object, and a change made through b is seen through a.\n\nIn a run, x = 5 and y changed to 9 print ${ic(out(copyDriver).split('\n')[0])}, while the object shown by a after b.set(...) is ${ic(out(copyDriver).split('\n')[1])}.`,
  sol: 'One mark for the value copy and one for the reference copy, with the effect of a change.',
  scheme: [['int: value copied, the variables are independent', 1], ['Object: reference copied, both variables refer to the same object, changes are shared', 1]],
}));
Q('s_default', short({
  t: 3, d: 3, c: 'application', marks: 2, wl: [25, 90],
  stem: 'State the default values of the data members of a new object of the class Plot (int number, double area, boolean sold, String owner). Do local variables of a method get default values?',
  model: `The data members of a new object get default values: ${ic(oline(plotDefaults))} for \`number\`, \`area\`, \`sold\`, \`owner\` and \`crop\`, in that order. A **local variable** gets **no** default value: it must be assigned before it is used, otherwise the compiler reports "${errLocal}".`,
  sol: 'One mark for the default values and one mark for the rule about local variables.',
  scheme: [['Defaults: 0, 0.0, false, null', 1], ['Local variables have no default value; use before assignment is a compile-time error', 1]],
}));
Q('s_null', short({
  t: 3, d: 3, c: 'understanding', marks: 2, wl: [25, 90],
  stem: 'What is null? What happens if a method is called through a reference variable whose value is null?',
  model: `**null** is the value of a reference variable that refers to no object; it is the default value of every reference data member. Calling a method through it makes the program stop at run time with a **NullPointerException**, for example "${rtErr(shelfDriver)}".`,
  sol: 'One mark for the meaning of null and one for the NullPointerException on a call.',
  scheme: [['null: a reference that refers to no object', 1], ['Calling a method on it gives a NullPointerException at run time', 1]],
}));

// ================================================================ 15-mark programs
const S15c = (cls, mainPart, calls, outp, vars) => [
  [cls, 6],
  [mainPart, 3],
  [calls, 2],
  [outp, 2],
  [vars, 2],
];

// ---- metro card (t1, t2)
const srcMetro = code(
  'import java.util.Scanner;',
  '',
  'class MetroCard {',
  '    int cardNo;',
  '    double balance;',
  '    int trips;',
  '',
  '    void accept(int no, double bal) {',
  '        cardNo = no;',
  '        balance = bal;',
  '    }',
  '',
  '    void recharge(double amount) {',
  '        balance = balance + amount;',
  '    }',
  '',
  '    boolean travel(double fare) {',
  '        if (balance >= fare) {',
  '            balance = balance - fare;',
  '            trips++;',
  '            return true;',
  '        }',
  '        return false;',
  '    }',
  '',
  '    void display() {',
  '        System.out.println("Card number : " + cardNo);',
  '        System.out.println("Balance     : " + balance);',
  '        System.out.println("Trips made  : " + trips);',
  '    }',
  '}',
  '',
  'public class MetroTest {',
  '    public static void main(String[] args) {',
  '        Scanner sc = new Scanner(System.in);',
  '        int no = sc.nextInt();',
  '        double bal = sc.nextDouble();',
  '        double amount = sc.nextDouble();',
  '        double fare1 = sc.nextDouble();',
  '        double fare2 = sc.nextDouble();',
  '        MetroCard card = new MetroCard();',
  '        card.accept(no, bal);',
  '        card.recharge(amount);',
  '        if (!card.travel(fare1))',
  '            System.out.println("Journey 1 refused");',
  '        if (!card.travel(fare2))',
  '            System.out.println("Journey 2 refused");',
  '        card.display();',
  '    }',
  '}',
);
Q('l_metro', long({
  t: [1, 2], d: 4, c: 'application', marks: 15,
  stem: 'The imagined Ganga Metro issues prepaid cards. Define a class MetroCard with data members cardNo (int), balance (double) and trips (int), and member methods: `accept(int no, double bal)` to give values to cardNo and balance; `recharge(double amount)` to add the amount to the balance; `boolean travel(double fare)` that deducts the fare and adds 1 to trips if the balance is enough and returns true, otherwise returns false without any change; and `display()` to show the three data members. Write a class MetroTest with a main method that reads the card number, the opening balance, a recharge amount and two fares, creates an object of MetroCard, recharges it and makes the two journeys, printing "Journey 1 refused" or "Journey 2 refused" whenever travel returns false, and finally displays the card. Sample input: 4501 150 100 40 30.',
  model: prog({ src: srcMetro, stdin: '4501 150 100 40 30\n', also: ['4502 20 0 35 15\n'], vars: [['cardNo', 'int (data member)', 'number of the card'], ['balance', 'double (data member)', 'money left on the card'], ['trips', 'int (data member)', 'journeys paid for'], ['no, bal, amount, fare', 'parameters', 'values received by accept, recharge and travel'], ['card', 'MetroCard', 'object of the class created with new']] }),
  sol: 'The class holds the state and the methods that change it. travel tests the balance first, and returns true or false so that main can print the refusal message. main creates the object with new and then sends messages to it.',
  scheme: S15c('Class MetroCard: data members, accept, recharge, travel with the condition and return value, display', 'main: Scanner, reading all five values, object created with new', 'Methods called in the correct order; the return value of travel tested', 'Output with clear messages', 'Variable description or comments'),
}));

// ---- seed lots (t2)
const srcSeed = code(
  'import java.util.Scanner;',
  '',
  'class SeedLot {',
  '    String name;',
  '    int count;',
  '    double cost;',
  '',
  '    void accept(String n, int c, double rs) {',
  '        name = n;',
  '        count = c;',
  '        cost = rs;',
  '    }',
  '',
  '    double perSeed() {',
  '        return cost / count;',
  '    }',
  '',
  '    void display() {',
  '        System.out.println(name + " : " + perSeed() + " per seed");',
  '    }',
  '}',
  '',
  'public class SeedCompare {',
  '    public static void main(String[] args) {',
  '        Scanner sc = new Scanner(System.in);',
  '        SeedLot first = new SeedLot();',
  '        SeedLot second = new SeedLot();',
  '        first.accept(sc.next(), sc.nextInt(), sc.nextDouble());',
  '        second.accept(sc.next(), sc.nextInt(), sc.nextDouble());',
  '        first.display();',
  '        second.display();',
  '        if (first.perSeed() < second.perSeed())',
  '            System.out.println("Better buy: " + first.name);',
  '        else if (second.perSeed() < first.perSeed())',
  '            System.out.println("Better buy: " + second.name);',
  '        else',
  '            System.out.println("Both cost the same per seed");',
  '    }',
  '}',
);
Q('l_seed', long({
  t: 2, d: 3, c: 'application', marks: 15,
  stem: 'A farmers\' cooperative sells packets of seeds. Define a class SeedLot with data members name (String), count (int, number of seeds) and cost (double, price of the packet), and member methods: `accept(String n, int c, double rs)` to give values to the data members; `double perSeed()` that returns the cost of one seed; and `display()` that shows the name and the cost per seed. Write a class SeedCompare with a main method that reads the details of two packets, creates two objects of SeedLot, displays both, and prints the name of the packet that costs less per seed, or a message if both cost the same. Sample input: Tomato 50 25.0 Marigold 120 30.0.',
  model: prog({ src: srcSeed, stdin: 'Tomato 50 25.0 Marigold 120 30.0\n', also: ['Basil 30 21.0 Mint 50 35.0\n'], vars: [['name', 'String (data member)', 'name of the seed'], ['count', 'int (data member)', 'number of seeds in the packet'], ['cost', 'double (data member)', 'price of the packet'], ['first, second', 'SeedLot', 'the two objects being compared']] }),
  sol: 'Two objects are made from one class, and each keeps its own name, count and cost. perSeed divides the price by the count of the object it is called on. The comparison uses an if-else-if ladder with a last branch for equal costs.',
  scheme: S15c('Class SeedLot: data members, accept, perSeed returning the cost of one seed, display', 'main: Scanner, two objects created with new, values read and passed to accept', 'Comparison of the two costs with all three outcomes', 'Output with clear messages', 'Variable description or comments'),
}));

// ---- dormitory (t2)
const srcDorm = code(
  'import java.util.Scanner;',
  '',
  'class Dorm {',
  '    int dormNo;',
  '    int capacity;',
  '    int students;',
  '',
  '    void accept(int no, int cap) {',
  '        dormNo = no;',
  '        capacity = cap;',
  '    }',
  '',
  '    int free() {',
  '        return capacity - students;',
  '    }',
  '',
  '    int join(int n) {',
  '        int taken = n;',
  '        if (n > free())',
  '            taken = free();',
  '        students = students + taken;',
  '        return taken;',
  '    }',
  '}',
  '',
  'public class DormTest {',
  '    public static void main(String[] args) {',
  '        Scanner sc = new Scanner(System.in);',
  '        int no = sc.nextInt();',
  '        int cap = sc.nextInt();',
  '        int batch1 = sc.nextInt();',
  '        int batch2 = sc.nextInt();',
  '        Dorm d = new Dorm();',
  '        d.accept(no, cap);',
  '        int got1 = d.join(batch1);',
  '        System.out.println("Batch 1: " + got1 + " of " + batch1 + " admitted");',
  '        int got2 = d.join(batch2);',
  '        System.out.println("Batch 2: " + got2 + " of " + batch2 + " admitted");',
  '        System.out.println("Free beds in dorm " + d.dormNo + ": " + d.free());',
  '    }',
  '}',
);
Q('l_hostel', long({
  t: 2, d: 4, c: 'application', marks: 15,
  stem: 'A school hostel office records its dormitories. Define a class Dorm with data members dormNo (int), capacity (int, number of beds) and students (int, students living there now), and member methods: `accept(int no, int cap)` to give values to dormNo and capacity; `int free()` that returns the number of free beds; and `int join(int n)` that admits n students if there are enough free beds, otherwise only as many as there are, adds the number admitted to students and returns it. Write a class DormTest with a main method that reads the dormitory number, its capacity and the sizes of two batches of new students, creates a Dorm object, admits the two batches one after the other, and displays how many of each batch were admitted and the free beds that remain. Sample input: 12 6 4 5.',
  model: prog({ src: srcDorm, stdin: '12 6 4 5\n', also: ['3 10 2 3\n'], vars: [['dormNo, capacity, students', 'int (data members)', 'state of the dormitory'], ['n', 'int (parameter)', 'number of students requested in join'], ['taken', 'int (local)', 'number actually admitted'], ['batch1, batch2', 'int', 'sizes of the two batches'], ['d', 'Dorm', 'object created with new']] }),
  sol: 'join compares the request with the free beds and admits only what fits; it changes the data member students and returns the number admitted. free is called twice inside join, and once more from main. The second batch is partly refused in the sample run.',
  scheme: S15c('Class Dorm: data members, accept, free, join with the limit on admissions and the return value', 'main: Scanner, all four values read, object created with new', 'Both batches admitted in order; returned values stored', 'Output with clear messages', 'Variable description or comments'),
}));

// ---- innings (t1, t2)
const srcInnings = code(
  'import java.util.Scanner;',
  '',
  'class Innings {',
  '    int runs;',
  '    int wickets;',
  '    int balls;',
  '',
  '    void ball(int outcome) {',
  '        if (outcome < 0)',
  '            wickets++;',
  '        else',
  '            runs = runs + outcome;',
  '        balls++;',
  '    }',
  '',
  '    double runRate() {',
  '        if (balls == 0)',
  '            return 0;',
  '        return runs * 6.0 / balls;',
  '    }',
  '',
  '    void display() {',
  '        System.out.println("Score: " + runs + "/" + wickets);',
  '        System.out.println("Balls: " + balls);',
  '        System.out.println("Run rate: " + runRate());',
  '    }',
  '}',
  '',
  'public class OverTest {',
  '    public static void main(String[] args) {',
  '        Scanner sc = new Scanner(System.in);',
  '        Innings inn = new Innings();',
  '        for (int i = 1; i <= 6; i++) {',
  '            int outcome = sc.nextInt();',
  '            inn.ball(outcome);',
  '        }',
  '        inn.display();',
  '    }',
  '}',
);
Q('l_scorer', long({
  t: [1, 2], d: 4, c: 'application', marks: 15,
  stem: 'A school cricket scorer records one over of six balls. Define a class Innings with data members runs, wickets and balls (all int), and member methods: `ball(int outcome)` that adds the runs to runs if outcome is 0 or more, counts a wicket if outcome is -1 (any negative value), and adds 1 to balls in both cases; `double runRate()` that returns the runs per over (runs * 6.0 / balls, or 0 if no ball has been bowled); and `display()` that shows the score as runs/wickets, the balls bowled and the run rate. Write a class OverTest with a main method that creates an Innings object, reads the outcomes of six balls with a for loop, passes each to ball, and displays the result. Sample input: 4 0 1 -1 6 6.',
  model: prog({ src: srcInnings, stdin: '4 0 1 -1 6 6\n', also: ['0 0 0 0 0 0\n'], vars: [['runs, wickets, balls', 'int (data members)', 'state of the innings'], ['outcome', 'int (parameter / local)', 'result of one ball: runs, or a negative number for a wicket'], ['i', 'int', 'loop counter for the six balls'], ['inn', 'Innings', 'object created with new']] }),
  sol: 'ball is called six times on the same object, so its data members accumulate. A negative outcome counts a wicket instead of runs. runRate multiplies by 6.0 so that the division is not an integer division.',
  scheme: S15c('Class Innings: data members, ball with the wicket test, runRate, display', 'main: Scanner, object created with new, for loop reading six outcomes', 'ball called with each outcome; display called once', 'Output with clear messages', 'Variable description or comments'),
}));

// ---- recipe (t2, t3: an object returned from a method)
const srcRecipe = code(
  'import java.util.Scanner;',
  '',
  'class Recipe {',
  '    String name;',
  '    int servings;',
  '    double flour;',
  '',
  '    void accept(String n, int s, double f) {',
  '        name = n;',
  '        servings = s;',
  '        flour = f;',
  '    }',
  '',
  '    Recipe scaled(int target) {',
  '        Recipe r = new Recipe();',
  '        r.name = name;',
  '        r.servings = target;',
  '        r.flour = flour * target / servings;',
  '        return r;',
  '    }',
  '',
  '    void display() {',
  '        System.out.println(name + " for " + servings + " people needs " + flour + " g of flour");',
  '    }',
  '}',
  '',
  'public class RecipeTest {',
  '    public static void main(String[] args) {',
  '        Scanner sc = new Scanner(System.in);',
  '        Recipe home = new Recipe();',
  '        home.accept(sc.next(), sc.nextInt(), sc.nextDouble());',
  '        int target = sc.nextInt();',
  '        Recipe party = home.scaled(target);',
  '        home.display();',
  '        party.display();',
  '    }',
  '}',
);
Q('l_recipe', long({
  t: [2, 3], d: 4, c: 'application', marks: 15,
  stem: 'A canteen cook keeps recipes as objects. Define a class Recipe with data members name (String), servings (int) and flour (double, grams of flour for that many servings), and member methods: `accept(String n, int s, double f)` to give values to the data members; `Recipe scaled(int target)` that creates and returns a new Recipe object for target servings, with the same name and the flour changed in proportion; and `display()` that shows the recipe. Write a class RecipeTest with a main method that reads the name, servings and flour of a recipe and a target number of servings, calls scaled, and displays both the original and the new recipe. Sample input: Chapati 4 300 10.',
  model: prog({ src: srcRecipe, stdin: 'Chapati 4 300 10\n', also: ['Paratha 6 450 4\n'], vars: [['name, servings, flour', 'String, int, double (data members)', 'state of a recipe'], ['target', 'int', 'number of servings wanted'], ['r', 'Recipe (local in scaled)', 'the new object that is returned'], ['home, party', 'Recipe', 'references to the original and the scaled recipe']] }),
  sol: 'scaled creates a second object with new, copies the name, sets the new servings and the proportional flour, and returns its reference; the original object is not changed. Both references can then be used in main.',
  scheme: S15c('Class Recipe: data members, accept, scaled creating and returning a new object, display', 'main: Scanner, reading the values, object created with new', 'scaled called and the returned reference stored; both recipes displayed', 'Output with clear messages', 'Variable description or comments'),
}));

// ---- transit pass (t2, t3: an object passed to a method)
const srcPass = code(
  'import java.util.Scanner;',
  '',
  'class TransitPass {',
  '    String holder;',
  '    int zone;',
  '    int daysLeft;',
  '',
  '    void accept(String h, int z, int d) {',
  '        holder = h;',
  '        zone = z;',
  '        daysLeft = d;',
  '    }',
  '',
  '    void renew(int days) {',
  '        daysLeft = daysLeft + days;',
  '    }',
  '',
  '    boolean sameZone(TransitPass other) {',
  '        return zone == other.zone;',
  '    }',
  '',
  '    void display() {',
  '        System.out.println(holder + ": zone " + zone + ", " + daysLeft + " days left");',
  '    }',
  '}',
  '',
  'public class PassTest {',
  '    public static void main(String[] args) {',
  '        Scanner sc = new Scanner(System.in);',
  '        TransitPass p1 = new TransitPass();',
  '        TransitPass p2 = new TransitPass();',
  '        p1.accept(sc.next(), sc.nextInt(), sc.nextInt());',
  '        p2.accept(sc.next(), sc.nextInt(), sc.nextInt());',
  '        int extra = sc.nextInt();',
  '        p1.renew(extra);',
  '        p1.display();',
  '        p2.display();',
  '        if (p1.sameZone(p2))',
  '            System.out.println("Both passes are for the same zone");',
  '        else',
  '            System.out.println("The passes are for different zones");',
  '    }',
  '}',
);
Q('l_buspass', long({
  t: [2, 3], d: 3, c: 'application', marks: 15,
  stem: 'A town bus service issues zone passes. Define a class TransitPass with data members holder (String), zone (int) and daysLeft (int), and member methods: `accept(String h, int z, int d)` to give values to the data members; `renew(int days)` to add days to daysLeft; `boolean sameZone(TransitPass other)` that returns true if the zone of this pass and the zone of the pass received as the argument are equal; and `display()` that shows the pass. Write a class PassTest with a main method that reads the details of two passes and the number of days by which the first pass is renewed, renews it, displays both passes, and states whether they are for the same zone. Sample input: Anita 2 10 Rohan 3 25 15.',
  model: prog({ src: srcPass, stdin: 'Anita 2 10 Rohan 3 25 15\n', also: ['Meena 4 5 Dev 4 30 20\n'], vars: [['holder, zone, daysLeft', 'String, int, int (data members)', 'state of a pass'], ['other', 'TransitPass (parameter)', 'reference to the second pass, received by sameZone'], ['extra', 'int', 'days of renewal'], ['p1, p2', 'TransitPass', 'the two pass objects']] }),
  sol: 'sameZone receives the reference of the second pass, so it can read other.zone and compare it with the zone of the pass on which it was called. renew changes only the state of p1.',
  scheme: S15c('Class TransitPass: data members, accept, renew, sameZone using the other object, display', 'main: Scanner, two objects created with new, all values read', 'renew and sameZone called correctly; the result of sameZone tested', 'Output with clear messages', 'Variable description or comments'),
}));

// ---- plant pots (t2, t3: object variables returned from a method)
const srcPlant = code(
  'import java.util.Scanner;',
  '',
  'class PlantPot {',
  '    String plant;',
  '    double moisture;',
  '',
  '    void accept(String p, double m) {',
  '        plant = p;',
  '        moisture = m;',
  '    }',
  '',
  '    void water(double ml) {',
  '        moisture = moisture + ml / 10;',
  '    }',
  '',
  '    void display() {',
  '        System.out.println(plant + ": moisture " + moisture + " percent");',
  '    }',
  '}',
  '',
  'class Garden {',
  '    PlantPot drier(PlantPot x, PlantPot y) {',
  '        if (x.moisture < y.moisture)',
  '            return x;',
  '        return y;',
  '    }',
  '}',
  '',
  'public class GardenTest {',
  '    public static void main(String[] args) {',
  '        Scanner sc = new Scanner(System.in);',
  '        PlantPot a = new PlantPot();',
  '        PlantPot b = new PlantPot();',
  '        a.accept(sc.next(), sc.nextDouble());',
  '        b.accept(sc.next(), sc.nextDouble());',
  '        Garden g = new Garden();',
  '        PlantPot needy = g.drier(a, b);',
  '        needy.water(200);',
  '        System.out.println("Watered: " + needy.plant);',
  '        a.display();',
  '        b.display();',
  '    }',
  '}',
);
Q('l_plant', long({
  t: [2, 3], d: 4, c: 'application', marks: 15,
  stem: 'A school garden club keeps a moisture sensor in each pot. Define a class PlantPot with data members plant (String) and moisture (double, in percent), and member methods: `accept(String p, double m)` to give values to the data members; `water(double ml)` that raises the moisture by ml divided by 10; and `display()` that shows the plant and its moisture. Define a class Garden with a method `PlantPot drier(PlantPot x, PlantPot y)` that returns the reference of the pot with the lower moisture (y if they are equal). Write a class GardenTest with a main method that reads the details of two pots, finds the drier pot with drier, waters it with 200 ml, prints the name of the plant watered, and displays both pots. Sample input: Tulsi 42 Fern 28.',
  model: prog({ src: srcPlant, stdin: 'Tulsi 42 Fern 28\n', also: ['Cactus 12 Mint 55\n'], vars: [['plant, moisture', 'String, double (data members)', 'state of a pot'], ['x, y', 'PlantPot (parameters)', 'the two pots compared by drier'], ['a, b', 'PlantPot', 'the two pot objects made with new'], ['needy', 'PlantPot', 'reference returned by drier; it refers to one of a or b'], ['g', 'Garden', 'object used to call drier']] }),
  sol: 'drier returns a reference, not a copy, so watering needy changes the very pot that a or b refers to, and the later display shows it. The test uses < so that y is returned when the moisture is equal.',
  scheme: S15c('Classes PlantPot and Garden: data members, accept, water, display and drier returning a reference', 'main: Scanner, two objects and a Garden object created with new, values read', 'drier called, the returned reference used to water the pot', 'Output with clear messages', 'Variable description or comments'),
}));
