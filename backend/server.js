require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { getTTS } = require('./tts');
const { Memory } = require('./memory');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY
}));

const memory = new Memory();

app.post('/api/chat', async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    const history = memory.get(sessionId);
    history.push({ role: 'user', content: message });

    const completion = await openai.createChatCompletion({
      model: 'gpt-4o-mini',
      messages: history,
      temperature: 0.7
    });

    const assistantMessage = completion.data.choices[0].message;
    history.push(assistantMessage);
    memory.set(sessionId, history);

    res.json({ response: assistantMessage.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.post('/api/tts', async (req, res) => {
  try {
    const { text } = req.body;
    const audioUrl = await getTTS(text);
    res.json({ url: audioUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'TTS failed' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
}
