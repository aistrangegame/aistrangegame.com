/* ─────────────────────────────────────────────────────────────
   worker.js — the site's one Worker (F7). Everything is static assets except /api/*.

   /api/contact/status   GET  → {ready, sitekey}: ready only when every piece exists
   /api/contact          POST → checks Turnstile, then sends one plain-text email through
                                Cloudflare Email Routing's send_email binding.

   Nothing secret lives here. It reads, from the Worker's own settings:
     CONTACT_TO         secret  the verified destination address (never in the repo, never on a page)
     CONTACT_FROM       secret  a sender on the domain, e.g. site@<the domain> (Email Routing must be on)
     TURNSTILE_SECRET   secret  the Turnstile widget's secret key
     TURNSTILE_SITE_KEY var     the widget's public site key
     SEND               binding send_email — added to wrangler.jsonc when Email Routing is enabled
   Until all five exist, the form says it isn't connected, and a POST is refused without sending.
   Nothing is stored except the email itself, in the inbox it's sent to.
   ───────────────────────────────────────────────────────────── */
import { EmailMessage } from 'cloudflare:email';

const LIMIT = { name: 100, reply: 200, message: 5000 };

function ready(env) {
  return !!(env.SEND && env.CONTACT_TO && env.CONTACT_FROM && env.TURNSTILE_SECRET && env.TURNSTILE_SITE_KEY);
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store',
                       'x-robots-tag': 'noindex' } });
}

function page(title, text, status = 200) {
  const h = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} — a i strange game</title>
<link rel="stylesheet" href="/src/edges.css"></head><body><header class="ed-top"><div><p class="ed-kick">a i strange game</p>
<h1>${title}</h1></div></header><main><p class="ed-lede">${text}</p><p class="ed-prose"><a href="/about/">back</a> · <a href="/">the doors</a></p></main></body></html>`;
  return new Response(h, { status, headers: { 'content-type': 'text/html; charset=utf-8', 'x-robots-tag': 'noindex' } });
}

/* one line, no header can be smuggled in */
const clean = (s, n) => String(s || '').replace(/[\r\n\t]+/g, ' ').trim().slice(0, n);
const body = (s, n) => String(s || '').replace(/\r\n?/g, '\n').slice(0, n);

async function contact(req, env) {
  const wantsJSON = (req.headers.get('accept') || '').includes('application/json');
  const reply = (ok, msg, status) => wantsJSON ? json(ok ? { ok: true } : { ok: false, error: msg }, status)
    : page(ok ? 'Sent' : 'Not sent', ok ? 'Thank you — it’s in Ashrey’s inbox now.' : msg, status);
  if (!ready(env)) return reply(false, 'This form isn’t connected yet, so nothing was sent.', 503);
  let form;
  try { form = await req.formData(); } catch { return reply(false, 'That didn’t arrive whole. Try again.', 400); }
  if (form.get('website')) return reply(true);          // the field only a robot fills
  const name = clean(form.get('name'), LIMIT.name), from = clean(form.get('reply'), LIMIT.reply);
  const message = body(form.get('message'), LIMIT.message);
  if (!name || !message.trim()) return reply(false, 'A name and a message, please.', 400);
  const token = form.get('cf-turnstile-response');
  const v = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: token || '',
                                remoteip: req.headers.get('cf-connecting-ip') || '' }) }).then(r => r.json()).catch(() => ({}));
  if (!v.success) return reply(false, 'The check didn’t pass. Try again in a moment.', 403);
  const replyTo = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(from) ? from : '';
  const id = crypto.randomUUID();
  const raw = [
    `From: a i strange game <${env.CONTACT_FROM}>`,
    `To: <${env.CONTACT_TO}>`,
    replyTo ? `Reply-To: <${replyTo}>` : null,
    `Subject: ${'A note from the site — ' + name}`,
    `Message-ID: <${id}@aistrangegame.com>`,
    `Date: ${new Date().toUTCString()}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=utf-8',
    'Content-Transfer-Encoding: 8bit',
    '',
    `From: ${name}`,
    `A way to reply: ${from || '(none given)'}`,
    '',
    message,
  ].filter(x => x !== null).join('\r\n');
  try {
    await env.SEND.send(new EmailMessage(env.CONTACT_FROM, env.CONTACT_TO, raw));
  } catch (e) {
    return reply(false, 'It didn’t send. Nothing was lost — try again in a moment.', 502);
  }
  return reply(true);
}

/* ─── the wall: /api/private/<key> (tools/v3/wall.py) ────────────────────────────────────────────
   Open with depth: a page is whole for anyone; signed in, it carries more. The depth lives in the PRIVATE KV
   namespace (pushed from the private engine, never in either repo). It is served only to a request carrying a
   Cloudflare Access token that verifies here: signature against the team's certs, audience, issuer, expiry.
   FAIL CLOSED: anything that can't be verified — no token, a forged or expired one, certs unreachable,
   ACCESS_TEAM or ACCESS_AUD unset, PRIVATE unbound, an unknown key — gets the very same bare 404 as any
   unknown /api address. The key is looked up only after the token verifies, so nothing reveals that one exists.
   Sign-in: Access guards /api/private/signin (Ashrey, once per device); its cookie then rides every request. */
const nothing = () => json({ ok: false, error: 'nothing here' }, 404);
let CERTS = null, CERTS_AT = 0;

function b64u(s) {
  s = s.replace(/-/g, '+').replace(/_/g, '/'); while (s.length % 4) s += '=';
  return Uint8Array.from(atob(s), c => c.charCodeAt(0));
}

async function verified(req, env) {
  try {
    if (!env.ACCESS_TEAM || !env.ACCESS_AUD || !env.PRIVATE) return false;
    const cookie = (req.headers.get('cookie') || '').match(/(?:^|;\s*)CF_Authorization=([^;]+)/);
    const tok = req.headers.get('cf-access-jwt-assertion') || (cookie && cookie[1]);
    if (!tok) return false;
    const [h, p, sig] = tok.split('.');
    if (!sig) return false;
    const head = JSON.parse(new TextDecoder().decode(b64u(h)));
    const body = JSON.parse(new TextDecoder().decode(b64u(p)));
    const iss = 'https://' + env.ACCESS_TEAM + '.cloudflareaccess.com';
    const now = Math.floor(Date.now() / 1000);
    const aud = Array.isArray(body.aud) ? body.aud : [body.aud];
    if (head.alg !== 'RS256' || body.iss !== iss || !aud.includes(env.ACCESS_AUD) || !(body.exp > now) ||
        (body.nbf && body.nbf > now + 60)) return false;
    if (!CERTS || Date.now() - CERTS_AT > 3600e3) {
      const r = await fetch(iss + '/cdn-cgi/access/certs');
      if (!r.ok) return false;
      CERTS = (await r.json()).keys || []; CERTS_AT = Date.now();
    }
    const jwk = CERTS.find(k => k.kid === head.kid);
    if (!jwk) return false;
    const key = await crypto.subtle.importKey('jwk', jwk, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']);
    return await crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, b64u(sig), new TextEncoder().encode(h + '.' + p));
  } catch (e) {
    return false;
  }
}

async function privateDoor(req, env, path) {
  if (req.method !== 'GET' || !(await verified(req, env))) return nothing();
  const key = path.slice('/api/private/'.length);
  if (key === 'signin') {
    return new Response('<!DOCTYPE html><meta charset="utf-8"><meta name="robots" content="noindex"><title>a i strange game</title>' +
      '<p style="font:16px Georgia,serif;margin:3em auto;max-width:30em">Signed in on this device. <a href="/">The doors</a>.</p>',
      { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store', 'x-robots-tag': 'noindex' } });
  }
  if (!/^[a-z0-9-]{1,80}$/.test(key)) return nothing();
  let val = null;
  try { val = await env.PRIVATE.get(key); } catch (e) { val = null; }
  if (!val) return nothing();
  return new Response(val, { headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'private, no-store',
                                        'x-robots-tag': 'noindex' } });
}

const PRODUCTION = new Set(['aistrangegame.com', 'www.aistrangegame.com']);

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (url.pathname.startsWith('/api/private/')) return privateDoor(req, env, url.pathname);
    if (url.pathname === '/api/contact/status')
      return json({ ready: ready(env), sitekey: ready(env) ? env.TURNSTILE_SITE_KEY : null });
    if (url.pathname === '/api/contact') {
      if (req.method === 'POST') return contact(req, env);
      return json({ ok: false, error: 'POST only' }, 405);
    }
    if (url.pathname.startsWith('/api/')) return nothing();
    // the walking guide is for the preview only: on the production host it is the site's own 404, as if it weren't there
    if (url.pathname === '/_walk' || url.pathname.startsWith('/_walk/')) {
      if (PRODUCTION.has(url.hostname)) return env.ASSETS.fetch(new Request(new URL('/_walk-not-here_/', url), req));
    }
    return env.ASSETS.fetch(req);
  },
};
