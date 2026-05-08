const fs = require('fs');
let transJS = fs.readFileSync('translations.js', 'utf8');

// Fix stat-1-l
transJS = transJS.replace(
  /"stat-1-l": "Проектів реалізовано",/g,
  '"stat-1-l": "Виконаних проектів у США та ЄС",'
);

// Fix cont-h
transJS = transJS.replace(
  /"cont-h": "Давайте створимо щось,<br>що варте інвестицій.",/g,
  '"cont-h": "Давайте створимо<br>щось, що варте<br>інвестицій.",'
);

// Add select options to UA
transJS = transJS.replace(
  /("t-3-role": "Співзасновник, SaaS · Вільнюс, Литва",\n\s*"tag-31": "Stripe \+ Вебхуки",)/,
  `$1\n    "f-opt-1": "Новий сайт / Лендінг",\n    "f-opt-2": "Веб-додаток / SaaS MVP",\n    "f-opt-3": "Автоматизація бізнесу & CRM",\n    "f-opt-4": "AI / Telegram Бот",\n    "f-opt-5": "Не впевнений — Давайте обговоримо",`
);

fs.writeFileSync('translations.js', transJS);

let html = fs.readFileSync('index.html', 'utf8');

// Update select options with data-i18n
html = html.replace(/<option value="Website">New Website \/ Landing Page<\/option>/, '<option value="Website" data-i18n="f-opt-1">New Website / Landing Page</option>');
html = html.replace(/<option value="Web App">Web App \/ SaaS MVP<\/option>/, '<option value="Web App" data-i18n="f-opt-2">Web App / SaaS MVP</option>');
html = html.replace(/<option value="Automation">Business Automation & CRM<\/option>/, '<option value="Automation" data-i18n="f-opt-3">Business Automation & CRM</option>');
html = html.replace(/<option value="Telegram Bot">AI \/ Telegram Bot<\/option>/, '<option value="Telegram Bot" data-i18n="f-opt-4">AI / Telegram Bot</option>');
html = html.replace(/<option value="Not Sure">Not Sure — Let's talk<\/option>/, '<option value="Not Sure" data-i18n="f-opt-5">Not Sure — Let\'s talk</option>');

fs.writeFileSync('index.html', html);

console.log("Fixed.");
