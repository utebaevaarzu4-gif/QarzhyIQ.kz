// Application logic for the full QarzhyIQ mock platform

const avatars = [
 {id:1, name:"Aigerim", file:"avatar1.svg"},
 {id:2, name:"Bekzat", file:"avatar2.svg"},
 {id:3, name:"Madina", file:"avatar3.svg"},
 {id:4, name:"Samat", file:"avatar4.svg"}
];

let points = 120;
let levelThreshold = 500; // points needed for next level in demo

function init(){
  // populate avatars
  const avatarList = document.getElementById('avatarList');
  avatars.forEach(a=>{
    const el = document.createElement('div');
    el.className = 'avatar';
    el.innerHTML = `<img src="${a.file}" width="58" height="58" alt="${a.name}">`;
    el.onclick = ()=> selectAvatar(a);
    el.dataset.id = a.id;
    avatarList.appendChild(el);
  });

  // set default avatar selected
  selectAvatar(avatars[0]);

  // wire mission buttons
  document.querySelectorAll('[data-action="doMission"]').forEach(btn=>{
    btn.addEventListener('click', ()=> {
      const pts = parseInt(btn.dataset.points || "0");
      earnPoints(pts);
      animateBtnFeedback(btn);
    });
  });

  document.querySelectorAll('[data-action="playGame"]').forEach(btn=>{
    btn.addEventListener('click', ()=> {
      // simple simulation: play game and award random points
      const reward = Math.floor(Math.random()*100) + 20;
      earnPoints(reward);
      btn.textContent = (getText('KZ','Басталды','EN','Started','RU','Начато'));
      setTimeout(()=> updateLangTexts(),1000);
    });
  });

  document.querySelectorAll('[data-action="watchVideo"]').forEach(btn=>{
    btn.addEventListener('click', ()=> {
      const pts = parseInt(btn.dataset.points || "0");
      earnPoints(pts);
      animateBtnFeedback(btn);
    });
  });

  document.getElementById('startMission').addEventListener('click', ()=> {
    earnPoints(30);
  });

  document.getElementById('downloadReport').addEventListener('click', ()=> {
    alert(getText('KZ',"Апталық есеп жүктелді","EN","Weekly report downloaded","RU","Еженедельный отчет загружен"));
  });

  document.getElementById('teacherView').addEventListener('click', ()=> {
    const panel = document.getElementById('teacherOverview');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
  });

  // language buttons
  document.getElementById('btnKZ').addEventListener('click', ()=> setLang('kz'));
  document.getElementById('btnEN').addEventListener('click', ()=> setLang('en'));
  document.getElementById('btnRU').addEventListener('click', ()=> setLang('ru'));

  updateUI();
  setLang('kz');
}

function selectAvatar(a){
  document.querySelectorAll('.avatar').forEach(el=> el.classList.remove('selected'));
  const node = document.querySelector(`.avatar[data-id="${a.id}"]`);
  if(node) node.classList.add('selected');
  document.getElementById('currentAvatar').src = a.file;
}

function earnPoints(n){
  // animate points increasing
  const ptsEl = document.getElementById('points');
  const start = points;
  const end = points + n;
  const step = Math.max(1, Math.floor(n/20));
  const interval = setInterval(()=> {
    points += step;
    if(points >= end){ points = end; clearInterval(interval); }
    ptsEl.textContent = points;
    updateProgress();
  }, 20);

  // celebrate if big gain
  if(n >= 80) {
    flashSuccess();
  }
}

function updateProgress(){
  const pct = Math.min(100, Math.round((points/levelThreshold)*100));
  document.getElementById('progressFill').style.width = pct + '%';
  const left = Math.max(0, levelThreshold - points);
  document.getElementById('progressLabel').textContent = getText('KZ',`Келесі деңгейге: ${left} ұпай қалды`, 'EN', `Next level: ${left} pts left`, 'RU', `До уровня: осталось ${left} баллов`);
  document.getElementById('weeklyPoints').textContent = (Math.min(200, Math.round(points/2)) + ' ұпай');
  updateStudentListMock();
}

function updateUI(){
  document.getElementById('points').textContent = points;
  updateProgress();
}

function animateBtnFeedback(btn){
  btn.classList.add('btn-anim');
  setTimeout(()=> btn.classList.remove('btn-anim'),600);
}

function flashSuccess(){
  const body = document.body;
  body.animate([{filter:'brightness(1)'},{filter:'brightness(1.08)'},{filter:'brightness(1)'}], {duration:600});
}

// Language handling
let currentLang = 'kz';
function setLang(lang){
  currentLang = lang;
  document.getElementById('btnKZ').classList.toggle('active', lang==='kz');
  document.getElementById('btnEN').classList.toggle('active', lang==='en');
  document.getElementById('btnRU').classList.toggle('active', lang==='ru');
  updateLangTexts();
}

function updateLangTexts(){
  document.querySelectorAll('[data-kz]').forEach(el=>{
    if(currentLang === 'kz') el.textContent = el.dataset.kz;
    else if(currentLang === 'en') el.textContent = el.dataset.en || el.dataset.kz;
    else if(currentLang === 'ru') el.textContent = el.dataset.ru || el.dataset.kz;
  });
}

function getText(k1,t1,k2,t2,k3,t3){
  if(currentLang==='kz') return t1;
  if(currentLang==='en') return t2;
  return t3;
}

function updateStudentListMock(){
  const ul = document.getElementById('studentList');
  if(!ul) return;
  ul.innerHTML = '';
  const sample = [
    {name:'Aigerim', pts: points},
    {name:'Bekzat', pts: Math.max(10, Math.round(points*0.7))},
    {name:'Madina', pts: Math.max(20, Math.round(points*1.5))}
  ];
  sample.forEach(s=>{
    const li = document.createElement('li');
    li.textContent = `${s.name} — ${s.pts}`;
    ul.appendChild(li);
  });
}

// init
document.addEventListener('DOMContentLoaded', init);
