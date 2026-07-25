import {
  Home,
  User,
  Briefcase,
  BarChart3,
  Layers,
  FileText,
  Mail,
  Github,
  Linkedin,
  Send,
  Code2,
  Server,
  PenTool,
  Gauge,
  Award,
  FolderKanban,
  Users,
  Smile,
  GraduationCap,
  type LucideIcon,
} from 'lucide-react'

export interface NavItem {
  id: string
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  { id: 'hero', icon: Home },
  { id: 'about', icon: User },
  { id: 'projects', icon: Briefcase },
  { id: 'skills', icon: BarChart3 },
  { id: 'services', icon: Layers },
  { id: 'blog', icon: FileText },
  { id: 'contacts', icon: Mail },
]

export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/mywork2000001-ops/portfolio', icon: Github },
  { label: 'LinkedIn', href: 'https://linkedin.com/', icon: Linkedin },
  { label: 'Telegram', href: 'https://t.me/', icon: Send },
  { label: 'Email', href: 'mailto:mywork2000001@gmail.com', icon: Mail },
]

export const stats = [
  { icon: Award, value: '9+', color: 'bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400' },
  { icon: FolderKanban, value: '20+', color: 'bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400' },
  { icon: Users, value: '15+', color: 'bg-orange-100 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400' },
  { icon: Smile, value: '100%', color: 'bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400' },
]

export interface Project {
  title: string
  tags: { name: string; className: string }[]
  gradient: string
  /** Ссылка на живой проект/демо. Оставь '#', пока не появится реальный адрес. */
  url: string
}

export const projects: Project[] = [
  {
    title: 'EduHub',
    tags: [
      { name: 'Node.js', className: 'bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400' },
      { name: 'JavaScript', className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400' },
      { name: 'REST API', className: 'bg-neutral-200 text-neutral-800 dark:bg-neutral-500/20 dark:text-neutral-300' },
    ],
    gradient: 'from-indigo-500 via-violet-500 to-purple-600',
    url: 'https://hub-educat-on.vercel.app',
  },
  {
    title: 'Cədvəl',
    tags: [
      { name: 'Express', className: 'bg-neutral-200 text-neutral-800 dark:bg-neutral-500/20 dark:text-neutral-300' },
      { name: 'Firestore', className: 'bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400' },
      { name: 'Electron', className: 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-400' },
    ],
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    url: 'https://mekteb-cedvel-teyin.vercel.app',
  },
  {
    title: 'Mekteb müəllim',
    tags: [
      { name: 'Next.js', className: 'bg-neutral-200 text-neutral-800 dark:bg-neutral-500/20 dark:text-neutral-300' },
      { name: 'TypeScript', className: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400' },
      { name: 'PostgreSQL', className: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-400' },
    ],
    gradient: 'from-fuchsia-500 via-pink-500 to-rose-500',
    url: 'https://arti-mu.vercel.app',
  },
  {
    title: 'Repetitor',
    tags: [
      { name: 'React', className: 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-400' },
      { name: 'Node.js', className: 'bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400' },
      { name: 'PostgreSQL', className: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-400' },
    ],
    gradient: 'from-amber-500 via-orange-500 to-red-500',
    url: 'https://repetitor-rho.vercel.app/login',
  },
  {
    title: 'Family OS',
    tags: [
      { name: 'Next.js', className: 'bg-neutral-200 text-neutral-800 dark:bg-neutral-500/20 dark:text-neutral-300' },
      { name: 'NestJS', className: 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400' },
      { name: 'PostgreSQL', className: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-400' },
    ],
    gradient: 'from-emerald-500 via-green-500 to-lime-600',
    url: 'https://family-os-web.vercel.app',
  },
]

export const skills = [
  { name: 'HTML5', color: 'text-orange-500' },
  { name: 'CSS3', color: 'text-blue-500' },
  { name: 'JavaScript', color: 'text-yellow-500' },
  { name: 'TypeScript', color: 'text-blue-600' },
  { name: 'React', color: 'text-sky-500' },
  { name: 'Node.js', color: 'text-green-600' },
  { name: 'MongoDB', color: 'text-green-700' },
  { name: 'PostgreSQL', color: 'text-indigo-600' },
  { name: 'Git', color: 'text-orange-600' },
]

export const serviceIcons: LucideIcon[] = [Code2, Server, PenTool, Gauge]

export const contacts = {
  email: 'mywork2000001@gmail.com',
  phone: '+994 77 302 00 59',
}

export const educationIcon = GraduationCap
export const educationYears = ['2012–2017', '2003–2007', '2023–2025']
