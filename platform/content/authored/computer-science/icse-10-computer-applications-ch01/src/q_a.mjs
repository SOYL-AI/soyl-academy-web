// ICSE 10 Computer Applications, ch01 — question bank, part A: approaches, principles and Java basics (t01-t03).
// Every scenario, class and name is written by SOYL (imagined shops, schools and classes). Any output or compiler
// message stated in an item comes from running the code through lib.mjs.
import { Q, mcq, ar, tf, fb, match, ord, short } from './lib.mjs';
import { J, ic, outLine, distinct } from './h.mjs';
import { cOverload } from './programs.mjs';

// ================================================================ t01 Procedure-oriented versus object-oriented programming
Q('m_pop_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In procedure-oriented programming a program is mainly organised as:',
  opts: ['a set of procedures (functions) that work on data', 'a set of objects that hide their own data', 'a hierarchy of classes only', 'a set of web pages that run in a browser'],
  sol: 'A procedure-oriented program is a list of procedures or functions called in order. Objects that hide their data belong to the object-oriented approach, a class hierarchy is only one tool of that approach, and browser pages have nothing to do with how code is organised.',
}));
Q('m_pop_limit', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which of these is a limitation of procedure-oriented programming?',
  opts: ['Data is open to every function, so a wrong change made in one function can damage the whole program', 'The program cannot be divided into functions', 'Loops and decisions cannot be used', 'The program can run only on one make of computer'],
  sol: 'In a procedure-oriented program data is usually shared and not protected. Functions are exactly what the approach uses, and it has loops and decisions like any other style. It is also not tied to one make of computer.',
}));
Q('m_oop_adv', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which of these is an advantage of object-oriented programming?',
  opts: ['Data is kept inside objects, so it is safer from accidental change', 'Every function can change every data item directly', 'The whole program is written as one long list of steps', 'Objects are not allowed to have methods'],
  sol: 'Hiding data inside objects protects it from outside changes. Free access by every function and one long list of steps describe the procedure-oriented style, and an object without methods would have no behaviour.',
}));
Q('m_oop_approach', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'The object-oriented approach to designing a program is:',
  opts: ['bottom-up: objects are designed first and combined to make the program', 'top-down: the main task is split into smaller and smaller functions', 'sideways: the classes are written only after the program is finished', 'neither: the object-oriented approach has no design method'],
  sol: 'Object-oriented design starts from the objects (the small parts) and builds upwards. The top-down splitting of the main task is the procedure-oriented approach.',
}));
Q('c_pop', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'For the imagined shop Lakshmi Stores a programmer writes the functions addStock(), sell() and report(). All three read and change the same global arrays of item names and quantities. Which approach has been used?',
  opts: ['Procedure-oriented programming', 'Object-oriented programming', 'Inheritance-based programming', 'Applet programming'],
  sol: 'The program is a set of functions that share global data, which is the procedure-oriented approach. An object-oriented design would put the item data and its methods together in a class such as Item or Stock.',
}));
Q('tf_topdown', tf({
  t: 1, d: 2, c: 'recall', ans: false,
  stem: 'True or false? Object-oriented programming follows a top-down approach, while procedure-oriented programming follows a bottom-up approach.',
  sol: 'The two are the wrong way round: procedure-oriented programming is top-down and object-oriented programming is bottom-up.',
}));
Q('ar_pop_data', ar({
  t: 1, d: 3, c: 'understanding', verdict: 'both-true-explains',
  a: 'In a procedure-oriented program the data is more exposed to accidental change than in an object-oriented program.',
  r: 'In a procedure-oriented program the data is usually shared by many functions, while in an object-oriented program an object keeps its data and changes it through its own methods.',
  sol: 'Both statements are true and R explains A: because many functions can reach the shared data, any of them can change it by mistake, whereas an object guards its data behind its methods.',
}));
Q('s_pop_limits', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: [25, 45],
  stem: 'State two limitations of procedure-oriented programming.',
  model: 'Data is shared by many functions and is not protected, so a function can change it by mistake. Because of this, a change in the data or in one function may force changes in many other functions, and real-world things are hard to model as separate procedures.',
  sol: 'Any two of: unprotected shared data; changes ripple through many functions; poor modelling of real-world entities.',
  scheme: [['First limitation stated clearly', 1], ['Second limitation stated clearly', 1]],
}));
Q('s_oop_adv', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: [25, 45],
  stem: 'State two advantages of object-oriented programming over procedure-oriented programming.',
  model: 'Data is hidden inside objects, so it is protected from accidental change. A class can be reused and extended through inheritance, so new programs need less new code, and the program is easier to maintain because it is built from independent objects.',
  sol: 'Any two of: data hiding; reuse through inheritance; easier maintenance; closer to real-world modelling.',
  scheme: [['First advantage stated clearly', 1], ['Second advantage stated clearly', 1]],
}));

// ================================================================ t02 Principles of OOP
Q('m_encap', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Binding data and the methods that use it into a single unit called a class, and restricting access to that data from outside, is called:',
  opts: ['encapsulation', 'inheritance', 'polymorphism', 'compilation'],
  sol: 'This is the definition of encapsulation. Inheritance is one class acquiring the properties of another, polymorphism is one name with many forms, and compilation is the translation of source code.',
}));
Q('m_abstraction', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'A passenger taps a travel card on a gate and the gate opens. The passenger does not know how the reader checks the balance. Which OOP principle does this best illustrate?',
  opts: ['Data abstraction', 'Inheritance', 'Polymorphism', 'Garbage collection'],
  sol: 'The passenger sees only the essential feature (tap and enter) while the working of the reader stays hidden, which is data abstraction. Nothing here is a class acquiring features, one name doing several jobs, or memory being freed.',
}));
Q('m_inherit', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'The imagined class ElectricBike takes over all the data members and methods of the class Bike and adds a battery level. Which OOP principle is used?',
  opts: ['Inheritance', 'Data abstraction', 'Method overloading', 'Message passing'],
  sol: 'ElectricBike acquires the properties of Bike, so Bike is the superclass and ElectricBike the subclass: this is inheritance. Overloading needs several methods with one name, and abstraction is about hiding details.',
}));
Q('m_poly', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which of these is an example of polymorphism in Java?',
  opts: ['Several methods of one class that share a name but have different parameter lists', 'Keeping the data members of a class private', 'A class acquiring the methods of another class', 'Compiling a source file to a class file'],
  sol: 'Polymorphism means one name with many forms, and method overloading is the example in this syllabus. Private data members show encapsulation, acquiring the methods of another class is inheritance, and compiling has nothing to do with the principles.',
}));
const sOverload = outLine(cOverload);
Q('m_overload_out', mcq({
  t: 2, d: 3, c: 'application',
  stem: `The class Printer has three methods named show(), as in the program below. Each call in main chooses the version that matches its arguments. What is printed (lines are separated by " / " in the options)?\n\n${J(cOverload)}`,
  opts: distinct([sOverload, '`number 4 / number four / sum 9`', '`number 4 / text four / number 5`', '`text 4 / text four / sum 9`']),
  sol: 'The call with one int picks show(int), the call with a String picks show(String), and the call with two ints picks show(int, int), which prints their sum, 9. The compiler decides by the number and types of the arguments.',
}));
Q('c_poly', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'A teacher says: "The same name area() can be used to find the area of a circle from one value and of a rectangle from two values." Which OOP principle is she describing?',
  opts: ['Polymorphism', 'Encapsulation', 'Inheritance', 'Data hiding only'],
  sol: 'One method name serving several forms, chosen by the arguments, is polymorphism (method overloading). Encapsulation is binding data and methods in a class, and inheritance is acquiring the properties of another class.',
}));
Q('m_notprinciple', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Which of these is NOT a principle of object-oriented programming?',
  opts: ['Iteration', 'Inheritance', 'Encapsulation', 'Polymorphism'],
  sol: 'Iteration (repeating statements with a loop) is a programming construct, not an OOP principle. Data abstraction, encapsulation, inheritance and polymorphism are the principles.',
}));
Q('m_private_which', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'A class keeps its data members private and gives public methods to read and change them. Which principle is mainly at work?',
  opts: ['Encapsulation, because data and methods are bound in one class with controlled access', 'Inheritance, because the class acquires data from another class', 'Polymorphism, because the methods have different names', 'Message passing, because no object calls any method'],
  sol: 'Private data reached only through the class\'s own methods is encapsulation. No other class supplies data here (not inheritance), the methods are not one name in many forms, and outside code reaches the data by calling methods, which is message passing rather than its absence.',
}));
Q('tf_abs_enc', tf({
  t: 2, d: 3, c: 'understanding', ans: false,
  stem: 'True or false? Data abstraction and encapsulation mean exactly the same thing.',
  sol: 'They are related but different: abstraction shows only the essential features and hides the details, while encapsulation binds data and methods into one class and restricts access to the data.',
}));
Q('ar_abs_enc', ar({
  t: 2, d: 3, c: 'understanding', verdict: 'A-false-R-true',
  a: 'Encapsulation and data abstraction are two names for the same idea.',
  r: 'Encapsulation binds data and methods into one class and restricts access, while data abstraction presents only the essential features and hides the details.',
  sol: 'A is false because the two ideas differ. R is true: it states the separate meaning of each principle.',
}));
Q('fb_inherit', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'In inheritance, the class that acquires the properties is the ___ class and the class that gives them is the ___ class.',
  acc: [['subclass', 'sub', 'derived', 'child'], ['superclass', 'super', 'base', 'parent']],
  sol: 'The subclass (derived or child class) inherits from the superclass (base or parent class).',
}));
Q('c_match', match({
  t: 2, d: 2, c: 'application',
  stem: 'Match each situation in an imagined bicycle-repair shop with the OOP principle it shows.',
  pairs: [
    ['A customer asks for a repair and sees only the receipt, not the repair steps', 'Data abstraction'],
    ['The tool kit and the instructions for using it are kept in one locked box', 'Encapsulation'],
    ['The new tandem bike model reuses the frame design of the standard model', 'Inheritance'],
    ['One word, service, means one job for a bicycle and a different job for a rickshaw', 'Polymorphism'],
  ],
  sol: 'Seeing only the result is abstraction; binding the tools and instructions together with limited access is encapsulation; reusing a design is inheritance; one name with different forms is polymorphism.',
}));
Q('s_encap_def', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: [20, 40],
  stem: 'Define encapsulation and give one original example from daily life.',
  model: 'Encapsulation is the binding of data and the methods that work on it into one unit, the class, and restricting access to the data from outside. Example: a medicine capsule keeps its ingredients sealed inside one shell.',
  sol: 'One mark for the definition, one for a correct example.',
  scheme: [['Definition: data and methods bound in a class, access restricted', 1], ['Correct original example', 1]],
}));
Q('s_abs_vs_enc', short({
  t: 2, d: 3, c: 'analysis', marks: 2, wl: [25, 45],
  stem: 'Distinguish between data abstraction and encapsulation.',
  model: 'Data abstraction shows only the essential features of an object to the user and hides the working details. Encapsulation binds the data and the methods into one class and restricts access to the data. Abstraction is about what is shown; encapsulation is about how it is packaged and protected.',
  sol: 'One mark for each principle stated correctly with its difference.',
  scheme: [['Abstraction: essential features shown, details hidden', 1], ['Encapsulation: data and methods bound in a class, access restricted', 1]],
}));
Q('s_overload_ex', short({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: 'Show polymorphism in Java by writing the headers of two methods of one class that are both named perimeter(), one for a square and one for a rectangle.',
  model: `${J('void perimeter(int side)', 'void perimeter(int length, int breadth)')}\n\nBoth methods have the same name but different parameter lists, so the call perimeter(5) and the call perimeter(5, 3) run different methods. This is method overloading.`,
  sol: 'Two headers with one name and different parameter lists.',
  scheme: [['Two headers with the same name', 1], ['Different parameter lists and the overloading explained', 1]],
}));
Q('o_class_steps', ord({
  t: 2, d: 2, c: 'application',
  stem: 'Arrange the steps of the object-oriented way of building a small shop-billing program in the correct order.',
  items: [
    'Identify the real-world entities, such as Item and Bill',
    'Write a class for each entity with its data members and methods',
    'Create objects from the classes with new',
    'Let the objects work together by calling each other\'s methods',
  ],
  sol: 'The object-oriented approach is bottom-up: find the entities, define their classes, create the objects, and then let them cooperate through method calls.',
}));

// ================================================================ t03 Introduction to Java
Q('m_bytecode', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Which file does the compiler javac produce when it compiles the class Cake written in Cake.java?',
  opts: ['Cake.class', 'Cake.exe', 'Cake.txt', 'Cake.jvm'],
  sol: 'javac stores the bytecode of the class in a file with the extension .class. Cake.exe would be native machine code, which javac does not produce, and .txt and .jvm are not Java file types.',
}));
Q('c_javac', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'The Java compiler, javac, translates source code into:',
  opts: ['bytecode', 'native machine code of one particular processor', 'a second copy of the source code', 'the assembly language of the user\'s computer'],
  sol: 'javac produces bytecode, which is not specific to any processor. The Java Virtual Machine turns bytecode into machine instructions when the program runs.',
}));
Q('m_jvm', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'What is the job of the Java Virtual Machine (JVM)?',
  opts: ['To execute bytecode on the computer where it is installed', 'To convert a class file back into source code', 'To check the spelling of the source code while it is typed', 'To store the programmer\'s files on disk'],
  sol: 'The JVM loads bytecode and either interprets it or compiles it just in time to machine code for the host computer. It does not rebuild source code, check spelling or manage files.',
}));
Q('m_platform', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Java is called platform independent because:',
  opts: ['its bytecode can run on any computer that has a JVM', 'it has no syntax rules to follow', 'its source code is understood directly by every processor', 'it can be run only inside a web browser'],
  sol: 'The same bytecode runs on any system that has a JVM, which is the idea of write once, run anywhere. The language does have syntax rules, source code is not run by processors directly, and Java programs are not limited to browsers.',
}));
Q('m_applet', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'A Java applet is a program that:',
  opts: ['was written to run inside a web browser', 'has a main method and runs on its own', 'can be written only in BlueJ', 'is the same thing as the JVM'],
  sol: 'Applets were Java programs that ran inside a web browser. A program with a main method that runs on its own is an application. Note: the applet API was deprecated in Java 9 and marked for removal in Java 17, and applets no longer run in modern browsers (as of 2024), but the syllabus still names them.',
}));
Q('m_main', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Execution of a Java application starts from:',
  opts: ['the main method', 'the first method written in the file', 'the last statement of the file', 'the first class in the file'],
  sol: 'A Java application begins running at its main method, wherever that method is placed in the class.',
}));
Q('m_gc', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Java gives back the memory of objects that are no longer used through:',
  opts: ['garbage collection', 'a delete statement written by the programmer', 'the javac compiler', 'the applet viewer'],
  sol: 'The JVM runs a garbage collector that reclaims memory of objects that can no longer be reached, so the programmer need not free it by hand.',
}));
Q('m_features', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which of these is NOT a feature of Java?',
  opts: ['A program must be rewritten for each operating system', 'Automatic memory management', 'Support for multithreading', 'Object-oriented design'],
  sol: 'Java is platform independent, so a program need not be rewritten for each operating system. Automatic memory management, multithreading and object-oriented design are all features of Java.',
}));
Q('m_bluej', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'BlueJ is:',
  opts: ['an IDE commonly used in schools to write, compile and run Java programs', 'another name for the Java Virtual Machine', 'a Java applet that runs in a browser', 'a kind of bytecode'],
  sol: 'BlueJ is an integrated development environment for Java. It is a tool for writing programs, not part of the language, the JVM or the bytecode.',
}));
Q('tf_direct', tf({
  t: 3, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Bytecode can be executed directly by the processor of any computer without a Java Virtual Machine.',
  sol: 'Bytecode is not machine code of any real processor. The JVM on each computer interprets it or compiles it to that computer\'s machine code.',
}));
Q('ar_compile', ar({
  t: 3, d: 3, c: 'understanding', verdict: 'both-true-not-explains',
  a: 'A Java source file with the extension .java is compiled by javac into a file with the extension .class.',
  r: 'Java is a platform independent language.',
  sol: 'Both statements are true, but R does not explain A. The compilation step is described in A; platform independence comes from the bytecode being run by a JVM on each machine, which is a separate point.',
}));
Q('ar_main', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'A stand-alone Java application needs a main method from which its execution begins.',
  r: 'An applet is started by its main method in the same way as an application.',
  sol: 'A is true. R is false: an applet did not start from main; the browser or applet viewer called the applet\'s own methods.',
}));
Q('fb_flow', fb({
  t: 3, d: 2, c: 'recall',
  stem: 'The Java compiler converts source code into ___, which the ___ then executes.',
  acc: [['bytecode', 'byte code'], ['jvm', 'java virtual machine']],
  sol: 'javac produces bytecode, and the Java Virtual Machine (JVM) executes it.',
}));
Q('mt_tools', match({
  t: 3, d: 2, c: 'understanding',
  stem: 'Match each Java term with its meaning.',
  pairs: [
    ['javac', 'the compiler that turns source code into bytecode'],
    ['JVM', 'the machine that executes bytecode'],
    ['.java file', 'a file holding source code'],
    ['.class file', 'a file holding bytecode'],
  ],
  sol: 'javac is the compiler, the JVM executes bytecode, source code is stored in .java files and bytecode in .class files.',
}));
Q('c_order', ord({
  t: 3, d: 2, c: 'application',
  stem: 'Arrange these events for a program in the file Cake.java in the order in which they happen.',
  items: [
    'The programmer writes the source code in Cake.java',
    'javac compiles it and creates Cake.class',
    'The JVM loads the bytecode of Cake.class',
    'The JVM interprets it or compiles it just in time to machine code',
    'The program runs and its output appears',
  ],
  sol: 'Source code is written first, compiled to bytecode, loaded by the JVM, converted to machine instructions and finally run.',
}));
Q('s_bytecode', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: [25, 45],
  stem: 'What is bytecode? Why does it make Java platform independent?',
  model: 'Bytecode is the intermediate code that javac produces from the source code and stores in a .class file. It is not tied to any processor, so the same bytecode runs on any computer that has a Java Virtual Machine, which converts it to that computer\'s machine code.',
  sol: 'One mark for what bytecode is, one for the link with the JVM and platform independence.',
  scheme: [['Bytecode: intermediate code produced by javac', 1], ['Runs on any computer with a JVM, hence platform independent', 1]],
}));
Q('s_applet_app', short({
  t: 3, d: 3, c: 'understanding', marks: 2, wl: [25, 50],
  stem: 'Distinguish between a Java applet and a Java application.',
  model: 'An applet is a Java program that was written to run inside a web browser (now obsolete: deprecated in Java 9, marked for removal in Java 17). An application is a stand-alone program with a main method that runs on its own on the computer.',
  sol: 'One mark for each kind described correctly.',
  scheme: [['Applet: runs inside a web browser', 1], ['Application: stand-alone program that starts at main', 1]],
}));
Q('s_features', short({
  t: 3, d: 1, c: 'recall', marks: 2, wl: [10, 30],
  stem: 'Name any four features of Java.',
  model: 'Object-oriented, platform independent, robust, secure, simple, multithreaded, and automatic memory management through garbage collection (any four).',
  sol: 'Half a mark for each correct feature, up to two marks.',
  scheme: [['Four correct features, half a mark each', 2]],
}));
