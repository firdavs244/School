# 📁 Frontend Fayl Strukturasi - Professional

Bu loyiha senior dasturchilardek professional tarzda tashkil etilgan.

## 📂 Yangi Struktura

```
frontend/src/
├── api/                      # 🔌 API funksiyalari
│   ├── index.js             # Barcha API eksportlari
│   ├── client.js            # API client (fetch wrapper)
│   ├── auth.api.js          # Autentifikatsiya API
│   ├── course.api.js        # Kurslar API
│   ├── enrollment.api.js    # Ro'yxatga olish API
│   ├── assignment.api.js    # Topshiriqlar API
│   ├── submission.api.js    # Yuborishlar API
│   └── grade.api.js         # Baholar API
│
├── components/              # 🧩 Qayta ishlatiluvchi komponentlar
│   ├── index.js            # Barcha komponent eksportlari
│   └── layout/             # Layout komponentlari
│       ├── index.js
│       ├── Header.jsx
│       └── Footer.jsx
│
├── config/                  # ⚙️ Konfiguratsiya
│   └── index.js            # API URL, app sozlamalari
│
├── constants/               # 📋 Konstantalar
│   └── index.js            # Rollar, ranglar, yorliqlar
│
├── hooks/                   # 🪝 Custom React Hooks
│   ├── index.js
│   ├── useAuth.js          # Autentifikatsiya hook
│   └── useData.js          # Ma'lumot yuklash hook
│
├── pages/                   # 📄 Sahifalar (faqat JSX)
│   ├── index.js            # Barcha sahifa eksportlari
│   │
│   ├── Home/               # 🏠 Bosh sahifa
│   │   ├── index.js
│   │   └── HomePage.jsx
│   │
│   ├── Auth/               # 🔐 Autentifikatsiya
│   │   ├── index.js
│   │   ├── LoginPage.jsx
│   │   └── RegisterPage.jsx
│   │
│   ├── Dashboard/          # 📊 Boshqaruv paneli
│   │   ├── index.js
│   │   └── Dashboard.jsx
│   │
│   ├── Courses/            # 📚 Kurslar
│   │   ├── index.js
│   │   ├── BrowseCoursesPage.jsx
│   │   └── CreateCoursePage.jsx
│   │
│   ├── Assignments/        # 📝 Topshiriqlar
│   │   ├── index.js
│   │   ├── MyAssignmentsPage.jsx
│   │   ├── CreateAssignmentPage.jsx
│   │   ├── SubmitAssignmentPage.jsx
│   │   ├── ViewSubmissionsPage.jsx
│   │   └── GradeSubmissionPage.jsx
│   │
│   ├── Grades/             # 📈 Baholar
│   │   ├── index.js
│   │   └── MyGradesPage.jsx
│   │
│   └── Admin/              # 👑 Admin sahifalari
│       ├── index.js
│       ├── ManageUsersPage.jsx
│       ├── ManageCoursesPage.jsx
│       └── ManageAssignmentsPage.jsx
│
├── routes/                  # 🛣️ Routing
│   ├── index.js            # ROUTES konstantalari
│   └── ProtectedRoute.jsx  # Himoyalangan marshrutlar
│
├── styles/                  # 🎨 Barcha CSS fayllar
│   ├── index.js            # Barcha stillarni import
│   ├── index.css           # Global stillar
│   ├── App.css             # App stillari
│   │
│   ├── layout/             # Layout stillari
│   │   ├── Header.css
│   │   └── Footer.css
│   │
│   ├── pages/              # Sahifa stillari
│   │   ├── Auth.css
│   │   ├── HomePage.css
│   │   ├── Dashboard.css
│   │   ├── BrowseCoursesPage.css
│   │   ├── CreateCoursePage.css
│   │   ├── MyAssignmentsPage.css
│   │   ├── CreateAssignmentPage.css
│   │   ├── SubmitAssignmentPage.css
│   │   ├── MyGradesPage.css
│   │   └── ManageUsersPage.css
│   │
│   └── components/         # Komponent stillari (bo'sh)
│
├── utils/                   # 🔧 Yordamchi funksiyalar
│   ├── index.js
│   ├── helpers.js          # Sana formatlash, boshqalar
│   └── storage.js          # localStorage funksiyalari
│
├── App.jsx                  # 🚀 Asosiy App komponenti
└── main.jsx                 # 📍 Kirish nuqtasi
```

---

## 🎯 CSS Alohida - Afzalliklari

### 1. **Toza Ajratish**
Mantiq (JSX) va ko'rinish (CSS) alohida papkalarda.

### 2. **Oson Topish**
Barcha stillar bir joyda - `styles/` papkasida.

### 3. **Qayta Ishlatish**
Bir CSS faylni bir nechta komponentda ishlatish oson:
```javascript
// CreateCoursePage.jsx va CreateAssignmentPage.jsx
import '../../styles/pages/Auth.css';  // Bir xil stil
```

### 4. **Team Work**
Dizayner CSS bilan, dasturchi JSX bilan ishlaydi.

---

## 📝 Import Qoidalari

### CSS Import Yo'llari

```javascript
// Sahifalardan styles ga
import '../../styles/pages/MyPage.css';

// Komponentlardan styles ga  
import '../../styles/layout/Header.css';

// App.jsx dan
import './styles/App.css';

// main.jsx dan
import './styles/index.css';
```

### Yangi Sahifa Qo'shish

1. `pages/Category/MyPage.jsx` yarating
2. `styles/pages/MyPage.css` yarating
3. JSX da import qiling:
   ```javascript
   import '../../styles/pages/MyPage.css';
   ```

---

## ✅ Struktura Xulosasi

| Papka | Vazifasi | Fayl turlari |
|-------|----------|--------------|
| `api/` | Backend bilan aloqa | `.js` |
| `components/` | UI komponentlar | `.jsx` |
| `pages/` | Sahifalar | `.jsx` |
| `styles/` | Barcha stillar | `.css` |
| `hooks/` | Custom React hooks | `.js` |
| `utils/` | Yordamchi funksiyalar | `.js` |
| `constants/` | Konstantalar | `.js` |
| `routes/` | Routing | `.js`, `.jsx` |
| `config/` | Konfiguratsiya | `.js` |

---

*Yaratildi: December 2025*

