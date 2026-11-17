// PF-23 /vizual və PF-29 /isbat/<ad> – vizual izahlar (VIZUAL_ISBAT_PROMPT.md D-35…D-46)
// TikTok pleyeri və GeoGebra yalnız kliklə yüklənir (uşaqlar üçün kənar izləyici yoxdur – D-12, D-36).
// «Müəllif» yazısı istifadəçinin qərarı ilə çıxarılıb (15.11.2026); TikTok pleyeri müəllifi özü göstərir.
import { useCallback, useEffect, useState } from 'react'
import ISBAT from './data/isbat.json'

type Video = { id: string; author: string; url: string; topic: string | null; title: string; own?: boolean; isbat?: string }
type Proof = { ad: string; steps: string[] }
type Isbat = { title: string; formula: string; about: string; topic: string; own?: string; geogebra?: string; tiktok: string[]; proofs?: Proof[] }
const LIST = ISBAT as Record<string, Isbat>

// 17.11.2026: hər teoremə tam yazılı isbat (addım-addım, KaTeX) – KaTeX yalnız /isbat səhifəsində yüklənir
type KatexLib = { renderToString: (t: string, o: { throwOnError: boolean }) => string }
const escHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
function useKatex() {
  const [k, setK] = useState<KatexLib | null>(null)
  useEffect(() => {
    Promise.all([import('katex'), import('katex/dist/katex.min.css')])
      .then(([m]) => setK((m.default ?? m) as KatexLib))
      .catch(() => {})
  }, [])
  return k
}
function texHtml(s: string, k: KatexLib | null) {
  return s
    .split(/(\$[^$]+\$)/g)
    .map((p) => (p.length > 2 && p.startsWith('$') && p.endsWith('$')
      ? (k ? k.renderToString(p.slice(1, -1), { throwOnError: false }) : escHtml(p.slice(1, -1)))
      : escHtml(p)))
    .join('')
}
function ProofCard({ n, p, k }: { n: number; p: Proof; k: KatexLib | null }) {
  return (
    <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5">
      <h2 className="font-black">{['1-ci', '2-ci', '3-cü', '4-cü'][n - 1] ?? `${n}.`} isbat: {p.ad}</h2>
      <ol className="mt-3 list-decimal space-y-2 pl-5 text-[16px] leading-relaxed">
        {p.steps.map((s, i) => <li key={i} dangerouslySetInnerHTML={{ __html: texHtml(s, k) }} />)}
      </ol>
    </section>
  )
}

export const TOPIC_AZ: Record<string, string> = {
  NAT: 'Natural ədədlər', KES: 'Kəsrlər', FAI: 'Faiz, nisbət', COX: 'Çoxluqlar', CEB: 'Cəbri ifadələr',
  TEN: 'Tənliklər', BER: 'Bərabərsizliklər', MES: 'Məsələlər', LOQ: 'Qüvvət, kök, loqarifm', PRO: 'Silsilələr',
  FUN: 'Funksiya və qrafik', TRQ: 'Triqonometriya', TOR: 'Törəmə, inteqral', VEK: 'Vektorlar, koordinatlar',
  PLA: 'Planimetriya', STE: 'Stereometriya', EHT: 'Ehtimal, statistika',
}

// GeoGebra: öz konstruksiyalarımız (komandalarla) – kənar materiala bağlı deyil
// 15.11.2026 brauzerdə yoxlanıb (PROBLEMLER P-4): SetCoords/SetValue/SetVisibleInView/ZoomIn və mövqeli Text evalCommand-da
// xəta pəncərəsi verir – onlar API ilə edilir (after); komandalar yalnız konstruksiya + rəng + dinamik mətn.
type Api = {
  evalCommand: (c: string) => boolean; getAllObjectNames: () => string[]; setLabelVisible: (n: string, v: boolean) => void
  setErrorDialogsActive: (v: boolean) => void; setPerspective: (p: string) => void; setCoords: (n: string, x: number, y: number) => void
  setVisible: (n: string, v: boolean) => void; setValue: (n: string, v: number) => void
  setCoordSystem: (x0: number, x1: number, y0: number, y1: number) => void
}
const GGB: Record<string, { cmds: string[]; labels: string[]; after: (api: Api) => void }> = {
  pifaqor: {
    cmds: [
      'A=(0,0)', 'B=(5,0)', 'k=Circle(Midpoint(A,B),2.5)', 'C=Point(k)',
      'tri=Polygon(A,B,C)', 'sc=Polygon(B,A,4)', 'sa=Polygon(C,B,4)', 'sb=Polygon(A,C,4)',
      'SetColor(sc,"#FACC15")', 'SetColor(sa,"#3B82F6")', 'SetColor(sb,"#F472B6")', 'SetColor(tri,"#0F172A")',
      'txt="a² + b² = " + (Area(sa) + Area(sb)) + "     c² = " + Area(sc)',
    ],
    labels: ['C'],
    after: (api) => {
      api.setCoords('C', 1.8, 2.4)
      api.setVisible('k', false)
      api.setCoords('txt', -5, 9.6)
      api.setCoordSystem(-6, 11, -6, 10.5)
    },
  },
  // 17.11.2026: yeni teoremlər – nöqtələri sürüşdür, hər iki tərəf canlı hesablanır
  // (adlar: a,b,c,d,f,g… Polygon-un avtomatik tərəf adları ilə toqquşmasın deyə ka/kb/… istifadə olunur)
  kosinuslar: {
    cmds: [
      'C=(0,0)', 'A=(6,0)', 'B=(2,4)', 'tri=Polygon(A,B,C)', 'SetColor(tri,"#3B82F6")',
      'ka=Distance(B,C)', 'kb=Distance(A,C)', 'kc=Distance(A,B)', 'gm=Angle(A,C,B)',
      'txt="c² = " + (kc^2) + UnicodeToLetter(10) + "a² + b² − 2ab·cos γ = " + (ka^2 + kb^2 - 2*ka*kb*cos(gm))',
    ],
    labels: ['A', 'B', 'C', 'gm'],
    after: (api) => { api.setCoords('txt', -1.5, 7.6); api.setCoordSystem(-2, 9, -2, 8.5) },
  },
  sinuslar: {
    cmds: [
      'A=(0,0)', 'B=(6,0)', 'C=(2,4)', 'tri=Polygon(A,B,C)', 'SetColor(tri,"#3B82F6")',
      'kr=Circle(A,B,C)', 'SetColor(kr,"#F472B6")', 'al=Angle(B,A,C)',
      'txt="a / sin α = " + (Distance(B,C) / abs(sin(al))) + UnicodeToLetter(10) + "2R = " + (2*Radius(kr))',
    ],
    labels: ['A', 'B', 'C', 'al'],
    after: (api) => { api.setCoords('txt', -3, 8.6); api.setCoordSystem(-4, 10, -3.5, 9.5) },
  },
  heron: {
    cmds: [
      'A=(0,0)', 'B=(6,0)', 'C=(2,4)', 'tri=Polygon(A,B,C)', 'SetColor(tri,"#FACC15")',
      'ka=Distance(B,C)', 'kb=Distance(A,C)', 'kc=Distance(A,B)', 'pp=(ka+kb+kc)/2',
      'txt="S = " + Area(tri) + UnicodeToLetter(10) + "√(p(p−a)(p−b)(p−c)) = " + sqrt(pp*(pp-ka)*(pp-kb)*(pp-kc))',
    ],
    labels: ['A', 'B', 'C'],
    after: (api) => { api.setCoords('txt', -1.5, 7.6); api.setCoordSystem(-2, 9, -2, 8.5) },
  },
  ptolemey: {
    cmds: [
      'O=(0,0)', 'krug=Circle(O,4)', 'A=Point(krug)', 'B=Point(krug)', 'C=Point(krug)', 'D=Point(krug)',
      'q4=Polygon(A,B,C,D)', 'SetColor(q4,"#3B82F6")', 'e1=Segment(A,C)', 'e2=Segment(B,D)',
      'SetColor(e1,"#DB2777")', 'SetColor(e2,"#DB2777")',
      'txt="AC·BD = " + (Distance(A,C)*Distance(B,D)) + UnicodeToLetter(10) + "AB·CD + BC·AD = " + (Distance(A,B)*Distance(C,D) + Distance(B,C)*Distance(A,D))',
    ],
    labels: ['A', 'B', 'C', 'D'],
    after: (api) => {
      api.setCoords('A', -3.76, -1.37); api.setCoords('B', -1.37, 3.76); api.setCoords('C', 3.46, 2); api.setCoords('D', 2, -3.46)
      api.setCoords('txt', -5.5, 7.2); api.setCoordSystem(-6, 6, -5, 8)
    },
  },
  menelay: {
    cmds: [
      'A=(0,0)', 'B=(6,0)', 'C=(2,5)', 'tri=Polygon(A,B,C)', 'SetColor(tri,"#3B82F6")',
      'M=(-1,3)', 'N=(8,-1)', 'l=Line(M,N)', 'SetColor(l,"#DB2777")',
      'A_1=Intersect(l,Line(B,C))', 'B_1=Intersect(l,Line(C,A))', 'C_1=Intersect(l,Line(A,B))',
      'txt="(AC₁/C₁B)·(BA₁/A₁C)·(CB₁/B₁A) = " + ((Distance(A,C_1)/Distance(C_1,B))*(Distance(B,A_1)/Distance(A_1,C))*(Distance(C,B_1)/Distance(B_1,A)))',
    ],
    labels: ['A', 'B', 'C', 'A_1', 'B_1', 'C_1', 'M', 'N'],
    after: (api) => { api.setCoords('txt', -3, 8.3); api.setCoordSystem(-4, 12, -3, 9) },
  },
  ceva: {
    cmds: [
      'A=(0,0)', 'B=(7,0)', 'C=(2,5)', 'tri=Polygon(A,B,C)', 'SetColor(tri,"#3B82F6")', 'O=(3,1.8)',
      'A_1=Intersect(Line(A,O),Line(B,C))', 'B_1=Intersect(Line(B,O),Line(C,A))', 'C_1=Intersect(Line(C,O),Line(A,B))',
      's1=Segment(A,A_1)', 's2=Segment(B,B_1)', 's3=Segment(C,C_1)',
      'SetColor(s1,"#DB2777")', 'SetColor(s2,"#DB2777")', 'SetColor(s3,"#DB2777")',
      'txt="(AC₁/C₁B)·(BA₁/A₁C)·(CB₁/B₁A) = " + ((Distance(A,C_1)/Distance(C_1,B))*(Distance(B,A_1)/Distance(A_1,C))*(Distance(C,B_1)/Distance(B_1,A)))',
    ],
    labels: ['A', 'B', 'C', 'O', 'A_1', 'B_1', 'C_1'],
    after: (api) => { api.setCoords('txt', -1.5, 7.6); api.setCoordSystem(-2, 9, -1.5, 8.5) },
  },
  paraleloqram: {
    cmds: [
      'A=(0,0)', 'B=(5,0)', 'D=(1.5,3)', 'C=B+D-A', 'pq=Polygon(A,B,C,D)', 'SetColor(pq,"#3B82F6")',
      'e1=Segment(A,C)', 'e2=Segment(B,D)', 'SetColor(e1,"#DB2777")', 'SetColor(e2,"#DB2777")',
      'txt="d₁² + d₂² = " + (Distance(A,C)^2 + Distance(B,D)^2) + UnicodeToLetter(10) + "2(a² + b²) = " + (2*(Distance(A,B)^2 + Distance(A,D)^2))',
    ],
    labels: ['A', 'B', 'C', 'D'],
    after: (api) => { api.setCoords('txt', -1.5, 6.4); api.setCoordSystem(-2, 9, -1.5, 7.3) },
  },
  varinyon: {
    cmds: [
      'A=(0,0)', 'B=(6,-0.5)', 'C=(7,4)', 'D=(1,5)', 'poly1=Polygon(A,B,C,D)', 'SetColor(poly1,"#3B82F6")',
      'M=Midpoint(A,B)', 'N=Midpoint(B,C)', 'P=Midpoint(C,D)', 'Q=Midpoint(D,A)',
      'poly2=Polygon(M,N,P,Q)', 'SetColor(poly2,"#FACC15")',
      'txt="S(MNPQ) = " + Area(poly2) + UnicodeToLetter(10) + "S(ABCD) / 2 = " + (Area(poly1)/2)',
    ],
    labels: ['A', 'B', 'C', 'D', 'M', 'N', 'P', 'Q'],
    after: (api) => { api.setCoords('txt', -1.5, 7.6); api.setCoordSystem(-2, 9, -1.5, 8.5) },
  },
  bissektrisa: {
    cmds: [
      'A=(0,0)', 'C=(7,0)', 'B=(2,4)', 'tri=Polygon(A,B,C)', 'SetColor(tri,"#3B82F6")',
      'w=AngleBisector(A,B,C)', 'L=Intersect(w,Segment(A,C))', 'bl=Segment(B,L)', 'SetColor(bl,"#DB2777")',
      'txt="AL / LC = " + (Distance(A,L)/Distance(L,C)) + UnicodeToLetter(10) + "AB / BC = " + (Distance(A,B)/Distance(B,C))',
    ],
    labels: ['A', 'B', 'C', 'L'],
    after: (api) => { api.setVisible('w', false); api.setCoords('txt', -1.5, 7.6); api.setCoordSystem(-2, 9, -1.5, 8.5) },
  },
  'daxili-cevre': {
    cmds: [
      'A=(0,0)', 'B=(7,0)', 'C=(2,5)', 'tri=Polygon(A,B,C)', 'SetColor(tri,"#3B82F6")',
      'kin=Incircle(A,B,C)', 'SetColor(kin,"#DB2777")',
      'pp=(Distance(A,B)+Distance(B,C)+Distance(C,A))/2',
      'txt="r = " + Radius(kin) + UnicodeToLetter(10) + "S / p = " + (Area(tri)/pp)',
    ],
    labels: ['A', 'B', 'C'],
    after: (api) => { api.setCoords('txt', -1.5, 7.6); api.setCoordSystem(-2, 9, -1.5, 8.5) },
  },
  'kvadrat-cem': {
    cmds: [
      'a=Slider(1,4,0.1)', 'b=Slider(1,4,0.1)',
      'p1=Polygon((0,0),(a,0),(a,a),(0,a))', 'p2=Polygon((a,0),(a+b,0),(a+b,a),(a,a))',
      'p3=Polygon((0,a),(a,a),(a,a+b),(0,a+b))', 'p4=Polygon((a,a),(a+b,a),(a+b,a+b),(a,a+b))',
      'SetColor(p1,"#F472B6")', 'SetColor(p2,"#3B82F6")', 'SetColor(p3,"#3B82F6")', 'SetColor(p4,"#A78BFA")',
      'txt="(a+b)² = " + ((a+b)^2) + "   a² + 2ab + b² = " + (a^2 + 2a b + b^2)',
    ],
    labels: ['a', 'b'],
    after: (api) => {
      api.setValue('a', 2)
      api.setValue('b', 3)
      api.setCoords('txt', -0.5, 9.3)
      api.setCoordSystem(-1, 10, -1, 10)
    },
  },
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
          appletOnLoad: (api: Api) => {
            const g = GGB[name]
            api.setErrorDialogsActive(false)
            api.setPerspective('G')
            g.cmds.forEach((c) => api.evalCommand(c))
            try { g.after(api) } catch { /* çertyoj yenə işləyir */ }
            api.getAllObjectNames().forEach((n) => api.setLabelVisible(n, g.labels.includes(n)))
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

// Audit 16.11: TikTok bəzi videolara ad vermir → ID-dən yükləmə tarixi (ID >> 32 = unix vaxtı), kartlar fərqlənsin
const AY = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avqust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr']
function videoDate(id: string) {
  try {
    const d = new Date(Number(BigInt(id) >> 32n) * 1000 + 4 * 3600000)
    return `Tapşırıq videosu · ${d.getUTCDate()} ${AY[d.getUTCMonth()]}`
  } catch {
    return 'Fizmatix videosu'
  }
}

// 16.11.2026 (istifadəçi): saytda videolar YALNIZ TikTok-dan – öz serverimizdəki mp4 göstərilmir.
// Ən yeni öz TikTok videomuz (şərtə görə, məs. adında «Smart Test»)
export function useLatestTikTok(match?: (v: Video) => boolean) {
  const videos = useVideos()
  return videos.filter((v) => v.own && (!match || match(v))).sort((x, y) => (BigInt(y.id) > BigInt(x.id) ? 1 : -1))[0] ?? null
}

// 17.11.2026 (istifadəçi: «TikTok pleyer işləmir»): yoxlama – təmiz Chrome-da video oynayır, amma (1) /vizual-da kart
// 160 px idi – düymələr üst-üstə; (2) bəzi brauzerlərdə (TikTok-a daxil olunmuş, Telegram/Instagram daxili brauzeri)
// pleyer səssizcə açılmırdı. İndi: pleyer ekranın ortasında böyük pəncərədə; 8 s-də TikTok-dan heç bir siqnal gəlmirsə –
// «Pleyer bu brauzerdə açılmadı» + böyük «TikTok-da aç» düyməsi; Esc / fon kliki bağlayır.
function PlayerModal({ v, onClose }: { v: Video; onClose: () => void }) {
  const [ok, setOk] = useState(false)
  const [late, setLate] = useState(false)
  useEffect(() => {
    const onMsg = (e: MessageEvent) => { try { if (/(^|\.)tiktok\.com$/.test(new URL(e.origin).hostname)) setOk(true) } catch { /* origin null */ } }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('message', onMsg)
    window.addEventListener('keydown', onKey)
    const t = window.setTimeout(() => setLate(true), 8000)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('message', onMsg); window.removeEventListener('keydown', onKey)
      window.clearTimeout(t); document.body.style.overflow = prev
    }
  }, [onClose])
  const fail = late && !ok
  return (
    <div role="dialog" aria-modal="true" aria-label={v.title || 'TikTok video'} onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3">
      <div onClick={(e) => e.stopPropagation()} className="flex max-h-full w-full max-w-[min(420px,calc((100dvh-140px)*9/16))] flex-col gap-2">
        <div className="flex justify-end">
          <button type="button" onClick={onClose} aria-label="Bağla" className="min-h-[44px] min-w-[44px] rounded-full bg-white/15 text-2xl font-bold text-white">×</button>
        </div>
        {fail ? (
          <div className="flex aspect-[9/16] w-full flex-col items-center justify-center gap-3 rounded-2xl bg-[#0B1026] p-6 text-center text-white">
            <span className="text-lg font-extrabold">Pleyer bu brauzerdə açılmadı</span>
            <span className="text-sm text-[#CBD5E1]">Videonu TikTok-da aç – bir toxunuşla.</span>
          </div>
        ) : (
          <iframe title={v.title || 'TikTok'} src={`https://www.tiktok.com/player/v1/${v.id}?music_info=1&description=0&embed_from=oembed`}
            className="aspect-[9/16] w-full rounded-2xl border-0 bg-black" allow="autoplay; fullscreen; encrypted-media; picture-in-picture" />
        )}
        <a href={v.url} target="_blank" rel="noopener" className={`flex min-h-[48px] items-center justify-center rounded-xl px-2 text-center font-extrabold ${fail ? 'bg-[#FACC15] text-[#0B1026]' : 'bg-white/15 text-sm text-white'}`}>
          {fail ? 'TikTok-da aç →' : 'Açılmırsa – TikTok-da bax →'}
        </a>
      </div>
    </div>
  )
}

export function TikTokCard({ v }: { v: Video }) {
  const [on, setOn] = useState(false)
  const close = useCallback(() => setOn(false), [])
  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-2">
      {/* 16.11: avtostart YOX – brauzer avtostartda səsi söndürür; ▶ TikTok pleyerində basılır – səsli */}
      <button type="button" onClick={() => setOn(true)} className="flex aspect-[9/16] w-full flex-col items-center justify-center gap-2 rounded-xl bg-[#0B1026] p-3 text-center text-white">
        <svg aria-hidden="true" width="44" height="44" viewBox="0 0 24 24" fill="#FACC15"><path d="M7 4l13 8-13 8z" /></svg>
        <span className="text-[15px] font-extrabold leading-snug">{v.title || videoDate(v.id)}</span>
        <span className="text-xs text-[#CBD5E1]">Kliklə – video böyük ekranda açılır</span>
      </button>
      {on && <PlayerModal v={v} onClose={close} />}
    </div>
  )
}

export function useVideos() {
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
            {it.proofs && <div className="mt-2 text-sm font-semibold text-[#475569]">{it.proofs.length} isbat{it.geogebra ? ' · interaktiv çertyoj' : ''}</div>}
            <div className="mt-2 text-xs font-bold uppercase tracking-wide text-[#475569]">{TOPIC_AZ[it.topic]}</div>
          </a>
        ))}
      </div>
      {ours.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-3 text-xl font-black">TikTok videolarımız</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
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
  const k = useKatex()
  if (!it) return <main className="p-8 text-center font-semibold">Belə teorem tapılmadı. <a href="/vizual" className="text-[#1D4ED8]">Vizual izahlar →</a></main>
  const tt = videos.filter((v) => v.own && v.isbat === slug)
  const proofs = it.proofs ?? []
  const ggb = !!it.geogebra && !!GGB[it.geogebra]
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <a href="/vizual" className="text-sm font-bold text-[#1D4ED8]">← Vizual izahlar</a>
      <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">{it.title}</h1>
      <div className="mt-2 inline-block rounded-xl border-2 border-[#FACC15] px-4 py-2 text-xl font-extrabold">{it.formula}</div>
      <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-[#475569]">{it.about}</p>
      <p className="mt-1 text-sm font-semibold text-[#475569]">{proofs.length} isbat{ggb ? ' · interaktiv çertyoj' : ''}{tt.length ? ' · video' : ''}</p>
      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="grid content-start gap-4">
          {proofs.map((p, i) => <ProofCard key={i} n={i + 1} p={p} k={k} />)}
        </div>
        <div className="grid content-start gap-5">
          {ggb && (
            <section>
              <h2 className="mb-2 font-black">Özün yoxla</h2>
              <GeoGebraBox name={it.geogebra as string} />
            </section>
          )}
          {tt.length > 0 && (
            <section>
              <h2 className="mb-2 font-black">Fizmatix videosu</h2>
              <div className="grid max-w-[300px] gap-3">{tt.map((v) => <TikTokCard key={v.id} v={v} />)}</div>
            </section>
          )}
        </div>
      </div>
      <a href="/sinaq" className="mt-8 inline-block rounded-2xl bg-[#FACC15] px-6 py-4 font-extrabold text-[#0B1026]">İndi tapşırıqda yoxla – günün sınağı</a>
    </main>
  )
}
