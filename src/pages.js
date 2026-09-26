/* ─────────────────────────────────────────────────────────────
   pages.js — the living layer of the pages Design never drew: the floors, the spine and its
   thirty-three, the Mandala's enclosures. Built from the gateway's own kit (gateway.css), so they
   belong to the same house.

   The page is complete in its served markup — every row a link, every block in its order
   (ASSEMBLY §10). This only does three things, all enhancement:
     · twelve rows a screen, the rest on request (never a wall)
     · the facet chips — "the other way down" — narrow the rows in place
     · the die, scoped to this page: it lands on one of the page's own open rows
   Nothing here counts the reader.
   ───────────────────────────────────────────────────────────── */
(function(){
"use strict";
var d=document;
function $(s,r){return (r||d).querySelector(s)}
function $$(s,r){return [].slice.call((r||d).querySelectorAll(s))}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;')}

/* ── the rows: twelve a screen, the rest on request ── */
$$('[data-rows]').forEach(function(ul){
  var all=$$(':scope > li',ul),shown=+ul.getAttribute('data-rows')||12,facet='';
  var host=ul.parentNode,more=null;
  function paint(){
    var vis=all.filter(function(li){return !facet||li.getAttribute('data-f')===facet});
    all.forEach(function(li){li.hidden=true});
    vis.forEach(function(li,i){li.hidden=i>=shown});
    if(more){more.remove();more=null}
    if(vis.length>shown){
      more=d.createElement('button');more.type='button';more.className='gw-more';
      more.textContent='the other '+(vis.length-shown)+' — show them';
      more.addEventListener('click',function(){shown=1e6;paint()});
      ul.parentNode.insertBefore(more,ul.nextSibling)}}
  /* the other way down: the chips for this list (the one the page names) */
  var chips=$$('[data-facets="'+ul.id+'"] button[data-f]');
  chips.forEach(function(b){b.addEventListener('click',function(){
    facet=b.getAttribute('data-f');shown=+ul.getAttribute('data-rows')||12;
    chips.forEach(function(o){o.setAttribute('aria-pressed',o===b?'true':'false')});
    paint()})});
  paint()});

/* ── the sheet: the gateway's own, built once ── */
var sheet=null;
function open(kind,title,html){
  if(!sheet){
    sheet=d.createElement('div');sheet.className='gw-sheet';sheet.setAttribute('role','dialog');
    sheet.setAttribute('aria-hidden','true');sheet.setAttribute('aria-label',kind);
    sheet.innerHTML='<button class="x" type="button" aria-label="Close">×</button>'+
      '<div class="k"></div><h3></h3><div class="b"></div>';
    d.body.appendChild(sheet);
    $('.x',sheet).addEventListener('click',close);
    addEventListener('keydown',function(e){if(e.key==='Escape')close()})}
  $('.k',sheet).textContent=kind;$('h3',sheet).textContent=title;$('.b',sheet).innerHTML=html;
  sheet.classList.add('on');sheet.setAttribute('aria-hidden','false');
  var a=$('.b a',sheet);if(a)a.focus()}
function close(){if(sheet){sheet.classList.remove('on');sheet.setAttribute('aria-hidden','true')}}

/* ── the die, scoped to this page: its own open rows; with none, every world ── */
var die=$('#pgDie');
if(die)die.addEventListener('click',function(){
  var pool=$$('[data-pool] a[href]').filter(function(a){return a.getAttribute('href').charAt(0)==='/'});
  var where=die.getAttribute('data-where')||'this page';
  if(!pool.length){location.href='/door/';return}
  var a=pool[(Math.random()*pool.length)|0];
  var t=($('b',a)||a).textContent;
  open('the field chose',t,'<p>Rolled from inside '+esc(where)+' — it can land on any of its open pages.</p>'+
    '<ul><li><a href="'+a.getAttribute('href')+'">go there →</a></li>'+
    '<li><button type="button" data-again>not this one — roll again</button></li></ul>');
  var ag=$('[data-again]',sheet);if(ag)ag.addEventListener('click',function(){die.click()})});

window.ASGpages={open:open,close:close};
})();
