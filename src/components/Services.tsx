import { services } from '../data/portfolio'

export default function Services() {
  return (
    <section id="services" className="scroll-mt-20 px-4 pb-12 sm:px-8">
      <h2 className="mb-5 text-xl font-semibold">Что я делаю</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="rounded-2xl bg-white p-5 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md dark:bg-surface-dark-card"
          >
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-accent-from/10 text-accent-from dark:bg-accent-to/15 dark:text-accent-to">
              <Icon size={20} />
            </div>
            <h3 className="font-semibold">{title}</h3>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
