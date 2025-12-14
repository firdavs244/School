# 🎨 Online Maktab - Frontend

React va Vite asosida qurilgan zamonaviy frontend.

## 🛠️ Texnologiyalar

- **React 19** - UI library
- **React Router** - Navigation
- **Vite** - Build tool
- **CSS Modules** - Styling
- **Material-UI** - Components (installed)
- **Redux Toolkit** - State management (installed)

## 📦 O'rnatish

```bash
npm install
```

## 🚀 Ishga Tushirish

```bash
npm run dev
```

Frontend: http://localhost:5173

## 📱 Sahifalar

### Public Pages
- **HomePage** - Landing page
- **LoginPage** - Kirish
- **RegisterPage** - Ro'yxatdan o'tish

### Student Pages
- **Dashboard** - Boshqaruv paneli
- **BrowseCoursesPage** - Kurslarni ko'rish
- **MyAssignmentsPage** - Topshiriqlarim
- **MyGradesPage** - Baholarim
- **SubmitAssignmentPage** - Topshiriq topshirish

### Teacher Pages
- **CreateCoursePage** - Kurs yaratish
- **CreateAssignmentPage** - Topshiriq yaratish
- **ViewSubmissionsPage** - Topshiriqlarni ko'rish
- **GradeSubmissionPage** - Baholash

### Admin Pages
- **ManageCoursesPage** - Kurslarni boshqarish
- **ManageAssignmentsPage** - Topshiriqlarni boshqarish
- **ManageUsersPage** - Foydalanuvchilar

## 🎨 Dizayn Tizimi

### CSS Architecture
```
src/
├── index.css              # Global styles
├── components/
│   ├── Header.css
│   └── Footer.css
└── pages/
    ├── HomePage.css
    ├── Auth.css
    ├── Dashboard.css
    ├── BrowseCoursesPage.css
    ├── CreateCoursePage.css
    ├── MyAssignmentsPage.css
    └── MyGradesPage.css
```

### CSS Variables
- Colors, spacing, shadows
- Utility classes
- Responsive breakpoints

## 📁 Struktura

```
frontend/
├── public/
├── src/
│   ├── components/      # Reusable components
│   ├── pages/          # Page components
│   ├── services/       # API calls
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
└── vite.config.js
```

## 🚀 Build

```bash
npm run build
```

## 📱 Responsive

- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

---

O'zbekistonda ishlab chiqilgan 🇺🇿

