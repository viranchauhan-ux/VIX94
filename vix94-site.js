
const VIX94_LIBRARY =
  "https://pub-feb120eabdf4471980ef8f1331d8baab.r2.dev/afterhoursmusicmix/library.json";

async function vix94FetchLibrary(){
  const r=await fetch(VIX94_LIBRARY,{cache:"no-store"});
  if(!r.ok) throw new Error("Library unavailable");
  const data=await r.json();
  if(!Array.isArray(data)) throw new Error("Invalid library");
  return data.filter(x=>typeof x==="string" && x.trim());
}

function vix94CleanName(name){
  return String(name||"").split("/").pop().replace(/\.[^.]+$/,"").replace(/[_]+/g," ").replace(/\s+/g," ").trim();
}

function vix94ParseTrack(filename){
  const clean=vix94CleanName(filename);
  const parts=clean.split(/\s+-\s+/);
  if(parts.length>=2){
    return {artist:parts.shift().trim(), title:parts.join(" - ").trim(), filename};
  }
  return {artist:"VIX 94' Selection", title:clean||"Untitled", filename};
}

function vix94TrackUrl(filename){
  return "track.html?track="+encodeURIComponent(filename);
}

function vix94Escape(s){
  return String(s||"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
}

function vix94RenderNav(){
  const nav=document.querySelector(".vix-nav-links");
  if(!nav) return;
  nav.innerHTML=[
    ["index.html","Radio"],
    ["discover.html","Discover"],
    ["artists.html","Artists"],
    ["recently-played.html","Recently Played"],
    ["originals.html","Originals"],
    ["submit.html","Submit Music"],
    ["about.html","About"],
    ["contact.html","Contact"]
  ].map(([href,label])=>`<a href="${href}">${label}</a>`).join("");
}

function vix94AddRecent(track){
  try{
    const key="vix94_recent";
    const current=JSON.parse(localStorage.getItem(key)||"[]");
    const item=vix94ParseTrack(track);
    const next=[item,...current.filter(x=>x.filename!==track)].slice(0,30);
    localStorage.setItem(key,JSON.stringify(next));
  }catch(_){}
}

function vix94GetRecent(){
  try{return JSON.parse(localStorage.getItem("vix94_recent")||"[]")}catch(_){return []}
}

document.addEventListener("DOMContentLoaded",()=>{
  vix94RenderNav();
});
