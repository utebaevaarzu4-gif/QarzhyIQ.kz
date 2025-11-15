(function(){
  const messagesEl = ()=> document.getElementById('aiMessages');
  const input = ()=> document.getElementById('aiInput');
  const aiPanel = document.getElementById('aiPanel');
  const aiToggle = document.getElementById('aiToggle');
  const aiClose = document.getElementById('aiClose');
  const mascotImg = document.getElementById('mascotImg');
  const robotImg = document.getElementById('robotImg');
  function sendBot(text, from='bot'){ const wrap = document.createElement('div'); wrap.className = 'msg ' + from; wrap.textContent = text; messagesEl().appendChild(wrap); messagesEl().scrollTop = messagesEl().scrollHeight; }
  function handleUser(text){
    const lang = window.QarzhyI18n.getLang();
    const lower = text.toLowerCase();
    if(/(қалай|how|как)/.test(lower)){
      sendBot(lang==='kz' ? 'Қалай көмектесемін? Мысалы: "баланс көрсет"' : lang==='en' ? 'How can I help? Try: "show balance"' : 'Чем помочь? Попробуй: "показать баланс"');
      return;
    }
    if(/(баланс|balance|балансым)/.test(lower)){
      sendBot(lang==='kz' ? 'Сенің баланс: 120 ₸. Қай ойынды ашқың келеді?' : lang==='en' ? 'Your balance: 120 ₸. Which game do you want to open?' : 'Твой баланс: 120 ₸. Какую игру открыть?');
      return;
    }
    if(/(ойын|game|play)/.test(lower)){
      sendBot(lang==='kz' ? 'Қай ойынды ашамыз? Earn & Save, Chores Rush, немесе Quiz?' : lang==='en' ? 'Which game? Earn & Save, Chores Rush, or Quiz?' : 'Какую игру? Earn & Save, Chores Rush или Quiz?');
      return;
    }
    if(/(тапсырм|homework|үй)/.test(lower)){
      sendBot(lang==='kz' ? 'Үй тапсырмасын орында — ұпай жина. Қай пән?' : lang==='en' ? 'Complete your homework to earn points. Which subject?' : 'Выполни домашнее задание, чтобы получить баллы. Какой предмет?');
      return;
    }
    const mode = document.querySelector('input[name="aiMode"]:checked')?.value || 'mascot';
    if(mode==='mascot'){
      sendBot(lang==='kz' ? 'Мен сенің дос-маскотпын — не қажет?' : lang==='en' ? 'I am your friendly mascot — what do you need?' : 'Я твой дружелюбный талисман — что нужно?');
    } else {
      sendBot(lang==='kz' ? 'Робот режимі: логикалық жауап беремін. Сұрақ қой.' : lang==='en' ? 'Robot mode: I will answer logically. Ask a question.' : 'Режим робот: отвечаю логично. Задай вопрос.');
    }
  }
  document.addEventListener('DOMContentLoaded', ()=>{
    aiToggle.addEventListener('click', ()=> { aiPanel.style.display = aiPanel.style.display==='none' ? 'block' : 'none'; });
    aiClose.addEventListener('click', ()=> aiPanel.style.display='none');
    document.getElementById('aiSend').addEventListener('click', ()=> { const txt = input().value.trim(); if(!txt) return; const u = document.createElement('div'); u.className='msg user'; u.textContent = txt; messagesEl().appendChild(u); input().value=''; handleUser(txt); });
    input().addEventListener('keypress', (e)=> { if(e.key==='Enter'){ document.getElementById('aiSend').click(); } });
    document.querySelectorAll('input[name="aiMode"]').forEach(r=> r.addEventListener('change', ()=>{
      const v = document.querySelector('input[name="aiMode"]:checked').value;
      if(v==='mascot'){ mascotImg.style.display='block'; robotImg.style.display='none'; }
      else { mascotImg.style.display='none'; robotImg.style.display='block'; }
    }));
    sendBot(window.QarzhyI18n.t('brand.tagline'));
  });
})();