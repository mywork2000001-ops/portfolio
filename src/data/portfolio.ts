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
  type LucideIcon,
} from 'lucide-react'

export interface NavItem {
  id: string
  label: string
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  { id: 'hero', label: 'Главная', icon: Home },
  { id: 'about', label: 'Обо мне', icon: User },
  { id: 'projects', label: 'Портфолио', icon: Briefcase },
  { id: 'skills', label: 'Навыки', icon: BarChart3 },
  { id: 'services', label: 'Услуги', icon: Layers },
  { id: 'blog', label: 'Блог', icon: FileText },
  { id: 'contacts', label: 'Контакты', icon: Mail },
]

export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/mywork2000001-ops', icon: Github },
  { label: 'LinkedIn', href: 'https://linkedin.com/', icon: Linkedin },
  { label: 'Telegram', href: 'https://t.me/', icon: Send },
  { label: 'Email', href: 'mailto:ferid@example.com', icon: Mail },
]

export const stats = [
  { icon: Award, value: '3+', label: 'Года опыта', color: 'bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400' },
  { icon: FolderKanban, value: '20+', label: 'Проектов', color: 'bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400' },
  { icon: Users, value: '15+', label: 'Клиентов', color: 'bg-orange-100 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400' },
  { icon: Smile, value: '100%', label: 'Довольных клиентов', color: 'bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400' },
]

export interface Project {
  title: string
  description: string
  tags: { name: string; className: string }[]
  gradient: string
  /** Ссылка на живой проект/демо. Оставь '#', пока не появится реальный адрес. */
  url: string
}

export const projects: Project[] = [
  {
    title: 'Taskly',
    description: 'Приложение для управления задачами и командной работы',
    tags: [
      { name: 'React', className: 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-400' },
      { name: 'Node.js', className: 'bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400' },
      { name: 'MongoDB', className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400' },
    ],
    gradient: 'from-indigo-500 via-violet-500 to-purple-600',
    url: '#',
  },
  {
    title: 'FinTrack',
    description: 'Сервис для учёта финансов и анализа расходов',
    tags: [
      { name: 'Next.js', className: 'bg-neutral-200 text-neutral-800 dark:bg-neutral-500/20 dark:text-neutral-300' },
      { name: 'TypeScript', className: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400' },
      { name: 'PostgreSQL', className: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-400' },
    ],
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    url: '#',
  },
  {
    title: 'ShopEase',
    description: 'Интернет-магазин с удобной админ-панелью',
    tags: [
      { name: 'Vue.js', className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400' },
      { name: 'Express', className: 'bg-neutral-200 text-neutral-800 dark:bg-neutral-500/20 dark:text-neutral-300' },
      { name: 'MySQL', className: 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-400' },
    ],
    gradient: 'from-fuchsia-500 via-pink-500 to-rose-500',
    url: '#',
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

export const services = [
  {
    icon: Code2,
    title: 'Веб-разработка',
    description: 'Создание современных и адаптивных веб-приложений',
  },
  {
    icon: Server,
    title: 'Backend разработка',
    description: 'Разработка надёжных API и серверной логики',
  },
  {
    icon: PenTool,
    title: 'UI/UX дизайн',
    description: 'Проектирование удобных интерфейсов и пользовательского опыта',
  },
  {
    icon: Gauge,
    title: 'Оптимизация',
    description: 'Повышение производительности и SEO для быстрых результатов',
  },
]

export const testimonial = {
  quote: 'Ферид — отличный специалист! Работать с ним одно удовольствие.',
  name: 'Алексей Иванов',
  role: 'CEO, TechCorp',
}

export const contacts = {
  email: 'ferid@example.com',
  phone: '+994 77 302 00 59',
  location: 'Баку, Азербайджан',
}
