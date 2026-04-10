export type PortfolioProfile = {
  name: string
  title: string
  tagline: string
  location?: string
  imageUrl?: string
  email: string
  githubUrl: string
  linkedinUrl: string
}

export type NavItem = {
  to: string
  label: string
}

export type ProjectLink = {
  label: string
  href: string
}

export type Project = {
  id: string
  title: string
  description: string
  year?: string
  tech: string[]
  links: ProjectLink[]
}

export type Skill = {
  name: string
  level: 'Foundation' | 'Proficient' | 'Advanced'
}

export type SkillGroup = {
  id: string
  title: string
  description?: string
  skills: Skill[]
}

export const profile: PortfolioProfile = {
  name: 'Kgodiso Austin Leboho',
  title: 'AI and Software Engineer',
  tagline:
    'I build production-grade web products and data/ML systems with clean UX, reliable engineering, and measurable outcomes.',
  imageUrl: '/profile.jpg',

  email: 'kgodisoaustinleboho@gmail.com',
  githubUrl: 'https://github.com/Kgodiso-Leboho',
  linkedinUrl: 'https://www.linkedin.com/in/kgodiso-austin-leboho-17b5a1257/',
}

export const navItems: NavItem[] = [
  { to: '/projects', label: 'Projects' },
  { to: '/skills', label: 'Skills' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/cv', label: 'CV' },
]

export const projects: Project[] = [
  {
    id: 'kays-delicacies',
    title: 'Kays-Delicacies',
    description:
      'A TypeScript-based web project focused on clean UI structure and maintainable front-end components.',
    tech: ['TypeScript', 'React', 'Tailwind CSS', 'Node.js', 'Express', 'PostgreSQL', 'Supabase'],
    links: [{ label: 'GitHub', href: 'https://github.com/Kgodiso-Leboho/Kays-Delicacies' }],
  },
  {
    id: 'cism-623-machine-learning',
    title: 'CISM-623-MACHINE-LEARNING',
    description:
      'Machine learning coursework and experiments organized in Jupyter notebooks for model exploration and evaluation.',
    tech: ['Jupyter Notebook', 'Machine Learning', 'Python', 'Numpy', 'Pandas'],
    links: [{ label: 'GitHub', href: 'https://github.com/Kgodiso-Leboho/CISM-623-MACHINE-LEARNING' }],
  },
  {
    id: 'exovision',
    title: 'ExoVision',
    description:
      'A front-end project emphasizing styling and visual layout implementation using modern CSS techniques.',
    tech: ['CSS', 'Python', 'Flask', 'React', 'XGBoost', 'Random Forest', 'Decision Tree'],
    links: [{ label: 'GitHub', href: 'https://github.com/Kgodiso-Leboho/ExoVision' }],
  },
  {
    id: 'inventory-app',
    title: 'INVENTORY-APP',
    description:
      'A JavaScript application for tracking and managing inventory data with straightforward workflows and clear UX.',
    tech: ['JavaScript', 'Node.js', 'Express', 'Supabase'],
    links: [{ label: 'GitHub', href: 'https://github.com/Kgodiso-Leboho/INVENTORY-APP' }],
  },
  {
    id: 'hybrid-sbert-and-bilstm-research-project',
    title: 'Hybrid-SBERT-and-BILSTM-Research-Project',
    description:
      'A research-oriented NLP project investigating a hybrid SBERT + BiLSTM approach using notebook-driven experimentation.',
    tech: ['Google Colab', 'NLP', 'SBERT', 'BiLSTM', 'Machine Learning', 'Python', 'Numpy', 'Pandas'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/Kgodiso-Leboho/Hybrid-SBERT-and-BILSTM-Research-Project',
      },
    ],
  },
  {
    id: 'myportfolio',
    title: 'MyPortfolio',
    description:
      'A personal portfolio built with TypeScript to showcase software development and data science projects.',
    tech: ['TypeScript', 'React', 'Tailwind CSS'],
    links: [{ label: 'GitHub', href: 'https://github.com/Kgodiso-Leboho/MyPortfolio' }],
  },
]

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    description: 'UX-focused engineering with strong accessibility and performance.',
    skills: [
      { name: 'React', level: 'Advanced' },
      { name: 'TypeScript', level: 'Advanced' },
      { name: 'Tailwind CSS', level: 'Advanced' },
      { name: 'React Router', level: 'Proficient' },
      { name: 'Data Visualization', level: 'Proficient' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    description: 'Reliable services, clean APIs, and pragmatic testing.',
    skills: [
      { name: 'Node.js', level: 'Advanced' },
      { name: 'Python', level: 'Advanced' },
      { name: 'SQL', level: 'Advanced' },
      { name: 'API Design', level: 'Proficient' },
      { name: 'Testing Strategy', level: 'Proficient' },
    ],
  },
  {
    id: 'data',
    title: 'Data Science',
    description: 'ML workflows, evaluation, and observability.',
    skills: [
      { name: 'MLflow', level: 'Proficient' },
      { name: 'Feature Engineering', level: 'Advanced' },
      { name: 'Model Evaluation', level: 'Advanced' },
      { name: 'Data Quality Checks', level: 'Proficient' },
      { name: 'Reproducible Pipelines', level: 'Proficient' },
    ],
  },
]

