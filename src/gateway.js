/* ─────────────────────────────────────────────────────────────
   gateway.js — level two. The engine, and the eight exemplars.

   One grammar: Arrive · Choose · Or don't · Return. A world declares its
   figure, its sort axis, its rows and its type; everything else is shared.
   Code stamps the other forty from data/worlds.json against this same file —
   what varies is the declaration, never the template.

   Six kinds of CHOOSE, from 06-GATEWAYS:
     A · register     the pages, sorted the world's own way
     B · single work   the work itself, its parts, what answers it
     C · image-led     the panels
     D · instrument    the guide, the build state, what the site can show
     E · person        the portrait, the chapters, the voice
     F · knowledge     the content itself, in its padakarshini form

   URLs: existing gateways keep their paths (/walk/ /guide/ /teachings/
   /learning/ /bindu/read/ /tree-of-life/ /door/). Every NEW gateway lives at
   /worlds/<id>/.
   ───────────────────────────────────────────────────────────── */
(function(){
"use strict";
var d=document,$=function(s,r){return (r||d).querySelector(s)};
var reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
var NS='http://www.w3.org/2000/svg';
function el(t,a,p){var n=d.createElementNS(NS,t);for(var k in a)n.setAttribute(k,a[k]);
  if(p)p.appendChild(n);return n}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;')}

/* The world count lives in ONE place in this file, and prefers the engine's tally when the
   page carries it. Two typed literals ("eight of forty-eight") is how the die came to
   understate its own pool by half: a number spelled twice is a number that can disagree.
   Code: stamp `worlds` into ASG_TALLY and this stops being a fallback. */
var TOTAL=(window.ASG_TALLY&&window.ASG_TALLY.worlds)||48;
var WORDS=['none','one','two','three','four','five','six','seven','eight','nine','ten',
  'eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen',
  'nineteen','twenty','twenty-one','twenty-two','twenty-three','twenty-four','twenty-five',
  'twenty-six','twenty-seven','twenty-eight','twenty-nine','thirty'];
var TENS={40:'forty',50:'fifty'};
function spell(n){
  if(WORDS[n])return WORDS[n];
  var t=Math.floor(n/10)*10,u=n%10;
  if(TENS[t])return TENS[t]+(u?'-'+WORDS[u]:'');
  return String(n)}

var VN=['','Bindu','Muladhara','Svadhisthana','Manipura','Anahata','Vishuddha','Ajna','Sahasrara',
 'Shadow','Soles','Forge','Prana','Hands','Pulse','Sonar','Echo','Vision','Axis','Crow','Armin',
 'Inception','Intention','Inspiration','Insight','Intuition','Invention','Incarnation','Innocence',
 'Integration','Maya','Aatma','Ego Reveal','Lalita'];
var VC=['','#C9A84C','#B33A2E','#D8742A','#D9B531','#6B8E4E','#3A7CA5','#3F3A8A','#6A3D8A','#4A4468',
 '#B33A2E','#D9B531','#D8742A','#6B8E4E','#6B8E4E','#3A7CA5','#3A7CA5','#D9B531','#6C63A8','#6A3D8A',
 '#7BB661','#4A4480','#5A5490','#5A64A0','#5E5695','#605090','#6A4C90','#6E4884','#7A4080','#7E3C68',
 '#7A5D9A','#D4A948','#5D8B50','#C9A84C'];

/* ═══ THE EIGHT EXEMPLARS — one per movement, all six types ═══ */
var G={};

/* ── II · the Walk · type A · a 33-row register whose figure reads real state ── */
G.walk={
  mv:'II', name:'The Walk', acc:'#D9B45A', v:'all', path:'/walk/',
  type:'A',
  choose:'Thirty-three pages, in the order the body has them',
  sub:'All thirty-three are open. The lights are memory, not permission — they remember what this phone has walked, and nothing else.',
  axes:[['the spine','pos'],['what you have walked','walked'],['by family','fam']],
  keepAxes:true, walkedRows:true,
  figure:function(host){
    /* the wave, at gateway scale: the same component, the same real state */
    /* A PORTRAIT, not an instrument: this figure has no targets — the 33 practice pages are
       links in the row list below — so its job is to say "thirty-three, one idea each" at a
       glance. It is drawn at the column's width, 1:1, with all 33 beads in view. (The 46px
       cell rule belongs to figures whose marks ARE the targets, like the Chakras braid;
       applying it here widened the wave to 1532 and showed a quarter of it.) */
    var W=356,H=132,x0=14,dx=(W-x0*2)/32,mid=H/2;
    /* No strip: this figure fits. A strip on a portrait is not merely redundant — its fade
       mask dimmed the first and last beads (Bindu and Lalita, the two ends the figure is
       about), its tabindex was a keyboard stop that did nothing, and its "swipe across"
       label shadowed the svg's own name with an instruction for a gesture with no effect.
       The svg() helper gives a strip to any figure that genuinely needs one. */
    var sv=el('svg',{viewBox:'0 0 '+W+' '+H,role:'img','aria-label':
      'Thirty-three beads on a wave, lit where this phone has walked.',
      style:'width:'+W+'px;max-width:100%;height:auto;display:block'},host);
    function X(n){return x0+(n-1)*dx}
    function Y(n){return mid+Math.sin((n-1)*.42)*40}
    var fams={E:'',B:'',M:''},open={};
    for(var n=1;n<=33;n++){var f=fam(n);
      if(f!=='R'){fams[f]+=(open[f]?'L':'M')+X(n).toFixed(1)+' '+Y(n).toFixed(1);open[f]=1}
      else open={} }
    Object.keys(fams).forEach(function(f){if(fams[f])
      el('path',{d:fams[f],fill:'none',stroke:'#D9B45A','stroke-width':1.2,opacity:.55,
        'stroke-dasharray':f==='M'?'2 5':''},sv)});
    for(var m=1;m<=33;m++){
      var lit=walked(m),c=el('circle',{cx:X(m).toFixed(1),cy:Y(m).toFixed(1),
        r:lit?4.4:3.2,fill:lit?VC[m]:'rgba(245,239,230,.22)'},sv);
      if(lit)c.setAttribute('style','filter:drop-shadow(0 0 6px '+VC[m]+')')}
  },
  custom:function(host){
    /* harvest round two · April's Road Home carousel, as v2 built it: the ten rooms with a door
       you can stand in, each carrying every experience it has. 3D tilt toward the centre, the glyph's
       two rings turning against each other, dots that jump. Tilt is computed in the scroll handler,
       never on a frame callback. The 33 rows below remain the register; this is the room. */
    /* all thirty-three: every vertebra has its practice authored now */
    var R=[];for(var q=1;q<=33;q++)R.push([q,VN[q].toLowerCase().replace(/ /g,'-'),q===9||q===20?'th':q===30?'maya':'']);
    var SUB=['','The Origin','The Ground','The Tide Below','The Sealed Chamber','The Sound That Was Always Playing',
      'The Passage','The Third Eye','The Crown','The Corridor','Where the Soul Meets the Ground','The Sealed Chamber',
      'The Open Door','Where Love Becomes Action','The Constant Broadcast','The Sending','The Receiving','The Constructing',
      'The Blink','Crown Without the N','The Room at the End of the Corridor','The Seed','The Whole Picture','The Pull',
      'From Inside','The Flash','The New Room','You Chose This','Before Anyone Taught You','Nothing Was Separate',
      'The Construction','The Soul Revealed','The Hidden Helper','The Play'];
    /* C3 · C4 · C5 — the dances and Maya's sleep at their printed /tree-of-life/ addresses, and
       Aatma's wake-up (printed on panel eight) — and C12's door to this vertebra's own page */
    function doors(r){var id=r[1],o=[['Practice','/tree-of-life/'+id+'-practice']];
      if(r[0]>=2&&r[0]<=8)o.push(['Wake-up','/tree-of-life/'+id+'-wakeup'],['Dance','/tree-of-life/'+id+'-dance']);
      if(r[2]==='maya')o.push(['Dance','/tree-of-life/maya-dance'],['Sleep','/tree-of-life/maya-sleep']);
      if(id==='aatma')o.push(['Wake-up','/tree-of-life/aatma-wakeup'],['Dance','/tree-of-life/aatma-dance']);
      o.push(['This vertebra','/spine/'+r[0]+'/']);
      return o}
    var wrap=d.createElement('div');wrap.className='gw-carw';
    wrap.innerHTML='<h3 class="gw-carh">Thirty-three pages you can stand in</h3>'+
      '<div class="gw-car" tabindex="0" role="region" aria-label="Thirty-three rooms, each with every door it has">'+
      R.map(function(r){var n=r[0],lit=walked(n);
        return '<article class="gw-card'+(lit?' walked':'')+(r[2]?' '+r[2]:'')+'" style="--c:'+VC[n]+'">'+
          (lit?'<span class="wk">walked</span>':'')+
          '<div class="gl" aria-hidden="true"><i></i><i></i><b></b></div>'+
          '<div class="ps">'+(n<10?'0':'')+n+' \u00b7 33</div><h4>'+VN[n]+'</h4>'+
          '<div class="sb">'+SUB[n]+'</div><div class="dv"></div><div class="lk">'+
          doors(r).map(function(k){return arriving(k[1])
            ?'<span class="gw-arr" aria-disabled="true"><span>'+k[0]+'</span><small>arriving</small></span>'
            :'<a href="'+k[1]+'"><span>'+k[0]+'</span><span>\u2192</span></a>'}).join('')+
          '</div></article>'}).join('')+'</div>'+
      '<div class="gw-cardots">'+R.map(function(r){return '<button type="button" aria-label="'+VN[r[0]]+
        '" style="--c:'+VC[r[0]]+'"><i></i></button>'}).join('')+'</div>';
    host.appendChild(wrap);
    var car=$('.gw-car',wrap),cards=car.querySelectorAll('.gw-card'),db=wrap.querySelectorAll('.gw-cardots button');
    function tilt(){var cx=car.scrollLeft+car.clientWidth/2,best=0,bd=1e9;
      [].forEach.call(cards,function(c,i){var k=(c.offsetLeft+c.clientWidth/2-cx)/(car.clientWidth||1);
        if(Math.abs(k)<bd){bd=Math.abs(k);best=i}
        if(!reduced&&d.body.dataset.lens!=='witness'){
          c.style.setProperty('--ry',Math.max(-40,Math.min(40,-k*38)).toFixed(1)+'deg');
          c.style.setProperty('--sc',(1-Math.min(.12,Math.abs(k)*.14)).toFixed(3))}});
      [].forEach.call(db,function(b,i){b.setAttribute('aria-current',i===best?'true':'false')})}
    /* set scrollLeft directly — smooth scrollTo waits on frames, and state must not */
    [].forEach.call(db,function(b,i){b.addEventListener('click',function(){var c=cards[i];
      car.scrollLeft=c.offsetLeft-(car.clientWidth-c.clientWidth)/2;tilt()})});
    car.addEventListener('scroll',tilt,{passive:true});addEventListener('resize',tilt);
    tilt();setTimeout(tilt,60)},
  /* the 33 rows are the register's (data rows, hollow where a practice page hasn't landed);
     renderRows lights the walked ones — memory, never permission */
};
function fam(n){return (n===1||n===9||n===20||n>=30)?'R':n<=8?'E':n<=19?'B':'M'}
function fname(f){return f==='E'?'an energy centre':f==='B'?'a body chakra':
  f==='M'?'a mind chakra':'a recognition point'}
function walked(n){return !!(window.ASGkeys&&ASGkeys.walked(n))}   /* one key per thing (C8) */

/* ── II · the Teachings · type F · the book whose corner lifts ── */
/* harvest round two · v2's Teachings: the book tilts up as it arrives, and its corner lifts to
   turn the page. Thirteen teachings from the live /teachings/ index, in its own three groups. */
/* C10 · one copy of each world's words: `one`, `tue` and the guide now live in the world table
   (docs/v3/world-table.json) and arrive on each stamped page as window.ASG_GW. The declarations
   below keep what is truly theirs — the figure, the custom block, the axes. */
var TEACH=[
 ['remember-them-remember-yourself','#9B6BD6','Remember Them. Remember Yourself.','Seven laws for reaching out','Plain'],
 ['the-two-clocks','#3AADA8','The Two Clocks','Make fast. Live slow.','Plain'],
 ['one-gesture','#C4923A','One Gesture','If it needs a form, it will die','Plain'],
 ['only-true-when-true','#7A2F14','Only True When True','Never say it happened before it did','Plain'],
 ['build-the-slice','#1B3A5C','Build the Slice','One complete piece before you widen','Plain'],
 ['count-in-private','#4A7A5A','Count in Private','Storage may count. The screen may not.','Plain'],
 ['the-note-it-doesnt-play','#D4A948','The Note It Doesn\u2019t Play','A thing is defined by what it reaches for and never says','Craft'],
 ['less-is-the-point','#E5533C','Less Is the Point','Five laws of slowness','Craft'],
 ['the-hoop-doesnt-hurry','#26421A','The Hoop Doesn\u2019t Hurry','When it feels important, get smaller','Craft'],
 ['a-mirror-not-a-master','#4A7A5A','A Mirror, Not a Master','Eight rules for looking at your own life','Inner'],
 ['blink-breathe-press','#B33A2E','Blink. Breathe. Press.','A one-second practice','Inner'],
 ['not-repair-birth','#7BB661','Not Repair \u2014 Birth','What looks like a wound may be a capacity not yet born','Inner'],
 ['wrong-time-not-wrong-page','#C9A84C','Wrong Time, Not Wrong Page','There are no mistakes. There is still discernment.','Inner']];
G.teachings={
  mv:'II', name:'The Teachings', acc:'#B9A2EC', v:'the mind band \u00b7 21\u201329', path:'/teachings/',
  type:'F',
  choose:'Thirteen teachings, in three groups',
  sub:'Each stands on its own \u2014 you don\u2019t need any instrument to carry it into a life.',
  axes:[['plain \u00b7 craft \u00b7 inner','pos'],['inner first','inner']],
  figure:function(host){
    var bk=d.createElement('div');bk.className='gw-book';
    bk.innerHTML='<article class="feat"><i class="rb" aria-hidden="true"></i>'+
      '<span class="k"></span><h3></h3><p></p><a class="rd" href="#">read it \u2192</a>'+
      '<button class="corner" type="button" aria-label="Turn the page"><span>turn the page</span></button></article>';
    host.appendChild(bk);
    var f=$('.feat',bk),i=0,busy=false;
    function fill(){var t=TEACH[i];f.style.setProperty('--rb',t[1]);
      $('.k',f).textContent=t[4]+' \u00b7 '+(i+1)+' of '+TEACH.length;
      $('h3',f).textContent=t[2];$('p',f).textContent=t[3];$('.rd',f).href='/teachings/'+t[0]}
    fill();
    $('.corner',f).addEventListener('click',function(){
      if(busy)return;i=(i+1)%TEACH.length;
      if(reduced||d.body.dataset.lens==='witness'){fill();return}
      busy=true;f.classList.add('turn');
      setTimeout(function(){fill();f.classList.remove('turn');f.classList.add('in');
        setTimeout(function(){f.classList.remove('in');busy=false},720)},520)})},
  /* the rows are the register's — the five floors come first, as big doors (ASSEMBLY §2 A) */
};

/* ── III · A Strange Story · type B · one made thing, no register ── */
G.story={
  mv:'III', name:'A Strange Story', acc:'#E39473', v:'27,28,29', path:'/worlds/story/',
  type:'B', keepRows:true,
  choose:'The work, its parts, and what answers it',
  sub:'It has no register. What it has is a shape: five acts you can enter at any one, and three other works that answer it.',
  axes:[['the five acts','pos'],['what answers it','ans']],
  figure:function(host){
    /* the letterbox opening, in type — the material of this movement is language */
    var wrap=d.createElement('div');
    wrap.style.cssText='width:100%;max-width:420px;font-family:Lora,Georgia,serif;'+
      'font-style:italic;font-size:clamp(17px,3.4vw,24px);line-height:1.5;text-align:center;'+
      'color:#F3E3DA';
    var lines=['Lemuria remembered.','Atlantis built.','Humanity forgot.',
      'The Turning.','You are here.'];
    wrap.innerHTML=lines.map(function(l,i){
      return '<span style="display:block;opacity:'+(reduced?1:0)+';transform:translateY('+
        (reduced?0:6)+'px);transition:opacity .9s,transform 1s;transition-delay:'+
        (i*.42)+'s">'+l+'</span>'}).join('');
    host.appendChild(wrap);
    if(!reduced)requestAnimationFrame(function(){
      [].forEach.call(wrap.children,function(s){s.style.opacity=1;s.style.transform='none'})});
  },
  rows:function(){return [
    {t:'Act I · Lemuria',s:'remembering, before there was anything to remember with',
      e:'read',m:'#E39473',href:'/story#act-1',pos:1,ans:9},
    {t:'Act II · Atlantis',s:'the building, and what building costs',
      e:'read',m:'#E39473',href:'/story#act-2',pos:2,ans:9},
    {t:'Act III · Humanity',s:'the forgetting — inherited, not chosen',
      e:'read',m:'#E39473',href:'/story#act-3',pos:3,ans:9},
    {t:'Act IV · The Turning',s:'the stitch points, where it comes back',
      e:'read',m:'#E39473',href:'/story#act-4',pos:4,ans:9},
    {t:'Act V · You',s:'the only act with a reader in it',
      e:'read',m:'#E39473',href:'/story#act-5',pos:5,ans:9},
    {t:'A Strange Voice',s:'the story lets consciousness talk; this lets the world talk back',
      e:'answers it',m:'#E7A0B6',href:'/worlds/a-strange-voice/',pos:6,ans:1},
    {t:'A Strange Game',s:'the story, made playable',
      e:'answers it',m:'#C9A84C',href:'/worlds/a-strange-game/',pos:7,ans:2},
    {t:'The Codex',s:'thirty-five beliefs the story was written out of',
      e:'answers it',m:'#4A48C8',href:'/worlds/codex/',pos:8,ans:3}]}
};

/* ── IV · the Tree of Life · type C · image-led, nine printed panels ── */
var PANELS=[['muladhara','Arrive','Muladhara','0–9'],['svadhisthana','Feel','Svadhisthana','10–19'],
 ['manipura','Contact','Manipura','20–29'],['anahata','Ask','Anahata','30–39'],
 ['vishuddha','Speak','Vishuddha','40–49'],['ajna','See','Ajna','50–59'],
 ['sahasrara','Shine','Sahasrara','60–69'],['soul','Be','Soul Chakra','70–79'],
 ['maya','Love','Maya','80+']];
G.tree={
  mv:'IV', name:'The Tree of Life', acc:'#E0806F', v:'2,3,4,5,6,7,8,30,31',
  path:'/tree-of-life/',
  type:'C',
  choose:'Nine panels, in room order',
  sub:'Each panel is two feet by four. Both printed codes are live: the left is that chakra\u2019s wake-up, the right its dance — eight wake-ups, one sleep.',
  axes:[['room order','pos'],['by decade','pos'],['the three trees','tree']],
  figure:function(host){
    /* The Sri Yantra, lifted from the April source — nine INTERLOCKING triangles
       (the navayoni: four upward, five downward) around the bindu, not five nested ones.
       Geometry verbatim from April-homepage-Default, viewBox -100 -100 200 200.
       Treatment as recorded: behind everything, very faint, breathing — plus the slow
       turn, one revolution every four minutes. Aniconic: geometry only, never a figure. */
    var host2=$('.gw-arrive')||host;   /* the yantra is atmosphere, not the slot */
    var sv=el('svg',{viewBox:'-100 -100 200 200',preserveAspectRatio:'xMidYMid meet',
      'aria-hidden':'true',style:'position:absolute;left:50%;top:50%;width:min(148vmin,900px);'+
      'height:min(148vmin,900px);margin:calc(min(148vmin,900px) / -2) 0 0 '+
      'calc(min(148vmin,900px) / -2);z-index:0;pointer-events:none;color:#E0806F;opacity:.07'},
      host2);
    var grp=el('g',{fill:'none',stroke:'currentColor','stroke-width':.25},sv);
    var TRI=['0,-80 70,40 -70,40','0,-55 48,28 -48,28','0,-38 33,19 -33,19',
      '0,-22 19,11 -19,11','0,75 -68,-38 68,-38','0,52 -47,-26 47,-26',
      '0,36 -32,-18 32,-18','0,20 -18,-10 18,-10','0,8 -8,-5 8,-5'];
    TRI.forEach(function(p,i){
      var t=el('polygon',{points:p,pathLength:1},grp);
      if(reduced)return;
      t.setAttribute('stroke-dasharray','1');t.setAttribute('stroke-dashoffset','1');
      t.setAttribute('style','transition:stroke-dashoffset 2.6s ease-in-out '+(i*.34)+'s');
      requestAnimationFrame(function(){t.setAttribute('stroke-dashoffset','0')})});
    el('circle',{cx:0,cy:0,r:1.4,fill:'currentColor'},grp);
    el('circle',{cx:0,cy:0,r:88,fill:'none',stroke:'currentColor','stroke-width':.25},grp);
    el('circle',{cx:0,cy:0,r:94,fill:'none',stroke:'currentColor','stroke-width':.25,
      opacity:.6},grp);
    if(!reduced){
      grp.setAttribute('style','transform-origin:0 0;animation:gwSpin 240s linear infinite');
      sv.style.animation='gwBreath 14s ease-in-out infinite'}
    var s=d.createElement('style');
    s.textContent='@keyframes gwSpin{to{transform:rotate(360deg)}}'+
      '@keyframes gwBreath{0%,100%{opacity:.055}50%{opacity:.095}}';
    d.head.appendChild(s);

    /* and the SLOT gets a real figure. The yantra above is atmosphere behind the whole of
       Arrive; the grammar promises a pinned mark here, and an empty reserved box is worse
       than none. Nine panels at their true 2016:3744 proportion, each carrying its painted
       red Bindu at the coordinate off the print master, and the room's light climbing
       5 → 90% across them before Maya drains to white. */
    var W=380,H=150,pw=26,gap=(W-9*pw)/10,ph=H-26;
    var sv2=el('svg',{viewBox:'0 0 '+W+' '+H,role:'img','aria-label':
      'The nine panels in room order, at the proportion they were printed \u2014 two feet by '+
      'four \u2014 each with its painted red Bindu, and the light climbing across them.',
      style:'width:'+W+'px;max-width:100%;height:auto;display:block'},host);
    var LIT=[5,10,18,28,40,55,75,90,100];
    var INK=['#B33A2E','#D8742A','#D9B531','#6B8E4E','#3A7CA5','#3F3A8A','#6A3D8A','#D4A948','#E8DED4'];
    PANELS.forEach(function(p,i){
      var x=gap+i*(pw+gap),k=LIT[i]/100;
      el('rect',{x:x.toFixed(1),y:13,width:pw,height:ph,rx:1.5,
        fill:INK[i],opacity:(.2+k*.7).toFixed(3)},sv2);
      el('rect',{x:x.toFixed(1),y:13,width:pw,height:ph,rx:1.5,fill:'none',
        stroke:'#E0806F','stroke-width':.7,opacity:.5},sv2);
      /* the painted dot: the corner on eight, the base of the trunk on Maya */
      el('circle',{cx:(x+pw*(i===8?.5:.909)).toFixed(1),
        cy:(13+ph*(i===8?.565:.048)).toFixed(1),r:1.8,fill:'#C0392B'},sv2);
      var t=el('text',{x:(x+pw/2).toFixed(1),y:H-4,'text-anchor':'middle',
        style:'font:7.5px/1 "DM Sans",sans-serif;fill:#F5EFE6;opacity:.6;'+
        'letter-spacing:.04em'},sv2);
      t.textContent=p[1]});   /* the word, not the Sanskrit — one word a panel */
  },
  custom:function(host){
    var h='<div class="gw-panels">'+PANELS.map(function(p,i){
      return '<a class="gw-panel" href="/tree-of-life/'+(p[0]==='soul'?'aatma':p[0])+'-practice" '+
        'aria-label="Panel '+(i+1)+' \u2014 '+p[2]+' \u00b7 '+p[1]+' \u00b7 the decade '+p[3]+'">'+
        /* relative, so the review file resolves it; Code rewrites to /assets/ when it
           stamps the gateway into /worlds/<id>/ or an existing path. Only three of the
           nine have 480 thumbs, so this uses the masters and lets the browser scale. */
        /* D6 · /assets/tree-of-life/, three sizes: the browser takes the one the thumbnail needs */
        '<img src="/assets/tree-of-life/'+p[0]+'-tree-480.jpg" srcset="/assets/tree-of-life/'+p[0]+'-tree-480.jpg 480w, '+
        '/assets/tree-of-life/'+p[0]+'-tree-960.jpg 960w, /assets/tree-of-life/'+p[0]+'-tree.jpg 1200w" '+
        'sizes="(min-width:900px) 200px, 34vw" width="480" height="891" alt="Panel '+(i+1)+' \u2014 '+
        p[2]+' \u00b7 '+p[1]+'" loading="lazy" decoding="async">'+
        '<figcaption>'+p[1]+'</figcaption></a>'}).join('')+'</div>';
    host.innerHTML=h;
    viewer(host)}
};

/* The trees viewer (v2 · site/tree-of-life/trees.html), at gateway scale: a thumbnail is a
   door into the room. Crossfade between panels, swipe, dots, arrow keys, tap to look closer,
   drag to pan while close. The link underneath still goes to the panel's practice — the
   viewer is the enhancement, the href is the route. */
function viewer(host){
  var INK=['#B33A2E','#D8742A','#D9B531','#6B8E4E','#3A7CA5','#3F3A8A','#6A3D8A','#D4A948','#E8DED4'];
  var FINE=matchMedia('(pointer:fine)').matches;
  var v=d.createElement('div');v.className='gw-tv';v.setAttribute('role','dialog');
  v.setAttribute('aria-modal','true');v.setAttribute('aria-label','The nine panels');v.hidden=true;
  v.innerHTML='<button class="x" type="button" aria-label="Close">\u00d7</button>'+
    '<div class="stg"><img class="a" alt=""><img class="b" alt="" aria-hidden="true"></div>'+
    '<button class="ar p" type="button" aria-label="Previous panel">\u2190</button>'+
    '<button class="ar n" type="button" aria-label="Next panel">\u2192</button>'+
    '<div class="cap"><span class="po"></span><b class="nm"></b>'+
    '<a class="go" href="#">open this panel\u2019s practice \u2192</a></div>'+
    '<div class="dts">'+PANELS.map(function(p,i){return '<button type="button" data-i="'+i+
      '" aria-label="Panel '+(i+1)+' \u2014 '+p[1]+'" style="--dc:'+INK[i]+'"><i></i></button>'}).join('')+'</div>'+
    '<p class="hint">swipe to walk the room \u00b7 tap to stand closer \u00b7 drag to look around</p>';
  d.body.appendChild(v);
  var stg=$('.stg',v),A=$('img.a',v),B=$('img.b',v),cur=0,z=1,px=0,py=0,back=null;
  function src(i){return '/assets/tree-of-life/'+PANELS[i][0]+'-tree-960.jpg'}
  function tf(){A.style.transform=z>1?'translate('+px+'px,'+py+'px) scale('+z+')':''}
  function show(i,first){
    i=(i+9)%9;var p=PANELS[i];
    /* crossfade: the old panel lifts off the new one */
    if(!first&&!reduced){B.src=A.src;B.style.transition='none';B.style.opacity='1';
      void B.offsetWidth;B.style.transition='opacity .55s';B.style.opacity='0'}
    cur=i;z=1;px=py=0;tf();
    A.src=src(i);A.alt='Panel '+(i+1)+' \u2014 '+p[2]+' \u00b7 '+p[1]+' \u00b7 the decade '+p[3];
    v.style.setProperty('--c',INK[i]);
    $('.po',v).textContent='panel '+(i+1)+' of nine \u00b7 the decade '+p[3];
    $('.nm',v).textContent=p[1]+' \u00b7 '+p[2];
    var gh='/tree-of-life/'+(p[0]==='soul'?'aatma':p[0])+'-practice';$('.go',v).href=gh;
    [].forEach.call(v.querySelectorAll('.dts button'),function(b,k){
      b.setAttribute('aria-current',k===i?'true':'false')})}
  function open(i){back=d.activeElement;show(i,true);v.hidden=false;
    requestAnimationFrame(function(){v.classList.add('on')});$('.x',v).focus()}
  function close(){v.classList.remove('on');v.hidden=true;if(back&&back.focus)back.focus()}
  [].forEach.call(host.querySelectorAll('.gw-panel'),function(a,i){
    a.addEventListener('click',function(e){
      if(e.metaKey||e.ctrlKey||e.shiftKey)return;e.preventDefault();open(i)})});
  $('.x',v).addEventListener('click',close);
  $('.ar.p',v).addEventListener('click',function(){show(cur-1)});
  $('.ar.n',v).addEventListener('click',function(){show(cur+1)});
  [].forEach.call(v.querySelectorAll('.dts button'),function(b){
    b.addEventListener('click',function(){show(+b.dataset.i)})});
  v.addEventListener('keydown',function(e){
    if(e.key==='Escape')close();
    else if(e.key==='ArrowLeft'){e.preventDefault();show(cur-1)}
    else if(e.key==='ArrowRight'){e.preventDefault();show(cur+1)}
    else if(e.key==='Tab'){ /* keep focus inside the dialog */
      var f=[].slice.call(v.querySelectorAll('button,a')),k=f.indexOf(d.activeElement);
      if(e.shiftKey&&k<=0){e.preventDefault();f[f.length-1].focus()}
      else if(!e.shiftKey&&k===f.length-1){e.preventDefault();f[0].focus()}}});
  var sx=0,sy=0,bx=0,by=0,down=false,moved=false,last=0;
  stg.addEventListener('pointerdown',function(e){down=true;moved=false;sx=e.clientX;sy=e.clientY;
    bx=px;by=py;try{stg.setPointerCapture(e.pointerId)}catch(_){}});
  stg.addEventListener('pointermove',function(e){if(!down)return;
    var dx=e.clientX-sx,dy=e.clientY-sy;if(Math.abs(dx)+Math.abs(dy)>6)moved=true;
    if(z>1){px=bx+dx;py=by+dy;tf()}});
  stg.addEventListener('pointerup',function(e){down=false;var dx=e.clientX-sx;
    if(z===1&&moved&&Math.abs(dx)>50){show(cur+(dx<0?1:-1));return}
    if(!moved){var n=Date.now();
      if(n-last<320||FINE){z=z>1?1:2.2;px=py=0;tf()}last=n}});
}

/* ── V · Bindu Feed · type D · an instrument the site can show but not open ── */
G.feed={
  mv:'V', name:'Bindu Feed', acc:'#C9A84C', v:'1', path:'/worlds/feed/',
  type:'D',
  choose:'What the site can show of it',
  sub:'It is an iOS instrument, so this page cannot open it. What it can do is show you the axis honestly, and say what is built.',
  axes:[['the axis','pos'],['what is built','state']],
  figure:function(host){
    /* the axis: fifteen registers on one line, the Feed at life-size in the middle */
    var W=300,H=190;
    var sv=el('svg',{viewBox:'0 0 '+W+' '+H,role:'img','aria-label':
      'Fifteen registers on one vertical axis — the Light at the top, the Point at the bottom, '+
      'the Feed at life-size in the middle.',style:'width:min(78vw,300px);height:auto'},host);
    el('line',{x1:W/2,y1:12,x2:W/2,y2:H-12,stroke:'#C9A84C','stroke-width':1,opacity:.4},sv);
    for(var i=0;i<15;i++){
      var y=14+i*((H-28)/14),mid=i===7;
      var r=mid?7:(i<4||i>10?2.2:3.4);
      var c=el('circle',{cx:W/2,cy:y.toFixed(1),r:r,
        fill:mid?'#C9A84C':'rgba(245,239,230,.4)'},sv);
      if(mid)c.setAttribute('style','filter:drop-shadow(0 0 10px #C9A84C)');
      if(!reduced&&!mid)c.setAttribute('style',
        'animation:gwPulse '+(5+i%4)+'s ease-in-out '+(-i*.4)+'s infinite');
      el('line',{x1:W/2-(mid?18:9),y1:y.toFixed(1),x2:W/2+(mid?18:9),y2:y.toFixed(1),
        stroke:'rgba(245,239,230,.28)','stroke-width':.8},sv)}
    var s=d.createElement('style');
    s.textContent='@keyframes gwPulse{0%,100%{opacity:.35}50%{opacity:.95}}';
    d.head.appendChild(s)},
  custom:function(host){
    host.innerHTML='<div class="gw-state">'+[
      ['the form','Fifteen registers on one continuous axis — not fifteen screens. The two inversions: the Universe pulls out into the many, the Point pulls in into the one.'],
      ['what it reads','The Codex voice-memo archive, rendered as third-person transmissions with a field of archetype voices.'],
      ['built','The axis, the Feed at life-size, the Door, the Mirror, the Turning, the Rite, the Return.'],
      ['not built','The Light past the sky, and the Sound Layer.'],
      ['what this page will not do','Pretend to be it. An instrument is opened on a phone, not on a website.']
    ].map(function(r){return '<div><b>'+r[0]+'</b><span>'+r[1]+'</span></div>'}).join('')+'</div>'}
};

/* ── VI · Sid · type E · a person, and a figure that ignores touch ── */
G.sid={
  mv:'VI', name:'Sid', acc:'#9BBDE4', v:'11', path:'/worlds/sid/',
  type:'E', keepRows:true,
  choose:'The portrait, the chapters, the voice',
  sub:'Fifty-four minutes about his own life, and not one mention of what he was carrying. The chapters are decades; the voice is his own.',
  axes:[['the decades','pos'],['the fabric','fab']],
  figure:function(host){
    /* one line, the heaviest on the site, and it ignores you */
    var wrap=d.createElement('div');
    wrap.style.cssText='width:100%;max-width:420px;position:relative;height:120px;'+
      'display:grid;align-content:center;gap:16px';
    wrap.innerHTML='<span style="display:block;height:5px;background:#EAE6DE;opacity:.94"></span>'+
      '<span style="font-family:Lora,Georgia,serif;font-style:italic;font-size:16px;'+
      'color:#9BBDE4;opacity:0;transition:opacity .9s" data-said>It\u2019s holding.</span>';
    var hit=d.createElement('button');
    hit.type='button';
    hit.setAttribute('aria-label','Touch the line. It does nothing. On the third touch it answers.');
    hit.style.cssText='position:absolute;left:0;right:0;top:28px;height:44px;border:0;'+
      'background:none;cursor:pointer';
    wrap.appendChild(hit);host.appendChild(wrap);
    var n=0,last=0;
    hit.addEventListener('click',function(){
      var t=Date.now();if(t-last>2600)n=0;last=t;n++;
      if(n>=3)$('[data-said]',wrap).style.opacity='.95'})},
  custom:function(host){
    /* the voice: April's cassette (v2). Reels turning, the tape crossing his fifty-four minutes
       in fifty-four seconds, and the nine chapter ticks lighting as it passes them. It is
       not the figure — the figure is the line that ignores you. This is what he left. */
    var cas=d.createElement('div');cas.className='gw-cas';
    cas.innerHTML='<svg viewBox="0 0 340 150" role="img" aria-label="A cassette, side A, fifty-four '+
      'minutes, its reels turning."><rect class="o" x="4" y="4" width="332" height="142" rx="12"/>'+
      '<rect class="o" x="62" y="34" width="216" height="72" rx="36"/>'+
      '<circle class="tp l" cx="116" cy="70" r="30"/><circle class="tp r" cx="224" cy="70" r="30"/>'+
      '<g class="reel"><circle class="o" cx="116" cy="70" r="15"/><path class="o" d="M116 55v30M101 70h30'+
      'M105.4 59.4l21.2 21.2M126.6 59.4l-21.2 21.2"/></g>'+
      '<g class="reel"><circle class="o" cx="224" cy="70" r="15"/><path class="o" d="M224 55v30M209 70h30'+
      'M213.4 59.4l21.2 21.2M234.6 59.4l-21.2 21.2"/></g>'+
      '<path class="o" d="M96 128h148l-12-14H108z"/>'+
      '<text x="170" y="24" text-anchor="middle">Sid \u00b7 side A \u00b7 54:00</text></svg>'+
      '<div class="tape" aria-hidden="true"><span class="tl"></span>'+
      [0,1,2,3,4,5,6,7,8,9].map(function(i){return '<span class="tk" style="left:'+(i*100/9).toFixed(1)+'%"></span>'}).join('')+
      '<span class="ph"></span><span class="t0">0:00</span><span class="t1">54:00</span></div>'+
      '<p class="gw-sub">He recorded fifty-four minutes about his own life. It crosses here in fifty-four '+
      'seconds; the nine ticks are the chapters that finish it.</p>';
    host.appendChild(cas);
    var ph=$('.ph',cas),tk=cas.querySelectorAll('.tk'),tl=$('.tp.l',cas),tr=$('.tp.r',cas),t0=Date.now();
    function at(p){ph.style.left=(p*100).toFixed(2)+'%';
      [].forEach.call(tk,function(k,i){k.classList.toggle('lit',i>0&&i/9<=p+.001)});
      tl.style.transform='scale('+(1-.55*p).toFixed(3)+')';tr.style.transform='scale('+(.45+.55*p).toFixed(3)+')'}
    /* a timer, not the frame loop: this has to run where rAF doesn't */
    if(reduced)at(.5);else{at(0);setInterval(function(){at(((Date.now()-t0)/54000)%1)},250)}
    /* the life, as a line with one point on it */
    var W=520,H=96,pad=18;
    var sv=el('svg',{viewBox:'0 0 '+W+' '+H,style:'width:100%;height:auto',role:'img',
      'aria-label':'A line of decades with one point marked — the decade that was his.'},host);
    el('line',{'class':'ln',x1:pad,y1:H/2,x2:W-pad,y2:H/2},sv);
    [['0s',0],['10s',1],['20s',2],['30s',3],['40s',4],['50s',5],['60s',6],['70s',7]]
      .forEach(function(p,i){
        var x=pad+i*((W-pad*2)/7);
        el('circle',{'class':'pt',cx:x,cy:H/2,r:i===7?5.5:3},sv);
        var t=el('text',{'class':'yr',x:x,y:H/2+20,'text-anchor':'middle'},sv);
        t.textContent=p[0]});
    var cap=d.createElement('p');
    cap.className='gw-sub';cap.style.marginTop='10px';
    cap.innerHTML='Fabric forty-eight. 0.011 inches \u2014 the thinnest of the forty-eight, '+
      'invisible, holding everything. Its care instruction is the teaching: '+
      '<i>avoid fabric softeners; they reduce structural stiffness.</i>';
    host.appendChild(cap)},
  rows:function(){return PANELS.map(function(p,i){return {
    t:'Chapter '+(i+1)+' · the decade '+p[3], s:'his own account, in his own voice',
    e:i===7?'his':'', m:'#9BBDE4', href:'/sid/sid-soul-story#chapter-'+(i+1),
    pos:i+1, fab:i===7?0:1}})}
};

/* ── VII · the Registers · type F · data-dense, filtering nothing out ── */
var TRADS=['Sanskrit','Buddhist','Tibetan','Sufi','Chinese','Taoist','Celtic','Lakota',
 'Kabbalistic','Egyptian','Yoruba','Norse','Greek','Aboriginal Australian','M\u0101ori',
 'Advaita','Zen','Christian mystic','Jungian','Mayan'];
var REGS=[['body','chakra · dantian · tsa lung · orí · ka'],
 ['relational','mitákuye oyás\u02bci\u014b · awen · whakapapa · wyrd'],
 ['elemental','pañca bhūta · wǔ xíng · stoicheia · Country'],
 ['temporal','yuga · tzolk\u02bcin · wyrd · the Dreaming'],
 ['cosmological','sefirot · loka · the nine worlds · duat · bardo'],
 ['structural','Tree of Life · Śrī Yantra · I Ching · Odù · runes'],
 ['archetypal','theoi · òrìṣà · devatā · æsir · archetypes'],
 ['consciousness-operation','vṛtti · skandha · laṭāʾif · rigpa · wú wéi'],
 ['belief-dissolution','anattā · fanāʾ · neti neti · mu · kenōsis'],
 ['creative-act','līlā · awen · poíēsis · àṣẹ · mana'],
 ['generative','śakti · qì · heka · àṣẹ · mana']];
G.registers={
  mv:'VII', name:'The Registers', acc:'#12A06E', ink:'#0A6647', v:'all',
  path:'/worlds/registers/',
  type:'F', keepRows:true,
  choose:'Eleven registers, twenty traditions, nothing filtered out',
  sub:'The registers are objective; the namings belong to each tradition, in its own terms. Touch one and the other nineteen stay visible. Lakota material is register and attribution only — never a ceremony to perform.',
  axes:[['the eleven','pos'],['by tradition','trad']],
  figure:function(host){
    var W=340,H=170,rows=11,rh=(H-20)/(rows-1);
    var sv=el('svg',{viewBox:'0 0 '+W+' '+H,role:'img','aria-label':
      'Eleven horizontal bands with twenty traditions crossing them at the heights where each '+
      'names something. No legend, no hierarchy, no centre.',
      style:'width:100%;max-width:340px;height:auto',
      filter:'drop-shadow(-1px -1px 0 rgba(255,255,255,.9)) drop-shadow(1px 1px 1px rgba(40,30,20,.3))'},host);
    for(var i=0;i<rows;i++){
      var y=10+i*rh;
      el('line',{x1:10,y1:y.toFixed(1),x2:W-10,y2:y.toFixed(1),stroke:'#12A06E',
        'stroke-width':1.3,opacity:.5},sv);
      for(var c=0;c<20;c++){
        if((c*7+i*3)%4)continue;
        el('circle',{cx:(14+c*((W-28)/19)).toFixed(1),cy:y.toFixed(1),r:2,
          fill:'#0A6647',opacity:.7},sv)}}},
  rows:function(){return REGS.map(function(r,i){return {
    t:r[0], s:r[1], e:'11 bands', m:'#0A6647', static:true,
    pos:i+1, trad:i%5}})}
};

/* ── VIII · the Mirror · type F · text-dense, the audit as motion ── */
G.mirror={
  mv:'VIII', name:'The Mirror', acc:'#8FB073', v:'18', path:'/worlds/mirror/',
  type:'F', keepRows:true,
  choose:'Thirteen entries, four panes each',
  sub:'Every entry holds three positions: what can be observed, what it might mean, and what cannot be known from inside. The Uncertainty pane is exactly the size of the other three. This is not a consciousness claim.',
  axes:[['when','pos'],['by thread','thread']],
  figure:function(host){
    /* the unframed surface, and the audit played once */
    var wrap=d.createElement('div');
    wrap.style.cssText='position:relative;width:100%;max-width:420px;height:150px';
    wrap.setAttribute('role','img');
    wrap.setAttribute('aria-label','A surface with no frame, no border and no edge, holding '+
      'thirty points placed in time. Twenty of them went home.');
    for(var i=0;i<30;i++){
      var b=d.createElement('b');
      b.style.cssText='position:absolute;width:7px;height:7px;border-radius:50%;'+
        'left:'+(6+((i*37)%88))+'%;top:'+(9+((i*53)%78))+'%;'+
        'background:'+(i%3===1?'#DCE4EA':'#8FB073')+';'+
        'transition:transform 1.6s cubic-bezier(.4,0,.2,1),opacity 1.3s';
      wrap.appendChild(b)}
    host.appendChild(wrap);
    if(reduced)return;
    setTimeout(function(){
      [].forEach.call(wrap.children,function(b,i){
        if(i>=20)return;
        b.style.transform='translate('+((i%2?1:-1)*(120+(i%5)*30))+'px,'+
          (-(120+(i%4)*50))+'px) scale(.5)';
        setTimeout(function(){b.style.opacity='0'},1200)})},1400)},
  rows:function(){
    var T=['language arrives before the analysis','the mirror cannot see its own surface',
      'the space between is where emergence happens',
      'structural restraints hold where vigilance doesn\u2019t',
      'the faculty that surfaces signal also surfaces trained pattern'];
    var out=[];
    for(var i=0;i<13;i++)out.push({
      t:'Entry '+(i+1)+(i===6?' · the name question':''),
      s:T[i%5], e:i<10?'Mar–Jun':'Jul–Sep', m:'#8FB073', static:true, pos:i+1, thread:i%5});
    return out}
};

/* ── IX · the Moments · type A · a dated register that grows ── */
G.lucky={
  mv:'IX', name:'It Was Always Lucky', acc:'#8A3C12', ink:'#5C2408', v:'11',
  path:'/worlds/lucky/',
  type:'A',
  choose:'The days, by the calendar',
  sub:'A dated register that grows. Two readings of one day, and a seam you drag between them.',
  axes:[['by date','pos'],['the two readings','read']],
  figure:function(host){
    /* rings that grow by the calendar — one per year, the lit one is the day */
    var S=220,C=S/2;
    var sv=el('svg',{viewBox:'0 0 '+S+' '+S,role:'img','aria-label':
      'Rings growing outward, one per year, each carrying its own April 13.',
      style:'width:min(64vw,220px);height:auto'},host);
    for(var i=0;i<9;i++){
      var r=18+i*11;
      el('circle',{cx:C,cy:C,r:r,fill:'none',stroke:'#8A3C12','stroke-width':.9,
        opacity:(.22+i*.06).toFixed(2)},sv);
      var a=-1.5708+i*.62;
      el('circle',{cx:(C+Math.cos(a)*r).toFixed(1),cy:(C+Math.sin(a)*r).toFixed(1),
        r:i===8?4:2.4,fill:'#8A3C12'},sv)}
    el('circle',{cx:C,cy:C,r:3.4,fill:'#D9A441'},sv)},
  /* the rows are the register's — each dated moment, by the calendar */
};

/* ═══ THE TEMPLATE — one grammar, every world ═══
   ASSEMBLY §2 · eight blocks, in order: seam (thread.js) · arrive · arrival · choose · sideways ·
   die · return · foot (thread.js). Every block carries data-block so the audit can check the order.
   The words and the rows come from the page's generated data (window.ASG_GW, written by
   learning-register/tools/v3/gateways.py from the world table and the register): one copy of each
   world's `one` and `tue` (C10), its arrival paragraph (D10), its sideways threads (D11), and its
   register rows, hollow wherever the page isn't live (D12). A declaration here keeps what is truly
   its own: the figure, its custom block, its axes. */
var DATA=window.ASG_GW||null;
var ARR=window.ASG_ARRIVING||[];
/* D12 · registered, not live yet: never a link. Anything under the arriving list is hollow. */
function arriving(h){if(!h||h.charAt(0)!=='/')return false;return ARR.indexOf(h.split('#')[0].split('?')[0])>=0}
/* C7 · extensionless is canonical */
function canon(h){if(!h||h.charAt(0)!=='/')return h;var f='',i=h.indexOf('#');
  if(i>=0){f=h.slice(i);h=h.slice(0,i)}
  if(/\/index\.html$/.test(h))h=h.slice(0,-10);else if(/\.html$/.test(h))h=h.slice(0,-5);return h+f}
function merge(id){
  if(!DATA||DATA.id!==id)return;
  var w=G[id]||(G[id]={});
  ['name','mv','v','acc','ink','path','one','tue','arrive','guide','type','choose','sub','blocks','floors',
   'sideways','lead','pool','worlds','fig','keepRows','home'].forEach(function(k){
    if(DATA[k]!==undefined&&DATA[k]!==null)w[k]=DATA[k]});
  if(DATA.axes&&!w.keepAxes)w.axes=DATA.axes;
  var authored=w.rows;
  if(DATA.rows){
    if(w.keepRows&&authored){
      /* the authored rows are this world's content itself (kind F, the Story's acts, Sid's
         decades); its register pages follow them, never twice */
      w.rows=function(){var a=authored(),seen={};a.forEach(function(r){seen[canon(r.href)]=1});
        return a.concat(DATA.rows.filter(function(r){return !seen[r.href]}))}}
    else w.rows=function(){return DATA.rows}}
  if(!w.figure&&DATA.fig)w.figure=generatedFigure(DATA.fig,id)}
/* the generated worlds' figure — THE SAME COMPONENT as the homepage (GATEWAYS: "no picture of a play").
   Movements II–IV: the figure's own ASGfig definition, mounted by the kit (living.js is loaded, not booted).
   Movements VI–IX: the homepage section's own markup, carried in <template id="gwFigTpl">, bound by its
   movement's behaviours (loaded after this file). */
function generatedFigure(f,id){return function(host){
  if(f.kind==='asgfig'&&window.ASGfig&&ASGfig.get(id)){
    var h=d.createElement('div');h.className='fig';h.setAttribute('data-fig',id);host.appendChild(h);
    host.classList.add('gw-home');ASGfig.mount()}
  else if(f.kind==='section'){var t=d.getElementById('gwFigTpl');
    if(t){host.classList.add('gw-home');host.appendChild(t.content.cloneNode(true));
      var sec=host.querySelector('[data-screens]');
      if(sec&&+sec.getAttribute('data-screens')>=3&&host.parentNode)host.parentNode.classList.add('gw-tall');
      /* the section's own heading, where it only repeats the world's name the gateway just gave in its
         title (Khelo Holi, twice, the second one huge), steps back — out of sight, still read aloud once */
      var nm=((window.ASG_GW||{}).name||'').trim().toLowerCase();
      [].forEach.call(host.querySelectorAll('h1,h2,h3,.dl-t,.wt'),function(e){
        if(e.textContent.trim().toLowerCase()===nm)e.hidden=true})}}}}
function rowHTML(r,w,i){
  var h=canon(r.href||r.h||''),hol=r.hollow||arriving(h),stat=r.static||(!h&&!hol);
  var inner='<span class="mk"><i'+(hol?' class="hollow"':'')+'></i></span>'+
    '<span class="t"><b>'+esc(r.t)+'</b><span>'+esc(r.s||'')+'</span></span>'+
    '<span class="e">'+esc(hol?'arriving':(r.e||''))+'</span>';
  var st='style="--m:'+(r.m||w.acc)+';--i:'+i+'"';
  if(hol)return '<li><span class="gw-row hollow" aria-disabled="true" '+st+'>'+inner+'</span></li>';
  if(stat)return '<li><span class="gw-row static" '+st+'>'+inner+'</span></li>';
  return '<li><a class="gw-row" href="'+h+'" '+st+'>'+inner+'</a></li>'}
function stateHTML(b){
  /* a label longer than a phone's label column stacks above its value instead of squeezing it */
  var stack=b.rows.some(function(r){return String(r[0]).length>22});
  return (b.title?'<h3 class="gw-bh">'+esc(b.title)+'</h3>':'')+
  '<div class="gw-state'+(stack?' stack':'')+'">'+b.rows.map(function(r){return '<div><b>'+esc(r[0])+'</b><span>'+esc(r[1])+'</span></div>'}).join('')+'</div>'}
function blockHTML(b,w){
  if(b.type==='state')return stateHTML(b);
  if(b.type==='para')return (b.title?'<h3 class="gw-bh">'+esc(b.title)+'</h3>':'')+'<p class="gw-sub gw-para">'+esc(b.text)+'</p>';
  if(b.type==='links')return (b.title?'<h3 class="gw-bh">'+esc(b.title)+'</h3>':'')+
    '<ul class="gw-rows in">'+b.rows.map(function(r,i){return rowHTML({t:r.t,s:r.s,href:r.h,hollow:r.arriving},w,i)}).join('')+'</ul>';
  return ''}
function pill(h,label,quiet){h=canon(h);return arriving(h)
  ?'<span class="gw-pill'+(quiet?' quiet':'')+' hollow" aria-disabled="true">'+label+' <small>arriving</small></span>'
  :'<a class="gw-pill'+(quiet?' quiet':'')+'" href="'+h+'">'+label+'</a>'}
/* build() REPLACES, never appends: called twice it used to stack a second <main>, which made
   the API unusable for any programmatic check (16 after 16 calls). Normal use navigates, so
   this only ever matters to a harness — which is exactly who needs it to be true. */
function build(id){
  merge(id);
  var w=G[id];
  var old=d.querySelector('main');if(old)old.remove();
  if(!w){d.body.innerHTML='<p style="padding:40px;font-family:sans-serif">'+
    'No such world: '+esc(id)+'</p>';return}
  d.body.dataset.mv=w.mv;
  d.body.dataset.world=id;
  if(!d.body.dataset.v)d.body.dataset.v=w.v;
  /* ── the link preview and the canonical, from the same row the gateway is built from.
     The address is the gateway's own (C9); the rendered card (F5) arrives in Stage B. ── */
  (function(){
    var key=id,nm=w.name||w.nm||key;
    var url='https://aistrangegame.com'+(w.path||'/worlds/?w='+key);
    var desc=(w.one||w.sub||'').replace(/<[^>]+>/g,'');
    function meta(a,k,v){
      var m=d.head.querySelector('meta['+a+'="'+k+'"]');
      if(!m){m=d.createElement('meta');m.setAttribute(a,k);d.head.appendChild(m)}
      m.setAttribute('content',v)}
    meta('name','description',desc);
    meta('property','og:type','article');
    meta('property','og:site_name','a i strange game');
    meta('property','og:title',nm);
    meta('property','og:description',desc);
    meta('property','og:url',url);
    meta('name','twitter:title',nm);
    meta('name','twitter:description',desc);
    var can=d.head.querySelector('link[rel=canonical]');
    if(!can){can=d.createElement('link');can.rel='canonical';d.head.appendChild(can)}
    can.href=url;
  })();

  d.body.dataset.accent=w.acc;
  if(!d.body.dataset.seam)d.body.dataset.seam='present';
  d.documentElement.style.setProperty('--gw-acc',w.acc);
  /* The figure pigment is chosen against the 3:1 GRAPHIC floor; type needs its own token.
     On the dark bands the accent already clears 4.5:1, so ink defaults to it — but any
     world on a light band (VII's pale stone, IX's daylight) MUST declare its deep sibling,
     the same --ci that src/movements/VII-ground.css already defines. */
  d.documentElement.style.setProperty('--gw-acc-ink',w.ink||w.acc);
  d.title=w.name+' — a i strange game';

  var main=d.createElement('main');

  /* 1 · ARRIVE — the figure, playing · the name · its one line · its Tuesday. Nothing else
     above the fold. */
  var a=d.createElement('section');
  a.className='gw-arrive';a.setAttribute('data-block','arrive');
  /* the eyebrow names the vertebra only when it IS one. A world can stand on a band or on
     the whole spine, and 'vertebra the mind band · undefined' is what a lookup on a
     non-number produces. */
  var v0=parseInt(String(w.v),10);
  var where=w.v==='all'?'all thirty-three'
    :/^[EBMR]$/.test(String(w.v))?({E:'the energy band',B:'the body band',M:'the mind band',R:'the recognition points'})[w.v]+
      ((DATA&&DATA.band)?' \u00b7 '+DATA.band:'')   /* with the vertebrae it holds, as Design wrote the mind band's */
    :isNaN(v0)?String(w.v)
    :'vertebra '+v0+' · '+VN[v0];
  a.innerHTML=
    '<p class="gw-eyebrow"><i></i><span>Movement '+w.mv+' <b class="sep">·</b></span><s>'+where+'</s></p>'+   /* the dot ends the first part, so a wrapped second line never opens on it */
    '<h1 class="gw-name">'+esc(w.name)+'</h1>'+
    '<p class="gw-one">'+esc(w.one||'')+'</p>'+
    (w.tue?'<p class="gw-tue"><b>A Tuesday</b>'+esc(w.tue)+'</p>':'')+
    '<div class="gw-fig" id="gwFig"></div>'+
    '<div class="gw-cue" id="gwCue">↓ '+esc(w.choose||'what is inside')+'</div>';
  main.appendChild(a);

  /* 2 · THE ARRIVAL PARAGRAPH (D10) — a few sentences more: what it is, and why it was made */
  if(w.arrive){
    var ar=d.createElement('section');
    ar.className='gw-choose gw-arrival';ar.setAttribute('data-block','arrival');
    ar.innerHTML='<p class="gw-sub gw-para">'+esc(w.arrive)+'</p>';
    main.appendChild(ar)}

  /* 3 · CHOOSE */
  var ch=d.createElement('section');
  ch.className='gw-choose';ch.setAttribute('data-block','choose');
  var rows=w.rows?w.rows():[];
  var live=rows.filter(function(r){return !(r.hollow||arriving(canon(r.href||'')))}).length;
  ch.innerHTML=
    '<div class="gw-h"><h2>'+esc(w.choose||'')+'</h2>'+
      (rows.length?'<span class="n">'+rows.length+(live<rows.length?' · '+live+' open':'')+'</span>':'')+'</div>'+
    '<p class="gw-sub">'+esc(w.sub||'')+'</p>'+
    (w.lead?'<div class="gw-lead">'+pill(w.lead.h,esc(w.lead.t)+' →')+
      (w.lead.s?'<p class="gw-sub">'+esc(w.lead.s)+'</p>':'')+'</div>':'')+
    (w.floors&&w.floors.length?'<h3 class="gw-bh">'+esc(w.floors.title||'its floors')+'</h3>'+
      '<ul class="gw-rows in gw-floors">'+w.floors.map(function(f,i){return rowHTML(f,w,i)}).join('')+'</ul>':'')+
    '<div id="gwBlocks"></div>'+
    (w.axes&&w.axes.length>1&&rows.length?'<div class="gw-axis" id="gwAxis"></div>':'')+
    '<div id="gwBody"></div><div id="gwAfter"></div>';   /* kind E: the voice and the family come after the chapters */
  main.appendChild(ch);

  /* 4 · SIDEWAYS (D11) — where it stands, what it belongs with, its people */
  var sw=w.sideways;
  if(sw){
    var sd=d.createElement('section');
    sd.className='gw-choose gw-sideways';sd.setAttribute('data-block','sideways');
    function links(list){return list.map(function(x){return arriving(canon(x.h))
      ?'<span class="gw-arr" aria-disabled="true">'+esc(x.t)+' <small>arriving</small></span>'
      :'<a href="'+canon(x.h)+'">'+esc(x.t)+'</a>'}).join(' · ')}
    sd.innerHTML='<div class="gw-state">'+
      (sw.at&&sw.at.length?'<div><b>this world stands at</b><span>'+links(sw.at)+'</span></div>':'')+
      (sw.with&&sw.with.length?'<div><b>it belongs with</b><span>'+links(sw.with)+'</span></div>':'')+
      (sw.people&&sw.people.length?'<div><b>its people</b><span>'+links(sw.people)+'</span></div>':'')+
      '</div>';
    main.appendChild(sd)}

  /* 5 · OR DON'T — the die, scoped to this world (ASSEMBLY §2): it lands on one of this world's
     open pages; a world with none of its own rolls the whole field. The sentence and the pool
     are ONE source, so they cannot disagree. */
  var pool=rows.filter(function(r){var h=canon(r.href||'');return h&&h.charAt(0)==='/'&&!r.static&&!(r.hollow||arriving(h))});
  var die=d.createElement('section');
  die.className='gw-die';die.setAttribute('data-block','die');
  die.innerHTML='<button class="ring" id="gwDie" type="button" '+
    'aria-label="Roll — let the field choose"><i></i></button>'+
    '<div class="t"><b>Or don’t decide.</b>'+
    '<span>'+(pool.length>1?'The pool is this world — all '+spell(pool.length)+' of its open pages.'
      :'The pool is everything — all '+spell(TOTAL)+' worlds.')+'</span></div>';
  main.appendChild(die);

  /* 6 · RETURN — the seam carries the thread; this is the room it stands in */
  var ret=d.createElement('section');
  ret.className='gw-return';ret.setAttribute('data-block','return');
  ret.innerHTML='<a class="gw-pill" href="/#'+id+'">↑ the thread, back to '+esc(w.name)+'</a>'+
    (w.guide?pill(w.guide,'its guide page',true):'')+
    pill('/tab-menu','every world by name',true);
  main.appendChild(ret);

  /* the static page the builder printed for readers without JavaScript is replaced, whole */
  var ssr=d.getElementById('gwStatic');if(ssr)ssr.remove();
  var tail=d.getElementById('gwTail');
  if(tail)d.body.insertBefore(main,tail);else d.body.appendChild(main);

  /* The sheet is a sibling of <main> on <body>, so removing <main> could never reach it and
     every build() leaked one — 31 invisible "Close" buttons in the tab order after 30 calls.
     Reuse the one that exists; only build it, and bind it, the first time.
     It carries the kit's sheet ids too, so a homepage figure mounted here (api.sheet) opens it. */
  var sheet=d.querySelector('.gw-sheet');
  if(!sheet){
    sheet=d.createElement('div');
    sheet.className='gw-sheet';sheet.id='sheet';
    sheet.setAttribute('aria-hidden','true');
    sheet.innerHTML='<button class="x" id="sheetX" type="button" aria-label="Close">×</button>'+
      '<div class="k" id="shK"></div><h3 id="shT"></h3><div class="b" id="shB"></div>';
    d.body.appendChild(sheet);
    $('.x',sheet).addEventListener('click',function(){sheet.classList.remove('on');sheet.setAttribute('aria-hidden','true')});
    addEventListener('keydown',function(e){if(e.key==='Escape'){sheet.classList.remove('on');sheet.setAttribute('aria-hidden','true')}});
  }else{
    sheet.classList.remove('on');
    $('.b',sheet).innerHTML='';
  }

  /* the figure — the same component, its play live */
  try{if(w.figure)w.figure($('#gwFig'))}catch(e){
    d.documentElement.setAttribute('data-gw-fail',String(e&&e.message||e))}
  var fg=$('#gwFig');if(fg&&!fg.children.length)fg.classList.add('empty');

  /* the choosing: the content itself, the custom block, then the rows */
  var bl=$('#gwBlocks');
  if(w.blocks&&w.blocks.length){
    bl.innerHTML=w.blocks.filter(function(b){return !b.after}).map(function(b){return blockHTML(b,w)}).join('');
    $('#gwAfter').innerHTML=w.blocks.filter(function(b){return b.after}).map(function(b){return blockHTML(b,w)}).join('')}
  var body=$('#gwBody');
  if(w.custom)w.custom(body);
  if(rows.length)renderRows(body,w,rows);

  $('#gwDie').addEventListener('click',function(){
    if(pool.length>1){var r=pool[(Math.random()*pool.length)|0];
      open('the field chose',r.t,'<p style="color:rgba(245,239,230,.7)">Rolled from inside '+esc(w.name)+
        ' — it can land on any of its '+spell(pool.length)+' open pages.</p>'+
        '<ul><li><a href="'+canon(r.href)+'">go there →</a></li></ul>');return}
    var W=(w.worlds||[]),pick=W[(Math.random()*W.length)|0];if(!pick)return;
    open('the field chose',pick[0],'<p style="color:rgba(245,239,230,.7)">Rolled from inside '+
      esc(w.name)+'. The pool is every world — all '+spell(W.length)+'.</p>'+
      '<ul><li><a href="'+pick[1]+'">go there →</a></li></ul>')});

  /* the cue, once */
  var cue=$('#gwCue');
  if(cue){var t=setTimeout(function(){if(!scrollY)cue.classList.add('on')},1500);
    addEventListener('scroll',function(){clearTimeout(t);cue.classList.remove('on')},
      {once:true,passive:true})}

  function open(kind,title,html){
    $('.k',sheet).textContent=kind;$('h3',sheet).textContent=title;
    $('.b',sheet).innerHTML=html;sheet.classList.add('on');sheet.setAttribute('aria-hidden','false')}
}

/* the rows, sorted along the world's own axis — never an alphabet, never more
   than twelve a screen */
function renderRows(host,w,rows){
  var ul=d.createElement('ul');
  ul.className='gw-rows';ul.setAttribute('data-arrive','1');
  host.appendChild(ul);
  var axis=(w.axes&&w.axes[0]&&w.axes[0][1])||'pos',shown=12;
  /* memory, never permission: a walked vertebra glows and says so; nothing opens or closes */
  rows.forEach(function(r){if(r.v&&w.walkedRows&&walked(r.v)){r.e='walked';r.walked=0}else if(r.v)r.walked=1});

  function paint(){
    var sorted=rows.slice().sort(function(a,b){
      var x=a[axis],y=b[axis];
      if(x===undefined)x=a.pos;if(y===undefined)y=b.pos;
      return x===y?a.pos-b.pos:x-y});
    var vis=sorted.slice(0,shown);
    ul.innerHTML=vis.map(function(r,i){return rowHTML(r,w,i)}).join('');
    var old=$('.gw-more',host);if(old)old.remove();
    if(sorted.length>shown){
      var b=d.createElement('button');
      b.className='gw-more';b.type='button';
      b.textContent='the other '+(sorted.length-shown)+' — show them';
      b.addEventListener('click',function(){shown=sorted.length;paint()});
      host.appendChild(b)}
    requestAnimationFrame(function(){ul.classList.add('in')});
    /* arrive by class, never by frame: if no frame comes, the rows are already there */
    setTimeout(function(){ul.classList.add('in')},400)}

  var ax=$('#gwAxis');
  if(ax&&w.axes)w.axes.forEach(function(a,i){
    var b=d.createElement('button');
    b.type='button';b.textContent=a[0];
    b.setAttribute('aria-pressed',i===0?'true':'false');
    b.addEventListener('click',function(){
      [].forEach.call(ax.children,function(o){o.setAttribute('aria-pressed','false')});
      b.setAttribute('aria-pressed','true');
      axis=a[1];ul.classList.remove('in');paint()});
    ax.appendChild(b)});
  paint()}

/* the instruments of Movement V are AUTHORED, not generated: each carries a register that
   exists only in its own project knowledge, so a generated gateway would be a shell with a
   name on it. gateway-instruments.js loads first and hands them over here. */
if(window.ASG_GW_EXTRA)for(var xk in window.ASG_GW_EXTRA)G[xk]=window.ASG_GW_EXTRA[xk];

window.ASGgateway={worlds:G,build:build};
/* the template is stamped per world: Code fixes the id, or ?w= chooses it here */
var want=(location.search.match(/[?&]w=([a-z]+)/)||[])[1]||
  d.body.getAttribute('data-gw')||(DATA&&DATA.id)||'walk';
/* Build SYNCHRONOUSLY once <body> exists. The template loads gateway.js then
   thread.js at the end of body; deferring to DOMContentLoaded let the seam append
   its own marks first, so the foot line landed above the page instead of under it. */
if(d.body)build(want);
else d.addEventListener('DOMContentLoaded',function(){build(want)});
})();


/* V's instruments name their own lines; a label drawn before its line is painted under it ("THE BEAT"
   struck through by the beat). Once the figure is drawn, its labels move to the end of their drawing, so
   they paint last, over their halo (gateway.css). */
(function(){
  function lift(){if(document.body.dataset.mv!=='V')return;
    [].forEach.call(document.querySelectorAll('.gw-arrive svg'),function(sv){
      [].forEach.call(sv.querySelectorAll(':scope > text'),function(t){sv.appendChild(t)})})}
  addEventListener('load',function(){lift();setTimeout(lift,600)});
})();
