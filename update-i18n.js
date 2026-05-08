const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const dict = [
  // Checklist
  ['Project Checklist — Growth Package', 'chk-title', 'Чекліст проекту — Пакет Growth'],
  ['Discovery call completed', 'chk-1', 'Discovery-дзвінок проведено'],
  ['Project scope approved', 'chk-2', 'План проекту затверджено'],
  ['Design mockups approved', 'chk-3', 'Макет дизайну затверджено'],
  ['Landing page development', 'chk-4', 'Розробка лендінгу'],
  ['CRM integration & automation', 'chk-5', 'Інтеграція CRM та автоматизація'],
  ['AI chatbot setup & training', 'chk-6', 'Налаштування та навчання ШІ-бота'],
  ['QA & cross-device testing', 'chk-7', 'QA та тестування на різних пристроях'],
  ['Launch & handover session', 'chk-8', 'Запуск та передача проекту'],

  // Pricing
  ['<span style="font-size: 16px; font-weight: 600; vertical-align: middle; margin-right: 4px; opacity: 0.8;">from</span>', 'pr-from', '<span style="font-size: 16px; font-weight: 600; vertical-align: middle; margin-right: 4px; opacity: 0.8;">від</span>'],
  ['One-time setup · $49/mo maintenance', 'pr-st-sub', 'Разове налаштування · $49/міс підтримка'],
  ['<strong>High-converting landing page</strong> (5–7 sections)', 'pr-st-1', '<strong>Лендінг з високою конверсією</strong> (5-7 блоків)'],
  ['<strong>Lead capture form</strong> with validation', 'pr-st-2', '<strong>Форма збору лідів</strong> із валідацією'],
  ['<strong>Telegram notification</strong> on new leads', 'pr-st-3', '<strong>Сповіщення в Telegram</strong> про нових лідів'],
  ['Thank you page with next-step CTA', 'pr-st-4', 'Сторінка "Дякуємо" з наступним кроком (CTA)'],
  ['Mobile-first, performance-optimized', 'pr-st-5', 'Мобільна адаптація та висока швидкість'],
  ['Conversion-focused copywriting', 'pr-st-6', 'Копірайтинг, націлений на конверсію'],
  ['2 weeks post-launch support', 'pr-st-7', '2 тижні підтримки після запуску'],
  ['50% upfront · 50% on delivery', 'pr-st-note', '50% передоплата · 50% після здачі'],

  ['One-time setup · $149/mo maintenance', 'pr-gr-sub', 'Разове налаштування · $149/міс підтримка'],
  ['Everything in Starter', 'pr-gr-1', 'Усе з пакету Starter'],
  ['<strong>AI chatbot</strong> trained on your business', 'pr-gr-2', '<strong>ШІ-чатбот</strong>, навчений на вашому бізнесі'],
  ['<strong>CRM setup</strong> + lead pipeline automation', 'pr-gr-3', '<strong>Налаштування CRM</strong> + автоматизація воронки лідів'],
  ['<strong>Email follow-up sequence</strong> (3–5 emails)', 'pr-gr-4', '<strong>Email-воронка</strong> (3-5 листів)'],
  ['Payment integration (Stripe)', 'pr-gr-5', 'Інтеграція платежів (Stripe)'],
  ['Lead scoring & qualification logic', 'pr-gr-6', 'Оцінка та кваліфікація лідів'],
  ['Analytics dashboard setup', 'pr-gr-7', 'Налаштування аналітичного дашборду'],
  ['30 days post-launch support', 'pr-gr-8', '30 днів підтримки після запуску'],
  ['Most clients see ROI within 30–60 days', 'pr-gr-note', 'Більшість клієнтів окупають інвестиції за 30-60 днів'],

  ['Tailored to your business goals', 'pr-en-sub', 'Адаптовано під ваші бізнес-цілі'],
  ['Everything in Growth', 'pr-en-1', 'Усе з пакету Growth System'],
  ['<strong>Multi-page website</strong> or web application', 'pr-en-2', '<strong>Багатосторінковий сайт</strong> або веб-додаток'],
  ['<strong>Custom software</strong> development', 'pr-en-3', '<strong>Розробка кастомного ПЗ</strong>'],
  ['Complex AI automation pipelines', 'pr-en-4', 'Складні процеси ШІ-автоматизації'],
  ['Team training & documentation', 'pr-en-5', 'Навчання команди та документація'],
  ['Ongoing retainer available', 'pr-en-6', 'Доступний постійний супровід'],
  ['Dedicated project manager', 'pr-en-7', 'Виділений проектний менеджер'],
  ['NDA available before any discussions', 'pr-en-note', 'Можливість підписання NDA перед обговоренням'],

  // FAQ
  ['Who is on your team — what’s the actual size?', 'faq-1-q', 'Хто у вашій команді — який реальний розмір?'],
  ['We are a lean, specialized team. Your project won’t be handed off to a junior developer. We have dedicated experts for UX design, full-stack development, and automation. We keep the team small deliberately — it means better communication, fewer mistakes, and higher quality work for every project we take on.', 'faq-1-a', 'Ми — невелика спеціалізована команда. Ваш проект не передадуть junior-розробнику. У нас є виділені експерти з UX-дизайну, full-stack розробки та автоматизації. Ми навмисно тримаємо команду невеликою — це означає кращу комунікацію, менше помилок і вищу якість роботи.'],

  ['How is this different from hiring a freelancer or a large agency?', 'faq-2-q', 'Чим ви відрізняєтесь від фрілансера чи великого агентства?'],
  ['Freelancers often lack the full-stack capability to handle design, code, CRM, and automation simultaneously — meaning you have to act as the project manager, hiring multiple people. Large agencies move slowly, have massive overhead (which you pay for), and treat you like just another ticket. We sit right in the middle: agency-level expertise with startup-level speed and personal attention.', 'faq-2-a', 'Фрілансерам часто бракує комплексних навичок для створення дизайну, коду, CRM та автоматизації одночасно — а це означає, що вам доведеться бути проектним менеджером і наймати кількох людей. Великі агентства працюють повільно, мають великі накладні витрати (за які платите ви) і ставляться до вас як до чергового тікета. Ми знаходимося посередині: експертиза рівня агентства зі швидкістю стартапу та персональною увагою.'],

  ['What if I’m not sure what I need?', 'faq-3-q', 'Що, якщо я не впевнений, що мені потрібно?'],
  ['That’s exactly why we do the Discovery Call. You don’t need to have a technical brief ready. You just need to know what business problems you’re facing (e.g., "I spend 10 hours a week answering the same questions" or "My current site doesn’t bring in leads"). We’ll map out the technical solution for you.', 'faq-3-a', 'Саме для цього ми проводиємо Discovery-дзвінок. Вам не потрібно мати готове технічне завдання. Достатньо розуміти бізнес-проблеми (наприклад, "я витрачаю 10 годин на тиждень, відповідаючи на ті самі питання" або "мій поточний сайт не приносить лідів"). Ми самі розробимо технічне рішення.'],

  ['How long does a project actually take?', 'faq-4-q', 'Скільки часу реально займає проект?'],
  ['Starter (landing page + lead form): 5–7 business days. Growth package (full system with chatbot, CRM, and automation): 10–14 business days. Custom enterprise builds are scoped individually. The biggest variable is how quickly you can provide feedback at key review points. We keep the process moving — we just need you responsive when we ask questions.', 'faq-4-a', 'Starter (лендінг + форма збору лідів): 5–7 робочих днів. Growth (повна система з чат-ботом, CRM та автоматизацією): 10–14 робочих днів. Кастомні enterprise-рішення оцінюються індивідуально. Головний фактор швидкості — те, як швидко ви даєте зворотний зв\'язок на ключових етапах. Ми працюємо швидко — нам просто потрібно, щоб ви оперативно відповідали на наші питання.'],

  ['What do I need to provide to get started?', 'faq-5-q', 'Що потрібно надати для початку роботи?'],
  ['Just your time for the initial call. After you approve the proposal, we’ll ask for any existing branding assets (logos, colors) and logins to your current tools if we need to integrate with them. For the content, we can either use what you have, or write high-converting copy from scratch.', 'faq-5-a', 'Тільки ваш час для першого дзвінка. Після затвердження плану ми попросимо ваші бренд-матеріали (логотип, кольори) та доступи до поточних інструментів, якщо нам потрібно буде з ними інтегруватися. Щодо контенту — ми можемо використати ваш або написати тексти, що продають, з нуля.'],

  ['What if something breaks after launch?', 'faq-6-q', 'Що, якщо щось зламається після запуску?'],
  ['Every package includes a post-launch support period (2 to 4 weeks depending on the package) where we fix any bugs, adjust integrations, and ensure everything is running smoothly at no extra cost. For long-term peace of mind, we also offer monthly maintenance and retainer options.', 'faq-6-a', 'Кожен пакет включає період підтримки після запуску (від 2 до 4 тижнів), протягом якого ми безкоштовно виправляємо будь-які помилки, коригуємо інтеграції та гарантуємо бездоганну роботу всього. Для довгострокової впевненості ми також пропонуємо варіанти щомісячної підтримки.'],

  ['How do payments work?', 'faq-7-q', 'Як відбуваються оплати?'],
  ['We typically structure projects with a 50% upfront deposit to secure your spot in our schedule and begin work. The remaining 50% is tied to the final delivery and handover of the live project. We accept bank transfers and all major cards via secure links.', 'faq-7-a', 'Зазвичай ми працюємо за такою схемою: 50% передоплати, щоб забронювати місце в графіку та розпочати роботу. Решта 50% оплачується після фінальної здачі та передачі готового проекту. Ми приймаємо банківські перекази та всі основні картки через захищені посилання.'],

  ['Can you sign an NDA before we discuss the project?', 'faq-8-q', 'Чи можете ви підписати NDA перед обговоренням проекту?'],
  ['Absolutely. If your idea is proprietary or you are working in a highly competitive space, just let us know when booking the call and we will send over a mutual NDA within hours.', 'faq-8-a', 'Абсолютно. Якщо ваша ідея є комерційною таємницею або ви працюєте в висококонкурентному середовищі, просто скажіть нам про це під час бронювання дзвінка, і ми надішлемо договір про нерозголошення (NDA) протягом кількох годин.'],

  // Footer privacy link
  ['Privacy Policy', 'foot-privacy', 'Політика конфіденційності'],
];

let enDict = {};
let uaDict = {};

dict.forEach(([en, key, ua]) => {
  // Try to find the exact HTML segment and add data-i18n
  let escapedEn = en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // First try to find it just inside a tag
  let regex = new RegExp(`>(\\s*${escapedEn}\\s*)<`, 'g');
  if (html.match(regex)) {
    html = html.replace(regex, ` data-i18n="${key}">$1<`);
  } else {
    // try to find it standalone in the document
    let regex2 = new RegExp(`(${escapedEn})`, 'g');
    if (html.match(regex2) && !en.includes('<span')) {
      // it might be inside text, let's wrap it in a span
      // but be careful not to mess up html tags
      html = html.replace(regex2, `<span data-i18n="${key}">$1</span>`);
    } else if (html.match(regex2)) {
      html = html.replace(regex2, `<!--data-i18n:${key}-->$1`); // debug
    }
  }

  enDict[key] = en;
  uaDict[key] = ua;
});

fs.writeFileSync('index.html', html);

// Update translations.js
let transJS = fs.readFileSync('translations.js', 'utf8');

// Insert EN
let enIns = Object.entries(enDict).map(([k,v]) => `    "${k}": ${JSON.stringify(v)},`).join('\n');
transJS = transJS.replace(/("foot-rights": "[^"]*",\n)/, `$1${enIns}\n`);

// Insert UA
let uaIns = Object.entries(uaDict).map(([k,v]) => `    "${k}": ${JSON.stringify(v)},`).join('\n');
transJS = transJS.replace(/(    "foot-rights": "[^"]*",\n)([\s\S]*?)(\n  })/, (match, p1, p2, p3) => {
  // Find foot-rights inside the UA object
  let parts = transJS.split('ua: {');
  let uaSection = parts[1];
  uaSection = uaSection.replace(/("foot-rights": "[^"]*",\n)/, `$1${uaIns}\n`);
  return parts[0] + 'ua: {' + uaSection;
});

fs.writeFileSync('translations.js', transJS);
console.log("Done adding new keys.");
