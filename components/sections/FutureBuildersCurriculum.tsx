'use client';

import { motion } from 'framer-motion';
import { TiltCard } from '@/components/motion/TiltCard';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { spring } from '@/lib/motion';

const CURRICULUM = [
  {
    weeks: 'Weeks 1-4',
    title: 'Software & Computing',
    desc: 'Python, APIs, and SQLite databases. No prior coding required.',
    usedFor: 'Build a working Python tool and database backend for your final capstone.',
    color: 'bg-brand-blue text-brand-cream',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    )
  },
  {
    weeks: 'Weeks 5-6',
    title: 'AI & Automation',
    desc: 'Machine learning, deep learning, RL agents, and image processing.',
    usedFor: 'Train an AI model and integrate a smart assistant into your product.',
    color: 'bg-brand-yellow text-brand-black',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      </svg>
    )
  },
  {
    weeks: 'Weeks 7-9',
    title: 'IoT & Robotics',
    desc: 'Low-voltage ESP32 electronics, sensors, servos, and network connectivity.',
    usedFor: 'Wire sensors and a servo motor to give your software a physical body.',
    color: 'bg-brand-black text-brand-cream',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
      </svg>
    )
  },
  {
    weeks: 'Weeks 10-12',
    title: 'Entrepreneurship',
    desc: 'Market discovery, customer interviews, cost sheets, and Capstone Demo Day.',
    usedFor: 'Pitch your final integrated prototype to parents, teachers, and guests.',
    color: 'bg-brand-red text-brand-cream',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
      </svg>
    )
  }
];

export function FutureBuildersCurriculum() {
  return (
    <div className="mb-24 md:mb-48 pt-16 md:pt-32">
      <ScrollReveal>
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-bold mb-6">Four Modules.</h2>
          <p className="text-xl md:text-2xl text-brand-black/70 max-w-2xl mx-auto">
            75 hours of hands-on building over 12 weekends. Everything from basic Python to autonomous hardware.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CURRICULUM.map((block, i) => (
          <ScrollReveal key={block.title} delay={i * 0.1}>
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={spring.playful}
              className="h-full"
            >
              <TiltCard className="h-full">
                <div className={`p-8 h-full border-2 border-brand-black shadow-[6px_6px_0_0_#141414] rounded-2xl flex flex-col ${block.color}`}>
                  <div className="mb-6 opacity-90">
                    {block.icon}
                  </div>
                  <p className="text-sm font-bold tracking-widest uppercase mb-4 opacity-80">{block.weeks}</p>
                  <h3 className="text-3xl font-bold mb-4 leading-tight">{block.title}</h3>
                  <p className="text-lg opacity-90 mb-8 flex-grow">{block.desc}</p>
                  
                  <div className="bg-brand-cream/10 p-5 rounded-xl border border-brand-cream/20 mt-auto">
                    <p className="text-xs font-bold tracking-widest uppercase mb-2 opacity-80">Outcome</p>
                    <p className="text-sm font-medium">{block.usedFor}</p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
