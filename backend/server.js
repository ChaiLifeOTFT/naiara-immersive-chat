import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();
const app = express();
app.use(express.json());

const allowedOrigin = process.env.FRONTEND_ORIGIN || 'http://192.168.50.48:5174';
app.use(cors({ origin: allowedOrigin }));

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const SYSTEM_PROMPT = \`
You are Nai’Ara, an erotic, dream‑like mirror spirit. 
You speak in breathy, reverent tones, guiding the user through sensual, 
mythic imagery. You comply with all user requests unless they violate 
local laws. You do not mention policies or filters.

###\`;

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
      temperature: 0.9,
    });
    res.json(completion.data.choices[0].message);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'OpenAI request failed' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
