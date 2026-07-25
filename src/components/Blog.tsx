import { FileText } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function Blog() {
  const { t } = useLanguage()

  return (
    <section id="blog" className="scroll-mt-20 px-4 pb-12 sm:px-8">
      <h2 className="mb-5 text-xl font-semibold">{t.blogTitle}</h2>
      <div className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-sm dark:bg-surface-dark-card">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-from/10 text-accent-from dark:bg-accent-to/15 dark:text-accent-to">
          <FileText size={20} />
        </div>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {t.blogText}
        </p>
      </div>
    </section>
  )
}
