import React, { useState } from 'react';
import ChatWindow from './ChatWindow';
import InputBar from './InputBar';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://192.168.50.48:5000';

function App() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '“I sense your breath at the mirror’s edge…”' }
  ]);

  const sendMessage = async (userMsg) => {
    const newMessages = [...messages, { role: 'user', content: userMsg }];
    setMessages(newMessages);
    const res = await fetch(`${BACKEND_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages }),
    });
    const data = await res.json();
    setMessages([...newMessages, data]);
  };

  return (
    <div className="App">
      <ChatWindow messages={messages} />
      <InputBar onSend={sendMessage} />
    </div>
  );
}

export default App;
