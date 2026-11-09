// Visuals of ch01: four SVG diagrams (own drawings) and the tables/flows used by the decks and notes.
// Tables that quote Java results run the code through lib.mjs.
import { table, flow, Svg, javaOut, javaErr } from './lib.mjs';
import { ic, code, errMsg, outLine } from './h.mjs';
import { cGreeter, cTicket, cPhone, cErrDoorSemi, cErrDoorStatic, cErrDoorInit } from './programs.mjs';

// ---------------------------------------------------------------- SVG diagrams
export const vPopOop = (() => {
  const s = new Svg(650, 280);
  s.text(160, 22, 'Procedure-oriented', { bold: true, size: 15 });
  s.rect(60, 50, 200, 40, { color: 'accent', sw: 1.8, rx: 6 });
  s.text(160, 70, 'Shared data', { size: 14 });
  [[25, 'main()'], [125, 'read()'], [225, 'total()']].forEach(([x, t]) => {
    s.rect(x, 170, 80, 40, { sw: 1.6, rx: 6 });
    s.text(x + 40, 190, t, { size: 13 });
  });
  s.arrow(65, 168, 100, 92, { color: 'muted', sw: 1.4 });
  s.arrow(165, 168, 160, 92, { color: 'muted', sw: 1.4 });
  s.arrow(265, 168, 220, 92, { color: 'muted', sw: 1.4 });
  s.text(160, 250, 'Functions share and change the same data', { size: 12, muted: true });
  s.line(325, 30, 325, 260, { color: 'muted', sw: 1, dash: true });
  s.text(485, 22, 'Object-oriented', { bold: true, size: 15 });
  [[345, 'Object A'], [515, 'Object B']].forEach(([x, t]) => {
    s.rect(x, 50, 110, 130, { sw: 1.8, rx: 8 });
    s.text(x + 55, 68, t, { size: 13, bold: true });
    s.rect(x + 10, 84, 90, 36, { color: 'accent', sw: 1.4, rx: 5 });
    s.text(x + 55, 102, 'data (hidden)', { size: 12 });
    s.rect(x + 10, 130, 90, 40, { sw: 1.4, rx: 5 });
    s.text(x + 55, 150, 'methods', { size: 12 });
  });
  s.text(485, 132, 'message', { size: 12, muted: true });
  s.arrow(457, 150, 513, 150, { color: 'accent', sw: 1.6 });
  s.text(485, 250, 'Objects keep data inside and talk by messages', { size: 12, muted: true });
  return s.visual('Two panels. Procedure-oriented: three functions main, read and total all point to one box of shared data. Object-oriented: Object A and Object B each hold hidden data and methods, and an arrow labelled message passes between them.', 'Procedure-oriented versus object-oriented organisation.');
})();

export const vWeb = (() => {
  const s = new Svg(600, 300);
  s.rect(220, 120, 160, 60, { color: 'accent', sw: 2, rx: 10 });
  s.text(300, 142, 'Object-oriented', { bold: true, size: 14 });
  s.text(300, 162, 'programming', { bold: true, size: 14 });
  const box = (x, y, w, t, sub) => {
    s.rect(x, y, w, 56, { sw: 1.8, rx: 8 });
    s.text(x + w / 2, y + 19, t, { bold: true, size: 14 });
    s.text(x + w / 2, y + 41, sub, { size: 12, muted: true });
  };
  box(190, 8, 220, 'Data abstraction', 'show essentials, hide details');
  box(405, 122, 190, 'Encapsulation', 'bind data and methods');
  box(190, 236, 220, 'Inheritance', 'reuse a parent class');
  box(5, 122, 190, 'Polymorphism', 'one name, many forms');
  s.line(300, 64, 300, 120, { color: 'muted', sw: 1.6 });
  s.line(380, 150, 405, 150, { color: 'muted', sw: 1.6 });
  s.line(300, 180, 300, 236, { color: 'muted', sw: 1.6 });
  s.line(195, 150, 220, 150, { color: 'muted', sw: 1.6 });
  return s.visual('Web diagram with Object-oriented programming in the centre joined to four boxes: data abstraction (show essentials, hide details), encapsulation (bind data and methods), inheritance (reuse a parent class) and polymorphism (one name, many forms).', 'The four principles of object-oriented programming.');
})();

export const vCompile = (() => {
  const s = new Svg(680, 215);
  const bx = [[20, 'Source code', 'Hello.java'], [190, 'Bytecode', 'Hello.class'], [360, 'JVM', 'loads the bytecode'], [530, 'Machine code', 'for this computer']];
  bx.forEach(([x, t, sub]) => {
    s.rect(x, 40, 130, 60, { color: t === 'JVM' ? 'accent' : undefined, sw: 1.8, rx: 8 });
    s.text(x + 65, 62, t, { bold: true, size: 14 });
    s.text(x + 65, 84, sub, { size: 12, muted: true });
  });
  [[150, 'javac', 170], [320, 'class loader', 340], [490, 'interpret or JIT compile', 510]].forEach(([x, t, cx]) => {
    s.arrow(x + 2, 70, x + 38, 70, { sw: 1.8 });
    s.line(cx, 76, cx, 118, { color: 'muted', sw: 1, dash: true });
    s.text(cx, 130, t, { size: 12 });
  });
  s.text(340, 178, 'Platform independent: the same bytecode runs on any computer that has a JVM', { size: 12, muted: true });
  return s.visual('Flow from left to right: source code in Hello.java is compiled by javac into bytecode in Hello.class; the class loader hands it to the Java Virtual Machine; the JVM interprets it or compiles it just in time into machine code for that computer.', 'From source code to machine code.');
})();

export const vFactory = (() => {
  const s = new Svg(680, 300);
  s.rect(20, 70, 210, 150, { color: 'accent', sw: 2, rx: 10 });
  s.text(125, 92, 'class Ticket', { bold: true, size: 14 });
  s.line(30, 106, 220, 106, { color: 'muted', sw: 1 });
  s.text(125, 130, 'data members: seats, booked', { size: 12 });
  s.text(125, 154, 'methods: book(), show()', { size: 12 });
  s.text(125, 200, 'blueprint', { size: 12, muted: true, italic: true });
  s.text(320, 16, 'created with new', { size: 12, muted: true });
  [[30, 'Object x', '4 seats, 3 booked'], [120, 'Object y', '2 seats, 0 booked'], [210, 'Object z', '6 seats, 5 booked']].forEach(([y, t, st]) => {
    s.rect(420, y, 240, 58, { sw: 1.8, rx: 8 });
    s.text(540, y + 20, t, { bold: true, size: 14 });
    s.text(540, y + 42, `state: ${st}`, { size: 12, muted: true });
    s.arrow(232, 145, 418, y + 29, { color: 'muted', sw: 1.4 });
  });
  s.text(340, 288, 'One class, many objects, each with its own state', { size: 12, muted: true });
  return s.visual('A class box named Ticket with data seats and booked and methods book and show, with arrows labelled created with new pointing to three objects x, y and z whose states are 4 seats with 3 booked, 2 seats with 0 booked, and 6 seats with 5 booked.', 'A class is a blueprint, and also a factory for objects.');
})();

// ---------------------------------------------------------------- flows and tables: deck 1
export const vRoute1 = flow('LR', ['Two ways to organise a program', 'Procedure-oriented', 'Object-oriented', 'Four principles', 'Abstraction and encapsulation', 'Inheritance and polymorphism'], 'Route map of Part 1: two ways to organise a program, procedure-oriented, object-oriented, the four principles, abstraction and encapsulation, inheritance and polymorphism', 'Part 1 at a glance');
export const vPop = table(
  ['Feature', 'Procedure-oriented programming'],
  [
    ['Main unit', 'The procedure (function)'],
    ['Data', 'Often shared; moves freely between functions'],
    ['Design approach', 'Top-down: split the main task into smaller procedures'],
    ['Limitation 1', 'Shared data is unprotected: any function can change it by mistake'],
    ['Limitation 2', 'A change in the data may force changes in many functions'],
    ['Limitation 3', 'Real-world things are hard to model as separate procedures'],
  ],
  'Table of procedure-oriented programming: the procedure is the main unit, data is shared and moves freely, design is top-down, and three limitations: unprotected shared data, changes spreading to many functions, and poor modelling of real-world things',
);
export const vOop = table(
  ['Feature', 'Object-oriented programming'],
  [
    ['Main unit', 'The object: data and methods together'],
    ['Data', 'Hidden inside the object; reached through its methods'],
    ['Design approach', 'Bottom-up: design the objects, then combine them'],
    ['Advantage 1', 'Data hiding protects data from accidental change'],
    ['Advantage 2', 'Inheritance reuses classes, so less new code is written'],
    ['Advantage 3', 'Programs are easier to maintain and model the real world'],
  ],
  'Table of object-oriented programming: the object is the main unit, data is hidden, design is bottom-up, and three advantages: data hiding, reuse through inheritance, and easier maintenance and modelling',
);
export const vCompare = table(
  ['Basis', 'Procedure-oriented', 'Object-oriented'],
  [
    ['Program is built from', 'Procedures (functions)', 'Objects of classes'],
    ['Emphasis', 'On the steps (what to do)', 'On the data and the objects'],
    ['Data', 'Shared and open to all functions', 'Hidden inside objects'],
    ['Approach', 'Top-down', 'Bottom-up'],
    ['Reuse', 'By copying or calling functions', 'By inheritance and objects'],
    ['Security of data', 'Low', 'High'],
  ],
  'Comparison table of procedure-oriented and object-oriented programming on six bases: what the program is built from, emphasis, data, approach, reuse and security of data',
);
export const vCanteen = table(
  ['Task in a canteen program', 'Procedure-oriented design', 'Object-oriented design'],
  [
    ['Keeping the stock', 'Arrays names and stock shared by all functions', 'A class Snack with the data members name and stock'],
    ['Selling n snacks', 'Function sell(i, n) edits stock[i] directly', 'The object runs its own method sell(n)'],
    ['A price field is added', 'Every function that touches the arrays may change', 'Only the class Snack changes'],
    ['A new snack is added', 'Extend the arrays and check every function', 'Create one more object with new'],
  ],
  'Table comparing a school canteen program written two ways: shared arrays and functions versus a Snack class with its own methods, across keeping stock, selling, adding a price field and adding a new snack',
);
export const vChoose = table(
  ['Situation', 'Better fit', 'Reason'],
  [
    ['A ten-line program to add two numbers', 'Procedure-oriented', 'Small, one task, no entities to model'],
    ['A library system with members, books and cards', 'Object-oriented', 'Real entities with their own data and actions'],
    ['Data that must not be changed by accident', 'Object-oriented', 'Objects hide data behind methods'],
    ['A big program that will grow for years', 'Object-oriented', 'Classes can be reused and extended'],
  ],
  'Table of four situations with the better approach and the reason: a tiny program suits the procedure-oriented style; a library system, protected data and a growing program suit the object-oriented style',
);
export const vAbsEnc = table(
  ['Principle', 'Meaning', 'Everyday picture'],
  [
    ['Data abstraction', 'Show only the essential features and hide the details', 'A metro gate opens when you tap a card; the balance check stays hidden'],
    ['Encapsulation', 'Bind data and methods into one unit, the class, and restrict access to the data', 'A medicine capsule keeps its contents sealed inside one shell'],
  ],
  'Table of two principles: data abstraction (show essentials, hide details; a metro gate that opens on a tap) and encapsulation (bind data and methods in a class and restrict access; a medicine capsule)',
);
export const vInherit = flow('LR', ['Superclass Bike: wheels, pedal(), brake()', 'is acquired by (inheritance)', 'Subclass ElectricBike: all of Bike, plus battery and charge()'], 'Flow showing that the subclass ElectricBike acquires everything in the superclass Bike (wheels, pedal and brake) and adds a battery and a charge method', 'Inheritance: a subclass acquires the properties of its superclass.');
const polyLines = javaOut(cGreeter).split('\n');
export const vPoly = table(
  ['Call', 'Method chosen', 'Output'],
  [
    [ic('g.greet()'), ic('greet()'), ic(polyLines[0])],
    [ic('g.greet("Isha")'), ic('greet(String name)'), ic(polyLines[1])],
    [ic('g.greet("Isha", 2)'), ic('greet(String name, int times)'), ic(polyLines[2].trim())],
  ],
  'Table of three calls of the overloaded method greet: with no argument it prints Hello, with a name it prints Hello and the name, and with a name and a count it prints the name that many times',
  'One method name, three forms, chosen by the arguments.',
);
export const vScenarios = table(
  ['Situation', 'Principle'],
  [
    ['A phone user taps the camera icon and a photo is saved; the steps inside are hidden', 'Data abstraction'],
    ['A class Account keeps balance private and offers deposit() and withdraw()', 'Encapsulation'],
    ['Class Laptop acquires everything in class Computer and adds a battery', 'Inheritance'],
    ['A method area() is written for a circle and again for a rectangle', 'Polymorphism'],
  ],
  'Table pairing four situations with principles: a phone camera icon with data abstraction, a class with private balance with encapsulation, Laptop acquiring Computer with inheritance, and area for circle and rectangle with polymorphism',
);
export const vSummary1 = table(
  ['Idea', 'Remember'],
  [
    ['Procedure-oriented', 'Functions, shared data, top-down'],
    ['Object-oriented', 'Objects with data and methods, hidden data, bottom-up'],
    ['Data abstraction', 'Essential features shown, details hidden'],
    ['Encapsulation', 'Data and methods bound in a class, access restricted'],
    ['Inheritance', 'A subclass acquires the properties of a superclass'],
    ['Polymorphism', 'One name, many forms; for example method overloading'],
  ],
  'Summary table of Part 1: procedure-oriented, object-oriented, data abstraction, encapsulation, inheritance and polymorphism',
);

// ---------------------------------------------------------------- flows and tables: deck 2
export const vRoute2 = flow('LR', ['Applets and applications', 'Source code to machine code', 'Platform independence', 'Features of Java', 'Objects and classes', 'Message passing'], 'Route map of Part 2: applets and applications, source code to machine code, platform independence, features of Java, objects and classes, message passing', 'Part 2 at a glance');
export const vKinds = table(
  ['', 'Applet', 'Application'],
  [
    ['What it is', 'A Java program that ran inside a web browser', 'A stand-alone Java program'],
    ['Starts from', 'Methods called by the browser or applet viewer', 'The main method'],
    ['Status today', 'Applet API deprecated in Java 9, marked for removal in Java 17; no longer runs in modern browsers (as of 2024)', 'Fully supported'],
  ],
  'Table comparing a Java applet with a Java application: what it is, where it starts, and its status today, with the applet API deprecated in Java 9 and marked for removal in Java 17',
  'The syllabus still names applets, so know the definition.',
);
export const vCodes = table(
  ['Name', 'What it is', 'Where it lives'],
  [
    ['Source code', 'The program as the programmer writes it', 'A file with the extension .java'],
    ['Bytecode', 'Intermediate code made by javac; not tied to one processor', 'A file with the extension .class'],
    ['Object (machine) code', 'Instructions of the actual processor', 'Made by the JVM while the program runs'],
    ['JVM', 'Java Virtual Machine: interprets bytecode or compiles it just in time', 'Installed on each computer'],
  ],
  'Table of source code (.java), bytecode (.class), object or machine code made by the JVM while running, and the Java Virtual Machine installed on each computer',
);
export const vPlatform = table(
  ['Computer', 'Needs', 'Result'],
  [
    ['Windows laptop', 'A JVM for Windows', 'Runs the same Hello.class'],
    ['Linux server', 'A JVM for Linux', 'Runs the same Hello.class'],
    ['Mac computer', 'A JVM for Mac', 'Runs the same Hello.class'],
  ],
  'Table showing one Hello.class file running on a Windows laptop, a Linux server and a Mac computer, each with its own Java Virtual Machine',
  'Write once, run anywhere.',
);
export const vFeatures = table(
  ['Feature', 'What it means'],
  [
    ['Object-oriented', 'Programs are built from classes and objects'],
    ['Platform independent', 'Bytecode runs on any computer with a JVM'],
    ['Robust', 'Strong type checking, exception handling and garbage collection reduce crashes'],
    ['Secure', 'Programs run inside the JVM, which checks bytecode and limits access'],
    ['Simple', 'Familiar syntax; no pointers and no manual memory release'],
    ['Multithreaded', 'One program can do several tasks at the same time'],
    ['Automatic memory management', 'The garbage collector frees memory of unused objects'],
  ],
  'Table of the features of Java: object-oriented, platform independent, robust, secure, simple, multithreaded, and automatic memory management',
  'BlueJ is an IDE commonly used in ICSE schools to write, compile and run Java programs.',
);
export const vObject = table(
  ['Part of an object', 'In a Bulb', 'In Java'],
  [
    ['State', 'Whether it is on, its watts', 'Data members, such as boolean on'],
    ['Behaviour', 'It can be switched on or off', 'Methods, such as toggle()'],
    ['Identity', 'This bulb, not another one', 'A separate object made with new'],
  ],
  'Table of the parts of an object using a Bulb: state is whether it is on and its watts held in data members; behaviour is switching on and off done by methods; identity is a separate object made with new',
);
const bookedAfter = (k) => {
  const stm = ['x.book(3);', 'y.book(3);'].slice(0, k);
  const src = cTicket.split('\n');
  const at = src.findIndex((l) => l.includes('x.seats = 4;'));
  const head = src.slice(0, at + 2);
  const prog = [...head, ...stm.map((t) => '        ' + t), '        System.out.println(x.booked + " " + y.booked);', '    }', '}'].join('\n');
  return javaOut(prog);
};
export const vTraceTicket = table(
  ['After this statement', 'x.booked', 'y.booked'],
  [[ic('x.seats = 4;') + ' and ' + ic('y.seats = 2;'), ...bookedAfter(0).split(' ')], [ic('x.book(3);'), ...bookedAfter(1).split(' ')], [ic('y.book(3);'), ...bookedAfter(2).split(' ')]],
  'Trace table of two Ticket objects: after the seats are set both have 0 booked; after x.book 3, x has 3 booked and y has 0; after y.book 3, y still has 0 booked because 3 is more than its 2 seats',
  'Each object keeps its own state, and book() refuses a booking that does not fit.',
);
export const vNew = table(
  ['Statement', 'What it does'],
  [
    [ic('Bulb lamp;'), 'Declares a variable lamp that can hold a reference to a Bulb; no object exists yet'],
    [ic('lamp = new Bulb();'), 'Creates the object and stores its reference in lamp'],
    [ic('Bulb lamp = new Bulb();'), 'Declaration and creation in one statement'],
    [ic('Bulb spare = lamp;'), 'Copies the reference: spare and lamp now name the same object'],
    [ic('lamp.toggle();'), 'Sends the message toggle() to the object'],
  ],
  'Table of statements: declaring a variable of class type, creating an object with new, doing both in one statement, copying a reference so two names refer to one object, and calling a method with the object name and a dot',
);
export const vMessage = flow('TB', ['Object A (a Phone) calls b.use(8)', 'The message reaches Object B (a Battery)', 'Battery runs its method use and changes its own data', 'Control returns to the Phone, which continues'], 'Flow of message passing: a Phone object calls the use method of a Battery object; the Battery runs the method and changes its own data; control returns to the Phone', 'Message passing: one object calls a method of another.');
const left = (k) => javaOut(cPhone.replace('        p.play(b);', ['b.use(8);', 'b.use(12);'].slice(0, k).map((x) => '        ' + x).join('\n') || '        // nothing yet'));
export const vTraceBattery = table(
  ['After this statement', 'b.percent'],
  [['Battery created', left(0)], [ic('b.use(8);'), left(1)], [ic('b.use(12);'), left(2)]],
  'Trace table of a Battery object: 90 percent when created, 82 after use 8, and 70 after use 12',
  'The Phone changes the Battery only through its method.',
);
export const vErrors = table(
  ['Slip', 'What the compiler says'],
  [
    ['A statement without a semicolon', ic(errMsg(cErrDoorSemi, { kind: 'compile' }))],
    ['An instance method called with the class name', ic(errMsg(cErrDoorStatic, { kind: 'compile' }))],
    ['A variable of class type used before new', ic(errMsg(cErrDoorInit, { kind: 'compile' }))],
  ],
  'Table of three compile-time errors with the real compiler message: a missing semicolon, an instance method called with the class name, and an object variable used before it is created with new',
);
export const vSummary2 = table(
  ['Idea', 'Remember'],
  [
    ['Applet', 'Ran in a web browser; deprecated in Java 9, marked for removal in Java 17'],
    ['Application', 'Stand-alone program that starts at main'],
    ['javac and JVM', 'javac makes bytecode (.class); the JVM runs it'],
    ['Platform independent', 'Same bytecode runs on any computer with a JVM'],
    ['Object', 'State (data members) and behaviour (methods)'],
    ['Class', 'Blueprint and object factory; objects are made with new'],
    ['Message passing', 'One object calls a method of another'],
  ],
  'Summary table of Part 2: applet, application, javac and the JVM, platform independence, object, class and message passing',
);
