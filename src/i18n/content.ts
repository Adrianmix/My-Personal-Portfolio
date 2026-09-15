export type Lang = 'en' | 'fa';

export const content = {
  en: {
    dir: 'ltr' as const,
    htmlLang: 'en',
    meta: {
      title: 'Mohammad Pouhassani — Designer & Developer',
      description:
        'Web designer and developer focused on building modern, responsive websites. Available for freelance and part-time projects.',
    },
    header: {
      wordmark: 'Mohammad Pouhassani',
      nav: [
        { label: 'About', href: '#about' },
        { label: 'Work', href: '#work' },
        { label: 'Services', href: '#services' },
        { label: 'Contact', href: '#contact' },
      ],
      available: 'Available for freelance and part-time projects',
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
      eyebrow: 'Latest Portfolio Update — 2026',
      titleLines: ['I design clean, fast,', 'and fully responsive', 'interfaces.'],
      lastLineItalic: false,
      body: 'High-performance websites for modern businesses and startups. My main expertise is in building fast, responsive static websites with Astro.js and custom, long-term maintainable WordPress sites using tools like Elementor.',
      ctaPrimary: 'See the work',
      ctaSecondary: 'Start a project',
      roles: [
        'Web Design',
        'Front-End Dev',
        'Brand Identity',
        'Illustrator & Corel',
        'Photoshop Design',
        'UI / UX',
      ],
    },
    about: {
      eyebrow: 'About',
      portraitCaption: 'It all started with a simple hello world.',
      lead: "I've spent the last few years moving between two windows: one with a code editor open, one with design files. Everything has been done just to move forward.",
      body: "I was born in July 1997 in North Khorasan Province, Iran. In school and university, my passion for technology led me to choose software engineering, which is how I got introduced to the world of the web and decided to focus on web design and development. I mostly work on landing pages and clean, fast, user-centered interfaces, and attention to detail matters to me.",
      facts: [
        { label: 'Focus', value: 'Web Design & Front-end Development' },
        { label: 'Also', value: 'Logo Design, Visual Identity, Laser Print Design, AI Prompt Engineering' },
        { label: 'Tools & environments', value: 'vscode, react.js, astro.js, typescript, supabase, vercel, wordpress, adobe photoshop/illustrator, corel draw' },
        { label: 'Based in', value: 'Tehran, Iran' },
      ],
    },
    work: {
      eyebrow: 'Selected Work',
      title: 'Sites & visuals',
      intro: 'New work is added here periodically.',
      filters: [
        { label: 'All', value: 'all' },
        { label: 'Websites', value: 'web' },
        { label: 'Visual Design', value: 'visual' },
      ],
      webPreviewLabel: 'Live demo preview',
      visualPreviewLabel: 'Artwork preview',
      webTag: 'Web',
      visualTag: 'Visual',
      appTag: 'App',
      liveDemo: 'Live demo',
      caseStudy: 'Case study',
      viewLabel: 'View',
      modal: {
        tools: 'Languages & tools',
        screenshots: 'Screenshots',
        noScreenshots: 'No screenshots yet.',
        github: 'GitHub',
        close: 'Close',
      },
      projects: [
        {
          title: 'Local Network Connection',
          description: 'A local hub that runs on a server and makes messaging and file transfer between systems easy.',
          type: 'app' as const,
          tags: ['react.js', 'HTML,CSS', 'Vite.js'],
          liveUrl: 'https://mpouhassaniir.vercel.app/',
          githubUrl: 'https://github.com/Adrianmix/local-hub',
          image: '/images/local-hub-demo.jpg',
          screenshots: ['/images/Projects/Local-Network/1.png', '/images/Projects/Local-Network/2.png'],
          fullDescription:
            'A secure, high-speed file-sharing and instant-messaging app for local area networks (LAN), specifically optimized for office rooms and private communications.\n\nFeatures: public and private file sharing, messaging environment, admin panel, public announcements, message notifications, bilingual (Persian and English).',
        },
        {
          title: 'QR Code Studio',
          description: 'QR code generator with extensive customization options.',
          type: 'app' as const,
          tags: ['react.js', 'TypeScript', 'Vite.js', 'Tailwind CSS'],
          liveUrl: 'https://qr-studio-mu-five.vercel.app/',
          githubUrl: 'https://github.com/Adrianmix/Qr-Studio',
          image: '/images/Projects/Qr-Studio/1.png',
          screenshots: ['/images/Projects/Qr-Studio/1.png', '/images/Projects/Qr-Studio/2.png', '/images/Projects/Qr-Studio/3.png', '/images/Projects/Qr-Studio/4.png'],
          fullDescription:
            'A QR code generator and customizer built with React, Vite, TypeScript, and the qrcode library. This tool lets you generate customized QR codes for URLs, text, Wi-Fi, vCards, email, SMS, WhatsApp, social media profiles, and crypto addresses, then customize colors, patterns, frames, and logos, and export the result as SVG, PNG, or PDF.',
        },
        {
          title: 'Landing page for mentraic.com',
          description: 'Landing page design for an AI-focused website using Elementor.',
          type: 'web' as const,
          tags: ['Wordpress', 'Elementor'],
          liveUrl: 'https://mentraic.com/',
          image: '/images/Projects/mentraic/1.png',
          screenshots: ['/images/Projects/mentraic/1.png', '/images/Projects/mentraic/2.png', '/images/Projects/mentraic/3.png', '/images/Projects/mentraic/4.png'],
          fullDescription:
            'Landing page design for Mentraic (AI tools), built using the Elementor page builder in WordPress.\n\nThe logo for this site was also designed in Adobe Illustrator.',
        },
        {
          title: 'Landing page for DAB products on Spico',
          description: 'Landing and promotional page design for the Spico website using Elementor.',
          type: 'web' as const,
          tags: ['Wordpress', 'Elementor'],
          liveUrl: 'https://spico.ir/%d9%86%d9%85%d8%a7%db%8c%d9%86%d8%af%da%af%db%8c-%d8%a7%d9%86%d8%ad%d8%b5%d8%a7%d8%b1%db%8c-%d8%af%d8%a7%d8%a8-%d8%a7%db%8c%d8%aa%d8%a7%d9%84%db%8c%d8%a7/',
          image: '/images/Projects/spico-dab/1.png',
          screenshots: ['/images/Projects/spico-dab/1.png','/images/Projects/spico-dab/2.png','/images/Projects/spico-dab/3.png','/images/Projects/spico-dab/4.png'],
          fullDescription:
            'A landing page introducing DAB Italia services and products on the Spico website, designed with Elementor in WordPress.',
        },
        {
          title: 'Spico website redesign',
          description: 'Creating a website design prototype for Spico in Figma.',
          type: 'visual' as const,
          tags: ['Figma'],
          liveUrl: 'https://equal-vote-88802059.figma.site/',
          image: '/images/Projects/spico-figma/1.jpg',
          screenshots: ['/images/Projects/spico-figma/1.jpg','/images/Projects/spico-figma/2.jpg','/images/Projects/spico-figma/3.jpg','/images/Projects/spico-figma/4.jpg'],
          fullDescription:
            'The original Spico website used an old three-column layout that was considered outdated in terms of technology, optimization, and readability.\n\nTo update the site and prepare it for a coded redesign, a prototype was created in Figma before development.',
        },
        {
          title: 'Spico website built with Astro.js',
          description: 'Designing and coding the Spico website with a new, optimized design.',
          type: 'web' as const,
          tags: ['Astro,js', 'React.js', 'TypeScript', 'Supabase'],
          liveUrl: 'https://spico-astro.vercel.app',
          githubUrl: 'https://gitlab.com/Adrianmix/spico-astro',
          image: '/images/Projects/spico-astro/1.png',
          screenshots: ['/images/Projects/spico-astro/1.png','/images/Projects/spico-astro/2.png','/images/Projects/spico-astro/3.png','/images/Projects/spico-astro/4.png'],
          fullDescription:
            'This project is the official website of Saadi Pump Industries (SPICO), built with Astro + React, connected to Supabase (database, authentication, storage), and ready for deployment.\n\nThe site includes a public storefront, product catalog, agency and project sections, contact/partnership/warranty forms, and an admin panel for managing content and submissions.',
        },
      ],
    },
    services: {
      eyebrow: 'What I do',
      title: 'How I can help',
      items: [
        {
          name: 'Web Design & Development',
          detail: 'Landing pages, portfolios, and small product sites — designed and built end to end, from Figma to a live site with Astro or React.',
        },
        {
          name: 'Brand & Visual Design',
          detail: 'Logos, identity systems, and key art built in Illustrator and Photoshop for launches, campaigns, and print.',
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
      email: 'm.pouhassani@gmail.com',
      socials: [
        { label: 'GitHub', href: 'https://github.com/Adrianmix' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mohammad-pouhassani/' },
      ],
    },
    footer: {
      name: 'adrianmix created this',
      backToTop: 'Back to top',
    },
  },
  fa: {
    dir: 'rtl' as const,
    htmlLang: 'fa',
    meta: {
      title: 'محمد پوحسنی  — طراح و توسعه‌دهنده',
      description:
        'طراح و توسعه‌دهنده وب با تمرکز بر ساخت سایت‌های مدرن و واکنش‌گرا. پذیرای پروژه‌های فریلنسری و پاره‌وقت هستم.',
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
      eyebrow: 'آخرین آپدیت پرتفولیو - 1405',
      titleLines: ['من رابط‌هایی تمیز، سریع', 'و کاملا ریسپانسیو', 'طراحی میکنم.'],
      lastLineItalic: false,
      body: 'طراحی سایت هایی با پرفرمنس بالا برای کسب و کار های مدرن و استارتآپ ها. تخصص اصلی من در طراحی وب سایت های استاتیک سریع و ریسپانسیو با استفاده از Astro.js و وب سایت های سفارشی وردپرس با استفاده از ابزار هایی مانند Elementor گه قابلیت نگهداری طولانی مدت را دارند خلاصه میشود.',
      ctaPrimary: 'دیدن نمونه‌کارها',
      ctaSecondary: 'شروع یک پروژه',
      roles: [
        'طراحی وب',
        'توسعه فرانت‌اند',
        'هویت بصری برند',
        'ایلوستریتور و کرل',
        'طراحی فتوشاپ',
        'رابط و تجربه کاربری',
      ],
    },
    about: {
      eyebrow: 'درباره من',
      portraitCaption: 'همه چیز از یک hello world ساده شروع شد.',
      lead: 'چندسال اخیر را بین دو پنجره گذرانده‌ام، یکی ویرایشگر کد و یکی فایل های طراحی باز. همه چیز فقط برای پیشرفت انجام شده است.',
      body: 'در تیرماه 1376 در استان خراسان شمالی متولد شدم. در مدرسه و دانشگاه اشتیاقم به تکنولوژی منو به سمت انتخاب رشته کامپیوتر سوق داد. که همین باعث شد با دنیای وب آشنا بشم و تمرکز اصلیم رو روی طراحی و توسعه سایت بزارم. من اغلب روی توسعه صفحات فرود و رابط کاربری های تمیز، سریع و کاربر محور فعالیت میکنم و توجه به جزئیات برای من اهمیت دارد.',
      facts: [
        { label: 'حوزه اصلی', value: 'طراحی وب و توسعه فرانت‌اند' },
        { label: 'دیگر فعالیت ها', value: 'طراحی لوگو، هویت بصری، چاپ لیزری' },
        { label: 'ابزار ها و محیط های کاری', value: 'vscode, react.js, astro.js, typescript, supabase, vercel, wordpress, adobe photoshop/illustrator, corel draw' },
        { label: 'موقعیت فعلی', value: 'ایران - تهران' },
      ],
    },
    work: {
      eyebrow: 'نمونه‌کارهای منتخب',
      title: 'سایت‌ها و آثار بصری',
      intro: 'نمونه کار های جدید به صورت دوره ای همینجا اضافه می شوند.',
      filters: [
        { label: 'همه', value: 'all' },
        { label: 'وب‌سایت‌ها', value: 'web' },
        { label: 'طراحی بصری', value: 'visual' },
      ],
      webPreviewLabel: 'پیش‌نمایش دمو زنده',
      visualPreviewLabel: 'پیش‌نمایش اثر',
      webTag: 'وب',
      visualTag: 'بصری',
      appTag: 'اپلیکیشن',
      liveDemo: 'دمو زنده',
      caseStudy: 'مطالعه',
      viewLabel: 'مشاهده',
      modal: {
        tools: 'زبان‌ها و ابزارها',
        screenshots: 'اسکرین‌شات‌ها',
        noScreenshots: 'هنوز اسکرین‌شاتی اضافه نشده.',
        github: 'گیت‌هاب',
        close: 'بستن',
      },
      projects: [
        {
          title: 'پروژه اتصال داخلی شبکه ',
          description: 'یک هاب لوکال که روی سرور اجرا میشه وپیام رسانی و انتقال فایل بین سیستم هارا راحت میکند',
          type: 'app' as const,
          tags: ['react.js', 'HTML,CSS', 'Vite.js'],
          liveUrl: 'https://mpouhassaniir.vercel.app/',
          githubUrl: 'https://github.com/Adrianmix/local-hub',
          image: '/images/local-hub-demo.jpg',
          screenshots: ['/images/Projects/Local-Network/1.png', '/images/Projects/Local-Network/2.png'],
          fullDescription:
            'یک برنامه اشتراک‌گذاری فایل و چت فوری امن و پرسرعت در شبکه محلی (LAN) که به‌طور خاص برای اتاق‌های اداری و ارتباطات خصوصی بهینه شده است.\n\nویژگی‌ها: اشتراک فایل به صورت عمومی و خصوصی، محیط پیام رسان، پنل ادمین، اعلامیه عمومی، نوتیفیکیشن برای پیام، دوزبانه (فارسی و انگلیسی)',
        },
        {
          title: 'استودیو ساخت کد QR',
          description: 'ساخت کد QR با قابلیت شخصی سازی فراوان',
          type: 'app' as const,
          tags: ['react.js', 'TypeScript', 'Vite.js', 'Tailwind CSS'],
          liveUrl: 'https://qr-studio-mu-five.vercel.app/',
          githubUrl: 'https://github.com/Adrianmix/Qr-Studio',
          image: '/images/Projects/Qr-Studio/1.png',
          screenshots: ['/images/Projects/Qr-Studio/1.png', '/images/Projects/Qr-Studio/2.png', '/images/Projects/Qr-Studio/3.png', '/images/Projects/Qr-Studio/4.png'],
          fullDescription:
            'یک تولیدکننده و سفارشی‌ساز کد QR که با React، Vite، TypeScript و کتابخانه qrcode ساخته شده است. این ابزار به شما امکان می‌دهد کدهای QR شخصی سازی شده را برای URLها، متن، Wi‑Fi، vCardها، ایمیل، SMS، WhatsApp، پروفایل‌های شبکه‌های اجتماعی و آدرس‌های رمزنگاری‌شده تولید کنید، سپس رنگ‌ها، الگوها، فریم‌ها، لوگوها را سفارشی کنید و نتیجه را به صورت SVG، PNG یا PDF خروجی بگیرید.',
        },
        {
          title: 'لندیگ پیج سایت mentraic.com',
          description: 'طراحی صفحه لندیگ سایت حوزه هوش مصنوعی با استفاده از المنتور.',
          type: 'web' as const,
          tags: ['Wordpress', 'Elementor'],
          liveUrl: 'https://mentraic.com/',
          image: '/images/Projects/mentraic/1.png',
          screenshots: ['/images/Projects/mentraic/1.png', '/images/Projects/mentraic/2.png', '/images/Projects/mentraic/3.png', '/images/Projects/mentraic/4.png'],
          fullDescription:
            'طراحی صفحه لندیگ پیج برای سایت Mentraic (ابزار های هوش مصنوعی)، که با استفاده از صفحه ساز Elemntor در وردپرس ساخته شده است.\n\nهمچنین لوگو این سایت در نرم افزار illustrator طراحی شده است.',
        },
        {
          title: 'لندیگ پیج محصولات DAB سایت اسپیکو',
          description: 'طراحی صفحه لندینگ و تبلیغاتی برای سایت اسپیکو با استفاده از المنتور',
          type: 'web' as const,
          tags: ['Wordpress', 'Elementor'],
          liveUrl: 'https://spico.ir/%d9%86%d9%85%d8%a7%db%8c%d9%86%d8%af%da%af%db%8c-%d8%a7%d9%86%d8%ad%d8%b5%d8%a7%d8%b1%db%8c-%d8%af%d8%a7%d8%a8-%d8%a7%db%8c%d8%aa%d8%a7%d9%84%db%8c%d8%a7/',
          image: '/images/Projects/spico-dab/1.png',
          screenshots: ['/images/Projects/spico-dab/1.png','/images/Projects/spico-dab/2.png','/images/Projects/spico-dab/3.png','/images/Projects/spico-dab/4.png'],
          fullDescription:
            'صفحه لندینگ برای معرفی خدمات و محصولات  داب ایتالیا در سایت اسپیکو که با Elementor در وردپرس طراحی شده است.',
        },
        {
          title: 'بازطراحی سایت اسپیکو',
          description: 'ایجاد نمونه اولیه طراح سایت برای شرکت اسپیکو در Figma',
          type: 'visual' as const,
          tags: ['Figma'],
          liveUrl: 'https://equal-vote-88802059.figma.site/',
          image: '/images/Projects/spico-figma/1.jpg',
          screenshots: ['/images/Projects/spico-figma/1.jpg','/images/Projects/spico-figma/2.jpg','/images/Projects/spico-figma/3.jpg','/images/Projects/spico-figma/4.jpg'],
          fullDescription:
            'سایت اصلی اسپیکو در ابتدا از طراحی قدیمی سه ستونه استفاده میکرد که از نظر تکنولوژی، بهینه سازی و خوانایی منسوخ شده تلقی می‌شد\n\nبرای بروزرسانی سایت و طراحی آن به صورت برنامه نویسی یک نمونه اولیه در figma ایجاد شد تا برنامه نویسی آن انجام شود.',
        },
        {
          title: 'طراحی سایت اسپیکو در زبان Astro.js',
          description: 'طراحی و برنامه نویسی سایت اسپیکو با دیزاین جدیدو بهینه',
          type: 'web' as const,
          tags: ['Astro,js', 'React.js', 'TypeScript', 'Supabase'],
          liveUrl: 'https://spico-astro.vercel.app',
          githubUrl: 'https://gitlab.com/Adrianmix/spico-astro',
          image: '/images/Projects/spico-astro/1.png',
          screenshots: ['/images/Projects/spico-astro/1.png','/images/Projects/spico-astro/2.png','/images/Projects/spico-astro/3.png','/images/Projects/spico-astro/4.png'],
          fullDescription:
            'این پروژه، وب‌سایت رسمی شرکت صنایع پمپ سعدی (SPICO) است که با Astro + React ساخته شده، به Supabase (پایگاه داده، احراز هویت، ذخیره‌سازی) متصل شده و آماده استقرار است.\n\nاین سایت شامل یک ویترین عمومی، کاتالوگ محصولات، بخش‌های نمایندگی و پروژه، فرم‌های تماس/مشارکت/ضمانت و یک پنل مدیریت برای مدیریت محتوا و ارسال‌ها است.',
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
      email: 'm.pouhassani@gmail.com',
      socials: [
        { label: 'گیت‌هاب', href: 'https://gitlab.com/Adrianmix' },
        { label: 'لینکدین', href: 'https://www.linkedin.com/in/mohammad-pouhassani/' },
      ],
    },
    footer: {
      name: 'adrianmix created this',
      backToTop: 'بازگشت به بالا',
    },
  },
} satisfies Record<Lang, unknown>;

export type SiteContent = typeof content['en'];