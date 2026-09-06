import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Check for reduced motion preference
const prefersReducedMotion = typeof window !== 'undefined' 
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : false;

export const scrollTriggerDefaults = {
  start: 'top 85%',
  once: true,
};

export const animations = {
  fadeUp: (element: Element | string, options = {}) => {
    if (prefersReducedMotion) {
      return gsap.set(element, { opacity: 1, y: 0 });
    }
    return gsap.fromTo(element, 
      { opacity: 0, y: 30 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: 'power3.out',
        ...options 
      }
    );
  },
  
  fadeIn: (element: Element | string, options = {}) => {
    if (prefersReducedMotion) {
      return gsap.set(element, { opacity: 1 });
    }
    return gsap.fromTo(element, 
      { opacity: 0 }, 
      { 
        opacity: 1, 
        duration: 0.8, 
        ease: 'power2.out',
        ...options 
      }
    );
  },
  
  staggerChildren: (parent: Element | string, childSelector: string, options = {}) => {
    if (prefersReducedMotion) {
      return gsap.set(`${parent} ${childSelector}`, { opacity: 1, y: 0 });
    }
    return gsap.fromTo(`${parent} ${childSelector}`, 
      { opacity: 0, y: 20 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.1, 
        ease: 'power2.out',
        ...options 
      }
    );
  }
};

export { gsap, ScrollTrigger };
