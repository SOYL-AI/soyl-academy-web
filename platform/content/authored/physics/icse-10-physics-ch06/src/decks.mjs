// ICSE 10 Physics ch06 Spectrum — two decks: Part 1 (t01–t02) dispersion of white light by a prism, the visible spectrum and
// the electromagnetic spectrum with the properties common to all its waves; Part 2 (t03–t04) properties and uses of infrared
// and ultraviolet radiation, and scattering of light (blue sky, red Sun at sunrise and other applications).
import { sl, deck, table, svgV, plot, r } from './lib.mjs';
import { DISPERSION, EM_BAND, VISIBLE, SKY_PATHS } from './svgs.mjs';

const V = {
  disp: svgV(DISPERSION, 'White light split by a glass prism into seven colours, red deviated least and violet most'),
  em: svgV(EM_BAND, 'The electromagnetic spectrum on a logarithmic wavelength scale from gamma rays to radio waves'),
  vis: svgV(VISIBLE, 'The visible spectrum from violet at about four hundred nanometres to red at about eight hundred nanometres'),
  sky: svgV(SKY_PATHS, 'Sunlight crossing a short path through the air at noon and a long path at sunrise'),
};

export const deck1 = deck({
  part: 1,
  title: 'Spectrum — Part 1: Dispersion and the electromagnetic spectrum',
  goals: [
    'Explain why a prism splits white light and why violet deviates most and red least',
    'List the colours of the visible spectrum in order of wavelength',
    'Arrange the regions of the electromagnetic spectrum in order of wavelength',
    'State properties common to all electromagnetic waves and use c = f λ',
  ],
  slides: [
    sl('title', 'Where do the colours come from?', {
      b: 'Part 1 — sunlight looks white, yet a glass prism, a cut-glass chandelier or a soap bubble shows it is a mixture of colours. And visible light is only a tiny part of a much bigger family of waves.',
      v: table(['You see', 'What it shows'], [['Colours from a chandelier drop in sunlight', 'White light is a mixture of colours'], ['A prism spreads a beam into a band', 'Each colour bends by a different amount'], ['A TV remote works without visible light', 'There is radiation our eyes cannot see'], ['Doctors photograph bones', 'Some radiation passes through flesh']], 'Table of four observations and what each shows about light and radiation'),
      n: 'Namaste! Hang a cut glass drop in a sunny window and you will see patches of colour on the wall. White sunlight is really a mixture of colours, and glass can separate them. In this part we see how a prism does this, and we meet the whole family of electromagnetic waves, of which visible light is only a small part.',
    }),
    sl('diagram', 'Dispersion of white light by a prism', {
      b: 'When a narrow beam of white light passes through a glass prism, it splits into a band of colours called a **spectrum**: **V I B G Y O R** — violet, indigo, blue, green, yellow, orange, red. This splitting is **dispersion**. **Red** is deviated **least** (it appears nearest the apex side) and **violet** is deviated **most** (nearest the base). A prism does not create the colours; it only **separates** colours already present in white light.',
      v: V.disp,
      n: 'Shine a narrow beam of white light through a prism onto a screen and a band of colours appears: violet, indigo, blue, green, yellow, orange and red. This splitting of white light is called dispersion. Red is bent the least and violet the most. The prism does not add colour; it separates the colours that were already mixed in the white light.',
    }),
    sl('concept', 'Why the colours separate', {
      b: r`In **vacuum (or air)** all colours travel at the same speed, $3 \times 10^{8}$ m s⁻¹. In **glass** each colour has a **different speed**, so the **refractive index of glass depends on the colour (wavelength)**: it is **largest for violet** (shortest wavelength, slowest) and **smallest for red** (longest wavelength, fastest). A larger refractive index means more bending, so **violet deviates most and red least**.`,
      v: table(['Colour', 'Wavelength in air (about)', 'Refractive index of crown glass (about)', 'Deviation'], [['Red', '700 nm', '1.513', 'Least'], ['Yellow', '580 nm', '1.517', 'More'], ['Blue', '470 nm', '1.524', 'More still'], ['Violet', '410 nm', '1.532', 'Most']], 'Table of wavelength, refractive index of crown glass and deviation for four colours'),
      n: 'Why are the colours bent by different amounts? In vacuum all colours travel at the same speed. Inside glass, violet light travels a little more slowly than red light. So glass has a slightly higher refractive index for violet than for red. A higher refractive index means more bending, so violet is deviated the most and red the least.',
    }),
    sl('example', 'Worked example: red and violet in glass', {
      b: r`**Problem.** The refractive index of a crown glass is 1.513 for red light and 1.532 for violet light. Find the speed of each colour in the glass and say which is deviated more by a prism. ($c = 3.0 \times 10^{8}$ m s⁻¹)

**Red:** $v = \dfrac{c}{\mu} = \dfrac{3.0 \times 10^{8}}{1.513} = 1.98 \times 10^{8}$ m s⁻¹.

**Violet:** $v = \dfrac{3.0 \times 10^{8}}{1.532} = 1.96 \times 10^{8}$ m s⁻¹.

Violet is slower in glass (larger $\mu$), so it is **deviated more**.`,
      v: table(['Colour', 'μ', 'Speed in glass (× 10⁸ m/s)'], [['Red', '1.513', '1.98'], ['Violet', '1.532', '1.96']], 'Table of refractive index and speed of red and violet light in crown glass'),
      n: 'Divide the speed of light in air by each refractive index. Red light travels at about one point nine eight times ten to the eight metres per second in the glass, and violet at about one point nine six. The difference is small, but violet is slower, has the larger refractive index, and so is bent more by the prism.',
    }),
    sl('check', 'Quick check: which colour bends most?', {
      b: 'Decide where each colour falls on the screen.',
      n: 'Quick check. Remember that violet has the largest refractive index in glass.',
      chk: 'disp-mcq',
    }),
    sl('diagram', 'The visible spectrum', {
      b: 'The **visible spectrum** stretches from about **400 nm (violet)** to about **700–800 nm (red)** (1 nm = 10⁻⁹ m). In order of **increasing wavelength**: violet, indigo, blue, green, yellow, orange, red. Since $c = f \\lambda$, the order of **increasing frequency** is the reverse. Light of a **single wavelength** (for example from a sodium lamp) is **monochromatic** and is **not** split by a prism.',
      v: V.vis,
      n: 'The visible spectrum runs from violet, with a wavelength of about four hundred nanometres, to red, at about seven hundred to eight hundred nanometres. Violet has the shortest wavelength and highest frequency; red has the longest wavelength and lowest frequency. Light of one single wavelength, such as the yellow of a sodium lamp, cannot be split any further.',
    }),
    sl('example', 'Worked example: frequencies of violet and red', {
      b: r`**Problem.** Find the frequencies of violet light ($\lambda = 400$ nm) and red light ($\lambda = 700$ nm) in air. ($c = 3.0 \times 10^{8}$ m s⁻¹)

**Violet:** $f = \dfrac{c}{\lambda} = \dfrac{3.0 \times 10^{8}}{4.0 \times 10^{-7}} = 7.5 \times 10^{14}$ Hz.

**Red:** $f = \dfrac{3.0 \times 10^{8}}{7.0 \times 10^{-7}} = 4.29 \times 10^{14}$ Hz.

Violet has the **higher** frequency; red the **lower**.`,
      v: table(['Colour', 'Wavelength', 'Frequency'], [['Violet', '400 nm', '7.5 × 10¹⁴ Hz'], ['Red', '700 nm', '4.29 × 10¹⁴ Hz']], 'Table of wavelength and frequency of violet and red light'),
      n: 'Frequency equals the speed of light divided by wavelength. For violet light of four hundred nanometres, that gives seven and a half times ten to the fourteen hertz. For red light of seven hundred nanometres, it is about four point three times ten to the fourteen hertz. Shorter wavelength means higher frequency.',
    }),
    sl('check', 'Quick check: order of colours', {
      b: 'Put colours in order of wavelength.',
      n: 'Quick check. Red has the longest wavelength and violet the shortest.',
      chk: 'order-mcq',
    }),
    sl('diagram', 'The electromagnetic spectrum', {
      b: 'Visible light is one small band of a continuous family of **electromagnetic (EM) waves**. In order of **increasing wavelength** (decreasing frequency):\n\n**gamma rays → X-rays → ultraviolet → visible → infrared → microwaves → radio waves**\n\nApproximate wavelengths: gamma below 10⁻¹¹ m; X-rays 10⁻¹¹ to 10⁻⁸ m; UV 10⁻⁸ m to 4 × 10⁻⁷ m; visible 4 × 10⁻⁷ to 8 × 10⁻⁷ m; infrared 8 × 10⁻⁷ m to 10⁻³ m; microwaves 10⁻³ to about 0.3 m; radio waves longer.',
      v: V.em,
      n: 'Visible light belongs to a much larger family called the electromagnetic spectrum. Arranged from the shortest wavelength to the longest, the family is gamma rays, X rays, ultraviolet, visible light, infrared, microwaves and radio waves. On this scale each step is a factor of one hundred, and the visible band is a narrow sliver.',
    }),
    sl('concept', 'Properties common to all EM waves', {
      b: r`All electromagnetic waves:
1. are produced by **accelerated (oscillating) charges** and consist of **electric and magnetic fields** varying at right angles to each other;
2. are **transverse** waves;
3. travel through **vacuum** — no medium is needed — at the same speed $c = 3 \times 10^{8}$ m s⁻¹;
4. obey $c = f \lambda$;
5. are **not deflected** by electric or magnetic fields (they carry no charge);
6. show **reflection, refraction**, interference and diffraction, and carry **energy**.`,
      v: table(['Property', 'All EM waves'], [['Speed in vacuum', '3 × 10⁸ m/s'], ['Medium needed?', 'No'], ['Type of wave', 'Transverse'], ['Deflected by electric or magnetic fields?', 'No'], ['Relation', 'c = f λ']], 'Table of five properties shared by all electromagnetic waves'),
      n: 'Although they behave very differently, all electromagnetic waves have a lot in common. They are made of changing electric and magnetic fields at right angles. They are transverse waves that can travel through empty space, all at three hundred thousand kilometres per second. They are not bent by electric or magnetic fields, and they can be reflected and refracted.',
    }),
    sl('example', 'Worked example: which region is it?', {
      b: r`**Problem.** Identify the region of each radiation. (a) A Wi-Fi router transmits at $6.0 \times 10^{9}$ Hz. (b) A heat lamp emits most strongly at $\lambda = 2.0 \times 10^{-6}$ m. ($c = 3.0 \times 10^{8}$ m s⁻¹)

**(a)** $\lambda = \dfrac{c}{f} = \dfrac{3.0 \times 10^{8}}{6.0 \times 10^{9}} = 0.05$ m $= 5$ cm: between $10^{-3}$ m and 0.3 m, so **microwaves**.

**(b)** $2.0 \times 10^{-6}$ m lies between $8 \times 10^{-7}$ m and $10^{-3}$ m: **infrared**. Its frequency is $\dfrac{3.0 \times 10^{8}}{2.0 \times 10^{-6}} = 1.5 \times 10^{14}$ Hz.`,
      v: table(['Radiation', 'Wavelength', 'Region'], [['Wi-Fi signal, 6.0 GHz', '5 cm', 'Microwaves'], ['Heat lamp', '2.0 μm', 'Infrared']], 'Table identifying the region of the Wi-Fi signal and the heat lamp radiation'),
      n: 'To place a radiation in the spectrum, find its wavelength. For the Wi Fi signal, wavelength is speed divided by frequency, which gives five centimetres: that is in the microwave region. The heat lamp’s wavelength of two micrometres is longer than red light but much shorter than a millimetre, so it is infrared.',
    }),
    sl('check', 'Quick check: a wavelength from a frequency', {
      b: 'Use c = f λ to find a wavelength.',
      n: 'Quick check. Wavelength is the speed of light divided by the frequency.',
      chk: 'em-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Dispersion: splitting of white light into VIBGYOR by a prism.',
        'Cause: refractive index of glass depends on colour; largest for violet, smallest for red.',
        'Violet deviated most, red least; in vacuum all colours have the same speed.',
        'EM spectrum by increasing wavelength: gamma, X-rays, UV, visible, IR, microwaves, radio.',
        'All EM waves: transverse, travel through vacuum at 3 × 10⁸ m/s, c = f λ, not deflected by fields.',
      ],
      v: table(['Idea', 'Key fact'], [['Dispersion', 'μ depends on wavelength'], ['Most deviated', 'Violet'], ['Shortest wavelength (EM)', 'Gamma rays'], ['Longest wavelength (EM)', 'Radio waves']], 'Summary table of four key facts from Part 1'),
      n: 'Let us sum up Part 1. A prism splits white light because glass has a different refractive index for each colour, so violet bends most and red least. Visible light is one small band in the electromagnetic spectrum, which runs from gamma rays to radio waves. All these waves are transverse and travel through vacuum at the same speed.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Say the prism SEPARATES colours already in white light; it does not produce them.',
        'Link: shorter wavelength → larger μ in glass → more deviation.',
        'Memorise the EM order with wavelengths: gamma, X, UV, visible, IR, micro, radio.',
        'In c = f λ, convert nm to m (1 nm = 10⁻⁹ m) and GHz to Hz.',
      ],
      v: table(['Slip', 'Fix'], [['Red deviated most', 'Violet deviated most'], ['Prism adds colours', 'Prism separates colours'], ['Speed of colours differs in vacuum', 'Same speed in vacuum; differs in glass'], ['400 nm used as 400 m', '400 nm = 4 × 10⁻⁷ m']], 'Table of four common slips in Part 1 and their fixes'),
      n: 'Some tips. Write that a prism separates the colours already present in white light. Explain dispersion with the chain: shorter wavelength, larger refractive index, more bending. Learn the order of the electromagnetic spectrum. And in calculations, change nanometres to metres and gigahertz to hertz before using the wave equation.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Spectrum — Part 2: Infrared, ultraviolet and scattering',
  goals: [
    'Give two properties and two uses each of infrared and ultraviolet radiation',
    'Explain why the sky is blue using wavelength-dependent scattering',
    'Explain why the Sun looks red at sunrise and sunset',
    'Explain other effects of scattering such as red danger signals and white clouds',
  ],
  slides: [
    sl('title', 'Light beyond red and violet', {
      b: 'Part 2 — just beyond the red end of the spectrum lies **infrared**, which we feel as heat; just beyond the violet end lies **ultraviolet**, which tans skin. And the way air scatters sunlight paints the sky blue.',
      v: table(['Radiation or effect', 'Everyday example'], [['Infrared', 'Warmth felt near a heater or a hot tawa'], ['Ultraviolet', 'Sun tan after a day at the beach'], ['Scattering', 'Blue sky, red sunrise'], ['Visible light', 'Everything we see']], 'Table of radiations and effects with everyday examples'),
      n: 'Stand near a hot tawa and you feel its warmth without touching it; that is infrared radiation. Spend a day in strong sunshine and your skin may tan; that is ultraviolet. Neither can be seen. In this part we study these two invisible radiations, and then find out why the sky is blue.',
    }),
    sl('concept', 'Infrared radiation: production, detection and properties', {
      b: '**Infrared (IR)** lies beyond the red end of the visible spectrum ($8 \\times 10^{-7}$ m to $10^{-3}$ m). It was found by placing a thermometer beyond the red end of a solar spectrum: the temperature rose.\n- **Produced** by all hot bodies: the Sun, a heater coil, a hot iron, our bodies.\n- **Detected** by its **heating effect**: a thermometer with a blackened bulb, or a **thermopile**; also by special photographic films and sensors.\n- **Properties:** strong **heating effect**; **less scattered** by haze and fog than visible light (longer wavelength); **absorbed by water vapour and carbon dioxide**; mostly **reflected by** shiny surfaces; obeys reflection and refraction.',
      v: table(['Feature', 'Infrared'], [['Position', 'Beyond red'], ['Source', 'Hot bodies'], ['Detector', 'Thermopile, blackened-bulb thermometer'], ['Key property', 'Heating effect; little scattering by haze']], 'Table of the position, source, detector and key property of infrared radiation'),
      n: 'Infrared lies just beyond red light. Every hot object gives it out, from the Sun to a heater coil to your own body. We detect it by its heating effect, using a blackened thermometer or a thermopile. Because its wavelength is long, it is scattered much less by haze and fog than visible light.',
    }),
    sl('concept', 'Uses of infrared', {
      b: '- **Remote controls** of TVs and air conditioners.\n- **Night vision and thermal cameras**, and **photography through haze or fog** (little scattering).\n- **Physiotherapy:** IR lamps warm muscles and relieve pain.\n- **Drying and heating:** drying paint on cars, cooking, warming rooms; greenhouses trap infrared.\n- **Weather forecasting** with infrared photographs from satellites, and **intruder alarms**.',
      v: table(['Use', 'Property used'], [['TV remote control', 'Invisible signal, easily detected by a sensor'], ['Thermal camera', 'Warm bodies give out more infrared'], ['Photography in haze', 'Little scattering'], ['Physiotherapy lamp', 'Heating effect']], 'Table of four uses of infrared radiation and the property each uses'),
      n: 'Infrared has many uses. Your television remote sends invisible infrared pulses. Thermal cameras see warm bodies in the dark. Pictures taken with infrared cut through haze. Doctors use infrared lamps to warm aching muscles, and factories use them to dry paint. Weather satellites take infrared photographs of clouds.',
    }),
    sl('example', 'Worked example: radiation from a heater', {
      b: r`**Problem.** The element of a room heater emits radiation most strongly at a wavelength of $1.5 \times 10^{-5}$ m. (a) Find its frequency. (b) Name the region. (c) Why do you feel it as warmth but cannot see it? ($c = 3.0 \times 10^{8}$ m s⁻¹)

**(a)** $f = \dfrac{c}{\lambda} = \dfrac{3.0 \times 10^{8}}{1.5 \times 10^{-5}} = 2.0 \times 10^{13}$ Hz.

**(b)** The wavelength is longer than $8 \times 10^{-7}$ m and shorter than $10^{-3}$ m: **infrared**.

**(c)** Infrared has a strong heating effect, but its wavelength is beyond the range the eye can detect.`,
      v: table(['Quantity', 'Value'], [['Wavelength', '1.5 × 10⁻⁵ m'], ['Frequency', '2.0 × 10¹³ Hz'], ['Region', 'Infrared'], ['Detected by', 'Skin (warmth), thermopile']], 'Table of the values in the heater example'),
      n: 'Frequency is the speed of light divided by wavelength, which gives two times ten to the thirteen hertz. The wavelength is longer than red light but shorter than a millimetre, so this is infrared. You feel it because infrared has a strong heating effect, but your eyes cannot detect wavelengths that long.',
    }),
    sl('check', 'Quick check: detecting infrared', {
      b: 'Identify the radiation beyond the red end of a spectrum.',
      n: 'Quick check. Think about which radiation has a strong heating effect.',
      chk: 'ir-mcq',
    }),
    sl('concept', 'Ultraviolet radiation: production, detection and properties', {
      b: '**Ultraviolet (UV)** lies beyond the violet end ($10^{-8}$ m to $4 \\times 10^{-7}$ m).\n- **Produced** by very hot bodies such as the **Sun**, electric **arcs** (welding), and **mercury vapour lamps** in quartz tubes.\n- **Detected** by **photographic film** and by **fluorescence**: zinc sulphide or fluorescent paint glows when UV falls on it.\n- **Properties:** causes **fluorescence**; affects photographic plates; **kills germs**; causes **chemical changes** (tanning, fading of colours); **absorbed by ordinary glass** but passes through **quartz**; mostly **absorbed by the ozone layer**.',
      v: table(['Feature', 'Ultraviolet'], [['Position', 'Beyond violet'], ['Sources', 'Sun, electric arc, mercury vapour lamp'], ['Detector', 'Photographic film, fluorescent paint'], ['Passes through', 'Quartz (not ordinary glass)']], 'Table of the position, sources, detectors and transmission of ultraviolet radiation'),
      n: 'Ultraviolet lies just beyond violet light. The Sun, welding arcs and mercury vapour lamps give it out. We detect it with photographic film, or because it makes certain paints glow. Ordinary glass absorbs ultraviolet, so prisms and lamps for it are made of quartz. High in the atmosphere, the ozone layer absorbs most of the Sun’s ultraviolet.',
    }),
    sl('concept', 'Uses and dangers of ultraviolet', {
      b: '**Uses:** **sterilising** water, surgical instruments and air (kills bacteria); **detecting forged notes** and documents (special inks fluoresce); helping the skin make **vitamin D**; fluorescent tubes; studying molecular structure.\n\n**Dangers:** too much UV causes **sunburn**, damages the **eyes** and can cause **skin cancer**. Welders wear dark goggles; we use sunscreen. The **ozone layer** protects life by absorbing most solar UV.',
      v: table(['Use or danger', 'Property'], [['Water purifier', 'Kills germs'], ['Checking currency notes', 'Causes fluorescence'], ['Vitamin D', 'Chemical change in the skin'], ['Sunburn and eye damage', 'High-energy radiation absorbed by tissue']], 'Table of uses and dangers of ultraviolet radiation and the property behind each'),
      n: 'Ultraviolet kills germs, so it is used to purify water and sterilise instruments. Bank staff check notes under ultraviolet lamps, because special inks glow. A little ultraviolet helps our skin make vitamin D, but too much burns the skin and harms the eyes. That is why welders wear dark goggles and why the ozone layer matters.',
    }),
    sl('check', 'Quick check: ultraviolet', {
      b: 'Recognise a property of ultraviolet radiation.',
      n: 'Quick check. Think about which radiation makes certain paints glow.',
      chk: 'uv-mcq',
    }),
    sl('concept', 'Scattering of light', {
      b: r`When light falls on very small particles (air molecules, fine dust), the particles absorb it and send it out again in **all directions**. This is **scattering**. For particles much **smaller than the wavelength**, the intensity of scattered light is roughly proportional to $\dfrac{1}{\lambda^{4}}$ (Rayleigh’s law). So **shorter wavelengths (violet, blue)** are scattered **much more** than **longer wavelengths (red)**. Large particles (water droplets in clouds) scatter all colours **almost equally**.`,
      v: plot({ x: { min: 400, max: 700, label: 'wavelength (nm)' }, y: { min: 0, max: 1.1, label: 'scattering compared with 400 nm' }, functions: [{ expr: '(400/x)^4', label: 'proportional to 1 / wavelength⁴', domain: [400, 700] }], points: [{ at: [400, 1], label: 'violet' }, { at: [450, 0.6243], label: 'blue' }, { at: [700, 0.1066], label: 'red' }] }, 'Graph of relative scattering against wavelength, falling steeply from one at four hundred nanometres to about one tenth at seven hundred nanometres', 'Shorter wavelengths are scattered far more strongly.'),
      n: 'Tiny particles such as air molecules take in light and send it out again in all directions. This is scattering. It depends strongly on wavelength: halve the wavelength and the scattering becomes sixteen times stronger. So violet and blue light are scattered far more than red. Big water droplets, however, scatter all colours about equally.',
    }),
    sl('example', 'Worked example: blue against red', {
      b: r`**Problem.** Compare the scattering of blue light ($\lambda = 450$ nm) with that of red light ($\lambda = 675$ nm) by air molecules.

**Ratio** $= \left(\dfrac{\lambda_{red}}{\lambda_{blue}}\right)^{4} = \left(\dfrac{675}{450}\right)^{4} = 1.5^{4} = 5.0625$.

So blue light is scattered about **5 times** as strongly as red light. This is why scattered skylight looks blue.`,
      v: table(['Colour', 'Wavelength', 'Relative scattering'], [['Blue', '450 nm', 'About 5'], ['Red', '675 nm', '1']], 'Table of wavelength and relative scattering for blue and red light'),
      n: 'Scattering goes as one over the fourth power of wavelength, so the ratio is the red wavelength over the blue wavelength, raised to the fourth power. Six hundred and seventy five divided by four hundred and fifty is one and a half, and one and a half to the fourth power is about five. Blue is scattered about five times as strongly as red.',
    }),
    sl('diagram', 'Blue sky and red sunrise', {
      b: '**Blue sky:** sunlight crossing the atmosphere is scattered by air molecules; **blue** (and violet) is scattered most, so light reaching us from all parts of the sky is mainly blue. (Our eyes are less sensitive to violet, and some violet is absorbed high up, so the sky looks blue rather than violet.)\n\n**Red Sun at sunrise and sunset:** the Sun is near the horizon, so its light travels a **much longer path** through the air. Most of the blue is scattered out of the beam on the way, and the light that reaches us is mainly **red and orange**. At noon the path is short, so the Sun looks white.',
      v: V.sky,
      n: 'At noon, sunlight crosses only a short thickness of air, and the Sun looks white. The blue light scattered sideways fills the sky. At sunrise, the Sun is on the horizon and its light must cross a much longer path through the air. By the time it reaches you, most of the blue has been scattered away, so the Sun looks red.',
    }),
    sl('concept', 'Other effects of scattering', {
      b: '- **Danger signals and brake lights are red:** red is scattered **least**, so it travels farthest through fog and smoke and is seen from a distance.\n- **Clouds are white:** water droplets are large compared with the wavelength and scatter **all colours** about equally.\n- **The sky looks black** from the Moon or to an astronaut in space: there is **no air** to scatter sunlight.\n- **The deep sea looks blue**, partly because of scattering of blue light by water and partly by reflection of the sky.',
      v: table(['Observation', 'Explanation'], [['Red danger lights', 'Red scattered least, seen far away'], ['White clouds', 'Large drops scatter all colours equally'], ['Black sky on the Moon', 'No atmosphere to scatter light'], ['Blue sea', 'Scattering by water, reflection of the sky']], 'Table of four effects of scattering and their explanations'),
      n: 'Scattering explains more everyday sights. Danger signals are red because red light is scattered least and can be seen from far away, even in mist. Clouds look white because their big water drops scatter all colours equally. And on the Moon, which has no air, the sky is black even when the Sun is shining.',
    }),
    sl('check', 'Quick check: the blue sky', {
      b: 'Explain the colour of the sky.',
      n: 'Quick check. Shorter wavelengths are scattered more strongly by air molecules.',
      chk: 'sky-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Infrared: beyond red; from hot bodies; detected by thermopile; heating effect, little scattering; remote controls, night vision, physiotherapy.',
        'Ultraviolet: beyond violet; from Sun, arcs, mercury lamps; detected by fluorescence and film; absorbed by glass, passes quartz; kills germs, detects forged notes, vitamin D.',
        'Scattering by small particles ∝ 1/λ⁴: blue scattered most, red least.',
        'Blue sky; red Sun at sunrise and sunset (long path); red danger signals; white clouds; black sky in space.',
      ],
      v: table(['Radiation or effect', 'Key property'], [['Infrared', 'Heating effect'], ['Ultraviolet', 'Fluorescence, kills germs'], ['Scattering', 'Strongest for short wavelengths']], 'Summary table of three key ideas from Part 2'),
      n: 'Let us sum up Part 2. Infrared lies beyond red, comes from hot objects and is felt as heat. Ultraviolet lies beyond violet, makes some materials glow, kills germs and is stopped by ordinary glass and by the ozone layer. Tiny particles scatter short wavelengths most, which gives us a blue sky and a red rising Sun.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'For IR and UV, give properties AND uses separately, two of each.',
        'Name the detector: thermopile for IR; fluorescence or film for UV.',
        'Blue sky: name the particles (air molecules) and say short wavelengths are scattered more.',
        'Red sunrise: mention the LONGER PATH through the atmosphere.',
      ],
      v: table(['Slip', 'Fix'], [['“Sky is blue because sea is blue”', 'Scattering of short wavelengths by air molecules'], ['Red sun because red is scattered most', 'Red is scattered least; blue is removed'], ['UV passes through window glass', 'Ordinary glass absorbs UV; quartz transmits it'], ['IR detected by fluorescence', 'IR detected by its heating effect']], 'Table of four common slips in Part 2 and their fixes'),
      n: 'Final tips. When asked about infrared or ultraviolet, give two properties and two uses, and name a detector. To explain the blue sky, say that air molecules scatter short wavelengths most. To explain the red rising Sun, say that its light travels a longer path through the air, so the blue is scattered away.',
    }),
  ],
});
