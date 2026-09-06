export interface SiteMetadata {
  title: string;
  description: string;
  url: string;
}

export interface SiteContent {
  meta: SiteMetadata;
  home: {
    sections: Array<{
      id: string;
      title: string;
      content: string;
      [key: string]: unknown;
    }>;
  };
  method: {
    title: string;
    description: string;
    pillars: Array<{
      title: string;
      description: string;
    }>;
  };
  schools: {
    title: string;
    description: string;
    content: string;
  };
  students: {
    title: string;
    description: string;
    content: string;
  };
  about: {
    title: string;
    description: string;
    content: string;
  };
  whatWeTeach: {
    title: string;
    description: string;
    categories: Array<{
      title: string;
      description: string;
    }>;
  };
  contact: {
    title: string;
    description: string;
    content: string;
  };
}

export const siteContent: SiteContent = {
  meta: {
    title: "SOYL Academy",
    description: "Premium outcome-based learning.",
    url: "https://soylacademy.com",
  },
  home: {
    sections: [
      { id: '01', title: 'Hero', content: 'We build learning experiences that matter.' },
      { id: '02', title: 'Problem', content: 'Education needs to change.' },
      { id: '03', title: 'Solution', content: 'Outcome-based learning is the key.' },
      { id: '04', title: 'Method', content: 'Our method focuses on real skills.' },
      { id: '05', title: 'Proof', content: 'Students love our programs.' },
      { id: '06', title: 'Schools', content: 'Partnering with forward-thinking schools.' },
      { id: '07', title: 'Programs', content: 'Curriculum designed for the future.' },
      { id: '08', title: 'Journal', content: 'Thoughts on the future of education.' },
      { id: '09', title: 'Team', content: 'Built by educators and technologists.' },
      { id: '10', title: 'FAQ', content: 'Answers to common questions.' },
      { id: '11', title: 'CTA', content: 'Bring SOYL to your school today.' },
      { id: '12', title: 'Footer', content: 'SOYL Academy' },
      { id: '13', title: 'Extra 1', content: 'More content here.' },
      { id: '14', title: 'Extra 2', content: 'And even more content here.' }
    ]
  },
  method: {
    title: 'The SOYL Method',
    description: 'Outcome-based learning framework.',
    pillars: [
      { title: 'Understand', description: 'Grasp the core concepts fundamentally.' },
      { title: 'Apply', description: 'Put knowledge into practice immediately.' },
      { title: 'Create', description: 'Build something new with what you know.' },
      { title: 'Defend', description: 'Explain and justify your decisions.' },
      { title: 'Reflect', description: 'Look back to improve moving forward.' }
    ]
  },
  schools: {
    title: 'For Schools',
    description: 'Bring SOYL to your classrooms.',
    content: 'We partner with schools to deliver outcome-based learning programs that engage students and empower teachers.'
  },
  students: {
    title: 'For Students',
    description: 'Learning experiences that matter.',
    content: 'Join our programs to learn real skills for the future.'
  },
  about: {
    title: 'About',
    description: 'Why SOYL Academy exists.',
    content: 'SOYL Academy was founded to bridge the gap between traditional education and the skills needed in the modern world.'
  },
  whatWeTeach: {
    title: 'What We Teach',
    description: 'Workshops, programs and learning experiences.',
    categories: [
      { title: 'AI & Technology', description: 'Understand the tools shaping the world — and learn to use them thoughtfully.' },
      { title: 'Building & Making', description: 'Learn by designing, experimenting and creating.' },
      { title: 'Communication & Ideas', description: 'Question, present, debate and defend what you believe.' },
      { title: 'Problem Solving', description: 'Work through problems where there isn\'t always one correct answer.' }
    ]
  },
  contact: {
    title: 'Contact Us',
    description: 'Get in touch to bring SOYL to your school.',
    content: 'We would love to hear from you.'
  }
};
