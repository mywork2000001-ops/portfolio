import { useEffect, useRef, useState } from 'react'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Services from './components/Services'
import Blog from './components/Blog'
import About from './components/About'
import Footer from './components/Footer'
import { navItems } from './data/portfolio'

function App() {
  const [activeSection, setActiveSection] = useState(navItems[0].id)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.id)
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id)
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    sections.forEach((section) => observerRef.current?.observe(section))
    return () => observerRef.current?.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="flex min-h-screen flex-col bg-surface-light dark:bg-surface-dark lg:flex-row">
      <Sidebar activeSection={activeSection} onNavigate={scrollToSection} />

      <main className="flex-1">
        <TopBar onContactClick={() => scrollToSection('contacts')} />
        <Hero
          onViewProjects={() => scrollToSection('projects')}
          onViewAbout={() => scrollToSection('about')}
        />
        <Stats />
        <Projects />
        <Skills />
        <Services />
        <Blog />
        <About />
        <Footer />
      </main>
    </div>
  )
}

export default App
