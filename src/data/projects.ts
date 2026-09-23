export type LabProject = {
  name: string;
  number: string;
  category: string;
  summary: string;
  details: string;
  features: string[];
  stack: string[];
  image: string;
  imageAlt: string;
  link?: string;
  linkLabel?: string;
};

export const labProjects: LabProject[] = [
  {
    name: 'Sanitary Shop POS',
    number: '01',
    category: 'Windows desktop software / Version 1.2.3',
    summary: 'A complete offline cash register made for sanitary shops.',
    details: 'Products, billing, stock, QR labels, receipt printing, sales history, backups, staff roles, and device-bound licensing work locally on a Windows laptop without a browser, internet connection, Python installation, or database server.',
    features: ['Offline billing and stock', 'QR labels and native printing', 'Backups and sales history', 'Owner, Manager, and Cashier roles'],
    stack: ['Python 3.13', 'Tkinter', 'SQLite', 'PyInstaller'],
    image: '/Image/Projects/sanitary-shop-pos.png',
    imageAlt: 'Sanitary Shop POS billing and stock desktop application',
  },
  {
    name: 'Sociapi Society Management System',
    number: '02',
    category: 'Internal operations platform',
    summary: 'One working system for the society behind the public website.',
    details: 'A lightweight application for membership, events, attendance, communications, authentication, administration, and activity reporting across Sociapi operations.',
    features: ['Member management', 'Attendance and reports', 'Email and WhatsApp workflows', 'Admin tools and activity logs'],
    stack: ['React', 'Vite', 'Supabase', 'Serverless functions'],
    image: '/Image/Projects/sociapi-management-system.png',
    imageAlt: 'Sociapi Society Management System organization dashboard',
  },
  {
    name: 'Zuhair Portfolio',
    number: '03',
    category: 'Portfolio website',
    summary: 'A focused personal website for selected development and design work.',
    details: 'A live portfolio built to present projects, capabilities, and contact information through a direct, responsive web experience.',
    features: ['Responsive website', 'Project presentation', 'Personal brand system', 'Direct contact routes'],
    stack: ['Web Design', 'Frontend Development', 'Responsive UI'],
    image: '/Image/Projects/zuhair-portfolio.png',
    imageAlt: 'Zuhair portfolio website interactive home screen',
    link: 'https://xuhair.netlify.app/',
    linkLabel: 'Visit live website',
  },
];

export const designProjects = [
  {
    title: 'AGENTUM 2026',
    type: 'Event campaign design',
    image: '/Image/Projects/agentum-poster.jpg',
    alt: 'AGENTUM 2026 event campaign poster designed for Sociapi Society',
  },
  {
    title: 'MEHFIL AI 2026',
    type: 'Event identity and poster',
    image: '/Image/Projects/mehfil-ai-poster.jpg',
    alt: 'MEHFIL AI 2026 event poster designed for Sociapi Society',
  },
  {
    title: 'Fathers Day',
    type: 'Social media creative',
    image: '/Image/Projects/fathers-day-poster.jpg',
    alt: 'Fathers Day social media poster designed for Sociapi Society',
  },
];
