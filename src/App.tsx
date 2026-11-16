import { useEffect, useState } from 'react'
import DAILY_TESTS from './data/gunun-sinaq.json'
import { IsbatPage, TikTokCard, VizualPage, useLatestTikTok } from './Vizual'

const NAVY = '#0B1026'
const BANK_BASE = 'https://bank.fizmatix.com/P0010_Riyaziyyat_Test_Bank/app/public/lessons/tests/'
const SUBS: Record<string, string> = {
  dim5: 'DİM 5-ci sinif', dim9: 'DİM 9-cu sinif', dim11: 'DİM 11 – sınaqlar', bank: 'Test bankı', buraxilis: 'Buraxılış sınaqları',
  sinif: 'Sinif testləri', sinaq: 'Sınaqlar', nezeri: 'Nəzəri testlər', sual: 'Günün tapşırığı', derslik5: 'Riyaziyyat 5 – dərslik',
  derslik6: 'Riyaziyyat 6 – dərslik', ingilis: 'İngilis dili',
}
const FRAMES: Record<string, { title: string; src: string }> = {
  dim9: { title: 'DİM 9-cu sinif', src: 'https://dim9.fizmatix.com/' },
  bank: { title: 'Test bankı', src: 'https://bank.fizmatix.com/' },
}

// Günün sınağı: Bakı tarixinə görə hamı üçün eyni test (15.11.2026 = 1-ci test)
function dailyTest() {
  const day = (ms: number) => Math.floor(ms / 86400000)
  const today = day(Date.now() + 4 * 3600000)
  const n = DAILY_TESTS.length
  const i = (((today - day(Date.UTC(2026, 10, 15))) % n) + n) % n
  return { ...DAILY_TESTS[i], num: i + 1, n }
}
const GOLD = '#FACC15'
const TIKTOK = 'https://www.tiktok.com/@fizmatix.riyaziyyat'

type Option = { key: string; text: string }
const TASK = {
  grade: '9-cu sinif',
  question: 'Bərabərsizliyin neçə natural həlli var?',
  num: '2x − 8',
  den: 'x + 2',
  rel: '< 0',
  options: [
    { key: 'A', text: '2' },
    { key: 'B', text: '3' },
    { key: 'C', text: '4' },
    { key: 'D', text: '5' },
  ] as Option[],
  correct: 'B',
  solution: '2x − 8 < 0 və x + 2 > 0 ⇒ −2 < x < 4. Natural ədədlər: 1, 2, 3 – cəmi 3.',
}

const SECTIONS = [
  {
    href: '/bolme/dim9',
    tag: '9-cu sinif',
    title: 'DİM 9-cu sinif',
    text: 'Buraxılış imtahanı formatında testlər: vaxt, nəticə və hər sualın həlli.',
  },
  {
    href: '/bolme/bank',
    tag: 'Bütün siniflər',
    title: 'Test bankı',
    text: 'Mövzular üzrə testlər – I və II hissə. Zəif mövzunu seç, məşq et.',
  },
]

function Logo({ size = 44 }: { size?: number }) {
  return <img src="/logo.png" alt="" width={size} height={size} className="rounded-full" />
}

// 16.11.2026 (istifadəçi: «sual dəyişmir»): hər gün yeni sual – public/gunun/N.json (scripts/gunun-tapsiriq.py),
// Bakı tarixinə görə hamı üçün eyni; yüklənməsə – köhnə sabit sual (TASK) göstərilir.
type Daily = { q: string; o: string[]; a: number; e: string; test?: string }
const KEYS = 'ABCDE'

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
// KaTeX yalnız sual yüklənəndə gəlir (audit: ana səhifə 181 → 451 KB olmasın)
type KatexLib = { renderToString: (t: string, o: { throwOnError: boolean }) => string }
let katex: KatexLib | null = null
const loadKatex = () =>
  Promise.all([import('katex'), import('katex/dist/katex.min.css')]).then(([k]) => {
    katex = (k.default ?? k) as KatexLib
  })
function tex(s: string) {
  return s
    .split(/(\$[^$]+\$)/g)
    .map((p) =>
      p.length > 2 && p.startsWith('$') && p.endsWith('$')
        ? katex
          ? katex.renderToString(p.slice(1, -1), { throwOnError: false })
          : esc(p.slice(1, -1))
        : esc(p),
    )
    .join('')
}
const Tex = ({ s, className }: { s: string; className?: string }) => (
  <span className={className} dangerouslySetInnerHTML={{ __html: tex(s) }} />
)

function useDailyQuestion(): Daily | null {
  const [d, setD] = useState<Daily | null>(null)
  useEffect(() => {
    fetch('/gunun/say.json')
      .then((r) => r.json())
      .then(({ n }: { n: number }) => {
        const day = (ms: number) => Math.floor(ms / 86400000)
        const i = (((day(Date.now() + 4 * 3600000) - day(Date.UTC(2026, 10, 16))) % n) + n) % n
        return Promise.all([fetch(`/gunun/${i}.json`).then((r) => r.json()), loadKatex()]).then(([q]) => q)
      })
      .then(setD)
      .catch(() => setD(null))
  }, [])
  return d
}

function DailyTask() {
  const [picked, setPicked] = useState<string | null>(null)
  const daily = useDailyQuestion()
  if (daily) {
    const correct = KEYS[daily.a]
    const ok = picked === correct
    return (
      <div id="gunun" className="w-full rounded-3xl bg-white p-6 text-[#0F172A] shadow-[0_30px_60px_rgba(0,0,0,.35)] sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="rounded-full bg-[#FEF3C7] px-3 py-1.5 text-[13px] font-extrabold text-[#92400E]">Günün tapşırığı</span>
          <span className="text-[13px] font-semibold text-[#475569]">qeydiyyatsız</span>
        </div>
        <p className="mb-4 mt-4 text-lg font-semibold leading-relaxed">
          <Tex s={daily.q} />
        </p>
        <div className="grid grid-cols-2 gap-2.5">
          {daily.o.map((text, k) => {
            const key = KEYS[k]
            let cls = 'border-[#E2E8F0] bg-white hover:border-[#FACC15]'
            if (picked) {
              if (key === correct) cls = 'border-[#16A34A] bg-[#DCFCE7] text-[#14532D]'
              else if (key === picked) cls = 'border-[#DC2626] bg-[#FEE2E2] text-[#7F1D1D]'
            }
            return (
              <button
                key={key}
                type="button"
                disabled={!!picked}
                onClick={() => setPicked(key)}
                className={`min-h-[52px] rounded-2xl border-2 px-4 text-left text-[17px] font-bold transition ${cls}`}
              >
                {key}) <Tex s={text} />
              </button>
            )
          })}
        </div>
        {picked && (
          <div className={`mt-4 rounded-2xl p-4 ${ok ? 'bg-[#F0FDF4] text-[#14532D]' : 'bg-[#FFF7ED] text-[#7C2D12]'}`} role="status">
            <div className="font-extrabold">
              {ok ? 'Düzdür!' : 'Az qaldı!'} Cavab: {correct}) <Tex s={daily.o[daily.a]} />
            </div>
            {daily.e && <Tex s={daily.e} className="mt-1.5 block text-[15px] leading-relaxed" />}
            <div className="mt-2 text-[13px] opacity-80">Sabah – yeni tapşırıq.</div>
            <a href="#bolmeler" className="mt-3 inline-block rounded-xl px-4 py-3 text-[15px] font-bold text-white" style={{ background: NAVY }}>
              Daha çox tapşırıq →
            </a>
          </div>
        )}
      </div>
    )
  }
  const ok = picked === TASK.correct
  return (
    <div id="gunun" className="w-full rounded-3xl bg-white p-6 text-[#0F172A] shadow-[0_30px_60px_rgba(0,0,0,.35)] sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="rounded-full bg-[#FEF3C7] px-3 py-1.5 text-[13px] font-extrabold text-[#92400E]">
          Sınaq tapşırığı · {TASK.grade}
        </span>
        <span className="text-[13px] font-semibold text-[#475569]">qeydiyyatsız</span>
      </div>
      <p className="mb-2.5 mt-4 text-lg font-semibold leading-relaxed">{TASK.question}</p>
      <div className="mb-4 flex items-center justify-center gap-3 rounded-2xl bg-[#F1F5F9] p-4 text-2xl font-bold">
        <span className="inline-flex flex-col items-center">
          <span className="border-b-2 border-[#0F172A] px-1.5 pb-1">{TASK.num}</span>
          <span className="pt-1">{TASK.den}</span>
        </span>
        <span>{TASK.rel}</span>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {TASK.options.map((o) => {
          let cls = 'border-[#E2E8F0] bg-white hover:border-[#FACC15]'
          if (picked) {
            if (o.key === TASK.correct) cls = 'border-[#16A34A] bg-[#DCFCE7] text-[#14532D]'
            else if (o.key === picked) cls = 'border-[#DC2626] bg-[#FEE2E2] text-[#7F1D1D]'
          }
          return (
            <button
              key={o.key}
              type="button"
              disabled={!!picked}
              onClick={() => setPicked(o.key)}
              className={`min-h-[52px] rounded-2xl border-2 px-4 text-left text-[17px] font-bold transition ${cls}`}
            >
              {o.key}) {o.text}
            </button>
          )
        })}
      </div>
      {picked && (
        <div className={`mt-4 rounded-2xl p-4 ${ok ? 'bg-[#F0FDF4] text-[#14532D]' : 'bg-[#FFF7ED] text-[#7C2D12]'}`} role="status">
          <div className="font-extrabold">{ok ? 'Düzdür! Cavab: 3' : 'Az qaldı! Düzgün cavab: 3'}</div>
          <div className="mt-1.5 text-[15px] leading-relaxed">{TASK.solution}</div>
          <a href="#bolmeler" className="mt-3 inline-block rounded-xl px-4 py-3 text-[15px] font-bold text-white" style={{ background: NAVY }}>
            Daha çox tapşırıq →
          </a>
        </div>
      )}
    </div>
  )
}

function Header() {
  const links = [
    ['/sinaq', 'Günün sınağı'],
    ['/bugun', 'Günün tapşırığı'],
    ['/#bolmeler', 'Bölmələr'],
    ['/vizual', 'Vizual izahlar'],
  ]
  return (
    <header className="px-4 sm:px-6" style={{ background: NAVY }}>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 py-3.5">
        <a href="/" className="flex items-center gap-2.5">
          <Logo />
          <span className="text-[22px] font-black tracking-tight text-white">Fizmatix</span>
        </a>
        <nav className="order-3 flex w-full flex-wrap gap-1 sm:order-none sm:ml-6 sm:w-auto sm:flex-1" aria-label="Əsas menyu">
          {links.map(([h, t]) => (
            <a key={h} href={h} className="px-3 py-2.5 text-[15px] font-semibold text-[#CBD5E1] hover:text-white">
              {t}
            </a>
          ))}
        </nav>
        <a href="/sinaq" className="ml-auto rounded-xl px-4 py-3 text-[15px] font-extrabold text-[#0B1026] sm:ml-0" style={{ background: GOLD }}>
          Başla
        </a>
      </div>
    </header>
  )
}

function BetaBar() {
  return (
    <div className="px-4 py-2.5 text-center text-sm font-bold text-[#0B1026]" style={{ background: GOLD }}>
      Beta versiya: sayt yenilənir, yeni bölmələr tədricən açılır
    </div>
  )
}

function Footer() {
  return (
    <footer className="px-4 py-10 text-[#94A3B8] sm:px-6" style={{ background: NAVY }}>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6">
        <div className="flex flex-wrap items-center gap-2.5">
          <Logo size={32} />
          <span className="font-extrabold text-white">Fizmatix</span>
          <span>· Riyaziyyatı düşünərək öyrən</span>
        </div>
        <div className="flex flex-wrap gap-5 text-sm">
          <a href="/sinaq" className="text-[#CBD5E1] hover:text-white">Günün sınağı</a>
          <a href="/bolme/dim9" className="text-[#CBD5E1] hover:text-white">DİM 9</a>
          <a href="/bolme/bank" className="text-[#CBD5E1] hover:text-white">Test bankı</a>
          <a href={TIKTOK} className="text-[#CBD5E1] hover:text-white">TikTok</a>
        </div>
      </div>
    </footer>
  )
}

// Bölmə səhifəsi: test sayt daxilində (iframe), şagird alt saytın ünvanını görmür
function FramePage({ title, sub, src }: { title: string; sub?: string; src: string }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F7FB]">
      <Header />
      <div className="border-b border-[#E2E8F0] bg-white px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2">
          <h1 className="text-lg font-black sm:text-xl">{title}</h1>
          {sub && <span className="text-sm font-semibold text-[#475569]">{sub}</span>}
        </div>
      </div>
      <iframe title={title} src={src} className="w-full flex-1 border-0 bg-white" style={{ minHeight: 'calc(100dvh - 140px)' }} allow="fullscreen" />
    </div>
  )
}

// Günün sınağı: serverdə hər gün 10 fərqli mövzudan qarışıq test (viktorina); server cavab verməsə – Test bankından test
function DailyTestPage() {
  const fallback = dailyTest()
  const [quiz, setQuiz] = useState<{ title: string; url: string } | null>(null)
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    fetch('/tiktok/api/sinaq')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => (d && d.url ? setQuiz({ title: d.title, url: d.url }) : setFailed(true)))
      .catch(() => setFailed(true))
  }, [])
  if (quiz) return <FramePage title={quiz.title} sub="10 sual · 10 fərqli mövzu · hər sualın həlli var" src={quiz.url} />
  if (failed) return <FramePage title={`Günün sınağı: ${fallback.t}`} sub="Hər gün yeni test" src={BANK_BASE + fallback.p} />
  return (
    <div className="min-h-screen bg-[#F6F7FB]">
      <Header />
      <p className="p-8 text-center font-semibold text-[#475569]">Günün sınağı hazırlanır…</p>
    </div>
  )
}

function TodayTikTok() {
  const v = useLatestTikTok()
  return v ? <TikTokCard v={v} /> : null
}

function StsTikTok() {
  const v = useLatestTikTok((x) => /smart\s*test/i.test(x.title || ''))
  return v ? (
    <TikTokCard v={v} />
  ) : (
    <a href={TIKTOK} className="mx-auto flex aspect-[9/16] w-full max-w-[300px] flex-col items-center justify-center gap-2 rounded-3xl bg-[#0B1026] p-6 text-center text-white">
      <span className="text-lg font-extrabold">Video tezliklə TikTok-da</span>
      <span className="text-sm text-[#CBD5E1]">@fizmatix.riyaziyyat →</span>
    </a>
  )
}

// Video və tapşırıq yan-yana (kompüter), telefonda video yuxarıda, tapşırıq altında
function TodayPage() {
  // son videonun tapşırığı: /tiktok/api/video -> task (/Sinaqlar/...html?q=N); yoxdursa – sual.fizmatix.com
  const [task, setTask] = useState('https://sual.fizmatix.com/')
  useEffect(() => {
    fetch('/tiktok/api/video')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (d && typeof d.task === 'string' && d.task.startsWith('/Sinaqlar/')) setTask('https://hub.fizmatix.com' + d.task) })
      .catch(() => {})
  }, [])
  return (
    <div className="min-h-screen bg-[#F6F7FB]">
      <Header />
      <div className="border-b border-[#E2E8F0] bg-white px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2">
          <h1 className="text-lg font-black sm:text-xl">Günün tapşırığı</h1>
          <span className="text-sm font-semibold text-[#475569]">Videoya bax və eyni tapşırığı özün həll et</span>
        </div>
      </div>
      <main className="mx-auto flex max-w-6xl flex-wrap items-start gap-5 px-4 py-5 sm:px-6">
        <div className="min-w-0 flex-[1_1_260px] lg:max-w-[320px]">
          <div className="mx-auto max-w-[320px]">
            <TodayTikTok />
          </div>
          <a href={TIKTOK} className="mx-auto mt-3 flex min-h-[44px] max-w-[320px] items-center justify-center rounded-xl border border-[#E2E8F0] bg-white text-sm font-extrabold text-[#0B1026]">
            TikTok-da izlə →
          </a>
        </div>
        <iframe
          title="Günün tapşırığı"
          src={task}
          className="min-w-0 flex-[999_1_480px] rounded-2xl border border-[#E2E8F0] bg-white"
          style={{ minHeight: '75dvh' }}
        />
      </main>
    </div>
  )
}

// Son video: TikTok-dakı öz videomuz (müəllimin seçdiyi musiqi ilə); yoxdursa – serverdəki fayl səssiz
// 16.11.2026 (istifadəçi): saytda videolar yalnız TikTok-dan – ən yeni öz TikTok videomuz
function LatestVideo() {
  const v = useLatestTikTok()
  return (
    <div className="mx-auto w-full max-w-[300px]">
      {v && <TikTokCard v={v} />}
      <a href={TIKTOK} className="mt-3 flex min-h-[48px] items-center justify-center rounded-xl bg-white font-extrabold text-[#0B1026]">
        TikTok-da bütün videolar →
      </a>
    </div>
  )
}

function HomePage() {
  return (
    <div className="min-h-screen bg-[#F6F7FB] text-[#0F172A]">
      <BetaBar />
      <Header />

      <section className="px-4 pb-20 pt-12 sm:px-6" style={{ background: NAVY }}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-12">
          <div className="min-w-0 flex-[1_1_440px]">
            <div className="inline-flex rounded-full bg-[#1B2A6B] px-3.5 py-2 text-[13px] font-bold text-[#FDE68A]">
              5–11-ci siniflər · Buraxılış · DİM qəbul
            </div>
            <h1 className="mb-4 mt-5 text-[40px] font-black leading-[1.05] tracking-tight text-white sm:text-[56px]">
              Riyaziyyatı <span className="text-[#FACC15]">düşünərək</span> öyrən.
            </h1>
            <p className="mb-7 max-w-[520px] text-lg leading-relaxed text-[#CBD5E1]">
              Hər gün 10 dəqiqə: tapşırığı özün həll et, səhvini gör, addım-addım izahı oxu.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="/sinaq" className="rounded-2xl px-6 py-4 text-[17px] font-extrabold text-[#0B1026]" style={{ background: GOLD }}>
                Günün sınağına başla
              </a>
              <a href="#gunun" className="rounded-2xl border border-[#334155] px-5 py-4 text-[17px] font-bold text-white">
                Qeydiyyatsız yoxla
              </a>
            </div>
            <p className="mt-7 text-sm text-[#94A3B8]">Qeydiyyat tələb olunmur · beta versiya</p>
          </div>
          <div className="min-w-0 flex-[1_1_380px]">
            <DailyTask />
          </div>
        </div>
      </section>

      <section id="bolmeler" className="scroll-mt-4 px-4 pb-6 pt-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-2 text-center text-3xl font-black tracking-tight sm:text-4xl">Haradan başlayaq?</h2>
          <p className="mb-9 text-center text-[17px] text-[#475569]">Bölməni seç – testlər dərhal açılır.</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SECTIONS.map((s) => (
              <a
                key={s.href}
                href={s.href}
                className="group flex flex-col gap-3 rounded-3xl border border-[#E2E8F0] bg-white p-7 transition hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(11,16,38,.12)]"
              >
                <span className="w-fit rounded-full bg-[#E0F2FE] px-3 py-1 text-xs font-extrabold text-[#075985]">{s.tag}</span>
                <span className="text-2xl font-black">{s.title}</span>
                <span className="leading-relaxed text-[#475569]">{s.text}</span>
                <span className="mt-auto pt-2 font-extrabold text-[#1D4ED8] group-hover:underline">Aç →</span>
              </a>
            ))}
            <div className="flex flex-col gap-3 rounded-3xl border border-dashed border-[#94A3B8] bg-white p-7">
              <span className="w-fit rounded-full bg-[#F1F5F9] px-3 py-1 text-xs font-extrabold text-[#475569]">Tezliklə</span>
              <span className="text-2xl font-black">Şəxsi yol</span>
              <span className="leading-relaxed text-[#475569]">
                Qeydiyyat, səviyyə testi və hər gün sənə uyğun yeni addım. Yeni bölmələr tədricən açılacaq.
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-9 text-center text-3xl font-black tracking-tight sm:text-4xl">3 addım – hər gün</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ['Özün həll et', 'Əvvəl düşün, sonra cavab ver. Tələsmə – vaxt səninlədir.'],
              ['Səhvini başa düş', 'Hər sualın addım-addım həlli var, TikTok-da isə qısa video izah.'],
              ['Təkrar et', 'Səhv etdiyin mövzuya qayıt – ikinci dəfə daha asan olacaq.'],
            ].map(([t, d], i) => (
              <div key={t} className="rounded-3xl border border-[#E2E8F0] bg-white p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl text-xl font-black text-[#FACC15]" style={{ background: NAVY }}>
                  {i + 1}
                </div>
                <h3 className="mb-2 mt-4 text-xl font-bold">{t}</h3>
                <p className="leading-relaxed text-[#475569]">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="video" className="px-4 py-16 sm:px-6" style={{ background: NAVY }}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-10">
          <div className="min-w-0 flex-[1_1_340px]">
            <h2 className="mb-3 text-3xl font-black tracking-tight text-white sm:text-4xl">Hər gün 3 video izah</h2>
            <p className="mb-6 text-[17px] leading-relaxed text-[#CBD5E1]">
              Səhər – klassik tapşırıq, günorta – vizual isbat, axşam – çağırış. TikTok-da izlə, burada həll et.
            </p>
            <a href={TIKTOK} className="inline-block rounded-2xl bg-white px-5 py-3.5 font-extrabold text-[#0B1026]">
              @fizmatix.riyaziyyat
            </a>
          </div>
          <div className="min-w-0 flex-[1_1_300px]">
            <LatestVideo />
          </div>
        </div>
      </section>

      <section id="muellim" className="px-4 py-16 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-10">
          <div className="min-w-0 flex-[1_1_340px]">
            <h2 className="mb-3 text-3xl font-black tracking-tight sm:text-4xl">Müəllimlər üçün: Smart Test Studio</h2>
            <p className="mb-6 text-[17px] leading-relaxed text-[#475569]">
              Kitabdan şəkil çək – test hazırdır. Blankı çap et, şagirdin cavablarını proqram özü oxusun. 30 saniyəlik videoda necə işlədiyinə bax.
            </p>
            <a href="https://test.fizmatix.com" className="inline-block rounded-2xl px-5 py-3.5 font-extrabold text-white" style={{ background: NAVY }}>
              test.fizmatix.com · Beta
            </a>
          </div>
          <div className="min-w-0 flex-[1_1_260px]">
            <div className="mx-auto max-w-[300px]">
              <StsTikTok />
            </div>
          </div>
        </div>
      </section>

      <section id="valideyn" className="px-4 py-16 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-8 rounded-3xl border border-[#E2E8F0] bg-white p-8 sm:p-10">
          <div className="min-w-0 flex-[1_1_420px]">
            <h2 className="mb-2.5 text-3xl font-black">Valideynlər üçün</h2>
            <p className="text-[17px] leading-relaxed text-[#475569]">
              Reklam yoxdur, uşağın məlumatları üçüncü tərəfə verilmir. Tezliklə – hər bazar qısa hesabat: neçə tapşırıq
              həll olundu və hansı mövzunu təkrar etmək lazımdır.
            </p>
          </div>
          <a href="#bolmeler" className="rounded-2xl px-6 py-4 font-extrabold text-white" style={{ background: NAVY }}>
            Testlərə bax
          </a>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-5 text-center text-3xl font-black">Tez-tez verilən suallar</h2>
          {[
            ['Beta nədir?', 'Sayt sınaq mərhələsindədir: bölmələr tədricən əlavə olunur, rəyiniz bizə kömək edir.'],
            ['Beta bitəndə nə olacaq?', 'Nəticələriniz qalacaq. Dəyişikliklər barədə əvvəlcədən xəbər verəcəyik.'],
            ['Testlər imtahan formatındadır?', 'Bəli, buraxılış və DİM formatında; hər sualın həlli var.'],
          ].map(([q, a]) => (
            <details key={q} className="mb-2.5 rounded-2xl border border-[#E2E8F0] bg-white px-5 py-4">
              <summary className="cursor-pointer font-bold">{q}</summary>
              <p className="mt-2 leading-relaxed text-[#475569]">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}

// Audit 16.11: hər səhifənin öz başlığı (axtarış/paylaşım), naməlum ünvan – «tapılmadı» + noindex
const BASE_TITLE = 'Fizmatix — riyaziyyatı düşünərək öyrən'
function setMeta(title: string, noindex = false) {
  document.title = title === BASE_TITLE ? title : `${title} · Fizmatix`
  let m = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null
  if (noindex) {
    if (!m) {
      m = document.createElement('meta')
      m.name = 'robots'
      document.head.appendChild(m)
    }
    m.content = 'noindex'
  }
}

function NotFound() {
  return (
    <div className="min-h-screen bg-[#F6F7FB] text-[#0F172A]">
      <Header />
      <main className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="text-3xl font-black">Səhifə tapılmadı</h1>
        <p className="mt-3 text-[#475569]">Bu ünvanda səhifə yoxdur. Ana səhifədən davam edin.</p>
        <a href="/" className="mt-6 inline-block rounded-2xl px-5 py-3.5 font-extrabold text-white" style={{ background: NAVY }}>
          Ana səhifə →
        </a>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  const path = typeof window !== 'undefined' ? window.location.pathname.replace(/\/+$/, '') : ''
  const titles: Record<string, string> = { '': BASE_TITLE, '/bugun': 'Günün tapşırığı', '/sinaq': 'Günün sınağı', '/vizual': 'Vizual izahlar' }
  const sub = path.match(/^\/bolme\/([a-z0-9]+)/)
  const known = path in titles || path.startsWith('/isbat/') || !!(sub && (SUBS[sub[1]] || FRAMES[sub[1]]))
  setMeta(titles[path] ?? (path.startsWith('/isbat/') ? 'Vizual isbat' : sub ? (FRAMES[sub[1]]?.title ?? SUBS[sub[1]] ?? BASE_TITLE) : 'Səhifə tapılmadı'), !known)
  if (!known) return <NotFound />
  if (path === '/bugun') return <TodayPage />
  if (path === '/sinaq') return <DailyTestPage />
  if (path === '/vizual' || path.startsWith('/isbat/'))
    return (
      <div className="min-h-screen bg-[#F6F7FB] text-[#0F172A]">
        <Header />
        {path === '/vizual' ? <VizualPage /> : <IsbatPage slug={decodeURIComponent(path.slice(7))} />}
        <Footer />
      </div>
    )
  const m = path.match(/^\/bolme\/(\w+)$/)
  if (m && FRAMES[m[1]]) return <FramePage title={FRAMES[m[1]].title} src={FRAMES[m[1]].src} />
  // PROBLEMLER P-3: /bolme/<alt>/<yol> – birbaşa açılan alt sayt səhifəsi brend daxilində (Caddy bura yönləndirir)
  const g = window.location.pathname.match(/^\/bolme\/([a-z0-9]+)(\/.*)?$/)
  if (g && SUBS[g[1]]) {
    const rest = (g[2] || '/').replace(/\/\/+/g, '/')
    return <FramePage title={SUBS[g[1]]} src={`https://${g[1]}.fizmatix.com${rest}${window.location.search}${window.location.hash}`} />
  }
  return <HomePage />
}
