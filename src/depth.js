/* ─────────────────────────────────────────────────────────────
   depth.js — the wall (open with depth). The same few lines on every generated page.

   A page is whole for anyone. This asks the private door about this page's own address
   (/api/private/<slug>); the door answers only a request carrying a verified Cloudflare Access session,
   and everyone else gets the same bare 404 any unknown address gets — on every page alike, so nothing
   marks a page that has depth. The answer says where each piece goes (a block's title, a row's label);
   the page's own markup carries no slot, no attribute, no hint.
   Only after a verified 200 does it place the depth and set one quiet mark after the
   title — a thin line under it (not the Point's light, not the Codex's rings) — that the page is carrying more. Nothing here reads
   a local flag, storage or the query: the mark can't be made to appear by anything but the door.
   ───────────────────────────────────────────────────────────── */
(function(){
"use strict";
var d=document;
if(!window.fetch)return;
/* the page's key: the same slug the link previews use (tools/v3/kit.py slug) */
var p=location.pathname.replace(/^\/+|\/+$/g,'').replace(/\.html$/,'');
var key=p?p.toLowerCase().replace(/\//g,'--').replace(/[^a-z0-9-]+/g,'-').replace(/^-+|-+$/g,''):'home';
if(!/^[a-z0-9-]{1,80}$/.test(key))return;
function txt(e){return (e&&e.textContent||'').replace(/\s+/g,' ').trim().toLowerCase()}
function place(list){
  var n=0,main=d.querySelector('main:not(#gwStatic)')||d.body;
  list.forEach(function(x){
    if(x.after){   /* a finished page: after the element whose whole text is the anchor */
      var a=[].filter.call(d.body.querySelectorAll('p,li,div,h2,h3'),function(e){return txt(e)===String(x.after).toLowerCase()})[0];
      if(a&&!(a.nextElementSibling&&a.nextElementSibling.classList.contains('dp'))){
        var q=d.createElement('p');q.className='dp';q.textContent=x.text;a.parentNode.insertBefore(q,a.nextSibling);n++}
      return}
    [].forEach.call(main.querySelectorAll('.gw-bh'),function(h){
      if(txt(h)!==String(x.block).toLowerCase())return;
      var st=h.nextElementSibling;if(!st||!st.classList.contains('gw-state'))return;
      [].forEach.call(st.children,function(row){
        if(txt(row.querySelector('b'))!==String(x.row).toLowerCase()||row.querySelector('.dp'))return;
        var s=d.createElement('span');s.className='dp';s.textContent=x.text;row.appendChild(s);n++})})});
  if(!n)return;
  var st=d.createElement('style');
  /* the page's own ink (a light band or a dark one), a step quieter; and the mark: a thin line under the title */
  st.textContent='p.dp{font-style:italic;opacity:.86}.gw-state div>.dp{grid-column:1/-1;display:block;margin-top:4px;padding-top:8px;opacity:.86;'+
    'border-top:1px dashed color-mix(in oklab,currentColor 30%,transparent);white-space:pre-wrap;font-size:13.5px;line-height:1.6}'+
    '.dp-on::after{content:"";display:block;width:34px;height:1px;margin-top:12px;background:var(--gw-acc-ink,#C9A84C)}'+
    '.dp-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}';
  d.head.appendChild(st);
  var h=main.querySelector('.gw-name')||d.querySelector('h1');
  if(h&&!h.classList.contains('dp-on')){h.classList.add('dp-on');
    var m=d.createElement('span');m.className='dp-sr';m.textContent=' (carrying more)';h.appendChild(m)}}
function ask(){
  fetch('/api/private/'+key,{credentials:'same-origin',cache:'no-store',headers:{accept:'application/json'}})
    .then(function(r){return r.status===200?r.json():null})
    .then(function(j){if(Array.isArray(j))place(j)})
    .catch(function(){})}
if(d.readyState==='complete')setTimeout(ask,0);else addEventListener('load',function(){setTimeout(ask,0)});
})();
