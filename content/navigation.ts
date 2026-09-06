export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavigationConfig {
  main: NavItem[];
  secondary: NavItem[];
  cta: {
    label: string;
    href: string;
  };
  footer: {
    columns: {
      title: string;
      links: NavItem[];
    }[];
    legal: NavItem[];
  };
}

export const navigation: NavigationConfig = {
  main: [
    { label: 'The SOYL Method', href: '/method', description: 'Our approach to outcome-based learning' },
    { label: 'What We Teach', href: '/what-we-teach', description: 'Workshops, programs and learning experiences' },
    { label: 'For Schools', href: '/schools', description: 'Bring SOYL to your classrooms' },
    { label: 'Journal', href: '/journal', description: 'Ideas about learning and technology' },
    { label: 'About', href: '/about', description: 'Why SOYL Academy exists' },
  ],
  secondary: [
    { label: 'For Students', href: '/students' },
  ],
  cta: {
    label: 'Bring SOYL to your school',
    href: '/contact',
  },
  footer: {
    columns: [
      {
        title: 'Learn',
        links: [
          { label: 'The SOYL Method', href: '/method' },
          { label: 'What We Teach', href: '/what-we-teach' },
          { label: 'For Schools', href: '/schools' },
          { label: 'For Students', href: '/students' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Journal', href: '/journal' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Use', href: '/terms' },
    ],
  },
};
