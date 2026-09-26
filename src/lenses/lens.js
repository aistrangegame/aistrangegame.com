/* ─────────────────────────────────────────────────────────────
   lenses/lens.js — the lens registry and the switch.

   A lens is a RENDERING LAYER. It changes material treatment, light, depth,
   motion character, the rail's drawing, the seams, the Sky transition and the
   Point's presence. It never changes content, the laws, positions, or what a
   figure reads. New lenses are added here and in lenses/<name>.css — never in
   the worlds themselves.

   A figure asks the lens how to draw (api.lens); it never asks which lens it is.
   ───────────────────────────────────────────────────────────── */
(function(){
var LENSES={
  hand:{nm:'Hand', state:'Someone made this, by hand, for you.',
    ease:.12, boil:true,  rail:'ticks',         seam:'dissolve', point:'mark',      depth:false,
    material:function(m){return m}, light:{dir:'top-left',soft:.8,emit:0}, motion:'boil'},
  light:{nm:'Light', state:'You are inside an instrument, and it is on.',
    ease:.18, boil:false, rail:'colour-thread', seam:'bleed',    point:'source',    depth:false,
    material:function(m){return m}, light:{dir:'behind',soft:.2,emit:1}, motion:'emit'},
  depth:{nm:'Depth', state:'You are travelling, not reading.',
    ease:.09, boil:false, rail:'five-mark',     seam:'travel',   point:'character', depth:true,
    material:function(m){return m}, light:{dir:'top-left',soft:.5,emit:.4}, motion:'travel'},
  witness:{nm:'Witness', state:'It was already finished when you arrived.',
    ease:1,   boil:false, rail:'ticks',         seam:'cut',      point:'witnessed', depth:false,
    material:function(m){return m}, light:{dir:'none',soft:1,emit:0}, motion:'settled'}
};
var ORDER=['hand','light','depth','witness'];
var KEY='asg.lens';           /* only a lens chosen from the control is remembered (C8: was asg.home.lens.chosen) */
var cur='hand';

function read(){
  var q=new URLSearchParams(location.search).get('lens');   /* a per-URL override, never stored */
  if(LENSES[q])return q;
  try{var s=localStorage.getItem(KEY);if(LENSES[s])return s}catch(e){}
  return 'hand';                                            /* the lens a stranger meets first */
}
/* the world under the middle of the screen, and how far its top sits from the screen's top */
function anchor(){
  var zs=document.querySelectorAll('[data-world]'),m=innerHeight/2;
  for(var i=0;i<zs.length;i++){var r=zs[i].getBoundingClientRect();if(r.top<=m&&r.bottom>m)return {e:zs[i],t:r.top}}
  return null}
function hold(a){           /* a lens restyles heights; put the same world back at the same offset */
  if(!a)return;var dy=a.e.getBoundingClientRect().top-a.t;
  if(Math.abs(dy)>1)window.scrollTo({top:scrollY+dy,behavior:'instant'})}
function set(k,remember){
  if(!LENSES[k])return;
  var a=document.body.dataset.lens&&document.body.dataset.lens!==k?anchor():null;
  cur=k;document.body.dataset.lens=k;
  hold(a);requestAnimationFrame(function(){hold(a);setTimeout(function(){hold(a)},450)});
  var nm=document.getElementById('lensNm');if(nm)nm.textContent=LENSES[k].nm;
  if(remember){try{localStorage.setItem(KEY,k)}catch(e){}}
  /* switching keeps you exactly where you are — same world, same place in it */
  if(window.ASG&&ASG.onLens)ASG.onLens(LENSES[k]);
}
/* Depth is the one lens with its own scroll model; its distances live here, not in the worlds */
function scrollModel(){
  if(!LENSES[cur].depth)return;
  var zs=document.querySelectorAll('[data-world]');
  for(var i=0;i<zs.length;i++){var r=zs[i].getBoundingClientRect();
    var d=Math.min(1,Math.abs((r.top+r.height/2)-innerHeight/2)/(innerHeight*1.1));
    zs[i].style.setProperty('--d',d.toFixed(3))}
}
window.ASGlens={
  all:LENSES, order:ORDER,
  get:function(){return LENSES[cur]}, name:function(){return cur},
  set:set, read:read, scrollModel:scrollModel
};
})();
