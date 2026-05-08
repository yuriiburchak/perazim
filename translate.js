const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// A mapping of original english strings to their translation keys and UA translations
const dict = [
  // Portfolio 1
  ['EdTech · Online Course Platform', 'p-1-type', 'EdTech · Платформа онлайн-курсів'],
  ['Full-Stack Online Learning Platform', 'p-1-title', 'Повноцінна платформа для онлайн-навчання'],
  ['Built a complete online course infrastructure: adaptive landing page, Telegram bot as the learning platform (lessons, homework, progress tracking), CRM integration for student management, and automated Stripe payment notifications via webhooks. Students enroll, pay, and complete the course — all without a single manual step.', 'p-1-desc', 'Створили повну інфраструктуру для онлайн-курсів: адаптивний лендінг, Telegram-бот як навчальна платформа (уроки, домашки, трекінг прогресу), інтеграція з CRM для управління студентами та автоматизовані сповіщення про платежі Stripe через вебхуки. Студенти реєструються, платять і проходять курс — повністю автоматично.'],
  ['<span>⚡</span> 100% automated enrollment → payment → content delivery pipeline', 'p-1-res', '<span>⚡</span> 100% автоматизована воронка реєстрації → оплати → доставки контенту'],
  ['Web + Bot + CRM', 'p-1-b1', 'Веб + Бот + CRM'],
  ['7 days from scratch to launch', 'p-1-b2', '7 днів від ідеї до запуску'],

  // Portfolio 2
  ['SaaS · Link-in-Bio Builder', 'p-2-type', 'SaaS · Конструктор мультипосилань'],
  ['Passlink — Mobile Landing Page Builder', 'p-2-title', 'Passlink — Конструктор мобільних лендінгів'],
  ['Designed and built a full SaaS platform from zero. Users create branded mobile landing pages with custom links, social profiles, and CTAs. Includes subscription billing via Stripe, webhook-based Telegram notifications for payments and signups, and a full admin dashboard. Delivered end-to-end: UI/UX design, development, payments, infrastructure.', 'p-2-desc', 'Спроектували та розробили повноцінну SaaS-платформу з нуля. Користувачі створюють брендовані мобільні лендінги з кастомними посиланнями, соцмережами та CTA. Включає підписки через Stripe, сповіщення в Telegram про платежі та реєстрації, а також повноцінну адмін-панель. Зроблено під ключ: UI/UX, розробка, платежі, інфраструктура.'],
  ['<span>🚀</span> Full SaaS product delivered in 6 weeks · monetization-ready from day one', 'p-2-res', '<span>🚀</span> Повноцінний SaaS продукт за 6 тижнів · готовий до монетизації з першого дня'],
  ['SaaS Platform', 'p-2-b1', 'SaaS Платформа'],
  ['AI automated from day 1', 'p-2-b2', 'ШІ автоматизація з першого дня'],

  // Portfolio 3
  ['FinTech · Online Currency Exchange', 'p-3-type', 'FinTech · Онлайн-обмін валют'],
  ['ClickPay — Platform + Telegram Mini App', 'p-3-title', 'ClickPay — Платформа + Telegram Mini App'],
  ['Built a complete online exchange service with a responsive website, custom copywriting, and a full Telegram ecosystem. The Telegram Mini App mirrors all website functionality — users check live rates, submit exchange requests, and complete transactions without leaving Telegram. The bot handles the full exchange flow: rate display, order creation, status updates, and admin notifications. Website and Telegram are fully synced in real time.', 'p-3-desc', 'Створили повноцінний сервіс онлайн-обміну з адаптивним сайтом, копірайтингом та екосистемою в Telegram. Telegram Mini App дублює весь функціонал сайту — користувачі перевіряють курси, створюють заявки та завершують транзакції прямо в месенджері. Бот обробляє весь процес обміну: курси, створення ордерів, статуси та сповіщення адмінам. Сайт і Telegram синхронізовані в реальному часі.'],
  ['<span>💱</span> Full website experience replicated inside Telegram — zero friction, maximum reach', 'p-3-res', '<span>💱</span> Повний функціонал сайту відтворено в Telegram — нуль тертя, максимальне охоплення'],
  ['Web + TMA + Bot', 'p-3-b1', 'Веб + TMA + Бот'],
  ['10,000+ transactions', 'p-3-b2', '10,000+ транзакцій'],

  // Pricing
  ['From $800 · $49/mo maintenance', 'srv-pr-1', 'Від $800 · $49/міс підтримка'],
  ['From $2,500 · $149/mo maintenance', 'srv-pr-2', 'Від $2,500 · $149/міс підтримка'],
  ['From $700 · $49/mo maintenance', 'srv-pr-3', 'Від $700 · $49/міс підтримка'],
  ['From $1,000 · $79/mo maintenance', 'srv-pr-4', 'Від $1,000 · $79/міс підтримка'],
  ['From $600 · $49/mo maintenance', 'srv-pr-5', 'Від $600 · $49/міс підтримка'],
  ['From $450 · $49/mo maintenance', 'srv-pr-6', 'Від $450 · $49/міс підтримка'],
  ['From $500 · $49/mo maintenance', 'srv-pr-7', 'Від $500 · $49/міс підтримка'],
  ['From $100/art · $500/mo retainer', 'srv-pr-8', 'Від $100/стаття · $500/міс супровід'],
  ['Custom quote — let\'s talk', 'srv-pr-9', 'Кастомна оцінка — давайте обговоримо'],
];

let enDict = {};
let uaDict = {};

dict.forEach(([en, key, ua]) => {
  // Add data-i18n to exact matches in html
  // Find <tag class="...">EN text</tag> and add data-i18n
  const regex = new RegExp(`(<[^>]+)>(${en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})<`, 'g');
  if (html.match(regex)) {
    html = html.replace(regex, `$1 data-i18n="${key}">$2<`);
  } else {
    // try matching without wrapping tags, just the string inside
    const regex2 = new RegExp(`>(\\s*${en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*)<`, 'g');
    html = html.replace(regex2, ` data-i18n="${key}">$1<`);
  }
  
  // also specifically for p-result-callout which has inner span
  if(en.includes('<span>⚡</span>')) {
     html = html.replace(en, `<span data-i18n="${key}">${en}</span>`); // just a hack for now, actually better to just replace the whole content
  }

  enDict[key] = en;
  uaDict[key] = ua;
});

// For badges and tags, they are simple spans
const tags = [
  "Custom Design", "CMS Integration", "Performance", "Web Apps", "SaaS MVP", "Dashboards",
  "Make / Zapier", "API Connections", "Workflows", "AI Chatbot", "Telegram Bot", "Booking & Payments",
  "HubSpot", "Airtable", "Lead Scoring", "Stripe", "Subscriptions", "Webhooks",
  "UI/UX", "Brand Identity", "Figma", "Website Copy", "SEO Articles", "Email Sequences",
  "AI Pipelines", "Prototyping", "Custom Builds", "Web Design", "Website Creation", "AI Automation",
  "Telegram Bot API", "Stripe + Webhooks", "CRM Integration", "Database", "Design", "SaaS Architecture",
  "Custom UI/UX", "Stripe Subscriptions", "Telegram Notifications", "Adaptive Web Design", "Telegram Mini App",
  "Real-time Sync", "Exchange API"
];

const tagTranslations = {
  "Custom Design": "Кастомний дизайн", "CMS Integration": "Інтеграція CMS", "Performance": "Швидкодія",
  "Web Apps": "Веб-додатки", "SaaS MVP": "SaaS MVP", "Dashboards": "Дашборди",
  "Make / Zapier": "Make / Zapier", "API Connections": "Інтеграції API", "Workflows": "Робочі процеси",
  "AI Chatbot": "ШІ Чат-бот", "Telegram Bot": "Telegram Бот", "Booking & Payments": "Бронювання та оплата",
  "HubSpot": "HubSpot", "Airtable": "Airtable", "Lead Scoring": "Оцінка лідів",
  "Stripe": "Stripe", "Subscriptions": "Підписки", "Webhooks": "Вебхуки",
  "UI/UX": "UI/UX", "Brand Identity": "Айдентика", "Figma": "Figma",
  "Website Copy": "Тексти для сайту", "SEO Articles": "SEO статті", "Email Sequences": "Email-воронки",
  "AI Pipelines": "ШІ пайплайни", "Prototyping": "Прототипування", "Custom Builds": "Кастомні рішення",
  "Web Design": "Веб-дизайн", "Website Creation": "Створення сайтів", "AI Automation": "ШІ Автоматизація",
  "Telegram Bot API": "Telegram Bot API", "Stripe + Webhooks": "Stripe + Вебхуки", "CRM Integration": "Інтеграція CRM",
  "Database": "Бази даних", "Design": "Дизайн", "SaaS Architecture": "Архітектура SaaS",
  "Custom UI/UX": "Кастомний UI/UX", "Stripe Subscriptions": "Підписки Stripe", "Telegram Notifications": "Сповіщення Telegram",
  "Adaptive Web Design": "Адаптивний веб-дизайн", "Telegram Mini App": "Telegram Mini App", "Real-time Sync": "Синхронізація",
  "Exchange API": "API Обміну"
};

tags.forEach((tag, i) => {
  const key = `tag-${i}`;
  const regex = new RegExp(`(<span[^>]*?>)\\s*(${tag})\\s*(</span>)`, 'g');
  html = html.replace(regex, `$1<span data-i18n="${key}">$2</span>$3`); // nested but it's ok, or add to existing span
  
  // Actually better to just add to the span itself
  const regex2 = new RegExp(`(<span class="(?:srv-tag|p-tech span|)[^"]*")>(${tag})</span>`, 'g');
  html = html.replace(new RegExp(`>(${tag})</span>`, 'g'), ` data-i18n="${key}">$1</span>`);

  enDict[key] = tag;
  uaDict[key] = tagTranslations[tag] || tag;
});


fs.writeFileSync('index.html', html);

let transJS = fs.readFileSync('translations.js', 'utf8');

// Insert into EN
let enIns = Object.entries(enDict).map(([k,v]) => `    "${k}": ${JSON.stringify(v)},`).join('\n');
transJS = transJS.replace(/("pop-note": "[^"]*"\n\s*)/, `$1,\n${enIns}\n`);

// Insert into UA
let uaIns = Object.entries(uaDict).map(([k,v]) => `    "${k}": ${JSON.stringify(v)},`).join('\n');
transJS = transJS.replace(/(}\n};)/, `,\n${uaIns}\n$1`);

fs.writeFileSync('translations.js', transJS);
console.log("Done");
