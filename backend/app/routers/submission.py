from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.schemas.submission import SubmissionCreate, SubmissionRead
from app.models.submission import Submission
from app.models.assignment import Assignment
from app.models.enrollment import Enrollment
from app.models.course import Course
from app.models.user import User
from app.utils import get_current_user
from app.db import get_db

router = APIRouter(prefix="/submissions", tags=["Submissions"])

@router.post("/", response_model=SubmissionRead, status_code=status.HTTP_201_CREATED)
def submit_assignment(
    submission: SubmissionCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Submit an assignment (Students only)"""
    if current_user.role != "student":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only students can submit assignments"
        )

    # Check if assignment exists
    assignment = db.query(Assignment).filter(
        Assignment.id == submission.assignment_id
    ).first()
    if not assignment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Assignment not found"
        )

    # Check if student is enrolled in the course
    enrollment = db.query(Enrollment).filter(
        Enrollment.student_id == current_user.id,
        Enrollment.course_id == assignment.course_id
    ).first()
    if not enrollment:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You must be enrolled in the course to submit assignments"
        )

    # Check if already submitted
    existing = db.query(Submission).filter(
        Submission.assignment_id == submission.assignment_id,
        Submission.student_id == current_user.id
    ).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Assignment already submitted"
        )

    new_submission = Submission(
        **submission.model_dump(),
        student_id=current_user.id
    )
    db.add(new_submission)
    db.commit()
    db.refresh(new_submission)
    return new_submission

@router.get("/my-submissions", response_model=List[SubmissionRead])
def get_my_submissions(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get current student's submissions"""
    if current_user.role != "student":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only students can view their submissions"
        )

    submissions = db.query(Submission).filter(
        Submission.student_id == current_user.id
    ).all()
    return submissions

@router.get("/assignment/{assignment_id}", response_model=List[SubmissionRead])
def get_assignment_submissions(
    assignment_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all submissions for an assignment (Teacher or Admin only)"""
    assignment = db.query(Assignment).filter(Assignment.id == assignment_id).first()
    if not assignment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Assignment not found"
        )

    # Get the course to check teacher authorization
    course = db.query(Course).filter(Course.id == assignment.course_id).first()

    if current_user.role == "student":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Students cannot view all submissions"
        )

    if current_user.role == "teacher" and course.teacher_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Teachers can only view submissions for their own courses"
        )

    submissions = db.query(Submission).filter(
        Submission.assignment_id == assignment_id
    ).all()
    return submissions

@router.get("/{submission_id}", response_model=SubmissionRead)
def get_submission(
    submission_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get a specific submission"""
    submission = db.query(Submission).filter(Submission.id == submission_id).first()
    if not submission:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Submission not found"
        )

    # Students can only view their own submissions
    if current_user.role == "student" and submission.student_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Students can only view their own submissions"
        )

    return submission

