document.addEventListener('DOMContentLoaded', ()=>{
  const sel = document.getElementById('themeSelect');
  function setTheme(t){ document.body.className = t; localStorage.setItem('qarzhyiq_theme', t); document.getElementById('aiHelper').className='ai-widget '+t; }
  const saved = localStorage.getItem('qarzhyiq_theme') || 'theme-cartoon';
  sel.value = saved; setTheme(saved);
  sel.addEventListener('change', ()=> setTheme(sel.value));
});