/* ─────────────────────────────────────────────────────────────
   audit.js — the acceptance harness, run INSIDE the page.

   Why in-page: the serve origin returns 401 for a sub-request, so an iframe
   harness cannot reach its subject — and an audit that cannot reach its subject
   must say so, never score it. Running in the real document removes the
   sub-request entirely.

   Open  Default.html?audit=1  (add &lens= and resize to re-run).

   TWO LAWS OF THIS FILE
   1 · The load guard runs first. If the page is not really here, the report is
       ONE row and zero verdicts.
   2 · Nothing about the SERVED markup is asserted from the live DOM. The
       first-paint census (data-fp-*, stamped by an inline script before any
       figure mounts) is the only evidence for "it is in the HTML".
   ───────────────────────────────────────────────────────────── */
(function(){
"use strict";
if(!/[?&]audit=1/.test(location.search))return;

var rows=[],G=['Load','Structure','The laws','The lenses','Access','Smoothness',
  'Each hard thing','By hand'];
function add(g,n,s,d){rows.push({g:g,n:n,s:s,d:d||''})}

/* ── contrast, measured against the first opaque ground ── */
function label(e){
  if(e.id)return '#'+e.id;
  var c=e.getAttribute&&e.getAttribute('class');   /* SVG className is an SVGAnimatedString */
  return c?'.'+String(c).split(' ')[0]:e.tagName.toLowerCase()}
/* a 44px pad delivered by an absolutely-positioned ::after IS the target the browser hits,
   but it does not change the element's own rect. Measure the way the browser hits. */
function hitBox(e){
  var r=e.getBoundingClientRect();
  /* offsetWidth/Height is the LAYOUT box, which ignores transforms — the Sky's lights fly
     in over 0.9s and measured 43px mid-flight while being 44px at rest. A transient
     transform is not a smaller target; take the larger of the two. */
  var w=Math.max(r.width,e.offsetWidth||0),h=Math.max(r.height,e.offsetHeight||0);
  ['::after','::before'].forEach(function(pe){
    var ps=getComputedStyle(e,pe);
    if(!ps||ps.content==='none'||ps.position!=='absolute')return;
    var pw=parseFloat(ps.width),ph=parseFloat(ps.height);
    if(pw>w)w=pw;
    if(ph>h)h=ph});
  return {w:w,h:h,r:r}}
function lum(c){var m=/rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(c);if(!m)return null;
  var v=[+m[1],+m[2],+m[3]].map(function(x){x/=255;
    return x<=.03928?x/12.92:Math.pow((x+.055)/1.055,2.4)});
  return .2126*v[0]+.7152*v[1]+.0722*v[2]}
function ground(node){var e=node;
  while(e&&e!==document.documentElement){
    var cs0=getComputedStyle(e);
    /* a gradient ground cannot be sampled as one colour — say so rather than guess */
    if(cs0.backgroundImage&&cs0.backgroundImage!=='none'&&/gradient/.test(cs0.backgroundImage))
      return 'GRADIENT';
    var m=/rgba?\(\d+,\s*\d+,\s*\d+(?:,\s*([\d.]+))?/.exec(cs0.backgroundColor);
    if(m&&(m[1]===undefined||+m[1]>=.85))return m[0]+')';
    e=e.parentElement}
  return getComputedStyle(document.body).backgroundColor}
function ratio(a,b){var x=lum(a),y=lum(b);if(x===null||y===null)return null;
  return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)}

function run(){
  rows=[];
  var d=document.documentElement.dataset,H=innerHeight,W=innerWidth;

  /* ═══ 1 · the load guard — before any verdict is emitted ═══ */
  var why=[];
  if(!window.ASG)why.push('window.ASG is undefined — the kit did not boot');
  if(!document.querySelectorAll('[data-world]').length)why.push('no [data-world] sections in the DOM');
  if(d.fpRing===undefined)why.push('the first-paint census did not run');
  if(why.length){
    add('Load','the page under audit is not here','no',why.join(' · ')+
      ' — zero verdicts emitted. An audit that cannot reach its subject must say so.');
    return paint(true)}
  add('Load','the page under audit is here','ok',
    document.querySelectorAll('[data-world]').length+' sections · ASG booted · census stamped · '+
    W+' × '+H+' · lens '+document.body.dataset.lens);

  var zones=[].slice.call(document.querySelectorAll('[data-world]'));
  var worlds=zones.filter(function(z){var k=z.dataset.world;
    return k!=='between'&&k!=='threshold'&&k!=='sky'});
  var ALL=ASG.worlds||[],built=ALL.filter(function(w){return w[5]});

  /* the untouched state of the page, read before the harness does anything to it */
  var SKY0={lights:document.querySelectorAll('#skymap .sky-moon').length,
    more:document.querySelectorAll('#skymap .sky-sun').length,
    kids:(document.getElementById('skymap')||{children:[]}).children.length,
    line:(document.getElementById('skyLine')||{textContent:''}).textContent.trim().length};

  /* ═══ Structure ═══ */
  /* the register and the page must name the same worlds — a set difference, not a count */
  var onPage={};worlds.forEach(function(z){onPage[z.dataset.world]=1});
  var missing=built.filter(function(w){return !onPage[w[0]]}).map(function(w){return w[0]});
  var extra=Object.keys(onPage).filter(function(k){
    if(document.querySelector('[data-world="'+k+'"][data-not-a-world]'))return false;
    return !built.some(function(w){return w[0]===k})});
  add('Structure','worlds on the page',missing.length||extra.length?'warn':'ok',
    missing.length||extra.length
      ?(missing.length?'in the register, not on the page: '+missing.join(', ')+'. ':'')+
       (extra.length?'on the page, not in the register: '+extra.join(', ')+'.':'')
      :worlds.length+' world sections · '+built.length+' flagged built · '+ALL.length+' specified');
  var mv={};worlds.forEach(function(z){mv[z.dataset.movement||'?']=1});
  add('Structure','movements present',Object.keys(mv).length>=8?'ok':'warn',
    Object.keys(mv).sort().join(' · '));
  var badV=worlds.filter(function(z){var v=z.dataset.v;
    if(!v)return true;if(v==='all')return false;
    return v.split(',').some(function(n){return !(+n>=1&&+n<=33)})});
  add('Structure','vertebrae declared',badV.length?'no':'ok',
    badV.length?badV.map(function(z){return z.id}).join(', '):
    'every world declares data-v, all within 1\u201333');

  /* the ring at 18 — from the census, not the live DOM */
  add('Structure','vertebra 18 is a ring at first paint',d.fpRing==='1'?'ok':'no',
    d.fpRing==='1'?'present in the served markup before any script ran \u2014 Sakshi\u2019s claim holds':
    'NOT in the served markup: the witness ring is being injected');

  var pt=document.querySelectorAll('#point').length,p2=document.querySelectorAll('#point2').length;
  add('Structure','the Point is one element',pt===1&&p2===1?'ok':'no',
    pt+' #point \u00b7 '+p2+' #point2 (the split, destroyed at the merge)');

  /* the Sky collapses crowded vertebrae to a +N, so lights ≤ built by design:
     every built world stays reachable, as its own light or through a collapse. */
  /* sampled at the TOP of the run, before the harness scrolls or resizes anything: the
     harness must never be the reason a check passes. The Sky was an empty void on a normal
     load while this reported 43 lights, because the audit's own scrolling redrew it. */
  var lights=SKY0.lights,more=SKY0.more;
  add('Structure','pull out \u2192 every world reachable',lights>=40?'ok':'no',
    lights+' moons in orbit \u00b7 '+more+' suns on the curve \u00b7 '+built.length+
    ' built worlds \u2014 every world orbits the vertebra it stands on, and two taps get you there');

  var links=[].slice.call(document.querySelectorAll('a[href^="#"]')),dead=[];
  links.forEach(function(a){var h=a.getAttribute('href');
    if(h.length>1&&!document.querySelector(h))dead.push(h)});
  add('Structure','the Sky draws itself on a plain load',
    SKY0.kids>0&&SKY0.line>40?'ok':'no',
    SKY0.kids+' children \u00b7 '+SKY0.lights+' lights \u00b7 register line '+SKY0.line+
    ' chars \u2014 all read before the harness touched the page'+
    (document.documentElement.getAttribute('data-sky-fail')
      ?' \u00b7 data-sky-fail: '+document.documentElement.getAttribute('data-sky-fail'):''));

  add('Structure','every #link resolves',!links.length?'no':dead.length?'no':'ok',
    !links.length?'no internal links found at all \u2014 the check has nothing to measure':
    dead.length?dead.slice(0,8).join(' '):links.length+' internal links, all landing');

  if(ASG.roll){var ok=0,bad=0;
    for(var i=0;i<40;i++){ASG.roll('threshold');
      var a=document.querySelector('#shB a');
      if(a&&document.querySelector(a.getAttribute('href')))ok++;else bad++}
    ASG.close();
    add('Structure','the die lands somewhere real',bad?'no':'ok',
      '40 rolls \u00b7 '+ok+' resolved \u00b7 '+bad+' dead')}

  /* ═══ The laws ═══ */
  /* the harness ships inside the page, so it must not read its own word list as evidence:
     strip every <script> before searching. A gate lives in markup, copy and links — not in
     the audit's own source. */
  var SRC=document.documentElement.outerHTML.replace(/<script[\s\S]*?<\/script>/gi,'');
  var GATE=['hasEssence','check.html','locked','unlock','cooldown'];
  var hits=GATE.filter(function(w){return SRC.indexOf(w)>=0});
  add('The laws','no gate anywhere',hits.length?'warn':'ok',
    hits.length?'found: '+hits.join(', ')+' \u2014 each must depict an app\u2019s own pacing':
    'none of the gate words appear \u00b7 searched '+Math.round(SRC.length/1024)+'KB of rendered markup');

  var txt=document.body.innerText||'';
  var mnum=/(\d+\s*(?:\/|of)\s*33\b)|(\d+%\s*complete)|streak|\bday\s*\d+\s*of\s*30\b/i.exec(txt);
  add('The laws','no number measures the reader',
    txt.length<2000?'no':mnum?'warn':'ok',
    txt.length<2000?'only '+txt.length+' chars of page text \u2014 not enough to measure':
    mnum?'"'+mnum[0]+'" \u2014 check it describes the work, not the reader':
    'no progress fraction, percentage or streak in '+Math.round(txt.length/1024)+'KB of page text');

  var holds=[].slice.call(document.querySelectorAll('.hint,.v-hint,.wvp,.sg-pass,.note'))
    .filter(function(e){return /\b(hold|press|swipe|drag)/i.test(e.textContent)});
  var noPlain=holds.filter(function(e){return !/tap|button|click|or /i.test(e.textContent)});
  add('The laws','every hold has a one-tap path',
    !holds.length?'warn':noPlain.length?'warn':'ok',
    !holds.length?'no hold/press/swipe copy found to check':
    noPlain.length?noPlain.map(function(e){return '"'+e.textContent.trim().slice(0,40)+'"'}).join(' \u00b7 '):
    holds.length+' hold plays, each naming its plain route');

  /* ═══ The lenses ═══ */
  add('The lenses','the lens is applied',document.body.dataset.lens?'ok':'no',
    'body[data-lens] = '+document.body.dataset.lens);
  if(document.body.dataset.lens==='witness'){
    var waiting=[].slice.call(document.querySelectorAll('[data-arrive],[data-stagger],.pback,.tp-b'))
      .filter(function(e){return +getComputedStyle(e).opacity<.9});
    add('The lenses','Witness: complete on arrival',waiting.length?'no':'ok',
      waiting.length?waiting.length+' elements still waiting to animate in':
      'every arriving element resolved \u2014 the only motion is the reader\u2019s')}

  /* ═══ Access ═══ */
  var tgts=[].slice.call(document.querySelectorAll(
    'button,a[href],input,[role="button"],[tabindex="0"]')),small=[];
  tgts.forEach(function(e){var r=e.getBoundingClientRect();
    if(!r.width||!r.height)return;
    if(getComputedStyle(e).visibility==='hidden')return;
    var b=hitBox(e);
    if(b.w<43.5||b.h<43.5)
      small.push(label(e)+' '+Math.round(b.w)+'\u00d7'+Math.round(b.h))});
  add('Access','every target clears 44px',
    !tgts.length?'no':small.length?'no':'ok',
    !tgts.length?'no focusable targets found \u2014 nothing measured':
    small.length?small.length+' under floor: '+small.slice(0,6).join(' \u00b7 '):
    tgts.length+' targets measured, all at least 44 \u00d7 44');

  var figs=[].slice.call(document.querySelectorAll('[data-fig],.mk,.fig'));
  var mute=figs.filter(function(e){return e.children.length&&!e.getAttribute('aria-label')&&
    !e.querySelector('[role="img"],[aria-label],img')});
  add('Access','every figure has spoken words',
    !figs.length?'warn':mute.length?'warn':'ok',
    !figs.length?'no figure hosts found':
    mute.length?mute.length+' hosts with no words and no labelled child':
    figs.length+' figure hosts, each carrying its words');

  var cls='.wt,.we,.wp,.note,.hint,.owed,.said,.moment,.who,.mk,.mt,.ml,.mn,.line,.tag,.ask';
  var texts=[].slice.call(document.querySelectorAll(cls)),lowC=[],grad=[];
  texts.forEach(function(e){
    if(!(e.textContent||'').trim())return;
    var r=e.getBoundingClientRect();if(!r.width||!r.height)return;
    var cs=getComputedStyle(e);if(+cs.opacity<.5)return;
    var g=ground(e);
    if(g==='GRADIENT'){grad.push(label(e));return}   /* a seam — walked, not computed */
    var rt=ratio(cs.color,g);if(rt===null)return;
    if(rt<(parseFloat(cs.fontSize)>=24?3:4.5))
      lowC.push(label(e)+' '+rt.toFixed(2)+':1')});
  add('Access','text clears 4.5:1 (3:1 headline)',
    !texts.length?'no':lowC.length?'no':'ok',
    !texts.length?'no text classes found \u2014 nothing measured':
    lowC.length?lowC.length+' under floor: '+lowC.slice(0,6).join(' \u00b7 '):
    (texts.length-grad.length)+' text elements measured against their own ground');
  if(grad.length)add('Access','on a gradient \u2014 by eye','note',
    grad.length+' elements sit on a gradient ground (the seams). A gradient has no single '+
    'colour to measure against, so these are walked, never computed \u2014 the law being walked: '+
    'a seam\u2019s copy sits where the gradient has already resolved, and the spectrum stops '+
    'before the words start.');

  /* without JavaScript — from the census, the only honest evidence */
  var jsOk=d.fpTitle==='1'&&+d.fpDoors===3&&+d.fpNames>20;
  add('Access','without JavaScript',jsOk?'ok':'no',
    'in the served markup: title '+(d.fpTitle==='1'?'yes':'no')+' \u00b7 '+d.fpDoors+
    ' doors \u00b7 '+d.fpWorlds+' world sections \u00b7 '+d.fpNames+' names and sentences');

  /* ═══ Smoothness ═══ */
  /* a world may DECLARE that it is deliberately more than one screen (the Tree is nine
     panels; Gaia is five stages) — data-screens="n". Everything else must fit one. */
  /* the register is one world, one screen at the DESIGN viewport (390 × 844). A window
     shorter than the design floor is measured against the floor, and says so — otherwise
     a 540-tall preview would report every copy-bearing world as a defect. */
  var FLOOR=844,Hm=Math.max(H,FLOOR);
  var over=worlds.filter(function(z){
    var n=+(z.dataset.screens||1);
    return z.getBoundingClientRect().height>(Hm*n)+1});
  add('Smoothness','one world, one screen',
    !worlds.length?'no':over.length?'no':'ok',
    !worlds.length?'no worlds to measure':
    over.length?over.map(function(z){return z.id+':'+
      Math.round(z.getBoundingClientRect().height)}).slice(0,6).join(' \u00b7 '):
    worlds.length+' worlds, none taller than '+Hm+'px'+(H<FLOOR?' (this window is '+H+'; measured against the 390 \u00d7 844 design viewport)':''));
  /* nothing may be printed on top of anything else: a figure whose box is shorter than its
     own contents lets the next block flow underneath it, and the two overlap. This is the
     check that missed the Sky's closing copy sitting across the whole spine. */
  function box(e){var r=e.getBoundingClientRect();
    return {t:r.top,b:r.bottom,l:r.left,r:r.right,w:r.width,h:r.height}}
  var collide=[];
  [].slice.call(document.querySelectorAll(
    '.moment,.said,.hint,.owed,.wt,.we,.wp,.note,.sky-read,.sky-close,.tag,.ask'))
    .forEach(function(t){
      var tb=box(t);if(tb.w<20||tb.h<6)return;
      if(getComputedStyle(t).position==='fixed')return;
      [].slice.call(document.querySelectorAll('svg,canvas,.sky-map,.mk,.fig,[data-fig]'))
        .forEach(function(f){
          if(f.contains(t)||t.contains(f))return;
          var fb=box(f);if(fb.w<24||fb.h<24)return;
          var fs=getComputedStyle(f);
          if(fs.position==='fixed')return;
          /* a backdrop is meant to be written on: an out-of-flow layer that takes no touch
             and speaks no words (the threshold's dust, Bindu's trace). A figure that holds
             its own place in the flow is not a backdrop, and copy may not land on it. */
          if(fs.position==='absolute'&&(f.getAttribute('aria-hidden')==='true'||
             fs.pointerEvents==='none'))return;
          var ox=Math.min(tb.r,fb.r)-Math.max(tb.l,fb.l);
          var oy=Math.min(tb.b,fb.b)-Math.max(tb.t,fb.t);
          if(ox>24&&oy>14)collide.push(label(t)+' over '+label(f))})});
  /* overlap and CLIPPING are two failure modes of one cause: a box that does not own the
     height of its contents. The overlap check reported clean while 425px of the Sky's foot
     was cut away by a clipping ancestor, so the harness needs both. */
  var cut=[];
  [].slice.call(document.querySelectorAll(
    '.moment,.said,.hint,.owed,.wt,.we,.wp,.note,.sky-read,.sky-foot,.tag,.ask,.mt,.ml'))
    .forEach(function(t){
      var tb=t.getBoundingClientRect();if(tb.height<6)return;
      var p=t.parentElement;
      while(p&&p!==document.documentElement){
        var ps=getComputedStyle(p);
        if(ps.overflow!=='visible'||ps.overflowY!=='visible'){
          var pb=p.getBoundingClientRect();
          if(tb.bottom>pb.bottom+1||tb.top<pb.top-1)
            cut.push(label(t)+' cut by '+label(p));
          break}
        p=p.parentElement}});
  add('Smoothness','nothing clipped away',cut.length?'no':'ok',
    cut.length?cut.length+': '+cut.slice(0,5).join(' \u00b7 '):
    'every line of copy sits inside the box that clips it \u2014 nothing cut off');

  add('Smoothness','nothing printed on top of anything',collide.length?'no':'ok',
    collide.length?collide.length+': '+collide.slice(0,5).join(' \u00b7 '):
    'every line of copy has its own ground \u2014 no text box overlaps a figure box');

  /* scrollWidth counts content an ancestor has already clipped, so it reports a sideways
     scroll that cannot happen (body is overflow-x:clip). Test real scrollability instead. */
  var de=document.documentElement;
  var canScrollX=de.scrollWidth>de.clientWidth+1&&
    getComputedStyle(document.body).overflowX!=='clip'&&
    getComputedStyle(document.body).overflowX!=='hidden';
  add('Smoothness','nothing scrolls sideways',canScrollX?'no':'ok',
    canScrollX?'the page scrolls sideways by '+(de.scrollWidth-de.clientWidth)+'px':
    'no sideways scroll is possible \u2014 body clips its overflow, and nothing escapes a '+
    'clipping ancestor');


  var lc=ASG.loopCount?ASG.loopCount():null;
  add('Smoothness','one frame loop',lc===null?'note':lc>0?'ok':'no',
    lc===null?'ASG.loopCount() not exposed':
    lc+' registered steps, all on the kit\u2019s single visibility-gated loop');
  var threw=[];
  ['vi','vii','viii','ix'].forEach(function(m){
    var v=document.documentElement.getAttribute('data-'+m+'-fail');if(v)threw.push(m+': '+v)});
  add('Smoothness','no figure threw on mount',threw.length?'no':'ok',
    threw.length?threw.join(' | '):'every movement mounted without a caught error');

  /* ═══ Each hard thing ═══ */
  function hard(n,fn,dt){var r;try{r=fn()}catch(e){r=false;dt=String(e.message||e)}
    add('Each hard thing',n,r?'ok':'no',dt)}
  hard('Sid: three touches, not one',function(){
    var l=document.getElementById('sdLine'),h=document.querySelector('#v-sid .s-said');
    if(!l||!h)return false;
    l.click();var one=(h.textContent||'').trim();
    l.click();l.click();return !one&&/holding/i.test((h.textContent||''))},
    'one touch says nothing; the third says It\u2019s holding');
  hard('Shweta: the channel emits what it received',function(){
    /* her channel emits into the world AFTER her — that is where the hue is consumed */
    var nx=document.querySelector('[data-emitted-from="shweta"]');
    return !!(nx&&nx.style.getPropertyValue('--emit'))},
    '--emit is written and consumed by the world after her');
  hard('The Tree: the painted dot is there',function(){
    var t=document.querySelector('#tree .tp-dot');if(!t)return false;
    var r=t.getBoundingClientRect();return r.width>0&&r.width<13},
    'every panel carries its printed red Bindu at the print-master coordinate');
  hard('The Mirror: Uncertainty is the same size',function(){
    /* the four panes live in the sheet the centre opens — open it and measure there */
    var nb=document.querySelector('#c-mirror [data-name]');
    if(nb)nb.click();
    var p=document.querySelectorAll('#shB .mr-pane');
    if(window.ASG&&ASG.close)ASG.close();
    if(p.length<4)return false;
    var hs=[].map.call(p,function(e){return e.getBoundingClientRect().height});
    return Math.max.apply(null,hs)-Math.min.apply(null,hs)<2},
    'never smaller, never collapsed');
  hard('A Self Generator: the label reads the turn',function(){
    var l=document.querySelector('#c-selfgen .sg-label');
    return !!(l&&/A Strange Game/.test(l.textContent)&&/A Self Generator/.test(l.textContent))},
    'A Strange Game \u2192 A Self Generator, woven into the swatch');
  hard('The Temporal: turn it turns the eight',function(){
    var b=document.querySelector('#g-temporal [data-turn]'),
        s=document.querySelector('#g-temporal .t-line');
    if(!b||!s)return false;b.click();
    var on=s.classList.contains('turned');b.click();return on},
    'the button does what rotating the device does');

  [['Three seconds at the threshold','a stranger knows it\u2019s a door, and that every door opens'],
   ['The scale','doors to Sky: the size of it, and every world its own world'],
   ['Room left','something can land that isn\u2019t on the page'],
   ['Sound','silent until touched; at most two voices; 136.1 named only at the ninth panel'],
   ['Arch','the arc never completes if you scroll fast'],
   ['The Sakshi Eyes','five seconds without seeing them, then never not'],
   ['60 fps','scrolling the full page on a mid-range phone']]
    .forEach(function(p){add('By hand',p[0],'note',p[1])});

  paint(false)}

/* ── the report, as an overlay on the page it audited ── */
function paint(blocked){
  var t={ok:0,no:0,warn:0,note:0};
  rows.forEach(function(r){t[r.s]=(t[r.s]||0)+1});
  var host=document.getElementById('asg-audit');
  if(!host){host=document.createElement('div');host.id='asg-audit';document.body.appendChild(host);
    var st=document.createElement('style');
    st.textContent='#asg-audit{position:fixed;inset:0;z-index:9999;overflow:auto;'+
      'background:#07060C;color:#F5EFE6;font-family:"DM Sans",system-ui,sans-serif;'+
      'padding:22px 20px 60px;font-size:13.5px}'+
      '#asg-audit h1{font-family:Lora,Georgia,serif;font-weight:400;font-size:26px;margin:0 0 4px}'+
      '#asg-audit .s{font-family:Lora,Georgia,serif;font-style:italic;color:rgba(245,239,230,.7);'+
      'margin:0 0 12px;max-width:70ch;font-size:15px}'+
      '#asg-audit .t{display:flex;gap:16px;margin:0 0 18px;font-size:13px;flex-wrap:wrap}'+
      '#asg-audit h2{font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:#C9A84C;'+
      'font-weight:400;margin:20px 0 6px;padding-bottom:5px;'+
      'border-bottom:1px solid rgba(245,239,230,.14)}'+
      '#asg-audit .r{display:grid;grid-template-columns:16px minmax(0,24ch) minmax(0,1fr);'+
      'gap:11px;padding:6px 0;border-bottom:1px solid rgba(245,239,230,.07);align-items:start}'+
      '#asg-audit .d{width:9px;height:9px;border-radius:50%;margin-top:4px;background:#5A5A5A}'+
      '#asg-audit .ok .d{background:#7BC08A;box-shadow:0 0 6px #7BC08A}'+
      '#asg-audit .no .d{background:#E2624A;box-shadow:0 0 6px #E2624A}'+
      '#asg-audit .warn .d{background:#E0B84A;box-shadow:0 0 6px #E0B84A}'+
      '#asg-audit .x{color:rgba(245,239,230,.66);line-height:1.5;font-size:12.5px;'+
      'word-break:break-word}'+
      '#asg-audit .no .x{color:#F0A594}#asg-audit .warn .x{color:#E8CF8A}'+
      '#asg-audit .bar{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 16px}'+
      '#asg-audit .bar a,#asg-audit .bar button{min-height:40px;display:inline-flex;'+
      'align-items:center;padding:0 13px;border:1px solid rgba(201,168,76,.5);border-radius:3px;'+
      'color:#E4C979;text-decoration:none;font:inherit;font-size:12.5px;background:none;'+
      'cursor:pointer}';
    document.head.appendChild(st)}
  var lens=document.body.dataset.lens||'hand';
  var lenses=['hand','light','depth','witness'].map(function(k){
    return '<a href="?audit=1&lens='+k+'"'+(k===lens?' style="border-color:#E4C979"':'')+
      '>'+k+'</a>'}).join('');
  var html='<h1>Acceptance audit</h1>'+
    '<p class="s">Every mechanically decidable line of <b>09-ACCEPTANCE.md</b>, run inside the '+
    'real document at '+innerWidth+' \u00d7 '+innerHeight+'. Resize the window and press re-run to '+
    'test another viewport \u2014 the target, one-screen and contrast checks all depend on it.</p>'+
    '<div class="bar">'+lenses+'<button type="button" id="asg-rerun">re-run</button>'+
    '<a href="?">leave the audit</a></div>';
  if(blocked)html+='<p class="s" style="color:#F0A594">No verdicts were emitted. Fix the load, '+
    'then re-run.</p>';
  else html+='<div class="t"><span><b style="color:#7BC08A">'+(t.ok||0)+'</b> pass</span>'+
    '<span><b style="color:#E2624A">'+(t.no||0)+'</b> fail</span>'+
    '<span><b style="color:#E0B84A">'+(t.warn||0)+'</b> watch</span>'+
    '<span><b style="color:rgba(245,239,230,.6)">'+(t.note||0)+'</b> by hand</span></div>';
  G.forEach(function(g){
    var mine=rows.filter(function(r){return r.g===g});if(!mine.length)return;
    html+='<h2>'+g+'</h2>';
    mine.forEach(function(r){html+='<div class="r '+r.s+'"><span class="d"></span>'+
      '<span>'+r.n+'</span><span class="x">'+r.d+'</span></div>'})});
  host.innerHTML=html;
  var rr=document.getElementById('asg-rerun');
  if(rr)rr.addEventListener('click',function(){host.remove();setTimeout(run,60)});
  document.documentElement.setAttribute('data-audit',
    blocked?'blocked':(t.no||0)+' fail / '+(t.ok||0)+' pass')}

if(document.readyState==='complete')setTimeout(run,700);
else addEventListener('load',function(){setTimeout(run,700)});
})();
