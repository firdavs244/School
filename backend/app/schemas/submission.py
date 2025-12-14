from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class SubmissionBase(BaseModel):
    content: Optional[str] = None

class SubmissionCreate(SubmissionBase):
    assignment_id: int

class SubmissionRead(SubmissionBase):
    id: int
    assignment_id: int
    student_id: int
    submitted_at: datetime

    class Config:
        from_attributes = True

