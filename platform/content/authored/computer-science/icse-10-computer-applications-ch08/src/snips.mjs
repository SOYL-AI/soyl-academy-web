// Java snippets shared by the question files and the slides of chapter 8 (Constructors). Imagined classes only.
// Nothing here states an output: every output is produced by running the code through q_util helpers.
import { code, cls } from './q_util.mjs';

// ---- Parcel: default constructor that announces itself
export const PARCEL_D = [
  'int weight;',
  'double charge;',
  'Parcel() {',
  '    weight = 500;',
  '    charge = 35;',
  '    System.out.println("Parcel created");',
  '}',
  'void show() {',
  '    System.out.println(weight + " g, Rs " + charge);',
  '}',
];
export const cOneParcel = cls('Parcel', PARCEL_D, ['Parcel p = new Parcel();', 'p.show();']);
export const cThreeParcels = cls('Parcel', PARCEL_D, ['Parcel a = new Parcel();', 'Parcel b = new Parcel();', 'Parcel c = new Parcel();']);
export const cDeclareOnly = cls('Parcel', PARCEL_D, ['Parcel p;', 'System.out.println("Declared");', 'p = new Parcel();', 'System.out.println("Created");']);
export const cTwoRefs = cls('Parcel', PARCEL_D, ['Parcel p = new Parcel();', 'Parcel q = p;', 'q.show();']);

// ---- data members with no constructor: default values
export const cKioskDefaults = cls('Kiosk', ['int count;', 'double price;', 'boolean open;', 'String owner;'], [
  'Kiosk k = new Kiosk();',
  'System.out.println(k.count);',
  'System.out.println(k.price);',
  'System.out.println(k.open);',
  'System.out.println(k.owner);',
]);
// a class with no constructor at all can still be instantiated
export const cNoCtorNew = cls('Kiosk', ['int count;', 'void sell() {', '    count = count + 1;', '}'], ['Kiosk k = new Kiosk();', 'k.sell();', 'k.sell();', 'System.out.println(k.count);']);

// ---- void before the name: an ordinary method, not a constructor
export const DIYA_VOID = ['int lit;', 'void Diya() {', '    lit = 5;', '    System.out.println("Diya ready");', '}'];
export const cVoidNew = cls('Diya', DIYA_VOID, ['Diya d = new Diya();', 'System.out.println(d.lit);']);
export const cVoidCall = cls('Diya', DIYA_VOID, ['Diya d = new Diya();', 'd.Diya();', 'System.out.println(d.lit);']);
export const DIYA_OK = ['int lit;', 'Diya() {', '    lit = 5;', '    System.out.println("Diya ready");', '}'];
export const cDiyaOk = cls('Diya', DIYA_OK, ['Diya d = new Diya();', 'System.out.println(d.lit);']);

// ---- errors with constructors
export const cOnlyParam = cls('Parcel', ['int weight;', 'Parcel(int w) {', '    weight = w;', '}'], ['Parcel p = new Parcel();']);
export const cWrongName = cls('Parcel', ['int weight;', 'Packet() {', '    weight = 500;', '}'], ['Parcel p = new Parcel();']);
export const cCtorReturn = cls('Parcel', ['int weight;', 'Parcel() {', '    weight = 500;', '    return weight;', '}'], ['Parcel p = new Parcel();']);
export const cCtorCallLater = cls('Parcel', ['int weight;', 'Parcel() {', '    weight = 500;', '}'], ['Parcel p = new Parcel();', 'p.Parcel();']);
export const cNoNew = cls('Parcel', ['int weight;', 'Parcel() {', '    weight = 500;', '}'], ['Parcel p = Parcel();']);
export const cStaticCtor = cls('Parcel', ['int weight;', 'static Parcel() {', '    weight = 500;', '}'], ['Parcel p = new Parcel();']);
export const cArgsToDefault = cls('Parcel', ['int weight;', 'Parcel() {', '    weight = 500;', '}'], ['Parcel p = new Parcel(750);']);
export const cDupCtor = cls('Parcel', ['int weight;', 'Parcel(int w) {', '    weight = w;', '}', 'Parcel(int x) {', '    weight = x * 2;', '}'], ['Parcel p = new Parcel(5);']);

// ---- parameterised constructors
export const RICK = ['int seats;', 'double farePerKm;', 'Rickshaw(int s, double f) {', '    seats = s;', '    farePerKm = f;', '}', 'double fare(int km) {', '    return farePerKm * km;', '}'];
export const cRick = (s, f, km) => cls('Rickshaw', RICK, [`Rickshaw r = new Rickshaw(${s}, ${f});`, `System.out.println(r.seats + " " + r.fare(${km}));`]);
export const cKioskPartial = cls('Kiosk', ['int count;', 'double price;', 'String owner;', 'Kiosk() {', '    count = 4;', '    owner = "Ravi";', '}'], ['Kiosk k = new Kiosk();', 'System.out.println(k.count + " " + k.price + " " + k.owner);']);
export const cSackThree = cls('Sack', ['int kg;', 'Sack(int k) {', '    if (k < 0)', '        kg = 0;', '    else', '        kg = k;', '}'], ['Sack a = new Sack(12);', 'Sack b = new Sack(-3);', 'Sack c = new Sack(0);', 'System.out.println(a.kg + " " + b.kg + " " + c.kg);']);
export const cMemberThisOne = cls('Member', ['String name;', 'int age;', 'Member(String name, int age) {', '    this.name = name;', '    age = age;', '}', 'void show() {', '    System.out.println(name + " " + age);', '}'], ['Member m = new Member("Kavya", 15);', 'm.show();']);
export const cSack = cls('Sack', ['int kg;', 'Sack(int k) {', '    if (k < 0)', '        kg = 0;', '    else', '        kg = k;', '}'], ['Sack a = new Sack(-5);', 'Sack b = new Sack(40);', 'System.out.println(a.kg + " " + b.kg);']);
export const cFloor = cls('Floor', ['double length, breadth, area;', 'Floor(double l, double b) {', '    length = l;', '    breadth = b;', '    findArea();', '}', 'void findArea() {', '    area = length * breadth;', '}'], ['Floor f = new Floor(6, 4.5);', 'System.out.println(f.area);']);
export const MEMBER_BAD = ['String name;', 'int age;', 'Member(String name, int age) {', '    name = name;', '    age = age;', '}', 'void show() {', '    System.out.println(name + " " + age);', '}'];
export const MEMBER_OK = ['String name;', 'int age;', 'Member(String name, int age) {', '    this.name = name;', '    this.age = age;', '}', 'void show() {', '    System.out.println(name + " " + age);', '}'];
export const cMemberBad = cls('Member', MEMBER_BAD, ['Member m = new Member("Kavya", 15);', 'm.show();']);
export const cMemberOk = cls('Member', MEMBER_OK, ['Member m = new Member("Kavya", 15);', 'm.show();']);
export const cMemberHalf = cls('Member', ['String name;', 'int age;', 'Member(String name, int a) {', '    this.name = name;', '    age = a;', '}', 'void show() {', '    System.out.println(name + " " + age);', '}'], ['Member m = new Member("Kavya", 15);', 'm.show();']);

// ---- constructor overloading
export const METER = [
  'Meter() {',
  '    System.out.println("no argument");',
  '}',
  'Meter(int n) {',
  '    System.out.println("int " + n);',
  '}',
  'Meter(double d) {',
  '    System.out.println("double " + d);',
  '}',
  'Meter(String s) {',
  '    System.out.println("String " + s);',
  '}',
];
export const cMeter = (...calls) => cls('Meter', METER, calls.map((c) => `new Meter(${c});`));
export const METER_IS = ['Meter() {', '    System.out.println("no argument");', '}', 'Meter(int n) {', '    System.out.println("int " + n);', '}', 'Meter(String s) {', '    System.out.println("String " + s);', '}'];
export const cMeterBool = cls('Meter', METER_IS, ['new Meter(true);']);
export const cMix = cls('Mix', ['Mix(int a, double b) {', '    System.out.println("int, double");', '}', 'Mix(double a, int b) {', '    System.out.println("double, int");', '}'], ['Mix m = new Mix(2, 3);']);
export const cMixOk = (a, b) => cls('Mix', ['Mix(int a, double b) {', '    System.out.println("int, double");', '}', 'Mix(double a, int b) {', '    System.out.println("double, int");', '}'], [`Mix m = new Mix(${a}, ${b});`]);
export const GATE = ['int id;', 'Gate() {', '    id = 1;', '    System.out.println("Default constructor");', '}', 'Gate(int n) {', '    id = n;', '    System.out.println("Gate " + n + " built");', '}'];
export const cGate = cls('Gate', GATE, ['Gate a = new Gate(7);', 'Gate b = new Gate();', 'Gate c = new Gate(3);', 'System.out.println("a=" + a.id + " b=" + b.id + " c=" + c.id);']);
export const cGateTwo = cls('Gate', GATE, ['Gate x = new Gate();', 'Gate y = new Gate(9);', 'System.out.println(x.id + y.id);']);
export const PACK = ['int items;', 'double price;', 'Pack(int i, double p) {', '    items = i;', '    price = p;', '}', 'Pack(Pack other) {', '    items = other.items;', '    price = other.price;', '}'];
export const cPack = cls('Pack', PACK, ['Pack a = new Pack(12, 99.5);', 'Pack b = new Pack(a);', 'b.items = 20;', 'System.out.println(a.items + " " + b.items + " " + b.price);']);
export const cNoSuchCopy = cls('Pack', ['int items;', 'Pack(int i) {', '    items = i;', '}'], ['Pack a = new Pack(12);', 'Pack b = new Pack(a);']);

// ---- constructor against method
export const CLOCK_C = ['int hour;', 'Clock() {', '    hour = 12;', '    System.out.println("constructor ran");', '}', 'void setHour(int h) {', '    hour = h;', '    System.out.println("method ran");', '}'];
export const cClockNew = cls('Clock', CLOCK_C, ['Clock c = new Clock();', 'System.out.println(c.hour);']);
export const cClockMethod = cls('Clock', CLOCK_C, ['Clock c = new Clock();', 'c.setHour(7);', 'c.setHour(9);', 'System.out.println(c.hour);']);
export const cClockMethodOnly = cls('Clock', ['int hour;', 'void setHour(int h) {', '    hour = h;', '    System.out.println("method ran");', '}'], ['Clock c = new Clock();', 'System.out.println(c.hour);']);
export const cMethodReturn = cls('Clock', ['int hour;', 'int doubleHour() {', '    return hour * 2;', '}'], ['Clock c = new Clock();', 'c.hour = 6;', 'System.out.println(c.doubleHour());']);
export { code };
