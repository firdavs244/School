import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import user, course, enrollment, assignment, submission, grade
from app.db import engine, Base
from app.models import User, Course, Enrollment, Assignment, Submission, Grade

app = FastAPI(
    title="Online Maktab API",
    description="Online School Management System",
    version="1.0.0"
)

# CORS Configuration - environment'dan olish
cors_origins_str = os.getenv("CORS_ORIGINS", "*")

# Agar "*" bo'lsa, barcha originlarni qabul qilish
if cors_origins_str == "*":
    cors_origins = ["*"]
else:
    cors_origins = [origin.strip() for origin in cors_origins_str.split(",")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True if cors_origins != ["*"] else False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(user.router)
app.include_router(course.router)
app.include_router(enrollment.router)
app.include_router(assignment.router)
app.include_router(submission.router)
app.include_router(grade.router)

@app.get('/', tags=["Root"])
def read_root():
    return {
        'message': 'Online Maktab API',
        'version': '1.0.0',
        'status': 'active',
        'environment': os.getenv("ENVIRONMENT", "development")
    }

@app.get('/health', tags=["Health"])
def health_check():
    return {'status': 'healthy'}

# Create all database tables
Base.metadata.create_all(bind=engine)

