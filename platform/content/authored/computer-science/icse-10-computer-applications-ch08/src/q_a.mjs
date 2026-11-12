// ICSE 10 Computer Applications, ch08: Constructors. Topic t01 (definition, characteristics, use of a constructor).
// Every scenario is imagined for SOYL. Every output or error message quoted anywhere is produced by running the Java code.
import { Q, mcq, ar, tf, fb, match, ord, short, co } from '../../icse-10-computer-applications-ch01/src/lib.mjs';
import { F, ic, out, oline, distinct, mustFail, one } from './q_util.mjs';
import * as S from './snips.mjs';

const errWrongName = mustFail(S.cWrongName, 'constructor with another name');
const errCtorReturn = mustFail(S.cCtorReturn, 'return value in a constructor');
const errCallLater = mustFail(S.cCtorCallLater, 'constructor called as a method');
const errStatic = mustFail(S.cStaticCtor, 'static constructor');
const errNoNew = mustFail(S.cNoNew, 'creating without new');

// ================================================================ t01 definition, characteristics, use
Q('m_ctor_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which description of a constructor in Java is correct?',
  opts: distinct(['A member method with the same name as its class and no return type, executed automatically when an object is created', 'A member method that must be called by the programmer once for every object, after the object is created', 'A data member that stores the number of objects of the class', 'A method of the Scanner class that reads the values of the data members']),
  sol: 'A constructor is written inside the class, bears the class name, has no return type and is run by the new operator itself. Nothing has to call it, which rules out the description that needs a call from the programmer; it is also a method, not a data member, and it has no connection with Scanner.',
}));
Q('m_ctor_name', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'A class is declared as class Kite. Which name must its constructor have?',
  opts: distinct(['Kite', 'kite', 'KiteConstructor', 'new Kite']),
  sol: 'The constructor has exactly the name of the class, including the capital letter, because Java is case-sensitive. The word new is an operator used to create the object, not a part of the constructor name.',
}));
Q('m_ctor_header', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A class is named Clock. Which of the following is a valid header of its constructor?',
  opts: distinct([ic('Clock()'), ic('void Clock()'), ic('int Clock()'), ic('static Clock()')]),
  sol: `A constructor has no return type at all, not even void. With void or int in front, the line declares an ordinary method that merely has the same name as the class. A static constructor is rejected by javac with "${errStatic}".`,
}));
Q('m_ctor_when', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'At which moment is the constructor of a class executed?',
  opts: distinct(['When an object of the class is created with the operator new', 'When a reference variable of the class is declared', 'When the main method of the program ends', 'When any method of the object is called for the first time']),
  sol: `Declaring a reference such as Parcel p; creates no object, so no constructor runs. The constructor runs as the new operator builds the object: in a real run, the declaration, a print statement and then the creation give ${ic(oline(S.cDeclareOnly))}.`,
}));
Q('m_ctor_use', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'What is the main use of a constructor?',
  opts: distinct(['To initialise the data members of an object at the time of its creation', 'To release the memory of an object after it is used', 'To read values from the keyboard for the main method', 'To decide which method of the class is executed first']),
  sol: 'A constructor gives the data members of the new object their starting values. Memory is not released by a constructor, keyboard input is the work of Scanner, and the order of methods is decided by the statements written in main.',
}));
Q('m_ctor_count', mcq({
  t: 1, d: 3, c: 'application',
  stem: `A courier office program creates parcels as shown. How many times is the line Parcel created printed when this code runs?\n\n${F(S.cThreeParcels)}`,
  opts: distinct([ic(String(out(S.cThreeParcels).split('\n').length)), ic('1'), ic('0'), ic('2')]),
  sol: 'The default constructor runs once for every object that is created with new, so the three new expressions print the message three times. It does not run once per class, and it does not wait for a method call.',
}));
Q('m_decl_no_call', mcq({
  t: 1, d: 3, c: 'application',
  stem: `What does this program display?\n\n${F(S.cDeclareOnly)}`,
  opts: distinct([ic(oline(S.cDeclareOnly)), ic('Parcel created / Declared / Created'), ic('Declared / Created / Parcel created'), ic('Declared / Created')]),
  sol: 'The declaration Parcel p; only makes a reference variable and prints nothing. The word Declared comes first. The statement p = new Parcel(); then builds the object, which runs the constructor and prints its message, and the last println follows.',
}));
Q('m_default_values', mcq({
  t: 1, d: 2, c: 'application',
  stem: `A class Kiosk has no constructor. What do the four println statements display, in order?\n\n${F(S.cKioskDefaults)}`,
  opts: distinct([ic(oline(S.cKioskDefaults)), ic('0 / 0 / true / null'), ic('1 / 1.0 / true / Kiosk'), ic('null / null / null / null')]),
  sol: 'When no statement gives a data member a value, Java supplies the default value of its type: 0 for int, 0.0 for double, false for boolean and null for a String or any other object. This is what every object of such a class starts with.',
}));
Q('m_void_ctor', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: `A beginner wrote void in front of the constructor name of class Diya. What does the program display?\n\n${F(S.cVoidNew)}`,
  opts: distinct([ic(out(S.cVoidNew)), ic(oline(S.cDiyaOk)), ic('Diya ready / 0'), 'A compile-time error is reported']),
  sol: 'With void in front, Diya() is a normal method. It compiles without a complaint, but the new operator no longer calls it, so lit keeps its default value 0 and Diya ready is never printed. The correct constructor without void would have printed Diya ready first.',
}));

Q('ar_once', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'A-false-R-true',
  a: 'A constructor can be called again and again on the same object, for example p.Parcel(), to reset its data members.',
  r: 'A constructor is invoked automatically only once for an object, at the moment the object is created with new.',
  sol: `(A) is false: javac does not accept such a call and reports "${errCallLater}" because the constructor is not a method that can be called through the object. (R) is true and is the reason why a constructor cannot be used to reset an object later.`,
}));
Q('ar_void', ar({
  t: 1, d: 4, c: 'analysis', verdict: 'both-true-explains',
  a: 'If the word void is written before the name of the constructor, the code compiles but the constructor is not executed when an object is created.',
  r: 'A constructor must not have any return type, so a header that has one declares an ordinary method.',
  sol: `Running ${ic('new Diya()')} with void written before the name prints only ${ic(out(S.cVoidNew))}, so (A) is true. (R) is also true and it is exactly the reason: the line with void is an ordinary method that merely has the same name as the class, and new never calls an ordinary method.`,
}));

Q('tf_decl', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? The statement Parcel p; executes the constructor of the class Parcel.',
  sol: `The statement only declares a reference variable. The constructor runs when new creates the object: with a constructor that prints Parcel created, the statements Parcel p; then println("Declared"); then p = new Parcel(); then println("Created"); print ${ic(oline(S.cDeclareOnly))}.`,
}));
Q('tf_default_free', tf({
  t: 1, d: 1, c: 'recall', ans: true,
  stem: 'True or false? A constructor has no return type, not even void.',
  sol: 'Writing any return type, even void, would make the member an ordinary method.',
}));
Q('tf_static', tf({
  t: 1, d: 3, c: 'understanding', ans: false,
  stem: 'True or false? A constructor of a class may be declared with the keyword static.',
  sol: `javac gives "${errStatic}" because a constructor belongs to the object that is being created.`,
}));

Q('fb_ctor_name', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'A constructor has the same ___ as its class and has no ___ type.',
  acc: [['name'], ['return']],
  sol: 'The name must equal the class name, and no return type may be written, not even void.',
}));

Q('mt_ctor_terms', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each situation with what happens in Java.',
  pairs: [
    [ic('Parcel p;'), 'a reference is declared and no constructor runs'],
    [ic('new Parcel();'), 'a new object is created and its constructor runs'],
    [ic('void Parcel() { }'), 'an ordinary method that only looks like a constructor'],
    [ic('p.Parcel();'), `compile-time error: ${errCallLater}`],
  ],
  sol: 'Only new runs a constructor. A declaration creates no object, a header with void declares a method, and a constructor cannot be called through an object.',
}));

// ---- code output, t01
Q('co_default_msg', co({
  pre: 'A courier office program creates one parcel and shows it. Write the exact output.',
  t: 1, d: 2, c: 'application',
  code: S.cOneParcel,
  sol: 'The new operator runs the default constructor first. It sets the weight and the charge and prints its message. The show method then prints the two values, with the charge as a double.',
}));
Q('co_defaults', co({
  pre: 'The constructor of the class below assigns only two of the three data members. Write the exact output.',
  t: 1, d: 2, c: 'application',
  code: S.cKioskPartial,
  sol: 'The constructor runs when new creates the object and sets count to 4 and owner to Ravi. Nothing assigns price, so it keeps the default value of a double, 0.0.',
}));
Q('co_void_ctor', co({
  pre: 'Write the exact output of this program, in which void was written by mistake before the name Diya.',
  t: 1, d: 3, c: 'analysis',
  code: S.cVoidCall,
  sol: 'The new operator does not call a method, so nothing is printed at creation. The explicit call d.Diya() then runs the method: it prints its message and sets lit to 5, which the last println shows.',
}));
Q('co_two_refs', co({
  pre: 'Two reference variables of a class are used in this program. Write the exact output.',
  t: 1, d: 3, c: 'analysis',
  code: S.cTwoRefs,
  sol: 'Only one new expression is executed, so the constructor runs only once. The statement Parcel q = p; copies the reference, not the object, so q.show() shows the same object.',
}));
Q('co_err_name', co({
  pre: 'A beginner meant to write a constructor for the class Parcel but typed another name. State the compile-time error that javac reports for this program.',
  t: 1, d: 3, c: 'analysis', error: true,
  code: S.cWrongName,
  sol: 'The member Packet() has no return type and its name is not the class name, so javac reads it as a method whose return type is missing.',
}));
Q('co_err_return', co({
  pre: 'The constructor below tries to give a value back to main. State the compile-time error reported by javac.',
  t: 1, d: 3, c: 'analysis', error: true,
  code: S.cCtorReturn,
  sol: 'A constructor has no return type, so it cannot return a value; the statement return weight; is therefore rejected.',
}));

// ---- short answers, t01
Q('s_define', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: [25, 90],
  stem: 'What is a constructor? State any two characteristics of a constructor.',
  model: 'A **constructor** is a member method of a class that is executed automatically when an object of the class is created, and that is used to initialise the data members of the object.\n\nCharacteristics: (1) it has the same name as the class; (2) it has no return type, not even void; (3) it is invoked by the **new** operator, once for each object.',
  sol: 'One mark for the definition with its use and one mark for two characteristics.',
  scheme: [['Definition: special method run automatically at object creation, to initialise data members', 1], ['Any two characteristics: class name, no return type, invoked by new once per object', 1]],
}));
Q('s_void', short({
  t: 1, d: 3, c: 'analysis', marks: 2, wl: [25, 90],
  stem: 'A student writes void Diya() as the first member of class Diya, meaning it to be the constructor. State what Java makes of it and what the effect is on creating an object with new Diya().',
  model: `With **void** in front, the member is an ordinary method that only has the same name as the class; it is **not a constructor**. The new operator therefore does not call it, and the data members keep their default values.\n\n${F(S.cVoidNew)}\n\nThe program prints only ${ic(out(S.cVoidNew))}: the message of the method does not appear, and lit is 0.`,
  sol: 'One mark for saying it is an ordinary method, one mark for the effect on object creation.',
  scheme: [['It becomes an ordinary method, not a constructor (a constructor has no return type)', 1], ['new does not call it, so the data members keep default values and its statements do not run', 1]],
}));
Q('s_default_values', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: [25, 90],
  stem: 'A class has data members of the types int, double, boolean and String, and no constructor. State the value each data member holds after an object is created.',
  model: `Java gives each data member the default value of its type: **0** for int, **0.0** for double, **false** for boolean and **null** for String.\n\n${F(S.cKioskDefaults)}\n\nThe four printlns give ${ic(oline(S.cKioskDefaults))}.`,
  sol: 'Half a mark for each correct type and value.',
  scheme: [['int 0 and double 0.0', 1], ['boolean false and String null', 1]],
}));
Q('s_decl_new', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: [25, 90],
  stem: 'Explain, with a program, the difference between the statements Parcel p; and p = new Parcel(); with respect to the constructor.',
  model: `The statement **Parcel p;** only declares a reference variable; no object exists, so no constructor runs. The statement **p = new Parcel();** creates the object and runs the constructor.\n\n${F(S.cDeclareOnly)}\n\nOutput: ${ic(oline(S.cDeclareOnly))}; the message of the constructor appears only at the creation.`,
  sol: 'One mark for each statement with its effect.',
  scheme: [['Declaration: reference only, no object, constructor not executed', 1], ['new: creates the object and executes the constructor', 1]],
}));
