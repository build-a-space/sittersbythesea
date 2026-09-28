// Vercel serverless function for the contact form (POST /api/contact).
// Sends the request by email through Resend when RESEND_API_KEY is set.
// Environment variables (Vercel project settings, main site only):
//   RESEND_API_KEY  required to send email
//   CONTACT_TO      inbox that receives requests (default info@sittersbythesea.net)
//   CONTACT_FROM    verified sender (default Resend's test sender)

const FIELDS = ['name', 'email', 'phone', 'city', 'service', 'pets', 'message', 'military'];

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
      if (data.length > 20000) reject(new Error('Too large'));
    });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return send(res, 405, { ok: false });

  let fields;
  try {
    fields = Object.fromEntries(new URLSearchParams(await readBody(req)));
  } catch {
    return send(res, 400, { ok: false, error: 'Bad request' });
  }
  if (fields['bot-field']) return send(res, 200, { ok: true }); // honeypot
  if (!fields.name || !fields.email) return send(res, 400, { ok: false, error: 'Name and email are required.' });

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error('[contact] RESEND_API_KEY is not set; request not delivered:', JSON.stringify(fields));
    return send(res, 503, { ok: false, error: 'Email is not configured yet.' });
  }

  const city = { vb: 'Virginia Beach', chs: 'Charleston' }[fields.city] || fields.city || 'Unknown city';
  const text = FIELDS.filter((f) => fields[f]).map((f) => `${f}: ${fields[f]}`).join('\n');
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || 'Sitters by the Sea <onboarding@resend.dev>',
      to: [process.env.CONTACT_TO || 'info@sittersbythesea.net'],
      reply_to: fields.email,
      subject: `New request: ${fields.name} (${city})`,
      text,
    }),
  });
  if (!r.ok) {
    console.error('[contact] Resend error', r.status, await r.text());
    return send(res, 502, { ok: false, error: 'Could not send.' });
  }
  return send(res, 200, { ok: true });
};
