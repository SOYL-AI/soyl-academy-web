// ch07 Structural Organisation in Animals — question bank. AR keys: a c b d.
import { mk, add, r } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { pct, actualUm, totalDigits, cranialTotal, vasaBoth, survive, DIGITS, CRANIAL_PAIRS, VASA } from './calc.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;

// ---------------------------------------------------------------- t01 animal tissues
add('squamous-mcq', mcq({
  stem: 'A slide shows a single layer of thin, flat cells with irregular boundaries, taken from the wall of a lung air sac. The tissue is',
  right: 'simple squamous epithelium',
  wrong: ['simple cuboidal epithelium', 'ciliated columnar epithelium', 'compound epithelium'],
  sol: 'One layer of thin, flat cells forming a diffusion boundary is squamous epithelium — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('microvilli-mcq', mcq({
  stem: 'Cells lining the proximal convoluted tubule of a nephron are cube-shaped and carry microvilli on their free surface. Which tissue is this, and what do the microvilli do?',
  right: 'Cuboidal epithelium; they increase the surface area for absorption',
  wrong: ['Squamous epithelium; they sweep mucus along', 'Columnar epithelium; they release hormones into blood', 'Compound epithelium; they resist friction'],
  sol: 'Cube-like cells are cuboidal epithelium; microvilli enlarge the absorbing surface — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('goblet-mcq', mcq({
  stem: 'The mucus-secreting goblet cells scattered in the lining of the alimentary canal are an example of',
  right: 'unicellular glandular epithelium',
  wrong: ['multicellular exocrine glands', 'endocrine glands', 'ciliated epithelium'],
  sol: 'Each goblet cell is a single secretory cell: a unicellular gland — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('ciliated-mcq', mcq({
  stem: 'Dust trapped in mucus is moved steadily upwards along the inner surface of the bronchioles. Which tissue lines this surface?',
  right: 'Ciliated epithelium',
  wrong: ['Simple squamous epithelium', 'Dense regular connective tissue', 'Smooth muscle'],
  sol: 'Beating cilia move particles or mucus in a specific direction over the epithelium — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('compound-mcq', mcq({
  stem: 'Which of these surfaces is covered by compound epithelium?',
  right: 'The moist lining of the buccal cavity and pharynx',
  wrong: ['The walls of blood capillaries', 'The air sacs of the lungs', 'The inner lining of the intestine'],
  sol: 'Compound (many-layered) epithelium covers the skin and lines the buccal cavity, pharynx and ducts of salivary glands and pancreas — option (@K).',
  d: 2, c: 'recall', t: [1],
}));
add('tight-mcq', mcq({
  stem: 'Which junction between epithelial cells stops substances from leaking across the tissue?',
  right: 'Tight junction',
  wrong: ['Gap junction', 'Adhering junction', 'Intercalated disc'],
  sol: 'Tight junctions seal neighbouring cells so substances cannot leak between them — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('gap-mcq', mcq({
  stem: 'A dye injected into one cell of a tissue is soon seen in the cytoplasm of its neighbours, although no dye leaks out of the tissue. Which junctions allow the passage between cells?',
  right: 'Gap junctions',
  wrong: ['Tight junctions', 'Adhering junctions', 'Basement membranes'],
  sol: 'Gap junctions connect the cytoplasm of adjoining cells for rapid transfer of ions and small molecules — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('tendon-mcq', mcq({
  stem: 'A sprinter tears the cord that attaches her calf muscle to the heel bone. The cord is made of',
  right: 'dense regular connective tissue',
  wrong: ['dense irregular connective tissue', 'adipose tissue', 'cartilage'],
  sol: 'A tendon joins skeletal muscle to bone; its collagen fibres lie in parallel rows, so it is dense regular tissue — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('cartilage-mcq', mcq({
  stem: 'The tip of your nose and the outer ear can be bent with a finger and spring back into shape. The supporting tissue is',
  right: 'cartilage, with chondrocytes in small cavities in a pliable matrix',
  wrong: ['bone, with a matrix rich in calcium salts', 'adipose tissue that stores fat', 'dense regular tissue that forms tendons'],
  sol: 'Cartilage has a solid but pliable matrix that resists compression — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('blood-mcq', mcq({
  stem: 'Why is blood classed as a connective tissue?',
  right: 'It is a fluid connective tissue: cells move in a fluid matrix, plasma, and it links all parts of the body',
  wrong: ['Its cells secrete collagen fibres', 'It covers the surfaces of organs', 'It contracts to move the body'],
  sol: 'Blood is a specialised, fluid connective tissue with plasma as matrix and red cells, white cells and platelets — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('adipose-mcq', mcq({
  stem: 'Nutrients not used at once are converted into fats and stored in',
  right: 'adipose tissue',
  wrong: ['cartilage', 'dense regular tissue', 'neuroglia'],
  sol: 'Adipose tissue, a loose connective tissue beneath the skin, is specialised to store fats — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('smooth-mcq', mcq({
  stem: 'A muscle cell is spindle-shaped, tapers at both ends, shows no striations and contracts without conscious control. Where is it most likely to come from?',
  right: 'The wall of the intestine',
  wrong: ['The biceps of the arm', 'The wall of the heart', 'A muscle attached to the thigh bone'],
  sol: 'Smooth (involuntary) muscle lines the walls of the gut and blood vessels — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('cardiac-mcq', mcq({
  stem: 'Cardiac muscle cells contract as a unit because',
  right: 'communication junctions (intercalated discs) where their membranes fuse let them work together',
  wrong: ['they have no striations', 'they are under voluntary control', 'they are spindle-shaped and unbranched'],
  sol: 'Intercalated discs at the fusion points let cardiac cells contract as one — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('neuroglia-mcq', mcq({
  stem: 'Which statement about neuroglia is correct?',
  right: 'They make up more than half the volume of neural tissue and protect and support neurons.',
  wrong: ['They are the excitable cells that carry impulses.', 'They form less than a tenth of neural tissue.', 'They are found only in muscle.'],
  sol: 'Neuroglial cells protect and support neurons and occupy more than half the volume of neural tissue — option (@K).',
  d: 2, c: 'recall', t: [1],
}));
add('identify-mcq', mcq({
  stem: 'Four slides are labelled by a student. Which label is WRONG?',
  right: 'Branched, striated fibres joined end to end by discs: smooth muscle',
  wrong: ['Cells in lacunae within a pliable matrix: cartilage', 'Spindle cells with one central nucleus and no striations: smooth muscle', 'Fat-filled cells beneath the skin: adipose tissue'],
  sol: 'Branched striated fibres with intercalated discs are cardiac muscle, not smooth muscle — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('compound-ar', ar({
  a: 'Compound epithelium has only a limited role in secretion and absorption.',
  r: 'It is made of more than one layer of cells, and its main function is to protect against chemical and mechanical stresses.',
  key: 'a',
  sol: 'Both are true; being many-layered and protective explains why it secretes and absorbs little — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('cardiac-ar', ar({
  a: 'Cardiac muscle fibres show striations.',
  r: 'Cardiac muscle is under voluntary control.',
  key: 'c',
  sol: 'A is true; R is false, because cardiac muscle is involuntary — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('gland-tf', tf({
  stem: 'Endocrine glands release their products through ducts.',
  key: 'f',
  sol: 'False. Endocrine glands have no ducts; hormones pass directly into the fluid bathing the gland. Exocrine glands use ducts.',
  d: 1, c: 'recall', t: [1],
}));
add('collagen-fill', fill({
  stem: 'Except in blood, the cells of connective tissues secrete fibres of the structural proteins collagen or ______.',
  acc: [['elastin']],
  sol: 'Elastin.',
  d: 1, c: 'recall', t: [1],
}));
add('tissue-match', match({
  stem: 'Match each tissue (column I) with its location or role (column II).',
  pairs: [
    ['Simple squamous epithelium', 'Walls of blood vessels and lung air sacs'],
    ['Dense irregular connective tissue', 'Skin, with fibres running in many directions'],
    ['Ligament', 'Joins one bone to another'],
    ['Adipose tissue', 'Stores fat beneath the skin'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Squamous lines vessels and air sacs; dense irregular tissue is in the skin; ligaments join bones; adipose tissue stores fat.',
  d: 2, c: 'understanding', t: [1],
}));
{
  const v = actualUm(36, 600);
  add('size-num', num({
    stem: 'A photograph of a stained squamous epithelial cell is taken at a magnification of 600. The cell measures 36 mm across on the print. What is its real width in micrometres? (1 mm = 1000 µm)',
    value: v, unit: 'µm',
    sol: r`Real size $= \dfrac{36 \times 1000}{600} = ${v}$ µm.`,
    scheme: [[`${v} µm`, 1]],
    d: 2, c: 'application', t: [1],
  }), (q) => q.answer.value === 60 || 'value');
}
{
  const p = pct(42, 60, 0);
  add('areolar-num', num({
    stem: 'In a field of a stained areolar tissue slide, a student counts 42 fibroblasts, 14 macrophages and 4 mast cells. What percentage of the counted cells are fibroblasts?',
    value: p, unit: '%',
    sol: r`Total $= 42 + 14 + 4 = 60$; fibroblasts $= \dfrac{42}{60} \times 100 = ${p}$ percent.`,
    scheme: [[`${p}%`, 1]],
    d: 2, c: 'application', t: [1],
  }), (q) => q.answer.value === 70 || 'value');
}
add('exoendo-short', short({
  marks: 2,
  stem: 'Distinguish between exocrine and endocrine glands, naming two products of exocrine glands.',
  model: '**Exocrine glands** release their secretions through **ducts** or tubes, for example **mucus, saliva, earwax, oil, milk** and **digestive enzymes**. **Endocrine glands** have **no ducts**; their products, **hormones**, pass directly into the fluid bathing the gland.',
  sol: 'Ducts versus no ducts; examples.',
  scheme: [['Exocrine with ducts and two products', 1], ['Endocrine: ductless, hormones', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('tendonlig-short', short({
  marks: 2,
  stem: 'One athlete strains a tendon while another sprains a ligament. Compare the two structures in their tissue type and in what they join.',
  model: 'Both are **dense regular connective tissue**, with **collagen fibres in parallel rows** between rows of fibroblasts, which makes them strong. A **tendon** attaches **skeletal muscle to bone**, while a **ligament** attaches **one bone to another bone**.',
  sol: 'Same tissue; different attachments.',
  scheme: [['Both dense regular, parallel collagen', 1], ['Tendon muscle–bone; ligament bone–bone', 1]],
  d: 2, c: 'application', t: [1],
}));
add('airsac-short', short({
  marks: 2,
  stem: 'Why are the air sacs of the lungs lined by simple squamous epithelium rather than by compound epithelium?',
  model: 'Gases must **diffuse quickly** between air and blood. A **single layer of thin, flat cells** gives a very **short diffusion path**. Compound epithelium has **many layers**, which suits **protection** against wear but would slow exchange.',
  sol: 'Thin barrier for diffusion.',
  scheme: [['Thin single layer: short diffusion path', 1], ['Compound is thick and protective', 1]],
  d: 3, c: 'application', t: [1],
}));
add('junctions-short', short({
  marks: 3,
  stem: 'Name the three kinds of cell junctions found between epithelial and other cells, and state the role of each.',
  model: '**Tight junctions** seal neighbouring cells together and **stop substances from leaking** across the tissue.\n\n**Adhering junctions** act as **cement**, holding neighbouring cells firmly together.\n\n**Gap junctions** connect the **cytoplasm of adjoining cells**, allowing rapid transfer of **ions, small molecules** and sometimes big molecules, so the cells can **communicate**.',
  sol: 'Three junctions with roles.',
  scheme: [['Tight junction and role', 1], ['Adhering junction and role', 1], ['Gap junction and role', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('ctclass-short', short({
  marks: 3,
  stem: 'Connective tissues are classed into three types. Name them and give two examples of each.',
  model: '**Loose connective tissue:** cells and fibres loosely arranged in a semi-fluid ground substance — **areolar tissue** beneath the skin and **adipose tissue**, which stores fat.\n\n**Dense connective tissue:** fibres and fibroblasts compactly packed — **tendons and ligaments** (dense regular) and the **skin** (dense irregular).\n\n**Specialised connective tissue:** **cartilage**, **bone** and **blood**.',
  sol: 'Three types with examples.',
  scheme: [['Loose with examples', 1], ['Dense with examples', 1], ['Specialised with examples', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('muscles-short', short({
  marks: 3,
  stem: 'A slide box contains three unlabelled muscle samples. Explain how shape of fibres, striations and branching would let you sort them into skeletal, smooth and cardiac muscle.',
  model: '**Skeletal:** long, **cylindrical, unbranched** fibres with **striations** and many nuclei; it is voluntary, as in the biceps.\n\n**Smooth:** **spindle-shaped** cells that taper at both ends, **no striations**, one central nucleus; it lines the gut and blood vessels.\n\n**Cardiac:** **striated** fibres that are **branched** and joined end to end by **intercalated discs**, found only in the heart.',
  sol: 'Shape, striations and branching for each.',
  scheme: [['Skeletal features', 1], ['Smooth features', 1], ['Cardiac features', 1]],
  d: 3, c: 'analysis', t: [1],
}));
add('epithelium-long', long({
  stem: 'Describe the types of simple epithelium with one location of each, explain glandular epithelium, and state where compound epithelium is found and what it does.',
  model: '**Epithelium** covers body surfaces and lines cavities, ducts and tubes; its cells are packed with little intercellular matrix and rest on a basement membrane.\n\n**Simple epithelium** has one layer of cells. **Squamous** epithelium is a single thin layer of flat cells with irregular boundaries; it forms the walls of blood vessels and the air sacs of the lungs and is suited to diffusion. **Cuboidal** epithelium has cube-like cells; it lines the ducts of glands and the tubular parts of nephrons, where the cells of the proximal tubule bear microvilli for absorption. **Columnar** epithelium has tall, slender cells with nuclei near the base; it lines the stomach and intestine, where microvilli aid absorption. **Ciliated** epithelium has cilia on its free surface that move particles or mucus in one direction, as in the bronchioles and fallopian tubes.\n\n**Glandular epithelium** is made of cuboidal or columnar cells specialised for secretion. It may be **unicellular**, like goblet cells of the gut, or **multicellular**, like salivary glands. **Exocrine** glands secrete mucus, saliva, earwax, oil, milk or enzymes through ducts; **endocrine** glands release hormones directly into the fluid bathing them.\n\n**Compound epithelium** has two or more layers. It covers the dry surface of the skin and lines the buccal cavity, pharynx and the ducts of salivary glands and pancreas. It protects against chemical and mechanical stresses and has little role in secretion or absorption.',
  sol: 'Simple types, glands, compound.',
  scheme: [['Squamous and cuboidal with locations', 1.5], ['Columnar and ciliated with locations', 1], ['Glandular: uni-/multicellular, exocrine/endocrine', 1.5], ['Compound: locations and role', 1]],
  wl: [80, 260],
  d: 3, c: 'understanding', t: [1],
}));
add('connective-long', long({
  stem: 'Describe the general features of connective tissue and explain its loose, dense and specialised types, with examples.',
  model: '**Connective tissues** are the most abundant and widely distributed tissues; they link and support other tissues. Except in blood, their cells secrete fibres of the structural proteins **collagen** or **elastin**, which give strength, elasticity and flexibility, and also secrete modified polysaccharides that build the **matrix** (ground substance).\n\n**Loose connective tissue** has cells and fibres loosely arranged in a semi-fluid ground substance. **Areolar tissue**, beneath the skin, holds fibroblasts, macrophages and mast cells and supports the epithelium. **Adipose tissue**, also beneath the skin, stores fats.\n\n**Dense connective tissue** has fibres and fibroblasts packed tightly. In **dense regular** tissue the collagen fibres run in parallel bundles, as in **tendons**, which attach muscle to bone, and **ligaments**, which join bone to bone. In **dense irregular** tissue the fibres run in many directions, as in the **skin**.\n\n**Specialised connective tissue** includes **cartilage**, with chondrocytes in lacunae in a pliable matrix (tip of nose, outer ear, between vertebrae); **bone**, a hard matrix rich in calcium salts and collagen with osteocytes in lacunae, whose marrow forms blood cells; and **blood**, a fluid connective tissue of plasma, red cells, white cells and platelets.',
  sol: 'Features; three types with examples.',
  scheme: [['General features: fibres and matrix', 1], ['Loose: areolar, adipose', 1], ['Dense regular and irregular', 1.5], ['Specialised: cartilage, bone, blood', 1.5]],
  wl: [80, 260],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 frog
add('aestivation-mcq', mcq({
  stem: 'In the hottest, driest weeks of the year, frogs of a village pond disappear into deep burrows and become inactive until the rains. This behaviour is',
  right: 'aestivation (summer sleep)',
  wrong: ['hibernation (winter sleep)', 'metamorphosis', 'camouflage'],
  sol: 'Taking shelter in burrows to escape summer heat and drought is aestivation — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('nictitating-mcq', mcq({
  stem: 'Which structure protects the eyes of a frog while it swims under water?',
  right: 'Nictitating membrane',
  wrong: ['Tympanum', 'Vocal sac', 'Copulatory pad'],
  sol: 'The nictitating membrane covers and protects each eye in water — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('sex-mcq', mcq({
  stem: 'A naturalist wants to tell male from female frogs in a pond without harming them. Which features should she look for?',
  right: 'Vocal sacs and a copulatory pad on the first digit of each forelimb, present only in males',
  wrong: ['A short tail, present only in males', 'Five digits on the forelimbs of females', 'A distinct neck in females'],
  sol: 'Males have sound-producing vocal sacs and copulatory pads; females lack both — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('gutlength-mcq', mcq({
  stem: 'Why is the alimentary canal of the frog relatively short?',
  right: 'The frog is carnivorous, so its intestine is reduced in length',
  wrong: ['The frog cannot digest proteins', 'The frog absorbs all its food through the skin', 'The frog has no liver or pancreas'],
  sol: 'Animal food is digested more easily, so carnivores like the frog have a short intestine — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('bileblock-mcq', mcq({
  stem: 'If the common bile duct of a frog were blocked, digestion of which food in the duodenum would suffer, and why?',
  right: 'Fats, because neither bile, which emulsifies fat, nor pancreatic juice could reach the duodenum',
  wrong: ['Only starch, because bile digests starch', 'Nothing, because digestion is complete in the stomach', 'Only water, because bile absorbs water'],
  sol: 'Bile and pancreatic juice both enter through the common bile duct; fat emulsification and digestion would be hit — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('skinresp-mcq', mcq({
  stem: 'During hibernation a frog lies buried in mud and does not use its lungs. How does it obtain oxygen?',
  right: 'By diffusion through its moist skin (cutaneous respiration)',
  wrong: ['Through gills that reappear in winter', 'Through the buccal cavity only', 'From oxygen stored in the liver'],
  sol: 'During aestivation and hibernation gas exchange takes place through the skin — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('heart-mcq', mcq({
  stem: 'The heart of the frog consists of',
  right: 'two atria and one ventricle',
  wrong: ['one atrium and one ventricle', 'two atria and two ventricles', 'one atrium and two ventricles'],
  sol: 'The frog heart is three-chambered — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('sinus-mcq', mcq({
  stem: 'In the frog, blood brought back by the venae cavae first enters',
  right: 'the sinus venosus, which joins the right atrium',
  wrong: ['the conus arteriosus', 'the left atrium', 'the ventricle directly'],
  sol: 'The triangular sinus venosus on the dorsal side receives the venae cavae and opens into the right atrium — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('portal-mcq', mcq({
  stem: 'In a frog, blood from the hind limbs passes through the kidneys in a special vein before it returns to the heart. This venous connection is the',
  right: 'renal portal system',
  wrong: ['hepatic portal system', 'lymphatic system', 'conus arteriosus'],
  sol: 'The renal portal system links the kidneys with the lower parts of the body — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('ureotelic-mcq', mcq({
  stem: 'Frogs are described as ureotelic. This means that they',
  right: 'excrete nitrogenous waste mainly as urea',
  wrong: ['excrete nitrogenous waste mainly as ammonia', 'excrete nitrogenous waste mainly as uric acid', 'store all nitrogenous waste in the bladder'],
  sol: 'Ureotelic animals excrete urea — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('spermroute-mcq', mcq({
  stem: 'In a male frog, sperms travel from the testis to the cloaca through',
  right: 'vasa efferentia, Bidder’s canal in the kidney and the urinogenital duct',
  wrong: ['the oviduct and the urinary bladder', 'the urinary bladder and a urethra', 'the mesorchium and the rectum'],
  sol: 'Vasa efferentia enter the kidney, open into Bidder’s canal, which leads to the urinogenital duct — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('brain-mcq', mcq({
  stem: 'The pair of optic lobes in the brain of the frog belongs to the',
  right: 'midbrain',
  wrong: ['forebrain', 'hindbrain', 'spinal cord'],
  sol: 'The midbrain is marked by a pair of optic lobes — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('ear-mcq', mcq({
  stem: 'Which statement about the ear of the frog is correct?',
  right: 'There is no external ear; the tympanum is seen outside, and the ear serves for both hearing and balance.',
  wrong: ['The frog has a large external ear flap.', 'The ear is only for hearing, not for balance.', 'The tympanum lies inside the buccal cavity.'],
  sol: 'Only the tympanum is visible; the ear is an organ of hearing and of balancing — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('tadpole-mcq', mcq({
  stem: 'Eggs collected from a pond in the rainy season are kept in an aquarium. Which sequence should the class expect?',
  right: 'Eggs hatch into tadpoles, which undergo metamorphosis into young frogs',
  wrong: ['Eggs hatch directly into small adult frogs', 'Eggs need internal fertilisation in the aquarium first', 'Tadpoles turn into frogs without any change in body form'],
  sol: 'Fertilisation is external and development includes a tadpole larva that metamorphoses — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('pests-mcq', mcq({
  stem: 'After frogs were collected in large numbers from a group of paddy fields, the farmers saw more insect damage to their crop. What explains this?',
  right: 'Frogs eat insects; removing them broke a link in the food web that kept pests in check',
  wrong: ['Frogs pollinate rice, so yields fell', 'Frogs eat rice, so their removal should have helped', 'Insects feed on frog eggs, so they multiplied'],
  sol: 'Frogs are insect-eaters that protect crops and help keep the ecological balance — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('poikilo-ar', ar({
  a: 'The frog is a poikilotherm (cold-blooded animal).',
  r: 'Frogs take shelter in deep burrows to protect themselves from extreme heat and cold.',
  key: 'b',
  sol: 'Both are true, but sheltering in burrows is a result of being cold-blooded, not what makes the frog cold-blooded; its body temperature varies with the surroundings — option (b).',
  d: 3, c: 'analysis', t: [2],
}));
add('rbc-ar', ar({
  a: 'The red blood cells of the frog lack a nucleus.',
  r: 'The red blood cells of the frog contain haemoglobin.',
  key: 'd',
  sol: 'A is false, because frog red cells are nucleated; R is true — option (d).',
  d: 2, c: 'understanding', t: [2],
}));
add('drink-tf', tf({
  stem: 'Frogs never drink water but absorb it through the skin.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [2],
}));
add('neck-tf', tf({
  stem: 'The body of the frog is divided into head, neck and trunk.',
  key: 'f',
  sol: 'False. The body has only a head and a trunk; there is no neck and no tail.',
  d: 1, c: 'recall', t: [2],
}));
add('tigrina-fill', fill({
  stem: 'The common Indian frog described in this chapter is Rana ______.',
  acc: [['tigrina']],
  sol: 'Rana tigrina.',
  d: 1, c: 'recall', t: [2],
}));
add('mesorchium-fill', fill({
  stem: 'The testes of a male frog are attached to the upper part of the kidneys by a double fold of peritoneum called the ______.',
  acc: [['mesorchium']],
  sol: 'Mesorchium.',
  d: 1, c: 'recall', t: [2],
}));
{
  const v = totalDigits();
  add('digits-num', num({
    stem: `A frog has ${DIGITS.fore} digits on each forelimb and ${DIGITS.hind} on each hind limb. How many digits does it have in all?`,
    value: v,
    sol: r`$2 \times ${DIGITS.fore} + 2 \times ${DIGITS.hind} = ${v}$ digits.`,
    scheme: [[`${v}`, 1]],
    d: 1, c: 'application', t: [2],
  }), (q) => q.answer.value === 18 || 'value');
}
{
  const v = cranialTotal();
  add('cranial-num', num({
    stem: `The brain of the frog gives off ${CRANIAL_PAIRS} pairs of cranial nerves. How many cranial nerves arise from it in all?`,
    value: v,
    sol: r`$${CRANIAL_PAIRS} \times 2 = ${v}$ cranial nerves.`,
    scheme: [[`${v}`, 1]],
    d: 1, c: 'application', t: [2],
  }), (q) => q.answer.value === 20 || 'value');
}
{
  const v = survive(3000, 2.5);
  add('adults-num', num({
    stem: 'A mature female frog lays 3000 eggs at a time. If 2.5 percent of them survive to become adult frogs, how many adults result?',
    value: v,
    sol: r`$3000 \times \dfrac{2.5}{100} = ${v}$ adult frogs.`,
    scheme: [[`${v}`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === 75 || 'value');
}
{
  const [lo, hi] = vasaBoth();
  add('vasa-num', num({
    stem: `Each testis of a male frog gives off ${VASA.min} to ${VASA.max} vasa efferentia. What is the largest number of vasa efferentia that both testes together could have?`,
    value: hi,
    sol: r`Both testes: from $2 \times ${VASA.min} = ${lo}$ up to $2 \times ${VASA.max} = ${hi}$.`,
    scheme: [[`${hi}`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === 24 || 'value');
}
add('breathe-short', short({
  marks: 2,
  stem: 'Explain how a frog carries out gas exchange in water and on land.',
  model: 'In **water**, the moist **skin** acts as the respiratory organ: dissolved oxygen diffuses through it (**cutaneous respiration**). On **land**, the **buccal cavity, skin and lungs** all exchange gases; air enters through the **nostrils** into the buccal cavity and then the **lungs** (pulmonary respiration).',
  sol: 'Skin in water; skin, buccal cavity and lungs on land.',
  scheme: [['Water: skin by diffusion', 1], ['Land: buccal cavity, skin, lungs', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('sexes-short', short({
  marks: 2,
  stem: 'State two external features that distinguish a male frog from a female, and say what each is used for.',
  model: 'Males have **vocal sacs**, which **produce sounds** (croaking) to attract mates, and a **copulatory pad** on the **first digit of each forelimb**, which helps the male **grip the female** during mating. Both are **absent in females**.',
  sol: 'Vocal sacs and copulatory pads.',
  scheme: [['Vocal sacs, sound production', 1], ['Copulatory pads on first digit', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('lymph-short', short({
  marks: 2,
  stem: 'A sample of fluid drawn from a frog’s lymph channel is compared with a sample of its blood under a microscope. What differences would you expect, and what makes up its lymphatic system?',
  model: '**Lymph** would show **no red blood cells** and would **lack a few proteins** found in blood plasma, while blood contains nucleated RBCs with haemoglobin, WBCs and platelets. The lymphatic system consists of **lymph, lymph channels and lymph nodes**.',
  sol: 'No RBCs, fewer proteins; parts.',
  scheme: [['Lymph lacks RBCs and some proteins', 1], ['Lymph, channels, nodes', 1]],
  d: 2, c: 'application', t: [2],
}));
add('digestion-short', short({
  marks: 3,
  stem: 'A frog catches an insect with its tongue. Trace how the insect is digested and absorbed, and how the waste leaves the body.',
  model: 'The **bilobed tongue** captures the insect, which passes through the **buccal cavity, pharynx and oesophagus** to the **stomach**, where **HCl and gastric juices** digest it into **chyme**. In the **duodenum**, **bile** (from the gall bladder) emulsifies fat and **pancreatic juice** digests carbohydrates and proteins; both arrive through the **common bile duct**. Final digestion occurs in the **intestine**, and **villi and microvilli** absorb the products. Undigested waste passes to the **rectum** and out through the **cloaca**.',
  sol: 'Path with digestive juices.',
  scheme: [['Tongue to stomach; gastric digestion', 1], ['Duodenum: bile and pancreatic juice', 1], ['Absorption by villi; waste via cloaca', 1]],
  d: 3, c: 'application', t: [2],
}));
add('heart-short', short({
  marks: 3,
  stem: 'Using the structure of its heart, trace the path of blood returning from the body of a frog until it leaves the heart again.',
  model: 'The frog heart lies in the upper body cavity inside a **pericardium** and has **three chambers**: two **atria** and one **ventricle**. Blood from the body returns through the **venae cavae** into the **sinus venosus**, a triangular chamber on the dorsal side, which opens into the **right atrium**. From the atria blood passes into the single **ventricle**, which pumps it into the **conus arteriosus** on the ventral side, and from there into the **arteries**.',
  sol: 'Venae cavae → sinus venosus → right atrium → ventricle → conus.',
  scheme: [['Three chambers in pericardium', 1], ['Venae cavae → sinus venosus → right atrium', 1], ['Ventricle → conus arteriosus → arteries', 1]],
  d: 2, c: 'application', t: [2],
}));
add('cloaca-short', short({
  marks: 3,
  stem: 'A male and a female frog are dissected side by side. Compare how urine and gametes reach the cloaca in the two sexes.',
  model: 'In the **male**, the **ureters** from the kidneys act as **urinogenital ducts**: sperms travel from the testes through **vasa efferentia** into the kidney and **Bidder’s canal**, then share the duct with **urine** to the **cloaca**.\n\nIn the **female**, the **ovaries** have **no functional connection** with the kidneys; the **ureters** carry urine and the **oviducts** carry eggs, and they **open separately** into the cloaca.\n\nIn both, the **urinary bladder** opens into the cloaca.',
  sol: 'Shared duct in male; separate openings in female.',
  scheme: [['Male: common urinogenital duct via Bidder’s canal', 1.5], ['Female: ureters and oviducts open separately', 1], ['Bladder opens into cloaca', 0.5]],
  d: 3, c: 'analysis', t: [2],
}));
add('frogdigresp-long', long({
  stem: 'Describe the digestive and respiratory systems of the frog.',
  model: '**Digestive system.** The alimentary canal is **short**, because the frog is **carnivorous** and its intestine is reduced. The **mouth** opens into the **buccal cavity**, which leads through the **pharynx** and **oesophagus** to the **stomach**, then to the **intestine**, **rectum** and **cloaca**. Food is caught with the **bilobed tongue**. In the stomach, **HCl and gastric juices** act on it, and the partly digested food, **chyme**, passes into the **duodenum**. The duodenum receives **bile** from the **gall bladder**, where the liver’s secretion is stored, and **pancreatic juice** from the **pancreas** through a **common bile duct**. Bile **emulsifies fat**, and pancreatic juice digests **carbohydrates and proteins**. Digestion is completed in the intestine, and the products are absorbed by finger-like **villi and microvilli** on its inner wall. Undigested waste passes into the rectum and out through the cloaca.\n\n**Respiratory system.** In **water**, the moist **skin** is the respiratory surface: dissolved oxygen is exchanged by **diffusion** (cutaneous respiration). On **land**, the **buccal cavity, skin and lungs** all serve. The **lungs** are a pair of elongated, **pink, sac-like** organs in the upper trunk (thorax); air enters through the **nostrils** into the buccal cavity and then the lungs (pulmonary respiration). During **aestivation and hibernation**, gas exchange takes place only through the skin.',
  sol: 'Digestion and respiration.',
  scheme: [['Alimentary canal, short gut', 1], ['Stomach and duodenum: juices via common bile duct', 1.5], ['Absorption and egestion', 0.5], ['Respiration in water, on land, in dormancy', 2]],
  wl: [80, 260],
  d: 3, c: 'understanding', t: [2],
}));
add('frogcirc-long', long({
  stem: 'Describe the circulatory and excretory systems of the frog.',
  model: '**Circulation.** The frog has a well-developed **closed** blood vascular system, and also a **lymphatic system** of lymph, lymph channels and lymph nodes. The **heart** is muscular and **three-chambered** (two atria, one ventricle), lies in the upper body cavity and is covered by a **pericardium**. A triangular **sinus venosus** joins the right atrium and receives blood from the **venae cavae**. The ventricle opens into a sac-like **conus arteriosus** on the ventral side. **Arteries** carry blood from the heart to the body and **veins** bring it back. Special venous connections link the **liver and intestine** (hepatic portal system) and the **kidneys and the lower body** (renal portal system). Blood has **plasma** and cells: **nucleated red cells** with haemoglobin, white cells and platelets. Lymph lacks a few proteins and red cells.\n\n**Excretion.** The system consists of a pair of **kidneys**, **ureters**, the **cloaca** and a **urinary bladder**. The kidneys are compact, **dark red and bean-like**, lying on either side of the vertebral column; each is made of many **uriniferous tubules (nephrons)**. In the male, the ureters act as **urinogenital ducts**; in the female, the ureters and oviducts open separately into the cloaca. The thin-walled bladder lies ventral to the rectum and opens into the cloaca. The frog excretes **urea**, so it is **ureotelic**.',
  sol: 'Heart, vessels, blood; kidneys and ducts.',
  scheme: [['Closed system, lymphatic system', 0.5], ['Heart: chambers, sinus venosus, conus', 1.5], ['Portal systems and blood', 1], ['Excretory organs and ducts', 1.5], ['Ureotelic', 0.5]],
  wl: [80, 260],
  d: 3, c: 'understanding', t: [2],
}));
add('amphibian-long', long({
  stem: 'A student says that the frog is “fully adapted to life on land”. Evaluate this claim using the frog’s skin, respiration, limbs, excretion and reproduction.',
  model: '**Features that suit land.** The frog has **lungs** for pulmonary respiration on land, with air entering through the nostrils. Its strong, muscular **hind limbs** allow **walking, leaping and burrowing**, and burrowing lets it survive extreme heat and cold by **aestivation and hibernation**. It excretes **urea** (ureotelic), which is less toxic than ammonia and needs less water to remove than ammonia would.\n\n**Features that tie it to water.** Its **skin** must stay **moist**: it absorbs water through the skin (frogs do not drink) and depends on the skin for gas exchange, so it would dry out in a dry place. In water, the **skin is the only respiratory organ**. Its **webbed hind feet** are adaptations for **swimming**, and the **nictitating membrane** protects the eyes under water. Most importantly, **fertilisation is external and takes place in water**, and the eggs hatch into **aquatic tadpoles**, which must undergo **metamorphosis** before they can live on land.\n\n**Judgement.** The claim is **not justified**. The frog shows several land adaptations, but its moist, permeable skin, its dependence on cutaneous respiration and, above all, its water-bound reproduction and larval stage show that it is an **amphibian**, living a double life on land and in water.',
  sol: 'Land features, water features, judgement.',
  scheme: [['Land adaptations: lungs, limbs, burrowing, urea', 1.5], ['Water dependence: skin, webbed feet, membrane', 1.5], ['Reproduction: external fertilisation, tadpole', 1], ['Reasoned judgement', 1]],
  wl: [80, 260],
  d: 4, c: 'evaluation', t: [2],
}));

// ---------------------------------------------------------------- cases
{
  const v = actualUm(6, 400);
  add('slides-case', mk.case({
    passage: 'In a practical class, students study four prepared slides. Slide P shows tall cells in one layer, with nuclei near the base and a fringe of fine hair-like projections on the free surface. Slide Q shows cells lying singly or in pairs inside small cavities in a firm, bendable matrix. Slide R shows long, unbranched fibres with cross bands and many nuclei. Slide S shows a single layer of cube-shaped cells, photographed at a magnification of 400, in which one cell measures 6 mm on the print.',
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Which tissue is shown on slide P?',
        right: 'Ciliated columnar epithelium',
        wrong: ['Simple squamous epithelium', 'Compound epithelium', 'Smooth muscle'],
        sol: 'Tall cells with cilia on the free surface form ciliated columnar epithelium — option (@K).',
        d: 2, c: 'application', t: [1],
      })),
      part('b', num({
        stem: 'What is the real width of the cell on slide S, in micrometres? (1 mm = 1000 µm)',
        value: v, unit: 'µm',
        sol: r`$\dfrac{6 \times 1000}{400} = ${v}$ µm.`,
        scheme: [[`${v} µm`, 1]],
        d: 2, c: 'application', t: [1],
      })),
      part('c', short({
        marks: 2,
        stem: 'Identify the tissues on slides Q and R and give one place in the body where each is found.',
        model: 'Slide **Q** is **cartilage**: chondrocytes sit in lacunae in a pliable matrix; it occurs at the **tip of the nose, the outer ear** and between vertebrae. Slide **R** is **skeletal (striated) muscle**, found in muscles such as the **biceps** attached to bones.',
        sol: 'Cartilage; skeletal muscle.',
        scheme: [['Q cartilage with location', 1], ['R skeletal muscle with location', 1]],
        d: 2, c: 'application', t: [1],
      }), [
        short({
          marks: 2,
          stem: 'Where in the body would you find the tissue on slide P, and what does it do there?',
          model: 'Ciliated epithelium lines the inner surface of hollow organs such as the **bronchioles** and the **fallopian tubes**. Its **cilia beat** in one direction to **move particles or mucus**, for example sweeping trapped dust out of the airways or moving an egg along the tube.',
          sol: 'Location and role of cilia.',
          scheme: [['Location', 1], ['Cilia move mucus or particles', 1]],
          d: 2, c: 'understanding', t: [1],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 15 || 'value');
}
{
  const p = pct(18, 48, 1);
  add('knee-case', mk.case({
    passage: 'A footballer twists her knee. A scan shows a torn band joining the thigh bone to the shin bone, some wear of the smooth, bendable tissue covering the ends of the bones, and bruising of the thigh muscle. In a biopsy section from the bruised muscle, a technician counts 48 fibres, of which 18 show damage.',
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'The torn band joining two bones is a',
        right: 'ligament, made of dense regular connective tissue',
        wrong: ['tendon, made of dense irregular connective tissue', 'cartilage plate', 'sheet of adipose tissue'],
        sol: 'A ligament joins bone to bone and is dense regular tissue — option (@K).',
        d: 2, c: 'application', t: [1],
      })),
      part('b', num({
        stem: 'What percentage of the counted muscle fibres are damaged? (One decimal place.)',
        value: p, unit: '%',
        sol: r`$\dfrac{18}{48} \times 100 = ${p}$ percent.`,
        scheme: [[`${p}%`, 1]],
        d: 1, c: 'application', t: [1],
      })),
      part('c', short({
        marks: 2,
        stem: 'Name the tissue covering the ends of the bones and explain why it suits this position.',
        model: 'It is **cartilage**. Its **solid but pliable matrix** of proteins and polysaccharides, with **chondrocytes in lacunae**, **resists compression** and gives a smooth, slightly flexible surface where bones meet, so movement causes less friction and damage.',
        sol: 'Cartilage resists compression.',
        scheme: [['Cartilage', 1], ['Pliable matrix resists compression', 1]],
        d: 2, c: 'application', t: [1],
      }), [
        short({
          marks: 2,
          stem: 'The thigh muscle is moved by the footballer at will. Name its tissue type and give two features of its fibres.',
          model: 'It is **skeletal (striated) muscle**, which is **voluntary**. Its fibres are **long, cylindrical and unbranched**, lie **parallel** in bundles, show **striations** (cross bands) and contain **many nuclei**; they are attached to bones by tendons.',
          sol: 'Skeletal muscle features.',
          scheme: [['Skeletal muscle', 1], ['Two features', 1]],
          d: 1, c: 'understanding', t: [1],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 37.5 || 'value');
}
{
  const hatch = survive(2500, 40);
  add('pond-case', mk.case({
    passage: 'A school club watches frogs at a village pond for a year. In May and June no frogs are seen; in July, after the first rains, they appear in large numbers and males call loudly at night. One female lays a mass of 2500 eggs in shallow water. The club estimates that 40 percent of the eggs hatch. In December, the frogs again vanish into the mud.',
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Where were the frogs in May and June, and what is this state called?',
        right: 'In deep burrows, in aestivation',
        wrong: ['In the water, in hibernation', 'On trees, in metamorphosis', 'In burrows, in fertilisation'],
        sol: 'In the hot, dry season frogs shelter in deep burrows in summer sleep, aestivation — option (@K).',
        d: 2, c: 'application', t: [2],
      })),
      part('b', num({
        stem: 'How many eggs are expected to hatch?',
        value: hatch,
        sol: r`$2500 \times \dfrac{40}{100} = ${hatch}$ eggs.`,
        scheme: [[`${hatch}`, 1]],
        d: 1, c: 'application', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: 'Why do the frogs breed only after the rains? Refer to fertilisation and development.',
        model: '**Fertilisation is external** and takes place **in water**: eggs and sperms are released into the pond. The eggs hatch into **tadpoles**, aquatic larvae that live in water until they undergo **metamorphosis** into frogs, so breeding must wait until ponds fill.',
        sol: 'External fertilisation and aquatic tadpole.',
        scheme: [['External fertilisation in water', 1], ['Aquatic tadpole and metamorphosis', 1]],
        d: 2, c: 'application', t: [2],
      }), [
        short({
          marks: 2,
          stem: 'How do the frogs obtain oxygen while buried in the mud in December, and what is this winter state called?',
          model: 'The winter state is **hibernation** (winter sleep). The lungs are not used; the frog exchanges gases by **diffusion through its moist skin** (**cutaneous respiration**), taking oxygen from the water and air in the mud.',
          sol: 'Hibernation; skin.',
          scheme: [['Hibernation', 1], ['Gas exchange through moist skin', 1]],
          d: 2, c: 'understanding', t: [2],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 1000 || 'value');
}
{
  add('dissect-case', mk.case({
    passage: 'A teacher demonstrates a model of a frog’s internal organs. A pair of yellowish oval bodies is attached to the front ends of two dark red, bean-shaped organs by thin folds. About ten to twelve fine tubes run from each yellow body into the red organ beside it. A duct from each red organ leads back to a small chamber at the hind end of the body.',
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'The model shows the urinogenital system of',
        right: 'a male frog',
        wrong: ['a female frog', 'a tadpole', 'either sex, since the systems are identical'],
        sol: 'Testes with vasa efferentia entering the kidneys are found in the male — option (@K).',
        d: 2, c: 'analysis', t: [2],
      })),
      part('b', mcq({
        stem: 'The fine tubes running from each yellow body into the red organ are the',
        right: 'vasa efferentia',
        wrong: ['ureters', 'oviducts', 'renal portal veins'],
        sol: 'Ten to twelve vasa efferentia leave each testis and enter the kidney — option (@K).',
        d: 1, c: 'recall', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: 'Name the duct leading back from each red organ and the chamber it opens into, and say what each carries.',
        model: 'The duct is the **urinogenital duct** (the ureter of the male), which carries **both urine and sperms**. It opens into the **cloaca**, a small median chamber that passes **faecal matter, urine and sperms** to the outside.',
        sol: 'Urinogenital duct; cloaca.',
        scheme: [['Urinogenital duct carrying urine and sperms', 1], ['Cloaca and its role', 1]],
        d: 2, c: 'understanding', t: [2],
      }), [
        short({
          marks: 2,
          stem: 'Describe the dark red, bean-shaped organs: their position, structural units and the waste they remove.',
          model: 'They are the **kidneys**, compact and **dark red**, lying a little behind the middle of the body cavity on **either side of the vertebral column**. Each is built of many **uriniferous tubules or nephrons**. They remove **urea**, since the frog is **ureotelic**.',
          sol: 'Kidneys: position, nephrons, urea.',
          scheme: [['Position and nephrons', 1], ['Urea; ureotelic', 1]],
          d: 2, c: 'understanding', t: [2],
        }),
      ]),
    ],
  }));
}
