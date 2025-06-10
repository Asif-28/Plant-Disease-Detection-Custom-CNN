import React from 'react';
import './About.css';

function About() {
  return (
    <section className="about">
      <h2 className="about-title">How Our System Works</h2>
      <p className="about-subtitle">
        Discover how we use cutting-edge technology to detect plant diseases accurately and efficiently.
      </p>
      <div className="cards">
        <div className="card">
          <h3>1. Upload a Leaf Image</h3>
          <p>
            Start by selecting a clear photo of the affected plant leaf. Make sure the image is well-lit
            for better analysis results.
          </p>
        </div>
        <div className="card">
          <h3>2. Smart Image Analysis</h3>
          <p>
            Our model analyzes the uploaded image using advanced machine learning algorithms
            trained on thousands of diseased and healthy leaf samples.
          </p>
        </div>
        <div className="card">
          <h3>3. Get Instant Predictions</h3>
          <p>
            Instantly receive the predicted disease name along with a confidence score, helping you
            take informed decisions for plant treatment.
          </p>
        </div>
        <div className="card">
          <h3>4. View History</h3>
          <p>
            Keep track of your previous analyses and predictions, allowing you to monitor plant health
            over time.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
