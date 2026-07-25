import { stats } from '../data/portfolio'
import { useLanguage } from '../context/LanguageContext'

export default function Stats() {
  const { t } = useLanguage()

  return (
    <section className="grid grid-cols-2 gap-4 px-4 pb-12 sm:px-8 lg:grid-cols-4">
      {stats.map(({ icon: Icon, value, color }, i) => (
        <div
          key={t.statsLabels[i]}
          className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm dark:bg-surface-dark-card"
        >
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${color}`}>
            <Icon size={20} />
          </div>
          <div>
            <p className="text-lg font-bold leading-tight">{value}</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">{t.statsLabels[i]}</p>
          </div>
        </div>
      ))}
    </section>
  )
}
