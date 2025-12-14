# 🎓 Online Maktab - Backend API

FastAPI asosida qurilgan zamonaviy backend tizimi.

## 🛠️ Texnologiyalar

- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM
- **SQLite** - Database
- **Pydantic** - Data validation
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Uvicorn** - ASGI server

## 📦 O'rnatish

```bash
# Virtual environment yarating
python -m venv .

# Aktivlashtiring
Scripts\activate  # Windows

# Dependencies o'rnating
pip install -r requirements.txt
```

## 🚀 Ishga Tushirish

### Usul 1: BAT fayl
```bash
START_BACKEND.bat
```

### Usul 2: Manual
```bash
Scripts\activate
uvicorn app.main:app --reload
```

Backend: http://127.0.0.1:8000
API Docs: http://127.0.0.1:8000/docs

## 📚 API Endpoints

### Users
- `POST /users/register` - Ro'yxatdan o'tish
- `POST /users/login` - Kirish
- `GET /users/me` - Profil
- `GET /users/` - Barcha foydalanuvchilar (Admin)

### Courses
- `GET /courses/` - Barcha kurslar
- `POST /courses/` - Kurs yaratish
- `GET /courses/{id}` - Kurs ma'lumotlari
- `PUT /courses/{id}` - Yangilash
- `DELETE /courses/{id}` - O'chirish

### Assignments
- `POST /assignments/` - Topshiriq yaratish
- `GET /assignments/course/{id}` - Kurs topshiriqlari
- `PUT /assignments/{id}` - Yangilash
- `DELETE /assignments/{id}` - O'chirish

### Submissions
- `POST /submissions/` - Topshirish
- `GET /submissions/my-submissions` - Mening topshiriqlarim
- `GET /submissions/assignment/{id}` - Barcha javoblar

### Grades
- `POST /grades/` - Baho berish
- `GET /grades/my-grades` - Mening baholarim
- `PUT /grades/{id}` - Yangilash

## 🔒 Xavfsizlik

- JWT authentication
- Bcrypt password hashing
- Role-based access control
- CORS protection
- SQL injection protection

## 📁 Struktura

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py          # FastAPI app
│   ├── db.py            # Database config
│   ├── utils.py         # Helper functions
│   ├── models/          # SQLAlchemy models
│   ├── schemas/         # Pydantic schemas
│   └── routers/         # API endpoints
├── requirements.txt
└── START_BACKEND.bat
```

## 🧪 Test

```bash
python -m pytest
```

---

O'zbekistonda ishlab chiqilgan 🇺🇿

