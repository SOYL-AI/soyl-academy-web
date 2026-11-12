// ICSE 10 Computer Applications, ch10: Encapsulation. Topic t01 (access specifiers, encapsulation with private data and public methods).
// Every scenario is imagined for SOYL. Every output or error message quoted anywhere is produced by running the Java code.
import { Q, mcq, ar, tf, fb, match, ord, short, co } from '../../icse-10-computer-applications-ch01/src/lib.mjs';
import { code, F, ic, ev, out, oline, distinct, mustFail, mustCompile, two } from './q_util.mjs';
import * as S from './snips.mjs';

const gullakClass = ['class Gullak {', ...S.GULLAK.map((l) => '    ' + l), '}'].join('\n');
const errPriv = mustFail(S.cPrivRead, 'private read');
const errPrivCall = mustFail(S.cPrivCall, 'private method');
const errNoSetter = mustFail(S.cBadgeSet, 'no setter');
const errTopPrivate = mustFail(S.cTopPrivate, 'top-level private');
const errTopProtected = mustFail(S.cTopProtected, 'top-level protected');
const errTopStatic = mustFail(S.cTopStatic, 'top-level static');
mustCompile(S.cDefRead, 'default member read in the same package');
mustCompile(S.cProtRead, 'protected member read in the same package');
mustCompile(S.cPubRead, 'public member read');
mustCompile(S.cTopPublic, 'public top-level class');

// ================================================================ t01 access specifiers and encapsulation
Q('m_encap_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which statement best describes encapsulation in Java?',
  opts: distinct(['Binding the data and the methods that use it into one class, and protecting the data from direct access by other classes', 'Creating a new class from an existing class so that it reuses the members of the old one', 'Using one method name for several different tasks with different parameter lists', 'Showing only the essential features of an object and leaving out the background details']),
  sol: 'Encapsulation puts data and methods together in one unit, the class, and controls how the data is reached. The other statements describe inheritance, method overloading (polymorphism) and data abstraction.',
}));
Q('m_private_where', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'A data member of a class is declared with the access specifier private. Where can it be accessed directly?',
  opts: distinct(['Only inside the class in which it is declared', 'In every class of the same package', 'In its own class and in all its subclasses only', 'In every class of the program']),
  sol: `A private member belongs to its own class alone. A different class that tries to use it is stopped by the compiler with "${errPriv}".`,
}));
Q('m_default_where', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A data member is declared with no access specifier at all. Which classes can access it directly?',
  opts: distinct(['The classes of the same package, including its own class', 'Only its own class', 'Every class of every package', 'Its own class and the subclasses in other packages only']),
  sol: `With no specifier a member has default (package) access. In the program with the class Gullak, a second class of the same file, hence the same package, reads the member notes and displays ${ic(out(S.cDefRead))}.`,
}));
Q('m_protected_pkg', mcq({
  t: 1, d: 3, c: 'application',
  stem: `The data member seals of the class Gullak is protected. The class Check is another class of the same package. What does this program display?\n\n${F(S.cProtRead)}`,
  opts: distinct([ic(out(S.cProtRead)), 'A compile-time error, because a protected member cannot be used outside its own class', 'Nothing is displayed', ic('0')]),
  sol: 'A protected member can be used by the classes of the same package and by the subclasses of its class, even in other packages. Check is in the same package, so the compiler accepts the access. A single file cannot show the case of a subclass in another package, but the rule is part of the visibility table.',
}));
Q('m_private_err', mcq({
  t: 1, d: 2, c: 'application',
  stem: `A beginner writes the class Check to read the private data member coins of the class Gullak. What happens when the code is compiled?\n\n${F(S.cPrivRead)}`,
  opts: distinct([`Compile-time error: ${errPriv}`, 'The value 40 is displayed', 'The program compiles but stops with a run-time error', 'The value 0 is displayed']),
  sol: 'The rule is checked by the compiler, before the program runs. A private member cannot be used outside its own class, even though the other class sits in the same file and the same package.',
}));
const okTotal = ic('System.out.println(g.total());');
mustCompile(S.gul('Gullak g = new Gullak();', 'System.out.println(g.total());'));
Q('m_private_call', mcq({
  t: 1, d: 3, c: 'application',
  stem: `The class Gullak is shown below. Which one of the following statements, written in the main method of another class of the same package after ${ic('Gullak g = new Gullak();')}, compiles without error?\n\n${F(gullakClass)}`,
  opts: distinct([okTotal, ic('System.out.println(g.coins);'), ic('g.audit();'), ic('g.coins = 100;')]),
  sol: `The method total() is public, so it is available to every class. The other three statements break the private rule: reading coins gives "${errPriv}", writing coins gives the same message, and the call of audit() gives "${errPrivCall}".`,
}));
Q('m_which_specifier', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A class Account must let other classes read and change its balance only through methods. Which pair of declarations follows the principle of encapsulation?',
  opts: distinct(['The data member balance is private and the methods that read and change it are public', 'The data member balance is public and the methods that read and change it are private', 'The data member balance is private and the methods that read and change it are private', 'The data member balance is public and there are no methods for it']),
  sol: 'Private data cannot be touched directly from outside, and public methods are the doors through which the outside world may ask for a read or a change. If the methods were private too, no other class could use the data at all.',
}));
Q('m_thermo_trace', mcq({
  t: 1, d: 3, c: 'application',
  stem: `The weather club of an imagined school stores a reading in a Thermo object, which accepts only values from -10 to 55. What does this program display?\n\n${F(S.cThermo([31.5, 80]))}`,
  opts: distinct([ic(oline(S.cThermo([31.5, 80]))), ic(oline(S.cThermo([31.5]))), ic(oline(S.cRaw)), ic(oline(S.cThermo([80])))]),
  sol: 'The first call stores 31.5. The second value, 80, is outside the range, so the setter prints the Rejected message and leaves the stored reading unchanged. The getter then returns the old value.',
}));
Q('m_public_field', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: `The class Raw keeps its reading as a public data member. What does this program show?\n\n${F(S.cRaw)}`,
  opts: distinct(['Any class can store an unchecked value, because no method stands in between to validate it', 'The value 80 is rejected as it is out of range', 'The program does not compile, because a public data member cannot be assigned', 'The value is stored but is displayed as 0.0']),
  sol: `The program displays ${ic(out(S.cRaw))}: whatever any class writes into a public data member is simply accepted. With a private member and a setter that checks the range, the same value would be rejected.`,
}));
Q('m_same_class', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: `Inside the method beats, the class Stall reads the private member sales of another Stall object. What does this program display?\n\n${F(S.cStall)}`,
  opts: distinct([ic(out(S.cStall)), ic('false'), 'A compile-time error, because other.sales belongs to a different object', 'A run-time error, because other has no access to sales']),
  sol: `Private access is decided by the class, not by the object: any code written inside the class Stall may use the sales of every Stall object. The method call a.beats(b) compares 120 with 90 and gives ${ic(out(S.cStall))}. Code outside the class is still refused: the statement a.sales in Check gives "${mustFail(S.cStallOutside)}".`,
}));
Q('m_readonly', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'How can a class let other classes read a data member but not change it?',
  opts: distinct(['Declare the data member private and write only a getter method for it', 'Declare the data member public and write only a getter method for it', 'Declare the data member private and write only a setter method for it', 'Declare the data member protected and write no methods for it']),
  sol: `With the member private and only a getter present, other classes can read the value through the getter and have no way to write it: a call of a setter that does not exist gives "${errNoSetter}". A public or protected member could still be assigned directly by classes of the same package.`,
}));
Q('m_toplevel', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'Which one of these modifiers may be written before the header of a top-level class, that is, a class that is not inside another class?',
  opts: distinct(['public', 'private', 'protected', 'static']),
  sol: `A top-level class is either public or has default access. The compiler rejects the others: private gives "${errTopPrivate}", protected gives "${errTopProtected}" and static gives "${errTopStatic}".`,
}));
Q('m_encap_benefit', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'What is the chief advantage of keeping the data members of a class private and changing them through public methods?',
  opts: distinct(['Each method can check a new value before it is stored', 'The data members take up less memory', 'The program runs faster because private members are kept in a cache', 'Any class can read and change the data members without a method']),
  sol: 'When the only way in is a method, the class controls what is stored, for example by refusing a negative amount. Memory use and speed are not affected, and free access for every class is exactly what encapsulation prevents.',
}));
Q('m_accessor', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'A public method returns the value of a private data member of its class without changing it. What is such a method called?',
  opts: distinct(['An accessor (getter) method', 'A mutator (setter) method', 'A constructor', 'A main method']),
  sol: `An accessor only reads and returns a value, as getBadgeNo() does in the program that displays ${ic(out(S.cBadgeGet))}. A mutator changes a value, and a constructor sets the initial values when an object is created.`,
}));

Q('ar_private', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'A statement in the class Check that assigns a value to the private data member coins of the class Gullak is rejected by the compiler.',
  r: 'A private member can be accessed only by the code written inside the class in which it is declared.',
  sol: `The assignment g.coins = 100 gives "${mustFail(S.cPrivWrite)}", so (A) is true. (R) is the access rule itself and is the reason for that error.`,
}));
Q('ar_protected', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'A protected data member can be read by another class of the same package.',
  r: 'A protected member can be accessed only inside its own class and its subclasses, and by no other class.',
  sol: `Reading g.seals from the class Check, which is in the same package, compiles and displays ${ic(out(S.cProtRead))}, so (A) is true. (R) is false: it leaves out the classes of the same package, which also get access to a protected member.`,
}));
Q('ar_encap_levels', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'Making the data members of a class private stops other classes from storing invalid values in them by direct assignment.',
  r: 'Java provides four levels of access for the members of a class: private, default, protected and public.',
  sol: 'Both statements are true. (R) is only a list of the access levels. It is the rule that private members are not reachable from other classes that prevents direct assignment, so (R) does not explain (A).',
}));

Q('tf_default_pkg', tf({
  t: 1, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? A data member declared with no access specifier can be used directly by another class of the same package.',
  sol: `Default (package) access is open to the classes of the same package. The class Check of the same file reads the member notes and the program displays ${ic(out(S.cDefRead))}.`,
}));
Q('tf_private_object', tf({
  t: 1, d: 3, c: 'analysis', ans: false,
  stem: 'True or false? A private data member can be used only by the object that owns it: a method of the class cannot read the private member of another object of the same class.',
  sol: `Private access is class-wide. In the Stall program the method beats reads other.sales of a different object and the program runs and displays ${ic(out(S.cStall))}.`,
}));

Q('fb_encap', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Binding the data and the methods into a class and protecting the data from direct access from outside is called ___.',
  acc: [['encapsulation', 'data hiding']],
  sol: 'The principle is encapsulation (the protection of the data is also called data hiding).',
}));
Q('fb_default', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'A member declared with no access specifier has ___ access, also called package access.',
  acc: [['default']],
  sol: 'No keyword is written for this level: the member gets default access.',
}));

Q('mt_spec', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each access specifier with the places from which a member may be accessed.',
  pairs: [
    [ic('private'), 'only inside its own class'],
    ['no specifier (default)', 'its own class and the classes of the same package'],
    [ic('protected'), 'the same package, and the subclasses of its class'],
    [ic('public'), 'any class of any package'],
  ],
  sol: 'The access widens from private to public. Default access adds the package, protected adds subclasses, and public opens the member to all.',
}));
Q('ord_encap', ord({
  t: 1, d: 3, c: 'application',
  stem: 'A student plans to write a class that keeps a value private but safe to use. Arrange the steps in the order in which they are carried out.',
  items: ['Declare the data member with the access specifier private', 'Write a public constructor or setter that checks a value before storing it', 'Write a public getter that returns the stored value', 'In other classes, create an object and use only its public methods'],
  sol: 'The private data must exist first. Then the public methods that guard it are written, and only after that can other classes use the object through those methods.',
}));

// ---- code output, t01
Q('co_thermo', co({
  pre: 'A school weather club logs readings with the class Thermo. Write the exact output.',
  t: 1, d: 3, c: 'application',
  code: S.cThermo([-14, 22.5, 61]),
  sol: 'The range accepted by the setter is -10 to 55 inclusive. The first and third values are outside it and are rejected with the message, while 22.5 is stored and returned by the getter. Note that a rejected value is printed as a double.',
}));
Q('co_total', co({
  pre: 'A co-operative keeps its savings in a Gullak. The class Check changes the default member notes. Write the exact output.',
  t: 1, d: 2, c: 'application',
  code: S.cTotalAfter,
  sol: 'The member notes is accessible in the same package and changes from 5 to 8. The public method total() then returns coins + notes * 10, that is 40 + 80.',
}));
const cStall2 = two('Stall', S.STALL, 'Market', ['Stall a = new Stall(60);', 'Stall b = new Stall(90);', 'System.out.println(a.beats(b));', 'System.out.println(b.beats(a));']);
Q('co_stall', co({
  pre: 'Two stalls of an imagined fair record their sales. Write the exact output.',
  t: 1, d: 4, c: 'analysis',
  code: cStall2,
  sol: 'The method beats may read the private sales of the other object because it is written inside the class Stall. 60 > 90 is false, and 90 > 60 is true.',
}));
Q('co_piggy', co({
  pre: 'A Piggy object collects the savings of a school group. Write the exact output.',
  t: 1, d: 3, c: 'application',
  code: S.cPiggy,
  sol: 'The setter-like method deposit ignores an amount that is not positive, so -40 is skipped silently. The stored amount is 250 + 100.',
}));
Q('co_err_private', co({
  pre: 'The class Check tries to change a data member of Gullak. State the error reported by the compiler.',
  t: 1, d: 2, c: 'application', error: true,
  code: S.cPrivWrite,
  sol: 'A private data member can be used only inside its own class. The assignment in another class is rejected at compile time, so no output is produced.',
  scheme: [['Kind of error (compile-time) and its line', 1], ['Reason: the member is private to the class Gullak', 1]],
}));
Q('co_err_readonly', co({
  pre: 'A security gate calls a method on a Badge object. State the error reported by the compiler.',
  t: 1, d: 3, c: 'analysis', error: true,
  code: S.cBadgeSet,
  sol: 'The class Badge has a getter but no setter, so the method setBadgeNo does not exist. This is how a read-only attribute is built: private data with only an accessor.',
  scheme: [['Kind of error (compile-time) and its line', 1], ['Reason: no such method is defined in the class', 1]],
}));

// ---- short answers, t01
Q('s_encap', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: [30, 100],
  stem: 'What is encapsulation? How do private data members and public methods achieve it?',
  model: `**Encapsulation** is the binding of data and the methods that work on it into a single unit, the class, while the data is protected from direct access by other classes (data hiding).\n\nThe data members are declared **private**, so other classes cannot touch them. **Public** methods (getters, setters) are the only way in, and each can check a value first. In the Thermo class a reading of 80 is refused by the setter, so the object always holds a valid value (the program that sets 31.5 and then 80 shows ${ic(oline(S.cThermo([31.5, 80])))}).`,
  sol: 'One mark for the definition, one for the role of private data and public methods.',
  scheme: [['Definition: data and methods bound in a class, data protected from outside', 1], ['Private data members with public methods that validate values', 1]],
}));
Q('s_access', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: [25, 100],
  stem: 'State where a member declared private, with no specifier (default), protected and public can be accessed.',
  model: '| Access specifier | Can be accessed in |\n|---|---|\n| private | only the class in which it is declared |\n| default (no specifier) | the same class and the classes of the same package |\n| protected | the same class, the same package and the subclasses in other packages |\n| public | every class of every package |',
  sol: 'A half mark for each correct specifier.',
  scheme: [['private and default stated correctly', 1], ['protected and public stated correctly', 1]],
}));
const cSetAge = (vals) => two('Enrol', ['private int age;', 'public void setAge(int a) {', '    if (a >= 5 && a <= 18)', '        age = a;', '    else', '        System.out.println("Invalid age");', '}', 'public int getAge() {', '    return age;', '}'], 'Desk', ['Enrol e = new Enrol();', ...vals.map((v) => `e.setAge(${v});`), 'System.out.println(e.getAge());']);
Q('s_setter', short({
  t: 1, d: 3, c: 'application', marks: 2,
  stem: 'A class has a private data member age of type int. Write a public method setAge(int a) that stores a in age only if a is from 5 to 18 (both included), and displays Invalid age otherwise.',
  model: `${F('private int age;', '', 'public void setAge(int a) {', '    if (a >= 5 && a <= 18)', '        age = a;', '    else', '        System.out.println("Invalid age");', '}')}\n\nTried in a program with the calls setAge(12) and then setAge(30), the output is ${ic(oline(cSetAge([12, 30])))}: the second call leaves age unchanged.`,
  sol: 'The condition joins both limits with &&, the valid case stores the value and the else part gives the message.',
  scheme: [['Correct header with the parameter and the condition a >= 5 && a <= 18', 1], ['Value stored in age when valid; message displayed otherwise', 1]],
}));
Q('s_private_err', short({
  t: 1, d: 3, c: 'analysis', marks: 2, wl: [30, 100],
  stem: 'A clerk writes badge.badgeNo = 9; in another class, where badgeNo is a private data member of the class Badge. Why does the compiler report an error, and how can the class be changed so that the number can be updated safely?',
  model: `The compiler reports "${mustFail(S.cBadgeDirect)}" because a private member can be used only inside the class that declares it.\n\nThe class should offer a public setter, for example ${ic('public void setBadgeNo(int n)')}, whose body checks n (say, n > 0) and then stores it. Other classes then call b.setBadgeNo(9) instead of assigning to the member.`,
  sol: 'One mark for the reason with the rule of private access, one for the public setter with a check.',
  scheme: [['Reason: private members are not accessible outside the class', 1], ['Public setter method with validation as the way to change the value', 1]],
}));
Q('s_default_protected', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: [25, 90],
  stem: 'Distinguish between default (package) access and protected access of a member.',
  model: '| Default (no specifier) | protected |\n|---|---|\n| Accessible in the same class and in the classes of the same package | Accessible in the same class, in the classes of the same package and in the subclasses of its class |\n| A subclass in another package cannot use it | A subclass in another package can use it (through inheritance) |\n| No keyword is written | Written with the keyword protected |',
  sol: 'One mark for the extent of each access with the difference, one mark for the subclass rule.',
  scheme: [['Default: own class and same package only', 1], ['Protected: also the subclasses, even in other packages', 1]],
}));
Q('s_accessor_mutator', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: [25, 90],
  stem: 'Distinguish between an accessor method and a mutator method. Name one of each in a class that keeps a private data member rupees.',
  model: `An **accessor** (getter) returns the value of a private data member and does not change it, for example ${ic('getRupees()')}. A **mutator** (setter) changes the value of a private data member, often after a check, for example ${ic('deposit(int amt)')}. In the Piggy program, deposits of 250, -40 and 100 followed by getRupees() display ${ic(out(S.cPiggy))}.`,
  sol: 'One mark for each kind of method, with its example.',
  scheme: [['Accessor: reads and returns the value; example', 1], ['Mutator: changes the value, usually with validation; example', 1]],
}));
