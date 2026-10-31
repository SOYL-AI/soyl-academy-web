// ISC 12 Accounts, ch14 Database Management System — question bank. Every firm, table and figure is
// imagined by SOYL (firms named after Indian birds); no textbook illustration or exercise and no CISCE
// specimen or past-paper item is reused. Every table is loaded into the in-memory engine of acc.mjs,
// which enforces the primary and foreign keys and data types; every query shown is parsed and RUN there,
// and the result tables, row counts, key verdicts, aggregate values, report totals, debtor balances,
// bank reconciliations, depreciation figures and trial balances in keys and model answers are rendered
// from the computed results and pinned to hand-checked values. Software is described generically.
import { Q as register, mcq, ar, tf, fb, match, num, short, long } from './lib.mjs';
import { Db, check, fig, rs, sum, md, bold, code as C, cell, resultMd, scalar, pin, join, groupSum, balances, reconcile, brsMd, slmRegister, trialBalance, TYPE_LABEL } from './acc.mjs';

const FACTS = [];
/** Every question by id, for the bank-level checks in build.mjs (scheme marks, blueprint fit). */
const BANK = new Map();
function Q(key, proto) {
  const id = register(key, proto);
  BANK.set(id, proto);
  return id;
}
/** A database from [name, cols, keys, rows] definitions (parents first). */
const mk = (...defs) => {
  const db = new Db();
  for (const [n, cols, o, rows] of defs) {
    db.create(n, cols, o);
    db.load(n, rows);
  }
  return db;
};
const out = (db, s) => resultMd(db.q(s));
const col0 = (db, s) => db.q(s).rows.map((r) => r[0]);
const list = (xs) => (xs.length === 0 ? 'none' : xs.length === 1 ? String(xs[0]) : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);
const distinct = (opts, what) => {
  check(new Set(opts).size === opts.length, `options not distinct: ${what}`);
  return opts;
};
const designMd = (db, name) => md(['Field', 'Data type', 'Key'], db.design(name));

// ================================================================ t01 DBMS: concept, types and features
Q('m_dbms_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'The accounts office of Tragopan Tea Traders Ltd, an imagined company in Namchi, keeps its customer, invoice and receipt records together in one database. The software that creates this database, stores and retrieves its records and controls who may change them is called',
  opts: ['a database management system (DBMS)', 'a word processor', 'an operating system', 'a presentation program'],
  sol: 'A DBMS is the software layer between the users and the stored records: it defines the tables, stores and retrieves records, enforces the rules on them and controls access.',
}));

Q('m_data_info', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Hoopoe Spices Ltd, an imagined wholesaler in Etawah, records every credit sale in its database. Which of the following is **information** rather than raw data for its credit controller?',
  opts: ['A report of the total amount each retailer owes at the month end, highest first', 'The amount keyed in for one sales invoice', 'The date typed on one receipt', 'The code given to one retailer in the customer table'],
  sol: 'Data are raw facts as recorded (one amount, one date, one code). Information is data processed into a form that helps a decision: here, invoices less receipts, totalled per retailer and sorted.',
}));

Q('m_hier', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Drongo Dairy Ltd, an imagined company in Sitapur, stores its sales records as a tree: each region record owns several depot records, each depot record owns several retailer records, and every retailer belongs to exactly one depot. Its database follows the',
  opts: ['hierarchical model', 'network model', 'relational model', 'object-oriented model'],
  sol: 'A tree in which every child record has exactly one parent (region → depot → retailer) is the hierarchical model. Reaching a retailer means going down the tree from its region.',
}));

Q('m_network', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'In the database of Shikra Logistics Ltd, an imagined transporter in Datia, each consignment record is linked by stored pointers both to the customer who booked it and to the truck that carried it; a customer and a truck are each linked to many consignments. This database follows the',
  opts: ['network model, in which a record may have more than one owner record', 'hierarchical model, in which a record has only one parent', 'relational model, in which tables are linked only through key values', 'flat-file model, in which everything sits in one list'],
  sol: 'A consignment owned by two parents (a customer and a truck) through pointers is the network (graph) model; a hierarchy allows only one parent, and a relational database links tables through key values rather than pointers.',
}));

Q('m_redund', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Barbet Paints Ltd, an imagined company in Lalitpur, used to type each dealer’s address into its sales file, its receipts file and its discount file. After moving to a DBMS it keeps the address once, in a Dealers table, and every other table refers to it by dealer code. Which advantage of a DBMS does this show?',
  opts: ['Controlled redundancy, which also keeps the address consistent everywhere', 'Backup and recovery after a failure', 'Concurrent access by many users', 'Security through passwords and user rights'],
  sol: 'Storing a fact once and referring to it by key removes duplicate copies, so an address change is made in one place and every report shows the same address.',
}));

Q('m_concurrent', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'On the last day of the month, three clerks of Minivet Electricals Ltd, an imagined company in Basti, enter customer receipts into the same database at the same time, and no clerk’s entry overwrites another’s. The DBMS feature at work is',
  opts: ['concurrency control (multi-user access with locking)', 'data independence', 'report generation', 'indexing'],
  sol: 'A DBMS lets many users work on shared records at once and locks a record while it is being changed, so simultaneous updates do not clash.',
}));

Q('tf_backup', tf({
  t: 1, d: 1, c: 'recall', ans: true,
  stem: 'True or false? If the server of Pitta Pharma Distributors Ltd, an imagined company in Mainpuri, fails on 31 March, a DBMS that keeps regular backups and a log of transactions lets the company restore its ledger records up to the last completed transaction.',
  sol: 'Backup and recovery is a standard DBMS feature: the last backup is restored and the logged transactions after it are re-applied.',
}));

Q('tf_independence', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? When Kestrel Tyres Ltd, an imagined dealer in Hardoi, moves its database to a larger disk and the DBMS changes how the records are physically stored, every program that prints its sales registers must be rewritten.',
  sol: 'A DBMS gives data independence: programs ask for records by table and field name, so a change in physical storage does not force the programs to change.',
}));

Q('fb_dbms', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'For Babbler Foods Ltd, an imagined grocery wholesaler in Arrah, the organised collection of its related customer, stock and sales records is a ___, and the software it uses to define, store, query and protect those records is a ___.',
  acc: [['database'], ['database management system', 'DBMS']],
  sol: 'The records themselves form the database; the software that manages them is the database management system (DBMS).',
}));

const LW = mk(
  ['Customers', [['CustCode', 'text'], ['CustName', 'text']], { pk: 'CustCode' }, [['L1', 'Chowk Hardware'], ['L2', 'Station Road Tools']]],
  ['Invoices', [['InvNo', 'number'], ['CustCode', 'text'], ['Amount', 'currency']], { pk: 'InvNo', fks: { CustCode: 'Customers' } }, [[11, 'L1', 9000]]],
);
const LW_v = pin(LW.verdict('Invoices', { InvNo: 12, CustCode: 'L7', Amount: 5000 }), 'Rejected: no matching record in Customers (foreign key)', 'Lapwing verdict');
Q('ar_integrity', ar({
  t: 1, d: 2, c: 'understanding', key: 'a',
  a: 'The database of Lapwing Hardware Ltd, an imagined dealer in Buxar, refuses to save invoice 12 because it quotes customer code L7, which is not in its Customers table.',
  r: 'A DBMS enforces integrity rules, such as the rule that a foreign key value must match an existing primary key value.',
  sol: `Both are true and R explains A. The verdict for the invoice is "${LW_v}": the DBMS will not let a sale be recorded against a customer who does not exist.`,
}));

Q('ar_types_tree', ar({
  t: 1, d: 3, c: 'understanding', key: 'c',
  a: 'In the hierarchical database of Sunbird Toys Ltd, an imagined company in Shivpuri, each retailer record sits under exactly one distributor record.',
  r: 'In a hierarchical database a child record may have any number of parent records.',
  sol: 'A is true: the hierarchical model is a tree. R is false: in a tree each child has only one parent; records with several owners belong to the network model.',
}));

Q('mt_types', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'The systems team of Hornbill Coffee Curers Ltd, an imagined company, compares four ways in which a DBMS can organise its estate and sales records. Match each type of DBMS in column A with the way it links records in column B.',
  pairs: [
    ['Hierarchical', 'A tree: each child record has only one parent'],
    ['Network', 'A graph: a record may be linked to several owner records by pointers'],
    ['Relational', 'Tables (relations) linked through common key fields'],
    ['Object-oriented', 'Objects that hold both their data and the operations on that data'],
  ],
  sol: 'Tree, graph, tables and objects are the four structures; most accounting packages today are built on the relational model.',
}));

Q('s2_features', short({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Trogon Cement Agencies, an imagined dealer in Satna, is moving its debtors records into a DBMS. Name and explain two features of a DBMS that will help its accountant keep these records correct and safe.',
  model: '1. **Integrity (validation) rules.** The DBMS checks every entry against rules set once: a primary key such as the customer code must be unique and filled in, an amount must be a number, and an invoice must quote a customer code that exists. Wrong or incomplete records are refused at the point of entry.\n2. **Security and backup.** Each user logs in with a password and gets only the rights needed (a clerk may enter receipts but not delete customers), and the DBMS keeps backups and a transaction log so records can be restored after a failure.',
  sol: 'One mark for each feature that is both named and linked to correctness or safety of the debtors records.',
  scheme: [['First feature named and explained (e.g. integrity rules)', 1], ['Second feature named and explained (e.g. security, backup and recovery)', 1]],
}));

Q('s2_data_info', short({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Distinguish between data and information, using the sales records of Prinia Bakery Supplies Ltd, an imagined company in Raigarh, as your example.',
  model: '- **Data** are raw, unprocessed facts as they are recorded, for example the invoice number, date, customer code and amount of each sale Prinia keys into its Invoices table. Taken one by one they do not answer a business question.\n- **Information** is data that has been processed (sorted, filtered, totalled, related) into a meaningful form that supports a decision, for example a report of total sales by customer for June, or the list of customers whose dues exceed their credit limit.\n\nA DBMS turns the stored data into information through queries and reports.',
  sol: 'Define both terms and give one Prinia example of each.',
  scheme: [['Data defined as raw facts, with an example', 1], ['Information defined as processed, meaningful data, with an example', 1]],
}));

Q('s3_advantages', short({
  t: 1, d: 3, c: 'analysis', marks: 3,
  stem: 'Pipit Stationers Ltd, an imagined company in Azamgarh, keeps three separate spreadsheet files: one for sales, one for receipts and one for customer addresses. The same customer is often spelt differently in each file. Give three advantages Pipit would gain by moving these records into a single relational database.',
  model: '1. **Less redundancy, more consistency.** Each customer’s name and address are stored once in a Customers table; sales and receipts refer to the customer code, so one spelling appears in every report and a change is made in one place.\n2. **Integrity rules.** The DBMS refuses a sale or receipt for a customer code that does not exist, a duplicate invoice number or an amount typed as text, so errors are stopped at entry.\n3. **Queries and reports on related data.** Because the tables are linked by keys, Pipit can ask for the balance of every customer (sales less receipts) or the dues by town in seconds, without copying figures between files.\n\n*(Also accepted: shared multi-user access, security through user rights, backup and recovery.)*',
  sol: 'Tie each advantage to the problem of three unlinked files with differently spelt customers.',
  scheme: [['Reduced redundancy and consistent customer records', 1], ['Integrity rules stop wrong entries', 1], ['Queries and reports across linked tables (or another valid advantage)', 1]],
}));

Q('s3_types', short({
  t: 1, d: 3, c: 'understanding', marks: 3,
  stem: 'Wagtail Cold Stores Ltd, an imagined company in Bilaspur, stores apples for many growers in several chambers. Explain the hierarchical, network and relational types of DBMS, showing how each could hold its grower and storage records.',
  model: '1. **Hierarchical.** Records form a tree: each child has one parent. Wagtail could keep chamber → rack → lot, with every lot under one rack. Simple and fast for top-down look-ups, but a lot that must also be linked to its grower cannot have a second parent, so data gets repeated.\n2. **Network.** Records form a graph linked by pointers, and a record may have several owners. A lot can be owned both by its chamber and by its grower. More flexible, but the pointer structure is complex to design and change.\n3. **Relational.** Data is kept in tables (Growers, Chambers, Lots) linked through key fields: each Lots row carries the GrowerCode and ChamberCode as foreign keys. Any question (lots of one grower, space used in a chamber) can be answered by a query; this is the model most accounting software uses.',
  sol: 'For each type: its structure, one Wagtail example, and one strength or weakness.',
  scheme: [['Hierarchical: tree, one parent, example', 1], ['Network: graph, many owners, example', 1], ['Relational: linked tables with keys, example', 1]],
}));

// ================================================================ t04 Database design
const FL = mk(['Suppliers', [['SupCode', 'text'], ['SupName', 'text'], ['Crop', 'text'], ['Quintals', 'number']], { pk: 'SupCode' }, [
  ['S1', 'Kunda Kisan Samiti', 'Mustard', 120],
  ['S2', 'Lakhanpur Growers', 'Groundnut', 85],
  ['S3', 'Bhatgaon Farmers Club', 'Mustard', 60],
  ['S4', 'Sargaon Producers', 'Soybean', 140],
  ['S5', 'Tilda Oilseed Group', 'Groundnut', 95],
]]);
const FL_f = pin(FL.colNames('Suppliers').length, 4, 'Florican fields');
const FL_r = pin(FL.table('Suppliers').rows.length, 5, 'Florican records');
Q('m_field_record', mcq({
  t: 4, d: 1, c: 'application',
  stem: `Florican Oils Ltd, an imagined oil mill in Ambikapur, keeps this Suppliers table. How many fields and how many records does it hold?\n\n${FL.md('Suppliers')}`,
  opts: distinct([`${FL_f} fields and ${FL_r} records`, `${FL_r} fields and ${FL_f} records`, `${FL_f} fields and ${FL_r + 1} records`, `${FL_f * FL_r} fields and ${FL_r} records`], 'Florican'),
  sol: `A field is a column (SupCode, SupName, Crop, Quintals: ${FL_f}); a record is a row, one supplier (${FL_r}). The header row is not a record.`,
}));

const BU = mk(['Employees', [['EmpName', 'text'], ['Dept', 'text'], ['EmpCode', 'text'], ['BasicPay', 'currency']], { pk: 'EmpCode' }, [
  ['Sanket Rao', 'Stores', 'E101', 30000],
  ['Manan Jha', 'Accounts', 'E102', 42000],
  ['Sanket Rao', 'Workshop', 'E103', 30000],
  ['Atharv Sen', 'Accounts', 'E104', 36000],
]]);
check(['EmpName', 'Dept', 'EmpCode', 'BasicPay'].filter((c) => BU.candidate('Employees', [c])).join() === 'EmpCode', 'Bustard: only EmpCode is unique');
Q('m_pk', mcq({
  t: 4, d: 2, c: 'application',
  stem: `The payroll table of Bustard Engineering Ltd, an imagined company in Balaghat, is shown below. Which field should be its primary key?\n\n${BU.md('Employees')}`,
  opts: ['EmpCode', 'EmpName', 'Dept', 'BasicPay'],
  sol: 'A primary key must be different and filled in for every record. Two employees share the name Sanket Rao and the pay 30000, and two work in Accounts; only EmpCode is unique, and a code will stay unique as more staff join.',
}));

Q('m_fk', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Myna Batteries Ltd, an imagined dealer in Deoghar, has a Dealers table whose primary key is DealerCode, and an Orders table with the fields OrderNo, OrderDate, DealerCode and Value. In the Orders table, DealerCode is',
  opts: ['a foreign key that links each order to one dealer in the Dealers table', 'the primary key of the Orders table', 'a field that must hold a different value in every order', 'an index that sorts the Dealers table'],
  sol: 'A field in one table that refers to the primary key of another is a foreign key. OrderNo is the primary key of Orders; DealerCode repeats, because one dealer places many orders.',
}));

const CO = mk(['Trips', [['BoatCode', 'text'], ['TripDate', 'date'], ['CatchKg', 'number']], { pk: 'TripDate' }, []]);
// The engine holds single-column keys; the composite key is tested with candidate() on the loaded rows.
const CO_rows = [['B1', '2026-05-02', 420], ['B2', '2026-05-02', 380], ['B3', '2026-05-02', 420], ['B1', '2026-05-03', 420], ['B2', '2026-05-03', 300]];
CO.table('Trips').rows = CO_rows.map(([BoatCode, TripDate, CatchKg]) => ({ BoatCode, TripDate, CatchKg }));
check(!CO.candidate('Trips', ['BoatCode']) && !CO.candidate('Trips', ['TripDate']) && !CO.candidate('Trips', ['CatchKg']) && !CO.candidate('Trips', ['TripDate', 'CatchKg']) && !CO.candidate('Trips', ['BoatCode', 'CatchKg']) && CO.candidate('Trips', ['BoatCode', 'TripDate']), 'Cormorant composite key');
Q('m_composite', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: `Cormorant Fisheries Ltd, an imagined company in Malda, records each boat trip in this Trips table; a boat makes at most one trip a day. Which field or fields should form the primary key?\n\n${CO.md('Trips')}`,
  opts: ['BoatCode and TripDate together (a composite key)', 'BoatCode alone', 'TripDate alone', 'TripDate and CatchKg together'],
  sol: 'No single field is unique (B1 sails twice; three trips fall on 2 May; 420 kg is caught three times), and TripDate with CatchKg repeats (B1 and B3 on 2 May). One trip per boat per day makes the pair BoatCode–TripDate unique.',
}));

const SP = mk(
  ['Farmers', [['FarmerCode', 'text'], ['FarmerName', 'text']], { pk: 'FarmerCode' }, [['F1', 'Janak Sahu'], ['F2', 'Tanuj Netam'], ['F3', 'Darsh Dhruw']]],
  ['Purchases', [['SlipNo', 'number'], ['FarmerCode', 'text'], ['Quintals', 'number'], ['Amount', 'currency']], { pk: 'SlipNo', fks: { FarmerCode: 'Farmers' } }, [[101, 'F1', 30, 73500], [102, 'F3', 25, 61250], [103, 'F2', 18, 44100]]],
);
const SP_try = [
  ['Slip 103 for farmer F1, 20 quintals, ₹49,000', { SlipNo: 103, FarmerCode: 'F1', Quintals: 20, Amount: 49000 }],
  ['A slip with no slip number, for farmer F2, 12 quintals, ₹29,400', { FarmerCode: 'F2', Quintals: 12, Amount: 29400 }],
  ['Slip 105 for farmer F7, 22 quintals, ₹53,900', { SlipNo: 105, FarmerCode: 'F7', Quintals: 22, Amount: 53900 }],
  ['Slip 105 for farmer F2, 40 quintals, ₹98,000', { SlipNo: 105, FarmerCode: 'F2', Quintals: 40, Amount: 98000 }],
].map(([label, row]) => [label, SP.verdict('Purchases', row)]);
pin(SP_try.map((x) => x[1]), ['Rejected: duplicate primary key', 'Rejected: primary key left blank', 'Rejected: no matching record in Farmers (foreign key)', 'Accepted'], 'Spoonbill verdicts');
Q('m_verdict', mcq({
  t: 4, d: 3, c: 'application',
  stem: `Spoonbill Rice Mills Ltd, an imagined mill in Dhamtari, buys paddy from farmers. SlipNo is the primary key of Purchases, and FarmerCode in Purchases is a foreign key to Farmers.\n\n${SP.md('Farmers')}\n\n${SP.md('Purchases')}\n\nWhich of these new purchase records will the DBMS save?`,
  opts: [SP_try[3][0], SP_try[0][0], SP_try[1][0], SP_try[2][0]],
  sol: `Slip 103 already exists (${SP_try[0][1].toLowerCase()}); a blank slip number is refused (${SP_try[1][1].toLowerCase()}); farmer F7 is not in Farmers (${SP_try[2][1].toLowerCase()}). Slip 105 for F2 passes every check.`,
}));

Q('m_form', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'The data-entry clerk of Oriole Paper Mills Ltd, an imagined company in Shahdol, keys each new purchase bill into an on-screen layout that shows one record at a time, with labelled boxes and a drop-down list of supplier codes. This DBMS object is a',
  opts: ['form', 'report', 'query', 'index'],
  sol: 'A form is the screen for entering, viewing and editing records one at a time; a report presents output, a query asks a question of the data, and an index speeds up searching.',
}));

Q('m_index', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Magpie Tiles Ltd, an imagined company in Motihari, has two lakh invoice records and searches them by DealerCode many times a day. Creating an index on DealerCode will',
  opts: ['speed up searching and sorting by DealerCode, at the cost of extra storage and slightly slower saving of new invoices', 'remove the repeated dealer codes from the Invoices table', 'turn DealerCode into the primary key of the Invoices table', 'stop any invoice from being saved without a dealer code'],
  sol: 'An index is a sorted list of the field’s values with pointers to the records, like the index of a book. It does not change the data or the keys; it must be updated whenever a record is added or changed.',
}));

Q('ar_index', ar({
  t: 4, d: 3, c: 'analysis', key: 'd',
  a: 'Creating an index on every field of the Invoices table of Treepie Ceramics Ltd, an imagined company, will make every operation on that table faster.',
  r: 'An index lets the DBMS find the records holding a given value without reading the whole table.',
  sol: 'R is true. A is false: every index takes space and must be updated each time a record is added, changed or deleted, so indexing every field slows down data entry. Index only the fields that are searched or sorted often.',
}));

const CR = mk(['Assets', [['AssetNo', 'text'], ['AssetName', 'text'], ['Cost', 'currency']], { pk: 'AssetNo' }, [['M1', 'Bearing grinder', 450000]]]);
pin(CR.verdict('Assets', { AssetName: 'Lathe', Cost: 280000 }), 'Rejected: primary key left blank', 'Courser blank key');
Q('ar_pk_blank', ar({
  t: 4, d: 2, c: 'understanding', key: 'a',
  a: 'The DBMS used by Courser Bearings Ltd, an imagined company, refuses to save a new record in its Assets table when the AssetNo field is left blank.',
  r: 'Every record must have a primary key value, because the primary key is what identifies each record uniquely.',
  sol: 'Both are true and R explains A: a blank AssetNo could not tell this lathe apart from any other record, so the DBMS rejects it.',
}));

Q('ar_form_report', ar({
  t: 4, d: 2, c: 'understanding', key: 'b',
  a: 'The accountant of Coucal Cables Ltd, an imagined company, prints a report that lists dues city by city, with a subtotal for each city and a grand total.',
  r: 'A form shows one record at a time on screen for entering and editing data.',
  sol: 'Both are true, but R describes forms; it does not explain why a report can group records and print subtotals.',
}));

Q('tf_fk_unique', tf({
  t: 4, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? In the Bills table of Parakeet Packaging Ltd, an imagined company, the foreign key SupplierCode must hold a different value in every bill.',
  sol: 'Only a primary key must be unique. One supplier sends many bills, so the same SupplierCode appears in many rows; each value must simply match a supplier in the Suppliers table.',
}));

Q('fb_pk', fb({
  t: 4, d: 1, c: 'recall',
  stem: 'In the Members table of the imagined Thrush Credit Co-operative Society, Guna, the field MemberNo holds a different value for every member and is never left blank. It is the table’s ___.',
  acc: [['primary key', 'primary-key']],
  sol: 'A field that is unique and never blank, chosen to identify each record, is the primary key.',
}));

Q('mt_rel', match({
  t: 4, d: 3, c: 'analysis', marks: 2,
  stem: 'While designing its database, Openbill Agro Ltd, an imagined company in Hailakandi, lists four pairs of things it must record. Match each pair in column A with the relationship between them in column B.',
  pairs: [
    ['Each employee and the one salary bank account recorded for that employee', 'One-to-one'],
    ['A supplier and the purchase bills received from it', 'One-to-many'],
    ['Purchase bills and the products listed on them', 'Many-to-many (through a bill-lines table)'],
    ['Many sales invoices and the one sales region each belongs to', 'Many-to-one'],
  ],
  sol: 'Ask from each side: how many of B can one A have, and how many of A can one B have? A bill lists many products and a product appears on many bills, so a third table of bill lines is needed.',
}));

Q('mt_datatype', match({
  t: 4, d: 2, c: 'application', marks: 2,
  stem: 'Shama Security Services Ltd, an imagined company, is setting up the fields of its Payroll table. Match each field in column A with the most suitable data type in column B.',
  pairs: [
    ['EmpCode (codes such as E-104)', TYPE_LABEL.text],
    ['JoiningDate', TYPE_LABEL.date],
    ['BasicPay', TYPE_LABEL.currency],
    ['PFMember (whether the guard is in the provident fund)', TYPE_LABEL.yesno],
  ],
  sol: 'A code is a label, not a quantity, so it is text; dates need a date type for sorting and date arithmetic; money needs a currency (or number) type for totals; a two-way answer is Yes/No.',
}));

const SI = mk(
  ['Outlets', [['OutCode', 'text'], ['OutName', 'text'], ['Area', 'text']], { pk: 'OutCode' }, [['O1', 'Lake Gate Canteen', 'Kotra'], ['O2', 'Bus Depot Kiosk', 'Bairagarh'], ['O3', 'Hostel Mess', 'Kotra'], ['O4', 'Market Corner Stall', 'Bairagarh']]],
  ['Sales', [['BillNo', 'number'], ['OutCode', 'text'], ['Amount', 'currency']], { pk: 'BillNo', fks: { OutCode: 'Outlets' } }, [[61, 'O1', 4200], [62, 'O2', 3600], [63, 'O3', 5100], [64, 'O1', 2900], [65, 'O4', 4400], [66, 'O3', 1800]]],
);
const SI_by = groupSum(join(SI, 'Sales', 'OutCode', 'Outlets'), 'Area', 'Amount');
pin(SI_by, [['Kotra', 14000], ['Bairagarh', 8000]], 'Siskin areas');
const SI_kotra = SI_by[0][1];
const SI_kotraBills = join(SI, 'Sales', 'OutCode', 'Outlets').filter((r) => r.Area === 'Kotra');
Q('n_report_total', num({
  t: 4, d: 3, c: 'application', marks: 1, value: SI_kotra, unit: '₹',
  stem: `Siskin Snacks Ltd, an imagined company, prepares a report of sales by area by linking its Sales table to its Outlets table through OutCode. What total (in ₹) will the report show for the Kotra area?\n\n${SI.md('Outlets')}\n\n${SI.md('Sales')}`,
  sol: `Kotra outlets are O1 and O3. Their bills: ${SI_kotraBills.map((r) => `${r.BillNo} (${fig(r.Amount)})`).join(', ')}; total = ${SI_kotraBills.map((r) => fig(r.Amount)).join(' + ')} = ₹${fig(SI_kotra)}.`,
}));

const WB = mk(
  ['Publishers', [['PubCode', 'text'], ['PubName', 'text'], ['City', 'text']], { pk: 'PubCode' }, [['P1', 'Saptarshi Prakashan', 'Prayagraj'], ['P2', 'Shabdkosh Books', 'Ahraura'], ['P3', 'Aarohi Press', 'Prayagraj']]],
  ['Purchases', [['BillNo', 'number'], ['BillDate', 'date'], ['PubCode', 'text'], ['Amount', 'currency']], { pk: 'BillNo', fks: { PubCode: 'Publishers' } }, [[801, '2026-06-02', 'P2', 18500], [802, '2026-06-05', 'P1', 9200], [803, '2026-06-09', 'P2', 12600]]],
);
check(WB.candidate('Publishers', ['PubCode']) && !WB.candidate('Publishers', ['City']) && WB.candidate('Purchases', ['BillNo']) && !WB.candidate('Purchases', ['PubCode']), 'Warbler keys');
Q('s2_pk_fk', short({
  t: 4, d: 2, c: 'application', marks: 2,
  stem: `Warbler Books Ltd, an imagined bookseller, keeps the two tables below. Identify the primary key of each table and the foreign key that relates them, giving a reason for each.\n\n${WB.md('Publishers')}\n\n${WB.md('Purchases')}`,
  model: `${md(['Table', 'Primary key', 'Why'], [['Publishers', 'PubCode', 'A different code for every publisher, never blank; names and cities can repeat (two publishers are in Prayagraj)'], ['Purchases', 'BillNo', 'Each bill has its own number']])}\n\n**Foreign key:** PubCode in Purchases refers to PubCode, the primary key of Publishers. It repeats (P2 appears on bills 801 and 803) because one publisher sends many bills: a one-to-many relationship.`,
  sol: 'Look for the field that never repeats in each table, then for the field that appears in both tables.',
  scheme: [['Both primary keys with reasons', 1], ['Foreign key PubCode in Purchases, linking to Publishers', 1]],
}));

Q('s2_form_report', short({
  t: 4, d: 2, c: 'understanding', marks: 2,
  stem: 'Distinguish between a form and a report in the DBMS used by Jacana Travel Gear Ltd, an imagined company, giving one use of each in its accounts.',
  model: `${md(['Basis', 'Form', 'Report'], [['Purpose', 'Input: entering, viewing and editing records', 'Output: presenting stored data in a summarised, formatted way'], ['Records shown', 'Usually one record at a time, on screen', 'Many records, grouped and sorted, often with subtotals and totals'], ['Use at Jacana', 'Keying in each sales invoice with a drop-down of customer codes', 'Printing the month’s sales by city with a grand total']])}`,
  sol: 'Contrast input with output, and give one Jacana use for each.',
  scheme: [['Form: input screen, one record at a time, with a use', 1], ['Report: formatted output with totals, with a use', 1]],
}));

Q('s2_index', short({
  t: 4, d: 2, c: 'understanding', marks: 2,
  stem: 'Fantail Fans Ltd, an imagined company, looks up its customer ledger of thousands of records by customer code many times a day. Explain what indexing a field means, with one advantage and one drawback for Fantail.',
  model: '- **Meaning.** An index on a field (say CustCode) is a separate, sorted list of that field’s values, each with a pointer to the record holding it, so the DBMS can jump to the right records instead of reading the whole table, just as a book’s index points to pages.\n- **Advantage:** searches, sorts and links on CustCode become much faster as the ledger grows.\n- **Drawback:** the index takes extra storage and must be updated whenever a record is added, changed or deleted, which slows data entry slightly.',
  sol: 'Meaning with the book-index idea, then one gain and one cost.',
  scheme: [['Meaning of an index', 1], ['One advantage and one drawback', 1]],
}));

const LK = mk(
  ['Dealers', [['DealerCode', 'text'], ['DealerName', 'text'], ['District', 'text']], { pk: 'DealerCode' }, [['D1', 'Kisan Seva Kendra', 'Hoshangabad'], ['D2', 'Hariyali Agro Point', 'Harda'], ['D3', 'Beej Bhandar', 'Sehore']]],
  ['Orders', [['OrderNo', 'number'], ['OrderDate', 'date'], ['DealerCode', 'text'], ['Bags', 'number']], { pk: 'OrderNo', fks: { DealerCode: 'Dealers' } }, [[204, '2026-07-01', 'D1', 40], [205, '2026-07-02', 'D3', 25], [206, '2026-07-04', 'D1', 60]]],
);
const LK_try = [
  ['(i) Order 204, 6 July 2026, dealer D2, 30 bags', { OrderNo: 204, OrderDate: '2026-07-06', DealerCode: 'D2', Bags: 30 }],
  ['(ii) Order 207, 7 July 2026, dealer D9, 45 bags', { OrderNo: 207, OrderDate: '2026-07-07', DealerCode: 'D9', Bags: 45 }],
  ['(iii) Order 207, 7 July 2026, dealer D2, "forty" bags', { OrderNo: 207, OrderDate: '2026-07-07', DealerCode: 'D2', Bags: 'forty' }],
].map(([label, row]) => [label, LK.verdict('Orders', row)]);
pin(LK_try.map((x) => x[1]), ['Rejected: duplicate primary key', 'Rejected: no matching record in Dealers (foreign key)', 'Rejected: wrong data type in Bags'], 'Lark verdicts');
const LK_ok = pin(LK.verdict('Orders', { OrderNo: 207, OrderDate: '2026-07-07', DealerCode: 'D2', Bags: 40 }), 'Accepted', 'Lark corrected');
const LK_why = ['OrderNo 204 already belongs to another order; a primary key cannot repeat.', 'D9 is not a DealerCode in Dealers; a foreign key must match an existing dealer.', 'Bags is a Number field; the text "forty" is refused.'];
Q('s3_verdicts', short({
  t: 4, d: 3, c: 'application', marks: 3,
  stem: `Lark Seeds Ltd, an imagined company, keeps the tables below. OrderNo is the primary key of Orders; DealerCode in Orders is a foreign key to Dealers; Bags is a Number field.\n\n${LK.md('Dealers')}\n\n${LK.md('Orders')}\n\nState, with a reason, whether the DBMS will save each new order:\n\n${LK_try.map((x) => `- ${x[0]}`).join('\n')}`,
  model: `${md(['New order', 'Verdict', 'Reason'], LK_try.map(([l, v], i) => [l, bold(v), LK_why[i]]))}\n\nOrder 207 for D2 with the number 40 typed as digits would be: **${LK_ok}**.`,
  sol: 'Test each row against the three rules in turn: unique primary key, matching foreign key, correct data type.',
  scheme: LK_try.map(([l, v]) => [`${l.split(')')[0]}): ${v}, with reason`, 1]),
}));

Q('s3_relationships', short({
  t: 4, d: 3, c: 'analysis', marks: 3,
  stem: 'Heron Holidays Ltd, an imagined tour operator, is designing tables for Customers, Bookings, Tickets (one ticket number per booking) and Hotels (a tour may use many hotels, and a hotel serves many tours). Identify the relationship between (i) Bookings and Tickets, (ii) Customers and Bookings, (iii) Bookings and Hotels, and say how each would be built with keys.',
  model: `${md(['Pair', 'Relationship', 'How it is built'], [['(i) Bookings – Tickets', 'One-to-one', 'Each booking has exactly one ticket number; BookingNo can be the primary key of Tickets as well, or TicketNo can be kept as a unique field in Bookings'], ['(ii) Customers – Bookings', 'One-to-many', 'CustCode, primary key of Customers, is placed in Bookings as a foreign key; it repeats for a customer’s many bookings'], ['(iii) Bookings – Hotels', 'Many-to-many', 'Cannot be held by one foreign key; a third table BookingHotels (BookingNo, HotelCode) is created, each a foreign key, the pair forming its composite primary key']])}`,
  sol: 'Ask how many of each side can go with one of the other, then place the keys accordingly.',
  scheme: [['(i) one-to-one, with key placement', 1], ['(ii) one-to-many, foreign key in Bookings', 1], ['(iii) many-to-many, linking table', 1]],
}));

const RS = mk(
  ['Retailers', [['RetCode', 'text'], ['RetName', 'text'], ['Town', 'text']], { pk: 'RetCode' }, [['R1', 'Chowraha Soda Point', 'Tirwa'], ['R2', 'Ganga Ghat Kiosk', 'Bilhaur'], ['R3', 'College Canteen', 'Tirwa'], ['R4', 'Mandi Cold Drinks', 'Chhibramau']]],
  ['Sales', [['BillNo', 'number'], ['RetCode', 'text'], ['Amount', 'currency']], { pk: 'BillNo', fks: { RetCode: 'Retailers' } }, [[41, 'R1', 6400], [42, 'R2', 5200], [43, 'R4', 7300], [44, 'R3', 2800], [45, 'R2', 4100], [46, 'R1', 3500], [47, 'R4', 1900]]],
);
const RS_j = join(RS, 'Sales', 'RetCode', 'Retailers');
const RS_by = groupSum(RS_j, 'Town', 'Amount');
pin(RS_by, [['Tirwa', 12700], ['Bilhaur', 9300], ['Chhibramau', 9200]], 'Redstart towns');
const RS_tot = pin(sum(RS_by.map((x) => x[1])), 31200, 'Redstart total');
Q('s3_report_city', short({
  t: 4, d: 3, c: 'application', marks: 3,
  stem: `Redstart Beverages Ltd, an imagined company, wants a report of its sales by town, with a grand total. The town of each sale is found by linking Sales to Retailers through RetCode.\n\n${RS.md('Retailers')}\n\n${RS.md('Sales')}\n\nPrepare the report.`,
  model: `**Step 1 — link each bill to its retailer's town (RetCode is the foreign key):**\n\n${md(['BillNo', 'RetCode', 'Town', 'Amount'], RS_j.map((r) => [String(r.BillNo), r.RetCode, r.Town, fig(r.Amount)]), [3])}\n\n**Step 2 — group by town and total:**\n\n${md(['Town', 'Sales (₹)'], [...RS_by.map(([t, v]) => [t, fig(v)]), ['**Grand total**', `**${fig(RS_tot)}**`]], [1])}\n\nCheck: the grand total equals the sum of all ${RS_j.length} bills, ₹${fig(RS_tot)}.`,
  sol: 'Join, then group and sum; the town totals must add up to the total of the Sales table.',
  scheme: [['Each bill linked to the correct town', 1], ['Town totals', 1], ['Grand total with check', 1]],
}));

const BB = mk(
  ['Categories', [['CatCode', 'text'], ['CatName', 'text'], ['RatePct', 'number']], { pk: 'CatCode' }, [['PM', 'Plant and machinery', 15], ['VH', 'Vehicles', 20], ['FF', 'Furniture and fittings', 10]]],
  ['Assets', [['AssetNo', 'text'], ['AssetName', 'text'], ['CatCode', 'text'], ['PurchaseDate', 'date'], ['Cost', 'currency'], ['InUse', 'yesno']], { pk: 'AssetNo', fks: { CatCode: 'Categories' } }, [['A-01', 'Concrete mixer', 'PM', '2025-04-01', 380000, 'Yes'], ['A-02', 'Tipper truck', 'VH', '2024-04-01', 1450000, 'Yes'], ['A-03', 'Site office cabin', 'FF', '2025-10-01', 160000, 'No']]],
);
pin(BB.verdict('Assets', { AssetNo: 'A-04', AssetName: 'Crane', CatCode: 'XX', PurchaseDate: '2026-04-01', Cost: 900000, InUse: 'Yes' }), 'Rejected: no matching record in Categories (foreign key)', 'Bunting unknown category');
pin(BB.verdict('Assets', { AssetNo: 'A-02', AssetName: 'Crane', CatCode: 'PM', PurchaseDate: '2026-04-01', Cost: 900000, InUse: 'Yes' }), 'Rejected: duplicate primary key', 'Bunting duplicate');
Q('l5_design_assets', long({
  t: 4, d: 4, c: 'analysis', marks: 5,
  stem: 'Bunting Builders Ltd, an imagined construction company, wants to keep its fixed asset register in a database. For each asset it records an asset number, the name of the asset, its category (plant and machinery, vehicles, or furniture and fittings), the date of purchase, the cost and whether it is still in use. The depreciation rate depends only on the category.\n\n(a) Design an Assets table: list its fields with a suitable data type for each, and choose its primary key with a reason. (3)\n\n(b) Explain why the depreciation rate should be kept in a separate Categories table, design that table, and state the key that links the two tables and the type of relationship. (2)',
  model: `**(a) Assets table**\n\n${designMd(BB, 'Assets')}\n\nAssetNo is the primary key: every asset gets its own number, never blank; names (two "Concrete mixer"s are possible), dates, categories and costs can repeat. Example records: A-01 Concrete mixer, PM, 2025-04-01, 380000, Yes; A-02 Tipper truck, VH, 2024-04-01, 1450000, Yes.\n\n**(b) Categories table**\n\n${designMd(BB, 'Categories')}\n\nKeeping the rate in Assets would repeat it in every asset of a category, and a rate change would have to be made in many rows (risking inconsistency). In Categories it is stored once. CatCode, the primary key of Categories, appears in Assets as a **foreign key**; one category has many assets, so the relationship is **one-to-many**. The DBMS will then refuse an asset with category XX ("no matching record in Categories") or a second asset numbered A-02 ("duplicate primary key").`,
  sol: 'Choose types by what each field holds (codes are text, money is currency, dates are dates, in-use is Yes/No); move the category-dependent rate to its own table and link it by key.',
  scheme: [['Six fields with suitable data types', 2], ['Primary key AssetNo with reason', 1], ['Categories table, foreign key CatCode, one-to-many', 2]],
}));

const RF = mk(
  ['Dealers', [['DealerCode', 'text'], ['DealerName', 'text'], ['Town', 'text'], ['CreditLimit', 'currency']], { pk: 'DealerCode' }, [['R1', 'Krishi Kendra', 'Multai'], ['R2', 'Annadata Agencies', 'Amla'], ['R3', 'Hari Om Khad Bhandar', 'Sarni']].map((r, i) => [...r, [200000, 150000, 100000][i]])],
  ['Invoices', [['InvNo', 'number'], ['InvDate', 'date'], ['DealerCode', 'text'], ['Amount', 'currency']], { pk: 'InvNo', fks: { DealerCode: 'Dealers' } }, [[901, '2026-06-03', 'R2', 64000], [902, '2026-06-08', 'R1', 82000], [903, '2026-06-15', 'R2', 37000]]],
);
const RF_v1 = pin(RF.verdict('Invoices', { InvNo: 904, InvDate: '2026-06-20', DealerCode: 'R9', Amount: 50000 }), 'Rejected: no matching record in Dealers (foreign key)', 'Rosefinch unknown dealer');
const RF_d = RF.clone().run("DELETE FROM Dealers WHERE DealerCode = 'R2'");
pin(RF_d, { affected: 0, refused: 'Refused: 2 record(s) in Invoices refer to R2' }, 'Rosefinch delete refused');
const RF_d3 = RF.clone().run("DELETE FROM Dealers WHERE DealerCode = 'R3'");
pin(RF_d3, { affected: 1, refused: null }, 'Rosefinch delete R3');
Q('l5_design_debtors', long({
  t: [4, 5], d: 4, c: 'analysis', marks: 5,
  stem: `Rosefinch Fertilisers Ltd, an imagined company in Betul, sells on credit to dealers. It keeps a Dealers table and an Invoices table:\n\n${RF.md('Dealers')}\n\n${RF.md('Invoices')}\n\n(a) Write the design of each table (field, data type, key). (2)\n\n(b) Name the relationship between the two tables and explain how it is created. (1)\n\n(c) What will the DBMS do, and why, when a clerk (i) saves invoice 904 dated 20 June 2026 for dealer R9 for ₹50,000, (ii) deletes dealer R2, (iii) deletes dealer R3? (2)`,
  model: `**(a)**\n\n${designMd(RF, 'Dealers')}\n\n${designMd(RF, 'Invoices')}\n\n**(b)** One-to-many: one dealer has many invoices. It is created by placing DealerCode, the primary key of Dealers, in Invoices as a foreign key (R2 appears on invoices 901 and 903).\n\n**(c)**\n- (i) **${RF_v1}.** No dealer R9 exists, so the sale cannot be charged to anyone; referential integrity protects the debtors ledger.\n- (ii) **${RF_d.refused}.** Deleting R2 would leave invoices 901 and 903 pointing to no dealer, so the DBMS refuses.\n- (iii) **Deleted (${RF_d3.affected} record).** R3 has no invoices, so nothing refers to it.`,
  sol: 'Design with types and keys, link by foreign key, then apply referential integrity both when adding a child row and when deleting a parent row.',
  scheme: [['(a) Both designs with types and keys', 2], ['(b) One-to-many through DealerCode as foreign key', 1], ['(c) Three outcomes with reasons', 2]],
}));

// ================================================================ t02 SQL basics
Q('m_where_purpose', mcq({
  t: 2, d: 1, c: 'recall',
  stem: `Munia Electricals Ltd, an imagined company, runs ${C('SELECT BillNo, Amount FROM Bills WHERE Amount > 5000;')} on its purchase records. In this statement the WHERE clause`,
  opts: ['picks out only the records whose Amount is more than 5000', 'sorts the records by Amount', 'adds up the Amount column', 'changes the Amount of every record above 5000'],
  sol: 'SELECT names the fields to show, FROM names the table, and WHERE gives the condition a record must meet to be shown. It never changes the data.',
}));

const AV = mk(['Dispatches', [['DNo', 'number'], ['Party', 'text'], ['Bags', 'number'], ['Amount', 'currency']], { pk: 'DNo' }, [[71, 'P11', 60, 25200], [72, 'P14', 35, 14700], [73, 'P12', 50, 21000], [74, 'P11', 20, 8400], [75, 'P13', 80, 33600], [76, 'P14', 45, 18900]]]);
const AV_q = 'SELECT DNo FROM Dispatches WHERE Bags >= 50;';
const AV_r = pin(col0(AV, AV_q), [71, 73, 75], 'Avocet >=');
const AV_x = ['Bags > 50', 'Bags < 50', 'Bags <= 50'].map((w) => col0(AV, `SELECT DNo FROM Dispatches WHERE ${w}`));
pin(AV_x, [[71, 75], [72, 74, 76], [72, 73, 74, 76]], 'Avocet distractors');
Q('m_select_rows', mcq({
  t: 2, d: 2, c: 'application',
  stem: `Avocet Cement Depot Ltd, an imagined dealer, keeps this Dispatches table. Which dispatch numbers does ${C(AV_q)} return?\n\n${AV.md('Dispatches')}`,
  opts: distinct([AV_r, ...AV_x].map((x) => `Dispatches ${list(x)}`), 'Avocet'),
  sol: `The condition "greater than or equal to 50" includes dispatch 73 with exactly 50 bags, so the rows are ${list(AV_r)}. Using "greater than" alone would wrongly drop 73.`,
}));

const GW = mk(['Payments', [['VNo', 'number'], ['Payee', 'text'], ['Mode', 'text'], ['Amount', 'currency']], { pk: 'VNo' }, [[301, 'Fuel depot', 'Cheque', 24000], [302, 'Office rent', 'Cheque', 18000], [303, 'Tyre dealer', 'Cash', 26000], [304, 'Insurer', 'Cheque', 31000], [305, 'Stationer', 'Cash', 4000]]]);
const GW_q = "SELECT VNo FROM Payments WHERE Mode = 'Cheque' AND Amount > 20000;";
const GW_r = pin(col0(GW, GW_q), [301, 304], 'Godwit AND');
const GW_x = ["Mode = 'Cheque' OR Amount > 20000", "Mode = 'Cheque'", 'Amount > 20000'].map((w) => col0(GW, `SELECT VNo FROM Payments WHERE ${w}`));
pin(GW_x, [[301, 302, 303, 304], [301, 302, 304], [301, 303, 304]], 'Godwit distractors');
Q('m_and', mcq({
  t: 2, d: 2, c: 'application',
  stem: `Godwit Courier Ltd, an imagined company, keeps this Payments table. Which vouchers does ${C(GW_q)} list?\n\n${GW.md('Payments')}`,
  opts: distinct([GW_r, ...GW_x].map((x) => `Vouchers ${list(x)}`), 'Godwit'),
  sol: `With AND a row must meet both conditions: paid by cheque and more than ₹20,000. Voucher 302 is a cheque for only ₹18,000 and 303 is over ₹20,000 but in cash, so only ${list(GW_r)} qualify.`,
}));

const ST = mk(['Stock', [['ItemCode', 'text'], ['Category', 'text'], ['Pairs', 'number']], { pk: 'ItemCode' }, [['K1', 'Sandal', 150], ['K2', 'Slipper', 80], ['K3', 'Shoe', 60], ['K4', 'Sandal', 40], ['K5', 'Slipper', 120], ['K6', 'Shoe', 90], ['K7', 'Sandal', 95]]]);
const ST_q = "SELECT ItemCode FROM Stock WHERE Category = 'Sandal' OR Category = 'Slipper' AND Pairs < 100;";
const ST_r = pin(col0(ST, ST_q), ['K1', 'K2', 'K4', 'K7'], 'Stilt precedence');
const ST_x = ["(Category = 'Sandal' OR Category = 'Slipper') AND Pairs < 100", "Category = 'Sandal' OR Category = 'Slipper'", 'Pairs < 100'].map((w) => col0(ST, `SELECT ItemCode FROM Stock WHERE ${w}`));
pin(ST_x, [['K2', 'K4', 'K7'], ['K1', 'K2', 'K4', 'K5', 'K7'], ['K2', 'K3', 'K4', 'K6', 'K7']], 'Stilt distractors');
Q('m_precedence', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: `Stilt Footwear Ltd, an imagined company, wants to reorder sandals and slippers that are running low and runs the query below on its Stock table. Which items does it return?\n\n${C(ST_q)}\n\n${ST.md('Stock')}`,
  opts: distinct([ST_r, ...ST_x].map((x) => `${list(x)} (${x.length} rows)`), 'Stilt'),
  sol: `AND is applied before OR, so the query means: every sandal, OR a slipper with fewer than 100 pairs. That gives ${list(ST_r)}, including K1 with 150 pairs. Brackets around the OR would give the intended ${list(ST_x[0])}.`,
}));

const PL = mk(['Items', [['ItemCode', 'text'], ['ItemName', 'text'], ['Category', 'text'], ['Rate', 'currency']], { pk: 'ItemCode' }, [['P1', 'Tur dal', 'Pulses', 140], ['P2', 'Moong dal', 'Pulses', 120], ['G1', 'Wheat', 'Grain', 32], ['P3', 'Masoor dal', 'Pulses', 110], ['G2', 'Jowar', 'Grain', 45]]]);
const PL_q = "UPDATE Items SET Rate = Rate + 6 WHERE Category = 'Pulses' AND Rate < 130;";
const PL_after = PL.clone();
const PL_n = pin(PL_after.run(PL_q).affected, 2, 'Plover affected');
const rateOf = (db, code) => db.table('Items').rows.find((r) => r.ItemCode === code).Rate;
const PL_a = [rateOf(PL_after, 'P1'), rateOf(PL_after, 'P3')];
pin(PL_a, [140, 116], 'Plover after');
const PL_noAnd = PL.clone();
PL_noAnd.run("UPDATE Items SET Rate = Rate + 6 WHERE Category = 'Pulses'");
const PL_b = [rateOf(PL_noAnd, 'P1'), rateOf(PL_noAnd, 'P3')];
Q('m_update_effect', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Plover Pulses Ltd, an imagined wholesaler, runs ${C(PL_q)} on the Items table below. After the update, what are the rates of Tur dal and Masoor dal?\n\n${PL.md('Items')}`,
  opts: distinct([PL_a, PL_b, [140, 110], [PL_b[0], 110]].map(([a, b]) => `Tur dal ₹${a}, Masoor dal ₹${b}`), 'Plover'),
  sol: `Only pulses priced below ₹130 change: Moong dal and Masoor dal (${PL_n} rows). Tur dal at ₹140 fails the second condition and stays at ₹${PL_a[0]}; Masoor dal becomes 110 + 6 = ₹${PL_a[1]}.`,
}));

Q('m_delete_all', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `A clerk of Pratincole Pens Ltd, an imagined company, meant to remove one cancelled voucher but ran ${C('DELETE FROM Vouchers;')} without a WHERE clause. What happens?`,
  opts: ['Every record in the Vouchers table is deleted, though the table and its fields remain', 'Only the first record of the table is deleted', 'The Vouchers table and its structure are removed from the database', 'Nothing, because DELETE cannot run without a WHERE clause'],
  sol: 'WHERE limits a DELETE to the rows that meet its condition; with no condition every row qualifies. DELETE removes records, not the table design. Always run the same WHERE with SELECT first to see what will go.',
}));

const SG = mk(['Consignments', [['CNo', 'number'], ['State', 'text'], ['Tonnes', 'number']], { pk: 'CNo' }, [[1, 'Bihar', 12], [2, 'Odisha', 30], [3, 'Bihar', 45], [4, 'Jharkhand', 8], [5, 'Odisha', 22], [6, 'Assam', 40]]]);
const SG_q = "SELECT CNo FROM Consignments WHERE State = 'Odisha' OR Tonnes > 35;";
const SG_r = pin(col0(SG, SG_q), [2, 3, 5, 6], 'Sandgrouse OR');
Q('n_rows_or', num({
  t: 2, d: 2, c: 'application', marks: 1, value: SG_r.length, unit: 'rows',
  stem: `Sandgrouse Salt Co, an imagined firm, runs ${C(SG_q)} on its Consignments table. How many rows does the query return?\n\n${SG.md('Consignments')}`,
  sol: `OR keeps a row that meets either condition: consignments 2 and 5 go to Odisha, and 3 and 6 are over 35 tonnes. Rows returned = ${SG_r.length} (${list(SG_r)}).`,
}));

const IB = mk(['Dealers', [['DealerCode', 'text'], ['Zone', 'text'], ['Discount', 'number'], ['Turnover', 'currency']], { pk: 'DealerCode' }, [['D1', 'East', 4, 620000], ['D2', 'West', 5, 710000], ['D3', 'East', 3, 480000], ['D4', 'East', 4, 500000], ['D5', 'North', 2, 530000], ['D6', 'East', 5, 900000]]]);
const IB_q = "UPDATE Dealers SET Discount = Discount + 1 WHERE Zone = 'East' AND Turnover >= 500000;";
const IB_c = IB.clone();
const IB_n = pin(IB_c.run(IB_q).affected, 3, 'Ibis affected');
Q('n_update_rows', num({
  t: 2, d: 3, c: 'application', marks: 1, value: IB_n, unit: 'rows',
  stem: `Ibis Irrigation Pipes Ltd, an imagined company, rewards its large eastern dealers with ${C(IB_q)}. How many dealer records does the statement change?\n\n${IB.md('Dealers')}`,
  sol: `Both conditions must hold: East zone and turnover of at least ₹5,00,000. D1, D4 (exactly ₹5,00,000) and D6 qualify; D3 is below the limit and D2, D5 are in other zones. Rows changed = ${IB_n}.`,
}));

Q('tf_select_change', tf({
  t: 2, d: 1, c: 'understanding', ans: false,
  stem: `True or false? Running ${C('SELECT * FROM Ledger WHERE Amount > 10000;')} on the books of Egret Engineering Works, an imagined firm, deletes the ledger records of ₹10,000 or less.`,
  sol: 'SELECT only reads and displays the matching records; the other records stay in the table untouched. Only UPDATE and DELETE change stored data.',
}));

const SA = mk(['Shipments', [['ShipNo', 'number'], ['Port', 'text'], ['Amount', 'currency']], { pk: 'ShipNo' }, [[1, 'Dhamra', 20000], [2, 'Paradip', 64000]]]);
pin(col0(SA, "SELECT ShipNo FROM Shipments WHERE Port = 'Dhamra' OR Amount > 50000"), [1, 2], 'Sandpiper OR');
Q('tf_or', tf({
  t: 2, d: 2, c: 'understanding', ans: true,
  stem: `True or false? For Sandpiper Marine Exports Ltd, an imagined company, the query ${C("SELECT ShipNo FROM Shipments WHERE Port = 'Dhamra' OR Amount > 50000;")} returns a shipment from Dhamra worth ₹20,000.`,
  sol: 'With OR, a row needs to meet only one of the conditions; the shipment is from Dhamra, so it is returned even though its amount is below ₹50,000.',
}));

Q('fb_update', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'To raise the credit limit already stored for one dealer in the Dealers table of Skimmer Boats Ltd, an imagined company, the accountant uses the SQL command ___ with SET and a WHERE clause.',
  acc: [['UPDATE']],
  sol: 'UPDATE changes values in existing records; SET gives the new value and WHERE picks the dealer.',
}));

const TN = mk(
  ['Suppliers', [['SupCode', 'text'], ['SupName', 'text']], { pk: 'SupCode' }, [['S1', 'Jute Bags House'], ['S2', 'Gunny Point'], ['S3', 'Twine Traders'], ['S4', 'Hessian Hub']]],
  ['Bills', [['BillNo', 'number'], ['SupCode', 'text'], ['Amount', 'currency']], { pk: 'BillNo', fks: { SupCode: 'Suppliers' } }, [[71, 'S4', 23000], [72, 'S1', 12000]]],
);
const TN_r = pin(TN.clone().run("DELETE FROM Suppliers WHERE SupCode = 'S4'"), { affected: 0, refused: 'Refused: 1 record(s) in Bills refer to S4' }, 'Tern delete');
Q('ar_delete_parent', ar({
  t: [2, 4], d: 3, c: 'analysis', key: 'a',
  a: `The DBMS of Tern Trading Co, an imagined firm, refuses ${C("DELETE FROM Suppliers WHERE SupCode = 'S4';")} although supplier S4 exists.`,
  r: 'Bill 71 in its Bills table still carries S4 in SupCode, a foreign key to Suppliers.',
  sol: `Both are true and R explains A. Deleting S4 would leave bill 71 pointing to no supplier, so the engine answers "${TN_r.refused}".`,
}));

Q('ar_and_or', ar({
  t: 2, d: 3, c: 'understanding', key: 'c',
  a: 'Adding a second condition with AND to a query on the Sales table of Shearwater Solar Ltd, an imagined company, can never return more rows than the first condition alone.',
  r: 'AND returns a row when either of its two conditions is true.',
  sol: 'A is true: with AND a row must pass both tests, so the result can only shrink or stay the same. R is false: it describes OR.',
}));

const PE = mk(['Debtors', [['Code', 'text'], ['Name', 'text'], ['City', 'text'], ['Balance', 'currency']], { pk: 'Code' }, [['P1', 'Sarraf Stationers', 'Bhander', 14500], ['P2', 'Granth Book Depot', 'Datia', 8200], ['P3', 'Gyan Kosh', 'Datia', 16300], ['P4', 'Akshar Traders', 'Seondha', 21000], ['P5', 'Lekhni Mart', 'Datia', 11800], ['P6', 'Kalam Ghar', 'Bhander', 6400]]]);
const PE_q = "SELECT Name, Balance FROM Debtors WHERE City = 'Datia' AND Balance > 10000;";
pin(PE.q(PE_q).rows, [['Gyan Kosh', 16300], ['Lekhni Mart', 11800]], 'Pelican select');
Q('s2_write_select', short({
  t: 2, d: 2, c: 'application', marks: 2,
  stem: `Pelican Paper Products, an imagined firm, wants the names and balances of its debtors in Datia who owe more than ₹10,000. Write an SQL query for this on the table below, and show its result.\n\n${PE.md('Debtors')}`,
  model: `${C(PE_q)}\n\nResult:\n\n${out(PE, PE_q)}\n\nGranth Book Depot is in Datia but owes only ₹8,200, so it is left out.`,
  sol: 'Name only the two fields asked for; both conditions must hold, so join them with AND.',
  scheme: [['SELECT Name, Balance FROM Debtors', 1], ['WHERE City = \'Datia\' AND Balance > 10000, with the correct result', 1]],
}));

const DD = mk(['Purchases', [['BillNo', 'number'], ['Supplier', 'text'], ['Item', 'text'], ['Amount', 'currency']], { pk: 'BillNo' }, [[51, 'Neelambar Rang Udyog', 'Indigo', 18000], [52, 'Peetambar Colours', 'Turmeric', 9000], [53, 'Neelambar Rang Udyog', 'Indigo', 12500], [54, 'Sindoori Dyes', 'Madder', 15600], [55, 'Aasmani Traders', 'Indigo', 21400]]]);
const DD_q = "SELECT BillNo, Amount FROM Purchases WHERE Item = 'Indigo' AND Amount >= 15000;";
pin(DD.q(DD_q).rows, [[51, 18000], [55, 21400]], 'Darter');
Q('s2_out_and', short({
  t: 2, d: 2, c: 'application', marks: 2,
  stem: `Darter Dyes Ltd, an imagined company, buys natural dyes. Write the output of ${C(DD_q)} on its Purchases table, and explain why bill 54 is not in it.\n\n${DD.md('Purchases')}`,
  model: `${out(DD, DD_q)}\n\nBill 53 is indigo but below ₹15,000. Bill 54 is over ₹15,000 but for madder, not indigo; with AND it must meet both conditions, so it is left out.`,
  sol: 'Test every row against both conditions; only the two fields named after SELECT are shown.',
  scheme: [['Correct rows 51 and 55 with only BillNo and Amount', 1], ['Reason for leaving out bill 54', 1]],
}));

const SK = mk(['Products', [['Code', 'text'], ['Name', 'text'], ['Price', 'currency'], ['Active', 'yesno']], { pk: 'Code' }, [['G1', 'Gloves box', 420, 'Yes'], ['M2', 'Mask pack', 180, 'Yes'], ['S3', 'Suture kit', 950, 'No'], ['B4', 'Bandage roll', 60, 'Yes'], ['T5', 'Thermometer', 240, 'No']]]);
const SK_u = "UPDATE Products SET Price = 450 WHERE Code = 'G1';";
const SK_d = "DELETE FROM Products WHERE Active = 'No';";
const SK_c = SK.clone();
const SK_un = pin(SK_c.run(SK_u).affected, 1, 'Stork update');
const SK_dn = pin(SK_c.run(SK_d).affected, 2, 'Stork delete');
Q('s2_update_delete', short({
  t: 2, d: 2, c: 'application', marks: 2,
  stem: `Stork Surgicals Ltd, an imagined distributor, keeps the Products table below. Write SQL statements to (i) change the price of the gloves box to ₹450 and (ii) remove every product that is no longer active. State how many records each statement affects.\n\n${SK.md('Products')}`,
  model: `- (i) ${C(SK_u)} — changes **${SK_un}** record.\n- (ii) ${C(SK_d)} — removes **${SK_dn}** records (S3 and T5).\n\nThe table is left with:\n\n${SK_c.md('Products')}`,
  sol: 'Pick the record by its primary key for the price change; pick the inactive products with the Yes/No field for the deletion.',
  scheme: [[`(i) UPDATE with SET and WHERE on Code; ${SK_un} record`, 1], [`(ii) DELETE with WHERE Active = 'No'; ${SK_dn} records`, 1]],
}));

const NJ = mk(['Customers', [['CustNo', 'number'], ['Name', 'text'], ['Town', 'text'], ['Due', 'currency']], { pk: 'CustNo' }, [[1, 'Chowk Electricals', 'Maihar', 12000], [2, 'Mandir Lights', 'Amarpatan', 0], [3, 'Dhruvtara Stores', 'Maihar', 8600], [4, 'Ujala Traders', 'Amarpatan', 4300], [5, 'Bijli Kendra', 'Maihar', 0], [6, 'Prakashdeep Ghar', 'Amarpatan', 0], [7, 'Lalten Lamps', 'Maihar', 5200]]]);
const NJ_s = "SELECT Name, Due FROM Customers WHERE Town = 'Maihar' AND Due > 5000;";
const NJ_u = 'UPDATE Customers SET Due = 0 WHERE CustNo = 7;';
const NJ_d = "DELETE FROM Customers WHERE Town = 'Amarpatan' AND Due = 0;";
const NJ_c = NJ.clone();
const NJ_sr = pin(NJ_c.q(NJ_s).rows, [['Chowk Electricals', 12000], ['Dhruvtara Stores', 8600], ['Lalten Lamps', 5200]], 'Nightjar select');
const NJ_un = pin(NJ_c.run(NJ_u).affected, 1, 'Nightjar update');
const NJ_dn = pin(NJ_c.run(NJ_d).affected, 2, 'Nightjar delete');
Q('s3_write3', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `Nightjar Lamps Ltd, an imagined company, keeps the Customers table below. Write SQL statements, in this order, to: (i) list the names and dues of customers in Maihar who owe more than ₹5,000; (ii) record that customer 7 has paid in full; (iii) remove the customers of Amarpatan who owe nothing.\n\n${NJ.md('Customers')}`,
  model: `- (i) ${C(NJ_s)}\n\n${resultMd({ columns: ['Name', 'Due'], rows: NJ_sr })}\n\n- (ii) ${C(NJ_u)} — ${NJ_un} record changed.\n- (iii) ${C(NJ_d)} — ${NJ_dn} records removed (customers 2 and 6; customer 4 still owes ₹4,300).`,
  sol: 'Each task maps to one statement: listing is SELECT, recording a payment is UPDATE, removing is DELETE; each needs the right WHERE.',
  scheme: [['(i) SELECT with Town and Due conditions joined by AND', 1], ['(ii) UPDATE … SET Due = 0 WHERE CustNo = 7', 1], ['(iii) DELETE with Town = \'Amarpatan\' AND Due = 0', 1]],
}));

const OW = mk(['Orders', [['OrderNo', 'number'], ['Shop', 'text'], ['Frames', 'number'], ['Value', 'currency']], { pk: 'OrderNo' }, [[21, 'Drishti Opticians', 30, 45000], [22, 'Netra Eye Care', 12, 16800], [23, 'Chashma Ghar', 45, 63000], [24, 'Drishti Opticians', 8, 11200], [25, 'Roshni Optics', 20, 28000], [26, 'Netra Eye Care', 50, 70000]]]);
const OW_q = ["SELECT OrderNo FROM Orders WHERE Shop = 'Netra Eye Care' OR Frames > 40;", 'UPDATE Orders SET Value = Value - 1000 WHERE Frames < 15;', 'DELETE FROM Orders WHERE Value < 12000;'];
const OW_c = OW.clone();
const OW_1 = pin(col0(OW_c, OW_q[0]), [22, 23, 26], 'Owlet 1');
const OW_2 = pin(OW_c.run(OW_q[1]).affected, 2, 'Owlet 2');
const OW_vals = pin(OW_c.table('Orders').rows.filter((r) => [22, 24].includes(r.OrderNo)).map((r) => r.Value), [15800, 10200], 'Owlet values');
const OW_3 = pin(OW_c.run(OW_q[2]).affected, 1, 'Owlet 3');
check(OW.clone().run(OW_q[2]).affected === 1, 'Owlet delete before the update also 1 row (11200)');
Q('s3_out3', short({
  t: 2, d: 4, c: 'analysis', marks: 3,
  stem: `Owlet Optics Ltd, an imagined frame maker, runs these three statements, one after the other, on its Orders table. Give the result of each.\n\n${OW_q.map((q, i) => `(${['i', 'ii', 'iii'][i]}) ${C(q)}`).join('\n\n')}\n\n${OW.md('Orders')}`,
  model: `- (i) Orders ${list(OW_1)}: 22 and 26 are Netra Eye Care’s, and 23 has more than 40 frames.\n- (ii) **${OW_2} records** change: orders 22 and 24 have fewer than 15 frames; their values become ₹${fig(OW_vals[0])} and ₹${fig(OW_vals[1])}.\n- (iii) **${OW_3} record** is deleted: after (ii) only order 24 (₹${fig(OW_vals[1])}) is below ₹12,000; order 22 is now ₹${fig(OW_vals[0])}.`,
  sol: 'Run the statements in order: the DELETE in (iii) works on the values left by the UPDATE in (ii).',
  scheme: [['(i) Orders 22, 23 and 26', 1], ['(ii) Two records, new values', 1], ['(iii) One record (order 24) deleted', 1]],
}));

const PP = mk(['Stock', [['Item', 'text'], ['Kind', 'text'], ['Pieces', 'number']], { pk: 'Item' }, [['V1', 'Vase', 30], ['B1', 'Bowl', 70], ['P1', 'Plate', 90], ['V2', 'Vase', 60], ['B2', 'Bowl', 20], ['J1', 'Jar', 55]]]);
const PP_a = "SELECT Item FROM Stock WHERE Kind = 'Vase' OR Kind = 'Bowl' AND Pieces > 50;";
const PP_b = "SELECT Item FROM Stock WHERE (Kind = 'Vase' OR Kind = 'Bowl') AND Pieces > 50;";
const PP_ra = pin(col0(PP, PP_a), ['V1', 'B1', 'V2'], 'Partridge A');
const PP_rb = pin(col0(PP, PP_b), ['B1', 'V2'], 'Partridge B');
Q('s3_precedence', short({
  t: 2, d: 4, c: 'analysis', marks: 3,
  stem: `Partridge Pottery Ltd, an imagined company, wants vases and bowls of which it holds more than 50 pieces. Its clerk writes query A; the accountant writes query B.\n\nA: ${C(PP_a)}\n\nB: ${C(PP_b)}\n\n${PP.md('Stock')}\n\nGive the output of each query and explain which one meets the requirement.`,
  model: `- **Query A** returns ${list(PP_ra)}. AND is applied before OR, so A means "every vase, OR a bowl with more than 50 pieces"; V1 with only 30 pieces gets in.\n- **Query B** returns ${list(PP_rb)}. The brackets make the OR apply first: the item must be a vase or a bowl, AND have more than 50 pieces.\n- **Query B** meets the requirement. When AND and OR are mixed, use brackets to say which goes first.`,
  sol: 'Apply AND before OR in A; apply the bracketed OR first in B.',
  scheme: [['Output of A with the precedence rule', 1], ['Output of B', 1], ['B meets the requirement, with reason', 1]],
}));

const QA = mk(['Shipments', [['ShipNo', 'number'], ['Country', 'text'], ['Product', 'text'], ['Tonnes', 'number'], ['Value', 'currency'], ['Paid', 'yesno']], { pk: 'ShipNo' }, [[1, 'Oman', 'Rice', 40, 1800000, 'Yes'], [2, 'Kenya', 'Onion', 25, 450000, 'No'], [3, 'Oman', 'Onion', 30, 540000, 'Yes'], [4, 'Vietnam', 'Rice', 55, 2420000, 'No'], [5, 'Kenya', 'Rice', 20, 900000, 'Yes'], [6, 'Nepal', 'Sugar', 60, 2100000, 'No'], [7, 'Kenya', 'Sugar', 15, 480000, 'Yes'], [8, 'Oman', 'Rice', 35, 1540000, 'No']]]);
const QA_a1 = "SELECT ShipNo, Value FROM Shipments WHERE Product = 'Rice' AND Country = 'Oman';";
const QA_a2 = "UPDATE Shipments SET Paid = 'Yes' WHERE ShipNo = 4;";
const QA_b = ["SELECT ShipNo, Country FROM Shipments WHERE Product = 'Sugar' OR Tonnes > 50;", "DELETE FROM Shipments WHERE Paid = 'Yes' AND Value < 600000;", "SELECT ShipNo FROM Shipments WHERE Country = 'Kenya';"];
const QA_c = QA.clone();
const QA_r1 = pin(QA_c.q(QA_a1).rows, [[1, 1800000], [8, 1540000]], 'Quail a1');
const QA_n2 = pin(QA_c.run(QA_a2).affected, 1, 'Quail a2');
const QA_b1 = pin(QA_c.q(QA_b[0]).rows, [[4, 'Vietnam'], [6, 'Nepal'], [7, 'Kenya']], 'Quail b1');
const QA_b2 = pin(QA_c.run(QA_b[1]).affected, 2, 'Quail b2');
const QA_b3 = pin(col0(QA_c, QA_b[2]), [2, 5], 'Quail b3');
Q('l5_sql', long({
  t: 2, d: 4, c: 'application', marks: 5,
  stem: `Quail Agro Exports Ltd, an imagined exporter, keeps the Shipments table below.\n\n${QA.md('Shipments')}\n\n(a) Write SQL statements to: (i) list the shipment numbers and values of rice shipments to Oman; (ii) record that shipment 4 has now been paid for. (2)\n\n(b) After (a)(ii) has been run, give the result of each of the following, run in this order: (3)\n\n${QA_b.map((q, i) => `(${['i', 'ii', 'iii'][i]}) ${C(q)}`).join('\n\n')}`,
  model: `**(a)**\n- (i) ${C(QA_a1)} — returns:\n\n${resultMd({ columns: ['ShipNo', 'Value'], rows: QA_r1 })}\n\n- (ii) ${C(QA_a2)} — ${QA_n2} record changed.\n\n**(b)**\n- (i) ${resultMd({ columns: ['ShipNo', 'Country'], rows: QA_b1 })}\n\n  Shipment 7 is sugar; 4 and 6 are over 50 tonnes (6 is also sugar).\n- (ii) **${QA_b2} records** deleted: shipments 3 (₹5,40,000) and 7 (₹4,80,000) are paid and below ₹6,00,000. Shipment 2 is below the limit but unpaid.\n- (iii) Shipments **${list(QA_b3)}**: shipment 7 to Kenya was deleted in (ii).`,
  sol: 'Write each statement from its task; then run (b) in order, carrying the changes of (a)(ii) and (b)(ii) forward.',
  scheme: [['(a)(i) SELECT with Product and Country joined by AND', 1], ['(a)(ii) UPDATE … SET Paid = \'Yes\' WHERE ShipNo = 4', 1], ['(b)(i) Shipments 4, 6 and 7', 1], ['(b)(ii) Two records deleted', 1], ['(b)(iii) Shipments 2 and 5', 1]],
}));

// ================================================================ t03 Aggregate functions
const PF = mk(['Sales', [['BillNo', 'number'], ['Region', 'text'], ['Amount', 'currency']], { pk: 'BillNo' }, [[11, 'North', 26000], [12, 'South', 31000], [13, 'East', 18000], [14, 'South', 24500], [15, 'North', 12000], [16, 'South', 9500]]]);
const PF_q = "SELECT SUM(Amount) FROM Sales WHERE Region = 'South';";
const PF_v = pin(scalar(PF.q(PF_q)), 65000, 'Peafowl sum');
const PF_x = ['SELECT SUM(Amount) FROM Sales', "SELECT SUM(Amount) FROM Sales WHERE Region = 'North'", "SELECT MAX(Amount) FROM Sales WHERE Region = 'South'"].map((q) => scalar(PF.q(q)));
pin(PF_x, [121000, 38000, 31000], 'Peafowl distractors');
Q('m_sum', mcq({
  t: 3, d: 2, c: 'application',
  stem: `Peafowl Perfumes Ltd, an imagined company, runs ${C(PF_q)} on its Sales table. What value does it return?\n\n${PF.md('Sales')}`,
  opts: distinct([PF_v, ...PF_x].map(rs), 'Peafowl'),
  sol: `SUM adds the Amount of only the rows that pass WHERE: bills 12, 14 and 16, 31000 + 24500 + 9500 = ${fig(PF_v)}.`,
}));

const JF = mk(['Contracts', [['FarmCode', 'text'], ['Village', 'text'], ['Advance', 'currency']], { pk: 'FarmCode' }, [['J1', 'Sohagi', 20000], ['J2', 'Bari', null], ['J3', 'Sohagi', 15000], ['J4', 'Kheda', 25000], ['J5', 'Bari', null], ['J6', 'Kheda', 10000], ['J7', 'Sohagi', 30000]]]);
const JF_q = 'SELECT COUNT(*), COUNT(Advance) FROM Contracts;';
const JF_r = pin(JF.q(JF_q).rows[0], [7, 5], 'Junglefowl counts');
Q('m_count_null', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: `Junglefowl Poultry Ltd, an imagined company, records the advance paid to each contract farm; no advance has been paid yet to two farms (NULL). What does ${C(JF_q)} return?\n\n${JF.md('Contracts')}`,
  opts: distinct([JF_r, [7, 7], [5, 7], [5, 5]].map(([a, b]) => `${a} and ${b}`), 'Junglefowl'),
  sol: `COUNT(*) counts every record (${JF_r[0]}); COUNT(Advance) counts only the records in which Advance has a value, skipping the two NULLs (${JF_r[1]}).`,
}));

const PH = mk(['Monthly', [['Month', 'text'], ['Jars', 'number'], ['Amount', 'currency']], { pk: 'Month' }, [['April', 1200, 84000], ['May', 1500, 105000], ['June', 900, 63000], ['July', 1100, 77000], ['August', 1300, 91000]]]);
const PH_q = 'SELECT AVG(Amount) FROM Monthly WHERE Jars >= 1100;';
const PH_v = pin(scalar(PH.q(PH_q)), 89250, 'Pheasant avg');
const PH_all = pin(scalar(PH.q('SELECT AVG(Amount) FROM Monthly')), 84000, 'Pheasant avg all');
const PH_s = pin(scalar(PH.q('SELECT SUM(Amount) FROM Monthly WHERE Jars >= 1100')), 357000, 'Pheasant sum');
Q('m_avg', mcq({
  t: 3, d: 3, c: 'application',
  stem: `Pheasant Pickles Ltd, an imagined company, runs ${C(PH_q)} on its monthly sales table. What value does it return?\n\n${PH.md('Monthly')}`,
  opts: distinct([PH_v, PH_all, PH_s, PH_s / 5].map(rs), 'Pheasant'),
  sol: `Four months have at least 1,100 jars (April, May, July, August): total ${fig(PH_s)} ÷ 4 = ${fig(PH_v)}. Dividing by all five months, or averaging every month, is wrong.`,
}));

Q('m_maxmin', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'The credit manager of Cuckoo Clocks Ltd, an imagined company, wants the single highest outstanding balance in its Debtors table. Which aggregate function should the query use on the Balance field?',
  opts: ['MAX', 'SUM', 'COUNT', 'AVG'],
  sol: 'MAX returns the largest value in a field; MIN the smallest; SUM the total; COUNT the number of records; AVG the mean.',
}));

const IO = mk(['Orders', [['OrderNo', 'number'], ['Flavour', 'text'], ['Litres', 'number'], ['Amount', 'currency']], { pk: 'OrderNo' }, [[1, 'Mango', 25, 5000], [2, 'Pista', 30, 7500], [3, 'Mango', 15, 3000], [4, 'Mango', 40, 8000], [5, 'Vanilla', 20, 3200], [6, 'Mango', 20, 4000]]]);
const IO_q = "SELECT SUM(Amount) FROM Orders WHERE Flavour = 'Mango' AND Litres >= 20;";
const IO_v = pin(scalar(IO.q(IO_q)), 17000, 'Iora sum');
Q('n_sum', num({
  t: 3, d: 2, c: 'application', marks: 1, value: IO_v, unit: '₹',
  stem: `Iora Ice Creams Ltd, an imagined company, runs ${C(IO_q)} on its bulk Orders table. What value (in ₹) does the query return?\n\n${IO.md('Orders')}`,
  sol: `Mango orders of at least 20 litres are 1, 4 and 6 (order 3 has only 15 litres): 5000 + 8000 + 4000 = ${IO_v}, that is ₹${fig(IO_v)}.`,
}));

const MK = mk(['Lots', [['LotNo', 'number'], ['Variety', 'text'], ['Boxes', 'number'], ['Amount', 'currency']], { pk: 'LotNo' }, [[1, 'Langra', 120, 96000], [2, 'Dasheri', 80, 56000], [3, 'Langra', 90, 72000], [4, 'Chausa', 60, 54000], [5, 'Langra', 150, 117000]]]);
const MK_q = "SELECT AVG(Amount) FROM Lots WHERE Variety = 'Langra';";
const MK_v = pin(scalar(MK.q(MK_q)), 95000, 'Malkoha avg');
Q('n_avg', num({
  t: 3, d: 3, c: 'application', marks: 1, value: MK_v, unit: '₹',
  stem: `Malkoha Mangoes Ltd, an imagined trader, wants the average sale value of a Langra lot. What value (in ₹) does ${C(MK_q)} return on its Lots table?\n\n${MK.md('Lots')}`,
  sol: `Langra lots 1, 3 and 5: (96000 + 72000 + 117000) ÷ 3 = 285000 ÷ 3 = ${MK_v}, that is ₹${fig(MK_v)}.`,
}));

Q('mt_aggs', match({
  t: 3, d: 1, c: 'recall', marks: 2,
  stem: 'Swiftlet Couriers Ltd, an imagined company, summarises its Deliveries table with aggregate functions on the Charge field. Match each function in column A with what it returns in column B.',
  pairs: [
    ['SUM(Charge)', 'The total of all the charges'],
    ['AVG(Charge)', 'The arithmetic mean of the charges'],
    ['COUNT(*)', 'The number of delivery records'],
    ['MIN(Charge)', 'The lowest single charge'],
  ],
  sol: 'Each aggregate function turns many rows into one value; MAX, the fifth, returns the highest charge.',
}));

const FC = mk(['Advances', [['MemberNo', 'number'], ['Advance', 'currency']], { pk: 'MemberNo' }, [[1, 3000], [2, 5000], [3, 4000], [4, null]]]);
const FC_v = pin(scalar(FC.q('SELECT AVG(Advance) FROM Advances')), 4000, 'Flycatcher avg');
Q('tf_avg_null', tf({
  t: 3, d: 3, c: 'analysis', ans: FC_v === 4000,
  stem: `True or false? In the Advances table of Flycatcher Fitness Ltd, an imagined gym, three members have advances of ₹3,000, ₹5,000 and ₹4,000 and the fourth member's advance is NULL (not entered). ${C('SELECT AVG(Advance) FROM Advances;')} returns ₹4,000.`,
  sol: `Aggregate functions skip NULLs, so AVG divides the total of 12000 by the three values present: 12000 ÷ 3 = ${FC_v}. Dividing by four (₹3,000) would treat the missing advance as zero.`,
}));

const FT = mk(['Sales', [['InvNo', 'number'], ['Mode', 'text'], ['Amount', 'currency']], { pk: 'InvNo' }, [[71, 'Credit', 42000], [72, 'Cash', 18000], [73, 'Credit', 56000], [74, 'Credit', 23000], [75, 'Cash', 61000]]]);
const FT_q = ["SELECT SUM(Amount) FROM Sales WHERE Mode = 'Credit';", 'SELECT MAX(Amount) FROM Sales;'];
const FT_v = FT_q.map((q) => scalar(FT.q(q)));
pin(FT_v, [121000, 61000], 'Forktail');
Q('s2_aggs_write', short({
  t: 3, d: 2, c: 'application', marks: 2,
  stem: `Forktail Furniture Ltd, an imagined company, keeps the Sales table below. Write SQL queries to find (i) the total of its credit sales and (ii) its highest single sale, and give the value each returns.\n\n${FT.md('Sales')}`,
  model: `- (i) ${C(FT_q[0])} — returns **${FT_v[0]}** (₹${fig(FT_v[0])}: 42000 + 56000 + 23000).\n- (ii) ${C(FT_q[1])} — returns **${FT_v[1]}** (₹${fig(FT_v[1])}, invoice 75, a cash sale; no WHERE, because the highest of all sales is asked for).`,
  sol: 'SUM with a WHERE on Mode for (i); MAX over the whole table for (ii).',
  scheme: [[`(i) SUM with WHERE Mode = 'Credit'; ${FT_v[0]}`, 1], [`(ii) MAX(Amount); ${FT_v[1]}`, 1]],
}));

const BC = mk(['Supplies', [['ChallanNo', 'number'], ['Outlet', 'text'], ['Loaves', 'number'], ['Amount', 'currency']], { pk: 'ChallanNo' }, [[1, 'Civil Lines', 200, 6000], [2, 'Sadar', 150, 4500], [3, 'Civil Lines', 260, 7800], [4, 'Station', 90, 2700], [5, 'Sadar', 300, 9000]]]);
const BC_q = ["SELECT COUNT(*) FROM Supplies WHERE Outlet = 'Sadar';", 'SELECT AVG(Loaves) FROM Supplies;', 'SELECT MIN(Amount) FROM Supplies WHERE Loaves > 100;'];
const BC_v = pin(BC_q.map((q) => scalar(BC.q(q))), [2, 200, 4500], 'Bushchat');
Q('s3_aggs_out', short({
  t: 3, d: 3, c: 'application', marks: 3,
  stem: `Bushchat Bakers Ltd, an imagined bakery, keeps a Supplies table of the bread it sends to its outlets. Give the value returned by each query.\n\n${BC_q.map((q, i) => `(${['i', 'ii', 'iii'][i]}) ${C(q)}`).join('\n\n')}\n\n${BC.md('Supplies')}`,
  model: `- (i) **${BC_v[0]}** — challans 2 and 5 go to Sadar.\n- (ii) **${BC_v[1]}** — (200 + 150 + 260 + 90 + 300) ÷ 5 = 1000 ÷ 5.\n- (iii) **${BC_v[2]}** — challan 4 (90 loaves) is excluded; the lowest amount among the other four is ₹${fig(BC_v[2])} (challan 2).`,
  sol: 'Apply WHERE first, then the function to the rows that remain.',
  scheme: [[`(i) ${BC_v[0]}`, 1], [`(ii) ${BC_v[1]}`, 1], [`(iii) ${BC_v[2]}`, 1]],
}));

const SL = mk(['Debtors', [['Code', 'text'], ['Name', 'text'], ['Region', 'text'], ['Balance', 'currency'], ['LastPaid', 'date']], { pk: 'Code' }, [['ST1', 'Shakti Fabricators', 'West', 145000, '2026-05-10'], ['ST2', 'Ispat Udyog', 'East', 62000, null], ['ST3', 'Saria Mart', 'West', 88000, '2026-06-02'], ['ST4', 'Kavach Gates', 'North', 230000, '2026-04-18'], ['ST5', 'Faulad Works', 'East', 41000, null], ['ST6', 'Girder Point', 'North', 94000, '2026-06-20']]]);
const SL_q = ['SELECT SUM(Balance) FROM Debtors;', 'SELECT COUNT(*), COUNT(LastPaid) FROM Debtors;', "SELECT MAX(Balance), MIN(Balance) FROM Debtors WHERE Region = 'East' OR Region = 'North';"];
const SL_1 = pin(scalar(SL.q(SL_q[0])), 660000, 'Starling sum');
const SL_2 = pin(SL.q(SL_q[1]).rows[0], [6, 4], 'Starling counts');
const SL_3 = pin(SL.q(SL_q[2]).rows[0], [230000, 41000], 'Starling max min');
const SL_b = "SELECT AVG(Balance) FROM Debtors WHERE Region = 'West';";
const SL_bv = pin(scalar(SL.q(SL_b)), 116500, 'Starling avg west');
Q('l5_aggs', long({
  t: 3, d: 4, c: 'analysis', marks: 5,
  stem: `Starling Steel Traders Ltd, an imagined company, keeps the Debtors table below; LastPaid is blank (NULL) for debtors who have never paid.\n\n${SL.md('Debtors')}\n\n(a) Give the result of each query: (3)\n\n${SL_q.map((q, i) => `(${['i', 'ii', 'iii'][i]}) ${C(q)}`).join('\n\n')}\n\n(b) Write a query for the average balance of the West region debtors, give its value, and state what the result of (a)(ii) tells the credit manager. (2)`,
  model: `**(a)**\n- (i) **${SL_1}** — total debtors ₹${fig(SL_1)}.\n- (ii) **${SL_2[0]} and ${SL_2[1]}** — six debtors, of whom only four have a LastPaid date; COUNT(LastPaid) skips the two NULLs.\n- (iii) **${SL_3[0]} and ${SL_3[1]}** — among the East and North debtors (ST2, ST4, ST5, ST6), Kavach Gates owes the most and Faulad Works the least.\n\n**(b)** ${C(SL_b)} — returns **${SL_bv}** ((145000 + 88000) ÷ 2, ₹${fig(SL_bv)}).\n\nFrom (a)(ii), ${SL_2[0] - SL_2[1]} of the ${SL_2[0]} debtors (Ispat Udyog and Faulad Works) have never paid anything: they need follow-up first.`,
  sol: 'Apply WHERE before the function; COUNT(field) skips NULLs while COUNT(*) does not; read the difference as debtors with no payment.',
  scheme: [[`(a)(i) ${SL_1}`, 1], [`(a)(ii) ${SL_2[0]} and ${SL_2[1]}`, 1], [`(a)(iii) ${SL_3[0]} and ${SL_3[1]}`, 1], [`(b) AVG query with WHERE Region = 'West'; ${SL_bv}`, 1], ['(b) Two debtors have never paid: follow them up', 1]],
}));

// ================================================================ t05 DBMS in business
Q('m_ais', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'The accounts clerk of Woodpecker Timbers Ltd, an imagined company, saves one payment voucher in its database-based accounting system. Why do the cash book, the supplier’s ledger account and the trial balance all show the payment at once?',
  opts: ['They are all produced by queries and reports from the same stored voucher, so nothing is posted a second time', 'The clerk copies the voucher into each book in turn', 'The DBMS keeps a separate copy of the voucher in every book', 'The trial balance is typed in again at the month end'],
  sol: 'In a DBMS-based system a transaction is recorded once; ledgers, the trial balance and statements are views of the stored records, so they stay in step automatically.',
}));

const CT = mk(
  ['Customers', [['CustCode', 'text'], ['CustName', 'text']], { pk: 'CustCode' }, [['K1', 'Thali Ghar'], ['K2', 'Bartan Bazaar'], ['K3', 'Steel Rasoi Mart']]],
  ['Invoices', [['InvNo', 'number'], ['CustCode', 'text'], ['Amount', 'currency']], { pk: 'InvNo', fks: { CustCode: 'Customers' } }, [[1, 'K1', 24000], [2, 'K2', 31000], [3, 'K2', 16500], [4, 'K3', 12000], [5, 'K1', 8000]]],
  ['Receipts', [['RcptNo', 'text'], ['CustCode', 'text'], ['Amount', 'currency']], { pk: 'RcptNo', fks: { CustCode: 'Customers' } }, [['R1', 'K2', 20000], ['R2', 'K1', 24000], ['R3', 'K2', 10000]]],
);
const CT_b = balances(CT, 'Customers', 'Invoices', 'Receipts', { nameCol: 'CustName' });
pin(CT_b.rows.map((r) => r.balance), [8000, 17500, 12000], 'Coot balances');
const CT_k2 = CT_b.rows[1];
Q('m_debtor_bal', mcq({
  t: 5, d: 3, c: 'application',
  stem: `Coot Crockery Ltd, an imagined wholesaler, works out each customer’s balance from its Invoices and Receipts tables. How much does Bartan Bazaar (K2) owe?\n\n${CT.md('Customers')}\n\n${CT.md('Invoices')}\n\n${CT.md('Receipts')}`,
  opts: distinct([CT_k2.balance, CT_k2.billed, CT_k2.paid, CT_b.total].map(rs), 'Coot'),
  sol: `K2 was billed 31000 + 16500 = ${fig(CT_k2.billed)} and paid 20000 + 10000 = ${fig(CT_k2.paid)}; balance ${fig(CT_k2.billed)} − ${fig(CT_k2.paid)} = ${fig(CT_k2.balance)}.`,
}));

const bankDb = (cb, bs) => mk(
  ['CashBook', [['Ref', 'text'], ['EntryDate', 'date'], ['Particulars', 'text'], ['Deposit', 'currency'], ['Withdrawal', 'currency']], { pk: 'Ref' }, cb],
  ['BankStmt', [['Ref', 'text'], ['TxnDate', 'date'], ['Particulars', 'text'], ['Credit', 'currency'], ['Debit', 'currency']], { pk: 'Ref' }, bs],
);
const GL = bankDb(
  [['C311', '2026-07-02', 'Cheque to fabric supplier', 0, 42000], ['D71', '2026-07-05', 'Customer cheque deposited', 26000, 0], ['C312', '2026-07-18', 'Cheque for rent', 0, 15000], ['D72', '2026-07-29', 'Customer cheque deposited', 33000, 0], ['C313', '2026-07-30', 'Cheque to button supplier', 0, 8600]],
  [['C311', '2026-07-06', 'Cheque paid', 0, 42000], ['D71', '2026-07-07', 'Clearing credit', 26000, 0], ['C312', '2026-07-21', 'Cheque paid', 0, 15000], ['INT7', '2026-07-31', 'Interest credited', 1200, 0], ['BC7', '2026-07-31', 'Bank charges', 0, 350]],
);
const GL_r = reconcile(GL, 'CashBook', 'BankStmt', 50000);
pin([GL_r.cbBal, GL_r.bsBal, GL_r.notPresented.map((x) => x.Ref), GL_r.notCredited.map((x) => x.Ref)], [43400, 19850, ['C313'], ['D72']], 'Gull reconcile');
Q('m_brs_item', mcq({
  t: 5, d: 3, c: 'application',
  stem: `Gull Garments Ltd, an imagined company, matches its CashBook (bank column) and BankStmt tables for July 2026 by Ref. Which item is a cheque issued but not yet presented for payment?\n\n${GL.md('CashBook')}\n\n${GL.md('BankStmt')}`,
  opts: ['C313, cheque to the button supplier, ₹8,600', 'D72, customer cheque deposited, ₹33,000', 'BC7, bank charges, ₹350', 'C312, cheque for rent, ₹15,000'],
  sol: 'C313 is a withdrawal in the cash book with no matching Ref in the bank statement. D72 is the opposite case (deposited, not yet credited); BC7 is in the bank statement only; C312 is matched.',
}));

const SN = mk(['Assets', [['AssetNo', 'text'], ['AssetName', 'text'], ['Category', 'text'], ['PurchaseDate', 'date'], ['Cost', 'currency'], ['Rate', 'number']], { pk: 'AssetNo' }, [['M1', 'Stitching machine', 'Machinery', '2023-04-01', 300000, 10], ['V1', 'Delivery van', 'Vehicle', '2024-04-01', 640000, 15], ['F1', 'Display racks', 'Furniture', '2025-04-01', 90000, 10]]]);
const SN_v = slmRegister(SN, 'Assets', 2026).find((r) => r.AssetNo === 'V1');
pin([SN_v.dep, SN_v.before, SN_v.wdv], [96000, 192000, 352000], 'Snipe van');
Q('m_depr', mcq({
  t: 5, d: 3, c: 'application',
  stem: `Snipe Sports Ltd, an imagined company, keeps its asset register as a table and charges straight-line depreciation at the Rate (per cent of cost) shown. What is the depreciation on the delivery van for the year 2026-27?\n\n${SN.md('Assets')}`,
  opts: distinct([SN_v.dep, SN_v.before, SN_v.wdv, (SN_v.Cost * 10) / 100].map(rs), 'Snipe'),
  sol: `Straight line: ${fig(SN_v.Cost)} × ${SN_v.Rate}% = ${fig(SN_v.dep)} every year. ₹${fig(SN_v.before)} is the depreciation of the two earlier years and ₹${fig(SN_v.wdv)} the written-down value on 31 March 2027.`,
}));

Q('tf_brs', tf({
  t: 5, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? Shrike Steels Ltd, an imagined company, can have its DBMS match the cheque references in its cash book table with those in the imported bank statement table, so that only the unmatched items are listed for its bank reconciliation statement.',
  sol: 'Matching on a common field is exactly what a database does well; the unmatched items (cheques not presented or not credited, bank charges, interest, direct receipts) are the reconciling items.',
}));

Q('fb_asset', fb({
  t: 5, d: 1, c: 'recall',
  stem: 'Wren Woodcrafts Ltd, an imagined company, keeps one table listing each fixed asset with its number, cost, date of purchase, depreciation rate and location. This table is its fixed ___.',
  acc: [['asset register', 'assets register', 'asset-register']],
  sol: 'A fixed asset register records every asset and its cost and depreciation; kept in a database, it can be queried by category or location.',
}));

const GR = bankDb(
  [['Q501', '2026-09-03', 'Cheque to sand supplier', 0, 36000], ['DP1', '2026-09-07', 'Customer cheque deposited', 54000, 0], ['Q502', '2026-09-15', 'Cheque for electricity', 0, 12500], ['DP2', '2026-09-28', 'Customer cheque deposited', 41000, 0], ['Q503', '2026-09-29', 'Cheque to soda ash supplier', 0, 27000]],
  [['Q501', '2026-09-08', 'Cheque paid', 0, 36000], ['DP1', '2026-09-09', 'Clearing credit', 54000, 0], ['Q502', '2026-09-19', 'Cheque paid', 0, 12500], ['DIR9', '2026-09-25', 'Customer paid directly', 15000, 0], ['CHG9', '2026-09-30', 'Bank charges', 0, 450]],
);
const GR_r = reconcile(GR, 'CashBook', 'BankStmt', 80000);
pin([GR_r.cbBal, GR_r.bsBal], [99500, 100050], 'Grebe reconcile');
Q('n_brs', num({
  t: 5, d: 4, c: 'analysis', marks: 2, value: GR_r.bsBal, unit: '₹',
  stem: `Grebe Glassworks Ltd, an imagined company, started September 2026 with ₹80,000 in the bank as per both its cash book and its pass book. Its DBMS matches the two tables below by Ref. Starting from the cash book balance on 30 September, find the balance as per the pass book (in ₹).\n\n${GR.md('CashBook')}\n\n${GR.md('BankStmt')}`,
  sol: `Cash book balance = 80000 + 54000 + 41000 − 36000 − 12500 − 27000 = ${GR_r.cbBal}. Add cheque Q503 not presented (${GR_r.np}) and the direct receipt DIR9 (${GR_r.bc}); less deposit DP2 not credited (${GR_r.nc}) and charges CHG9 (${GR_r.bd}): ${GR_r.cbBal} + ${GR_r.np} + ${GR_r.bc} − ${GR_r.nc} − ${GR_r.bd} = ${GR_r.bsBal}.`,
  scheme: [[`Cash book balance ${fig(GR_r.cbBal)}`, 1], [`Pass book balance ${fig(GR_r.bsBal)}`, 1]],
}));

const HH = mk(['Assets', [['AssetNo', 'text'], ['AssetName', 'text'], ['Category', 'text'], ['PurchaseDate', 'date'], ['Cost', 'currency'], ['Rate', 'number']], { pk: 'AssetNo' }, [['H1', 'Hydraulic press', 'Machinery', '2022-04-01', 500000, 10], ['H2', 'Pump test rig', 'Machinery', '2025-04-01', 260000, 10], ['H3', 'Forklift', 'Vehicle', '2024-04-01', 420000, 15], ['H4', 'Lathe', 'Machinery', '2024-04-01', 340000, 10]]]);
const HH_reg = slmRegister(HH, 'Assets', 2026);
const HH_m = HH_reg.filter((r) => r.Category === 'Machinery');
const HH_v = pin(sum(HH_m.map((r) => r.dep)), 110000, 'Harrier machinery');
Q('n_depr_cat', num({
  t: 5, d: 3, c: 'application', marks: 1, value: HH_v, unit: '₹',
  stem: `Harrier Hydraulics Ltd, an imagined company, charges straight-line depreciation at the Rate (per cent of cost) shown in its asset register. What is the total depreciation (in ₹) on its Machinery for 2026-27?\n\n${HH.md('Assets')}`,
  sol: `Machinery: H1 ${fig(HH_m[0].dep)} + H2 ${fig(HH_m[1].dep)} + H4 ${fig(HH_m[2].dep)} = ${HH_v} (the forklift is a vehicle), that is ₹${fig(HH_v)}.`,
}));

const RR = mk(
  ['Customers', [['CustCode', 'text'], ['CustName', 'text'], ['OpenBal', 'currency']], { pk: 'CustCode' }, [['RB1', 'Chappal Kendra', 12000], ['RB2', 'Pahiya Seva', 0], ['RB3', 'Hose Mart', 5000]]],
  ['Invoices', [['InvNo', 'number'], ['CustCode', 'text'], ['Amount', 'currency']], { pk: 'InvNo', fks: { CustCode: 'Customers' } }, [[31, 'RB1', 18000], [32, 'RB2', 26000], [33, 'RB1', 9000], [34, 'RB3', 14000]]],
  ['Receipts', [['RcptNo', 'text'], ['CustCode', 'text'], ['Amount', 'currency']], { pk: 'RcptNo', fks: { CustCode: 'Customers' } }, [['RC1', 'RB1', 20000], ['RC2', 'RB2', 26000], ['RC3', 'RB3', 5000]]],
);
const RR_b = balances(RR, 'Customers', 'Invoices', 'Receipts', { nameCol: 'CustName', openCol: 'OpenBal' });
pin(RR_b.rows.map((r) => r.balance), [19000, 0, 14000], 'Robin balances');
const [RR1, RR2] = RR_b.rows;
Q('s2_debtor_bal', short({
  t: 5, d: 3, c: 'application', marks: 2,
  stem: `Robin Rubber Ltd, an imagined company, keeps an opening balance for each customer and records sales and receipts in separate tables. Find the balances due from Chappal Kendra (RB1) and Pahiya Seva (RB2).\n\n${RR.md('Customers')}\n\n${RR.md('Invoices')}\n\n${RR.md('Receipts')}`,
  model: md(['Customer', 'Opening', '+ Invoices', '− Receipts', 'Balance'], [RR1, RR2].map((r) => [`${r.name} (${r.key})`, fig(r.open), fig(r.billed), fig(r.paid), bold(rs(r.balance))]), [1, 2, 3, 4]) + `\n\nRB1: ${fig(RR1.open)} + 18,000 + 9,000 − ${fig(RR1.paid)} = ${fig(RR1.balance)}. RB2 has paid its only invoice in full, so nothing is due.`,
  sol: 'Balance = opening balance + invoices − receipts, each total picked out by the customer code.',
  scheme: [[`RB1 ${rs(RR1.balance)}`, 1], [`RB2 ${rs(RR2.balance)} (nil)`, 1]],
}));

const NH = mk(['Bills', [['BillNo', 'number'], ['SupCode', 'text'], ['DueDate', 'date'], ['Amount', 'currency'], ['Paid', 'yesno']], { pk: 'BillNo' }, [[401, 'SP1', '2026-06-20', 84000, 'Yes'], [402, 'SP2', '2026-06-28', 56000, 'No'], [403, 'SP1', '2026-07-12', 72000, 'No'], [404, 'SP3', '2026-06-30', 39000, 'No'], [405, 'SP2', '2026-07-05', 47000, 'Yes']]]);
const NH_q = "SELECT BillNo, SupCode, Amount FROM Bills WHERE Paid = 'No' AND DueDate <= '2026-06-30';";
const NH_r = pin(NH.q(NH_q).rows, [[402, 'SP2', 56000], [404, 'SP3', 39000]], 'Nuthatch');
const NH_t = pin(scalar(NH.q("SELECT SUM(Amount) FROM Bills WHERE Paid = 'No' AND DueDate <= '2026-06-30'")), 95000, 'Nuthatch total');
Q('s2_creditors', short({
  t: [2, 5], d: 3, c: 'application', marks: 2,
  stem: `Nuthatch Nuts Ltd, an imagined company, keeps its creditors’ bills in the table below. Write a query that lists the unpaid bills due on or before 30 June 2026 (bill number, supplier code and amount), give its result, and state the cash the company needs to settle them.\n\n${NH.md('Bills')}`,
  model: `${C(NH_q)}\n\n${resultMd({ columns: ['BillNo', 'SupCode', 'Amount'], rows: NH_r })}\n\nCash needed: 56,000 + 39,000 = **${rs(NH_t)}** (bill 403 falls due only in July; 401 is already paid).`,
  sol: 'Two conditions joined by AND: not paid, and due date not later than 30 June (dates compare in year-month-day form).',
  scheme: [['Query with both conditions', 1], [`Bills 402 and 404; ${rs(NH_t)}`, 1]],
}));

const TB = bankDb(
  [['K21', '2026-10-04', 'Cheque to thread supplier', 0, 18000], ['DP5', '2026-10-10', 'Customer cheque deposited', 22500, 0], ['K22', '2026-10-21', 'Cheque for shop rent', 0, 9000], ['DP6', '2026-10-30', 'Customer cheque deposited', 16000, 0], ['K23', '2026-10-31', 'Cheque to zip supplier', 0, 7400]],
  [['K21', '2026-10-08', 'Cheque paid', 0, 18000], ['DP5', '2026-10-13', 'Clearing credit', 22500, 0], ['INT10', '2026-10-31', 'Interest credited', 600, 0], ['CHG10', '2026-10-31', 'Bank charges', 0, 250], ['INS10', '2026-10-31', 'Insurance premium (standing instruction)', 0, 3200]],
);
const TB_r = reconcile(TB, 'CashBook', 'BankStmt', 35000);
pin([TB_r.cbBal, TB_r.bsBal, TB_r.np, TB_r.nc, TB_r.bc, TB_r.bd], [39100, 36650, 16400, 16000, 600, 3450], 'Tailorbird reconcile');
Q('s3_brs', short({
  t: 5, d: 3, c: 'application', marks: 3,
  stem: `Tailorbird Tailoring Supplies, an imagined firm, began October 2026 with ₹35,000 in the bank as per both its cash book and its pass book. Using the two tables below, matched by Ref, prepare its bank reconciliation statement as at 31 October 2026.\n\n${TB.md('CashBook')}\n\n${TB.md('BankStmt')}`,
  model: `Cash book (bank column) balance = 35,000 + 22,500 + 16,000 − 18,000 − 9,000 − 7,400 = ${fig(TB_r.cbBal)}.\n\n${brsMd(TB_r, '31 October 2026')}\n\nCheck: pass book = 35,000 + 22,500 + 600 − 18,000 − 250 − 3,200 = ${fig(TB_r.bsBal)}.`,
  sol: 'Match by Ref; every item found in only one table is a reconciling item, added or subtracted according to its effect on the bank balance.',
  scheme: [[`Cash book balance ${fig(TB_r.cbBal)}`, 1], ['Unmatched items correctly added and subtracted', 1], [`Pass book balance ${fig(TB_r.bsBal)}`, 1]],
}));

const BT = mk(['Assets', [['AssetNo', 'text'], ['AssetName', 'text'], ['Category', 'text'], ['PurchaseDate', 'date'], ['Cost', 'currency'], ['Rate', 'number']], { pk: 'AssetNo' }, [['BK1', 'Brick moulding machine', 'Machinery', '2024-04-01', 450000, 10], ['BK2', 'Tractor trolley', 'Vehicle', '2025-04-01', 700000, 15], ['BK3', 'Kiln fan', 'Machinery', '2023-04-01', 180000, 10]]]);
const BT_reg = slmRegister(BT, 'Assets', 2026);
pin(BT_reg.map((r) => [r.dep, r.before, r.wdv]), [[45000, 90000, 315000], [105000, 105000, 490000], [18000, 54000, 108000]], 'Bittern register');
const BT_q = "SELECT SUM(Cost) FROM Assets WHERE Category = 'Machinery';";
const BT_s = pin(scalar(BT.q(BT_q)), 630000, 'Bittern machinery cost');
Q('s3_asset', short({
  t: [3, 5], d: 3, c: 'application', marks: 3,
  stem: `Bittern Bricks Ltd, an imagined company, keeps its asset register in the table below. Every asset was bought on 1 April of the year shown, and depreciation is charged on the straight-line method at the Rate (per cent of cost). (i) Find each asset’s depreciation for 2026-27 and (ii) its written-down value on 31 March 2027. (iii) Write a query for the total cost of machinery and give its value.\n\n${BT.md('Assets')}`,
  model: `${md(['Asset', 'Cost', 'Years before 2026-27', 'Depreciation before', '(i) Depreciation 2026-27', '(ii) Written-down value 31 March 2027'], BT_reg.map((r) => [`${r.AssetNo} ${r.AssetName}`, fig(r.Cost), String(r.yrs), fig(r.before), bold(fig(r.dep)), bold(fig(r.wdv))]), [1, 2, 3, 4, 5])}\n\n(iii) ${C(BT_q)} — returns **${BT_s}** (₹${fig(BT_s)}: BK1 + BK3).`,
  sol: 'Yearly charge = cost × rate; written-down value = cost − all depreciation to date including this year; the query filters on Category.',
  scheme: [['(i) Depreciation for all three assets', 1], ['(ii) Written-down values', 1], [`(iii) SUM query with WHERE; ${BT_s}`, 1]],
}));

Q('s3_ais', short({
  t: 5, d: 2, c: 'understanding', marks: 3,
  stem: 'Pochard Pumps Ltd, an imagined company, plans to run its accounts on a database. Explain how a DBMS would support (i) its debtors and creditors records, (ii) its bank reconciliation and (iii) its fixed asset accounting.',
  model: '1. **Debtors and creditors.** Customers and suppliers are master tables; each invoice, bill, receipt and payment is stored once with the party’s code as a foreign key. Queries give any party’s balance, the list of dues past their date and parties over their credit limit, and the DBMS refuses a bill for a party not on file.\n2. **Bank reconciliation.** The bank column of the cash book and the bank statement (imported as a table) are matched on the cheque or transaction reference. Unmatched items, such as cheques not yet presented or credited, bank charges and interest, are listed automatically to prepare the reconciliation statement.\n3. **Asset accounting.** A fixed asset register table holds each asset’s number, category, date, cost, rate and location. Depreciation and written-down values are computed for every asset, totals by category feed the accounts, and disposals are traced by asset number.',
  sol: 'For each area: what is stored, how it is linked, and what the DBMS produces from it.',
  scheme: [['(i) Debtors and creditors', 1], ['(ii) Bank reconciliation by matching', 1], ['(iii) Asset register and depreciation', 1]],
}));

const BY = mk(
  ['Customers', [['CustCode', 'text'], ['CustName', 'text'], ['Town', 'text'], ['CreditLimit', 'currency']], { pk: 'CustCode' }, [['BG1', 'Chakki Ghar', 'Unnao', 60000], ['BG2', 'Dal Bhandar', 'Safipur', 50000], ['BG3', 'Annakshetra Stores', 'Unnao', 40000], ['BG4', 'Poshak Anaj Kendra', 'Bangarmau', 70000]]],
  ['Invoices', [['InvNo', 'number'], ['InvDate', 'date'], ['CustCode', 'text'], ['Amount', 'currency']], { pk: 'InvNo', fks: { CustCode: 'Customers' } }, [[601, '2026-07-02', 'BG1', 38000], [602, '2026-07-05', 'BG2', 29000], [603, '2026-07-09', 'BG3', 44000], [604, '2026-07-14', 'BG1', 31000], [605, '2026-07-18', 'BG4', 52000], [606, '2026-07-25', 'BG2', 17000]]],
  ['Receipts', [['RcptNo', 'text'], ['RcptDate', 'date'], ['CustCode', 'text'], ['Amount', 'currency']], { pk: 'RcptNo', fks: { CustCode: 'Customers' } }, [['P01', '2026-07-20', 'BG1', 38000], ['P02', '2026-07-26', 'BG2', 29000], ['P03', '2026-07-30', 'BG4', 20000]]],
);
const BY_b = balances(BY, 'Customers', 'Invoices', 'Receipts', { nameCol: 'CustName', limitCol: 'CreditLimit' });
pin(BY_b.rows.map((r) => r.balance), [31000, 17000, 44000, 32000], 'Baya balances');
const BY_t = pin(BY_b.total, 124000, 'Baya total');
const BY_over = BY_b.rows.filter((r) => r.balance > r.limit);
pin(BY_over.map((r) => [r.key, r.balance - r.limit]), [['BG3', 4000]], 'Baya over limit');
const BY_q = 'SELECT RcptNo, CustCode, Amount FROM Receipts WHERE Amount > 25000;';
const BY_qr = pin(BY.q(BY_q).rows, [['P01', 'BG1', 38000], ['P02', 'BG2', 29000]], 'Baya receipts');
Q('l5_debtors', long({
  t: [5, 3], d: 4, c: 'analysis', marks: 5,
  stem: `Baya Grains Ltd, an imagined wholesaler, keeps its debtors’ records for July 2026 in three related tables (CustCode links them). There were no opening balances.\n\n${BY.md('Customers')}\n\n${BY.md('Invoices')}\n\n${BY.md('Receipts')}\n\n(a) Prepare a debtors’ balance report showing, for each customer, the invoices, the receipts and the balance due, with the total. (3)\n\n(b) Which customer has exceeded its credit limit, and by how much? (1)\n\n(c) Write a query that lists the receipts of more than ₹25,000, and give its result. (1)`,
  model: `**(a) Debtors’ balance report, 31 July 2026**\n\n${md(['CustCode', 'Customer', 'Invoices (₹)', 'Receipts (₹)', 'Balance (₹)'], [...BY_b.rows.map((r) => [r.key, r.name, fig(r.billed), fig(r.paid), fig(r.balance)]), ['', '**Total**', `**${fig(sum(BY_b.rows.map((r) => r.billed)))}**`, `**${fig(sum(BY_b.rows.map((r) => r.paid)))}**`, `**${fig(BY_t)}**`]], [2, 3, 4])}\n\nCheck: total invoices − total receipts = ${fig(BY_t)}.\n\n**(b)** ${BY_over[0].name} (${BY_over[0].key}) owes ${rs(BY_over[0].balance)} against a limit of ${rs(BY_over[0].limit)}: over by **${rs(BY_over[0].balance - BY_over[0].limit)}**.\n\n**(c)** ${C(BY_q)}\n\n${resultMd({ columns: ['RcptNo', 'CustCode', 'Amount'], rows: BY_qr })}`,
  sol: 'Total each customer’s invoices and receipts by code; compare each balance with its credit limit; the query needs one condition on Amount.',
  scheme: [['(a) Invoices and receipts per customer', 1], ['(a) Balances', 1], [`(a) Total ${rs(BY_t)} with check`, 1], [`(b) ${BY_over[0].key} over by ${rs(BY_over[0].balance - BY_over[0].limit)}`, 1], ['(c) Query and result (P01, P02)', 1]],
}));

const LM = bankDb(
  [['L901', '2026-08-02', 'Cheque to steel rope supplier', 0, 64000], ['DP21', '2026-08-06', 'Customer cheque deposited', 88000, 0], ['L902', '2026-08-12', 'Cheque for motor repairs', 0, 23500], ['DP22', '2026-08-19', 'Customer cheque deposited', 47000, 0], ['L903', '2026-08-27', 'Cheque to control-panel supplier', 0, 39000], ['DP23', '2026-08-29', 'Customer cheque deposited', 56000, 0], ['L904', '2026-08-30', 'Cheque for advertisement', 0, 12000]],
  [['L901', '2026-08-05', 'Cheque paid', 0, 64000], ['DP21', '2026-08-08', 'Clearing credit', 88000, 0], ['L902', '2026-08-16', 'Cheque paid', 0, 23500], ['DP22', '2026-08-21', 'Clearing credit', 47000, 0], ['DIV8', '2026-08-25', 'Dividend collected by bank', 4800, 0], ['SI8', '2026-08-28', 'Loan instalment (standing instruction)', 0, 6500], ['CHG8', '2026-08-31', 'Bank charges', 0, 590]],
);
const LM_r = reconcile(LM, 'CashBook', 'BankStmt', 150000);
pin([LM_r.cbBal, LM_r.bsBal, LM_r.np, LM_r.nc, LM_r.bc, LM_r.bd], [202500, 195210, 51000, 56000, 4800, 7090], 'Lammergeier reconcile');
Q('l5_brs', long({
  t: 5, d: 4, c: 'analysis', marks: 5,
  stem: `Lammergeier Lifts Ltd, an imagined company, imports its August 2026 bank statement into its database and matches it with the bank column of its cash book on the Ref field. Both showed ₹1,50,000 on 1 August 2026.\n\n${LM.md('CashBook')}\n\n${LM.md('BankStmt')}\n\n(a) List the unmatched items under four heads: cheques issued but not presented, cheques deposited but not credited, items credited only by the bank, items debited only by the bank. (2)\n\n(b) Find the cash book balance and prepare the bank reconciliation statement as at 31 August 2026. (3)`,
  model: `**(a) Unmatched items**\n\n${md(['Head', 'Items', '₹'], [['Cheques issued, not presented', LM_r.notPresented.map((x) => x.Ref).join(', '), fig(LM_r.np)], ['Cheques deposited, not credited', LM_r.notCredited.map((x) => x.Ref).join(', '), fig(LM_r.nc)], ['Credited only by the bank', LM_r.bankCr.map((x) => `${x.Ref} (dividend)`).join(', '), fig(LM_r.bc)], ['Debited only by the bank', LM_r.bankDr.map((x) => x.Ref).join(', '), fig(LM_r.bd)]], [2])}\n\n**(b)** Cash book balance = 1,50,000 + 88,000 + 47,000 + 56,000 − 64,000 − 23,500 − 39,000 − 12,000 = ${fig(LM_r.cbBal)}.\n\n${brsMd(LM_r, '31 August 2026')}\n\nCheck from the bank statement: 1,50,000 + 88,000 + 47,000 + 4,800 − 64,000 − 23,500 − 6,500 − 590 = ${fig(LM_r.bsBal)}.`,
  sol: 'Classify each unmatched Ref by the table it is in and its side; then adjust the cash book balance to reach the pass book balance and check against the statement.',
  scheme: [['(a) Cheques not presented and not credited', 1], ['(a) Bank-only credits and debits', 1], [`(b) Cash book balance ${fig(LM_r.cbBal)}`, 1], ['(b) Adjustments in the statement', 1], [`(b) Pass book balance ${fig(LM_r.bsBal)}`, 1]],
}));

const SH = mk(
  ['Accounts', [['AcCode', 'number'], ['AcName', 'text'], ['AcGroup', 'text']], { pk: 'AcCode' }, [[101, 'Capital', 'Liabilities'], [102, 'Creditors', 'Liabilities'], [201, 'Bank', 'Assets'], [202, 'Machinery', 'Assets'], [203, 'Debtors', 'Assets'], [301, 'Sales', 'Income'], [401, 'Purchases', 'Expenses'], [402, 'Wages', 'Expenses']]],
  ['Vouchers', [['VchNo', 'number'], ['VchDate', 'date'], ['DrCode', 'number'], ['CrCode', 'number'], ['Amount', 'currency']], { pk: 'VchNo', fks: { DrCode: 'Accounts', CrCode: 'Accounts' } }, [[1, '2026-04-01', 201, 101, 500000], [2, '2026-04-03', 202, 201, 180000], [3, '2026-04-08', 401, 102, 120000], [4, '2026-04-12', 203, 301, 210000], [5, '2026-04-15', 402, 201, 35000], [6, '2026-04-20', 201, 203, 150000], [7, '2026-04-24', 102, 201, 90000], [8, '2026-04-29', 201, 301, 40000]]],
);
const SH_tb = trialBalance(SH, 'Vouchers', 'Accounts');
pin([SH_tb.drT, SH_tb.crT], [780000, 780000], 'Shoveler trial balance');
const SH_bq = ['SELECT SUM(Amount) FROM Vouchers WHERE DrCode = 201;', 'SELECT SUM(Amount) FROM Vouchers WHERE CrCode = 201;'];
const SH_bv = pin(SH_bq.map((q) => scalar(SH.q(q))), [690000, 305000], 'Shoveler bank');
const SH_bank = SH_tb.rows.find((r) => r.AcCode === 201);
check(SH_bank.bal === SH_bv[0] - SH_bv[1], 'Shoveler bank balance from queries');
pin(SH.verdict('Vouchers', { VchNo: 9, VchDate: '2026-04-30', DrCode: 205, CrCode: 201, Amount: 5000 }), 'Rejected: no matching record in Accounts (foreign key)', 'Shoveler bad code');
Q('l5_trial', long({
  t: [5, 3], d: 4, c: 'application', marks: 5,
  stem: `Shoveler Tools Ltd, an imagined company, records every transaction of April 2026 as one row of a Vouchers table: the account debited (DrCode), the account credited (CrCode) and the amount. Both codes are foreign keys to its Accounts table.\n\n${SH.md('Accounts')}\n\n${SH.md('Vouchers')}\n\n(a) Write the two queries that give the total debits and total credits of the Bank account, state their values and the bank balance. (2)\n\n(b) Prepare the trial balance as at 30 April 2026 that the database would produce. (3)`,
  model: `**(a)** ${C(SH_bq[0])} — returns **${SH_bv[0]}**; ${C(SH_bq[1])} — returns **${SH_bv[1]}**. Bank balance = ${fig(SH_bv[0])} − ${fig(SH_bv[1])} = **₹${fig(SH_bank.bal)} (debit)**.\n\n**(b) Trial balance of Shoveler Tools Ltd as at 30 April 2026**\n\n${md(['Code', 'Account', 'Debit (₹)', 'Credit (₹)'], [...SH_tb.rows.map((r) => [String(r.AcCode), r.AcName, r.bal > 0 ? fig(r.bal) : '', r.bal < 0 ? fig(-r.bal) : '']), ['', '**Total**', `**${fig(SH_tb.drT)}**`, `**${fig(SH_tb.crT)}**`]], [2, 3])}\n\nEach balance is the account’s debit total less its credit total from the vouchers; since every voucher has one debit and one credit of the same amount, the totals agree. A voucher quoting a code not in Accounts (say 205) would have been refused at entry.`,
  sol: 'Filter the vouchers on the account code once on the debit side and once on the credit side; repeat for every account to get the trial balance.',
  scheme: [['(a) Two SUM queries with WHERE on DrCode and CrCode', 1], [`(a) ${SH_bv[0]}, ${SH_bv[1]}, balance ${fig(SH_bank.bal)}`, 1], ['(b) Debit balances', 1], ['(b) Credit balances', 1], [`(b) Totals ${fig(SH_tb.drT)} agree`, 1]],
}));

FACTS.push(
  `Spoonbill and Lark key verdicts`,
  `Redstart report ${fig(RS_tot)}`,
  `Stilt precedence ${ST_r.length} rows`,
  `Owlet sequence ${OW_1.length}/${OW_2}/${OW_3}`,
  `Quail ${QA_b2} deleted`,
  `Starling sum ${fig(SL_1)}`,
  `Baya debtors ${fig(BY_t)}`,
  `Lammergeier pass book ${fig(LM_r.bsBal)}`,
  `Shoveler trial balance ${fig(SH_tb.drT)}`,
);
export { FACTS, BANK };
