/* ─────────────────────────────────────────────────────────────
   movements/V-instruments.js — Movement V · the one moving part the stalls carry.

   Bindu Field's chamber: rings on still water (v2's ripple canvas), made literal to the
   instrument. The two ears are two sources ringing at periods a few per cent apart, so
   their rings meet and interfere in the space between them — the beat happens in neither
   ear. Touch the mark and a third ring drops where you touched, and passes.
   A backdrop: out of flow, aria-hidden, takes no touch itself (the mark takes it).
   ───────────────────────────────────────────────────────────── */
(function(){
"use strict";
var reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
function rgba(h,a){h=h.replace('#','');return 'rgba('+parseInt(h.slice(0,2),16)+','+
  parseInt(h.slice(2,4),16)+','+parseInt(h.slice(4,6),16)+','+a+')'}
function field(){
  var sec=document.getElementById('fieldapp');if(!sec)return;
  var mark=sec.querySelector('.mark'),ears=sec.querySelector('.m-ears');if(!mark||!ears)return;
  var C=(sec.dataset.c||'#8FCBD8'),P=['#8FCBD8','#F2D98A','#CDB0EE','#EE9377'];
  var cv=document.createElement('canvas');cv.className='m-rip';cv.setAttribute('aria-hidden','true');
  mark.insertBefore(cv,mark.firstChild);
  /* the two sources sit on the two ears; periods 2300 and 2420 ms — close, not equal */
  var SRC=[{x:.24,y:.5,per:2300,c:C,fixed:1},{x:.76,y:.5,per:2420,c:C,fixed:1}];
  function draw(t){
    var x=ASG.fitc(cv),w=cv.clientWidth,h=cv.clientHeight;
    x.clearRect(0,0,w,h);x.globalCompositeOperation='lighter';x.lineWidth=1;
    SRC=SRC.filter(function(s){return s.fixed||t-s.t0<6000});
    SRC.forEach(function(s){
      for(var k=0;k<4;k++){
        var age=s.fixed?((t%s.per)+k*s.per):((t-s.t0)-k*650),life=s.fixed?s.per*4:5000;
        if(age<0||age>life)continue;
        var r=age*.032,a=(1-age/life)*(s.fixed?.5:.7);
        x.strokeStyle=rgba(s.c,a.toFixed(3));
        x.beginPath();x.arc(s.x*w,s.y*h,r,0,6.283);x.stroke()}});
    x.globalCompositeOperation='source-over'}
  mark.addEventListener('pointerdown',function(e){
    var r=cv.getBoundingClientRect();
    SRC.push({x:(e.clientX-r.left)/r.width,y:(e.clientY-r.top)/r.height,t0:performance.now(),
      c:P[(Math.random()*P.length)|0]});
    if(SRC.length>8)SRC.splice(2,1);
    if(reduced)draw(performance.now())});
  ASG.loop(sec,function(t){if(!reduced&&document.body.dataset.lens!=='witness')draw(t)},
    function(){draw(3000)});
  requestAnimationFrame(function(){draw(3000)})}
function boot(){try{field()}catch(e){
  document.documentElement.setAttribute('data-v-fail','field: '+(e&&e.message||e))}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
