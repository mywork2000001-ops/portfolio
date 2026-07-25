export default function OrbitIllustration() {
  return (
    <div
      aria-hidden
      className="relative hidden h-72 w-72 shrink-0 [perspective:1400px] md:block lg:h-80 lg:w-80"
    >
      {/* tilt the whole system into 3D space */}
      <div className="absolute inset-0 [transform-style:preserve-3d] [transform:rotateX(58deg)]">
        {/* continuously spinning turntable */}
        <div className="absolute inset-0 [transform-style:preserve-3d] animate-spin-scene">
          {/* orbit rings, lifted to different depths */}
          <div className="absolute inset-0 rounded-full border border-dashed border-violet-300/50 [transform:translateZ(0px)] dark:border-violet-500/30" />
          <div className="absolute inset-8 rounded-full border border-dashed border-blue-300/50 [transform:translateZ(6px)] dark:border-blue-500/30" />
          <div className="absolute inset-16 rounded-full border border-dashed border-amber-300/40 [transform:translateZ(12px)] dark:border-amber-500/20" />

          {/* sun / core, popped forward */}
          <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 [transform:translateZ(20px)] rounded-full bg-gradient-to-br from-amber-300 to-orange-500 shadow-[0_0_50px_15px_rgba(251,146,60,0.4)]" />

          {/* orbiting planet with ring (saturn-like) */}
          <div className="absolute inset-0 [transform-style:preserve-3d] animate-orbit">
            <div className="absolute left-1/2 top-0 flex h-8 w-8 -translate-x-1/2 items-center justify-center [transform:translateZ(10px)]">
              <div className="relative h-5 w-5 rounded-full bg-gradient-to-br from-indigo-400 to-violet-600 shadow-[0_0_10px_2px_rgba(124,58,237,0.5)]">
                <div className="absolute -inset-1 rounded-full border-2 border-violet-300/60" style={{ transform: 'rotate(25deg)' }} />
              </div>
            </div>
          </div>

          {/* small moon */}
          <div className="absolute inset-8 [transform-style:preserve-3d] animate-orbit-rev">
            <div className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 [transform:translateZ(8px)] rounded-full bg-gradient-to-br from-slate-200 to-slate-400 shadow-[0_0_8px_1px_rgba(148,163,184,0.5)] dark:from-slate-300 dark:to-slate-500" />
          </div>

          {/* tiny dot planet */}
          <div className="absolute inset-16 [transform-style:preserve-3d] animate-orbit-slow">
            <div className="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 [transform:translateZ(6px)] rounded-full bg-gradient-to-br from-blue-300 to-blue-600 shadow-[0_0_8px_1px_rgba(59,130,246,0.5)]" />
          </div>
        </div>
      </div>

      {/* floating dots, outside the 3D scene */}
      <div className="absolute -right-2 top-6 h-2 w-2 rounded-full bg-violet-400/70" />
      <div className="absolute bottom-4 left-0 h-1.5 w-1.5 rounded-full bg-amber-400/70" />
    </div>
  )
}
