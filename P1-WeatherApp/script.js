/* ---------------- Config ---------------- */
const API_KEY = "868c3743bfecf13acc0bf1e2c0c1ef32";
const BASE = "https://api.openweathermap.org/data/2.5/";

/* ---------------- Sélecteurs ------------- */
const cityIn = id("cityInput");
const searchB = id("searchBtn");
const geoB = id("geoBtn");
const curSec = id("current");
const forSec = id("forecast");
const fGrid = id("forecastGrid");
const errP = id("error");

/* elements curr weather */
const cName=id("cityName"), lTime=id("localTime"), icon=id("icon"), desc=id("desc"),
      temp=id("temp"), hum=id("hum"), wind=id("wind");

/* ---------------- Événements ------------ */
searchB.onclick = ()=> fetchCity(cityIn.value.trim());
geoB.onclick    = ()=> navigator.geolocation.getCurrentPosition(pos=>fetchCoords(pos.coords.latitude,pos.coords.longitude),showError);
cityIn.addEventListener("keydown",e=>{if(e.key==="Enter")searchB.click()});

/* ---------------- Fonctions ------------- */
function fetchCity(city){
  if(!city) return;
  fetchJSON(`${BASE}weather?q=${city}&appid=${API_KEY}&units=metric&lang=fr`)
    .then(data=>fetchCoords(data.coord.lat,data.coord.lon))
    .catch(showError);
}
function fetchCoords(lat,lon){
  Promise.all([
    fetchJSON(`${BASE}weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=fr`),
    fetchJSON(`${BASE}forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=fr`)
  ]).then(([cur,fore])=>{
    renderCurrent(cur);
    renderForecast(fore.list);
    setTheme(cur.weather[0].main);
    errP.classList.add("hidden");
  }).catch(showError);
}

function fetchJSON(url){return fetch(url).then(r=>{if(!r.ok)throw Error("Ville non trouvée");return r.json()});}

function renderCurrent(d){
  cName.textContent=`${d.name}, ${d.sys.country}`;
  lTime.textContent=new Intl.DateTimeFormat('fr-FR',{
    weekday:'long',hour:'2-digit',minute:'2-digit',timeZone:`UTC`,timeZoneOffset:d.timezone/60
  }).format(Date.now()+d.timezone*1000);
  icon.src=`https://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`;
  icon.alt=d.weather[0].description;
  desc.textContent=d.weather[0].description;
  temp.textContent=d.main.temp.toFixed(1);
  hum.textContent=d.main.humidity;
  wind.textContent=(d.wind.speed*3.6).toFixed(1);
  curSec.hidden=false;
}

function renderForecast(list){
  /* un extrait toutes les 24 h à midi */
  const daily=list.filter(i=>i.dt_txt.includes("12:00:00")).slice(0,5);
  fGrid.innerHTML='';
  daily.forEach(d=>{
    const date=new Date(d.dt*1000);
    const div=document.createElement('div');div.className='day';
    div.innerHTML=`
      <span>${date.toLocaleDateString('fr-FR',{weekday:'short'})}</span>
      <img src="https://openweathermap.org/img/wn/${d.weather[0].icon}.png" alt="">
      <span>${d.main.temp.toFixed(0)}°</span>`;
    fGrid.appendChild(div);
  });
  forSec.hidden=false;
}

function setTheme(main){
  const root=document.documentElement;
  const map={Clear:'--clear',Clouds:'--clouds',Rain:'--rain',Drizzle:'--rain',Thunderstorm:'--rain',Snow:'--snow'};
  root.style.setProperty('--bg',`var(${map[main]||'--clouds'})`);
}

function showError(e){errP.textContent=e.message||e;errP.classList.remove("hidden");curSec.hidden=forSec.hidden=true;}

function id(x){return document.getElementById(x);}
