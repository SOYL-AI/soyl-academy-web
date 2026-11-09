// Build ICSE 10 Computer Applications ch01 (Revision: OOP, Java, Objects and Classes). Run from platform/:
//   npx tsx content/authored/computer-science/icse-10-computer-applications-ch01/src/build.mjs
// Every output, error message and value shown in decks, notes, flashcards and items comes from running the Java code
// through lib.mjs (javac and java), never from typing it by hand.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, notes, cards, test, build, useJavaCache, javaOut } from './lib.mjs';

const SRC = path.dirname(fileURLToPath(import.meta.url));
setUnit('icse-10-computer-applications-ch01', 'computer-science');
useJavaCache(SRC);
await import('./q_a.mjs');
await import('./q_b.mjs');
await import('./q_c.mjs');
const V = await import('./visuals.mjs');
const { J, T, ic, code, outLine, errMsg, expect } = await import('./h.mjs');
const P = await import('./programs.mjs');
const DIR = path.resolve(SRC, '..');

// Values that the narration and notes state in words; stop if Java disagrees.
expect(javaOut(P.cOverload), 'number 4\ntext four\nsum 9', 'overloading');
expect(javaOut(P.cCards), 'Books held: 2\nBooks held: 1', 'library cards');
expect(javaOut(P.cTankPump), '15', 'tank and pump');
expect(javaOut(P.cTicket), '3 of 4 seats booked\n0 of 2 seats booked', 'tickets');
expect(javaOut(P.cGreeter), 'Hello\nHello Isha\nIsha Isha ', 'greeter');
expect(javaOut(P.cPhone), '70', 'phone and battery');
expect(javaOut(P.cAlias), '9', 'alias');
expect(javaOut(P.cCup), '50', 'cup');
expect(javaOut(P.cDefaults), '0 0.0 false null', 'defaults');
expect(javaOut(P.cTwoFans), '2 1', 'two fans');
const hello = code('public class Hello {', '    public static void main(String[] args) {', '        System.out.println("Welcome to Java");', '    }', '}');
const helloOut = javaOut(hello);
expect(helloOut, 'Welcome to Java', 'hello');

// ---------------------------------------------------------------- deck 1
const part1 = deck({
  part: 1,
  title: 'Revision Part 1: Programming Approaches and the Principles of OOP',
  goals: [
    'Compare procedure-oriented and object-oriented programming with an example',
    'State the limitations of the first and the advantages of the second',
    'Define data abstraction, encapsulation, inheritance and polymorphism with original examples',
  ],
  slides: [
    sl('title', 'Two ways to build a program', {
      b: 'Part 1: **procedure-oriented** and **object-oriented** programming, and the four **principles** of object-oriented programming.',
      v: V.vRoute1,
      n: 'Welcome to this revision of how programs are organised. First we compare two approaches: building a program from procedures, and building it from objects. Then we study the four principles of object-oriented programming: data abstraction, encapsulation, inheritance and polymorphism. By the end you will be able to explain each one with an example of your own.',
    }),
    sl('concept', 'Procedure-oriented programming', {
      b: 'A **procedure-oriented** program is a list of procedures (functions) that work on data. The main task is split into smaller procedures.',
      v: V.vPop,
      n: 'In procedure oriented programming the program is a collection of procedures, also called functions. The main task is broken into smaller tasks, and each becomes a function. This is the top down approach. The data is usually shared by the functions, so it moves freely between them, and that freedom is the source of its limitations, which you can see in the table.',
    }),
    sl('diagram', 'Procedure-oriented versus object-oriented', {
      v: V.vPopOop,
      n: 'Look at the picture. On the left, three functions all reach into one shared pile of data, so any of them can change it. On the right, each object keeps its own data hidden inside and offers methods. When one object needs something from another, it sends a message by calling a method. Data is protected, because it can be changed only through the methods of its own object.',
    }),
    sl('concept', 'Object-oriented programming', {
      b: 'An **object-oriented** program is built from **objects**, each combining data and the methods that work on it. The data is hidden.',
      v: V.vOop,
      n: 'In object oriented programming the program is built from objects. An object combines data with the methods that work on that data. The data is hidden from the outside, and the design is bottom up: we design the small parts first and combine them. The advantages are data hiding, reuse through inheritance, and programs that are easier to maintain and closer to the real world.',
    }),
    sl('check', 'Quick check: which approach?', {
      b: 'Read the description and choose.',
      chk: 'c_pop',
      n: 'Look for the clue in the description. Are the data and the actions bundled together, or are functions working on shared data?',
    }),
    sl('concept', 'Comparing the two approaches', {
      v: V.vCompare,
      n: 'Here is the full comparison. A procedure oriented program is built from procedures and puts the emphasis on the steps. An object oriented program is built from objects and puts the emphasis on data. Procedure oriented data is shared and open, object oriented data is hidden. One is top down, the other bottom up, and only the second reuses classes through inheritance.',
    }),
    sl('example', 'Worked example 1: a school canteen in two styles', {
      b: 'An imagined school canteen sells snacks. See how the same job looks in each style.\n\n1. **Procedure-oriented:** shared arrays hold the names and stock; functions edit them.\n2. **Object-oriented:** a class Snack holds the name and stock and has its own methods.\n3. Adding a new feature touches many functions in the first design, but only one class in the second.',
      v: V.vCanteen,
      n: 'Imagine a school canteen program. In the procedure oriented design, two shared arrays hold the names and the stock, and every function edits them directly. In the object oriented design, a class called Snack holds the name and stock, and each snack object sells itself with its own method. When a price field is added, the first design may change many functions; the second changes only the class.',
    }),
    sl('concept', 'Which approach fits?', {
      v: V.vChoose,
      n: 'Neither approach is wrong in every case. A tiny program that adds two numbers has no real entities, so a few procedures are enough. A library system has members, books and cards, each with its own data and actions, so objects fit naturally. When data must be protected, or when a large program will keep growing, the object oriented approach is the better choice.',
    }),
    sl('diagram', 'The four principles', {
      v: V.vWeb,
      n: 'Object oriented programming rests on four principles. Data abstraction shows only the essential features and hides the details. Encapsulation binds data and methods into one unit, the class, and restricts access. Inheritance lets one class acquire the properties of another. Polymorphism means one name with many forms. The next slides take them one at a time.',
    }),
    sl('concept', 'Data abstraction and encapsulation', {
      b: 'Abstraction answers **what is shown**; encapsulation answers **how data and methods are packaged and protected**.',
      v: V.vAbsEnc,
      n: 'Data abstraction means showing only the essential features and hiding the details. When you tap a card at a metro gate, you see the gate open, not the balance check behind it. Encapsulation means binding data and methods into one unit, the class, and restricting access to the data from outside. A medicine capsule is a good picture: everything sits sealed inside one shell.',
    }),
    sl('check', 'Quick check: match the situation', {
      b: 'Match each bicycle-shop situation with its principle.',
      chk: 'c_match',
      n: 'Ask yourself for each situation: is something being hidden, packaged, reused or given many forms?',
    }),
    sl('concept', 'Inheritance', {
      b: '**Inheritance** is the process by which a class acquires the properties (data members and methods) of another class.\n\nThe class that gives is the **superclass**; the class that receives is the **subclass**.',
      v: V.vInherit,
      n: 'Inheritance lets a class acquire the properties of another class. The class that gives its properties is the superclass, also called the base or parent class. The class that receives them is the subclass, also called the derived or child class. An electric bike class can inherit everything from a bike class and add only a battery and a charge method. That is reuse without rewriting.',
    }),
    sl('concept', 'Polymorphism', {
      b: '**Polymorphism** means one name, many forms. In Java, **method overloading** is the example: several methods share a name but differ in their parameter lists.\n\n' + J('void greet()', 'void greet(String name)', 'void greet(String name, int times)'),
      v: V.vPoly,
      n: 'Polymorphism means one name with many forms. In Java, the example you need is method overloading: one class has several methods with the same name but different parameter lists. The compiler chooses the version that matches the arguments in the call. The table shows a method called show used with one number, with a word, and with two numbers.',
    }),
    sl('check', 'Quick check: name the principle', {
      b: 'A teacher describes one method name used for different shapes.',
      chk: 'c_poly',
      n: 'The teacher uses one name for several forms. Which principle has exactly that meaning?',
    }),
    sl('example', 'Worked example 2: name the principle', {
      b: 'Read each situation and name the principle.\n\n1. Look for hiding details, then for binding and protecting, then for acquiring, and finally for one name with many forms.\n2. Give a reason in one short sentence.',
      v: V.vScenarios,
      n: 'Let us practise naming principles. The phone camera icon saves a photo while the steps stay hidden, so that is data abstraction. A class that keeps its balance private and offers deposit and withdraw methods shows encapsulation. A laptop class that acquires everything in a computer class shows inheritance. An area method written for both a circle and a rectangle shows polymorphism.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: V.vSummary1,
      n: 'To sum up Part 1. A procedure oriented program is a set of functions on shared data, designed top down. An object oriented program is a set of objects with hidden data, designed bottom up. Data abstraction shows the essentials, encapsulation binds and protects, inheritance reuses a parent class, and polymorphism gives one name many forms.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Give **two** points for limitations or advantages when the question carries two marks.',
        'Use a table or two clear columns when asked to **compare** or **distinguish**.',
        'Always add a small, original example to a definition of a principle.',
        'Do not mix up abstraction (what is shown) and encapsulation (how it is packaged).',
        'Procedure-oriented is top-down; object-oriented is bottom-up.',
      ],
      n: 'A few exam tips. When a question asks for two limitations or two advantages, write two clear points. For a comparison, use a table with the same bases on both sides. Add a short example of your own to each definition. Take care not to mix up abstraction, which is about what is shown, with encapsulation, which is about packaging and protecting. And remember: procedure oriented is top down, object oriented is bottom up.',
    }),
  ],
});

// ---------------------------------------------------------------- deck 2
const part2 = deck({
  part: 2,
  title: 'Revision Part 2: Introduction to Java, Objects and Classes',
  goals: [
    'Distinguish applets from applications and trace source code to bytecode to machine code',
    'Explain platform independence and list the features of Java',
    'Describe an object by its state and behaviour, and a class as a blueprint and object factory',
    'Create objects with new and use message passing',
  ],
  slides: [
    sl('title', 'Java, objects and classes', {
      b: 'Part 2: how a Java program is **compiled and run**, why Java is **platform independent**, and how **classes** and **objects** work.',
      v: V.vRoute2,
      n: 'In Part 2 we look at Java itself. We separate applets from applications, follow a program from source code to bytecode to machine code, and see why Java is called platform independent. Then we list the features of Java and finish with the heart of the chapter: objects, classes, creating objects with new, and message passing between objects.',
    }),
    sl('concept', 'Applets and applications', {
      b: 'An **applet** was a Java program that ran inside a web browser. An **application** is a stand-alone program with a **main** method.\n\n*Dated note:* the applet API was deprecated in Java 9 and marked for removal in Java 17, so applets no longer run in modern browsers (as of 2024). The syllabus still names them.',
      v: V.vKinds,
      n: 'Java programs come in two kinds. An applet was a program written to run inside a web browser. An application is a stand alone program that starts from its main method. Applets are now obsolete: the applet interface was deprecated in Java nine and marked for removal in Java seventeen, and modern browsers no longer run them. The syllabus still names them, so know the definition.',
    }),
    sl('diagram', 'From source code to machine code', {
      v: V.vCompile,
      n: 'Follow the picture from left to right. The programmer writes source code in a file with the extension java. The compiler, javac, translates it into bytecode and stores it in a file with the extension class. The Java Virtual Machine loads the bytecode and then either interprets it or compiles it just in time into machine code for that particular computer, and the program runs.',
    }),
    sl('concept', 'Source code, bytecode and object code', {
      v: V.vCodes,
      n: 'Three kinds of code appear in this process. Source code is what the programmer writes. Bytecode is the intermediate code made by the compiler, and it is not tied to any processor. Object code, also called machine code, is made by the Java Virtual Machine while the program runs. The virtual machine itself is installed on every computer that runs Java.',
    }),
    sl('check', 'Quick check: the compiler', {
      b: 'What does javac produce?',
      chk: 'c_javac',
      n: 'Recall the file extension of the compiler output, and whether that code belongs to one particular processor.',
    }),
    sl('concept', 'Why Java is platform independent', {
      b: 'Bytecode is the same everywhere. Each computer has its own **JVM** that turns it into that computer\'s machine code. This is **write once, run anywhere**.',
      v: V.vPlatform,
      n: 'Java is called platform independent because the compiled bytecode does not depend on any computer. A Windows laptop, a Linux server and a Mac each have their own Java Virtual Machine. Each machine runs the very same class file. The programmer writes once, compiles once, and the program runs anywhere a virtual machine is present.',
    }),
    sl('concept', 'Features of Java', {
      v: V.vFeatures,
      n: 'Java has many features. It is object oriented and platform independent. It is robust, because of strong type checking, exception handling and garbage collection. It is secure, simple, and multithreaded, so one program can do several tasks at once. Memory is managed automatically by the garbage collector. BlueJ is an integrated development environment commonly used in schools to write, compile and run Java programs.',
    }),
    sl('check', 'Quick check: order the steps', {
      b: 'Put the events for the file Cake.java in order.',
      chk: 'c_order',
      n: 'Start with the writing of the program and end with its output. Decide where the compiler and the virtual machine come in.',
    }),
    sl('concept', 'Objects: state and behaviour', {
      b: 'An **object** is a real-world entity or concept modelled in a program. Its **state** is held in data members and its **behaviour** is described by methods.',
      v: V.vObject,
      n: 'An object is a thing modelled in a program. It has state, which is the data it holds in its data members, and behaviour, which is what it can do, written as methods. A bulb has the state of being on or off and its watts, and it can be toggled. Each bulb you create is a separate object with its own state.',
    }),
    sl('diagram', 'A class is a blueprint and an object factory', {
      v: V.vFactory,
      n: 'A class is a blueprint or template. It describes the data members and methods that its objects will have. It is also a user defined data type. Like a factory, one class can produce many objects, using the new operator. In the picture, one class called Ticket gives three ticket objects, each with its own state. An object is called an instance of its class.',
    }),
    sl('example', 'Worked example 1: a class and two objects', {
      b: J(P.cTicket) + '\n\nOutput:\n\n' + T(javaOut(P.cTicket)),
      v: V.vTraceTicket,
      n: 'Here is a small ticket class for an imagined bus trip, and a main method. Two objects are created. The first is given four seats and the second two seats. Booking three seats works for the first object but is refused for the second, because three is more than its two seats. The trace table follows each state. The objects never disturb each other: each keeps its own count.',
    }),
    sl('check', 'Quick check: two library cards', {
      b: 'Predict the output of a program with two library cards.',
      chk: 'co_cards',
      n: 'Work out the state of each object separately. Remember that the limit stops the count from growing too far.',
    }),
    sl('concept', 'Creating objects with new', {
      b: 'The **new** operator creates an object and returns its **reference**. A variable of class type holds a reference, not the object itself.',
      v: V.vNew,
      n: 'Declaring a variable of a class type only makes a name that can hold a reference. No object exists yet. The new operator creates the object and returns its reference, which is stored in the variable. Copying a variable copies only the reference, so two names then refer to one object. Methods are called with the object name, a dot and the method name.',
    }),
    sl('concept', 'Message passing', {
      b: '**Message passing:** objects communicate by calling each other\'s methods. The call is the message; the object that receives it decides how to act.',
      v: V.vMessage,
      n: 'Objects work together by sending messages. A message is simply a call to a method of another object. In the picture, a phone object calls the use method of a battery object. The battery runs the method and changes its own data, and then control returns to the phone. The phone never touches the battery data directly.',
    }),
    sl('example', 'Worked example 2: a pump and a tank', {
      b: J(P.cPhone) + '\n\nOutput: ' + ic(javaOut(P.cPhone)),
      v: V.vTraceBattery,
      n: 'In this program, main creates a battery at ninety percent and a phone. It sends the phone the message play with the battery as the argument. Inside play, the phone sends the battery two messages: use eight, then use twelve. The trace table shows the charge falling. Since the same battery object is changed, main sees the final value when it prints.',
    }),
    sl('concept', 'Common compile-time errors', {
      v: V.vErrors,
      n: 'Three slips are common when you first write classes. A statement without its closing semicolon is rejected by the compiler. An ordinary method called with the class name instead of an object is not allowed. And a variable of class type that has not been given an object with new cannot be used. The table shows the messages the compiler gives for each.',
    }),
    sl('check', 'Quick check: find the slip', {
      b: 'What does the compiler report for this program?',
      chk: 'co_err_semi',
      n: 'Read the program line by line. Which statement is not finished correctly?',
    }),
    sl('summary', 'Summary of Part 2', {
      v: V.vSummary2,
      n: 'To sum up Part 2. An applet ran in a browser and is now obsolete; an application starts from main. The compiler makes bytecode and the virtual machine runs it, which makes Java platform independent. An object has state and behaviour. A class is a blueprint and an object factory. Objects are made with new and cooperate by message passing.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Write the full chain: source code (.java), then javac, then bytecode (.class), then the JVM, then machine code.',
        'Define **class** as a blueprint or user-defined data type and **object** as its instance.',
        'In output questions, remember each object has its own copy of the data members.',
        'Two names for one object (a reference copy) change the same data.',
        'A method that is not static must be called through an object, never with the class name.',
      ],
      n: 'Some exam tips. Write the whole chain from source code to compiler to bytecode to virtual machine to machine code. Define a class as a blueprint and an object as its instance. In output questions, remember that every object has its own copy of the data members, while two names for one object change the same data. And a method that is not static must be called through an object.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Revision: Object-Oriented Programming, Java, Objects and Classes',
  sections: [
    {
      h: '1. Procedure-oriented programming',
      t: 1,
      b: 'In **procedure-oriented programming** a program is a list of **procedures** (functions) that work on data. The main task is split into smaller tasks, each written as a function (**top-down** design). The data is usually shared, and moves freely from function to function.\n\n**Limitations**\n- Shared data is unprotected: any function can change it by mistake.\n- A change in the data may force changes in many functions.\n- Real-world things are hard to model as separate procedures.',
      terms: [['Procedure-oriented programming', 'A programming approach in which the program is a set of procedures (functions) that act on shared data, designed top-down.']],
      v: V.vPop,
    },
    {
      h: '2. Object-oriented programming and the comparison',
      t: 1,
      b: 'In **object-oriented programming** (OOP) a program is built from **objects**. Each object combines **data** and the **methods** that work on it, and the data is **hidden** from outside. Design is **bottom-up**.\n\n**Advantages**\n- Data hiding protects data from accidental change.\n- Inheritance lets classes be reused and extended.\n- Programs are easier to maintain and model the real world.\n\nImagined example: a school canteen as shared arrays and functions (procedure-oriented) or as a class `Snack` with its own `sell()` method (object-oriented).',
      terms: [['Object-oriented programming', 'A programming approach in which a program is built from objects that combine data and the methods acting on it, with the data hidden, designed bottom-up.']],
      v: V.vCompare,
      vs: [V.vPopOop, V.vCanteen],
    },
    {
      h: '3. Principles of OOP',
      t: 2,
      b: '- **Data abstraction:** showing only the essential features and hiding the details.\n- **Encapsulation:** binding data and methods into one unit, the class, and restricting access to the data.\n- **Inheritance:** a class acquires the properties (data members and methods) of another class; the giver is the **superclass**, the receiver the **subclass**.\n- **Polymorphism:** one name, many forms; method overloading gives several methods with one name and different parameter lists.\n\n```java\nvoid perimeter(int side)\nvoid perimeter(int length, int breadth)\n```\n\nThe call `perimeter(5)` and the call `perimeter(5, 3)` run different methods.',
      terms: [
        ['Data abstraction', 'Showing only the essential features of an object and hiding the details.'],
        ['Encapsulation', 'Binding data and the methods that work on it into one unit, the class, and restricting access to the data.'],
        ['Inheritance', 'The process by which a class acquires the properties of another class.'],
        ['Polymorphism', 'The ability of one name, such as a method name, to have many forms.'],
      ],
      v: V.vWeb,
      vs: [V.vAbsEnc, V.vInherit, V.vPoly],
    },
    {
      h: '4. Introduction to Java: kinds of programs and how they run',
      t: 3,
      b: 'An **applet** was a Java program that ran inside a web browser. An **application** is a stand-alone program with a `main` method.\n\n*Dated note:* the applet API was deprecated in Java 9 and marked for removal in Java 17, and applets no longer run in modern browsers (as of 2024). The syllabus still names them.\n\n**Compilation and execution:** source code (`.java`) is compiled by `javac` into **bytecode** (`.class`). The **Java Virtual Machine (JVM)** interprets the bytecode, or compiles it just in time to machine (object) code. Because the same bytecode runs on any computer that has a JVM, Java is **platform independent** ("write once, run anywhere").\n\n' + J(hello) + '\n\nOutput: ' + ic(helloOut),
      terms: [
        ['Applet', 'A Java program that was designed to run inside a web browser.'],
        ['Application', 'A stand-alone Java program that begins execution at its main method.'],
        ['Bytecode', 'The intermediate, processor-independent code produced by the Java compiler and stored in a .class file.'],
        ['Java Virtual Machine', 'The software that loads bytecode and executes it by interpreting it or compiling it just in time to machine code.'],
      ],
      v: V.vCompile,
      vs: [V.vCodes, V.vKinds],
    },
    {
      h: '5. Features of Java',
      t: 3,
      b: 'Java is **object-oriented**, **platform independent**, **robust** (strong type checking, exception handling, garbage collection), **secure** (programs run inside the JVM), **simple**, **multithreaded** (several tasks at once) and has **automatic memory management** (garbage collection frees memory of unused objects).\n\n**BlueJ** is an IDE commonly used in ICSE schools to write, compile and run Java programs.',
      terms: [
        ['Garbage collection', 'The automatic freeing by the JVM of the memory held by objects that can no longer be used.'],
        ['Platform independence', 'The property that a program compiled once can run on any computer that has a Java Virtual Machine.'],
      ],
      v: V.vFeatures,
      vs: [V.vPlatform],
    },
    {
      h: '6. Objects and classes',
      t: 4,
      b: 'An **object** has **state** (data members) and **behaviour** (methods). A **class** is a blueprint (template) for objects and a user-defined data type; it is an **object factory**, because many objects can be created from one class with `new`. Each object is an **instance** of its class and has its own copy of the data members.\n\n' + J(P.cTicket) + '\n\nOutput:\n\n' + T(javaOut(P.cTicket)) + '\n\nData members receive default values (0, 0.0, false, null) when an object is created. A variable of class type holds a **reference**; assigning one such variable to another copies the reference, so both names refer to one object.',
      terms: [
        ['Object', 'An instance of a class: an entity with state held in data members and behaviour defined by methods.'],
        ['Class', 'A blueprint or template, and a user-defined data type, that defines the data members and methods of its objects.'],
        ['Instance', 'An individual object created from a class.'],
      ],
      v: V.vFactory,
      vs: [V.vObject, V.vNew, V.vTraceTicket],
    },
    {
      h: '7. Message passing and common errors',
      t: 4,
      b: '**Message passing:** objects communicate by calling each other\'s methods. The call is the message.\n\n' + J(P.cPhone) + '\n\nOutput: ' + ic(javaOut(P.cPhone)) + '\n\n**Common errors:** a missing semicolon; calling a method that is not static with the class name instead of an object; using a variable of class type before creating the object with `new`.',
      terms: [['Message passing', 'The way objects communicate: one object calls a method of another object.']],
      v: V.vMessage,
      vs: [V.vTraceBattery, V.vErrors],
    },
  ],
  tips: '**Common mistakes**\n- Mixing up abstraction (what is shown) and encapsulation (how data and methods are packaged and protected).\n- Saying procedure-oriented is bottom-up; it is top-down.\n- Writing that bytecode is machine code; it is the intermediate code that the JVM executes.\n- Forgetting `new`: declaring `Fan f;` does not create an object.\n- Thinking two objects share their data members; each has its own copy.\n- Treating a copied reference as a copied object.\n\n**How marks are usually awarded**\n- Definitions and distinctions (2 marks): one point per mark, each with a short example.\n- Output questions (2 marks): the exact output, line by line.\n- Programs (15 marks): class and method structure, input, correct logic, output format, and variable description or comments.',
});

// ---------------------------------------------------------------- flashcards
const FC = cards([
  ['What is **procedure-oriented programming**?', 'An approach in which the program is a set of procedures (functions) that work on data, usually shared; designed top-down.', 'definition', 1],
  ['Design approach of procedure-oriented programming', 'Top-down: the main task is split into smaller procedures.', 'fact', 1],
  ['Two limitations of procedure-oriented programming', 'Shared data is unprotected; a change in data may need changes in many functions (also poor real-world modelling).', 'concept', 1],
  ['What is **object-oriented programming**?', 'An approach in which the program is built from objects that combine data and methods, with the data hidden; designed bottom-up.', 'definition', 1],
  ['Design approach of object-oriented programming', 'Bottom-up: design the objects first, then combine them.', 'fact', 1],
  ['Two advantages of object-oriented programming', 'Data hiding protects data; inheritance gives reuse (also easier maintenance and real-world modelling).', 'concept', 1],
  ['How is data treated in the two approaches?', 'Procedure-oriented: shared and open to all functions. Object-oriented: hidden inside objects.', 'exam-tip', 1],
  ['**Data abstraction**', 'Showing only the essential features and hiding the details.', 'definition', 2],
  ['**Encapsulation**', 'Binding data and methods into one unit, the class, and restricting access to the data.', 'definition', 2],
  ['**Inheritance**', 'A class acquires the properties of another class: the giver is the superclass, the receiver the subclass.', 'definition', 2],
  ['**Polymorphism**', 'One name, many forms; for example, method overloading.', 'definition', 2],
  ['Abstraction versus encapsulation', 'Abstraction is about what is shown (essentials). Encapsulation is about packaging data and methods and restricting access.', 'exam-tip', 2],
  ['Class Laptop acquires everything in class Computer. Which principle?', 'Inheritance (Computer is the superclass, Laptop the subclass).', 'example', 2],
  [`A class has greet(), greet(String name) and greet(String name, int times). Which method runs for ${ic('g.greet("Isha")')}?`, `The one-String version, which prints ${ic(javaOut(P.cGreeter).split('\n')[1])}.`, 'example', 2],
  ['What is an **applet**?', 'A Java program that was designed to run inside a web browser. (Deprecated in Java 9, marked for removal in Java 17; no longer runs in modern browsers, as of 2024.)', 'definition', 3],
  ['What is a Java **application**?', 'A stand-alone program that starts at its main method.', 'definition', 3],
  ['What does **javac** do?', 'Compiles source code (.java) into bytecode (.class).', 'fact', 3],
  ['What is **bytecode**?', 'Processor-independent intermediate code in a .class file; run by the JVM.', 'definition', 3],
  ['What is the **JVM**?', 'The Java Virtual Machine: it loads bytecode and interprets it or compiles it just in time to machine code.', 'definition', 3],
  ['Why is Java **platform independent**?', 'The same bytecode runs on any computer that has a JVM: write once, run anywhere.', 'concept', 3],
  ['What is **JIT** compilation?', 'Just-in-time compilation: the JVM compiles bytecode to machine (object) code while the program runs.', 'fact', 3],
  ['Name four features of Java', 'Object-oriented, platform independent, robust, secure (also simple, multithreaded, automatic memory management).', 'fact', 3],
  ['What does **garbage collection** do?', 'Automatically frees the memory of objects that are no longer used.', 'fact', 3],
  ['What is **BlueJ**?', 'An IDE commonly used in ICSE schools to write, compile and run Java programs.', 'fact', 3],
  ['What is an **object**?', 'An instance of a class, with state (data members) and behaviour (methods).', 'definition', 4],
  ['What is a **class**?', 'A blueprint (template) and user-defined data type for objects; an object factory, because many objects are made from it with new.', 'definition', 4],
  ['State versus behaviour', 'State is held in data members; behaviour is what the methods do.', 'concept', 4],
  ['Statement to create an object lamp of class Bulb', ic('Bulb lamp = new Bulb();'), 'fact', 4],
  ['What is **message passing**?', 'Objects communicate by calling each other\'s methods.', 'definition', 4],
  ['Default values of data members', `For int and String members the defaults print as ${ic(javaOut(P.cFieldDefaults))}; also 0.0 for double and false for boolean.`, 'example', 4],
  ['Calling a non-static method with the class name', `Compile-time error: ${ic(errMsg(P.cErrDoorStatic, { kind: 'compile' }))}; call it through an object.`, 'exam-tip', 4],
  ['After Box y = x; a change made through y, what does x show?', 'The changed value: the assignment copies the reference, so there is one object with two names.', 'exam-tip', 4],
]);

// ---------------------------------------------------------------- tests (icse-10-computer-applications chapter-test blueprints)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'icse-10-computer-applications-chapter-test-short',
  title: 'Chapter test (short): OOP, Java, Objects and Classes',
  duration: 30,
  sections: [
    { id: 'A', title: 'Section A: Compulsory (10 marks)', instr: 'Attempt all questions. Six multiple-choice items (1 mark each) and two 2-mark short answers.', items: ['m_pop_limit', 'm_encap', 'm_overload_out', 'm_bytecode', 'm_two_objs', 'm_static_ctx', 's_pop_limits', 's_stmt_create'] },
    { id: 'B', title: 'Section B: Program (15 marks)', instr: 'Write one of the two Java programs, with variable descriptions or comments.', items: [{ attempt: 1, keys: ['l_student', 'l_fan'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'icse-10-computer-applications-chapter-test-long',
  title: 'Chapter test (long): OOP, Java, Objects and Classes',
  duration: 60,
  sections: [
    { id: 'A', title: 'Section A: Compulsory (20 marks)', instr: 'Attempt all questions. Ten multiple-choice items (1 mark each), three 2-mark short answers and two 2-mark code-output items.', items: ['m_oop_adv', 'm_oop_approach', 'm_abstraction', 'm_inherit', 'm_jvm', 'm_platform', 'm_main', 'm_new', 'm_missing_new', 'm_state', 's_encap_def', 's_bytecode', 's_call_stmt', 'co_tank', 'co_cup'] },
    { id: 'B', title: 'Section B: Programs (30 marks)', instr: 'Write any two of the three Java programs, each with variable descriptions or comments.', items: [{ attempt: 2, keys: ['l_parking', 'l_card', 'l_bulb'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 to t04 of icse-10-computer-applications-ch01 only (procedure-oriented versus object-oriented programming; principles of OOP; introduction to Java; objects and classes)',
    originality: 'every program, scenario and name written for this chapter by SOYL; imagined people, shops, schools and classes only',
    execution: 'every output, compiler message and value in items, slides, notes and flashcards produced by compiling and running the Java code with JDK 21 (runJava in lib.mjs); results cached in src/java-cache.json',
    gate: 'schema, pipeline lint, deterministic verify, narration rules and the answer-leak scan run clean in this build',
  },
});
