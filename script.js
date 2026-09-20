const modal=document.getElementById("searchModal");
const searchBtn=document.getElementById("searchBtn");
const closeSearch=document.getElementById("closeSearch");

function closeORYNTSearch(){
  if(modal){
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden","true");
  }
}

if(searchBtn&&modal){
  searchBtn.onclick=()=>{
    modal.classList.add("open");
    modal.setAttribute("aria-hidden","false");
    const input=document.getElementById("searchInput");
    if(input)input.focus();
  };
}
if(closeSearch&&modal){
  closeSearch.onclick=closeORYNTSearch;
  modal.addEventListener("click",e=>{if(e.target===modal)closeORYNTSearch()});
  document.addEventListener("keydown",e=>{if(e.key==="Escape")closeORYNTSearch()});
}

const langBtn=document.getElementById("langBtn");
if(langBtn)langBtn.onclick=()=>{window.location.href="fa/index.html"};

const launchCountdown=document.getElementById("launchCountdown");
if(launchCountdown){
  const target=Date.parse("2026-10-01T14:30:00+03:30");
  const days=document.getElementById("countDays");
  const hours=document.getElementById("countHours");
  const minutes=document.getElementById("countMinutes");
  const seconds=document.getElementById("countSeconds");

  function updateLaunchCountdown(){
    const diff=Math.max(0,target-Date.now());
    const totalSeconds=Math.floor(diff/1000);
    const d=Math.floor(totalSeconds/86400);
    const h=Math.floor((totalSeconds%86400)/3600);
    const m=Math.floor((totalSeconds%3600)/60);
    const s=totalSeconds%60;
    if(days)days.textContent=String(d).padStart(2,"0");
    if(hours)hours.textContent=String(h).padStart(2,"0");
    if(minutes)minutes.textContent=String(m).padStart(2,"0");
    if(seconds)seconds.textContent=String(s).padStart(2,"0");
    if(diff<=0){
      launchCountdown.innerHTML='<div class="countdown-live">ORYNT is now live.</div>';
      clearInterval(countdownTimer);
    }
  }

  updateLaunchCountdown();
  const countdownTimer=setInterval(updateLaunchCountdown,1000);
}

window.ORYNT_SEARCH_INDEX=[ {title:"Live News",url:"live-news.html",category:"Live",text:"live news latest science technology space AI computing research"},
 {title:"NVIDIA: From Graphics to the AI Infrastructure Era",url:"articles/nvidia-ai-infrastructure.html",category:"Technology",text:"GPU CUDA AI infrastructure Vera Rubin computing"},
 {title:"The race for next-generation chips is changing computing",url:"article-work.html",category:"Computing",text:"chips semiconductor computing"},
 {title:"Apple and Sony: Two Strategies for the Next Technology Era",url:"articles/apple-sony.html",category:"Technology",text:"Apple Sony platforms sensors computing entertainment"},
 {title:"Periodic Table: Elements, Structure and Patterns",url:"articles/periodic-table.html",category:"Science",text:"elements chemistry periodic table atomic number"},
 {title:"NASA in 2026: Missions, Achievements and What Comes Next",url:"articles/nasa-2026.html",category:"Space",text:"NASA missions astronomy exploration 2026"},
 {title:"How researchers turn difficult questions into testable discoveries",url:"articles/science-discovery.html",category:"Science",text:"research discoveries laboratories scientific method"},
 {title:"Understanding Research Papers",url:"articles/research-papers.html",category:"Research",text:"papers studies evidence peer review"},
 {title:"Computing and Software",url:"articles/computing-software.html",category:"Computing",text:"programming software cybersecurity hardware"},
 {title:"Semiconductors",url:"articles/semiconductors.html",category:"Technology",text:"chips semiconductor manufacturing hardware"},
 {title:"Space Missions",url:"articles/space-missions.html",category:"Space",text:"space missions astronomy agencies"},
 {title:"Technology and the changing global landscape",url:"articles/world-technology.html",category:"World",text:"technology global landscape international affairs"},
 {title:"FIFA World Cup: Hosts, Champions and the Road to 2030",url:"articles/world-cup-structure-2030.html",category:"World",text:"FIFA World Cup hosts champions 2030"},
 {title:"Explore the World: Interactive Country Map",url:"articles/world-explorer.html",category:"World",text:"countries map capital population currency region"},
 {title:"ANI vs AGI: Understanding Two Paths of Artificial Intelligence",url:"articles/ani-vs-agi.html",category:"Explained",text:"artificial intelligence ANI AGI AI agents"},
 {title:"U.S. Presidents, Vice Presidents and Inaugurations",url:"articles/us-presidents-vice-presidents-inaugurations.html",category:"World",text:"presidents vice presidents inaugurations history"},
 {title:"Rolex: The History of a Watchmaking Icon",url:"articles/rolex-history.html",category:"Explained",text:"Rolex Hans Wilsdorf watchmaking Oyster Perpetual history precision"},
 {title:"Science",url:"science.html",category:"Science",text:"science research discoveries"},
 {title:"Space",url:"space.html",category:"Space",text:"space missions astronomy"},
 {title:"Technology",url:"technology.html",category:"Technology",text:"technology AI semiconductors"},
 {title:"Computing",url:"computing.html",category:"Computing",text:"computing chips software"},
 {title:"Research",url:"research.html",category:"Research",text:"papers research studies"},
 {title:"World",url:"world.html",category:"World",text:"world developments international affairs"},
 {title:"Explained",url:"explained.html",category:"Explained",text:"explainers science technology"},
 {title:"Latest",url:"latest.html",category:"Latest",text:"latest ORYNT stories"}
];

const input=document.getElementById("searchInput"),results=document.getElementById("searchResults");
if(input&&results){
  input.addEventListener("input",()=>{
    const q=input.value.trim().toLowerCase();
    if(!q){results.innerHTML="";return;}
    const m=window.ORYNT_SEARCH_INDEX.filter(x=>(x.title+" "+x.category+" "+x.text).toLowerCase().includes(q)).slice(0,8);
    results.innerHTML=m.length?m.map(x=>`<a class="search-result" href="${x.url}"><span>${x.category}</span><strong>${x.title}</strong></a>`).join(""):"<p class="search-empty">No ORYNT results found.</p>";
  });
}