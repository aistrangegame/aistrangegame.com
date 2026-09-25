/* ─────────────────────────────────────────────────────────────
   keys.js — one key per thing (C8 · STATE-AND-GROWTH Part 1).

   One namespace, `asg.`, and each thing has exactly one key. The legacy names are
   READ once per page load — copied into the new key when the new key is empty — and
   never written again. They are not deleted: the finished pages that wrote them (the practice pages,
   the dances) still read their own, and a lost memory there would be a subtraction.

     sound        asg.sound        ← asg_sound
     lens         asg.lens         ← asg.home.lens.chosen
     where you    asg.departure    ← asg_departure · asg_arrival (sessionStorage)
       left
     walked       asg.walked.<id>  ← chakra-<id> · asg.practice.<id> · asg.practice.<n>
     the Point    asg.point        ← bindu-point
     your name    asg.essence      ← bindu-essence   (the Game's own pages only; nothing here reads it)
     your visits  asg.visit        (new, Stage B) {at, last}: when this visit began, and when the one before
                                   it did — a visit ends after 45 minutes away, the homepage's own measure.
                                   Only the Now page reads it, to mark what arrived since; it describes the
                                   things, never the reader, and it is never sent anywhere.

   Memory, never permission: nothing below hides, locks, orders or gates anything.
   Every storage call is wrapped — a private window, blocked storage or a thumbnail
   capture must never stop a page from rendering.

   thread.js carries a generated copy of this file between its @keys markers, so a
   page that loads only the seam migrates too. Edit HERE; the builder copies it.
   ───────────────────────────────────────────────────────────── */
(function(){
if(window.ASGkeys)return;
var L,S;try{L=window.localStorage;S=window.sessionStorage}catch(e){}
function get(st,k){try{return st?st.getItem(k):null}catch(e){return null}}
function set(st,k,v){try{if(st)st.setItem(k,v)}catch(e){}}
var IDS=['bindu','muladhara','svadhisthana','manipura','anahata','vishuddha','ajna','sahasrara','shadow',
  'soles','forge','prana','hands','pulse','sonar','echo','vision','axis','crow','armin','inception',
  'intention','inspiration','insight','intuition','invention','incarnation','innocence','integration',
  'maya','aatma','ego-reveal','lalita'];
var PAIRS=[['asg.sound','asg_sound'],['asg.lens','asg.home.lens.chosen'],['asg.point','bindu-point'],
  ['asg.essence','bindu-essence']];
function migrate(){
  PAIRS.forEach(function(p){var o=get(L,p[1]);if(o!==null&&get(L,p[0])===null)set(L,p[0],o)});
  if(get(L,'asg.departure')===null){
    var d=get(S,'asg_departure')||get(S,'asg_arrival')||get(L,'asg_departure');
    if(d!==null)set(L,'asg.departure',d)}
  IDS.forEach(function(id,i){
    var k='asg.walked.'+id;if(get(L,k)!==null)return;
    var o=get(L,'chakra-'+id)||get(L,'asg.practice.'+id)||get(L,'asg.practice.'+(i+1));
    if(o!==null)set(L,k,o)})}
migrate();
/* a visit: 45 minutes without a page is a new one. `last` is when the previous visit began */
var VISIT=(function(){var v=null,now=Date.now();try{v=JSON.parse(get(L,'asg.visit')||'null')}catch(e){}
  if(!v||!v.seen||now-v.seen>45*60*1000)v={at:now,last:v?v.at:null,seen:now};else v.seen=now;
  set(L,'asg.visit',JSON.stringify(v));return v})();
window.ASGkeys={
  ids:IDS,migrate:migrate,
  get:function(k){return get(L,k)},set:function(k,v){set(L,k,v)},
  /* walked: by slug or by vertebra number. Only the new key is read — migrate() has already
     copied any legacy name on this load, including one a finished page wrote since the last. */
  walked:function(n){var id=typeof n==='number'?IDS[n-1]:n;return !!(id&&get(L,'asg.walked.'+id))},
  departure:function(){try{return JSON.parse(get(L,'asg.departure')||'null')}catch(e){return null}},
  visit:function(){return VISIT},
  depart:function(world){set(L,'asg.departure',JSON.stringify({world:world||'page',at:Date.now()}))}
};
})();
