"""
The World is Math - Backend API
Advanced mathematical pattern detection engine
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

# Lifespan manager for startup/shutdown
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("🌍 The World is Math - Backend starting...")
    print("📊 Loading ML models...")
    # Model loading will happen here
    yield
    # Shutdown
    print("👋 Backend shutting down...")

# Initialize FastAPI app
app = FastAPI(
    title="The World is Math API",
    description="Advanced mathematical pattern detection and analysis",
    version="2.0.0",
    lifespan=lifespan
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(api_router)

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "The World is Math API"}

# Root endpoint
@app.get("/")
async def root():
    return {
        "name": "The World is Math",
        "version": "2.0.0",
        "docs": "/docs",
        "message": "Discover the mathematical beauty of reality"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
