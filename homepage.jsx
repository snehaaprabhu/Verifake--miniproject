import React, { useState } from 'react';

const HomePage = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [result, setResult] = useState('');

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleAnalyzeClick = async () => {
    if (!videoFile) {
      setResult('Please upload a video first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', videoFile);

    try {
      const response = await fetch('http://localhost:5000/predict', {  // Assuming Flask runs on port 5000
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Something went wrong while analyzing.');
      }

      const data = await response.json();
      setResult(data.result || 'An error occurred.');
    } catch (error) {
      console.error('Error:', error);
      setResult('Something went wrong while analyzing.');
    }
  };

  return (
    <>
      <header className="navbar">
        <h1>Deepfake Detection</h1>
      </header>

      <section className="upload-box">
        <h2>Upload Video</h2>
        <input type="file" accept="video/mp4" onChange={handleFileChange} />
        <button onClick={handleAnalyzeClick}>Analyze</button>
      </section>

      {result && (
        <section className="result-box">
          <h3>Result: {result}</h3>
        </section>
      )}

      <section className="tutorial">
        <h3>How to Use Verifake</h3>
        <ol>
          <li>Upload an MP4 video under 30 seconds.</li>
          <li>Click the “Analyze” button to begin deepfake detection.</li>
          <li>Wait a few seconds for the result to be displayed.</li>
        </ol>
      </section>
    </>
  );
};

export default HomePage;
