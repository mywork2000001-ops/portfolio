import { Hexagon } from 'lucide-react'
import { skills } from '../data/portfolio'
import { useLanguage } from '../context/LanguageContext'

export default function Skills() {
  const { t } = useLanguage()

  return (
    <section id="skills" className="scroll-mt-20 px-4 pb-12 sm:px-8">
      <h2 className="mb-5 text-xl font-semibold">{t.skillsTitle}</h2>
      <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-surface-dark-card">
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              key={skill.name}
              className="flex items-center gap-2 rounded-full border border-black/5 bg-neutral-50 px-3.5 py-2 text-sm font-medium dark:border-white/10 dark:bg-white/5"
            >
              <Hexagon size={14} className={skill.color} />
              {skill.name}
            </span>
          ))}
        </div>
        <div className="mt-5 h-1.5 w-full rounded-full bg-neutral-100 dark:bg-white/10">
          <div className="h-1.5 w-2/3 rounded-full bg-accent-gradient" />
        </div>
      </div>
    </section>
  )
}
