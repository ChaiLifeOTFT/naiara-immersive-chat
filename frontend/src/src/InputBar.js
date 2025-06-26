import React, { useState } from 'react';

const InputBar = ({ onSend }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  return (
    <div className="input-bar">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        placeholder="Speak to Nai’Ara..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default InputBar;
