const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// fix double data-i18n
html = html.replace(/data-i18n="([^"]+)"\s+data-i18n="\1"/g, 'data-i18n="$1"');

// also fix the p-result-callout nested span issue, which currently is:
// <div class="p-result-callout" data-i18n="p-1-res">
//    <span data-i18n="p-1-res"><span>⚡</span> 100% automated enrollment → payment → content delivery pipeline</span>
// </div>
// It should just be:
// <div class="p-result-callout" data-i18n="p-1-res">
//    <span>⚡</span> 100% automated enrollment → payment → content delivery pipeline
// </div>
html = html.replace(/<span data-i18n="(p-\d+-res)">(.*?)<\/span>/g, '$2');


fs.writeFileSync('index.html', html);

let transJS = fs.readFileSync('translations.js', 'utf8');

const dict = [
  // Testimonials
  ['Charity · Ukraine', 't-1-logo', 'Благодійність · Україна'],
  ['"In the current environment in Ukraine, speed is a necessity. You can’t drive impact without a digital presence — people need to find you online. What other agencies promised in three weeks, the Perazim team delivered in just four days. Fast, flawless, and it just works."', 't-1-text', '"В нинішніх умовах в Україні швидкість — це необхідність. Без цифрової присутності неможливо створювати вплив. Те, що інші агентства обіцяли за 3 тижні, команда Perazim зробила за 4 дні. Швидко, ідеально, і воно працює."'],
  ['CEO, Charitable Foundation · Kyiv, UA', 't-1-role', 'CEO, Благодійний фонд · Київ, Україна'],

  ['Online Education · Ukraine', 't-2-logo', 'Онлайн-освіта · Україна'],
  ['"What impressed me most was that they understood my business from the first call — not just the technical side, but the actual customer journey and psychology. The new site and chatbot integration didn’t just look good; it doubled my lead-to-call conversion rate."', 't-2-text', '"Найбільше вразило те, що вони зрозуміли мій бізнес з першого дзвінка — не лише технічну сторону, а й шлях клієнта та психологію. Новий сайт та інтеграція з чат-ботом не просто виглядали гарно; вони подвоїли конверсію."'],
  ['Influencer & Educator · Lviv, UA', 't-2-role', 'Інфлюенсер та Викладач · Львів, Україна'],

  ['SaaS · Lithuania', 't-3-logo', 'SaaS · Литва'],
  ['"Clear scope. Delivered on time. I don’t have to say more — but I will: the quality of thinking behind every decision surprised me. They actually pushed back on one of my ideas to protect the product\'s scalability, and they were absolutely right."', 't-3-text', '"Чіткий план. Здано вчасно. Можна більше нічого не казати, але додам: якість мислення за кожним рішенням мене здивувала. Вони навіть відхилили одну мою ідею, щоб захистити масштабованість продукту, і мали рацію."'],
  ['Co-founder, SaaS · Vilnius, LT', 't-3-role', 'Співзасновник, SaaS · Вільнюс, Литва']
];

html = fs.readFileSync('index.html', 'utf8');

let enDict = {};
let uaDict = {};

dict.forEach(([en, key, ua]) => {
  // Add data-i18n to exact matches in html
  // Find >EN text< and add data-i18n
  const regex2 = new RegExp(`>(\\s*${en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*)<`, 'g');
  html = html.replace(regex2, ` data-i18n="${key}">$1<`);

  enDict[key] = en;
  uaDict[key] = ua;
});

// Fix "Stripe + Webhooks"
html = html.replace(/<span>Stripe \+ Webhooks<\/span>/, '<span><span data-i18n="tag-31">Stripe + Webhooks</span></span>');
enDict['tag-31'] = 'Stripe + Webhooks';
uaDict['tag-31'] = 'Stripe + Вебхуки';

fs.writeFileSync('index.html', html);

// Insert into EN
let enIns = Object.entries(enDict).map(([k,v]) => `    "${k}": ${JSON.stringify(v)},`).join('\n');
transJS = transJS.replace(/("pop-note": "[^"]*"\n\s*)/, `$1,\n${enIns}\n`);

// Insert into UA
let uaIns = Object.entries(uaDict).map(([k,v]) => `    "${k}": ${JSON.stringify(v)},`).join('\n');
transJS = transJS.replace(/(}\n};)/, `,\n${uaIns}\n$1`);

fs.writeFileSync('translations.js', transJS);

console.log("Cleanup and Testimonials done.");
