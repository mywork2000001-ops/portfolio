import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'
import { languageNames, type Lang } from '../i18n/translations'

interface TopBarProps {
  onContactClick: () => void
}

export default function TopBar({ onContactClick }: TopBarProps) {
  const { theme, toggleTheme } = useTheme()
  const { lang, setLang, t } = useLanguage()

  return (
    <div className="flex items-center justify-end gap-3 px-4 py-4 sm:px-8">
      <div className="flex items-center gap-1 rounded-full border border-black/10 bg-white p-1 shadow-sm dark:border-white/10 dark:bg-surface-dark-card">
        {(Object.keys(languageNames) as Lang[]).map((code) => (
          <button
            key={code}
            onClick={() => setLang(code)}
            aria-current={lang === code ? 'true' : undefined}
            className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
              lang === code
                ? 'bg-accent-gradient text-white'
                : 'text-neutral-500 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:bg-white/5'
            }`}
          >
            {languageNames[code]}
          </button>
        ))}
      </div>
      <button
        onClick={toggleTheme}
        aria-label={t.toggleTheme}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-neutral-700 shadow-sm hover:bg-neutral-50 dark:border-white/10 dark:bg-surface-dark-card dark:text-neutral-200 dark:hover:bg-white/5"
      >
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </button>
      <button
        onClick={onContactClick}
        className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
      >
        {t.contactMe}
      </button>
    </div>
  )
}
