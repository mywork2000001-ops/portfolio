import { Quote, ArrowRight, Cake, Heart } from 'lucide-react'
import photo from '../assets/foto.png'
import { testimonial } from '../data/portfolio'

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 px-4 pb-12 sm:px-8">
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="flex items-center gap-5 rounded-2xl bg-white p-6 shadow-sm dark:bg-surface-dark-card">
          <div className="shrink-0 rounded-full bg-accent-gradient p-1">
            <img
              src={photo}
              alt="Ферид Г."
              className="h-20 w-20 rounded-full object-cover ring-2 ring-white dark:ring-surface-dark-card"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Немного обо мне</h2>
            <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-400 dark:text-neutral-500">
              <span className="flex items-center gap-1">
                <Cake size={13} />
                18 марта 1986
              </span>
              <span className="flex items-center gap-1">
                <Heart size={13} />
                Семьянин
              </span>
            </div>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              Преподаю математику в школе с 2017 года, есть опыт репетиторства по физике.
              Параллельно занимаюсь разработкой — от идеи до продакшена, в связке с AI-инструментами
              прямо в VS Code. Совмещаю преподавание с созданием образовательных платформ и
              веб-приложений, люблю решать сложные задачи и воплощать идеи в реальность.
            </p>
            <a
              href="#about"
              className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-violet-600 hover:underline dark:text-violet-400"
            >
              Подробнее обо мне
              <ArrowRight size={14} />
            </a>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-surface-dark-card">
          <Quote size={22} className="text-violet-400" />
          <p className="mt-2 text-sm italic text-neutral-600 dark:text-neutral-300">
            «{testimonial.quote}»
          </p>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-gradient text-sm font-semibold text-white">
              {testimonial.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold">{testimonial.name}</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">{testimonial.role}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
