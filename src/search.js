/* ─────────────────────────────────────────────────────────────
   search.js — one word you're carrying (EDGES §2). Shared by /search/ and the 404.

   The index (/search/index.json, generated from the register by tools/v3/edges.py) is fetched
   once, on first need. It reads every live page's title, its line, its topic, its world, its lake
   and form, its people — and every dance's verb, song and seed question, so *enough* finds the
   dance, the reading and the teachings that answer it.

   It never says how many it found: count in private. Twelve at a time, the rest on request.
   ───────────────────────────────────────────────────────────── */
(function(){
"use strict";
var IDX=null,WAIT=[];
function load(cb){
  if(IDX)return cb(IDX);WAIT.push(cb);if(WAIT.length>1)return;
  fetch('/search/index.json').then(function(r){return r.json()}).then(function(j){
    IDX=j;WAIT.splice(0).forEach(function(f){f(IDX)})}).catch(function(){
    IDX={pages:[],worlds:{}};WAIT.splice(0).forEach(function(f){f(IDX)})})}
function norm(s){return String(s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'')}
function words(s){return norm(s).split(/[^a-z0-9]+/).filter(function(w){return w.length>1})}
/* score one page against the words: its title counts most, then what names it (verb, song, topic),
   then its line. A word must appear somewhere for the page to count at all. */
function score(p,ws){
  var t=norm(p.t),n=norm([p.topic,p.song,p.artist,p.seed,p.world,p.g,p.f,(p.p||[]).join(' ')].join(' ')),s=norm(p.s),sc=0;
  for(var i=0;i<ws.length;i++){var w=ws[i],hit=0;
    if(t===w)hit=12;else if(new RegExp('\\b'+w).test(t))hit=7;else if(t.indexOf(w)>=0)hit=4;
    if(new RegExp('\\b'+w).test(n))hit+=3;
    if(new RegExp('\\b'+w).test(s))hit+=1;
    if(!hit)return 0;sc+=hit}
  return sc+(p.k==='world'?2:0)}
function find(q,idx){
  var ws=words(q);if(!ws.length)return [];
  return idx.pages.map(function(p){return {p:p,s:score(p,ws)}}).filter(function(x){return x.s>0})
    .sort(function(a,b){return b.s-a.s}).map(function(x){return x.p})}
/* the nearest dance: the one whose verb or seed shares the most letters in a row with the word */
function tri(s){s=' '+norm(s)+' ';var o={};for(var i=0;i<s.length-2;i++)o[s.substr(i,3)]=1;return o}
function sim(a,b){var A=tri(a),B=tri(b),n=0,m=0;for(var k in A){m++;if(B[k])n++}return m?n/m:0}
function nearestDance(q,idx){
  var best=null,bs=-1;idx.pages.forEach(function(p){if(p.w!=='dances'||!p.verb)return;
    var s=Math.max(sim(q,p.verb),sim(q,p.seed||'')*.8);if(s>bs){bs=s;best=p}});return best}
/* the nearest pages to an address that doesn't exist: its words, loosely (the 404) */
function nearestTo(path,idx,n){
  var ws=words(path.replace(/\.html?$/,'').replace(/[-_/.]+/g,' ')).filter(function(w){return w.length>2});
  var out=[],hays=idx.pages.map(function(p){return norm(p.h+' '+p.t+' '+(p.topic||'')+' '+(p.verb||''))});
  /* a rare word is worth more than a common one: "pulse" says more than "tree" or "life" */
  var wt=ws.map(function(w){var re=new RegExp('\\b'+w),df=0;hays.forEach(function(h){if(re.test(h))df++});
    return df?Math.log(1+hays.length/df):0});
  idx.pages.forEach(function(p,i){var sc=0;
    ws.forEach(function(w,j){if(new RegExp('\\b'+w).test(hays[i]))sc+=wt[j]});
    if(sc)out.push({p:p,s:sc+(p.k==='world'?.3:0)+(p.k==='vertebra'?.2:0)})});
  return out.sort(function(a,b){return b.s-a.s}).slice(0,n||3).map(function(x){return x.p})}
function esc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;')}
/* a small dot on the spine at its vertebra: thirty-three places on one hairline */
function spineDot(p){
  var v=(p.v&&p.v.length&&p.v.length<33)?p.v[0]:0;
  return '<span class="sr-sp" aria-hidden="true">'+(v?'<i style="left:'+((v-1)/32*100).toFixed(1)+'%"></i>':'')+'</span>'}
function row(p){
  return '<li><a class="sr-row" href="'+esc(p.h)+'" style="--m:'+esc(p.m||p.c)+'"><i class="mk"></i>'+
    '<span class="nm">'+esc(p.t)+'</span><span class="ln">'+esc(p.s||'')+'</span>'+spineDot(p)+'</a></li>'}
/* grouped by world, each with its colour: the order of the groups is the order of their best page */
function render(host,list,idx,shown){
  var groups=[],by={};
  list.slice(0,shown).forEach(function(p){var k=p.w||'_';
    if(!by[k]){by[k]={w:k,items:[]};groups.push(by[k])}by[k].items.push(p)});
  host.innerHTML=groups.map(function(g){var W=idx.worlds[g.w]||{n:'the site',c:'#8A6F1E'};
    return '<section class="sr-g"><h2 style="--m:'+esc(W.m||W.c)+'"><i></i>'+esc(W.n)+'</h2><ul>'+
      g.items.map(row).join('')+'</ul></section>'}).join('')}

window.ASGsearch={load:load,find:find,nearestDance:nearestDance,nearestTo:nearestTo,render:render,row:row,esc:esc};
})();
