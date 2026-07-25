import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

interface TopBarProps {
  onContactClick: () => void
}

export default function TopBar({ onContactClick }: TopBarProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="flex items-center justify-end gap-3 px-4 py-4 sm:px-8">
      <button
        onClick={toggleTheme}
        aria-label="Переключить тему"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-neutral-700 shadow-sm hover:bg-neutral-50 dark:border-white/10 dark:bg-surface-dark-card dark:text-neutral-200 dark:hover:bg-white/5"
      >
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </button>
      <button
        onClick={onContactClick}
        className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
      >
        Связаться со мной
      </button>
    </div>
  )
}
