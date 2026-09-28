# 🚀 Quick Start: Mobile MVP

Get the complete mobile app running end-to-end in 15 minutes!

## What's Included

✅ **Mobile App** - Beautiful React Native camera interface
✅ **Backend API** - FastAPI server with image analysis
✅ **End-to-End Pipeline** - Capture → Upload → Analyze → Display

## Prerequisites

- Node.js 18+
- Python 3.10+
- Expo CLI: `npm install -g expo-cli`
- Expo Go app (iOS or Android)

## 1️⃣ Start the Backend (Terminal 1)

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the server
python main.py
```

**Expected output:**
```
🌍 The World is Math - Backend starting...
📊 Loading ML models...
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete
```

✅ Backend is ready at `http://localhost:8000`
📖 API docs at `http://localhost:8000/docs`

## 2️⃣ Start the Mobile App (Terminal 2)

```bash
cd mobile

# Install dependencies
npm install

# Start Expo
npm start
```

**You'll see:**
```
expo-cli is configured to use development server on your machine
LAN connection details:
  exp://192.168.x.x:19000

Press 'i' to open iOS Simulator
Press 'a' to open Android Emulator
Press 'w' to open web
Press 'r' to restart Expo
Press 's' for development server status
```

## 3️⃣ Run on Your Device or Simulator

### Option A: iOS Simulator
```
Press 'i' in the Expo terminal
```

### Option B: Android Emulator
```
Press 'a' in the Expo terminal
```

### Option C: Physical Device
1. Download **Expo Go** from your app store
2. Scan the QR code shown in terminal with your phone camera
3. Tap the notification to open in Expo Go

## 4️⃣ Test the App

1. **Grant Permissions** - Allow camera and photo library access
2. **Capture an Image**
   - Tap the center capture button 🎥
   - Or tap "📷 Gallery" to select from photos
3. **View Results**
   - The app sends the image to the backend
   - Backend returns mock analysis with patterns and confidence scores
   - Results display beautifully on ResultsScreen
4. **Browse History**
   - Tap "📚 History" to see all analyzed images
   - Swipe to refresh

## 🔍 What's Happening

```
Mobile App                    Backend
───────────                   ───────
📸 Capture image  ──POST──►  /api/analyze
   ↓               (base64)       ↓
🔄 Loading...                  Analyze image
   ↓                              ↓
📊 Display results ◄──JSON──  Return patterns
   ↓
✨ Show confidence scores
   ↓
💾 Save to history
```

## 🐛 Troubleshooting

### Backend won't start
```bash
# Port 8000 already in use?
lsof -i :8000
# Kill the process or use different port in main.py
```

### Mobile app won't connect to backend
```bash
# Make sure both are on same network
# Update API_URL in mobile/.env if needed
EXPO_PUBLIC_API_URL=http://192.168.1.100:8000

# Or for Android emulator (special IP):
EXPO_PUBLIC_API_URL=http://10.0.2.2:8000
```

### Expo won't find camera
```bash
# For simulator, make sure permissions are granted
# For physical device, reinstall Expo Go and grant all permissions
```

### "Analysis failed" error
```bash
# Check backend is running: curl http://localhost:8000/health
# Check logs in backend terminal for errors
# Verify base64 encoding is correct
```

## 📚 Next Steps

### Ready to Add Real ML?
See `PHASE2_ARCHITECTURE.md` for:
- Geometric shape detector (Hough Transform)
- Fractal pattern detection
- Symmetry analysis engine
- AR visualization

### Want to Deploy?
- Web version: `web/` directory
- Production backend: Containerize with Docker
- Mobile build: `eas build` with Expo

### Test Data
Try these images:
- Geometric patterns (architecture photos)
- Nature fractals (ferns, trees, clouds)
- Mandalas and symmetric designs
- Tessellations and tiles

## 📱 App Flow

```
Start
  ↓
CameraScreen (capture/gallery)
  ↓
Upload to Backend
  ↓
ResultsScreen (view patterns)
  ├─ Pattern cards with confidence
  ├─ Mathematical properties
  └─ "Analyze Another" button
      ↓
    Back to CameraScreen
    OR
    GalleryScreen (history)
      ├─ Previous analyses
      └─ Refresh to load more
```

## ✨ Features Showcase

**CameraScreen:**
- Live camera preview
- Capture button (red circle)
- Gallery picker
- History access

**ResultsScreen:**
- Beautiful image display
- Confidence score visualization
- Mathematical properties breakdown
- Related pattern suggestions

**GalleryScreen:**
- Chronological history
- Pattern badges
- Swipe to refresh
- Empty state guidance

## 🎨 Design Aesthetic

The app follows the "Pure Math" aesthetic:
- Elegant typography (Lora serif)
- Soft color palette (#f5f3f0, #6b8cae)
- Generous whitespace
- Mathematical accuracy in presentation

## 📖 API Reference

### POST /api/analyze
```json
{
  "image": "base64_encoded_image",
  "format": "base64"
}
```

Response:
```json
{
  "id": "uuid",
  "image_url": "...",
  "analyses": [
    {
      "type": "Geometry",
      "confidence": 0.92,
      "description": "Detected geometric shapes...",
      "data": {...}
    }
  ],
  "created_at": "2024-01-01T12:00:00"
}
```

### GET /api/analyses
Returns array of all analyses

### GET /api/analyses/{id}
Get specific analysis

### DELETE /api/analyses/{id}
Delete an analysis

## 🚀 You're Ready!

You now have a fully functional mobile app that captures images, sends them to the backend for analysis, and displays beautiful results. The foundation is set for adding advanced ML models next! 🌍✨
