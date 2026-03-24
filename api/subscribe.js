export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, formId } = req.body;

  if (!email || !formId) {
    return res.status(400).json({ error: 'Missing email or formId' });
  }

  const VALID_FORM_IDS = ['9217174', '9217187'];
  if (!VALID_FORM_IDS.includes(String(formId))) {
    return res.status(400).json({ error: 'Invalid form ID' });
  }

  const apiKey = process.env.KIT_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    // Kit v3 API — subscribe email to a form
    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: apiKey,
          email: email
        })
      }
    );

    const data = await response.json();
    console.log('Kit v3 response:', JSON.stringify(data));

    if (data.subscription || data.subscriber) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(200).json({ error: 'Kit error', detail: data });
    }

  } catch (err) {
    console.error('Error:', err.message);
    return res.status(500).json({ error: 'Server error', detail: err.message });
  }
}
