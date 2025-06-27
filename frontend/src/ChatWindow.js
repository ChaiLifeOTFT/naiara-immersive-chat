import React from 'react';
import './ChatWindow.css';

function ChatWindow({ messages }) {
  return (
    <div className="chat-window">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`message ${msg.role === 'user' ? 'user' : 'assistant'}`}
        >
          {msg.content}
        </div>
      ))}
    </div>
  );
}

export default ChatWindow;

c