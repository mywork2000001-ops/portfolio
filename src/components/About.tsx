import { Quote, ArrowRight, Cake, Heart } from 'lucide-react'
import photo from '../assets/foto.png'
import { educationIcon, educationYears } from '../data/portfolio'
import { useLanguage } from '../context/LanguageContext'

export default function About() {
  const { t } = useLanguage()
  const Icon = educationIcon

  return (
    <section id="about" className="scroll-mt-20 px-4 pb-12 sm:px-8">
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="flex items-center gap-5 rounded-2xl bg-white p-6 shadow-sm dark:bg-surface-dark-card">
          <div className="shrink-0 rounded-full bg-accent-gradient p-1">
            <img
              src={photo}
              alt="Ферид Г."
              className="h-20 w-20 rounded-full object-cover ring-2 ring-white dark:ring-surface-dark-card"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold">{t.about.title}</h2>
            <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-400 dark:text-neutral-500">
              <span className="flex items-center gap-1">
                <Cake size={13} />
                {t.about.birthdate}
              </span>
              <span className="flex items-center gap-1">
                <Heart size={13} />
                {t.about.familyMan}
              </span>
            </div>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              {t.about.text}
            </p>
            <a
              href="#about"
              className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-violet-600 hover:underline dark:text-violet-400"
            >
              {t.about.moreLink}
              <ArrowRight size={14} />
            </a>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-surface-dark-card">
          <Quote size={22} className="text-violet-400" />
          <p className="mt-2 text-sm italic text-neutral-600 dark:text-neutral-300">
            «{t.testimonial.quote}»
          </p>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-gradient text-sm font-semibold text-white">
              {t.testimonial.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold">{t.testimonial.name}</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">{t.testimonial.role}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-2xl bg-white p-6 shadow-sm dark:bg-surface-dark-card">
        <h3 className="text-lg font-semibold">{t.educationTitle}</h3>
        <div className="mt-4 flex flex-col gap-4">
          {t.education.map((item, i) => (
            <div key={item.institution} className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-from/10 text-accent-from dark:bg-accent-to/15 dark:text-accent-to">
                <Icon size={18} />
              </div>
              <div className="flex flex-1 flex-wrap items-baseline justify-between gap-x-3">
                <div>
                  <p className="text-sm font-semibold">{item.institution}</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">{item.degree}</p>
                </div>
                <span className="text-xs text-neutral-400 dark:text-neutral-500">{educationYears[i]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
