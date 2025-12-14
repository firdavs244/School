from pydantic import BaseModel, EmailStr, field_validator
from typing import Optional, Literal

class UserBase(BaseModel):
    email: EmailStr
    full_name: str

class UserCreate(UserBase):
    password: str
    role: Optional[Literal["admin", "teacher", "student"]] = "student"

    @field_validator('role')
    @classmethod
    def validate_role(cls, v):
        if v not in ["admin", "teacher", "student"]:
            raise ValueError('Role must be admin, teacher, or student')
        return v

class UserRead(UserBase):
    id: int
    role: str

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
