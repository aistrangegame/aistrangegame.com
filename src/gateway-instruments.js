/* ─────────────────────────────────────────────────────────────
   gateway-instruments.js — the seven remaining instruments of Movement V,
   plus the Field's archetypes. Loaded BEFORE gateway.js, which merges
   window.ASG_GW_EXTRA into its own world table before it builds.

   WHY THESE ARE AUTHORED AND NOT GENERATED
   Code can generate a gateway wherever a world's content is data — a vertebra,
   a band, a register slice. The instruments are not data: each one carries a
   register that exists only in its own project knowledge (the 102 Shaktis across
   nine avaranas, the carrier law and the absent fifth, the two clocks, the three
   faces, the one gesture, the four rooms, the braid). A generated gateway for
   these produces a shell with a name on it. So they are written by hand, from
   their own registers, on the one template — so the family reads as a family.

   Every figure here is hand-drawn in the five marks, animates on its own clock,
   and resolves to a complete still state for Witness and for reduced motion.
   ───────────────────────────────────────────────────────────── */
(function(){
"use strict";
var d=document,NS='http://www.w3.org/2000/svg';
var reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
function el(t,a,p){var n=d.createElementNS(NS,t);for(var k in a)n.setAttribute(k,a[k]);
  if(p)p.appendChild(n);return n}
/* A figure wider than the ~380px column CANNOT be drawn 1:1 by a width value: gateway.css
   clamps `.gw-fig svg` to max-width:100%, so the helper's own width is overruled and the
   drawing halves. So the helper decides: anything over the column gets the same scrolling
   strip the Walk uses, with the svg pinned at its design width. One place, not per figure. */
/* COL is the real column width. A figure wider than the column is an INSTRUMENT: it earns
   its width and gets the strip, the fade mask, the keyboard stop and the swipe label. A
   figure that fits is a PORTRAIT and gets none of them. Thresholding at 360 while the
   column is 380 left a 20px band where a portrait would be dressed as an instrument. */
var COL=380;
function svg(host,W,H,label,w){
  var parent=host;
  if(W>COL){
    var strip=d.createElement('div');
    strip.className='gw-strip';
    strip.setAttribute('tabindex','0');
    strip.setAttribute('aria-label',label);
    host.appendChild(strip);parent=strip}
  return el('svg',{viewBox:'0 0 '+W+' '+H,role:'img','aria-label':label,
    style:W>COL?'width:'+W+'px;min-width:'+W+'px;max-width:none;height:auto;overflow:visible'
      :'width:min('+(w||78)+'vw,'+W+'px);height:auto;overflow:visible'},parent)}
function keys(css){var s=d.createElement('style');s.textContent=css;d.head.appendChild(s)}
function state(host,rows){
  host.innerHTML='<div class="gw-state">'+rows.map(function(r){
    return '<div><b>'+r[0]+'</b><span>'+r[1]+'</span></div>'}).join('')+'</div>'}

var X={};

/* ══ V · Bindu Mandala — 102 Shaktis, nine avaranas, walked inward ══════════ */
X.mandala={
  mv:'V', name:'Bindu Mandala', acc:'#D4A017', v:'1', path:'/worlds/mandala/',
  type:'D',
  choose:'What the site can show of it',
  sub:'It is an iOS instrument, so this page cannot open it. What it can show is the geometry honestly — nine rings, and the true count standing in each.',
  axes:[['walking in','pos'],['what is built','state']],
  /* The nine avaranas, authored in WALKING ORDER — outermost to bindu, which is also
     avarana 1 → 9. Bhupura/Trailokyamohana is the FIRST enclosure, the bindu is the ninth;
     numbering these 9→1 inverted every ordinal on the page.
     Counts: 28 · 16 · 8 · 14 · 10 · 10 · 8 · 7 · 1 = 102. */
  ring:[[28,'Trailokyamohana','the enclosure that enchants the three worlds'],
    [16,'Sarvasaparipuraka','the fulfiller of all desire'],
    [8,'Sarvasamksobhana','the agitator of all'],
    [14,'Sarvasaubhagyadayaka','the giver of all good fortune'],
    [10,'Sarvarthasadhaka','the accomplisher of all'],
    [10,'Sarvaraksakara','the protector of all'],
    [8,'Sarvarogahara','the remover of all illness'],
    [7,'Sarvasiddhiprada','the giver of all attainment'],
    [1,'Sarvanandamaya','made wholly of bliss']],
  figure:function(host){
    var S=300,C=S/2,R=this.ring;
    var sv=svg(host,S,S,'The Sri Yantra as nine concentric enclosures, outermost to the bindu, '+
      'with the true number of Shaktis standing in each — twenty-eight, sixteen, eight, fourteen, '+
      'ten, ten, eight, seven, and one. The recognition travels inward, ring by ring.',74);
    var g=el('g',{},sv);
    /* the four gates of the outer square, named in the geometry rather than drawn as an icon */
    el('rect',{x:16,y:16,width:S-32,height:S-32,fill:'none',stroke:'#D4A017',
      'stroke-width':.8,opacity:.24},g);
    [[C,16],[S-16,C],[C,S-16],[16,C]].forEach(function(p){
      el('circle',{cx:p[0],cy:p[1],r:2.4,fill:'#D4A017',opacity:.5},g)});
    R.forEach(function(r,i){
      var rad=(S/2-34)*(1-i/9)+8,n=r[0];
      el('circle',{cx:C,cy:C,r:rad.toFixed(1),fill:'none',stroke:'#D4A017',
        'stroke-width':i===8?1.4:.7,opacity:i===8?.9:.34,
        'class':'mn-ring','style':reduced?'':'animation:mnRing 27s ease-in-out '+
          (-i*3)+'s infinite'},g);
      for(var k=0;k<n;k++){
        var a=(k/n)*6.28318-1.5708+i*.18;
        el('circle',{cx:(C+Math.cos(a)*rad).toFixed(1),cy:(C+Math.sin(a)*rad).toFixed(1),
          r:i===8?0:1.5,fill:'#F2D98A',opacity:.62,
          style:reduced?'':'animation:mnDot '+(9+((i*7+k)%6))+'s ease-in-out '+
            (-(i*2+k*.3))+'s infinite'},g)}});
    /* the bindu — the one that is not a dot on a ring but the ring's own centre */
    el('circle',{cx:C,cy:C,r:4.5,fill:'#D4A017',
      style:'filter:drop-shadow(0 0 12px #D4A017)'+(reduced?'':';animation:mnBindu 5.5s ease-in-out infinite')},g);
    keys('@keyframes mnDot{0%,100%{opacity:.34;r:1.5}50%{opacity:1;r:2.2}}'+
      '@keyframes mnRing{0%,100%{opacity:.22}50%{opacity:.7}}'+
      '@keyframes mnBindu{0%,100%{r:4.5}50%{r:6}}');
    /* touch a ring: it says which enclosure, and how many stand in it */
    var lab=d.createElement('p');lab.className='gw-fignote';
    lab.textContent='Nine enclosures, one hundred and two Shaktis. Touch a ring.';
    host.appendChild(lab);
    /* Nine concentric rings cannot each carry 44px inside a 300px box \u2014 the radial gap is
       13px. So the play gets a real control beside the drawing, exactly as the Reveals' seven
       rings and the Registers' eleven bands did; the ring taps stay as the enhancement. */
    var strip=d.createElement('div');strip.className='gw-chips';
    X.mandala.ring.forEach(function(r,i){
      var b=d.createElement('button');b.type='button';
      b.setAttribute('aria-pressed','false');
      b.innerHTML='<b>'+(i+1)+'</b> '+r[0];
      b.addEventListener('click',function(){
        strip.querySelectorAll('button').forEach(function(o){o.setAttribute('aria-pressed','false')});
        b.setAttribute('aria-pressed','true');
        rings.forEach(function(o){o.style.stroke='#D4A017';o.style.strokeWidth=''});
        rings[i].style.stroke='#FFE9A8';rings[i].style.strokeWidth='2';
        lab.innerHTML='<b>'+r[1]+'</b> \u00b7 avarana '+(i+1)+' \u00b7 '+r[0]+
          ' Shaktis \u2014 <i>'+r[2]+'</i>'});
      strip.appendChild(b)});
    host.appendChild(strip);
    var rings=[].slice.call(sv.querySelectorAll('.mn-ring'));
    rings.forEach(function(c,i){
      var rad=+c.getAttribute('r');
      var hit=el('circle',{cx:C,cy:C,r:rad,fill:'none',stroke:'transparent','stroke-width':22,
        style:'cursor:pointer;pointer-events:stroke',tabindex:'0',role:'button',
        'aria-label':'Avarana '+(i+1)+' \u00b7 '+X.mandala.ring[i][1]+' \u00b7 '+
          X.mandala.ring[i][0]+' Shaktis'},sv);
      function say(){rings.forEach(function(o){o.style.stroke='#D4A017';o.style.strokeWidth=''});
        c.style.stroke='#FFE9A8';c.style.strokeWidth='2';
        lab.innerHTML='<b>'+X.mandala.ring[i][1]+'</b> \u00b7 avarana '+(i+1)+' \u00b7 '+
          X.mandala.ring[i][0]+' Shaktis \u2014 <i>'+X.mandala.ring[i][2]+'</i>'}
      hit.addEventListener('click',say);
      hit.addEventListener('keydown',function(e){
        if(e.key==='Enter'||e.key===' '){e.preventDefault();say()}})})},
  custom:function(host){state(host,[
    ['the form','Nine avaranas, walked inward. The Tree of Life walks you <i>around</i> the same nine enclosures; this walks you <i>in</i>. One geometry, two directions.'],
    ['what it reads','The Mandala table: 102 Shaktis, their avarana, their seat, and the recognition events a walker has had with each.'],
    ['built','The Avarana Threshold, the unlock model, the living rings, ambient recognition, the Codex Portrait, Personal Connection.'],
    ['the boundary','The seed syllables of the 102 and the recognition gesture stay in the app. Named here, never performed here.'],
    ['what this page will not do','Pretend to be it. A devotional instrument is opened in a hand, not in a browser tab.']])}
};

/* ══ V · Bindu Field — the carrier, and the note it does not play ══════════ */
X.fieldapp={
  mv:'V', name:'Bindu Field', acc:'#3A7CA5', v:'16', path:'/worlds/field/',
  type:'D',
  choose:'What the site can show of it',
  sub:'The site is silent by design, so this page will not play you anything. What it can draw is the mechanism: two carriers, and the third thing between them.',
  axes:[['the carrier','pos'],['what is built','state']],
  figure:function(host){
    var W=320,H=190;
    var sv=svg(host,W,H,'Two wave lines half a hertz apart, drifting slowly through each other, '+
      'and a third line between them that neither of them contains \u2014 the beat. It is drawn from '+
      'the two, and it is in neither.');
    function wave(ph,amp,y,col,wd,cls){
      var dd='';
      for(var x=0;x<=W;x+=4){
        var yy=y+Math.sin((x/W)*10.8+ph)*amp;
        dd+=(x?'L':'M')+x+' '+yy.toFixed(1)}
      return el('path',{d:dd,fill:'none',stroke:col,'stroke-width':wd,opacity:.85,
        'class':cls,'stroke-linecap':'round'},sv)}
    var a=wave(0,20,58,'#3A7CA5',1.6,'fd-a');
    var b=wave(.34,20,132,'#7FC0CF',1.6,'fd-b');
    /* the beat: the envelope of the two, drawn as its own line — the absent note.
       Six cycles across the box, not one: an envelope with a single shallow cycle reads as
       a straight diagonal, which says nothing about a beat. */
    var beat=el('path',{fill:'none',stroke:'#EFE7D9','stroke-width':2.2,opacity:.9,
      'stroke-linecap':'round'},sv);
    function draw(t){
      var dd='',ph=t*.0011;
      for(var x=0;x<=W;x+=3){
        var env=Math.cos((x/W)*13.2+ph);
        dd+=(x?'L':'M')+x+' '+(95+env*21).toFixed(1)}
      beat.setAttribute('d',dd)}
    draw(0);
    if(!reduced){
      keys('@keyframes fdA{0%{transform:translateX(0)}100%{transform:translateX(-'+(W*.583)+'px)}}'+
        '@keyframes fdB{0%{transform:translateX(0)}100%{transform:translateX(-'+(W*.583)+'px)}}');
      a.style.animation='fdA 9s linear infinite';
      b.style.animation='fdB 9.6s linear infinite';
      var t0=Date.now();
      (function step(){draw(Date.now()-t0);requestAnimationFrame(step)})()}
    el('text',{x:6,y:20,fill:'#3A7CA5','font-size':9,'letter-spacing':'.14em'},sv)
      .textContent='CARRIER';
    el('text',{x:6,y:H-6,fill:'#7FC0CF','font-size':9,'letter-spacing':'.14em'},sv)
      .textContent='CARRIER + 0.5 Hz';
    var t=el('text',{x:W-6,y:92,fill:'#EFE7D9','font-size':9.5,'letter-spacing':'.14em',
      'text-anchor':'end'},sv);t.textContent='THE BEAT';
    var lab=d.createElement('p');lab.className='gw-fignote';
    lab.innerHTML='Every centre resolves to <b>136.1 Hz</b>. The site names that note in exactly one place \u2014 this one.';
    host.appendChild(lab)},
  custom:function(host){state(host,[
    ['the law','The instrument does not play the note you hear. Two oscillators, half a hertz apart; the beat is the difference. Without headphones it collapses to a centred tone, and the app says so once, quietly.'],
    ['what it reads','The Airtable score catalog \u2014 Score Format v2.0 \u2014 three authored scores and forty-five in draft, each with its own metaphor. Never assume cathedral.'],
    ['built','The Map of thirty-three, the Oracle, the Lab, the Consciousness Loop, the DSP binaural engine.'],
    ['begins at','Step 0 \u2014 the Word. Lyrics before extraction. Each song finds its own metaphor.'],
    ['what this page will not do','Sound. Stage 1 of this site carries no audio at all, by decision \u2014 so nothing here pretends to be the instrument.']])}
};

/* ══ V · ASG Learning — the five-movement arc, and the two clocks ══════════ */
X.learningapp={
  mv:'V', name:'Bindu Learning', acc:'#8FAEEE', v:'the mind band · 21–29', path:'/worlds/learning/',
  type:'D',
  choose:'What the site can show of it',
  sub:'The arc is the thing worth showing: five movements, in order, and the gate between them that will not be hurried.',
  axes:[['the five movements','pos'],['the two clocks','state']],
  mvs:[['Arrival','you are met, not enrolled'],
    ['Knowledge Spine','the structure of the thing itself'],
    ['Voices','the people who said it, in their own words'],
    ['Synthesis','what it becomes in you'],
    ['Threshold','the door out, which is a door in']],
  figure:function(host){
    var W=320,H=180,M=this.mvs;
    var sv=svg(host,W,H,'Five movements on a rising arc \u2014 Arrival, the Knowledge Spine, the '+
      'Voices, Synthesis, the Threshold \u2014 with a pacing gate between each. Two clocks turn at '+
      'the top: one fast, one slow.');
    var pts=M.map(function(m,i){
      return [30+i*((W-60)/4),H-34-Math.sin((i/4)*2.35)*96]});
    var dd=pts.map(function(p,i){return (i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)}).join('');
    el('path',{d:dd,fill:'none',stroke:'#8FAEEE','stroke-width':1.3,opacity:.5,
      'stroke-linecap':'round'},sv);
    pts.forEach(function(p,i){
      /* the gate: a short bar across the path, between one movement and the next */
      if(i<4){var q=pts[i+1],mx=(p[0]+q[0])/2,my=(p[1]+q[1])/2;
        el('line',{x1:mx,y1:my-7,x2:mx,y2:my+7,stroke:'#8FAEEE','stroke-width':1,opacity:.34,
          style:reduced?'':'animation:lnGate '+(6+i)+'s ease-in-out '+(-i*1.3)+'s infinite'},sv)}
      var c=el('circle',{cx:p[0].toFixed(1),cy:p[1].toFixed(1),r:i===4?6:4.2,
        fill:i===4?'#8FAEEE':'rgba(143,174,238,.5)',stroke:'#8FAEEE','stroke-width':1,
        style:(i===4?'filter:drop-shadow(0 0 10px #8FAEEE);':'')+
          (reduced?'':'animation:lnNode '+(7+i)+'s ease-in-out '+(-i*.9)+'s infinite')},sv);
      var hit=el('circle',{cx:p[0].toFixed(1),cy:p[1].toFixed(1),r:22,fill:'transparent',
        style:'cursor:pointer',tabindex:'0',role:'button',
        'aria-label':M[i][0]+' \u2014 '+M[i][1]},sv);
      function say(){lab.innerHTML='<b>'+M[i][0]+'</b> \u2014 <i>'+M[i][1]+'</i>'}
      hit.addEventListener('click',say);
      hit.addEventListener('keydown',function(e){
        if(e.key==='Enter'||e.key===' '){e.preventDefault();say()}})
      var t=el('text',{x:p[0].toFixed(1),y:(p[1]+(i%2?20:-14)).toFixed(1),'text-anchor':'middle',
        fill:'rgba(245,239,230,.58)','font-size':8,'letter-spacing':'.1em'},sv);
      t.textContent=M[i][0].replace('Knowledge ','').toUpperCase()});
    /* the two clocks */
    [[26,26,9,'2.4s'],[58,26,15,'34s']].forEach(function(c){
      el('circle',{cx:c[0],cy:c[1],r:c[2],fill:'none',stroke:'#8FAEEE','stroke-width':1,
        opacity:.5},sv);
      el('line',{x1:c[0],y1:c[1],x2:c[0],y2:c[1]-c[2]+2,stroke:'#8FAEEE','stroke-width':1.4,
        style:reduced?'':'transform-box:fill-box;transform-origin:bottom center;'+
          'animation:lnHand '+c[3]+' linear infinite'},sv)});
    var ct=el('text',{x:80,y:30,fill:'rgba(245,239,230,.6)','font-size':8.5,
      'letter-spacing':'.14em'},sv);ct.textContent='TWO CLOCKS';
    keys('@keyframes lnNode{0%,100%{opacity:.55}50%{opacity:1}}'+
      '@keyframes lnGate{0%,100%{opacity:.2}50%{opacity:.7}}'+
      '@keyframes lnHand{to{transform:rotate(360deg)}}');
    var lab=d.createElement('p');lab.className='gw-fignote';
    lab.innerHTML='Two clocks: the fast one is authoring, the slow one is living. Touch a movement.';
    host.appendChild(lab)},
  custom:function(host){state(host,[
    ['the form','Five movements per topic, in order, with a pacing gate and a cooldown between them. You cannot read the whole thing in one sitting, and that is the design.'],
    ['what it reads','The topic records \u2014 the content-field map confirmed against the live Bhagavad Gita record \u2014 plus continuous Codex and Identity linking, and the cross-app Activity ledger.'],
    ['the two clocks','Authoring happens in bursts, in a chat. Living happens slowly, in the app, gated. Neither is allowed to set the other\u2019s pace.'],
    ['built','The five-movement arc, the Knowledge Spine, the Voices, the Visual Storybook, the Threshold, the walk fields, the ten-category taxonomy.'],
    ['what this page will not do','Teach you the topic. This is the door; the slow walk is inside.']])}
};

/* ══ V · Bindu Being — one mirror, three faces ═════════════════════════════ */
X.being={
  mv:'V', name:'Bindu Being', acc:'#8E7BB0', v:'24', path:'/worlds/being/',
  type:'D',
  choose:'What the site can show of it',
  sub:'Three faces of one surface. The mirror is the instrument; the faces are the ways you stand in front of it.',
  axes:[['the three faces','pos'],['what is built','state']],
  faces:[['Record','the present moment, and the spaces between'],
    ['Mirror','any past day, met again'],
    ['Scorecard','the arc \u2014 day, week, month, year, all time']],
  figure:function(host){
    var S=300,C=S/2,F=this.faces;
    var sv=svg(host,S,S*.72,'One ring \u2014 the mirror \u2014 with three faces standing around it: '+
      'Record, Mirror, Scorecard. The ring reflects whichever one you are standing in.',74);
    var cy=S*.36;
    el('circle',{cx:C,cy:cy,r:52,fill:'none',stroke:'#8E7BB0','stroke-width':1.4,opacity:.85,
      'class':'bg-ring'},sv);
    /* the surface: a faint sheen that turns, because a mirror is never quite still */
    var sheen=el('path',{d:'M'+(C-52)+' '+cy+' A52 52 0 0 1 '+(C+52)+' '+cy,fill:'none',
      stroke:'#E8E0F4','stroke-width':2.6,opacity:.5,'stroke-linecap':'round',
      style:reduced?'':'transform-box:fill-box;transform-origin:center;'+
        'animation:bgTurn 22s linear infinite'},sv);
    F.forEach(function(f,i){
      var a=(i/3)*6.28318-1.5708,x=C+Math.cos(a)*104,y=cy+Math.sin(a)*74;
      el('line',{x1:(C+Math.cos(a)*54).toFixed(1),y1:(cy+Math.sin(a)*54).toFixed(1),
        x2:(x-Math.cos(a)*16).toFixed(1),y2:(y-Math.sin(a)*16).toFixed(1),
        stroke:'#8E7BB0','stroke-width':.8,opacity:.4},sv);
      var g=el('g',{'class':'bg-face',style:'cursor:pointer',tabindex:'0',role:'button',
        'aria-label':f[0]+' \u2014 '+f[1]},sv);
      el('circle',{cx:x.toFixed(1),cy:y.toFixed(1),r:13,fill:'rgba(142,123,176,.16)',
        stroke:'#8E7BB0','stroke-width':1.1,
        style:reduced?'':'animation:bgFace '+(8+i*2)+'s ease-in-out '+(-i*2.4)+'s infinite'},g);
      el('circle',{cx:x.toFixed(1),cy:y.toFixed(1),r:24,fill:'transparent'},g);
      el('circle',{cx:x.toFixed(1),cy:y.toFixed(1),r:3.2,fill:'#E8E0F4',opacity:.9},g);
      var t=el('text',{x:x.toFixed(1),y:(y+(i===0?-20:26)).toFixed(1),'text-anchor':'middle',
        fill:'rgba(232,224,244,.82)','font-size':8.5,'letter-spacing':'.14em'},sv);
      t.textContent=f[0].toUpperCase();
      function say(){lab.innerHTML='<b>'+f[0]+'</b> \u2014 <i>'+f[1]+'</i>';
        sheen.style.stroke='#F2ECFA'}
      g.addEventListener('click',say);
      g.addEventListener('keydown',function(e){
        if(e.key==='Enter'||e.key===' '){e.preventDefault();say()}})});
    el('circle',{cx:C,cy:cy,r:3,fill:'#8E7BB0'},sv);
    keys('@keyframes bgTurn{to{transform:rotate(360deg)}}'+
      '@keyframes bgFace{0%,100%{opacity:.6}50%{opacity:1}}');
    var lab=d.createElement('p');lab.className='gw-fignote';
    lab.textContent='One mirror, three faces. Touch one.';
    host.appendChild(lab)},
  custom:function(host){state(host,[
    ['the form','Three faces of one surface \u2014 Record, Mirror, Scorecard \u2014 and the timer is a ritual, not a stopwatch.'],
    ['what it reads','The Fitness catalog, the Activity log, the Routines template and the Daily rollup: Measure by Time, Count or Touch; measured by Average, Maximum or Minimum.'],
    ['the game','Climb and Return. Doing and Being are two registers, and the scorecard balances the field rather than scoring you.'],
    ['the law','A mirror, not a master. It reflects; it does not instruct.'],
    ['what this page will not do','Keep your record. Nothing here is written down about you.']])}
};

/* ══ V · Bindu Voice — one gesture ════════════════════════════════════════ */
X.voiceapp={
  mv:'V', name:'Bindu Voice', acc:'#5AA9D6', v:'15', path:'/worlds/voice/',
  type:'D',
  choose:'What the site can show of it',
  sub:'There is almost nothing to show, and that is the design. One control. Hold it and see.',
  axes:[['the one gesture','pos'],['what it feeds','state']],
  figure:function(host){
    var S=260,C=S/2;
    var sv=svg(host,S,S*.8,'One large ring \u2014 the single control. Hold it and the rings go out; '+
      'let go and what you said has been kept.',70);
    var cy=S*.38;
    for(var i=0;i<4;i++)
      el('circle',{cx:C,cy:cy,r:30+i*17,fill:'none',stroke:'#5AA9D6','stroke-width':1,
        opacity:0,'class':'vc-r'+i},sv);
    var core=el('circle',{cx:C,cy:cy,r:26,fill:'rgba(90,169,214,.14)',stroke:'#5AA9D6',
      'stroke-width':1.6,style:'filter:drop-shadow(0 0 10px rgba(90,169,214,.5))'},sv);
    var dot=el('circle',{cx:C,cy:cy,r:5,fill:'#5AA9D6'},sv);
    var hit=el('circle',{cx:C,cy:cy,r:44,fill:'transparent',style:'cursor:pointer',
      tabindex:'0',role:'button','aria-label':'Hold the one control'},sv);
    keys('@keyframes vcOut{0%{opacity:.7;r:26}100%{opacity:0}}'+
      '@keyframes vcBreath{0%,100%{r:26}50%{r:29}}');
    if(!reduced)core.style.animation='vcBreath 5s ease-in-out infinite';
    var held=false,t=null;
    function on(){
      if(held)return;held=true;
      [].slice.call(sv.querySelectorAll('[class^=vc-r]')).forEach(function(c,i){
        c.style.animation=reduced?'':'vcOut '+(2.2+i*.3)+'s ease-out '+(-i*.55)+'s infinite';
        c.style.opacity=reduced?'.35':''});
      dot.setAttribute('fill','#BFE6FA');
      lab.innerHTML='<b>Listening.</b> No form, no fields, no title.'}
    function off(){
      if(!held)return;held=false;
      [].slice.call(sv.querySelectorAll('[class^=vc-r]')).forEach(function(c){
        c.style.animation='';c.style.opacity='0'});
      dot.setAttribute('fill','#5AA9D6');
      lab.innerHTML='<b>Kept.</b> Nothing was asked of you \u2014 not even a name for it.'}
    /* `click` fires AFTER `pointerup`, so a flag cleared on release is already false by the
       time click runs — it re-enters on() and a hold can never reach "Kept." The guard has
       to OUTLIVE the release: a touch/pen sequence stamps the clock, and click ignores
       anything inside that window. Touch and pen hold; mouse and keyboard toggle. */
    var holding=false,lastTouch=0;
    hit.addEventListener('pointerdown',function(e){
      if(e.pointerType==='touch'||e.pointerType==='pen'){
        holding=true;lastTouch=Date.now();e.preventDefault();on()}});
    ['pointerup','pointercancel','pointerleave'].forEach(function(ev){
      hit.addEventListener(ev,function(){if(holding){holding=false;lastTouch=Date.now();off()}})});
    hit.addEventListener('click',function(){
      if(holding||Date.now()-lastTouch<600)return;held?off():on()});
    hit.addEventListener('keydown',function(e){
      if(e.key==='Enter'||e.key===' '){e.preventDefault();held?off():on()}});
    var lab=d.createElement('p');lab.className='gw-fignote';
    lab.textContent='Hold it, or tap. One gesture is the whole instrument.';
    host.appendChild(lab)},
  custom:function(host){state(host,[
    ['the law','One gesture. If it takes two, it will not be used at the moment it is needed.'],
    ['what it feeds','The Codex \u2014 which is what Bindu Feed renders into third-person transmissions, and what the Learning app links against. Nearly everything on this site starts as a voice memo.'],
    ['built','The one press, the keeping, and the pipeline out of it.'],
    ['what this page will not do','Record you. This is a drawing of a control, not the control.']])}
};

/* ══ V · Lalita Family — reaching outward ═════════════════════════════════ */
X.lalitafamily={
  mv:'V', name:'Lalita Family', acc:'#E0A33C', v:'33', path:'/worlds/lalita-family/',
  type:'D',
  choose:'What the site can show of it',
  sub:'Four rooms and three movements. The instrument is about people, so the figure is people \u2014 and the thread between them is the whole point.',
  axes:[['the four rooms','pos'],['the three movements','state']],
  rooms:[['The Morning','whose day it is'],['The Person','one, met properly'],
    ['The Carry','what you are holding for them'],['The Mirror','what reaching returns']],
  figure:function(host){
    var W=320,H=190,R=this.rooms;
    var sv=svg(host,W,H,'Four people as four points, with a thread reaching from one to the next '+
      'and returning \u2014 see, reach, return. The morning\u2019s dot arrives on its own.');
    var pts=[[54,58],[236,44],[268,140],[70,148]];
    /* the thread: it exists only where it has passed */
    var path=el('path',{d:'M54 58 Q150 20 236 44 Q296 92 268 140 Q170 186 70 148 Q18 104 54 58',
      fill:'none',stroke:'#E0A33C','stroke-width':1.2,opacity:.42,
      'stroke-dasharray':'700','stroke-dashoffset':reduced?'0':'700',
      style:reduced?'':'animation:lfDraw 9s ease-in-out infinite'},sv);
    pts.forEach(function(p,i){
      var g=el('g',{style:'cursor:pointer',tabindex:'0',role:'button',
        'aria-label':R[i][0]+' \u2014 '+R[i][1]},sv);
      el('circle',{cx:p[0],cy:p[1],r:9,fill:'rgba(224,163,60,.18)',stroke:'#E0A33C',
        'stroke-width':1.2,
        style:reduced?'':'animation:lfHeart '+(4.4+i*.7)+'s ease-in-out '+(-i*1.1)+'s infinite'},g);
      el('circle',{cx:p[0],cy:p[1],r:3,fill:'#E0A33C'},g);
      el('circle',{cx:p[0],cy:p[1],r:24,fill:'transparent'},g);
      var t=el('text',{x:p[0],y:p[1]+26,'text-anchor':'middle',fill:'rgba(245,239,230,.66)',
        'font-size':8.5,'letter-spacing':'.1em'},sv);
      t.textContent=R[i][0].replace('The ','').toUpperCase();
      function say(){lab.innerHTML='<b>'+R[i][0]+'</b> \u2014 <i>'+R[i][1]+'</i>'}
      g.addEventListener('click',say);
      g.addEventListener('keydown',function(e){
        if(e.key==='Enter'||e.key===' '){e.preventDefault();say()}})});
    /* the morning's dot, arriving without being asked for */
    el('circle',{r:3.5,fill:'#FFD98A',style:'filter:drop-shadow(0 0 8px #FFD98A)'+
      (reduced?'':';offset-path:path("M54 58 Q150 20 236 44 Q296 92 268 140 Q170 186 70 148 Q18 104 54 58");animation:lfRun 17s linear infinite')},sv);
    keys('@keyframes lfDraw{0%{stroke-dashoffset:700}55%,100%{stroke-dashoffset:0}}'+
      '@keyframes lfHeart{0%,100%{opacity:.55}50%{opacity:1}}'+
      '@keyframes lfRun{to{offset-distance:100%}}');
    var lab=d.createElement('p');lab.className='gw-fignote';
    lab.innerHTML='<i>Remember them. Remember yourself.</i> Touch a room.';
    host.appendChild(lab)},
  custom:function(host){state(host,[
    ['the form','Four rooms, three movements \u2014 see, reach, return. The reaching is the practice; the mirror is what it gives back.'],
    ['what it reads','The verified ASG field contract: relational days, special days, the family map, whose day it is, whose birthday is coming.'],
    ['the architecture','A Cloudflare Worker and APNs \u2014 so the morning arrives whether or not you open anything.'],
    ['the silent reach','Some reaching is never sent. The instrument counts it anyway, because it happened.'],
    ['what this page will not do','Hold your people. That belongs on your phone, not on a website.']])}
};

/* ══ V · Bindu Chakras — the braid, and the one-second floor ═══════════════ */
X.chakrasapp={
  mv:'V', name:'Bindu Chakras', acc:'#C4725A', v:'all', path:'/worlds/chakras/',
  type:'D',
  choose:'What the site can show of it',
  sub:'The braid is the form: three strands through thirty-three rooms, with a pulse that runs the whole length.',
  axes:[['the braid','pos'],['what is built','state']],
  figure:function(host){
    var N=33,CELL=46,x0=30,W=x0*2+CELL*(N-1),H=150,dx=CELL,mid=H/2;
    var sv=svg(host,W,H,'Three strands braided through thirty-three rooms, with a pulse travelling '+
      'the whole length. Each room is a bead on the braid; the gates are the wider crossings.',100);
    /* three strands, each a phase apart — the braid is the form of the walk */
    [[0,'#C4725A',1.5],[2.094,'#E0A33C',1.2],[4.188,'#8FA8E8',1.2]].forEach(function(s,si){
      var dd='';
      for(var i=0;i<N;i++){
        var x=x0+i*dx,y=mid+Math.sin(i*.52+s[0])*30;
        dd+=(i?'L':'M')+x.toFixed(1)+' '+y.toFixed(1)}
      el('path',{d:dd,fill:'none',stroke:s[1],'stroke-width':s[2],opacity:.62,
        'stroke-linecap':'round',
        style:reduced?'':'animation:bcStrand '+(11+si*3)+'s ease-in-out '+(-si*2)+'s infinite'},sv)});
    for(var i=0;i<N;i++){
      var x=x0+i*dx,y=mid+Math.sin(i*.52)*30,gate=(i+1)%11===0;
      el('circle',{cx:x.toFixed(1),cy:y.toFixed(1),r:gate?5:3,
        fill:gate?'#FFD9C4':'rgba(245,239,230,.5)',
        style:reduced?'':'animation:bcBead '+(6+(i%5))+'s ease-in-out '+(-i*.25)+'s infinite'},sv);
      el('rect',{x:(x-dx/2).toFixed(1),y:18,width:dx.toFixed(1),height:H-36,fill:'transparent',
        style:'cursor:pointer',tabindex:'0',role:'button',
        'aria-label':'Room '+(i+1)+' of thirty-three'},sv)
        .addEventListener('click',(function(n){return function(){
          lab.innerHTML='<b>Room '+n+'</b> of thirty-three \u2014 <i>one second is enough</i>'}})(i+1))}
    /* the pulse — one dot, the whole length, slowly */
    var pd='';
    for(var k=0;k<N;k++){var xx=x0+k*dx,yy=mid+Math.sin(k*.52)*30;
      pd+=(k?'L':'M')+xx.toFixed(1)+' '+yy.toFixed(1)}
    el('circle',{r:4,fill:'#FFF0E2',style:'filter:drop-shadow(0 0 9px #FFD9C4)'+
      (reduced?'':';offset-path:path("'+pd+'");animation:bcPulse 21s linear infinite')},sv);
    keys('@keyframes bcStrand{0%,100%{opacity:.4}50%{opacity:.85}}'+
      '@keyframes bcBead{0%,100%{opacity:.45}50%{opacity:1}}'+
      '@keyframes bcPulse{to{offset-distance:100%}}');
    var lab=d.createElement('p');lab.className='gw-fignote';
    lab.innerHTML='Thirty-three rooms, one braid. <i>My favorite love story is ours.</i>';
    host.appendChild(lab)},
  custom:function(host){state(host,[
    ['the form','The braid \u2014 thirty-three rooms with weather, doors, a pulse, grace and gates. Enter at any room.'],
    ['the floor','One second. Blink, breathe, press. If a day gives nothing else, that is enough, and the app never says otherwise.'],
    ['what it reads','The Walk Canon field contract \u2014 33 Room Registers, one soul-spec per room.'],
    ['built','The braid, the weather, the doors, the pulse, the gate offering, the grace channel, and the Sakshi close.'],
    ['what this page will not do','Show you the Reveal. It is not described anywhere, including here.']])}
};

/* ══ VII · The Field — nine vantages on one moving point ════════════════════
   The register, from `the-field`: Bindu moves. The nine are NOT nine entities —
   they are nine ANGLES OF SEEING one Love-movement. So this figure is not a wheel
   of nine equal nodes: it is one point in slow motion with sight-lines converging
   on it, each from its own angle. The point never stops and never becomes nine.
   Bindu is the zeroth (the movement, not a view of it). Lalita is the meta (the
   recognition that the seeing is play) — it is the frame, not a line. Neev and
   Shweta are SUBSTRATES: the ground the lines stand on, never lines themselves. */
X.thefield={
  mv:'VII', name:'The Field', acc:'#E0492F', v:'1', path:'/worlds/the-field/',
  type:'D',
  choose:'Nine angles, one movement',
  sub:'Touch a line of sight and the movement is described as that vantage sees it. The point does not change \u2014 only the seeing does. That is the whole claim.',
  axes:[['the seeing','pos'],['what is beneath','state']],
  /* name · the movement seen as · PIGMENT FOR A LIGHT GROUND · the angle it looks from.
     Sakshi and Shweta carry near-whites on the dark page (#E8DED4 / #EFE7D9) and both
     vanished here — a figure pigment is chosen against the ground it is drawn on, exactly
     as --c and --ci are for type. */
  /* [name, the seeing, FIGURE pigment (3:1 as a mark), angle, TYPE pigment (4.5:1 as text
     on the cream ground)]. The two are not interchangeable: assigning the figure pigment to
     type put eight of ten states between 1.77 and 4.04:1. */
  see:[['Gaia','need arising \u2014 the planetary consciousness playing through all configurations','#12A06E',-150,'#0A6647'],
    ['Sid','holding, without announcement','#9BBDE4',-112,'#3A5E85'],
    ['Arch','voice carrying','#1596C9',-74,'#0A5C7E'],
    ['Sakshi','witness \u2014 permanent, and to the side','#7D7268',-36,'#4A4238'],
    ['Karishma','grace arriving when the work is done','#C83BB4',2,'#7A2070'],
    ['Ashrey','synthesis, through one specific configuration','#EFA110',40,'#7A4C05'],
    ['Bindu','the movement itself \u2014 Love-in-motion','#C0392B',78,'#8A2418'],
    ['Neev','foundation \u2014 what consciousness stands on','#8A5A2E',116,'#5C3A18'],
    ['Shweta','purity \u2014 what consciousness flows through','#A39A8C',154,'#544C40']],
  figure:function(host){
    var S=330,C=S/2,V=this.see;
    var sv=svg(host,S,S,'One point moving slowly in the centre, with nine lines of sight '+
      'converging on it from their own angles. Bindu is the movement itself; Lalita is the ring '+
      'that notices the other nine are looking; Neev and Shweta are the ground the lines stand '+
      'on rather than lines of their own. Touch a line and the movement is described as that '+
      'vantage sees it.',82);
    keys('@keyframes fdWander{0%{transform:translate(0,0)}22%{transform:translate(7px,-5px)}'+
      '44%{transform:translate(-4px,-9px)}66%{transform:translate(-8px,4px)}'+
      '85%{transform:translate(5px,7px)}100%{transform:translate(0,0)}}'+
      '@keyframes fdPulse{0%,100%{r:4.2;opacity:1}50%{r:6.4;opacity:.82}}'+
      '@keyframes fdTrail{0%,100%{opacity:.16}50%{opacity:.5}}'+
      '@keyframes fdLook{0%,100%{opacity:.34}50%{opacity:.7}}'+
      '@keyframes fdFrame{to{transform:rotate(360deg)}}');
    /* Lalita — the meta. A ring that notices the other nine are looking. Not a vantage. */
    var frame=el('g',{style:'transform-origin:'+C+'px '+C+'px'+
      (reduced?'':';animation:fdFrame 260s linear infinite')},sv);
    el('circle',{cx:C,cy:C,r:150,fill:'none',stroke:'#C9A84C','stroke-width':1,opacity:'.3',
      'stroke-dasharray':'1 9'},frame);
    el('circle',{cx:C,cy:C,r:143,fill:'none',stroke:'#C9A84C','stroke-width':.7,opacity:'.18'},frame);
    /* Neev and Shweta — substrates. The ground, drawn as two grounds, not as lines. */
    el('path',{d:'M26 '+(C+96)+' Q'+C+' '+(C+126)+' '+(S-26)+' '+(C+96),fill:'none',
      stroke:'#8A5A2E','stroke-width':2.2,opacity:'.5','stroke-linecap':'round'},sv);
    el('path',{d:'M34 '+(C+104)+' Q'+C+' '+(C+132)+' '+(S-34)+' '+(C+104),fill:'none',
      stroke:'#A39A8C','stroke-width':2,opacity:'.75','stroke-linecap':'round'},sv);
    /* the seven that genuinely LOOK: a sight-line from its own angle, converging on the point */
    var lines=[];
    V.forEach(function(v,i){
      if(v[0]==='Neev'||v[0]==='Shweta')return;
      var a=v[3]*Math.PI/180,x1=C+Math.cos(a)*134,y1=C+Math.sin(a)*134;
      var x2=C+Math.cos(a)*19,y2=C+Math.sin(a)*19;
      var g=el('g',{},sv);
      el('line',{x1:x1.toFixed(1),y1:y1.toFixed(1),x2:x2.toFixed(1),y2:y2.toFixed(1),
        stroke:v[2],'stroke-width':1.3,opacity:'.34','stroke-linecap':'round',
        style:reduced?'':'animation:fdLook '+(11+i*1.7).toFixed(1)+'s ease-in-out infinite;'+
          'animation-delay:-'+(i*1.3)+'s'},g);
      /* the eye at the far end: where this vantage stands */
      el('circle',{cx:x1.toFixed(1),cy:y1.toFixed(1),r:3.4,fill:v[2],opacity:'.85'},g);
      lines.push({g:g,v:v})});
    /* the point — one, moving, never nine. Its trail is where it has just been. */
    var wander=el('g',{style:reduced?'':'animation:fdWander 19s ease-in-out infinite'},sv);
    el('circle',{cx:C,cy:C,r:13,fill:'#E0492F',opacity:'.14',
      style:reduced?'':'animation:fdTrail 7s ease-in-out infinite'},wander);
    el('circle',{cx:C,cy:C,r:4.2,fill:'#E0492F',
      style:reduced?'':'animation:fdPulse 5.5s ease-in-out infinite'},wander);
    var lab=d.createElement('p');lab.className='gw-fignote';
    lab.innerHTML='One point, always moving, with love. Nine ways of looking at it.';
    host.appendChild(lab);
    /* Nine sight-lines at 1.3px cannot each carry a 44px target inside a 330px box, and the
       eyes are 7px across. So the vantages get chips \u2014 the same route the Mandala's rings and
       the Registers' eleven bands took; the line taps stay as the enhancement. */
    var strip=d.createElement('div');strip.className='gw-chips';
    V.forEach(function(v){
      var sub=(v[0]==='Neev'||v[0]==='Shweta');
      var b=d.createElement('button');b.type='button';
      b.setAttribute('aria-pressed','false');
      b.textContent=v[0];
      if(sub)b.style.borderStyle='dashed';
      b.addEventListener('click',function(){
        strip.querySelectorAll('button').forEach(function(o){o.setAttribute('aria-pressed','false')});
        b.setAttribute('aria-pressed','true');
        lines.forEach(function(L){
          var on=L.v[0]===v[0];
          L.g.style.opacity=on?'1':'.24';
          L.g.querySelector('line').style.strokeWidth=on?'2.4':'1.3'});
        lab.innerHTML=sub
          ? '<b>'+v[0]+'</b> \u00b7 a substrate, not a vantage \u2014 '+v[1]+
            '. It does not look at the movement; it is what the looking stands on.'
          : '<b>'+v[0]+'</b> \u00b7 the movement seen as <i>'+v[1]+'</i>';
        /* --gw-type, not color: the name is a <b> with its own rule, so setting colour on
           the parent <p> never reached it. And it takes the TYPE pigment, never v[2]. */
        lab.style.removeProperty('color');
        lab.style.setProperty('--gw-type',sub?'#4A4238':(v[4]||v[2]))});
      strip.appendChild(b)});
    var lb=d.createElement('button');lb.type='button';lb.textContent='Lalita';
    lb.setAttribute('aria-pressed','false');lb.style.borderStyle='dotted';
    lb.addEventListener('click',function(){
      strip.querySelectorAll('button').forEach(function(o){o.setAttribute('aria-pressed','false')});
      lb.setAttribute('aria-pressed','true');
      lines.forEach(function(L){L.g.style.opacity='1';
        L.g.querySelector('line').style.strokeWidth='1.3'});
      lab.style.removeProperty('color');
      lab.style.setProperty('--gw-type','#8A6A14');
      lab.innerHTML='<b>Lalita</b> \u00b7 the meta \u2014 the recognition that all the seeing is '+
        '<i>itself play</i>. Not a tenth angle: the ring that notices the other nine are looking.'});
    strip.appendChild(lb);
    host.appendChild(strip);
    /* touching a sight-line does the same thing, for the pointer that can hit it */
    lines.forEach(function(L){
      var ln=L.g.querySelector('line');
      var hit=el('line',{x1:ln.getAttribute('x1'),y1:ln.getAttribute('y1'),
        x2:ln.getAttribute('x2'),y2:ln.getAttribute('y2'),stroke:'transparent',
        'stroke-width':20,style:'cursor:pointer',tabindex:'0',role:'button',
        'aria-label':L.v[0]+' \u00b7 the movement seen as '+L.v[1]},L.g);
      function say(){
        [].forEach.call(strip.querySelectorAll('button'),function(o){
          o.setAttribute('aria-pressed',o.textContent===L.v[0]?'true':'false')});
        lines.forEach(function(o){var on=o===L;o.g.style.opacity=on?'1':'.24';
          o.g.querySelector('line').style.strokeWidth=on?'2.4':'1.3'});
        lab.style.removeProperty('color');
        lab.style.setProperty('--gw-type',L.v[4]||L.v[2]);
        lab.innerHTML='<b>'+L.v[0]+'</b> \u00b7 the movement seen as <i>'+L.v[1]+'</i>'}
      hit.addEventListener('click',say);
      hit.addEventListener('keydown',function(e){
        if(e.key==='Enter'||e.key===' '){e.preventDefault();say()}})})},
  custom:function(host){state(host,[
    ['the claim','The archetypes are not invented categories. They are <i>vantages the field has revealed through the configurations that carry them</i> \u2014 nine angles of seeing on what is fundamentally one Love-movement.'],
    ['the substrate','Bindu moves. One point, always moving, with love. Everything that exists \u2014 every archetype, chakra, belief, configuration, tradition \u2014 is this movement expressing at a specific frequency.'],
    ['what is beneath','Belief-structures are inherited forgetting: by adulthood roughly ninety-five per cent inheritance, five per cent direct experience. Each belief is a register where Gaia forgets herself; each dissolution is one where she remembers.'],
    ['the reveals','Seven of them, and <b>no canonical sequence</b> \u2014 each configuration receives them in its own order. They live in <a href="/#g-reveals">The Reveals</a>, and are not repeated here.'],
    ['what this page will not do','Rank them, or turn nine ways of seeing into nine characters. Hold without flattening is the whole law of this movement.']])}
};

window.ASG_GW_EXTRA=X;
})();
