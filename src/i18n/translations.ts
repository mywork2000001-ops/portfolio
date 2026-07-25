export type Lang = 'ru' | 'en' | 'az'

export const languageNames: Record<Lang, string> = {
  ru: 'RU',
  en: 'EN',
  az: 'AZ',
}

export interface Translation {
  nav: {
    home: string
    about: string
    portfolio: string
    skills: string
    services: string
    blog: string
    contacts: string
  }
  downloadCV: string
  contactMe: string
  openMenu: string
  toggleTheme: string
  hero: {
    greeting: string
    role: string
    description: string
    viewWork: string
    aboutMe: string
  }
  statsLabels: [string, string, string, string]
  projectsSection: {
    title: string
    viewAll: string
  }
  projectDescriptions: [string, string, string, string, string]
  skillsTitle: string
  servicesTitle: string
  services: { title: string; description: string }[]
  blogTitle: string
  blogText: string
  about: {
    title: string
    familyMan: string
    text: string
    moreLink: string
  }
  educationTitle: string
  education: { institution: string; degree: string }[]
  testimonial: {
    quote: string
    name: string
    role: string
  }
  footerLocation: string
}

export const translations: Record<Lang, Translation> = {
  ru: {
    nav: {
      home: 'Главная',
      about: 'Обо мне',
      portfolio: 'Портфолио',
      skills: 'Навыки',
      services: 'Услуги',
      blog: 'Блог',
      contacts: 'Контакты',
    },
    downloadCV: 'Скачать CV',
    contactMe: 'Связаться со мной',
    openMenu: 'Открыть меню',
    toggleTheme: 'Переключить тему',
    hero: {
      greeting: 'Привет, я',
      role: 'Fullstack разработчик · Учитель математики и физики',
      description:
        'Создаю современные веб-приложения и образовательные платформы с акцентом на чистый код, удобство пользователя и высокую производительность.',
      viewWork: 'Смотреть работы',
      aboutMe: 'Обо мне',
    },
    statsLabels: ['Лет преподавания', 'Проектов', 'Клиентов', 'Довольных клиентов'],
    projectsSection: {
      title: 'Избранные проекты',
      viewAll: 'Все проекты →',
    },
    projectDescriptions: [
      'Цифровая образовательная экосистема для школы: курсы, живые уроки, тесты, учёт успеваемости и общение учителя, ученика и родителя в одном приложении',
      'Конструктор школьных расписаний с автоматическим планировщиком, мульти-тенантной архитектурой и desktop-версией на Electron',
      'Единая платформа для учителя: AI-генерация ежедневных планов уроков, электронный журнал успеваемости, учёт посещаемости и годовое тематическое планирование по учебным стандартам',
      'Платформа для репетиторов и учебных центров: группы, тесты, видеоуроки, оплата и чат с полной изоляцией данных между учителями',
      'Интеллектуальная операционная система семьи: финансы, покупки, задачи, календарь, цели и AI-секретарь в одном приложении',
    ],
    skillsTitle: 'Мои навыки',
    servicesTitle: 'Что я делаю',
    services: [
      { title: 'Веб-разработка', description: 'Создание современных и адаптивных веб-приложений' },
      { title: 'Backend разработка', description: 'Разработка надёжных API и серверной логики' },
      { title: 'UI/UX дизайн', description: 'Проектирование удобных интерфейсов и пользовательского опыта' },
      { title: 'Оптимизация', description: 'Повышение производительности и SEO для быстрых результатов' },
    ],
    blogTitle: 'Блог',
    blogText: 'Скоро здесь появятся статьи о веб-разработке, архитектуре и инструментах.',
    about: {
      title: 'Немного обо мне',
      familyMan: 'Семьянин',
      text:
        'По образованию инженер-энергетик, с 2017 года — учитель математики, а в 2025-м получил магистратуру по компьютерной инженерии. Преподаю математику в школе, есть опыт репетиторства по физике, а разработкой занимаюсь параллельно — от идеи до продакшена, в связке с AI-инструментами прямо в VS Code. Люблю решать сложные задачи и воплощать идеи в реальность.',
      moreLink: 'Подробнее обо мне',
    },
    educationTitle: 'Образование',
    education: [
      { institution: 'Азербайджанский государственный педагогический университет', degree: 'Бакалавриат · Учитель математики' },
      { institution: 'Азербайджанский государственный университет нефти и промышленности', degree: 'Бакалавриат с отличием · Энергетика и энергетическое машиностроение' },
      { institution: 'Азербайджанский технологический университет', degree: 'Магистратура · Компьютерная инженерия' },
    ],
    testimonial: {
      quote: 'Ферид — отличный специалист! Работать с ним одно удовольствие.',
      name: 'Алексей Иванов',
      role: 'CEO, TechCorp',
    },
    footerLocation: 'Баку, Азербайджан',
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      portfolio: 'Portfolio',
      skills: 'Skills',
      services: 'Services',
      blog: 'Blog',
      contacts: 'Contact',
    },
    downloadCV: 'Download CV',
    contactMe: 'Contact me',
    openMenu: 'Open menu',
    toggleTheme: 'Toggle theme',
    hero: {
      greeting: "Hi, I'm",
      role: 'Fullstack developer · Math & physics teacher',
      description:
        'I build modern web applications and educational platforms, focused on clean code, great UX and high performance.',
      viewWork: 'View projects',
      aboutMe: 'About me',
    },
    statsLabels: ['Years teaching', 'Projects', 'Clients', 'Client satisfaction'],
    projectsSection: {
      title: 'Featured projects',
      viewAll: 'All projects →',
    },
    projectDescriptions: [
      'A digital education ecosystem for schools: courses, live lessons, tests, progress tracking, and communication between teachers, students and parents — all in one app',
      'A school timetable builder with an automatic scheduler, multi-tenant architecture and an Electron desktop version',
      'A unified platform for teachers: AI-generated daily lesson plans, a digital grade journal, attendance tracking and yearly thematic planning based on curriculum standards',
      'A platform for tutors and learning centers: groups, tests, video lessons, payments and chat, with full data isolation between teachers',
      'An intelligent family operating system: finances, shopping, tasks, calendar, goals and an AI assistant — all in one app',
    ],
    skillsTitle: 'My skills',
    servicesTitle: 'What I do',
    services: [
      { title: 'Web development', description: 'Building modern, responsive web applications' },
      { title: 'Backend development', description: 'Building reliable APIs and server-side logic' },
      { title: 'UI/UX design', description: 'Designing intuitive interfaces and user experiences' },
      { title: 'Optimization', description: 'Improving performance and SEO for fast results' },
    ],
    blogTitle: 'Blog',
    blogText: 'Articles on web development, architecture and tooling are coming soon.',
    about: {
      title: 'A bit about me',
      familyMan: 'Family man',
      text:
        "By training I'm an energy engineer; since 2017 I've been teaching math, and in 2025 I completed a master's in computer engineering. I teach math at school, have tutoring experience in physics, and build software on the side — from idea to production, working with AI tools right inside VS Code. I love solving hard problems and turning ideas into reality.",
      moreLink: 'More about me',
    },
    educationTitle: 'Education',
    education: [
      { institution: 'Azerbaijan State Pedagogical University', degree: "Bachelor's · Mathematics teaching" },
      { institution: 'Azerbaijan State Oil and Industry University', degree: "Bachelor's with honors · Power engineering & energy machinery" },
      { institution: 'Azerbaijan Technology University', degree: "Master's · Computer engineering" },
    ],
    testimonial: {
      quote: "Ferid is a great specialist! It's a pleasure to work with him.",
      name: 'Aleksey Ivanov',
      role: 'CEO, TechCorp',
    },
    footerLocation: 'Baku, Azerbaijan',
  },
  az: {
    nav: {
      home: 'Ana səhifə',
      about: 'Haqqımda',
      portfolio: 'Portfolio',
      skills: 'Bacarıqlar',
      services: 'Xidmətlər',
      blog: 'Blog',
      contacts: 'Əlaqə',
    },
    downloadCV: 'CV-ni yüklə',
    contactMe: 'Mənimlə əlaqə saxla',
    openMenu: 'Menyunu aç',
    toggleTheme: 'Mövzunu dəyiş',
    hero: {
      greeting: 'Salam, mən',
      role: 'Fullstack developer · Riyaziyyat və fizika müəllimi',
      description:
        'Təmiz koda, rahat istifadəçi təcrübəsinə və yüksək performansa önəm verərək müasir veb-tətbiqlər və təhsil platformaları hazırlayıram.',
      viewWork: 'Layihələrə bax',
      aboutMe: 'Haqqımda',
    },
    statsLabels: ['Tədris ili', 'Layihə', 'Müştəri', 'Məmnun müştəri'],
    projectsSection: {
      title: 'Seçilmiş layihələr',
      viewAll: 'Bütün layihələr →',
    },
    projectDescriptions: [
      'Məktəb üçün rəqəmsal təhsil ekosistemi: kurslar, canlı dərslər, testlər, akademik nəticələrin izlənməsi və müəllim-şagird-valideyn ünsiyyəti bir tətbiqdə',
      'Avtomatik planlaşdırıcı, çox-tenantlı arxitektura və Electron əsaslı masaüstü versiyası olan məktəb dərs cədvəli konstruktoru',
      'Müəllim üçün vahid platforma: gündəlik dərs planlarının AI ilə generasiyası, elektron jurnal, davamiyyət uçotu və tədris standartlarına əsaslanan illik tematik planlaşdırma',
      'Repetitorlar və tədris mərkəzləri üçün platforma: qruplar, testlər, video dərslər, ödəniş və çat — müəllimlər arasında tam məlumat izolyasiyası ilə',
      'Ailənin intellektual əməliyyat sistemi: maliyyə, alış-veriş, tapşırıqlar, təqvim, məqsədlər və AI-katib bir tətbiqdə',
    ],
    skillsTitle: 'Bacarıqlarım',
    servicesTitle: 'Nə edirəm',
    services: [
      { title: 'Veb-proqramlaşdırma', description: 'Müasir və adaptiv veb-tətbiqlərin hazırlanması' },
      { title: 'Backend proqramlaşdırma', description: 'Etibarlı API-lar və server məntiqinin hazırlanması' },
      { title: 'UI/UX dizayn', description: 'Rahat interfeys və istifadəçi təcrübəsinin dizaynı' },
      { title: 'Optimallaşdırma', description: 'Sürətli nəticələr üçün performans və SEO-nun yaxşılaşdırılması' },
    ],
    blogTitle: 'Blog',
    blogText: 'Tezliklə burada veb-proqramlaşdırma, arxitektura və alətlər haqqında məqalələr yerləşdiriləcək.',
    about: {
      title: 'Mənim haqqımda qısaca',
      familyMan: 'Ailəli',
      text:
        'Təhsilimə görə enerji mühəndisiyəm, 2017-ci ildən riyaziyyat müəllimiyəm, 2025-ci ildə isə kompüter mühəndisliyi üzrə magistratura pilləsini bitirmişəm. Məktəbdə riyaziyyat tədris edirəm, fizika üzrə repetitorluq təcrübəm var, paralel olaraq isə proqram təminatı hazırlayıram — VS Code daxilində AI alətləri ilə ideyadan məhsula qədər. Mürəkkəb məsələləri həll etməyi və ideyaları reallığa çevirməyi sevirəm.',
      moreLink: 'Daha ətraflı',
    },
    educationTitle: 'Təhsil',
    education: [
      { institution: 'Azərbaycan Dövlət Pedaqoji Universiteti', degree: 'Bakalavriat · Riyaziyyat müəllimliyi' },
      { institution: 'Azərbaycan Dövlət Neft və Sənaye Universiteti', degree: 'Fərqlənmə diplomu ilə bakalavriat · Energetika və enerji maşınqayırması' },
      { institution: 'Azərbaycan Texnologiya Universiteti', degree: 'Magistratura · Kompüter mühəndisliyi' },
    ],
    testimonial: {
      quote: 'Fərid əla mütəxəssisdir! Onunla işləmək əsl zövqdür.',
      name: 'Aleksey İvanov',
      role: 'CEO, TechCorp',
    },
    footerLocation: 'Bakı, Azərbaycan',
  },
}
