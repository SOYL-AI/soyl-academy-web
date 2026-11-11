// t04: Goods and Services Tax, a brief theoretical introduction only (meaning, the three components, input tax credit
// as a concept). No GST entry, rate or computation appears anywhere: journal entries with GST are a removed topic.
import { mcq, ar, tf, fb, short } from './lib.mjs';
import { QQ } from './qq.mjs';

QQ('m_gst_meaning', mcq({
  t: 4, d: 1, c: 'understanding',
  stem: 'A class studies indirect taxes using an imagined bakery in Pune as its example. Goods and Services Tax is best described as',
  opts: ['an indirect tax on the supply of goods and services, charged at each stage with credit for the tax already paid', 'a direct tax on the income of the owner of a business', 'a tax levied only on goods imported into the country', 'a fee paid once, when a firm is registered'],
  sol: 'It is a single indirect tax on supplies of goods and services, with a credit at each stage for tax paid earlier. A tax on income is a direct tax, it is not confined to imports, and it is not a one-time registration fee.',
}));
QQ('m_igst', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'A registered firm in Pune, imagined for this question, sells goods to a buyer in Chennai, which is in another state. The tax charged on this supply is',
  opts: ['integrated goods and services tax, collected by the Centre', 'central and state goods and services tax together', 'state goods and services tax alone', 'union territory goods and services tax alone'],
  sol: 'A supply from one state to another is taxed as integrated goods and services tax. The central and state taxes together apply to a supply inside one state, and the union territory tax to a supply inside a union territory.',
}));
QQ('ar_gst', ar({
  t: 4, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'Input tax credit lets a registered firm in an imagined town set off the tax it paid on its purchases against the tax it owes on its sales.',
  r: 'Input tax credit is a cash refund that the government pays to every buyer at the end of the year.',
  sol: 'The credit is a set-off against tax payable, so the firm pays tax only on the value it adds. It is not a refund paid to every buyer, so R is false.',
}));
QQ('tf_gst', tf({
  t: 4, d: 1, c: 'understanding', ans: true,
  stem: 'A registered firm in Jaipur, imagined for this question, sells goods to a customer in Jaipur itself. The tax on this supply has two parts: central goods and services tax and state goods and services tax.',
  sol: 'A supply within one state is taxed by the Centre and the state, as CGST and SGST.',
}));
QQ('fb_gst', fb({
  t: 4, d: 1, c: 'recall',
  stem: 'On a sale within its own state, an imagined firm charges central goods and services tax and ___ goods and services tax; on a sale to another state it charges ___ goods and services tax.',
  acc: [['state', 'sgst'], ['integrated', 'igst']],
  sol: 'Within a state the two parts are central and state; between states the single tax is integrated goods and services tax.',
}));
QQ('s2_gst_types', short({
  t: 4, d: 2, c: 'recall', marks: 2,
  stem: 'Name the three components of Goods and Services Tax and state the kind of supply on which each is charged.',
  model: '**CGST** (central) and **SGST** (state; **UTGST** in a union territory) are charged together on a supply made within one state or union territory.\n\n**IGST** (integrated) is charged on a supply from one state to another, and on imports.',
  sol: 'One mark for the pair charged inside a state and one for the tax charged between states.',
  scheme: [['CGST and SGST (or UTGST) on a supply within a state', 1], ['IGST on a supply between states', 1]],
}));
QQ('s3_gst_itc', short({
  t: 4, d: 3, c: 'understanding', marks: 3,
  stem: 'Explain input tax credit under Goods and Services Tax, using an imagined firm that buys raw material and sells finished goods. No amounts are needed.',
  model: '**Meaning:** a registered business may deduct the tax it paid on the inputs it bought for its business from the tax it has to pay on what it sells.\n\n**Example:** a firm making cane baskets pays tax when it buys cane and, later, collects tax when it sells the baskets. It sets the first against the second and deposits only the difference.\n\n**Benefit:** tax is paid only on the value the firm adds, so tax is not charged again on tax at every stage.',
  sol: 'Define the credit, show the set-off in a business, and state why it helps.',
  scheme: [['Meaning: set-off of tax paid on inputs against tax on sales', 1], ['A descriptive example of a firm', 1], ['Benefit: tax only on value added', 1]],
}));
