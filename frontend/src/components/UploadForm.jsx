import React, { useState, useEffect } from 'react';
import './UploadForm.css';

function UploadForm() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState([]);

  const API_URL = 'http://localhost:8080';

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('history') || '[]');
    setHistory(savedHistory);
  }, []);

  const handleChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setResult('');
    setError('');
    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setError('Please select a valid image file (JPG, PNG, etc.).');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError('File size should be less than 10MB.');
        return;
      }
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || error) return;

    const formData = new FormData();
    formData.append('image', image);

    setLoading(true);
    setError('');
    setResult('');

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();

      const output = data.confidence
        ? `${data.prediction} (Confidence: ${(data.confidence * 100).toFixed(2)}%)`
        : data.prediction;

      setResult(output);

      const newEntry = { result: output, time: new Date().toLocaleString() };
      const updatedHistory = [newEntry, ...history];
      localStorage.setItem('history', JSON.stringify(updatedHistory));
      setHistory(updatedHistory);
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => preview && URL.revokeObjectURL(preview);
  }, [preview]);

  return (
    <section className="upload-section">
      <h2 className="upload-title">Upload Leaf Image</h2>
      <p className="upload-subtitle">Select a clear image of the leaf to detect disease.</p>

      <form onSubmit={handleSubmit} className="upload-form">
        <input type="file" accept="image/*" onChange={handleChange} disabled={loading} />
        <button type="submit" disabled={!image || loading || error}>
          {loading ? 'Analyzing...' : 'Detect Disease'}
        </button>
      </form>

      {error && <div className="error">{error}</div>}
      {result && <div className="success">{result}</div>}
      {preview && <img src={preview} alt="Preview" className="preview" />}

      {history.length > 0 && (
        <div className="history-toggle">
          <button className="history-btn" onClick={() => setShowHistory(!showHistory)}>
            {showHistory ? 'Hide History' : 'View History'}
          </button>
        </div>
      )}

      {showHistory && (
        <div className="history">
          <h3>Prediction History</h3>
          <ul>
            {history.map((item, index) => (
              <li key={index}>
                <strong>{item.result}</strong> <br />
                <small>{item.time}</small>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default UploadForm;
