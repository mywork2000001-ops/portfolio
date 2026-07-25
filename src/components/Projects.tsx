import { ExternalLink } from 'lucide-react'
import { projects } from '../data/portfolio'

function ProjectPreview({ gradient }: { gradient: string }) {
  return (
    <div className={`relative h-36 w-full overflow-hidden rounded-xl bg-gradient-to-br ${gradient}`}>
      <div className="absolute inset-3 rounded-lg bg-white/15 backdrop-blur-sm" />
      <div className="absolute left-6 top-6 h-2 w-16 rounded-full bg-white/60" />
      <div className="absolute left-6 top-11 h-2 w-24 rounded-full bg-white/40" />
      <div className="absolute bottom-5 left-6 right-6 flex gap-2">
        <div className="h-10 flex-1 rounded-md bg-white/25" />
        <div className="h-10 flex-1 rounded-md bg-white/15" />
        <div className="h-10 flex-1 rounded-md bg-white/25" />
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 px-4 pb-12 sm:px-8">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Избранные проекты</h2>
        <a
          href="#projects"
          className="text-sm font-medium text-violet-600 hover:underline dark:text-violet-400"
        >
          Все проекты →
        </a>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.title}
            className="rounded-2xl bg-white p-4 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md dark:bg-surface-dark-card"
          >
            <a href={project.url} target="_blank" rel="noreferrer">
              <ProjectPreview gradient={project.gradient} />
            </a>
            <div className="mt-4 flex items-center justify-between">
              <h3 className="font-semibold">{project.title}</h3>
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Открыть ${project.title}`}
                className="text-neutral-400 hover:text-violet-500"
              >
                <ExternalLink size={16} />
              </a>
            </div>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              {project.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag.name}
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${tag.className}`}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
