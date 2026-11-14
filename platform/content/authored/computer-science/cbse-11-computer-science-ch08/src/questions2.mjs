// CBSE 11 Computer Science, ch08 Society, Law and Ethics — question bank, part 2 (topics t03 and t04).
// Imagined students, schools, shops and messages only. No real incident, court case, section number, penalty or term of
// imprisonment is cited; the IT Act is described by purpose and scope. Counts and arithmetic come from the constants
// in questions.mjs and are asserted there.
import { Q, mcq, ar, tf, fb, match, ord, short, long, caseQ, child } from './lib.mjs';
import { W, distinct, LAB, BREAK } from './questions.mjs';

// ================================================================ t03 cyber crime, cyber safety, malware, IT Act
Q('m_hack', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Gaining access to a computer system or network without the owner\'s permission is called',
  opts: distinct(['hacking', 'netiquette', 'plagiarism', 'data backup']),
  sol: 'Unauthorised access is hacking in its criminal sense. The other terms concern polite behaviour, copying of work and protection of data.',
}));
Q('m_eaves', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Secretly capturing messages while they travel across a shared network, for example from users of an unprotected Wi-Fi hotspot, is called',
  opts: distinct(['eavesdropping', 'ransomware', 'adware', 'cyber trolling']),
  sol: 'Listening in on data in transit without the knowledge of the sender or receiver is eavesdropping. Ransomware and adware are kinds of malware, and trolling is posting provoking messages.',
}));
Q('m_phish_scn', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Rahul receives an e-mail that seems to come from his bank. The sender address misspells the bank\'s name, the message says the account will be shut today, and a link asks for his net-banking password. This is',
  opts: distinct(['phishing', 'eavesdropping', 'cyber bullying', 'a copyright claim']),
  sol: 'A fake message that imitates a trusted organisation to collect log-in details is phishing. The misspelt sender, the false urgency and the request for a password are its typical signs.',
}));
Q('m_ransom_scn', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Every file on a clinic\'s computer suddenly becomes unreadable and a screen asks for a payment to get them back. The harmful software responsible is',
  opts: distinct(['ransomware', 'adware', 'spyware', 'a firewall']),
  sol: 'Software that locks or encrypts files and demands money for their release is ransomware. Adware only shows advertisements and spyware watches in secret, and a firewall is a protective tool.',
}));
Q('m_bully_scn', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'For several weeks some classmates have sent hurtful messages to Sana and have made a group chat to mock her photograph. This behaviour is best called',
  opts: distinct(['cyber bullying', 'phishing', 'trademark infringement', 'eavesdropping']),
  sol: 'Repeated harassment of a person through digital means is cyber bullying. It is aimed at one person over time and is not a theft of log-in details or of a brand.',
}));
Q('m_trojan_scn', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'Aman downloads a free photo editor from an unknown website. The editor works, but it also quietly lets an outsider control his computer. This program is a',
  opts: distinct(['Trojan', 'worm', 'piece of adware', 'phishing page']),
  sol: 'A Trojan looks like useful software but hides harmful functions. A worm would copy itself across the network, and adware would mainly display advertisements.',
}));
Q('m_worm', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'What mainly separates a worm from an ordinary virus?',
  opts: distinct([
    'A worm can copy itself and spread across a network on its own, without needing a host file',
    'A worm cannot spread from one computer to another',
    'A worm only shows pop-up advertisements',
    'A worm needs the user to open an attachment every time it spreads',
  ]),
  sol: 'A virus rides inside files and spreads when they are run or shared. A worm is independent and propagates by itself through the network.',
}));
Q('m_itact_scn', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'An online shop and a customer complete a purchase by exchanging electronic records signed with digital signatures. Which Indian law gives such electronic records and signatures legal recognition?',
  opts: distinct(['The Information Technology Act, 2000 (amended in 2008)', 'The Copyright Act', 'The Patents Act', 'The Trade Marks Act']),
  sol: 'Legal recognition of electronic records and digital signatures is one of the main purposes of the IT Act. The other Acts deal with creative works, inventions and brand marks.',
}));
Q('m_safe_browse', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Which habit is part of safe browsing?',
  opts: distinct([
    'Checking that the web address is spelt correctly and uses a secure connection before typing a password',
    'Clicking every link that arrives from unknown senders to see where it leads',
    'Downloading software from any site that offers it free',
    'Switching off the antivirus program because it slows the computer',
  ]),
  sol: 'Looking carefully at the address and the secure-connection sign stops many fake pages. The other habits invite malware or switch off a protection.',
}));
Q('m_identity', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'A caller says he is from the bank and asks Pooja for the OTP that has just arrived on her phone. To protect her identity and money she should',
  opts: distinct([
    'refuse to share the OTP and end the call, since a bank never needs it from the customer',
    'share the OTP, since the caller already knows her name',
    'share only the first half of the OTP',
    'ask the caller to repeat it and then give it',
  ]),
  sol: 'An OTP is a secret that proves the user\'s identity, so it must never be told to anyone. Knowing her name proves nothing, and a half code can still help a fraudster.',
}));
Q('ar_malware', ar({
  t: 3, d: 2, c: 'understanding', key: 'b',
  a: 'Ransomware is a kind of malware.',
  r: 'A computer virus attaches itself to other files and spreads when they are run or shared.',
  sol: 'Both are true, but the way a virus spreads does not explain why ransomware counts as malware; ransomware is malware because it is harmful software, whatever it does.',
}));
Q('ar_worm', ar({
  t: 3, d: 3, c: 'analysis', key: 'c',
  a: 'A worm can spread across a network without any host file.',
  r: 'A worm needs a user to run a host program every time it moves to a new computer.',
  sol: 'A is true. R is false: needing no help from the user and no host file is exactly what lets a worm travel by itself.',
}));
Q('ar_ransom', ar({
  t: 3, d: 3, c: 'analysis', key: 'd',
  a: 'Paying the ransom guarantees that the victim gets all the files back.',
  r: 'Regular backups kept apart from the computer allow a victim to restore the files without paying.',
  sol: 'A is false, because the attackers are criminals and may not release the files even after payment. R is true and is the reason backups are advised.',
}));
Q('tf_antivirus', tf({
  t: 3, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Once antivirus software is installed, a computer is completely safe and the user need not take any other care.',
  sol: 'Antivirus tools reduce risk but cannot stop a user from handing over a password, installing a Trojan knowingly or being deceived by a phishing page. Careful habits and updates are also needed.',
}));
Q('fb_ransom', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'Malware that locks or encrypts a victim\'s files and demands payment to unlock them is called ___.',
  acc: [['ransomware']],
  sol: 'Ransomware joins ransom and software: the files are held hostage until money is paid.',
}));
Q('mt_malware', match({
  t: 3, d: 2, c: 'understanding',
  stem: 'Match each kind of malware found on a shared school computer with its behaviour.',
  pairs: [
    ['Virus', 'Attaches itself to other files and spreads when they are run or shared'],
    ['Worm', 'Copies itself across a network on its own'],
    ['Trojan', 'Harmful program disguised as useful software'],
    ['Spyware', 'Secretly watches what the user does and reports it'],
  ],
  sol: 'Each name matches its way of working: a virus needs a host file, a worm travels by itself, a Trojan hides behind a useful look and spyware keeps watch.',
}));
Q('ord_incident', ord({
  t: 3, d: 3, c: 'application', marks: 2,
  stem: 'Farhan receives an e-mail asking for his bank details. Arrange, in a sensible order, the steps he should take.',
  items: [
    'Stop and do not click the link or open the attachment',
    'Look at the sender address and the wording for warning signs',
    'Report the message as phishing and tell the bank or a trusted adult',
    'Delete the message and block the sender',
  ],
  sol: 'He must first avoid any action that could harm him, then examine the message, then report it so that others can be warned, and finally remove it.',
}));
Q('s2_phish_signs', short({
  t: 3, d: 2, c: 'application', marks: 2,
  stem: 'List two warning signs by which Anjali can recognise a phishing e-mail that claims to come from her school.',
  model: 'The sender address may be slightly misspelt or from a strange domain, and the message may create urgency or threaten to close her account. It may also ask for a password or OTP, or contain spelling errors and an unexpected link.',
  sol: 'One mark for each valid warning sign. Any two different signs are accepted.',
  scheme: [['First warning sign', 1], ['Second warning sign', 1]],
}));
Q('s2_hack_ethical', short({
  t: 3, d: 2, c: 'understanding', marks: 2,
  stem: 'Differentiate between an ethical hacker and a malicious hacker.',
  model: 'An ethical hacker tests a system with the owner\'s permission to find weaknesses so that they can be fixed. A malicious hacker enters a system without permission to steal, damage or misuse data.',
  sol: 'One mark for each kind of hacker with the key difference of permission and purpose.',
  scheme: [['Ethical hacker: permission and fixing', 1], ['Malicious hacker: no permission, harm', 1]],
}));
Q('s2_virus_worm', short({
  t: 3, d: 2, c: 'understanding', marks: 2,
  stem: 'Distinguish between a computer virus and a worm.',
  model: 'A virus attaches itself to a host file or program and spreads when that file is run or shared. A worm is a stand-alone program that copies itself and spreads through a network without any host file.',
  sol: 'One mark for the virus with its host dependence and one for the worm with its independent spread.',
  scheme: [['Virus needs a host file', 1], ['Worm spreads by itself over a network', 1]],
}));
Q('s2_itact', short({
  t: 3, d: 2, c: 'understanding', marks: 2,
  stem: 'State any two purposes of the Information Technology Act, 2000 of India.',
  model: 'It gives legal recognition to electronic records and digital signatures, so that e-contracts and online transactions are valid. It also defines cyber offences and provides ways to decide disputes and hear appeals, through adjudication and an appellate tribunal (set up as the Cyber Appellate Tribunal; its work passed to the Telecom Disputes Settlement and Appellate Tribunal in 2017).',
  sol: 'One mark for each correct purpose stated.',
  scheme: [['Legal recognition of electronic records and digital signatures', 1], ['Cyber offences and a way to adjudicate and appeal', 1]],
}));
Q('s3_malware_types', short({
  t: 3, d: 3, c: 'understanding', marks: 3,
  stem: 'Explain what a virus, a Trojan and adware each do to a computer.',
  model: '1. A virus attaches itself to files and spreads when they are run or shared, and may damage data.\n2. A Trojan pretends to be useful software but secretly performs harmful actions such as giving an outsider control.\n3. Adware shows unwanted advertisements, usually as pop-ups, and may slow the computer.',
  sol: 'One mark for each kind of malware correctly explained.',
  scheme: [['Virus', 1], ['Trojan', 1], ['Adware', 1]],
}));
Q('s3_itact_scope', short({
  t: 3, d: 3, c: 'understanding', marks: 3,
  stem: 'Describe three areas that the Information Technology Act, 2000 (amended 2008) covers.',
  model: '1. It recognises electronic records and digital signatures as legally valid, which supports e-governance and online business.\n2. It defines cyber offences, such as unauthorised access to computers and misuse of identity, and lays down penalties for them.\n3. It provides for adjudication of disputes and an appellate tribunal for appeals (set up as the Cyber Appellate Tribunal; since 2017 the Telecom Disputes Settlement and Appellate Tribunal hears them).',
  sol: 'One mark for each area described. Exact section numbers or penalties are not required.',
  scheme: [['Legal recognition', 1], ['Cyber offences and penalties', 1], ['Adjudication and appeal', 1]],
}));
Q('l_cybercrime', long({
  t: 3, d: 3, c: 'application', marks: 5,
  stem: 'Explain hacking, eavesdropping, phishing, ransomware and cyber bullying. For each give one precaution that a student can follow.',
  model: '**Hacking** is entering a system without permission; use strong passwords and keep software updated.\n\n**Eavesdropping** is secretly capturing data in transit, for example on an open Wi-Fi hotspot; avoid sensitive log-ins on unsecured networks.\n\n**Phishing** is a fake message or page that imitates a trusted organisation to steal details; check the sender and address and never share passwords or OTPs.\n\n**Ransomware** locks files and demands payment; keep offline backups and avoid unknown attachments.\n\n**Cyber bullying** is repeated online harassment of a person; do not reply, save the evidence, block the sender and tell a trusted adult.',
  sol: 'One mark for each crime explained with its precaution.',
  scheme: [['Hacking with precaution', 1], ['Eavesdropping with precaution', 1], ['Phishing with precaution', 1], ['Ransomware with precaution', 1], ['Cyber bullying with precaution', 1]],
}));
Q('l_cybersafety_itact', long({
  t: 3, d: 4, c: 'analysis', marks: 5,
  stem: 'Why is the law important in dealing with cyber crime? Explain the purpose of the Information Technology Act, 2000 (amended 2008), and describe how safe browsing, identity protection and confidentiality reduce a user\'s risk.',
  model: 'Cyber crimes cross borders and leave digital evidence, so ordinary rules about paper records were not enough; a specific law was needed.\n\nThe **IT Act, 2000 (amended 2008)** gives legal recognition to electronic records and digital signatures, defines cyber offences with penalties, and provides adjudication and an appellate tribunal for disputes.\n\nA user\'s own care still matters. **Safe browsing** means checking addresses and secure connections and downloading only from trusted sources. **Identity protection** means never sharing passwords, OTPs or ID numbers. **Confidentiality** means that personal information is seen only by those who are authorised, for example through privacy settings.\n\nLaw punishes offenders after the event, while these habits prevent the harm.',
  sol: 'Marks for the need for a law, the three purposes of the Act, the three safety ideas and the concluding contrast between law and personal care.',
  scheme: [['Need for a specific law', 1], ['Purposes of the IT Act', 1], ['Safe browsing and identity protection', 1], ['Confidentiality', 1], ['Contrast between law and personal precautions', 1]],
}));
Q('cb_phish', caseQ({
  t: 3, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read about Farhan\'s message and answer the questions. *(Imagined student, bank and message, written by SOYL for practice.)*',
  passage: 'Farhan, a Class 11 student, gets an e-mail that looks like it came from his father\'s bank (an imagined bank). The sender address misspells the bank\'s name by one letter. The message says: "Your account will be blocked in two hours. Click the link and enter your password and OTP to keep it active." The link leads to a page that looks like the bank\'s home page, but its address is unlike the bank\'s usual one.',
  parts: [
    child('a', mcq({ t: 3, d: 2, c: 'application', fixed: true, key: 'd', stem: 'The cyber crime that Farhan has received is', opts: ['eavesdropping', 'ransomware', 'a worm', 'phishing'], sol: 'A fake message and page that imitate a trusted bank to collect a password and an OTP make up a phishing attempt. No data was captured in transit, no files were locked and nothing copied itself.' })),
    child('b', fb({ t: 3, d: 2, c: 'understanding', stem: 'The warning sign in the message that tries to hurry Farhan into acting without thinking is the false ___.', acc: [['urgency', 'deadline', 'threat']], sol: 'The claim that the account will be blocked in two hours is a false urgency, meant to stop him from checking the message.' })),
    child('c', short({ t: 3, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Write two things Farhan should do now, and one thing he should never do.', model: 'He should not click the link, and should report the e-mail to the bank and tell his father. He should delete it and block the sender. He must never enter the password or OTP on that page.', sol: 'One mark for two sound actions and one mark for the thing never to do.', scheme: [['Two sound actions', 1], ['Never enter the password or OTP', 1]] }), [
      short({ t: 3, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Suppose Farhan has already typed his password on the page. Name two steps he should take immediately.', model: 'He should change the password of the account at once, using the real bank app or a trusted device, and inform the bank so that the account can be watched or blocked. He should also change the same password anywhere else it is used.', sol: 'One mark for each immediate and useful step.', scheme: [['First step', 1], ['Second step', 1]] }),
    ]),
  ],
}));

// ================================================================ t04 e-waste, health, technology and society
Q('m_ewaste_hazard', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Why is burning old circuit boards in an open field a bad way to get rid of e-waste?',
  opts: distinct([
    'It releases toxic fumes and metals that harm health and pollute air, soil and water',
    'It makes the devices work again',
    'It produces no smoke or gases',
    'It is the approved method of recycling',
  ]),
  sol: 'Circuit boards contain metals and plastics that give off poisonous smoke when burnt, and the ash can seep into soil and water. Safe handling needs authorised recyclers.',
}));
Q('m_3r_scn', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Anil gives his working but outgrown tablet to his younger cousin instead of throwing it away. Which of the three Rs of e-waste management does this show?',
  opts: distinct(['Reuse', 'Recycle', 'Reduce', 'Dump']),
  sol: 'Passing a working device on for further use is reuse. Reduce would be buying fewer devices, and recycling would mean breaking it down to recover materials.',
}));
Q('m_recycler', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'A school lab has monitors that can no longer be repaired. The most responsible way to dispose of them is to',
  opts: distinct([
    'hand them over to an authorised e-waste collector or recycler',
    'put them out with the ordinary school rubbish',
    'bury them in the playground',
    'burn them behind the lab',
  ]),
  sol: 'Authorised recyclers have safe methods to recover materials and to treat the harmful parts. Burying or burning leaves toxic substances in the environment.',
}));
Q('m_ergo', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'Devika works on a laptop for long hours with her neck bent over the screen. Which change would best reduce her neck and back strain?',
  opts: distinct([
    'Raise the screen to eye level, support the back and take short breaks',
    'Lie on the bed and rest the laptop on the knees',
    'Keep the screen as low as possible',
    'Work with the lights switched off',
  ]),
  sol: 'A screen at eye level and a supported back keep the spine and neck in a natural position, and breaks relieve the muscles. Lying down or looking down strains them more.',
}));
Q('m_addict', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'Which of these is a warning sign of internet addiction?',
  opts: distinct([
    'Missing sleep, meals and studies because of being online, and feeling restless without the device',
    'Looking up a homework topic for twenty minutes and then logging off',
    'Watching a recorded lecture to revise a chapter',
    'Video-calling relatives on Sunday',
  ]),
  sol: 'Addiction shows as loss of control that harms sleep, health and work, with restlessness when offline. Planned, useful and limited use is healthy.',
}));
Q('m_disability', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Which of these helps a student who is blind to use a computer on her own?',
  opts: distinct(['A screen reader that speaks out the text on the screen', 'A larger mouse pad', 'A brighter wallpaper', 'A louder cooling fan']),
  sol: 'A screen reader turns on-screen text into speech, which gives access to the content. The other items do not change what a blind user can perceive.',
}));
Q('m_inclusive', mcq({
  t: 4, d: 3, c: 'understanding',
  stem: 'Inclusive design of a learning website means',
  opts: distinct([
    'making it usable by people of different abilities, for example with captions on videos and text descriptions of images',
    'using a different font on each page so that it looks lively',
    'making it open only for users who have a fast connection',
    'removing all pictures and sound',
  ]),
  sol: 'Inclusive design plans for the widest range of users from the start. Captions help people who cannot hear, and text descriptions help those who cannot see the images.',
}));
Q('ar_ewaste', ar({
  t: 4, d: 2, c: 'understanding', key: 'a',
  a: 'Dumping old mobile phones with household garbage harms the environment.',
  r: 'The parts of old phones can contain toxic substances that leak into soil and water.',
  sol: 'Both are true and R is the reason for A: harmful substances escaping from dumped phones are what damage soil and water.',
}));
Q('tf_break', tf({
  t: 4, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? Short breaks in which a person looks at faraway objects can reduce digital eye strain.',
  sol: 'Looking at distant things relaxes the eye muscles that stay tense while focusing on a screen, so regular breaks lessen tiredness and dryness.',
}));
Q('fb_3r', fb({
  t: 4, d: 1, c: 'recall',
  stem: `The ${W(3)} Rs of e-waste management are reduce, ___ and recycle.`,
  acc: [['reuse', 're-use']],
  sol: 'Reduce what is bought, reuse what still works and recycle what cannot be used any more.',
}));
Q('ord_ewaste', ord({
  t: 4, d: 2, c: 'application', marks: 2,
  stem: 'A club wants to cut down its e-waste. Arrange its actions from the most preferred to the last resort.',
  items: [
    'Think whether a new device is needed at all',
    'Repair or upgrade the old device',
    'Pass a working device on to someone who can use it',
    'Hand a dead device to an authorised recycler',
  ],
  sol: 'Not creating waste is best, then extending the device\'s life, then giving it a second user, and recycling is the last resort for devices that cannot be used.',
}));
Q('s2_breaks', short({
  t: 4, d: 3, c: 'application', marks: 2,
  stem: `Under the 20-20-20 habit a person looks at something far away for twenty seconds after every ${BREAK.every} minutes of screen work. How many such breaks should Yash take in a ${BREAK.session}-minute online class, and why does the habit help?`,
  model: `${BREAK.session} minutes divided by ${BREAK.every} minutes gives ${BREAK.count} breaks. Looking at a distant object relaxes the eye muscles that stay tense while focusing on a near screen, which reduces eye strain.`,
  sol: 'One mark for the number of breaks with the division shown and one mark for the reason.',
  scheme: [['Number of breaks with working', 1], ['Reason for the habit', 1]],
}));
Q('s2_3r', short({
  t: 4, d: 2, c: 'understanding', marks: 2,
  stem: 'Explain the terms reduce and reuse in the management of e-waste, with an example of each.',
  model: 'To reduce is to cut down the waste created, for example by buying only the devices that are really needed. To reuse is to keep using a device that still works, for example by repairing a phone or passing it on to another user.',
  sol: 'One mark for each term explained with a fitting example.',
  scheme: [['Reduce with example', 1], ['Reuse with example', 1]],
}));
Q('s2_assistive', short({
  t: 4, d: 2, c: 'application', marks: 2,
  stem: 'What is assistive technology? Give two examples that help students with different disabilities.',
  model: 'Assistive technology is hardware or software that helps people with disabilities to use computers and do tasks. Examples are a screen reader for a blind student and captions or speech-to-text for a student who is deaf.',
  sol: 'One mark for the meaning and one mark for two correct examples.',
  scheme: [['Meaning', 1], ['Two examples', 1]],
}));
Q('s3_ewaste_hazard', short({
  t: 4, d: 3, c: 'understanding', marks: 3,
  stem: 'Describe three hazards of improper disposal of e-waste and one safe way of managing it.',
  model: '1. Burning e-waste gives off toxic fumes that harm the lungs and pollute the air.\n2. Metals such as lead and mercury can leak into soil and groundwater and enter the food chain.\n3. Workers who break up devices without protection can suffer health problems.\nSafe management: send unusable devices to an authorised recycler.',
  sol: 'One mark for each hazard and a mark for the safe method, with the total capped at three marks.',
  scheme: [['Two hazards', 1], ['Third hazard', 1], ['Safe method of management', 1]],
}));
Q('l_ewaste_health', long({
  t: 4, d: 3, c: 'understanding', marks: 5,
  stem: 'Explain how e-waste should be managed, and describe any three health problems linked to the use of computers and phones with a remedy for each.',
  model: '**E-waste management:** first reduce purchases, then reuse and repair devices, and finally recycle through authorised recyclers; never burn or dump devices, because their toxic substances pollute air, soil and water.\n\n**Eye strain:** tired, dry eyes after long screen use; take regular breaks and look at faraway objects.\n\n**Repetitive strain injury:** wrist or finger pain from long typing and mouse use; take breaks, stretch and keep the wrists in a natural position.\n\n**Poor posture or internet addiction:** neck and back pain from bad posture, or loss of sleep and routine through overuse; sit with a supported back and the screen at eye level, and fix time limits for use.',
  sol: 'Marks for e-waste management with the three Rs and safe disposal, and for each of three health problems paired with a remedy.',
  scheme: [['Three Rs of e-waste management', 1], ['Authorised recycling and dangers of dumping or burning', 1], ['First health problem with remedy', 1], ['Second health problem with remedy', 1], ['Third health problem with remedy', 1]],
}));
Q('cb_ewaste', caseQ({
  t: 4, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read about the computer lab clear-out at Greenfield School and answer the questions. *(Imagined school and numbers, written by SOYL for practice.)*',
  passage: `Greenfield School (an imagined school) is replacing the old computers of its lab. Of the ${LAB.total} old computers, ${LAB.reuse} are still in good working order and will be given to a village library, and ${LAB.recycle} are beyond repair and will go to an authorised recycler. The rest will be kept for spare parts. A helper suggests burning the broken keyboards behind the building to save space.`,
  parts: [
    child('a', mcq({ t: 4, d: 2, c: 'application', fixed: true, key: 'a', stem: 'How many computers will be kept for spare parts?', opts: [String(LAB.rest), String(LAB.reuse), String(LAB.recycle), String(LAB.total)], sol: `Computers given away or recycled number ${LAB.reuse} + ${LAB.recycle} = ${LAB.reuse + LAB.recycle}, so ${LAB.total} - ${LAB.reuse + LAB.recycle} = ${LAB.rest} remain for spare parts.` })),
    child('b', tf({ t: 4, d: 2, c: 'application', ans: true, stem: 'True or false? Giving the working computers to the village library is an example of reuse.', sol: 'The computers continue to serve a second set of users instead of becoming waste, which is the idea of reuse.' })),
    child('c', short({ t: 4, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Explain why the helper\'s suggestion is wrong and what should be done with the broken keyboards.', model: 'Burning plastics and electronic parts releases toxic fumes that harm health and the environment. The keyboards should be handed to the authorised recycler along with the other unusable devices.', sol: 'One mark for the reason and one for the correct disposal.', scheme: [['Reason: toxic fumes', 1], ['Hand over to authorised recycler', 1]] }), [
      short({ t: 4, d: 4, c: 'analysis', marks: 2, stem: `**Or** (ii): The lab teacher suggests using the ${LAB.rest} spare-parts computers to repair others later. Say which of the three Rs this supports, and give one more way the school could cut down its e-waste in future.`, model: 'Keeping computers for spare parts supports reuse, because parts keep other machines working. In future the school can reduce waste by buying only the number of computers it needs, or by upgrading memory instead of replacing whole machines.', sol: 'One mark for naming reuse with the reason and one mark for another valid way.', scheme: [['Reuse with reason', 1], ['Another valid way to reduce e-waste', 1]] }),
    ]),
  ],
}));
