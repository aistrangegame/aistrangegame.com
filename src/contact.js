/* ─────────────────────────────────────────────────────────────
   contact.js — the contact form (F7 · EDGES §6½). A name, a way to reply, the message.

   The Worker (/worker.js) answers GET /api/contact/status with {ready, sitekey}. Until the site's
   mail is switched on (Cloudflare Email Routing, a verified destination, a Turnstile key), it says
   ready:false and the form says so plainly: it isn't connected, and nothing typed is sent.
   The address it sends to is a Worker secret. It is never printed on the page.
   ───────────────────────────────────────────────────────────── */
(function(){
"use strict";
var d=document,f=d.getElementById('cf');if(!f)return;
var st=d.getElementById('cfState'),send=d.getElementById('cfSend');
function say(s,t){st.setAttribute('data-s',s);st.textContent=t}
fetch('/api/contact/status',{headers:{accept:'application/json'}}).then(function(r){return r.ok?r.json():{ready:false}})
.catch(function(){return {ready:false}}).then(function(j){
  if(!j||!j.ready)return;           /* the served words already say it isn't connected */
  say('on','This reaches Ashrey’s inbox. Nothing else is kept.');
  send.disabled=false;
  /* Turnstile — Cloudflare's invisible check, so robots can't fill it in */
  window.asgTurnstile=function(){window.turnstile.render('#cfCheck',{sitekey:j.sitekey,appearance:'interaction-only'})};
  var s=d.createElement('script');s.src='https://challenges.cloudflare.com/turnstile/v0/api.js?onload=asgTurnstile&render=explicit';
  s.async=true;d.head.appendChild(s)});
f.addEventListener('submit',function(e){
  e.preventDefault();if(send.disabled)return;
  send.disabled=true;say('on','Sending…');
  fetch('/api/contact',{method:'POST',body:new FormData(f),headers:{accept:'application/json'}})
  .then(function(r){return r.json().catch(function(){return {ok:false}})})
  .then(function(j){
    if(j&&j.ok){f.reset();say('sent','Sent. Thank you — it’s in Ashrey’s inbox now.')}
    else{send.disabled=false;say('error',(j&&j.error)||'It didn’t send. Nothing was lost — try again in a moment.')}
    try{window.turnstile&&turnstile.reset()}catch(x){}})
  .catch(function(){send.disabled=false;say('error','It didn’t send. Nothing was lost — try again in a moment.')})});
})();
