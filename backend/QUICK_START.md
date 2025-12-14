# Online Maktab Backend - Quick Start Guide

## 🚀 Serverni ishga tushirish

### 1. Virtual environment faollashtirish:
```bash
cd backend
Scripts\activate
```

### 2. Serverni ishga tushirish:
```bash
uvicorn app.main:app --reload
```

Server `http://127.0.0.1:8000` da ishlaydi.

## 📚 API Documentation
- Swagger UI: http://127.0.0.1:8000/docs
- ReDoc: http://127.0.0.1:8000/redoc

## 🧪 Tezkor test

### Test user yaratish (Postman yoki curl):

**1. O'qituvchi ro'yxatdan o'tishi:**
```bash
curl -X POST http://127.0.0.1:8000/users/register \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"teacher@school.com\",\"full_name\":\"John Teacher\",\"password\":\"pass123\",\"role\":\"teacher\"}"
```

**2. Login:**
```bash
curl -X POST http://127.0.0.1:8000/users/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=teacher@school.com&password=pass123"
```

Token qaytaradi - keyingi so'rovlar uchun ishlatish kerak.

**3. Kurs yaratish (token bilan):**
```bash
curl -X POST http://127.0.0.1:8000/courses/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d "{\"title\":\"Python Programming\",\"description\":\"Learn Python from scratch\",\"teacher_id\":1}"
```

## ✅ Ishga tushirish tekshiruvi

```bash
# Test script ishlatish
python test_api.py
```

## 🔧 Muammolar

Agar xato bo'lsa:
1. Virtual environment faollashtirilganligini tekshiring
2. Port 8000 band emasligini tekshiring
3. `python test_import.py` ishlatib import xatolarini tekshiring

## 📊 Database

SQLite ishlatiladi - `school.db` fayli avtomatik yaratiladi.
Database strukturasi:
- users (foydalanuvchilar)
- courses (kurslar)
- enrollments (kursga yozilishlar)
- assignments (topshiriqlar)
- submissions (topshiriq javoblari)
- grades (baholar)

