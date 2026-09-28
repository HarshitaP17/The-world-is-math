# 🛠️ Development Setup

## Prerequisites

- Node.js 18+ (for web and mobile)
- Python 3.10+ (for backend)
- Git
- Docker & Docker Compose (optional, for containerized setup)

## Project Structure

### Backend (Python/FastAPI)
```
backend/
├── app/
│   ├── api/           # API endpoints
│   ├── models/        # Database models
│   ├── services/      # Business logic
│   └── ml/            # ML model interfaces
├── tests/             # Unit and integration tests
├── requirements.txt   # Python dependencies
└── main.py            # FastAPI app entry point
```

### Mobile (React Native)
```
mobile/
├── app/
│   ├── screens/       # Screen components
│   ├── components/    # Reusable components
│   ├── services/      # API & ML services
│   ├── navigation/    # Navigation structure
│   └── context/       # State management (Redux)
├── app.json           # Expo configuration
└── package.json
```

### Web (Next.js)
```
web/
├── app/
│   ├── (home)/        # Home page
│   ├── gallery/       # Image gallery
│   ├── research/      # Research hub
│   └── community/     # Community features
├── components/        # React components
├── lib/              # Utilities and helpers
└── public/           # Static assets
```

## Getting Started

### 1. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

Backend runs on `http://localhost:8000`

### 2. Mobile Setup

```bash
cd mobile
npm install
npx expo start
```

Scan QR code with Expo Go app or press 'i' for iOS simulator, 'a' for Android emulator.

### 3. Web Setup

```bash
cd web
npm install
npm run dev
```

Web app runs on `http://localhost:3000`

## API Documentation

Once backend is running, visit `http://localhost:8000/docs` for interactive API docs (Swagger UI).

## Database

PostgreSQL is used for persistent storage. Configure in `.env`:

```
DATABASE_URL=postgresql://user:password@localhost:5432/world_is_math
```

## ML Models

Model files go in `models/` directory:
- `models/geometric_detector.pth` - PyTorch geometric shape detector
- `models/fractal_detector.pth` - Fractal pattern detection
- `models/symmetry_engine.pth` - Symmetry analysis
- (etc.)

Download or train models as needed.

## Environment Variables

Create `.env` files in `backend/`, `mobile/`, and `web/`:

```
# backend/.env
DEBUG=True
DATABASE_URL=postgresql://localhost/world_is_math
API_PORT=8000

# mobile/.env
API_URL=http://localhost:8000

# web/.env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Running Tests

```bash
# Backend
cd backend
pytest

# Mobile
cd mobile
npm test

# Web
cd web
npm test
```

## Docker Setup (Optional)

```bash
docker-compose up -d
```

This starts PostgreSQL, Redis, and creates development containers.

## Troubleshooting

### Port conflicts
If port 8000 or 3000 is already in use, change in:
- Backend: `main.py` → `uvicorn.run(..., port=8001)`
- Web: `next.config.js` → custom dev server port

### ML Model imports
Ensure PyTorch and TensorFlow are properly installed for your OS:
```bash
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu
```

### Expo issues
Clear cache and rebuild:
```bash
cd mobile
rm -rf node_modules .expo
npm install
npx expo start -c
```

## Contributing

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes and test
3. Commit: `git commit -m "feat: description"`
4. Push: `git push origin feature/your-feature`
5. Create PR

See CLAUDE.md for AI-assisted development guidelines.
