import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import numpy as np
import tensorflow as tf

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Use absolute paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(BASE_DIR, "model", "plant_disease_prediction_model.h5")
class_indices_path = os.path.join(BASE_DIR, "model", "class_indices.json")

# Load model and class indices
try:
    model = tf.keras.models.load_model(model_path)
    with open(class_indices_path, 'r') as f:
        class_indices = json.load(f)
    print("Model and class indices loaded successfully!")
except Exception as e:
    print(f"Error loading model or class indices: {e}")
    model = None
    class_indices = None

def load_and_preprocess_image(image):
    try:
        img = Image.open(image)
        # Convert to RGB if necessary
        if img.mode != 'RGB':
            img = img.convert('RGB')
        img = img.resize((224, 224))
        img_array = np.expand_dims(np.array(img).astype("float32") / 255.0, axis=0)
        return img_array
    except Exception as e:
        print(f"Error preprocessing image: {e}")
        return None

@app.route('/', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'Plant Disease Prediction API is running'})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Check if model is loaded
        if model is None or class_indices is None:
            return jsonify({'error': 'Model not loaded properly'}), 500
        
        # Check if image is in request
        if 'image' not in request.files:
            return jsonify({'error': 'No image uploaded'}), 400

        image = request.files['image']
        
        # Check if file is selected
        if image.filename == '':
            return jsonify({'error': 'No image selected'}), 400
        
        # Process image
        processed_image = load_and_preprocess_image(image)
        if processed_image is None:
            return jsonify({'error': 'Error processing image'}), 400
        
        # Make prediction
        predictions = model.predict(processed_image)
        predicted_index = np.argmax(predictions, axis=1)[0]
        confidence = float(np.max(predictions))
        predicted_label = class_indices[str(predicted_index)]

        return jsonify({
            'prediction': predicted_label,
            'confidence': confidence,
            'status': 'success'
        })
    
    except Exception as e:
        print(f"Error in prediction: {e}")
        return jsonify({'error': f'Internal server error: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)