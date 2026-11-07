import { useEffect, useState } from 'react'
import {
  ArrowRight, ArrowUpRight, Check, Mail, MessageCircle, Moon, Phone, Sun, Menu, X,
  GraduationCap, WifiOff, Languages, ShieldCheck, Layout, Server, Cloud, Wrench,
} from 'lucide-react'
import photo from './assets/foto.png'
import { useLanguage } from './context/LanguageContext'
import { useTheme } from './context/ThemeContext'
import { languageNames, type Lang } from './i18n/translations'
import { archive, contacts, projects, stackGroups, stats } from './data/portfolio'

const SECTIONS = ['projects', 'approach', 'stack', 'about', 'contact'] as const

/** Логотип: ∑ в квадрате — «fizmatix» = физика + математика. */
function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2 font-extrabold tracking-tight text-ink dark:text-white">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-lg text-white shadow-glow">∑</span>
      <span className="text-lg">
        fizmatix<span className="text-brand">.</span>
      </span>
    </a>
  )
}

function Header() {
  const { t, lang, setLang } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  const langs = (
    <div className="flex rounded-full border border-line bg-white/70 p-0.5 dark:border-white/10 dark:bg-white/5">
      {(Object.keys(languageNames) as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-2.5 py-1 text-xs font-bold transition ${lang === l ? 'bg-ink text-white dark:bg-white dark:text-ink' : 'text-muted hover:text-ink dark:hover:text-white'}`}
        >
          {languageNames[l]}
        </button>
      ))}
    </div>
  )

  return (
    <header className={`sticky top-0 z-40 transition ${scrolled ? 'border-b border-line/70 bg-paper/80 backdrop-blur-xl dark:border-white/10 dark:bg-night/80' : ''}`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex">
          {SECTIONS.map((s) => (
            <a key={s} href={`#${s}`} className="rounded-full px-3 py-2 text-sm font-semibold text-muted transition hover:bg-ink/5 hover:text-ink dark:hover:bg-white/10 dark:hover:text-white">
              {t.nav[s]}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">{langs}</div>
          <button onClick={toggleTheme} aria-label={t.theme} className="grid h-9 w-9 place-items-center rounded-full border border-line bg-white/70 text-ink transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white">
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button onClick={() => setOpen((o) => !o)} aria-label={t.menu} aria-expanded={open} className="grid h-9 w-9 place-items-center rounded-full border border-line bg-white/70 text-ink md:hidden dark:border-white/10 dark:bg-white/5 dark:text-white">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-line bg-paper px-4 pb-5 pt-2 md:hidden dark:border-white/10 dark:bg-night">
          {SECTIONS.map((s) => (
            <a key={s} href={`#${s}`} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 text-base font-semibold text-ink dark:text-white">
              {t.nav[s]}
            </a>
          ))}
          <div className="mt-3 px-3">{langs}</div>
        </div>
      )}
    </header>
  )
}

function BrowserFrame({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-line bg-white shadow-card dark:border-white/10 dark:bg-night-card ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2 dark:border-white/10">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
      </div>
      <img src={src} alt={alt} className="block aspect-[16/10] w-full object-cover object-top" />
    </div>
  )
}

function Hero() {
  const { t } = useLanguage()
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-10 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pb-28 lg:pt-16">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-3 py-1.5 text-xs font-bold text-muted dark:border-white/10 dark:bg-white/5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" /> {t.hero.badge}
          </p>
          <p className="mt-6 font-mono text-sm font-semibold text-brand">Fərid Həsənov</p>
          <h1 className="mt-2 text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl dark:text-white">{t.hero.title}</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{t.hero.text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 font-bold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-brand-600">
              {t.hero.cta} <ArrowRight size={18} />
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-6 py-3.5 font-bold text-ink transition hover:-translate-y-0.5 dark:border-white/15 dark:bg-white/5 dark:text-white">
              {t.hero.contact}
            </a>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <BrowserFrame src={projects[2].image} alt={projects[2].title} className="w-[88%] -rotate-2" />
          <BrowserFrame src={projects[1].image} alt={projects[1].title} className="absolute -bottom-10 right-0 w-[62%] rotate-3" />
          {t.hero.chips.map((c, i) => (
            <span
              key={c}
              className={`absolute flex items-center gap-1.5 rounded-full bg-white px-3 py-2 text-xs font-bold text-ink shadow-card dark:bg-night-card dark:text-white ${['left-2 -top-5 sm:-left-4', 'right-1 top-[38%]', '-bottom-6 left-2 sm:-left-6'][i]}`}
            >
              <Check size={14} className="text-emerald-500" /> {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function Stats() {
  const { t } = useLanguage()
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-4 dark:border-white/10 dark:bg-white/10">
        {stats.map((v, i) => (
          <div key={i} className="bg-white p-6 dark:bg-night-card">
            <p className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl dark:text-white">{v}</p>
            <p className="mt-1 text-sm font-medium text-muted">{t.stats[i]}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function SectionHead({ id, title, lead }: { id: string; title: string; lead: string }) {
  return (
    <div id={id} className="scroll-mt-24">
      <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl dark:text-white">{title}</h2>
      <p className="mt-3 max-w-2xl text-lg text-muted">{lead}</p>
    </div>
  )
}

function Projects() {
  const { t } = useLanguage()
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHead id="projects" title={t.projects.title} lead={t.projects.lead} />
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => {
          const txt = t.projectText[p.key]
          return (
            <article
              key={p.key}
              className={`group flex flex-col overflow-hidden rounded-3xl border border-line bg-white transition hover:-translate-y-1 hover:shadow-card dark:border-white/10 dark:bg-night-card ${i === 0 ? 'md:col-span-2 lg:grid lg:grid-cols-[1.25fr_1fr]' : ''}`}
            >
              <a href={p.url} target="_blank" rel="noreferrer" className="block overflow-hidden bg-paper p-4 pb-0 dark:bg-white/5">
                <img src={p.image} alt={p.title} loading="lazy" className="aspect-[16/10] w-full rounded-t-xl border border-b-0 border-line object-cover object-top transition duration-500 group-hover:scale-[1.02] dark:border-white/10" />
              </a>
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> {t.projects.live}
                  </span>
                  <span className="truncate font-mono text-xs text-muted">{p.url.replace('https://', '')}</span>
                </div>
                <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-ink dark:text-white">{p.title}</h3>
                <p className="mt-2 text-muted">{txt.desc}</p>
                <ul className="mt-4 space-y-2">
                  {txt.points.map((pt) => (
                    <li key={pt} className="flex gap-2 text-sm text-ink/80 dark:text-white/80">
                      <Check size={16} className="mt-0.5 shrink-0" style={{ color: p.accent }} /> {pt}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span key={s} className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] font-semibold text-muted dark:border-white/10">
                      {s}
                    </span>
                  ))}
                </div>
                <a href={p.url} target="_blank" rel="noreferrer" className="mt-6 inline-flex w-fit items-center gap-1.5 font-bold text-brand hover:underline">
                  {t.projects.open} <ArrowUpRight size={18} />
                </a>
              </div>
            </article>
          )
        })}
      </div>

      <div className="mt-10 rounded-3xl border border-dashed border-line p-6 dark:border-white/15">
        <p className="font-bold text-ink dark:text-white">{t.projects.archive}</p>
        <p className="text-sm text-muted">{t.projects.archiveLead}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {archive.map((u, i) => (
            <a key={u} href={u} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full bg-ink/5 px-3.5 py-2 text-sm font-semibold text-ink transition hover:bg-ink/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15">
              {t.archiveNames[i]} <ArrowUpRight size={14} />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function Approach() {
  const { t } = useLanguage()
  const icons = [GraduationCap, WifiOff, Languages, ShieldCheck]
  return (
    <section className="border-y border-line bg-white py-24 dark:border-white/10 dark:bg-night-card/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead id="approach" title={t.approach.title} lead={t.approach.lead} />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.approach.items.map((it, i) => {
            const Icon = icons[i]
            return (
              <div key={it.title} className="rounded-3xl border border-line bg-paper p-6 dark:border-white/10 dark:bg-night">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand/10 text-brand">
                  <Icon size={22} />
                </span>
                <h3 className="mt-5 text-lg font-extrabold text-ink dark:text-white">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{it.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Stack() {
  const { t } = useLanguage()
  const icons = [Layout, Server, Cloud, Wrench]
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHead id="stack" title={t.stack.title} lead={t.stack.lead} />
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {stackGroups.map((g, i) => {
          const Icon = icons[i]
          return (
            <div key={i} className="rounded-3xl border border-line bg-white p-6 dark:border-white/10 dark:bg-night-card">
              <p className="flex items-center gap-2 font-bold text-ink dark:text-white">
                <Icon size={18} className="text-brand" /> {t.stack.groups[i]}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {g.map((s) => (
                  <span key={s} className="rounded-xl bg-paper px-3 py-2 font-mono text-sm font-semibold text-ink dark:bg-white/5 dark:text-white">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function About() {
  const { t } = useLanguage()
  return (
    <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div id="about" className="scroll-mt-24">
          <div className="flex items-center gap-4">
            <img src={photo} alt="Fərid Həsənov" className="h-20 w-20 rounded-2xl object-cover ring-4 ring-white dark:ring-night-card" />
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl dark:text-white">{t.about.title}</h2>
              <p className="font-mono text-sm text-brand">Fərid Həsənov</p>
            </div>
          </div>
          <p className="mt-6 text-lg leading-relaxed text-muted">{t.about.text}</p>
        </div>
        <div className="rounded-3xl border border-line bg-white p-6 sm:p-8 dark:border-white/10 dark:bg-night-card">
          <p className="font-bold text-ink dark:text-white">{t.about.timelineTitle}</p>
          <ol className="mt-6 space-y-6 border-l-2 border-line pl-6 dark:border-white/10">
            {t.about.timeline.map((it) => (
              <li key={it.years} className="relative">
                <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-brand dark:border-night-card" />
                <p className="font-mono text-xs font-semibold text-brand">{it.years}</p>
                <p className="mt-1 font-bold text-ink dark:text-white">{it.title}</p>
                <p className="text-sm text-muted">{it.place}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const { t } = useLanguage()
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
      <div id="contact" className="relative scroll-mt-24 overflow-hidden rounded-[2rem] bg-ink px-6 py-14 text-center text-white sm:px-12 dark:bg-night-card">
        <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">{t.contact.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">{t.contact.text}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={`mailto:${contacts.email}`} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-bold text-ink transition hover:-translate-y-0.5">
              <Mail size={18} /> {t.contact.email}
            </a>
            <a href={contacts.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#1fa855] px-6 py-3.5 font-bold text-white transition hover:-translate-y-0.5">
              <MessageCircle size={18} /> {t.contact.whatsapp}
            </a>
            <a href={`tel:${contacts.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 font-bold text-white transition hover:-translate-y-0.5">
              <Phone size={18} /> {contacts.phone}
            </a>
          </div>
          <p className="mt-6 font-mono text-sm text-white/60">{contacts.email}</p>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const { t } = useLanguage()
  return (
    <div className="bg-grid dark:bg-grid-dark min-h-screen overflow-x-clip">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Projects />
        <Approach />
        <Stack />
        <About />
        <Contact />
      </main>
      <footer className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 pb-10 text-sm text-muted sm:px-6">
        <Logo />
        <p>
          © {new Date().getFullYear()} Fərid Həsənov · fizmatix.com · {t.footer}
        </p>
      </footer>
    </div>
  )
}
