# models package
# Import all models to ensure they are registered with SQLAlchemy

from app.models.user import User, UserRole
from app.models.course import Course
from app.models.enrollment import Enrollment
from app.models.assignment import Assignment
from app.models.submission import Submission
from app.models.grade import Grade

__all__ = [
    "User",
    "UserRole",
    "Course",
    "Enrollment",
    "Assignment",
    "Submission",
    "Grade"
]



