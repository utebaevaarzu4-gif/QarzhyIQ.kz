// Simple frontend app - hooks to backend when available
let balance = 120;
const modal = document.getElementById('modal');
function updateUI(){ document.getElementById('bal').textContent = balance + ' ₸'; const pct = Math.min(100, Math.round((balance/500)*100)); document.getElementById('pf').style.width = pct + '%'; }
document.querySelectorAll('.task-btn').forEach(b=> b.addEventListener('click', ()=> {
  const amt = parseInt(b.dataset.amount||'0');
  // show confirm modal
  showConfirm(amt);
}));
document.querySelectorAll('.buy').forEach(b=> b.addEventListener('click', ()=> {
  const price = parseInt(b.dataset.price||'0');
  if(balance>=price){ balance-=price; playSound('coin'); updateUI(); alert('Purchase successful'); } else { playSound('error'); alert('Not enough money'); }
}));

function showConfirm(amount){
  modal.style.display='flex';
  modal.innerHTML = `<div class="card" style="max-width:420px"><h3>Confirm</h3><p>Did you complete the task?</p><div style="display:flex;gap:8px"><button id="cok">Confirm</button><button id="ccancel">Cancel</button></div></div>`;
  document.getElementById('cok').onclick = ()=>{ balance += amount; playSound('coin'); updateUI(); modal.style.display='none'; modal.innerHTML=''; };
  document.getElementById('ccancel').onclick = ()=>{ modal.style.display='none'; modal.innerHTML=''; };
}

// Games handlers (open simple modals/demo)
document.getElementById('openEarn').addEventListener('click', ()=> { alert('Earn & Save — demo: complete tasks to earn'); });
document.getElementById('openChores').addEventListener('click', ()=> { alert('House Chores Rush — demo'); });
document.getElementById('openSource').addEventListener('click', ()=> { alert('Money Source Finder — demo'); });
document.getElementById('openQuiz').addEventListener('click', ()=> { alert('Budget Quiz — demo'); });

function playSound(name){
  try{
    const s = document.getElementById(name+'-sound');
    if(s){ s.currentTime=0; s.play(); }
  }catch(e){}
}
updateUI();
