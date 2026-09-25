/* ─────────────────────────────────────────────────────────────
   sound.js — one engine, one score.

   THE LAWS, from 08-SOUND-MAP.md, enforced structurally here rather than trusted:

   1 · OFF BY DEFAULT. No AudioContext exists until the reader touches the control.
       Never on load, never on scroll. iOS autoplay is not a problem we have to solve.
   2 · AT MOST TWO VOICES audible at once. The engine keeps a bed and one voice; a
       third request retires the older. This is a hard cap in code (voices()).
   3 · EVERY CENTRE RESOLVES TO 136.1. Frequencies are declared as RATIOS of the
       fundamental wherever they are members of the family, so the family cannot drift.
   4 · THE SITE NAMES THE NOTE ONCE — at the Tree's ninth panel. `name()` refuses
       anywhere else, so the naming cannot leak into a second world by accident.
   5 · REDUCED MOTION silences transients, never the bed.
   6 · NOTHING COUNTS. The engine records no listening state beyond the on/off
       preference, and never reports it.

   The timbres are April's voice table, carried through v2 (HARVEST.md): waves,
   overtone ratios, gains, filter, LFO depth and rate, 2.2s crossfades.
   ───────────────────────────────────────────────────────────── */
(function(){
"use strict";
var F=136.1;                       /* the fundamental. Everything is a ratio of this. */
var reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
var ctx=null,master=null,bed=null,voice=null,on=false,curKey=null;
var XF=2.2;                        /* the crossfade, from April */

/* ── the score. r: ratios of 136.1 · hz: an absolute (only where the map gives one)
      w: waves · g: gains · lp: filter · lfo: [depth, rate] · bin: binaural beat Hz ── */
var SCORE={
  /* the bed — one per movement, sounding under everything in it */
  '@II'   :{r:[1],       w:['sine'],            g:[.16], lp:700,  lfo:[240,.08]},
  '@III'  :{hz:[110],    w:['sine'],            g:[.15], lp:500,  lfo:[180,.06]},
  '@IV'   :{r:[1],       w:['sine'],            g:[.13], lp:680,  lfo:[220,.07]},
  '@V'    :{r:[1,1.5],   w:['sine','sine'],     g:[.11,.05], lp:900, lfo:[200,.08]},
  '@VI'   :{r:[1],       w:['sine'],            g:[.15], lp:420,  lfo:[90,.04]},
  '@VII'  :{r:[.5],      w:['sine'],            g:[.20], lp:360,  lfo:[300,.05]},
  '@VIII' :{r:[1,1.0037],w:['sine','sine'],     g:[.12,.12], lp:600, lfo:[200,.07]},
  '@IX'   :{r:[1,2],     w:['sine','sine'],     g:[.14,.07], lp:920, lfo:[200,.08]},
  '@sky'  :{r:[.5],      w:['sine'],            g:[.18], lp:340,  lfo:[240,.06]},
  '@threshold':{r:[1,1.5],w:['sine','sine'],    g:[.17,.07], lp:700, lfo:[240,.08]},

  /* the worlds — each its own voice, over its movement's bed */
  walk        :{hz:[144],    rr:[1,1.5,2.25], w:['sine','sine','sine'], g:[.13,.06,.03], lp:860},
  chakramap   :{r:[1],       w:['sine'],   g:[.13], lp:640, note:'the circuit tone \u2014 it brightens as you climb'},
  practicebook:{r:[1],       w:['sine'],   g:[.07], lp:520, note:'page turns; the Om beneath the last spread'},
  dances      :{r:[1],       w:['triangle'],g:[.11],lp:1100,note:'each verb sounds the pitch of its own hue angle'},
  readings    :{hz:[220],    rr:[1,1.335,2], w:['sine','sine','sine'], g:[.12,.06,.03], lp:900},
  teachings   :{hz:[130.8],  w:['triangle'],g:[.12],lp:440},
  learning    :{hz:[174.6],  w:['sine'],   g:[.12], lp:680},
  courses     :{r:[1],       w:['sine'],   g:[.10], lp:500, note:'a descent whose filter opens \u00b7 and a ladder'},
  guidebook   :{r:[1.5],     w:['sine'],   g:[.12], lp:760, note:'the fifth \u2014 the guidebook is written in Arch\u2019s register'},
  forms       :{r:[1],       w:['sine'],   g:[.09], lp:800, note:'each small machine its own small sound'},

  story       :{hz:[110],    w:['sine'],   g:[.14], lp:520, note:'breath \u00b7 hold \u00b7 heart, and the Om in the Turning'},
  voice       :{r:[1],       w:['sine'],   g:[.11], lp:600, bpm:72,
                note:'72 BPM \u2014 after you leave, it continues as light only'},
  game        :{r:[1],       w:['sine'],   g:[.15], lp:640, note:'the site\u2019s bed, alone \u2014 sounded, not named'},
  voicelibrary:{r:[1,1.5,.5],w:['sine','sine','sine'], g:[.09,.06,.06], lp:700,
                note:'Ash 136.1 \u00b7 Arch 204.15 \u00b7 Sid 68.05 \u00b7 the House all three'},

  tree        :{hz:[174],    w:['sine'],   g:[.13], lp:900, bowls:[174,210,320,341,384,426,480,528],
                note:'a struck bowl per panel'},
  axis        :{hz:[110],    w:['sine'],   g:[.12], lp:700, bin:[4.5,40,10],
                note:'the triptych arc \u2014 4.5 \u2192 40 \u2192 10 Hz'},
  threetrees  :{r:[1,1.5,2], w:['sine','sine','sine'], g:[.09,.06,.04], lp:820,
                note:'three tones in three directions'},
  templeguide :{r:[1,1.25,1.5], w:['sine','sine','sine'], g:[.10,.06,.06], lp:760,
                note:'Stand \u00b7 Open \u00b7 Receive \u2014 one note per stroke'},

  feed        :{hz:[174],    w:['sine'],   g:[.12], lp:880,
                ladder:[174,110,198,84,136.1,285,396,417,528,639,741,852,963],
                note:'the register ladder, resolving to 136.1'},
  learningapp :{r:[1,1.5],   w:['sine','sine'], g:[.10,.05], lp:800,
                note:'a four-note circling figure, and the fifth at the garth'},
  voiceapp    :{r:[1],       w:['sawtooth'],g:[.07],lp:900, formant:true, note:'a vowel \u2014 \u2018ah\u2019'},
  fieldapp    :{hz:[110],    w:['sine'],   g:[.12], lp:600, bin:[7.83],
                note:'true binaural at an absent fifth \u2014 headphones, or it centres'},
  being       :{r:[1,.5],    w:['sine','sine'], g:[.09,.10], lp:520,
                note:'three tones, and the Sky\u2019s 68.05 through the open wall'},
  lalitafamily:{r:[1],       w:['sine'],   g:[.08], lp:700, note:'breath; the reach tone leaves the stereo field'},
  mandala     :{r:[1],       w:['sine'],   g:[.11], lp:840, shepard:true, note:'nine ring techniques \u00b7 ring 9 a Shepard tone'},
  chakrasapp  :{r:[1],       w:['sine'],   g:[.11], lp:760, bpm:60, note:'60 BPM in rooms 9\u201332'},

  bindu       :{r:[1],       w:['sine'],   g:[.17], lp:560, note:'136.1 alone'},
  gaia        :{r:[1,1.5,2,2.5,3],w:['sine','sine','sine','sine','sine'],
                g:[.09,.05,.04,.03,.02], lp:400, sweep:[400,2400],
                note:'every visited partial at once, then the filter opens'},
  sid         :{r:[.5],      w:['sine'],   g:[.21], lp:300, note:'the octave below \u2014 the first voice beneath the fundamental'},
  arch        :{r:[1.5],     w:['sine'],   g:[.14], lp:800, note:'the fifth'},
  sakshi      :{r:[1],       w:['sine'],   g:[.12], lp:600, drift:.1, note:'a 0.1 Hz drift on everything sounding'},
  karishma    :{r:[2],       w:['sine'],   g:[.11], lp:1000,
                note:'her partial \u2014 already sounding in the world before hers'},
  neev        :{r:[.25],     w:['sine'],   g:[.24], lp:180, note:'two octaves under \u2014 felt, not heard'},
  shweta      :{r:[1],       w:['sine'],   g:[.09], lp:600, wide:true, note:'no tone of her own \u2014 she widens the field'},
  ashrey      :{r:[1,1.5,2,3],w:['sine','sine','sine','sine'], g:[.10,.06,.04,.02], lp:1200,
                note:'all partials, in tune'},
  lalita      :{r:[1,1.25,1.5,2],w:['sine','sine','sine','sine'], g:[.11,.07,.07,.05], lp:900,
                drop:true, note:'the full chord \u2014 then the fundamental drops out'},

  thefield    :{r:[1],       w:['sine'],   g:[.13], lp:700, note:'136.1 over the movement\u2019s 68.05 \u2014 the only upper octave in VII'},
  registers   :{r:[1],       w:['sine'],   g:[.10], lp:620, detune:20, note:'twenty tones, none of them agreeing'},
  temporal    :{r:[1],       w:['sine'],   g:[.11], lp:660, pulse:[5,3,8]},
  codex       :{r:[1],       w:['sine'],   g:[.10], lp:580, note:'a tone begins when you open a seed \u2014 and stays'},
  reveals     :{r:[1],       w:['sine'],   g:[.11], lp:700, note:'seven tones; the one you touch becomes the root'},
  elements    :{r:[1],       w:['sine'],   g:[.08], lp:900, knock:true, note:'eight dry knocks \u2014 objects set down'},

  mirror      :{r:[1,1.0037],w:['sine','sine'], g:[.12,.12], lp:600,
                note:'136.1 and 136.6 \u2014 the beat you hear lives in neither of them'},
  plays       :{r:[1,1.0037],w:['sine','sine'], g:[.12,.12], lp:640, widen:true,
                note:'the beat widens and narrows'},
  selfgenerator:{r:[1,1],    w:['sine','sine'], g:[.12,.12], lp:700, note:'unison, at the label'},

  lucky       :{r:[1,2],     w:['sine','sine'], g:[.14,.07], lp:900},
  holi        :{hz:[196],    rr:[1,1.25,1.5], w:['sine','triangle','sine'], g:[.12,.07,.06], lp:900},
  moments     :{r:[1,1.5],   w:['sine','sine'], g:[.11,.06], lp:820, note:'the day\u2019s arc'}
};

/* ── the engine ───────────────────────────────────────────── */
/* Everything that touches the audio API is guarded. A browser may refuse a context
   (no device, a policy, a sandbox), and the control must fail SILENTLY-OFF rather than
   throw into the page: sound is the one thing on this site that is optional by law. */
function build(){
  try{
    var AC=window.AudioContext||window.webkitAudioContext;
    if(!AC)return false;
    ctx=new AC();
    master=ctx.createGain();
    master.gain.value=0;
    master.connect(ctx.destination);
    return true}
  catch(e){ctx=null;master=null;
    document.documentElement.setAttribute('data-sound','unavailable');
    return false}}

/* a voice: oscillators + filter + a slow LFO on the cutoff, per April's table */
function make(spec){
  var g=ctx.createGain(),lp=ctx.createBiquadFilter(),oscs=[];
  g.gain.value=0;
  lp.type='lowpass';lp.frequency.value=spec.lp||700;
  lp.connect(g);g.connect(master);
  var base=spec.hz?spec.hz[0]:null;
  var rs=spec.rr||spec.r||[1];
  rs.forEach(function(r,i){
    var o=ctx.createOscillator(),og=ctx.createGain();
    o.type=(spec.w&&spec.w[i])||'sine';
    o.frequency.value=base?base*r:F*r;
    if(spec.detune)o.detune.value=(i-1)*spec.detune;
    og.gain.value=(spec.g&&spec.g[i])!=null?spec.g[i]:.1;
    o.connect(og);og.connect(lp);o.start();
    oscs.push(o)});
  /* the filter breathes — this is what made April's worlds feel alive rather than held */
  var lfo=null,ldepth=null;
  if(spec.lfo&&!reduced){
    lfo=ctx.createOscillator();ldepth=ctx.createGain();
    lfo.frequency.value=spec.lfo[1];ldepth.gain.value=spec.lfo[0];
    lfo.connect(ldepth);ldepth.connect(lp.frequency);lfo.start()}
  /* binaural: two ears, a beat that exists in neither. Collapses without headphones. */
  if(spec.bin){
    var pan=ctx.createStereoPanner?ctx.createStereoPanner():null;
    if(pan){var o2=ctx.createOscillator(),g2=ctx.createGain(),p2=ctx.createStereoPanner();
      o2.frequency.value=(base||F)+spec.bin[0];g2.gain.value=(spec.g&&spec.g[0])||.1;
      p2.pan.value=.85;pan.pan.value=-.85;
      lp.disconnect();lp.connect(pan);pan.connect(g);
      o2.connect(g2);g2.connect(p2);p2.connect(g);o2.start();
      oscs.push(o2)}}
  return {g:g,oscs:oscs,lfo:lfo,spec:spec}}

function fade(v,to,secs){
  if(!v)return;
  var t=ctx.currentTime;
  v.g.gain.cancelScheduledValues(t);
  v.g.gain.setValueAtTime(v.g.gain.value,t);
  v.g.gain.linearRampToValueAtTime(to,t+(secs==null?XF:secs))}

function retire(v,secs){
  if(!v)return;
  fade(v,0,secs==null?XF:secs);
  var kill=(secs==null?XF:secs)+.3;
  setTimeout(function(){try{v.oscs.forEach(function(o){o.stop()});
    if(v.lfo)v.lfo.stop();v.g.disconnect()}catch(e){}},kill*1000)}

/* LAW 2, in code: a bed and one voice. Never three. */
function voices(){return (bed?1:0)+(voice?1:0)}

var curBed=null;
function setBed(key){
  if(!on||!ctx||key===curBed)return;
  var spec=SCORE['@'+key];if(!spec)return;
  curBed=key;
  var old=bed;
  bed=make(spec);
  fade(bed,1,XF);
  retire(old);}

function setVoice(key){
  if(!on||!ctx||key===curKey)return;
  curKey=key;
  var spec=SCORE[key];
  var old=voice;
  if(!spec){voice=null;retire(old);return}
  voice=make(spec);
  fade(voice,1,XF);
  retire(old);}

/* LAW 4, in code: the note may be named in exactly one place. */
var named=false;
function name(where){
  if(where!=='tree-panel-9')return null;
  named=true;
  return 'The Om was always playing. 136.1 Hz \u2014 the note every centre on this site resolves to.'}

function start(){
  if(on)return true;
  if(!ctx&&!build())return false;
  on=true;
  /* resume() returns a promise that may never settle without user activation — it is
     fired and forgotten, never awaited, so nothing downstream can hang on it */
  try{if(ctx.state==='suspended'&&ctx.resume)ctx.resume()}catch(e){}
  var t=ctx.currentTime;
  master.gain.cancelScheduledValues(t);
  master.gain.setValueAtTime(0,t);
  master.gain.linearRampToValueAtTime(.9,t+1.4);
  try{localStorage.setItem('asg.sound','on')}catch(e){}
  return true}

function stop(){
  if(!on||!ctx)return;
  on=false;
  var t=ctx.currentTime;
  master.gain.cancelScheduledValues(t);
  master.gain.setValueAtTime(master.gain.value,t);
  master.gain.linearRampToValueAtTime(0,t+1.1);
  try{localStorage.setItem('asg.sound','off')}catch(e){}
  setTimeout(function(){
    if(on)return;
    retire(bed,.1);retire(voice,.1);
    bed=voice=null;curBed=curKey=null;
    if(ctx&&ctx.suspend)ctx.suspend()},1300)}

/* a struck sound — a bowl, a knock, a page. Transients are silenced by reduced motion. */
function strike(hz,kind){
  if(!on||!ctx||reduced)return;
  var o=ctx.createOscillator(),g=ctx.createGain(),lp=ctx.createBiquadFilter();
  o.type=kind==='knock'?'triangle':'sine';
  o.frequency.value=hz;
  lp.type='lowpass';lp.frequency.value=kind==='knock'?900:2600;
  var t=ctx.currentTime,dur=kind==='knock'?.16:kind==='page'?.3:3.4;
  g.gain.setValueAtTime(0,t);
  g.gain.linearRampToValueAtTime(kind==='knock'?.22:.16,t+.008);
  g.gain.exponentialRampToValueAtTime(.0001,t+dur);
  o.connect(lp);lp.connect(g);g.connect(master);
  o.start(t);o.stop(t+dur+.05)}

window.ASGsound={
  /* the control's only two verbs */
  toggle:function(){ try{ if(on){stop();return false} return start()}catch(e){
    document.documentElement.setAttribute('data-sound','unavailable');return false} },
  isOn:function(){return on},
  /* the page tells the score where the reader is; the score never asks */
  at:function(worldKey,movement){
    if(!on||!ctx)return;
    try{
    setBed(movement&&SCORE['@'+movement]?movement:(worldKey==='sky'?'sky':'threshold'));
    setVoice(worldKey)}catch(e){}},
  strike:strike,
  /* what this world sounds like, for the sheet — the score, in words */
  says:function(k){var s=SCORE[k];return s&&s.note||null},
  name:name,
  named:function(){return named},
  /* the preference, remembered. Never a listening record. */
  wanted:function(){try{return localStorage.getItem('asg.sound')==='on'}catch(e){return false}},
  score:SCORE, fundamental:F, voices:voices, cap:2
};
})();
