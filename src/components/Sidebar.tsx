import { useState } from 'react'
import { Download, Menu, X } from 'lucide-react'
import { navItems, socialLinks } from '../data/portfolio'
import { useLanguage } from '../context/LanguageContext'
import type { Translation } from '../i18n/translations'

interface SidebarProps {
  activeSection: string
  onNavigate: (id: string) => void
}

const navKeyById: Record<string, keyof Translation['nav']> = {
  hero: 'home',
  about: 'about',
  projects: 'portfolio',
  skills: 'skills',
  services: 'services',
  blog: 'blog',
  contacts: 'contacts',
}

export default function Sidebar({ activeSection, onNavigate }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { t } = useLanguage()

  const handleNavClick = (id: string) => {
    onNavigate(id)
    setMobileOpen(false)
  }

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between bg-sidebar px-4 py-3">
        <span className="text-lg font-bold text-white">
          Orbit <span className="text-accent-to">.</span>
        </span>
        <button
          aria-label={t.openMenu}
          onClick={() => setMobileOpen((v) => !v)}
          className="rounded-lg p-2 text-white hover:bg-white/10"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <aside
        className={`
          bg-sidebar text-sidebar-text flex-col justify-between
          lg:flex lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:shrink-0 lg:px-5 lg:py-6
          ${mobileOpen ? 'flex fixed inset-x-0 top-[52px] z-30 h-[calc(100vh-52px)] px-5 py-6 overflow-y-auto' : 'hidden'}
        `}
      >
        <div>
          <div className="hidden lg:block px-2 pb-8 text-xl font-bold text-white">
            Orbit <span className="text-accent-to">.</span>
          </div>

          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors
                    ${
                      isActive
                        ? 'bg-accent-from/20 text-white'
                        : 'text-sidebar-text hover:bg-white/5 hover:text-white'
                    }`}
                >
                  <Icon size={18} className={isActive ? 'text-accent-to' : ''} />
                  {t.nav[navKeyById[item.id]]}
                </button>
              )
            })}
          </nav>

          <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 px-3 py-2.5 text-sm font-medium text-white hover:bg-white/5">
            <Download size={16} />
            {t.downloadCV}
          </button>
        </div>

        <div className="mt-8 flex items-center gap-4 px-2">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="text-sidebar-text hover:text-white transition-colors"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </aside>

      {mobileOpen && (
        <button
          aria-hidden
          tabIndex={-1}
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 z-20 bg-black/40"
        />
      )}
    </>
  )
}
