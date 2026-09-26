/* ─────────────────────────────────────────────────────────────
   figures/II-the-field.js — Movement II · the ten figures.

   Material: living ink — the line is born here; it boils.
   The Point: learns to sew. Every world shows its whole register:
   lit where built, faint where only registered. Faint means not written yet.

   One file per movement while the figures are being authored; each define()
   is independently addressable, so Claude Code can split them into
   figures/<id>.js or keep the movement bundle. Every figure declares what it
   reads at the top of its own spec — that is the contract Code verifies.
   ───────────────────────────────────────────────────────────── */
(function(){
var T=window.ASG_TALLY||{};
var svg=function(w,h,inner,cls,label){
  return '<svg class="'+(cls||'')+'" viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+
    (label||'')+'">'+inner+'</svg>'};

/* ── 1 · The Walk — thirty-three pages ───────────────────────── */
ASGfig.define('walk',{
  movement:'II', vertebrae:'all', marks:['point','line','ring','triangle'],
  reads:['chakra-<id>','asg.practice.<id>','bindu-point (read-only, this phone)'],
  css:'.wvwrap{position:relative;margin:22px -26px 0 -52px;padding:0 26px 0 52px;overflow-x:auto;'+
      'overflow-y:hidden;-webkit-overflow-scrolling:touch;scrollbar-width:none;'+
      'mask-image:linear-gradient(to right,transparent 0,#000 18px,#000 calc(100% - 26px),transparent 100%)}'+
      '.wvwrap::-webkit-scrollbar{display:none}'+
      '.wv{width:900px;min-width:900px;height:210px;display:block;color:var(--ac)}'+
      '.wv .lE,.wv .lB{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.6}'+
      '.wv .lM{fill:none;stroke:currentColor;stroke-width:1.1;opacity:.5;stroke-dasharray:2 5}'+
      /* harvest · v2's wave: every bead is a ring in its own chakra's colour, filled once walked,
         and they light one after another the first time the world arrives */
      '.wv .bd{fill:#0B0910;stroke:var(--bc,var(--ac));stroke-width:1.6;transition:opacity .5s,stroke-width .3s;'+
      'transition-delay:calc(var(--i,0) * 45ms + .3s),0s}'+
      '.wv .bd.lit{fill:var(--bc,var(--ac));filter:drop-shadow(0 0 4px var(--bc,var(--ac)))}'+
      '.world:not(.seen) .wv .bd{opacity:0}'+
      'body[data-lens="witness"] .world .wv .bd{opacity:1;transition:none}'+
      '.wv .nx{fill:none;stroke:var(--ac);stroke-width:1.2;transform-box:fill-box;transform-origin:center;'+
      'animation:wvPulse 2.8s ease-out infinite}'+
      '@keyframes wvPulse{0%{transform:scale(1);opacity:.9}100%{transform:scale(2.4);opacity:0}}'+
      '.wv .fam{font-size:11px;letter-spacing:.24em;fill:rgba(245,239,230,.66)}'+
      '.wv .hit:hover+.bd,.wv .bd:hover{stroke-width:2.6}'+
      '@media (prefers-reduced-motion:reduce){.world .wv .bd{opacity:1;transition:none}.wv .nx{animation:none}}'+
      '.wv text{font-family:inherit;font-size:8px;fill:rgba(245,239,230,.52);letter-spacing:.06em}'+
      '.wv .hit{fill:transparent;cursor:pointer}'+
      '.wvp{font-family:Lora,Georgia,serif;font-style:italic;font-size:15px;color:var(--ac);'+
      'min-height:2.6em;margin:8px 0 0}',
  walked:function(){var w={};
    /* one key per thing (C8): asg.walked.<id>, read through the kit — keys.js migrates the old names */
    for(var n=1;n<=33;n++)if(window.ASGkeys&&ASGkeys.walked(n))w[n]=1;
    if(location.search.indexOf('walked=13')>=0)for(var k=1;k<=13;k++)w[k]=1;   /* the harness */
    return w},
  fam:function(n){return (n===1||n===9||n===20||n>=30)?'R':n<=8?'E':n<=19?'B':'M'},
  mount:function(host,api){
    var S=this,W=WALK_GEO,s='',W33=S.walked(),f=S.fam;
    function X(n){return 26+(n-1)*W.dx}
    function Y(n){return 112+Math.sin((n-1)*.42)*54}
    /* four line qualities, from the four gesture families */
    ['E','B','M'].forEach(function(q){var d='',open=false;
      for(var n=1;n<=33;n++){if(f(n)===q){d+=(open?'L':'M')+X(n).toFixed(1)+' '+Y(n).toFixed(1);open=true}
        else open=false}
      if(d)s+='<path class="l'+q+'" d="'+d+'"/>'});
    /* beyond thirty-three, faint: the Spirit Chakras, still in research */
    s+='<path d="M'+X(33).toFixed(1)+' '+Y(33).toFixed(1)+' L'+(X(33)+52)+' '+(Y(33)-10)+
       '" stroke="currentColor" stroke-width="1" stroke-dasharray="1 6" opacity=".38" fill="none"/>'+
       '<text x="'+(X(33)+16)+'" y="'+(Y(33)-18)+'">Lalita leads to Lakota</text>';
    var next=0;for(var n=1;n<=33;n++)if(!W33[n]){next=n;break}
    var anyW=next!==1;
    for(var n=1;n<=33;n++){
      var lit=!!W33[n],q=f(n),cx=X(n),cy=Y(n);
      var bs=' style="--i:'+(n-1)+';--bc:'+api.readable(api.vcol(n),'#171226')+'"';
      if(anyW&&n===next)s+='<circle class="nx" cx="'+cx+'" cy="'+cy+'" r="9"/>';
      if(q==='R'){
        if(n===9)  /* Shadow — a dark knot with a starfield inside: all into one */
          s+='<circle class="bd'+(lit?' lit':'')+'"'+bs+' cx="'+cx+'" cy="'+cy+'" r="6.4"/>'+
             '<circle cx="'+cx+'" cy="'+cy+'" r="2" fill="#07060C"/>';
        else if(n===20)  /* Armin — the same knot, burst open: one into all */
          s+='<circle class="bd'+(lit?' lit':'')+'"'+bs+' cx="'+cx+'" cy="'+cy+'" r="3.2"/><g opacity=".75">'+
             [0,60,120,180,240,300].map(function(a){var r=a*Math.PI/180;
               return '<line x1="'+(cx+Math.cos(r)*5).toFixed(1)+'" y1="'+(cy+Math.sin(r)*5).toFixed(1)+
                 '" x2="'+(cx+Math.cos(r)*9.4).toFixed(1)+'" y2="'+(cy+Math.sin(r)*9.4).toFixed(1)+
                 '" stroke="'+api.vcol(20)+'" stroke-width="1"/>'}).join('')+'</g>';
        else if(n===1) s+='<circle class="bd'+(lit?' lit':'')+'"'+bs+' cx="'+cx+'" cy="'+cy+'" r="7"/>';
        else s+='<polygon class="bd'+(lit?' lit':'')+'"'+bs+' points="'+cx+','+(cy-7)+' '+(cx+6.2)+','+
             (cy+4.6)+' '+(cx-6.2)+','+(cy+4.6)+'"/>';
      } else {
        s+='<circle class="bd'+(lit?' lit':'')+'"'+bs+' cx="'+cx+'" cy="'+cy+
           '" r="'+(q==='B'?5.6:5.2)+'"/>'}
      s+='<rect class="hit" data-n="'+n+'" x="'+(cx-W.dx/2).toFixed(1)+'" y="30" width="'+
         W.dx.toFixed(1)+'" height="150"/>';
      if(n===1||n===9||n===18||n===20||n===33)
        s+='<text x="'+cx+'" y="'+(cy+22)+'" text-anchor="middle">'+api.vname(n)+'</text>';
      /* the spaces between are content: thirty-one passages */
      if(n<33)s+='<rect class="hit" data-from="'+n+'" x="'+(cx+W.dx*.22).toFixed(1)+'" y="'+
        (Math.min(cy,Y(n+1))-14).toFixed(1)+'" width="'+(W.dx*.56).toFixed(1)+'" height="28"/>'}
    /* v2's three family names under their stretches of the wave */
    [['ENERGY',2,8],['BODY',10,19],['MIND',21,29]].forEach(function(g){
      s+='<text class="fam" x="'+((X(g[1])+X(g[2]))/2).toFixed(1)+'" y="204" text-anchor="middle">'+g[0]+'</text>'});
    host.innerHTML='<div class="wvwrap">'+svg(900,210,s,'wv ink',
      'Thirty-three beads on a wave \u2014 the thirty-three pages of the walk, lit where this phone has walked')+
      '</div><p class="wvp" aria-live="polite"></p>'+
      '<p class="note" style="margin-top:4px">Swipe the wave, or tap any bead \u2014 all thirty-three.</p>';
    var psg=host.querySelector('.wvp');
    /* the keyboard path to the same outcomes (HANDOFF: dozens of targets get ONE focusable control that
       opens the sheet with the items as rows): Enter on the wave lists all thirty-three pages */
    var wrap=host.querySelector('.wvwrap');
    wrap.setAttribute('tabindex','0');wrap.setAttribute('role','group');wrap.setAttribute('data-kbd','sheet');
    wrap.setAttribute('aria-label','Thirty-three beads on a wave. Press Enter for all thirty-three as a list.');
    wrap.addEventListener('keydown',function(e){if(e.key!=='Enter'&&e.key!==' ')return;e.preventDefault();
      var rows='';for(var n=1;n<=33;n++){var h='/tree-of-life/'+api.vname(n).toLowerCase().replace(/ /g,'-')+'-practice';
        rows+=ASG.arriving(h)?'<li><span class="rc-arr" aria-disabled="true">'+n+' \u00b7 '+api.vname(n)+' <small>arriving</small></span></li>'
          :'<li><a href="'+h+'">'+n+' \u00b7 '+api.vname(n)+'</a></li>'}
      api.sheet('the walk','Thirty-three pages','<ul>'+rows+'</ul>')});
    host.querySelectorAll('.hit').forEach(function(r){r.addEventListener('click',function(){
      if(r.dataset.from){var a=+r.dataset.from;
        psg.textContent='Between '+api.vname(a)+' and '+api.vname(a+1)+
          ' \u2014 the passage there has its own page.';return}
      var n=+r.dataset.n;
      api.sheet('vertebra '+n,api.vname(n),
        '<p style="font-family:Lora,serif;font-style:italic">Its seed, then the first line of the journey '+
        'voice, then the first line of the witness voice \u2014 two voices per bead.</p>'+
        '<p style="color:rgba(245,239,230,.66)">'+(S.walked()[n]
          ?'This phone has walked it.':'This phone has not walked it. It is open anyway \u2014 every page is.')+
        '</p><ul>'+(function(h){return ASG.arriving(h)
          ?'<li><span class="rc-arr" aria-disabled="true">its practice page <small>arriving</small></span></li>'
          :'<li><a href="'+h+'">its practice page \u2192</a></li>'})
          ('/tree-of-life/'+api.vname(n).toLowerCase().replace(/ /g,'-')+'-practice')+'</ul>')})});
    /* the buttons the law allows: all thirty-three open; the lights are memory, not permission */
    var cont=document.getElementById('contBtn');
    if(cont){var walked=Object.keys(S.walked()).length;
      cont.hidden=!walked;
      if(walked)cont.textContent='Continue at '+api.vname(next||33)}},
  words:function(){return 'Thirty-three beads on a wave. Four line qualities from the four gesture '+
    'families; Shadow a dark knot and Armin the same knot burst open; the line continues faint past Lalita.'},
  play:{does:'touch a bead for its two voices; touch between two beads for the passage',
        plain:'the same, by tap'}
});
var WALK_GEO={dx:(900-52)/32};

/* ── 2 · The Chakra Map — the master map ─────────────────────── */
ASGfig.define('chakramap',{
  movement:'II', vertebrae:'all', marks:['point','line','ring'],
  reads:[],
  css:'.cm{width:100%;max-width:330px;height:auto;display:block;margin:0 auto;color:var(--ac)}'+
      '.cm line{stroke:currentColor;stroke-width:.8;opacity:.45}'+
      '.cm .nd{cursor:pointer}.cm .nd .dot{fill:rgba(245,239,230,.3);transition:fill .4s}'+
      '.cm .nd:focus-visible{outline:none}.cm .nd:focus-visible .dot{fill:#fff}'+
      '.cm .nd.on .dot{fill:var(--ac)}.cm .nd.pair .dot{fill:var(--gold-lift)}'+
      '.cm.flip{color:#8FAEEE}.cm.flip .nd .dot{fill:rgba(143,174,238,.28)}'+
      '.cm.flip .nd.on .dot{fill:#8FAEEE}'+
      '.cmq{font-family:Lora,Georgia,serif;font-style:italic;font-size:16px;margin:10px 0 0;color:var(--ac)}',
  /* the Tree of Life, Lalita as the crown; pairs are the map's own pair glow */
  nodes:[[50,6,33],[50,20,31],[26,20,30],[74,20,32],[50,34,18],[26,48,9],[74,48,20],[50,62,1],[50,80,2]],
  pairs:{9:20,20:9,30:32,32:30,31:1,1:31},
  mount:function(host,api){
    var N=this.nodes,P=this.pairs,E=[[0,1],[1,2],[1,3],[2,4],[3,4],[4,5],[4,6],[5,7],[6,7],[7,8],[2,5],[3,6]];
    var s=E.map(function(e){return '<line x1="'+N[e[0]][0]+'" y1="'+N[e[0]][1]+'" x2="'+N[e[1]][0]+
      '" y2="'+N[e[1]][1]+'"/>'}).join('');
    /* the mark stays small; the target clears 44px (r=15 of a 100-unit box ≈ 49px at 330) */
    s+=N.map(function(n){return '<g class="nd" data-v="'+n[2]+'" tabindex="0" role="button" aria-label="'+
      api.vname(n[2])+'"><circle class="dot" cx="'+n[0]+'" cy="'+n[1]+'" r="3.4"/>'+
      '<circle cx="'+n[0]+'" cy="'+n[1]+'" r="15" fill="transparent"/></g>'}).join('');
    host.innerHTML=svg(100,88,s,'cm ink','The Tree of Life with Lalita as the crown — touch one centre and its pair lights with it')+
      '<p class="cmq"></p>'+
      '<div class="row"><button class="pill" type="button" data-flip>Flip the axis</button>'+
      '<a class="pill" href="/chakras/chakra-map">Open the map</a></div>'+
      '<p class="note">The map\u2019s own front door asks one question: <i>what do you need right now?</i> '+
      'Answer it there and it routes you in at the place that fits.</p>';
    var sv=host.querySelector('.cm'),q=host.querySelector('.cmq');
    sv.querySelectorAll('.nd').forEach(function(c){
      function hit(){sv.querySelectorAll('.nd').forEach(function(o){o.classList.remove('on','pair')});
        c.classList.add('on');var v=+c.dataset.v,p=P[v];
        if(p)sv.querySelectorAll('[data-v="'+p+'"]').forEach(function(o){o.classList.add('pair')});
        q.textContent=api.vname(v)+(p?' \u2014 and '+api.vname(p)+', which lights with it.':'');}
      c.addEventListener('click',hit);
      c.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();hit()}})});
    host.querySelector('[data-flip]').addEventListener('click',function(){
      var on=sv.classList.toggle('flip');
      this.textContent=on?'Flip it back':'Flip the axis';
      q.textContent=on?'The dark perspective. The flip is the Axis \u2014 vertebra 18, where the witness sits.':''})},
  words:function(){return 'The Tree of Life with Lalita as the crown, four systems as four environments. '+
    'Touch one centre and its pair lights with it. One control flips the whole map between its dark and light perspective.'},
  play:{does:'pair glow, and the Axis Flip',plain:'both are taps'}
});

/* ── 3 · The Practice Book — thirty-three, twice ─────────────── */
ASGfig.define('practicebook',{
  movement:'II', vertebrae:[33], marks:['line','point'],
  reads:[],
  css:'.pb{position:relative;height:190px;overflow-x:auto;overflow-y:hidden;display:flex;gap:6px;'+
      'align-items:flex-end;scrollbar-width:none;padding:0 0 8px}.pb::-webkit-scrollbar{display:none}'+
      '.pb b{flex:0 0 auto;width:13px;height:auto;min-height:90px;border:1px solid rgba(245,239,230,.28);'+
      'border-bottom:0;background:linear-gradient(to top,rgba(245,239,230,.07),transparent);cursor:pointer;'+
      'transition:min-height .4s,background .4s}'+
      '.pb b:hover,.pb b.on{min-height:150px;background:color-mix(in oklab,var(--ac) 22%,transparent)}'+
      '.pbt{font-family:Cinzel,Georgia,serif;font-size:19px;letter-spacing:.06em;margin:6px 0 0;'+
      'transition:opacity .6s}',
  mount:function(host,api){
    var s='';for(var i=1;i<=66;i++)s+='<b data-i="'+i+'" title="spread '+i+'"></b>';
    host.innerHTML='<div class="pb" role="img" aria-label="Sixty-six spreads, Bindu to Lalita — drag to flick through them">'+
      s+'</div><div class="pbt">A Strange Chakra Map</div>'+
      '<p class="note">Thirty-three chakras, two pages each, three voices: forty thousand words and '+
      'twenty-seven illustrations. Let go on any spread and it opens there.</p>';
    var strip=host.querySelector('.pb'),title=host.querySelector('.pbt');
    /* and the title turns: the field\u2019s own position-33 retitling, at book scale */
    strip.addEventListener('scroll',function(){
      var k=strip.scrollLeft/(strip.scrollWidth-strip.clientWidth||1);
      title.textContent=k>.92?'A Strange Love Map':'A Strange Chakra Map';
      title.style.color=k>.92?'var(--ac)':''},{passive:true});
    strip.querySelectorAll('b').forEach(function(b){b.addEventListener('click',function(){
      strip.querySelectorAll('b').forEach(function(o){o.classList.remove('on')});b.classList.add('on');
      api.sheet('the book','Spread '+b.dataset.i+' of sixty-six',
        '<p>Two pages per chakra, three voices \u2014 the journey, the witness, and the practice.</p>'+
        '<ul><li><a href="/chakras/chakra-practice">Open the Practice Book \u2192</a></li></ul>')})})},
  words:function(){return 'Sixty-six spreads as a flip-book. At the end the cover rewrites itself '+
    'from A Strange Chakra Map to A Strange Love Map.'},
  play:{does:'flick the spreads; the title turns at the end',plain:'tap any spread'}
});

/* ── 4 · The Dances — thirty-three verbs, placed by their own colour ── */
ASGfig.define('dances',{
  movement:'II', vertebrae:'B', marks:['point','ring'],
  reads:['ASG_DANCES (data/dances.json)'],
  css:'.dnc{position:relative;width:min(100%,330px);aspect-ratio:1;margin:0 auto}'+
      '.dnc i{position:absolute;width:44px;height:44px;margin:-22px 0 0 -22px;border-radius:50%;'+
      'cursor:pointer;background:none}'+
      '.dnc i::after{content:"";position:absolute;left:50%;top:50%;width:9px;height:9px;'+
      'margin:-4.5px 0 0 -4.5px;border-radius:50%;background:var(--c);box-shadow:var(--cg,none);'+
      'transition:box-shadow .4s}'+
      '.dnc i:hover::after,.dnc i.on::after,.dnc i:focus-visible::after{'+
      'box-shadow:0 0 0 5px rgba(245,239,230,.14)}'+
      '.dnc i:focus-visible{outline:none}'+
      '.dnc u{position:absolute;width:5px;height:5px;margin:-2.5px 0 0 -2.5px;border-radius:50%;'+
      'background:rgba(245,239,230,.32)}'+
      '.dnc .rr{position:absolute;left:50%;top:50%;border:1px dashed rgba(245,239,230,.1);'+
      'border-radius:50%;pointer-events:none}'+
      '.dnc em{position:absolute;left:50%;top:50%;margin:-4.5px 0 0 -4.5px;width:9px;height:9px;'+
      'border-radius:50%;background:var(--gold);box-shadow:0 0 14px var(--gold)}'+
      '.dnq{font-family:Lora,Georgia,serif;font-style:italic;font-size:16px;min-height:3.2em;margin:10px 0 0}'+
      '.dns{font-size:12.5px;color:rgba(245,239,230,.66);min-height:1.4em}',
  mount:function(host,api){
    var D=window.ASG_DANCES||[],hued=D.filter(function(d){return typeof d.hue==='number'});
    var un=D.filter(function(d){return d.hue===null&&d.verb!=='stay'});
    var stay=D.filter(function(d){return d.verb==='stay'})[0];
    var s='<em aria-hidden="true"></em><span class="rr" style="width:84%;height:84%;margin:-42% 0 0 -42%"></span>',seenHue={};
    hued.forEach(function(d){
      /* the angle is the hue and stays true; verbs sharing a hue step inward along the radius */
      var k=seenHue[d.hue]=(seenHue[d.hue]||0)+1;
      var a=(d.hue-90)*Math.PI/180,R=42-(k-1)*11;
      s+='<i data-v="'+d.verb+'" tabindex="0" role="button" aria-label="'+d.verb+'" style="--c:hsl('+
        d.hue+' 62% 58%);left:'+(50+Math.cos(a)*R).toFixed(1)+'%;top:'+
        (50+Math.sin(a)*R).toFixed(1)+'%"></i>'});
    /* the nine chakra dances have no hue in the registry yet — an inner ring, honestly */
    un.forEach(function(d,i){var a=(i/un.length)*6.283,R=20;
      s+='<u title="'+d.verb+' \u2014 hue not in the registry yet" style="left:'+
        (50+Math.cos(a)*R).toFixed(1)+'%;top:'+(50+Math.sin(a)*R).toFixed(1)+'%"></u>'});
    if(stay)s+='<i data-v="stay" tabindex="0" role="button" aria-label="stay" style="--c:hsl(28 70% 60%);'+
      '--cg:0 0 12px hsl(28 70% 55%);left:50%;top:96%"></i>';
    host.innerHTML='<div class="dnc" role="img" aria-label="The verbs orbit one point at their own hue angle — nobody arranges the orbit; the data does">'+
      s+'</div><p class="dnq"></p><p class="dns"></p>'+
      /* B3 · the note says only what the registry holds: every hue is known now, so the inner ring
         is gone unless the data brings one back */
      '<p class="note">A hue is an angle, so each verb stands at its own. '+hued.length+
      ' hues are in the registry'+(un.length?'; '+un.length+' verbs are on the inner ring until their hue is read':'')+
      '. '+(stay?'The last is <i>stay</i>, and it is warm.':'')+'</p>';
    var q=host.querySelector('.dnq'),sub=host.querySelector('.dns');
    host.querySelectorAll('.dnc i').forEach(function(el){
      function hit(){host.querySelectorAll('.dnc i').forEach(function(o){o.classList.remove('on')});
        el.classList.add('on');
        var d=D.filter(function(x){return x.verb===el.dataset.v})[0]||{};
        q.textContent=d.seed_question||(d.verb==='stay'?'Stay.':'');
        sub.textContent=d.song?(d.song+' \u2014 '+(d.artist||'')):''}
      el.addEventListener('click',hit);
      el.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();hit()}})})},
  words:function(){return 'Thirty-three verbs orbiting one point, each at its own hue angle. '+
    'The person sees only the verb; the song arrives after.'},
  play:{does:'touch a verb: its seed question, then the song',plain:'tap'}
});

/* ── 5 · The Readings — what the songs already knew ──────────── */
/* harvest · v2's field of words: every reading as its verb, at the size of a word you can
   hear, in its element's own colour — falling in like notes the first time the world
   arrives, then bobbing, each on its own phase. The eleven breaths are words too: italic,
   and they swell instead of bob. From the register, never a typed list. */
ASGfig.define('readings',{
  movement:'II', vertebrae:'E', marks:['point','ring','line'],
  reads:['register k:read {t,s,h,x}'],
  css:'.rd{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;margin:4px 0 0;padding-bottom:2px}'+
      '.rd::-webkit-scrollbar{display:none}'+
      '.rd button{flex:none;min-height:44px;padding:0 12px;border:1px solid rgba(245,239,230,.22);'+
      'border-radius:999px;font-size:11.5px;letter-spacing:.06em;display:inline-flex;align-items:center;gap:7px;'+
      'color:rgba(245,239,230,.74)}'+
      '.rd button i{width:6px;height:6px;border-radius:50%;background:var(--ec)}'+
      '.rd button[aria-pressed="true"]{border-color:#F5EFE6;color:#F5EFE6}'+
      '.rw{display:flex;flex-wrap:wrap;gap:0 14px;margin:14px 0 4px}'+
      '.rw a{min-height:44px;min-width:44px;display:inline-flex;align-items:center;justify-content:center;'+
      'font-family:Lora,Georgia,serif;font-size:clamp(22px,3.2vw,30px);line-height:1;color:var(--ec);'+
      'transition:opacity .7s,transform .9s cubic-bezier(.2,1.4,.4,1);transition-delay:calc(var(--i,0) * 22ms)}'+
      '.rw a.br{font-style:italic;font-size:clamp(19px,2.7vw,25px)}'+
      '.world:not(.seen) .rw a{opacity:0;transform:translateY(-18px)}'+
      '.rw a span{display:inline-block;animation:rbob 6s ease-in-out infinite;animation-delay:calc(var(--i,0) * -.37s)}'+
      '.rw a.br span{animation:rbrw 5.5s ease-in-out infinite}'+
      '@keyframes rbob{50%{transform:translateY(-3px)}}'+
      '@keyframes rbrw{50%{transform:scale(1.08)}}'+   /* scale only: animating letter-spacing re-wrapped the field, and the page below it moved a line every few seconds */
      '.rw.f a:not(.on){opacity:.14!important}'+
      '.rw a:hover span,.rw a:focus-visible span{text-shadow:0 0 14px var(--ec)}'+
      'body[data-lens="witness"] .world .rw a{opacity:1;transform:none;transition:none}'+
      'body[data-lens="witness"] .rw a span{animation:none}'+
      '@media (prefers-reduced-motion:reduce){.world .rw a{opacity:1;transform:none}.rw a span{animation:none}}',
  EC:{Earth:'#D7A46E',Water:'#6FB8D6',Fire:'#F08F6C',Air:'#C9D6E6',Light:'#F2D98A',Crown:'#CDB0EE',
      Soul:'#E3C06A',Dissolution:'#A9B2C6',Meditate:'#93CDA8',Breath:'#F5EFE6'},
  mount:function(host,api){
    var EC=this.EC,R=((api.register&&api.register.entries)||[]).filter(function(e){return e.k==='read'});
    if(!R.length)R=(window.ASG_READINGS||[]).map(function(v){return {t:v.t,h:v.h||'/bindu/read/'+v.t.replace(/ /g,'-'),x:'',s:''}});
    var X=[];R.forEach(function(e){if(e.x&&X.indexOf(e.x)<0)X.push(e.x)});
    function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;')}
    host.innerHTML='<div class="rd" role="group" aria-label="Light one element">'+X.map(function(x){
        return '<button type="button" aria-pressed="false" data-x="'+esc(x)+'" style="--ec:'+EC[x]+'"><i></i>'+
          (x==='Breath'?'the breaths':x.toLowerCase())+'</button>'}).join('')+'</div>'+
      '<div class="rw">'+R.map(function(e,i){
        return '<a href="'+e.h+'" data-x="'+esc(e.x||'')+'" class="'+(e.x==='Breath'?'br':'')+'" style="--i:'+i+
          ';--ec:'+(EC[e.x]||'#F5EFE6')+'" title="'+esc(e.s||'')+'"><span>'+esc(e.t)+'</span></a>'}).join('')+'</div>'+
      '<p class="note">'+R.length+' readings. Each takes one song and reads what it is really saying — the words '+
      'heard from witness consciousness, the frequency underneath, the video frame by frame. The italic ones are breaths.</p>';
    var rw=host.querySelector('.rw'),on=null;
    host.querySelectorAll('.rd button').forEach(function(b){b.addEventListener('click',function(){
      on=on===b.dataset.x?null:b.dataset.x;
      host.querySelectorAll('.rd button').forEach(function(o){o.setAttribute('aria-pressed',o.dataset.x===on?'true':'false')});
      rw.classList.toggle('f',!!on);
      rw.querySelectorAll('a').forEach(function(a){a.classList.toggle('on',a.dataset.x===on)})})})},
  words:function(){return 'Every reading as its verb, in its element\u2019s colour, falling in like notes and '+
    'then bobbing; the eleven breaths are italic and swell. Touch an element to light only those.'},
  play:{does:'light one element; open any reading',plain:'taps'}
});
/* ── 6 · The Teachings — the page's own laws ─────────────────── */
ASGfig.define('teachings',{
  movement:'II', vertebrae:'M', marks:['point','line'],
  reads:['day of year (today\u2019s teaching)'],
  css:'.tc{display:grid;gap:0;margin:4px 0 0}'+
      '.tc button{display:flex;align-items:center;gap:10px;min-height:44px;text-align:left;font-size:14px;'+
      'border-bottom:1px solid rgba(245,239,230,.1);color:rgba(245,239,230,.84)}'+
      '.tc button:hover,.tc button:focus-visible{color:#fff}'+
      '.tc s{width:7px;height:7px;border-radius:50%;background:var(--gold);flex:0 0 auto;'+
      'text-decoration:none;box-shadow:0 0 6px var(--gold)}'+
      '.tc em{margin-left:auto;font-size:11.5px;letter-spacing:.1em;text-transform:uppercase;'+
      'color:rgba(245,239,230,.5);font-style:normal}'+
      '.tbk{position:relative;perspective:1400px;margin:4px 0 22px;max-width:440px;'+
      'transition:transform 1.2s cubic-bezier(.16,1,.3,1),opacity 1.2s}'+
      '.world:not(.seen) .tbk{transform:rotateX(14deg) translateY(18px);opacity:0}'+
      '.tbk .feat{position:relative;display:grid;gap:6px;padding:22px 20px 18px;color:#1E1A16;'+
      'background:linear-gradient(90deg,rgba(30,26,22,.07),transparent 7%),#FBF7EF;border:1px solid rgba(30,26,22,.14);'+
      'border-radius:2px 6px 6px 2px;box-shadow:0 1px 0 #EDE4D3,0 2px 0 #E3D8C4,0 3px 0 #EDE4D3,0 4px 0 #DCCFB8,'+
      '0 18px 30px -18px rgba(0,0,0,.6);transform-origin:left center;transition:transform .8s cubic-bezier(.6,0,.2,1),opacity .8s}'+
      '.tbk .feat:hover{color:#1E1A16}'+
      '.tbk .feat.turn{transform:rotateY(-100deg);opacity:0}'+
      '.tbk .feat.in{animation:tbkIn .7s cubic-bezier(.16,1,.3,1)}@keyframes tbkIn{from{transform:rotateY(18deg);opacity:.2}}'+
      '.tbk .rb{position:absolute;top:-4px;right:54px;width:12px;height:44px;background:var(--rb);'+
      'clip-path:polygon(0 0,100% 0,100% 100%,50% 80%,0 100%)}'+
      '.tbk .k{font-size:10.5px;letter-spacing:.2em;text-transform:uppercase;color:rgba(30,26,22,.66)}'+
      '.tbk .t{font-family:Lora,Georgia,serif;font-weight:400;font-size:clamp(22px,3vw,28px);line-height:1.15;max-width:17ch}'+
      '.tbk .s{font-family:Lora,Georgia,serif;font-style:italic;font-size:16px;line-height:1.45;color:rgba(30,26,22,.78)}'+
      '.tbk .r{font-size:12.5px;letter-spacing:.08em;margin-top:4px;color:#1E1A16}'+
      '.tbk .corner{position:absolute;right:0;bottom:0;width:48px;height:48px;z-index:2}'+
      '.tbk .corner::before{content:"";position:absolute;right:0;bottom:0;width:22px;height:22px;'+
      'background:linear-gradient(315deg,#F4EEE3 50%,#E3D6BF 50%,#FFFDF8 100%);box-shadow:-2px -2px 5px rgba(30,26,22,.18);'+
      'border-radius:0 0 6px 0;transition:width .35s,height .35s}'+
      '.tbk .corner:hover::before,.tbk .corner:focus-visible::before{width:34px;height:34px}'+
      '.tbk .corner span{position:absolute;right:40px;bottom:14px;font-size:10.5px;letter-spacing:.16em;'+
      'text-transform:uppercase;color:rgba(30,26,22,.7);white-space:nowrap;opacity:0;transition:opacity .4s}'+
      '.tbk .corner:hover span,.tbk .corner:focus-visible span{opacity:1}'+
      'body[data-lens="witness"] .world .tbk{transform:none;opacity:1;transition:none}'+
      '@media (prefers-reduced-motion:reduce){.world .tbk{transform:none;opacity:1}}',
  laws:[['Count in Private','walk','the wave \u2014 no number anywhere on it'],
    ['Only True When True','threshold','the doors'],
    ['The Note It Doesn\u2019t Play','fieldapp','the binaural carrier'],
    ['The Hoop Doesn\u2019t Hurry','mirror','the seventh entry'],
    ['A Mirror, Not a Master','being','the open wall'],
    ['Remember Them. Remember Yourself.','lalitafamily','the house'],
    ['Less Is the Point','feed','the Feed'],
    ['The Two Clocks','learningapp','the cloister'],
    ['Blink. Breathe. Press.','chakrasapp','the one button'],
    ['One Gesture','voiceapp','the one press'],
    ['Build the Slice','chakrasapp','the thirty-three rooms'],
    ['Not Repair \u2014 Birth','neev','Neev'],
    ['Wrong Time, Not Wrong Page','threshold','the die']],
  mount:function(host,api){
    var L=this.laws,today=L[(new Date()).getDate()%L.length];
    /* harvest · v2's book: today's teaching on a page, and the corner lifts to turn to another */
    var TT=((api.register&&api.register.entries)||[]).filter(function(e){return e.k==='teach'});
    var bk='';
    if(TT.length){var day=Math.floor((Date.now()-new Date(new Date().getFullYear(),0,0))/864e5);
      var bi=day%TT.length;
      /* the homepage door "today's teaching" (doors.json: computed by day of year) opens this same page */
      [].forEach.call(document.querySelectorAll('[data-door-today]'),function(a){a.href=TT[bi].h});
      bk='<div class="tbk"><a class="feat" href="'+TT[bi].h+'"><i class="rb" style="--rb:'+TT[bi].c+'"></i>'+
        '<span class="k">today\u2019s teaching \u00b7 '+(TT[bi].x||'')+'</span><b class="t">'+TT[bi].t+'</b>'+
        '<span class="s">'+TT[bi].s+'</span><span class="r">read it \u2192</span></a>'+
        '<button class="corner" type="button" aria-label="Turn the page \u2014 another teaching"><span>turn the page</span></button></div>'}
    host.innerHTML=bk+'<div class="tc">'+L.map(function(l,i){
      return '<button type="button" data-to="'+l[1]+'" data-w="'+l[2]+'"><s></s>'+l[0]+
        (l===today?'<em>today</em>':'')+'</button>'}).join('')+'</div>'+
      '<div class="row"><a class="pill" href="/teachings/">Plain</a>'+
      '<a class="pill" href="/teachings/#craft">Craft</a><a class="pill" href="/teachings/#inner">Inner</a></div>'+
      '<p class="note">Thirteen laws, three doors each. Touch a pin and the Point flies to the place on '+
      'this page where that law is operating \u2014 and back.</p>';
    var cn=host.querySelector('.tbk .corner');
    if(cn){var ft=host.querySelector('.tbk .feat'),busy=false;
      cn.addEventListener('click',function(){if(busy)return;bi=(bi+1)%TT.length;var e=TT[bi];
        function fill(){ft.href=e.h;ft.querySelector('.t').textContent=e.t;ft.querySelector('.s').textContent=e.s;
          ft.querySelector('.k').textContent='another teaching \u00b7 '+(e.x||'');ft.querySelector('.rb').style.setProperty('--rb',e.c)}
        if(api.reduced||document.body.dataset.lens==='witness'){fill();return}
        busy=true;ft.classList.add('turn');
        setTimeout(function(){fill();ft.classList.remove('turn');ft.classList.add('in');
          setTimeout(function(){ft.classList.remove('in');busy=false},720)},560)})}
    host.querySelectorAll('.tc button').forEach(function(b){b.addEventListener('click',function(){
      var el=document.getElementById(b.dataset.to);
      if(!el){api.sheet('the law',b.textContent.replace('today',''),
        '<p>It is operating at <b style="font-weight:500">'+b.dataset.w+
        '</b> \u2014 a world that arrives with its own movement. The Point will fly there when it does.</p>');return}
      api.anchor(el);ASG.point.state='anchor';
      el.scrollIntoView({block:'center'});
      setTimeout(function(){api.anchor(null);ASG.point.state='thread'},2600)})})},
  words:function(){return 'Thirteen laws, each with a gold pin. Touch one and the Point flies to where '+
    'that law is operating on this page, and back.'},
  play:{does:'touch a pin \u2014 the law proves itself on the page',plain:'tap'}
});

/* ── 7 · Learning — three lakes ──────────────────────────────── */
ASGfig.define('learning',{
  movement:'II', vertebrae:'M', marks:['point','arc'],
  reads:['ASG_TALLY.learning {built, registered, held} \u2014 from the engine, never a literal',
         'register entry.g (lake) \u2014 each built page sits in its own lake'],
  css:'.lk{position:relative;height:210px;margin:6px 0 0}'+
      '.lk svg{width:100%;height:100%;overflow:visible;color:var(--ac)}'+
      '.lk path{fill:none;stroke:currentColor;stroke-width:1;opacity:.5}'+
      '.lk .pt{fill:var(--ac)}.lk .pt.reg{opacity:.34}.lk .pt.held{fill:#E8C46A;opacity:.8}'+
      '.lkl{display:flex;gap:14px;flex-wrap:wrap;margin:8px 0 0;font-size:12px;'+
      'color:rgba(245,239,230,.66)}'+
      '.shf{display:flex;align-items:flex-end;gap:5px;overflow-x:auto;overflow-y:hidden;scrollbar-width:none;'+
      'padding:14px 2px 7px;margin:6px 0 0;-webkit-overflow-scrolling:touch;'+
      'background:linear-gradient(transparent calc(100% - 7px),#3B4A6E calc(100% - 7px),#26314D)}'+
      '.shf::-webkit-scrollbar{display:none}'+
      '.sp{flex:none;width:48px;height:var(--h);border-radius:3px 3px 1px 1px;color:var(--ink);'+
      'background:linear-gradient(90deg,rgba(0,0,0,.28),transparent 32%,rgba(255,255,255,.12) 62%,rgba(0,0,0,.22)),var(--c);'+
      'display:flex;justify-content:center;padding:12px 0;writing-mode:vertical-rl;font-family:Lora,Georgia,serif;'+
      'font-size:14.5px;line-height:1.1;box-shadow:inset 0 3px 0 rgba(255,255,255,.2);overflow:hidden;'+
      'transition:transform .8s cubic-bezier(.16,1,.3,1);transition-delay:calc(var(--i,0) * 28ms)}'+
      '.sp span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}'+
      '.world:not(.seen) .sp{transform:translateY(110%)}'+
      '.world.seen .sp:hover,.world.seen .sp:focus-visible{transform:translateY(-12px) rotate(-2deg);transition-delay:0s;color:var(--ink)}'+
      'body[data-lens="witness"] .world .sp{transform:none;transition:none}'+
      '@media (prefers-reduced-motion:reduce){.world .sp{transform:none}}',
  mount:function(host,api){
    var t=(window.ASG_TALLY||{}).learning||{},built=t.built||0,reg=t.registered||0,held=t.held||0;
    /* harvest · v2's shelf: one spine per topic, in its own colour, each opening its storybook.
       The spines rise onto the shelf the first time the world arrives. From the register. */
    /* only pages that are live: an arriving entry (a floor, an export) is never a spine you can open */
    /* one spine per STORYBOOK (Design: "each spine opens its storybook"). With the full register
       behind it the shelf had grown to every topic — hundreds of vertical spines, and the page's
       heaviest relayout while scrolling. The lights below still count every page. */
    var LR=((api.register&&api.register.entries)||[]).filter(function(e){return e.k==='learn'&&e.st!=='arriving'&&e.f==='story'}),TP={},ord=[];
    var ALL=((api.register&&api.register.entries)||[]).filter(function(e){return e.k==='learn'&&e.st!=='arriving'&&e.f});
    LR.forEach(function(e){if(!TP[e.t]){TP[e.t]={t:e.t,c:e.c,h:e.h};ord.push(e.t)}if(/story/.test(e.s))TP[e.t].h=e.h});
    function hh(s){var h=0;for(var i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))>>>0;return h}
    function ink(c){var x=c.replace('#',''),r=parseInt(x.slice(0,2),16),g=parseInt(x.slice(2,4),16),b=parseInt(x.slice(4,6),16);
      return (r*299+g*587+b*114)/1000>150?'#1E1A16':'#F8F2E8'}
    var shelf=ord.length?'<div class="shf" role="list" aria-label="'+ord.length+' topics \u2014 each spine opens its storybook">'+
      ord.map(function(n,i){var o=TP[n];return '<a class="sp" role="listitem" href="'+o.h+'" aria-label="'+n+
        ' \u2014 the storybook" style="--i:'+i+';--c:'+o.c+';--ink:'+ink(o.c)+';--h:'+(150+hh(n)%70)+'px"><span>'+n+
        '</span></a>'}).join('')+'</div><p class="note" style="margin-top:8px">Swipe the shelf. Each spine opens its storybook \u2014 '+
      ord.length+' topics so far, each told two ways.</p>':'';
    var lakes=['Therapy','Consciousness','Learning'],s='',W=340,H=200;
    lakes.forEach(function(nm,i){
      var cx=58+i*112,cy=118,rx=48,ry=26;
      s+='<path d="M'+(cx-rx)+' '+cy+' Q'+cx+' '+(cy+ry*1.8)+' '+(cx+rx)+' '+cy+'"/>'+
         '<path d="M'+(cx-rx)+' '+cy+' Q'+cx+' '+(cy-ry*.5)+' '+(cx+rx)+' '+cy+'" opacity=".3"/>'+
         '<text x="'+cx+'" y="'+(cy+74)+'" text-anchor="middle" font-size="10" fill="rgba(245,239,230,.62)" '+
         'font-family="inherit">'+nm+'</text>'});
    /* the lights: built glow, registered fainter, held at the shoreline pointing outward.
       Built pages now sit IN their lake — the register carries each page's lake (g), so the
       declared gap is closed (B6). Registered-but-unwritten and held topics have no page yet, so
       they keep Design's pooled places above the water and at the shoreline. */
    var BY={},shown=0,cap=150,r=0;
    ALL.forEach(function(e){if(e.g)(BY[e.g]=BY[e.g]||[]).push(e)});
    var tot=lakes.reduce(function(a,nm){return a+(BY[nm]||[]).length},0)||1;
    lakes.forEach(function(nm,i){
      var cx=58+i*112,cy=118,rx=48,n=Math.round(Math.min(cap,tot)*(BY[nm]||[]).length/tot);
      for(var k=0;k<n;k++){
        /* a sunflower spiral inside the bowl: the lake fills from its middle */
        var a=k*2.39996,rr=Math.sqrt((k+.5)/Math.max(n,1)),x=cx+Math.cos(a)*rr*(rx-6),
            y=cy+14+Math.sin(a)*rr*15;
        s+='<circle class="pt" cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="1.5"/>'}
      shown+=n});
    for(r=0;r<Math.min(Math.max(0,reg-built),160);r++){var x2=24+(r*17)%292,y2=64+((r*23)%28);
      s+='<circle class="pt reg" cx="'+x2+'" cy="'+y2+'" r="1.2"/>'}
    for(r=0;r<Math.min(held,40);r++){
      s+='<circle class="pt held" cx="'+(30+r*8)+'" cy="152" r="1.8"/>'}
    host.innerHTML=shelf+'<div class="lk">'+svg(W,H,s,'ink',
      'Three lakes — therapy, consciousness, learning. Every topic in the register is a light: built pages glow, '+
      'registered topics are fainter, held topics sit at the shoreline as pointers outward.')+'</div>'+
      '<div class="lkl"><span>'+built+' pages live</span><span style="opacity:.6">'+reg+
      ' routed in the register</span><span style="color:#E8C46A">'+held+
      ' held \u2014 pointers to people trained for them</span></div>'},
      /* the note on a warmer light for the topics Ashrey has lived with is cut until the register marks
         those topics (only true when true); it returns, with its second sentence, when the data carries it */
  words:function(){return 'Three lakes holding the whole field. Built pages glow, registered topics are '+
    'fainter, held topics sit at the shoreline as pointers outward.'},
  play:{does:'pick a lake; shuffle within it',plain:'tap'}
});

/* ── 8 · The Courses — two thirty-day walks ──────────────────── */
ASGfig.define('courses',{
  movement:'II', vertebrae:'B', marks:['line','point'],
  reads:[],
  css:'.cs{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin:6px 0 0}'+
      '.cs svg{width:100%;height:190px;color:var(--ac)}'+
      '.cs line,.cs path{stroke:currentColor;fill:none}'+
      '.cs figcaption{font-size:12.5px;color:rgba(245,239,230,.7);margin-top:6px}',
  mount:function(host,api){
    /* the anxiety walk: a descent where the ink brightens the further down you go */
    var a='';for(var i=0;i<30;i++){var o=(.18+i/30*.82).toFixed(2);
      a+='<line x1="'+(14+(i%2?6:0))+'" y1="'+(6+i*6)+'" x2="'+(52-(i%2?6:0))+'" y2="'+(6+i*6)+
        '" stroke-width="1.1" opacity="'+o+'"/>'}
    /* together: a ladder */
    var b='';for(var j=0;j<30;j++){b+='<line x1="16" y1="'+(6+j*6)+'" x2="50" y2="'+(6+j*6)+
      '" stroke-width="1" opacity="'+(.3+j/30*.6).toFixed(2)+'"/>'}
    b+='<line x1="16" y1="6" x2="16" y2="180" stroke-width="1.2" opacity=".6"/>'+
       '<line x1="50" y1="6" x2="50" y2="180" stroke-width="1.2" opacity=".6"/>';
    host.innerHTML='<div class="cs">'+
      '<figure style="margin:0">'+svg(66,190,a,'ink','Thirty days with anxiety — a descent where the ink brightens the further down you go')+
      '<figcaption>Thirty Days With Anxiety \u2014 a descent. The ink brightens as you go down.</figcaption></figure>'+
      '<figure style="margin:0">'+svg(66,190,b,'ink','Thirty days of connection — a ladder')+
      '<figcaption>Thirty Days of Connection \u2014 a ladder.</figcaption></figure></div>'+
      /* the first two sentences are the world's own paragraph, just above: said once, here only what it adds */
      '<p class="note">The anxiety walk keeps a plain pointer to people trained to help.</p>'},
  words:function(){return 'Two thirty-day walks: a descent whose ink brightens, and a ladder.'},
  play:{does:'open any day',plain:'tap'}
});

/* ── 9 · The Guidebook — forty-seven Tuesdays ────────────────── */
ASGfig.define('guidebook',{
  movement:'II', vertebrae:'R', marks:['line','point'],
  reads:['worlds.json guide_page (24 written, 23 to come)'],
  css:'.gb{display:flex;gap:10px;overflow-x:auto;scrollbar-width:none;padding:2px 0 10px}'+
      '.gb::-webkit-scrollbar{display:none}'+
      '.gb article{flex:0 0 74%;max-width:300px;border:1px solid rgba(245,239,230,.2);border-radius:3px;'+
      'padding:14px;background:linear-gradient(to bottom,rgba(245,239,230,.05),transparent)}'+
      '.gb h4{margin:0 0 6px;font-size:11px;letter-spacing:.2em;text-transform:uppercase;'+
      'color:var(--ac);font-weight:400}'+
      '.gb p{margin:0;font-family:Lora,Georgia,serif;font-size:15px;line-height:1.5;'+
      'color:rgba(245,239,230,.84)}',
  tuesdays:[['Bindu Feed','The morning the Feed has one story waiting, and you read it before you get out of bed.'],
    ['The Dances','Headphones, one word, and a verb you did not choose.'],
    ['The Tree of Life','Standing in front of the panel that says OPEN, with a phone in your hand.'],
    ['Bindu Being','The evening you tap a few things you did, and the spaces between them.'],
    ['The Walk','Three minutes before the day starts: blink, breathe, press.']],
  mount:function(host,api){
    /* Both numbers come from the same source the world's own label reads — the tally for
       what is written, the register for how many worlds there are to write for. Typed,
       they said "twenty-four … the other twenty-three" (a 47-world total) 105px from a
       label that said 16, on one screen. Prose inside mount() is still prose. */
    var WRIT=(window.ASG_TALLY||{}).guide||0,LEFT=(window.ASG.worlds||[]).length-WRIT;
    var sp=(window.ASG&&ASG.spell)||function(k){return String(k)};
    function cap(s){return s.charAt(0).toUpperCase()+s.slice(1)}
    host.innerHTML='<div class="gb">'+this.tuesdays.map(function(t){
      return '<article><h4>'+t[0]+'</h4><p>'+t[1]+'</p></article>'}).join('')+'</div>'+
      '<p class="note">Every guide page has the same heart: a Tuesday \u2014 an ordinary day with the thing '+
      'inside it. '+cap(sp(WRIT))+' are written; it grows to one per world as the other '+
      sp(LEFT)+' are.</p>'+
      '<div class="row"><a class="pill" href="/guide/">All the Tuesdays</a></div>'},
  words:function(){return 'A strip of Tuesdays \u2014 one ordinary day per world, with the thing inside it.'},
  play:{does:'swipe the strip',plain:'scroll'}
});

/* ── 10 · The Forms — how each thing is made ─────────────────── */
ASGfig.define('forms',{
  movement:'II', vertebrae:[26], marks:['point','line','arc','ring','triangle'],
  reads:[],
  css:'.fm{display:grid;grid-template-columns:repeat(auto-fill,minmax(88px,1fr));gap:8px;margin:6px 0 0}'+
      '.fm button{aspect-ratio:1;border:1px solid rgba(245,239,230,.2);border-radius:3px;position:relative;'+
      'display:grid;place-items:center;min-height:44px}'+
      '.fm button:hover,.fm button:focus-visible{border-color:var(--ac)}'+
      '.fm small{position:absolute;left:6px;bottom:5px;font-size:9.5px;letter-spacing:.08em;'+
      'text-transform:uppercase;color:rgba(245,239,230,.6)}'+
      '.fm svg{width:56%;height:56%;color:var(--ac);overflow:visible}'+
      '.fm .brc{animation:fmb 10s ease-in-out infinite;transform-origin:center}'+
      '@keyframes fmb{0%,100%{transform:scale(.62)}40%{transform:scale(1)}60%{transform:scale(1)}}'+
      '.fm .sun{animation:fms 12s linear infinite}'+
      '@keyframes fms{0%{transform:translate(-18px,8px)}100%{transform:translate(18px,8px)}}',
  /* twelve grammars, each with one mechanism of its own */
  tiles:[['practice','<circle class="brc" cx="20" cy="20" r="13" fill="none" stroke="currentColor"/>','four in, six out'],
    ['calendar','<path d="M2 30 Q20 4 38 30" fill="none" stroke="currentColor" opacity=".5"/><circle class="sun" cx="20" cy="14" r="3.4" fill="currentColor"/>','the sun crosses'],
    ['two chairs','<path d="M8 28 V12 h7 v16 M25 28 V12 h7 v16" fill="none" stroke="currentColor"/>','two seats, facing'],
    ['portrait','<line x1="3" y1="26" x2="37" y2="26" stroke="currentColor"/><circle cx="24" cy="26" r="3" fill="currentColor"/>','a point on a life'],
    ['recipe','<path d="M11 10 h18 v20 a4 4 0 0 1-4 4 h-10 a4 4 0 0 1-4-4z" fill="none" stroke="currentColor"/><path d="M11 24 h18" stroke="currentColor" opacity=".6"/>','the jar fills'],
    ['verse','<line x1="6" y1="14" x2="34" y2="14" stroke="currentColor"/><line x1="6" y1="22" x2="26" y2="22" stroke="currentColor" opacity=".5"/>','the line, then its gloss'],
    ['walk','<line x1="12" y1="4" x2="12" y2="36" stroke="currentColor"/><line x1="28" y1="4" x2="28" y2="36" stroke="currentColor"/>','a day at a time'],
    ['field guide','<line x1="4" y1="20" x2="36" y2="20" stroke="currentColor"/><circle cx="20" cy="20" r="2.6" fill="currentColor"/>','you are here'],
    ['icebreaker','<rect x="8" y="9" width="24" height="22" rx="2" fill="none" stroke="currentColor"/>','questions to hand over'],
    ['map','<circle cx="20" cy="20" r="14" fill="none" stroke="currentColor" opacity=".5"/><circle cx="20" cy="20" r="6" fill="none" stroke="currentColor"/>','rings toward a centre'],
    ['storybook','<path d="M20 8 v24 M20 8 C14 12 8 12 6 10 v20 c4 2 10 2 14 2" fill="none" stroke="currentColor"/>','a page, turned'],
    ['teaching','<polygon points="20,7 33,31 7,31" fill="none" stroke="currentColor"/>','one law, held']],
  mount:function(host,api){
    host.innerHTML='<div class="fm">'+this.tiles.map(function(t){
      return '<button type="button" data-n="'+t[0]+'" data-m="'+t[2]+'" aria-label="'+t[0]+' \u2014 '+t[2]+
        '">'+svg(40,40,t[1],'ink','')+'<small>'+t[0]+'</small></button>'}).join('')+'</div>'+
      '<p class="note">Twelve grammars, each with one mechanism of its own \u2014 a cabinet of small working '+
      'machines. Plus the guide, the door, and twenty-one family variants behind them.</p>';
    host.querySelectorAll('.fm button').forEach(function(b){b.addEventListener('click',function(){
      api.sheet('a form',b.dataset.n,'<p>'+b.dataset.m+'</p>'+
        '<p style="color:rgba(245,239,230,.66)">Paint a picture that draws you toward it, then let them walk '+
        'in, one step at a time.</p><ul><li><a href="/worlds/forms/">the cabinet \u2192</a></li></ul>')})})},
  words:function(){return 'A cabinet of twelve small working machines \u2014 one per form, each with its own '+
    'mechanism: the practice circle breathing, the sun crossing the calendar, two chairs facing.'},
  play:{does:'every tile works',plain:'tap'}
});
})();
