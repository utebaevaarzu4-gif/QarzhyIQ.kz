(function(){
  const TRANSLATIONS = {
    kz: { "brand.title":"QarzhyIQ", "brand.tagline":"Тапсырманы орында — ақша тап", "hero.title":"Тапсырмаларды орында — ақша тап",
          "hero.lead":"Үй тапсырмасы, үй шаруасы және оқу — барлығы платформадағы ақшаның көзі.",
          "hero.cta":"Миссияны бастау", "points.label":"Баланс", "progress.left":"Келесі деңгейге: {{left}} ₸",
          "features.title":"Негізгі мүмкіндіктер", "features.tasks.title":"Күнделікті тапсырмалар", "features.tasks.lead":"Үй тапсырмасы бітсе — + ұпай.",
          "features.games.title":"Ойындар", "features.games.lead":"Ойын арқылы қаржылық түсінік.", "features.shop.title":"Дүкен", "features.shop.lead":"Ұпайды дүкенде жұмса."
        },
    en: { "brand.title":"QarzhyIQ", "brand.tagline":"Do tasks — Earn money", "hero.title":"Do tasks — Earn money",
          "hero.lead":"Homework, chores and learning — all are money sources on the platform.",
          "hero.cta":"Start mission", "points.label":"Balance", "progress.left":"Next level: {{left}} ₸",
          "features.title":"Main features", "features.tasks.title":"Daily tasks", "features.tasks.lead":"Complete homework — get points.",
          "features.games.title":"Games", "features.games.lead":"Learn finance through play.", "features.shop.title":"Kid Shop", "features.shop.lead":"Spend points in the shop."
        },
    ru: { "brand.title":"QarzhyIQ", "brand.tagline":"Выполняй задания — зарабатывай", "hero.title":"Выполняй задания — зарабатывай",
          "hero.lead":"Домашние задания, дела по дому и обучение — всё это источники денег на платформе.",
          "hero.cta":"Начать миссию", "points.label":"Баланс", "progress.left":"До уровня: осталось {{left}} ₸",
          "features.title":"Основные возможности", "features.tasks.title":"Ежедневные задания", "features.tasks.lead":"Выполни домашнее задание — получи баллы.",
          "features.games.title":"Игры", "features.games.lead":"Учись финансам через игру.", "features.shop.title":"Детский магазин", "features.shop.lead":"Траьти баллы в магазине."
        }
  };
  const DEFAULT='kz'; const LS='qarzhyiq_lang';
  function getLang(){return localStorage.getItem(LS)||DEFAULT;}
  function setLang(l){ if(!TRANSLATIONS[l]) l=DEFAULT; localStorage.setItem(LS,l); apply(); }
  function t(k,params={}){ const lang=getLang(); let s=(TRANSLATIONS[lang]&&TRANSLATIONS[lang][k])||(TRANSLATIONS[DEFAULT]&&TRANSLATIONS[DEFAULT][k])||k; Object.keys(params).forEach(p=> s=s.replace(new RegExp('\{\{\s*'+p+'\s*\}\}','g'), params[p])); return s; }
  function apply(){ document.querySelectorAll('[data-i18n]').forEach(el=>{ const key=el.getAttribute('data-i18n'); const args=el.getAttribute('data-i18n-args'); let params={}; if(args){ try{ params=JSON.parse(args);}catch(e){} } el.textContent=t(key,params); }); const sel=document.getElementById('langSelect'); if(sel) sel.value=getLang(); const titleKey=document.documentElement.getAttribute('data-title-i18n'); if(titleKey) document.title=t(titleKey); }
  document.addEventListener('DOMContentLoaded', ()=>{
    const sel=document.getElementById('langSelect'); if(sel){ sel.value=getLang(); sel.addEventListener('change',e=> setLang(e.target.value)); }
    apply();
  });
  window.QarzhyI18n={setLang,getLang,t,apply};
})();