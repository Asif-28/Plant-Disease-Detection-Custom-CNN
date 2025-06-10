import React from 'react';
import './ModelInfo.css';

function ModelInfo() {
  return (
    <section className="model-info">
      <h2 className="model-title">About the Model</h2>
      <p className="model-description">
        Our plant disease detection system is powered by a deep learning model
        trained on thousands of high-quality leaf images collected from diverse
        crops and disease conditions. It uses Convolutional Neural Networks (CNNs),
        a class of deep learning models especially effective in image classification
        tasks.
      </p>

      <p className="model-description">
        The model is capable of identifying both healthy and diseased leaves with high
        accuracy. It analyzes features like color, texture, and patterns on the leaf
        surface to make predictions. Each prediction is returned with a confidence
        score to help you make informed decisions.
      </p>

      <div className="examples">
        <h3 className="example-title">Examples of Supported Classes:</h3>
        <ul>
          <li><strong>Apple</strong> — Apple Scab, Black Rot, Cedar Apple Rust, Healthy</li>
          <li><strong>Tomato</strong> — Early Blight, Late Blight, Leaf Mold, Healthy</li>
          <li><strong>Corn</strong> — Common Rust, Northern Leaf Blight, Healthy</li>
          <li><strong>Potato</strong> — Early Blight, Late Blight, Healthy</li>
          <li><strong>Grape</strong> — Black Rot, Esca (Black Measles), Healthy</li>
        </ul>
        <p className="note">
          The system currently supports over <strong>30 disease classes</strong> across
          crops like Tomato, Apple, Grape, Corn, Potato, and more.
        </p>
      </div>
    </section>
  );
}

export default ModelInfo;
