const modal=document.getElementById("searchModal");
const searchBtn=document.getElementById("searchBtn");
const closeSearch=document.getElementById("closeSearch");
if(searchBtn&&modal){searchBtn.onclick=()=>{modal.classList.add("open");modal.setAttribute("aria-hidden","false");const input=document.getElementById("searchInput");if(input)input.focus()};}
if(closeSearch&&modal){closeSearch.onclick=()=>{modal.classList.remove("open");modal.setAttribute("aria-hidden","true")};modal.addEventListener("click",e=>{if(e.target===modal)modal.classList.remove("open")});}
const langBtn=document.getElementById("langBtn");
if(langBtn)langBtn.onclick=()=>{window.location.href="fa/index.html"};
window.ORYNT_SEARCH_INDEX=[
 {title:"NVIDIA: From Graphics to the AI Infrastructure Era",url:"articles/nvidia-ai-infrastructure.html",category:"Technology",text:"GPU CUDA AI infrastructure Vera Rubin computing"},
 {title:"The race for next-generation chips is changing computing",url:"article-work.html",category:"Computing",text:"chips semiconductor computing"},
 {title:"Science",url:"science.html",category:"Science",text:"science research discoveries"},
 {title:"Space",url:"space.html",category:"Space",text:"space missions astronomy"},
 {title:"Technology",url:"technology.html",category:"Technology",text:"technology AI semiconductors"},
 {title:"Computing",url:"computing.html",category:"Computing",text:"computing chips software"},
 {title:"Research",url:"research.html",category:"Research",text:"papers research studies"},
 {title:"World",url:"world.html",category:"World",text:"world developments"},
 {title:"Explained",url:"explained.html",category:"Explained",text:"explainers science technology"}
];
const input=document.getElementById("searchInput"),results=document.getElementById("searchResults");
if(input&&results){input.addEventListener("input",()=>{const q=input.value.trim().toLowerCase();if(!q){results.innerHTML="";return;}const m=window.ORYNT_SEARCH_INDEX.filter(x=>(x.title+" "+x.category+" "+x.text).toLowerCase().includes(q)).slice(0,8);results.innerHTML=m.length?m.map(x=>`<a class="search-result" href="${x.url}"><span>${x.category}</span><strong>${x.title}</strong></a>`).join(""):"<p class=\"search-empty\">No ORYNT results found.</p>";});}
