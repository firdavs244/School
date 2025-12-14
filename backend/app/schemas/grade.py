from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class GradeBase(BaseModel):
    score: float
    feedback: Optional[str] = None

class GradeCreate(GradeBase):
    enrollment_id: int
    submission_id: Optional[int] = None

class GradeRead(GradeBase):
    id: int
    enrollment_id: int
    submission_id: Optional[int] = None
    graded_at: datetime

    class Config:
        from_attributes = True

