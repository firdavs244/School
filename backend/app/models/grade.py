from sqlalchemy import Column, Integer, Float, ForeignKey, Text, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.db import Base

class Grade(Base):
    __tablename__ = "grades"

    id = Column(Integer, primary_key=True, index=True)
    enrollment_id = Column(Integer, ForeignKey("enrollments.id"), nullable=False)
    submission_id = Column(Integer, ForeignKey("submissions.id"), nullable=True)
    score = Column(Float, nullable=False)
    feedback = Column(Text)
    graded_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    # Relationships
    enrollment = relationship("Enrollment", back_populates="grades")
    submission = relationship("Submission", back_populates="grade")

