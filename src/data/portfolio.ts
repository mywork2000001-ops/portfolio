import muellim from '../assets/projects/muellim.webp'
import sts from '../assets/projects/sts.webp'
import yttm from '../assets/projects/yttm.webp'

export type ProjectKey = 'muellim' | 'sts' | 'yttm'

export interface Project {
  key: ProjectKey
  title: string
  url: string
  image: string
  stack: string[]
  accent: string // цвет полоски/иконки карточки
}

/** Только настоящие, работающие проекты (аудит 07.11.2026). */
export const projects: Project[] = [
  { key: 'sts', title: 'Smart Test Studio', url: 'https://test.fizmatix.com', image: sts, stack: ['React 19', 'TypeScript', 'Tesseract OCR', 'FastAPI', 'PWA'], accent: '#1a66ff' },
  { key: 'muellim', title: 'Müəllim köməkçisi', url: 'https://app.fizmatix.com', image: muellim, stack: ['FastAPI', 'React', 'PostgreSQL', 'Docker', 'Oracle Cloud'], accent: '#c2410c' },
  { key: 'yttm', title: 'YTTM — məktəb saytı', url: 'https://yttm.fizmatix.com', image: yttm, stack: ['React', 'Vite', 'Python API', 'Vercel'], accent: '#d4a72c' },
]

export const archive = [
  'https://mekteb-cedvel-teyin.vercel.app',
  'https://repetitor-rho.vercel.app/login',
  'https://arti-mu.vercel.app',
]

/** Цифры — только проверяемые: учитель с 2017, 3 живых проекта, 3 языка, ночные задачи в облаке. */
export const stats = [`${new Date().getFullYear() - 2017}+`, '3', '3', '24/7']

export const stackGroups: string[][] = [
  ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'PWA'],
  ['Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'REST API'],
  ['Docker', 'Oracle Cloud', 'Vercel', 'Render', 'Cloudflare', 'GitHub Actions'],
  ['Tesseract OCR', 'QR / OMR', 'KaTeX', 'Claude Code'],
]

export const contacts = {
  email: 'mywork2000001@gmail.com',
  phone: '+994 77 302 00 59',
  whatsapp: 'https://wa.me/994773020059',
}
