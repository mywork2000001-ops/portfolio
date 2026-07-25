export default function OrbitIllustration() {
  return (
    <div
      aria-hidden
      className="relative hidden h-72 w-72 shrink-0 md:block lg:h-80 lg:w-80"
    >
      {/* orbit rings */}
      <div className="absolute inset-0 rounded-full border border-dashed border-violet-300/50 dark:border-violet-500/30" />
      <div className="absolute inset-8 rounded-full border border-dashed border-blue-300/50 dark:border-blue-500/30" />
      <div className="absolute inset-16 rounded-full border border-dashed border-amber-300/40 dark:border-amber-500/20" />

      {/* sun / core */}
      <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-amber-300 to-orange-500 shadow-[0_0_40px_10px_rgba(251,146,60,0.35)]" />

      {/* orbiting planet with ring (saturn-like) */}
      <div className="absolute inset-0 animate-orbit">
        <div className="absolute left-1/2 top-0 flex h-8 w-8 -translate-x-1/2 items-center justify-center">
          <div className="relative h-5 w-5 rounded-full bg-gradient-to-br from-indigo-400 to-violet-600">
            <div className="absolute -inset-1 rounded-full border-2 border-violet-300/60" style={{ transform: 'rotate(25deg)' }} />
          </div>
        </div>
      </div>

      {/* small moon */}
      <div className="absolute inset-8 animate-orbit-rev">
        <div className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-slate-300 dark:bg-slate-400" />
      </div>

      {/* tiny dot planet */}
      <div className="absolute inset-16 animate-orbit-slow">
        <div className="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-blue-400" />
      </div>

      {/* floating dots */}
      <div className="absolute -right-2 top-6 h-2 w-2 rounded-full bg-violet-400/70" />
      <div className="absolute bottom-4 left-0 h-1.5 w-1.5 rounded-full bg-amber-400/70" />
    </div>
  )
}
