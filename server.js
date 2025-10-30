require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let cachedToken = null;
let tokenExpiresAt = 0;

async function getAppAccessToken() {
  const now = Date.now();
  if (cachedToken && now < tokenExpiresAt) return cachedToken;

  const tokenUrl = 'https://accounts.spotify.com/api/token';
  const auth = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64');
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');

  const res = await axios.post(tokenUrl, params.toString(), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${auth}`
    }
  });

  cachedToken = res.data.access_token;
  tokenExpiresAt = now + (res.data.expires_in - 60) * 1000; // subtract 60s safety
  return cachedToken;
}

app.get('/api/search', async (req, res) => {
  try {
    const q = req.query.q;
    if (!q) return res.status(400).json({ error: 'Missing query q' });

    console.log('[api] search q=', q);

    const token = await getAppAccessToken();
    const spotifyRes = await axios.get('https://api.spotify.com/v1/search', {
      headers: { Authorization: `Bearer ${token}` },
      params: { q, type: 'track', limit: 20 }
    });

    return res.json(spotifyRes.data);
  } catch (err) {
    console.error('[api] search error', err?.response?.data || err.message || err);
    return res.status(500).json({ error: 'Search failed', details: err?.response?.data || err.message });
  }
});

const PORT = process.env.API_PORT || 3001;
app.listen(PORT, () => console.log(`API proxy running on http://localhost:${PORT}`));
