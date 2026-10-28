// Cloudflare Pages Function: POST /api/signup
// Stores one row per email in the D1 database bound as DB (see schema.sql).

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const ROLES = new Set(['najemnik', 'lastnik']);

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export async function onRequestPost({ request, env }) {
  if (!env.DB) return json({ error: 'not_configured' }, 503);

  let data;
  try {
    data = await request.json();
  } catch {
    return json({ error: 'bad_request' }, 400);
  }

  // Honeypot: pretend success so bots do not retry.
  if (data.website) return json({ ok: true });

  const email = String(data.email ?? '').trim().toLowerCase();
  if (email.length > 254 || !EMAIL.test(email) || !ROLES.has(data.role)) {
    return json({ error: 'invalid' }, 400);
  }

  await env.DB.prepare(
    'INSERT INTO signups (email, role, created_at) VALUES (?, ?, ?) ON CONFLICT(email) DO NOTHING',
  )
    .bind(email, data.role, new Date().toISOString())
    .run();

  return json({ ok: true });
}
