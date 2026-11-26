export type Lang = 'en' | 'fa';

export const CV_ASSETS: Record<Lang, { url: string; filename: string }> = {
  en: {
    url: '/assets/Resume-Mohammad-Pouhassani-EN.pdf',
    filename: 'Mohammad-Pouhassani-CV-EN.pdf',
  },
  fa: {
    url: '/assets/aistudio/Resume-Mohammad-Pouhassani_a74a479e.pdf',
    filename: 'Mohammad-Pouhassani-CV-FA.pdf',
  },
};

export function getCvAsset(lang: Lang) {
  return CV_ASSETS[lang];
}

export const content = {
  en: {
    dir: 'ltr' as const,
    htmlLang: 'en',
    meta: {
      title: 'Mohammad Pouhassani — Web Design & Front-End Developer',
      description:
        'Portfolio of Mohammad Pouhassani — web designer and front-end developer crafting fast, SEO-ready sites with Astro, React, TypeScript, and WordPress.',
    },
    cv: {
      download: 'Download CV',
      view: 'Resume PDF',
      ariaLabel: 'Download Mohammad Pouhassani CV as PDF',
    },
    header: {
      wordmark: 'Mohammad Pouhassani',
      nav: [
        { label: 'About', href: '#about' },
        { label: 'Experience', href: '#experience' },
        { label: 'Work', href: '#work' },
        { label: 'Services', href: '#services' },
        { label: 'Contact', href: '#contact' },
      ],
      menu: 'Menu',
      closeMenu: 'Close menu',
      langSwitch: { label: 'فارسی', href: '/fa' },
    },
    theme: {
      label: 'Theme',
      light: 'Light',
      dark: 'Dark',
      auto: 'Auto',
    },
    hero: {
      eyebrow: 'Portfolio · 2026',
      titleLines: ['I design clean, fast,', 'and responsive', 'interfaces.'],
      body: 'Web designer and front-end developer crafting high-performance static sites with Astro, interactive apps with React and TypeScript, and maintainable WordPress experiences.',
      ctaPrimary: 'See the work',
      ctaSecondary: 'Download CV',
      ctaTertiary: 'Start a project',
      availability: 'Open to freelance & product roles',
      roles: [
        'Web Design',
        'Front-End Dev',
        'Astro & React',
        'UI / UX Systems',
        'Brand Identity',
        'WordPress & SEO',
      ],
    },
    about: {
      eyebrow: 'About',
      portraitAlt: 'Mohammad Pouhassani — Web Designer and Front-End Developer portrait',
      portraitCaption: 'Mohammad Pouhassani, Designer & Front-End Developer',
      lead: "I've spent the last few years moving between two windows: a code editor on one side, design artboards on the other.",
      body: 'Born in July 1997 in North Khorasan, Iran, my curiosity for technology led me into Software Engineering and from there into web design and front-end development. I care deeply about typographic clarity, page speed, on-page SEO, and shipping interfaces that feel effortless on every screen.',
      facts: [
        { label: 'Primary focus', value: 'Web Design & Front-End Engineering' },
        { label: 'Visual & print', value: 'Logo Design, Brand Identity, Laser Vector Prep' },
        { label: 'Core workflow', value: 'Manual & AI-Assisted Dev · Astro · React · WordPress' },
        { label: 'Based in', value: 'Tehran, Iran' },
      ],
    },
    experience: {
      eyebrow: 'Background',
      title: 'Experience & Education',
      intro: 'Hands-on web engineering, WordPress optimization, brand visuals, and production print design.',
      workHeading: 'Work Experience',
      educationHeading: 'Education & Languages',
      skillsHeading: 'Technical Competencies',
      jobs: [
        {
          role: 'Web & Graphic Designer',
          company: 'Saadi Pump Industries (SPICO)',
          period: 'Sep 2024 — Present',
          location: 'Tehran',
          points: [
            'Design, develop, and maintain the company website on WordPress & Elementor alongside an Astro + React + Supabase modernization prototype.',
            'Produce promotional banners, brand visual assets, and marketing creatives for web and social campaigns.',
            'Design technical product specification plates and prepare production-ready vector files for laser engraving and cutting.',
            'Manage technical documentation and structured operational data using Microsoft Word, Excel, and Google Workspace.',
          ],
        },
        {
          role: 'Website Designer & Developer',
          company: 'Negaresh Co.',
          period: 'Nov 2023 — Jul 2024',
          location: 'Tehran',
          points: [
            'Designed and built responsive corporate websites with WordPress.',
            'Created brand logos and cohesive visual assets for digital presence.',
            'Implemented on-page SEO best practices and Search Console monitoring.',
          ],
        },
        {
          role: 'Freelance Web Designer & Developer',
          company: 'Independent',
          period: '2017 — Present',
          location: 'Remote',
          points: [
            'Delivered custom WordPress, WooCommerce, and modern Astro/React websites and landing pages for businesses and startups.',
          ],
        },
      ],
      education: {
        degree: 'B.S. in Software Technology Engineering',
        school: 'Darolfonoon Technical & Vocational Institute, Bojnourd',
        period: '2015 — 2019',
      },
      languages: [
        { name: 'Persian', level: 'Native' },
        { name: 'English', level: 'Intermediate' },
      ],
      skillGroups: [
        {
          label: 'Frontend',
          items: 'React.js · Astro.js · TypeScript · JavaScript · HTML · CSS / Tailwind · Elementor',
        },
        {
          label: 'Backend & CMS',
          items: 'WordPress · Headless WordPress · WooCommerce · Node.js · Supabase · cPanel',
        },
        {
          label: 'SEO',
          items: 'On-page SEO · Google Search Console · Yoast SEO',
        },
        {
          label: 'Version Control & Deploy',
          items: 'Git · GitHub / GitLab · Vercel · Netlify',
        },
        {
          label: 'Design & Print',
          items: 'Figma · UI / UX · Adobe Photoshop · Adobe Illustrator · CorelDRAW',
        },
      ],
    },
    work: {
      eyebrow: 'Selected Work',
      title: 'Sites & visuals',
      intro: 'A curated mix of production web apps, WordPress landing pages, and UI prototypes.',
      filters: [
        { label: 'All', value: 'all' },
        { label: 'Websites & Apps', value: 'web' },
        { label: 'Visual Design', value: 'visual' },
      ],
      webPreviewLabel: 'Live demo preview',
      visualPreviewLabel: 'Artwork preview',
      webTag: 'Web',
      visualTag: 'Visual',
      appTag: 'App',
      liveDemo: 'Live demo',
      caseStudy: 'Case study',
      viewLabel: 'View details',
      modal: {
        tools: 'Languages & tools',
        screenshots: 'Screenshots',
        noScreenshots: 'No screenshots yet.',
        github: 'Repository',
        close: 'Close',
        prev: 'Previous image',
        next: 'Next image',
        details: 'Project details',
      },
      projects: [
        {
          title: 'TuneTactics',
          description:
            'A music collaboration platform & waitlist launch built for producers, singers, and songwriters.',
          type: 'app' as const,
          tags: ['Astro', 'React', 'TypeScript', 'Three.js', 'Tailwind CSS', 'PHP'],
          liveUrl: 'https://tunetactics.ir',
          githubUrl: 'https://github.com/Adrianmix/tunetactics-V2',
          image: '/images/Projects/tunetactics/1.png',
          screenshots: [
            '/images/Projects/tunetactics/1.png',
            '/images/Projects/tunetactics/2.png',
            '/images/Projects/tunetactics/3.png',
            '/images/Projects/tunetactics/4.png',
          ],
          fullDescription:
            'A community platform and pre-launch web app built for producers, vocalists, and songwriters to showcase beats, vocal reels, and studio gear and connect for remote collaborations.\n\nEngineered with Astro, React, TypeScript, Tailwind CSS, and an interactive Three.js 3D audio visualizer, paired with an interactive Producer/Singer portfolio preview, continuous EQ stem player, and a custom PHP/SMTP waitlist backend.',
        },
        {
          title: 'Local Network Connection',
          description: 'A LAN hub running on a local server for fast office messaging and file transfer.',
          type: 'app' as const,
          tags: ['React.js', 'HTML & CSS', 'Vite.js'],
          liveUrl: 'https://mpouhassaniir.vercel.app/',
          githubUrl: 'https://github.com/Adrianmix/local-hub',
          image: '/images/local-hub-demo.jpg',
          screenshots: ['/images/Projects/Local-Network/1.png', '/images/Projects/Local-Network/2.png'],
          fullDescription:
            'A secure, high-speed file-sharing and instant-messaging web app for local area networks (LAN), optimized for office rooms and private team communication.\n\nFeatures: public and private file sharing, real-time messaging rooms, admin moderation panel, broadcast announcements, message alerts, and full Persian/English bilingual UI.',
        },
        {
          title: 'QR Code Studio',
          description: 'Customizable QR code generator with frames, logos, and vector export.',
          type: 'app' as const,
          tags: ['React.js', 'TypeScript', 'Vite.js', 'Tailwind CSS'],
          liveUrl: 'https://qr-studio-mu-five.vercel.app/',
          githubUrl: 'https://github.com/Adrianmix/Qr-Studio',
          image: '/images/Projects/Qr-Studio/1.png',
          screenshots: [
            '/images/Projects/Qr-Studio/1.png',
            '/images/Projects/Qr-Studio/2.png',
            '/images/Projects/Qr-Studio/3.png',
            '/images/Projects/Qr-Studio/4.png',
          ],
          fullDescription:
            'A QR code generator and customizer built with React, Vite, TypeScript, and the qrcode library.\n\nSupports URLs, plain text, Wi-Fi, vCards, email, SMS, WhatsApp, social profiles, and crypto addresses—with custom colors, module patterns, frames, embedded logos, and SVG/PNG/PDF export.',
        },
        {
          title: 'Mentraic Landing Page',
          description: 'Conversion-focused landing page and brand mark for an AI tools platform.',
          type: 'web' as const,
          tags: ['WordPress', 'Elementor', 'Illustrator'],
          liveUrl: 'https://mentraic.com/',
          image: '/images/Projects/mentraic/1.png',
          screenshots: [
            '/images/Projects/mentraic/1.png',
            '/images/Projects/mentraic/2.png',
            '/images/Projects/mentraic/3.png',
            '/images/Projects/mentraic/4.png',
          ],
          fullDescription:
            'Landing page design and build for Mentraic (AI tools), crafted with WordPress and Elementor.\n\nThe brand logomark and supporting visual elements were also designed in Adobe Illustrator.',
        },
        {
          title: 'DAB Products Showcase on SPICO',
          description: 'Promotional product landing page for DAB Italia on the SPICO portal.',
          type: 'web' as const,
          tags: ['WordPress', 'Elementor'],
          liveUrl:
            'https://spico.ir/%d9%86%d9%85%d8%a7%db%8c%d9%86%d8%af%da%af%db%8c-%d8%a7%d9%86%d8%ad%d8%b5%d8%a7%d8%b1%db%8c-%d8%af%d8%a7%d8%a8-%d8%a7%db%8c%d8%aa%d8%a7%d9%84%db%8c%d8%a7/',
          image: '/images/Projects/spico-dab/1.png',
          screenshots: [
            '/images/Projects/spico-dab/1.png',
            '/images/Projects/spico-dab/2.png',
            '/images/Projects/spico-dab/3.png',
            '/images/Projects/spico-dab/4.png',
          ],
          fullDescription:
            'Dedicated campaign landing page introducing DAB Italia pumping systems and authorized services on the Saadi Pump Industries (SPICO) website, built with Elementor in WordPress.',
        },
        {
          title: 'SPICO Website Redesign Prototype',
          description: 'Interactive Figma prototype modernizing SPICO’s legacy architecture.',
          type: 'visual' as const,
          tags: ['Figma', 'UI / UX'],
          liveUrl: 'https://equal-vote-88802059.figma.site/',
          image: '/images/Projects/spico-figma/1.jpg',
          screenshots: [
            '/images/Projects/spico-figma/1.jpg',
            '/images/Projects/spico-figma/2.jpg',
            '/images/Projects/spico-figma/3.jpg',
            '/images/Projects/spico-figma/4.jpg',
          ],
          fullDescription:
            'The legacy SPICO website relied on a dated three-column layout with poor mobile legibility and performance bottlenecks.\n\nDesigned a structured, modern component system and interactive Figma prototype prior to full front-end engineering.',
        },
        {
          title: 'SPICO Platform with Astro.js',
          description: 'Full-stack company website redesign coded in Astro, React, and Supabase.',
          type: 'web' as const,
          tags: ['Astro.js', 'React.js', 'TypeScript', 'Supabase'],
          liveUrl: 'https://spico-astro.vercel.app',
          githubUrl: 'https://gitlab.com/Adrianmix/spico-astro',
          image: '/images/Projects/spico-astro/1.png',
          screenshots: [
            '/images/Projects/spico-astro/1.png',
            '/images/Projects/spico-astro/2.png',
            '/images/Projects/spico-astro/3.png',
            '/images/Projects/spico-astro/4.png',
          ],
          fullDescription:
            'Modernized web platform for Saadi Pump Industries (SPICO), engineered with Astro, React, and TypeScript and backed by Supabase (PostgreSQL, authentication, and storage).\n\nIncludes a public product catalog, dealership & project showcases, warranty/contact/partnership forms, and an admin dashboard for managing submissions.',
        },
      ],
    },
    services: {
      eyebrow: 'Capabilities',
      title: 'How I can help',
      items: [
        {
          name: 'Web Design & Front-End Dev',
          detail:
            'Landing pages, portfolios, and product sites — designed in Figma and engineered end to end with Astro, React, TypeScript, or maintainable WordPress.',
        },
        {
          name: 'Brand & Visual Identity',
          detail:
            'Logos, identity systems, social campaign graphics, and print-ready vector files built in Illustrator, Photoshop, and CorelDRAW.',
        },
        {
          name: 'Design + Engineering Bundles',
          detail:
            'For teams that need both visual identity and a fast, SEO-ready website — one point of contact and one cohesive system.',
        },
      ],
    },
    contact: {
      eyebrow: 'Get in touch',
      titleLines: ["Let's build", 'something solid.'],
      email: 'm.pouhassani@gmail.com',
      socials: [
        { label: 'GitHub', href: 'https://github.com/Adrianmix' },
        { label: 'GitLab', href: 'https://gitlab.com/Adrianmix' },
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
      title: 'محمد پوحسنی (Pouhassani) — طراحی سایت و توسعه فرانت‌اند',
      description:
        'طراحی سایت اختصاصی، سریع و سئو‌شده با محمد پوحسنی (Pouhassani)؛ طراح وب و توسعه‌دهنده فرانت‌اند مسلط به Astro، React، TypeScript و وردپرس.',
    },
    cv: {
      download: 'دانلود رزومه',
      view: 'فایل PDF رزومه',
      ariaLabel: 'دانلود فایل PDF رزومه محمد پوحسنی',
    },
    header: {
      wordmark: 'محمد پوحسنی',
      nav: [
        { label: 'درباره من', href: '#about' },
        { label: 'سوابق', href: '#experience' },
        { label: 'نمونه‌کارها', href: '#work' },
        { label: 'خدمات', href: '#services' },
        { label: 'تماس', href: '#contact' },
      ],
      menu: 'منو',
      closeMenu: 'بستن منو',
      langSwitch: { label: 'English', href: '/' },
    },
    theme: {
      label: 'تم',
      light: 'روشن',
      dark: 'تیره',
      auto: 'خودکار',
    },
    hero: {
      eyebrow: 'پورتفولیو · ۱۴۰۵',
      titleLines: ['رابط‌هایی تمیز، سریع', 'و کاملاً ریسپانسیو', 'طراحی می‌کنم.'],
      body: 'طراح وب و توسعه‌دهنده فرانت‌اند برای کسب‌وکارهای مدرن و استارتاپ‌ها؛ مسلط به ساخت وب‌سایت‌های سریع با Astro و React و توسعه وب‌سایت‌های حرفه‌ای و ماندگار وردپرس با المنتور.',
      ctaPrimary: 'دیدن نمونه‌کارها',
      ctaSecondary: 'دانلود رزومه',
      ctaTertiary: 'شروع یک پروژه',
      availability: 'آماده همکاری در پروژه‌های فریلنسری و تیمی',
      roles: [
        'طراحی وب',
        'توسعه فرانت‌اند',
        'Astro و React',
        'طراحی UI / UX',
        'هویت بصری برند',
        'وردپرس و سئو',
      ],
    },
    about: {
      eyebrow: 'درباره من',
      portraitAlt: 'محمد پوحسنی (Mohammad Pouhassani) — طراح سایت و توسعه‌دهنده فرانت‌اند',
      portraitCaption: 'محمد پوحسنی، طراح و توسعه‌دهنده فرانت‌اند',
      lead: 'چند سال اخیر را بین دو پنجره گذرانده‌ام: یک سمت ویرایشگر کد و سمت دیگر فایل‌های طراحی.',
      body: 'متولد تیرماه ۱۳۷۶ در خراسان شمالی هستم. علاقه‌ام به فناوری باعث شد رشته مهندسی نرم‌افزار را انتخاب کنم و از همان مسیر وارد دنیای طراحی و توسعه وب شوم. تمرکز من روی صفحات فرود، سرعت بارگذاری بالا، اصول سئو و رابط‌های کاربری تمیز و دقیق است.',
      facts: [
        { label: 'حوزه اصلی', value: 'طراحی وب و توسعه فرانت‌اند' },
        { label: 'طراحی و چاپ', value: 'لوگو، هویت بصری، آماده‌سازی فایل‌های برش لیزری' },
        { label: 'رویکرد توسعه', value: 'کدنویسی دستی و AI-Assisted · Astro · React · وردپرس' },
        { label: 'موقعیت فعلی', value: 'تهران، ایران' },
      ],
    },
    experience: {
      eyebrow: 'پیشینه حرفه‌ای',
      title: 'سوابق کاری و تحصیلات',
      intro: 'تجربه عملی در توسعه وب، بهینه‌سازی وردپرس، طراحی هویت بصری و فایل‌های صنعتی.',
      workHeading: 'سوابق شغلی',
      educationHeading: 'تحصیلات و زبان‌ها',
      skillsHeading: 'حوزه‌های تخصصی',
      jobs: [
        {
          role: 'طراح وب و گرافیست',
          company: 'صنایع پمپ سعدی (اسپیکو)',
          period: 'شهریور ۱۴۰۳ — تاکنون',
          location: 'تهران',
          points: [
            'طراحی، توسعه، مدیریت و به‌روزرسانی وب‌سایت شرکت با وردپرس و المنتور در کنار بازطراحی مدرن با Astro و React.',
            'طراحی بنرها، محتوای بصری و اقلام تبلیغاتی جهت انتشار در وب‌سایت و شبکه‌های اجتماعی.',
            'طراحی پلاک مشخصات فنی محصولات و آماده‌سازی فایل‌های وکتور برای حکاکی و برش لیزری.',
            'تهیه و مدیریت اسناد فنی و داده‌ها با Microsoft Word، Excel و ابزارهای Google Workspace.',
          ],
        },
        {
          role: 'طراح و توسعه‌دهنده وب‌سایت',
          company: 'شرکت نگرش',
          period: 'آبان ۱۴۰۲ — تیر ۱۴۰۳',
          location: 'تهران',
          points: [
            'طراحی و پیاده‌سازی وب‌سایت‌های شرکتی واکنش‌گرا بر پایه وردپرس.',
            'طراحی لوگو و محتوای بصری هماهنگ با هویت برند.',
            'اجرای سئوی داخلی (On-page SEO) و پایش عملکرد در Search Console.',
          ],
        },
        {
          role: 'فریلنسر طراحی و توسعه وب',
          company: 'مستقل',
          period: '۱۳۹۶ — تاکنون',
          location: 'دورکاری',
          points: [
            'اجرای پروژه‌های طراحی و توسعه وب‌سایت با وردپرس، ووکامرس و فناوری‌های مدرن فرانت‌اند.',
          ],
        },
      ],
      education: {
        degree: 'کارشناسی مهندسی تکنولوژی نرم‌افزار',
        school: 'دانشکده فنی و حرفه‌ای دارالفنون بجنورد',
        period: '۱۳۹۴ — ۱۳۹۸',
      },
      languages: [
        { name: 'فارسی', level: 'زبان مادری' },
        { name: 'انگلیسی', level: 'متوسط' },
      ],
      skillGroups: [
        {
          label: 'فرانت‌اند',
          items: 'React.js · Astro.js · TypeScript · JavaScript · HTML · CSS / Tailwind · Elementor',
        },
        {
          label: 'بک‌اند و CMS',
          items: 'WordPress · Headless WordPress · WooCommerce · Node.js · Supabase · cPanel',
        },
        {
          label: 'سئو',
          items: 'On-page SEO · Google Search Console · Yoast SEO',
        },
        {
          label: 'کنترل نسخه و استقرار',
          items: 'Git · GitHub / GitLab · Vercel · Netlify',
        },
        {
          label: 'طراحی و چاپ',
          items: 'Figma · UI / UX · Adobe Photoshop · Adobe Illustrator · CorelDRAW',
        },
      ],
    },
    work: {
      eyebrow: 'نمونه‌کارهای منتخب',
      title: 'سایت‌ها و آثار بصری',
      intro: 'منتخبی از اپلیکیشن‌های وب، صفحات فرود وردپرس و نمونه‌های اولیه UI.',
      filters: [
        { label: 'همه', value: 'all' },
        { label: 'وب‌سایت‌ها و اپ‌ها', value: 'web' },
        { label: 'طراحی بصری', value: 'visual' },
      ],
      webPreviewLabel: 'پیش‌نمایش دمو زنده',
      visualPreviewLabel: 'پیش‌نمایش اثر',
      webTag: 'وب',
      visualTag: 'بصری',
      appTag: 'اپلیکیشن',
      liveDemo: 'دمو زنده',
      caseStudy: 'مطالعه موردی',
      viewLabel: 'مشاهده جزئیات',
      modal: {
        tools: 'زبان‌ها و ابزارها',
        screenshots: 'اسکرین‌شات‌ها',
        noScreenshots: 'هنوز اسکرین‌شاتی اضافه نشده است.',
        github: 'مخزن کد',
        close: 'بستن',
        prev: 'تصویر قبلی',
        next: 'تصویر بعدی',
        details: 'جزئیات پروژه',
      },
      projects: [
        {
          title: 'پلتفرم TuneTactics',
          description:
            'پلتفرم همکاری و پیش‌ثبت‌نام موسیقی برای پرودیوسرها، خوانندگان و ترانه‌سراها.',
          type: 'app' as const,
          tags: ['Astro', 'React', 'TypeScript', 'Three.js', 'Tailwind CSS', 'PHP'],
          liveUrl: 'https://tunetactics.ir',
          githubUrl: 'https://github.com/Adrianmix/tunetactics-V2',
          image: '/images/Projects/tunetactics/1.png',
          screenshots: [
            '/images/Projects/tunetactics/1.png',
            '/images/Projects/tunetactics/2.png',
            '/images/Projects/tunetactics/3.png',
            '/images/Projects/tunetactics/4.png',
          ],
          fullDescription:
            'پلتفرم همکاری و معرفی آثار برای پرودیوسرها، خوانندگان و ترانه‌سراها جهت نمایش بیت‌ها، ریل‌های وکال، تجهیزات استودیو و پیدا کردن همکارهای ریموت.\n\nپیاده‌سازی‌شده با Astro، React، TypeScript، Tailwind CSS و ویژوالایزر صوتی سه‌بعدی Three.js؛ همراه با پیش‌نمایش تعاملی پروفایل پرودیوسر و خواننده، پخش‌کننده EQ استم‌ها و بک‌اند اختصاصی لیست انتظار با PHP و SMTP.',
        },
        {
          title: 'پروژه اتصال داخلی شبکه',
          description: 'یک هاب لوکال تحت سرور برای پیام‌رسانی و انتقال سریع فایل بین سیستم‌های اداری.',
          type: 'app' as const,
          tags: ['React.js', 'HTML & CSS', 'Vite.js'],
          liveUrl: 'https://mpouhassaniir.vercel.app/',
          githubUrl: 'https://github.com/Adrianmix/local-hub',
          image: '/images/local-hub-demo.jpg',
          screenshots: ['/images/Projects/Local-Network/1.png', '/images/Projects/Local-Network/2.png'],
          fullDescription:
            'یک برنامه اشتراک‌گذاری فایل و چت فوری امن و پرسرعت در شبکه محلی (LAN) که به‌طور خاص برای اتاق‌های اداری و ارتباطات داخلی بهینه شده است.\n\nویژگی‌ها: اشتراک فایل به صورت عمومی و خصوصی، محیط پیام‌رسان، پنل ادمین، اطلاعیه‌های عمومی، اعلان پیام و رابط دوزبانه (فارسی و انگلیسی).',
        },
        {
          title: 'استودیو ساخت کد QR',
          description: 'ساخت و شخصی‌سازی حرفه‌ای کدهای QR با خروجی وکتور و تصویری.',
          type: 'app' as const,
          tags: ['React.js', 'TypeScript', 'Vite.js', 'Tailwind CSS'],
          liveUrl: 'https://qr-studio-mu-five.vercel.app/',
          githubUrl: 'https://github.com/Adrianmix/Qr-Studio',
          image: '/images/Projects/Qr-Studio/1.png',
          screenshots: [
            '/images/Projects/Qr-Studio/1.png',
            '/images/Projects/Qr-Studio/2.png',
            '/images/Projects/Qr-Studio/3.png',
            '/images/Projects/Qr-Studio/4.png',
          ],
          fullDescription:
            'یک تولیدکننده و سفارشی‌ساز کد QR ساخته‌شده با React، Vite، TypeScript و کتابخانه qrcode.\n\nاین ابزار امکان تولید کد QR برای لینک، متن، Wi‑Fi، vCard، ایمیل، پیامک، واتساپ، شبکه‌های اجتماعی و کیف‌پول رمزارز را به همراه تنظیم رنگ، الگو، قاب، لوگو و خروجی SVG، PNG و PDF فراهم می‌کند.',
        },
        {
          title: 'لندینگ پیج سایت Mentraic',
          description: 'طراحی صفحه فرود و لوگوی پلتفرم ابزارهای هوش مصنوعی با المنتور.',
          type: 'web' as const,
          tags: ['WordPress', 'Elementor', 'Illustrator'],
          liveUrl: 'https://mentraic.com/',
          image: '/images/Projects/mentraic/1.png',
          screenshots: [
            '/images/Projects/mentraic/1.png',
            '/images/Projects/mentraic/2.png',
            '/images/Projects/mentraic/3.png',
            '/images/Projects/mentraic/4.png',
          ],
          fullDescription:
            'طراحی صفحه فرود برای سایت Mentraic (ابزارهای هوش مصنوعی) که با صفحه‌ساز Elementor در وردپرس پیاده‌سازی شده است.\n\nلوگوی این مجموعه نیز در نرم‌افزار Adobe Illustrator طراحی شده است.',
        },
        {
          title: 'لندینگ پیج محصولات DAB اسپیکو',
          description: 'طراحی صفحه فرود و تبلیغاتی نمایندگی انحصاری DAB ایتالیا برای سایت اسپیکو.',
          type: 'web' as const,
          tags: ['WordPress', 'Elementor'],
          liveUrl:
            'https://spico.ir/%d9%86%d9%85%d8%a7%db%8c%d9%86%d8%af%da%af%db%8c-%d8%a7%d9%86%d8%ad%d8%b5%d8%a7%d8%b1%db%8c-%d8%af%d8%a7%d8%a8-%d8%a7%db%8c%d8%aa%d8%a7%d9%84%db%8c%d8%a7/',
          image: '/images/Projects/spico-dab/1.png',
          screenshots: [
            '/images/Projects/spico-dab/1.png',
            '/images/Projects/spico-dab/2.png',
            '/images/Projects/spico-dab/3.png',
            '/images/Projects/spico-dab/4.png',
          ],
          fullDescription:
            'صفحه لندینگ برای معرفی خدمات و محصولات داب ایتالیا در وب‌سایت شرکت صنایع پمپ سعدی (اسپیکو) که با Elementor در وردپرس طراحی شده است.',
        },
        {
          title: 'نمونه اولیه بازطراحی سایت اسپیکو',
          description: 'طراحی پروتوتایپ و ساختار مدرن رابط کاربری سایت اسپیکو در Figma.',
          type: 'visual' as const,
          tags: ['Figma', 'UI / UX'],
          liveUrl: 'https://equal-vote-88802059.figma.site/',
          image: '/images/Projects/spico-figma/1.jpg',
          screenshots: [
            '/images/Projects/spico-figma/1.jpg',
            '/images/Projects/spico-figma/2.jpg',
            '/images/Projects/spico-figma/3.jpg',
            '/images/Projects/spico-figma/4.jpg',
          ],
          fullDescription:
            'سایت اولیه اسپیکو از ساختار قدیمی سه‌ستونه استفاده می‌کرد که از نظر فنی، سرعت و خوانایی موبایل منسوخ شده بود.\n\nبرای به‌روزرسانی کامل وب‌سایت، پیش از کدنویسی یک سیستم طراحی و پروتوتایپ تعاملی در Figma پیاده‌سازی شد.',
        },
        {
          title: 'پلتفرم وب اسپیکو با Astro.js',
          description: 'طراحی و کدنویسی کامل وب‌سایت جدید اسپیکو با Astro، React و Supabase.',
          type: 'web' as const,
          tags: ['Astro.js', 'React.js', 'TypeScript', 'Supabase'],
          liveUrl: 'https://spico-astro.vercel.app',
          githubUrl: 'https://gitlab.com/Adrianmix/spico-astro',
          image: '/images/Projects/spico-astro/1.png',
          screenshots: [
            '/images/Projects/spico-astro/1.png',
            '/images/Projects/spico-astro/2.png',
            '/images/Projects/spico-astro/3.png',
            '/images/Projects/spico-astro/4.png',
          ],
          fullDescription:
            'نسخه بازطراحی‌شده وب‌سایت رسمی شرکت صنایع پمپ سعدی (SPICO) که با Astro، React و TypeScript ساخته شده و به Supabase (پایگاه داده، احراز هویت و ذخیره‌سازی) متصل است.\n\nشامل ویترین عمومی، کاتالوگ محصولات، بخش‌های نمایندگی و پروژه‌ها، فرم‌های تماس/مشارکت/گارانتی و پنل مدیریت برای بررسی درخواست‌ها است.',
        },
      ],
    },
    services: {
      eyebrow: 'خدمات و توانمندی‌ها',
      title: 'چطور می‌توانم کمک کنم',
      items: [
        {
          name: 'طراحی و توسعه وب',
          detail:
            'طراحی و پیاده‌سازی صفحات فرود، پورتفولیو و سایت‌های محصول از فیگما تا نسخه نهایی با Astro، React، TypeScript یا وردپرس.',
        },
        {
          name: 'طراحی برند و هویت بصری',
          detail:
            'طراحی لوگو، سیستم هویت بصری، بنرهای تبلیغاتی و فایل‌های وکتور چاپ و لیزر با Illustrator، Photoshop و CorelDRAW.',
        },
        {
          name: 'بسته یکپارچه طراحی + توسعه',
          detail:
            'مناسب تیم‌هایی که هم‌زمان به هویت بصری و وب‌سایت سریع و سئو‌شده نیاز دارند — یک نقطه تماس و یک زبان بصری واحد.',
        },
      ],
    },
    contact: {
      eyebrow: 'در تماس باشید',
      titleLines: ['بیایید پروژه‌ای', 'ماندگار بسازیم.'],
      email: 'm.pouhassani@gmail.com',
      socials: [
        { label: 'GitHub', href: 'https://github.com/Adrianmix' },
        { label: 'GitLab', href: 'https://gitlab.com/Adrianmix' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mohammad-pouhassani/' },
      ],
    },
    footer: {
      name: 'محمد پوحسنی',
      backToTop: 'بازگشت به بالا',
    },
  },
} satisfies Record<Lang, unknown>;

export type SiteContent = typeof content['en'];