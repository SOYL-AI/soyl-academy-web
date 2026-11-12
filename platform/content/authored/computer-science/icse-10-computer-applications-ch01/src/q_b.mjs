// ICSE 10 Computer Applications, ch01 — question bank, part B: objects and classes (t04) and code-output items.
// Every output and compiler message below comes from running the code through lib.mjs.
import { Q, mcq, tf, fb, short, co, javaOut, javaErr } from './lib.mjs';
import { J, ic, code, out, outIc, outLine, errMsg, distinct, withBulb } from './h.mjs';
import { cCards, cBulbToggle, cAlias, cDefaults, cWallet, cTankPump, cPens, cCup, cErrSemi, cErrStatic, cErrInit, cTwoFans, cMsg } from './programs.mjs';

// ================================================================ t04 Objects and classes: multiple-choice
const cFanState = code('class Fan {', '    int speed;', '', '    void faster() {', '        speed++;', '    }', '}');
Q('m_state', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: `In the class below, what does the data member ${ic('speed')} represent for an object of the class?\n\n${J(cFanState)}`,
  opts: ['The state of the object', 'The behaviour of the object', 'A message sent to the object', 'The name of the class'],
  sol: 'Data members hold the state of an object, here how fast this fan is running. Behaviour is what the methods do (faster() here), and a message is a call to a method.',
}));
Q('m_blueprint', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'A class is best described as:',
  opts: ['a blueprint (template) from which objects are created', 'a single object that holds only one value', 'a Java keyword that starts a loop', 'a method that returns a number'],
  sol: 'A class defines the data members and methods that its objects will have; each object is made from it. A class is a user-defined data type, not a single object, keyword or method.',
}));
const nw = ['Bulb lamp = new Bulb();', 'Bulb lamp = Bulb();', 'Bulb lamp = new Bulb;', 'Bulb = new lamp();'];
javaOut(withBulb(nw[0]));
const nwErr = nw.slice(1).map((s) => errMsg(withBulb(s), { kind: 'compile' }));
Q('m_new', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'Which statement correctly creates an object of the class Bulb and stores its reference in the variable lamp?',
  opts: distinct(nw.map(ic)),
  sol: `The new operator followed by the class name and brackets creates the object. The other statements fail to compile: ${ic(nw[1])} has no new (${ic(nwErr[0])}), ${ic(nw[2])} has no brackets after the class name (${ic(nwErr[1])}), and ${ic(nw[3])} has no variable name and uses lamp as a class (${ic(nwErr[2])}).`,
}));
const eInit = errMsg(cErrInit, { kind: 'compile' });
Q('m_missing_new', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: `The class Fan is declared, but main only declares the variable f and calls a method on it, as shown. What happens when the program is compiled and run?\n\n${J(cErrInit)}`,
  opts: distinct([`Compile-time error: ${eInit}`, 'It compiles and prints done', 'It compiles, then stops at run time with an ArithmeticException', 'Compile-time error: \';\' expected']),
  sol: 'Declaring Fan f only creates a variable that can hold a reference. No object exists until new Fan() is executed, and the compiler sees that f has not been given a value before it is used.',
}));
const eStatic = errMsg(cErrStatic, { kind: 'compile' });
Q('m_static_ctx', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: `In the program below, add() is an ordinary method of the class Counter, and main calls it using the class name. What happens?\n\n${J(cErrStatic)}`,
  opts: distinct([`Compile-time error: ${eStatic}`, 'It prints done', 'Run-time error: ArrayIndexOutOfBoundsException', 'Compile-time error: cannot find symbol']),
  sol: 'A method that is not static works on the data of one object, so it must be called through an object, such as Counter c = new Counter(); c.add();. Calling it with the class name gives a compile-time error.',
}));
Q('m_two_objs', mcq({
  t: 4, d: 3, c: 'application',
  stem: `Two Fan objects are created in the program below. What is printed?\n\n${J(cTwoFans)}`,
  opts: distinct([outIc(cTwoFans), '`2 2`', '`3 3`', '`1 2`']),
  sol: 'Each object has its own copy of the data member speed. Object a is made faster twice, object b only once, so their states differ.',
}));
Q('m_msg', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'In object-oriented programming, message passing means:',
  opts: ['an object asking another object to act by calling one of its methods', 'printing a line of text with println', 'sending a file to the compiler', 'sending an email from a Java program'],
  sol: 'Objects communicate by calling each other\'s methods; the call is the message. Printing a line, handing a file to the compiler or sending an email are not what the term means.',
}));
Q('m_default', mcq({
  t: 4, d: 3, c: 'application',
  stem: `A Tag object is created and its data members are printed at once, before any value is assigned. What is printed?\n\n${J(cDefaults)}`,
  opts: distinct([outIc(cDefaults), '`1 1.0 true none`', '`0 0.0 false 0`', '`null null null null`']),
  sol: 'Data members get default values when the object is created: 0 for int, 0.0 for double, false for boolean and null for a reference such as a String.',
}));
Q('tf_copies', tf({
  t: 4, d: 3, c: 'understanding', ans: false,
  stem: 'True or false? When two objects of one class are created by two separate new statements, changing a data member of one object also changes it in the other.',
  sol: 'Each object created by its own new statement has its own copy of the data members, so its state changes independently.',
}));
Q('fb_blueprint', fb({
  t: 4, d: 1, c: 'recall',
  stem: 'A class is a ___ for objects, and every object created from it is an ___ of that class.',
  acc: [['blueprint', 'template'], ['instance']],
  sol: 'A class is a blueprint (template), and each object is an instance of the class.',
}));

// ================================================================ t04 short answer
Q('s_stmt_create', short({
  t: 4, d: 2, c: 'application', marks: 2,
  stem: 'Write a Java statement to create an object named lamp of the class Bulb.',
  model: `${J('Bulb lamp = new Bulb();')}\n\nThe left side declares the variable lamp of type Bulb, and new Bulb() creates the object and returns its reference.`,
  sol: 'Class name, variable name, assignment with new and the class name with brackets.',
  scheme: [['Declaration Bulb lamp', 1], ['Creation with new Bulb()', 1]],
}));
Q('s_call_stmt', short({
  t: 4, d: 3, c: 'application', marks: 2,
  stem: 'The object card of the class LibraryCard has a method issue() that takes the number of books as an int. Write a Java statement that asks the object to issue 2 books, and name the idea this call illustrates.',
  model: `${J('card.issue(2);')}\n\nThe call is a message sent to the object card, so the idea is message passing.`,
  sol: 'Object name, dot, method name with the argument; message passing.',
  scheme: [['card.issue(2); written correctly', 1], ['Message passing named', 1]],
}));
Q('s_class_obj', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: [25, 45],
  stem: 'Define a class and an object. How are they related?',
  model: 'A class is a blueprint or user-defined data type that describes the data members and methods common to a group of things. An object is an instance of the class, with its own state and behaviour. Many objects can be created from one class using new.',
  sol: 'One mark for each definition; the relation is stated in the model answer.',
  scheme: [['Class: blueprint or template with data members and methods', 1], ['Object: instance of a class, created with new', 1]],
}));
Q('s_msg', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: [20, 40],
  stem: 'What is message passing between objects? Give one example from an imagined school canteen.',
  model: 'Message passing is the way objects communicate: one object calls a method of another object. Example: a Bill object calls the method reduceStock() of a Samosa object each time a samosa is sold.',
  sol: 'One mark for the meaning and one for a suitable example.',
  scheme: [['Meaning: one object calls a method of another', 1], ['A correct example', 1]],
}));

// ================================================================ code-output items
Q('co_cards', co({
  pre: 'Two library cards are created in the imagined Greenfield Library program below, and one of them is issued a book more often. Write the exact output.',
  t: 4, d: 2, c: 'application', marks: 2,
  code: cCards,
  sol: 'a and b are separate objects with their own issued counts. a.issue() runs twice (2), b.issue() once (1), so show() prints each object\'s own value.',
}));
Q('co_bulb', co({
  pre: 'A bulb object in the imagined hostel-lighting program below is toggled three times. Write the exact output.',
  t: 4, d: 3, c: 'application', marks: 2,
  code: cBulbToggle,
  sol: 'The state starts as false. Each toggle() reverses it: true, false, true. The counter rises by one each time, so the final state is true and the count is 3.',
}));
Q('co_alias', co({
  pre: 'A packing-hall program makes one box and then gives it a second name. Write the exact output.',
  t: 4, d: 4, c: 'analysis', marks: 2,
  code: cAlias,
  sol: 'new Box() runs only once, so there is one object. y = x copies the reference, not the object, so x and y refer to the same box and y.side = 9 also changes what x.side shows.',
}));
const cSeat = code(
  'class Seat {',
  '    int row = 4;',
  "    char block = 'C';",
  '    double fare;',
  '    boolean booked;',
  '}',
  '',
  'public class Hall {',
  '    public static void main(String[] args) {',
  '        Seat s = new Seat();',
  '        s.fare = 120;',
  '        System.out.println(s.block + "" + s.row + " " + s.fare + " " + s.booked);',
  '    }',
  '}',
);
Q('co_defaults', co({
  pre: 'A seat object is created in the imagined Rangmanch auditorium program below. Two data members get values in the class, one is set in main and one is never assigned. Write the exact output.',
  t: 4, d: 3, c: 'application', marks: 2,
  code: cSeat,
  sol: 'row and block take the values written in the class (4 and C). fare is given the int 120, which is stored in the double as 120.0. booked is never assigned, so it keeps its default value false. The empty string after s.block makes + join text instead of adding the code of the char to the row.',
}));
Q('co_wallet', co({
  pre: 'A coin wallet in a pocket-money program receives two deposits and then reports a doubled total through a method that returns a value. Write the exact output.',
  t: 4, d: 3, c: 'application', marks: 2,
  code: cWallet,
  sol: 'coins becomes 5 and then 12. total() returns 12 * 2, which println prints.',
}));
Q('co_tank', co({
  pre: 'The imagined water plant below passes a Tank object to a Pump object, which drains it twice. Write the exact output.',
  t: 4, d: 4, c: 'application', marks: 2,
  code: cTankPump,
  sol: 'main sends the message run(t) to the pump. Inside run, the tank is drained by 15 and then by 10, so 40 becomes 25 and then 15. The same Tank object is changed, so main sees 15.',
}));
Q('co_pens', co({
  pre: 'Two pens with equal ink and a third name for the first pen are compared in the desk program below. Write the exact output.',
  t: 4, d: 4, c: 'analysis', marks: 2,
  code: cPens,
  sol: 'The operator == compares references. a and b are two different objects, even though their ink is equal, so the first value is false. c holds the same reference as a, so the second value is true.',
}));
Q('co_cup', co({
  pre: 'A tea cup program fills a cup with a method whose parameter has the same name as the data member. Write the exact output.',
  t: 4, d: 4, c: 'analysis', marks: 2,
  code: cCup,
  sol: 'Inside fill(), the name ml refers to the parameter, which hides the data member. The parameter becomes 130 but the object\'s data member is never changed, so c.ml still holds 50.',
}));
Q('co_msg', co({
  pre: 'A school bell object rings and stops several times in the program below; one method uses print and the other println. Write the exact output.',
  t: 4, d: 3, c: 'application', marks: 2,
  code: cMsg,
  sol: 'ring() uses print, so Ding and a space stay on the same line; stop() uses println, which ends the line. The calls ring, stop, ring, ring, stop give two lines.',
}));
Q('co_err_semi', co({
  pre: 'The Bulb program below was typed in the imagined computer lab with one slip. Write the compile-time error reported by the compiler and the line number.',
  error: true,
  t: 4, d: 2, c: 'analysis', marks: 2,
  code: cErrSemi,
  sol: 'The statement System.out.println(b.watts) does not end with a semicolon. Every Java statement ends with a semicolon, so the compiler stops there.',
}));
const cErrStatic2 = code(
  'public class Lamp {',
  '    int hours;',
  '',
  '    void burn() {',
  '        hours = hours + 2;',
  '    }',
  '',
  '    public static void main(String[] args) {',
  '        Lamp.burn();',
  '        System.out.println("done");',
  '    }',
  '}',
);
Q('co_err_static', co({
  pre: 'A student calls the method burn() of the class Lamp through the class name, as below. Write the compile-time error reported by the compiler and the line number.',
  error: true,
  t: 4, d: 3, c: 'analysis', marks: 2,
  code: cErrStatic2,
  sol: 'burn() is not static, so it belongs to an object. The fix is to create an object, Lamp x = new Lamp(); and call x.burn();.',
}));
const cErrInit2 = code(
  'class Locker {',
  '    int number;',
  '',
  '    void open() {',
  '        System.out.println("Locker " + number + " open");',
  '    }',
  '}',
  '',
  'public class Gym {',
  '    public static void main(String[] args) {',
  '        Locker k;',
  '        k.number = 7;',
  '        k.open();',
  '    }',
  '}',
);
Q('co_err_init', co({
  pre: 'In the gym-locker program below the variable k is declared but the object is never made. Write the first compile-time error reported by the compiler and its line number.',
  error: true,
  t: 4, d: 3, c: 'analysis', marks: 2,
  code: cErrInit2,
  sol: 'k holds no reference yet. Writing k = new Locker(); before using it fixes the error.',
}));
