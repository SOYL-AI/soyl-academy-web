// Build ISC 12 Accounts ch14 Database Management System. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-accounts-ch14/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('isc-12-accounts-ch14', 'economics-commerce');
const { Db, check, fig, rs, sum, words, rupees, code: C, cell, pin, scalar, join, groupSum, balances, reconcile, brsRows, slmRegister, TYPE_LABEL } = await import('./acc.mjs');
const { FACTS, BANK } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- the case company: Monal Agro Foods Ltd (imagined, Vidisha)
const MO = new Db();
MO.create('Customers', [['CustCode', 'text'], ['CustName', 'text'], ['City', 'text'], ['CreditLimit', 'currency'], ['Agent', 'text']], { pk: 'CustCode' });
MO.load('Customers', [
  ['C01', 'Anupam Annapurti', 'Sehore', 100000, 'Anshul'],
  ['C02', 'Sanchi Provisions', 'Vidisha', 80000, null],
  ['C03', 'Saptarshi Traders', 'Begamganj', 120000, 'Ruchika'],
  ['C04', 'Nirmay Stores', 'Sironj', 60000, 'Anshul'],
  ['C05', 'Gaurang Mart', 'Vidisha', 80000, null],
  ['C06', 'Aarohi Foods', 'Ganjbasoda', 90000, 'Ruchika'],
]);
MO.create('Invoices', [['InvNo', 'number'], ['InvDate', 'date'], ['CustCode', 'text'], ['Amount', 'currency']], { pk: 'InvNo', fks: { CustCode: 'Customers' } });
MO.load('Invoices', [
  [501, '2026-04-03', 'C01', 48000], [502, '2026-04-05', 'C02', 36000], [503, '2026-04-09', 'C03', 52000], [504, '2026-04-12', 'C01', 30000], [505, '2026-04-15', 'C05', 75000],
  [506, '2026-04-18', 'C04', 22000], [507, '2026-04-22', 'C02', 41000], [508, '2026-04-26', 'C06', 18000], [509, '2026-04-28', 'C05', 64000], [510, '2026-04-30', 'C03', 27000],
]);
MO.create('Receipts', [['RcptNo', 'text'], ['RcptDate', 'date'], ['CustCode', 'text'], ['Amount', 'currency']], { pk: 'RcptNo', fks: { CustCode: 'Customers' } });
MO.load('Receipts', [['R01', '2026-04-20', 'C01', 48000], ['R02', '2026-04-25', 'C02', 36000], ['R03', '2026-04-28', 'C05', 50000], ['R04', '2026-04-30', 'C03', 52000]]);
const nF = pin(MO.colNames('Customers').length, 5, 'Monal fields');
const nR = pin(MO.table('Customers').rows.length, 6, 'Monal records');
const nI = pin(MO.table('Invoices').rows.length, 10, 'Monal invoices');

// WE2: key verdicts.
const WE2 = [
  ['Invoice 511, 2 May 2026, customer C07, ₹26,000', MO.verdict('Invoices', { InvNo: 511, InvDate: '2026-05-02', CustCode: 'C07', Amount: 26000 })],
  ['Customer C03, Udaygiri Traders, Vidisha', MO.verdict('Customers', { CustCode: 'C03', CustName: 'Udaygiri Traders', City: 'Vidisha', CreditLimit: 50000 })],
  ['Invoice with no number, customer C02, ₹9,000', MO.verdict('Invoices', { InvDate: '2026-05-02', CustCode: 'C02', Amount: 9000 })],
  ['Invoice 511, 2 May 2026, customer C04, ₹26,000', MO.verdict('Invoices', { InvNo: 511, InvDate: '2026-05-02', CustCode: 'C04', Amount: 26000 })],
];
pin(WE2.map((x) => x[1]), ['Rejected: no matching record in Customers (foreign key)', 'Rejected: duplicate primary key', 'Rejected: primary key left blank', 'Accepted'], 'Monal verdicts');
const WE2_del = pin(MO.clone().run("DELETE FROM Customers WHERE CustCode = 'C04'"), { affected: 0, refused: 'Refused: 1 record(s) in Invoices refer to C04' }, 'Monal delete C04');

// WE3: one-to-many — invoices per customer by COUNT queries.
const perCust = MO.table('Customers').rows.map((r) => [r.CustCode, r.CustName, scalar(MO.q(`SELECT COUNT(*) FROM Invoices WHERE CustCode = '${r.CustCode}'`))]);
pin(perCust.map((x) => x[2]), [2, 2, 2, 1, 2, 1], 'Monal invoices per customer');
check(sum(perCust.map((x) => x[2])) === nI, 'every invoice belongs to one customer');

// WE4: sales by city report (join + group).
const byCity = groupSum(join(MO, 'Invoices', 'CustCode', 'Customers'), 'City', 'Amount');
pin(byCity, [['Sehore', 78000], ['Vidisha', 216000], ['Begamganj', 79000], ['Sironj', 22000], ['Ganjbasoda', 18000]], 'Monal by city');
const salesTotal = pin(scalar(MO.q('SELECT SUM(Amount) FROM Invoices')), 413000, 'Monal sales');
check(sum(byCity.map((x) => x[1])) === salesTotal, 'city report total');

// Index on CustCode in Invoices: sorted key → invoice numbers.
const idx = [...new Set(MO.table('Invoices').rows.map((r) => r.CustCode))].sort().map((k) => [k, MO.table('Invoices').rows.filter((r) => r.CustCode === k).map((r) => r.InvNo)]);
check(sum(idx.map((x) => x[1].length)) === nI, 'index covers every invoice');

// Part 2 queries.
const Q5 = 'SELECT InvNo, CustCode, Amount FROM Invoices WHERE Amount > 40000;';
const R5 = pin(MO.q(Q5).rows, [[501, 'C01', 48000], [503, 'C03', 52000], [505, 'C05', 75000], [507, 'C02', 41000], [509, 'C05', 64000]], 'WE5');
const Q6a = "SELECT InvNo FROM Invoices WHERE Amount > 40000 AND InvDate >= '2026-04-15';";
const Q6b = "SELECT InvNo FROM Invoices WHERE CustCode = 'C02' OR CustCode = 'C05';";
const R6a = pin(MO.q(Q6a).rows.map((r) => r[0]), [505, 507, 509], 'WE6 and');
const R6b = pin(MO.q(Q6b).rows.map((r) => r[0]), [502, 505, 507, 509], 'WE6 or');
const Q6c = "SELECT InvNo FROM Invoices WHERE CustCode = 'C01' OR CustCode = 'C03' AND Amount > 30000;";
const Q6d = "SELECT InvNo FROM Invoices WHERE (CustCode = 'C01' OR CustCode = 'C03') AND Amount > 30000;";
const R6c = pin(MO.q(Q6c).rows.map((r) => r[0]), [501, 503, 504], 'precedence plain');
const R6d = pin(MO.q(Q6d).rows.map((r) => r[0]), [501, 503], 'precedence brackets');
// WE7: UPDATE and DELETE run in order on a copy.
const M7 = MO.clone();
const S7 = ["UPDATE Customers SET CreditLimit = CreditLimit + 20000 WHERE City = 'Vidisha';", "DELETE FROM Customers WHERE CustCode = 'C04';", 'DELETE FROM Invoices WHERE InvNo = 506;', "DELETE FROM Customers WHERE CustCode = 'C04';"];
const R7 = S7.map((s) => M7.run(s));
pin(R7, [{ affected: 2, refused: null }, { affected: 0, refused: 'Refused: 1 record(s) in Invoices refer to C04' }, { affected: 1, refused: null }, { affected: 1, refused: null }], 'WE7');
pin(M7.table('Customers').rows.filter((r) => r.City === 'Vidisha').map((r) => r.CreditLimit), [100000, 100000], 'WE7 new limits');
check(MO.table('Customers').rows.length === nR && MO.table('Invoices').rows.length === nI, 'WE7 ran on a copy');
// WE8: aggregates.
const AGG = [
  ['SELECT COUNT(*) FROM Invoices;', 'Number of invoices'],
  ['SELECT SUM(Amount) FROM Invoices;', 'Total credit sales'],
  ['SELECT AVG(Amount) FROM Invoices;', 'Average invoice'],
  ['SELECT MAX(Amount) FROM Invoices;', 'Largest invoice'],
  ['SELECT MIN(Amount) FROM Invoices;', 'Smallest invoice'],
  ["SELECT SUM(Amount) FROM Invoices WHERE CustCode = 'C05';", 'Sales to Gaurang Mart'],
].map(([q, what]) => [q, what, scalar(MO.q(q))]);
pin(AGG.map((x) => x[2]), [10, 413000, 41300, 75000, 18000, 139000], 'WE8');
const CNT = pin(MO.q('SELECT COUNT(*), COUNT(Agent) FROM Customers;').rows[0], [6, 4], 'WE8 counts');
// WE9: debtors.
const DEB = balances(MO, 'Customers', 'Invoices', 'Receipts', { nameCol: 'CustName', limitCol: 'CreditLimit' });
pin(DEB.rows.map((r) => r.balance), [30000, 41000, 27000, 22000, 89000, 18000], 'WE9 balances');
pin(DEB.total, 227000, 'WE9 total');
const over = DEB.rows.filter((r) => r.balance > r.limit);
pin(over.map((r) => [r.key, r.balance - r.limit]), [['C05', 9000]], 'WE9 over limit');
// WE10: bank reconciliation by matching.
MO.create('CashBook', [['Ref', 'text'], ['EntryDate', 'date'], ['Particulars', 'text'], ['Deposit', 'currency'], ['Withdrawal', 'currency']], { pk: 'Ref' });
MO.load('CashBook', [
  ['CH201', '2026-04-08', 'Cheque to wheat supplier', 0, 60000], ['CH202', '2026-04-16', 'Cheque for godown rent', 0, 25000], ['DP01', '2026-04-20', 'Cheque from Anupam Annapurti', 48000, 0], ['DP02', '2026-04-25', 'Cheque from Sanchi Provisions', 36000, 0],
  ['CH203', '2026-04-27', 'Cheque to packaging supplier', 0, 34000], ['DP03', '2026-04-28', 'Cheque from Gaurang Mart', 50000, 0], ['CH204', '2026-04-29', 'Cheque for transport', 0, 15000], ['DP04', '2026-04-30', 'Cheque from Saptarshi Traders', 52000, 0],
]);
MO.create('BankStmt', [['Ref', 'text'], ['TxnDate', 'date'], ['Particulars', 'text'], ['Credit', 'currency'], ['Debit', 'currency']], { pk: 'Ref' });
MO.load('BankStmt', [
  ['CH201', '2026-04-11', 'Cheque paid', 0, 60000], ['CH202', '2026-04-19', 'Cheque paid', 0, 25000], ['DP01', '2026-04-22', 'Clearing credit', 48000, 0], ['DP02', '2026-04-27', 'Clearing credit', 36000, 0],
  ['DP03', '2026-04-30', 'Clearing credit', 50000, 0], ['INT4', '2026-04-30', 'Interest credited', 1500, 0], ['CHG4', '2026-04-30', 'Bank charges', 0, 700], ['INS4', '2026-04-30', 'Insurance premium (standing instruction)', 0, 4800],
]);
const BR = reconcile(MO, 'CashBook', 'BankStmt', 120000);
pin([BR.cbBal, BR.bsBal, BR.np, BR.nc, BR.bc, BR.bd], [172000, 165000, 49000, 52000, 1500, 5500], 'WE10');
// Receipts in the cash book are the same cheques as the Receipts table.
check(MO.table('CashBook').rows.filter((r) => r.Deposit).map((r) => r.Deposit).join() === MO.table('Receipts').rows.map((r) => r.Amount).join(), 'deposits are the receipts');
// WE11: asset register.
MO.create('Assets', [['AssetNo', 'text'], ['AssetName', 'text'], ['Category', 'text'], ['PurchaseDate', 'date'], ['Cost', 'currency'], ['Rate', 'number']], { pk: 'AssetNo' });
MO.load('Assets', [
  ['A01', 'Flour mill', 'Machinery', '2023-04-01', 240000, 10], ['A02', 'Pulse grader', 'Machinery', '2024-04-01', 260000, 10], ['A03', 'Office furniture', 'Furniture', '2022-04-01', 50000, 10],
  ['A04', 'Delivery truck', 'Vehicle', '2025-04-01', 600000, 15], ['A05', 'Weighbridge', 'Machinery', '2024-04-01', 120000, 10], ['A06', 'Billing computer', 'Computer', '2025-04-01', 80000, 20],
]);
const REG = slmRegister(MO, 'Assets', 2026);
pin(REG.map((r) => [r.dep, r.wdv]), [[24000, 144000], [26000, 182000], [5000, 25000], [90000, 420000], [12000, 84000], [16000, 48000]], 'WE11 register');
const depT = pin(sum(REG.map((r) => r.dep)), 173000, 'WE11 total depreciation');
const QM = "SELECT SUM(Cost) FROM Assets WHERE Category = 'Machinery';";
const machCost = pin(scalar(MO.q(QM)), 620000, 'WE11 machinery cost');

// ---------------------------------------------------------------- helpers for visuals
const tbl = (name, alt, caption) => {
  const s = MO.spec(name);
  return table(s.headers, s.rows, alt, caption);
};
const rowsOf = (rows) => rows.map((r) => r.map(cell));
const listW = (xs) => (xs.length === 1 ? String(xs[0]) : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);
const spokenList = (xs) => listW(xs.map((x) => words(x)));

// ---------------------------------------------------------------- visuals: deck 1
const vRoute1 = flow('LR', ['Data and information', 'Database and DBMS', 'Types of DBMS', 'Features', 'Tables and keys', 'Relationships', 'Design, forms, reports, indexes'], 'Route map of Part 1: data and information, database and database management system, types, features, tables and keys, relationships, and design with forms, reports and indexes', 'Part 1 at a glance');
const vDIK = flow('LR', ['Raw facts (invoices, receipts, codes)', 'DBMS (stores, checks, links, retrieves)', 'Information (dues by customer, sales by city)'], 'Flow from raw data such as invoices and receipts, through the database management system which stores, checks, links and retrieves it, to information such as dues by customer and sales by city', 'A DBMS turns stored data into information.');
const vCust = tbl('Customers', `Monal Agro Foods' Customers table: ${nF} fields (customer code, name, city, credit limit, agent) and ${nR} records, one per retailer`, `Imagined data. ${nF} fields (columns) × ${nR} records (rows); NULL = no agent.`);
const vDesign = table(['Field', 'Data type', 'Key', 'Example value'], MO.design('Customers').map((d, i) => [d[0], d[1], d[2], cell(MO.table('Customers').rows[0][d[0]])]), 'Design of the Customers table: customer code is text and the primary key; name, city and agent are text; credit limit is currency', 'The design (structure) is fixed first; records are then added through a form.');
const vTypes = table(
  ['Type', 'Structure', 'Example at Monal', 'Strength / weakness'],
  [
    ['Hierarchical', 'Tree; each child has one parent', 'Region → depot → retailer', 'Fast top-down look-ups; a record with two parents must be repeated'],
    ['Network', 'Graph; a record may have several owners (pointers)', 'A consignment linked to both its customer and its truck', 'Flexible; complex to design and change'],
    ['Relational', 'Tables linked by common key fields', 'Customers, Invoices, Receipts linked by CustCode', 'Simple, flexible queries; the usual choice for accounting software'],
    ['Object-oriented', 'Objects holding data and the operations on it', 'A Product object with its own pricing rules', 'Suits complex data such as drawings or media'],
  ],
  'Table of the four types of database management system: hierarchical tree, network graph, relational tables and object-oriented objects, with an example and a strength or weakness of each',
);
const vTree = (() => {
  const s = new Svg(620, 280);
  const box = (x, y, label, color) => { s.rect(x - 52, y - 16, 104, 32, { rx: 6, sw: 1.5, color, fill: color === 'accent' ? 'accent' : 'fill', fillOpacity: 0.15 }); s.text(x, y, label, { size: 12 }); };
  const link = (a, b) => s.line(a[0], a[1] + 16, b[0], b[1] - 16, { sw: 1.5 });
  const root = [155, 40];
  const dep = [[85, 125], [225, 125]];
  const ret = [[50, 210], [120, 210], [190, 210], [260, 210]];
  box(...root, 'Region');
  dep.forEach((d, i) => { box(...d, `Depot ${i + 1}`); link(root, d); });
  ret.forEach((r, i) => { box(r[0], r[1], `Retailer ${i + 1}`); link(dep[Math.floor(i / 2)], r); });
  const own = [[400, 40], [540, 40]];
  const con = [[380, 210], [470, 210], [560, 210]];
  box(...own[0], 'Customer', 'accent');
  box(...own[1], 'Truck', 'accent');
  con.forEach((c, i) => { box(c[0], c[1], `Consignment ${i + 1}`); own.forEach((o) => link(o, c)); });
  s.line(320, 20, 320, 240, { sw: 1, dash: true, color: 'muted' });
  s.text(155, 262, 'Hierarchical: one parent each', { size: 13, bold: true });
  s.text(470, 262, 'Network: several owners', { size: 13, bold: true });
  return s.visual('Two diagrams side by side. Left, a hierarchical tree: one region record over two depot records, each depot over two retailer records, every record with exactly one parent. Right, a network: three consignment records each linked to two owner records, a customer and a truck', 'Imagined structures for Monal Agro Foods.');
})();
const vFeatures = table(
  ['Feature', 'What it means at Monal'],
  [
    ['Controlled redundancy and consistency', 'A retailer’s name and city are stored once, in Customers; invoices carry only the code'],
    ['Integrity rules', 'No duplicate or blank invoice number; no invoice for a customer who does not exist'],
    ['Data independence', 'Reports keep working when the storage is moved or reorganised'],
    ['Sharing and concurrency control', 'Several clerks enter invoices and receipts at the same time without clashes'],
    ['Security', 'Passwords and user rights: a clerk may enter receipts but not delete customers'],
    ['Backup and recovery', 'Regular copies and a transaction log restore the books after a failure'],
    ['Query language and reports', 'Questions such as total dues by city are answered in seconds'],
  ],
  'Table of seven features of a database management system with what each means for Monal Agro Foods: controlled redundancy, integrity rules, data independence, sharing, security, backup and recovery, and a query language with reports',
  'Limitations: cost of software and training, complexity, and dependence on one system that must be protected.',
);
const vKeys = table(
  ['Key', 'Meaning', 'Monal example'],
  [
    ['Primary key', 'Field (or fields) whose value is unique and never blank in every record', 'CustCode in Customers; InvNo in Invoices'],
    ['Candidate key', 'Any field that could serve as the primary key', 'InvNo; a GST number, if every customer had one'],
    ['Composite key', 'Two or more fields that are unique only together', 'BoatCode + TripDate in a trips table'],
    ['Foreign key', 'Field that refers to the primary key of another table', 'CustCode in Invoices and in Receipts'],
  ],
  'Table of keys: the primary key is unique and never blank, a candidate key could be the primary key, a composite key is unique only as a combination, and a foreign key refers to the primary key of another table',
);
const vWE2 = table(['Proposed change', 'DBMS verdict'], [...WE2.map(([l, v]) => [l, `**${v}**`]), ['Delete customer C04 (invoice 506 is still on file)', `**${WE2_del.refused}**`]], 'Verdicts of the database on five proposed changes for Monal: an invoice for unknown customer C seven is rejected, a second customer C zero three is rejected, an invoice without a number is rejected, a correct invoice is accepted, and deleting customer C zero four is refused while its invoice exists', 'Verdicts produced by the chapter’s database engine.');
const vRel = (() => {
  const s = new Svg(620, 230);
  const W = 230, H = 26, top = 28;
  const draw = (x, title, fields) => {
    s.rect(x, top, W, H, { rx: 4, sw: 1.5, fill: 'accent', color: 'accent', fillOpacity: 0.2 });
    s.text(x + W / 2, top + H / 2, title, { size: 14, bold: true });
    fields.forEach(([f, k], i) => {
      const y = top + H * (i + 1);
      s.rect(x, y, W, H, { rx: 0, sw: 1 });
      s.text(x + 10, y + H / 2, f, { size: 13, anchor: 'start' });
      if (k) s.text(x + W - 10, y + H / 2, k, { size: 12, anchor: 'end', color: 'accent', bold: true });
    });
  };
  const cust = MO.design('Customers').map(([f, , k]) => [f, k === 'Primary key' ? 'PK' : '']);
  const inv = MO.design('Invoices').map(([f, , k]) => [f, k === 'Primary key' ? 'PK' : k ? 'FK' : '']);
  draw(20, 'Customers', cust);
  draw(370, 'Invoices', inv);
  const y1 = top + H * 1.5;
  const y2 = top + H * (inv.findIndex(([f]) => f === 'CustCode') + 1.5);
  s.polyline([[250, y1], [310, y1], [310, y2], [370, y2]], { sw: 2, color: 'accent' });
  s.text(262, y1 - 10, '1', { size: 14, bold: true });
  s.text(340, y2 - 10, 'many', { size: 13, bold: true });
  s.text(310, 214, 'One customer has many invoices; each invoice has one customer', { size: 13 });
  return s.visual('Relationship diagram: the Customers table, with customer code as primary key, is joined by a line from its customer code to the customer code field of the Invoices table, a foreign key; the line is marked one at the Customers end and many at the Invoices end', 'Primary key (PK) on the one side, foreign key (FK) on the many side.');
})();
const vRelTypes = table(
  ['Relationship', 'Meaning', 'Accounting example', 'How it is built'],
  [
    ['One-to-one', 'Each record matches at most one record on the other side', 'An employee and his single salary bank account', 'Same key in both tables, or a unique foreign key'],
    ['One-to-many', 'One record matches many on the other side', 'A customer and his invoices', 'Primary key of the "one" side placed as a foreign key on the "many" side'],
    ['Many-to-many', 'Many records match many', 'Invoices and the products on them', 'A third (linking) table holding both keys'],
  ],
  'Table of the three relationship types with an accounting example and how each is built with keys',
);
const vWE3 = table(['CustCode', 'Customer', 'Invoices (COUNT)'], perCust.map(([k, n, c]) => [k, n, String(c)]), `Number of invoices per customer at Monal from count queries: ${perCust.map(([, n, c]) => `${n} ${words(c)}`).join(', ')}; ${words(nI)} in all`, `Each row: ${C("SELECT COUNT(*) FROM Invoices WHERE CustCode = 'C01'")} and so on; total ${nI}.`);
const vInvDesign = table(['Table', 'Field', 'Data type', 'Key'], [...MO.design('Invoices').map((d) => ['Invoices', ...d]), ...MO.design('Receipts').map((d) => ['Receipts', ...d])], 'Design of the Invoices and Receipts tables: invoice number is a number and the primary key, invoice date a date, customer code text and a foreign key to Customers, amount currency; receipts the same with a text receipt number', 'Data types: Text, Number, Currency, Date, Yes/No.');
const vObjects = table(
  ['Object', 'Purpose', 'Monal example'],
  [
    ['Table', 'Stores the records', 'Customers, Invoices, Receipts'],
    ['Form', 'Screen to enter, view and edit one record at a time, with checks and drop-down lists', 'Invoice entry screen with a list of customer codes'],
    ['Query', 'Question asked of the data', 'Invoices above ₹40,000 in April'],
    ['Report', 'Formatted, grouped output with totals, for printing or sharing', 'Sales by city with a grand total'],
    ['Index', 'Sorted list of a field’s values with pointers to the records', 'Index on CustCode in Invoices'],
  ],
  'Table of database objects: tables store records, forms are entry screens, queries ask questions, reports present grouped totals and indexes speed up searching',
);
const vIndex = table(['CustCode (sorted)', 'Points to invoices'], idx.map(([k, v]) => [k, v.join(', ')]), 'Index on the customer code of the Invoices table: each code in sorted order with the invoice numbers it points to, so the database can find a customer’s invoices without reading the whole table', 'An index speeds up search and sort; it costs space and must be updated on every new invoice.');
const vWE4 = table(['City', 'Sales (₹)'], [...byCity.map(([c, v]) => [c, fig(v)]), ['**Total**', `**${fig(salesTotal)}**`]], `Report of Monal's April sales by city, made by linking each invoice to its customer's city: ${byCity.map(([c, v]) => `${c} ${rupees(v)}`).join(', ')}; total ${rupees(salesTotal)}`, 'Join Invoices to Customers on CustCode, group by City, total Amount.');
const vSummary1 = table(
  ['Idea', 'In one line'],
  [
    ['Data → information', 'A DBMS stores raw facts and turns them into useful reports'],
    ['Types', 'Hierarchical (tree), network (graph), relational (tables), object-oriented (objects)'],
    ['Features', 'Less redundancy, integrity, independence, sharing, security, backup, queries'],
    ['Table', 'Fields (columns) with data types; records (rows)'],
    ['Keys', 'Primary (unique, not blank), candidate, composite, foreign (refers to a primary key)'],
    ['Relationships', 'One-to-one, one-to-many (key on the many side), many-to-many (linking table)'],
    ['Objects', 'Tables store, forms enter, queries ask, reports present, indexes speed up'],
  ],
  'Summary table of Part 1: data and information, types, features, tables, keys, relationships and database objects',
);

// ---------------------------------------------------------------- visuals: deck 2
const vRoute2 = flow('LR', ['Select and where', 'And, or, brackets', 'Update and delete', 'Aggregate functions', 'Debtors and creditors', 'Bank reconciliation', 'Asset register'], 'Route map of Part 2: select with where, and and or with brackets, update and delete, aggregate functions, then debtors and creditors, bank reconciliation and the asset register', 'Part 2 at a glance');
const vInv = tbl('Invoices', `Monal's Invoices table: ${words(nI)} credit sales in April 2026 to six retailers, totalling ${rupees(salesTotal)}`, 'Imagined data. InvNo is the primary key; CustCode is a foreign key to Customers.');
const vSQL = table(
  ['Statement / clause', 'What it does', 'Form'],
  [
    ['SELECT … FROM', 'Shows chosen fields (or * for all) of a table', C('SELECT InvNo, Amount FROM Invoices;')],
    ['WHERE', 'Keeps only the records that meet a condition', C('WHERE Amount > 40000')],
    ['Comparison', 'Equal, not equal, less, greater, at most, at least', C('=  <>  <  >  <=  >=')],
    ['AND', 'Both conditions must be true', C("City = 'Vidisha' AND Amount > 40000")],
    ['OR', 'At least one condition must be true', C("CustCode = 'C02' OR CustCode = 'C05'")],
    ['UPDATE … SET … WHERE', 'Changes values in the records that meet the condition', C("UPDATE Customers SET CreditLimit = 90000 WHERE CustCode = 'C04';")],
    ['DELETE FROM … WHERE', 'Removes the records that meet the condition', C('DELETE FROM Invoices WHERE InvNo = 506;')],
  ],
  'Table of the structured query language statements in the syllabus: select with from, where, the comparison operators, and, or, update with set and where, and delete from with where',
  'Text and dates go in single quotes; numbers do not. A statement ends with a semicolon.',
);
const vWE5 = table(['InvNo', 'CustCode', 'Amount'], rowsOf(R5), `Result of selecting invoices above forty thousand rupees: ${words(R5.length)} invoices, numbers ${spokenList(R5.map((r) => r[0]))}`, `${C(Q5)} — ${R5.length} rows.`);
const vWE6 = table(
  ['Query', 'Invoices returned', 'Rows'],
  [[C(Q6a), R6a.join(', '), String(R6a.length)], [C(Q6b), R6b.join(', '), String(R6b.length)]],
  `Two queries on Monal's invoices: with and, invoices above forty thousand rupees from fifteen April give ${spokenList(R6a)}; with or, invoices of customers C zero two or C zero five give ${spokenList(R6b)}`,
);
const vPrec = table(
  ['Query', 'Read as', 'Returns'],
  [[C(Q6c), 'C01, OR (C03 AND over 30000)', R6c.join(', ')], [C(Q6d), '(C01 OR C03) AND over 30000', R6d.join(', ')]],
  `Effect of brackets: without brackets and is applied first, so all of C zero one's invoices are returned, giving ${spokenList(R6c)}; with brackets the result is ${spokenList(R6d)}`,
  'AND is applied before OR; use brackets to change the order.',
);
const vWE7 = table(['Statement (run in order)', 'Result'], S7.map((s, i) => [C(s), R7[i].refused ? `**${R7[i].refused}**` : `**${R7[i].affected} record${R7[i].affected === 1 ? '' : 's'}** ${s.startsWith('UPDATE') ? `changed (${M7.table('Customers').rows.filter((r) => r.City === 'Vidisha').map((r) => `${r.CustCode} now ${rs(r.CreditLimit)}`).join(', ')})` : 'deleted'}`]), 'Four statements run in order on a copy of Monal’s tables: raising the credit limits of the two Vidisha customers changes two records; deleting customer C zero four is refused while invoice five hundred six refers to it; deleting that invoice removes one record; deleting the customer then succeeds', 'Run on a copy; the deck’s other examples use the original tables.');
const vAggs = table(['Query', 'Gives', 'Result'], AGG.map(([q, what, v]) => [C(q), what, String(v)]), `Aggregate functions on Monal's invoices: count ${words(AGG[0][2])}, sum ${rupees(AGG[1][2])}, average ${rupees(AGG[2][2])}, maximum ${rupees(AGG[3][2])}, minimum ${rupees(AGG[4][2])}, and sum for Gaurang Mart ${rupees(AGG[5][2])}`);
const vNull = table(['Query on Customers', 'Result', 'Why'], [[C('SELECT COUNT(*) FROM Customers;'), String(CNT[0]), 'Counts every record'], [C('SELECT COUNT(Agent) FROM Customers;'), String(CNT[1]), 'Skips the two NULL agents (C02, C05)']], `Count of all customers is ${words(CNT[0])}, but count of the agent field is ${words(CNT[1])}, because aggregate functions skip empty values`, 'SUM, AVG, MAX and MIN also skip NULLs.');
const vAIS = flow('LR', ['Source documents', 'Forms (vouchers, invoices, receipts)', 'Tables with keys', 'Queries', 'Ledgers, debtors list, trial balance, BRS, asset register'], 'Flow of accounting information in a database system: source documents are entered through forms into linked tables, and queries produce ledgers, the debtors list, the trial balance, the bank reconciliation and the asset register', 'Each transaction is entered once; every report is drawn from the same tables.');
const vWE9 = table(['CustCode', 'Customer', 'Invoices', 'Receipts', 'Balance', 'Credit limit', 'Within limit?'], DEB.rows.map((r) => [r.key, r.name, fig(r.billed), fig(r.paid), fig(r.balance), fig(r.limit), r.balance > r.limit ? `**No (over by ${fig(r.balance - r.limit)})**` : 'Yes']), `Debtors balance report of Monal on thirty April: invoices less receipts for each retailer, total ${rupees(DEB.total)}; Gaurang Mart owes ${rupees(over[0].balance)} against a limit of ${rupees(over[0].limit)}`, `Total due ${rs(DEB.total)} = ${fig(salesTotal)} − ${fig(sum(MO.table('Receipts').rows.map((r) => r.Amount)))}.`);
const vMatch = table(['Ref', 'In cash book', 'In bank statement', 'Status'], [...new Set([...MO.table('CashBook').rows.map((r) => r.Ref), ...MO.table('BankStmt').rows.map((r) => r.Ref)])].map((ref) => {
  const c = MO.table('CashBook').rows.find((r) => r.Ref === ref);
  const b = MO.table('BankStmt').rows.find((r) => r.Ref === ref);
  const amt = (r, a, b2) => (r ? fig(r[a] || r[b2]) : '—');
  const st = c && b ? 'Matched' : c ? (c.Withdrawal ? 'Cheque not yet presented' : 'Deposit not yet credited') : b.Credit ? 'Credited by bank only' : 'Debited by bank only';
  return [ref, amt(c, 'Deposit', 'Withdrawal'), amt(b, 'Credit', 'Debit'), c && b ? st : `**${st}**`];
}), 'Matching of Monal’s cash book and bank statement for April by reference: five items match; two cheques issued are not yet presented, one deposit is not yet credited, interest is credited only by the bank, and charges and an insurance premium are debited only by the bank', 'Both started April at ₹1,20,000.');
const vBRS = table(['Particulars', '₹', '₹'], brsRows(BR, '30 April 2026'), `Bank reconciliation statement of Monal on thirty April: cash book balance ${rupees(BR.cbBal)}, add cheques not presented and interest, less the deposit not credited, charges and premium, gives the pass book balance of ${rupees(BR.bsBal)}`);
const vWE11 = table(['AssetNo', 'Asset', 'Category', 'Cost', 'Rate %', 'Depreciation 2026-27', 'WDV 31-3-2027'], [...REG.map((r) => [r.AssetNo, r.AssetName, r.Category, fig(r.Cost), String(r.Rate), fig(r.dep), fig(r.wdv)]), ['', '**Total**', '', `**${fig(sum(REG.map((r) => r.Cost)))}**`, '', `**${fig(depT)}**`, `**${fig(sum(REG.map((r) => r.wdv)))}**`]], `Asset register of Monal with straight-line depreciation for twenty twenty-six to twenty-seven: total depreciation ${rupees(depT)}; machinery costing ${rupees(machCost)}`, `${C(QM)} returns ${machCost}.`);
const vSummary2 = table(
  ['Task', 'Statement'],
  [
    ['List chosen records', C('SELECT fields FROM table WHERE condition;')],
    ['Both / either condition', 'AND / OR; AND first; brackets to change the order'],
    ['Change records', C('UPDATE table SET field = value WHERE condition;')],
    ['Remove records', C('DELETE FROM table WHERE condition;') + ' (no WHERE = every record)'],
    ['Summarise', 'COUNT, SUM, AVG, MAX, MIN (NULLs skipped; COUNT(*) counts rows)'],
    ['Business uses', 'Debtor and creditor balances, bank matching for the BRS, asset register and depreciation, trial balance'],
  ],
  'Summary table of Part 2: select with where, and and or, update, delete, the five aggregate functions and the business uses of a database',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Database Management System — Part 1: Concepts, Types, Features and Database Design',
  goals: [
    'Distinguish data from information and explain what a database and a DBMS are',
    'Describe the hierarchical, network, relational and object-oriented types of DBMS',
    'State the main features and advantages of a DBMS for accounting',
    'Identify fields, records, data types and primary, composite and foreign keys, and predict when a DBMS will reject a record',
    'Design related tables and explain relationships, forms, reports and indexing',
  ],
  slides: [
    sl('title', 'Database Management System', {
      b: 'Part 1 — what a **database** and a **DBMS** are, the **types** and **features**, and how to **design** related tables for an imagined business.',
      v: vRoute1,
      n: 'Every business keeps records of customers, sales and receipts. When those records live in separate files, the same customer is typed again and again, and the files soon disagree. A database management system keeps them together, checks them and answers questions about them. In this part we meet its ideas, its types and features, and the design of related tables, using an imagined wholesaler, Monal Agro Foods of Vidisha.',
    }),
    sl('concept', 'Data, information, database, DBMS', {
      v: vDIK,
      bl: ['**Data**: raw facts as recorded. **Information**: data processed to support a decision.', '**Database**: an organised collection of related data. **DBMS**: the software that defines, stores, checks, retrieves and protects it.'],
      n: 'Data are raw facts: an invoice number, a date, an amount. Information is data that has been processed into something useful, such as the total each retailer owes. A database is an organised collection of related data, and a database management system is the software that defines it, stores and checks the records, retrieves them on request and controls who may change them.',
    }),
    sl('concept', 'Tables, fields and records at Monal', {
      v: vCust,
      bl: ['A **table** (relation) holds one kind of thing.', 'A **field** is a column; a **record** is a row; a blank value is **NULL**.'],
      n: `Here is Monal's Customers table. Each column is a field, such as the customer code or the credit limit. Each row is a record, one retailer. So this table has ${words(nF)} fields and ${words(nR)} records. Two retailers deal with Monal directly and have no agent, so that value is left empty, which a database calls null.`,
    }),
    sl('example', 'Worked example 1: the design behind the table', {
      b: 'Every field is given a **data type** before any record is entered. Monal’s Customers table is designed as shown.',
      v: vDesign,
      n: 'Before entering records, we design the table. Each field gets a data type: text for codes, names and cities, currency for the credit limit. A customer code is text, not a number, because it is a label, not a quantity. One field, the customer code, is chosen as the primary key, because it is different and filled in for every retailer.',
    }),
    sl('check', 'Quick check: fields and records', {
      b: 'Count the fields and records.',
      chk: 'm_field_record',
      n: 'Count the columns for fields and the rows for records. Do not count the heading row.',
    }),
    sl('concept', 'Types of DBMS', {
      v: vTypes,
      n: 'Database systems differ in how they link records. A hierarchical system arranges them as a tree, each child under one parent. A network system lets a record have several owners, joined by pointers. A relational system keeps data in tables linked through common key fields, and this is the model most accounting software uses. An object-oriented system stores objects that carry both data and the operations on it.',
    }),
    sl('concept', 'A tree and a network', {
      v: vTree,
      n: 'On the left, a hierarchy: a region owns depots and each depot owns retailers, so every record has exactly one parent. If a retailer had to sit under two depots, it would have to be stored twice. On the right, a network: each consignment is linked to two owners, the customer who booked it and the truck that carried it.',
    }),
    sl('check', 'Quick check: match the types', {
      b: 'Match each type of DBMS with how it links records.',
      chk: 'mt_types',
      n: 'Think tree, graph, tables and objects.',
    }),
    sl('concept', 'Features and advantages of a DBMS', {
      v: vFeatures,
      n: 'Why use a database management system? Each fact is stored once, so records stay consistent. Integrity rules stop wrong entries at the door. Programs keep working when storage changes. Several clerks can work at once. Passwords and user rights protect the books, backups allow recovery, and a query language turns data into reports in seconds. Against this, it costs money, needs training and must itself be protected.',
    }),
    sl('concept', 'Keys', {
      v: vKeys,
      n: 'A primary key is a field whose value is unique and never blank, so it identifies each record: the customer code in Customers, the invoice number in Invoices. Any field that could do this job is a candidate key. When no single field is unique, two fields together may form a composite key. A foreign key is a field that refers to the primary key of another table, like the customer code inside each invoice.',
    }),
    sl('example', 'Worked example 2: will the DBMS save it?', {
      b: 'Monal’s clerk tries five changes. CustCode is the primary key of Customers; InvNo is the primary key of Invoices; CustCode in Invoices is a foreign key.',
      v: vWE2,
      n: 'Watch the keys at work. An invoice for customer C seven is rejected, because no such customer exists. A second customer coded C zero three is rejected as a duplicate primary key. An invoice with no number is rejected, because a primary key cannot be blank. A correct invoice is accepted. And customer C zero four cannot be deleted while an invoice still refers to it.',
    }),
    sl('check', 'Quick check: foreign keys', {
      b: 'True or false?',
      chk: 'tf_fk_unique',
      n: 'Ask how many bills one supplier can send.',
    }),
    sl('concept', 'Relationships between tables', {
      v: vRel,
      bl: ['**One-to-one**, **one-to-many**, **many-to-many** (needs a linking table).'],
      n: 'Tables are related through keys. One customer has many invoices, but each invoice belongs to one customer: a one-to-many relationship. It is built by placing the primary key of the one side, the customer code, inside the table on the many side as a foreign key. One-to-one and many-to-many relationships also occur; a many-to-many relationship needs a third, linking table.',
    }),
    sl('example', 'Worked example 3: one customer, many invoices', {
      b: 'How many invoices does each Monal customer have? One count query per customer answers it.',
      v: vWE3,
      n: `Counting the invoices for each customer code shows the one-to-many link. Four retailers have two invoices each and two have one each, ${words(nI)} in all. Every invoice carries exactly one customer code, so the counts add up to the whole Invoices table.`,
    }),
    sl('concept', 'Designing related tables', {
      v: vInvDesign,
      n: 'To design a business database, list what must be recorded, put each kind of thing in its own table, choose a data type for every field and a primary key for every table, and link the tables with foreign keys. Monal’s Invoices and Receipts tables each carry the customer code, so every sale and every receipt points to one customer.',
    }),
    sl('concept', 'Forms, queries, reports and indexes', {
      v: vObjects,
      n: 'Besides tables, a database uses other objects. A form is the screen for entering and editing one record at a time, with checks and drop-down lists. A query asks a question of the data. A report presents grouped and totalled output for printing. An index is a sorted list of a field’s values with pointers to the records, which speeds up searching.',
    }),
    sl('concept', 'An index on the customer code', {
      v: vIndex,
      n: 'Here is an index on the customer code of Monal’s invoices. Each code appears once, in order, pointing to its invoices, so the system can find a retailer’s sales without reading every row. The price is extra storage and a little extra work each time an invoice is saved, so we index only fields that are searched often.',
    }),
    sl('example', 'Worked example 4: a report from two tables', {
      b: 'Monal wants April sales by city. The city is in Customers; the amounts are in Invoices.',
      v: vWE4,
      n: `The report links each invoice to its customer through the customer code, groups the invoices by the customer's city and totals them. Vidisha leads with ${rupees(byCity[1][1])}. The city totals add up to ${rupees(salesTotal)}, the total of the Invoices table, which is the check every report should pass.`,
    }),
    sl('check', 'Quick check: name the key', {
      b: 'Fill in the blank.',
      chk: 'fb_pk',
      n: 'Which key is unique and never blank?',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up: a database management system turns stored data into information. Its types are hierarchical, network, relational and object-oriented. It reduces redundancy, enforces integrity and offers security, sharing, backup and queries. A table has fields and records; keys identify records and link tables; relationships are one-to-one, one-to-many or many-to-many; forms, reports and indexes complete the design.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Define a term, then give an **accounting example** (customer, invoice, receipt, asset).',
        'For a primary key, say **unique and never blank**; for a foreign key, say **which table’s primary key** it refers to.',
        'When asked whether a record will be saved, test **three rules**: unique key, matching foreign key, correct data type.',
        'For a relationship, name the type and say **where the key goes**.',
        'A design answer lists **field, data type, key** in a table.',
      ],
      n: 'In the examination, define each term and add an accounting example. For keys, say that a primary key is unique and never blank, and name the table a foreign key refers to. To decide whether a record will be saved, test the key, the foreign key and the data type. For a design question, set out each field with its data type and key in a neat table.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Database Management System — Part 2: SQL, Aggregate Functions and DBMS in Business',
  goals: [
    'Write and read SELECT queries with WHERE, AND and OR, using brackets where needed',
    'Write UPDATE and DELETE statements and state how many records they affect',
    'Use COUNT, SUM, AVG, MAX and MIN to summarise accounting data',
    'Explain how a database supports debtors and creditors, bank reconciliation and the asset register',
  ],
  slides: [
    sl('title', 'Asking questions of the data', {
      b: 'Part 2 — **SQL** statements, **aggregate functions**, and the database at work in **debtors, bank reconciliation and asset accounting**.',
      v: vRoute2,
      n: 'In part one we designed Monal’s tables. Now we ask them questions. The structured query language lets us pick out records, change them and remove them, and its aggregate functions count, total and average them. Then we see the database at work on the accountant’s jobs: debtors and creditors, the bank reconciliation and the asset register.',
    }),
    sl('concept', 'Monal’s Invoices table', {
      v: vInv,
      n: `Here are Monal's ${words(nI)} credit sales for April, worth ${rupees(salesTotal)} in all. The invoice number is the primary key and the customer code is a foreign key to the Customers table. We will run every query in this part on these records, so keep this table in view.`,
    }),
    sl('concept', 'The SQL statements in your syllabus', {
      v: vSQL,
      n: 'The select statement shows chosen fields from a table, and the where clause keeps only the records that meet a condition. Conditions use comparisons such as greater than or not equal to, joined by and or by or. The update statement changes values, and the delete statement removes records. Text and dates go inside single quotes; numbers do not.',
    }),
    sl('example', 'Worked example 5: select with where', {
      b: `Monal’s credit controller wants the invoices above ₹40,000:\n\n${C(Q5)}`,
      v: vWE5,
      n: `The database reads each invoice and keeps it only if its amount is more than forty thousand rupees. ${words(R5.length)} invoices pass. Invoice five hundred seven, for forty-one thousand rupees, just qualifies, while invoice five hundred two, for thirty-six thousand, does not. Only the three fields named after select are shown.`,
    }),
    sl('example', 'Worked example 6: and, or', {
      b: 'Two more questions for Monal: large invoices from mid-April, and all invoices of two Vidisha retailers.',
      v: vWE6,
      n: `With and, an invoice must pass both tests: above forty thousand rupees and dated on or after fifteen April. That leaves ${words(R6a.length)} invoices. With or, an invoice needs to pass only one test, so every invoice of C zero two or C zero five appears: ${words(R6b.length)} invoices. And narrows a result; or widens it.`,
    }),
    sl('concept', 'And comes before or', {
      v: vPrec,
      n: `When and and or are mixed, and is applied first. So the first query means every invoice of C zero one, or an invoice of C zero three above thirty thousand rupees: ${words(R6c.length)} rows, including a small invoice of C zero one. Brackets make or go first, giving the intended ${words(R6d.length)} rows. When in doubt, use brackets.`,
    }),
    sl('check', 'Quick check: counting rows', {
      b: 'Work out the number of rows.',
      chk: 'n_rows_or',
      n: 'With or, a row needs to meet only one of the conditions.',
    }),
    sl('example', 'Worked example 7: update and delete', {
      b: 'Run in order on a copy of Monal’s tables:',
      v: vWE7,
      n: 'The update raises the credit limit of the two Vidisha retailers, changing two records. Next, deleting customer C zero four is refused, because invoice five hundred six still refers to it. Once that invoice is deleted, the customer can go. Always write a where clause with update and delete: without one, every record is changed or removed.',
    }),
    sl('check', 'Quick check: the right command', {
      b: 'Fill in the blank.',
      chk: 'fb_update',
      n: 'Which command changes values already stored in a record?',
    }),
    sl('concept', 'Aggregate functions', {
      v: vAggs,
      n: `Aggregate functions turn many rows into one value. Count gives the number of invoices, ${words(AGG[0][2])}. Sum gives total credit sales, ${rupees(AGG[1][2])}. Average gives ${rupees(AGG[2][2])}. Max and min give the largest and smallest invoices. With a where clause, sum gives the sales to one retailer, such as ${rupees(AGG[5][2])} for Gaurang Mart.`,
    }),
    sl('example', 'Worked example 8: counting with empty values', {
      b: 'How many Monal retailers deal through an agent?',
      v: vNull,
      n: `Count with a star counts every record: ${words(CNT[0])} customers. Count of the agent field counts only records where an agent is filled in: ${words(CNT[1])}. Aggregate functions skip empty values, so the two direct customers are left out. The same rule applies when you total or average a field with blanks.`,
    }),
    sl('check', 'Quick check: match the functions', {
      b: 'Match each function with what it returns.',
      chk: 'mt_aggs',
      n: 'Sum totals, average finds the mean, count counts, minimum finds the smallest.',
    }),
    sl('concept', 'DBMS in business: accounting information', {
      v: vAIS,
      n: 'In a database-based accounting system, each source document is keyed in once through a form and stored in linked tables. Ledgers, the debtors list, the trial balance, the bank reconciliation and the asset register are all produced from those same records by queries and reports, so they always agree with each other.',
    }),
    sl('example', 'Worked example 9: debtors and credit limits', {
      b: 'Balance due = invoices − receipts for each customer code (Customers, Invoices and Receipts linked by CustCode).',
      v: vWE9,
      n: `For each retailer the database totals the invoices, subtracts the receipts and compares the balance with the credit limit. Monal is owed ${rupees(DEB.total)} in all. Gaurang Mart owes ${rupees(over[0].balance)} against a limit of ${rupees(over[0].limit)}, so it is flagged before any more goods go out on credit. Creditors are handled the same way, from suppliers and bills.`,
    }),
    sl('example', 'Worked example 10: bank reconciliation by matching', {
      b: 'Monal imports its April bank statement as a table and matches it with the bank column of its cash book on **Ref**.',
      v: vMatch,
      n: 'The database matches each reference in the cash book with the bank statement. Five items match. What is left are the reconciling items: two cheques issued but not yet presented, one deposit not yet credited, interest credited only by the bank, and bank charges and an insurance premium debited only by the bank.',
    }),
    sl('concept', 'The bank reconciliation statement', {
      v: vBRS,
      n: `Starting from the cash book balance of ${rupees(BR.cbBal)}, we add the cheques not yet presented and the interest, and subtract the deposit not yet credited, the charges and the premium. The result, ${rupees(BR.bsBal)}, agrees with the bank statement, which proves the reconciliation.`,
    }),
    sl('check', 'Quick check: matching', {
      b: 'True or false?',
      chk: 'tf_brs',
      n: 'Think about what a database does well with a common field.',
    }),
    sl('example', 'Worked example 11: the asset register', {
      b: 'Monal’s fixed assets, bought on 1 April of the year shown; straight-line depreciation at the Rate (per cent of cost).',
      v: vWE11,
      n: `The asset register is a table with one record per asset. The database computes each year's depreciation as cost times rate, and the written-down value after all the years of use. Total depreciation for the year is ${rupees(depT)}. A query with sum and where gives the cost of machinery, ${rupees(machCost)}.`,
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up: select with where picks out records, and narrows and or widens, and and is applied before or unless brackets say otherwise. Update changes and delete removes records, always with a where clause. Count, sum, average, max and min summarise data and skip empty values. In business, a database keeps debtors and creditors, matches the bank and runs the asset register.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Write keywords in capitals, text and dates in **single quotes**, numbers without quotes, and end with a **semicolon**.',
        'Name only the fields asked for after SELECT; use * only for all fields.',
        'Check every row against the condition and show the **result as a table**.',
        'Mixed AND/OR: apply **AND first**, or add brackets.',
        'For UPDATE/DELETE, state **how many records** change; without WHERE, all do.',
        'Aggregates skip **NULL**; COUNT(*) counts every row.',
      ],
      n: 'In the examination, write keywords clearly, put text and dates in single quotes, and end each statement with a semicolon. Name only the fields asked for. When asked for an output, test every row and set out the result as a small table. Remember that and comes before or, say how many records an update or delete affects, and that aggregate functions skip empty values.',
    }),
  ],
});

// Narration is spoken by text to speech: no digits, rupee sign, slash, ampersand, per-cent sign or capitals runs.
for (const d of [part1, part2]) for (const s of d.slides) {
  const m = /\d|₹|[\/&%*=<>]|\b[A-Z]{2,}\b/.exec(s.narration);
  check(!m, `narration of part ${d.part} ${s.id} has "${m?.[0]}"`);
}

// ---------------------------------------------------------------- notes
const vTerms = table(
  ['Term', 'Meaning'],
  [
    ['Data', 'Raw, unprocessed facts (an invoice amount, a date, a code)'],
    ['Information', 'Data processed into a meaningful form that supports a decision'],
    ['Database', 'An organised collection of related data, stored together'],
    ['DBMS', 'Software to define, store, retrieve, check, share and protect a database'],
    ['Table (relation)', 'Data about one kind of thing, in rows and columns'],
    ['Field (attribute)', 'A column: one item of data about each record, with a data type'],
    ['Record (tuple)', 'A row: all the data about one thing (one customer, one invoice)'],
    ['NULL', 'No value entered in a field'],
  ],
  'Table of basic terms: data, information, database, database management system, table, field, record and null',
);
const vFTypes = table(['Data type', 'Use for', 'Example field'], [[TYPE_LABEL.text, 'Names, codes, addresses (labels, not quantities)', 'CustCode, CustName'], [TYPE_LABEL.number, 'Counts and quantities', 'Quintals, Bags'], [TYPE_LABEL.currency, 'Money amounts', 'Amount, CreditLimit'], [TYPE_LABEL.date, 'Dates (sort and compare correctly)', 'InvDate, PurchaseDate'], [TYPE_LABEL.yesno, 'Two-way answers', 'Paid, InUse']], 'Table of data types: text for names and codes, number for quantities, currency for money, date for dates and yes or no for two-way answers');
const vVerdictRules = table(['Rule', 'Checked when', 'Refusal'], [['Primary key unique', 'A record is added or its key changed', 'Duplicate primary key'], ['Primary key not blank', 'A record is added', 'Primary key left blank'], ['Foreign key matches', 'A child record is added', 'No matching record in the parent table'], ['Data type', 'A value is entered', 'Wrong data type'], ['Parent still referred to', 'A parent record is deleted', 'Refused while child records refer to it']], 'Table of the integrity rules a database enforces: unique and non-blank primary keys, matching foreign keys, correct data types, and no deletion of a parent record still referred to');
const vDesignSteps = flow('LR', ['List what must be recorded', 'One table per kind of thing', 'Fields and data types', 'Primary key for each table', 'Foreign keys for relationships', 'Forms, queries, reports, indexes'], 'Steps in designing a database: list what must be recorded, make one table per kind of thing, choose fields and data types, choose a primary key, add foreign keys for relationships, then build forms, queries, reports and indexes');
const vOpsCmp = table(['Operator', 'Meaning', 'Example'], [['=', 'Equal to', C("City = 'Vidisha'")], ['<>', 'Not equal to', C("Mode <> 'Cash'")], ['<  >', 'Less than, greater than', C('Amount > 40000')], ['<=  >=', 'At most, at least', C("InvDate >= '2026-04-15'")], ['IS NULL', 'No value entered', C('Agent IS NULL')]], 'Table of comparison operators: equal, not equal, less than, greater than, at most, at least, and is null', 'A comparison with a NULL value is never true, so use IS NULL to find blanks.');
pin(MO.q('SELECT CustCode FROM Customers WHERE Agent IS NULL').rows.map((r) => r[0]), ['C02', 'C05'], 'IS NULL example');

const N = notes({
  title: 'Database Management System — Notes',
  sections: [
    {
      h: '1. Data, information, database and DBMS',
      t: 1,
      b: '**Data** are raw facts as recorded: the number, date, customer and amount of an invoice. **Information** is data processed (sorted, filtered, totalled, related) into a form that supports a decision: dues by customer, sales by city.\n\nA **database** is an organised collection of related data stored together. A **database management system (DBMS)** is the software that defines the database, stores and retrieves records, enforces rules on them, lets many users share them and protects them. Accounting software is built on a DBMS: vouchers are stored once and ledgers, trial balance and statements are drawn from them.\n\n**Terms.** A relational database stores data in **tables** (relations); each column is a **field** (attribute) with a **data type**; each row is a **record** (tuple). A field left empty holds **NULL**.',
      terms: [['Data', 'Raw, unprocessed facts.'], ['Information', 'Processed, meaningful data that supports a decision.'], ['DBMS', 'Software that defines, stores, retrieves, checks, shares and protects a database.']],
      v: vTerms,
      vs: [vDIK, vCust],
    },
    {
      h: '2. Types of DBMS',
      t: 1,
      b: '- **Hierarchical:** records form a **tree**; each child record has exactly **one parent** (region → depot → retailer). Fast top-down access; a record needing two parents must be repeated, and changes to the structure are hard.\n- **Network:** records form a **graph** linked by pointers; a record may have **several owners** (a consignment owned by a customer and a truck). Flexible but complex.\n- **Relational:** data is kept in **tables** linked by **common key fields** (CustCode in Customers and in Invoices). Simple to understand, flexible queries in SQL; the model used by most accounting software.\n- **Object-oriented:** data is stored as **objects** that carry both their data and the operations on it; suits complex data such as designs and media.',
      terms: [['Hierarchical DBMS', 'Tree structure: one parent per record.'], ['Network DBMS', 'Graph structure: a record may have several owners.'], ['Relational DBMS', 'Tables linked through key fields.']],
      v: vTypes,
      vs: [vTree],
    },
    {
      h: '3. Features and advantages (and limitations)',
      t: 1,
      b: '**Features and advantages:**\n1. **Controlled redundancy** and **consistency**: each fact stored once.\n2. **Integrity**: rules on keys, data types and links stop wrong entries.\n3. **Data independence**: programs do not change when storage changes.\n4. **Sharing and concurrency control**: many users at once, with record locking.\n5. **Security**: passwords, user rights, audit trail.\n6. **Backup and recovery** from a failure using backups and a transaction log.\n7. **Query language and reports**: information on demand.\n\n**Limitations:** cost of software, hardware and training; complexity; dependence on one system, which must itself be secured and backed up.',
      terms: [['Data redundancy', 'The same data stored in more than one place.'], ['Data integrity', 'Accuracy and consistency of data, protected by rules.'], ['Data independence', 'Programs unaffected by changes in how data is stored.']],
      v: vFeatures,
    },
    {
      h: '4. Tables, data types and keys',
      t: 4,
      b: '**Designing a table:** name it after the thing it records; list its fields; give each a **data type** (text, number, currency, date, Yes/No); choose a **primary key**.\n\n**Keys:**\n- **Primary key**: a field whose value is **unique and never blank** in every record (CustCode, InvNo, AssetNo).\n- **Candidate key**: any field that could be the primary key.\n- **Composite key**: two or more fields unique only together (BoatCode + TripDate).\n- **Foreign key**: a field that refers to the **primary key of another table** (CustCode in Invoices). It may repeat but must match an existing record.\n\n**Integrity rules the DBMS enforces** (see the table): it refuses a duplicate or blank primary key, a foreign key with no matching parent, a value of the wrong type, and the deletion of a parent record still referred to.',
      terms: [['Primary key', 'Unique, never blank; identifies each record.'], ['Foreign key', 'Refers to the primary key of another table.'], ['Composite key', 'Several fields that are unique only together.']],
      v: vKeys,
      vs: [vFTypes, vVerdictRules, vWE2],
    },
    {
      h: '5. Relationships, forms, reports and indexing',
      t: 4,
      b: '**Relationships:** **one-to-one** (an employee and one salary account), **one-to-many** (a customer and its invoices: the primary key of the one side goes into the many side as a foreign key), **many-to-many** (invoices and products: a linking table holds both keys).\n\n**Database objects:**\n- **Form**: screen for entering, viewing and editing one record at a time, with checks and drop-down lists.\n- **Query**: a question asked of the data (in SQL).\n- **Report**: formatted output of many records, grouped and sorted with subtotals and totals, for printing; may combine related tables (sales by city: invoices linked to customers).\n- **Index**: a sorted list of a field’s values with pointers to records; speeds up searching and sorting, costs space and slows saving a little.',
      terms: [['One-to-many', 'One record on one side matches many on the other.'], ['Report', 'Formatted, grouped output with totals.'], ['Index', 'Sorted list of a field’s values pointing to the records.']],
      v: vRelTypes,
      vs: [vRel, vDesignSteps, vObjects, vIndex, vWE4],
    },
    {
      h: '6. SQL basics: SELECT, WHERE, AND, OR, UPDATE, DELETE',
      t: 2,
      b: `- ${C('SELECT field1, field2 FROM table WHERE condition;')} shows the chosen fields of the records that meet the condition; ${C('SELECT *')} shows all fields. SELECT never changes data.\n- **AND**: both conditions true (narrows). **OR**: at least one true (widens). **AND is applied before OR**; use brackets to change the order.\n- ${C('UPDATE table SET field = value WHERE condition;')} changes values; the new value may use the old one (${C('CreditLimit = CreditLimit + 20000')}).\n- ${C('DELETE FROM table WHERE condition;')} removes records; the table design remains.\n- Without WHERE, UPDATE and DELETE act on **every** record. Run the same WHERE with SELECT first.\n\nText and dates are written in single quotes (${C("'Vidisha'")}, ${C("'2026-04-15'")}); numbers are not. Dates written year-month-day compare correctly.`,
      terms: [['WHERE clause', 'The condition a record must meet.'], ['AND / OR', 'Both conditions / at least one condition.'], ['UPDATE', 'Statement that changes stored values.']],
      v: vSQL,
      vs: [vOpsCmp, vWE5, vWE6, vPrec, vWE7],
    },
    {
      h: '7. Aggregate functions: COUNT, SUM, AVG, MAX, MIN',
      t: 3,
      b: `Aggregate functions return **one value** from many records: ${C('COUNT(*)')} (number of records), ${C('COUNT(field)')} (records with a value in that field), ${C('SUM(field)')}, ${C('AVG(field)')}, ${C('MAX(field)')}, ${C('MIN(field)')}.\n\n- WHERE is applied **first**, then the function: ${C("SELECT SUM(Amount) FROM Invoices WHERE CustCode = 'C05';")} gives the sales to one customer.\n- **NULLs are skipped** by every function except COUNT(*); AVG divides by the number of values present.\n- Several functions may be used together: ${C('SELECT MAX(Balance), MIN(Balance) FROM Debtors;')}.\n\nAccounting uses: total sales or dues, number of invoices, average invoice, highest balance, smallest receipt.`,
      terms: [['Aggregate function', 'A function that summarises many records into one value.'], ['COUNT(*)', 'Counts every record, blanks included.']],
      v: vAggs,
      vs: [vNull],
    },
    {
      h: '8. DBMS in business: debtors and creditors, bank reconciliation, asset accounting',
      t: 5,
      b: '**Accounting information.** Each source document is entered once (through a form) into linked tables; ledgers, the trial balance, statements and management reports are drawn from them, so they always agree.\n\n**Debtors and creditors.** Customers and Suppliers are master tables; invoices, bills, receipts and payments carry the party code as a foreign key. A report gives each balance (opening + invoices − receipts), dues past their date, and parties over their credit limit.\n\n**Bank reconciliation.** The bank statement is imported as a table and matched with the bank column of the cash book on the reference. Unmatched items are the reconciling items: cheques issued but not presented and bank-only credits are added to the cash book balance; cheques deposited but not credited and bank-only debits are subtracted, giving the pass book balance.\n\n**Asset accounting.** A fixed asset register table holds each asset’s number, category, date, cost, rate and location; the DBMS computes depreciation and written-down values and totals them by category.',
      terms: [['Asset register', 'Table of fixed assets with cost, date, rate and depreciation.'], ['Reconciling item', 'An entry found in only one of the cash book and the bank statement.'], ['Credit limit', 'The most a customer may owe at a time.']],
      v: vWE9,
      vs: [vAIS, vMatch, vBRS, vWE11],
    },
  ],
  tips: '**Common mistakes**\n- Calling a code field "number" because it holds digits: codes are **text**.\n- Saying a foreign key must be unique (only the **primary** key must be).\n- Forgetting that a primary key can never be **blank**.\n- Mixing AND and OR without brackets, or forgetting that **AND comes first**.\n- Writing text or dates **without quotes**, or numbers with them.\n- Using UPDATE or DELETE **without WHERE**.\n- Counting a NULL in COUNT(field) or dividing AVG by all the rows when some are NULL.\n- In a bank reconciliation, adding a deposit not yet credited instead of subtracting it.\n\n**How marks are usually split**\n- 1 mark: a term, a key, a function, or the result of one simple query.\n- 2 marks: a distinction (data and information, form and report), or one query with its result.\n- 3 marks: three features or types, three key verdicts, or the outputs of three queries.\n- 5 marks: a design (fields, types, keys and relationship), or queries with outputs, or a debtors report or bank reconciliation from tables.\n\n**Figures and firms in SOYL practice** are imagined; software is described generically.',
});

// ---------------------------------------------------------------- flashcards
const FC = cards([
  ['Data vs information', 'Data are raw facts; information is data processed into a meaningful form for a decision.', 'definition', 1],
  ['Database', 'An organised collection of related data stored together.', 'definition', 1],
  ['DBMS', 'Software that defines, stores, retrieves, checks, shares and protects a database.', 'definition', 1],
  ['Hierarchical DBMS', 'Tree: each child record has exactly one parent.', 'definition', 1],
  ['Network DBMS', 'Graph: a record may have several owner records, linked by pointers.', 'definition', 1],
  ['Relational DBMS', 'Tables (relations) linked through common key fields.', 'definition', 1],
  ['Object-oriented DBMS', 'Stores objects holding data and the operations on it.', 'definition', 1],
  ['Five DBMS features', 'Controlled redundancy, integrity, data independence, concurrency and security, backup and recovery (and a query language).', 'fact', 1],
  ['Data independence', 'Programs keep working when the way data is stored changes.', 'definition', 1],
  ['Field and record', 'Field = column (attribute); record = row (tuple).', 'definition', 4],
  ['NULL', 'No value entered in a field.', 'definition', 4],
  ['Primary key', 'Field whose value is unique and never blank in every record.', 'definition', 4],
  ['Foreign key', 'Field that refers to the primary key of another table; may repeat.', 'definition', 4],
  ['Composite key', 'Two or more fields that are unique only together.', 'definition', 4],
  ['Three reasons a DBMS rejects a record', 'Duplicate or blank primary key; no matching parent for a foreign key; wrong data type.', 'exam-tip', 4],
  ['One-to-many relationship', 'Primary key of the one side goes into the many side as a foreign key.', 'fact', 4],
  ['Many-to-many relationship', 'Needs a linking table holding both keys.', 'fact', 4],
  ['Form vs report', 'Form: input screen, one record at a time. Report: formatted output with groups and totals.', 'definition', 4],
  ['Index', 'Sorted list of a field’s values with pointers: faster search, more space, slower saving.', 'definition', 4],
  ['SELECT … FROM … WHERE', 'Shows chosen fields of the records meeting the condition; changes nothing.', 'definition', 2],
  ['AND vs OR', 'AND: both conditions (narrows). OR: either (widens).', 'definition', 2],
  ['AND and OR together', 'AND is applied first; use brackets to change the order.', 'exam-tip', 2],
  ['UPDATE', '`UPDATE table SET field = value WHERE condition;`', 'definition', 2],
  ['DELETE without WHERE', 'Removes every record; the table design remains.', 'exam-tip', 2],
  ['Quotes in SQL', 'Text and dates in single quotes; numbers without.', 'exam-tip', 2],
  ['Five aggregate functions', 'COUNT, SUM, AVG, MAX, MIN.', 'fact', 3],
  ['COUNT(*) vs COUNT(field)', 'COUNT(*) counts every record; COUNT(field) skips NULLs.', 'exam-tip', 3],
  ['Debtor balance from tables', 'Opening + invoices − receipts, totalled by customer code.', 'fact', 5],
  ['Bank reconciliation in a DBMS', 'Match cash book and bank statement on reference; unmatched items are the reconciling items.', 'fact', 5],
  ['Asset register', 'Table of fixed assets with cost, date, rate and location; depreciation computed per asset.', 'definition', 5],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Database Management System',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A - Objective (5 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_dbms_def', 'm_pk', 'm_and', 'm_sum', 'ar_integrity'] },
    { id: 'B', title: 'Section B - Short answer (4 marks)', instr: 'Answer both questions. Internal choice in the second question. Write SQL keywords clearly and end each statement with a semicolon.', items: ['s2_write_select', { attempt: 1, keys: ['s2_pk_fk', 's2_aggs_write'] }] },
    { id: 'C', title: 'Section C - Short answer (6 marks)', instr: 'Answer both questions. Internal choice in the second question. Show your working.', items: ['s3_verdicts', { attempt: 1, keys: ['s3_aggs_out', 's3_brs'] }] },
    { id: 'D', title: 'Section D - Long answer (5 marks)', instr: 'Answer the question. It is set in parts; set out reports and results as tables.', items: ['l5_debtors'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Database Management System',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A - Objective (12 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_data_info', 'm_hier', 'm_redund', 'm_composite', 'm_verdict', 'm_index', 'm_select_rows', 'm_precedence', 'm_count_null', 'm_brs_item', 'ar_index', 'ar_delete_parent'] },
    { id: 'B', title: 'Section B - Short answer (6 marks)', instr: 'Answer all three questions. Internal choice in the last question.', items: ['s2_features', 's2_out_and', { attempt: 1, keys: ['s2_update_delete', 's2_debtor_bal'] }] },
    { id: 'C', title: 'Section C - Short answer (12 marks)', instr: 'Answer all four questions. Internal choice in the last question. Show your working.', items: ['s3_advantages', 's3_write3', 's3_asset', { attempt: 1, keys: ['s3_relationships', 's3_precedence'] }] },
    { id: 'D', title: 'Section D - Long answer (10 marks)', instr: 'Answer both questions. Internal choice in the second question. Each is set in parts.', items: ['l5_sql', { attempt: 1, keys: ['l5_design_debtors', 'l5_brs'] }] },
  ],
});
check(T_SHORT.total_marks === 20 && T_LONG.total_marks === 40, 'test totals');

// Every marking scheme uses whole-number step marks that add up to the item's marks.
for (const [id, q] of BANK) {
  check(q.marking_scheme.every((x) => Number.isInteger(x.marks) && x.marks > 0), `${id}: step marks must be whole numbers`);
  check(q.marking_scheme.reduce((a, x) => a + x.marks, 0) === q.marks, `${id}: scheme adds to ${q.marking_scheme.reduce((a, x) => a + x.marks, 0)}, item has ${q.marks}`);
}

// Blueprint fit: every section matches the YAML item for item (type, marks, choice groups).
const BP = {
  short: { A: [['mcq', 1, 4], ['assertion-reason', 1, 1]], B: [['short', 2, 1], ['short', 2, 2, 1]], C: [['short', 3, 1], ['short', 3, 2, 1]], D: [['long', 5, 1]] },
  long: { A: [['mcq', 1, 10], ['assertion-reason', 1, 2]], B: [['short', 2, 2], ['short', 2, 2, 1]], C: [['short', 3, 3], ['short', 3, 2, 1]], D: [['long', 5, 1], ['long', 5, 2, 1]] },
};
function fitCheck(t, bp, qs) {
  check(Object.keys(bp).join() === t.sections.map((s) => s.id).join(), `${t.id}: sections`);
  for (const s of t.sections) {
    const want = bp[s.id];
    check(want, `${t.id}: unexpected section ${s.id}`);
    const free = s.items.filter((i) => !i.choice_group);
    const grouped = s.items.filter((i) => i.choice_group);
    const plain = want.filter((w) => w.length === 3);
    const choice = want.filter((w) => w.length === 4);
    for (const [type, marks, count] of plain) {
      const got = free.filter((i) => qs.get(i.question_id).type === type && i.marks === marks).length;
      check(got === count, `${t.id} ${s.id}: ${got} free ${type}-${marks}, blueprint ${count}`);
    }
    check(free.length === plain.reduce((a, w) => a + w[2], 0), `${t.id} ${s.id}: free item count`);
    for (const [type, marks, of, attempt] of choice) {
      check(s.choice_groups.length === 1 && s.choice_groups[0].attempt === attempt, `${t.id} ${s.id}: choice group`);
      check(grouped.length === of && grouped.every((i) => qs.get(i.question_id).type === type && i.marks === marks), `${t.id} ${s.id}: choice items`);
    }
    if (!choice.length) check(!grouped.length && !s.choice_groups.length, `${t.id} ${s.id}: no choice expected`);
  }
}
fitCheck(T_SHORT, BP.short, BANK);
fitCheck(T_LONG, BP.long, BANK);
// Deck checks never appear in the tests; the tests share no question.
const inShort = new Set(T_SHORT.sections.flatMap((s) => s.items.map((i) => i.question_id)));
const inLong = new Set(T_LONG.sections.flatMap((s) => s.items.map((i) => i.question_id)));
check([...inShort].every((x) => !inLong.has(x)), 'tests are disjoint');
for (const d of [part1, part2]) for (const s of d.slides) if (s.check_question_id) check(!inShort.has(s.check_question_id) && !inLong.has(s.check_question_id), `deck check ${s.check_question_id} is also in a test`);

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of isc-12-accounts-ch14 only: DBMS concept, types (hierarchical, network, relational, object-oriented) and features; SQL SELECT, WHERE, AND, OR, UPDATE, DELETE; aggregate functions AVG, COUNT, MAX, MIN, SUM; database design with tables, fields, data types, keys, relationships, forms, reports and indexing; DBMS in business for accounting information, debtors and creditors, bank reconciliation and asset accounting. No removed topics. ORDER BY, GROUP BY, joins in SQL and INSERT are not taught (reports that combine tables are explained as reports)',
    originality: 'every firm, table and figure written for this chapter (imagined firms named after Indian birds); no textbook illustration or exercise and no CISCE specimen or past-paper item reused; firms and stems differ from the CBSE 12 Accountancy chapters and ISC ch01–ch13; software described generically, no brand names',
    accounts: `an in-memory relational engine (acc.mjs) enforces primary keys, foreign keys and data types and parses and runs every SQL statement shown (AND before OR, three-valued logic for NULL, aggregates skip NULL, restrict on deleting a referenced parent); every result table, row count, key verdict, aggregate value and report total is rendered from the engine and pinned to a hand-checked value; debtor balances, bank reconciliations (cash book + not presented − not credited + bank credits − bank debits = pass book), straight-line asset registers and the trial balance are computed and asserted (Monal sales ${fig(salesTotal)}, debtors ${fig(DEB.total)}, pass book ${fig(BR.bsBal)}, depreciation ${fig(depT)}; ${FACTS.join('; ')})`,
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
