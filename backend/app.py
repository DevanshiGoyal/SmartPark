from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import base64
from PIL import Image
import io
import os
from data_generator import ParkingDataGenerator

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Global variable to store the model
model = None
keras = None

# Initialize data generator
data_generator = ParkingDataGenerator()

def load_keras():
    """Lazy load TensorFlow/Keras to speed up startup"""
    global keras
    if keras is None:
        print("📦 Loading TensorFlow/Keras (this may take a moment)...")
        from tensorflow import keras as k
        keras = k
    return keras

def load_model_if_exists():
    """Load the trained model if it exists"""
    global model
    model_path = os.path.join(os.path.dirname(__file__), '..', 'parking_model.h5')
    if os.path.exists(model_path):
        try:
            k = load_keras()
            model = k.models.load_model(model_path)
            print(f"✅ Model loaded from {model_path}")
            return True
        except Exception as e:
            print(f"⚠️ Error loading model: {e}")
            return False
    else:
        print(f"⚠️ Model file not found at {model_path}")
        print("ℹ️ Please train the model first using the Jupyter notebook")
        return False

@app.route('/')
def home():
    """Health check endpoint"""
    return jsonify({
        'status': 'running',
        'message': 'ParkSight API is active',
        'model_loaded': model is not None
    })

@app.route('/api/health', methods=['GET'])
def health():
    """Detailed health check"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None,
        'endpoints': {
            'predict_image': '/api/predict/image',
            'predict_video': '/api/predict/video',
            'parking_status': '/api/parking/status',
            'train_model': '/api/train'
        }
    })

@app.route('/api/parking/status', methods=['GET'])
def get_parking_status():
    """Get current parking lot status"""
    # Mock data for demonstration
    # In a real scenario, this would come from the ML model predictions
    occupied_slots = [1, 10, 11, 29, 30, 32]
    total_slots = 41
    available_slots = total_slots - len(occupied_slots)
    
    slots = []
    for i in range(1, total_slots + 1):
        slots.append({
            'id': i,
            'status': 'occupied' if i in occupied_slots else 'available'
        })
    
    return jsonify({
        'total_slots': total_slots,
        'available_slots': available_slots,
        'occupied_slots': len(occupied_slots),
        'slots': slots,
        'occupancy_rate': (len(occupied_slots) / total_slots) * 100
    })

@app.route('/api/predict/image', methods=['POST'])
def predict_image():
    """Predict parking occupancy from uploaded image"""
    if not model:
        return jsonify({
            'error': 'Model not loaded',
            'message': 'Please train the model first using the Jupyter notebook'
        }), 503
    
    try:
        # Get image from request
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400
        
        file = request.files['image']
        
        # Read and preprocess image
        image = Image.open(file.stream)
        image = image.convert('RGB')
        image = image.resize((54, 32))  # Resize to model input size
        image_array = np.array(image) / 255.0  # Normalize
        image_array = np.expand_dims(image_array, axis=0)
        
        # Make prediction
        prediction = model.predict(image_array)
        is_occupied = prediction[0][0] > 0.5
        confidence = float(prediction[0][0] if is_occupied else 1 - prediction[0][0])
        
        return jsonify({
            'prediction': 'occupied' if is_occupied else 'available',
            'confidence': confidence,
            'raw_score': float(prediction[0][0])
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/predict/video', methods=['POST'])
def predict_video():
    """Process video frame for parking detection"""
    if not model:
        return jsonify({
            'error': 'Model not loaded',
            'message': 'Please train the model first using the Jupyter notebook'
        }), 503
    
    try:
        # Get base64 encoded frame from request
        data = request.get_json()
        if 'frame' not in data:
            return jsonify({'error': 'No frame provided'}), 400
        
        # Decode base64 image
        image_data = base64.b64decode(data['frame'].split(',')[1])
        image = Image.open(io.BytesIO(image_data))
        
        # Preprocess
        image = image.convert('RGB')
        image = image.resize((54, 32))
        image_array = np.array(image) / 255.0
        image_array = np.expand_dims(image_array, axis=0)
        
        # Predict
        prediction = model.predict(image_array)
        is_occupied = prediction[0][0] > 0.5
        confidence = float(prediction[0][0] if is_occupied else 1 - prediction[0][0])
        
        return jsonify({
            'prediction': 'occupied' if is_occupied else 'available',
            'confidence': confidence
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/analytics', methods=['GET'])
def get_analytics():
    """Get parking analytics data"""
    hourly_trends = data_generator.generate_hourly_trends()
    weekly_forecast = data_generator.generate_weekly_forecast()
    
    return jsonify({
        'hourly_trends': hourly_trends,
        'weekly_forecast': weekly_forecast,
        'total_capacity': sum(z["total_slots"] for z in data_generator.zones),
        'total_zones': len(data_generator.zones)
    })

@app.route('/api/zones', methods=['GET'])
def get_zones():
    """Get all parking zones with current data"""
    zones_data = data_generator.generate_zone_data()
    return jsonify({
        'zones': zones_data,
        'timestamp': __import__('datetime').datetime.now().isoformat(),
        'total_zones': len(zones_data)
    })

@app.route('/api/zones/<int:zone_id>/forecast', methods=['GET'])
def get_zone_forecast(zone_id):
    """Get forecast for a specific zone"""
    hours = request.args.get('hours', default=6, type=int)
    forecast = data_generator.generate_forecast(zone_id, hours)
    
    if not forecast:
        return jsonify({'error': 'Zone not found'}), 404
    
    return jsonify({
        'zone_id': zone_id,
        'forecast': forecast,
        'hours': hours
    })

@app.route('/api/traffic/congestion', methods=['GET'])
def get_traffic_congestion():
    """Get traffic congestion data for all zones"""
    zones_data = data_generator.generate_zone_data()
    
    congestion_summary = {
        'zones': zones_data,
        'overall_congestion': {
            'critical': len([z for z in zones_data if z['congestion']['level'] == 'Critical']),
            'high': len([z for z in zones_data if z['congestion']['level'] == 'High']),
            'moderate': len([z for z in zones_data if z['congestion']['level'] == 'Moderate']),
            'low': len([z for z in zones_data if z['congestion']['level'] == 'Low']),
            'minimal': len([z for z in zones_data if z['congestion']['level'] == 'Minimal'])
        },
        'avg_wait_time': round(sum(z['avg_wait_time'] for z in zones_data) / len(zones_data), 1),
        'total_traffic_flow': sum(z['traffic_flow'] for z in zones_data)
    }
    
    return jsonify(congestion_summary)

@app.route('/api/train', methods=['POST'])
def train_model():
    """Endpoint to trigger model training"""
    return jsonify({
        'message': 'Model training should be done through the Jupyter notebook',
        'notebook': 'parking-lot-prediction.ipynb',
        'instructions': 'Run all cells in the notebook to train and save the model'
    }), 200

if __name__ == '__main__':
    print("🚀 Starting ParkSight Backend API...")
    print("=" * 50)
    
    # Don't load model on startup to speed up server start
    print("ℹ️  Model will be loaded on first prediction request")
    print("   (To pre-load model, access /api/health after server starts)")
    
    print("=" * 50)
    print("🌐 Server starting on http://localhost:5000")
    print("📝 API Documentation:")
    print("   - GET  /api/health - Health check")
    print("   - GET  /api/parking/status - Get parking status")
    print("   - POST /api/predict/image - Predict from image")
    print("   - POST /api/predict/video - Predict from video frame")
    print("   - GET  /api/analytics - Get analytics data")
    print("=" * 50)
    print("✅ Server is ready!")
    print("")
    
    # Try port 5001 if 5000 is busy (common on macOS with AirPlay)
    import socket
    port = 5000
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.bind(('', port))
        sock.close()
    except OSError:
        port = 5001
        print(f"⚠️  Port 5000 in use, using port {port} instead")
        print(f"🌐 Server will start on http://localhost:{port}")
    
    app.run(debug=True, host='0.0.0.0', port=port)