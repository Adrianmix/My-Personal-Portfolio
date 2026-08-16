export type Lang = 'en' | 'fa';

export const content = {
  en: {
    dir: 'ltr' as const,
    htmlLang: 'en',
    meta: {
      title: 'Mohammad Pouhassani — Designer & Developer',
      description:
        'I design and build websites, and craft visual identity work in Photoshop and Illustrator. Available for freelance and part time projects.',
    },
    header: {
      wordmark: 'Mohammad Pouhassani',
      nav: [
        { label: 'Work', href: '#work' },
        { label: 'About', href: '#about' },
        { label: 'Services', href: '#services' },
        { label: 'Contact', href: '#contact' },
      ],
      available: 'Available for projects',
      menu: 'Menu',
      langSwitch: { label: 'فارسی', href: '/fa' },
    },
    theme: {
      label: 'Theme',
      light: 'Light',
      dark: 'Dark',
      auto: 'Auto',
    },
    hero: {
      eyebrow: 'My Personal Portfolio Web Page — 2026',
      titleLines: ['I design clean, fast,', 'and conversion-focused', 'interfaces.'],
      lastLineItalic: true,
      body: "Mohammad — a designer-developer who takes a project from a blank Illustrator canvas to a shipped, live website. Based wherever, working with clients everywhere.",
      ctaPrimary: 'See the work',
      ctaSecondary: 'Start a project',
      roles: [
        'Web Design',
        'Front-End Dev',
        'Static Sites',
        'Brand Identity',
        'Illustrator Work',
        'Photoshop Compositing',
        'UI / UX',
      ],
    },
    about: {
      eyebrow: 'About',
      portraitCaption: 'Portrait — swap in a real photo',
      lead: "I've spent the last few years moving between two sides of the screen: one with a design file open, one with a code editor. This site is where both halves meet.",
      body: 'I’m Mohammad Pouhassani, a 28-year-old digital designer and front-end developer based in Tehran.I was born on June 24th, 1997, in Shirvan, North Khorasan Province, Iran. My background in software engineering and my passion for design allow me to bridge the gap between visual thinking and technical execution.I focus on building clean, fast, and user-centered digital experiences. My work often involves designing and developing landing pages, dashboards, and interface systems where clarity, performance, and attention to detail matter.',
      facts: [
        { label: 'Focus', value: 'Web design & front-end build' },
        { label: 'Also', value: 'Brand & visual design' },
        { label: 'Tools', value: 'Corel, Illustrator, Photoshop, Astro, React, Wordpress' },
        { label: 'Based in', value: 'Tehran, Iran' },
      ],
    },
    work: {
      eyebrow: 'Selected Work',
      title: 'Sites & visuals',
      intro: 'A mix of live websites and Photoshop / Illustrator design work. Filter by type, or browse everything.',
      filters: [
        { label: 'All', value: 'all' },
        { label: 'Websites', value: 'web' },
        { label: 'Visual Design', value: 'visual' },
      ],
      webPreviewLabel: 'Live demo preview',
      visualPreviewLabel: 'Artwork preview',
      webTag: 'Web',
      visualTag: 'Visual',
      liveDemo: 'Live demo',
      caseStudy: 'Case study',
      projects: [
        {
          title: 'Local Network Connection',
          description: 'This app can be installed on xampp server and works like a local Hub.',
          type: 'app' as const,
          tags: ['React.js', 'Next.js', 'Php'],
          liveUrl: '#',
          caseStudyUrl: '#',
        },
        {
          title: 'Landing page for Spico.ir/DAB',
          description: 'A landing page designed for Dab brand.',
          type: 'web' as const,
          tags: ['Wordpress', 'Elementor'],
          liveUrl: 'https://spico.ir/%d9%86%d9%85%d8%a7%db%8c%d9%86%d8%af%da%af%db%8c-%d8%a7%d9%86%d8%ad%d8%b5%d8%a7%d8%b1%db%8c-%d8%af%d8%a7%d8%a8-%d8%a7%db%8c%d8%aa%d8%a7%d9%84%db%8c%d8%a7/',
        },
        {
          title: 'Redesigning as a Hubby',
          description: 'The main website uses old 3 column layout so i offerd an new design for sleek and fast browsing',
          type: 'visual' as const,
          tags: ['Astro.js', 'React.js', 'Figma'],
          liveUrl:'https://spico-astro.vercel.app/',
          caseStudyUrl: 'https://equal-vote-88802059.figma.site/'
        },
        {
          title: 'Product Catalog Design',
          description: 'A new Product named "All Cutter", of spico industry needed a catalog.',
          type: 'visual' as const,
          tags: ['Photoshop'],
        },
        {
          title: 'Product Information design for Plate Laser Printing ',
          description: 'Used CorelDraw to Create Info Plates for all Products of Spico',
          type: 'visual' as const,
          tags: ['CorelDraw'],
        },
        {
          title: 'Logo Design',
          description: 'Logos Designed for websites',
          type: 'visual' as const,
          tags: ['Photoshop', 'Illustrator'],
        },
      ],
    },
    services: {
      eyebrow: 'What I do',
      title: 'How I can help',
      items: [
        {
          name: 'Web Design & Development',
          detail: 'Static sites, portfolios, blogs, and small product sites — designed and built end to end, from Figma to a live Astro, React or Wordpress site.',
        },
        {
          name: 'Brand & Visual Design',
          detail: 'Logos, identity systems, Catalogs and key art built in Illustrator and Photoshop for launches, campaigns, and print.',
        },
        {
          name: 'Design + Dev Bundles',
          detail: 'For projects that need both a visual identity and a website — one point of contact, one consistent look.',
        },
      ],
    },
    contact: {
      eyebrow: 'Get in touch',
      titleLines: ["Let's make", 'something.'],
      email: 'm.pouhassani@hotmail.com',
      socials: [
        { label: 'GitLab', href: 'https://gitlab.com/Adrianmix/' },
        { label: 'GitHub', href: 'https://github.com/Adrianmix' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mohammad-pouhassani/' },
      ],
    },
    footer: {
      name: 'Mohammad Pouhassani',
      backToTop: 'Back to top',
    },
  },
  fa: {
    dir: 'rtl' as const,
    htmlLang: 'fa',
    meta: {
      title: 'محمد پوحسنی  — طراح و توسعه‌دهنده',
      description:
        'من به عنوان طراح و توسعه‌دهنده وب فعالیت می‌کنم و در کنار آن، هویت بصری برندها را با استفاده از نرم‌افزارهای فتوشاپ و ایلوستریتور خلق می‌کنم. همچنین برای انجام پروژه‌های فریلنسری و پاره وقت، آماده همکاری هستم.',
    },
    header: {
      wordmark: 'محمد پوحسنی',
      nav: [
        { label: 'نمونه‌کارها', href: '#work' },
        { label: 'درباره من', href: '#about' },
        { label: 'خدمات', href: '#services' },
        { label: 'تماس', href: '#contact' },
      ],
      available: 'آماده همکاری در پروژه‌ها',
      menu: 'منو',
      langSwitch: { label: 'English', href: '/' },
    },
    theme: {
      label: 'تم',
      light: 'روشن',
      dark: 'تیره',
      auto: 'خودکار',
    },
    hero: {
      eyebrow: 'نمونه‌کار — ۲۰۲۶',
      titleLines: ['من رابط‌هایی تمیز، سریع', 'و کاملا ریسپانسیو', 'طراحی میکنم.'],
      
      lastLineItalic: false,
      body: 'من محمد پوحسنی هستم، طراح دیجیتال و توسعه‌دهندهٔ فرانت‌اند، ۲۸ ساله و ساکن تهران، تیرماه ۱۳۷۶ در شیروان، استان خراسان شمالی به دنیا آمدم.تحصیلات من در رشتهٔ مهندسی نرم‌افزار، همراه با علاقه‌ام به طراحی، باعث شده که بتوانم پل ارتباطی میان تفکر بصری و پیاده‌سازی فنی را کوتاه تر کنم.تمرکز من بر خلق تجربه‌های دیجیتالِ تمیز، سریع و کاربرمحور است. بیشتر کارهایم شامل طراحی و توسعهٔ صفحه‌های فرود، داشبوردها و سیستم‌های رابط کاربری می‌شود؛ جاهایی که وضوح، کارایی و دقت در جزئیات حرف اول را می‌زنند.',
      ctaPrimary: 'دیدن نمونه‌کارها',
      ctaSecondary: 'شروع یک پروژه',
      roles: [
        'طراحی وب',
        'توسعه فرانت‌اند',
        'هویت بصری برند',
        'کار با ایلوستریتور',
        'ترکیب‌بندی در فتوشاپ',
        'رابط و تجربه کاربری',
      ],
    },
    about: {
      eyebrow: 'درباره من',
      portraitCaption: 'تصویر پرتره — با یک عکس واقعی جایگزین کنید',
      lead: 'چند سال اخیر را بین دو صفحه‌نمایش گذرانده‌ام: یکی با فایل طراحی باز، دیگری با ویرایشگر کد. این سایت جایی‌ست که این دو نیمه به هم می‌رسند.',
      body: 'اینجا یک بیوگرافی واقعی و مشخص بنویسید — چگونه شروع کردید، به چه نوع کاری گرایش دارید، و مشتری از همکاری با شما چه انتظاری باید داشته باشد. لحن را محاوره‌ای نگه دارید، نه شبیه رزومه.',
      facts: [
        { label: 'تمرکز', value: 'طراحی وب و توسعه فرانت‌اند' },
        { label: 'همچنین', value: 'طراحی برند و بصری' },
        { label: 'ابزارها', value: 'فیگما، ایلوستریتور، فتوشاپ، استرو' },
        { label: 'مستقر در', value: 'شهر شما، کشور' },
      ],
    },
    work: {
      eyebrow: 'نمونه‌کارهای منتخب',
      title: 'سایت‌ها و آثار بصری',
      intro: 'ترکیبی از وب‌سایت‌های زنده و آثار طراحی در فتوشاپ و ایلوستریتور. بر اساس نوع فیلتر کنید یا همه را ببینید.',
      filters: [
        { label: 'همه', value: 'all' },
        { label: 'وب‌سایت‌ها', value: 'web' },
        { label: 'طراحی بصری', value: 'visual' },
      ],
      webPreviewLabel: 'پیش‌نمایش دمو زنده',
      visualPreviewLabel: 'پیش‌نمایش اثر',
      webTag: 'وب',
      visualTag: 'بصری',
      liveDemo: 'دمو زنده',
      caseStudy: 'مطالعه موردی',
      projects: [
        {
          title: 'پروژه یک',
          description: 'یک توضیح کوتاه درباره این سایت و اینکه برای چه کسی ساخته شده.',
          type: 'web' as const,
          tags: ['استرو', 'فروشگاهی'],
          liveUrl: '#',
          caseStudyUrl: '#',
        },
        {
          title: 'پروژه دو',
          description: 'یک توضیح کوتاه درباره این سایت و اینکه برای چه کسی ساخته شده.',
          type: 'web' as const,
          tags: ['نکست‌جی‌اس', 'سرویس ابری'],
          liveUrl: '#',
        },
        {
          title: 'مفهوم برند یک',
          description: 'یک توضیح کوتاه درباره سیستم هویت بصری و جایی که استفاده شد.',
          type: 'visual' as const,
          tags: ['ایلوستریتور', 'برندینگ'],
          caseStudyUrl: '#',
        },
        {
          title: 'مجموعه پوستر',
          description: 'یک توضیح کوتاه درباره این مجموعه و تکنیک استفاده‌شده.',
          type: 'visual' as const,
          tags: ['فتوشاپ', 'چاپ'],
        },
        {
          title: 'پروژه سه',
          description: 'یک توضیح کوتاه درباره این سایت و اینکه برای چه کسی ساخته شده.',
          type: 'web' as const,
          tags: ['استرو', 'نمونه‌کار'],
          liveUrl: '#',
        },
        {
          title: 'اثر کلیدی',
          description: 'یک توضیح کوتاه درباره مفهوم اثر و جایی که استفاده شد.',
          type: 'visual' as const,
          tags: ['فتوشاپ', 'ترکیب‌بندی'],
        },
      ],
    },
    services: {
      eyebrow: 'چه کاری انجام می‌دهم',
      title: 'چطور می‌توانم کمک کنم',
      items: [
        {
          name: 'طراحی و توسعه وب',
          detail: 'سایت‌های تبلیغاتی، نمونه‌کار، و محصولات کوچک — طراحی و ساخت کامل، از فیگما تا یک سایت زنده با استرو یا ری‌اکت.',
        },
        {
          name: 'طراحی برند و بصری',
          detail: 'لوگو، سیستم هویت بصری، و آثار کلیدی ساخته‌شده در ایلوستریتور و فتوشاپ برای لانچ، کمپین و چاپ.',
        },
        {
          name: 'بسته‌های طراحی + توسعه',
          detail: 'برای پروژه‌هایی که هم به هویت بصری و هم به وب‌سایت نیاز دارند — یک نقطه تماس، یک ظاهر یکپارچه.',
        },
      ],
    },
    contact: {
      eyebrow: 'در تماس باشید',
      titleLines: ['بیایید چیزی', 'بسازیم.'],
      email: 'hello@yourname.com',
      socials: [
        { label: 'دریبل', href: '#' },
        { label: 'بیهنس', href: '#' },
        { label: 'گیت‌هاب', href: '#' },
        { label: 'لینکدین', href: '#' },
      ],
    },
    footer: {
      name: 'نام شما',
      backToTop: 'بازگشت به بالا',
    },
  },
} satisfies Record<Lang, unknown>;

export type SiteContent = typeof content['en'];
