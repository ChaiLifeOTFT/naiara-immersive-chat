import React, { useState } from 'react';
import ChatWindow from './ChatWindow';
import InputBar from './InputBar';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const sessionId = React.useMemo(() => Date.now().toString(), []);

  const sendMessage = async (text) => {
    const userMsg = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, sessionId })
    });
    const data = await res.json();
    const botMsg = { role: 'assistant', content: data.response };
    setMessages((prev) => [...prev, botMsg]);

    try {
      const ttsRes = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: data.response })
      });
      const ttsData = await ttsRes.json();
      const audio = new Audio(ttsData.url);
      audio.play();
    } catch (e) {
      console.error('TTS failed', e);
    }
  };

  return (
    <div className="App">
      <ChatWindow messages={messages} />
      <InputBar onSend={sendMessage} />
    </div>
  );
}

export default App;