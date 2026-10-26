import {
  Code2, Server, Database, Brain, Wrench,
  type LucideIcon
} from 'lucide-react'

/* ===== Type Definitions ===== */
export interface NavLink {
  label: string
  href: string
}

export interface SocialLink {
  label: string
  href: string
  icon: 'linkedin' | 'github' | 'mail'
}

export interface HighlightCard {
  title: string
  description: string
  icon: string
}

export interface SkillCategory {
  title: string
  icon: LucideIcon
  skills: string[]
}

export interface ProjectContribution {
  text: string
}

export interface Project {
  id: string
  title: string
  category: string
  description: string
  contributions: ProjectContribution[]
  tags: string[]
  visual: 'cv-platform' | 'grocery-store' | 'file-sharing'
}

export interface Publication {
  title: string
  conference: string
  institution: string
  date: string
  summary: string
}

export interface Education {
  degree: string
  institution: string
  period?: string
  cgpa: string
  icon: 'master' | 'bachelor'
}

export interface Certification {
  title: string
  issuer: string
  score?: string
}

/* ===== Data ===== */

export const personalInfo = {
  name: 'Dhinesh Swaminathan M',
  firstName: 'Dhinesh',
  title: 'Full Stack Developer & AI Engineer',
  avatar: '/dhinesh.jpg',
  email: 'dhineshswaminathan03@gmail.com',
  // phone: '9751735525',
  linkedIn: 'https://www.linkedin.com/in/dhineshswaminathan',
  github: 'https://github.com/dsn31', // Placeholder — replace with actual GitHub URL
  summary: `MCA graduate with a strong foundation in full-stack development, building scalable web applications using React.js, FastAPI, Java, Python, and SQL. Experienced in designing REST APIs, optimizing application performance, and developing AI-powered solutions. Passionate about building reliable software products and solving real-world engineering challenges.`,
  aboutText: `I'm an MCA graduate passionate about building reliable software products and intelligent applications. My technical interests span full-stack development, REST API design, database optimization, and AI-powered computer vision systems. I enjoy turning complex problems into practical solutions through clean code, thoughtful architecture, and user-focused design.`,
  contactCta: `I'm open to opportunities where I can contribute to full-stack engineering, AI-powered applications, and software development.`,
  heroDescription: `I build scalable web applications and intelligent AI solutions, combining modern frontend experiences, robust backend systems, and computer vision to solve real-world problems.`,
} as const

export const navLinks: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Research', href: '#research' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

export const socialLinks: SocialLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dhineshswaminathan', icon: 'linkedin' },
  { label: 'GitHub', href: '#', icon: 'github' },
  { label: 'Email', href: 'mailto:dhineshswaminathan03@gmail.com', icon: 'mail' },
]

export const roles: string[] = [
  'Full Stack Developer',
  'AI Engineer',
  'Computer Vision Enthusiast',
  'Software Developer',
]

export const highlightCards: HighlightCard[] = [
  {
    title: 'MCA Graduate',
    description: 'Master of Computer Applications with strong academic foundation',
    icon: '🎓',
  },
  {
    title: 'Full Stack Development',
    description: 'Building end-to-end web applications with modern frameworks',
    icon: '⚡',
  },
  {
    title: 'AI & Computer Vision',
    description: 'Developing intelligent detection and analysis systems',
    icon: '🤖',
  },
  {
    title: 'Research & Innovation',
    description: 'Published research in AI-driven crowd analytics',
    icon: '📄',
  },
]

export const skillCategories: SkillCategory[] = [
  {
    title: 'Programming Languages',
    icon: Code2,
    skills: ['Java', 'Python', 'C', 'JavaScript', 'TypeScript'],
  },
  {
    title: 'Frontend Development',
    icon: Code2,
    skills: ['React.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'Vite', 'React Query', 'shadcn/ui'],
  },
  {
    title: 'Backend Development',
    icon: Server,
    skills: ['Node.js','Express.js','Python FastAPI', 'REST API Development'],
  },
  {
    title: 'Databases',
    icon: Database,
    skills: ['MySQL', 'PostgreSQL', 'Supabase'],
  },
  {
    title: 'Tools & Platforms',
    icon: Wrench,
    skills: ['Git', 'GitHub'],
  },
  {
    title: 'AI & Computer Vision',
    icon: Brain,
    skills: ['OpenCV', 'YOLOv8', 'Object Detection', 'Pose Estimation', 'Real-time Video Analytics'],
  },
]

export const projects: Project[] = [
  {
    id: 'cv-platform',
    title: 'Real-Time Computer Vision Surveillance Platform',
    category: 'AI / COMPUTER VISION / FULL STACK',
    description:
      'Developed a full-stack edge AI surveillance platform for real-time detection and analysis of security-related events using React.js, FastAPI, OpenCV, and YOLOv8.',
    contributions: [
      { text: 'Developed a real-time detection pipeline for weapons, fights, unattended baggage, and crowd-related events.' },
      { text: 'Combined custom YOLOv8 object detection with pose estimation for real-time threat detection.' },
      { text: 'Built a FastAPI backend with asynchronous processing and REST APIs for low-latency video analysis.' },
      { text: 'Designed a React.js dashboard with secure routing, state management, HTML5 Canvas overlays, live alerts, and bounding-box visualization.' },
    ],
    tags: ['React.js', 'FastAPI', 'Python', 'OpenCV', 'YOLOv8', 'REST APIs', 'HTML5 Canvas'],
    visual: 'cv-platform',
  },
  {
    id: 'market-buddy',
    title: 'Market Buddy — Full-Stack Grocery Store Platform',
    category: 'FULL STACK / E-COMMERCE',
    description:
      'Built a responsive grocery shopping platform with product browsing, cart management, checkout, and an administrative interface for inventory and order management.',
    contributions: [
      { text: 'Developed a responsive React frontend for browsing products and managing the shopping cart.' },
      { text: 'Implemented secure administrative workflows with CRUD operations and inventory/order updates using Supabase.' },
      { text: 'Managed client-side state with React Hooks and TypeScript schemas.' },
      { text: 'Built a high-performance, accessible user interface using Tailwind CSS and shadcn/ui.' },
    ],
    tags: ['React.js', 'TypeScript','Node.js','Express.js', 'Supabase', 'Tailwind CSS', 'shadcn/ui'],
    visual: 'grocery-store',
  },
  {
    id: 'file-sharing',
    title: 'Cloud-Native Micro File Sharing Platform',
    category: 'BACKEND / CLOUD-NATIVE / FULL STACK',
    description:
      'Developed a secure file-sharing application using FastAPI and React.js, focusing on authentication, reliable API handling, and database performance.',
    contributions: [
      { text: 'Developed a secure file-sharing system designed to handle 100+ requests.' },
      { text: 'Improved API response time by approximately 25% through SQL query optimization.' },
      { text: 'Implemented access-based authentication.' },
      { text: 'Identified and resolved backend issues.' },
    ],
    tags: ['FastAPI', 'Python', 'React.js', 'SQL', 'Authentication', 'REST APIs'],
    visual: 'file-sharing',
  },
]

export const publication: Publication = {
  title: 'AI-Driven Real-Time Crowd Analytics and Anomaly Detection for Public Safety in High-Density Environments',
  conference: 'International Conference on Contemporary Mathematics and Innovations (ICCMI-2026)',
  institution: 'Thiagarajar College of Engineering, Madurai',
  date: 'July 2026',
  summary:
    'Research focused on real-time crowd analytics and anomaly detection for public safety in high-density environments, exploring AI-driven approaches to identifying potentially abnormal crowd activity.',
}

export const educationList: Education[] = [
  {
    degree: 'Master of Computer Applications (MCA)',
    institution: 'P.S.N.A. College of Engineering and Technology',
    period: '2024–2026',
    cgpa: '8.6',
    icon: 'master',
  },
  {
    degree: 'Bachelor of Science in Mathematics',
    institution: 'Thiagarajar College, Madurai',
    period: '2021–2024',
    cgpa: '8.53',
    icon: 'bachelor',
  },
]

export const certifications: Certification[] = [
  {
    title: 'C++, C, Advanced C++',
    issuer: 'Spoken Tutorial — IIT Bombay',
  },
  {
    title: 'LaTeX Certification',
    issuer: 'Spoken Tutorial — IIT Bombay',
    score: '98%',
  },
]
