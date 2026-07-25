import { ArrowRight, User } from 'lucide-react'
import OrbitIllustration from './OrbitIllustration'
import { useLanguage } from '../context/LanguageContext'

interface HeroProps {
  onViewProjects: () => void
  onViewAbout: () => void
}

export default function Hero({ onViewProjects, onViewAbout }: HeroProps) {
  const { t } = useLanguage()

  return (
    <section id="hero" className="flex scroll-mt-20 items-center justify-between gap-8 px-4 pb-10 pt-4 sm:px-8">
      <div className="max-w-xl">
        <p className="text-lg text-neutral-500 dark:text-neutral-400">{t.hero.greeting}</p>
        <h1 className="gradient-text mt-1 text-4xl font-bold sm:text-5xl">Fərid H.</h1>
        <p className="mt-2 text-lg font-medium text-neutral-700 dark:text-neutral-300">
          {t.hero.role}
        </p>
        <p className="mt-4 text-neutral-500 dark:text-neutral-400">{t.hero.description}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={onViewProjects}
            className="flex items-center gap-2 rounded-xl bg-accent-gradient px-5 py-3 text-sm font-medium text-white shadow-md shadow-violet-500/20 transition-transform hover:scale-[1.02]"
          >
            {t.hero.viewWork}
            <ArrowRight size={16} />
          </button>
          <button
            onClick={onViewAbout}
            className="flex items-center gap-2 rounded-xl border border-black/10 px-5 py-3 text-sm font-medium text-neutral-700 hover:bg-black/5 dark:border-white/15 dark:text-neutral-200 dark:hover:bg-white/5"
          >
            <User size={16} />
            {t.hero.aboutMe}
          </button>
        </div>
      </div>

      <OrbitIllustration />
    </section>
  )
}
