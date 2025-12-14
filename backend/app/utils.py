from datetime import datetime, timedelta, timezone
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from app.db import get_db
from app.models.user import User
import hashlib

# Security configuration
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"  # Change in production!
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Configure passlib with bcrypt - suppress version warnings
import warnings
warnings.filterwarnings("ignore", category=UserWarning, module="passlib")

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
    bcrypt__default_rounds=12,
    bcrypt__ident="2b",  # Use modern bcrypt variant
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/users/login")

# Password hashing utilities with proper truncation
def _prepare_password(password: str) -> str:
    """
    Prepare password for bcrypt by ensuring it's not longer than 72 bytes.
    If password is longer, we hash it first to get a fixed-length representation.
    """
    if not isinstance(password, str):
        password = str(password)

    # Encode to bytes
    password_bytes = password.encode('utf-8')

    # If password is longer than 72 bytes, hash it first with SHA-256
    # This ensures we never exceed bcrypt's limit while maintaining security
    if len(password_bytes) > 72:
        # Use SHA-256 to create a fixed-length hash of the password
        # Then encode it as base64 to make it a valid string
        import base64
        hashed = hashlib.sha256(password_bytes).digest()
        password = base64.b64encode(hashed).decode('utf-8')

    return password

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against a hash"""
    try:
        prepared_password = _prepare_password(plain_password)
        return pwd_context.verify(prepared_password, hashed_password)
    except Exception as e:
        print(f"Password verification error: {e}")
        return False

def get_password_hash(password: str) -> str:
    """Hash a password using bcrypt"""
    try:
        prepared_password = _prepare_password(password)
        return pwd_context.hash(prepared_password)
    except Exception as e:
        print(f"Password hashing error: {e}")
        raise

# JWT token utilities
def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise credentials_exception
    return user
