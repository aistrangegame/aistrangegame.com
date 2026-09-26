/* ─────────────────────────────────────────────────────────────
   movements/VI-vantages.js — the ten behaviours.

   In this movement the behaviour IS the content, so there is code — but each
   piece is one behaviour, named, and independent of the others. Nothing here
   draws an explanatory diagram.

   Everything rides the kit's one frame loop (ASG.loop), so nothing animates
   off-screen, and every behaviour resolves to a finished state under reduced
   motion.
   ───────────────────────────────────────────────────────────── */
(function(){
if(!window.ASG)return;
var $=function(id){return document.getElementById(id)};
var reduced=ASG.reduced;
/* Ten behaviours, each registered independently. A throw in one used to kill
   every one after it — they were sibling IIFEs in one file. Now each runs in
   its own guard and names itself if it fails, so a fault is visible instead
   of silent. */
var FAIL=[];
function behaviour(name,fn){
  try{fn()}catch(e){FAIL.push(name+': '+(e&&e.message||e))}}
setTimeout(function(){
  if(FAIL.length)document.documentElement.setAttribute('data-vi-fail',FAIL.join(' | '))},0);

/* ═══ 27 · Bindu — you hold still; it goes fast ═══════════════
   The only thing on the page that travels on its own. Hold your finger still
   for four seconds and it comes and rests near your thumb. Press and hold on
   it and it accelerates until its own trace draws the yantra. */
behaviour('bindu',function(){
  var sec=$('v-bindu'),cv=$('bnTrace'),hint=$('bnHint');
  if(!sec||!cv)return;
  var x=.5,y=.42,tx=.5,ty=.42,spin=0,speed=0,held=0,stillAt=0,px=-1,py=-1,pts=[];
  function pick(){tx=.16+Math.random()*.68;ty=.2+Math.random()*.56}
  pick();
  sec.addEventListener('pointermove',function(e){
    var r=sec.getBoundingClientRect();
    var nx=(e.clientX-r.left)/r.width,ny=(e.clientY-r.top)/r.height;
    if(Math.abs(nx-px)>.012||Math.abs(ny-py)>.012){stillAt=Date.now();hint.classList.remove('near')}
    px=nx;py=ny},{passive:true});
  sec.addEventListener('pointerdown',function(){held=Date.now()});
  addEventListener('pointerup',function(){held=0});
  sec.addEventListener('pointerleave',function(){stillAt=0;px=py=-1;hint.classList.remove('near')});
  ASG.loop(sec,function(t){
    var cx=ASG.fitc(cv),w=cv.clientWidth,h=cv.clientHeight;
    /* the inversion: stillness brings it in, pressure sends it fast */
    var still=stillAt&&Date.now()-stillAt>4000&&px>=0;
    if(still){tx=px;ty=py;hint.classList.add('near')}
    speed=held?Math.min(1,(Date.now()-held)/2600):Math.max(0,speed-.02);
    if(speed>.05){
      /* at speed the point stops wandering and draws — one point, a yantra */
      spin+=.02+speed*.34;
      var R=(.1+speed*.3);
      tx=.5+Math.cos(spin)*R*Math.cos(spin*.41);
      ty=.42+Math.sin(spin*1.0)*R*.9*Math.cos(spin*.23)}
    else if(!still&&Math.abs(x-tx)<.01&&Math.abs(y-ty)<.01)pick();
    var e=still?.055:(.02+speed*.2);
    x+=(tx-x)*e;y+=(ty-y)*e;
    if(speed>.05){pts.push([x*w,y*h]);if(pts.length>620)pts.shift()}
    else if(pts.length)pts.shift();
    cx.clearRect(0,0,w,h);
    if(pts.length>2){
      cx.beginPath();cx.moveTo(pts[0][0],pts[0][1]);
      for(var i=1;i<pts.length;i++)cx.lineTo(pts[i][0],pts[i][1]);
      cx.strokeStyle='rgba(212,85,63,'+(.1+speed*.36).toFixed(3)+')';
      cx.lineWidth=1;cx.stroke()}
    cx.beginPath();cx.arc(x*w,y*h,5.5+speed*2,0,6.3);
    cx.fillStyle='#D4553F';cx.fill();
    cx.globalAlpha=.2;cx.beginPath();cx.arc(x*w,y*h,15+speed*22,0,6.3);cx.fill();cx.globalAlpha=1;
  },function(){
    var cx=ASG.fitc(cv),w=cv.clientWidth,h=cv.clientHeight;
    cx.clearRect(0,0,w,h);cx.beginPath();cx.arc(w*.5,h*.42,6,0,6.3);
    cx.fillStyle='#D4553F';cx.fill()});
});

/* ═══ 28 · Gaia — five screens, and the Inversion counts what you walked ═══ */
behaviour('gaia',function(){
  var sec=$('v-gaia'),sky=$('gaSky');
  if(!sec||!sky)return;
  var cur=-1;
  var lights=[],seeded=false;
  function seed(){
    /* the lights are the worlds on this page — and the Inversion only sends up
       the ones actually scrolled past this session. Nothing is invented. */
    var seen=[].slice.call(document.querySelectorAll('[data-world].seen'));
    lights=[];
    seen.forEach(function(w,i){
      var c=w.dataset.c||'#C9A84C';
      lights.push({c:c,x:.08+((i*13)%84)/100,y:.2+((i*29)%62)/100,
        fy:1.12+((i*7)%40)/100,r:1.1+((i*5)%3)*.5})});
    seeded=true}
  ASG.loop(sec,function(t){
    if(!seeded)seed();
    var r=sec.getBoundingClientRect();
    var k=Math.max(0,Math.min(.999,(-r.top)/(r.height-innerHeight||1)));
    var i=Math.max(0,Math.min(4,Math.floor(k*5)));
    if(i!==cur){cur=i;if(i===2)seed()}
    var cx=ASG.fitc(sky),w=sky.clientWidth,h=sky.clientHeight;
    cx.clearRect(0,0,w,h);
    var local=(k*5)-i;
    lights.forEach(function(L,n){
      var ax=L.x,ay=L.y,al=.5;
      if(i===0){al=.08}
      else if(i===1){al=.22+local*.5}
      else if(i===2){ /* the Inversion — they come up from below */
        ay=L.fy+(L.y-L.fy)*Math.min(1,local*1.5);al=.8}
      else if(i===3){ /* the Dissolution — everything to one point */
        ax=L.x+(.5-L.x)*local;ay=L.y+(.42-L.y)*local;al=.85-local*.25}
      else if(i===4){ax=.5;ay=.42;al=Math.max(0,.4-local)}
      cx.globalAlpha=al;cx.beginPath();cx.arc(ax*w,ay*h,L.r,0,6.3);
      cx.fillStyle=L.c;cx.fill()});
    /* v · the Tree — the point becomes a root and grows */
    if(i===4){
      cx.globalAlpha=Math.min(1,local*2);
      cx.strokeStyle='#7FA86B';cx.lineWidth=1.2;cx.beginPath();
      var by=h*.42,gy=Math.min(1,local*1.6);
      cx.moveTo(w*.5,by);cx.lineTo(w*.5,by-h*.2*gy);
      cx.moveTo(w*.5,by-h*.12*gy);cx.lineTo(w*.5-w*.1*gy,by-h*.22*gy);
      cx.moveTo(w*.5,by-h*.12*gy);cx.lineTo(w*.5+w*.1*gy,by-h*.22*gy);
      cx.moveTo(w*.5,by);cx.lineTo(w*.5-w*.07*gy,by+h*.16*gy);
      cx.moveTo(w*.5,by);cx.lineTo(w*.5+w*.07*gy,by+h*.16*gy);
      cx.stroke()}
    cx.globalAlpha=1;
  },function(){});
});

/* ═══ 29 · Sid — the figure built to ignore touch ═══════════════ */
behaviour('sid',function(){
  var ln=$('sdLine'),out=$('sdSaid');
  if(!ln)return;
  var n=0,last=0;
  function touch(){
    var t=Date.now();if(t-last>2600)n=0;last=t;n++;
    if(n>=3){out.textContent='It\u2019s holding.';out.classList.add('on')}}
  ln.addEventListener('click',touch);
  ln.addEventListener('keydown',function(e){
    if(e.key==='Enter'||e.key===' '){e.preventDefault();touch()}});
});

/* ═══ 30 · Arch — the arc draws only while it is being read ═══════
   Gated on reading pace: scroll slowly through her world and it advances.
   Rush, and it does not. */
behaviour('arch',function(){
  var sec=$('v-arch'),p=$('arPath'),svg=$('arArc');
  if(!sec||!p)return;
  var drawn=0,lastY=scrollY,lastT=0;
  ASG.loop(sec,function(t){
    if(!lastT){lastT=t;lastY=scrollY;return}
    var dt=t-lastT,dy=Math.abs(scrollY-lastY);lastT=t;lastY=scrollY;
    if(dt<=0)return;
    var v=dy/dt;                        /* px per ms */
    if(v<0.55&&drawn<1){                /* reading pace, not scanning pace */
      drawn=Math.min(1,drawn+dt/5200);
      p.style.strokeDashoffset=String(1-drawn);
      if(drawn>=1){svg.classList.add('done');
        /* the two ends pass each other and keep going — a doorway, not a door */
        p.setAttribute('d','M-14 96 C-14 20 200 20 200 96')}}
  },function(){drawn=1;svg.classList.add('done');
    p.setAttribute('d','M-14 96 C-14 20 200 20 200 96')});
});

/* ═══ 31 · Sakshi — the same ring, re-parented ═══════════════════
   Not a copy. The element that has been on the rail at vertebra 18 since the
   first paint is moved into her world, and put back when you leave. */
behaviour('sakshi',function(){
  var sec=$('v-sakshi'),seat=$('skSeat'),rail=$('rail');
  if(!sec||!seat||!rail)return;
  var ring=rail.querySelector('i.ring'),home=ring&&ring.nextSibling;
  if(!ring)return;
  /* no local flag: ask the DOM where the ring actually is, so the two states
     can never desync when the loop stops on its way out of view */
  ASG.loop(sec,function(){
    var r=sec.getBoundingClientRect();
    var here=r.top<innerHeight*.45&&r.bottom>innerHeight*.55;
    var seated=ring.parentNode===seat;
    if(here&&!seated)seat.appendChild(ring);
    else if(!here&&seated){
      if(home&&home.parentNode===rail)rail.insertBefore(ring,home);
      else rail.appendChild(ring)}
  },function(){if(ring.parentNode!==seat)seat.appendChild(ring)});
});

/* ═══ 33 · Neev — below the fold, and one tremor you don't choose ═══ */
behaviour('neev',function(){
  var sec=$('v-neev');
  if(!sec)return;
  var g=document.createElement('div');
  g.className='n-ground';g.setAttribute('aria-hidden','true');
  g.innerHTML='<svg viewBox="0 0 300 200" aria-hidden="true">'+
    '<line x1="0" y1="28" x2="300" y2="28" stroke="rgba(147,163,180,.7)" stroke-width="1.4"/>'+
    '<polygon points="150,196 44,32 256,32" fill="none" stroke="rgba(147,163,180,.42)" '+
    'stroke-width="1.1"/></svg>';
  document.body.appendChild(g);
  var shook=false,at=0;
  ASG.loop(sec,function(t){
    var r=sec.getBoundingClientRect();
    var here=r.top<innerHeight*.5&&r.bottom>innerHeight*.5;
    g.classList.toggle('on',here);
    if(!here){return}
    if(!at)at=t+1800+Math.random()*5200;      /* a moment you don't choose */
    if(!shook&&t>at&&!reduced){
      shook=true;
      var hold=sec.querySelector('.hold');
      hold.classList.add('tremor');
      setTimeout(function(){hold.classList.remove('tremor')},320)}
  },function(){g.classList.add('on')});
});

/* ═══ 34 · Shweta — the channel carries the previous world's colour ═══ */
behaviour('shweta',function(){
  var sec=$('v-shweta'),box=$('wwChan');
  if(!sec||!box)return;
  /* read it at runtime from the world before hers, and emit it unchanged */
  var prev=sec.previousElementSibling;
  while(prev&&!prev.dataset.c)prev=prev.previousElementSibling;
  var hue=(prev&&prev.dataset.c)||'#E8A0B6';
  var g='';
  for(var i=0;i<150;i++){
    var gx=(i*37)%300,gy=(i*53)%118;
    if(gx>108&&gx<192)continue;              /* the channel itself stays unmarked */
    g+='<circle class="grain" cx="'+gx+'" cy="'+gy+'" r="'+(.6+((i*7)%3)*.35)+'"/>'}
  box.innerHTML='<svg viewBox="0 0 300 118" role="img" aria-label="Two arcs forming a channel. '+
    'The channel itself is unmarked \u2014 grain and ink fill everything around it. What runs down it '+
    'is the previous world\u2019s own colour, and it leaves at exactly the hue it entered.">'+g+
    '<path class="flow" d="M108 -6 C98 40 98 78 108 124" stroke="rgba(239,231,217,.5)"/>'+
    '<path class="flow" d="M192 -6 C202 40 202 78 192 124" stroke="rgba(239,231,217,.5)"/>'+
    '<path class="flow" id="wwRun" d="M150 -4 L150 122" stroke="'+hue+
    '" stroke-dasharray="26 96" stroke-dashoffset="0"/></svg>';
  var run=box.querySelector('#wwRun'),off=0;
  ASG.loop(sec,function(){
    off=(off+.7)%122;run.setAttribute('stroke-dashoffset',String(-off))},function(){});
  /* what it emits tints the next world */
  var next=sec.nextElementSibling;
  if(next&&next.classList.contains('vant'))next.style.setProperty('--emit',hue);
});

/* ═══ 35 · Ashrey — the nine at eleven per cent, resolving, reversibly ═══ */
behaviour('ashrey',function(){
  var sec=$('v-ashrey'),box=$('axStack');
  if(!sec||!box)return;
  /* the other nine marks, superimposed — no new drawing of his own */
  box.innerHTML='<svg viewBox="0 0 190 190" aria-hidden="true"><g class="x-nine">'+
    '<circle cx="95" cy="95" r="5" fill="#D4553F"/>'+                        /* Bindu */
    '<path d="M22 150 L95 40 L168 150" fill="none" stroke="#7FA86B" stroke-width="1.2"/>'+
    '<line x1="8" y1="95" x2="182" y2="95" stroke="#9BBDE4" stroke-width="3"/>'+
    '<path d="M28 148 C28 52 162 52 162 148" fill="none" stroke="#E6A8BC" stroke-width="1.2"/>'+
    '<circle cx="95" cy="95" r="34" fill="none" stroke="#E8DED4" stroke-width="1.2"/>'+
    '<polygon points="95,158 40,44 150,44" fill="none" stroke="#E8A0B6" stroke-width="1.2"/>'+
    '<line x1="14" y1="166" x2="176" y2="166" stroke="#93A3B4" stroke-width="1.4"/>'+
    '<path d="M62 8 C50 70 50 120 62 182 M128 8 C140 70 140 120 128 182" fill="none" '+
      'stroke="#EFE7D9" stroke-width="1.2"/>'+
    '<circle cx="95" cy="95" r="88" fill="none" stroke="#C9A84C" stroke-width="1.1"/>'+
    '</g><polygon class="x-tri" points="95,18 172,172 18,172" fill="none" stroke="#D4A948" '+
    'stroke-width="1.6"/></svg>';
  var nine=[].slice.call(box.querySelectorAll('.x-nine>*')),tri=box.querySelector('.x-tri');
  ASG.loop(sec,function(){
    var r=sec.getBoundingClientRect();
    var k=Math.max(0,Math.min(1,(-r.top)/(r.height-innerHeight||1)));
    nine.forEach(function(el,i){
      /* they arrive one at a time, in the order you met them */
      var own=Math.max(0,Math.min(1,(k*9)-i));
      el.style.opacity=(.11+own*.34).toFixed(3);
      el.style.transform='scale('+(1-own*.06).toFixed(3)+')';
      el.style.transformOrigin='95px 95px'});
    tri.style.opacity=(Math.max(0,(k-.55)/.45)).toFixed(3);
  },function(){nine.forEach(function(el){el.style.opacity='.11'});tri.style.opacity='1'});
});

/* ═══ 36 · Lalita — the roll re-colours the whole page ═══════════ */
behaviour('lalita',function(){
  var seat=$('llSeat');
  if(!seat)return;
  var on=false;
  function roll(){
    var pool=ASG.worlds.filter(function(w){return w[4]});
    var pick=pool[(Math.random()*pool.length)|0];
    if(!pick)return;
    on=true;
    document.documentElement.style.setProperty('--roll',pick[4]);
    document.body.classList.add('rolled');
    var where=$('where');
    if(where)where.textContent=pick[1];        /* what it rolled, not where you are */
    ASG.sheet('the field rolled',pick[1],
      '<p>She knows the game and plays anyway. This roll re-colours the whole page for as long '+
      'as you stay, and the bar above shows what it rolled rather than where you are.</p>'+
      '<ul><li><a href="#'+pick[0]+'">go there \u2192</a></li></ul>')}
  seat.addEventListener('click',roll);
  seat.addEventListener('keydown',function(e){
    if(e.key==='Enter'||e.key===' '){e.preventDefault();roll()}});
});
})();
