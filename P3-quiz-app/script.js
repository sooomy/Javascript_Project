/* ---------- Questions ---------- */
const DB = [
  {cat:'geo', q:'Quelle est la capitale du Canada ?', a:['Toronto','Montréal','Ottawa','Vancouver'], c:2},
  {cat:'tech',q:'Qui a créé JavaScript ?',a:['Brendan Eich','Linus Torvalds','Bill Gates','Guido van Rossum'],c:0},
  {cat:'math',q:'√81 = ?',a:['7','8','9','10'],c:2},
  {cat:'tech',q:'HTML signifie ?',a:['Hyperlinks & Text Markup Language','Hyper Text Markup Language','Home Tool Markup Language','Hyper Transfer Markup Language'],c:1},
  {cat:'geo', q:'Le Nil se jette dans ?', a:['Mer Rouge','Golfe Persique','Mer Méditerranée','Océan Atlantique'], c:2},
  {cat:'math',q:'π ≈ ?',a:['3.1416','2.7183','1.6180','1.4142'],c:0},
];

/* ---------- Sélecteurs ---------- */
const startScreen = id('startScreen');
const quizScreen  = id('quizScreen');
const resultScreen= id('resultScreen');
const themeBtn  = id('themeToggle');
const startBtn  = id('startBtn');
const categorySel=id('category');
const timeSel   = id('timeSelect');
const questionEl=id('question');
const answersUl = id('answers');
const nextBtn   = id('nextBtn');
const progressText = id('progressText');
const progBar = id('progressBar').firstElementChild || (()=>{});
const timerSpan = id('timer');
const scoreText = id('scoreText');
const restartBtn=id('restartBtn');
const homeBtn   = id('homeBtn');
const leaderboardOl=id('leaderboard');

/* ---------- Variables d’état ---------- */
let deck=[], index=0, score=0, limit=0, countdown=0, interval=null;

/* ---------- Thème ---------- */
const THEME='quiz_theme';
applyTheme(localStorage.getItem(THEME)||(
  matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'));
themeBtn.onclick = ()=>{
  const t=document.body.classList.contains('dark')?'light':'dark';
  applyTheme(t);localStorage.setItem(THEME,t);
};
function applyTheme(t){
  document.body.classList.toggle('dark',t==='dark');
  themeBtn.textContent=t==='dark'?'☀️':'🌙';
}

/* ---------- Leaderboard ---------- */
const LB_KEY='quiz_lb';
let leaderboard=JSON.parse(localStorage.getItem(LB_KEY)||'[]');
renderLB();
function saveLB(){
  localStorage.setItem(LB_KEY,JSON.stringify(leaderboard.slice(0,5)));
}
function renderLB(){
  leaderboardOl.innerHTML='';
  leaderboard.forEach(e=>{
    const li=document.createElement('li');
    li.textContent=`${e.name} — ${e.score}/${e.total}`;
    leaderboardOl.appendChild(li);
  });
}

/* ---------- Navigation ---------- */
startBtn.onclick = startQuiz;
restartBtn.onclick= startQuiz;
homeBtn.onclick   = ()=>{toggle(resultScreen,false);toggle(startScreen,true)};
nextBtn.onclick   = ()=>{index++; loadQuestion();};

/* ---------- Core ---------- */
function startQuiz(){
  // construire deck
  const cat=categorySel.value;
  deck=shuffle(DB.filter(q=>cat==='all'||q.cat===cat)).slice(0,10);
  index=score=0;limit=Number(timeSel.value);
  toggle(startScreen,false);toggle(resultScreen,false);toggle(quizScreen,true);
  loadQuestion();
}
function loadQuestion(){
  clearInterval(interval);
  if(index>=deck.length){showResult();return;}
  const q=deck[index];
  questionEl.textContent=q.q;
  answersUl.innerHTML='';
  q.a.forEach((txt,i)=>{
    const li=document.createElement('li');
    li.textContent=txt;li.className='answer';li.tabIndex=0;
    li.onclick=li.onkeydown=e=>{
      if(e.key && e.key!=='Enter') return;
      selectAnswer(li,i===q.c);
    };
    answersUl.appendChild(li);
  });
  progressText.textContent=`${index+1}/${deck.length}`;
  progBar.style.width=`${((index)/deck.length)*100}%`;
  nextBtn.disabled=true;timerSpan.parentElement.style.visibility=limit? 'visible':'hidden';
  if(limit){startTimer();}
}
function selectAnswer(el,correct){
  answersUl.querySelectorAll('.answer').forEach(a=>a.onclick=a.onkeydown=null);
  el.classList.add(correct?'correct':'wrong');
  if(correct) score++; else {
    answersUl.children[deck[index].c].classList.add('correct');
  }
  nextBtn.disabled=false;
  clearInterval(interval);
}
function showResult(){
  toggle(quizScreen,false);toggle(resultScreen,true);
  scoreText.textContent=`Score : ${score}/${deck.length}`;
  leaderboard.unshift({name:new Date().toLocaleDateString('fr-FR'),score,total:deck.length});
  leaderboard.sort((a,b)=>b.score-a.score || a.date-b.date);
  saveLB();renderLB();
}
function startTimer(){
  countdown=limit;timerSpan.textContent=countdown;
  interval=setInterval(()=>{
    countdown--;timerSpan.textContent=countdown;
    if(countdown<=0){clearInterval(interval);selectAnswer(document.createElement('div'),false);}
  },1000);
}

/* ---------- Utilitaires ---------- */
function shuffle(arr){return arr.sort(()=>Math.random()-0.5);}
function toggle(el,show){el.classList.toggle('hidden',!show);}
function id(i){return document.getElementById(i);}
