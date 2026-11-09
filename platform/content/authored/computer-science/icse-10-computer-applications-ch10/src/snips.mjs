// Java snippets shared by the question files and the slides of chapter 10 (Encapsulation). Imagined classes only.
// Nothing here states an output: every output or error is produced by running the code through q_util helpers.
// No comment in these programs uses the word that starts a type declaration, so the runner finds the right main.
import { code, two } from './q_util.mjs';

// ================================================================ t01 access specifiers
export const GULLAK = [
  'private int coins = 40;',
  'int notes = 5;',
  'protected int seals = 2;',
  'public int slots = 1;',
  'private void audit() {',
  '    System.out.println("audit done");',
  '}',
  'public int total() {',
  '    return coins + notes * 10;',
  '}',
];
export const gul = (...m) => two('Gullak', GULLAK, 'Check', m);
const G = 'Gullak g = new Gullak();';
export const cPrivRead = gul(G, 'System.out.println(g.coins);');
export const cPrivWrite = gul(G, 'g.coins = 100;');
export const cPrivCall = gul(G, 'g.audit();');
export const cDefRead = gul(G, 'System.out.println(g.notes);');
export const cProtRead = gul(G, 'System.out.println(g.seals);');
export const cPubRead = gul(G, 'System.out.println(g.slots);');
export const cTotal = gul(G, 'System.out.println(g.total());');
export const cTotalAfter = gul(G, 'g.notes = g.notes + 3;', 'System.out.println(g.total());');
export const cSlotsSet = gul(G, 'g.slots = g.slots + 4;', 'System.out.println(g.slots);');

export const THERMO = [
  'private double reading;',
  'public void setReading(double t) {',
  '    if (t >= -10 && t <= 55)',
  '        reading = t;',
  '    else',
  '        System.out.println("Rejected: " + t);',
  '}',
  'public double getReading() {',
  '    return reading;',
  '}',
];
export const thermo = (...m) => two('Thermo', THERMO, 'Log', m);
export const cThermo = (vals) => thermo('Thermo t = new Thermo();', ...vals.map((v) => `t.setReading(${v});`), 'System.out.println(t.getReading());');
export const cThermoDirect = thermo('Thermo t = new Thermo();', 't.reading = 80;');
export const cRaw = two('Raw', ['public double reading;'], 'Log', ['Raw t = new Raw();', 't.reading = 80;', 'System.out.println(t.reading);']);

export const STALL = [
  'private int sales;',
  'Stall(int s) {',
  '    sales = s;',
  '}',
  'boolean beats(Stall other) {',
  '    return sales > other.sales;',
  '}',
];
export const cStall = two('Stall', STALL, 'Market', ['Stall a = new Stall(120);', 'Stall b = new Stall(90);', 'System.out.println(a.beats(b));']);
export const cStallOutside = two('Stall', STALL, 'Market', ['Stall a = new Stall(120);', 'System.out.println(a.sales);']);

export const BADGE = [
  'private int badgeNo;',
  'public Badge(int n) {',
  '    badgeNo = n;',
  '}',
  'public int getBadgeNo() {',
  '    return badgeNo;',
  '}',
];
export const badge = (...m) => two('Badge', BADGE, 'Gate', ['Badge b = new Badge(214);', ...m]);
export const cBadgeGet = badge('System.out.println(b.getBadgeNo());');
export const cBadgeSet = badge('b.setBadgeNo(9);');
export const cBadgeDirect = badge('b.badgeNo = 9;');
export const cMint = two('Mint', ['private Mint() {', '}'], 'Press', ['Mint m = new Mint();']);
export const cTopPrivate = code('private class Hidden {', '}', '', 'public class Start {', '    public static void main(String[] args) {', '        System.out.println("ok");', '    }', '}');
export const cTopProtected = cTopPrivate.replace('private class', 'protected class');
export const cTopStatic = cTopPrivate.replace('private class', 'static class');
export const cTopPublic = cTopPrivate.replace('private class Hidden', 'public class Hidden').replace('public class Start', 'class Start');

export const PIGGY = [
  'private int rupees;',
  'public void deposit(int amt) {',
  '    if (amt > 0)',
  '        rupees = rupees + amt;',
  '}',
  'public int getRupees() {',
  '    return rupees;',
  '}',
];
export const cPiggy = two('Piggy', PIGGY, 'Home', ['Piggy p = new Piggy();', 'p.deposit(250);', 'p.deposit(-40);', 'p.deposit(100);', 'System.out.println(p.getRupees());']);

// ================================================================ t02 scope of variables
export const TOKEN = [
  'static int next = 1;',
  'int token;',
  'TokenDesk() {',
  '    token = next;',
  '    next++;',
  '}',
  'void serve(int counter) {',
  '    int wait = token * 2;',
  '    System.out.println("Token " + token + " at counter " + counter + ", wait " + wait);',
  '}',
];
export const tok = (...m) => two('TokenDesk', TOKEN, 'Hall', m);
export const cTokenServe = tok('TokenDesk a = new TokenDesk();', 'TokenDesk b = new TokenDesk();', 'a.serve(1);', 'b.serve(2);', 'System.out.println(TokenDesk.next);');
export const cTokenN = (n) => tok(...Array.from({ length: n }, () => 'new TokenDesk();'), 'System.out.println(TokenDesk.next);');
export const cTokenBefore = tok('System.out.println(TokenDesk.next);');
export const cTokenShare = tok('TokenDesk a = new TokenDesk();', 'TokenDesk b = new TokenDesk();', 'a.next = 50;', 'System.out.println(b.next);');
export const cTokenIds = tok('TokenDesk a = new TokenDesk();', 'TokenDesk b = new TokenDesk();', 'TokenDesk c = new TokenDesk();', 'System.out.println(a.token + " " + b.token + " " + c.token);');
export const cTokenOwn = tok('TokenDesk a = new TokenDesk();', 'TokenDesk b = new TokenDesk();', 'a.token = 70;', 'System.out.println(a.token + " " + b.token);');

export const TALLY = [
  'int inst = 0;',
  'static int stat = 0;',
  'int bump() {',
  '    int local = 0;',
  '    local++;',
  '    inst++;',
  '    stat++;',
  '    return local;',
  '}',
];
export const cTally = two('Tally', TALLY, 'Run', ['Tally a = new Tally();', 'Tally b = new Tally();', 'System.out.println(a.bump() + " " + a.bump() + " " + b.bump());', 'System.out.println(a.inst + " " + b.inst + " " + Tally.stat);']);
export const cTallyB = two('Tally', TALLY, 'Run', ['Tally a = new Tally();', 'Tally b = new Tally();', 'a.bump();', 'b.bump();', 'b.bump();', 'System.out.println(a.inst + " " + b.inst + " " + Tally.stat);']);

export const cLoopScope = code('for (int i = 0; i < 3; i++) {', '    System.out.println(i);', '}', 'System.out.println(i);');
export const cIfScope = code('int n = 5;', 'if (n > 2) {', '    int bonus = 10;', '    n = n + bonus;', '}', 'System.out.println(bonus);');
export const cTwoLoops = code('int sum = 0;', 'for (int i = 1; i <= 3; i++)', '    sum = sum + i;', 'for (int i = 1; i <= 4; i++)', '    sum = sum + i * 10;', 'System.out.println(sum);');
export const cRedecl = code('int x = 1;', 'if (x > 0) {', '    int x = 2;', '}', 'System.out.println(x);');
export const cUninit = code('int total;', 'System.out.println(total);');
export const cInstDefault = two('Bin', ['int count;', 'double rate;', 'boolean full;'], 'Use', ['Bin b = new Bin();', 'System.out.println(b.count + " " + b.rate + " " + b.full);']);
export const cVisitsErr = code('public class Visits {', '    int count = 0;', '    public static void main(String[] args) {', '        count++;', '        System.out.println(count);', '    }', '}');
export const cVisitsMeth = code('public class Visits {', '    void show() {', '        System.out.println("hello");', '    }', '    public static void main(String[] args) {', '        show();', '    }', '}');
export const cVisitsFix = code('public class Visits {', '    int count = 0;', '    public static void main(String[] args) {', '        Visits v = new Visits();', '        v.count++;', '        System.out.println(v.count);', '    }', '}');
export const cParamRedecl = code('public class Dup {', '    static int twice(int n) {', '        int n = 2;', '        return n * 2;', '    }', '    public static void main(String[] args) {', '        System.out.println(twice(5));', '    }', '}');

export const GAUGE = [
  'int level = 10;',
  'void raiseBad(int level) {',
  '    level = level + 5;',
  '}',
  'void raiseOk(int level) {',
  '    this.level = level + 5;',
  '}',
  'void show() {',
  '    int level = 99;',
  '    System.out.println(level + " " + this.level);',
  '}',
];
export const gauge = (...m) => two('Gauge', GAUGE, 'Dial', ['Gauge g = new Gauge();', ...m]);
export const cGaugeBad = gauge('g.raiseBad(20);', 'System.out.println(g.level);');
export const cGaugeOk = gauge('g.raiseOk(20);', 'System.out.println(g.level);');
export const cGaugeShow = gauge('g.show();');
export const cByValue = code('public class Marks {', '    static void raise(int m) {', '        m = m + 5;', '        System.out.println("inside " + m);', '    }', '    public static void main(String[] args) {', '        int m = 10;', '        raise(m);', '        System.out.println("outside " + m);', '    }', '}');

export const cCafe = code(
  'public class Cafe {',
  '    static int served = 0;',
  '    int price;',
  '    Cafe(int p) {',
  '        price = p;',
  '    }',
  '    int order(int qty) {',
  '        int bill = qty * price;',
  '        served = served + qty;',
  '        return bill;',
  '    }',
  '    public static void main(String[] args) {',
  '        Cafe c = new Cafe(15);',
  '        int amount = c.order(4);',
  '        System.out.println(amount + " " + served);',
  '    }',
  '}',
);
