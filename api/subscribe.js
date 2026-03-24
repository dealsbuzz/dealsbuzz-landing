export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
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
  if (!VALID_FORM_IDS.includes(String(formId))) {
    return res.status(400).json({ error: 'Invalid form ID' });
  }

  try {
    // Kit expects application/x-www-form-urlencoded
    const params = new URLSearchParams();
    params.append('email_address', email);

    const response = await fetch(
      `https://app.kit.com/forms/${formId}/subscriptions`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString()
      }
    );

    const text = await response.text();
    console.log('Kit status:', response.status);
    console.log('Kit response:', text);

    if (response.status === 200 || response.status === 201) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(200).json({ error: 'Kit error', status: response.status, detail: text });
    }

  } catch (err) {
    console.error('Proxy error:', err.message);
    return res.status(500).json({ error: 'Server error', detail: err.message });
  }
}
