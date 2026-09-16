const modal=document.getElementById("searchModal");
document.getElementById("searchBtn").onclick=()=>{modal.classList.add("open");modal.setAttribute("aria-hidden","false");document.getElementById("searchInput").focus()};
document.getElementById("closeSearch").onclick=()=>{modal.classList.remove("open");modal.setAttribute("aria-hidden","true")};
modal.addEventListener("click",e=>{if(e.target===modal)modal.classList.remove("open")});
document.getElementById("langBtn").onclick=()=>alert("The Persian version will be connected as /fa/ when the bilingual content system is added.");
