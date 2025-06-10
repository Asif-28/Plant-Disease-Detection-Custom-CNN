import React, { useState, useEffect } from 'react';

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  return (
    <section className="history-section">
      <h2>📁 View History</h2>
      {history.length === 0 ? (
        <p>No previous searches yet.</p>
      ) : (
        <ul>
          {history.map((item, idx) => (
            <li key={idx}>
              <strong>{item.result}</strong> — <em>{item.time}</em>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
