/* ─────────────────────────────────────────────────────────────
   movements/IX-moments.js — Movement IX · The Moments.

   Remembering across time and space. Two moments are full worlds; the rings are
   the container for every other gathering, and they fill from the register —
   nobody edits HTML to add a day. Right now the register holds the two, and the
   world says so rather than staging days that haven't been chosen.

   Care: these gatherings include other families and other people's children. The
   photograph selection happens in the Cowork pass, with that in mind.
   ───────────────────────────────────────────────────────────── */
(function(){
"use strict";
var reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
var $=function(s,r){return (r||document).querySelector(s)};
var NS='http://www.w3.org/2000/svg';
function el(t,a,p){var n=document.createElementNS(NS,t);for(var k in a)n.setAttribute(k,a[k]);
  if(p)p.appendChild(n);return n}
function fail(w,e){document.documentElement.setAttribute('data-ix-fail',w+': '+(e&&e.message||e));
  if(window.console)console.error('[IX '+w+']',e)}

/* ═══ 46 · It Was Always Lucky — the seam is the whole world ══
   Friday 13 April 1956. The world said unlucky; the East said Baisakhi.
   Every line reads one way on the Dark side and another on the Light. */
var READS=[
 ['A Friday the thirteenth.','A Baisakhi.'],
 ['Something bad, every year.','Something good, every year.'],
 ['The same day, for seventy years.','The same day, for seventy years.'],
 ['You were unlucky to be born then.','It was always lucky.']
];
function lucky(){
  /* harvest round four · v2's Dark·Light, restored: the seam is the WHOLE world, not a strip
     inside it. The dark half and the light half share the screen, the gold seam between
     them drags (vertical seam from 1080px, horizontal on a phone), and each half reads the
     same line its own way. Enter on the seam, or a line button, turns to the next pair. */
  var w=$('#d-lucky'),sm=$('#dlSeam'),dk=$('#dlDark'),lt=$('#dlLight'),ln=$('#dlLines');
  if(!w||!sm)return;
  var v=50,i=0;
  function wide(){return innerWidth>=1080}
  function set(n){v=Math.max(22,Math.min(78,n));w.style.setProperty('--sp',v+'%');
    sm.setAttribute('aria-valuenow',Math.round(v))}
  function read(n){i=n;
    [dk,lt].forEach(function(el,k){el.classList.remove('in');void el.offsetWidth;
      el.textContent=READS[i][k];el.classList.add('in')});
    [].forEach.call(ln.children,function(b,k){b.setAttribute('aria-pressed',k===i?'true':'false')})}
  READS.forEach(function(r,n){var b=document.createElement('button');b.type='button';
    b.textContent=n===3?'the close':'line '+(n+1);b.setAttribute('aria-pressed',n===0?'true':'false');
    b.addEventListener('click',function(){read(n)});ln.appendChild(b)});
  set(wide()?50:56);
  var dn=false;
  sm.addEventListener('pointerdown',function(e){dn=true;try{sm.setPointerCapture(e.pointerId)}catch(_){}});
  sm.addEventListener('pointermove',function(e){if(!dn)return;var r=w.getBoundingClientRect();
    set(wide()?(e.clientX-r.left)/r.width*100:(e.clientY-r.top)/r.height*100)});
  addEventListener('pointerup',function(){dn=false});
  sm.addEventListener('keydown',function(e){
    if(/Arrow(Up|Left)/.test(e.key)){e.preventDefault();e.stopPropagation();set(v-5)}
    else if(/Arrow(Down|Right)/.test(e.key)){e.preventDefault();e.stopPropagation();set(v+5)}
    else if(e.key==='Enter'||e.key===' '){e.preventDefault();read((i+1)%READS.length)}});
  addEventListener('resize',function(){set(v)});
}

/* ═══ 47 · Khelo Holi — uncover the day by throwing colour ════
   April's whole mechanic, carried forward: a burst of gulal at the touch point, each grain
   with its own drift and settle; slow rays turning behind; and the colour STAYS. Grains that
   land on the day uncover it and leave their colour there. Nobody is asked to be careful:
   the whole world is the throwing surface, not only the frame.
   Landing is computed at the throw and committed by timer, so the day uncovers even where
   the frame loop never runs; the flight is drawn on top of that where it does. */
var GULAL=['#D4356B','#E8A33D','#4E9E5C','#3E77C0','#8B4FB0','#E05A2B','#00A6A0'];
function holi(){
  var sec=$('#d-holi'),host=$('#d-holi .mk');if(!host)return;
  var rays=document.createElement('div');rays.className='ho-rays';rays.setAttribute('aria-hidden','true');
  sec.insertBefore(rays,sec.firstChild);
  var fly=document.createElement('canvas');fly.className='ho-fly';fly.setAttribute('aria-hidden','true');
  sec.appendChild(fly);
  var box=document.createElement('div');box.className='ho';
  box.innerHTML='<div class="ho-day" aria-hidden="true"></div>'+
    '<span class="ho-note">the photographs of the day arrive in the Cowork pass</span>';
  var cv=document.createElement('canvas');
  cv.setAttribute('role','img');
  cv.setAttribute('aria-label','A veil over the day. Throw colour anywhere and it stays where it lands \u2014 '+
    'and the day shows through wherever colour has fallen.');
  box.insertBefore(cv,box.firstChild.nextSibling);
  host.appendChild(box);
  var ctx=null,thrown=0,G=[],witness=function(){return document.body.dataset.lens==='witness'};
  function reset(){
    ctx=ASG.fitc(cv);
    ctx.globalCompositeOperation='source-over';
    ctx.fillStyle='#F6EADA';ctx.fillRect(0,0,cv.clientWidth,cv.clientHeight);thrown=0}
  /* a grain settles: if it lands on the day, the veil opens there and the colour stays */
  function settle(x,y,r,col){
    if(!ctx)reset();
    var br=box.getBoundingClientRect(),sr=sec.getBoundingClientRect();
    var bx=x-(br.left-sr.left),by=y-(br.top-sr.top);
    if(bx<-r||by<-r||bx>br.width+r||by>br.height+r)return;
    ctx.globalCompositeOperation='destination-out';ctx.globalAlpha=.9;
    ctx.beginPath();ctx.arc(bx,by,r*1.5,0,6.283);ctx.fill();
    ctx.globalCompositeOperation='source-over';ctx.globalAlpha=.36;ctx.fillStyle=col;
    ctx.beginPath();ctx.arc(bx,by,r*1.15,0,6.283);ctx.fill();ctx.globalAlpha=1}
  function burst(x,y,n,still){
    var c=GULAL[(Math.random()*GULAL.length)|0];
    for(var i=0;i<n;i++){
      var a=Math.random()*6.283,s=1.5+Math.random()*6.5,
          p={x:x,y:y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-1.6,r:2+Math.random()*5,l:1,
             d:.014+Math.random()*.014,c:Math.random()<.75?c:GULAL[(Math.random()*GULAL.length)|0]};
      /* where it will come to rest, and when */
      var ex=p.x,ey=p.y,vx=p.vx,vy=p.vy,l=1,f=0;
      while(l>0){vx*=.955;vy=vy*.955+.05;ex+=vx;ey+=vy;l-=p.d;f++}
      (function(ex,ey,r,col,ms){
        if(still||reduced)settle(ex,ey,r,col);
        else setTimeout(function(){settle(ex,ey,r,col)},ms)})(ex,ey,p.r,p.c,f*16);
      if(!still&&!reduced)G.push(p)}
    thrown++;
    var h=$('#d-holi .hint');
    if(h&&thrown===3)h.textContent='it stays where it lands';
    if(h&&thrown===9)h.textContent='you are uncovering the day';}
  function draw(){
    if(!G.length)return;
    var x=ASG.fitc(fly);x.clearRect(0,0,fly.clientWidth,fly.clientHeight);
    G=G.filter(function(p){return p.l>0});
    G.forEach(function(p){p.vx*=.955;p.vy=p.vy*.955+.05;p.x+=p.vx;p.y+=p.vy;p.l-=p.d;
      x.globalAlpha=Math.max(0,p.l)*.85;x.fillStyle=p.c;
      x.beginPath();x.arc(p.x,p.y,p.r*(1.5-p.l*.5),0,6.283);x.fill()});
    x.globalAlpha=1;
    if(!G.length)x.clearRect(0,0,fly.clientWidth,fly.clientHeight)}
  function at(e){
    if(e.target.closest('a,button'))return;
    var r=sec.getBoundingClientRect();burst(e.clientX-r.left,e.clientY-r.top,46,witness())}
  sec.addEventListener('pointerdown',at);
  box.addEventListener('pointermove',function(e){if(e.buttons&&Math.random()<.35){
    var r=sec.getBoundingClientRect();burst(e.clientX-r.left,e.clientY-r.top,14,witness())}});
  cv.setAttribute('tabindex','0');
  cv.addEventListener('keydown',function(e){
    if(e.key==='Enter'||e.key===' '){e.preventDefault();
      var br=box.getBoundingClientRect(),sr=sec.getBoundingClientRect();
      burst(br.left-sr.left+Math.random()*br.width,br.top-sr.top+Math.random()*br.height,46,witness())}});
  /* the veil is drawn on mount; the colour is thrown once when you arrive */
  var arrived=false;
  function arrive(){
    if(arrived)return;arrived=true;if(!ctx)reset();
    var br=box.getBoundingClientRect(),sr=sec.getBoundingClientRect(),
        ox=br.left-sr.left,oy=br.top-sr.top,still=reduced||witness();
    burst(ox+br.width*.28,oy+br.height*.2,70,still);
    setTimeout(function(){burst(ox+br.width*.72,oy+br.height*.15,70,still)},still?0:600)}
  requestAnimationFrame(reset);
  if(!ASG.watch(sec,function(es){es.forEach(function(e){
    if(e.isIntersecting&&e.intersectionRatio>.35)arrive()})},{threshold:[0,.35,.6]}))arrive();
  ASG.loop(sec,draw,function(){});
  addEventListener('resize',function(){ctx=null});
}

  /* ═══ 48 · The Moments — the rings ═══════════════════════════
   Time is the rings; place is where each mark opens. Because birthdays return to
   the same date they line up across the rings as spokes — and 3 March is one
   spoke carrying two names, five rings apart. */
var SPOKES=[
 ['Sid',          4,13,11,'#8A3C12'],
 ['Arch',         8, 9, 6,'#3F6E8A'],
 ['Shweta',       5,21, 3,'#8A6A2E'],
 ['Neev',         2,14, 2,'#6E4A2A'],
 ['Ashrey \u00b7 Karishma',3,3,31,'#A8324E']
];
var MOMENTS=[
 ['It Was Always Lucky',2026,4,13,'#d-lucky'],
 ['Khelo Holi',         2026,4,19,'#d-holi']
];
var Y0=1956,Y1=2026;
function rings(){
  var host=$('#d-rings .mk');if(!host)return;
  var S=300,C=S/2,R0=16,R1=C-14,n=Y1-Y0+1;
  var sv=el('svg',{'class':'rg',viewBox:'0 0 '+S+' '+S,role:'img',
    'aria-label':'A tree\u2019s cross-section. Every year from 1956 is a ring, growing outward a year '+
    'at a time. Because birthdays return to the same date they line up across the rings as spokes \u2014 '+
    'and 3 March is one spoke carrying two names, five rings apart.'},host);
  function rad(y){return R0+((y-Y0)/(n-1))*(R1-R0)}
  function ang(m,d){return ((m-1)/12+(d/31)/12)*6.283-1.5708}
  for(var y=Y0;y<=Y1;y++){
    if(y%5!==1&&y!==Y1)continue;
    el('circle',{'class':'ring'+(y%10===6?' dec':''),cx:C,cy:C,r:rad(y).toFixed(1)},sv)}
  el('circle',{'class':'core',cx:C,cy:C,r:3},sv);
  var lines=[];
  SPOKES.forEach(function(s){
    var a=ang(s[1],s[2]);
    lines.push(el('line',{'class':'spoke',x1:(C+Math.cos(a)*R0).toFixed(1),
      y1:(C+Math.sin(a)*R0).toFixed(1),x2:(C+Math.cos(a)*(R1+6)).toFixed(1),
      y2:(C+Math.sin(a)*(R1+6)).toFixed(1)},sv))});
  MOMENTS.forEach(function(m){
    var a=ang(m[2],m[3]),r=rad(m[1]),g=el('g',{'class':'mark',tabindex:'0',role:'button',
      'aria-label':m[0]+' \u2014 '+m[3]+'.'+m[2]+'.'+m[1]},sv);
    /* the mark is 3.6 units; the target is 26 units — 44px once the ring is scaled down */
    el('circle',{cx:(C+Math.cos(a)*r).toFixed(1),cy:(C+Math.sin(a)*r).toFixed(1),r:38,
      fill:'transparent'},g);
    el('circle',{cx:(C+Math.cos(a)*r).toFixed(1),cy:(C+Math.sin(a)*r).toFixed(1),r:3.6},g);
    el('circle',{cx:(C+Math.cos(a)*r).toFixed(1),cy:(C+Math.sin(a)*r).toFixed(1),r:16,
      fill:'transparent'},g);
    function go(){location.hash=m[4]}
    g.addEventListener('click',go);
    g.addEventListener('keydown',function(e){
      if(e.key==='Enter'||e.key===' '){e.preventDefault();go()}})});
  var t1=el('text',{x:C,y:C+R1+11,'text-anchor':'middle'},sv);t1.textContent=Y0;
  var t2=el('text',{x:C,y:C-R0-5,'text-anchor':'middle'},sv);t2.textContent=Y1;
  /* the spokes meet the spine: each pins to the vertebra of the person it is for */
  var strip=document.createElement('div');strip.className='day-strip';
  SPOKES.forEach(function(s,i){
    var b=document.createElement('button');b.type='button';b.textContent=s[0];
    b.setAttribute('aria-pressed','false');
    b.addEventListener('click',function(){
      var on=b.getAttribute('aria-pressed')==='true';
      strip.querySelectorAll('button').forEach(function(o){o.setAttribute('aria-pressed','false')});
      b.setAttribute('aria-pressed',on?'false':'true');
      lines.forEach(function(L,j){L.classList.toggle('on',!on&&j===i)});
      var said=$('#d-rings .said');
      if(said)said.textContent=on
        ?'Place is where each mark opens. Every year is a ring, and because birthdays return to the same date, they line up across them as spokes.'
        :s[0]+' \u2014 the '+['','January','February','March','April','May','June','July','August',
          'September','October','November','December'][s[1]]+' spoke, pinned to vertebra '+s[3]+
          (i===4?'. One spoke, two names, five rings apart \u2014 the 3 \u00b7 3 from the Temporal, '+
          'visible without a word.':', the vantage it belongs to.')});
    strip.appendChild(b)});
  MOMENTS.forEach(function(m){
    var b=document.createElement('button');b.type='button';b.textContent=m[0];
    b.style.borderStyle='dashed';
    b.addEventListener('click',function(){location.hash=m[4]});
    strip.appendChild(b)});
  host.parentNode.insertBefore(strip,host.nextSibling);
}

function boot(){
  [['lucky',lucky],['holi',holi],['rings',rings]].forEach(function(p){
    try{p[1]()}catch(e){fail(p[0],e)}})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);
else boot();
})();
