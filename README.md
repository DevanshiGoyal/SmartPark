# 🅿️ ParkSight - Smart Parking Management System

A comprehensive **AI-powered smart parking management platform** featuring real-time parking detection, analytics, booking system, and traffic monitoring. Built with **React**, **Flask**, **TensorFlow**, and the PKLot dataset for intelligent parking space management.

> 🎯 *Full-stack application combining machine learning, modern web technologies, and real-time data visualization for smart city parking solutions.*

## 🔍 Key Features

✅ **Real-time Parking Detection** - AI-powered parking space occupancy detection using YOLOv8 and TensorFlow  
✅ **Live Analytics Dashboard** - Interactive charts showing hourly trends, weekly forecasts, and zone-wise statistics  
✅ **Smart Booking System** - Reserve parking spots in advance with real-time availability updates  
✅ **Traffic Monitoring** - Congestion tracking with heat maps and wait time predictions  
✅ **Interactive UI** - Modern, responsive design with smooth animations using Framer Motion  
✅ **RESTful API** - Flask backend with comprehensive endpoints for all features  
✅ **Multi-zone Support** - Monitor and manage multiple parking zones simultaneously  

## 🛠 Tech Stack

### Frontend
| Layer         | Technology Used                |
|---------------|--------------------------------|
| **Framework** | React 19 with Vite             |
| **Styling**   | Tailwind CSS + Custom themes   |
| **UI Components** | Radix UI, Material-UI     |
| **Charts**    | Recharts for data visualization|
| **Animations**| Framer Motion                  |
| **Icons**     | Lucide React                   |
| **Routing**   | React Router DOM               |

### Backend
| Layer         | Technology Used                |
|---------------|--------------------------------|
| **Framework** | Flask 3.0                      |
| **ML/AI**     | TensorFlow 2.16, Keras         |
| **Image Processing** | Pillow, NumPy           |
| **API**       | Flask-CORS, RESTful design     |
| **Data**      | PKLot Dataset (Segmented)      |

## 📁 Project Structure

```plaintext
ParkSight/
├── frontend/                    # React frontend application
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   └── ui/              # Shadcn/Radix UI components
│   │   ├── pages/               # Main application pages
│   │   │   ├── Home.jsx         # Landing page
│   │   │   ├── Parking.jsx      # Real-time parking detection
│   │   │   ├── Analytics.jsx    # Data analytics dashboard
│   │   │   ├── Booking.jsx      # Parking reservation system
│   │   │   └── Traffic.jsx      # Traffic monitoring
│   │   ├── lib/                 # Utility functions
│   │   └── App.jsx              # Main app component
│   ├── public/                  # Static assets and detection images
│   ├── package.json
│   └── vite.config.js
├── backend/                     # Flask backend API
│   ├── app.py                   # Main Flask application
│   ├── data_generator.py        # Mock data generation
│   └── requirements.txt         # Python dependencies
├── parking-lot-prediction.ipynb # ML model training notebook
└── README.md`



## 🚀 Getting Started

### Prerequisites

* **Node.js** 20.x or higher
* **Python** 3.12+
* **npm** or **yarn**
* **pip** (Python package manager)

### Installation Steps

#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/DevanshiGoyal/SmartPark.git
cd SmartPark
```

#### 2️⃣ Setup Backend
```bash
cd backend

# Install Python dependencies
pip install flask flask-cors numpy pillow tensorflow

# Start the Flask server (runs on http://localhost:5001)
python app.py
```

#### 3️⃣ Setup Frontend
```bash
cd frontend

# Install Node dependencies
npm install

# Start the development server (runs on http://localhost:5173)
npm run dev
```

#### 4️⃣ Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5001
- **API Health Check**: http://localhost:5001/api/health

## 📊 Application Features

### 🏠 Home Page
- Modern landing page with gradient animations
- Feature highlights and system overview
- Quick navigation to all modules

### 🅿️ Parking Detection
- **Real-time AI Detection**: Upload images or use video feed for parking spot detection
- **Interactive Carousel**: Browse through 9 detection scenarios (cloudy, rainy, sunny conditions)
- **Live Statistics**: View available vs occupied slots with visual indicators
- **YOLOv8 Integration**: Advanced object detection for accurate parking space identification

### 📈 Analytics Dashboard
- **Hourly Trends**: Visual representation of parking occupancy throughout the day
- **Weekly Forecast**: Predictive analytics for parking demand
- **Zone-wise Analysis**: Compare occupancy rates across different parking zones
- **Peak Hours Detection**: Identify busiest times for better resource allocation

### 🎫 Booking System
- **Real-time Availability**: Check available slots by zone and time
- **Advanced Booking**: Reserve parking spots up to 7 days in advance
- **Zone Selection**: Choose from multiple parking zones (Entry, Central, North, South Wing)
- **Booking Management**: View and manage your reservations

### 🚦 Traffic Monitoring
- **Congestion Levels**: Real-time traffic flow analysis for each zone
- **Heat Maps**: Visual representation of congestion intensity
- **Wait Time Predictions**: Estimated wait times based on current traffic
- **Entry Gate Monitoring**: Track vehicle flow at different entry points

## 🧠 Machine Learning Model

### Model Architecture
- **Base Model**: TensorFlow/Keras CNN
- **Input Size**: 54×32×3 (RGB images)
- **Layers**: 
  - 3× Conv2D + MaxPooling layers
  - Dense layers with Dropout for regularization
  - Sigmoid activation for binary classification
- **Training Dataset**: PKLot Segmented dataset

### Training the Model
```bash
# Open the Jupyter notebook
jupyter notebook parking-lot-prediction.ipynb

# Run all cells to train and save the model
# Model will be saved as 'parking_model.h5'
```

## 🌱 Future Enhancements

* 🎥 **Live CCTV Integration** - Connect to real parking lot cameras
* 📱 **Mobile App** - Native iOS/Android applications
* 🔔 **Push Notifications** - Real-time alerts for booking confirmations
* 💳 **Payment Gateway** - Integrated payment system for parking fees
* 🤖 **Enhanced AI** - Multi-object tracking and vehicle type classification
* 🌐 **Multi-language Support** - Internationalization for global deployment
* 📊 **Admin Dashboard** - Backend management portal for operators
* 🔐 **User Authentication** - Secure login and user profile management

## 📸 Screenshots

### Home Page
Modern landing page with smooth animations and feature highlights

### Parking Detection
Real-time AI-powered parking space detection with interactive carousel

### Analytics Dashboard
Comprehensive data visualization with charts and forecasts

### Booking System
User-friendly reservation interface with zone selection

### Traffic Monitoring
Live congestion tracking with heat maps and metrics

## 🔌 API Endpoints

### Health & Status
- `GET /api/health` - Server health check
- `GET /api/parking/status` - Current parking lot status

### Detection
- `POST /api/predict/image` - Predict from uploaded image
- `POST /api/predict/video` - Predict from video frame

### Analytics
- `GET /api/analytics` - Get parking analytics data
- `GET /api/zones` - Get all parking zones
- `GET /api/zones/:id/forecast` - Get zone-specific forecast

### Traffic
- `GET /api/traffic/congestion` - Get traffic congestion data

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is created for educational and portfolio purposes.

## 🙏 Acknowledgments

- **PKLot Dataset** - UFPR (Federal University of Paraná)
- **TensorFlow Team** - For the amazing ML framework
- **React Community** - For the robust frontend ecosystem
- **Shadcn/ui** - For beautiful UI components

## 🌟 Support This Project

If you found this project interesting or useful, please consider giving it a ⭐️ on GitHub!

---

**Made with ❤️ by Devanshi Goyal**

> 🚀 *Building the future of smart city parking solutions*
