// ISC 12 Commerce, ch09 Organising — question bank. Every firm, person and situation is imagined and written by SOYL
// and labelled as such; no ISC or CBSE textbook illustration or exercise and no CISCE specimen or board item is
// reused (D-036). Firms, people and set-ups differ from CBSE 12 Business Studies ch05.
import { Q, mcq, ar, tf, fb, ord, match, short, long, caseQ, child } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 75];
const L5 = [100, 150];

// ================================================================ t01 Organising: meaning, importance and steps
Q('m_first_step', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The founder of the imagined Haldwani Fruit Canners begins organising by listing every job the business needs — washing, peeling, cooking, canning, labelling and selling — and splitting them into tasks one person can handle. Which step of organising is this?',
  opts: ['Identification and division of work', 'Departmentalisation', 'Assignment of duties', 'Establishing reporting relationships'],
  sol: 'Listing the total work and breaking it into manageable jobs is identification and division of work, the first step of organising.',
}));
Q('m_department', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'At the imagined Haldwani Fruit Canners, cooking, canning and labelling jobs are placed under a Production unit, while advertising and dealer visits go to a Marketing unit. This step is called',
  opts: ['departmentalisation', 'delegation', 'decentralisation', 'assignment of duties'],
  sol: 'Grouping similar or related jobs into units or departments is departmentalisation.',
}));
Q('m_reporting', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The works manager of the imagined Haldwani Fruit Canners announces that each line leader will report to the shift supervisor, who will report to her. Which step of organising is this?',
  opts: ['Establishing reporting relationships', 'Departmentalisation', 'Identification and division of work', 'Follow-up action'],
  sol: 'Deciding who reports to whom creates the chain of authority: establishing reporting relationships.',
}));
Q('m_assign', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'After setting up a Quality department, the imagined Haldwani Fruit Canners appoints Meher, a food scientist with five years of laboratory experience, to head it. Which step of organising does this show?',
  opts: ['Assignment of duties', 'Departmentalisation', 'Establishing reporting relationships', 'Identification of work'],
  sol: 'Giving each job to the person best suited to it by skill and experience is assignment of duties.',
}));
Q('m_imp_growth', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Because its jobs, departments and reporting lines were clearly set out, the imagined Salem Sago Mills was able to add a second mill with sixty more workers without confusion. Which importance of organising does this show?',
  opts: ['It helps in expansion and growth', 'It reduces the need for planning', 'It removes the need for managers', 'It makes all decisions centralised'],
  sol: 'A sound structure can absorb new units, products and staff smoothly, so organising helps a firm expand and grow.',
}));
Q('ord_steps', ord({
  t: 1, d: 2, c: 'application', marks: 2,
  stem: 'An imagined youth club in Itanagar is organising a three-day book fair. Arrange its organising actions in the correct order.',
  items: [
    'List all the work: stalls, tickets, publicity, cleaning, security',
    'Group the work into teams: stalls, visitors, publicity',
    'Give each team to members with suitable skills',
    'Decide that team leaders report to the fair secretary',
  ],
  sol: 'Identification and division of work, departmentalisation, assignment of duties, and establishing reporting relationships.',
}));
Q('ar_org', ar({
  t: 1, d: 2, c: 'understanding',
  a: 'Organising helps in the best possible use of resources.',
  r: 'A clear division of work avoids duplication and makes sure no task is left undone.',
  key: 'a',
  sol: 'Both are true, and the reason explains the assertion: when work is clearly divided, people, money and materials are not wasted on duplicated or forgotten tasks.',
}));
Q('tf_org', tf({
  t: 1, d: 2, c: 'understanding',
  stem: 'Organising is complete as soon as jobs are grouped into departments; deciding who reports to whom is not part of organising.',
  ans: false,
  sol: 'False. Establishing reporting relationships is the last step of organising; without it, no one knows whom to answer to.',
}));
Q('s_steps2', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'An imagined school in Bhubaneswar is organising its sports day. Explain the first two steps of organising with an example of each from the event.',
  model: '1. **Identification and division of work:** list every job, such as **marking tracks, timing races, first aid and prize giving**, and split it into tasks.\n2. **Departmentalisation:** **group** related jobs into teams, such as a **track team** and a **welfare team**.',
  sol: 'Both steps explained with sports-day examples.',
  scheme: [['First step with example', 1], ['Second step with example', 1]],
}));
Q('s3_importance', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'The imagined Sundargarh Steel Furniture has grown from 30 to 300 workers in four years. Explain three ways in which sound organising will help it now.',
  model: '1. **Benefits of specialisation:** welders, painters and fitters each do **one kind of job** repeatedly, so skill and speed improve.\n2. **Clarity in working relationships:** everyone knows **whom to report to**, which reduces confusion and fixes responsibility.\n3. **Adaptation to change:** a clear structure lets the firm **add new lines**, such as hospital beds, by adjusting departments rather than starting afresh.',
  sol: 'Three points of importance applied to the growing firm.',
  scheme: [['First point applied', 1], ['Second point applied', 1], ['Third point applied', 1]],
}));
Q('s3_steps', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'The imagined Kota Doria Weavers\' Cooperative has listed all the work needed to open its first showroom. Explain the next three steps of organising it should follow, with an example of each.',
  model: '1. **Departmentalisation:** group the jobs into units such as **display and sales**, **stock and accounts**, and **publicity**.\n2. **Assignment of duties:** give each unit to suitable members, for example the **best talker to sales** and the member who keeps accounts to stock.\n3. **Establishing reporting relationships:** decide that unit heads **report to the showroom manager**, who reports to the cooperative\'s committee.',
  sol: 'The three later steps applied to the showroom.',
  scheme: [['Departmentalisation', 1], ['Assignment of duties', 1], ['Reporting relationships', 1]],
}));
Q('l_org', long({
  t: 1, d: 3, c: 'application', marks: 5, wl: L5,
  stem: '(a) What is meant by organising? [1]\n(b) Ananya is setting up an imagined music school in Guwahati with eight teachers and four office staff. Explain the four steps of organising she should follow, with an example of each. [4]',
  model: '(a) **Organising** is the process of **identifying and grouping work**, assigning it to people, and establishing **authority and reporting relationships** so that plans can be carried out.\n\n(b) 1. **Identification and division of work:** list all the work, such as **teaching, admissions, fee collection, concerts** and upkeep, and divide it into jobs.\n2. **Departmentalisation:** group related jobs into units, such as **teaching** (by instrument) and **administration**.\n3. **Assignment of duties:** give each job to a suitable person, for example the **senior sitar teacher** heads the string section.\n4. **Establishing reporting relationships:** teachers report to their **section head**, and section heads and the office manager report to **Ananya**.',
  sol: 'Meaning; the four steps applied to the music school.',
  scheme: [['(a) Meaning', 1], ['(b) Four steps with examples', 4]],
}));

// ================================================================ t02 Functional and divisional structures
Q('m_functional', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The imagined Salem Sago Mills makes only one product, sago, but runs a large operation. Its activities are grouped into purchase, production, finance and sales, each under a specialist head. Which structure does it have?',
  opts: ['Functional structure', 'Divisional structure', 'Informal organisation', 'Decentralised network'],
  sol: 'Grouping activities by major function, each under a specialist, is a functional structure; it suits a large firm with one main product.',
}));
Q('m_divisional', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The imagined Navsari Group makes dairy products, school furniture and travel bags. Each line has its own head, its own production and sales staff, and its own profit target. This is a',
  opts: ['divisional structure', 'functional structure', 'informal organisation', 'single department'],
  sol: 'Separate units built around product lines, each with its own functions and profit target, form a divisional structure.',
}));
Q('m_func_merit', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The finance team of the imagined Salem Sago Mills is made up only of accountants who handle all its money matters. Which advantage of the functional structure does this show most directly?',
  opts: ['Specialisation, because people do one type of work repeatedly', 'Easy measurement of each product\'s profit', 'Quick decisions on each product line', 'Training of all-round managers'],
  sol: 'Grouping similar work together lets staff specialise and become efficient, which is the main merit of a functional structure.',
}));
Q('m_func_limit', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'At the imagined Salem Sago Mills, the finance head cuts the advertising budget to save money just as the sales head plans a big festival campaign. Each looks only at the goals of his own department. Which limitation of the functional structure does this show?',
  opts: ['Departments may put their own interests above the organisation\'s, causing conflict', 'Resources are duplicated across product divisions', 'Divisions compete for funds', 'Managers cannot specialise'],
  sol: 'In a functional structure each department may chase its own goals, which can cause conflict and poor coordination between functions.',
}));
Q('m_div_limit', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'Each of the three divisions of the imagined Navsari Group has its own accounts office, its own lorries and its own warehouse. Which limitation of the divisional structure does this show?',
  opts: ['Duplication of activities and resources, which raises costs', 'Lack of specialisation in each function', 'Difficulty in judging each division\'s profit', 'Too little authority for division heads'],
  sol: 'Every division keeps its own set of functions and facilities, so the same activities are repeated across divisions, which is costly.',
}));
Q('m_div_merit', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Tenzin heads the travel-bag division of the imagined Navsari Group and handles its buying, production, sales and accounts. The directors say this will prepare him for a top post. Which merit of the divisional structure is this?',
  opts: ['It develops varied skills in division heads', 'It allows full specialisation in one function', 'It avoids all duplication of resources', 'It suits a firm with one product'],
  sol: 'A division head deals with all functions of a product, so he gains all-round experience that prepares him for top management.',
}));
Q('m_struct_combo', mcq({
  t: 2, d: 4, c: 'analysis', fixed: true, key: 'c',
  stem: 'Read these statements about organisation structures:\nP. A functional structure suits a large firm with one main product.\nQ. In a divisional structure, each division can be treated as a profit centre.\nR. A functional structure duplicates resources across product lines.\nS. A divisional structure suits a firm with several different product lines.\nWhich statements are correct?',
  opts: ['P and R only', 'Q and R only', 'P, Q and S', 'P, Q, R and S'],
  sol: 'P, Q and S are correct. R is wrong: duplication of resources is a limitation of the divisional structure, not the functional one.',
}));
Q('ar_struct', ar({
  t: 2, d: 3, c: 'analysis',
  a: 'A divisional structure suits a firm that makes several quite different product lines.',
  r: 'Each different product needs its own production methods and its own marketing.',
  key: 'a',
  sol: 'Both are true, and the reason explains the assertion: very different products need separate handling, which a division for each product provides.',
}));
Q('ar_struct_d', ar({
  t: 2, d: 3, c: 'analysis',
  a: 'In a functional structure, each product has its own head who is answerable for its profit.',
  r: 'A functional structure removes all conflict between departments.',
  key: 'd',
  sol: 'Both are false. Product heads answerable for profit belong to a divisional structure, and functional departments often conflict because each pursues its own goals.',
}));
Q('tf_struct', tf({
  t: 2, d: 2, c: 'understanding',
  stem: 'In a functional structure, managers get experience of all functions of a product, which prepares them for top posts.',
  ans: false,
  sol: 'False. In a functional structure managers specialise in one function; it is the divisional structure that gives all-round experience.',
}));
Q('fb_struct', fb({
  t: 2, d: 2, c: 'understanding',
  stem: 'Complete the analogy. Purchase, production and sales departments : functional structure :: Dairy, furniture and travel-bag units : ___ structure',
  acc: [['divisional']],
  sol: 'Units built around functions form a functional structure; units built around product lines form a divisional structure.',
}));
Q('s_func', short({
  t: 2, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Give two reasons why a functional structure suits the imagined Salem Sago Mills, which makes only sago on a large scale.',
  model: '1. **One product:** with a single product, grouping work **by function** is simple and there is no need for separate divisions.\n2. **Specialisation and economy:** experts in each function, such as **buying tapioca** or selling, work efficiently and avoid **duplication** of resources.',
  sol: 'Two reasons linked to the single-product firm.',
  scheme: [['First reason', 1], ['Second reason', 1]],
}));
Q('s_div', short({
  t: 2, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'State two limitations that the imagined Navsari Group may face because of its divisional structure.',
  model: '1. **Duplication and higher cost:** each division keeps its **own accounts, lorries and warehouse**, so the same work is repeated.\n2. **Conflict among divisions:** the dairy, furniture and bag divisions may **compete for funds** and attention from head office.',
  sol: 'Two limitations linked to the group.',
  scheme: [['First limitation', 1], ['Second limitation', 1]],
}));
Q('s3_recommend', short({
  t: 2, d: 3, c: 'evaluation', marks: 3, wl: S3,
  stem: 'The imagined Bilaspur Agro started as a rice mill and now also makes cattle feed and bamboo furniture. Recommend a suitable organisation structure for it, giving three reasons.',
  model: '**Recommendation: a divisional structure.**\n1. **Different products:** rice, cattle feed and furniture need **different production methods and markets**, so each should have its own division.\n2. **Accountability:** each division\'s **profit or loss** can be measured, so poor performers are spotted.\n3. **Flexibility and growth:** a new product can be added as a **new division** without disturbing the others, and division heads gain all-round skills.',
  sol: 'A divisional structure recommended with three reasons.',
  scheme: [['Recommendation with first reason', 1], ['Second reason', 1], ['Third reason', 1]],
}));
Q('l_compare', long({
  t: 2, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'The imagined Bhagalpur Silk House now makes silk saris, silk cushion covers and runs a silk-village homestay for tourists.\n(a) Which organisation structure would you recommend for it? Give one reason. [1]\n(b) Distinguish between functional and divisional structures on four bases. [4]',
  model: '(a) A **divisional structure**, because its three lines — saris, cushion covers and tourism — need **different skills and markets**.\n\n(b) 1. **Basis of grouping:** functional groups activities by **major function** (purchase, production, sales); divisional groups them by **product line**.\n2. **Specialisation:** functional gives **functional** specialisation; divisional gives **product** specialisation, and managers gain all-round skills.\n3. **Cost:** functional is **economical** because functions are not duplicated; divisional is **costlier** because each division repeats functions.\n4. **Suitability and accountability:** functional suits a firm with **one main product**, and it is hard to fix responsibility for results; divisional suits **several product lines**, and each division answers for its own profit.',
  sol: 'A recommendation with a reason; four bases of difference.',
  scheme: [['(a) Recommendation with reason', 1], ['(b) Four bases', 4]],
}));

// ================================================================ t03 Formal and informal organisation
Q('m_formal_feature', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'At the imagined Bokaro Engineering Works, every job has a written description and an official chart shows who reports to whom. These features belong to',
  opts: ['formal organisation', 'informal organisation', 'the grapevine', 'a friendship group'],
  sol: 'A structure deliberately designed by management, with written duties and reporting lines, is the formal organisation.',
}));
Q('m_informal_arise', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Fitters at the imagined Bokaro Engineering Works who travel to work on the same bus have started sharing tips about difficult machines and covering for each other. This network has arisen from',
  opts: ['social interaction among employees: informal organisation', 'the official organisation chart', 'written job descriptions', 'an order from the works manager'],
  sol: 'Relationships that grow naturally out of friendship and shared interests, outside the official structure, form the informal organisation.',
}));
Q('m_grapevine', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'News of a festival bonus at the imagined Bokaro Engineering Works spreads from person to person through the whole plant within an hour, in every direction, before any notice is put up. This channel of communication is called the',
  opts: ['grapevine', 'scalar chain', 'formal channel', 'gang plank'],
  sol: 'Informal communication that passes quickly from person to person in any direction is the grapevine.',
}));
Q('m_informal_merit', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'New carvers at the imagined Gwalior Stone Carvers often feel lonely in their first month. Many settle in after joining the evening chess group that older carvers run, and they stay on. Which benefit of informal organisation is this?',
  opts: ['It meets the social needs of employees', 'It fixes responsibility clearly', 'It lays down written rules', 'It speeds up formal approvals'],
  sol: 'Informal groups give people a sense of belonging and friendship, satisfying social needs and improving job satisfaction.',
}));
Q('m_informal_limit', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'Older carvers at the imagined Gwalior Stone Carvers quietly agree among themselves not to use a new cutting machine, and younger carvers follow them. Which limitation of informal organisation does this show?',
  opts: ['It may resist change', 'It creates too many written rules', 'It makes the scalar chain too long', 'It fixes responsibility too strictly'],
  sol: 'Informal groups can press members to resist changes that managers introduce, slowing progress.',
}));
Q('ar_formal', ar({
  t: 3, d: 3, c: 'analysis',
  a: 'Formal organisation makes it easy to fix responsibility.',
  r: 'Informal organisation arises from friendships and shared interests among employees.',
  key: 'b',
  sol: 'Both statements are true, but the origin of informal groups does not explain why formal organisation fixes responsibility; that comes from clearly laid-down duties and reporting lines.',
}));
Q('ar_informal_c', ar({
  t: 3, d: 3, c: 'analysis',
  a: 'Informal organisation can be useful to managers.',
  r: 'Informal organisation is created by management through written rules and procedures.',
  key: 'c',
  sol: 'The assertion is true: managers can use the grapevine to share news or sense feelings. The reason is false: informal organisation arises on its own from social interaction, not from written rules.',
}));
Q('tf_informal', tf({
  t: 3, d: 1, c: 'understanding',
  stem: 'Informal organisation is shown on the official organisation chart of a company.',
  ans: false,
  sol: 'False. Informal organisation is not planned by management, so it never appears on the official chart.',
}));
Q('fb_informal', fb({
  t: 3, d: 2, c: 'understanding',
  stem: 'Complete the analogy. The official chart of positions : formal organisation :: Friendship groups that grow on their own : ___ organisation',
  acc: [['informal']],
  sol: 'The official chart shows the formal organisation; friendship groups form the informal organisation.',
}));
Q('s_formal_limits', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two limitations of formal organisation.',
  model: '1. **Delay in action:** communication must follow the **scalar chain**, so decisions can be slow.\n2. **Ignores the human side:** it looks only at **jobs and rules**, not at people\'s feelings, talents and social needs, and it can discourage creativity.',
  sol: 'Any two limitations (delays, lack of initiative, ignores social needs, rigidity) explained.',
  scheme: [['First limitation', 1], ['Second limitation', 1]],
}));
Q('s_informal', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'At an imagined bank branch in Thrissur, clerks who belong to the same choir often settle small problems over tea instead of waiting for official meetings. Identify the type of organisation and state one benefit and one risk of it.',
  model: '**Informal organisation.** **Benefit:** problems are solved **faster** and staff feel a sense of belonging. **Risk:** the group may spread **rumours** or resist decisions it dislikes.',
  sol: 'Type identified with one benefit and one risk.',
  scheme: [['Type with benefit', 1], ['Risk', 1]],
}));
Q('s3_formal_informal', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Distinguish between formal and informal organisation on three bases: origin, purpose and flow of communication.',
  model: '1. **Origin:** formal organisation is **deliberately created by management**; informal organisation **arises on its own** from social interaction.\n2. **Purpose:** formal aims at **organisational goals**; informal meets members\' **social and personal needs**.\n3. **Flow of communication:** formal communication follows the **scalar chain**; informal communication moves **in any direction**, often through the grapevine.',
  sol: 'Three bases of difference.',
  scheme: [['Origin', 1], ['Purpose', 1], ['Communication', 1]],
}));
Q('s3_informal_merits', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Explain three ways in which the informal organisation at the imagined Gwalior Stone Carvers could help its management.',
  model: '1. **Faster communication:** news travels quickly through the **grapevine**, so urgent messages reach everyone fast.\n2. **Meets social needs:** groups such as the **chess club** give carvers a sense of belonging, raising morale and reducing turnover.\n3. **Fills gaps in the formal structure:** experienced carvers **help newcomers** and solve problems that written rules do not cover, and managers can sense workers\' feelings through these groups.',
  sol: 'Three benefits applied to the firm.',
  scheme: [['First benefit', 1], ['Second benefit', 1], ['Third benefit', 1]],
}));

// ================================================================ t04 Delegation of authority
Q('m_delegation', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'The owner of the imagined Udupi Tiffin Rooms allows her head cashier, Prakash, to approve refunds to customers up to a fixed amount without asking her. This is an example of',
  opts: ['delegation of authority', 'centralisation', 'informal organisation', 'departmentalisation'],
  sol: 'Passing on to a subordinate the authority to make certain decisions is delegation of authority.',
}));
Q('m_accountability', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'Prakash, the head cashier of the imagined Udupi Tiffin Rooms, wrongly approves a large refund. The partners ask the owner, not Prakash, to explain the loss to them. Which element of delegation explains why the owner must answer?',
  opts: ['Accountability cannot be delegated', 'Authority cannot be delegated', 'Responsibility flows downward', 'Decentralisation is compulsory'],
  sol: 'A manager may pass on authority, but she remains answerable to her own superiors for the final result: accountability cannot be delegated.',
}));
Q('m_responsibility', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'When the owner of the imagined Udupi Tiffin Rooms gives Prakash the job of closing the cash counter each night, Prakash takes on the obligation to do it properly. This obligation is called',
  opts: ['responsibility', 'authority', 'accountability', 'decentralisation'],
  sol: 'The duty of a subordinate to carry out an assigned task properly is responsibility.',
}));
Q('m_authority', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'The kitchen supervisor of the imagined Udupi Tiffin Rooms has the right to decide the order in which dishes are prepared and to instruct the cooks. This right is called',
  opts: ['authority', 'responsibility', 'accountability', 'the grapevine'],
  sol: 'The right to take decisions and give orders within one\'s area is authority.',
}));
Q('m_deleg_imp', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'After passing the daily ordering of ice and crates to her assistant, the owner of the imagined Karwar Fisheries now spends her time meeting export buyers. Which importance of delegation does this show?',
  opts: ['It frees managers from routine work for more important tasks', 'It removes the manager\'s accountability', 'It makes the firm fully centralised', 'It replaces planning'],
  sol: 'Delegating routine work lets managers concentrate on important matters such as new markets, which makes management more effective.',
}));
Q('ar_deleg', ar({
  t: 4, d: 3, c: 'understanding',
  a: 'Authority should be delegated in proportion to the responsibility given.',
  r: 'A person cannot be expected to complete a task without the power to take the decisions it needs.',
  key: 'a',
  sol: 'Both are true, and the reason explains the assertion: responsibility without matching authority makes the task impossible to complete.',
}));
Q('tf_deleg', tf({
  t: 4, d: 2, c: 'understanding',
  stem: 'In delegation, authority flows downward from superior to subordinate, while accountability flows upward from subordinate to superior.',
  ans: true,
  sol: 'True. The superior passes authority down; the subordinate answers upward for how it was used.',
}));
Q('s_elements', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain authority and accountability as elements of delegation.',
  model: '1. **Authority:** the **right to take decisions** and give orders within a defined area; it **flows downward** and should match the responsibility given.\n2. **Accountability:** being **answerable** to the superior for the result of the task; it **flows upward** and **cannot be delegated**.',
  sol: 'Both elements explained.',
  scheme: [['Authority', 1], ['Accountability', 1]],
}));
Q('s3_deleg_imp', short({
  t: 4, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'The owner of the imagined Karwar Fisheries has begun delegating authority to her three supervisors. Explain three benefits she and the firm can expect.',
  model: '1. **Effective management:** freed from **routine orders**, the owner can focus on export buyers and new markets.\n2. **Employee development:** supervisors learn to **take decisions**, building skills for higher posts.\n3. **Motivation and better coordination:** trust and authority **raise supervisors\' morale**, and clear authority, responsibility and accountability show who handles what, so work moves smoothly.',
  sol: 'Three benefits of delegation applied to the firm.',
  scheme: [['First benefit', 1], ['Second benefit', 1], ['Third benefit', 1]],
}));
Q('l_deleg', long({
  t: 4, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'The owner of the imagined Udupi Tiffin Rooms tells her new manager, Divya: "You will run the evening shift. You may hire part-time servers and buy vegetables up to a weekly limit. Each Monday, report to me on sales and complaints."\n(a) Identify the three elements of delegation in these instructions and explain each. [3]\n(b) Explain two ways in which this delegation is important for the restaurant. [2]',
  model: '(a) 1. **Responsibility:** "**You will run the evening shift**" — Divya is **obliged** to carry out this task properly.\n2. **Authority:** "**hire part-time servers and buy vegetables up to a weekly limit**" — she has the **right to decide** within these limits.\n3. **Accountability:** "**report to me on sales and complaints**" — she is **answerable** to the owner for the results, though the owner stays answerable to the partners.\n\n(b) 1. **Frees the owner:** she can spend time on **new outlets** and suppliers instead of running every shift.\n2. **Develops and motivates Divya:** taking real decisions builds her **skills and confidence**, preparing her for higher posts.',
  sol: 'Three elements identified from the instructions; two points of importance.',
  scheme: [['(a) Three elements', 3], ['(b) Two points of importance', 2]],
}));

// ================================================================ t05 Centralisation and decentralisation
Q('m_central', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'At the imagined Siliguri Tea Traders, the managing director personally decides every purchase, every price and even each employee\'s leave, although the firm has ten branches. This is an example of',
  opts: ['centralisation', 'decentralisation', 'delegation to the lowest level', 'informal organisation'],
  sol: 'Keeping decision-making authority at the top, with little passed down, is centralisation.',
}));
Q('m_decentral', mcq({
  t: 5, d: 3, c: 'application',
  stem: 'Each of the four regional depots of the imagined Erode Turmeric Traders fixes its own buying prices and hires its own loaders, within limits set by head office. This shows',
  opts: ['decentralisation', 'centralisation', 'unity of command', 'informal organisation'],
  sol: 'Systematically spreading decision-making authority to lower levels across the organisation, within limits, is decentralisation.',
}));
Q('m_deleg_vs_dec', mcq({
  t: 5, d: 3, c: 'analysis', fixed: true, key: 'b',
  stem: 'A student at an imagined school in Ujjain writes four statements:\nP. Delegation is compulsory in any organisation where a manager cannot do all the work alone.\nQ. Decentralisation is an optional policy decision of top management.\nR. Delegation and decentralisation have exactly the same scope.\nS. Decentralisation extends delegation to the lowest levels of the organisation.\nWhich statements are correct?',
  opts: ['P and R only', 'P, Q and S', 'Q and R only', 'P, Q, R and S'],
  sol: 'P, Q and S are correct. R is wrong: delegation is between a superior and a subordinate, while decentralisation spreads authority across the whole organisation, so its scope is wider.',
}));
Q('ar_decentral', ar({
  t: 5, d: 3, c: 'analysis',
  a: 'Decentralisation is an optional policy decision of top management.',
  r: 'Decentralisation means delegating authority only to the managing director.',
  key: 'c',
  sol: 'The assertion is true. The reason is false: decentralisation spreads authority systematically to all levels, down to the lowest, not just to one person.',
}));
Q('tf_decentral', tf({
  t: 5, d: 2, c: 'understanding',
  stem: 'Under decentralisation, top management gives away all its authority and keeps none.',
  ans: false,
  sol: 'False. Top management keeps authority over major decisions such as overall policy and coordination; complete decentralisation is neither possible nor desirable.',
}));
Q('fb_decentral', fb({
  t: 5, d: 2, c: 'understanding',
  stem: 'Complete the analogy. Delegation : compulsory :: Decentralisation : ___',
  acc: [['optional', 'an optional policy decision', 'optional policy']],
  sol: 'Delegation is compulsory, since no manager can do all the work alone; decentralisation is an optional policy decision of top management.',
}));
Q('mt_central', match({
  t: [4, 5], d: 3, c: 'application', marks: 2,
  stem: 'Match each situation at the imagined Erode Turmeric Traders with the concept it shows.',
  pairs: [
    ['Before the depots were set up, the owner alone decided all prices and hiring', 'Centralisation'],
    ['Depots now fix buying prices within limits set by head office', 'Decentralisation'],
    ['A depot supervisor lets a clerk sign delivery notes', 'Delegation'],
    ['The supervisor still answers to the depot head for any errors in those notes', 'Accountability'],
  ],
  sol: 'All decisions at the top is centralisation; authority spread to depots is decentralisation; passing one task down is delegation; remaining answerable is accountability.',
}));
Q('s_deleg_dec', short({
  t: 5, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between delegation and decentralisation on two bases.',
  model: '1. **Nature:** delegation is **compulsory**, since no manager can do all the work alone; decentralisation is an **optional policy decision** of top management.\n2. **Scope:** delegation is **narrow**, between a superior and a subordinate; decentralisation is **wide**, spreading authority across **all levels**.',
  sol: 'Two valid bases (nature, scope, freedom of action, status, purpose).',
  scheme: [['First basis', 1], ['Second basis', 1]],
}));
Q('s3_decentral', short({
  t: 5, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'The imagined Erode Turmeric Traders has given its four regional depots the authority to fix buying prices and hire staff. Explain three benefits it can expect from decentralisation.',
  model: '1. **Quicker decisions:** depot heads can **respond at once** to local crop prices without waiting for head office.\n2. **Develops managers:** depot heads gain **experience in decision making**, preparing them for top posts.\n3. **Relief to top management and better control:** head office is freed to focus on **exports and strategy**, and each depot\'s results can be **measured** separately.',
  sol: 'Three benefits applied to the trader.',
  scheme: [['First benefit', 1], ['Second benefit', 1], ['Third benefit', 1]],
}));
Q('s3_central', short({
  t: 5, d: 3, c: 'evaluation', marks: 3, wl: S3,
  stem: 'The managing director of the imagined Siliguri Tea Traders, which now has ten branches, still decides everything himself. Evaluate whether this complete centralisation suits the firm, giving three points.',
  model: '1. **Delays:** branches must **wait for his approval** on small matters, so customers and chances are lost.\n2. **Overload and weak managers:** he is **overburdened**, and branch heads never learn to take decisions, so the firm has no **successors**.\n3. **Some central control is still needed:** overall **pricing policy** and finance should stay with him. **Verdict:** complete centralisation does **not** suit a ten-branch firm; it should decentralise routine decisions and keep key ones central.',
  sol: 'Three points leading to a balanced verdict.',
  scheme: [['First point', 1], ['Second point', 1], ['Third point with verdict', 1]],
}));
Q('l_decentral', long({
  t: [5, 4], d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'The imagined Siliguri Tea Traders, with ten branches across north Bengal and Sikkim, is losing customers because branch managers must ask head office before every small decision.\n(a) Distinguish between centralisation and decentralisation on two bases. [2]\n(b) Evaluate whether the firm should decentralise, and say what authority it should keep at the centre. [3]',
  model: '(a) 1. **Meaning:** centralisation **keeps decision-making authority at the top**; decentralisation **spreads it systematically** to lower levels.\n2. **Speed and suitability:** centralisation suits **small** firms but slows decisions as a firm grows; decentralisation allows **quick local decisions** in large, spread-out firms.\n\n(b) **Yes, it should decentralise.** Branch managers know **local buyers** and can act at once on prices, stock and staff, so customers will not be lost to delay. They will also **gain experience** and become future leaders, and head office will be freed for **strategy**.\n**Keep at the centre:** overall **pricing policy**, major **investments**, the **brand** and finance, so that branches stay coordinated. A **balance** between the two is best.',
  sol: 'Two bases of difference; a reasoned verdict for decentralisation with what to keep central.',
  scheme: [['(a) Two bases', 2], ['(b) Verdict with reasons', 2], ['(b) What to keep central', 1]],
}));

// ================================================================ case-based
Q('cb_bokaro', caseQ({
  t: 3, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined firm and people, written by SOYL for practice.)*',
  passage: '**Bokaro Engineering Works (imagined), Jharkhand**\n\nBokaro Engineering Works has a written job description for every post and an official chart showing who reports to whom. Requests for tools must pass through the supervisor and the shop manager, which can take two days. Many fitters play football together on Sundays. When the night shift had a breakdown, a fitter from the football team came in to help without being asked. Last month, a false story that the plant would close spread among workers within hours and caused panic.',
  parts: [
    child('a', mcq({ t: 3, d: 2, c: 'application', stem: 'The written job descriptions and the official chart are features of', opts: ['formal organisation', 'informal organisation', 'the grapevine', 'decentralisation'], sol: 'Written duties and an official chart are deliberately designed by management: formal organisation.' })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Name the limitation of formal organisation shown by the two-day wait for tools.', model: '**Delay in action** (because communication must follow the scalar chain).', sol: 'Following every link in the chain slows action.', scheme: [['Delay in action', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify one benefit and one limitation of informal organisation from the passage, quoting the words.', model: '**Benefit:** "**a fitter from the football team came in to help without being asked**" — informal ties fill gaps in the formal system.\n**Limitation:** "**a false story ... spread among workers within hours**" — the grapevine spreads rumours.', sol: 'One benefit and one limitation with supporting words.', scheme: [['Benefit with words', 1], ['Limitation with words', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Suggest two ways in which managers could use the informal organisation to their advantage.', model: '1. Pass **correct news quickly** through respected informal leaders, such as the football captain, to stop rumours.\n2. Use the groups to **sense workers\' feelings** before introducing changes.', sol: 'Two sensible ways.', scheme: [['First way', 1], ['Second way', 1]] }),
    ]),
  ],
}));
Q('cb_karwar', caseQ({
  t: [4, 5], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined firm and people, written by SOYL for practice.)*',
  passage: '**Karwar Fisheries (imagined), Karnataka**\n\nKarwar Fisheries buys fish from boats and supplies hotels. Its owner, Rehana, used to decide everything. Now she lets her assistant order ice and crates each day, and tells him that he must report any shortage to her by evening. She has also set up three collection centres along the coast; each centre head may now fix the day\'s buying price within a range she sets and may hire helpers for the season. Rehana still decides which hotels to supply and how much to borrow from the bank.',
  parts: [
    child('a', mcq({ t: 4, d: 2, c: 'application', stem: 'Allowing the assistant to order ice and crates each day is an example of', opts: ['delegation of authority', 'centralisation', 'informal organisation', 'departmentalisation'], sol: 'Passing on authority for a particular task to a subordinate is delegation.' })),
    child('b', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Which element of delegation is shown by "he must report any shortage to her by evening"?', model: '**Accountability.**', sol: 'Being answerable to the superior for results is accountability.', scheme: [['Accountability', 1]] })),
    child('c', short({ t: 5, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Has Rehana decentralised her business? Explain with reference to the passage.', model: '**Yes, partly.** Centre heads may "**fix the day\'s buying price within a range**" and "**hire helpers**", so authority is spread to lower levels. But **key decisions** — hotels and borrowing — stay with her, a **balance** of centralisation and decentralisation.', sol: 'A judgement supported by the passage.', scheme: [['Judgement with evidence of decentralisation', 1], ['What remains central', 1]] }), [
      short({ t: 5, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): State two benefits Karwar Fisheries may gain from giving authority to its centre heads.', model: '1. **Quicker decisions** on buying prices as boats land.\n2. **Development** of centre heads and **relief** for Rehana, who can focus on hotel buyers and finance.', sol: 'Two benefits linked to the case.', scheme: [['First benefit', 1], ['Second benefit', 1]] }),
    ]),
  ],
}));
