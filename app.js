document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('startMission').addEventListener('click', ()=> alert(window.QarzhyI18n.t('hero.cta')));
  document.getElementById('openGames').addEventListener('click', ()=> alert(window.QarzhyI18n.t('games.title')));
  function updateProgress(balance){ const left = Math.max(0,500-balance); window.QarzhyI18n.apply(); document.getElementById('progressLabel').textContent = window.QarzhyI18n.t('progress.left',{left}); }
  updateProgress(120);
});