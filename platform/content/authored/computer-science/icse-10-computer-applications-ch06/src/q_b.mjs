// ICSE 10 Computer Applications, ch06: topic t02 (class as an abstraction and an object factory; objects with new).
import { Q, mcq, ar, tf, fb, match, ord, short, co } from '../../icse-10-computer-applications-ch01/src/lib.mjs';
import { code, F, ic, ev, out, oline, oic, distinct, mustFail, full } from './q_util.mjs';
import { scorer, scorerDriver } from './q_a.mjs';

// ---- shared classes
export const seedPacket = code(
  'class SeedPacket {',
  '    String variety;',
  '    int seeds;',
  '    double price;',
  '',
  '    void set(String v, int s, double p) {',
  '        variety = v;',
  '        seeds = s;',
  '        price = p;',
  '    }',
  '',
  '    double costPerSeed() {',
  '        return price / seeds;',
  '    }',
  '',
  '    boolean cheaperThan(SeedPacket other) {',
  '        return costPerSeed() < other.costPerSeed();',
  '    }',
  '',
  '    void show() {',
  '        System.out.println(variety + ": " + seeds + " seeds, Rs " + price);',
  '    }',
  '}',
);
export const seedDriver = (...body) => full(seedPacket, ...body);
export const twoPackets = ['SeedPacket a = new SeedPacket();', 'SeedPacket b = new SeedPacket();', 'a.set("Tomato", 50, 25.0);', 'b.set("Marigold", 120, 30.0);'];
export const hostelRoom = code(
  'class HostelRoom {',
  '    int roomNo;',
  '    int beds;',
  '    int occupied;',
  '',
  '    void set(int no, int b) {',
  '        roomNo = no;',
  '        beds = b;',
  '    }',
  '',
  '    int vacancy() {',
  '        return beds - occupied;',
  '    }',
  '',
  '    int admit(int n) {',
  '        int free = vacancy();',
  '        int taken = n;',
  '        if (n > free)',
  '            taken = free;',
  '        occupied = occupied + taken;',
  '        return taken;',
  '    }',
  '}',
);
export const roomRun = (x, y) => full(hostelRoom, 'HostelRoom r = new HostelRoom();', 'r.set(12, 4);', `int a = r.admit(${x});`, `int b = r.admit(${y});`, 'System.out.println(a + " " + b + " " + r.vacancy());');
export const busPass = code(
  'class BusPass {',
  '    String holder;',
  '    int zone;',
  '    int daysLeft;',
  '',
  '    void set(String h, int z, int d) {',
  '        holder = h;',
  '        zone = z;',
  '        daysLeft = d;',
  '    }',
  '',
  '    void renew(int days) {',
  '        daysLeft = daysLeft + days;',
  '    }',
  '',
  '    boolean sameZone(BusPass other) {',
  '        return zone == other.zone;',
  '    }',
  '',
  '    void show() {',
  '        System.out.println(holder + " zone " + zone + ", " + daysLeft + " days left");',
  '    }',
  '}',
);

// ================================================================ t02 class as abstraction and object factory
Q('m_class_def', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'In object-oriented programming, what is a class?',
  opts: distinct(['A blueprint (template) that describes the data members and methods common to a set of objects', 'A single object stored in the memory of the computer', 'A variable that stores the address of an object', 'A statement that creates objects']),
  sol: 'A class is a user-defined type that describes the common state (data members) and behaviour (methods) of a set of similar objects. An object is one instance made from it, and the address of the object is held by a reference variable.',
}));
Q('m_object_factory', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Why is a class sometimes called an object factory?',
  opts: distinct(['Any number of objects, each with its own state, can be created from it with the new operator', 'It can create only one object during the whole run of a program', 'It manufactures new classes when it is compiled', 'It stores all the objects of a program in one list']),
  sol: 'Like a factory that makes many items from one design, a class produces as many objects as required. Each object made with new gets its own copy of the data members, so the objects can hold different values.',
}));
Q('m_new_op', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'What does the new operator do in the statement `HostelRoom r = new HostelRoom();`?',
  opts: distinct(['It creates an object of the class in memory and gives its reference', 'It declares the class HostelRoom', 'It deletes the object r from the memory', 'It copies one existing object into r']),
  sol: 'The operator new allocates memory for a new object of the named class, gives its data members their default values and returns a reference to the object, which is stored in the variable r.',
}));
Q('m_objects_count', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: `How many SeedPacket objects exist after the following statements are executed?\n\n${F(code('SeedPacket a = new SeedPacket();', 'SeedPacket b = new SeedPacket();', 'SeedPacket c;', 'SeedPacket d = a;'))}`,
  opts: distinct(['2', '4', '3', '1']),
  sol: 'An object is created only by new, and new is executed twice. The statement `SeedPacket c;` declares a reference variable but creates no object, and `SeedPacket d = a;` makes d refer to the object that a already refers to.',
}));
Q('m_abstraction_pick', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'A hostel office writes the class HostelRoom to allot beds to students. By abstraction, which of the following attributes should be left out of the class?',
  opts: distinct(['The colour of the curtains of the room', 'The number of beds in the room', 'The room number', 'The number of students already living in the room']),
  sol: 'Abstraction means keeping only the attributes that matter for the purpose of the program. Bed allotment needs the room number, the beds and the occupancy; the curtain colour plays no part in it.',
}));
const costOf = seedDriver(...twoPackets, 'System.out.println(a.costPerSeed() + " " + b.costPerSeed());');
Q('m_two_objects_out', mcq({
  t: 2, d: 3, c: 'application',
  stem: `A seed shop creates two packets with the program below. What does it display?\n\n${F(costOf)}`,
  opts: distinct([oic(costOf), oic(seedDriver(...twoPackets, 'System.out.println(a.price + " " + b.price);')), oic(seedDriver(...twoPackets, 'System.out.println(a.seeds + " " + b.seeds);')), oic(seedDriver(...twoPackets, 'System.out.println(a.costPerSeed() + b.costPerSeed());'))]),
  sol: 'costPerSeed divides the price by the number of seeds of the object it is called on: 25.0 divided by 50 for a and 30.0 divided by 120 for b. The other options print the prices, the seed counts and the sum of the two costs.',
}));
const bp = (stmt) => full(`${busPass}`, stmt);
const errCall = mustFail(bp('BusPass pass1 = BusPass();'), 'no new');
const errOrder = mustFail(bp('new BusPass pass1();'), 'new first');
const errBrackets = mustFail(bp('BusPass pass1 = new BusPass;'), 'no brackets');
Q('m_create_stmt', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which statement correctly declares a variable pass1 and creates an object of the class BusPass for it?',
  opts: distinct([ic('BusPass pass1 = new BusPass();'), ic('BusPass pass1 = BusPass();'), ic('new BusPass pass1();'), ic('BusPass pass1 = new BusPass;')]),
  sol: `The pattern is ClassName variable = new ClassName(); . Without new, javac says "${errCall}"; with new written before the variable it says "${errOrder}"; and without the brackets it says "${errBrackets}".`,
}));
Q('m_hostel_run', mcq({
  t: 2, d: 4, c: 'application',
  stem: `A hostel room has 4 beds. What does the program below display?\n\n${F(roomRun(3, 3))}`,
  opts: distinct([oic(roomRun(3, 3)), oic(roomRun(2, 3)), oic(roomRun(5, 1)), oic(roomRun(1, 1))]),
  sol: 'The first admit(3) finds 4 free beds and takes all 3. The second admit(3) finds only 1 free bed, so n is greater than free and only 1 is taken; the method returns what was actually taken. The vacancy is then 4 - 4 = 0. The other options are the results of admitting different numbers of students.',
}));

Q('ar_blueprint', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'A class such as SeedPacket is a user-defined data type.',
  r: 'Every object of a class has its own copy of the data members.',
  sol: 'A class defines a new type whose name can be used to declare variables, so (A) is true. (R) is also true, but it describes how objects keep their state; it does not give the reason why the class is a data type, which is that it defines a new kind of value with its own data and operations.',
}));
const errUninit = mustFail(seedDriver('SeedPacket p;', 'p.show();'), 'declared only');
Q('ar_declare', ar({
  t: 2, d: 4, c: 'analysis', verdict: 'A-false-R-true',
  a: 'The statement `SeedPacket p;` creates a SeedPacket object.',
  r: 'An object is created only when the new operator is executed.',
  sol: `A declaration only introduces a reference variable. Using p afterwards, as in p.show(), makes javac report "${errUninit}" because no object was ever assigned to it. So (A) is false and (R) is true.`,
}));
Q('tf_many_objects', tf({
  t: 2, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? Several objects of the class CricketScorer, each holding different runs, can exist at the same time.',
  sol: `Each use of new makes a separate object with its own data members. Two scorers given 4 and 6 runs show ${ic(oline(scorerDriver('CricketScorer a = new CricketScorer();', 'CricketScorer b = new CricketScorer();', 'a.hit(4);', 'b.hit(6);', 'a.show();', 'b.show();')))}.`,
}));
Q('fb_blueprint', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'A class is a ___ from which objects are created with the ___ operator.',
  acc: [['blueprint', 'template', 'plan', 'prototype'], ['new']],
  sol: 'A class is a blueprint (template) for objects, and an object is made from it with the operator new.',
}));
Q('mt_oop_terms', match({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each term of object-oriented programming, used with a class such as SeedPacket, to its meaning.',
  pairs: [
    ['Class', 'a user-defined type that is a blueprint for a set of objects'],
    ['Object', 'an instance of a class, created with new'],
    ['Instance variable', 'a data member of which every object has its own copy'],
    ['Member method', 'a function of the class that works on the data members'],
  ],
  sol: 'The class is the description, the object is a real instance made from it, instance variables hold the state and member methods give the behaviour.',
}));
Q('ord_model', ord({
  t: 2, d: 3, c: 'application',
  stem: 'Arrange the steps of writing and using a class for a real-life entity, such as a bus pass, in the correct order.',
  items: ['Decide which attributes and actions of the entity matter for the program', 'Write the class with data members and member methods', 'Declare a variable of the class and create the object with new', 'Call the member methods on the object with the dot operator'],
  sol: 'The design comes first, then the class is written; only then can an object be created from it, and its methods are called on that object.',
}));

// ---- code output, t02
Q('co_seed_two', co({
  pre: 'A shop compares two seed packets. Write the exact output of the program.',
  t: 2, d: 3, c: 'application',
  code: seedDriver(...twoPackets, 'a.show();', 'b.show();', 'System.out.println(a.cheaperThan(b));'),
  sol: 'show prints the data members of each object. The cost per seed is 0.5 for a and 0.25 for b, so a.cheaperThan(b) tests 0.5 < 0.25, which is false.',
}));
Q('co_scorer', co({
  pre: 'Two scorers are used for two matches. Write the exact output of the program.',
  t: 2, d: 3, c: 'application',
  code: scorerDriver('CricketScorer x = new CricketScorer();', 'CricketScorer y = new CricketScorer();', 'x.hit(4);', 'x.hit(6);', 'x.out();', 'y.hit(1);', 'y.out();', 'y.out();', 'x.show();', 'y.show();', 'System.out.println(y.average());'),
  sol: 'x has 10 runs and 1 wicket, y has 1 run and 2 wickets; the calls on one object never change the other. For y, average divides 1 run by 2 wickets, which gives 0.5.',
}));
Q('co_room_return', co({
  pre: 'A hostel room of 4 beds is used as shown. Write the exact output of the program.',
  t: 2, d: 4, c: 'analysis',
  code: full(hostelRoom, 'HostelRoom r = new HostelRoom();', 'r.set(7, 4);', 'int got = r.admit(6);', 'System.out.println(got);', 'System.out.println(r.vacancy());', 'System.out.println(r.admit(2));'),
  sol: 'The room has 4 free beds, so admit(6) takes only 4 and returns that number. The vacancy becomes 0. In the last call free is 0, so no student is taken and the method returns 0.',
}));
Q('co_cheaper', co({
  pre: 'A method receives another object as its argument. Write the exact output of the program.',
  t: 2, d: 4, c: 'analysis',
  code: seedDriver('SeedPacket a = new SeedPacket();', 'SeedPacket b = new SeedPacket();', 'a.set("Okra", 40, 20.0);', 'b.set("Beans", 25, 20.0);', 'System.out.println(a.cheaperThan(b));', 'System.out.println(b.cheaperThan(a));', 'System.out.println(a.cheaperThan(a));'),
  sol: 'Inside cheaperThan the call costPerSeed() works on the object that received the message, and other.costPerSeed() on the argument. a costs 0.5 per seed and b costs 0.8. The test is strict, so an object is never cheaper than itself.',
}));
Q('co_err_no_new', co({
  pre: 'A student declares a variable of the class SeedPacket and calls a method at once, as shown. State the error that the compiler reports.',
  t: 2, d: 3, c: 'analysis', error: true,
  code: seedDriver('SeedPacket p;', 'p.set("Mint", 10, 5.0);'),
  sol: 'The declaration creates only a reference variable. It has no object until the statement p = new SeedPacket(); is executed, so the compiler refuses to use p.',
  scheme: [['Compile-time error with the correct line', 1], ['Reason: no object has been created with new, so p holds nothing', 1]],
}));

// ---- short answers, t02
Q('s_class_object', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: [25, 90],
  stem: 'Distinguish between a class and an object with one example.',
  model: 'A **class** is a blueprint: a user-defined data type that describes the data members and member methods common to a set of similar entities. An **object** is a real instance of the class, created with `new`, with its own values for the data members.\n\nExample: `BusPass` is a class; the pass of one student, created by `new BusPass()`, is an object.',
  sol: 'One mark for each of the two terms, with the example.',
  scheme: [['Class: blueprint or type for a set of objects', 1], ['Object: instance of the class created with new; example', 1]],
}));
Q('s_new_op', short({
  t: 2, d: 3, c: 'understanding', marks: 2, wl: [25, 90],
  stem: 'Explain the working of the statement `SeedPacket p = new SeedPacket();`. What happens if the variable is only declared as `SeedPacket p;` and then used?',
  model: `The operator **new** creates a SeedPacket object in memory, gives its data members default values and returns its reference, which is stored in the variable p. A declaration alone creates no object: using p afterwards gives the compile-time error "${errUninit}".`,
  sol: 'One mark for what new does and one mark for the effect of declaring only.',
  scheme: [['new creates the object and returns its reference, stored in p', 1], ['Declaration alone creates no object; using p is an error', 1]],
}));
Q('s_abstraction', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: [25, 90],
  stem: 'What is abstraction? Name three attributes you would keep in a class BusPass for a school transport office, and one you would leave out.',
  model: '**Abstraction** means keeping only the essential attributes and actions of a real-life entity that the program needs, and ignoring the rest.\n\nFor BusPass the transport office would keep `holder`, `zone` and `daysLeft`; it would leave out the colour of the pass, which plays no part in fees or validity.',
  sol: 'One mark for the meaning of abstraction and one mark for sensible attributes kept and left out.',
  scheme: [['Abstraction: only the essential details for the purpose are modelled', 1], ['Three suitable attributes kept and one irrelevant attribute left out', 1]],
}));
Q('s_factory', short({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: 'A class is called an object factory. Show with three statements in main how three HostelRoom objects can be made from the class and given different bed counts. What does the room numbered 3 show for its beds after the statements?',
  model: `${F(code('HostelRoom r1 = new HostelRoom();', 'HostelRoom r2 = new HostelRoom();', 'HostelRoom r3 = new HostelRoom();', 'r1.set(1, 2);', 'r2.set(2, 4);', 'r3.set(3, 6);'))}\n\nEach new creates a separate object with its own data members, so the objects hold different values. The beds of r3 are **${out(full(hostelRoom, 'HostelRoom r1 = new HostelRoom();', 'HostelRoom r2 = new HostelRoom();', 'HostelRoom r3 = new HostelRoom();', 'r1.set(1, 2);', 'r2.set(2, 4);', 'r3.set(3, 6);', 'System.out.println(r3.beds);'))}**.`,
  sol: 'One mark for creating three objects with new, and one mark for the state of r3, found by running the statements.',
  scheme: [['Three objects created with new, each with its own reference variable', 1], ['Different values set with set(); beds of r3 correct', 1]],
}));
