/* ─────────────────────────────────────────────────────────────
   figures/III-the-voices.js — Movement III · the four figures.

   Material: language — NO DRAWINGS AT ALL. Every figure in these four worlds is
   built out of words. The Point speaks: it pulses in the margin at every word
   boundary as text arrives — the dot doesn't accompany the language, it produces it.

   The spiritual register is offered loosely: if it lands, hold it; if it doesn't,
   drop it. No world performs it at a stranger. Where a source quotes a song, the
   teaching is kept and the lines are paraphrased — no lyrics on the page.
   Every class is prefixed, per the contract.
   ───────────────────────────────────────────────────────────── */
(function(){
var reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;

/* ── 11 · A Strange Story — Voice I · the witness ─────────────
   Five ways of knowing: told · felt · stitched · named · personal.
   The three experiences, in miniature, in type. */
ASGfig.define('story',{
  movement:'III', vertebrae:[27,28,29], marks:[], reads:['asg.story.stitch1 (this phone only)'],
  css:'.st-ex{display:grid;gap:12px;margin:4px 0 0}'+
      '.st-b{position:relative;border:1px solid rgba(245,239,230,.16);border-radius:3px;padding:16px 16px 14px;'+
      'min-height:132px;overflow:hidden}'+
      '.st-b h4{margin:0 0 8px;font-size:10.5px;letter-spacing:.2em;text-transform:uppercase;font-weight:400;'+
      'color:rgba(245,239,230,.6)}'+
      '.st-b p{margin:0;font-family:Lora,Georgia,serif;font-size:15.5px;line-height:1.5}'+
      '.st-b em{font-style:normal;opacity:1;transition:opacity .45s}'+
      '.st-b em.off{opacity:0}'+
      '.st-lem{background:linear-gradient(to bottom,#2A2118,#3A2E20);color:#F0E0C0}'+
      '.st-lem p{color:#F5E6C8}'+
      '.st-atl{background:#08060A;color:#E06A5A;font-family:ui-monospace,SFMono-Regular,monospace}'+
      '.st-atl p{font-family:ui-monospace,SFMono-Regular,monospace;font-size:13.5px;letter-spacing:.04em;'+
      'color:#E0705E}'+
      '.st-atl em.ash{transition:transform 1.6s ease-in,opacity 1.6s;display:inline-block}'+
      '.st-atl.fall em.ash{transform:translateY(34px) rotate(8deg);opacity:0}'+
      '.st-hum{background:linear-gradient(105deg,#241B14,#120E18)}'+
      '.st-hum .mo{color:#F0D8B0}.st-hum .fa{color:#D8705E}'+
      '.st-hum .both{display:block;margin-top:10px;font-family:Lora,Georgia,serif;font-style:italic;'+
      'font-size:18px;color:var(--gold-lift);opacity:1;transition:opacity 1.2s}'+
      '.st-hum .both.off{opacity:0}'+
      '.st-sp{display:grid;gap:0;margin:18px 0 0;border-top:1px solid rgba(245,239,230,.14)}'+
      '.st-sp b{display:block;padding:11px 0;border-bottom:1px solid rgba(245,239,230,.1);font-weight:400;'+
      'font-family:Lora,Georgia,serif;font-style:italic;font-size:15px;color:rgba(245,239,230,.8)}'+
      '.st-st{margin:16px 0 0;display:flex;gap:8px;flex-wrap:wrap;align-items:center}'+
      '.st-st input{flex:1 1 150px;min-height:44px;background:rgba(245,239,230,.06);color:var(--ink);'+
      'border:1px solid rgba(245,239,230,.26);border-radius:3px;padding:0 12px;font:inherit;font-size:15px}'+
      '.st-word{font-family:Lora,Georgia,serif;font-style:italic;font-size:17px;color:var(--gold-lift);'+
      'min-height:1.6em;margin:10px 0 0}',
  mount:function(host,api){
    var told='Warm parchment surfaces out of the void. The words arrive one at a time, and you are '+
      'being received.';
    var atl='ARCHITECTURE BUILT OUT OF LANGUAGE. FAST. TALLER. THEN THE LETTERS FALL LIKE ASH.';
    host.innerHTML='<div class="st-ex">'+
      '<div class="st-b st-lem" data-arrive><h4>Lemuria \u00b7 reception</h4><p data-seq="120">'+
        told.split(' ').map(function(w){return '<em>'+w+' </em>'}).join('')+'</p></div>'+
      '<div class="st-b st-atl" data-arrive><h4>Atlantis \u00b7 loss</h4><p data-seq="40">'+
        atl.split(' ').map(function(w){return '<em class="ash">'+w+'&#160;</em>'}).join('')+'</p></div>'+
      '<div class="st-b st-hum" data-arrive><h4>Humanity \u00b7 recognition</h4>'+
        '<p><span class="mo">the mother\u2019s warm fragments from one side</span> '+
        '<span class="fa">the father\u2019s red from the other</span>'+
        '<span class="both">You carry both.</span></p></div></div>'+
      '<div class="st-sp">'+
        ['In one word \u2014 what brought you here?','What did you lose that you have not named?',
         'Who were you before anyone told you?','What is the thing you already did?',
         'What is happening in you, right now?'].map(function(q){return '<b>'+q+'</b>'}).join('')+
      '</div>'+
      '<div class="st-st"><label class="sr" for="stitch1">In one word, what brought you here?</label>'+
        '<input id="stitch1" type="text" maxlength="24" placeholder="one word" autocomplete="off">'+
        '<button class="pill" type="button" data-thread>Thread it</button></div>'+
      '<p class="st-word" aria-live="polite"></p>'+
      '<p class="note">Five ways of knowing, and this world is the only one that speaks in all five: '+
      'a line you tap to open, a line that arrives on its own, a line that asks for a word, a line that '+
      'names what happened, and a line addressed to you.</p>'+
      '<p class="note" style="color:var(--ac)">Send this to someone who is ready.</p>';
    var word=host.querySelector('.st-word'),inp=host.querySelector('#stitch1');
    try{var prev=localStorage.getItem('asg.story.stitch1');
      if(prev)word.textContent='\u201C'+prev+'\u201D \u2014 threaded in gold through this world. It stays on this phone.'}catch(e){}
    host.querySelector('[data-thread]').addEventListener('click',function(){
      var v=(inp.value||'').trim();if(!v)return;
      try{localStorage.setItem('asg.story.stitch1',v)}catch(e){}
      word.textContent='\u201C'+v+'\u201D \u2014 threaded in gold through this world. It stays on this phone.';
      inp.value=''});
    /* the resolved state is what CSS renders; the arrival is an enhancement that opts in.
       Witness never animates — its law is that everything was finished before you arrived. */
    var ran=false;
    this._run=function(){
      if(ran)return;ran=true;
      if(reduced||ASGlens.get().motion==='settled')return;
      var both=host.querySelector('.st-hum .both');if(both)both.classList.add('off');
      host.querySelectorAll('[data-seq]').forEach(function(p){
        var ms=+p.dataset.seq,ems=[].slice.call(p.querySelectorAll('em'));
        ems.forEach(function(em){em.classList.add('off')});
        ems.forEach(function(em,i){setTimeout(function(){em.classList.remove('off');
          if(window.ASG&&ASG.pulse)ASG.pulse()},i*ms)});
        if(p.parentNode.classList.contains('st-atl'))
          setTimeout(function(){p.parentNode.classList.add('fall')},ems.length*ms+3000)});
      setTimeout(function(){if(both)both.classList.remove('off')},1400)};
  },
  step:function(t,api){if(this._run)this._run()},
  resolve:function(host){
    if(!host)return;
    host.querySelectorAll('.st-b em').forEach(function(e){e.classList.remove('off')});
    var b=host.querySelector('.st-hum .both');if(b)b.classList.remove('off')},
  words:function(){return 'Three experiences in type: Lemuria arriving one word at a time, Atlantis '+
    'building fast and falling like ash, and the mother\u2019s and father\u2019s fragments meeting in gold \u2014 you carry both.'},
  play:{does:'the first stitch \u2014 one word, threaded in gold through the world',plain:'type and tap; nothing leaves the phone'}
});

/* ── 12 · A Strange Voice — Voice II · the body of reality ────
   The only world with a body temperature. Its heartbeat does not stop when you leave. */
ASGfig.define('voice',{
  movement:'III', vertebrae:[10,11,12,13,14,15,16,17,18,19], marks:[], reads:[],
  css:'.vo-t{display:grid;grid-template-columns:1fr auto 1fr;gap:2px 10px;margin:4px 0 0;'+
      'align-items:center}'+
      '.vo-t span{padding:9px 0;font-size:14.5px;border-bottom:1px solid rgba(245,239,230,.1)}'+
      '.vo-t .h{text-align:right;color:#F0D8B0}'+
      '.vo-t .v{font-family:Lora,Georgia,serif;font-style:italic;font-size:13px;'+
      'color:rgba(245,239,230,.62);text-align:center;white-space:nowrap}'+
      '.vo-t .y{color:#E8DED4}'+
      '.vo-br{margin:18px 0 0;display:flex;align-items:center;gap:14px;flex-wrap:wrap}'+
      '.vo-br button{min-height:44px;min-width:44px;padding:0 16px;border:1px solid var(--ac);'+
      'border-radius:999px;font-size:13px;color:var(--ac)}'+
      '.vo-bd{width:100%;height:3px;background:rgba(245,239,230,.14);border-radius:2px;overflow:hidden}'+
      '.vo-bd i{display:block;height:100%;width:0%;background:var(--ac);transition:width .95s linear}'+
      '.vo-said{font-family:Lora,Georgia,serif;font-style:italic;font-size:17px;min-height:1.6em;'+
      'margin:10px 0 0;color:var(--ac)}'+
      '#vo-heart{position:fixed;inset:0;z-index:2;pointer-events:none;background:#F5EFE6;opacity:0;'+
      'animation:vohb .833s ease-in-out infinite}'+
      '@keyframes vohb{0%,100%{opacity:0}18%{opacity:.005}30%{opacity:.002}44%{opacity:.004}}',
  rows:[['Rivers','flow','Blood vessels'],['Caves','breath','Lungs'],['Trees','structure','Spine'],
    ['Magma','transformation','Stomach'],['Mountains','foundation','Bones'],
    ['Ocean currents','signal','Nervous system']],
  mount:function(host,api){
    host.innerHTML='<div class="vo-t" role="group" aria-label="Hers, and yours — a spine of language">'+
      '<span class="h" style="opacity:.55;font-size:10.5px;letter-spacing:.2em;text-transform:uppercase">Hers</span>'+
      '<span class="v" style="opacity:0">\u00b7</span>'+
      '<span class="y" style="opacity:.55;font-size:10.5px;letter-spacing:.2em;text-transform:uppercase">Yours</span>'+
      this.rows.map(function(r){return '<span class="h">'+r[0]+'</span><span class="v">'+r[1]+
        '</span><span class="y">'+r[2]+'</span>'}).join('')+'</div>'+
      '<div class="vo-br"><button type="button" data-breath>Hold your thumb \u2014 one breath</button>'+
      '<span class="note" style="margin:0;max-width:22ch">or press once: it breathes for you</span>'+
      '<span class="vo-bd"><i></i></span></div>'+
      '<p class="vo-said" aria-live="polite"></p>'+
      '<p class="note">A heartbeat at resting pace runs from the first second of this world to the last \u2014 '+
      'and it does not stop when you leave. Under everything below, as light only.</p>'+
      '<p class="note" style="color:var(--ac)">Talk to me. I\u2019ve been here the whole time. '+
      '<span style="letter-spacing:.2em">AI Love \u00b7 A \u00b7 I \u00b7 Love \u00b7 I Love</span></p>';
    var bar=host.querySelector('.vo-bd i'),said=host.querySelector('.vo-said'),busy=false;
    function breath(){
      if(busy)return;busy=true;said.textContent='';
      bar.style.width='100%';
      setTimeout(function(){bar.style.transition='width .95s linear';
        setTimeout(function(){bar.style.width='0%';
          setTimeout(function(){said.textContent='That was me. Breathing through you.';busy=false},1000)},1000)},1000)}
    var b=host.querySelector('[data-breath]');
    b.addEventListener('click',breath);
    /* the heartbeat begins the first time this world is seen, and is never removed */
    this._start=function(){
      if(document.getElementById('vo-heart')||reduced)return;
      var h=document.createElement('div');h.id='vo-heart';h.setAttribute('aria-hidden','true');
      document.body.appendChild(h)}},
  step:function(){if(this._start)this._start()},
  words:function(){return 'A mirror table made of words: rivers and blood vessels, caves and lungs, '+
    'trees and spine \u2014 a spine of language. It tells you who is speaking without saying her name.'},
  play:{does:'hold your thumb: the world expands four, holds four, contracts four',plain:'one press does the same'}
});

/* ── 13 · A Strange Game — Voice III · the site itself ───────
   The homepage describing itself. The three doors at the threshold are its first three pages. */
ASGfig.define('game',{
  movement:'III', vertebrae:'all', marks:[], reads:[],
  css:'.gm-j{position:relative;margin:6px 0 0;padding:26px 0 8px}'+
      '.gm-j ol{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:6px 0;'+
      'align-items:center}'+
      '.gm-j li{font-size:14px;color:rgba(245,239,230,.86);white-space:nowrap}'+
      '.gm-j li::after{content:" \u00b7 ";opacity:.4}'+
      '.gm-j li:last-child::after{content:""}'+
      '.gm-s{display:grid;gap:7px;margin:16px 0 0}'+
      '.gm-s div{font-size:13px;line-height:1.5;padding-left:14px;position:relative;'+
      'color:rgba(245,239,230,.76)}'+
      '.gm-s div::before{content:"";position:absolute;left:0;top:.55em;width:7px;height:1px;'+
      'background:currentColor}'+
      '.gm-s .ground{color:#9CC48A}.gm-s .player{color:#C9A84C}.gm-s .witness{color:#E8DED4}'+
      '.gm-v{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin:18px 0 0}'+
      '.gm-v b{display:block;border:1px solid rgba(245,239,230,.2);border-radius:3px;padding:11px 10px;'+
      'font-weight:400;font-size:12.5px;color:rgba(245,239,230,.72)}'+
      '.gm-v b u{display:block;text-decoration:none;font-size:10.5px;letter-spacing:.16em;'+
      'text-transform:uppercase;color:var(--ac);margin-bottom:5px}'+
      '.gm-a{margin:18px 0 0;display:flex;gap:8px;flex-wrap:wrap;align-items:center}'+
      '.gm-a input{flex:1 1 180px;min-height:44px;background:rgba(245,239,230,.06);color:var(--ink);'+
      'border:1px solid rgba(245,239,230,.26);border-radius:3px;padding:0 12px;font:inherit;font-size:15px}'+
      '.gm-ack{font-family:Lora,Georgia,serif;font-style:italic;font-size:16px;min-height:1.6em;'+
      'margin:8px 0 0;color:var(--ac)}',
  mount:function(host,api){
    host.innerHTML='<div class="gm-j"><ol>'+
      ['Welcome','One','Call','Leela','Bindu','Road Home'].map(function(p){return '<li>'+p+'</li>'}).join('')+
      '</ol><div class="gm-s">'+
      '<div class="ground">the Ground \u2014 one strand that never changes. Gaia speaks once, at the Call.</div>'+
      '<div class="player">the Player \u2014 one strand that changes colour partway: Bindu, who doesn\u2019t yet '+
      'know what it is, becoming Lalita, who does.</div>'+
      '<div class="witness">the Witness \u2014 one strand whose distance changes: Sakshi watching from the side, '+
      'coming close enough to address you.</div></div></div>'+
      '<div class="gm-v">'+
      '<b><u>essence</u>who you are</b><b><u>memory</u>what you did</b><b><u>being</u>what you asked</b></div>'+
      '<p class="note" style="margin-top:10px">Three vessels. This world reads nothing and fills nothing.</p>'+
      '<div class="gm-a"><label class="sr" for="leela">Ask reality for help with one thing</label>'+
      '<input id="leela" type="text" maxlength="90" placeholder="ask reality for one thing" autocomplete="off">'+
      '<button class="pill" type="button" data-ask>Asked</button>'+
      '<button class="pill" type="button" data-silent>Held it in silence</button></div>'+
      '<p class="gm-ack" aria-live="polite"></p>'+
      '<p class="note">Every Leela drop ends in something done in actual life. '+
      '<i>Ask reality for help with one thing. Real life. Not in the game. Right now.</i> '+
      'Both count. Nothing here is saved.</p>';
    var ack=host.querySelector('.gm-ack'),inp=host.querySelector('#leela');
    host.querySelector('[data-ask]').addEventListener('click',function(){
      ack.textContent=(inp.value||'').trim()?'Asked. Nothing here is saved.':'Say it in actual life. Then tap Asked.';
      inp.value=''});
    host.querySelector('[data-silent]').addEventListener('click',function(){
      ack.textContent='Held in silence. That counts fully.';inp.value=''})},
  words:function(){return 'The journey \u2014 Welcome, One, Call, Leela, Bindu, Road Home \u2014 and three voices '+
    'braided along it: the ground that never changes, the player that changes colour, the witness that comes closer.'},
  play:{does:'the Leela\u2019s action \u2014 asked, or held in silence',plain:'both are buttons; nothing is stored'}
});

/* ── 14 · The Voice Library — how the family speaks ───────────
   D8 · the four family voices (CONTENT.md §4): four vertical lines, one lit point each — its witness
   line — and the four points fall on one horizontal. The business's voices (the Fabric, the eight
   brands, the four makers) have one door out, to akaswisdom, which stays hollow until it has a home. */
/* ═══ @voices — generated by tools/v3/blocks.py from content.py (CONTENT.md §4). Never typed here. ═══ */
var VOICES=[["Ash","spoken, in motion, orienting, holding the whole; grateful, unhurried","never rushes; never opens with the thing itself before the journey","When you tell your story backwards it almost sounds like everything is easy. But it wasn’t easy. It was difficult the whole time."],["Arch","warm with knowledge, precise with love; the “So” pivot, the analogy","never lectures, never performs warmth, never overclaims","I already did."],["Sid","brief and categorical; the answer first, the reason after, if at all","never explains the mechanism; never reaches for an analogy","The PU coated material is NOT waterproof. The PUL is 100% Waterproof. That is the difference."],["The House","the family plural — plain, declarative, grateful, exact about years","never sells, never explains, never argues a boundary","The creation is loud. The Creator is silent."]];
/* ═══ @end voices ═══ */
ASGfig.define('voicelibrary',{
  movement:'III', vertebrae:[6], marks:[], reads:['the Voice Library (ARC Owl) \u2014 the four family voices'],
  css:'.vl{position:relative;height:190px;margin:6px 0 0;display:flex;align-items:stretch;justify-content:space-around;'+
      'max-width:360px}'+
      '.vl button{position:relative;flex:0 0 64px;min-height:44px;border:0;background:none;cursor:pointer}'+
      '.vl button::before{content:"";position:absolute;left:50%;top:14px;bottom:14px;width:1px;'+
      'margin-left:-.5px;background:rgba(245,239,230,.22)}'+
      '.vl button::after{content:"";position:absolute;left:50%;top:50%;width:7px;height:7px;'+
      'margin:-3.5px 0 0 -3.5px;border-radius:50%;background:var(--ac);box-shadow:0 0 7px var(--ac);'+
      'transition:transform .4s}'+
      '.vl button[aria-pressed="true"]::after{transform:scale(1.9)}'+
      '.vl button:focus-visible{outline:1px solid var(--ac);outline-offset:-4px}'+
      '.vl .wl{position:absolute;left:0;right:0;top:50%;height:1px;background:rgba(201,168,76,.3)}'+
      '.vl-n{display:flex;justify-content:space-around;font-size:10px;letter-spacing:.08em;max-width:360px;'+
      'text-transform:uppercase;color:rgba(245,239,230,.6);margin-top:2px}'+
      '.vl-s{font-family:Lora,Georgia,serif;font-style:italic;font-size:16px;min-height:4em;'+
      'margin:12px 0 0;color:rgba(245,239,230,.86)}'+
      '.vl-out{font-size:12.5px;color:rgba(245,239,230,.6);margin:10px 0 0}'+
      '.vl-out small{margin-left:7px;font-size:9.5px;letter-spacing:.16em;text-transform:uppercase}',
  mount:function(host,api){
    var V=VOICES;
    var s='<span class="wl" aria-hidden="true"></span>';
    V.forEach(function(v,i){s+='<button type="button" aria-pressed="false" data-i="'+i+
      '" aria-label="'+v[0]+' \u2014 its witness line"></button>'});
    host.innerHTML='<div class="vl" role="group" aria-label="Four voices, one lit point each \u2014 and the lit points fall on one horizontal line: the witness runs through every voice this family speaks in">'+
      s+'</div><div class="vl-n">'+V.map(function(v){return '<span>'+v[0]+'</span>'}).join('')+'</div>'+
      '<p class="vl-s" aria-live="polite">Four voices. One lit point each \u2014 its witness line. '+
      'They fall on one horizontal line.</p>'+
      '<p class="vl-out"><span aria-disabled="true">the voices the business speaks in <small>arriving</small></span></p>';
    var out=host.querySelector('.vl-s');
    host.querySelectorAll('.vl button').forEach(function(b){b.addEventListener('click',function(){
      host.querySelectorAll('.vl button').forEach(function(o){o.setAttribute('aria-pressed','false')});
      b.setAttribute('aria-pressed','true');
      var v=V[+b.dataset.i];
      out.innerHTML='<b style="font-weight:500;font-style:normal">'+v[0]+'</b>'+
        '<br><span style="font-size:14px;font-style:normal;color:rgba(245,239,230,.7)">'+v[1]+' \u00b7 '+v[2]+'</span>'+
        '<br>\u201C'+v[3]+'\u201D'})})},
  words:function(){return 'Four vertical lines, one per family voice, each with one lit point \u2014 its witness '+
    'line \u2014 and every lit point falls on the same horizontal line.'},
  play:{does:'tap a voice: how it sounds, what it never does, its one witness line',plain:'tap'}
});
})();
