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

# CORS Configuration - MUST be before route includes
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:8000",
    ],
    allow_credentials=True,
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
        'status': 'active'
    }

# Create all database tables
Base.metadata.create_all(bind=engine)
