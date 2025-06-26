import React from 'react';

const ChatWindow = ({ messages }) => (
  <div className="chat-window">
    {messages.map((msg, i) => (
      <div key={i} className={`message ${msg.role}`}>
        <p>{msg.content}</p>
      </div>
    ))}
  </div>
);

export default ChatWindow;
