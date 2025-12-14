from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.schemas.grade import GradeCreate, GradeRead
from app.models.grade import Grade
from app.models.enrollment import Enrollment
from app.models.submission import Submission
from app.models.course import Course
from app.models.user import User
from app.utils import get_current_user
from app.db import get_db

router = APIRouter(prefix="/grades", tags=["Grades"])

@router.post("/", response_model=GradeRead, status_code=status.HTTP_201_CREATED)
def create_grade(
    grade: GradeCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a grade for a submission or enrollment (Teacher or Admin only)"""
    if current_user.role not in ["admin", "teacher"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only teachers and admins can create grades"
        )

    # Check enrollment exists
    enrollment = db.query(Enrollment).filter(
        Enrollment.id == grade.enrollment_id
    ).first()
    if not enrollment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Enrollment not found"
        )

    # If grading a submission, verify it exists
    if grade.submission_id:
        submission = db.query(Submission).filter(
            Submission.id == grade.submission_id
        ).first()
        if not submission:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Submission not found"
            )

    # Check teacher authorization
    course = db.query(Course).filter(Course.id == enrollment.course_id).first()
    if current_user.role == "teacher" and course.teacher_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Teachers can only grade their own course submissions"
        )

    new_grade = Grade(**grade.model_dump())
    db.add(new_grade)
    db.commit()
    db.refresh(new_grade)
    return new_grade

@router.get("/enrollment/{enrollment_id}", response_model=List[GradeRead])
def get_enrollment_grades(
    enrollment_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all grades for an enrollment"""
    enrollment = db.query(Enrollment).filter(Enrollment.id == enrollment_id).first()
    if not enrollment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Enrollment not found"
        )

    # Students can only view their own grades
    if current_user.role == "student" and enrollment.student_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Students can only view their own grades"
        )

    # Teachers can only view grades for their courses
    if current_user.role == "teacher":
        course = db.query(Course).filter(Course.id == enrollment.course_id).first()
        if course.teacher_id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Teachers can only view grades for their own courses"
            )

    grades = db.query(Grade).filter(Grade.enrollment_id == enrollment_id).all()
    return grades

@router.get("/my-grades", response_model=List[GradeRead])
def get_my_grades(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get current student's grades"""
    if current_user.role != "student":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only students can use this endpoint"
        )

    # Get all enrollments for the student
    enrollments = db.query(Enrollment).filter(
        Enrollment.student_id == current_user.id
    ).all()

    # Get all grades for those enrollments
    enrollment_ids = [e.id for e in enrollments]
    grades = db.query(Grade).filter(Grade.enrollment_id.in_(enrollment_ids)).all()
    return grades

@router.put("/{grade_id}", response_model=GradeRead)
def update_grade(
    grade_id: int,
    grade_update: GradeCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update a grade (Teacher or Admin only)"""
    if current_user.role not in ["admin", "teacher"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only teachers and admins can update grades"
        )

    grade = db.query(Grade).filter(Grade.id == grade_id).first()
    if not grade:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Grade not found"
        )

    # Check teacher authorization
    enrollment = db.query(Enrollment).filter(Enrollment.id == grade.enrollment_id).first()
    course = db.query(Course).filter(Course.id == enrollment.course_id).first()
    if current_user.role == "teacher" and course.teacher_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Teachers can only update grades for their own courses"
        )

    for key, value in grade_update.model_dump(exclude_unset=True).items():
        setattr(grade, key, value)

    db.commit()
    db.refresh(grade)
    return grade

@router.delete("/{grade_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_grade(
    grade_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete a grade (Admin only)"""
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can delete grades"
        )

    grade = db.query(Grade).filter(Grade.id == grade_id).first()
    if not grade:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Grade not found"
        )

    db.delete(grade)
    db.commit()
    return None

