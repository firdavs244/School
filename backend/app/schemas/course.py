from pydantic import BaseModel
from typing import Optional

class CourseBase(BaseModel):
    title: str
    description: Optional[str] = None

class CourseCreate(CourseBase):
    teacher_id: int

class CourseRead(CourseBase):
    id: int
    teacher_id: int

    class Config:
        from_attributes = True

class CourseWithTeacher(CourseRead):
    teacher_name: Optional[str] = None

