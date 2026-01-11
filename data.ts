import { Experience, Project, SkillCategory, Education, Certification } from './types';

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp1',
    company: 'SPEDMIC Private Limited',
    role: 'Full Stack Web Developer (MERN Stack)',
    period: 'Nov 2024 — Present',
    description: [
      'Architecting dynamic web applications within the MERN ecosystem, aligning technical implementation with high-level business goals.',
      'Optimizing application performance and cross-browser compatibility to ensure sub-second rendering across all device categories.',
      'Implementing scalable backend architectures using Node.js and Express to support high-concurrency user interactions.',
      'Standardizing clean code practices and reusable component libraries to accelerate development cycles by 25%.'
    ]
  },
  {
    id: 'exp2',
    company: 'Evoxty',
    role: 'MERN Stack Developer',
    period: 'Jul 2024 — Present',
    description: [
      'Leading a specialized engineering team (5 members) in the end-to-end delivery of modern digital transformation solutions.',
      'Designing secure API layers and optimized MongoDB schemas to maximize data retrieval efficiency and system uptime.',
      'Integrating multi-channel payment gateways and complex JWT-based authentication protocols for enterprise-level security.',
      'Mentoring junior engineers and conducting peer code reviews to maintain institutional knowledge and code quality.'
    ]
  },
  {
    id: 'exp3',
    company: 'Fiverr (Global Engineering)',
    role: 'Freelance Full Stack Web Developer',
    period: 'Mar 2022 — Jul 2024',
    description: [
      'Delivered 50+ high-performance web applications for a global client base, focusing on responsive system architecture.',
      'Engineered secure RESTful APIs and third-party service integrations to extend core application functionality.',
      'Honed the ability to translate ambiguous business requirements into precise technical specifications and production-ready code.'
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'proj1',
    title: 'Enterprise E-Commerce Hub',
    problem: 'Retailers faced significant latency and lack of real-time inventory synchronization during high-traffic shopping periods.',
    solution: 'Engineered a real-time commerce engine utilizing Redux Toolkit for atomic state management.',
    architecture: 'Full-stack MERN and Stripe for global transaction processing.',
    stack: ['React', 'Redux Toolkit', 'Node.js', 'Stripe', "& more"],
    challenges: 'Solving race conditions in stock updates and implementing secure, resilient checkout pipelines.',
    links: { github: 'https://github.com/sabirsheik/E---Commerce', live: 'https://e-commerce-ten-mu-61.vercel.app' }
  },
 {
  id: 'proj2',
  title: 'AI World Tech Platform',
  problem: 'Users lacked a secure and transparent system to manage ROI-based investments, referral earnings, and wallet balances within a single unified platform.',
  solution: 'Built a full-featured investment application enabling users to invest funds, earn daily ROI, track MLM referral rewards, and manage balances through an internal wallet system with admin-controlled approvals.',
  architecture: 'Complete MERN stack architecture with role-based access control, RESTful APIs, secure transaction flows, and optimized frontend state management for real-time updates.',
  stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Corn Job'],
  challenges: 'Implementing accurate ROI calculations, secure wallet transactions, MLM referral logic, and maintaining data consistency while preventing duplicate payouts and unauthorized actions.',
  links: { 
    github: 'https://github.com/sabirsheik/Crypto-Ai-Roi', 
    live: 'https://client-sigma-gold.vercel.app' 
  }
}

];

export const SKILLS: SkillCategory[] = [
  {
    title: 'Frontend Engine',
    skills: ['Next.js (App Router)', 'React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Redux Toolkit', 'Zustand']
  },
  {
    title: 'Backend Systems',
    skills: ['Node.js', 'Express.js', 'RESTful APIs', 'JWT Auth', 'WebSockets', 'Socket.IO', 'Serverless Functions']
  },
  {
    title: 'Infrastructure',
    skills: ['MongoDB', 'PostgreSQL', 'AWS', 'Vercel', 'Netlify', 'Git / GitHub', 'Docker']
  },
  {
    title: 'Engineering Tools',
    skills: ['Postman', 'VS Code', 'React Query', 'Cloudinary', 'Bcrypt', 'Axios']
  }
];

export const EDUCATION: Education[] = [
  {
    institution: 'The Superior College',
    degree: 'Intermediate/ Computer Science',
    period: '2021 — 2023'
  },
  {
    institution: 'Jinnah Public High School',
    degree: 'Matriculation/ Computer Science',
    period: '2019 — 2021'
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    name: 'Full Stack Web Developer Certification',
    issuer: 'Ehunar Organization',
    date: '2024'
  },
  {
    name: 'MERN Stack Development Specialist',
    issuer: 'NexusBerry Training & Solutions',
    date: '2024'
  }
];