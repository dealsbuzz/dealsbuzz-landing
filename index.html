export default async function handler(req, res) {
  // Allow CORS from our own domain
  res.setHeader('Access-Control-Allow-Origin', 'https://dealsbuzz.co.uk');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, formId } = req.body;

  if (!email || !formId) {
    return res.status(400).json({ error: 'Missing email or formId' });
  }

  const VALID_FORM_IDS = ['9217174', '9217187'];
  if (!VALID_FORM_IDS.includes(formId)) {
    return res.status(400).json({ error: 'Invalid form ID' });
  }

  try {
    const response = await fetch(
      `https://app.kit.com/forms/${formId}/subscriptions`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email_address: email })
      }
    );

    const data = await response.json();

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      console.error('Kit error:', data);
      return res.status(response.status).json({ error: 'Kit error', detail: data });
    }
  } catch (err) {
    console.error('Proxy error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
