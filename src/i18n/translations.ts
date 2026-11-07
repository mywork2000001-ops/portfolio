export type Lang = 'az' | 'ru' | 'en'

export const languageNames: Record<Lang, string> = { az: 'AZ', ru: 'RU', en: 'EN' }

interface ProjectText {
  desc: string
  points: [string, string, string]
}

export interface Translation {
  nav: { projects: string; approach: string; stack: string; about: string; contact: string }
  menu: string
  theme: string
  hero: { badge: string; title: string; text: string; cta: string; contact: string; chips: [string, string, string] }
  stats: [string, string, string, string]
  projects: { title: string; lead: string; open: string; live: string; archive: string; archiveLead: string }
  projectText: { muellim: ProjectText; sts: ProjectText; yttm: ProjectText }
  archiveNames: [string, string, string]
  approach: { title: string; lead: string; items: { title: string; text: string }[] }
  stack: { title: string; lead: string; groups: [string, string, string, string] }
  about: { title: string; text: string; timelineTitle: string; timeline: { years: string; title: string; place: string }[] }
  contact: { title: string; text: string; email: string; whatsapp: string; call: string }
  footer: string
}

export const translations: Record<Lang, Translation> = {
  az: {
    nav: { projects: 'Layihələr', approach: 'Yanaşma', stack: 'Texnologiyalar', about: 'Haqqımda', contact: 'Əlaqə' },
    menu: 'Menyu',
    theme: 'Mövzunu dəyiş',
    hero: {
      badge: 'Riyaziyyat müəllimi · Tərtər',
      title: 'Müəllim kimi düşünür, proqramçı kimi qururam.',
      text: 'Məktəb üçün real işləyən rəqəmsal alətlər hazırlayıram: elektron jurnal və imtahanlar, telefonla test yaratmaq, kağız blankların yoxlanması, məktəb saytı. Hər biri sinifdə sınaqdan keçir.',
      cta: 'Layihələrə bax',
      contact: 'Əlaqə saxla',
      chips: ['AZ · RU · EN', 'İnternetsiz də işləyir', 'QR və OCR'],
    },
    stats: ['il tədris təcrübəsi', 'canlı layihə', 'interfeys dili', 'bulud avtomatlaşdırması'],
    projects: {
      title: 'Canlı layihələr',
      lead: 'Hamısı işləkdir və hər gün müəllim və şagirdlər tərəfindən istifadə olunur.',
      open: 'Aç',
      live: 'Canlı',
      archive: 'Əvvəlki layihələr',
      archiveLead: 'Öyrəndiyim və sınadığım ilk platformalar.',
    },
    projectText: {
      muellim: {
        desc: 'Məktəb üçün vahid platforma: müəllim, şagird, valideyn və administrasiya bir yerdə.',
        points: ['Elektron jurnal, davamiyyət, imtahanlar və hesabatlar', 'Kağız blankların QR ilə avtomatik yoxlanması', 'Valideyn hesabatları və gecə avtomatik auditi'],
      },
      sts: {
        desc: 'Telefonla test yaratmaq: kitabdan sualın şəklini çək — test hazırdır.',
        points: ['Tətbiqdaxili kamera, avtomatik çərçivə, mətnin tanınması (OCR)', 'QR-lu blanklar, linklə onlayn test', 'Telefona quraşdırılır, internetsiz işləyir'],
      },
      yttm: {
        desc: 'Tərtər şəhər 6 nömrəli məktəbin rəsmi saytı (YTTM layihəsi).',
        points: ['Xəbərlər avtomatik yenilənir', 'Şagird və müəllim girişi', 'Telefona uyğun, üç dildə'],
      },
    },
    archiveNames: ['Dərs cədvəli qurucusu', 'Repetitor platforması', 'Müəllim üçün planlaşdırma'],
    approach: {
      title: 'Necə işləyirəm',
      lead: 'Proqramı özüm istifadə edirəm — ona görə hər detal sinif üçün düşünülüb.',
      items: [
        { title: 'Müəllim gözü ilə', text: 'Bir əsas düymə, ≤ 3 addım, aydın yazılar. Təlimsiz istifadə olunur.' },
        { title: 'İnternetsiz də', text: 'Telefonda quraşdırılır, şəbəkə olmayanda da işləyir, sonra sinxronlaşır.' },
        { title: 'Üç dildə', text: 'Azərbaycan, rus və ingilis dilləri — bütün interfeys tərcümə olunub.' },
        { title: 'Etibarlı və təhlükəsiz', text: 'Şagird məlumatları qorunur, gündəlik ehtiyat nüsxələr, avtomatik yoxlamalar.' },
      ],
    },
    stack: { title: 'Texnologiyalar', lead: 'Müasir, sürətli və pulsuz/ucuz bulud həlləri.', groups: ['İnterfeys', 'Server', 'Bulud', 'Alətlər'] },
    about: {
      title: 'Haqqımda',
      text: 'Təhsilimə görə enerji mühəndisiyəm, 2017-ci ildən riyaziyyat müəllimiyəm, 2025-ci ildə kompüter mühəndisliyi üzrə magistraturanı bitirmişəm. Məktəbdə dərs deyirəm və paralel olaraq məktəb üçün proqramlar hazırlayıram — ideyadan istifadəyə qədər, süni intellekt alətləri ilə.',
      timelineTitle: 'Yol',
      timeline: [
        { years: '2023–2025', title: 'Magistratura · Kompüter mühəndisliyi', place: 'Azərbaycan Texnologiya Universiteti' },
        { years: '2017 — indi', title: 'Riyaziyyat müəllimi', place: 'Tərtər şəhər 6 nömrəli məktəb' },
        { years: '2012–2017', title: 'Bakalavr · Riyaziyyat müəllimliyi', place: 'Azərbaycan Dövlət Pedaqoji Universiteti' },
        { years: '2003–2007', title: 'Bakalavr (fərqlənmə) · Energetika', place: 'Azərbaycan Dövlət Neft və Sənaye Universiteti' },
      ],
    },
    contact: {
      title: 'Birlikdə nəsə quraq?',
      text: 'Məktəbiniz və ya kursunuz üçün rəqəmsal alət lazımdırsa — yazın, danışaq.',
      email: 'E-poçt yaz',
      whatsapp: 'WhatsApp',
      call: 'Zəng et',
    },
    footer: 'Bütün hüquqlar qorunur.',
  },
  ru: {
    nav: { projects: 'Проекты', approach: 'Подход', stack: 'Технологии', about: 'Обо мне', contact: 'Контакты' },
    menu: 'Меню',
    theme: 'Сменить тему',
    hero: {
      badge: 'Учитель математики · Тертер',
      title: 'Думаю как учитель, строю как разработчик.',
      text: 'Создаю цифровые инструменты, которые реально работают в школе: электронный журнал и экзамены, создание тестов телефоном, проверка бумажных бланков, сайт школы. Каждый проходит проверку в классе.',
      cta: 'Смотреть проекты',
      contact: 'Связаться',
      chips: ['AZ · RU · EN', 'Работает без интернета', 'QR и OCR'],
    },
    stats: ['лет преподавания', 'живых проекта', 'языка интерфейса', 'облачная автоматизация'],
    projects: {
      title: 'Живые проекты',
      lead: 'Все работают и каждый день используются учителями и учениками.',
      open: 'Открыть',
      live: 'Онлайн',
      archive: 'Ранние проекты',
      archiveLead: 'Первые платформы, на которых я учился.',
    },
    projectText: {
      muellim: {
        desc: 'Единая платформа для школы: учитель, ученик, родитель и администрация в одном месте.',
        points: ['Электронный журнал, посещаемость, экзамены и отчёты', 'Автоматическая проверка бумажных бланков по QR', 'Отчёты родителям и ночной автоаудит'],
      },
      sts: {
        desc: 'Тест телефоном: сфотографируйте вопрос из книги — тест готов.',
        points: ['Камера в приложении, авторамка, распознавание текста (OCR)', 'Бланки с QR, онлайн-тест по ссылке', 'Устанавливается на телефон, работает без интернета'],
      },
      yttm: {
        desc: 'Официальный сайт школы № 6 города Тертер (проект YTTM).',
        points: ['Новости обновляются автоматически', 'Вход для учеников и учителей', 'Адаптивный, на трёх языках'],
      },
    },
    archiveNames: ['Конструктор расписания', 'Платформа для репетиторов', 'Планирование для учителя'],
    approach: {
      title: 'Как я работаю',
      lead: 'Я сам пользуюсь своими программами — поэтому каждая деталь продумана для класса.',
      items: [
        { title: 'Глазами учителя', text: 'Одно главное действие, ≤ 3 шагов, понятные подписи. Без обучения.' },
        { title: 'Без интернета', text: 'Ставится на телефон, работает без сети и синхронизируется позже.' },
        { title: 'На трёх языках', text: 'Азербайджанский, русский и английский — переведён весь интерфейс.' },
        { title: 'Надёжно и безопасно', text: 'Данные учеников защищены, ежедневные копии, автоматические проверки.' },
      ],
    },
    stack: { title: 'Технологии', lead: 'Современные, быстрые и бесплатные/недорогие облачные решения.', groups: ['Интерфейс', 'Сервер', 'Облако', 'Инструменты'] },
    about: {
      title: 'Обо мне',
      text: 'По образованию инженер-энергетик, с 2017 года — учитель математики, в 2025-м окончил магистратуру по компьютерной инженерии. Преподаю в школе и параллельно создаю программы для школы — от идеи до использования, вместе с AI-инструментами.',
      timelineTitle: 'Путь',
      timeline: [
        { years: '2023–2025', title: 'Магистратура · Компьютерная инженерия', place: 'Азербайджанский технологический университет' },
        { years: '2017 — сейчас', title: 'Учитель математики', place: 'Школа № 6 г. Тертер' },
        { years: '2012–2017', title: 'Бакалавриат · Учитель математики', place: 'Азербайджанский государственный педагогический университет' },
        { years: '2003–2007', title: 'Бакалавриат с отличием · Энергетика', place: 'Азербайджанский государственный университет нефти и промышленности' },
      ],
    },
    contact: {
      title: 'Создадим что-нибудь вместе?',
      text: 'Нужен цифровой инструмент для школы или курсов — напишите, обсудим.',
      email: 'Написать на почту',
      whatsapp: 'WhatsApp',
      call: 'Позвонить',
    },
    footer: 'Все права защищены.',
  },
  en: {
    nav: { projects: 'Projects', approach: 'Approach', stack: 'Stack', about: 'About', contact: 'Contact' },
    menu: 'Menu',
    theme: 'Toggle theme',
    hero: {
      badge: 'Math teacher · Tartar, Azerbaijan',
      title: 'I think like a teacher and build like a developer.',
      text: 'I build digital tools that actually work in schools: a gradebook and exams, phone-made tests, paper answer-sheet checking, a school website. Every one is tested in a real classroom.',
      cta: 'View projects',
      contact: 'Get in touch',
      chips: ['AZ · RU · EN', 'Works offline', 'QR & OCR'],
    },
    stats: ['years of teaching', 'live projects', 'interface languages', 'cloud automation'],
    projects: {
      title: 'Live projects',
      lead: 'All of them are running and used by teachers and students every day.',
      open: 'Open',
      live: 'Live',
      archive: 'Earlier projects',
      archiveLead: 'The first platforms I learned on.',
    },
    projectText: {
      muellim: {
        desc: 'One platform for the whole school: teachers, students, parents and administration.',
        points: ['Gradebook, attendance, exams and reports', 'Automatic QR-based checking of paper answer sheets', 'Parent reports and a nightly automatic audit'],
      },
      sts: {
        desc: 'Tests by phone: photograph a question from the book — the test is ready.',
        points: ['In-app camera, auto-crop, text recognition (OCR)', 'QR answer sheets, online tests by link', 'Installs on a phone and works offline'],
      },
      yttm: {
        desc: 'The official website of School No. 6 in Tartar (YTTM project).',
        points: ['News updates automatically', 'Student and teacher sign-in', 'Responsive, in three languages'],
      },
    },
    archiveNames: ['Timetable builder', 'Tutoring platform', 'Lesson planning for teachers'],
    approach: {
      title: 'How I work',
      lead: 'I use my own software every day — so every detail is designed for the classroom.',
      items: [
        { title: "Through a teacher's eyes", text: 'One main action, ≤ 3 steps, clear labels. No training needed.' },
        { title: 'Works offline', text: 'Installs on a phone, works without a network and syncs later.' },
        { title: 'Three languages', text: 'Azerbaijani, Russian and English — the whole interface is translated.' },
        { title: 'Reliable and secure', text: 'Student data is protected, daily backups, automatic checks.' },
      ],
    },
    stack: { title: 'Stack', lead: 'Modern, fast and free/low-cost cloud solutions.', groups: ['Frontend', 'Backend', 'Cloud', 'Tools'] },
    about: {
      title: 'About me',
      text: "By training I'm an energy engineer; since 2017 I've been a math teacher, and in 2025 I completed a master's in computer engineering. I teach at school and build software for schools on the side — from idea to daily use, together with AI tools.",
      timelineTitle: 'Path',
      timeline: [
        { years: '2023–2025', title: "Master's · Computer engineering", place: 'Azerbaijan Technological University' },
        { years: '2017 — now', title: 'Math teacher', place: 'School No. 6, Tartar' },
        { years: '2012–2017', title: "Bachelor's · Mathematics teaching", place: 'Azerbaijan State Pedagogical University' },
        { years: '2003–2007', title: "Bachelor's with honors · Power engineering", place: 'Azerbaijan State Oil and Industry University' },
      ],
    },
    contact: {
      title: 'Shall we build something together?',
      text: 'Need a digital tool for your school or course? Write to me and let’s talk.',
      email: 'Send an email',
      whatsapp: 'WhatsApp',
      call: 'Call',
    },
    footer: 'All rights reserved.',
  },
}
