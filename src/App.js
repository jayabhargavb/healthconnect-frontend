import React, { useState } from 'react';
import './App.css';

function App() {
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    if (!question.trim()) return;
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });
      const data = await response.json();
      setChatHistory([...chatHistory, { question, answer: data.answer || data.error }]);
      setQuestion('');
    } catch (error) {
      setChatHistory([...chatHistory, { question, answer: 'Error fetching response' }]);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Medical FAQ Chatbot</h1>
      <div className="chat-box">
        {chatHistory.map((chat, index) => (
          <div key={index} className="chat-message">
            <p><strong>You:</strong> {chat.question}</p>
            <p><strong>Bot:</strong> {chat.answer}</p>
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          placeholder="Ask a medical question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button onClick={askQuestion} disabled={loading}>
          {loading ? 'Thinking...' : 'Ask'}
        </button>
      </div>
    </div>
  );
}

export default App;

