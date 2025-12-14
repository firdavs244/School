# 🎓 Online Maktab - Zamonaviy Ta'lim Platformasi

**Full-Stack web application** - O'quvchilar, o'qituvchilar va administratorlar uchun zamonaviy onlayn ta'lim boshqaruv tizimi.

[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Ant Design](https://img.shields.io/badge/Ant%20Design-0170FE?style=for-the-badge&logo=ant-design&logoColor=white)](https://ant.design/)
[![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)

## ✨ Asosiy Xususiyatlar

### 👨‍🎓 O'quvchilar uchun
- ✅ Kurslarni ko'rish va yozilish
- ✅ Topshiriqlarni topshirish
- ✅ Baholar va fikr-mulohazalarni ko'rish
- ✅ Shaxsiy dashboard

### 👨‍🏫 O'qituvchilar uchun
- ✅ Kurslar yaratish va boshqarish
- ✅ Topshiriqlar berish
- ✅ O'quvchilarni baholash
- ✅ Topshiriqlarni ko'rib chiqish

### 👨‍💼 Administratorlar uchun
- ✅ Foydalanuvchilarni boshqarish (CRUD)
- ✅ Kurslarni boshqarish (CRUD)
- ✅ Topshiriqlarni boshqarish (CRUD)
- ✅ Role management
- ✅ To'liq tizim nazorati

## 🛠️ Texnologiyalar

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM
- **SQLite** - Database
- **Pydantic** - Data validation
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Uvicorn** - ASGI server

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **Ant Design** - UI component library
- **React Router** - Navigation

## 📦 O'rnatish

### Talablar
- Python 3.11+
- Node.js 18+
- npm or yarn

### 1. Repository'ni clone qiling
```bash
git clone https://github.com/firdavs244/School.git
cd School
```

### 2. Backend Setup

```bash
cd backend

# Virtual environment yarating (Windows)
python -m venv .

# Activate qiling
Scripts\activate  # Windows

# Dependencies o'rnating
pip install -r requirements.txt

# Database yarating
python recreate_database.py

# Serverni ishga tushiring
uvicorn app.main:app --reload
```

Backend: http://127.0.0.1:8000
API Docs: http://127.0.0.1:8000/docs

### 3. Frontend Setup

```bash
cd frontend

# Dependencies o'rnating
npm install

# Development server
npm run dev
```

Frontend: http://localhost:5173

## 🚀 Tezkor Ishga Tushirish

### Windows uchun

**Backend:**
```bash
cd backend
START_BACKEND.bat
```

**Frontend:**
```bash
cd frontend
npm run dev
```

## 📊 Database Schema

### Users
- id, email, password, full_name, role
- Roles: `student`, `teacher`, `admin`

### Courses
- id, title, description, teacher_id

### Assignments
- id, title, description, course_id, due_date

### Submissions
- id, assignment_id, student_id, content, submitted_at

### Grades
- id, enrollment_id, submission_id, score, feedback

### Enrollments
- id, student_id, course_id, enrolled_at

## 🎯 API Endpoints

### Authentication
- `POST /users/register` - Ro'yxatdan o'tish
- `POST /users/login` - Kirish
- `GET /users/me` - Hozirgi foydalanuvchi

### Courses
- `GET /courses/` - Barcha kurslar
- `POST /courses/` - Kurs yaratish (Teacher/Admin)
- `GET /courses/{id}` - Kurs ma'lumotlari
- `PUT /courses/{id}` - Yangilash (Teacher/Admin)
- `DELETE /courses/{id}` - O'chirish (Admin)

### Assignments
- `POST /assignments/` - Topshiriq yaratish (Teacher/Admin)
- `GET /assignments/course/{id}` - Kurs topshiriqlari
- `PUT /assignments/{id}` - Yangilash (Teacher/Admin)
- `DELETE /assignments/{id}` - O'chirish (Admin)

### Submissions
- `POST /submissions/` - Javob topshirish (Student)
- `GET /submissions/my-submissions` - Mening javoblarim
- `GET /submissions/assignment/{id}` - Barcha javoblar (Teacher/Admin)

### Grades
- `POST /grades/` - Baho berish (Teacher/Admin)
- `GET /grades/my-grades` - Mening baholarim (Student)
- `PUT /grades/{id}` - Yangilash (Teacher/Admin)

## 👥 Rollar va Ruxsatlar

### Student (Default)
- Ro'yxatdan o'tganda avtomatik student roli beriladi
- Kurslarni ko'rish va yozilish
- Topshiriqlarni topshirish
- Baholarni ko'rish

### Teacher
- Admin tomonidan tayinlanadi
- Kurslar yaratish
- Topshiriqlar berish
- O'quvchilarni baholash

### Admin
- Admin tomonidan tayinlanadi
- Barcha funksiyalarga kirish
- Foydalanuvchilar rolini o'zgartirish
- To'liq CRUD operatsiyalar

**Eslatma:** Foydalanuvchi ro'yxatdan o'tganda avtomatik **student** roli beriladi. Teacher yoki Admin rolini faqat Admin berishi mumkin.

## 🎨 Dizayn

- **Classic Plus Design** - Professional va zamonaviy
- **Ant Design Components** - Beautiful UI elements
- **Responsive** - Mobile, Tablet, Desktop
- **Gradient Backgrounds** - Modern look
- **Smooth Animations** - Enhanced UX
- **Icon-rich Interface** - Professional icons
- **O'zbek tilida** - 100% localized

## 📁 Loyiha Strukturasi

```
School/
├── backend/
│   ├── app/
│   │   ├── models/        # Database models
│   │   ├── routers/       # API endpoints
│   │   ├── schemas/       # Pydantic schemas
│   │   ├── main.py        # FastAPI application
│   │   ├── db.py          # Database configuration
│   │   └── utils.py       # Helper functions
│   ├── requirements.txt   # Python dependencies
│   └── START_BACKEND.bat  # Quick start script
│
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── App.jsx        # Main application
│   │   └── index.css      # Global styles
│   ├── package.json       # Node dependencies
│   └── vite.config.js     # Vite configuration
│
└── README.md              # Project documentation
```

## 🔒 Xavfsizlik

- ✅ JWT authentication
- ✅ Bcrypt password hashing
- ✅ Role-based access control (RBAC)
- ✅ CORS protection
- ✅ SQL injection protection (SQLAlchemy ORM)
- ✅ Input validation (Pydantic)

## 👨‍💻 Muallif

**Firdavs**
- GitHub: [@firdavs244](https://github.com/firdavs244)
- Project: [Online Maktab](https://github.com/firdavs244/School)

## 🙏 Credits

- [FastAPI](https://fastapi.tiangolo.com/)
- [React](https://reactjs.org/)
- [Ant Design](https://ant.design/)
- [Vite](https://vitejs.dev/)

---

**🇺🇿**

© 2026 Online Maktab. Barcha huquqlar himoyalangan.

