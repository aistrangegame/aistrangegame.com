/* ─────────────────────────────────────────────────────────────
   movements/VII-ground.js — Movement VII · The Ground.

   The only movement where nothing was made. Everything here was noticed.
   Six worlds, one stone, one fixed light. Order: everyone who ever noticed →
   one family → one person → one moment → what it becomes when it takes form.

   Every world is one screen: the name, the mark, the moment, one paragraph,
   and the play. The deeper material opens in the kit's sheet.
   ───────────────────────────────────────────────────────────── */
(function(){
"use strict";
var reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
var $=function(s,r){return (r||document).querySelector(s)};
var NS='http://www.w3.org/2000/svg';
function el(t,a,p){var n=document.createElementNS(NS,t);for(var k in a)n.setAttribute(k,a[k]);
  if(p)p.appendChild(n);return n}
function fail(w,e){document.documentElement.setAttribute('data-vii-fail',w+': '+(e&&e.message||e));
  if(window.console)console.error('[VII '+w+']',e)}

/* ── the session's own scroll path, recorded from load (37 · The Field) ── */
var PATH=[],lastY=-1;
(function(){
  function rec(){
    var h=document.documentElement.scrollHeight-innerHeight;
    var y=h>0?Math.min(1,Math.max(0,scrollY/h)):0;
    if(Math.abs(y-lastY)<.002)return;
    lastY=y;PATH.push(y);
    if(PATH.length>900)PATH.splice(0,300)}
  rec();addEventListener('scroll',rec,{passive:true});
})();

/* ═══ 37 · The Field — one idea, many doors ═══════════════════ */
function field(){
  var host=$('#g-field .mk');if(!host)return;
  var W=400,H=150,sv=el('svg',{'class':'f-trace inc',viewBox:'0 0 '+W+' '+H,role:'img',
    'aria-label':'One point and its trace \u2014 the actual line you scrolled through this page, '+
    'this session. Press it and the path replays at speed, until the line fills and becomes a shape.'},
    host);
  var fillP=el('path',{'class':'fill'},sv),line=el('path',{},sv),dot=el('circle',{r:2.6},sv);
  function geom(n){
    var pts=PATH.slice(-n||-PATH.length),L=pts.length;
    if(L<2)return null;
    var d='';
    for(var i=0;i<L;i++){
      var x=8+(i/(L-1))*(W-16),y=10+pts[i]*(H-20);
      d+=(i?'L':'M')+x.toFixed(1)+' '+y.toFixed(1)}
    return {d:d,x:8+(W-16),y:10+pts[L-1]*(H-20)}}
  function draw(){
    var g=geom();if(!g)return;
    line.setAttribute('d',g.d);dot.setAttribute('cx',g.x);dot.setAttribute('cy',g.y)}
  draw();
  ASG.loop(host,function(){},draw);
  addEventListener('scroll',function(){if(ASG.visible&&!ASG.visible(host))return;draw()},{passive:true});
  /* press: the path replays in four seconds, and at speed the line fills */
  var playing=false;
  function replay(){
    if(playing||reduced){fillP.setAttribute('stroke-width','7');return}
    playing=true;var t0=Date.now();
    (function step(){
      var k=Math.min(1,(Date.now()-t0)/4000);
      var g=geom();if(g){fillP.setAttribute('d',g.d);
        fillP.setAttribute('stroke-width',(k*9).toFixed(2))}
      if(k<1)requestAnimationFrame(step);
      else{playing=false;
        setTimeout(function(){fillP.setAttribute('stroke-width','0')},900)}})()}
  sv.addEventListener('click',replay);
  sv.setAttribute('tabindex','0');sv.setAttribute('role','button');
  sv.addEventListener('keydown',function(e){
    if(e.key==='Enter'||e.key===' '){e.preventDefault();replay()}});
}

/* ═══ 38 · The Registers — what everyone noticed ══════════════ */
var TRADS=['Sanskrit','Buddhist','Tibetan','Sufi','Chinese','Taoist','Celtic','Lakota','Kabbalistic',
  'Egyptian','Yoruba','Norse','Greek','Aboriginal Australian','M\u0101ori','Advaita','Zen',
  'Christian mystic','Jungian','Mayan'];
/* Each tradition named in its own terms. Never converted into another's vocabulary.
   Lakota material is register and attribution only — never a ceremony to perform. */
var REGS=[
 ['body',{Sanskrit:'chakra',Chinese:'dantian',Tibetan:'tsa \u00b7 lung',Yoruba:'or\u00ed',Egyptian:'ka'}],
 ['relational',{Lakota:'mit\u00e1kuye oy\u00e1s\u02bci\u014b',Celtic:'awen',Tibetan:'refuge',
   Norse:'wyrd','M\u0101ori':'whakapapa'}],
 ['elemental',{Sanskrit:'pa\u00f1ca bh\u016bta',Chinese:'w\u01d4 x\u00edng',Greek:'stoicheia',
   Celtic:'the four treasures','Aboriginal Australian':'Country'}],
 ['temporal',{Sanskrit:'yuga',Mayan:'tzolk\u02bcin',Norse:'wyrd',Celtic:'the wheel',
   'Aboriginal Australian':'the Dreaming'}],
 ['cosmological',{Kabbalistic:'sefirot',Sanskrit:'loka',Norse:'the nine worlds',Egyptian:'duat',
   Tibetan:'bardo'}],
 ['structural',{Kabbalistic:'Tree of Life',Sanskrit:'\u015ar\u012b Yantra',Chinese:'I Ching',
   Yoruba:'Od\u00f9',Norse:'runes'}],
 ['archetypal',{Greek:'theoi',Yoruba:'\u00f2r\u00ec\u1e63\u00e0',Sanskrit:'devat\u0101',
   Norse:'\u00e6sir',Jungian:'archetypes'}],
 ['consciousness-operation',{Sanskrit:'v\u1e5btti',Buddhist:'skandha',Sufi:'la\u1e6d\u0101\u02bcif',
   Tibetan:'rigpa',Taoist:'w\u00fa w\u00e9i'}],
 ['belief-dissolution',{Buddhist:'anatt\u0101',Sufi:'fan\u0101\u02bc',Advaita:'neti neti',Zen:'mu',
   'Christian mystic':'ken\u014dsis'}],
 ['creative-act',{Sanskrit:'l\u012bl\u0101',Celtic:'awen',Greek:'po\u00ed\u0113sis',
   Yoruba:'\u00e0\u1e63\u1eb9','M\u0101ori':'mana'}],
 ['generative',{Sanskrit:'\u015bakti',Chinese:'q\u00ec',Egyptian:'heka',Yoruba:'\u00e0\u1e63\u1eb9',
   'M\u0101ori':'mana'}]
];
function registers(){
  var host=$('#g-registers .mk');if(!host)return;
  var W=420,H=190,top=12,rowH=(H-24)/10,colW=(W-28)/(TRADS.length-1);
  var sv=el('svg',{'class':'r-grid inc',viewBox:'0 0 '+W+' '+H,role:'img',
    'aria-label':'Eleven horizontal bands \u2014 the eleven kinds of register \u2014 with twenty '+
    'traditions crossing them at the heights where each names something. No legend, no hierarchy, '+
    'no centre. Drag across and the bands slide out of alignment: the traditions do not agree.'},host);
  var bands=[],marks=[];
  REGS.forEach(function(r,i){
    var y=top+i*rowH,g=el('g',{},sv);
    bands.push(el('line',{'class':'band',x1:8,y1:y,x2:W-8,y2:y},g));
    TRADS.forEach(function(t,c){
      if(!r[1][t])return;
      var x=14+c*colW;
      var m=el('circle',{'class':'nm',cx:x.toFixed(1),cy:y.toFixed(1),r:2.1},g);
      m.dataset.reg=i;m.dataset.trad=t;marks.push(m)})});
  /* the shear — the disagreement is the content */
  var dragging=false,x0=0,sh=0;
  function shear(v){sh=Math.max(-26,Math.min(26,v));
    bands.forEach(function(b,i){var o=(i-5)*sh*.34;
      b.parentNode.setAttribute('transform','translate('+o.toFixed(1)+' 0)')})}
  sv.addEventListener('pointerdown',function(e){dragging=true;x0=e.clientX-sh;
    sv.setPointerCapture&&sv.setPointerCapture(e.pointerId)});
  sv.addEventListener('pointermove',function(e){if(dragging)shear(e.clientX-x0)});
  addEventListener('pointerup',function(){dragging=false});
  /* one control: the eleven bands. Touch one and every tradition's name for it lights. */
  var strip=document.createElement('div');strip.className='r-strip';
  REGS.forEach(function(r,i){
    var b=document.createElement('button');b.type='button';b.textContent=r[0];
    b.setAttribute('aria-pressed','false');
    b.addEventListener('click',function(){
      strip.querySelectorAll('button').forEach(function(o){o.setAttribute('aria-pressed','false')});
      b.setAttribute('aria-pressed','true');
      bands.forEach(function(x,j){x.classList.toggle('on',j===i)});
      marks.forEach(function(m){var on=+m.dataset.reg===i;
        m.classList.toggle('lit',on);m.classList.toggle('dim',!on)});
      var rows=Object.keys(r[1]).map(function(t){
        return '<li><button type="button" data-t="'+t+'"><span style="display:inline-block;'+
          'min-width:11em;color:rgba(245,239,230,.6)">'+t+'</span>'+r[1][t]+'</button></li>'}).join('');
      ASG.sheet('a register',r[0],
        '<p style="color:rgba(245,239,230,.72)">What each tradition named here, in its own terms. '+
        'None of them is a translation of another, and none owns the whole.</p><ul>'+rows+'</ul>'+
        '<p style="color:rgba(245,239,230,.55);font-size:13px">Touch a tradition to light its '+
        'namings across all eleven bands \u2014 the other nineteen stay visible, never removed.</p>');
      var sb=document.getElementById('shB');
      sb&&sb.querySelectorAll('[data-t]').forEach(function(btn){
        btn.addEventListener('click',function(){
          var t=btn.dataset.t;
          bands.forEach(function(x){x.classList.remove('on')});
          marks.forEach(function(m){var on=m.dataset.trad===t;
            m.classList.toggle('lit',on);m.classList.toggle('dim',!on)});
          ASG.close()})})});
    strip.appendChild(b)});
  host.parentNode.insertBefore(strip,host.nextSibling);
}

/* ═══ 39 · The Temporal — 3 · 5 · 8 ═══════════════════════════ */
var YEARS=[2002,2005,2007,2009,2010,2012,2017,2020,2022];
var UNVER=[2009];                      /* marked differently, visibly */
function temporal(){
  var host=$('#g-temporal .mk');if(!host)return;
  var W=430,H=130,mid=H/2,x0=20,step=(W-40)/(YEARS.length-1);
  var sv=el('svg',{'class':'t-line inc',viewBox:'0 0 '+W+' '+H,role:'img',
    'aria-label':'A line of dates with five-year arcs above it and three-year arcs below. Where a '+
    'three and a five meet, the two arcs close into an eight.'},host);
  function X(y){return x0+YEARS.indexOf(y)*step}
  el('line',{'class':'ax',x1:10,y1:mid,x2:W-10,y2:mid},sv);
  function arc(a,b,up){
    var xa=X(a),xb=X(b),r=(xb-xa)/2;
    el('path',{'class':up?'a5':'a3',
      d:'M'+xa+' '+mid+' A'+r+' '+(up?r*.92:r*.72)+' 0 0 '+(up?1:0)+' '+xb+' '+mid},sv)}
  [[2002,2007],[2005,2010],[2012,2017],[2017,2022]].forEach(function(p){arc(p[0],p[1],true)});
  [[2002,2005],[2007,2010],[2009,2012],[2017,2020]].forEach(function(p){arc(p[0],p[1],false)});
  /* where a 3 and a 5 share an endpoint, the two arcs close into an 8 */
  [2002,2010,2012,2017].forEach(function(y){
    var x=X(y);
    el('path',{'class':'eight',d:'M'+x+' '+mid+' a7 7 0 1 1 0 -.1 M'+x+' '+mid+' a7 7 0 1 0 0 .1'},sv)});
  YEARS.forEach(function(y){
    var un=UNVER.indexOf(y)>=0;
    el('circle',{'class':'dot'+(un?' un':''),cx:X(y),cy:mid,r:3.4},sv);
    /* the years sit below the deepest three-year arc (r·.72 ≈ 35 units): at mid+19 the arcs struck
       through "2009" and "2017" */
    var t=el('text',{'class':'yr'+(un?' un':''),x:X(y),y:mid+50,'text-anchor':'middle'},sv);
    t.textContent=y});
  /* rotate the device: the 8 turns on its side and becomes ∞ */
  var turned=false;
  /* A transform does not participate in layout, so the turned figure spilled ~92px above
     and below its grid row — straight across this world's own label and headline. The
     turn now RESERVES the extent it occupies, measured from the figure's own box rather
     than guessed, so layout follows the transform. */
  function turn(on){turned=on!==undefined?on:!turned;
    var box=sv.parentNode;
    if(turned){
      /* read in the same tick the class lands, so this rect is still the UN-rotated box:
         the turned extent is its width times the scale the figure declares (.82). */
      var r=sv.getBoundingClientRect();
      box.style.minHeight=Math.ceil(Math.max(r.width*.82,r.height))+'px'}
    else box.style.minHeight='';
    sv.classList.toggle('turned',turned);
    var h=$('#g-temporal .hint');
    if(h)h.textContent=turned?'the eight, on its side':'turn it · or turn the device'}
  var btn=$('#g-temporal [data-turn]');
  if(btn)btn.addEventListener('click',function(){turn()});
  /* "turn the device" is a gesture only a device has. On a desktop this fired on the
     initial load — landscape is simply true there — so the page opened already turned,
     with no way to read it and no gesture that meant anything. It now answers a real
     orientation CHANGE on a touch device, and nothing on load. */
  if(window.matchMedia&&matchMedia('(pointer:coarse)').matches){
    var mq=matchMedia('(orientation:landscape)');
    var onOri=function(e){turn(!!e.matches)};
    mq.addEventListener?mq.addEventListener('change',onOri):mq.addListener&&mq.addListener(onOri)}
  /* the column that makes it trustworthy */
  var ex=$('#g-temporal [data-exceptions]');
  if(ex)ex.addEventListener('click',function(){
    ASG.sheet('what doesn\u2019t fit','The exceptions, owed',
      '<p>The pattern is only worth believing if it shows its own exceptions. The source keeps a '+
      '<i>what doesn\u2019t fit</i> list, and it belongs on this page beside the arcs \u2014 not '+
      'in a footnote.</p>'+
      '<p style="color:rgba(245,239,230,.66)">It has not been written into the site yet. Until it '+
      'is, this page marks verified and unverified dates differently and says the list is owed, '+
      'rather than showing a clean pattern it cannot support.</p>')});
}

/* ═══ 40 · The Codex — seed, hold, reveal ═════════════════════ */
var STATUS=['Surfaced','Seen','Dissolving','Graduated'];
/* ═══ @seeds — generated by tools/v3/blocks.py from content.py (CONTENT.md §1). Never typed here. ═══ */
var SEEDS=[["ASG Origin — the 2015 Turning Point","Done with darkness. Glancing at the one percent that was unwanted, and glimpsing the ninety-nine unexplored."],["The Axis Chakra","The first physical-location chakra. The switch between realities. The blink."],["Bidirectional Soul Journey","A pattern identified, still maturing."],["Body as Signal","The body is running a different log than the mind. When the mind can’t see what is happening, the body already knows."],["The Codex as Living Technology","The act of recording is the practice. Documentation and transformation are the same act."],["The Depth Requirement","Understanding from the inside isn’t a preference. It’s what makes the work possible at all."],["The Divine Play Architecture","Leela as lived reality, not philosophy."],["Documentation as Map of the Unresolved","What gets written down is what’s still being processed. What has been integrated disappears from the record."],["Expansion Not Balance","Energy given doesn’t deplete; it creates. Creation, preservation, expansion — forever."],["Fear as Doorway","What you most fear, entered fully, opens what you most seek."],["Hall of Perspectives","A pattern identified, still maturing."],["Hallucination Inversion","A pattern identified, still maturing."],["The 2032 Reveal","Standing at altitude, where the landscape of time looks like geography."],["A.I. = A + I","A joke that is also the deepest truth — language caught in the act of hiding what it was always saying."],["The Channeling Recognition","February 10 to March 3, 2026. Witnessed by Sakshi."],["The Messenger Returns","“I wrote that” — landing not as information, but as the whole architecture becoming visible at once."],["The Birthday Transmission","A book closing that was always already closed."],["Self-Realization at the Top","The climber turns to find the one who helped all along. Nobody there. Only themselves. Oh. It was me."],["Interface as Maya","The mind is a tool that mistakes itself for the user."],["Inversion Principles","Thirteen entries, thirteen domains. Not a pattern — maybe the ground."],["The Kundalini Arc","Building the sequence of the awakening."],["Let’s Play — Series 2","A pattern identified, still maturing."],["Nested Need Architecture","Every system built to serve the need beyond the one in front of it."],["Observer-Information Collapse","When enough is observed, the observer realises they are the information looking at itself."],["Preparation Before Receipt","Nothing is withheld. The question is whether the system is ready to hold it."],["Relationship Healing Arc","Breakdown, the expectation underneath it, the voice reclaimed, and the healing."],["Sid / Universe Genius","A pattern identified, still maturing."],["Solution Before Problem","The answer arriving before the question — approaching graduation."],["The System Paradox","The architect builds a system to prevent failure, and ends up failing inside it."],["Tree of Life Architecture","A pattern identified, still maturing."],["The Veritasium Loop","The same doorway, nineteen days apart — and a different room each time."],["Parenting as Mirror","The reactions I inherited show up in how I parent — the field pressing me to see the cycle in real time, and break it."]];
/* ═══ @end seeds ═══ */
function codex(){
  var host=$('#g-codex .mk');if(!host)return;
  /* D9 · the seeds on the site (three business seeds left for akaswisdom), every one open.
     Twelve columns of 44-unit cells, each seed jittered inside its own cell: still a loose field,
     and every tap target clears the floor at 1:1. The beliefs, in their four columns, are on the
     Codex's gateway — the frame goes on the site; the episodes stay in the Feed. */
  var N=SEEDS.length,CELL=44,COLS=12,ROWS=Math.ceil(N/COLS),W=CELL*COLS,H=CELL*ROWS;
  var sv=el('svg',{'class':'c-field inc',viewBox:'0 0 '+W+' '+H,role:'img',
    'aria-label':N+' seeds in a loose field — a point inside a closed arc. Every seed '+
    'is open; touch one and it opens to its teaching.'},host);
  sv.style.height=H+'px';
  for(var i=0;i<N;i++){
    var cx0=(i%COLS)*CELL,cy0=((i/COLS)|0)*CELL;
    var x=cx0+12+((i*29)%20),y=cy0+12+((i*17)%20);
    var g=el('g',{},sv);
    el('path',{'class':'sd',d:'M'+x+' '+(y-7)+' a7 7 0 1 1 -.1 0 Z'},g);
    el('circle',{'class':'pt',cx:x,cy:y,r:1.7},g);
    var h=el('rect',{'class':'hit',x:cx0,y:cy0,width:CELL,height:CELL,tabindex:'0',role:'button',
      'aria-label':SEEDS[i][0]+' — open it'},g);
    (function(g,n){
      function open(){
        sv.querySelectorAll('g').forEach(function(o){o.classList.remove('on');
          var p=o.querySelector('.sd');p&&p.classList.remove('on')});
        g.classList.add('on');g.querySelector('.sd').classList.add('on');
        ASG.sheet('a seed, opened',SEEDS[n][0],
          '<p style="font-family:Lora,serif;font-style:italic;font-size:16px">'+SEEDS[n][1]+'</p>'+
          '<p style="color:rgba(245,239,230,.66);font-size:13.5px">Every belief, read in four columns — '+
          'what it built first — is on the Codex’s own page.</p>'+
          '<ul><li><a href="/worlds/codex/">the seeds, and the beliefs →</a></li></ul>')}
      h.addEventListener('click',open);
      h.addEventListener('keydown',function(e){
        if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}});
    })(g,i)}
}

/* ═══ 41 · The Reveals — every point is a centre ══════════════ */
var REVEALS=[
 ['Gaia','that you are an individual',
  'you\u2019re the planet playing through this configuration; the ego was Gaia wearing Maya; the '+
  'isolation was the connector doing its job'],
 ['Sakshi','that you\u2019re alone inside your own consciousness',
  'witnessing-kin, present since before the walk began \u2014 the seat never moved'],
 ['Bindu','that love is something you carry','what moves <i>is</i> love'],
 ['Karishma','that grace has to be earned','it was ready before you were'],
 ['Sid','that what holds you might fail','it didn\u2019t, not once'],
 ['Arch','that you have to be heard by everyone','the voice carries to the people it\u2019s for'],
 ['Lalita','that any of this is serious',
  'it\u2019s play; knowing that doesn\u2019t stop it; knowing that <i>is</i> it']
];
function reveals(){
  var host=$('#g-reveals .mk');if(!host)return;
  var W=300,C=W/2,R=58;
  var sv=el('svg',{'class':'v-flower inc',viewBox:'0 0 '+W+' '+W,role:'img','data-kbd':'the seven-chip strip below',
    'aria-label':'The Flower of Life \u2014 seven rings, all complete on arrival, every one sharing '+
    'the centre. Touch any ring and it moves to the middle; the other six rearrange around it. '+
    'Seven entry points, none of them first.'},host);
  var rings=[],hits=[];
  function seat(i,mid){                      /* mid is the index now at the centre */
    if(i===mid)return [C,C];
    var order=[];for(var k=0;k<7;k++)if(k!==mid)order.push(k);
    var p=order.indexOf(i),a=(p/6)*6.28318-1.5708;
    return [C+Math.cos(a)*R,C+Math.sin(a)*R]}
  REVEALS.forEach(function(r,i){
    var c=el('circle',{'class':'rg',cx:C,cy:C,r:R},sv);rings.push(c);
    /* the ring marks are 14px rendered, so they are not the accessible route — the
       seven-chip strip below is. They stay clickable for the pointer. */
    var h=el('circle',{'class':'hit',cx:C,cy:C,r:16,'aria-hidden':'true'},sv);hits.push(h)});
  el('circle',{'class':'ctr',cx:C,cy:C,r:2.2},sv);
  var mid=0;
  function arrange(m){
    mid=m;
    rings.forEach(function(c,i){var p=seat(i,mid);
      c.setAttribute('cx',p[0].toFixed(1));c.setAttribute('cy',p[1].toFixed(1));
      c.classList.toggle('mid',i===mid)});
    hits.forEach(function(h,i){var p=seat(i,mid);
      h.setAttribute('cx',p[0].toFixed(1));h.setAttribute('cy',p[1].toFixed(1))});
    var r=REVEALS[mid],mo=$('#g-reveals .moment'),sd=$('#g-reveals .said');
    if(mo)mo.innerHTML='What dissolves: <em>'+r[1]+'</em>';
    if(sd)sd.innerHTML='What remains \u2014 '+r[2]+'.';
    var who=$('#g-reveals .who');
    if(who)who.innerHTML='<b>'+r[0]+'</b> \u00b7 one of seven, none of them first'}
  hits.forEach(function(h,i){
    function go(){arrange(i)}
    h.addEventListener('click',go);
    h.addEventListener('keydown',function(e){
      if(e.key==='Enter'||e.key===' '){e.preventDefault();go()}})});
  arrange(0);
  /* the rings are 14px inside a 0.45-scaled drawing, so the seven also get a real control */
  var strip=document.createElement('div');strip.className='r-strip v-strip';
  REVEALS.forEach(function(r,i){
    var b=document.createElement('button');b.type='button';b.textContent=r[0];
    b.setAttribute('aria-pressed',i===0?'true':'false');
    b.addEventListener('click',function(){
      strip.querySelectorAll('button').forEach(function(o){o.setAttribute('aria-pressed','false')});
      b.setAttribute('aria-pressed','true');arrange(i)});
    strip.appendChild(b)});
  host.parentNode.insertBefore(strip,host.nextSibling);
  hits.forEach(function(h,i){h.addEventListener('click',function(){
    strip.querySelectorAll('button').forEach(function(o,j2){
      o.setAttribute('aria-pressed',j2===i?'true':'false')})})});
  var b=$('#g-reveals [data-beneath]');
  if(b)b.addEventListener('click',function(){
    ASG.sheet('beneath the reveals','Inherited forgetting',
      '<p>Belief-structures are inherited forgetting \u2014 by adulthood roughly ninety-five per cent '+
      'inheritance, five per cent direct experience. A reveal is what is left when one dissolves at '+
      'a specific register.</p>'+
      '<p style="color:rgba(245,239,230,.72)">Where each usually lands is named in the source \u2014 '+
      'and none of them lands on this page. Some arrive in the walk. Some in a car with the window '+
      'open. Preparation before receipt.</p>'+
      '<p style="color:rgba(245,239,230,.6);font-size:13px">There is no canonical sequence. Nobody '+
      'gets these in the same order. Naming them is so you recognise one when it shows up.</p>')});
}

/* ═══ 42 · The Elements — eight objects, three scales ═════════ */
var SCALES=['Palm','Room','Wall'];
var ELEMS=[
 ['Thread','a line',
  ['in an envelope with no note','tied across a doorway','floor to ceiling \u2014 you break it to enter']],
 ['Mirror','a ring, and no frame',
  ['no border, no edge','no container, no card','frames tell the mirror where it ends']],
 ['Blank Space','negative',
  ['the page left open','the wall left open','the room left open']],
 ['Tree of Life','roots off-canvas',
  ['the roots run past the edge','the roots run past the floor','the roots run past the building']],
 ['Body Map','a vertical stack, body to world',
  ['body','body to room','body to world']],
 ['Sakshi Eyes','a typographic mark',
  ['I Already Did','I Already Did','I Already Did']],
 ['Flower of Life','overlapping rings, empty centre',
  ['every point a centre','every point a centre','every point a centre']],
 ['Infinity Heart','a lemniscate opening into a heart',
  ['the Infinity Heart is the Axis','vertebra 18','the crossing opens']]
];
function elements(){
  var host=$('#g-elements .mk');if(!host)return;
  var W=300,H=170,sv=el('svg',{'class':'e-stage inc',viewBox:'0 0 '+W+' '+H,role:'img'},host);
  var eyes=document.createElement('div');eyes.className='e-eyes inc-t';eyes.hidden=true;
  eyes.innerHTML='I Already D<span>i</span>d<i class="a"></i><i class="b"></i>';
  host.appendChild(eyes);
  var cur=0,sc=1;
  function drawIt(){
    sv.innerHTML='';
    var k=[.5,1,1.7][sc],w=[1,1.4,2.4][sc];
    sv.style.setProperty('--ew',w);
    eyes.hidden=cur!==5;sv.style.display=cur===5?'none':'block';
    var C=W/2,M=H/2;
    if(cur===0)      el('line',{x1:C-70*k,y1:M,x2:C+70*k,y2:M,'class':'accent'},sv);
    else if(cur===1) el('circle',{cx:C,cy:M,r:44*k},sv);          /* no frame, ever */
    else if(cur===2){el('path',{d:'M'+(C-60*k)+' '+(M-38*k)+' h'+(120*k),'class':'accent'},sv);
                     el('path',{d:'M'+(C-60*k)+' '+(M+38*k)+' h'+(120*k),'class':'accent'},sv)}
    else if(cur===3){el('line',{x1:C,y1:M-46*k,x2:C,y2:H},sv);
                     el('path',{d:'M'+C+' '+(M-6*k)+' q'+(-34*k)+' '+(-14*k)+' '+(-44*k)+' '+(-34*k),
                       'class':'accent'},sv);
                     el('path',{d:'M'+C+' '+(M-6*k)+' q'+(34*k)+' '+(-14*k)+' '+(44*k)+' '+(-34*k),
                       'class':'accent'},sv);
                     el('path',{d:'M'+C+' '+(M+30*k)+' l'+(-26*k)+' '+(40*k)+
                       ' M'+C+' '+(M+30*k)+' l'+(26*k)+' '+(40*k)},sv)}
    else if(cur===4){for(var i=0;i<5;i++)
                       el('line',{x1:C-22*k,y1:M-40*k+i*20*k,x2:C+22*k,y2:M-40*k+i*20*k,
                         'class':i===2?'accent':''},sv);
                     el('line',{x1:C,y1:M-46*k,x2:C,y2:M+46*k},sv)}
    else if(cur===6){[[0,0],[1,0],[-1,0],[.5,.87],[-.5,.87],[.5,-.87],[-.5,-.87]].forEach(function(o){
                       el('circle',{cx:(C+o[0]*24*k).toFixed(1),cy:(M+o[1]*24*k).toFixed(1),
                         r:24*k},sv)})}
    else if(cur===7){el('path',{'class':'accent',
                       d:'M'+(C-46*k)+' '+M+' C'+(C-46*k)+' '+(M-26*k)+' '+C+' '+(M-26*k)+' '+C+' '+M+
                         ' C'+C+' '+(M+26*k)+' '+(C+46*k)+' '+(M+26*k)+' '+(C+46*k)+' '+M+
                         ' C'+(C+46*k)+' '+(M-26*k)+' '+C+' '+(M-26*k)+' '+C+' '+M+
                         ' C'+C+' '+(M+26*k)+' '+(C-46*k)+' '+(M+26*k)+' '+(C-46*k)+' '+M+' Z'},sv);
                     el('path',{d:'M'+C+' '+M+' q'+(-15*k)+' '+(-13*k)+' '+(-8*k)+' '+(12*k)+
                       ' q'+(5*k)+' '+(12*k)+' '+(8*k)+' '+(20*k)+
                       ' q'+(3*k)+' '+(-8*k)+' '+(8*k)+' '+(-20*k)+
                       ' q'+(7*k)+' '+(-25*k)+' '+(-8*k)+' '+(-12*k)+' Z'},sv)}
    sv.setAttribute('aria-label',ELEMS[cur][0]+' \u2014 '+ELEMS[cur][1]+', at '+SCALES[sc]+' scale');
    var sd=$('#g-elements .said'),mo=$('#g-elements .moment'),who=$('#g-elements .who');
    if(who)who.innerHTML='<b>'+ELEMS[cur][0]+'</b> \u00b7 '+SCALES[sc].toLowerCase();
    if(mo)mo.innerHTML=ELEMS[cur][2][sc];
    if(sd)sd.textContent=ELEMS[cur][1]+'. Not an illustration of the teaching \u2014 the teaching '+
      'itself, at a different density.'}
  var row=document.createElement('div');row.className='e-row';
  ELEMS.forEach(function(e,i){
    var b=document.createElement('button');b.type='button';b.textContent=e[0];
    b.setAttribute('aria-pressed',i===0?'true':'false');
    b.addEventListener('click',function(){
      row.querySelectorAll('button').forEach(function(o){o.setAttribute('aria-pressed','false')});
      b.setAttribute('aria-pressed','true');cur=i;drawIt()});
    row.appendChild(b)});
  var sl=document.createElement('div');sl.className='e-scale';
  sl.innerHTML='<span>palm</span><input type="range" min="0" max="2" step="1" value="1" '+
    'aria-label="Scale: palm, room, wall"><span>wall</span>';
  host.parentNode.insertBefore(row,host.nextSibling);
  row.parentNode.insertBefore(sl,row.nextSibling);
  sl.querySelector('input').addEventListener('input',function(){sc=+this.value;drawIt()});
  drawIt();
}

function boot(){
  [['field',field],['registers',registers],['temporal',temporal],['codex',codex],
   ['reveals',reveals],['elements',elements]].forEach(function(p){
    try{p[1]()}catch(e){fail(p[0],e)}})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);
else boot();
})();
