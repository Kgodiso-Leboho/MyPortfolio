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

/* ---------------- PROFILE ---------------- */

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

/* ---------------- NAV ---------------- */

export const navItems: NavItem[] = [
  { to: '/about', label: 'About' },
  { to: '/education', label: 'Education' },
  { to: '/skills', label: 'Skills' },
  { to: '/projects', label: 'Projects' },
  { to: '/cv', label: 'CV' },
  { to: '/contact', label: 'Contact' },
]

/* ---------------- GITHUB PROJECTS (DYNAMIC) ---------------- */

async function fetchGitHubRepos() {
  const res = await fetch(
    'https://api.github.com/users/Kgodiso-Leboho/repos'
  )
  return res.json()
}

function formatTitle(name: string) {
  return name
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

/**
 * Call this inside React (useEffect)
 */
export async function getProjects(): Promise<Project[]> {
  const repos = await fetchGitHubRepos()

  return repos.map((repo: any) => ({
    id: repo.name,
    title: formatTitle(repo.name),
    description: repo.description || 'No description available',
    tech: repo.language ? [repo.language] : [],
    links: [
      {
        label: 'GitHub',
        href: repo.html_url,
      },
    ],
  }))
}

/* ---------------- SKILLS ---------------- */

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


// Education data

export type EducationItem = {
  id: string
  institution: string
  qualification: string
  period: string
  description: string
  highlights: string[]
}

export const education: EducationItem[] = [
  {
    id: 'masters',
    institution: 'North West University (Mafikeng Campus)',
    qualification: 'MSc Computer Science (In Progress)',
    period: '2026 – Present',
    description:
      'Advanced research-focused study in computer science with emphasis on AI, software engineering, and applied machine learning systems.',
    highlights: [
      'Machine Learning Research',
      'NLP & Deep Learning',
      'Research Methodology',
    ],
  },
  {
    id: 'hons',
    institution: 'North West University (Mafikeng Campus)',
    qualification: 'BSc Honours in Computer Science',
    period: '2025',
    description:
      'Specialised postgraduate year focused on advanced computing concepts, research preparation, and machine learning foundations.',
    highlights: [
      'Machine Learning Foundations',
      'Advanced Algorithms',
      'Research Project',
      'Data Science Fundamentals',
      'Academic Writing & Communication',
      'Ethics in Computing',
      'Advanced Networks',
      'Distributed Systems',
    ],
  },
  {
    id: 'undergrad',
    institution: 'North West University (Mafikeng Campus)',
    qualification: 'BSc Computer Science & Mathematics',
    period: '2022 – 2024',
    description:
      'Core foundation in software engineering, mathematics, and computational problem solving.',
    highlights: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming',
      'Computer Networks',
      'Artificial Intelligence',
      'Database Systems',
      'Software Development Lifecycle',
      'Software Testing & Debugging',
      'Software Architecture & Design Patterns',
      'Operating Systems',
      'Structured Programming',
      'Calculus & Linear Algebra',
      'Mathematical Modelling',
      'Differential Equations',
      'Numerical Methods',
      'Real Analysis',
      'Complex Analysis',
      'Combinatorics & Graph Theory',
    ],
  },
]