import React, { useState } from 'react';

function UploadForm() {
const [image, setImage] = useState(null);
const [preview, setPreview] = useState(null);
const [result, setResult] = useState('');
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');

// Use environment variable or fallback to localhost
const API_URL = 'http://localhost:8080';

const handleChange = (e) => {
const file = e.target.files[0];
setImage(file);
setResult('');
setError('');

if (file) {
// Validate file type
const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
if (!validTypes.includes(file.type)) {
setError('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
return;
}

// Validate file size (max 10MB)
if (file.size > 10 * 1024 * 1024) {
setError('File size should be less than 10MB');
return;
}

setPreview(URL.createObjectURL(file));
} else {
setPreview(null);
}
};

const handleSubmit = async (e) => {
e.preventDefault();

if (!image) {
setError('Please select an image first');
return;
}

if (error) {
return; // Don't submit if there's a validation error
}

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

if (!response.ok) {
throw new Error(`HTTP error! status: ${response.status}`);
}

const data = await response.json();

if (data.error) {
setError(data.error);
} else {
setResult(data.prediction);
if (data.confidence) {
setResult(`${data.prediction} (Confidence: ${(data.confidence * 100).toFixed(2)}%)`);
}
}
} catch (err) {
console.error('Error:', err);
setError(`Error processing request: ${err.message}`);
} finally {
setLoading(false);
}
};

// Clean up object URL when component unmounts or preview changes
React.useEffect(() => {
return () => {
if (preview) {
URL.revokeObjectURL(preview);
}
};
}, [preview]);

return (
<div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
<h1>Plant Disease Classification</h1>

<form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
<div style={{ marginBottom: '15px' }}>
<input
type="file"
accept="image/*"
onChange={handleChange}
disabled={loading}
style={{ marginBottom: '10px' }}
/>
</div>

<button
type="submit"
disabled={!image || loading || error}
style={{
padding: '10px 20px',
backgroundColor: loading || !image || error ? '#ccc' : '#007bff',
color: 'white',
border: 'none',
borderRadius: '4px',
cursor: loading || !image || error ? 'not-allowed' : 'pointer'
}}
>
{loading ? 'Classifying...' : 'Classify Plant Disease'}
</button>
</form>

{loading && (
<div style={{ textAlign: 'center', margin: '20px 0' }}>
<p>⏳ Processing your image...</p>
</div>
)}

{error && (
<div style={{
color: 'red',
backgroundColor: '#ffe6e6',
padding: '10px',
borderRadius: '4px',
margin: '10px 0'
}}>
❌ Error: {error}
</div>
)}

{result && !error && (
<div style={{
color: 'green',
backgroundColor: '#e6ffe6',
padding: '10px',
borderRadius: '4px',
margin: '10px 0'
}}>
<h2>🔍 Classification Result:</h2>
<p><strong>{result}</strong></p>
</div>
)}

{preview && (
<div style={{ textAlign: 'center', marginTop: '20px' }}>
<h3>Image Preview:</h3>
<img
src={preview}
alt="Preview"
style={{
maxWidth: '400px',
maxHeight: '400px',
border: '2px solid #ddd',
borderRadius: '8px'
}}
/>
</div>
)}
</div>
);
}

export default UploadForm;