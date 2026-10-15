/* Jugaad Roulette — static HTML+CSS+JS, single state object */
"use strict";
const $ = (id) => document.getElementById(id);
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- DATA (data-driven: add a joke = add a line) ---------- */
const WHEEL = [
  { id:"bollywood", label:"Bollywood", color:"#635BFF" },
  { id:"cricket", label:"Cricket", color:"#22C55E" },
  { id:"shaadi", label:"Shaadi", color:"#FF7A00" },
  { id:"chai", label:"Chai", color:"#FFB400" },
  { id:"jugaad", label:"Jugaad", color:"#7C3AED" },
  { id:"rishtedaar", label:"Rishtedaar", color:"#06B6D4" },
  { id:"traffic", label:"Traffic", color:"#EF4444" },
  { id:"exam", label:"Exam", color:"#84CC16" },
];
const IDEAS = [
  {t:"Tinder for pressure-cooker whistles",cat:"FOODTECH • JUGAAD",mode:["wild","jugaad"],tags:["jugaad","chai"]},
  {t:"Swiggy for leftover wedding food",cat:"FOODTECH • SHAADI",mode:["wild","shaadi"],tags:["shaadi"]},
  {t:"Uber for 'beta, 2 min mein aaya'",cat:"TRAVEL • RISHTEDAAR",mode:["wild","jugaad"],tags:["rishtedaar","traffic"]},
  {t:"LinkedIn for chai-tapri philosophers",cat:"SOCIAL • CHAI",mode:["wild","b2b"],tags:["chai"]},
  {t:"Duolingo for mom's 'kuch nahi'",cat:"EDTECH • RISHTEDAAR",mode:["wild"],tags:["rishtedaar"]},
  {t:"Smart dupatta with Wi-Fi hotspot",cat:"WEARABLE • JUGAAD",mode:["wild","jugaad"],tags:["jugaad"]},
  {t:"SaaS for Sharma ji's comparisons",cat:"B2B SAAS • RISHTEDAAR",mode:["b2b"],tags:["rishtedaar","exam"]},
  {t:"Scooter-powered inverter",cat:"HARDWARE • JUGAAD",mode:["jugaad"],tags:["jugaad","traffic"]},
  {t:"DRS for family arguments",cat:"SPORTSTECH • CRICKET",mode:["cricket","wild"],tags:["cricket","rishtedaar"]},
  {t:"CRM for 500 uninvited relatives",cat:"B2B • SHAADI",mode:["shaadi","b2b"],tags:["shaadi","rishtedaar"]},
  {t:"IPL auction for gully cricket teams",cat:"SPORTSTECH • CRICKET",mode:["cricket"],tags:["cricket"]},
  {t:"Third-umpire for sabzi bargaining",cat:"FINTECH • CRICKET",mode:["cricket","wild"],tags:["cricket"]},
  {t:"Dhoni-style finisher coaching",cat:"EDTECH • CRICKET",mode:["cricket","b2b"],tags:["cricket","exam"]},
  {t:"Paneer-detection API for weddings",cat:"FOODTECH • SHAADI",mode:["shaadi","wild"],tags:["shaadi"]},
  {t:"Baraat GPS with DJ loudness meter",cat:"TRAVEL • SHAADI",mode:["shaadi","jugaad"],tags:["shaadi","traffic"]},
  {t:"Photographer-jugaad: 10 poses in 2 min",cat:"EVENTS • SHAADI",mode:["shaadi"],tags:["shaadi","bollywood"]},
  {t:"Chai-sutta break scheduler for office",cat:"HRTECH • CHAI",mode:["b2b","wild"],tags:["chai"]},
  {t:"Kulhad-return deposit scheme",cat:"FINTECH • CHAI",mode:["jugaad","b2b"],tags:["chai","jugaad"]},
  {t:"Auto-meter tamper alarm",cat:"TRAVEL • TRAFFIC",mode:["jugaad"],tags:["traffic"]},
  {t:"Signal-jump instant karma cam",cat:"CIVIC • TRAFFIC",mode:["wild","jugaad"],tags:["traffic"]},
  {t:"Mumbai-local seat predictor",cat:"AI • TRAFFIC",mode:["jugaad","b2b"],tags:["traffic","exam"]},
  {t:"Proxy-attendance blockchain",cat:"EDTECH • EXAM",mode:["wild"],tags:["exam"]},
  {t:"Last-night padhai energy drink",cat:"D2C • EXAM",mode:["wild","jugaad"],tags:["exam","chai"]},
  {t:"Viva-voce excuse generator",cat:"AI • EXAM",mode:["wild"],tags:["exam","bollywood"]},
  {t:"Interval-samosa pre-booking",cat:"FOODTECH • BOLLYWOOD",mode:["wild"],tags:["bollywood"]},
  {t:"Spoiler-blocker for cricket WhatsApp",cat:"SOCIAL • CRICKET",mode:["cricket","wild"],tags:["cricket","bollywood"]},
  {t:"Naagin-dance stamina tracker",cat:"FITNESS • BOLLYWOOD",mode:["wild","shaadi"],tags:["bollywood","shaadi"]},
  {t:"Rishta-Biodata Tinder",cat:"SOCIAL • RISHTEDAAR",mode:["wild","shaadi"],tags:["rishtedaar","shaadi"]},
  {t:"'Log kya kahenge' noise-canceller",cat:"WELLNESS • RISHTEDAAR",mode:["wild"],tags:["rishtedaar"]},
  {t:"Mama ji ke contacts ka CRM",cat:"B2B • RISHTEDAAR",mode:["b2b"],tags:["rishtedaar"]},
  {t:"Invoice-chaser named 'Sharma ji'",cat:"FINTECH • B2B",mode:["b2b"],tags:["rishtedaar"]},
  {t:"Standup for dailySoap cliffhangers",cat:"MEDIA • BOLLYWOOD",mode:["b2b","wild"],tags:["bollywood"]},
  {t:"Cooler-to-AC jugaad converter kit",cat:"HARDWARE • JUGAAD",mode:["jugaad"],tags:["jugaad"]},
  {t:"Load-shedding study lamp on cycle",cat:"HARDWARE • EXAM",mode:["jugaad"],tags:["jugaad","exam"]},
  {t:"Puncture-wala UPI loyalty card",cat:"FINTECH • TRAFFIC",mode:["jugaad","b2b"],tags:["traffic","jugaad"]},
  {t:"Hostel-maggi futures trading",cat:"FINTECH • EXAM",mode:["wild"],tags:["exam","chai"]},
];
const AUDS = [
  {t:"Sharma ji ke bete",cat:"CLASSIC RIVAL"},
  {t:"Shaadi wale mama ji",cat:"WEDDING VIP"},
  {t:"Delhi auto wale bhaiya",cat:"TRAFFIC LEGEND"},
  {t:"Chai tapri philosophers",cat:"THINK TANK"},
  {t:"Unemployed engineers",cat:"TALENT POOL"},
  {t:"Husbands everywhere",cat:"BRAVE SOULS"},
  {t:"Pinky aunty's kitty party",cat:"BOARD MEETING"},
  {t:"Bunty from tuition",cat:"GEN-Z PANEL"},
  {t:"IPL fantasy losers",cat:"CRICKET EXPERTS"},
  {t:"Umpire ka decision fans",cat:"CRICKET PURISTS"},
  {t:"DJ wale babu",cat:"SHAADI CREW"},
  {t:"500 gatecrasher cousins",cat:"EXTENDED FAMILY"},
  {t:"Office ke chai-break gang",cat:"STAKEHOLDERS"},
  {t:"Night-shift security bhaiya",cat:"JUGAAD MENTOR"},
  {t:"Traffic signal popcorn sellers",cat:"HUSTLERS"},
  {t:"Exam-hall invigilators",cat:"STRICT PANEL"},
  {t:"Backbenchers union",cat:"ADVISORS"},
  {t:"Bollywood spoiler uncles",cat:"CRITICS"},
  {t:"Daily-soap saas-bahu club",cat:"FOCUS GROUP"},
  {t:"Society ke uncle (升iti meeting)",cat:"GOVERNANCE"},
];
const PLATFORMS = [
  {t:"📱 Mobile App",cat:"ANDROID • iOS APP"},
  {t:"🌐 Website",cat:"WEB APP • LANDING + DASHBOARD"},
  {t:"📱+🌐 Both — App + Website",cat:"FULL STACK • APP + WEB"},
  {t:"📱 Mobile App",cat:"ANDROID • iOS APP"},
  {t:"🌐 Website",cat:"WEB APP • LANDING + DASHBOARD"},
  {t:"📱+🌐 Both — App + Website",cat:"FULL STACK • APP + WEB"},
  {t:"🤖 WhatsApp Bot",cat:"CHATBOT • NO-APP JUGAAD"},
  {t:"🧩 Chrome Extension",cat:"BROWSER • WEB ADD-ON"},
];
const TWISTS = ["delivers only after DJ stops","works only on full Lecture-attendance","extra charge if you say 'bhaiya meter se'","free with 2 samosas","requires mama ji approval","auto-plays dhol on payment","glows during load-shedding","comes with free gyaan from Sharma ji"];
const MONEY = ["commission from mama ji","₹10 per whistle","subscription: 1 cutting chai/day","ads on auto-rickshaw back","fine for spoiler forwards","rent per over (cricket pricing)","shagun-envelope revenue share","upvote-to-unlock"];

/* ---------- STATE ---------- */
let state = {
  stage:"spin", mode:"wild", wheelTheme:null,
  slots:{ build:{item:{t:"📱 Mobile App",cat:"ANDROID • iOS APP"},locked:false}, audience:{item:{t:"Swiggy for leftover wedding food — for Shaadi wale mama ji",cat:"FOODTECH • SHAADI — for WEDDING VIP"},locked:false} },
  spins:{ total:0, rerollsLeft:3, isSpinning:false },
  timers:{ build:{total:300,left:300,running:false,id:null}, pitch:{total:60,left:60,running:false,id:null} },
  saved:[], muted:false, reactions:{},
  twist:"requires mama ji approval", money:"commission from mama ji",
};
const lastPicked = new Set();

/* persistence */
function persist(){ try{
  localStorage.setItem("jr:saved",JSON.stringify(state.saved));
  localStorage.setItem("jr:muted",state.muted?"1":"0");
  localStorage.setItem("jr:stats",JSON.stringify({spins:state.spins.total}));
}catch(e){} }
function restore(){ try{
  state.saved = JSON.parse(localStorage.getItem("jr:saved")||"[]");
  state.muted = localStorage.getItem("jr:muted")==="1";
  const s = JSON.parse(localStorage.getItem("jr:stats")||"{}"); if(s.spins) state.spins.total=s.spins;
}catch(e){} }

/* ---------- AUDIO (Web Audio, no files) ---------- */
let AC=null;
function ac(){ if(!AC){ AC=new (window.AudioContext||window.webkitAudioContext)(); } if(AC.state==="suspended") AC.resume(); return AC; }
function beep(freq,dur,type="square",vol=.08,when=0){ if(state.muted) return; try{
  const c=ac(),o=c.createOscillator(),g=c.createGain();
  o.type=type;o.frequency.value=freq;g.gain.value=vol;
  o.connect(g);g.connect(c.destination);
  const t=c.currentTime+when;o.start(t);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.stop(t+dur);
}catch(e){} }
const sTick=()=>beep(1200,.05,"square",.05);
const sDing=()=>{beep(880,.15,"sine",.12);beep(1320,.25,"sine",.1,.12);};
const sHorn=()=>{[440,494,554,659].forEach((f,i)=>beep(f,.35,"sawtooth",.09,i*.12));};
const sBell=()=>{beep(1568,.5,"sine",.12);beep(1568,.5,"sine",.1,.5);};

/* ---------- HELPERS ---------- */
function toast(msg){ const t=$("toast"); t.textContent=msg; t.classList.add("show"); clearTimeout(t._h); t._h=setTimeout(()=>t.classList.remove("show"),2600); }
function pool(list,mode,theme){
  let l=list.filter(i=>!i.mode||i.mode.includes(mode));
  if(!l.length) l=list.slice();
  if(theme){ const f=l.filter(i=>(i.tags||[]).includes(theme)); if(f.length) l=f; }
  return l;
}
function pick(list){
  const total=list.reduce((s,i)=>s+1,0);
  for(let tries=0;tries<8;tries++){
    const it=list[Math.floor(Math.random()*total)];
    const key=it.t;
    if(!lastPicked.has(key)){ lastPicked.add(key); if(lastPicked.size>5) lastPicked.delete([...lastPicked][0]); return it; }
  }
  return list[Math.floor(Math.random()*list.length)];
}
const rnd=a=>a[Math.floor(Math.random()*a.length)];

/* ---------- RENDER ---------- */
function render(){
  $("rerollsLeft").textContent=state.spins.rerollsLeft;
  $("statSpins").textContent=state.spins.total;
  $("statSaved").textContent=state.saved.length;
  $("deckCount").textContent=state.saved.length;
  $("muteLabel").textContent=state.muted?"OFF":"ON";
  $("btnMute").firstChild.textContent=state.muted?"🔇 ":"🔊 ";
  $("wheelResultPill").textContent="THEME: "+(state.wheelTheme?state.wheelTheme.toUpperCase():"—");
  document.querySelectorAll(".stage-tab").forEach(b=>b.classList.toggle("active",b.dataset.stage===state.stage));
  document.querySelectorAll(".mode-pill").forEach(b=>b.classList.toggle("active",b.dataset.mode===state.mode));
  document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));
  $("view-"+state.stage).classList.add("active");
  $("btnLockBuild").classList.toggle("locked",state.slots.build.locked);
  $("btnLockAud").classList.toggle("locked",state.slots.audience.locked);
  $("btnLockBuild").innerHTML=(state.slots.build.locked?"🔒 LOCKED • ":"🔓 LOCK • ")+"pakka kar do <kbd>L</kbd>";
  $("btnLockAud").innerHTML=(state.slots.audience.locked?"🔒 LOCKED • ":"🔓 LOCK • ")+"pakka kar do";
  // combos — left bar = PLATFORM, right bar = WHAT + FOR WHOM
  const bx=state.slots.build.item, ay=state.slots.audience.item;
  if(bx){$("slotBuild").textContent=bx.t;$("slotBuildCat").textContent=bx.cat;}
  if(ay){$("slotAud").textContent=ay.t;$("slotAudCat").textContent=ay.cat;}
  $("buildComboX").textContent=bx?`${bx.t}`:"—"; $("buildComboY").textContent=ay?`${ay.t}`:"—";
  $("pitchComboX").textContent=bx?`${bx.t}`:"—"; $("pitchComboY").textContent=ay?`${ay.t}`:"—";
  $("buildMeta").textContent = bx?`${bx.cat} • TWIST: ${state.twist||"—"} • PAISE: ${state.money||"—"}`:"—";
  renderDeck();
  updateURL(bx,ay);
}
function renderDeck(){
  const d=$("deck");
  if(!state.saved.length){d.innerHTML=`<p class="hint mono">Abhi khaali hai. Koi pitch save karo — yahin dikhega + localStorage mein save rahega.</p>`;return;}
  d.innerHTML=state.saved.map((s,i)=>`<div class="deck-item"><b>Make ${esc(s.x)}</b><br>💡 ${esc(s.y)}<div class="mono">${esc(s.mode)} • ${esc(s.theme||"no-theme")} • ${esc(s.when)}</div></div>`).join("");
}
const esc=s=>String(s||"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function updateURL(bx,ay){
  try{
    const u=new URL(location.href);
    if(bx&&ay){u.searchParams.set("b",bx.t);u.searchParams.set("a",ay.t);}
    history.replaceState(null,"",u.toString().slice(0,400));
  }catch(e){}
}

/* ---------- SLOT SPIN : left = PLATFORM, right = IDEA-for-AUDIENCE ---------- */
function makeProject(){
  const idea=pick(pool(IDEAS,state.mode,state.wheelTheme));
  const aud=rnd(AUDS);
  return { t:`${idea.t} — for ${aud.t}`, cat:`${idea.cat} — for ${aud.cat}`, idea, aud };
}
async function spinSlots(isReroll=false){
  if(state.spins.isSpinning) return;
  if(isReroll && state.spins.rerollsLeft<=0){ toast("Re-roll khatam! House rule: max 3 😅 Chal, pitch maar."); sBell(); return; }
  state.spins.isSpinning=true; render();
  const jobs=[];
  if(!state.slots.build.locked) jobs.push(animateSlot("slotBuild","build"));
  if(!state.slots.audience.locked) jobs.push(animateSlot("slotAud","audience"));
  if(!jobs.length){ toast("Dono locked hai! Ek to unlock karo 🔓"); state.spins.isSpinning=false; render(); return; }
  // ticking loop
  const tickId=setInterval(sTick,90);
  await Promise.all(jobs);
  clearInterval(tickId);
  // finalize picks — always produces a visible suggestion
  if(!state.slots.build.locked) state.slots.build.item=rnd(PLATFORMS);
  if(!state.slots.audience.locked) state.slots.audience.item=makeProject();
  state.twist=rnd(TWISTS); state.money=rnd(MONEY);
  $("chipTwist").textContent="🌀 TWIST: "+state.twist;
  $("chipMoney").textContent="💰 PAISE KAISE: "+state.money;
  state.spins.total++;
  if(isReroll) state.spins.rerollsLeft--;
  else if(state.spins.total===1){/* first spin free */} else state.spins.rerollsLeft=Math.max(0,state.spins.rerollsLeft- (state.spins.total>1?0:0));
  // first SPIN after initial shouldn't consume? Spec: max 3 re-rolls per session, free first spin. So only count rerolls via SPIN button after first.
  if(state.spins.total>1 && !isReroll){ state.spins.rerollsLeft=Math.max(0,3-Math.min(3,state.spins.total-1)); }
  state.spins.isSpinning=false;
  sDing(); render();
  if(window.confetti && !reducedMotion) confetti({particleCount:45,spread:70,origin:{y:.6}});
}
function animateSlot(elId,which){
  return new Promise(res=>{
    const el=$(elId);
    if(reducedMotion){res();return;}
    el.classList.add("rolling");
    let src, dur;
    if(which==="build"){ src=PLATFORMS; dur=700; }
    else { const ip=pool(IDEAS,state.mode,state.wheelTheme); src=ip.map(i=>({t:i.t})); dur=1100; }
    const iv=setInterval(()=>{ el.textContent=rnd(src).t; },70);
    setTimeout(()=>{clearInterval(iv);el.classList.remove("rolling");res();},dur);
  });
}

/* ---------- WHEEL ---------- */
let rot=0, wheelSpinning=false;
function drawWheel(){
  const c=$("wheel"),ctx=c.getContext("2d"),n=WHEEL.length,R=c.width/2;
  ctx.clearRect(0,0,c.width,c.height);
  const seg=2*Math.PI/n;
  WHEEL.forEach((s,i)=>{
    const a0=rot*Math.PI/180+i*seg, a1=a0+seg;
    ctx.beginPath();ctx.moveTo(R,R);ctx.arc(R,R,R-4,a0,a1);ctx.closePath();
    ctx.fillStyle=s.color;ctx.fill();ctx.lineWidth=2;ctx.strokeStyle="#121316";ctx.stroke();
    ctx.save();ctx.translate(R,R);ctx.rotate(a0+seg/2);ctx.textAlign="right";
    ctx.fillStyle="#fff";ctx.font="bold 17px Space Grotesk, sans-serif";
    ctx.strokeStyle="#0008";ctx.lineWidth=3;ctx.strokeText(s.label,R-16,6);ctx.fillText(s.label,R-16,6);
    ctx.restore();
  });
  // hub
  ctx.beginPath();ctx.arc(R,R,30,0,7);ctx.fillStyle="#FFB400";ctx.fill();ctx.lineWidth=2;ctx.strokeStyle="#121316";ctx.stroke();
  ctx.fillStyle="#121316";ctx.font="bold 13px JetBrains Mono";ctx.textAlign="center";ctx.fillText("DESI",R,R+1);ctx.fillText("SPIN",R,R+15);
}
function spinWheel(){
  if(wheelSpinning||state.spins.isSpinning) return;
  wheelSpinning=true;
  const n=WHEEL.length, seg=360/n;
  const winner=Math.floor(Math.random()*n);
  const target=360*6+(360-winner*seg-seg/2)- (rot%360);
  const start=rot, end=rot+target, t0=performance.now(), dur=reducedMotion?200:3800;
  let lastSeg=Math.floor(start/seg);
  function ease(t){return 1-Math.pow(1-t,3);}
  function frame(now){
    const p=Math.min(1,(now-t0)/dur);
    rot=start+(end-start)*ease(p);
    const cur=Math.floor(rot/seg);
    if(cur!==lastSeg){lastSeg=cur;sTick();}
    drawWheel();
    if(p<1) requestAnimationFrame(frame);
    else{
      wheelSpinning=false;
      const theme=WHEEL[winner].id;
      state.wheelTheme=theme; render(); sHorn();
      if(window.confetti) confetti({particleCount:120,spread:100,origin:{y:.5}});
      toast(`${WHEEL[winner].label} wala idea aa raha hai! 🎉`);
      setTimeout(()=>spinSlots(false),600);
    }
  }
  requestAnimationFrame(frame);
}

/* ---------- TIMERS (drift-corrected) ---------- */
function fmt(s){return `${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;}
function startTimer(which,onDone){
  const T=state.timers[which];
  clearInterval(T.id);
  T.running=true;
  const endAt=Date.now()+T.left*1000;
  T.id=setInterval(()=>{
    const left=Math.max(0,Math.round((endAt-Date.now())/1000));
    T.left=left; paintTimers();
    if(left<=0){clearInterval(T.id);T.running=false;sBell();
      if(window.confetti) confetti({particleCount:90,spread:80});
      toast(which==="build"?"Time up! Ab bol — 60 second ⏱️":"Pitch khatam! Janta ka faisla 👏");
      onDone&&onDone();
    }
  },250);
  paintTimers();
}
function paintTimers(){
  const B=state.timers.build,P=state.timers.pitch;
  $("buildTime").textContent=fmt(B.left);
  $("buildPct").textContent=Math.round(B.left/B.total*100)+"%";
  $("buildRing").style.strokeDashoffset=(326.7*(1-B.left/B.total)).toFixed(1);
  $("buildRing").style.stroke=B.left<=30?"#FF7A00":"#22C55E";
  $("pitchTime").textContent=fmt(P.left);
  $("pitchFill").style.width=(P.left/P.total*100)+"%";
  $("pitchState").textContent=P.running?"BOL RAHA HAI… 🎤":(P.left===0?"KHATAM!":"READY");
  $("pitchTime").parentElement.classList.toggle("blink",P.running&&P.left<=10);
}

/* ---------- SHARE / SAVE / SPOTLIGHT ---------- */
function comboText(){const b=state.slots.build.item,a=state.slots.audience.item;return b&&a?`Make ${b.t} : ${a.t} — jugaad-roulette`:"Jugaad Roulette — spin karo bhai!";}
async function share(){
  const txt=comboText();
  if(navigator.share){try{await navigator.share({title:"Jugaad Roulette",text:txt,url:location.href});toast("Shared! Reels pe daal do 📲");return;}catch(e){}}
  try{await navigator.clipboard.writeText(txt+" "+location.href);toast("Copied! WhatsApp pe chipka do 📋");}catch(e){toast(txt);}
}
function savePitch(){
  const b=state.slots.build.item,a=state.slots.audience.item;
  if(!b||!a){toast("Pehle SPIN karo, phir save! 🎰");return;}
  state.saved.unshift({x:b.t,y:a.t,mode:state.mode,theme:state.wheelTheme,when:new Date().toLocaleString()});
  persist();render();sDing();toast("Deck mein save ho gaya 💾");
}
function reelCard(){
  const b=state.slots.build.item,a=state.slots.audience.item;
  if(!b||!a){toast("Pehle SPIN karo! 🎰");return;}
  const c=$("shareCard"),x=c.getContext("2d");
  x.fillStyle="#FAF9F6";x.fillRect(0,0,1080,1920);
  x.fillStyle="#635BFF";x.fillRect(0,0,1080,420);
  x.fillStyle="#fff";x.font="bold 64px Space Grotesk, sans-serif";x.textAlign="center";
  x.fillText("JUGAAD ROULETTE",540,150);x.font="32px JetBrains Mono, monospace";x.fillText("spin karo bhai • pitch maar",540,220);
  x.fillStyle="#121316";x.font="bold 68px Space Grotesk, sans-serif";
  wrap(x,`Make ${b.t}`,540,620,900,82);wrap(x,`${a.t}`,540,1000,900,76);
  x.fillStyle="#FFB400";x.strokeStyle="#121316";x.lineWidth=6;
  roundRect(x,240,1350,600,110,55);x.fill();x.stroke();
  x.fillStyle="#121316";x.font="bold 44px JetBrains Mono, monospace";x.fillText((state.wheelTheme||state.mode).toUpperCase(),540,1422);
  x.fillStyle="#22C55E";roundRect(x,290,1500,500,90,45);x.fill();x.stroke();
  x.fillStyle="#fff";x.font="bold 40px Space Grotesk";x.fillText("60-sec PITCH",540,1558);
  const l=document.createElement("a");l.download="jugaad-reel.png";l.href=c.toDataURL("image/png");l.click();
  toast("Reel card downloaded 🖼️");
}
function wrap(x,text,cx,y,mw,lh){const w=text.split(" ");let line="",yy=y;x.textAlign="center";for(const word of w){const t=line+word+" ";if(x.measureText(t).width>mw&&line){x.fillText(line,cx,yy);line=word+" ";yy+=lh;}else line=t;}x.fillText(line,cx,yy);return yy;}
function roundRect(x,a,b,w,h,r){x.beginPath();x.moveTo(a+r,b);x.arcTo(a+w,b,a+w,b+h,r);x.arcTo(a+w,b+h,a,b+h,r);x.arcTo(a,b+h,a,b,r);x.arcTo(a,b,a+w,b,r);x.closePath();}

/* ---------- EVENTS ---------- */
function setStage(s){state.stage=s;render();paintTimers();}
function init(){
  restore();
  $("year").textContent="© "+new Date().getFullYear();
  drawWheel();
  // defaults so bars are never empty — even before first spin
  $("chipTwist").textContent="🌀 TWIST: "+(state.twist||"—");
  $("chipMoney").textContent="💰 PAISE KAISE: "+(state.money||"—");
  render(); paintTimers();
  // URL restore (?b=&a=)
  try{
    const q=new URLSearchParams(location.search);
    const b=q.get("b"),a=q.get("a");
    if(b) state.slots.build.item={t:b,cat:"SHARED LINK"};
    if(a) state.slots.audience.item={t:a,cat:"SHARED LINK"};
    if(b||a){state.twist=rnd(TWISTS);state.money=rnd(MONEY);$("chipTwist").textContent="🌀 TWIST: "+state.twist;$("chipMoney").textContent="💰 PAISE KAISE: "+state.money;render();}
  }catch(e){}
  if(state.muted) render();

  document.querySelectorAll(".stage-tab").forEach(btn=>btn.onclick=()=>{setStage(btn.dataset.stage);ac();});
  document.querySelectorAll(".mode-pill").forEach(btn=>btn.onclick=()=>{
    state.mode=btn.dataset.mode;state.wheelTheme=null;state.spins.rerollsLeft=3;
    render();beep(700,.08);toast(`Mode: ${btn.textContent.trim()} — fresh spin karo!`);
  });
  $("btnSpin").onclick=()=>{ac();spinSlots(state.spins.total>=1);};
  $("btnWheel").onclick=()=>{ac();spinWheel();};
  $("btnLockBuild").onclick=()=>{state.slots.build.locked=!state.slots.build.locked;sTick();render();};
  $("btnLockAud").onclick=()=>{state.slots.audience.locked=!state.slots.audience.locked;sTick();render();};
  $("btnBuildGo").onclick=()=>{ if(!state.slots.build.item){toast("Pehle SPIN karo bhai! 🎰");return;} setStage("build"); };
  $("btnToPitch").onclick=()=>setStage("pitch");
  $("btnMute").onclick=()=>{state.muted=!state.muted;persist();render();toast(state.muted?"Chup-chaap mode 🔇":"Sound on 🔊");};

  $("btnBuildStart").onclick=()=>{ac();startTimer("build",()=>setStage("pitch"));toast("Build shuru! 5 min ⏱️");};
  $("btnBuildPause").onclick=()=>{const T=state.timers.build;clearInterval(T.id);T.running=false;paintTimers();};
  $("btnBuildReset").onclick=()=>{const T=state.timers.build;clearInterval(T.id);T.running=false;T.left=T.total;paintTimers();};
  $("btnPitchStart").onclick=()=>{ac();const T=state.timers.pitch;if(T.left===0)T.left=T.total;startTimer("pitch",null);};
  $("btnPitchReset").onclick=()=>{const T=state.timers.pitch;clearInterval(T.id);T.running=false;T.left=T.total;paintTimers();};
  $("btnSave").onclick=savePitch;
  $("btnShare").onclick=share;
  $("btnCard").onclick=reelCard;
  $("btnAgain").onclick=()=>{state.spins.rerollsLeft=3;const T=state.timers.pitch;clearInterval(T.id);T.running=false;T.left=T.total;paintTimers();setStage("spin");spinSlots(false);};
  $("btnClearDeck").onclick=()=>{state.saved=[];persist();render();};
  $("btnSpotlight").onclick=(e)=>{beep(1000,.1);toast("Upvoted! Sharma ji proud 🏆");e.target.textContent="UPVOTED ✓";};
  document.querySelectorAll(".react").forEach(btn=>btn.onclick=()=>{
    const k=btn.dataset.r;state.reactions[k]=(state.reactions[k]||0)+1;
    btn.querySelector("b").textContent=state.reactions[k];
    beep(500+Math.random()*600,.12,"square",.07);
    if(window.confetti&&state.reactions[k]%5===0)confetti({particleCount:30,spread:60,origin:{y:.7}});
  });

  document.addEventListener("keydown",e=>{
    if(e.target.matches("input"))return;
    if(e.code==="Space"){e.preventDefault();ac();spinSlots(state.spins.total>=1);}
    else if(e.key==="l"||e.key==="L")$("btnLockBuild").click();
    else if(e.key==="w"||e.key==="W")spinWheel();
    else if(e.key==="b"||e.key==="B")setStage("build");
    else if(e.key==="p"||e.key==="P")setStage("pitch");
    else if(e.key==="m"||e.key==="M")$("btnMute").click();
  });
}
document.addEventListener("DOMContentLoaded",init);
