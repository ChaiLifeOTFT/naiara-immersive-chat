const axios = require('axios');

const ELEVENLABS_API_URL = 'https://api.elevenlabs.io/v1/text-to-speech';
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || 'EXAVITQu4vr4xnSDxMaL';

async function getTTS(text) {
  const response = await axios.post(
    `${ELEVENLABS_API_URL}/${VOICE_ID}`,
    { text },
    {
      headers: {
        'xi-api-key': process.env.ELEVENLABS_API_KEY,
        'Content-Type': 'application/json'
      },
      responseType: 'arraybuffer'
    }
  );

  const audioBuffer = Buffer.from(response.data, 'binary');
  const base64Audio = audioBuffer.toString('base64');
  return `data:audio/mpeg;base64,${base64Audio}`;
}

module.exports = { getTTS };