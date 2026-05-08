// Header scroll shadow
window.addEventListener('scroll',()=>{
  document.getElementById('header').classList.toggle('scrolled',window.scrollY>20)
})

// --- LOCALIZATION LOGIC ---
let currentLang = localStorage.getItem('perazim_lang') || 'en';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('perazim_lang', lang);

  // Update UI buttons (desktop and mobile)
  const btnEn = document.getElementById('lang-en');
  const btnUa = document.getElementById('lang-ua');
  const btnEnMob = document.getElementById('lang-en-mob');
  const btnUaMob = document.getElementById('lang-ua-mob');

  if (btnEn) btnEn.classList.toggle('active', lang === 'en');
  if (btnUa) btnUa.classList.toggle('active', lang === 'ua');
  if (btnEnMob) btnEnMob.classList.toggle('active', lang === 'en');
  if (btnUaMob) btnUaMob.classList.toggle('active', lang === 'ua');
  
  document.documentElement.lang = lang;

  // Translate all elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  // Handle placeholders
  const emInput = document.getElementById('em');
  if (emInput) emInput.placeholder = lang === 'ua' ? 'john@company.com' : 'john@company.com'; 
  
  const msInput = document.getElementById('ms');
  if (msInput && translations[lang] && translations[lang]['f-ms-ph']) {
    msInput.placeholder = translations[lang]['f-ms-ph'];
  }
}

// Auto-detect language on load
window.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('perazim_lang');
  if (savedLang) {
    setLanguage(savedLang);
  } else {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('uk') || browserLang.startsWith('ru')) {
      setLanguage('ua');
    } else {
      setLanguage('en');
    }
  }
});

// Popup
let popupShown=false
window.addEventListener('scroll',()=>{
  const pct=window.scrollY/(document.body.scrollHeight-window.innerHeight)
  if(pct>0.6&&!popupShown){popupShown=true;document.getElementById('popup-overlay').classList.add('on')}
})
function closePopup(){document.getElementById('popup-overlay').classList.remove('on')}
function closePopupOutside(e){if(e.target===document.getElementById('popup-overlay'))closePopup()}
function submitPopup(){
  const v=document.getElementById('popup-email').value
  if(!v||!v.includes('@')){
    alert(currentLang === 'ua' ? 'Будь ласка, введіть коректний email.' : 'Please enter a valid email.');
    return;
  }
  const successTitle = currentLang === 'ua' ? 'Аудит уже в дорозі!' : 'Audit on the way!';
  const successMsg = currentLang === 'ua' ? 'Перевірте пошту протягом 48 годин.<br>До зв\'язку 👋' : 'Check your inbox within 48 hours.<br>Talk soon 👋';
  
  document.getElementById('popup-box').innerHTML=`<div style="text-align:center;padding:24px 0"><div style="font-size:52px;margin-bottom:16px">✅</div><h3 style="font-size:22px;font-weight:800;margin-bottom:8px;color:var(--text)">${successTitle}</h3><p style="color:var(--text-light);line-height:1.65">${successMsg}</p></div>`
  setTimeout(closePopup,3500)
}

// Contact form
function submitForm(){
  const em=document.getElementById('em').value
  const ms=document.getElementById('ms').value
  if(!em||!em.includes('@')){
    alert(currentLang === 'ua' ? 'Будь ласка, введіть коректну адресу.' : 'Please enter a valid email address.');
    return;
  }
  if(!ms.trim()){
    alert(currentLang === 'ua' ? 'Будь ласка, розкажіть трохи про ваш проект.' : 'Please tell us a bit about your project.');
    return;
  }
  document.getElementById('form-body').style.display='none'
  const ty=document.getElementById('form-ty')
  ty.classList.add('on')
  ty.scrollIntoView({behavior:'smooth',block:'center'})
}

// FAQ
function toggleFaq(btn){
  const item=btn.parentElement
  const open=item.classList.contains('open')
  document.querySelectorAll('.faq-item.open').forEach(el=>el.classList.remove('open'))
  if(!open)item.classList.add('open')
}

// How it works steps
function selectStep(el,idx){
  document.querySelectorAll('.how-step').forEach(s=>s.classList.remove('active'))
  el.classList.add('active')
  // Update checklist progress
  const checks=document.querySelectorAll('#how-checklist .hvc-check')
  checks.forEach((c,i)=>{
    c.classList.remove('pending')
    c.style.background=''
    if(i<=idx*2){
      c.querySelector('.ck').textContent='✓'
      c.style.background='rgba(16,185,129,.06)'
      c.style.color='var(--text)'
    } else {
      c.querySelector('.ck').textContent=''
      c.classList.add('pending')
    }
  })
}

// Mobile nav
function toggleNav(){
  const menu=document.querySelector('.nav-menu')
  menu.classList.toggle('active')
}

// Close nav on link click
document.querySelectorAll('.nav-menu a').forEach(a=>{
  a.addEventListener('click',()=>{document.querySelector('.nav-menu').classList.remove('active')})
})

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const t=document.querySelector(a.getAttribute('href'))
    if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}
  })
})

// Fade-in on scroll
const observer=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.style.opacity='1';e.target.style.transform='translateY(0)'}})
},{threshold:.08})
document.querySelectorAll('.srv-card,.pr-card,.p-card,.t-card,.pain-card,.how-step,.stat-item').forEach(el=>{
  el.style.opacity='0';el.style.transform='translateY(20px)'
  el.style.transition='opacity .5s ease,transform .5s ease'
  observer.observe(el)
})