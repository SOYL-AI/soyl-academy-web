'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

const OUTCOMES = [
  {
    question: "What will my child actually learn to do?",
    answer: "By the end of 12 weeks, your child will write and debug Python programs, train small AI models to recognize images, wire physical IoT circuits, and present a final business pitch. They will move from consuming technology to building it."
  },
  {
    question: "Do they need prior coding experience?",
    answer: "No. The curriculum is designed for complete beginners in Grades 7 to 10. We teach everything from scratch, starting with basic logic and moving up to advanced AI and hardware."
  },
  {
    question: "How does the hardware kit work for an online cohort?",
    answer: "Before the cohort begins, we ship the complete ESP32-C3 hardware kit directly to your home. It includes the microcontroller, sensors, servo motors, and a breadboard. During the live online sessions, instructors will guide students step-by-step through wiring and programming their physical kits over video."
  },
  {
    question: "What happens if they miss a live session?",
    answer: "All live weekend sessions are recorded and made available to students. If they miss a class, they can watch the recording and catch up on their weekly project."
  },
  {
    question: "What is Demo Day?",
    answer: "Week 12 is Capstone Demo Day. After building their integrated software, AI, and hardware prototype, teams pitch their product's business viability to parents, teachers, and guests. It builds crucial presentation and entrepreneurial skills."
  }
];

export function FutureBuildersFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mb-24 md:mb-48 border-t-2 border-brand-black/10 pt-16 md:pt-32">
      <ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">What parents need to know.</h2>
            <p className="text-xl text-brand-black/70 leading-relaxed mb-8">
              We focus on measurable outcomes. Your child will leave with a working prototype, a code portfolio, and a fundamental understanding of modern technology.
            </p>
          </div>
          
          <div className="lg:col-span-7">
            <div className="space-y-4">
              {OUTCOMES.map((item, index) => {
                const isOpen = openIndex === index;
                
                return (
                  <div 
                    key={index} 
                    className={`border-2 border-brand-black rounded-xl overflow-hidden transition-colors duration-300 ${isOpen ? 'bg-white shadow-[6px_6px_0_0_#141414]' : 'bg-brand-cream/50 hover:bg-white'}`}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                    >
                      <span className="font-bold text-xl pr-8">{item.question}</span>
                      <div className={`w-8 h-8 rounded-full border-2 border-brand-black flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-brand-yellow' : 'bg-transparent'}`}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </div>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                          <div className="px-6 pb-6 pt-2 text-lg text-brand-black/80 leading-relaxed border-t-2 border-brand-black/5 mx-6">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
