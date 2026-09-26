/* ─────────────────────────────────────────────────────────────
   access.js — three accessibility repairs every figure needs, applied once after the figures mount.
   Found by axe-core in Design's own build (and still true in every figure written since):

   1 · a role="img" wrapper that holds controls is not an image: a screen reader is told "image" and
       the buttons inside go silent (nested-interactive). It becomes a named group.
   2 · an <svg role="img" aria-label=""> is an image with no name (svg-img-alt). Where the label is
       empty the drawing is decoration beside words that already say it: it leaves the tree.
   3 · a strip that scrolls sideways with nothing focusable inside cannot be scrolled from a keyboard
       (scrollable-region-focusable). It takes focus, and says what it is.

   Loaded by the homepage (inlined) and every gateway; ASGaccess.run(root) is idempotent.
   ───────────────────────────────────────────────────────────── */
(function(){
if(window.ASGaccess)return;
var FOCUS='a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"])';
function run(root){
  root=root||document;
  [].forEach.call(root.querySelectorAll('[role="img"]'),function(e){
    if(e.querySelector(FOCUS))e.setAttribute('role','group')});
  [].forEach.call(root.querySelectorAll('svg[role="img"]'),function(e){
    var l=e.getAttribute('aria-label');
    if(l===null||!l.trim()){e.removeAttribute('role');e.setAttribute('aria-hidden','true')}});
  [].forEach.call(root.querySelectorAll('div,nav,ul,section'),function(e){
    if(e.hasAttribute('tabindex')||e.querySelector(FOCUS))return;
    if(e.scrollWidth<=e.clientWidth+1)return;
    var ox=getComputedStyle(e).overflowX;if(ox!=='auto'&&ox!=='scroll')return;
    e.setAttribute('tabindex','0');
    if(!e.getAttribute('aria-label'))e.setAttribute('aria-label','scroll sideways for more');
    if(!e.getAttribute('role'))e.setAttribute('role','region')})}
window.ASGaccess={run:run};
function later(){run();setTimeout(run,900)}
if(document.readyState==='complete')later();else addEventListener('load',later);
})();
