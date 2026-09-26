/* ─────────────────────────────────────────────────────────────
   sky.js — the Sky. Pulled all the way out.

   The spine, seen whole — but not as a ladder. The thirty-three are a SEQUENCE
   (Bindu ascending to Lalita), so the order is load-bearing and never scattered.
   What goes is the straight line: the spine meanders across the whole field as
   one continuous curve, and every vertebra is a small sun with its worlds in
   orbit around it.

   Density reads as density: vertebra 1 carries five worlds, so it is the busiest
   star in the sky. The nine empty vertebrae are suns with no moons yet —
   visibly room, not gaps. Vertebra 18 is a ring, as it is on the rail.

   TWO TAPS, never one. A single tap that moves you is a trapdoor, not a door:
   the first tap opens what you are looking at, the second takes you there.
   Every other surface on the site already obeys this.

   Geometry is computed once in CSS pixels and shared: the SVG draws the curve,
   the threads and the stars with it, and the suns and moons are HTML buttons
   placed with it — so the whole sky stays visible while every target clears 44px.
   ───────────────────────────────────────────────────────────── */
(function(){
"use strict";
var NS='http://www.w3.org/2000/svg';
function el(t,a,p){var n=document.createElementNS(NS,t);for(var k in a)n.setAttribute(k,a[k]);
  if(p)p.appendChild(n);return n}
var reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;

/* the four families, as four stretches of the one curve */
function fam(n){
  if(n===1||n===9||n===20||n>=30)return 'R';
  if(n<=8)return 'E';
  if(n<=19)return 'B';
  return 'M'}
var FAMC={E:'#7FC0CF',B:'#E8866A',M:'#8FAEEE',R:'#C9A84C'};
var FAMN={E:'the energy centres',B:'the body',M:'the mind',R:'the recognition points'};

var MOONS=[],PHASE=0,LOOPED=false;

function draw(api){
  var host=document.getElementById('skymap');
  if(!host)return false;
  var W=host.clientWidth,H=host.clientHeight;
  if(!W||!H)return false;

  var W48=api.worlds,VN=api.vnames,VC=api.vcol,vlist=api.vlist;
  host.innerHTML='';MOONS=[];

  /* ── the serpentine: order kept, the column dropped ──────────
     A row holds as many suns as the width allows; rows alternate direction, so
     1 → 33 reads as one continuous meander across the whole field. */
  var PAD=34;
  var per=Math.max(3,Math.min(8,Math.floor((W-PAD*2)/78)));
  var rows=Math.ceil(33/per);
  per=Math.ceil(33/rows);          /* rebalance, so the last row is never a single orphan */
  var cw=(W-PAD*2)/per, ch=(H-PAD*2)/rows;
  var ORB=Math.max(17,Math.min(cw*.40,ch*.38));

  function seat(n){
    var i=n-1,r=Math.floor(i/per),c=i%per;
    if(r%2)c=per-1-c;                              /* every other row runs back */
    /* nothing in a sky sits on a ruled line: each sun rides a little off its row,
       deterministically, so the curve undulates instead of drawing a grid */
    return [PAD+cw*(c+.5)+Math.sin(n*1.7)*cw*.10,
            PAD+ch*(r+.5)+Math.sin(n*.9)*ch*.13]}

  var sv=el('svg',{viewBox:'0 0 '+W+' '+H,'class':'sky-svg',role:'img','aria-label':
    'The spine, seen whole \u2014 thirty-three vertebrae as one meandering curve across the sky, '+
    'in order from Bindu to Lalita. Each vertebra is a small sun; the worlds that stand there '+
    'orbit it as moons, and the pages behind them are stars. Vertebra eighteen is a ring. '+
    'Nine vertebrae have no world of their own yet.'},host);

  /* the curve itself, drawn family by family so each stretch carries its own colour */
  var segs={},prevF=null,d='';
  for(var n=1;n<=33;n++){
    var p=seat(n),f=fam(n);
    if(f!==prevF){if(d)segs[prevF]=(segs[prevF]||'')+d+' ';d='M'+p[0].toFixed(1)+' '+p[1].toFixed(1);prevF=f}
    else{
      var q=seat(n-1);
      var mx=(q[0]+p[0])/2,my=(q[1]+p[1])/2;
      var dx=p[0]-q[0],dy=p[1]-q[1];
      /* the control point is offset ACROSS the direction of travel, never along it:
         along a row the line waves in y, and at the turn it bulges out in x. Offsetting
         along travel is invisible, which is why it read as a ruled grid. */
      var cxp,cyp;
      if(Math.abs(dx)>=Math.abs(dy)){cxp=mx;cyp=my+(n%2?1:-1)*ch*.20}
      else{cxp=mx+(mx>W/2?1:-1)*cw*.62;cyp=my}
      d+=' Q'+cxp.toFixed(1)+' '+cyp.toFixed(1)+' '+p[0].toFixed(1)+' '+p[1].toFixed(1)}}
  if(d)segs[prevF]=(segs[prevF]||'')+d;
  Object.keys(segs).forEach(function(f){
    el('path',{'class':'sky-curve','d':segs[f],stroke:FAMC[f]},sv)});

  /* the family threads: what belongs together, faintly joined across the whole sky */
  var byMv={};
  W48.forEach(function(w){(byMv[w[2]]=byMv[w[2]]||[]).push(w)});
  Object.keys(byMv).forEach(function(mv){
    var ws=byMv[mv];
    for(var i=1;i<ws.length;i++){
      var a=vlist(ws[i-1][3]),b=vlist(ws[i][3]);
      if(!a.length||!b.length)continue;
      var pa=seat(a[0]),pb=seat(b[0]);
      el('path',{'class':'sky-thread',
        d:'M'+pa[0].toFixed(1)+' '+pa[1].toFixed(1)+' Q'+((pa[0]+pb[0])/2).toFixed(1)+' '+
          ((pa[1]+pb[1])/2-ch*.30).toFixed(1)+' '+pb[0].toFixed(1)+' '+pb[1].toFixed(1)},sv)}});

  /* the register, as stars: drawn by density behind the world they belong to.
     The counts come from the engine's tally (the only place counts live) and from the
     register when it carries per-world entries — never from a number typed here. */
  var PG={},REG=api.register,T=window.ASG_TALLY||{};
  var TMAP={walk:T.walk,teachings:T.teachings,guidebook:T.guide,courses:T.courses,
    forms:T.forms,dances:T.dances,readings:T.readings,
    learning:(T.learning&&T.learning.built)};
  W48.forEach(function(w){
    var c=(REG&&REG.count?REG.count(w[0]):0)||TMAP[w[0]]||0;
    if(c)PG[w[0]]=c});
  var starN=0;
  W48.forEach(function(w){
    var c=PG[w[0]];if(!c)return;
    var vs=vlist(w[3]),n=vs.length?vs[0]:1,p=seat(n);
    var many=Math.min(26,Math.round(Math.sqrt(c)));
    for(var k=0;k<many;k++){
      var a=(starN*2.399+k*1.1),rr=ORB*(1.15+((k*7)%9)/13);
      el('circle',{'class':'sky-star'+(k%3?'':' tw'),
        cx:(p[0]+Math.cos(a)*rr).toFixed(1),cy:(p[1]+Math.sin(a)*rr*.72).toFixed(1),
        r:(k%4?.7:1.05),style:'--i:'+(k%7)},sv)}
    starN++});

  /* ── the suns: one per vertebra, in order, each a 44px target ── */
  var atV={};
  W48.forEach(function(w){vlist(w[3]).forEach(function(n){
    if(typeof w[3]==='number'||Array.isArray(w[3]))(atV[n]=atV[n]||[]).push(w)})});

  for(var n2=1;n2<=33;n2++){(function(n){
    var p=seat(n),here=atV[n]||[],f=fam(n);
    var b=document.createElement('button');
    b.type='button';
    b.className='sky-sun'+(here.length?'':' bare')+(n===18?' ring':'');
    b.style.cssText='left:'+p[0].toFixed(1)+'px;top:'+p[1].toFixed(1)+'px;--p:'+VC[n]+
      ';--f:'+FAMC[f]+';--r:'+Math.round(ORB)+'px';
    b.dataset.v=n;
    b.setAttribute('aria-label',n+' \u00b7 '+VN[n]+' \u00b7 '+
      (here.length?here.length+(here.length>1?' worlds stand':' world stands')+' here'
       :'no world of its own yet \u2014 the walk passes through it'));
    b.innerHTML='<i></i><u>'+n+'</u>';
    b.addEventListener('click',function(){api.railSheet(n)});
    b.addEventListener('pointerenter',function(){say(VN[n],'vertebra '+n+' \u00b7 '+FAMN[f])});
    b.addEventListener('focus',function(){say(VN[n],'vertebra '+n+' \u00b7 '+FAMN[f])});
    host.appendChild(b);
  })(n2)}

  /* ── the moons: every world, in orbit around the vertebra it stands on ── */
  var built=0;
  W48.forEach(function(w,wi){
    var vs=vlist(w[3]),n=vs.length?vs[0]:1;
    if(w[3]==='all')n=17;
    var p=seat(n),sib=atV[n]||[],k=Math.max(1,sib.length),idx=sib.indexOf(w);
    if(idx<0)idx=wi%k;
    if(w[5])built++;
    var b=document.createElement('button');
    b.type='button';b.className='sky-moon'+(w[5]?'':' soon');
    b.style.setProperty('--p',w[4]);
    b.dataset.id=w[0];
    var pages=PG[w[0]]?' \u00b7 '+PG[w[0]]+' pages':'';
    b.setAttribute('aria-label',w[1]+' \u00b7 '+w[2]+' \u00b7 at '+VN[n]+pages+
      (w[5]?'':' \u00b7 not on this page yet')+' \u2014 open it');
    b.innerHTML='<i></i>';
    /* TWO TAPS: this one opens the card. The card carries the going. */
    b.addEventListener('click',function(){card(api,w,n,PG[w[0]]||0)});
    b.addEventListener('pointerenter',function(){say(w[1],w[2]+' \u00b7 '+VN[n]+pages)});
    b.addEventListener('focus',function(){say(w[1],w[2]+' \u00b7 '+VN[n]+pages)});
    host.appendChild(b);
    MOONS.push({el:b,cx:p[0],cy:p[1],
      r:ORB*(idx%2?.62:1),                          /* two orbital shells, so five fit */
      a0:(idx/k)*6.28318+(n*.7),
      sp:(idx%2?.00020:-.00013)*(1+(n%3)*.22)})});

  /* the sky owns the height its contents need */
  var need=PAD*2+ch*rows;
  if(need>host.clientHeight)host.style.height=need+'px';

  place(0);
  if(!LOOPED&&!reduced&&window.ASG&&ASG.loop){
    LOOPED=true;
    ASG.loop(host,function(t){
      if(document.body.dataset.lens==='witness')return;   /* nothing arrives in Witness */
      PHASE=t;place(t)},function(){place(0)})}

  /* the line, from the register — never a number typed here */
  var line=document.getElementById('skyLine');
  if(line){
    var total=0;Object.keys(PG).forEach(function(k){total+=PG[k]});
    var bare=[];for(var z=1;z<=33;z++)if(!(atV[z]||[]).length)bare.push(z);
    line.textContent=W48.length+' worlds on thirty-three vertebrae, '+built+' of them built. '+
      total+' pages behind them, every one a star \u2014 drawn by density, not one for one. '+
      bare.length+' vertebrae hold no world of their own yet: '+bare.join(', ')+
      ' \u2014 and the walk passes through all of them. Room, not gaps.'}
  return true}

function place(t){
  for(var i=0;i<MOONS.length;i++){var m=MOONS[i];
    var a=m.a0+t*m.sp;
    m.el.style.left=(m.cx+Math.cos(a)*m.r).toFixed(1)+'px';
    m.el.style.top=(m.cy+Math.sin(a)*m.r*.66).toFixed(1)+'px';
    m.el.style.zIndex=Math.sin(a)>0?3:1}}

/* the name of whatever you are touching — the Sky's own quiet readout */
function say(name,sub){
  var r=document.getElementById('skyRead');if(!r)return;
  var b=r.querySelector('b'),s=r.querySelector('span');
  if(b)b.textContent=name;if(s)s.textContent=sub||''}

/* ── the first tap: the card. The second tap is inside it. ── */
function card(api,w,n,pages){
  var sec=document.querySelector('[data-world="'+w[0]+'"]');
  var one=sec&&sec.dataset.one,tue=sec&&sec.dataset.tuesday,guide=sec&&sec.dataset.guide;
  var vn=api.vnames[n];          /* vnames is the NAME TABLE, not a function */
  api.sheet('a light in the sky',w[1],
    '<p style="color:rgba(245,239,230,.62);font-size:11px;letter-spacing:.2em;'+
    'text-transform:uppercase;margin-bottom:10px">Movement '+w[2]+' \u00b7 standing at '+n+
    ' \u00b7 '+vn+(pages?' \u00b7 '+pages+' pages':'')+'</p>'+
    (one?'<p>'+one+'</p>':'')+
    (tue?'<p style="color:rgba(245,239,230,.72)"><b style="font-weight:500">A Tuesday.</b> '+
      tue+'</p>':'')+
    '<ul>'+
    (w[5]?'<li><button type="button" data-go="'+w[0]+'" style="color:var(--gold)">'+
      'take me there \u2192</button></li>':
      '<li><span style="display:block;min-height:44px;line-height:44px;'+
      'color:rgba(245,239,230,.55)">specified and positioned \u2014 it arrives with its '+
      'movement</span></li>')+
    (guide?'<li><a href="'+guide+'">its guide page \u2192</a></li>':'')+
    '<li><button type="button" data-v="'+n+'" style="color:rgba(245,239,230,.76)">'+
      'everything standing at '+vn+' \u2192</button></li></ul>'+
    '<p style="color:rgba(245,239,230,.5);font-size:12.5px;margin-top:10px">Two taps, never '+
    'one \u2014 the first opens what you are looking at, the second takes you there.</p>');
  var sb=document.getElementById('shB');
  if(!sb)return;
  var go=sb.querySelector('[data-go]');
  if(go)go.addEventListener('click',function(){
    if(api.goTo)api.goTo(w[0]);else location.hash='#'+w[0];
    if(window.ASG&&ASG.close)ASG.close()});
  var vb=sb.querySelector('[data-v]');
  if(vb)vb.addEventListener('click',function(){api.railSheet(n)})}

window.ASGsky={draw:draw,say:say};
})();
