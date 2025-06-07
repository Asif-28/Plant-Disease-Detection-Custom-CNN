import os
import json
import numpy as np
import tensorflow as tf
from PIL import Image

BASE = os.path.dirname(os.path.abspath(__file__))
model = tf.keras.models.load_model(os.path.join(BASE, "model", "plant_disease_prediction_model.h5"))
class_indices = json.load(open(os.path.join(BASE, "model", "class_indices.json")))

def load_and_preprocess_image(image_file, target_size=(224, 224)):
    img = Image.open(image_file)
    img = img.resize(target_size)
    arr = np.array(img).astype('float32') / 255.0
    arr = np.expand_dims(arr, axis=0)
    return arr

def predict_image_class(model, image_file, class_indices):
    arr = load_and_preprocess_image(image_file)
    preds = model.predict(arr)
    idx = int(np.argmax(preds, axis=1)[0])
    return class_indices[str(idx)]
