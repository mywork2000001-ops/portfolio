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
  { label: 'Email', href: 'mailto:mywork2000001@gmail.com', icon: Mail },
]

export const stats = [
  { icon: Award, value: '9+', label: 'Лет преподавания', color: 'bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400' },
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
    title: 'EduHub',
    description:
      'Цифровая образовательная экосистема для школы: курсы, живые уроки, тесты, учёт успеваемости и общение учителя, ученика и родителя в одном приложении',
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
    description:
      'Конструктор школьных расписаний с автоматическим планировщиком, мульти-тенантной архитектурой и desktop-версией на Electron',
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
    description:
      'Единая платформа для учителя: AI-генерация ежедневных планов уроков, электронный журнал успеваемости, учёт посещаемости и годовое тематическое планирование по учебным стандартам',
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
    description:
      'Платформа для репетиторов и учебных центров: группы, тесты, видеоуроки, оплата и чат с полной изоляцией данных между учителями',
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
    description:
      'Интеллектуальная операционная система семьи: финансы, покупки, задачи, календарь, цели и AI-секретарь в одном приложении',
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
  email: 'mywork2000001@gmail.com',
  phone: '+994 77 302 00 59',
  location: 'Баку, Азербайджан',
}

export interface EducationItem {
  icon: LucideIcon
  institution: string
  degree: string
  years: string
}

export const education: EducationItem[] = [
  {
    icon: GraduationCap,
    institution: 'Азербайджанский государственный педагогический университет',
    degree: 'Бакалавриат · Учитель математики',
    years: '2012–2017',
  },
  {
    icon: GraduationCap,
    institution: 'Азербайджанский государственный университет нефти и промышленности',
    degree: 'Бакалавриат с отличием · Энергетика и энергетическое машиностроение',
    years: '2003–2007',
  },
  {
    icon: GraduationCap,
    institution: 'Азербайджанский технологический университет',
    degree: 'Магистратура · Компьютерная инженерия',
    years: '2023–2025',
  },
]
