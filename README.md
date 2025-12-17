# 🎓 Online Maktab - Ta'lim Boshqaruv Tizimi

Zamonaviy onlayn ta'lim platformasi - kurslar, topshiriqlar va baholarni boshqarish uchun.

## 📋 Texnologiyalar

### Backend
- **FastAPI** - Python web framework
- **SQLAlchemy** - ORM
- **SQLite** - Database
- **JWT** - Autentifikatsiya
- **Bcrypt** - Parol shifrlash

### Frontend
- **React 19** - UI framework
- **Ant Design 6** - UI components
- **React Router 7** - Routing
- **Vite** - Build tool

### DevOps
- **Docker & Docker Compose** - Konteynerizatsiya
- **Nginx** - Reverse proxy
- **Let's Encrypt** - SSL sertifikatlari

---

## 🚀 Tez Boshlash

### Variant 1: GitHub Codespaces (Eng Oson - 1 daqiqa!)

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/yourusername/school)

1. Yuqoridagi tugmani bosing yoki GitHub'da **Code → Codespaces → Create**
2. Codespace ochilgandan so'ng terminal oching va:
   ```bash
   chmod +x start-codespaces.sh && ./start-codespaces.sh
   ```
3. **Ports** tabida 5173 port'ni bosing - Frontend ochiladi!

> ✅ Hech qanday `.env` yoki sozlash kerak emas - hammasi avtomatik!

---

### Variant 2: Lokal Docker (Windows/Mac/Linux)

```bash
# 1. Klonlash
git clone https://github.com/yourusername/school.git
cd school

# 2. Ishga tushirish (bu 1 buyruq yetarli!)
docker compose up --build

# 3. Brauzerda ochish:
# Frontend: http://localhost:5173
# Backend API: http://localhost:8000/docs
```

---

### Variant 3: Docker'siz (Manual)

```bash
# Backend
cd backend
python -m venv venv
venv\Scripts\activate     # Windows
source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
uvicorn app.main:app --reload

# Frontend (yangi terminal)
cd frontend
npm install
npm run dev
```

---

## 🌐 Production Deployment

### 1. Server tayyorlash (Ubuntu)

```bash
sudo apt update && sudo apt install docker.io docker-compose git
sudo usermod -aG docker $USER
```

### 2. Loyihani yuklab olish

```bash
git clone https://github.com/yourusername/school.git
cd school
```

### 3. Production sozlamalari

```bash
# .env.prod yaratish
cp .env.prod.example .env.prod
nano .env.prod  # Domeningizni va SECRET_KEY ni o'zgartiring
```

### 4. Nginx konfiguratsiyasini yangilash

```bash
# nginx/nginx.conf da domenni o'zgartiring
sed -i 's/yourdomain.com/your-actual-domain.com/g' nginx/nginx.conf
```

### 5. Deploy

```bash
chmod +x deploy-prod.sh
./deploy-prod.sh
```

---

## 📁 Loyiha Strukturasi

```
school/
├── docker-compose.yml          # Development (lokal)
├── docker-compose.codespaces.yml  # GitHub Codespaces
├── docker-compose.prod.yml     # Production
├── start-codespaces.sh         # Codespaces startup
├── start-dev.sh                # Local dev startup
├── deploy-prod.sh              # Production deploy
│
├── backend/                    # FastAPI Backend
│   ├── Dockerfile
│   ├── Dockerfile.prod
│   ├── requirements.txt
│   └── app/
│       ├── main.py
│       ├── models/
│       ├── routers/
│       └── schemas/
│
├── frontend/                   # React Frontend
│   ├── Dockerfile
│   ├── Dockerfile.codespaces   # Codespaces uchun (dev server)
│   ├── Dockerfile.prod
│   └── src/
│       ├── api/
│       ├── components/
│       ├── pages/
│       └── styles/
│
├── nginx/                      # Reverse Proxy (Production)
│   └── nginx.conf
│
├── .devcontainer/              # VS Code Dev Container
│   └── devcontainer.json
│
└── certbot/                    # SSL Certificates
```

---

## 🔧 Foydali Buyruqlar

```bash
# ============ DEVELOPMENT ============
docker compose up --build           # Ishga tushirish
docker compose down                 # To'xtatish
docker compose logs -f              # Loglar

# ============ CODESPACES ============
./start-codespaces.sh               # Avtomatik sozlash + ishga tushirish

# ============ PRODUCTION ============
./deploy-prod.sh                    # To'liq deploy
docker compose -f docker-compose.prod.yml logs -f  # Loglar
```

---

## 👤 Foydalanuvchi Rollari

| Rol | Imkoniyatlar |
|-----|--------------|
| **Student** | Kurslarga yozilish, topshiriqlar yuborish, baholarni ko'rish |
| **Teacher** | Kurslar yaratish, topshiriqlar berish, baholar qo'yish |
| **Admin** | Barcha foydalanuvchi va kurslarni boshqarish |

---

## 🔒 Xavfsizlik

- ✅ JWT token autentifikatsiya
- ✅ Bcrypt parol shifrlash
- ✅ CORS himoya
- ✅ Rate limiting (production)
- ✅ HTTPS (production)
- ✅ Security headers

---

## 🐛 Muammolar

### Codespaces'da Frontend ishlamayapti
- Ports tabida 8000 va 5173 portlar **Public** ekanligini tekshiring

### CORS xatosi
- Backend `CORS_ORIGINS` environment variable'ni tekshiring

### 401 Unauthorized
- Token eskirgan - qayta login qiling

---

## 📞 Aloqa

Muammolar yoki takliflar uchun GitHub Issues oching.

---

*Yaratildi: December 2025*

