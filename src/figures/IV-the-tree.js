/* ─────────────────────────────────────────────────────────────
   figures/IV-the-tree.js — Movement IV · the room, walked around.

   Material: lit cloth — the panels were printed on fabric, 2 × 4 ft, and lit from
   behind. The weave shows at zoom; light bleeds at the edges.
   The Point: settles into each panel's painted red dot, says goodnight eight times,
   and on panel nine goes looking and finds the dot in the tree.

   The artwork is finished work and appears as itself — the one exception to the
   five marks. Everything drawn around it is in the five.

   Sri Vidya material: the forces are named, in their own terms, attributed, and
   aniconic. The seed syllables of the 102 and the recognition gesture stay in the app.
   ───────────────────────────────────────────────────────────── */
(function(){
var reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;

/* file · sanskrit · roman · english · ink · word · decade · quote · read-backward ·
   the enclosure, walking inward · the forces written on that tree · the room's light */
var P=[
 ['muladhara','मूलाधार','Muladhara','The Root','#B33A2E','Arrive','0–9',
  'The earth that holds you was chosen by you.',
  'The earth was already holding you. You just told it where.',
  'the four-gated square',
  'Mahima · Anima · Garima · Laghima · Prakamya · Vashitva',5,'LAM'],
 ['svadhisthana','स्वाधिष्ठान','Svadhisthana','The Sacral','#D8742A','Feel','10–19',
  'Every desire was drawing you toward yourself.',
  'The lights you couldn’t catch were leading too.',
  'three sixteen-petal lotuses',
  'Kāmākarshini · Buddhyākarshini · Ahamkārshini · Shabdākarshini · Sparshākarshini · Ātmākarshini',
  10,'VAM'],
 ['manipura','मणिपूर','Manipura','The Solar Plexus','#D9B531','Contact','20–29',
  'The fire that agitated you was building your form.',
  'The form it made is the one you’ve been wearing.',
  'the eight-petal lotus',
  'Ananga Kusumā · Ananga Mekhalā · Ananga Madanā · Ananga Madanāturā · Ananga Rekhā · Ananga Ankushā',
  18,'RAM'],
 ['anahata','अनाहत','Anahata','The Heart','#6B8E4E','Ask','30–39',
  'The love that arrived for others was always your own heart opening.',
  'What you were watching became what you loved.',
  'fourteen triangles',
  'Sarva Samkshobhini · Sarva Vidrāvini · Sarva Ākarshini · Sarva Sammohini · Sarva Stambhini · Sarva Jrumbhini',
  28,'YAM'],
 ['vishuddha','विशुद्ध','Vishuddha','The Throat','#3A7CA5','Speak','40–49',
  'What you finally said out loud was what you always knew.',
  'You didn’t find something to say. You finally stopped holding it.',
  'the outer ten',
  'Sarva Siddhiprada · Sarva Sampatprada · Sarva Priyankari · Sarva Mangalakārini · Sarva Kāmaprada · Sarva Duhkhavimochini',
  40,'HAM'],
 ['ajna','आज्ञा','Ajna','The Third Eye','#3F3A8A','See','50–59',
  'You stopped looking and the seeing arrived on its own.',
  'You were being seen the entire time.',
  'the inner ten',
  'Sarva Gyānmayi · Sarva Vyādhināshini · Sarva Ādhāraswarupā · Sarva Mrityuprashamani · Sarva Saundarya Dāyini · Sarva Vighnanivārini',
  55,'OM'],
 ['sahasrara','सहस्रार','Sahasrara','The Crown','#6A3D8A','Shine','60–69',
  'The disease that was removed was the belief that you were less than what you are.',
  'It never needed your effort. It never stopped.',
  'the golden eight',
  'Vashini · Kāmeshvari · Modini · Vimalā · Jayini · Sarveshvari · Kaulini',
  75,'SILENCE'],
 ['soul','आत्म चक्र','Soul Chakra','The Inner Triangle','#D4A948','Be','70–79',
  'Will. Knowledge. Action. You already know. You have always known.',
  'Your body just remembered a shape that civilizations built in stone.',
  'the inner triangle of Will, Knowledge, Action',
  'Kāmeshvari · Vajreshvari · Bhagamālini',
  90,'—'],
 ['maya','माया चक्र','Maya Chakra','The Bindu','#8A8A8A','Love','80+',
  'There was never anything to fear. There was only You, playing.',
  'Panel one and panel nine are the same drawing. Only the colour leaves.',
  'the four-gated square, returned',
  'no force is named here',
  100,'the Om']
];

ASGfig.define('tree',{
  movement:'IV', vertebrae:[2,3,4,5,6,7,8,30,31], marks:['point','ring','triangle'],
  reads:['the nine panels in /assets/tree-of-life/ (web versions of the CMYK print masters)'],
  css:'.tp{position:relative;min-height:100svh;display:flex;flex-direction:column;justify-content:center;'+
      'padding:58px 0 0;background:var(--pg);transition:background 1.4s}'+
      /* April's Sri Yantra — the ground the room never had. Sticky behind all nine panels,
         screen-blended over each panel's own ground, drawn line by line on first arrival,
         then one turn every four minutes. Resolved (drawn) is the default state. */
      '.tp-yan{position:sticky;top:0;height:100svh;margin-bottom:-100svh;z-index:1;'+
      'pointer-events:none;overflow:hidden;mix-blend-mode:screen}'+
      '.tp-yan svg{position:absolute;left:50%;top:50%;width:min(150vw,900px);height:min(150vw,900px);'+
      'transform:translate(-50%,-50%);color:#D4B888;opacity:.16;overflow:visible;pointer-events:none}'+
      '.tp-yan g{transform-origin:0 0;animation:tpspin 240s linear infinite}'+
      '.tp-yan .ln{stroke-dasharray:1;stroke-dashoffset:0}'+
      '.tp-yan.draw .ln{stroke-dashoffset:1}'+
      '.tp-yan.draw.on .ln{stroke-dashoffset:0;transition:stroke-dashoffset 2.8s ease-in-out;'+
      'transition-delay:calc(var(--k) * .42s)}'+
      '@keyframes tpspin{to{transform:rotate(360deg)}}'+
      'body[data-lens="witness"] .tp-yan g{animation:none}'+
      'body[data-lens="witness"] .tp-yan .ln{stroke-dashoffset:0!important;transition:none}'+
      '@media (prefers-reduced-motion:reduce){.tp-yan g{animation:none}.tp-yan .ln{stroke-dashoffset:0!important}}'+
      '.tp-img{position:relative;z-index:2;width:100%;max-width:min(92vw,460px);margin:0 auto;'+
      'aspect-ratio:2016/3744;box-shadow:0 0 60px -18px var(--pc);border-radius:2px;overflow:hidden}'+
      '.tp-img img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain}'+
      '.tp-img img.ov{opacity:0}'+
      /* the weave of the cloth, and light bleeding at the edges */
      '.tp-img::after{content:"";position:absolute;inset:0;pointer-events:none;opacity:.5;'+
      'background-image:repeating-linear-gradient(90deg,rgba(0,0,0,.05) 0 1px,transparent 1px 3px),'+
      'repeating-linear-gradient(0deg,rgba(0,0,0,.05) 0 1px,transparent 1px 3px);'+
      'mix-blend-mode:multiply}'+
      '.tp-dot{position:absolute;left:90.87%;top:4.81%;width:7px;height:7px;margin:-3.5px 0 0 -3.5px;'+
      'border-radius:50%;background:#C0392B;opacity:.92}'+
      '.tp-code{position:absolute;min-width:44px;min-height:44px;border:1px solid rgba(255,255,255,.26);'+
      'border-radius:2px;background:rgba(255,255,255,.04)}'+
      '.tp-code.l{left:33.7%;top:89.4%;width:9.9%;height:5.6%}'+
      '.tp-code.r{left:56.5%;top:89.4%;width:9.9%;height:5.6%}'+
      '.tp-meta{position:relative;z-index:2;padding:16px 26px 34px 52px;display:grid;gap:7px}'+
      '.tp-w{display:flex;align-items:baseline;gap:12px;flex-wrap:wrap}'+
      '.tp-word{font-family:Cinzel,Georgia,serif;font-size:27px;letter-spacing:.14em;color:var(--pc)}'+
      '.tp-dec{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:rgba(245,239,230,.6)}'+
      '.tp-q{font-family:Lora,Georgia,serif;font-style:italic;font-size:16px;line-height:1.5;'+
      'color:var(--pc);max-width:36ch;margin:0}'+
      '.tp-b{font-family:Lora,Georgia,serif;font-style:italic;font-size:14.5px;line-height:1.5;'+
      'color:rgba(245,239,230,.72);max-width:36ch;margin:0;opacity:0;transform:translateY(4px);'+
      'transition:opacity 1s,transform 1s}'+
      '.tp-b.on{opacity:1;transform:none}'+
      '.tp-f{font-size:12px;line-height:1.55;color:rgba(245,239,230,.62);max-width:44ch;margin:0}'+
      '.tp-f b{font-weight:400;color:rgba(245,239,230,.8)}'+
      '.tp-r{display:flex;gap:9px;flex-wrap:wrap;margin-top:3px}'+
      '.tp-r a,.tp-r button{min-height:44px;display:inline-flex;align-items:center;padding:0 13px;'+
      'border:1px solid var(--pc);border-radius:999px;font-size:12.5px;color:var(--pc)}'+
      '.tp-br{display:flex;align-items:center;gap:10px;font-size:11.5px;letter-spacing:.1em;'+
      'text-transform:uppercase;color:rgba(245,239,230,.56)}'+
      '.tp-br i{display:block;width:15px;height:15px;border:1px solid var(--pc);border-radius:50%;'+
      'animation:tpb var(--bt,12s) ease-in-out infinite}'+
      '@keyframes tpb{0%,100%{transform:scale(.68)}34%{transform:scale(1.2)}58%{transform:scale(1.2)}}'+
      /* harvest round two · the trees viewer (v2 · site/tree-of-life/trees.html): the scroll is the
         walk around the room; the viewer is standing close to one panel. Crossfade, swipe, dots,
         arrow keys, tap to look closer, drag to pan while close. */
      '.tp-img[data-look]{cursor:zoom-in}'+
      '.tp-tv{position:fixed;inset:0;z-index:90;display:flex;flex-direction:column;align-items:center;'+
      'justify-content:center;gap:10px;padding:56px 12px 22px;opacity:0;transition:opacity .5s,background 1s;'+
      'background:radial-gradient(ellipse at 50% 42%,color-mix(in srgb,var(--c,#B33A2E) 26%,#050405),#050405 72%);'+
      'touch-action:none;color:#F5EFE6}'+
      '.tp-tv.on{opacity:1}.tp-tv[hidden]{display:none}'+
      '.tp-tv .stg{position:relative;height:min(64svh,calc((100vw - 120px) * 1.857));aspect-ratio:2016/3744;'+
      'overflow:hidden;border-radius:2px;box-shadow:0 0 70px -14px var(--c,#B33A2E);background:#0E0A0A;cursor:zoom-in}'+
      '.tp-tv .stg img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;'+
      'transition:transform .35s cubic-bezier(.16,1,.3,1)}'+
      '.tp-tv .stg img.b{pointer-events:none;opacity:0}'+
      '.tp-tv .x{position:absolute;right:8px;top:calc(8px + env(safe-area-inset-top,0px));width:44px;height:44px;'+
      'font-size:24px;color:rgba(245,239,230,.84)}'+
      '.tp-tv .ar{position:absolute;top:50%;width:48px;height:48px;margin-top:-24px;font-size:22px;color:rgba(245,239,230,.84)}'+
      '.tp-tv .ar.p{left:4px}.tp-tv .ar.n{right:4px}'+
      '.tp-tv .cap{display:grid;justify-items:center;gap:4px;text-align:center}'+
      '.tp-tv .po{font-size:10.5px;letter-spacing:.22em;text-transform:uppercase;color:rgba(245,239,230,.7)}'+
      '.tp-tv .nm{font-family:Cinzel,Georgia,serif;font-weight:400;font-size:20px;letter-spacing:.12em}'+
      '.tp-tv .dts{display:flex}.tp-tv .dts button{width:30px;height:44px;display:grid;place-items:center}'+
      '.tp-tv .dts i{display:block;width:7px;height:7px;border-radius:50%;background:var(--dc);opacity:.4}'+
      '.tp-tv .dts button[aria-current="true"] i{opacity:1;box-shadow:0 0 10px var(--dc)}'+
      '.tp-tv .hint{margin:0;font-size:11px;letter-spacing:.14em;color:rgba(245,239,230,.62)}'+
      'body[data-lens="witness"] .tp-tv,body[data-lens="witness"] .tp-tv .stg img{transition:none}'+
      '@media (prefers-reduced-motion:reduce){.tp-tv,.tp-tv .stg img{transition:none}}'+
      '.rc{position:relative;z-index:2;padding:10px 0 40px;min-width:0;max-width:100%;width:100%;overflow:hidden}'+
      '.rc-h{font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:#A9D097;margin:0 26px 4px 52px}'+
      '.rc-car{position:relative;display:flex;gap:14px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;'+
      'padding:16px 0 20px;perspective:900px;-webkit-overflow-scrolling:touch;overscroll-behavior-x:contain;'+
      'width:100%;max-width:100%;min-width:0;touch-action:pan-x pan-y;cursor:grab}'+
      '.rc-car.drag{cursor:grabbing;user-select:none}'+
      '.rc-car::-webkit-scrollbar{display:none}.rc-car::after{content:"";flex:0 0 calc(50% - 104px - 14px)}'+
      '.rc-card{flex:none;width:208px;scroll-snap-align:center;position:relative;border-radius:14px;padding:18px 16px 10px;'+
      'display:flex;flex-direction:column;align-items:center;text-align:center;color:#F5EFE6;'+
      'background:radial-gradient(ellipse 90% 50% at 50% 20%,color-mix(in srgb,var(--c) 32%,transparent),transparent 70%),#0F1510;'+
      'border:1px solid color-mix(in srgb,var(--c) 50%,rgba(245,239,230,.12));'+
      'transform:rotateY(var(--ry,0deg)) scale(var(--sc,1));transition:transform .15s linear}'+
      '.rc-card:first-child{margin-left:calc(50% - 104px)}'+
      '.rc-card.maya{background:#F4EEE3;color:#1E1A16;border-color:#C0392B}'+
      '.rc-card .gl{position:relative;width:74px;height:74px;margin:4px 0 12px}'+
      '.rc-card .gl svg{width:100%;height:100%;overflow:visible}'+
      '.rc-card .gl .o{fill:none;stroke:var(--lc);stroke-width:1.3}'+
      '.rc-card .gl .dsh{stroke-dasharray:3 3}'+
      '.rc-card .gl .f{fill:var(--lc)}.rc-card .gl .dk{fill:#06050A;stroke:var(--lc);stroke-width:1}'+
      '.rc-card .gl .st{fill:#F5EFE6;animation:rcTw 3s ease-in-out infinite}.rc-card .gl .st:nth-child(odd){animation-delay:-1.4s}'+
      '@keyframes rcTw{50%{opacity:.25}}'+
      '.rc-card .gl .spin{transform-box:view-box;transform-origin:30px 30px;animation:rcSpin 40s linear infinite}'+
      '.rc-card .gl .spin.r{animation-duration:26s;animation-direction:reverse}'+
      '.rc-card.walked .gl .fb{fill:var(--lc);filter:drop-shadow(0 0 8px var(--lc))}'+
      /* each system its own card */
      '.rc-card.sB{background:radial-gradient(ellipse 90% 50% at 50% 20%,color-mix(in srgb,var(--c) 30%,transparent),transparent 70%),#15100C}'+
      '.rc-card.sM{background:radial-gradient(ellipse 90% 60% at 50% 12%,color-mix(in srgb,var(--c) 36%,transparent),transparent 72%),#0D0B1A}'+
      '.rc-card.sR{background:radial-gradient(ellipse 90% 55% at 50% 18%,color-mix(in srgb,var(--c) 34%,transparent),transparent 72%),#0E0C10}'+
      '.rc-card.maya.sR{background:#F4EEE3;border-color:#C0392B}'+
      '.rc-card.c-shadow{background:radial-gradient(circle at 50% 22%,#1C1830,#040306 70%);border-color:rgba(245,239,230,.22)}'+
      '.rc-card.c-armin{background:radial-gradient(ellipse 90% 50% at 50% 18%,rgba(123,182,97,.35),transparent 70%),'+
      'linear-gradient(160deg,rgba(214,90,80,.14),rgba(217,181,49,.12),rgba(58,124,165,.14),rgba(106,61,138,.14)),#0E120C}'+
      '.rc-card.c-aatma{background:radial-gradient(ellipse 90% 55% at 50% 22%,rgba(212,169,72,.42),transparent 72%),#17120A}'+
      '.rc-card.c-lalita{background:radial-gradient(ellipse 90% 55% at 50% 22%,rgba(201,168,76,.4),transparent 72%),'+
      'radial-gradient(60% 40% at 50% 100%,rgba(232,160,182,.18),transparent 70%),#140F0C}'+
      '.rc-card .ps{font-size:11px;letter-spacing:.2em;color:rgba(245,239,230,.66)}'+
      '.rc-card h4{font-family:Lora,Georgia,serif;font-weight:400;font-size:24px;margin:4px 0 0;line-height:1.1}'+
      '.rc-card .sb{font-family:Lora,Georgia,serif;font-style:italic;font-size:15px;color:rgba(245,239,230,.74);margin-top:2px}'+
      '.rc-card.maya .ps,.rc-card.maya .sb{color:rgba(30,26,22,.7)}'+
      '.rc-card .dv{width:36px;height:1px;background:var(--lc);margin:12px 0 4px;opacity:.7}'+
      '.rc-card .lk{align-self:stretch;display:flex;flex-direction:column}'+
      '.rc-card .lk a{min-height:44px;display:flex;align-items:center;justify-content:space-between;text-decoration:none;'+
      'border-top:1px solid rgba(245,239,230,.12);font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:inherit}'+
      '.rc-card.maya .lk a{border-color:rgba(30,26,22,.14)}'+
      '.rc-card .lk a:hover,.rc-card .lk a:focus-visible{color:var(--lc)}'+
      /* D12 · a door whose page hasn't landed yet: the same row, dashed and quiet, never a link */
      '.rc-card .lk .rc-arr{min-height:44px;display:flex;align-items:center;justify-content:space-between;'+
      'border-top:1px dashed rgba(245,239,230,.16);font-size:12px;letter-spacing:.14em;text-transform:uppercase;opacity:.55}'+
      '.rc-arr small{font-size:9.5px;letter-spacing:.16em;text-transform:uppercase}'+
      '.tp-r .rc-arr{min-height:44px;display:inline-flex;align-items:center;gap:6px;padding:0 13px;'+
      'border:1px dashed rgba(245,239,230,.3);border-radius:999px;font-size:12px;opacity:.6}'+
      '.rc-card .wk{position:absolute;top:10px;right:12px;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--lc)}'+
      '.rc-card.th h4::after{content:" \u00b7 threshold";font-size:10px;letter-spacing:.16em;text-transform:uppercase;'+
      'color:rgba(245,239,230,.66);vertical-align:middle}'+
      '.rc-h span{color:rgba(245,239,230,.72);letter-spacing:.14em}'+
      '.rc-sys{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;margin:8px 0 0;padding:0 26px 0 52px}'+
      '.rc-sys::-webkit-scrollbar{display:none}'+
      '.rc-sys button{flex:none;min-height:44px;padding:0 14px;border-radius:999px;border:1px solid rgba(245,239,230,.22);'+
      'display:inline-flex;align-items:center;gap:8px;font-size:12px;letter-spacing:.08em;color:rgba(245,239,230,.8)}'+
      '.rc-sys button em{font-style:normal;color:rgba(245,239,230,.58);letter-spacing:.02em}'+
      '.rc-sys button[aria-pressed="true"]{border-color:#F5EFE6;color:#F5EFE6}'+
      '.rc-sys i{width:8px;height:8px;border-radius:50%}'+
      '.rc-sys i.sE,.rc-track i.sE{--k:#E0806F}.rc-sys i.sB,.rc-track i.sB{--k:#E8866A}.rc-sys i.sM,.rc-track i.sM{--k:#8FAEEE}.rc-sys i.sR,.rc-track i.sR{--k:#C9A84C}'+
      '.rc-sys i{background:var(--k)}'+
      '.rc-nav{display:flex;align-items:center;gap:8px;margin:2px 26px 0 52px}'+
      '.rc-ar{flex:none;width:44px;height:44px;border-radius:50%;border:1px solid rgba(245,239,230,.26);font-size:17px;color:#F5EFE6}'+
      '.rc-ar:hover,.rc-ar:focus-visible{border-color:#F5EFE6;background:rgba(245,239,230,.06)}'+
      '.rc-track{flex:1 1 auto;min-width:0;height:44px;display:flex;align-items:center;gap:3px;cursor:pointer;touch-action:none;border-radius:8px}'+
      '.rc-track:focus-visible{outline:1px solid rgba(245,239,230,.5);outline-offset:2px}'+
      '.rc-track:hover i{opacity:.55}'+
      '.rc-track i{flex:0 1 14px;height:3px;border-radius:2px;background:var(--c);opacity:.3;transition:opacity .3s,transform .3s}'+
      '.rc-track i.sB:first-of-type,.rc-track i:nth-child(10),.rc-track i:nth-child(21),.rc-track i:nth-child(30){margin-left:6px}'+
      '.rc-track i.on{opacity:1;transform:scaleY(2.4)}'+
      '.rc-now{text-align:center;margin:10px 26px 0 52px;font-family:Lora,Georgia,serif;font-style:italic;font-size:15px;'+
      'color:rgba(245,239,230,.8);min-height:1.5em}'+
      'body[data-lens="witness"] .rc-card .gl .spin,body[data-lens="witness"] .rc-card .gl .st{animation:none}'+
      '@media (prefers-reduced-motion:reduce){.rc-card .gl .spin,.rc-card .gl .st{animation:none}}'+
      'body[data-lens="witness"] .rc-card{transform:none}body[data-lens="witness"] .rc-card .gl i{animation:none}'+
      '@media (prefers-reduced-motion:reduce){.rc-card{transform:none}.rc-card .gl i{animation:none}}',
  mount:function(host,api){
    var s='';
    P.forEach(function(p,i){
      var last=i===8;
      s+='<div class="tp" data-i="'+i+'" style="--pc:'+api.readable(p[4],'#0E0A0A')+';--pg:'+
        (last?'#2A0E0E':'#'+shade(p[4]))+'">'+
        '<div class="tp-img" data-dot data-look="'+i+'">'+
          /* D6 · three sizes; a phone takes the 960, not the 1200 master */
          '<img src="/assets/tree-of-life/'+(last?'muladhara':p[0])+'-tree-960.jpg" srcset="'+ss(last?'muladhara':p[0])+
          '" sizes="(min-width:900px) 46vw, 100vw" alt="Panel '+(i+1)+
          ' — '+p[1]+' · '+p[2]+' · '+p[3]+'. Behind the tree, '+p[9]+'; the forces are written along '+
          'its branches and roots; the seed syllable is '+p[12]+'." loading="lazy">'+
          (last?'<img class="ov" src="/assets/tree-of-life/maya-tree-960.jpg" srcset="'+ss('maya')+
            '" sizes="(min-width:900px) 46vw, 100vw" alt="Panel nine — the same '+
            'drawing with the colour drained to white; the red Bindu has left the corner and sits at '+
            'the base of the trunk, where it becomes root." loading="lazy">':'')+
          '<span class="tp-dot"'+(last?' data-maya':'')+' aria-hidden="true"></span>'+
          '<button class="tp-code l" type="button" data-code="'+(last?'sleep':'wake')+'" data-p="'+i+
            '" aria-label="'+(last?'the maya-sleep code':'the wake-up code for '+p[2])+'"></button>'+
          '<button class="tp-code r" type="button" data-code="dance" data-p="'+i+
            '" aria-label="the dance code for '+p[2]+'"></button>'+
        '</div>'+
        '<div class="tp-meta">'+
          '<div class="tp-w"><span class="tp-word">'+p[5]+'</span>'+
            '<span class="tp-dec">panel '+(i+1)+' · '+p[2]+' · the decade '+p[6]+' · '+p[11]+'% light</span></div>'+
          '<p class="tp-q" data-q>“'+p[7]+'”</p>'+
          '<p class="tp-b" data-arrive>'+(last?p[8]:'Read backward: '+p[8].charAt(0).toLowerCase()+p[8].slice(1))+'</p>'+
          '<p class="tp-f"><b>'+p[9]+'</b> — '+p[10]+'. <span style="opacity:.75">Sri Vidya, '+
            'as it is taught; named, never drawn.</span></p>'+
          '<div class="tp-br"><i style="--bt:'+(13-i)+'s"></i>'+
            (i===5?'in \u00b7 see \u2014 no hold':i===6?'it breathes itself; no counts':'in four \u00b7 hold four \u00b7 out four')+
          '</div>'+
          '<div class="tp-r">'+
            '<button type="button" data-closer="'+i+'">stand closer</button>'+
            '<button type="button" data-ring="'+i+'">ring '+(i+1)+' of the Mandala \u2192</button>'+
            (arr('/sid/sid-soul-story')
              ?'<span class="rc-arr" aria-disabled="true"'+(i===7?' style="box-shadow:0 0 14px var(--pc)"':'')+
                '>Sid \u00b7 the decade '+p[6]+(i===7?' \u2014 his':'')+' <small>arriving</small></span>'
              :'<a href="/sid/sid-soul-story#chapter-'+(i+1)+'"'+(i===7?' style="box-shadow:0 0 14px var(--pc)"':'')+
                '>Sid \u00b7 the decade '+p[6]+(i===7?' \u2014 his':'')+' \u2192</a>')+
          '</div>'+
        '</div></div>'});
    /* the yantra: nine interlocking triangles (four up, five down), the bindu, two circles —
       geometry verbatim from April, viewBox -100 -100 200 200. Aniconic: geometry only. */
    var TRI=['0,-80 70,40 -70,40','0,-55 48,28 -48,28','0,-38 33,19 -33,19','0,-22 19,11 -19,11',
      '0,75 -68,-38 68,-38','0,52 -47,-26 47,-26','0,36 -32,-18 32,-18','0,20 -18,-10 18,-10','0,8 -8,-5 8,-5'];
    var yan='<div class="tp-yan" aria-hidden="true"><svg viewBox="-100 -100 200 200" aria-hidden="true">'+
      '<g fill="none" stroke="currentColor" stroke-width=".35">'+
      TRI.map(function(p,k){return '<polygon class="ln" pathLength="1" style="--k:'+k+'" points="'+p+'"/>'}).join('')+
      '<circle class="ln" pathLength="1" style="--k:9" r="88"/><circle class="ln" pathLength="1" style="--k:10" r="90"/>'+
      '<circle r="1.4" fill="currentColor"/></g></svg></div>';
    host.innerHTML=yan+s+
      '<p class="note" style="position:relative;z-index:2;padding:0 26px 30px 52px;max-width:52ch">Nine panels, one screen each, in '+
      'room order. Both codes on every panel are tappable \u2014 the panel was made to be scanned by a phone, '+
      'and the phone is holding it. Eight wake-ups, one sleep.</p>'+cards();
    /* the drawing is an enhancement: only a moving lens, with motion allowed, un-draws it
       first — and an observer (not the frame loop) draws it, so it can't stay blank */
    var yv=host.querySelector('.tp-yan');
    if(!reduced&&document.body.dataset.lens!=='witness'&&'IntersectionObserver' in window){
      yv.classList.add('draw');
      api.watch(host,function(es){es.forEach(function(e){
        if(e.isIntersecting)yv.classList.add('on')})},{threshold:0});
      setTimeout(function(){yv.classList.add('on')},12000)}
    /* the Point settles into the painted dot; leaving a panel, it says goodnight */
    var panels=[].slice.call(host.querySelectorAll('.tp'));
    if('IntersectionObserver' in window){
      panels.forEach(function(pn){api.watch(pn,function(es){es.forEach(function(e){
        var p=e.target;
        if(e.isIntersecting&&e.intersectionRatio>.4){
          api.anchor(p.querySelector('.tp-dot'));
          document.body.style.setProperty('--ac',getComputedStyle(p).getPropertyValue('--pc').trim())}
        })},{threshold:[0,.4,.8]})});
      panels.forEach(function(pn){api.watch(pn,function(es){es.forEach(function(e){
        var p=e.target,i=+p.dataset.i,b=p.querySelector('.tp-b');
        if(!e.isIntersecting&&e.boundingClientRect.top<0){
          b.classList.add('on');
          if(i<8&&window.ASG&&ASG.iloveyou){
            var pt=ASG.point;ASG.iloveyou(getComputedStyle(p).getPropertyValue('--pc').trim(),pt.x,pt.y)}}
        })},{threshold:[0,1]})})}
    /* panel nine · the dissolve. Muladhara returns, and only the colour leaves. */
    var nine=panels[8],ov=nine.querySelector('.ov'),q=nine.querySelector('[data-q]'),
        dot=nine.querySelector('[data-maya]');
    api.loop(function(){
      var r=nine.getBoundingClientRect();
      var k=Math.min(1,Math.max(0,(innerHeight*.9-r.top)/(r.height*.8)));
      ov.style.opacity=k.toFixed(3);
      dot.style.left=(90.87-41.3*k).toFixed(2)+'%';
      dot.style.top=(4.81+51.7*k).toFixed(2)+'%';
      /* and the tense turns */
      q.textContent=k>.62?'“There is never anything to fear. There was only You, playing.”'
        :k>.3?'“There was never anything to fear. There was only You, playing.”'
        :'“The earth that holds you was chosen by you.”'},
      function(){ov.style.opacity=1;dot.style.left='49.6%';dot.style.top='56.5%';
        q.textContent='“There is never anything to fear. There was only You, playing.”'});
    host.querySelectorAll('.tp-code').forEach(function(b){b.addEventListener('click',function(){
      var k=b.dataset.code,p=P[+b.dataset.p];
      if(k==='sleep'&&window.ASGsound&&ASGsound.isOn()){
        var om=ASGsound.name('tree-panel-9');
        if(om)ASG.sheet('the ninth panel','The Om',
          '<p style="font-family:Lora,serif;font-style:italic;font-size:16px">'+om+'</p>'+
          '<p style="color:rgba(245,239,230,.66)">Eight panels have a bowl. This one has none \u2014 '+
          'because the note was never added. It was what everything else was tuned to.</p>')}
      api.sheet(k==='dance'?'the dance':k==='sleep'?'the sleep':'the wake-up',p[2],
        '<p>'+(k==='sleep'?'On panel nine the left code opens <b style="font-weight:500">maya-sleep</b>. '+
          'Eight wake-ups, one sleep.'
         :k==='wake'?'The left code is this chakra\u2019s wake-up. The red Bindu sits at the centre of every '+
          'wake-up code.'
         :'The right code is this chakra\u2019s dance \u2014 one verb, and one word from you.')+'</p>'+
        door((k==='dance'?'/tree-of-life/'+cid(p[0])+'-dance':k==='sleep'?'/tree-of-life/maya-sleep'
          :'/tree-of-life/'+cid(p[0])+'-wakeup'),'open it \u2192'))})});
    var look=viewer();tilt(host);
    host.querySelectorAll('[data-look]').forEach(function(im){im.addEventListener('click',function(e){
      if(e.target.closest('.tp-code'))return;look(+im.dataset.look)})});
    host.querySelectorAll('[data-closer]').forEach(function(b){b.addEventListener('click',function(){
      look(+b.dataset.closer)})});
    host.querySelectorAll('[data-ring]').forEach(function(b){b.addEventListener('click',function(){
      var i=+b.dataset.ring,p=P[i];
      api.sheet('one drawing, two directions','Ring '+(i+1)+' \u00b7 '+p[9],
        '<p>Here you walk <b style="font-weight:500">around</b> the nine enclosures. In the Mandala you '+
        'walk <b style="font-weight:500">into</b> them \u2014 one geometry, two directions.</p>'+
        '<p style="color:rgba(245,239,230,.66)">'+p[10]+'. Named in their own terms and attributed; '+
        'the seed syllables of the 102 and the recognition gesture stay in the app.</p>'+
        '<ul><li><a href="#mandala">the Mandala, at this ring \u2192</a></li></ul>')})})},
  words:function(){return 'Nine panels printed on cloth and lit from behind, one screen each, in room '+
    'order. The Point settles into each panel\u2019s painted red dot and says goodnight eight times. '+
    'Panel one returns at the end and only its colour leaves.'},
  play:{does:'tap either code on any panel \u2014 the phone is holding the panel, so tapping is the scan',
        plain:'the same, by tap'}
});
/* the viewer — one per page, appended to body. Timers and CSS transitions only, never the frame
   loop, so it works where rAF doesn't. Keys stop here: the page's arrows step worlds. */
function viewer(){
  var d=document,FINE=matchMedia('(pointer:fine)').matches;
  var v=d.createElement('div');v.className='tp-tv';v.setAttribute('role','dialog');
  v.setAttribute('aria-modal','true');v.setAttribute('aria-label','The nine panels, closer');v.hidden=true;
  v.innerHTML='<button class="x" type="button" aria-label="Close">\u00d7</button>'+
    '<div class="stg"><img class="a" alt=""><img class="b" alt="" aria-hidden="true"></div>'+
    '<button class="ar p" type="button" aria-label="Previous panel">\u2190</button>'+
    '<button class="ar n" type="button" aria-label="Next panel">\u2192</button>'+
    '<div class="cap"><span class="po"></span><b class="nm"></b></div>'+
    '<div class="dts">'+P.map(function(p,i){return '<button type="button" data-i="'+i+
      '" aria-label="Panel '+(i+1)+' \u2014 '+p[5]+'" style="--dc:'+p[4]+'"><i></i></button>'}).join('')+'</div>'+
    '<p class="hint">swipe to walk the room \u00b7 tap to stand closer \u00b7 drag to look around</p>';
  d.body.appendChild(v);
  var q=function(s){return v.querySelector(s)},stg=q('.stg'),A=q('img.a'),B=q('img.b'),
      cur=0,z=1,px=0,py=0,back=null;
  function tf(){A.style.transform=z>1?'translate('+px+'px,'+py+'px) scale('+z+')':''}
  function show(i,first){
    i=(i+9)%9;var p=P[i];
    if(!first&&!reduced){B.src=A.src;B.style.transition='none';B.style.opacity='1';
      void B.offsetWidth;B.style.transition='opacity .55s';B.style.opacity='0'}
    cur=i;z=1;px=py=0;tf();
    A.src='/assets/tree-of-life/'+p[0]+'-tree.jpg';   /* the viewer stands close: the 1200 master */
    A.alt='Panel '+(i+1)+' \u2014 '+p[1]+' \u00b7 '+p[2]+' \u00b7 '+p[3]+', at full height';
    v.style.setProperty('--c',p[4]);
    q('.po').textContent='panel '+(i+1)+' of nine \u00b7 the decade '+p[6];
    q('.nm').textContent=p[5]+' \u00b7 '+p[2];
    [].forEach.call(v.querySelectorAll('.dts button'),function(b,k){
      b.setAttribute('aria-current',k===i?'true':'false')})}
  function open(i){back=d.activeElement;show(i,true);v.hidden=false;
    d.documentElement.style.overflow='hidden';
    setTimeout(function(){v.classList.add('on')},20);q('.x').focus()}
  function close(){v.classList.remove('on');v.hidden=true;d.documentElement.style.overflow='';
    if(back&&back.focus)back.focus({preventScroll:true})}
  q('.x').addEventListener('click',close);
  q('.ar.p').addEventListener('click',function(){show(cur-1)});
  q('.ar.n').addEventListener('click',function(){show(cur+1)});
  [].forEach.call(v.querySelectorAll('.dts button'),function(b){
    b.addEventListener('click',function(){show(+b.dataset.i)})});
  v.addEventListener('keydown',function(e){
    e.stopPropagation();
    if(e.key==='Escape')close();
    else if(e.key==='ArrowLeft'){e.preventDefault();show(cur-1)}
    else if(e.key==='ArrowRight'){e.preventDefault();show(cur+1)}
    else if(e.key==='Tab'){
      var f=[].slice.call(v.querySelectorAll('button')),k=f.indexOf(d.activeElement);
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
  return open}

/* ── harvest round four · the walkable chakras, all thirty-three, after the room ──
   Every room with a door you can stand in, each card carrying every experience it has.
   The glyph's two rings turn against each other; the carousel tilts toward its centre;
   the dots jump. Tilt is computed in the scroll handler, never on a frame. */
/* All thirty-three now — every vertebra has its practice page authored, so every one is a room
   you can stand in. Canon from data/spine.json (name · sub · colour · system). Each system has its
   own card and its own glyph; the six recognition points each have their own. */
var ROOMS=[
 [1,'bindu','Bindu','The Origin','#C9A84C','R'],[2,'muladhara','Muladhara','The Ground','#B33A2E','E'],
 [3,'svadhisthana','Svadhisthana','The Tide Below','#D8742A','E'],[4,'manipura','Manipura','The Sealed Chamber','#D9B531','E'],
 [5,'anahata','Anahata','The Sound That Was Always Playing','#6B8E4E','E'],[6,'vishuddha','Vishuddha','The Passage','#3A7CA5','E'],
 [7,'ajna','Ajna','The Third Eye','#3F3A8A','E'],[8,'sahasrara','Sahasrara','The Crown','#6A3D8A','E'],
 [9,'shadow','Shadow','The Corridor','#4A4468','R'],
 [10,'soles','Soles','Where the Soul Meets the Ground','#B33A2E','B'],[11,'forge','Forge','The Sealed Chamber','#D9B531','B'],
 [12,'prana','Prana','The Open Door','#D8742A','B'],[13,'hands','Hands','Where Love Becomes Action','#6B8E4E','B'],
 [14,'pulse','Pulse','The Constant Broadcast','#6B8E4E','B'],[15,'sonar','Sonar','The Sending','#3A7CA5','B'],
 [16,'echo','Echo','The Receiving','#3A7CA5','B'],[17,'vision','Vision','The Constructing','#D9B531','B'],
 [18,'axis','Axis','The Blink','#6C63A8','B'],[19,'crow','Crow','Crown Without the N','#6A3D8A','B'],
 [20,'armin','Armin','The Room at the End of the Corridor','#7BB661','R'],
 [21,'inception','Inception','The Seed','#6A5EC0','M'],[22,'intention','Intention','The Whole Picture','#6E68B8','M'],
 [23,'inspiration','Inspiration','The Pull','#6A7ABF','M'],[24,'insight','Insight','From Inside','#7468B0','M'],
 [25,'intuition','Intuition','The Flash','#7C66AE','M'],[26,'invention','Invention','The New Room','#8462A8','M'],
 [27,'incarnation','Incarnation','You Chose This','#8C5CA2','M'],[28,'innocence','Innocence','Before Anyone Taught You','#98589A','M'],
 [29,'integration','Integration','Nothing Was Separate','#9A5486','M'],
 [30,'maya','Maya','The Construction','#C0392B','R'],[31,'aatma','Aatma','The Soul Revealed','#D4A948','R'],
 [32,'ego-reveal','Ego Reveal','The Hidden Helper','#5D8B50','R'],[33,'lalita','Lalita','The Play','#C9A84C','R']];
var SYS={E:['Energy','the seven centres'],B:['Body','ten in the body'],M:['Mind','nine in the mind'],R:['Recognition','seven for the Tree of Life \u2014 seed to play']};
var DANCE={muladhara:1,svadhisthana:1,manipura:1,anahata:1,vishuddha:1,ajna:1,sahasrara:1,aatma:1,maya:1};
function walkedN(n){return !!(window.ASGkeys&&ASGkeys.walked(n))}   /* one key per thing (C8) */
/* one glyph per system, and one each for the six recognition points */
function glyph(r){var id=r[1],s=r[5];
  if(id==='bindu')return '<svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="26" class="o spin"/><circle cx="30" cy="30" r="5" class="f"/></svg>';
  if(id==='shadow')return '<svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="22" class="f dk"/><circle cx="23" cy="25" r="1" class="st"/><circle cx="36" cy="22" r=".8" class="st"/><circle cx="33" cy="37" r="1.1" class="st"/><circle cx="25" cy="36" r=".7" class="st"/><circle cx="30" cy="30" r="1.6" class="st"/></svg>';
  if(id==='armin')return '<svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="7" class="f"/>'+[0,45,90,135,180,225,270,315].map(function(a){var q=a*Math.PI/180;
    return '<line x1="'+(30+Math.cos(q)*12).toFixed(1)+'" y1="'+(30+Math.sin(q)*12).toFixed(1)+'" x2="'+(30+Math.cos(q)*26).toFixed(1)+'" y2="'+(30+Math.sin(q)*26).toFixed(1)+'" class="o"/>'}).join('')+'</svg>';
  if(id==='maya')return '<svg viewBox="0 0 60 60"><rect x="10" y="10" width="40" height="40" class="o"/><rect x="18" y="18" width="24" height="24" class="o spin" style="transform-origin:30px 30px"/><circle cx="30" cy="30" r="3" fill="#C0392B"/></svg>';
  if(id==='aatma')return '<svg viewBox="0 0 60 60"><polygon points="30,8 53,48 7,48" class="o"/><polygon points="30,20 43,42 17,42" class="o spin r" style="transform-origin:30px 36px"/><circle cx="30" cy="36" r="2.4" class="f"/></svg>';
  if(id==='ego-reveal')return '<svg viewBox="0 0 60 60"><circle cx="24" cy="30" r="16" class="o"/><circle cx="36" cy="30" r="16" class="o dsh"/><circle cx="30" cy="30" r="2.4" class="f"/></svg>';
  if(id==='lalita')return '<svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="26" class="o dsh spin"/><circle cx="30" cy="30" r="18" class="o spin r"/><path d="M30 18 C22 18 18 30 30 42 C42 30 38 18 30 18Z" class="o"/><circle cx="30" cy="30" r="2.4" class="f"/></svg>';
  if(s==='E')return '<svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="26" class="o dsh spin"/><circle cx="30" cy="30" r="18" class="o spin r"/><circle cx="30" cy="30" r="8" class="o fb"/></svg>';
  if(s==='B')return '<svg viewBox="0 0 60 60"><rect x="12" y="12" width="36" height="36" rx="2" class="o dsh spin" style="transform-origin:30px 30px"/><rect x="19" y="19" width="22" height="22" rx="1" class="o spin r" style="transform-origin:30px 30px;transform:rotate(45deg)"/><circle cx="30" cy="30" r="6" class="o fb"/></svg>';
  return '<svg viewBox="0 0 60 60"><polygon points="30,5 54,47 6,47" class="o dsh"/><polygon points="30,17 45,43 15,43" class="o spin r" style="transform-origin:30px 34px"/><circle cx="30" cy="34" r="5" class="o fb"/></svg>'}
function ss(stem){var b='/assets/tree-of-life/'+stem+'-tree';return b+'-480.jpg 480w, '+b+'-960.jpg 960w, '+b+'.jpg 1200w'}
/* the printed address for a panel: panel eight's file stem is "soul", its chakra is Aatma */
function cid(stem){return stem==='soul'?'aatma':stem}
/* D12 · a page that isn't live yet is a hollow row — "arriving" — never a link */
function arr(h){return !!(window.ASG&&ASG.arriving&&ASG.arriving(h))}
function door(h,label){return '<ul>'+(arr(h)
  ?'<li><span class="rc-arr" aria-disabled="true">'+label.replace(/ \u2192$/,'')+' <small>arriving</small></span></li>'
  :'<li><a href="'+h+'">'+label+'</a></li>')+'</ul>'}
function cards(){
  /* C3 dances at their printed /tree-of-life/ address · C4 Maya's sleep at its printed address ·
     C5 Aatma's wake-up (printed on panel eight, never linked) · C12 this vertebra's own page */
  function doors(r){var id=r[1],o=[['Practice','/tree-of-life/'+id+'-practice']];
    if((r[0]>=2&&r[0]<=8)||id==='aatma')o.push(['Wake-up','/tree-of-life/'+id+'-wakeup']);
    if(DANCE[id])o.push(['Dance','/tree-of-life/'+id+'-dance']);
    if(r[0]<=8)o.push(['Field','/bindu-field#'+id]);
    if(id==='maya')o.push(['Sleep','/tree-of-life/maya-sleep']);
    o.push(['This vertebra','/spine/'+r[0]+'/']);
    return o}
  /* C11 · no count about the reader: walked cards glow, and nothing says how many */
  return '<div class="rc"><p class="rc-h">Thirty-three cards \u00b7 every vertebra, walkable</p>'+
    '<div class="rc-sys" role="group" aria-label="Jump to a system">'+['E','B','M','R'].map(function(k){
      return '<button type="button" data-s="'+k+'"><i class="s'+k+'"></i>'+SYS[k][0]+' <em>'+SYS[k][1]+'</em></button>'}).join('')+'</div>'+
    '<div class="rc-car" tabindex="0" role="region" aria-label="The thirty-three walkable chakras \u2014 swipe">'+
    ROOMS.map(function(r){var lit=walkedN(r[0]),m=r[1]==='maya',lc=m?'#C0392B':ASG.readable(r[4],'#0E0A0A');
      return '<article class="rc-card s'+r[5]+' c-'+r[1]+(lit?' walked':'')+(m?' maya':'')+'" data-s="'+r[5]+'" style="--c:'+r[4]+';--lc:'+lc+'">'+
        (lit?'<span class="wk">walked</span>':'')+'<div class="gl" aria-hidden="true">'+glyph(r)+'</div>'+
        '<div class="ps">'+(r[0]<10?'0':'')+r[0]+' \u00b7 33 \u00b7 '+SYS[r[5]][0]+'</div><h4>'+r[2]+'</h4><div class="sb">'+r[3]+'</div><div class="dv"></div>'+
        '<div class="lk">'+doors(r).map(function(k){return arr(k[1])
          ?'<span class="rc-arr" aria-disabled="true"><span>'+k[0]+'</span><small>arriving</small></span>'
          :'<a href="'+k[1]+'"><span>'+k[0]+'</span><span>\u2192</span></a>'}).join('')+
        '</div></article>'}).join('')+'</div>'+
    '<div class="rc-nav"><button class="rc-ar" type="button" data-d="-1" aria-label="Previous card">\u2190</button>'+
    '<div class="rc-track" role="slider" tabindex="0" aria-label="All thirty-three cards \u2014 tap or drag along the line" aria-valuemin="1" aria-valuemax="33" aria-valuenow="1">'+ROOMS.map(function(r){return '<i class="s'+r[5]+'" style="--c:'+ASG.readable(r[4],'#0E0A0A')+'"></i>'}).join('')+'</div>'+
    '<button class="rc-ar" type="button" data-d="1" aria-label="Next card">\u2192</button></div>'+
    '<p class="rc-now" aria-live="polite"></p></div>'}
function tilt(host){
  var car=host.querySelector('.rc-car');if(!car)return;
  var cs=car.querySelectorAll('.rc-card'),tk=host.querySelectorAll('.rc-track i'),sb=host.querySelectorAll('.rc-sys button'),
      now=host.querySelector('.rc-now'),last=-1;
  function t(){var cx=car.scrollLeft+car.clientWidth/2,best=0,bd=1e9;
    [].forEach.call(cs,function(c,i){var k=(c.offsetLeft+c.clientWidth/2-cx)/(car.clientWidth||1);
      if(Math.abs(k)<bd){bd=Math.abs(k);best=i}
      if(Math.abs(k)>1.4)return;
      if(!reduced&&document.body.dataset.lens!=='witness'){
        c.style.setProperty('--ry',Math.max(-40,Math.min(40,-k*38)).toFixed(1)+'deg');
        c.style.setProperty('--sc',(1-Math.min(.12,Math.abs(k)*.14)).toFixed(3))}});
    [].forEach.call(tk,function(b,i){b.classList.toggle('on',i===best)});
    tr&&tr.setAttribute('aria-valuenow',best+1);tr&&tr.setAttribute('aria-valuetext',(best+1)+' of 33, '+ROOMS[best][2]);
    var s=ROOMS[best][5];[].forEach.call(sb,function(b){b.setAttribute('aria-pressed',b.dataset.s===s?'true':'false')});
    if(best!==last){last=best;var r=ROOMS[best];now.textContent=r[0]+' of 33 \u00b7 '+r[2]+' \u2014 '+r[3]}}
  function go(i){i=Math.max(0,Math.min(cs.length-1,i));var c=cs[i];
    car.style.scrollSnapType='none';car.scrollLeft=c.offsetLeft-(car.clientWidth-c.clientWidth)/2;
    setTimeout(function(){car.style.scrollSnapType=''},60);t()}
  [].forEach.call(sb,function(b){b.addEventListener('click',function(){
    var i=-1;ROOMS.some(function(r,k){if(r[5]===b.dataset.s){i=k;return true}});if(i>=0)go(i)})});
  [].forEach.call(host.querySelectorAll('.rc-ar'),function(b){b.addEventListener('click',function(){go(last+(+b.dataset.d))})});
  /* the line is a slider: tap or drag anywhere along it to reach any card */
  var tr=host.querySelector('.rc-track'),dragT=false;
  function atX(x){var r=tr.getBoundingClientRect();go(Math.round((x-r.left)/r.width*(cs.length-1)))}
  tr.addEventListener('pointerdown',function(e){dragT=true;try{tr.setPointerCapture(e.pointerId)}catch(_){}atX(e.clientX)});
  tr.addEventListener('pointermove',function(e){if(dragT)atX(e.clientX)});
  tr.addEventListener('pointerup',function(){dragT=false});tr.addEventListener('pointercancel',function(){dragT=false});
  tr.addEventListener('keydown',function(e){e.stopPropagation();
    if(e.key==='ArrowLeft'||e.key==='ArrowDown'){e.preventDefault();go(last-1)}
    else if(e.key==='ArrowRight'||e.key==='ArrowUp'){e.preventDefault();go(last+1)}
    else if(e.key==='Home'){e.preventDefault();go(0)}else if(e.key==='End'){e.preventDefault();go(cs.length-1)}});
  car.addEventListener('keydown',function(e){if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.stopPropagation();e.preventDefault();go(last+(e.key==='ArrowLeft'?-1:1))}});
  /* a mouse can drag the cards sideways, and a vertical wheel turns them */
  var md=false,mx=0,ms=0,moved=false;
  car.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse'||e.target.closest('a,button'))return;
    md=true;moved=false;mx=e.clientX;ms=car.scrollLeft;car.style.scrollSnapType='none';car.classList.add('drag')});
  addEventListener('pointermove',function(e){if(!md)return;var d=e.clientX-mx;if(Math.abs(d)>4)moved=true;car.scrollLeft=ms-d});
  addEventListener('pointerup',function(){if(!md)return;md=false;car.classList.remove('drag');go(last)});
  car.addEventListener('click',function(e){if(moved){e.preventDefault();e.stopPropagation();moved=false}},true);
  car.addEventListener('wheel',function(e){if(Math.abs(e.deltaY)>Math.abs(e.deltaX)&&Math.abs(e.deltaY)>4){
    var r=car.getBoundingClientRect();if(e.clientY<r.top||e.clientY>r.bottom)return;
    var atEnd=(e.deltaY>0&&last>=cs.length-1)||(e.deltaY<0&&last<=0);if(atEnd)return;
    e.preventDefault();car.scrollLeft+=e.deltaY}},{passive:false});
  car.addEventListener('scroll',t,{passive:true});addEventListener('resize',t);t();setTimeout(t,80)}

function shade(hex){ /* the room's ground under each panel: the ink, taken most of the way down */
  var c=hex.replace('#',''),r=parseInt(c.slice(0,2),16),g=parseInt(c.slice(2,4),16),b=parseInt(c.slice(4,6),16);
  return [r,g,b].map(function(v){return ('0'+Math.round(v*.22).toString(16)).slice(-2)}).join('')}

/* ── 16 · The Axis — panel ten, the one that couldn't be printed ── */
ASGfig.define('axis',{
  movement:'IV', vertebrae:[18], marks:['point','line','arc','ring'],
  reads:[],
  css:'.ax{position:relative;height:280px;border-radius:3px;overflow:hidden;cursor:pointer;'+
      'background:hsl(240 5% 3%)}'+
      '.ax svg{position:absolute;inset:0;width:100%;height:100%}'+
      '.ax .lm{fill:none;stroke:var(--axc,#6C8FE0);stroke-width:1.1;opacity:.85;'+
      'filter:drop-shadow(0 0 6px var(--axc,#6C8FE0))}'+
      '.ax .ph{fill:var(--axc,#6C8FE0);opacity:.5}'+
      '.ax .fl{position:absolute;inset:0;background:#EDE6FF;opacity:0;transition:opacity .09s}'+
      '.ax.blink .fl{opacity:.82}'+
      '.ax-c{position:absolute;left:0;right:0;bottom:0;padding:12px 14px;font-size:11.5px;'+
      'letter-spacing:.12em;text-transform:uppercase;color:rgba(245,239,230,.72);'+
      'background:linear-gradient(transparent,rgba(0,0,0,.6))}'+
      '.ax-s{display:flex;gap:8px;margin:12px 0 0;flex-wrap:wrap}'+
      '.ax-s button{min-height:44px;padding:0 14px;border:1px solid rgba(245,239,230,.28);'+
      'border-radius:999px;font-size:12.5px}'+
      '.ax-s button[aria-pressed="true"]{border-color:var(--ac);color:var(--ac)}',
  states:[['searching','#6C8FE0','89 BPM','four beliefs drop','4.5 Hz — close'],
    ['churning','#D9A93A','123 BPM','one belief drops','40 Hz — recognise'],
    ['dissolving','#F2EDE4','129 BPM','none drop. The third has no fruit.','10 Hz — rest']],
  mount:function(host,api){
    var S=this.states;
    host.innerHTML='<div class="ax" role="img" aria-label="Closed-eye darkness. Two points as two eyes, '+
      'joined by a lemniscate whose crossing opens into a heart, with phosphene trails and a neural tree '+
      'growing in the dark. Tap: the dark flashes for an instant into the Tree of Light.">'+
      '<svg viewBox="0 0 320 280" aria-hidden="true">'+
        '<path class="lm" d="M96 132 C96 104 138 104 152 132 C166 160 208 160 208 132 '+
          'C208 104 166 104 152 132 C138 160 96 160 96 132 Z"/>'+
        '<path class="lm" d="M152 132 C142 118 122 124 130 142 C136 156 152 166 152 176 '+
          'C152 166 168 156 174 142 C182 124 162 118 152 132 Z" opacity=".55"/>'+
        '<path class="lm" d="M152 176 L152 246 M152 208 L124 232 M152 208 L182 232 '+
          'M152 230 L136 250 M152 230 L170 250" opacity=".4"/>'+
        '<circle class="ph" cx="96" cy="132" r="2.6"/><circle class="ph" cx="208" cy="132" r="2.6"/>'+
        '<circle class="ph" cx="152" cy="132" r="1.8"/>'+
      '</svg><span class="fl" aria-hidden="true"></span>'+
      '<div class="ax-c" id="axc">the dark after the room \u00b7 tap anywhere</div></div>'+
      '<div class="ax-s">'+S.map(function(s,i){return '<button type="button" aria-pressed="'+
        (i===0?'true':'false')+'" data-s="'+i+'">'+s[0]+'</button>'}).join('')+'</div>'+
      '<p class="note">While the nine panels bring you back, the Axis leaves you in. Three expressions, '+
      'one mechanism: the blink. At the foot, once: Sakshi sits here.</p>';
    var box=host.querySelector('.ax'),cap=host.querySelector('#axc');
    function blink(){if(reduced)return;box.classList.add('blink');
      setTimeout(function(){box.classList.remove('blink')},110)}
    box.addEventListener('click',blink);
    host.querySelectorAll('.ax-s button').forEach(function(b){b.addEventListener('click',function(){
      var s=S[+b.dataset.s];
      host.querySelectorAll('.ax-s button').forEach(function(o){o.setAttribute('aria-pressed','false')});
      b.setAttribute('aria-pressed','true');
      box.style.setProperty('--axc',s[1]);
      cap.textContent=s[0]+' \u00b7 '+s[2]+' \u00b7 '+s[3]+' \u00b7 '+s[4];
      blink()})})},
  words:function(){return 'Two points as two eyes joined by a lemniscate whose crossing opens into a '+
    'heart, in closed-eye darkness. Tap and the dark flashes into the Tree of Light.'},
  play:{does:'the blink \u2014 tap anywhere',plain:'tap; the three states are buttons'}
});

/* ── 17 · The Three Trees — where the room sits ── */
ASGfig.define('threetrees',{
  movement:'IV', vertebrae:'all', marks:['line','triangle','ring'],
  reads:[],
  css:'.tt{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin:4px 0 0}'+
      '.tt button{border:1px solid rgba(245,239,230,.2);border-radius:3px;padding:12px 10px;'+
      'min-height:44px;text-align:left}'+
      '.tt button[aria-pressed="true"]{border-color:var(--ac)}'+
      '.tt svg{width:100%;height:92px;color:var(--ac)}'+
      '.tt b{display:block;font-weight:400;font-size:12.5px;margin-top:8px;color:rgba(245,239,230,.84)}'+
      '.tt i{display:block;font-size:11px;font-style:normal;color:rgba(245,239,230,.6);margin-top:2px}'+
      '.tt-o{font-family:Lora,Georgia,serif;font-style:italic;font-size:15.5px;min-height:3em;'+
      'margin:12px 0 0;color:rgba(245,239,230,.84)}',
  mount:function(host,api){
    var T=[['Soul Tree','rising \u00b7 panels 1\u20137 \u00b7 stillness',
        '<path d="M50 88 L50 20 M50 52 L26 34 M50 52 L74 34 M50 34 L34 20 M50 34 L66 20" '+
        'fill="none" stroke="currentColor" stroke-width="1.2"/>','1,2,3,4,5,6,7'],
      ['Maya Tree','dissolving inward \u00b7 panel 9 \u00b7 recognition',
        '<path d="M50 20 L50 88 M50 44 C34 44 26 60 34 74 M50 44 C66 44 74 60 66 74" '+
        'fill="none" stroke="currentColor" stroke-width="1.2" opacity=".7"/>'+
        '<circle cx="50" cy="62" r="2.4" fill="#C0392B"/>','30'],
      ['Bindu Tree','radiating outward \u00b7 the Axis and the body',
        '<circle cx="50" cy="52" r="3" fill="currentColor"/>'+
        '<path d="M50 52 L50 16 M50 52 L50 88 M50 52 L18 34 M50 52 L82 34 M50 52 L22 74 M50 52 L78 74" '+
        'fill="none" stroke="currentColor" stroke-width="1" opacity=".6"/>','18']];
    host.innerHTML='<div class="tt">'+T.map(function(t,i){
      return '<button type="button" aria-pressed="false" data-t="'+i+'">'+
        '<svg viewBox="0 0 100 92" aria-hidden="true">'+t[2]+'</svg><b>'+t[0]+'</b><i>'+t[1]+'</i></button>'}).join('')+
      '</div><p class="tt-o" aria-live="polite">Three trees growing three ways from one ground \u2014 and '+
      'outside all three, holding the space: Bindu, the Axis, Shadow \u2192 Armin, Maya \u2192 Aatma.</p>';
    var out=host.querySelector('.tt-o');
    host.querySelectorAll('.tt button').forEach(function(b){b.addEventListener('click',function(){
      host.querySelectorAll('.tt button').forEach(function(o){o.setAttribute('aria-pressed','false')});
      b.setAttribute('aria-pressed','true');
      var t=T[+b.dataset.t],vs=t[3].split(',').map(Number);
      out.textContent=t[0]+' \u2014 '+t[1]+'. It lights '+
        (t[3]==='18'?'the Axis, and the body chakras, back up the page.'
         :vs.length>1?'panels '+vs[0]+' to '+vs[vs.length-1]+', back up the page.'
         :'panel nine. Aatma, the bridge, lights from both.');
      /* the room's panels that belong to this tree light, back up the page */
      var tree=document.getElementById('tree');
      if(tree)tree.querySelectorAll('.tp').forEach(function(pn,i){
        var on=vs.indexOf(i+1)>=0||(t[3]==='30'&&i===8)||(t[3]==='18');
        pn.style.filter=on?'':'saturate(.35) brightness(.72)'})})})},
  words:function(){return 'Three trees growing three ways from one ground: the Soul Tree rising, the Maya '+
    'Tree dissolving inward, the Bindu Tree radiating outward \u2014 and six structural chakras outside all three.'},
  play:{does:'tap a tree and the room\u2019s panels that belong to it light, back up the page',plain:'tap'}
});

/* ── 18 · The Temple Guide — how to stand in the room ── */
ASGfig.define('templeguide',{
  movement:'IV', vertebrae:[31], marks:['line','triangle'],
  reads:[],
  css:'.tg{position:relative;width:100%;max-width:280px;margin:0 auto}'+
      '.tg svg{width:100%;height:auto;color:var(--ac)}'+
      '.tg path,.tg line{fill:none;stroke:currentColor;stroke-width:1.3;stroke-linecap:round}'+
      '.tg .tri{stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset 1s ease-in-out}'+
      '.tg .tri.on{stroke-dashoffset:0}'+
      '.tg-s{display:flex;gap:8px;margin:14px 0 0;flex-wrap:wrap}'+
      '.tg-s button{min-height:44px;padding:0 16px;border:1px solid var(--ac);border-radius:999px;'+
      'font-size:13px;color:var(--ac);font-family:Cinzel,Georgia,serif;letter-spacing:.1em}',
  mount:function(host,api){
    /* a standing body, feet apart, arms open, and the triangle drawn over it */
    host.innerHTML='<div class="tg"><svg viewBox="0 0 200 230" role="img" aria-label="A standing body, '+
      'feet apart and arms open, with a triangle drawn over it — the shape the body makes.">'+
      '<circle cx="100" cy="34" r="13" fill="none" stroke="currentColor" stroke-width="1.3"/>'+
      '<line x1="100" y1="47" x2="100" y2="138"/>'+
      '<line x1="100" y1="72" x2="44" y2="46"/><line x1="100" y1="72" x2="156" y2="46"/>'+
      '<line x1="100" y1="138" x2="58" y2="208"/><line x1="100" y1="138" x2="142" y2="208"/>'+
      '<path class="tri" pathLength="1" d="M100 24 L156 208 L44 208 Z" opacity=".85"/>'+
      '</svg></div><div class="tg-s">'+
      ['Stand','Open','Receive'].map(function(w,i){return '<button type="button" data-w="'+i+'">'+w+'</button>'}).join('')+
      '</div><p class="note">Three strokes, one per word. The triangle the body makes here is panel '+
      'eight\u2019s triangle, and the triangle that draws itself over the dissolved Maya. The body, the soul '+
      'panel and the passage are one shape. Glyph \u25b3.</p>';
    var tri=host.querySelector('.tri'),n=0;
    host.querySelectorAll('.tg-s button').forEach(function(b){b.addEventListener('click',function(){
      n=Math.min(3,n+1);
      tri.style.strokeDashoffset=String(1-n/3);
      if(n===3)tri.classList.add('on')})})},
  resolve:function(host){var t=host&&host.querySelector('.tri');if(t)t.classList.add('on')},
  words:function(){return 'A standing body, feet apart, arms open, and the triangle drawn over it. '+
    'Three strokes: Stand. Open. Receive.'},
  play:{does:'the triangle traces itself, one stroke per word',plain:'three buttons'}
});
})();
