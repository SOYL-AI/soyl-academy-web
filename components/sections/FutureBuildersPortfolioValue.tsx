'use client';

import { ScrollReveal } from '@/components/motion/ScrollReveal';

const PORTFOLIO_PILLARS = [
  {
    tag: 'Artifact 01',
    title: 'Live GitHub Code Repository',
    subtitle: 'Public, verifiable codebase',
    desc: 'Students push their Python scripts, API endpoints, and ESP32 microcontroller firmware to a clean GitHub repo with architecture diagrams and README documentation.',
    metric: 'Production-ready code',
    color: 'bg-brand-cream',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
      </svg>
    ),
  },
  {
    tag: 'Artifact 02',
    title: 'Recorded Capstone Pitch',
    subtitle: 'Demo Day video recording',
    desc: 'A recorded 3-minute pitch where the student explains their hardware-software architecture, user testing, and business viability. Perfect to embed in university application portfolios.',
    metric: 'Pitch & defense proof',
    color: 'bg-white',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7"></polygon>
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
      </svg>
    ),
  },
  {
    tag: 'Artifact 03',
    title: 'Physical Working Hardware',
    subtitle: 'ESP32-C3 integrated device',
    desc: 'Not a virtual simulation. A physical working gadget with live sensor feeds, cloud connectivity, and embedded machine learning that the student builds, keeps, and iterates on.',
    metric: 'Real functional prototype',
    color: 'bg-white',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
        <rect x="9" y="9" width="6" height="6"></rect>
        <line x1="9" y1="1" x2="9" y2="4"></line>
        <line x1="15" y1="1" x2="15" y2="4"></line>
        <line x1="9" y1="20" x2="9" y2="23"></line>
        <line x1="15" y1="20" x2="15" y2="23"></line>
        <line x1="20" y1="9" x2="23" y2="9"></line>
        <line x1="20" y1="14" x2="23" y2="14"></line>
        <line x1="1" y1="9" x2="4" y2="9"></line>
        <line x1="1" y1="14" x2="4" y2="14"></line>
      </svg>
    ),
  },
  {
    tag: 'Artifact 04',
    title: 'Verifiable Completion Credential',
    subtitle: '75 Contact Hours & Skills Rubric',
    desc: 'Official SOYL Academy certificate verifying practical hours across Software, AI, IoT, and Entrepreneurship—ideal for high school profiles, Common App extracurriculars, and STEM internships.',
    metric: 'Verifiable credential',
    color: 'bg-brand-cream',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    ),
  },
];

export function FutureBuildersPortfolioValue() {
  return (
    <section className="mb-24 md:mb-40 border-t-2 border-brand-black/10 pt-16 md:pt-32">
      <ScrollReveal>
        <div className="max-w-3xl mb-12 md:mb-16">
          <div className="inline-block bg-brand-black text-brand-cream px-3 py-1 mb-4 rounded border border-brand-black">
            <span className="text-xs font-bold uppercase tracking-widest">
              College & Portfolio Ready • Grades 10 to 12 Focus
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight text-brand-black">
            Beyond test scores. Proof-of-work that stands out in university admissions.
          </h2>
          <p className="text-lg md:text-xl text-brand-black/75 leading-relaxed font-medium">
            Top STEM universities, international applications (Common App, UC), and internship recruiters want
            evidence of what a student has actually built. Future Builders gives your child four tangible proof-of-work
            assets to showcase on essays, resumes, and interviews.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
        {PORTFOLIO_PILLARS.map((item, idx) => (
          <ScrollReveal key={idx} delay={idx * 0.08}>
            <div
              className={`p-6 sm:p-8 rounded-2xl border-2 border-brand-black shadow-[6px_6px_0_0_#141414] hover:shadow-[10px_10px_0_0_#141414] hover:-translate-y-1 transition-all ${item.color} flex flex-col justify-between h-full`}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-brand-yellow text-brand-black border-2 border-brand-black flex items-center justify-center shadow-[2px_2px_0_0_#141414]">
                    {item.icon}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-black/50 border border-brand-black/20 px-2.5 py-1 rounded">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-brand-black mb-1">{item.title}</h3>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-blue mb-3">{item.subtitle}</p>
                <p className="text-sm sm:text-base text-brand-black/70 leading-relaxed font-medium mb-6">
                  {item.desc}
                </p>
              </div>
              <div className="pt-4 border-t border-brand-black/10 flex items-center justify-between text-xs font-bold text-brand-black">
                <span className="text-brand-black/60">Portfolio Outcome:</span>
                <span className="bg-brand-black text-brand-cream px-2 py-0.5 rounded font-mono text-[11px]">
                  {item.metric}
                </span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Age Bracket Tailoring Banner */}
      <ScrollReveal delay={0.2}>
        <div className="bg-brand-yellow/30 border-2 border-brand-black rounded-2xl p-6 sm:p-8 shadow-[6px_6px_0_0_#141414]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
            <div className="border-b md:border-b-0 md:border-r border-brand-black/20 pb-6 md:pb-0 md:pr-6">
              <span className="inline-block bg-brand-blue text-brand-cream text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded border border-brand-black mb-3">
                Grades 7 to 9 Track
              </span>
              <h4 className="text-xl font-bold mb-2">Hands-On Maker Curiosity</h4>
              <p className="text-sm text-brand-black/75 leading-relaxed font-medium">
                Focus on sparking deep genuine interest in technology. Complete beginners build confidence in writing
                Python, wiring circuits, and seeing code control physical devices in the real world.
              </p>
            </div>
            <div>
              <span className="inline-block bg-brand-black text-brand-cream text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded border border-brand-black mb-3">
                Grades 10 to 12 Track
              </span>
              <h4 className="text-xl font-bold mb-2">High School Portfolio & CV Credentials</h4>
              <p className="text-sm text-brand-black/75 leading-relaxed font-medium">
                Focus on engineering rigor, machine learning integration, public GitHub documentation, and Demo Day
                presentation skills that elevate college application profiles and STEM competitive programs.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
