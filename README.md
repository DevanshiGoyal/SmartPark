# 🚗 ParkSight - Intelligent Parking Management System

[![React](https://img.shields.io/badge/React-19.1.1-blue?logo=react)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Flask-3.0-green?logo=flask)](https://flask.palletsprojects.com/)
[![YOLOv8](https://img.shields.io/badge/YOLOv8-m-red)](https://docs.ultralytics.com/)
[![Python](https://img.shields.io/badge/Python-3.10+-yellow?logo=python)](https://www.python.org/)

**Real-time AI-powered parking management** using YOLOv8 deep learning with **99%+ accuracy**. Upload parking lot images for instant detection with color-coded bounding boxes, occupancy statistics, and interactive booking.

---

## 🌟 Features

- 🎯 **Real-time Detection** - Process images in < 2 seconds  
- 🧠 **YOLOv8m AI** - 99.30% mAP50 accuracy  
- 🎨 **Visual Feedback** - Green (empty) / Red (occupied) boxes  
- 📊 **Live Statistics** - Real-time occupancy tracking  
- 🎫 **Smart Booking** - Interactive slot reservation  
- 📱 **Modern UI** - React 19 with Framer Motion  
- ⚡ **Fast Inference** - 50-200ms GPU, 500-1000ms CPU  

---

## 🏗️ Architecture

```
Frontend (React 19)              Backend (Flask + YOLOv8)
http://localhost:5173            http://localhost:5001
        │                                 │
        │  POST /detect (image)           │
        ├─────────────────────────────────>│
        │                                 │ 1. Receive image
        │                                 │ 2. Run YOLOv8 inference  
        │                                 │ 3. Draw bounding boxes
        │                                 │ 4. Calculate statistics
        │                                 │ 5. Return JSON + base64
        │<─────────────────────────────────┤
        │  {annotated_image_b64, stats}   │
        │                                 ▼
                                    best.pt (52MB)
                                    YOLOv8m Model
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js ≥ 18
- Python ≥ 3.10
- npm/yarn

### 1. Clone & Install

```bash
# Clone repository
git clone https://github.com/DevanshiGoyal/SmartPark.git
cd SmartPark

# Backend setup
cd backend
python -m venv venv
.\venv\Scripts\activate  # Windows
pip install -r requirements.txt

# Frontend setup
cd ../frontend
npm install
```

### 2. Obtain Model File (best.pt)

**Option A: Kaggle Training (FREE GPU)**
1. Go to [Kaggle](https://www.kaggle.com/code)
2. Upload `parking-lot-prediction.ipynb`
3. Add dataset: Search "pklot-yolov8"
4. Enable GPU: Settings → GPU T4
5. Run Cell 4 (2-3 hours)
6. Download `best.pt` → Place in `backend/`

**Option B: Download Pre-trained**
- Check project releases

### 3. Run Application

```powershell
# Terminal 1: Backend
cd backend
C:/DevProjects/ParkSight/.venv/Scripts/python.exe app.py

# Terminal 2: Frontend  
cd frontend
npm run dev
```

### 4. Access
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5001
- **Health**: http://localhost:5001/health

---

## 📖 User Guide

### Detecting Parking Spaces

1. **Navigate** to http://localhost:5173/parking
2. **Upload** parking lot image (JPG/PNG, < 10MB)
3. **View Results**:
   - Annotated image with bounding boxes
   - Confidence badge (typically 95-96%)
   - Statistics: Total/Occupied/Available counts
4. **Interactive Grid**:
   - Each slot shows confidence score
   - Green slots = Available (clickable to book)
   - Red slots = Occupied (non-clickable)

### Booking a Spot

1. Click any **green** (available) slot in the grid
2. Select **duration** (1-4 hours)
3. Enter **vehicle number**
4. Choose **payment method**
5. Confirm booking → Download parking pass

---

## 🔌 API Reference

### Endpoints

```http
GET  /health                    # Health check
POST /detect                    # Full detection (JSON + image)
POST /infer                     # Frontend-optimized
POST /detect/json               # JSON only
POST /detect/image              # Image only
GET  /download/<filename>       # Retrieve saved images
```

### Request Example

```bash
curl -X POST http://localhost:5001/detect \
  -F "image=@parking_lot.jpg" \
  -F "confidence=0.25"
```

### Response Example

```json
{
  "success": true,
  "timestamp": "2024-01-15T10:30:00Z",
  "annotated_image_b64": "iVBORw0KGgoAAAA...",
  "occupied_count": 27,
  "free_count": 1,
  "per_spot": [true, true, false, true, ...],
  "confidence": [0.96, 0.95, 0.94, ...],
  "statistics": {
    "total_spaces": 28,
    "occupancy_rate": 96.43
  }
}
```

---

## 📁 Project Structure

```
ParkSight/
├── frontend/                   # React 19 application
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Parking.jsx    # ⭐ Main detection UI
│   │   │   ├── Booking.jsx    # Booking system
│   │   │   ├── Home.jsx       # Landing page
│   │   │   ├── Analytics.jsx  # Dashboard
│   │   │   └── Traffic.jsx    # Traffic monitor
│   │   └── components/         # Reusable components
│   └── package.json
│
├── backend/                    # Flask API
│   ├── app.py                 # ⭐ Main API (601 lines)
│   ├── requirements.txt       # Python dependencies
│   ├── best.pt                # ⚠️ Model weights (REQUIRED)
│   ├── uploads/               # Temp storage
│   └── outputs/               # Results
│
├── parking-lot-prediction.ipynb  # ⭐ Training notebook
├── docs/                       # Additional documentation
│   ├── TRAINING_GUIDE.md      # Detailed training guide
│   ├── QUICK_START.md         # Quick reference
│   ├── ACCURACY_IMPROVEMENTS.md
│   ├── INTEGRATION_STATUS.md
│   └── INTEGRATION_COMPLETE.md
└── README.md                   # This file (main documentation)
```

---

## 🎯 Model Performance

Trained on **PKLot Dataset** (10,000+ images):

| Metric        | Score   | Description                      |
|---------------|---------|----------------------------------|
| **mAP50**     | 99.30%  | Detection accuracy at 50% IoU    |
| **Precision** | 99.87%  | Correct positive predictions     |
| **Recall**    | 99.14%  | Actual positives detected        |
| **F1-Score**  | 99.50%  | Precision-recall harmonic mean   |

**Classes**: `space-occupied` (red), `space-empty` (green)  
**Confidence**: Typically 94-97% per detection  
**Speed**: 50-200ms (GPU), 500-1000ms (CPU)

---

## 🛠️ Tech Stack

### Frontend
- **React** 19.1.1 with Vite 7.1.7
- **Styling**: TailwindCSS 3.4
- **Animation**: Framer Motion 12
- **Icons**: Lucide React
- **Routing**: React Router DOM 7
- **Charts**: Recharts 3

### Backend
- **Flask** 3.0 with Flask-CORS
- **ML**: YOLOv8m (Ultralytics)
- **Vision**: OpenCV, Pillow
- **DL**: PyTorch 2.0+, TorchVision
- **Data**: NumPy, PKLot Dataset

---

## 🔧 Configuration

### Backend (app.py)

```python
MODEL_PATH = "best.pt"            # Model file
CONFIDENCE_THRESHOLD = 0.25       # Detection threshold
UPLOAD_FOLDER = "uploads"         # Temp storage
OUTPUT_FOLDER = "outputs"         # Results

COLORS = {
    'space-empty': (0, 255, 0),   # Green
    'space-occupied': (0, 0, 255) # Red
}
```

### Frontend (Parking.jsx)

```javascript
const API_URL = "http://localhost:5001";
const MAX_FILE_SIZE = 10 * 1024 * 1024;  // 10MB
const ACCEPTED_FORMATS = ['.jpg', '.png'];
```

---

## 🐛 Troubleshooting

### Model Not Found
```
❌ FileNotFoundError: best.pt
```
**Solution**: Train on Kaggle or download from releases. Place in `backend/`

### No Detections
```
⚠️ 0 objects detected
```
**Solution**: Lower `CONFIDENCE_THRESHOLD` to 0.15 in `app.py`

### CORS Errors
```
❌ Access-Control-Allow-Origin blocked
```
**Solution**: Verify backend running on localhost:5001

### Port In Use
```
❌ Port 5001 already in use
```
**Solution**:
```powershell
Get-Process -Id (Get-NetTCPConnection -LocalPort 5001).OwningProcess | Stop-Process
```

---

## 📚 Additional Documentation

Detailed documentation is available in the `docs/` folder:

- **[Training Guide](docs/TRAINING_GUIDE.md)** - Complete model training instructions
- **[Quick Start](docs/QUICK_START.md)** - Rapid setup guide
- **[Accuracy Improvements](docs/ACCURACY_IMPROVEMENTS.md)** - Frontend optimization details
- **[Integration Status](docs/INTEGRATION_STATUS.md)** - Implementation progress
- **[Integration Complete](docs/INTEGRATION_COMPLETE.md)** - Final integration notes

---

## 🚀 Deployment

### Docker Deployment

**Backend Dockerfile**:
```dockerfile
FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 5001
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5001", "app:app"]
```

**Frontend Dockerfile**:
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

**docker-compose.yml**:
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "5001:5001"
    volumes:
      - ./backend/best.pt:/app/best.pt
  
  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
```

---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

---

## 📄 License

MIT License - See [LICENSE](LICENSE) file

---

## 👥 Team

**Project Owner**: Devanshi Goyal  
**Repository**: [github.com/DevanshiGoyal/SmartPark](https://github.com/DevanshiGoyal/SmartPark)

### Acknowledgments
- **YOLOv8**: [Ultralytics](https://github.com/ultralytics/ultralytics)
- **PKLot Dataset**: Federal University of Paraná

---

## 🔮 Roadmap

### v2.0 (Planned)
- [ ] Real-time video stream support
- [ ] Mobile app (React Native)
- [ ] Multi-camera management
- [ ] Payment gateway integration
- [ ] Email/SMS notifications
- [ ] Admin dashboard

### v3.0 (Future)
- [ ] License plate recognition
- [ ] Vehicle type classification
- [ ] IoT sensor integration
- [ ] Cloud deployment templates

---

## 📞 Support

### Need Help?

1. **Documentation**: Check guides in repository
2. **Issues**: [GitHub Issues](https://github.com/DevanshiGoyal/SmartPark/issues)
3. **Discussions**: [GitHub Discussions](https://github.com/DevanshiGoyal/SmartPark/discussions)

### FAQ

**Q: How accurate is detection?**  
A: 99.30% mAP50, 99.87% precision, 99.14% recall

**Q: Can I use commercially?**  
A: Yes, under MIT License terms

**Q: Does it work with video?**  
A: Currently images only. Video support planned for v2.0

**Q: GPU required?**  
A: Optional. CPU works but 5-10x slower

---

## ⭐ Star History

If you find this helpful, please star the repository!

[![Star History](https://api.star-history.com/svg?repos=DevanshiGoyal/SmartPark&type=Date)](https://star-history.com/#DevanshiGoyal/SmartPark&Date)

---

<div align="center">

**Made with ❤️ by the ParkSight Team**

[Report Bug](https://github.com/DevanshiGoyal/SmartPark/issues) • 
[Request Feature](https://github.com/DevanshiGoyal/SmartPark/issues) • 
[Documentation](https://github.com/DevanshiGoyal/SmartPark/wiki)

**⭐ Star us on GitHub — it motivates us a lot!**

---

**Version 1.0.0** | **Status: Production Ready 🚀** | **Last Updated: November 25, 2025**

</div>
