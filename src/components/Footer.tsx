import { Mail, MapPin } from 'lucide-react'
import { contacts } from '../data/portfolio'
import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  const email = `${contacts.emailUser}@${contacts.emailDomain}`

  return (
    <footer
      id="contacts"
      className="scroll-mt-20 border-t border-black/5 px-4 py-6 sm:px-8 dark:border-white/10"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-neutral-500 dark:text-neutral-400">
        <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-violet-500">
          <Mail size={16} />
          {contacts.emailUser} [at] {contacts.emailDomain.replace('.', ' [dot] ')}
        </a>
        <span className="flex items-center gap-2">
          <MapPin size={16} />
          {t.footerLocation}
        </span>
      </div>
    </footer>
  )
}
