// PF-23 /vizual və PF-29 /isbat/<ad> – vizual izahlar (VIZUAL_ISBAT_PROMPT.md D-35…D-46)
// TikTok pleyeri və GeoGebra yalnız kliklə yüklənir (uşaqlar üçün kənar izləyici yoxdur – D-12, D-36).
// «Müəllif» yazısı istifadəçinin qərarı ilə çıxarılıb (15.11.2026); TikTok pleyeri müəllifi özü göstərir.
import { useEffect, useState } from 'react'
import ISBAT from './data/isbat.json'

type Video = { id: string; author: string; url: string; topic: string | null; title: string; own?: boolean; isbat?: string }
type Isbat = { title: string; formula: string; about: string; topic: string; own?: string; geogebra?: string; tiktok: string[] }
const LIST = ISBAT as Record<string, Isbat>

export const TOPIC_AZ: Record<string, string> = {
  NAT: 'Natural ədədlər', KES: 'Kəsrlər', FAI: 'Faiz, nisbət', COX: 'Çoxluqlar', CEB: 'Cəbri ifadələr',
  TEN: 'Tənliklər', BER: 'Bərabərsizliklər', MES: 'Məsələlər', LOQ: 'Qüvvət, kök, loqarifm', PRO: 'Silsilələr',
  FUN: 'Funksiya və qrafik', TRQ: 'Triqonometriya', TOR: 'Törəmə, inteqral', VEK: 'Vektorlar, koordinatlar',
  PLA: 'Planimetriya', STE: 'Stereometriya', EHT: 'Ehtimal, statistika',
}

// GeoGebra: öz konstruksiyalarımız (komandalarla) – kənar materiala bağlı deyil
const GGB: Record<string, string[]> = {
  pifaqor: [
    'A=(0,0)', 'B=(5,0)', 'k=Circle(Midpoint(A,B),2.5)', 'C=Point(k)', 'SetCoords(C,1.8,2.4)', 'SetVisibleInView(k,1,false)',
    'tri=Polygon(A,B,C)', 'sc=Polygon(B,A,4)', 'sa=Polygon(C,B,4)', 'sb=Polygon(A,C,4)',
    'SetColor(sc,"#FACC15")', 'SetColor(sa,"#3B82F6")', 'SetColor(sb,"#F472B6")', 'SetColor(tri,"#0F172A")',
    'txt=Text("a² + b² = " + Round(Area(sa) + Area(sb), 2) + "     c² = " + Round(Area(sc), 2), (-4.5, 9.2))',
    'ZoomIn(-6,-6,11,10.5)',
  ],
  'kvadrat-cem': [
    'a=Slider(1,4,0.1)', 'b=Slider(1,4,0.1)', 'SetValue(a,2)', 'SetValue(b,3)',
    'p1=Polygon((0,0),(a,0),(a,a),(0,a))', 'p2=Polygon((a,0),(a+b,0),(a+b,a),(a,a))',
    'p3=Polygon((0,a),(a,a),(a,a+b),(0,a+b))', 'p4=Polygon((a,a),(a+b,a),(a+b,a+b),(a,a+b))',
    'SetColor(p1,"#F472B6")', 'SetColor(p2,"#3B82F6")', 'SetColor(p3,"#3B82F6")', 'SetColor(p4,"#A78BFA")',
    'txt=Text("(a+b)² = " + Round((a+b)^2, 2) + "   a² + 2ab + b² = " + Round(a^2 + 2a b + b^2, 2), (0, 9))',
    'ZoomIn(-1,-1,10,10)',
  ],
}

declare global {
  interface Window { GGBApplet?: new (p: Record<string, unknown>, html5: boolean) => { inject: (id: string) => void } }
}

function loadScript(src: string) {
  return new Promise<void>((ok, bad) => {
    if (document.querySelector(`script[src="${src}"]`)) return ok()
    const s = document.createElement('script')
    s.src = src
    s.onload = () => ok()
    s.onerror = () => bad()
    document.head.appendChild(s)
  })
}

function GeoGebraBox({ name }: { name: string }) {
  const [on, setOn] = useState(false)
  const [err, setErr] = useState(false)
  const id = `ggb-${name}`
  useEffect(() => {
    if (!on) return
    loadScript('https://www.geogebra.org/apps/deployggb.js')
      .then(() => {
        const App = window.GGBApplet
        if (!App) throw new Error('ggb')
        new App({
          appName: 'classic', width: 360, height: 420, showToolBar: false, showAlgebraInput: false, showMenuBar: false,
          enableShiftDragZoom: true, showResetIcon: true, language: 'az', scaleContainerClass: 'ggb-wrap',
          appletOnLoad: (api: { evalCommand: (c: string) => boolean; getAllObjectNames: () => string[]; setLabelVisible: (n: string, v: boolean) => void }) => {
            GGB[name].forEach((c) => api.evalCommand(c))
            api.getAllObjectNames().forEach((n) => api.setLabelVisible(n, ['C', 'a', 'b'].includes(n)))
          },
        }, true).inject(id)
      })
      .catch(() => setErr(true))
  }, [on, id, name])
  if (err) return <p className="text-sm text-[#475569]">Çertyoj açılmadı – səhifəni yenilə.</p>
  if (!on)
    return (
      <button type="button" onClick={() => setOn(true)} className="flex min-h-[200px] w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[#94A3B8] bg-white p-6 text-center">
        <span className="text-lg font-extrabold">İnteraktiv çertyoju aç</span>
        <span className="text-sm text-[#475569]">Nöqtəni və ya sürgünü hərəkət etdir – düstur özü yoxlanır (GeoGebra)</span>
      </button>
    )
  return <div className="ggb-wrap w-full overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white"><div id={id} /></div>
}

export function TikTokCard({ v }: { v: Video }) {
  const [on, setOn] = useState(false)
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-[#E2E8F0] bg-white p-3">
      {on ? (
        <iframe title={v.title || 'TikTok'} src={`https://www.tiktok.com/player/v1/${v.id}?music_info=0&description=0`}
          className="aspect-[9/16] w-full rounded-xl border-0 bg-black" allow="fullscreen; encrypted-media" />
      ) : (
        <button type="button" onClick={() => setOn(true)} className="flex aspect-[9/16] w-full flex-col items-center justify-center gap-2 rounded-xl bg-[#0B1026] p-4 text-center text-white">
          <svg aria-hidden="true" width="44" height="44" viewBox="0 0 24 24" fill="#FACC15"><path d="M7 4l13 8-13 8z" /></svg>
          <span className="text-[15px] font-extrabold leading-snug">{v.title || 'Vizual izah'}</span>
          <span className="text-xs text-[#CBD5E1]">Kliklə – TikTok pleyeri açılır</span>
        </button>
      )}
    </div>
  )
}

function useVideos() {
  const [videos, setVideos] = useState<Video[]>([])
  useEffect(() => {
    fetch('/tiktok/api/videolar').then((r) => (r.ok ? r.json() : { videos: [] })).then((d) => setVideos(d.videos || [])).catch(() => {})
  }, [])
  return videos
}

export function VizualPage() {
  const videos = useVideos()
  const ours = videos.filter((v) => v.own).sort((x, y) => (BigInt(y.id) > BigInt(x.id) ? 1 : -1))
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Vizual izahlar</h1>
      <p className="mt-2 text-[17px] text-[#475569]">Düsturun niyə doğru olduğunu gözlə gör: hər teorem üçün bir neçə isbat.</p>
      <h2 className="mb-3 mt-8 text-xl font-black">Teoremlər – bir neçə isbat</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(LIST).map(([slug, it]) => (
          <a key={slug} href={`/isbat/${slug}`} className="rounded-2xl border border-[#E2E8F0] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#FACC15]">
            <div className="text-lg font-black">{it.title}</div>
            <div className="mt-1 font-semibold text-[#1D4ED8]">{it.formula}</div>
            <div className="mt-2 text-xs font-bold uppercase tracking-wide text-[#475569]">{TOPIC_AZ[it.topic]}</div>
          </a>
        ))}
      </div>
      {ours.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-3 text-xl font-black">TikTok videolarımız</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {ours.map((v) => <TikTokCard key={v.id} v={v} />)}
          </div>
        </section>
      )}
    </main>
  )
}

export function IsbatPage({ slug }: { slug: string }) {
  const it = LIST[slug]
  const videos = useVideos()
  const [own, setOwn] = useState(false)
  useEffect(() => {
    if (!it?.own) return
    fetch('/tiktok/api/viz').then((r) => (r.ok ? r.json() : { viz: [] })).then((d) => setOwn((d.viz || []).includes(it.own))).catch(() => {})
  }, [it])
  if (!it) return <main className="p-8 text-center font-semibold">Belə teorem tapılmadı. <a href="/vizual" className="text-[#1D4ED8]">Vizual izahlar →</a></main>
  const tt = videos.filter((v) => v.own && v.isbat === slug)
  const showOwnMp4 = own && tt.length === 0
  const parts = [tt.length > 0 || own, !!it.geogebra && !!GGB[it.geogebra]].filter(Boolean).length
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <a href="/vizual" className="text-sm font-bold text-[#1D4ED8]">← Vizual izahlar</a>
      <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">{it.title}</h1>
      <div className="mt-2 inline-block rounded-xl border-2 border-[#FACC15] px-4 py-2 text-xl font-extrabold">{it.formula}</div>
      <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-[#475569]">{it.about}</p>
      <p className="mt-1 text-sm font-semibold text-[#475569]">{parts} fərqli baxış</p>
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {tt.length > 0 && (
          <section>
            <h2 className="mb-2 font-black">1. Fizmatix videosu</h2>
            <div className="grid gap-3">{tt.map((v) => <TikTokCard key={v.id} v={v} />)}</div>
          </section>
        )}
        {showOwnMp4 && (
          <section>
            <h2 className="mb-2 font-black">1. Fizmatix videosu</h2>
            <video src={`/tiktok/api/viz/${it.own}.mp4`} controls muted playsInline preload="metadata" className="aspect-[9/16] w-full rounded-2xl bg-black" />
          </section>
        )}
        {it.geogebra && GGB[it.geogebra] && (
          <section>
            <h2 className="mb-2 font-black">{tt.length > 0 || own ? 2 : 1}. Özün yoxla</h2>
            <GeoGebraBox name={it.geogebra} />
          </section>
        )}
      </div>
      <a href="/sinaq" className="mt-8 inline-block rounded-2xl bg-[#FACC15] px-6 py-4 font-extrabold text-[#0B1026]">İndi tapşırıqda yoxla – günün sınağı</a>
    </main>
  )
}
