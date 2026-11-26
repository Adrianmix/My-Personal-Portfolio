import type { Lang } from '../i18n/content';
import type { BlogCategory } from '../utils/blog';

export interface BlogFigure {
  src: string;
  alt: string;
  caption: string;
  linkUrl?: string;
  linkLabel?: string;
}

export interface BlogCodeSnippet {
  title: string;
  code: string;
}

export interface BlogSection {
  heading: string;
  paragraphs: string[];
  codeSnippet?: BlogCodeSnippet;
  figure?: BlogFigure;
}

export interface BlogLinkItem {
  label: string;
  description: string;
  url: string;
}

export interface BlogLocalizedContent {
  title: string;
  subtitle: string;
  excerpt: string;
  coverAlt: string;
  coverCaption: string;
  keyPoints: string[];
  sections: BlogSection[];
  links: BlogLinkItem[];
}

export interface BlogPost {
  slug: string;
  category: BlogCategory;
  publishedAt: string;
  readingMinutes: number;
  featured?: boolean;
  coverImage: string;
  en: BlogLocalizedContent;
  fa: BlogLocalizedContent;
}

export const blogPosts: readonly BlogPost[] = [
  {
    slug: 'how-this-site-was-built',
    category: 'case-study',
    publishedAt: '2026-11-26',
    readingMinutes: 6,
    featured: true,
    coverImage: '/images/blog/portfolio-making.jpg',
    en: {
      title: 'How This Portfolio Was Built: Stack, Architecture, and Design Choices',
      subtitle:
        'A transparent walkthrough of the exact frameworks, Three.js particle shader, bilingual RTL system, and security/performance setup running this site.',
      excerpt:
        'From Astro 4 zero-JS pages and selective React 18 islands to a custom 6,400-particle Three.js scroll choreography, Tailwind CSS variables, and Vercel static edge delivery.',
      coverAlt:
        'Abstract dark architectural drafting grid illuminated by violet dot wave curves representing portfolio engineering',
      coverCaption:
        'Fig. 1 — Monochrome editorial typography paired with an interactive violet particle field across all scroll sections.',
      keyPoints: [
        'Astro 4 compiles bilingual EN (/) and RTL Persian (/fa) pages into lean HTML with minimal client JavaScript.',
        'Three.js renders a 6,400-point GLSL particle choreography that morphs smoothly per section and disperses softly around the pointer.',
        'React 18 hydrates only where rich state lives (project modal & blog filters), keeping first paint fast.',
        'Deployed statically on Vercel with strict Content Security Policy headers, JSON-LD structured data, Analytics, and Speed Insights.',
      ],
      sections: [
        {
          heading: '1. Core Foundation: Astro 4, TypeScript & Bilingual Routing',
          paragraphs: [
            'A personal portfolio is read like an editorial publication first and interacted with second. That made Astro 4 the natural backbone: every section—Header, Hero, About, Experience, Services, Contact, and Footer—compiles straight to semantic HTML with zero runtime JavaScript overhead.',
            'TypeScript sits behind all shared content, SEO schema builders, blog data, and particle choreography math in dedicated modules tested with Node’s built-in test runner. English (/) renders in LTR using Bricolage Grotesque and Instrument Sans, while Persian (/fa) switches automatically to RTL with Vazirmatn Variable.',
          ],
          codeSnippet: {
            title: 'astro.config.mjs — Dual environment static & standalone build',
            code: `const isVercel = Boolean(process.env.VERCEL || process.env.VERCEL_ENV);

export default defineConfig({
  output: isVercel ? 'static' : 'server',
  integrations: [react(), tailwind()],
});`,
          },
        },
        {
          heading: '2. Selective React Islands & Editorial Design Tokens',
          paragraphs: [
            'Instead of shipping a heavy full-page SPA bundle, interactive surfaces like the Selected Work filterable gallery, accessible project details modal, image lightbox, and blog category filter mount as isolated React 18 islands with client:idle.',
            'Color tokens live cleanly inside CSS custom properties (--color-paper, --color-ink, --color-chalk, --color-accent), giving both Light and Dark themes crisp 60-30-10 monochrome balance with a unified violet accent derived directly from the particle artwork.',
          ],
          figure: {
            src: '/assets/aistudio/image_e6fb156a.png',
            alt: 'Original violet bokeh wave reference image inspiring the site color system and Three.js particle shader',
            caption:
              'Fig. 2 — The original violet depth-of-field wave reference used to calibrate both the site’s accent palette and the GLSL bokeh particle shader.',
          },
        },
        {
          heading: '3. Scroll-Reactive 3D Particles, SEO, Analytics & Deployment',
          paragraphs: [
            'Running quietly behind the layout on a single fixed WebGL canvas, a custom GLSL shader morphs 6,400 particles across six mathematical surfaces (silk wave, folded ribbon, torus shell, crystalline dome, architectural terrain, and spiral nebula) as you scroll—inverting cleanly onto additive light dots over the dark Contact footer.',
            'For production quality on Vercel, the site ships static HTML output, automated XML sitemaps with hreflang and image metadata, Schema.org Person and ImageObject JSON-LD, strict Content-Security-Policy headers, plus @vercel/analytics and @vercel/speed-insights for real user telemetry.',
          ],
        },
      ],
      links: [
        {
          label: 'Portfolio Repository on GitHub',
          description: 'Explore the complete Astro, React, TypeScript, and Three.js source structure.',
          url: 'https://github.com/Adrianmix/My-Personal-Portfolio',
        },
        {
          label: 'Astro Documentation',
          description: 'Official guide to Islands Architecture and zero-JS static rendering.',
          url: 'https://docs.astro.build',
        },
        {
          label: 'Three.js Official Docs',
          description: 'WebGL scenes, custom BufferGeometry, and GLSL ShaderMaterial APIs.',
          url: 'https://threejs.org/docs/',
        },
        {
          label: 'Vercel Speed Insights & Analytics',
          description: 'Real-world Core Web Vitals and privacy-friendly traffic measurement.',
          url: 'https://vercel.com/docs/speed-insights',
        },
      ],
    },
    fa: {
      title: 'پشت صحنه ساخت این سایت: معماری، ابزارها و تصمیم‌های طراحی',
      subtitle:
        'نگاهی شفاف به فناوری‌ها، شیدر ذرات سه‌بعدی Three.js، ساختار دوزبانه راست‌به‌چپ و تنظیمات سئو و امنیت در همین وب‌سایت.',
      excerpt:
        'از صفحات سبک Astro 4 و جزایر هدفمند React 18 تا رقص ذرات سه‌بعدی با GLSL همگام با اسکرول، متغیرهای تم روشن/تیره در Tailwind و استقرار استاتیک روی Vercel.',
      coverAlt:
        'ترکیب گرافیکی تیره با موج‌های ذره‌ای بنفش روی شبکه طراحی معماری که نماد ساختار مهندسی این پورتفولیو است',
      coverCaption:
        'تصویر ۱ — ترکیب تایپوگرافی مینیمال با میدان ذرات تعاملی بنفش در سراسر بخش‌های صفحه.',
      keyPoints: [
        'فریم‌ورک Astro 4 صفحات انگلیسی (/) و فارسی راست‌به‌چپ (/fa) را به HTML خالص و فوق‌سریع کامپایل می‌کند.',
        'شیدر اختصاصی Three.js حدود ۶۴۰۰ ذره را همگام با اسکرول بین ۶ فرم سه‌بعدی تغییر شکل می‌دهد و اطراف نشانگر ماوس واکنش نرمی دارد.',
        'React 18 فقط در بخش‌های تعاملی (فیلتر نمونه‌کارها، مودال جزئیات و دسته‌بندی بلاگ) بارگذاری می‌شود.',
        'استقرار استاتیک روی Vercel همراه با هدرهای امنیتی CSP، اسکیمای سئو JSON-LD و Vercel Analytics و Speed Insights انجام شده است.',
      ],
      sections: [
        {
          heading: '۱. هسته اصلی: Astro 4، TypeScript و ساختار دوزبانه',
          paragraphs: [
            'یک وب‌سایت پورتفولیو پیش از هر چیز باید سریع، خوانا و تمیز لود شود. به همین دلیل Astro 4 به عنوان ستون اصلی انتخاب شد تا بخش‌هایی مثل هدر، هیرو، درباره من، سوابق، خدمات و فوتر بدون تحمیل جاوااسکریپت اضافه، مستقیم به HTML معنایی تبدیل شوند.',
            'تمامی داده‌های محتوایی، توابع سئو، مقالات بلاگ و محاسبات ریاضی ذرات با TypeScript نوشته شده و با تست‌های خودکار Node آزمایش می‌شوند. نسخه انگلیسی با فونت‌های Bricolage Grotesque و Instrument Sans و نسخه فارسی (/fa) با چیدمان RTL و فونت Vazirmatn Variable رندر می‌شود.',
          ],
          codeSnippet: {
            title: 'astro.config.mjs — خروجی استاتیک برای Vercel و سرور محلی',
            code: `const isVercel = Boolean(process.env.VERCEL || process.env.VERCEL_ENV);

export default defineConfig({
  output: isVercel ? 'static' : 'server',
  integrations: [react(), tailwind()],
});`,
          },
        },
        {
          heading: '۲. جزایر انتخابی React و سیستم رنگ روشن و تیره',
          paragraphs: [
            'به جای بارگذاری یک باندل سنگین SPA برای کل صفحه، بخش‌هایی مثل گالری نمونه‌کارهای قابل فیلتر، مودال جزئیات پروژه، لایت‌باکس تصاویر و فیلتر مقالات بلاگ به صورت جزایر React 18 و با client:idle هیدراته می‌شوند.',
            'پالت رنگ از طریق متغیرهای CSS (--color-paper، --color-ink، --color-accent) تعریف شده تا هر دو حالت روشن و تیره کنتراست استاندارد داشته باشند و رنگ بنفش تاکیدی دقیقاً با طیف ذرات سه‌بعدی هماهنگ بماند.',
          ],
          figure: {
            src: '/assets/aistudio/image_e6fb156a.png',
            alt: 'تصویر مرجع اصلی موج ذرات بنفش برای طراحی تم رنگی و شیدر سایت',
            caption:
              'تصویر ۲ — تصویر مرجع اصلی که مبنای پالت رنگی وب‌سایت و عمق میدان بوکه در شیدر ذرات Three.js قرار گرفت.',
          },
        },
        {
          heading: '۳. ذرات سه‌بعدی همگام با اسکرول، سئو و پایش سرعت',
          paragraphs: [
            'در پس‌زمینه، یک بوم WebGL با شیدر اختصاصی GLSL شکل ذرات را در هر بخش میان شش ساختار ریاضی مختلف تغییر می‌دهد و هنگام رسیدن به فوتر تیره، حالت ترکیبی ذرات را برای خوانایی بهتر معکوس می‌کند.',
            'در سمت سرور و انتشار روی Vercel، نقشه سایت XML شامل لینک‌های hreflang و تصاویر، داده‌های ساختاریافته Schema.org، هدرهای امنیتی CSP و پکیج‌های رسمی @vercel/analytics و @vercel/speed-insights برای تحلیل واقعی کاربران فعال شده‌اند.',
          ],
        },
      ],
      links: [
        {
          label: 'مخزن کد پورتفولیو در GitHub',
          description: 'مشاهده کد کامل Astro، React، TypeScript و Three.js همین وب‌سایت.',
          url: 'https://github.com/Adrianmix/My-Personal-Portfolio',
        },
        {
          label: 'مستندات رسمی Astro',
          description: 'آشنایی کامل با معماری جزیره‌ای و تولید صفحات استاتیک بدون JS اضافه.',
          url: 'https://docs.astro.build',
        },
        {
          label: 'مستندات Three.js',
          description: 'کار با صحنه‌های WebGL، هندسه‌های ذره‌ای و شیدرهای GLSL.',
          url: 'https://threejs.org/docs/',
        },
        {
          label: 'ابزارهای Speed Insights در Vercel',
          description: 'سنجش دقیق Core Web Vitals و تجربه واقعی کاربران.',
          url: 'https://vercel.com/docs/speed-insights',
        },
      ],
    },
  },
  {
    slug: 'introducing-astro-js',
    category: 'frameworks',
    publishedAt: '2026-11-22',
    readingMinutes: 5,
    coverImage: '/images/blog/astro-islands.jpg',
    en: {
      title: 'Introducing Astro.js: Zero-JS by Default for Content-First Websites',
      subtitle:
        'Why Astro has become my go-to framework for marketing sites, portfolios, and content platforms that need instant loads alongside modern UI components.',
      excerpt:
        'Learn how Astro’s Islands Architecture lets you author UI in React or vanilla components while shipping clean, zero-JavaScript HTML for everything static.',
      coverAlt:
        'Floating architectural paper planes and translucent violet prisms representing Astro Islands Architecture',
      coverCaption:
        'Fig. 1 — Independent interactive prisms resting on static paper surfaces echo Astro’s Islands model.',
      keyPoints: [
        'Ships zero client-side JavaScript by default for purely presentational markup.',
        'Supports UI islands from React, Vue, Svelte, or Solid side by side in the same project.',
        'Built-in file routing, TypeScript support, Markdown/MDX collections, and effortless static/hybrid adapters.',
      ],
      sections: [
        {
          heading: 'The Problem with Shipping Full SPAs for Content Websites',
          paragraphs: [
            'For years, front-end teams reached for single-page application frameworks even when building marketing landing pages, company websites, or portfolios. The trade-off is steep: visitors download tens or hundreds of kilobytes of framework runtime just to read static headlines and click plain links.',
            'Astro flips that default completely. It renders components ahead of time (at build time for static sites, or on-demand for SSR) and strips away unused JavaScript before the page ever hits the browser.',
          ],
        },
        {
          heading: 'How Islands Architecture Works in Practice',
          paragraphs: [
            'Instead of hydrating the entire document tree, Astro treats interactive widgets—like a project filter grid, audio stem player, or pricing calculator—as isolated “islands” surrounded by lightweight static HTML.',
            'You control exactly when an island hydrates using clean directives such as client:load for immediate controls, client:idle once the main thread settles, or client:visible only when the user scrolls to it. That model powered both this portfolio and production client prototypes like the modernized SPICO web platform.',
          ],
          codeSnippet: {
            title: 'Selective Hydration in an Astro Component',
            code: `---
import WorkGrid from './WorkGrid';
---
<section id="work">
  <h2>Selected Work</h2>
  <!-- Static heading ships 0 KB JS; only WorkGrid hydrates when idle -->
  <WorkGrid lang="en" client:idle />
</section>`,
          },
          figure: {
            src: '/images/Projects/spico-astro/1.png',
            alt: 'Screenshot of the SPICO Platform rebuilt with Astro.js, React, TypeScript, and Supabase',
            caption:
              'Fig. 2 — Live production prototype: SPICO company platform modernized with Astro.js, React islands, TypeScript, and Supabase.',
            linkUrl: 'https://spico-astro.vercel.app/',
            linkLabel: 'View SPICO Astro Live Demo',
          },
        },
        {
          heading: 'When Astro Is the Right Choice',
          paragraphs: [
            'Choose Astro whenever fast initial render, technical SEO, and clean content presentation matter most: portfolios, agency landing pages, documentation portals, blogs, and e-commerce storefronts.',
            'And if your site grows to need authenticated dashboards or database-backed forms later, Astro lets you connect APIs like Supabase or render interactive React islands without rewriting your entire architecture.',
          ],
        },
      ],
      links: [
        {
          label: 'Astro Official Website',
          description: 'Core overview, benchmarks, and ecosystem integrations.',
          url: 'https://astro.build',
        },
        {
          label: 'Astro Islands Architecture Guide',
          description: 'Deep dive into partial hydration and client directives.',
          url: 'https://docs.astro.build/en/concepts/islands/',
        },
        {
          label: 'SPICO Platform with Astro.js (Live Project)',
          description: 'Real full-stack company redesign built with Astro, React, and Supabase.',
          url: 'https://spico-astro.vercel.app/',
        },
        {
          label: 'TuneTactics Platform (Live Project)',
          description: 'Music collaboration platform built with Astro, React, TypeScript, and Three.js.',
          url: 'https://tunetactics.ir',
        },
      ],
    },
    fa: {
      title: 'معرفی Astro.js: ساخت وب‌سایت‌های فوق‌سریع با معماری جزیره‌ای',
      subtitle:
        'چرا Astro برای طراحی لندینگ‌پیج‌ها، پورتفولیوها و وب‌سایت‌های شرکتی که به سرعت بالا و سئوی قوی نیاز دارند، بهترین انتخاب است.',
      excerpt:
        'آشنایی با معماری جزیره‌ای (Islands Architecture) در Astro و نحوه ترکیب HTML سبک و بدون جاوااسکریپت اضافه با کامپوننت‌های تعاملی React.',
      coverAlt:
        'صفحات کاغذی معلق و منشورهای شیشه‌ای بنفش به عنوان نماد معماری جزیره‌ای Astro',
      coverCaption:
        'تصویر ۱ — اجزای مستقل و تعاملی روی بستر کاملاً سبک و استاتیک، الگوی اصلی معماری جزیره‌ای Astro است.',
      keyPoints: [
        'به‌صورت پیش‌فرض هیچ جاوااسکریپت اضافه‌ای برای بخش‌های ثابت صفحه به مرورگر ارسال نمی‌کند.',
        'امکان استفاده از کامپوننت‌های React، Vue یا Svelte به‌صورت هم‌زمان و انتخابی در یک پروژه.',
        'ساختار روتینگ فایل‌محور، پشتیبانی داخلی از TypeScript و خروجی آماده برای سئو و CDN.',
      ],
      sections: [
        {
          heading: 'مشکل ارسال SPAهای سنگین برای سایت‌های محتوایی',
          paragraphs: [
            'سال‌هاست بسیاری از تیم‌ها حتی برای یک صفحه معرفی یا وب‌سایت شرکتی، کل صفحه را با فریم‌ورک‌های تک‌صفحه‌ای (SPA) رندر می‌کنند. نتیجه این کار دانلود ده‌ها کیلوبایت کد جاوااسکریپت برای نمایش متون و تصاویری است که اصلاً نیازی به منطق سمت کاربر ندارند.',
            'Astro این معادله را برعکس می‌کند: تمام ساختار صفحه در زمان بیلد (یا در سرور) به HTML تمیز تبدیل می‌شود و جاوااسکریپت فقط جایی وارد می‌شود که واقعاً تعامل لازم باشد.',
          ],
        },
        {
          heading: 'معماری جزیره‌ای (Islands Architecture) چطور کار می‌کند؟',
          paragraphs: [
            'در Astro می‌توانید تمام تیترها، متون و بخش‌های معرفی را به عنوان HTML خالص نگه دارید و فقط بخش‌هایی مثل گالری قابل فیلتر، پخش‌کننده صوتی یا فرم‌ها را با دستورهایی مثل client:idle یا client:visible به مرورگر بسپارید.',
            'همین معماری در بازطراحی وب‌سایت شرکت صنایع پمپ سعدی (اسپیکو) و همچنین پلتفرم TuneTactics به کار رفته و باعث افت چشمگیر زمان لود اولیه شده است.',
          ],
          codeSnippet: {
            title: 'هیدراته کردن انتخابی کامپوننت React داخل Astro',
            code: `---
import WorkGrid from './WorkGrid';
---
<section id="work">
  <h2>نمونه‌کارهای منتخب</h2>
  <!-- تیتر بدون JS ارسال می‌شود و فقط گالری در زمان بیکاری مرورگر فعال می‌گردد -->
  <WorkGrid lang="fa" client:idle />
</section>`,
          },
          figure: {
            src: '/images/Projects/spico-astro/1.png',
            alt: 'پیش‌نمایش پلتفرم وب اسپیکو ساخته شده با Astro.js و React',
            caption:
              'تصویر ۲ — نمونه عملی بازطراحی وب‌سایت شرکت صنایع پمپ سعدی (SPICO) با Astro.js، React، TypeScript و Supabase.',
            linkUrl: 'https://spico-astro.vercel.app/',
            linkLabel: 'مشاهده دمو زنده اسپیکو با Astro',
          },
        },
        {
          heading: 'چه زمانی Astro بهترین انتخاب است؟',
          paragraphs: [
            'هر زمان که سرعت باز شدن صفحه، امتیاز Core Web Vitals، سئوی فنی و تجربه کاربری بی‌نقص در موبایل اولویت اول باشد—مثل وب‌سایت‌های شرکتی، پورتفولیوها، وبلاگ‌ها و صفحات فرود تبلیغاتی—Astro برتری محسوسی دارد.',
          ],
        },
      ],
      links: [
        {
          label: 'وب‌سایت رسمی Astro',
          description: 'معرفی کامل ویژگی‌ها، قالب‌ها و مستندات شروع سریع.',
          url: 'https://astro.build',
        },
        {
          label: 'مستندات معماری جزیره‌ای Astro',
          description: 'توضیح دقیق Partial Hydration و دایرکتیوهای client.',
          url: 'https://docs.astro.build/en/concepts/islands/',
        },
        {
          label: 'پروژه زنده اسپیکو با Astro.js',
          description: 'نمونه واقعی بازطراحی وب‌سایت صنعتی با Astro، React و Supabase.',
          url: 'https://spico-astro.vercel.app/',
        },
        {
          label: 'پلتفرم TuneTactics',
          description: 'اپلیکیشن پیش‌ثبت‌نام موسیقی با Astro، React و Three.js.',
          url: 'https://tunetactics.ir',
        },
      ],
    },
  },
  {
    slug: 'introducing-typescript',
    category: 'frameworks',
    publishedAt: '2026-11-18',
    readingMinutes: 5,
    coverImage: '/images/blog/typescript-safety.jpg',
    en: {
      title: 'Introducing TypeScript: Confident Front-End Engineering Without Guesswork',
      subtitle:
        'How static types turn subtle runtime bugs into instant editor feedback—and why every modern React and Astro codebase benefits from strict typing.',
      excerpt:
        'Explore the practical value of TypeScript beyond buzzwords: typed data contracts, safe refactoring, autocompletion, and cleaner bilingual UI state.',
      coverAlt:
        'Precision interlocked brushed aluminum geometric blocks with a violet anodized accent piece and drafting ruler',
      coverCaption:
        'Fig. 1 — Interlocking blocks represent strict type contracts that fit together deterministically before code runs.',
      keyPoints: [
        'Catches typos, missing fields, and null/undefined edge cases at compile time rather than in production.',
        'Makes cross-file refactoring effortless across shared data models, React props, and utility modules.',
        'Powers accurate IDE autocomplete and self-documenting component APIs with zero runtime size cost.',
      ],
      sections: [
        {
          heading: 'What TypeScript Actually Adds to JavaScript',
          paragraphs: [
            'JavaScript runs everywhere, but its dynamic nature means a renamed property or unexpected undefined field often stays silent until a real user clicks a specific modal or filter path.',
            'TypeScript is a strongly typed superset of JavaScript that checks shapes, contracts, and edge cases during development and build time—and then compiles cleanly away into standard JavaScript with zero runtime overhead.',
          ],
        },
        {
          heading: 'Real Impact in Component Props & Data Models',
          paragraphs: [
            'In multi-language sites or interactive tools like QR Code Studio and this portfolio, TypeScript guarantees that every English entry matches its Persian counterpart, every gallery modal handles missing screenshots safely, and URL sanitizers only accept valid links.',
            'Even better, once pure logic is typed cleanly inside utility modules (such as SEO schema generators, gallery navigation, or particle math), automated Node tests verify edge cases cleanly without spinning up a browser.',
          ],
          codeSnippet: {
            title: 'Enforcing Strict Parity Across Languages & Filters',
            code: `export type ProjectType = 'app' | 'web' | 'visual';
export type ProjectFilter = 'all' | 'web' | 'visual';

export function filterProjects<T extends { type: ProjectType }>(
  projects: readonly T[],
  filter: ProjectFilter,
): T[] {
  if (filter === 'all') return [...projects];
  return filter === 'web'
    ? projects.filter((p) => p.type === 'web' || p.type === 'app')
    : projects.filter((p) => p.type === 'visual');
}`,
          },
          figure: {
            src: '/images/Projects/Qr-Studio/1.png',
            alt: 'QR Code Studio built with React, Vite, TypeScript, and Tailwind CSS',
            caption:
              'Fig. 2 — QR Code Studio uses strict TypeScript interfaces to coordinate QR payload formats, frame styles, and SVG/PNG/PDF exports.',
            linkUrl: 'https://qr-studio-mu-five.vercel.app/',
            linkLabel: 'Open QR Code Studio',
          },
        },
        {
          heading: 'Adopting TypeScript Pragmatically',
          paragraphs: [
            'Good TypeScript stays practical: avoid fighting over-engineered generic types and instead model real domain states—unions for UI modes, strict types at API boundaries, and explicit return types on shared helpers. The payoff shows up every time you revisit a project six months later.',
          ],
        },
      ],
      links: [
        {
          label: 'TypeScript Official Documentation',
          description: 'Handbook, type narrowing guides, and interactive playground.',
          url: 'https://www.typescriptlang.org/docs/',
        },
        {
          label: 'React + TypeScript Cheatsheet',
          description: 'Practical patterns for typing hooks, events, and component props.',
          url: 'https://react-typescript-cheatsheet.netlify.app/',
        },
        {
          label: 'QR Code Studio (Live TypeScript Project)',
          description: 'Production QR customization app engineered with React and TypeScript.',
          url: 'https://qr-studio-mu-five.vercel.app/',
        },
      ],
    },
    fa: {
      title: 'معرفی TypeScript: کدنویسی ایمن‌تر و معماری دقیق در فرانت‌اند',
      subtitle:
        'چطور تایپ‌گذاری استاتیک خطاهای پنهان زمان اجرا را پیش از انتشار متوقف می‌کند و نگهداری پروژه‌های React و Astro را ساده می‌سازد.',
      excerpt:
        'نگاهی کاربردی به مزایای واقعی TypeScript در پروژه‌های مدرن: قراردادهای دقیق داده، ریفکتور بدون استرس، تکمیل خودکار کد و جلوگیری از باگ‌های undefined.',
      coverAlt:
        'قطعات آلومینیومی دقیق و چفت‌شده با یک بلوک بنفش و خط‌کش مهندسی به عنوان نماد دقت تایپ‌ها در TypeScript',
      coverCaption:
        'تصویر ۱ — ساختار دقیق تایپ‌ها باعث می‌شود تمام اجزای پروژه پیش از اجرا با نظم و اطمینان به هم متصل شوند.',
      keyPoints: [
        'کشف خطاهای املایی، فیلدهای جاافتاده و مقادیر null پیش از رسیدن به مرورگر کاربر.',
        'تغییر نام و بازطراحی ایمن ساختارهای داده در ده‌ها فایل بدون نگرانی از شکستن بخش‌های دیگر.',
        'تبدیل شدن کامل به جاوااسکریپت استاندارد در زمان بیلد بدون هیچ سربار حجمی در مرورگر.',
      ],
      sections: [
        {
          heading: 'TypeScript دقیقاً چه چیزی به جاوااسکریپت اضافه می‌کند؟',
          paragraphs: [
            'انعطاف‌پذیری جاوااسکریپت در پروژه‌های کوچک مزیت است، اما با بزرگ شدن کدبیس، تغییر نام یک پراپرتی یا فراموش کردن یک حالت خالی به راحتی می‌تواند منجر به خطای زمان اجرا شود.',
            'TypeScript یک لایه تایپ استاتیک روی جاوااسکریپت قرار می‌دهد تا ساختار داده‌ها و ورودی-خروجی توابع در زمان توسعه بررسی شوند و در نهایت کد خروجی کاملاً به جاوااسکریپت تمیز کامپایل شود.',
          ],
        },
        {
          heading: 'تاثیر واقعی در کامپوننت‌ها و پروژه‌های دوزبانه',
          paragraphs: [
            'در پروژه‌هایی مثل استودیو ساخت کد QR یا همین پورتفولیو دوزبانه، TypeScript تضمین می‌کند نسخه فارسی و انگلیسی دقیقاً ساختار یکسانی داشته باشند، فیلتر دسته‌بندی‌ها خطا ندهد و خروجی URLها امن بماند.',
          ],
          codeSnippet: {
            title: 'محدود کردن تایپ فیلترها و پروژه‌ها در TypeScript',
            code: `export type ProjectType = 'app' | 'web' | 'visual';
export type ProjectFilter = 'all' | 'web' | 'visual';

export function filterProjects<T extends { type: ProjectType }>(
  projects: readonly T[],
  filter: ProjectFilter,
): T[] {
  if (filter === 'all') return [...projects];
  return filter === 'web'
    ? projects.filter((p) => p.type === 'web' || p.type === 'app')
    : projects.filter((p) => p.type === 'visual');
}`,
          },
          figure: {
            src: '/images/Projects/Qr-Studio/1.png',
            alt: 'پیش‌نمایش اپلیکیشن استودیو ساخت کد QR با React و TypeScript',
            caption:
              'تصویر ۲ — اپلیکیشن QR Code Studio که با React و TypeScript برای مدیریت انواع فرمت QR و خروجی وکتور پیاده‌سازی شده است.',
            linkUrl: 'https://qr-studio-mu-five.vercel.app/',
            linkLabel: 'مشاهده استودیو کد QR',
          },
        },
        {
          heading: 'استفاده هوشمندانه و بدون پیچیدگی اضافه',
          paragraphs: [
            'کلید موفقیت با TypeScript سادگی است: به جای پیچیده کردن تایپ‌ها، وضعیت‌های واقعی رابط کاربری را با Union Typeها و اینترفیس‌های خوانا مدل‌سازی کنید تا ماه‌ها بعد هم توسعه پروژه به آسانی روز اول باشد.',
          ],
        },
      ],
      links: [
        {
          label: 'مستندات رسمی TypeScript',
          description: 'مرجع جامع زبان، کتاب راهنما و محیط تمرین آنلاین.',
          url: 'https://www.typescriptlang.org/docs/',
        },
        {
          label: 'راهنمای React + TypeScript',
          description: 'الگوهای استاندارد تایپ‌گذاری برای هوک‌ها، رویدادها و کامپوننت‌ها.',
          url: 'https://react-typescript-cheatsheet.netlify.app/',
        },
        {
          label: 'استودیو ساخت کد QR (پروژه زنده)',
          description: 'نمونه واقعی اپلیکیشن ساخته‌شده با React و TypeScript.',
          url: 'https://qr-studio-mu-five.vercel.app/',
        },
      ],
    },
  },
  {
    slug: 'introducing-wordpress',
    category: 'architecture',
    publishedAt: '2026-11-12',
    readingMinutes: 5,
    coverImage: '/images/blog/wordpress-cms.jpg',
    en: {
      title: 'Introducing WordPress: When a CMS Still Wins in Production',
      subtitle:
        'Despite newer JavaScript frameworks, WordPress still powers over 40% of the web for good reason—especially when teams need fast publishing and WooCommerce.',
      excerpt:
        'An honest developer perspective on when WordPress + Elementor shines, how to keep it fast and SEO-clean, and when headless WordPress makes sense.',
      coverAlt:
        'Editorial flatlay of heavyweight matte grid sheets, ceramic inkwell, and a violet ribbon marker on stone',
      coverCaption:
        'Fig. 1 — Structured editorial publishing remains WordPress’s greatest strength for teams managing live content.',
      keyPoints: [
        'Empower non-technical teams to publish articles, landing pages, and product catalogs independently.',
        'Mature WooCommerce and SEO tooling (Yoast SEO, Rank Math, Search Console integration) speed up time to market.',
        'Performance stays crisp when paired with lean themes, image optimization, and proper page caching.',
      ],
      sections: [
        {
          heading: 'Why WordPress Has Stayed Relevant for Over Two Decades',
          paragraphs: [
            'As a front-end developer who loves Astro and React, I never dismiss WordPress. Different businesses have different bottlenecks. When a marketing team wants to launch campaign pages every week or update industrial pump catalogs without waiting on a developer pull request, WordPress shines.',
            'Its admin dashboard, revision history, user roles, and media library solve real business operations out of the box—saving weeks of custom backend development.',
          ],
        },
        {
          heading: 'Performance, Elementor & On-Page SEO Discipline',
          paragraphs: [
            'WordPress earns a bad reputation for speed only when sites are overloaded with dozens of heavy plugins and uncompressed assets. With clean typography hierarchies, selective Elementor containers, WebP/AVIF media, and server-level caching, WordPress landing pages score high and rank strongly on Google.',
            'In commercial projects like Mentraic and DAB Italia’s showcase portal on SPICO, structured headings, clean schema, and mobile-first spacing directly improved campaign clarity and search visibility.',
          ],
          figure: {
            src: '/images/Projects/mentraic/1.png',
            alt: 'Mentraic AI tools landing page designed with WordPress and Elementor',
            caption:
              'Fig. 2 — Mentraic landing page & brand identity designed and launched on WordPress + Elementor.',
            linkUrl: 'https://mentraic.com/',
            linkLabel: 'Visit Mentraic Live Site',
          },
        },
        {
          heading: 'Traditional vs. Headless WordPress',
          paragraphs: [
            'For standard corporate websites, WooCommerce stores, and editorial blogs, classic WordPress with lightweight caching is cost-effective and straightforward. For brands demanding bespoke front-end animations or ultra-fast static delivery, WordPress can also act purely as a headless CMS feeding JSON/GraphQL content directly into Astro or React.',
          ],
        },
      ],
      links: [
        {
          label: 'WordPress.org Official Platform',
          description: 'Core software, theme directory, and block editor ecosystem.',
          url: 'https://wordpress.org',
        },
        {
          label: 'WordPress Developer Resources',
          description: 'REST API, custom post types, and headless architecture docs.',
          url: 'https://developer.wordpress.org',
        },
        {
          label: 'Mentraic Landing Page (Live WordPress Site)',
          description: 'Conversion landing page crafted with WordPress and Elementor.',
          url: 'https://mentraic.com/',
        },
      ],
    },
    fa: {
      title: 'معرفی وردپرس (WordPress): چرا همچنان انتخاب اول بسیاری از کسب‌وکارهاست؟',
      subtitle:
        'نگاهی واقع‌بینانه از دید یک توسعه‌دهنده فرانت‌اند به نقاط قوت وردپرس، المنتور و سئو و زمان مناسب استفاده از وردپرس سنتی یا هدلس.',
      excerpt:
        'چرا با وجود فریم‌ورک‌های مدرن، وردپرس همچنان بخش بزرگی از وب را می‌گرداند و چطور با بهینه‌سازی اصولی می‌توان سایت‌های وردپرسی سریع و سئومحور ساخت.',
      coverAlt:
        'برگه‌های چاپی گریدبندی شده، دوات سرامیکی و روبان بنفش روی میز سنگی به عنوان نماد نشر و مدیریت محتوا در وردپرس',
      coverCaption:
        'تصویر ۱ — آزادی عمل در نشر سریع محتوا و مدیریت مستقل توسط تیم‌ها، برگ برنده همیشگی وردپرس است.',
      keyPoints: [
        'امکان انتشار صفحات فرود، مقالات و کاتالوگ محصولات توسط تیم محتوا بدون نیاز به کدنویسی مجدد.',
        'اکوسیستم بالغ ووکامرس و ابزارهای سئو مانند Yoast SEO و اتصال به Search Console.',
        'با قالب سبک، فشرده‌سازی تصاویر و کش صحیح، صفحات وردپرسی سرعت و رتبه بالایی می‌گیرند.',
      ],
      sections: [
        {
          heading: 'چرا وردپرس پس از دو دهه هنوز قدرتمند است؟',
          paragraphs: [
            'به‌عنوان توسعه‌دهنده‌ای که با Astro و React کار می‌کند، ارزش واقعی وردپرس را در نیازهای عملی کسب‌وکارها می‌بینم. وقتی یک شرکت صنعتی یا استارتاپ باید هر هفته صفحه تبلیغاتی جدید بسازد یا محصولات خود را به‌روزرسانی کند، انتظار برای تغییرات کد منطقی نیست.',
            'پیشخوان مدیریت، سطوح دسترسی، کتابخانه رسانه و تاریخچه ویرایش‌ها در وردپرس بدون نیاز به نوشتن بک‌اند اختصاصی آماده استفاده هستند.',
          ],
        },
        {
          heading: 'سرعت، المنتور و انضباط سئوی داخلی',
          paragraphs: [
            'افت سرعت در وردپرس معمولاً نتیجه نصب افزونه‌های غیرضروری و تصاویر سنگین است. با چیدمان استاندارد در Elementor، سلسله‌مراتب درست تگ‌های H1 تا H3 و بهینه‌سازی تصاویر، سایت‌های وردپرسی کاملاً روان و ریسپانسیو اجرا می‌شوند.',
            'در پروژه‌هایی مثل لندینگ‌پیج Mentraic و صفحه نمایندگی DAB ایتالیا در اسپیکو، تمرکز بر سرعت بارگذاری و ساختار سئوی داخلی نقش مستقیمی در دیده شدن صفحات داشت.',
          ],
          figure: {
            src: '/images/Projects/mentraic/1.png',
            alt: 'پیش‌نمایش لندینگ پیج Mentraic طراحی‌شده با وردپرس و المنتور',
            caption:
              'تصویر ۲ — طراحی لندینگ‌پیج و هویت بصری Mentraic با وردپرس و صفحه‌ساز Elementor.',
            linkUrl: 'https://mentraic.com/',
            linkLabel: 'مشاهده سایت Mentraic',
          },
        },
        {
          heading: 'وردپرس کلاسیک یا Headless WordPress؟',
          paragraphs: [
            'برای اغلب سایت‌های شرکتی و فروشگاهی ووکامرس، وردپرس استاندارد با کش مناسب اقتصادی‌ترین و سریع‌ترین مسیر است. اما اگر برند به انیمیشن‌های خاص یا سرعت استاتیک نیاز داشته باشد، می‌توان از وردپرس به‌عنوان CMS هدلس در کنار Astro یا React استفاده کرد.',
          ],
        },
      ],
      links: [
        {
          label: 'سایت رسمی WordPress.org',
          description: 'مرجع اصلی هسته وردپرس، پوسته‌ها و افزونه‌ها.',
          url: 'https://wordpress.org',
        },
        {
          label: 'مستندات توسعه‌دهندگان وردپرس',
          description: 'راهنمای REST API و استفاده از وردپرس به‌صورت Headless.',
          url: 'https://developer.wordpress.org',
        },
        {
          label: 'پروژه زنده Mentraic',
          description: 'نمونه واقعی لندینگ پیج طراحی‌شده با وردپرس و المنتور.',
          url: 'https://mentraic.com/',
        },
      ],
    },
  },
  {
    slug: 'static-sites-and-generators',
    category: 'architecture',
    publishedAt: '2026-11-05',
    readingMinutes: 5,
    coverImage: '/images/blog/static-generators.jpg',
    en: {
      title: 'Static Sites & Static Site Generators (SSG): Speed, Security, and Scale',
      subtitle:
        'Understanding how pre-rendered HTML compares to dynamic servers—and why modern SSGs remain the fastest architecture on the web.',
      excerpt:
        'What static websites are, how Static Site Generators like Astro, Hugo, and Next.js compile content ahead of time, and why CDNs deliver them in milliseconds.',
      coverAlt:
        'Isometric neatly ordered rows of matte white ceramic tiles and frosted glass plates with one luminous violet layer',
      coverCaption:
        'Fig. 1 — Pre-built static pages sit ready at the CDN edge before a visitor even clicks a link.',
      keyPoints: [
        'Static files are built once during deployment and served directly from global CDN edge caches.',
        'Eliminating database queries on page load lowers Time to First Byte (TTFB) and cuts server attack surfaces.',
        'Modern SSGs pair static speed with TypeScript, component reusability, and dynamic client/API islands where needed.',
      ],
      sections: [
        {
          heading: 'What Is a Static Site—and What Does an SSG Do?',
          paragraphs: [
            'A static website consists of plain HTML, CSS, JavaScript, and media files that look the same when served from storage without running database queries for every single visitor.',
            'Hand-writing hundreds of HTML pages doesn’t scale, which is where Static Site Generators (SSGs) step in. Tools like Astro, Next.js static export, Hugo, and Eleventy read templates, Markdown files, or API data during your build step and compile every route into optimized static files ready for instant delivery.',
          ],
        },
        {
          heading: 'Why Pre-Rendering Beats Database Trips on Every Visit',
          paragraphs: [
            'In traditional dynamic stacks, every page visit triggers PHP or Node execution, database queries, and template rendering before a single byte of HTML leaves the server. Under sudden traffic spikes, that origin server becomes a bottleneck.',
            'With SSG deployed to Vercel or Netlify, your compiled pages are replicated across global edge nodes. Every visitor receives cached HTML in tens of milliseconds, search crawlers index clean markup effortlessly, and there is no live database login surface exposed to automated scanners.',
          ],
          figure: {
            src: '/images/Projects/tunetactics/1.png',
            alt: 'TuneTactics platform hero showcasing crisp pre-rendered UI paired with interactive islands',
            caption:
              'Fig. 2 — TuneTactics pairs pre-rendered Astro HTML with interactive React and Three.js islands and a lightweight waitlist backend.',
            linkUrl: 'https://tunetactics.ir/',
            linkLabel: 'Explore TuneTactics Live',
          },
        },
        {
          heading: 'Static Does Not Mean "Uninteractive"',
          paragraphs: [
            'A common misconception is that static sites can’t handle forms, search, analytics, or user interaction. In reality, static pages routinely power interactive web apps by hydrating focused client islands, calling serverless endpoints, or connecting services like Supabase when dynamic actions happen.',
          ],
        },
      ],
      links: [
        {
          label: 'Jamstack Static Site Generators Directory',
          description: 'Comprehensive overview of modern SSGs and build tooling.',
          url: 'https://jamstack.org/generators/',
        },
        {
          label: 'Vercel Edge Network & Caching Docs',
          description: 'How global static caching delivers sub-second Time to First Byte.',
          url: 'https://vercel.com/docs/edge-network/caching',
        },
        {
          label: 'TuneTactics (Live Hybrid Static Site)',
          description: 'Fast pre-rendered experience paired with interactive React & Three.js islands.',
          url: 'https://tunetactics.ir/',
        },
      ],
    },
    fa: {
      title: 'سایت استاتیک و مولدهای سایت استاتیک (SSG): سرعت، امنیت و مقیاس‌پذیری',
      subtitle:
        'تفاوت واقعی صفحات پیش‌ساخته با سرورهای داینامیک چیست و چرا مولدهای مدرن سایت استاتیک سریع‌ترین معماری وب هستند؟',
      excerpt:
        'آشنایی ساده و دقیق با مفهوم وب‌سایت استاتیک، عملکرد Static Site Generatorهایی مثل Astro و Next.js و مزایای استقرار روی شبکه‌های لبه (CDN).',
      coverAlt:
        'ردیف‌های منظم صفحات سرامیکی سفید مات و شیشه‌های مات با یک لایه بنفش که نماد صفحات پیش‌ساخته استاتیک هستند',
      coverCaption:
        'تصویر ۱ — صفحات استاتیک پیش از کلیک کاربر ساخته شده‌اند و آماده تحویل فوری از نزدیک‌ترین سرور CDN هستند.',
      keyPoints: [
        'فایل‌های سایت یک‌بار در زمان بیلد تولید می‌شوند و مستقیم از حافظه کش CDN تحویل داده می‌شوند.',
        'حذف کوئری‌های تکراری دیتابیس باعث کاهش شدید TTFB و افزایش امنیت وب‌سایت می‌شود.',
        'استاتیک بودن به معنی نبود تعامل نیست؛ بخش‌های پویا از طریق جزایر JS و APIها متصل می‌شوند.',
      ],
      sections: [
        {
          heading: 'سایت استاتیک چیست و مولد سایت استاتیک (SSG) چه کاری انجام می‌دهد؟',
          paragraphs: [
            'وب‌سایت استاتیک مجموعه‌ای از فایل‌های آماده HTML، CSS، جاوااسکریپت و تصاویر است که بدون نیاز به پردازش در لحظه روی سرور یا اجرای کوئری دیتابیس، مستقیماً به مرورگر کاربر ارسال می‌شود.',
            'نوشتن دستی ده‌ها صفحه HTML عملاً غیرممکن است؛ بنابراین ابزارهایی به نام SSG (مانند Astro، Hugo، Eleventy و خروجی استاتیک Next.js) قالب‌ها، کامپوننت‌ها و داده‌ها را در مرحله Build ترکیب کرده و کل وب‌سایت را به فایل‌های آماده و بهینه تبدیل می‌کنند.',
          ],
        },
        {
          heading: 'چرا صفحات پیش‌ساخته سریع‌تر و امن‌ترند؟',
          paragraphs: [
            'در سایت‌های کاملاً داینامیک، هر بار باز کردن صفحه مستلزم اجرای کد در سرور و ارتباط با پایگاه داده است. در مقابل، خروجی یک SSG روی پلتفرم‌هایی مثل Vercel یا Netlify در ده‌ها نقطه جغرافیایی کش می‌شود.',
            'نتیجه این معماری زمان پاسخ‌گویی چند ده‌میلی‌ثانیه‌ای، پایداری بالا در برابر افزایش ناگهانی ترافیک، ایندکس سریع‌تر توسط گوگل و سطح حمله امنیتی بسیار پایین‌تر است.',
          ],
          figure: {
            src: '/images/Projects/tunetactics/1.png',
            alt: 'پیش‌نمایش پلتفرم TuneTactics با لود استاتیک سریع و کامپوننت‌های تعاملی',
            caption:
              'تصویر ۲ — پلتفرم TuneTactics نمونه‌ای از ترکیب صفحات پیش‌رندرشده سریع با المان‌های تعاملی React و Three.js است.',
            linkUrl: 'https://tunetactics.ir/',
            linkLabel: 'مشاهده سایت TuneTactics',
          },
        },
        {
          heading: 'آیا سایت استاتیک می‌تواند امکانات پویا داشته باشد؟',
          paragraphs: [
            'بله؛ این تصور که سایت استاتیک صرفاً بروشور ساده است قدیمی شده. یک سایت استاتیک مدرن می‌تواند دارای فیلترهای تعاملی، فرم‌های متصل به بک‌اند، احراز هویت و حتی پایگاه داده ابری مثل Supabase باشد، در حالی که بدنه اصلی سایت همچنان با حداکثر سرعت از کش CDN لود می‌شود.',
          ],
        },
      ],
      links: [
        {
          label: 'دایرکتوری SSG در Jamstack',
          description: 'فهرست و مقایسه مولدهای مدرن سایت استاتیک.',
          url: 'https://jamstack.org/generators/',
        },
        {
          label: 'مستندات کش لبه در Vercel',
          description: 'نحوه تحویل فایل‌های استاتیک از شبکه توزیع محتوای جهانی.',
          url: 'https://vercel.com/docs/edge-network/caching',
        },
        {
          label: 'پروژه زنده TuneTactics',
          description: 'ترکیب صفحات سریع Astro با قابلیت‌های تعاملی فرانت‌اند.',
          url: 'https://tunetactics.ir/',
        },
      ],
    },
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function localizeBlogPosts(lang: Lang) {
  return blogPosts.map((post) => ({
    slug: post.slug,
    category: post.category,
    publishedAt: post.publishedAt,
    readingMinutes: post.readingMinutes,
    featured: post.featured ?? false,
    coverImage: post.coverImage,
    ...post[lang],
  }));
}
